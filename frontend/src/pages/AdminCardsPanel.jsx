import { useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';

export default function AdminCardsPanel({ onStatus }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const [addOpen, setAddOpen] = useState(false);
  const [rechargeOpen, setRechargeOpen] = useState(false);

  const [customers, setCustomers] = useState([]);

  const [addForm, setAddForm] = useState({ user_id: '', card_uid: '' });
  const [rechargeForm, setRechargeForm] = useState({ cardId: '', amount_rwf: '' });

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await api.adminListCards();
      setCards(res.cards || []);

    } catch (e) {
      onStatus?.({ type: 'error', message: e.message || 'Failed to load cards.' });
    } finally {
      setLoading(false);
    }
  };

  const refreshCustomers = async () => {
    try {
      // reuse existing /api/users with admin token (already protected)
      const res = await api.users();
      // customers only
      const list = (res.users || []).filter((u) => u.role === 'customer');
      setCustomers(list);
    } catch (e) {
      // non-fatal
    }
  };

  useEffect(() => {
    refresh();
    refreshCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lowBalanceCount = useMemo(() => {
    return cards.filter((c) => Number(c.balance_rwf) < 1000).length;
  }, [cards]);

  const submitAdd = async (e) => {
    e.preventDefault();
    try {
      await api.adminCreateCard({
        user_id: addForm.user_id,
        card_uid: addForm.card_uid || undefined,
      });
      setAddOpen(false);
      setAddForm({ user_id: '', card_uid: '' });
      onStatus?.({ type: 'success', message: 'Card created.' });
      await refresh();
    } catch (err) {
      onStatus?.({ type: 'error', message: err.message || 'Create card failed.' });
    }
  };

  const submitRecharge = async (e) => {
    e.preventDefault();
    try {
      await api.adminRechargeCard({
        cardId: rechargeForm.cardId,
        amount_rwf: Number(rechargeForm.amount_rwf),
      });
      setRechargeOpen(false);
      setRechargeForm({ cardId: '', amount_rwf: '' });
      onStatus?.({ type: 'success', message: 'Recharge successful.' });
      await refresh();
    } catch (err) {
      onStatus?.({ type: 'error', message: err.message || 'Recharge failed.' });
    }
  };

  const toggleActive = async (card) => {
    try {
      await api.adminSetCardActive({ cardId: card.id, is_active: !card.is_active });
      onStatus?.({ type: 'success', message: card.is_active ? 'Card deactivated.' : 'Card activated.' });
      await refresh();
    } catch (err) {
      onStatus?.({ type: 'error', message: err.message || 'Update failed.' });
    }
  };

  return (
    <div className="panel-card">
      <div className="panel-heading" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <span>Cards Management</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <span className="badge badge-warning">Low balance: {lowBalanceCount}</span>
          <button className="btn-secondary" onClick={() => setAddOpen(true)}>Add Card</button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Card UID</th>
              <th>Balance</th>
              <th>Active</th>
              <th style={{ width: 260 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((c) => (
              <tr key={c.id}>
                <td>{c.customer_name || '-'}</td>
                <td style={{ fontFamily: 'monospace' }}>{c.card_uid}</td>
                <td>{Number(c.balance_rwf).toLocaleString()} RWF</td>
                <td>
                  <span className={`badge ${c.is_active ? 'badge-success' : 'badge-danger'}`}>{c.is_active ? 'Active' : 'Disabled'}</span>
                </td>

                <td className="table-actions">
                  <button
                    className="btn-secondary btn-sm"
                    onClick={() => {
                      setRechargeForm({ cardId: c.id, amount_rwf: '' });
                      setRechargeOpen(true);
                    }}
                  >Recharge</button>
                  <button className="btn-secondary btn-sm" onClick={() => toggleActive(c)}>
                    {c.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
            {!loading && cards.length === 0 && (
              <tr>
                <td colSpan={5} style={{ color: 'var(--muted)' }}>No cards found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {addOpen && (
        <div className="modal-backdrop" onClick={() => setAddOpen(false)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Card</h2>
              <button className="modal-close" onClick={() => setAddOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitAdd} className="form-grid">
                <label>
                  Customer
                  <select value={addForm.user_id} onChange={(e) => setAddForm({ ...addForm, user_id: e.target.value })} required>
                    <option value="">Select customer</option>
                    {customers.map((u) => (
                      <option key={u.user_id} value={u.user_id}>{u.full_name} — {u.email}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Card UID (optional)
                  <input
                    value={addForm.card_uid}
                    onChange={(e) => setAddForm({ ...addForm, card_uid: e.target.value })}
                    placeholder="CARD-XXXX or leave empty"
                  />
                </label>

                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setAddOpen(false)}>Cancel</button>
                  <button type="submit" className="btn-primary">Create</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {rechargeOpen && (
        <div className="modal-backdrop" onClick={() => setRechargeOpen(false)}>
          <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Recharge Card</h2>
              <button className="modal-close" onClick={() => setRechargeOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitRecharge} className="form-grid">
                <label>
                  Amount (RWF)
                  <input
                    type="number"
                    min="1"
                    value={rechargeForm.amount_rwf}
                    onChange={(e) => setRechargeForm({ ...rechargeForm, amount_rwf: e.target.value })}
                    required
                  />
                </label>
                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={() => setRechargeOpen(false)}>Cancel</button>
                  <button type="submit" className="btn-primary">Recharge</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

