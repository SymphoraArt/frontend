-- Phase 9: Wallet auth session tokens
-- After a one-time signature+nonce verification, the server issues a session token
-- so that subsequent API calls do not require re-signing.
--
-- Run this in the Supabase SQL editor after phase8 is applied.

CREATE TABLE IF NOT EXISTS auth_sessions (
  id             UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  token          TEXT        UNIQUE NOT NULL,
  wallet_address TEXT        NOT NULL,
  wallet_type    TEXT        NOT NULL DEFAULT 'evm',
  expires_at     TIMESTAMPTZ NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS auth_sessions_token_idx
  ON auth_sessions(token);

CREATE INDEX IF NOT EXISTS auth_sessions_wallet_idx
  ON auth_sessions(wallet_address, expires_at);

ALTER TABLE auth_sessions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename   = 'auth_sessions'
      AND policyname  = 'Service role can manage auth sessions'
  ) THEN
    CREATE POLICY "Service role can manage auth sessions"
      ON auth_sessions FOR ALL TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Periodic cleanup: sessions older than 48 h are dropped automatically.
-- Call this via a Supabase cron job or a separate maintenance script.
CREATE OR REPLACE FUNCTION prune_expired_auth_sessions()
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  DELETE FROM auth_sessions WHERE expires_at < NOW() - INTERVAL '48 hours';
$$;
