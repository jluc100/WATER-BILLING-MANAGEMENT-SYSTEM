const footerLinks = {
  Product: [
    { label: 'Pay Bill', href: '#pay' },
    { label: 'Bill History', href: '#history' },
    { label: 'Reminders', href: '#reminders' },
    { label: 'Receipts', href: '#receipts' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
    { label: 'Blog', href: '#blog' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Cookie Policy', href: '#cookies' },
    { label: 'Support', href: '#support' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-darknavy text-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-10 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <div className="inline-flex items-center gap-3 text-xl font-black text-white">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-cyan-400 shadow-lg shadow-blue-900/30">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.5c-3.5 4.2-6 7.8-6 11.4 0 3.3 2.7 6 6 6s6-2.7 6-6c0-3.6-2.5-7.2-6-11.4Zm0 15.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                </svg>
              </span>
              Smart Water Bill
            </div>
            <p className="mt-4 max-w-xs text-sm leading-7 text-slate-400">
              Prepaid water billing — recharge, track usage, and pay securely anytime.
            </p>

            <div className="mt-6 flex gap-3">
              {['twitter', 'facebook', 'instagram'].map((s) => (
                <a key={s} href={`#${s}`} aria-label={s} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-slate-400 transition-all duration-200 hover:bg-primary hover:text-white">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    {s === 'twitter' && <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23Z" />}
                    {s === 'facebook' && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />}
                    {s === 'instagram' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069Zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073Zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162S8.597 18.163 12 18.163s6.162-2.759 6.162-6.162S15.403 5.838 12 5.838Zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4Zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44Z" />}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{group}</h3>
              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-slate-400 transition-all duration-200 hover:text-white hover:pl-1">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 sm:mt-14 rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 text-center md:text-left md:flex md:items-center md:justify-between gap-6">
          <div className="shrink-0">
            <h4 className="text-base font-bold text-white">Stay up to date</h4>
            <p className="mt-1 text-sm text-slate-400">Get bill reminders and product news in your inbox.</p>
          </div>
          <form className="mt-4 flex flex-col sm:flex-row gap-2 md:mt-0 md:min-w-[320px]" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="you@example.com" className="flex-1 min-w-0 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-primary focus:ring-2 focus:ring-primary/30" />
            <button type="submit" className="btn-shine shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-blue-500">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="border-t border-slate-700/60 bg-[#060f1c]">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-5 text-sm text-slate-500 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 Smart Water Bill. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/8 text-emerald-400">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            256-bit end-to-end encrypted
          </div>
        </div>
      </div>
    </footer>
  );
}
