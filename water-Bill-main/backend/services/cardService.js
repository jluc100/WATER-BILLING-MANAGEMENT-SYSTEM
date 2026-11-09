import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import { supabase } from '../config/supabase.js';
import { pricingConfig } from '../config/brevo.js';
import { calculateCost } from './pricingService.js';
import {
  sendLowBalanceAlert,
  sendRechargeSuccess,
  sendWaterDisconnected,
} from './brevoEmailService.js';

async function getProfileByUserId(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('user_id', userId)
    .single();

  if (error) return null;
  return data;
}

export async function getCardByUid(cardUid) {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .or(`card_uid.eq.${cardUid},qr_token.eq.${cardUid}`)
    .eq('is_active', true)
    .single();
  if (error) return null;
  return data;
}

export async function getCardById(cardId) {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('id', cardId)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export { getProfileByUserId };

export async function createCard(userId, cardUid) {
  const qrToken = uuidv4();
  const qrDataUrl = await QRCode.toDataURL(qrToken, { width: 256, margin: 2 });

  const { data, error } = await supabase
    .from('cards')
    .insert({
      user_id: userId,
      card_uid: cardUid || `CARD-${uuidv4().slice(0, 8).toUpperCase()}`,
      qr_token: qrToken,
      balance_rwf: 0,
      is_active: true,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return { ...data, qr_data_url: qrDataUrl };
}

export async function rechargeCard(cardId, amountRwf, userId = null) {
  const card = await getCardById(cardId);
  if (userId && card.user_id !== userId) throw new Error('Card does not belong to user');

  const newBalance = card.balance_rwf + amountRwf;

  const { data, error } = await supabase
    .from('cards')
    .update({ balance_rwf: newBalance, updated_at: new Date().toISOString() })
    .eq('id', cardId)
    .select()
    .single();

  if (error) throw new Error(error.message);

  await supabase.from('recharges').insert({
    user_id: card.user_id,
    card_id: cardId,
    amount_rwf: amountRwf,
    method: 'manual',
    brevo_sent: false,
  });

  const profile = await getProfileByUserId(card.user_id);
  if (profile?.email) {
    await sendRechargeSuccess(profile.email, profile.full_name, amountRwf, newBalance);
  }

  if (newBalance >= pricingConfig.lowBalanceThreshold && card.balance_rwf < pricingConfig.lowBalanceThreshold) {
    // balance restored above threshold — no action needed
  }

  return data;
}

export async function deductBalance(cardId, amountRwf) {
  const card = await getCardById(cardId);
  if (card.balance_rwf < amountRwf) {
    throw new Error('INSUFFICIENT_BALANCE');
  }

  const newBalance = card.balance_rwf - amountRwf;

  const { data, error } = await supabase
    .from('cards')
    .update({ balance_rwf: newBalance, updated_at: new Date().toISOString() })
    .eq('id', cardId)
    .select('*')
    .single();

  if (error) throw new Error(error.message);

  const profile = await getProfileByUserId(data.user_id);
  if (newBalance <= 0 && profile?.email) {
    await sendWaterDisconnected(profile.email, profile.full_name, 'Insufficient balance');
  } else if (newBalance < pricingConfig.lowBalanceThreshold && profile?.email) {
    await sendLowBalanceAlert(profile.email, profile.full_name, newBalance, data.user_id);
  }

  return data;
}

export async function reserveAndCheck(card, requestedMl) {
  const estimatedCost = calculateCost(requestedMl);

  if (card.balance_rwf < pricingConfig.minStartingBalance) {
    return {
      allowed: false,
      reason: 'MINIMUM_BALANCE_REQUIRED',
      balance: card.balance_rwf,
      minimumRequired: pricingConfig.minStartingBalance,
    };
  }

  if (requestedMl <= 0) {
    return {
      allowed: false,
      reason: 'INVALID_VOLUME_REQUEST',
      balance: card.balance_rwf,
      required: 0,
    };
  }

  if (card.balance_rwf < estimatedCost) {
    return {
      allowed: false,
      reason: 'INSUFFICIENT_BALANCE',
      balance: card.balance_rwf,
      required: estimatedCost,
      maxAffordableMl: Math.floor(card.balance_rwf / pricingConfig.pricePerMl),
    };
  }
  return {
    allowed: true,
    estimatedCost,
    balance: card.balance_rwf,
    remainingAfter: card.balance_rwf - estimatedCost,
  };
}

export async function getUserCards(userId) {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}
