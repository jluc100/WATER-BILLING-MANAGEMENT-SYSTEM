import { Link } from 'react-router-dom';
import { useRevealAll } from '../hooks/useInView';

export default function CTASection() {
  const sectionRef = useRevealAll(0.15);

  return (
    <section className="landing-cta-section relative overflow-hidden bg-gradient-to-br from-primary via-blue-600 to-cyan-500" ref={sectionRef}>
      <div className="pointer-events-none absolute -top-16 -left-16 h-72 w-72 rounded-full bg-white opacity-5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-cyan-300 opacity-10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Get Started Today
          </span>
        </div>

        <h2 className="reveal mt-5 sm:mt-6 text-2xl sm:text-4xl font-black leading-tight text-white md:text-5xl stagger-1">
          Ready to Simplify Your
          <br />
          <span className="text-cyan-200">Water Bill Payments?</span>
        </h2>

        <p className="reveal mt-4 sm:mt-5 text-sm sm:text-lg leading-7 sm:leading-8 text-blue-100 max-w-2xl mx-auto stagger-2">
          Join 50,000+ households already saving time. Set up your account in under 60 seconds — no credit card required.
        </p>

        <div className="reveal mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center stagger-3">
          <Link
            to="/register"
            className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 sm:px-9 sm:py-4 text-sm sm:text-base font-black text-primary shadow-2xl transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
          >
            Register as Customer
          </Link>
          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 bg-white/10 px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-bold text-white backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white/20 hover:-translate-y-0.5 active:scale-95"
          >
            Sign In
          </Link>
        </div>

        <div className="reveal mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-blue-100 stagger-4">
          {['No credit card required', 'Free forever plan', 'Cancel anytime'].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 13 4 4L19 7" />
              </svg>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
