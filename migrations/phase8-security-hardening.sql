-- Phase 8: security hardening for wallet auth and delete confirmations.
-- Run after the core schema files in /mnt/d/SymphoraArt have been applied.

-- One-time nonce consumption used by lib/auth.ts.
CREATE OR REPLACE FUNCTION consume_auth_nonce(
  p_wallet_address TEXT,
  p_nonce TEXT
) RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id UUID;
BEGIN
  SELECT id INTO v_id
  FROM auth_nonces
  WHERE wallet_address = lower(p_wallet_address)
    AND nonce = p_nonce
    AND consumed = FALSE
    AND expires_at > NOW()
  LIMIT 1
  FOR UPDATE;

  IF v_id IS NULL THEN
    RETURN FALSE;
  END IF;

  UPDATE auth_nonces
  SET consumed = TRUE,
      consumed_at = NOW()
  WHERE id = v_id
    AND consumed = FALSE;

  RETURN FOUND;
END;
$$;

-- Legacy Turnkey delete-token flow used by the current prompt delete API.
-- The latest recovery schema is broader, but this table is still required until
-- prompt deletion is fully migrated to passkey-stamp verification.
CREATE TABLE IF NOT EXISTS delete_confirm_tokens (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token          TEXT UNIQUE NOT NULL,
  user_email     TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  expires_at     TIMESTAMPTZ NOT NULL,
  used           BOOLEAN NOT NULL DEFAULT FALSE,
  used_at        TIMESTAMPTZ,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE delete_confirm_tokens
  ADD COLUMN IF NOT EXISTS wallet_address TEXT,
  ADD COLUMN IF NOT EXISTS used_at TIMESTAMPTZ;

UPDATE delete_confirm_tokens
SET wallet_address = 'legacy-unbound'
WHERE wallet_address IS NULL;

ALTER TABLE delete_confirm_tokens
  ALTER COLUMN wallet_address SET NOT NULL,
  ALTER COLUMN used SET DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS delete_confirm_tokens_token_wallet_idx
  ON delete_confirm_tokens(token, wallet_address)
  WHERE used = FALSE;

CREATE INDEX IF NOT EXISTS delete_confirm_tokens_expires_idx
  ON delete_confirm_tokens(expires_at);

ALTER TABLE delete_confirm_tokens ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'delete_confirm_tokens'
      AND policyname = 'Service role can manage delete confirmation tokens'
  ) THEN
    CREATE POLICY "Service role can manage delete confirmation tokens"
      ON delete_confirm_tokens
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;

-- OTP sessions used by the current email OTP Turnkey routes.
CREATE TABLE IF NOT EXISTS otp_sessions (
  otp_id          TEXT PRIMARY KEY,
  email           TEXT NOT NULL,
  organization_id TEXT NOT NULL,
  expires_at      TIMESTAMPTZ NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS otp_sessions_email_idx ON otp_sessions(email);

ALTER TABLE otp_sessions ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'otp_sessions'
      AND policyname = 'Service role can manage OTP sessions'
  ) THEN
    CREATE POLICY "Service role can manage OTP sessions"
      ON otp_sessions
      FOR ALL
      TO service_role
      USING (true)
      WITH CHECK (true);
  END IF;
END $$;
