export default function KpiCard({ label, value, variant = '', suffix = '' }) {
  return (
    <div className={`kpi-card ${variant}`}>
      <div className="label">{label}</div>
      <div className="value">
        {value}
        {suffix && <span style={{ fontSize: 14, color: 'var(--muted)' }}> {suffix}</span>}
      </div>
    </div>
  );
}
