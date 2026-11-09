# WASAC Smart Water Billing System

A full-stack prepaid water billing platform with leak detection, AI consumption prediction, Brevo email notifications, ESP32 offline sync, QR/RFID card support, and professional admin dashboards.

## Project Structure

```
waterbill/
├── frontend/          # React + Vite dashboard
├── backend/           # Node.js + Express API
├── supabase/          # Database schema (SQL)
└── esp32-firmware/    # ESP32 offline sync example
```

## Features

| Feature | Description |
|---------|-------------|
| **Prepaid Cards** | RFID + QR identification, balance check before water fetch |
| **Pricing** | 20 RWF per milliliter — blocks fetch if insufficient balance |
| **Leak Detection** | Continuous flow & abnormal rate alerts |
| **Brevo Emails** | Low balance, recharge, disconnect, daily summary, leak alerts |
| **AI Prediction** | Monthly bill estimate, usage trends, abnormal behavior |
| **Admin Dashboard** | Revenue, consumption charts, top consumers, NRW reports |
| **Multi-Role** | Admin, Customer, WASAC Manager |
| **Customer Approval** | New customers register as pending; WASAC manager approves before sign-in |
| **Landing Page** | Public homepage with login/register and WhatsApp support |
| **PDF Reports** | Monthly bills, revenue reports |
| **ESP32 Offline** | Local buffer + batch sync when WiFi returns |

## Quick Start

### 1. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Run `supabase/migrations/001_account_status.sql` for customer approval workflow
3. Copy your URL and keys

### 2. Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase and Brevo keys
npm install
npm run dev
```

API runs at `http://localhost:5000`

### 3. Frontend

```bash
cd frontend
cp .env.example .env
# Edit .env with Supabase anon key and API URL
npm install
npm run dev
```

App runs at `http://localhost:5173`

## Environment Variables

### Backend (.env)

| Variable | Description |
|----------|-------------|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (server only) |
| `BREVO_API_KEY` | Brevo email API key |
| `ESP32_DEVICE_KEY` | Device auth header for ESP32 |
| `PRICE_PER_ML` | Default: 20 |
| `ADMIN_REGISTRATION_SECRET` | Secret to create admin/manager accounts |

### Frontend (.env)

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | `http://localhost:5000/api` |
| `VITE_SUPABASE_URL` | Supabase URL |
| `VITE_SUPABASE_ANON_KEY` | Anon key |

## API Endpoints

### Auth
- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login
- `GET /api/auth/me` — Current user

### Cards
- `GET /api/cards/my` — User's cards with QR
- `POST /api/cards/recharge` — Add balance
- `GET /api/cards/identify/:uid` — RFID/QR lookup (device)

### Water (ESP32)
- `POST /api/water/authorize` — Check balance & start session
- `POST /api/water/flow-tick` — Record flow during session
- `POST /api/water/complete` — End session & deduct balance
- `POST /api/sync/batch` — Offline event sync

### Analytics
- `GET /api/analytics/overview` — Admin KPIs
- `GET /api/analytics/predict/:userId` — AI prediction
- `GET /api/alerts/leaks` — Leak alerts

### Reports
- `GET /api/reports/bill/:userId/:year/:month` — PDF bill
- `GET /api/reports/revenue?from=&to=` — Revenue PDF

## Water Fetch Flow

```
1. ESP32 reads RFID/QR card
2. POST /api/water/authorize { card_uid, requested_ml }
3. If balance >= cost → valve opens, session created
4. During flow → POST /api/water/flow-tick (leak check runs)
5. End → POST /api/water/complete → balance deducted
6. If balance insufficient → 403 BLOCKED, no water
```

## Create Admin Account

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@wasac.rw",
    "password": "admin123",
    "fullName": "System Admin",
    "role": "admin",
    "adminSecret": "your-admin-secret"
  }'
```

Set `ADMIN_REGISTRATION_SECRET` in backend `.env`.

## ESP32 Integration

Send header: `X-Device-Key: esp32-dev-key-change-me`

See `esp32-firmware/example_sync.ino` for offline buffering example.

## Roles

| Role | Dashboard |
|------|-----------|
| `customer` | Balance, recharge, QR, usage, predictions |
| `admin` | Full analytics, users, leaks, reports |
| `wasac_manager` | NRW analytics, revenue, consumption |

## Tech Stack

- **Frontend:** React 18, Vite, Recharts, React Router
- **Backend:** Node.js, Express, PDFKit, node-cron
- **Database:** Supabase (PostgreSQL)
- **Email:** Brevo API
- **IoT:** ESP32 with SPIFFS offline buffer

## License

Academic / Project use — WASAC Smart Water Billing
