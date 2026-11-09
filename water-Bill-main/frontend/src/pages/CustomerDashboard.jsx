import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import KpiCard from '../components/KpiCard';
import QrDisplay from '../components/QrDisplay';
import LeakAlerts from '../components/LeakAlerts';
import { UsageLineChart } from '../components/UsageChart';
import { api, downloadBlob } from '../services/api';
import { useAuth } from '../context/AuthContext';

const nav = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/dashboard/recharge', label: 'Recharge' },
  { to: '/dashboard/history', label: 'History' },
];

const getSectionFromPath = (pathname) => {
  const path = pathname.split('/').filter(Boolean).pop();
  return path === 'dashboard' || !path ? 'overview' : path;
};

export default function CustomerDashboard() {
  const location = useLocation();
  const { user, profile } = useAuth();
  const [cards, setCards] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [usage, setUsage] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [selectedCard, setSelectedCard] = useState('');
  const [msg, setMsg] = useState('');
  const tab = getSectionFromPath(location.pathname);

  const load = async () => {
    try {
      const [cardsRes, predRes, usageRes, alertRes, sessRes] = await Promise.all([
        api.myCards(),
        api.predict(user?.id),
        api.myUsage(),
        api.leakAlerts(false),
        api.sessions(),
      ]);
      setCards(cardsRes.cards || []);
      setPrediction(predRes.prediction);
      setUsage(usageRes.data || []);
      setAlerts(alertRes.alerts || []);
      setSessions(sessRes.sessions || []);
      if (cardsRes.cards?.[0]) setSelectedCard(cardsRes.cards[0].id);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { load(); }, [user]);

  const handleRecharge = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await api.recharge({ card_id: selectedCard, amount_rwf: parseFloat(rechargeAmount) });
      setMsg('Recharge successful! Check your email.');
      setRechargeAmount('');
      load();
    } catch (err) {
      setMsg(err.message);
    }
  };

  const downloadBill = async () => {
    const now = new Date();
    const blob = await api.downloadBill(user.id, now.getFullYear(), now.getMonth() + 1);
    downloadBlob(blob, `bill-${now.getMonth() + 1}.pdf`);
  };

  const primaryCard = cards[0];
  const balance = primaryCard?.balance_rwf ?? 0;
  const accountStatus = profile?.account_status || 'approved';
  const isApproved = accountStatus === 'approved';

  return (
    <Layout navItems={nav}>
      <div className="dashboard-page">
      <div className="page-hero">
        <div>
          <p className="page-badge">Customer Overview</p>
          <h1 className="page-title">My Water Account</h1>
          <p className="page-subtitle">Monitor your consumption, recharge quickly, and see your water usage at a glance.</p>
        </div>
      </div>

      {!isApproved && (
        <div className="alert-banner">
          Account status: <strong>{accountStatus}</strong>. Your account must be approved by a manager before you can recharge or fetch water.
        </div>
      )}

      <LeakAlerts alerts={alerts} />

      {tab === 'overview' && (
        <section className="dashboard-section">
          <div className="kpi-grid">
            <KpiCard label="Card Balance" value={balance.toLocaleString()} suffix="RWF" variant={balance < 1000 ? 'warning' : 'success'} />
            <KpiCard label="Avg Daily Usage" value={prediction?.averageDailyMl ?? 0} suffix="ml" />
            <KpiCard label="Est. Monthly Bill" value={(prediction?.expectedMonthlyBill ?? 0).toLocaleString()} suffix="RWF" />
            <KpiCard label="Rate" value="20" suffix="RWF/ml" />
          </div>

          {prediction?.isAbnormal && (
            <div className="alert-banner">{prediction.abnormalReason}</div>
          )}

          <div className="grid-2">
            <div className="card">
              <h3 style={{ marginBottom: 16 }}>Usage Trend</h3>
              <UsageLineChart
                data={prediction?.chartData || usage.map((u) => ({ date: u.date, total_ml: u.total_ml }))}
                dataKey={prediction?.chartData ? 'ml' : 'total_ml'}
              />
            </div>
            <div className="card">
              <h3 style={{ marginBottom: 16 }}>My QR Code</h3>
              <QrDisplay card={primaryCard} />
              <button className="btn-secondary" style={{ width: '100%', marginTop: 16 }} onClick={downloadBill}>
                Download Monthly Bill (PDF)
              </button>
            </div>
          </div>

          <div className="card section-card">
            <h3>AI Consumption Prediction</h3>
            <p className="section-text">
              Trend: <strong>{prediction?.trend || 'N/A'}</strong> | Confidence: {prediction?.confidence || 'low'} | Data points: {prediction?.dataPoints ?? 0}
            </p>
          </div>
        </section>
      )}

      {tab === 'recharge' && (
        <section className="dashboard-section">
          <div className="card section-card" style={{ maxWidth: 520 }}>
            <h3>Recharge Card</h3>
            <p className="section-text">Add money to your prepaid water card to keep your taps flowing.</p>
            {msg && <div className={msg.includes('successful') ? 'badge badge-success' : 'alert-banner'} style={{ marginBottom: 12 }}>{msg}</div>}
            <form onSubmit={handleRecharge}>
              <div className="form-group">
                <label>Card</label>
                <select value={selectedCard} onChange={(e) => setSelectedCard(e.target.value)}>
                  {cards.map((c) => (
                    <option key={c.id} value={c.id}>{c.card_uid} — {c.balance_rwf} RWF</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Amount (RWF)</label>
                <input type="number" min="100" value={rechargeAmount} onChange={(e) => setRechargeAmount(e.target.value)} required />
              </div>
              <p className="section-text" style={{ marginBottom: 12 }}>
                1000 RWF ≈ {Math.floor(1000 / 20)} ml of water
              </p>
              <button type="submit" className="btn-primary" disabled={!isApproved}>Recharge Now</button>
            </form>
          </div>
        </section>
      )}

      {tab === 'history' && (
        <section className="dashboard-section">
          <div className="card table-wrap section-card">
            <h3>Water Fetch History</h3>
            <table>
              <thead>
                <tr><th>Date</th><th>Volume (ml)</th><th>Cost (RWF)</th><th>Status</th></tr>
              </thead>
              <tbody>
                {sessions.map((s) => (
                  <tr key={s.id}>
                    <td>{new Date(s.created_at).toLocaleString()}</td>
                    <td>{s.volume_ml}</td>
                    <td>{s.cost_rwf}</td>
                    <td><span className={`badge badge-${s.status === 'completed' ? 'success' : s.status === 'blocked' ? 'danger' : 'warning'}`}>{s.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      </div>
    </Layout>
  );
}
