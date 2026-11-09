import { supabase } from '../config/supabase.js';
import { ROLES, ACCOUNT_STATUS } from '../config/constants.js';

export async function listUsers(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, user_id, full_name, email, phone, role, account_status, created_at')
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    res.json({ success: true, users: data });
  } catch (err) {
    next(err);
  }
}

export async function listPendingCustomers(req, res, next) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, user_id, full_name, email, phone, role, account_status, created_at')
      .eq('role', ROLES.CUSTOMER)
      .eq('account_status', ACCOUNT_STATUS.PENDING)
      .order('created_at', { ascending: true });
    if (error) throw new Error(error.message);
    res.json({ success: true, users: data });
  } catch (err) {
    next(err);
  }
}

export async function updateAccountApproval(req, res, next) {
  try {
    const { status } = req.body;
    if (![ACCOUNT_STATUS.APPROVED, ACCOUNT_STATUS.REJECTED].includes(status)) {
      return res.status(400).json({ success: false, error: 'status must be approved or rejected' });
    }

    const userId = req.params.userId;
    const { data: existing, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (fetchError || !existing) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    if (existing.role !== ROLES.CUSTOMER) {
      return res.status(400).json({ success: false, error: 'Only customer accounts require approval' });
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .update({ account_status: status, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);

    if (status === ACCOUNT_STATUS.APPROVED) {
      const { data: cards } = await supabase.from('cards').select('id').eq('user_id', userId).limit(1);
      if (!cards?.length) {
        const { createCard } = await import('../services/cardService.js');
        try {
          await createCard(userId);
        } catch (e) {
          console.warn('Card creation on approval failed:', e.message);
        }
      }
    }

    res.json({
      success: true,
      profile,
      message:
        status === ACCOUNT_STATUS.APPROVED
          ? 'Customer approved. They can now sign in and use water services.'
          : 'Customer registration rejected.',
    });
  } catch (err) {
    next(err);
  }
}

export async function updateUserRole(req, res, next) {
  try {
    const { role } = req.body;
    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('user_id', req.params.userId)
      .select()
      .single();
    if (error) throw new Error(error.message);
    res.json({ success: true, profile: data });
  } catch (err) {
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const userId = req.params.userId;
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);
    if (authError) throw new Error(authError.message);

    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('user_id', userId);
    if (profileError) throw new Error(profileError.message);

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
}
