-- Phase 6: Security Hardening
-- Fixes identified during security audit
-- Run via Supabase Dashboard → SQL Editor

-- ============================================================================
-- 1. Replay Protection: Unique constraint on transaction_hash
--    Prevents the same Solana/EVM tx from being reused for multiple payments.
--    checkAndRecordSolanaSignature() relies on this for atomic deduplication.
-- ============================================================================

ALTER TABLE payment_verifications
  ADD CONSTRAINT IF NOT EXISTS payment_verifications_transaction_hash_key
  UNIQUE (transaction_hash);

COMMENT ON CONSTRAINT payment_verifications_transaction_hash_key
  ON payment_verifications
  IS 'Prevents replay attacks: each on-chain transaction can only be used once for payment';

-- ============================================================================
-- 2. Auth Nonce: Unique + consumed tracking
--    Prevents nonce reuse across authentication requests.
-- ============================================================================

-- Mark nonce as consumed after use (add column if missing)
ALTER TABLE auth_nonces
  ADD COLUMN IF NOT EXISTS consumed_at TIMESTAMPTZ;

-- Unique constraint so each nonce can only exist once per wallet
ALTER TABLE auth_nonces
  ADD CONSTRAINT IF NOT EXISTS auth_nonces_nonce_key
  UNIQUE (nonce);

-- Function: consume a nonce atomically (returns true if nonce was valid and unused)
CREATE OR REPLACE FUNCTION consume_auth_nonce(
  p_wallet_address TEXT,
  p_nonce TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  v_nonce_id UUID;
BEGIN
  SELECT id INTO v_nonce_id
  FROM auth_nonces
  WHERE nonce = p_nonce
    AND wallet_address = p_wallet_address
    AND consumed = FALSE
    AND consumed_at IS NULL
    AND expires_at > NOW();

  IF v_nonce_id IS NULL THEN
    RETURN FALSE;
  END IF;

  UPDATE auth_nonces
  SET consumed = TRUE,
      consumed_at = NOW()
  WHERE id = v_nonce_id;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION consume_auth_nonce IS
  'Atomically validates and consumes a nonce. Returns false if expired, already used, or not found.';

-- ============================================================================
-- 3. Cleanup: Remove expired/consumed nonces older than 24h
-- ============================================================================

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

-- ============================================================================
-- 4. Indexes for performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_payment_verifications_tx_hash
  ON payment_verifications(transaction_hash);

CREATE INDEX IF NOT EXISTS idx_auth_nonces_nonce
  ON auth_nonces(nonce);

CREATE INDEX IF NOT EXISTS idx_auth_nonces_wallet_consumed
  ON auth_nonces(wallet_address, consumed);

-- ============================================================================
-- Migration log
-- ============================================================================

INSERT INTO platform_analytics (metric_type, metric_value, metadata, recorded_at)
VALUES (
  'migration', 1,
  jsonb_build_object(
    'phase', 'phase6-security-hardening',
    'description', 'Replay attack prevention + nonce hardening',
    'changes', jsonb_build_array(
      'UNIQUE constraint on payment_verifications.transaction_hash',
      'UNIQUE constraint on auth_nonces.nonce',
      'consume_auth_nonce() atomic function',
      'cleanup_auth_nonces() maintenance function'
    )
  ),
  NOW()
);
