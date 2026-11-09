import { useState } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import WhatsAppButton from '../components/WhatsAppButton';



const friendlyErrors = {
  ACCOUNT_PENDING_APPROVAL:
    'Your account is waiting for manager approval. Please check back later or contact support.',
  ACCOUNT_REJECTED:
    'Your registration was not approved. Contact Smart Water Bill support for assistance.',
  INVALID_CREDENTIALS: 'Incorrect email or password.',
  AUTH_SERVICE_UNAVAILABLE:
    'Server cannot reach the database. Ask your administrator to check Supabase settings and restart the API.',
  PROFILE_NOT_FOUND:
    'Your login worked but the profile is missing. Run: npm run create-admin (in backend folder).',
};



export default function Login() {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const notice = location.state?.message;



  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError('');

    try {

      const data = await login(email, password);

      const role = data.profile?.role;

      if (role === 'admin') navigate('/admin');

      else if (role === 'wasac_manager') navigate('/manager');

      else navigate('/dashboard');

    } catch (err) {

      setError(friendlyErrors[err.code] || friendlyErrors[err.message] || err.message);

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="auth-page auth-page-light">

      <div className="auth-shell">

        <div className="auth-brand-panel">

          <Link to="/" className="auth-back">← Back to home</Link>

          <h2>Welcome back</h2>

          <p>Sign in to manage prepaid water, usage, recharges, and bills.</p>

        </div>

        <div className="card auth-card">

          <h1>Smart Water Bill</h1>

          <p>Sign in to your account</p>

          {notice && <div className="success-banner">{notice}</div>}

          {error && <div className="alert-banner">{error}</div>}

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label>Email</label>

              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

            </div>

            <div className="form-group">

              <label>Password</label>

              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>

              {loading ? 'Signing in...' : 'Sign In'}

            </button>

          </form>

          <p style={{ marginTop: 16, textAlign: 'center', fontSize: 14 }}>

            New customer? <Link to="/register">Register</Link>

          </p>

          {import.meta.env.DEV && (
            <div className="login-dev-hint">
              <strong>Dev admin:</strong> admin@smartwaterbill.local / Admin123!
              <br />
              <span>Run <code>npm run create-admin</code> in backend if this account is missing.</span>
            </div>
          )}

        </div>

      </div>

      <WhatsAppButton />

    </div>

  );

}

