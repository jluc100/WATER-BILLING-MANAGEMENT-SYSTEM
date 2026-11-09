import * as cardService from '../services/cardService.js';
import { supabase } from '../config/supabase.js';

export async function listAdminCards(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('cards')
      .select(
        'id, card_uid, balance_rwf, is_active, user_id, profiles(full_name)'
      )
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);

    const cards = (data || []).map((c) => ({
      id: c.id,
      card_uid: c.card_uid,
      balance_rwf: c.balance_rwf,
      is_active: c.is_active,
      user_id: c.user_id,
      customer_name: c.profiles?.full_name || null,
    }));

    res.json({ success: true, cards });
  } catch (err) {
    next(err);
  }
}

export async function createAdminCard(req, res, next) {
  try {
    const { user_id, card_uid } = req.body;
    if (!user_id) return res.status(400).json({ success: false, error: 'user_id required' });

    const card = await cardService.createCard(user_id, card_uid);

    res.status(201).json({ success: true, card });
  } catch (err) {
    next(err);
  }
}

export async function setAdminCardActive(req, res, next) {
  try {
    const { cardId } = req.params;
    const { is_active } = req.body;
    if (typeof is_active !== 'boolean') {
      return res.status(400).json({ success: false, error: 'is_active boolean required' });
    }

    // Update card active status
    const { data, error } = await supabase
      .from('cards')
      .update({ is_active, updated_at: new Date().toISOString() })
      .eq('id', cardId)
      .select('id, card_uid, is_active, balance_rwf, user_id')
      .single();

    if (error) throw new Error(error.message);

    res.json({ success: true, card: data });
  } catch (err) {
    next(err);
  }
}

export async function rechargeAdminCard(req, res, next) {
  try {
    const { cardId } = req.params;
    const { amount_rwf } = req.body;
    if (!amount_rwf || Number(amount_rwf) <= 0) {
      return res.status(400).json({ success: false, error: 'Valid amount_rwf required' });
    }

    const card = await cardService.rechargeCard(cardId, Number(amount_rwf), null);

    res.json({ success: true, card, message: 'Recharge successful' });
  } catch (err) {
    next(err);
  }
}

