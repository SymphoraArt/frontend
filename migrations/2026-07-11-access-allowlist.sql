-- DB-backed access whitelist (replaces the single shared TEAM_ACCESS_CODE as
-- the way in during the private-beta stage). A login with a whitelisted wallet
-- OR email is granted app access automatically (the login route sets the gate
-- cookie); anyone else is turned away to "request access". The shared code at
-- /gate still works as an admin fallback. Run once in the Supabase SQL editor.

CREATE TABLE IF NOT EXISTS access_allowlist (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind       text NOT NULL CHECK (kind IN ('email', 'wallet')),
  value      text NOT NULL,   -- email (lowercased) OR wallet address (any case; matched case-insensitively)
  note       text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- One entry per identity (case-insensitive so a wallet address matches
-- regardless of casing, and emails are unique regardless of case).
CREATE UNIQUE INDEX IF NOT EXISTS access_allowlist_kind_value_idx
  ON access_allowlist (kind, lower(value));

-- RLS on, no policies: only our server routes (service_role, which bypasses
-- RLS) read/write this.
ALTER TABLE access_allowlist ENABLE ROW LEVEL SECURITY;

-- Seed the founder's email. Add your wallet with:
--   INSERT INTO access_allowlist (kind, value, note)
--   VALUES ('wallet', 'YOUR_SOLANA_ADDRESS', 'founder') ON CONFLICT DO NOTHING;
INSERT INTO access_allowlist (kind, value, note)
VALUES ('email', 'kirikev4d@gmail.com', 'founder')
ON CONFLICT DO NOTHING;
