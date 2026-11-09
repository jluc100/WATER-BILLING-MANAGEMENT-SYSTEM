export default function QrDisplay({ card }) {
  if (!card?.qr_data_url) return <p style={{ color: 'var(--muted)' }}>No QR code available</p>;

  return (
    <div style={{ textAlign: 'center' }}>
      <img src={card.qr_data_url} alt="QR Code" style={{ width: 200, borderRadius: 8, background: '#fff', padding: 8 }} />
      <p style={{ marginTop: 12, fontSize: 12, color: 'var(--muted)' }}>Card UID: {card.card_uid}</p>
      <p style={{ fontSize: 12, color: 'var(--muted)' }}>Scan at water point or use RFID</p>
    </div>
  );
}
