i c-- WASAC Smart Water Billing - Supabase Schema
-- Run this in Supabase SQL Editor

-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('admin', 'customer', 'wasac_manager')),
  account_status TEXT NOT NULL DEFAULT 'approved' CHECK (account_status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prepaid water cards (RFID + QR)
CREATE TABLE IF NOT EXISTS cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_uid TEXT UNIQUE NOT NULL,
  qr_token TEXT UNIQUE NOT NULL,
  balance_rwf NUMERIC(12,2) DEFAULT 0 CHECK (balance_rwf >= 0),
  is_active BOOLEAN DEFAULT TRUE,
  last_seen_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Water meters / distribution points
CREATE TABLE IF NOT EXISTS meters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  location TEXT,
  esp32_device_id TEXT UNIQUE,
  flow_rate_threshold NUMERIC DEFAULT 50,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Water fetch sessions
CREATE TABLE IF NOT EXISTS water_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id UUID REFERENCES cards(id) ON DELETE SET NULL,
  meter_id UUID REFERENCES meters(id) ON DELETE SET NULL,
  volume_ml INTEGER DEFAULT 0,
  requested_ml INTEGER,
  reserved_cost_rwf NUMERIC(12,2),
  cost_rwf NUMERIC(12,2) DEFAULT 0,
  refund_rwf NUMERIC(12,2) DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','active','completed','blocked','leak_suspected')),
  device_id TEXT,
  last_flow_rate NUMERIC,
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Card recharges
CREATE TABLE IF NOT EXISTS recharges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id UUID REFERENCES cards(id) ON DELETE SET NULL,
  amount_rwf NUMERIC(12,2) NOT NULL,
  method TEXT DEFAULT 'manual',
  brevo_sent BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leak detection alerts
CREATE TABLE IF NOT EXISTS leak_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  meter_id UUID REFERENCES meters(id) ON DELETE SET NULL,
  session_id UUID REFERENCES water_sessions(id) ON DELETE SET NULL,
  reason TEXT NOT NULL,
  severity TEXT DEFAULT 'medium' CHECK (severity IN ('low','medium','high','critical')),
  message TEXT,
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Daily usage aggregation
CREATE TABLE IF NOT EXISTS daily_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_ml INTEGER DEFAULT 0,
  total_rwf NUMERIC(12,2) DEFAULT 0,
  UNIQUE(user_id, date)
);

-- ESP32 offline sync queue
CREATE TABLE IF NOT EXISTS device_sync_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT NOT NULL,
  payload_json JSONB NOT NULL,
  idempotency_key TEXT UNIQUE,
  synced BOOLEAN DEFAULT FALSE,
  synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS system_controls (
  id TEXT PRIMARY KEY,
  water_fetch_enabled BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure a default row exists
INSERT INTO system_controls (id, water_fetch_enabled)
VALUES ('global', TRUE)
ON CONFLICT (id) DO NOTHING;

-- Indexes


CREATE INDEX IF NOT EXISTS idx_cards_user ON cards(user_id);

CREATE INDEX IF NOT EXISTS idx_cards_uid ON cards(card_uid);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON water_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_status ON water_sessions(status);
CREATE INDEX IF NOT EXISTS idx_daily_usage_user_date ON daily_usage(user_id, date);
CREATE INDEX IF NOT EXISTS idx_leak_alerts_resolved ON leak_alerts(resolved);
CREATE INDEX IF NOT EXISTS idx_sync_device ON device_sync_queue(device_id, synced);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE water_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE recharges ENABLE ROW LEVEL SECURITY;
ALTER TABLE leak_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE meters ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_controls ENABLE ROW LEVEL SECURITY;

-- Profiles policies

CREATE POLICY "Users read own profile" ON profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

-- Cards policies
CREATE POLICY "Users read own cards" ON cards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users update own cards" ON cards FOR UPDATE USING (auth.uid() = user_id);

-- Sessions policies
CREATE POLICY "Users read own sessions" ON water_sessions FOR SELECT USING (auth.uid() = user_id);

-- Daily usage policies
CREATE POLICY "Users read own usage" ON daily_usage FOR SELECT USING (auth.uid() = user_id);

-- Leak alerts - customers see own
CREATE POLICY "Users read own alerts" ON leak_alerts FOR SELECT USING (auth.uid() = user_id);

-- Recharges
CREATE POLICY "Users read own recharges" ON recharges FOR SELECT USING (auth.uid() = user_id);

-- System controls policies (admin-only)
-- Note: easiest approach is allow authenticated users to read/write when role = admin.
-- If your auth.jwt does not include profile.role in claims, these policies may need adjustment.
CREATE POLICY "Admins read system controls" ON system_controls FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.role = 'admin')
);

CREATE POLICY "Admins update system controls" ON system_controls FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles p WHERE p.user_id = auth.uid() AND p.role = 'admin')
);

-- Function: auto-create profile on signup (optional trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()

RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'), 'customer');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger (enable if using client-side signup instead of admin API)
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Realtime for leak alerts (enable in Supabase dashboard)
-- ALTER PUBLICATION supabase_realtime ADD TABLE leak_alerts;
