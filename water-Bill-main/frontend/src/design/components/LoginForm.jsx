import React, { useState } from 'react';

export default function LoginForm({ view = 'login', onSwitchMode = () => {} }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: real auth handled by main app
    alert('This is a demo form — authentication is handled elsewhere.');
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">{view === 'login' ? 'Sign in' : 'Create account'}</h3>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded border p-2" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full rounded border p-2" />
        <div className="flex items-center justify-between">
          <button className="rounded bg-primary px-4 py-2 text-white">{view === 'login' ? 'Sign in' : 'Register'}</button>
          <button type="button" onClick={() => onSwitchMode(view === 'login' ? 'register' : 'login')} className="text-sm text-slate-600">{view === 'login' ? 'Create account' : 'Have an account? Sign in'}</button>
        </div>
      </form>
    </div>
  );
}
