import { useState } from 'react';

/* ── Icon helpers ── */
const IconDroplet = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="white">
    <path d="M12 2C9.5 6 5 10.5 5 14.5a7 7 0 0 0 14 0C19 10.5 14.5 6 12 2Z" />
  </svg>
);

const IconUser = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.11 8.11a2 2 0 0 1 1.72-2.11l3-.5a2 2 0 0 1 2 1.15L11.83 8a2 2 0 0 1-.45 2.11l-1.47 1.39a16 16 0 0 0 6.27 6.27l1.39-1.47a2 2 0 0 1 2.11-.45l2.24.9a2 2 0 0 1 1.08 2.15Z" />
  </svg>
);

const IconLock = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const IconEye = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconEyeOff = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <path d="M1 1l22 22" />
  </svg>
);

const IconShield = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconGoogle = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84Z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z" />
  </svg>
);

const IconApple = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11Z" />
  </svg>
);

const IconMobilePhone = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="20" x="5" y="2" rx="2" />
    <path d="M12 18h.01" />
  </svg>
);

/* ── Field wrapper — handles icon tint on focus via CSS group ── */
function Field({ id, label, type = 'text', placeholder, icon, right, inputClassName = '' }) {
  return (
    <div>
      <label
        className="mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-slate-400"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="group relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-200 group-focus-within:text-[#1E88E5]">
          {icon}
        </span>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`aqua-input w-full h-12 rounded-xl bg-[#F3F6FB] pl-10 text-sm text-[#0D1B2A] placeholder:text-slate-400 ${inputClassName}`}
        />
        {right && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{right}</div>
        )}
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function LoginForm({ view = 'login', onSwitchMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isSignUp = view === 'signup';

  const handleToggleMode = () => {
    if (onSwitchMode) onSwitchMode(isSignUp ? 'login' : 'signup');
  };

  const handleSubmit = (e) => { e.preventDefault(); };

  const eyeToggleClass = 'text-slate-400 transition-colors duration-200 hover:text-[#1E88E5]';

  return (
    <div className="w-full">

      {/* ── Header ── */}
      <div className="flex flex-col items-center gap-2 text-center">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full"
          style={{ background: 'linear-gradient(135deg, #1E88E5, #42A5F5)' }}
        >
          <IconDroplet />
        </div>
        <div className="mt-1">
          <h2
            className="text-[26px] font-bold leading-tight"
            style={{ color: '#0D1B2A' }}
          >
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p
            className="mt-1.5 text-[14px] leading-relaxed"
            style={{ color: '#6B7280' }}
          >
            {isSignUp
              ? 'Set up your AquaPay account in seconds.'
              : 'Log in to manage your water bills.'}
          </p>
        </div>
      </div>

      {/* ── Form ── */}
      <form className="mt-7 space-y-4" onSubmit={handleSubmit}>

        {isSignUp && (
          <Field
            id="fullName"
            label="Full Name"
            placeholder="Jane Doe"
            icon={<IconUser />}
            inputClassName="pr-4"
          />
        )}

        <Field
          id="email"
          label={isSignUp ? 'Email Address' : 'Email or Phone Number'}
          type="text"
          placeholder="you@example.com"
          icon={<IconMail />}
          inputClassName="pr-4"
        />

        {isSignUp && (
          <Field
            id="phone"
            label="Phone Number"
            type="tel"
            placeholder="(123) 456-7890"
            icon={<IconPhone />}
            inputClassName="pr-4"
          />
        )}

        <Field
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter your password"
          icon={<IconLock />}
          inputClassName="pr-12"
          right={
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className={eyeToggleClass}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <IconEyeOff /> : <IconEye />}
            </button>
          }
        />

        {isSignUp && (
          <Field
            id="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            icon={<IconLock />}
            inputClassName="pr-12"
            right={
              <button
                type="button"
                onClick={() => setShowConfirmPassword((v) => !v)}
                className={eyeToggleClass}
                aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
              >
                {showConfirmPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            }
          />
        )}

        {!isSignUp && (
          <div className="flex justify-end">
            <button
              type="button"
              className="text-[13px] font-medium text-[#1E88E5] transition-colors duration-200 hover:text-blue-700"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {isSignUp && (
          <label className="flex items-start gap-3 text-sm text-slate-600">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-[#1E88E5]"
            />
            <span className="leading-5">
              I agree to the{' '}
              <a href="#terms" className="font-semibold text-[#1E88E5] transition-colors hover:text-blue-700">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="#privacy" className="font-semibold text-[#1E88E5] transition-colors hover:text-blue-700">
                Privacy Policy
              </a>
            </span>
          </label>
        )}

        {/* ── Primary CTA ── */}
        <button
          type="submit"
          className="btn-shine mt-1 w-full h-12 rounded-xl font-semibold text-white text-sm transition-all duration-200 hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(30,136,229,0.3)] active:scale-[0.98]"
          style={{ background: 'linear-gradient(135deg, #1E88E5, #42A5F5)' }}
        >
          {isSignUp ? 'Create Account' : 'Log In'}
        </button>
      </form>

      {/* ── "Or continue with" divider ── */}
      <div className="my-6 flex items-center gap-3">
        <div
          className="h-px flex-1"
          style={{ background: 'linear-gradient(to right, transparent, #CBD5E1)' }}
        />
        <span className="whitespace-nowrap text-[12px] text-slate-400">or continue with</span>
        <div
          className="h-px flex-1"
          style={{ background: 'linear-gradient(to left, transparent, #CBD5E1)' }}
        />
      </div>

      {/* ── Social pills ── */}
      <div className="flex gap-3">
        {[
          { label: 'Google', icon: <IconGoogle /> },
          { label: 'Apple', icon: <IconApple /> },
          { label: 'Phone', icon: <IconMobilePhone /> },
        ].map(({ label, icon }) => (
          <button
            key={label}
            type="button"
            aria-label={`Continue with ${label}`}
            className="flex h-11 flex-1 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-200 hover:border-[#1E88E5] hover:bg-blue-50 hover:text-[#1E88E5]"
          >
            {icon}
          </button>
        ))}
      </div>

      {/* ── Toggle link as pill badge ── */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={handleToggleMode}
          className="rounded-[20px] bg-[#EBF4FF] px-[14px] py-1 text-sm text-[#1E88E5] transition-transform duration-200 hover:scale-[1.03]"
        >
          {isSignUp ? 'Already have an account? Log In' : 'New user? Sign Up'}
        </button>
      </div>

      {/* ── Security footer ── */}
      <div className="mt-5 flex items-center justify-center gap-1.5 text-emerald-600">
        <IconShield />
        <span className="text-[11px]">Your data is protected with end-to-end encryption</span>
      </div>

    </div>
  );
}
