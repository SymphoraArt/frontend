-- ============================================================================
-- Combined Supabase Migrations for SymphoraArt / Enki
-- Run all sections in sequence via the Supabase Dashboard → SQL Editor.
-- Each section is idempotent (safe to re-run).
--
-- Section 1 – Phase 6: Security Hardening
--   Replay-attack prevention on payment_verifications, nonce hardening on
--   auth_nonces, atomic consume_auth_nonce() and cleanup_auth_nonces() functions.
--
-- Section 2 – Turnkey Base Migration
--   user_turnkey_orgs (passkey EVM+Solana sub-orgs)
--   turnkey_users      (email-OTP standalone login)
--   delete_confirm_tokens (short-lived delete 2FA tokens)
--   otp_sessions       (ties otpId to email, prevents email-substitution attack)
--
-- Section 3 – Phase 7: Turnkey Integration
--   Consolidates user_turnkey_orgs with RLS policy (safe no-op if table exists).
--
-- Section 4 – Phase 8: Security Hardening (additional)
--   consume_auth_nonce() SECURITY DEFINER variant, delete_confirm_tokens column
--   additions, otp_sessions RLS.
--
-- Section 5 – Phase 9: Auth Session Tokens
--   auth_sessions table for wallet-based session tokens (replaces repeated
--   signature verification on every request). Includes prune function.
-- ============================================================================


-- ============================================================================
-- SECTION 1 – Phase 6: Security Hardening
-- ============================================================================

-- 1a. Replay Protection: Unique constraint on transaction_hash
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'payment_verifications_transaction_hash_key'
  ) THEN
    ALTER TABLE payment_verifications
      ADD CONSTRAINT payment_verifications_transaction_hash_key
      UNIQUE (transaction_hash);
  END IF;
END $$;

COMMENT ON CONSTRAINT payment_verifications_transaction_hash_key
  ON payment_verifications
  IS 'Prevents replay attacks: each on-chain transaction can only be used once for payment';

-- 1b. Auth Nonce: add consumed_at column and unique constraint
ALTER TABLE auth_nonces
  ADD COLUMN IF NOT EXISTS consumed_at TIMESTAMPTZ;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'auth_nonces_nonce_key'
  ) THEN
    ALTER TABLE auth_nonces
      ADD CONSTRAINT auth_nonces_nonce_key
      UNIQUE (nonce);
  END IF;
END $$;

-- 1c. Atomic nonce consume function
CREATE OR REPLACE FUNCTION consume_auth_nonce(
  p_wallet_address TEXT,
  p_nonce TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  v_nonce_id UUID;
BEGIN
  UPDATE auth_nonces
  SET consumed = TRUE,
      consumed_at = NOW()
  WHERE nonce = p_nonce
    AND wallet_address = p_wallet_address
    AND consumed = FALSE
    AND consumed_at IS NULL
    AND expires_at > NOW()
  RETURNING id INTO v_nonce_id;

  RETURN v_nonce_id IS NOT NULL;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION consume_auth_nonce IS
  'Atomically validates and consumes a nonce. Returns false if expired, already used, or not found.';

-- 1d. Cleanup function
CREATE OR REPLACE FUNCTION cleanup_auth_nonces() RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM auth_nonces
  WHERE expires_at < NOW() - INTERVAL '24 hours'
     OR (consumed = TRUE AND consumed_at < NOW() - INTERVAL '24 hours');

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION cleanup_auth_nonces IS
  'Removes expired and consumed nonces older than 24 hours. Run via pg_cron daily.';

-- 1e. Performance indexes
CREATE INDEX IF NOT EXISTS idx_payment_verifications_tx_hash
  ON payment_verifications(transaction_hash);

CREATE INDEX IF NOT EXISTS idx_auth_nonces_nonce
  ON auth_nonces(nonce);

CREATE INDEX IF NOT EXISTS idx_auth_nonces_wallet_consumed
  ON auth_nonces(wallet_address, consumed);


-- ============================================================================
-- SECTION 2 – Turnkey Base Migration
-- ============================================================================

-- 2a. Passkey-based Turnkey sub-orgs (linked to EVM wallet address)
CREATE TABLE IF NOT EXISTS user_turnkey_orgs (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text        UNIQUE NOT NULL,
  sub_org_id     text        UNIQUE NOT NULL,
  solana_address text,
  created_at     timestamptz DEFAULT now()
);

-- Add solana_address column if table already existed without it
ALTER TABLE user_turnkey_orgs ADD COLUMN IF NOT EXISTS solana_address text;

CREATE INDEX IF NOT EXISTS user_turnkey_orgs_wallet_idx ON user_turnkey_orgs(wallet_address);

-- Only create solana index if the column exists (safe for pre-existing tables)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_turnkey_orgs' AND column_name = 'solana_address'
  ) THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_indexes
      WHERE tablename = 'user_turnkey_orgs' AND indexname = 'user_turnkey_orgs_solana_idx'
    ) THEN
      CREATE INDEX user_turnkey_orgs_solana_idx ON user_turnkey_orgs(solana_address);
    END IF;
  END IF;
END $$;

-- 2b. Email OTP-based Turnkey users (standalone email login, no EVM wallet required)
CREATE TABLE IF NOT EXISTS turnkey_users (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email               text        UNIQUE NOT NULL,
  sub_organization_id text        UNIQUE NOT NULL,
  wallet_address      text        NOT NULL,
  wallet_id           text,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS turnkey_users_email_idx  ON turnkey_users(email);
CREATE INDEX IF NOT EXISTS turnkey_users_wallet_idx ON turnkey_users(wallet_address);

-- 2c. Short-lived delete confirmation tokens (TTL: 5 minutes)
CREATE TABLE IF NOT EXISTS delete_confirm_tokens (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  token      text        UNIQUE NOT NULL,
  user_email text        NOT NULL,
  expires_at timestamptz NOT NULL,
  used       boolean     DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS delete_confirm_tokens_token_idx ON delete_confirm_tokens(token);

-- 2d. OTP session tracking (ties otpId to the email it was issued for)
CREATE TABLE IF NOT EXISTS otp_sessions (
  otp_id          text        PRIMARY KEY,
  email           text        NOT NULL,
  organization_id text        NOT NULL,
  expires_at      timestamptz NOT NULL,
  created_at      timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS otp_sessions_email_idx ON otp_sessions(email);


-- ============================================================================
-- SECTION 3 – Phase 7: Turnkey Integration (RLS policies)
-- ============================================================================

ALTER TABLE user_turnkey_orgs ENABLE ROW LEVEL SECURITY;

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

-- Additional index for phase7 (sub_org_id lookups)
CREATE INDEX IF NOT EXISTS idx_user_turnkey_orgs_sub_org_id
  ON user_turnkey_orgs (sub_org_id);


-- ============================================================================
-- SECTION 4 – Phase 8: Security Hardening (additional)
-- ============================================================================

-- 4a. SECURITY DEFINER variant of consume_auth_nonce (safe to re-create)
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

-- 4b. delete_confirm_tokens: add missing columns (safe with IF NOT EXISTS / defaults)
ALTER TABLE delete_confirm_tokens
  ADD COLUMN IF NOT EXISTS wallet_address TEXT,
  ADD COLUMN IF NOT EXISTS used_at TIMESTAMPTZ;

UPDATE delete_confirm_tokens
SET wallet_address = 'legacy-unbound'
WHERE wallet_address IS NULL;

-- 4c. Additional indexes for delete_confirm_tokens
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

-- 4d. otp_sessions RLS
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


-- ============================================================================
-- SECTION 5 – Phase 9: Auth Session Tokens
-- ============================================================================

-- Wallet auth session tokens: issued after one-time signature verification.
-- Subsequent API calls send X-Session-Token instead of re-signing.

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
-- Call via a Supabase cron job or a manual maintenance script.
CREATE OR REPLACE FUNCTION prune_expired_auth_sessions()
RETURNS void LANGUAGE sql SECURITY DEFINER AS $$
  DELETE FROM auth_sessions WHERE expires_at < NOW() - INTERVAL '48 hours';
$$;

-- ============================================================================
-- END OF MIGRATIONS
-- NOTE: The turnkey_users table (used by /api/auth/turnkey/verify) is defined
-- in Section 2. If you encounter "relation does not exist" errors, ensure you
-- run from the top of this file, not just a section.
-- ============================================================================
