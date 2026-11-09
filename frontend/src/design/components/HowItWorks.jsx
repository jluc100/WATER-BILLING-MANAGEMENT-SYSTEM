import { useRevealAll } from '../hooks/useInView';

const steps = [
  {
    step: '01',
    title: 'Enter Your Account',
    description: 'Type your customer or meter ID. We fetch your latest bill instantly from the utility database.',
    color: 'bg-blue-100 text-blue-600',
    border: 'border-blue-200',
    glow: 'shadow-blue-100',
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="10" width="32" height="28" rx="4" />
        <path d="M16 20h16M16 26h10" />
        <circle cx="36" cy="34" r="8" fill="#EBF5FF" stroke="#1E88E5" strokeWidth="2" />
        <path d="M33 34h6M36 31v6" stroke="#1E88E5" strokeWidth="2" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'View Your Bill',
    description: 'See your meter reading, usage breakdown, due date, and total amount — all in one clean screen.',
    color: 'bg-emerald-100 text-emerald-600',
    border: 'border-emerald-200',
    glow: 'shadow-emerald-100',
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="6" width="28" height="36" rx="4" />
        <path d="M16 16h16M16 22h12M16 28h8M28 30l5 5 7-9" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Pay Securely',
    description: 'Choose card, UPI, or wallet. Payment is confirmed instantly with a digital receipt sent to you.',
    color: 'bg-violet-100 text-violet-600',
    border: 'border-violet-200',
    glow: 'shadow-violet-100',
    icon: (
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="14" width="36" height="24" rx="4" />
        <path d="M6 20h36" />
        <rect x="12" y="26" width="8" height="5" rx="2" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" />
        <path d="M26 28h10" />
        <circle cx="36" cy="36" r="8" fill="#E8F5E9" stroke="#4CAF50" strokeWidth="2" />
        <polyline points="33,36 35,38.5 40,33" stroke="#4CAF50" strokeWidth="2.5" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const sectionRef = useRevealAll(0.12);

  return (
    <section id="how-it-works" className="bg-white" ref={sectionRef}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center reveal">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            How It Works
          </span>
          <h2 className="mt-4 text-2xl sm:text-3xl font-black leading-tight text-darknavy md:text-4xl lg:text-5xl">Three Steps to Pay Your Bill</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-8 text-slate-500">No paperwork, no queues. Just fast, secure water bill payments in minutes.</p>
        </div>

        <div className="relative mt-10 sm:mt-16 grid gap-8 md:grid-cols-3">
          <div className="absolute left-1/2 top-16 hidden h-px w-2/3 -translate-x-1/2 border-t-2 border-dashed border-slate-200 md:block" />

          {steps.map((s, i) => (
            <div key={s.step} className={`reveal stagger-${i + 1} relative flex flex-col items-center text-center`}>
              <div className="relative">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${s.color} border-2 ${s.border} shadow-xl ${s.glow}`}>{s.icon}</div>
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-darknavy text-[10px] font-black text-white">{s.step}</span>
              </div>

              <h3 className="mt-6 text-xl font-bold text-darknavy">{s.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500 max-w-xs">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center reveal stagger-4">
          <a href="/register" className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-bold text-white shadow-lg shadow-blue-200 transition-all duration-200 hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-xl no-underline">Create Your Account</a>
        </div>
      </div>
    </section>
  );
}
