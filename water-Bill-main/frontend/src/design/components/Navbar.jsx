import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#features', label: 'Features' },
  { href: '#stats', label: 'Impact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('landing-menu-open', open);
    return () => document.body.classList.remove('landing-menu-open');
  }, [open]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header className="landing-nav">
        <div className="landing-nav-inner">
          <Link to="/" className="landing-logo" onClick={close}>
            <span className="landing-logo-icon" aria-hidden="true">
              SW
            </span>
            <span className="landing-logo-text">
              <strong>Smart Water Bill</strong>
              <span>Prepaid billing</span>
            </span>
          </Link>

          <nav className="landing-nav-links" aria-label="Main">
            {NAV_LINKS.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="landing-nav-actions">
            <Link to="/login" className="landing-nav-signin">
              Sign In
            </Link>
            <Link to="/register" className="landing-nav-register">
              Register
            </Link>
          </div>

          <button
            type="button"
            className={`landing-hamburger-btn ${open ? 'is-open' : ''}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        className={`landing-drawer-backdrop ${open ? 'is-open' : ''}`}
        onClick={close}
        aria-hidden={!open}
      />

      <aside className={`landing-drawer ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="landing-drawer-head">
          <span className="landing-drawer-title">Menu</span>
          <button type="button" className="landing-drawer-close" onClick={close} aria-label="Close">
            ×
          </button>
        </div>
        <nav>
          {NAV_LINKS.map((item) => (
            <a key={item.href} href={item.href} onClick={close}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="landing-drawer-footer">
          <Link to="/login" className="landing-nav-signin" onClick={close}>
            Sign In
          </Link>
          <Link to="/register" className="landing-nav-register" onClick={close}>
            Register
          </Link>
        </div>
      </aside>
    </>
  );
}
