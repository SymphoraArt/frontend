-- Phase 4: Critical Security Fixes Migration
-- This migration implements all critical security and consistency fixes

-- ============================================================================
-- 1. Authentication Tables
-- ============================================================================

-- Nonces for EIP-712 authentication (replay protection)
CREATE TABLE IF NOT EXISTS auth_nonces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address TEXT NOT NULL,
  nonce TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  consumed BOOLEAN DEFAULT FALSE,
  consumed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_auth_nonces_wallet ON auth_nonces(wallet_address);
CREATE INDEX idx_auth_nonces_expires ON auth_nonces(expires_at);
CREATE UNIQUE INDEX idx_auth_nonces_unique ON auth_nonces(wallet_address, nonce) WHERE consumed = FALSE;

-- User sessions
CREATE TABLE IF NOT EXISTS user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  session_token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_active_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_user_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX idx_user_sessions_expires ON user_sessions(expires_at);

-- ============================================================================
-- 2. Payment Verification Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS payment_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id UUID REFERENCES prompt_purchases(id),
  transaction_hash TEXT NOT NULL,
  chain_id INTEGER NOT NULL,
  chain_name TEXT NOT NULL,
  verified BOOLEAN NOT NULL,
  verification_method TEXT NOT NULL,
  on_chain_amount_usdc DECIMAL(20, 6),
  on_chain_recipient TEXT,
  on_chain_sender TEXT,
  block_number BIGINT,
  block_timestamp TIMESTAMPTZ,
  confirmations INTEGER,
  verification_error TEXT,
  verified_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payment_verifications_purchase ON payment_verifications(purchase_id);
CREATE INDEX idx_payment_verifications_tx ON payment_verifications(transaction_hash);
CREATE INDEX idx_payment_verifications_verified ON payment_verifications(verified);

-- ============================================================================
-- 3. Unique Constraint for Duplicate Purchase Prevention
-- ============================================================================

-- Prevent duplicate purchases (idempotency at database level)
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_prompt_purchase
ON prompt_purchases (prompt_id, buyer_id)
WHERE status = 'completed';

-- ============================================================================
-- 4. Soft Delete Support
-- ============================================================================

CREATE TABLE IF NOT EXISTS prompt_deletions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id TEXT NOT NULL UNIQUE,
  deleted_by TEXT NOT NULL,
  deletion_type TEXT NOT NULL CHECK (deletion_type IN ('soft', 'hard')),
  reason TEXT,
  purchase_count INTEGER NOT NULL DEFAULT 0,
  deleted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_prompt_deletions_prompt ON prompt_deletions(prompt_id);
CREATE INDEX idx_prompt_deletions_deleted_at ON prompt_deletions(deleted_at);

-- ============================================================================
-- 5. Reconciliation Queue for Failed Operations
-- ============================================================================

CREATE TABLE IF NOT EXISTS failed_operations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  error_message TEXT,
  attempt_count INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 5,
  next_retry_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_failed_operations_status ON failed_operations(status);
CREATE INDEX idx_failed_operations_next_retry ON failed_operations(next_retry_at);
CREATE INDEX idx_failed_operations_entity ON failed_operations(entity_type, entity_id);

-- ============================================================================
-- 6. Atomic Purchase Transaction Function
-- ============================================================================

CREATE OR REPLACE FUNCTION record_prompt_purchase(
  p_prompt_id TEXT,
  p_buyer_id TEXT,
  p_seller_id TEXT,
  p_amount_usd_cents INTEGER,
  p_platform_fee_cents INTEGER,
  p_creator_earnings_cents INTEGER,
  p_transaction_hash TEXT,
  p_chain_id INTEGER,
  p_chain_name TEXT,
  p_payment_scheme TEXT DEFAULT 'exact',
  p_prompt_title TEXT DEFAULT NULL,
  p_prompt_preview_image_url TEXT DEFAULT NULL
) RETURNS TABLE(
  purchase_id UUID,
  earnings_updated BOOLEAN,
  is_new_purchase BOOLEAN
) AS $$
DECLARE
  v_purchase_id UUID;
  v_existing_purchase UUID;
  v_is_new_purchase BOOLEAN := TRUE;
BEGIN
  -- ========================================
  -- Step 1: Idempotency Check
  -- ========================================
  SELECT id INTO v_existing_purchase
  FROM prompt_purchases
  WHERE prompt_id = p_prompt_id
    AND buyer_id = p_buyer_id
    AND status = 'completed';

  IF v_existing_purchase IS NOT NULL THEN
    -- Purchase already exists, return existing data
    RETURN QUERY SELECT v_existing_purchase, FALSE, FALSE;
    RETURN;
  END IF;

  -- ========================================
  -- Step 2: Insert Purchase Record
  -- ========================================
  INSERT INTO prompt_purchases (
    prompt_id,
    buyer_id,
    seller_id,
    amount_usd_cents,
    platform_fee_cents,
    creator_earnings_cents,
    transaction_hash,
    chain_id,
    chain_name,
    payment_scheme,
    status,
    prompt_title,
    prompt_preview_image_url,
    purchased_at,
    created_at,
    updated_at
  ) VALUES (
    p_prompt_id,
    p_buyer_id,
    p_seller_id,
    p_amount_usd_cents,
    p_platform_fee_cents,
    p_creator_earnings_cents,
    p_transaction_hash,
    p_chain_id,
    p_chain_name,
    p_payment_scheme,
    'completed',
    p_prompt_title,
    p_prompt_preview_image_url,
    NOW(),
    NOW(),
    NOW()
  ) RETURNING id INTO v_purchase_id;

  -- ========================================
  -- Step 3: Update Creator Earnings (ATOMIC INCREMENT)
  -- ========================================
  -- CRITICAL FIX: Use increment, not overwrite
  INSERT INTO user_earnings (
    user_id,
    total_earnings_cents,
    total_sales,
    available_earnings_cents,
    earnings_this_month_cents,
    earnings_this_week_cents,
    sales_this_month,
    created_at,
    updated_at
  ) VALUES (
    p_seller_id,
    p_creator_earnings_cents,
    1,
    p_creator_earnings_cents,
    p_creator_earnings_cents,
    p_creator_earnings_cents,
    1,
    NOW(),
    NOW()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    total_earnings_cents = user_earnings.total_earnings_cents + p_creator_earnings_cents,
    total_sales = user_earnings.total_sales + 1,
    available_earnings_cents = user_earnings.available_earnings_cents + p_creator_earnings_cents,
    earnings_this_month_cents = user_earnings.earnings_this_month_cents + p_creator_earnings_cents,
    earnings_this_week_cents = user_earnings.earnings_this_week_cents + p_creator_earnings_cents,
    sales_this_month = user_earnings.sales_this_month + 1,
    updated_at = NOW();

  -- ========================================
  -- Step 4: Update Platform Analytics
  -- ========================================
  INSERT INTO platform_analytics (
    metric_type,
    metric_value,
    metadata,
    recorded_at
  ) VALUES (
    'purchase',
    1,
    jsonb_build_object(
      'promptId', p_prompt_id,
      'buyerId', p_buyer_id,
      'sellerId', p_seller_id,
      'amountCents', p_amount_usd_cents,
      'chainId', p_chain_id,
      'paymentScheme', p_payment_scheme
    ),
    NOW()
  );

  -- Return success
  RETURN QUERY SELECT v_purchase_id, TRUE, TRUE;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 7. Check Existing Purchase Function (for idempotency)
-- ============================================================================

CREATE OR REPLACE FUNCTION check_existing_purchase(
  p_prompt_id TEXT,
  p_buyer_id TEXT
) RETURNS TABLE(
  exists BOOLEAN,
  purchase_id UUID,
  purchased_at TIMESTAMPTZ
) AS $$
DECLARE
  v_purchase_id UUID;
  v_purchased_at TIMESTAMPTZ;
BEGIN
  SELECT id, prompt_purchases.purchased_at
  INTO v_purchase_id, v_purchased_at
  FROM prompt_purchases
  WHERE prompt_id = p_prompt_id
    AND buyer_id = p_buyer_id
    AND status = 'completed';

  IF v_purchase_id IS NOT NULL THEN
    RETURN QUERY SELECT TRUE, v_purchase_id, v_purchased_at;
  ELSE
    RETURN QUERY SELECT FALSE, NULL::UUID, NULL::TIMESTAMPTZ;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 8. Cleanup Functions for Auth
-- ============================================================================

-- Function to clean up expired nonces
CREATE OR REPLACE FUNCTION cleanup_expired_nonces()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM auth_nonces
  WHERE expires_at < NOW()
     OR (consumed = TRUE AND consumed_at < NOW() - INTERVAL '1 day');

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to clean up expired sessions
CREATE OR REPLACE FUNCTION cleanup_expired_sessions()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM user_sessions
  WHERE expires_at < NOW();

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 9. Helper Function for Incrementing Listed Count
-- ============================================================================

CREATE OR REPLACE FUNCTION increment_user_prompts_listed(
  p_user_id TEXT
) RETURNS VOID AS $$
BEGIN
  INSERT INTO user_earnings (
    user_id,
    total_prompts_listed,
    created_at,
    updated_at
  ) VALUES (
    p_user_id,
    1,
    NOW(),
    NOW()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    total_prompts_listed = user_earnings.total_prompts_listed + 1,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 10. Validation Constraints
-- ============================================================================

-- Add check constraints for data integrity
ALTER TABLE prompt_purchases
  ADD CONSTRAINT check_positive_amounts
  CHECK (amount_usd_cents >= 0 AND platform_fee_cents >= 0 AND creator_earnings_cents >= 0);

ALTER TABLE prompt_purchases
  ADD CONSTRAINT check_amount_split
  CHECK (amount_usd_cents = platform_fee_cents + creator_earnings_cents);

ALTER TABLE user_earnings
  ADD CONSTRAINT check_positive_earnings
  CHECK (
    total_earnings_cents >= 0 AND
    total_sales >= 0 AND
    available_earnings_cents >= 0 AND
    pending_earnings_cents >= 0
  );

-- ============================================================================
-- Migration Complete
-- ============================================================================

-- Log migration completion
INSERT INTO platform_analytics (
  metric_type,
  metric_value,
  metadata,
  recorded_at
) VALUES (
  'migration',
  1,
  jsonb_build_object(
    'phase', 'phase4-security-fixes',
    'description', 'Critical security and consistency fixes deployed',
    'tables_created', 5,
    'functions_created', 4,
    'constraints_added', 3
  ),
  NOW()
);

COMMENT ON TABLE auth_nonces IS 'Nonces for EIP-712 wallet authentication with replay protection';
COMMENT ON TABLE user_sessions IS 'Active user sessions after successful wallet authentication';
COMMENT ON TABLE payment_verifications IS 'On-chain verification records for all purchases';
COMMENT ON TABLE prompt_deletions IS 'Soft delete records for prompts with existing purchases';
COMMENT ON TABLE failed_operations IS 'Reconciliation queue for failed database operations';

COMMENT ON FUNCTION record_prompt_purchase IS 'Atomic transaction function for recording purchases with earnings updates';
COMMENT ON FUNCTION check_existing_purchase IS 'Idempotency check for duplicate purchase prevention';
COMMENT ON FUNCTION cleanup_expired_nonces IS 'Removes expired nonces (run via cron)';
COMMENT ON FUNCTION cleanup_expired_sessions IS 'Removes expired sessions (run via cron)';
