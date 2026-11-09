import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#how' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ openModal }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-md shadow-slate-200/60 border-b border-slate-200/50'
          : 'bg-white border-b border-slate-200/70 shadow-sm'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <a
          href="#home"
          className="inline-flex shrink-0 items-center gap-3 text-lg font-black text-darknavy transition-all duration-200 hover:scale-[1.02] md:text-xl"
        >
          <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-400 text-white shadow-lg shadow-blue-200">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M12 2.5c-3.5 4.2-6 7.8-6 11.4 0 3.3 2.7 6 6 6s6-2.7 6-6c0-3.6-2.5-7.2-6-11.4Zm0 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
            </svg>
          </span>
          <span className="gradient-text">AquaPay</span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-slate-600 transition-all duration-200 hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => openModal('login')}
            className="rounded-full border-2 border-slate-200 px-5 py-2 text-sm font-bold text-darknavy transition-all duration-200 hover:border-primary hover:text-primary"
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => openModal('signup')}
            className="btn-shine rounded-full bg-gradient-to-r from-primary to-cyan-500 px-6 py-2 text-sm font-bold text-white shadow-md shadow-blue-200 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300/50 hover:-translate-y-px"
          >
            Sign Up Free
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setDrawerOpen((o) => !o)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-darknavy transition-all duration-200 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
        >
          {drawerOpen ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`overflow-hidden border-t border-slate-200/70 bg-white/95 backdrop-blur-sm transition-all duration-300 md:hidden ${
          drawerOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-5 pt-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className="block rounded-2xl px-4 py-3 text-base font-semibold text-darknavy transition-all duration-200 hover:bg-blue-50 hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => { setDrawerOpen(false); openModal('login'); }}
              className="w-full rounded-full border-2 border-slate-200 px-4 py-3 text-sm font-bold text-darknavy transition-all duration-200 hover:border-primary hover:text-primary"
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => { setDrawerOpen(false); openModal('signup'); }}
              className="btn-shine w-full rounded-full bg-gradient-to-r from-primary to-cyan-500 px-4 py-3 text-sm font-bold text-white shadow-md shadow-blue-200"
            >
              Sign Up Free
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
