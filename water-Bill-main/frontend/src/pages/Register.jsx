import { useState } from 'react';

import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import WhatsAppButton from '../components/WhatsAppButton';



export default function Register() {

  const [form, setForm] = useState({ email: '', password: '', fullName: '', phone: '' });

  const [error, setError] = useState('');

  const [success, setSuccess] = useState('');

  const [loading, setLoading] = useState(false);

  const { register } = useAuth();



  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError('');

    setSuccess('');

    try {

      const data = await register({

        email: form.email,

        password: form.password,

        fullName: form.fullName,

        phone: form.phone,

        role: 'customer',

      });

      setSuccess(

        data.message ||

          'Registration submitted. A manager will review your account. You can sign in after approval.'

      );

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="auth-page auth-page-light">

      <div className="auth-shell">

        <div className="auth-brand-panel">

          <Link to="/" className="auth-back">← Back to home</Link>

          <h2>Smart Water Bill</h2>

          <p>Create your customer account. After registration, a manager will approve your profile before you can fetch water or recharge.</p>

          <ul className="auth-features">

            <li>Prepaid water card & QR access</li>

            <li>Real-time usage & billing</li>

            <li>Leak alerts & monthly PDF bills</li>

          </ul>

        </div>

        <div className="card auth-card">

          <h1>Customer Registration</h1>

          <p>Register to manage your prepaid water account</p>

          {error && <div className="alert-banner">{error}</div>}

          {success ? (

            <div className="success-banner">

              <p>{success}</p>

              <Link to="/login" className="btn-primary" style={{ display: 'inline-block', marginTop: 16 }}>

                Go to Sign In

              </Link>

            </div>

          ) : (

            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label>Full Name</label>

                <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} required />

              </div>

              <div className="form-group">

                <label>Email</label>

                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />

              </div>

              <div className="form-group">

                <label>Phone (for support contact)</label>

                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+250..." />

              </div>

              <div className="form-group">

                <label>Password</label>

                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} />

              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={loading}>

                {loading ? 'Submitting...' : 'Submit for Approval'}

              </button>

            </form>

          )}

          <p style={{ marginTop: 16, textAlign: 'center', fontSize: 14 }}>

            Have an account? <Link to="/login">Sign In</Link>

          </p>

        </div>

      </div>

      <WhatsAppButton />

    </div>

  );

}

