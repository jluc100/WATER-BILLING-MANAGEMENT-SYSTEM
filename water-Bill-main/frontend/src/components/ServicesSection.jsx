import { useRevealAll } from '../hooks/useInView';

const services = [
  {
    title: 'Instant Bill Fetch',
    description: 'Retrieve your current water bill by entering your customer ID. No waiting.',
    bg: 'bg-blue-50',
    iconBg: 'bg-blue-100 text-blue-600',
    border: 'border-blue-100',
    hover: 'hover:shadow-blue-100',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15V6a2 2 0 0 0-2-2H7l-2 2H5a2 2 0 0 0-2 2v9" />
        <path d="M7 10h8M7 14h5M7 18h8" />
        <path d="M15 3v4" />
      </svg>
    ),
  },
  {
    title: 'Secure Online Payment',
    description: 'Pay using card, UPI, or wallet with encrypted, safe transactions.',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100 text-emerald-600',
    border: 'border-emerald-100',
    hover: 'hover:shadow-emerald-100',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'Payment History',
    description: 'Access all past payments and download receipts anytime.',
    bg: 'bg-violet-50',
    iconBg: 'bg-violet-100 text-violet-600',
    border: 'border-violet-100',
    hover: 'hover:shadow-violet-100',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
  },
  {
    title: 'Due Date Reminders',
    description: 'Get notified before your bill is due so you never miss a payment.',
    bg: 'bg-amber-50',
    iconBg: 'bg-amber-100 text-amber-600',
    border: 'border-amber-100',
    hover: 'hover:shadow-amber-100',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    title: 'Mobile Friendly',
    description: 'Fully responsive design. Works perfectly on phone, tablet, and desktop.',
    bg: 'bg-pink-50',
    iconBg: 'bg-pink-100 text-pink-600',
    border: 'border-pink-100',
    hover: 'hover:shadow-pink-100',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
    ),
  },
  {
    title: '24 / 7 Access',
    description: 'Check and pay your bill anytime. No office hours, no delays.',
    bg: 'bg-teal-50',
    iconBg: 'bg-teal-100 text-teal-600',
    border: 'border-teal-100',
    hover: 'hover:shadow-teal-100',
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  const sectionRef = useRevealAll(0.1);

  return (
    <section id="services" className="bg-softwhite py-14 sm:py-24" ref={sectionRef}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center reveal">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Our Services
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-black leading-tight text-darknavy md:text-4xl lg:text-5xl">
            Everything You Need for
            <br />
            <span className="gradient-text">Water Bills</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-8 text-slate-500">
            Fast bill lookup and secure online payments in one place.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.title}
              className={`reveal stagger-${(i % 3) + 1} group relative overflow-hidden rounded-3xl border ${s.border} ${s.bg} p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${s.hover}`}
            >
              {/* Icon */}
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${s.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                {s.icon}
              </div>

              {/* Content */}
              <h3 className="mt-5 text-lg font-bold text-darknavy">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-7 text-slate-500">{s.description}</p>

              {/* Subtle arrow on hover */}
              <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                Learn more
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>

              {/* Decorative corner blob */}
              <div className="pointer-events-none absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-current opacity-5 transition-transform duration-300 group-hover:scale-150" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
