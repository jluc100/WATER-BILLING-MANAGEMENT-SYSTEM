import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 50000, suffix: '+', label: 'Bills Paid', icon: '📄' },
  { value: 99.9, suffix: '%', label: 'Uptime', icon: '⚡' },
  { value: 4.9, suffix: '★', label: 'App Rating', icon: '⭐' },
  { value: 24, suffix: '/7', label: 'Support', icon: '🛡️' },
];

function CountUp({ target, suffix, active }) {
  const [display, setDisplay] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const duration = 1400;
    const start = performance.now();
    const isFloat = !Number.isInteger(target);

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;
      setDisplay(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, target]);

  return (
    <span>
      {target >= 1000
        ? `${Math.floor(display / 1000)}K`
        : display}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-gradient-to-r from-primary via-blue-600 to-cyan-500 py-10 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">{s.icon}</div>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight lg:text-5xl">
                <CountUp target={s.value} suffix={s.suffix} active={visible} />
              </div>
              <div className="mt-1 sm:mt-1.5 text-xs sm:text-sm font-semibold text-blue-100 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
