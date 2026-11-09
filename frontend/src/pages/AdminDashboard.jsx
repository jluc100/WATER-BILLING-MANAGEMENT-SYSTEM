import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import KpiCard from '../components/KpiCard';
import LeakAlerts from '../components/LeakAlerts';
import Modal from '../components/Modal';
import { UsageBarChart, UsageLineChart } from '../components/UsageChart';
import { api, downloadBlob } from '../services/api';
import AdminSystemControlPanel from './AdminSystemControlPanel';
import AdminCardsPanel from './AdminCardsPanel';


const nav = [
  { to: '/admin', label: 'Overview' },
  { to: '/admin/system', label: 'System Control' },
  { to: '/admin/cards', label: 'Cards' },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/alerts', label: 'Leak Alerts' },
  { to: '/admin/reports', label: 'Reports' },
];


const getSectionFromPath = (pathname) => {
  const path = pathname.split('/').filter(Boolean).pop();
  return path === 'admin' || !path ? 'overview' : path;
};

const roleOptions = [
  { value: 'customer', label: 'Customer' },
  { value: 'wasac_manager', label: 'Manager' },
  { value: 'admin', label: 'Admin' },
];

export default function AdminDashboard() {
  const location = useLocation();
  const tab = getSectionFromPath(location.pathname);
  const { profile } = useAuth();
  const [stats, setStats] = useState(null);
  const [graph, setGraph] = useState([]);
  const [topConsumers, setTopConsumers] = useState([]);
  const [waterLoss, setWaterLoss] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState(null);
  const [newUser, setNewUser] = useState({ email: '', password: '', full_name: '', role: 'customer' });
  const [saving, setSaving] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const load = async () => {
    try {
      const [overview, graphData, top, loss, alertData, userData] = await Promise.all([
        api.overview(),
        api.usageGraph('monthly'),
        api.topConsumers(),
        api.waterLoss(),
        api.leakAlerts(false),
        api.users(),
      ]);
      setStats(overview.stats);
      setGraph(graphData.data || []);
      setTopConsumers(top.data || []);
      setWaterLoss(loss.report);
      setAlerts(alertData.alerts || []);
      setUsers(userData.users || []);
    } catch (e) {
      console.error(e);
      setStatus({ type: 'error', message: e.message || 'Failed to load dashboard data.' });
    }
  };

  useEffect(() => { load(); }, []);

  const resolveAlert = async (id) => {
    try {
      await api.resolveAlert(id);
      setStatus({ type: 'success', message: 'Alert resolved.' });
      load();
    } catch (e) {
      setStatus({ type: 'error', message: e.message });
    }
  };

  const downloadRevenue = async () => {
    try {
      const from = new Date(new Date().setDate(1)).toISOString().split('T')[0];
      const to = new Date().toISOString().split('T')[0];
      const blob = await api.downloadRevenue(from, to);
      downloadBlob(blob, `revenue-${from}.pdf`);
    } catch (e) {
      setStatus({ type: 'error', message: e.message });
    }
  };

  const saveUserRole = async (userId, role) => {
    try {
      await api.updateUserRole(userId, { role });
      setStatus({ type: 'success', message: 'User role updated.' });
      setUsers((current) => current.map((user) => (user.user_id === userId ? { ...user, role } : user)));
    } catch (e) {
      setStatus({ type: 'error', message: e.message });
    }
  };

  const deleteUser = async (userId) => {
    const confirmed = window.confirm('Delete this user? This action cannot be undone.');
    if (!confirmed) return;
    try {
      await api.deleteUser(userId);
      setStatus({ type: 'success', message: 'User deleted.' });
      setUsers((current) => current.filter((user) => user.user_id !== userId));
    } catch (e) {
      setStatus({ type: 'error', message: e.message });
    }
  };

  const openUserModal = (user = null) => {
    setEditingUser(user);
    setNewUser({
      email: user?.email || '',
      password: '',
      full_name: user?.full_name || '',
      role: user?.role || 'customer',
    });
    setShowUserModal(true);
  };

  const closeUserModal = () => {
    setShowUserModal(false);
    setEditingUser(null);
    setNewUser({ email: '', password: '', full_name: '', role: 'customer' });
  };

  const createUser = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingUser) {
        await api.updateUserRole(editingUser.user_id, { role: newUser.role });
        setStatus({ type: 'success', message: 'User role updated successfully.' });
      } else {
        await api.adminRegister({
          ...newUser,
          adminSecret: import.meta.env.VITE_ADMIN_REGISTRATION_SECRET || 'AdminSeedSecret123!',
        });
        setStatus({ type: 'success', message: 'New user created successfully.' });
      }
      closeUserModal();
      load();
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout navItems={nav}>
      <div className="dashboard-page">
      <div className="admin-page">
        <div className="admin-header-row">
          <div>
            <p className="admin-breadcrumb">Admin / {tab === 'overview' ? 'Overview' : tab === 'users' ? 'Users' : tab === 'alerts' ? 'Leak Alerts' : 'Reports'}</p>
            <h1 className="admin-heading">
              {tab === 'overview'
                ? `Welcome back, ${profile?.full_name || 'Administrator'}`
                : tab === 'users'
                ? 'User Management'
                : tab === 'alerts'
                ? 'Leak Detection'
                : 'Reports'}
            </h1>
            <p className="admin-subtitle">
              {tab === 'overview'
                ? 'Manage users, monitor water usage, and resolve leaks from one dashboard.'
                : tab === 'users'
                ? 'Create, edit, and manage users across the WASAC system.'
                : tab === 'alerts'
                ? 'Review active leak alerts and resolve potential issues quickly.'
                : 'Export reports and keep track of revenue summary data.'}
            </p>
          </div>
          <div className="admin-cta-row">
            <input className="admin-search" placeholder="Search..." />
            <button className="btn-secondary" onClick={() => openUserModal()}>
              Add User
            </button>
            <button className="btn-primary" onClick={downloadRevenue}>Export Revenue</button>
          </div>
        </div>

        {status && (
          <div className={`status-banner ${status.type === 'error' ? 'status-error' : 'status-success'}`}>
            {status.message}
          </div>
        )}

        {tab === 'overview' && (
          <>
            <div className="admin-profile-card">
              <div className="profile-details">
                <div className="profile-avatar">{profile?.full_name?.slice(0, 1) || 'A'}</div>
                <div>
                  <div className="profile-name">{profile?.full_name || 'WASAC Admin'}</div>
                  <div className="profile-meta">{profile?.email || 'admin@wasac.local'} · {profile?.role || 'admin'}</div>
                  <div className="profile-meta">Joined date: {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}</div>
                </div>
              </div>
              <div className="profile-badges">
                <span className="pill">Prepaid billing</span>
                <span className="pill">Leak monitoring</span>
                <span className="pill">Analytics</span>
              </div>
            </div>

            <div className="admin-kpi-row">
              <KpiCard label="Total Revenue" value={stats?.totalRevenue?.toLocaleString() || '0'} suffix="RWF" variant="success" />
              <KpiCard label="Water Consumed" value={stats?.totalWaterLiters?.toLocaleString() || '0'} suffix="L" />
              <KpiCard label="Active Customers" value={stats?.activeUsers || 0} />
              <KpiCard label="Open Leak Alerts" value={stats?.activeLeaks || 0} variant={stats?.activeLeaks > 0 ? 'danger' : ''} />
            </div>

            <div className="admin-grid">
              <div className="panel-card panel-wide">
                <div className="panel-heading">Usage Overview</div>
                <UsageBarChart data={graph} />
              </div>
              <div className="panel-card panel-small">
                <div className="panel-heading">Leak Risk Summary</div>
                <div className="metric-block">
                  <div className="metric-value">{waterLoss?.estimatedLossLiters || 0} L</div>
                  <div className="metric-label">Estimated water loss</div>
                </div>
                <div className="metric-block">
                  <div className="metric-value">{waterLoss?.estimatedRevenueLoss?.toLocaleString() || 0} RWF</div>
                  <div className="metric-label">Estimated loss value</div>
                </div>
                <div className="metric-block">
                  <div className="metric-value">{alerts.filter((a) => !a.resolved).length}</div>
                  <div className="metric-label">Open leak alerts</div>
                </div>
              </div>
            </div>

            <div className="admin-grid admin-grid-3">
              <div className="panel-card">
                <div className="panel-heading">Top Consumers</div>
                <table>
                  <thead>
                    <tr><th>Customer</th><th>Usage</th></tr>
                  </thead>
                  <tbody>
                    {topConsumers.slice(0, 5).map((c) => (
                      <tr key={c.user_id}>
                        <td>{c.full_name}</td>
                        <td>{c.total_ml?.toLocaleString()} ml</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="panel-card">
                <div className="panel-heading">Usage Trend</div>
                <UsageLineChart data={graph} />
              </div>
              <div className="panel-card">
                <div className="panel-heading">Alerts Snapshot</div>
                <LeakAlerts alerts={alerts} onResolve={resolveAlert} />
              </div>
            </div>
          </>
        )}

        {tab === 'system' && (
          <AdminSystemControlPanel onStatus={setStatus} />
        )}

        {tab === 'cards' && (
          <AdminCardsPanel onStatus={setStatus} />
        )}

        {tab === 'users' && (

          <div className="panel-card table-wrap">
            <div className="panel-heading users-table-header">
              <div>
                <h2>All Users</h2>
                <p className="section-text">Create, edit, or remove users directly from this list.</p>
              </div>
              <button className="btn-secondary" onClick={() => openUserModal()}>Add User</button>
            </div>
            <table>
              <thead>
                <tr><th>Name</th><th>Email</th><th>Role</th><th>Account</th><th>Joined</th><th>Action</th></tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.full_name}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '-'}</td>
                    <td>
                      <span className={`badge badge-${u.account_status === 'approved' ? 'success' : u.account_status === 'pending' ? 'warning' : 'danger'}`}>
                        {u.account_status || 'approved'}
                      </span>
                    </td>
                    <td className="table-actions">
                      <button className="btn-secondary btn-sm" onClick={() => openUserModal(u)}>Edit</button>
                      <button className="btn-secondary btn-sm" onClick={() => deleteUser(u.user_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === 'reports' && (
          <div className="panel-card">
            <div className="panel-heading">Reports</div>
            <p className="section-text">Download usage and revenue reports for your team. Use the button below to export the latest summary.</p>
            <button className="btn-primary" onClick={downloadRevenue}>Download Latest Report</button>
          </div>
        )}

        {tab === 'alerts' && (
          <div className="panel-card">
            <div className="panel-heading">Leak Detection Alerts</div>
            <table>
              <thead><tr><th>Message</th><th>Severity</th><th>Reason</th><th>Date</th><th>Action</th></tr></thead>
              <tbody>
                {alerts.map((a) => (
                  <tr key={a.id}>
                    <td>{a.message}</td>
                    <td><span className={`badge badge-${a.severity === 'critical' ? 'danger' : 'warning'}`}>{a.severity}</span></td>
                    <td>{a.reason}</td>
                    <td>{new Date(a.created_at).toLocaleDateString()}</td>
                    <td>
                      {!a.resolved && (
                        <button className="btn-secondary" onClick={() => resolveAlert(a.id)}>Resolve</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={showUserModal} onClose={closeUserModal} title={editingUser ? 'Edit User' : 'Create User'}>
        <form className="form-grid" onSubmit={createUser}>
          <label>
            Full Name
            <input
              value={newUser.full_name}
              onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
              required
              disabled={!!editingUser}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              required
              disabled={!!editingUser}
            />
          </label>
          {!editingUser && (
            <label>
              Password
              <input type="password" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required />
            </label>
          )}
          <label>
            Role
            <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
              {roleOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={closeUserModal}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving...' : editingUser ? 'Save Changes' : 'Create User'}
            </button>
          </div>
        </form>
      </Modal>
      </div>
    </Layout>
  );
}
