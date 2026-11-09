export default function StatsSection() {
  const stats = [
    { label: 'Customers', value: '12,432' },
    { label: 'Monthly Usage (m3)', value: '85,230' },
    { label: 'Leak Alerts', value: '24' },
  ];

  return (
    <section id="stats" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="landing-stats-card reveal rounded-lg bg-slate-50 text-center shadow">
              <div className="text-sm font-semibold text-slate-500">{s.label}</div>
              <div className="mt-2 text-2xl font-extrabold text-darknavy">{s.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
