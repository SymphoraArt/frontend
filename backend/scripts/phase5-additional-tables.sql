-- Phase 5: Additional Tables for Complete Implementation
-- This migration adds missing tables for reconciliation, alerts, and marketplace metadata

-- ============================================================================
-- 1. System Alerts Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS system_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  message TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMPTZ,
  resolved_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_system_alerts_type ON system_alerts(alert_type);
CREATE INDEX idx_system_alerts_severity ON system_alerts(severity);
CREATE INDEX idx_system_alerts_resolved ON system_alerts(resolved);
CREATE INDEX idx_system_alerts_created ON system_alerts(created_at);

COMMENT ON TABLE system_alerts IS 'System alerts for monitoring critical errors and events';

-- ============================================================================
-- 2. Reconciliation Queue Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS reconciliation_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_type TEXT NOT NULL CHECK (task_type IN ('earnings_update', 'prompt_stats_update', 'purchase_recording')),
  entity_id TEXT NOT NULL,
  entity_type TEXT NOT NULL CHECK (entity_type IN ('purchase', 'prompt', 'user')),
  payload JSONB NOT NULL,
  attempt_count INTEGER DEFAULT 0,
  max_attempts INTEGER DEFAULT 5,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  error TEXT,
  next_retry_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

CREATE INDEX idx_reconciliation_queue_status ON reconciliation_queue(status);
CREATE INDEX idx_reconciliation_queue_next_retry ON reconciliation_queue(next_retry_at);
CREATE INDEX idx_reconciliation_queue_task_type ON reconciliation_queue(task_type);
CREATE INDEX idx_reconciliation_queue_entity ON reconciliation_queue(entity_type, entity_id);

COMMENT ON TABLE reconciliation_queue IS 'Queue for failed operations that need retry with exponential backoff';

-- ============================================================================
-- 3. Marketplace Prompts Table (for listing metadata)
-- ============================================================================

CREATE TABLE IF NOT EXISTS marketplace_prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id TEXT NOT NULL UNIQUE,
  seller_id TEXT NOT NULL,
  price_usd_cents INTEGER NOT NULL CHECK (price_usd_cents >= 0),
  license_type TEXT NOT NULL CHECK (license_type IN ('personal', 'commercial', 'exclusive')),
  is_listed BOOLEAN DEFAULT TRUE,
  listing_status TEXT DEFAULT 'active' CHECK (listing_status IN ('active', 'inactive', 'deleted', 'suspended')),
  category TEXT,
  tags TEXT[] DEFAULT '{}',
  description TEXT,
  total_views INTEGER DEFAULT 0,
  total_sales INTEGER DEFAULT 0,
  total_revenue_cents INTEGER DEFAULT 0,
  average_rating DECIMAL(3, 2) DEFAULT 0.0,
  review_count INTEGER DEFAULT 0,
  listed_at TIMESTAMPTZ DEFAULT NOW(),
  delisted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_marketplace_prompts_prompt ON marketplace_prompts(prompt_id);
CREATE INDEX idx_marketplace_prompts_seller ON marketplace_prompts(seller_id);
CREATE INDEX idx_marketplace_prompts_listed ON marketplace_prompts(is_listed);
CREATE INDEX idx_marketplace_prompts_status ON marketplace_prompts(listing_status);
CREATE INDEX idx_marketplace_prompts_price ON marketplace_prompts(price_usd_cents);
CREATE INDEX idx_marketplace_prompts_category ON marketplace_prompts(category);
CREATE INDEX idx_marketplace_prompts_tags ON marketplace_prompts USING GIN(tags);
CREATE INDEX idx_marketplace_prompts_sales ON marketplace_prompts(total_sales DESC);
CREATE INDEX idx_marketplace_prompts_rating ON marketplace_prompts(average_rating DESC);

COMMENT ON TABLE marketplace_prompts IS 'Marketplace metadata for listed prompts (separates listing info from prompt content)';

-- ============================================================================
-- 4. Content Access Logs Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS content_access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  purchase_id UUID REFERENCES prompt_purchases(id),
  access_type TEXT NOT NULL CHECK (access_type IN ('view', 'download', 'preview')),
  access_token TEXT,
  ip_address TEXT,
  user_agent TEXT,
  accessed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_content_access_prompt ON content_access_logs(prompt_id);
CREATE INDEX idx_content_access_user ON content_access_logs(user_id);
CREATE INDEX idx_content_access_purchase ON content_access_logs(purchase_id);
CREATE INDEX idx_content_access_date ON content_access_logs(accessed_at);

COMMENT ON TABLE content_access_logs IS 'Audit trail for prompt content access';

-- ============================================================================
-- 5. Withdrawal Requests Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS withdrawal_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  amount_cents INTEGER NOT NULL CHECK (amount_cents > 0),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'rejected', 'cancelled')),
  payout_address TEXT NOT NULL,
  payout_method TEXT DEFAULT 'crypto' CHECK (payout_method IN ('crypto', 'bank', 'paypal')),
  transaction_hash TEXT,
  rejection_reason TEXT,
  requested_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_withdrawal_requests_user ON withdrawal_requests(user_id);
CREATE INDEX idx_withdrawal_requests_status ON withdrawal_requests(status);
CREATE INDEX idx_withdrawal_requests_requested ON withdrawal_requests(requested_at);

COMMENT ON TABLE withdrawal_requests IS 'Creator withdrawal/payout requests';

-- ============================================================================
-- 6. Helper Functions
-- ============================================================================

-- Update marketplace prompt stats after purchase
CREATE OR REPLACE FUNCTION update_marketplace_prompt_stats(
  p_prompt_id TEXT,
  p_revenue_cents INTEGER
) RETURNS VOID AS $$
BEGIN
  INSERT INTO marketplace_prompts (
    prompt_id,
    seller_id,
    price_usd_cents,
    license_type,
    total_sales,
    total_revenue_cents
  )
  SELECT
    p_prompt_id,
    'unknown', -- Will be updated via upsert
    0,
    'personal',
    1,
    p_revenue_cents
  WHERE NOT EXISTS (
    SELECT 1 FROM marketplace_prompts WHERE prompt_id = p_prompt_id
  );

  UPDATE marketplace_prompts
  SET
    total_sales = total_sales + 1,
    total_revenue_cents = total_revenue_cents + p_revenue_cents,
    updated_at = NOW()
  WHERE prompt_id = p_prompt_id;
END;
$$ LANGUAGE plpgsql;

-- Log content access
CREATE OR REPLACE FUNCTION log_content_access(
  p_prompt_id TEXT,
  p_user_id TEXT,
  p_purchase_id UUID,
  p_access_type TEXT,
  p_access_token TEXT DEFAULT NULL,
  p_ip_address TEXT DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
) RETURNS UUID AS $$
DECLARE
  v_log_id UUID;
BEGIN
  INSERT INTO content_access_logs (
    prompt_id,
    user_id,
    purchase_id,
    access_type,
    access_token,
    ip_address,
    user_agent
  ) VALUES (
    p_prompt_id,
    p_user_id,
    p_purchase_id,
    p_access_type,
    p_access_token,
    p_ip_address,
    p_user_agent
  ) RETURNING id INTO v_log_id;

  -- Update marketplace views count
  UPDATE marketplace_prompts
  SET
    total_views = total_views + 1,
    updated_at = NOW()
  WHERE prompt_id = p_prompt_id
    AND p_access_type = 'view';

  RETURN v_log_id;
END;
$$ LANGUAGE plpgsql;

-- Cleanup completed reconciliation tasks (run daily)
CREATE OR REPLACE FUNCTION cleanup_reconciliation_queue() RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM reconciliation_queue
  WHERE status = 'completed'
    AND completed_at < NOW() - INTERVAL '30 days';

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Get reconciliation queue stats
CREATE OR REPLACE FUNCTION get_reconciliation_stats()
RETURNS TABLE(
  status TEXT,
  count BIGINT,
  oldest_created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    rq.status,
    COUNT(*) AS count,
    MIN(rq.created_at) AS oldest_created_at
  FROM reconciliation_queue rq
  GROUP BY rq.status;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 7. Update Existing Functions
-- ============================================================================

-- Update the record_prompt_purchase function to also update marketplace stats
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
  -- Idempotency check
  SELECT id INTO v_existing_purchase
  FROM prompt_purchases
  WHERE prompt_id = p_prompt_id
    AND buyer_id = p_buyer_id
    AND status = 'completed';

  IF v_existing_purchase IS NOT NULL THEN
    RETURN QUERY SELECT v_existing_purchase, FALSE, FALSE;
    RETURN;
  END IF;

  -- Insert purchase
  INSERT INTO prompt_purchases (
    prompt_id, buyer_id, seller_id,
    amount_usd_cents, platform_fee_cents, creator_earnings_cents,
    transaction_hash, chain_id, chain_name, payment_scheme,
    status, prompt_title, prompt_preview_image_url,
    purchased_at, created_at, updated_at
  ) VALUES (
    p_prompt_id, p_buyer_id, p_seller_id,
    p_amount_usd_cents, p_platform_fee_cents, p_creator_earnings_cents,
    p_transaction_hash, p_chain_id, p_chain_name, p_payment_scheme,
    'completed', p_prompt_title, p_prompt_preview_image_url,
    NOW(), NOW(), NOW()
  ) RETURNING id INTO v_purchase_id;

  -- Update earnings
  INSERT INTO user_earnings (
    user_id, total_earnings_cents, total_sales,
    available_earnings_cents, earnings_this_month_cents,
    earnings_this_week_cents, sales_this_month,
    created_at, updated_at
  ) VALUES (
    p_seller_id, p_creator_earnings_cents, 1,
    p_creator_earnings_cents, p_creator_earnings_cents,
    p_creator_earnings_cents, 1,
    NOW(), NOW()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    total_earnings_cents = user_earnings.total_earnings_cents + p_creator_earnings_cents,
    total_sales = user_earnings.total_sales + 1,
    available_earnings_cents = user_earnings.available_earnings_cents + p_creator_earnings_cents,
    earnings_this_month_cents = user_earnings.earnings_this_month_cents + p_creator_earnings_cents,
    earnings_this_week_cents = user_earnings.earnings_this_week_cents + p_creator_earnings_cents,
    sales_this_month = user_earnings.sales_this_month + 1,
    updated_at = NOW();

  -- Update marketplace stats
  PERFORM update_marketplace_prompt_stats(p_prompt_id, p_amount_usd_cents);

  -- Record analytics
  INSERT INTO platform_analytics (metric_type, metric_value, metadata, recorded_at)
  VALUES ('purchase', 1, jsonb_build_object(
    'promptId', p_prompt_id,
    'buyerId', p_buyer_id,
    'sellerId', p_seller_id,
    'amountCents', p_amount_usd_cents,
    'chainId', p_chain_id,
    'paymentScheme', p_payment_scheme
  ), NOW());

  RETURN QUERY SELECT v_purchase_id, TRUE, TRUE;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Migration Complete
-- ============================================================================

-- Update migration log
INSERT INTO platform_analytics (
  metric_type,
  metric_value,
  metadata,
  recorded_at
) VALUES (
  'migration',
  1,
  jsonb_build_object(
    'phase', 'phase5-additional-tables',
    'description', 'Added missing tables for complete implementation',
    'tables_created', 5,
    'functions_created', 4,
    'functions_updated', 1
  ),
  NOW()
);

COMMENT ON FUNCTION update_marketplace_prompt_stats IS 'Updates marketplace stats after purchase';
COMMENT ON FUNCTION log_content_access IS 'Logs content access for audit trail';
COMMENT ON FUNCTION cleanup_reconciliation_queue IS 'Cleans up old completed reconciliation tasks';
COMMENT ON FUNCTION get_reconciliation_stats IS 'Returns statistics about reconciliation queue';
