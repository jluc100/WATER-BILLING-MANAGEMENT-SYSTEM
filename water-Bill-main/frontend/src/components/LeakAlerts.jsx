export default function LeakAlerts({ alerts, onResolve }) {
  if (!alerts?.length) return null;

  const active = alerts.filter((a) => !a.resolved);

  return (
    <>
      {active.map((alert) => (
        <div key={alert.id} className="alert-banner">
          <strong>Leak Alert:</strong> {alert.message || alert.reason}
          <span style={{ marginLeft: 12 }} className={`badge badge-${alert.severity === 'critical' ? 'danger' : 'warning'}`}>
            {alert.severity}
          </span>
          {onResolve && (
            <button
              className="btn-secondary"
              style={{ float: 'right', padding: '4px 12px', fontSize: 12 }}
              onClick={() => onResolve(alert.id)}
            >
              Resolve
            </button>
          )}
        </div>
      ))}
    </>
  );
}
