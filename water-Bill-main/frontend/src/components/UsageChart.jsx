import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from 'recharts';

export function UsageLineChart({ data, dataKey = 'total_ml', label = 'Water (ml)' }) {
  if (!data?.length) return <p style={{ color: 'var(--muted)' }}>No usage data yet</p>;
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#243352" />
        <XAxis dataKey="date" stroke="#8fa3c0" tick={{ fontSize: 11 }} />
        <YAxis stroke="#8fa3c0" tick={{ fontSize: 11 }} />
        <Tooltip
          contentStyle={{ background: '#111b2e', border: '1px solid #243352', borderRadius: 8 }}
        />
        <Line type="monotone" dataKey={dataKey} stroke="#1d9bf0" strokeWidth={2} dot={false} name={label} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function UsageBarChart({ data, dataKey = 'total_ml' }) {
  if (!data?.length) return <p style={{ color: 'var(--muted)' }}>No data</p>;
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#243352" />
        <XAxis dataKey="date" stroke="#8fa3c0" tick={{ fontSize: 11 }} />
        <YAxis stroke="#8fa3c0" />
        <Tooltip contentStyle={{ background: '#111b2e', border: '1px solid #243352' }} />
        <Bar dataKey={dataKey} fill="#06b6d4" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
