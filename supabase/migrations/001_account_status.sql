-- Customer account approval (run in Supabase SQL Editor)
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS account_status TEXT NOT NULL DEFAULT 'approved'
  CHECK (account_status IN ('pending', 'approved', 'rejected'));

-- Existing customers stay approved
UPDATE profiles SET account_status = 'approved' WHERE account_status IS NULL OR account_status = '';

-- New customer registrations default to pending (handled in API)
COMMENT ON COLUMN profiles.account_status IS 'pending | approved | rejected — customers need manager approval';
