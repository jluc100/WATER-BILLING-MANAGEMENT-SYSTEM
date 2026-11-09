import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';

function ProtectedRoute({ children, roles }) {
  const { isAuthenticated, profile, loading } = useAuth();
  if (loading) return <div className="app-loading">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (roles && !roles.includes(profile?.role)) return <Navigate to="/dashboard" />;
  return children;
}

function HomeRedirect() {
  const { profile, loading } = useAuth();
  if (loading) return <div className="app-loading">Loading...</div>;
  if (profile?.role === 'admin') return <Navigate to="/admin" replace />;
  if (profile?.role === 'wasac_manager') return <Navigate to="/manager" replace />;
  return <Navigate to="/dashboard" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<ProtectedRoute><HomeRedirect /></ProtectedRoute>} />
      <Route path="/dashboard/*" element={<ProtectedRoute roles={['customer', 'admin']}><CustomerDashboard /></ProtectedRoute>} />
      <Route path="/admin/*" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/manager/*" element={<ProtectedRoute roles={['wasac_manager', 'admin']}><ManagerDashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
