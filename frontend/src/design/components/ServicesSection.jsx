export default function ServicesSection() {
  const items = [
    { title: 'Prepaid Water', desc: 'Top-up and monitor meter balances with instant updates.' },
    { title: 'Leak Detection', desc: 'Automated alerts for abnormal consumption.' },
    { title: 'Analytics', desc: 'Usage trends and revenue reports for managers.' },
  ];

  return (
    <section id="features" className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center reveal" style={{ marginBottom: '1.25rem' }}>
          <h2 className="text-2xl font-black text-darknavy">Why Smart Water Bill</h2>
          <p className="mt-2 text-sm text-slate-600 max-w-xl mx-auto">Prepaid cards, real-time usage, and secure payments in one platform.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="reveal rounded-lg bg-white p-6 shadow">
              <h3 className="text-lg font-bold text-darknavy">{it.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
