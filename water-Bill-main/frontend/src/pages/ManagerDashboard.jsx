import { useState, useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import Layout from '../components/Layout';

import KpiCard from '../components/KpiCard';

import LeakAlerts from '../components/LeakAlerts';

import { UsageLineChart } from '../components/UsageChart';

import { api } from '../services/api';



const nav = [

  { to: '/manager', label: 'Analytics', end: true },

  { to: '/manager/approvals', label: 'Customer Approvals' },

];



const getSection = (pathname) => {

  const seg = pathname.split('/').filter(Boolean).pop();

  return seg === 'manager' ? 'analytics' : seg;

};



export default function ManagerDashboard() {

  const location = useLocation();

  const tab = getSection(location.pathname);

  const [stats, setStats] = useState(null);

  const [graph, setGraph] = useState([]);

  const [waterLoss, setWaterLoss] = useState(null);

  const [topConsumers, setTopConsumers] = useState([]);

  const [alerts, setAlerts] = useState([]);

  const [pending, setPending] = useState([]);

  const [msg, setMsg] = useState('');

  const [busyId, setBusyId] = useState(null);



  const loadAnalytics = () => {

    Promise.all([

      api.overview(),

      api.usageGraph('daily'),

      api.waterLoss(),

      api.topConsumers(),

      api.leakAlerts(false),

    ])

      .then(([o, g, w, t, a]) => {

        setStats(o.stats);

        setGraph(g.data || []);

        setWaterLoss(w.report);

        setTopConsumers(t.data || []);

        setAlerts(a.alerts || []);

      })

      .catch(console.error);

  };



  const loadPending = () => {

    api.pendingCustomers()

      .then((res) => setPending(res.users || []))

      .catch((e) => setMsg({ type: 'error', message: e.message }));

  };



  useEffect(() => {

    loadAnalytics();

    loadPending();

  }, []);



  const handleApproval = async (userId, status) => {

    setBusyId(userId);

    setMsg('');

    try {

      const res = await api.updateAccountApproval(userId, { status });

      setMsg({ type: 'success', message: res.message });

      setPending((list) => list.filter((u) => u.user_id !== userId));

    } catch (e) {

      setMsg({ type: 'error', message: e.message });

    } finally {

      setBusyId(null);

    }

  };



  return (

    <Layout navItems={nav} variant="manager">

      <div className="dashboard-page">

      <div className="page-hero">

        <div>

          <p className="page-badge">Smart Water Bill</p>

          <h1 className="page-title">

            {tab === 'approvals' ? 'Customer Approvals' : 'Manager Dashboard'}

          </h1>

          <p className="page-subtitle">

            {tab === 'approvals'

              ? 'Review new customer registrations and approve or reject their accounts.'

              : 'Monitor usage, non-revenue water, and system health across the network.'}

          </p>

        </div>

      </div>



      {msg && (

        <div className={`status-banner ${msg.type === 'error' ? 'status-error' : 'status-success'}`}>

          {msg.message}

        </div>

      )}



      {tab === 'analytics' && (

        <>

          <LeakAlerts alerts={alerts} />

          {stats && (

            <>

              <div className="kpi-grid">

                <KpiCard label="Total Revenue" value={stats.totalRevenue?.toLocaleString()} suffix="RWF" />

                <KpiCard label="Total Billed" value={stats.totalBilled?.toLocaleString()} suffix="RWF" />

                <KpiCard label="Water Distributed" value={stats.totalWaterLiters} suffix="L" />

                <KpiCard label="Pending Customers" value={pending.length} variant={pending.length ? 'warning' : 'success'} />

              </div>

              <div className="grid-2">

                <div className="card">

                  <h3 style={{ marginBottom: 16 }}>Daily Usage (7 days)</h3>

                  <UsageLineChart data={graph} />

                </div>

                <div className="card">

                  <h3>NRW — Water Loss</h3>

                  <p style={{ marginTop: 16, fontSize: 18 }}>

                    <strong>{waterLoss?.estimatedLossLiters} L</strong> estimated non-revenue water

                  </p>

                  <p className="section-text" style={{ marginTop: 8 }}>

                    Revenue loss: {waterLoss?.estimatedRevenueLoss?.toLocaleString()} RWF

                  </p>

                  <h4 style={{ marginTop: 24 }}>Top 5 Consumers</h4>

                  <ul className="consumer-list">

                    {topConsumers.slice(0, 5).map((c, i) => (

                      <li key={c.user_id}>

                        {i + 1}. {c.full_name} — {(c.total_ml / 1000).toFixed(1)} L

                      </li>

                    ))}

                  </ul>

                </div>

              </div>

            </>

          )}

        </>

      )}



      {tab === 'approvals' && (

        <div className="card table-wrap section-card">

          <h3>Pending customer accounts ({pending.length})</h3>

          <p className="section-text">Approved customers receive a water card and can sign in to recharge and fetch water.</p>

          {pending.length === 0 ? (

            <p className="section-text" style={{ marginTop: 20 }}>No pending registrations.</p>

          ) : (

            <table>

              <thead>

                <tr>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Phone</th>

                  <th>Registered</th>

                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {pending.map((u) => (

                  <tr key={u.id}>

                    <td>{u.full_name}</td>

                    <td>{u.email}</td>

                    <td>{u.phone || '—'}</td>

                    <td>{new Date(u.created_at).toLocaleString()}</td>

                    <td className="table-actions">

                      <button

                        className="btn-primary btn-sm"

                        disabled={busyId === u.user_id}

                        onClick={() => handleApproval(u.user_id, 'approved')}

                      >

                        Approve

                      </button>

                      <button

                        className="btn-danger btn-sm"

                        disabled={busyId === u.user_id}

                        onClick={() => handleApproval(u.user_id, 'rejected')}

                      >

                        Reject

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      )}

      </div>

    </Layout>

  );

}

