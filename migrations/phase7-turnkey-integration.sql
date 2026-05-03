-- Phase 7: Turnkey Integration
-- Stores the mapping between wallet addresses and Turnkey sub-organization IDs.
-- Required for 2FA verification on sensitive actions (e.g., prompt deletion).

CREATE TABLE IF NOT EXISTS user_turnkey_orgs (
  wallet_address  TEXT PRIMARY KEY,
  sub_org_id      TEXT NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE user_turnkey_orgs ENABLE ROW LEVEL SECURITY;

-- Index for lookups by sub_org_id (used during 2FA verification)
CREATE INDEX IF NOT EXISTS idx_user_turnkey_orgs_sub_org_id
  ON user_turnkey_orgs (sub_org_id);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'user_turnkey_orgs'
      AND policyname = 'Service role can manage Turnkey org mappings'
  ) THEN
    CREATE POLICY "Service role can manage Turnkey org mappings"
      ON user_turnkey_orgs
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
