import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function AdminSystemControlPanel({ onStatus }) {
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const res = await api.adminGetWaterFetchControl();
      setEnabled(!!res.water_fetch_enabled);
    } catch (e) {
      onStatus?.({ type: 'error', message: e.message || 'Failed to load system control.' });
    }
  };

  useEffect(() => { load(); }, []);

  const toggle = async () => {
    setLoading(true);
    try {
      const next = !enabled;
      await api.adminSetWaterFetchControl({ water_fetch_enabled: next });
      setEnabled(next);
      onStatus?.({ type: 'success', message: next ? 'Water fetching started.' : 'Water fetching stopped.' });
    } catch (e) {
      onStatus?.({ type: 'error', message: e.message || 'Update failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="panel-card">
      <div className="panel-heading">System Water Fetch Control</div>

      <div className="card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(148,163,184,0.25)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ color: 'var(--muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', fontSize: 12 }}>
              Current status
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, marginTop: 8 }}>
              {enabled ? (
                <span style={{ color: 'var(--success)' }}>FETCHING ENABLED</span>
              ) : (
                <span style={{ color: 'var(--danger)' }}>FETCHING STOPPED</span>
              )}
            </div>
            <div style={{ color: 'var(--muted)', marginTop: 6, lineHeight: 1.7 }}>
              When stopped, the backend will block authorization and no ACTIVE water sessions will be created.
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={toggle} disabled={loading}>
              {loading ? 'Updating...' : enabled ? 'Stop Water Fetch' : 'Start Water Fetch'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

