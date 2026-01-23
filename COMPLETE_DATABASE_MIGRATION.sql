-- ============================================================================
-- COMPLETE DATABASE MIGRATION FOR SYMPHORA
-- ============================================================================
-- This is a comprehensive migration script that includes ALL database changes
-- Run this entire script in your Supabase SQL Editor
-- Date: 2026-01-10
-- ============================================================================

-- ============================================================================
-- PHASE 1: FOUNDATION MVP - Core Marketplace Schema
-- ============================================================================

-- 1. PROMPT PURCHASES TABLE
CREATE TABLE IF NOT EXISTS prompt_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prompt_id TEXT NOT NULL,
    buyer_id TEXT NOT NULL,
    seller_id TEXT NOT NULL,
    amount_usd_cents INTEGER NOT NULL,
    platform_fee_cents INTEGER NOT NULL,
    creator_earnings_cents INTEGER NOT NULL,
    transaction_hash TEXT,
    chain_id INTEGER NOT NULL,
    chain_name TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'completed', 'refunded', 'disputed')),
    payment_scheme TEXT DEFAULT 'exact',
    prompt_title TEXT,
    prompt_preview_image_url TEXT,
    ip_address TEXT,
    user_agent TEXT,
    purchased_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    refunded_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_purchases_buyer ON prompt_purchases(buyer_id);
CREATE INDEX IF NOT EXISTS idx_purchases_seller ON prompt_purchases(seller_id);
CREATE INDEX IF NOT EXISTS idx_purchases_prompt ON prompt_purchases(prompt_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON prompt_purchases(status);
CREATE INDEX IF NOT EXISTS idx_purchases_created ON prompt_purchases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_purchases_completed ON prompt_purchases(completed_at) WHERE completed_at IS NOT NULL;

-- 2. USER EARNINGS TABLE
CREATE TABLE IF NOT EXISTS user_earnings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL UNIQUE,
    total_earnings_cents INTEGER NOT NULL DEFAULT 0,
    total_sales INTEGER NOT NULL DEFAULT 0,
    total_prompts_listed INTEGER NOT NULL DEFAULT 0,
    pending_earnings_cents INTEGER NOT NULL DEFAULT 0,
    available_earnings_cents INTEGER NOT NULL DEFAULT 0,
    withdrawn_earnings_cents INTEGER NOT NULL DEFAULT 0,
    earnings_this_month_cents INTEGER NOT NULL DEFAULT 0,
    earnings_this_week_cents INTEGER NOT NULL DEFAULT 0,
    sales_this_month INTEGER NOT NULL DEFAULT 0,
    earnings_last_7d_cents INTEGER NOT NULL DEFAULT 0,
    earnings_last_30d_cents INTEGER NOT NULL DEFAULT 0,
    sales_last_7d INTEGER NOT NULL DEFAULT 0,
    sales_last_30d INTEGER NOT NULL DEFAULT 0,
    best_selling_prompt_id TEXT,
    avg_sale_price_cents INTEGER DEFAULT 0,
    conversion_rate DECIMAL(5,4) DEFAULT 0,
    total_views INTEGER NOT NULL DEFAULT 0,
    total_unlocks INTEGER NOT NULL DEFAULT 0,
    last_activity_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    last_sale_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_earnings_user ON user_earnings(user_id);
CREATE INDEX IF NOT EXISTS idx_earnings_total ON user_earnings(total_earnings_cents DESC);
CREATE INDEX IF NOT EXISTS idx_earnings_month ON user_earnings(earnings_this_month_cents DESC);

-- 3. ENHANCED GENERATIONS TABLE
ALTER TABLE generations
ADD COLUMN IF NOT EXISTS source_prompt_id TEXT,
ADD COLUMN IF NOT EXISTS prompt_creator_id TEXT,
ADD COLUMN IF NOT EXISTS prompt_price_paid_cents INTEGER,
ADD COLUMN IF NOT EXISTS is_from_purchased_prompt BOOLEAN DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_generations_source_prompt ON generations(source_prompt_id) WHERE source_prompt_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_generations_creator ON generations(prompt_creator_id) WHERE prompt_creator_id IS NOT NULL;

-- 4. PLATFORM ANALYTICS TABLE (for migration logging and metrics)
CREATE TABLE IF NOT EXISTS platform_analytics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    metric_type TEXT NOT NULL,
    metric_value NUMERIC NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_platform_analytics_type ON platform_analytics(metric_type, recorded_at DESC);

-- ============================================================================
-- PHASE 2: DENORMALIZATION - Performance Optimization
-- ============================================================================

-- Denormalized columns already added above in prompt_purchases

-- ============================================================================
-- PHASE 3: ANALYTICS - Event Tracking
-- ============================================================================

-- 1. ANALYTICS EVENTS TABLE
CREATE TABLE IF NOT EXISTS prompt_analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type TEXT NOT NULL
        CHECK (event_type IN (
            'view', 'preview_click', 'unlock_intent', 'unlock',
            'generation', 'rating', 'share', 'favorite', 'download'
        )),
    user_id TEXT,
    session_id TEXT,
    prompt_id TEXT,
    creator_id TEXT,
    referrer TEXT,
    source TEXT DEFAULT 'marketplace',
    campaign TEXT,
    user_agent TEXT,
    ip_hash TEXT,
    country TEXT,
    device_type TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    event_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_events_type_time ON prompt_analytics_events(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_time ON prompt_analytics_events(user_id, created_at DESC) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_analytics_events_prompt_time ON prompt_analytics_events(prompt_id, created_at DESC) WHERE prompt_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_analytics_events_creator ON prompt_analytics_events(creator_id, created_at DESC) WHERE creator_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_analytics_events_source ON prompt_analytics_events(source, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON prompt_analytics_events(session_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_time_range ON prompt_analytics_events(created_at DESC, event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_user_behavior ON prompt_analytics_events(user_id, event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_geo ON prompt_analytics_events(country, created_at DESC) WHERE country IS NOT NULL;

-- 2. ENHANCED PROMPTS TABLE (if prompts table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'prompts') THEN
        ALTER TABLE prompts
        ADD COLUMN IF NOT EXISTS total_views INTEGER NOT NULL DEFAULT 0,
        ADD COLUMN IF NOT EXISTS total_unlocks INTEGER NOT NULL DEFAULT 0,
        ADD COLUMN IF NOT EXISTS total_generations INTEGER NOT NULL DEFAULT 0,
        ADD COLUMN IF NOT EXISTS avg_rating DECIMAL(3,2) DEFAULT 0,
        ADD COLUMN IF NOT EXISTS rating_count INTEGER NOT NULL DEFAULT 0,
        ADD COLUMN IF NOT EXISTS conversion_rate DECIMAL(5,4) DEFAULT 0,
        ADD COLUMN IF NOT EXISTS last_analytics_update TIMESTAMP WITH TIME ZONE DEFAULT NOW();

        CREATE INDEX IF NOT EXISTS idx_prompts_views ON prompts(total_views DESC) WHERE is_listed = true;
        CREATE INDEX IF NOT EXISTS idx_prompts_rating ON prompts(avg_rating DESC, rating_count DESC) WHERE is_listed = true;
        CREATE INDEX IF NOT EXISTS idx_prompts_conversion ON prompts(conversion_rate DESC) WHERE is_listed = true;
    END IF;
END $$;

-- ============================================================================
-- PHASE 4: SECURITY & AUTHENTICATION
-- ============================================================================

-- 1. AUTHENTICATION TABLES
CREATE TABLE IF NOT EXISTS auth_nonces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address TEXT NOT NULL,
    nonce TEXT NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    consumed BOOLEAN DEFAULT FALSE,
    consumed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_auth_nonces_wallet ON auth_nonces(wallet_address);
CREATE INDEX IF NOT EXISTS idx_auth_nonces_expires ON auth_nonces(expires_at);
CREATE UNIQUE INDEX IF NOT EXISTS idx_auth_nonces_unique ON auth_nonces(wallet_address, nonce) WHERE consumed = FALSE;

CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    wallet_address TEXT NOT NULL,
    session_token TEXT NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_active_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_sessions_user ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires ON user_sessions(expires_at);

-- 2. PAYMENT VERIFICATION TABLE
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

CREATE INDEX IF NOT EXISTS idx_payment_verifications_purchase ON payment_verifications(purchase_id);
CREATE INDEX IF NOT EXISTS idx_payment_verifications_tx ON payment_verifications(transaction_hash);
CREATE INDEX IF NOT EXISTS idx_payment_verifications_verified ON payment_verifications(verified);

-- 3. PROMPT DELETIONS TABLE
CREATE TABLE IF NOT EXISTS prompt_deletions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    prompt_id TEXT NOT NULL UNIQUE,
    deleted_by TEXT NOT NULL,
    deletion_type TEXT NOT NULL CHECK (deletion_type IN ('soft', 'hard')),
    reason TEXT,
    purchase_count INTEGER NOT NULL DEFAULT 0,
    deleted_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_prompt_deletions_prompt ON prompt_deletions(prompt_id);
CREATE INDEX IF NOT EXISTS idx_prompt_deletions_deleted_at ON prompt_deletions(deleted_at);

-- 4. FAILED OPERATIONS TABLE
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

CREATE INDEX IF NOT EXISTS idx_failed_operations_status ON failed_operations(status);
CREATE INDEX IF NOT EXISTS idx_failed_operations_next_retry ON failed_operations(next_retry_at);
CREATE INDEX IF NOT EXISTS idx_failed_operations_entity ON failed_operations(entity_type, entity_id);

-- ============================================================================
-- PHASE 5: ADDITIONAL TABLES
-- ============================================================================

-- 1. SYSTEM ALERTS TABLE
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

CREATE INDEX IF NOT EXISTS idx_system_alerts_type ON system_alerts(alert_type);
CREATE INDEX IF NOT EXISTS idx_system_alerts_severity ON system_alerts(severity);
CREATE INDEX IF NOT EXISTS idx_system_alerts_resolved ON system_alerts(resolved);
CREATE INDEX IF NOT EXISTS idx_system_alerts_created ON system_alerts(created_at);

-- 2. RECONCILIATION QUEUE TABLE
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

CREATE INDEX IF NOT EXISTS idx_reconciliation_queue_status ON reconciliation_queue(status);
CREATE INDEX IF NOT EXISTS idx_reconciliation_queue_next_retry ON reconciliation_queue(next_retry_at);
CREATE INDEX IF NOT EXISTS idx_reconciliation_queue_task_type ON reconciliation_queue(task_type);
CREATE INDEX IF NOT EXISTS idx_reconciliation_queue_entity ON reconciliation_queue(entity_type, entity_id);

-- 3. MARKETPLACE PROMPTS TABLE
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

CREATE INDEX IF NOT EXISTS idx_marketplace_prompts_prompt ON marketplace_prompts(prompt_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_prompts_seller ON marketplace_prompts(seller_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_prompts_listed ON marketplace_prompts(is_listed);
CREATE INDEX IF NOT EXISTS idx_marketplace_prompts_status ON marketplace_prompts(listing_status);
CREATE INDEX IF NOT EXISTS idx_marketplace_prompts_price ON marketplace_prompts(price_usd_cents);
CREATE INDEX IF NOT EXISTS idx_marketplace_prompts_category ON marketplace_prompts(category);
CREATE INDEX IF NOT EXISTS idx_marketplace_prompts_tags ON marketplace_prompts USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_marketplace_prompts_sales ON marketplace_prompts(total_sales DESC);
CREATE INDEX IF NOT EXISTS idx_marketplace_prompts_rating ON marketplace_prompts(average_rating DESC);

-- 4. CONTENT ACCESS LOGS TABLE
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

CREATE INDEX IF NOT EXISTS idx_content_access_prompt ON content_access_logs(prompt_id);
CREATE INDEX IF NOT EXISTS idx_content_access_user ON content_access_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_content_access_purchase ON content_access_logs(purchase_id);
CREATE INDEX IF NOT EXISTS idx_content_access_date ON content_access_logs(accessed_at);

-- 5. WITHDRAWAL REQUESTS TABLE
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

CREATE INDEX IF NOT EXISTS idx_withdrawal_requests_user ON withdrawal_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawal_requests_status ON withdrawal_requests(status);
CREATE INDEX IF NOT EXISTS idx_withdrawal_requests_requested ON withdrawal_requests(requested_at);

-- ============================================================================
-- USER SETTINGS - Preferences Column
-- ============================================================================

ALTER TABLE users
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS wallet_address TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_wallet_address ON users(wallet_address) WHERE wallet_address IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_users_preferences ON users USING GIN (preferences);

-- ============================================================================
-- CONSTRAINTS & VALIDATIONS
-- ============================================================================

-- Purchase constraints
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'positive_amount'
    ) THEN
        ALTER TABLE prompt_purchases
        ADD CONSTRAINT positive_amount CHECK (amount_usd_cents > 0),
        ADD CONSTRAINT positive_platform_fee CHECK (platform_fee_cents >= 0),
        ADD CONSTRAINT positive_creator_earnings CHECK (creator_earnings_cents >= 0);
    END IF;
END $$;

-- Earnings constraints
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'non_negative_earnings'
    ) THEN
        ALTER TABLE user_earnings
        ADD CONSTRAINT non_negative_earnings CHECK (
            total_earnings_cents >= 0 AND
            pending_earnings_cents >= 0 AND
            available_earnings_cents >= 0 AND
            withdrawn_earnings_cents >= 0 AND
            earnings_this_month_cents >= 0 AND
            earnings_this_week_cents >= 0
        );
    END IF;
END $$;

-- Duplicate purchase prevention
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_prompt_purchase
ON prompt_purchases (prompt_id, buyer_id)
WHERE status = 'completed';

-- Amount split validation
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'check_amount_split'
    ) THEN
        ALTER TABLE prompt_purchases
        ADD CONSTRAINT check_amount_split
        CHECK (amount_usd_cents = platform_fee_cents + creator_earnings_cents);
    END IF;
END $$;

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Revenue split calculation
CREATE OR REPLACE FUNCTION calculate_revenue_split(amount_cents INTEGER)
RETURNS TABLE (
    total_cents INTEGER,
    platform_fee_cents INTEGER,
    creator_earnings_cents INTEGER,
    platform_percentage DECIMAL,
    creator_percentage DECIMAL
) AS $$
DECLARE
    platform_fee_percentage CONSTANT DECIMAL := 0.20;
    creator_percentage CONSTANT DECIMAL := 0.80;
BEGIN
    RETURN QUERY
    SELECT
        amount_cents,
        (amount_cents * platform_fee_percentage)::INTEGER,
        amount_cents - (amount_cents * platform_fee_percentage)::INTEGER,
        platform_fee_percentage,
        creator_percentage;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Atomic purchase recording (updated version with marketplace stats)
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
    INSERT INTO marketplace_prompts (
        prompt_id, seller_id, total_sales, total_revenue_cents
    )
    SELECT p_prompt_id, p_seller_id, 1, p_amount_usd_cents
    WHERE NOT EXISTS (
        SELECT 1 FROM marketplace_prompts WHERE prompt_id = p_prompt_id
    );

    UPDATE marketplace_prompts
    SET
        total_sales = total_sales + 1,
        total_revenue_cents = total_revenue_cents + p_amount_usd_cents,
        updated_at = NOW()
    WHERE prompt_id = p_prompt_id;

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

-- Check existing purchase
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

-- Analytics functions
CREATE OR REPLACE FUNCTION get_creator_analytics(
    p_user_id TEXT,
    p_period_days INTEGER DEFAULT 30
)
RETURNS TABLE (
    total_earnings_cents BIGINT,
    period_earnings_cents BIGINT,
    total_sales BIGINT,
    period_sales BIGINT,
    total_prompts BIGINT,
    active_prompts BIGINT,
    avg_rating DECIMAL(3,2),
    total_views BIGINT,
    total_unlocks BIGINT,
    conversion_rate DECIMAL(5,4)
) AS $$
BEGIN
    RETURN QUERY
    WITH period_start AS (
        SELECT NOW() - INTERVAL '1 day' * p_period_days as start_date
    ),
    earnings_data AS (
        SELECT
            COALESCE(SUM(amount_usd_cents), 0) as total_earnings,
            COALESCE(SUM(CASE WHEN created_at >= (SELECT start_date FROM period_start)
                         THEN amount_usd_cents ELSE 0 END), 0) as period_earnings,
            COUNT(*) as total_sales,
            COUNT(CASE WHEN created_at >= (SELECT start_date FROM period_start) THEN 1 END) as period_sales
        FROM prompt_purchases
        WHERE seller_id = p_user_id AND status = 'completed'
    ),
    prompts_data AS (
        SELECT
            COUNT(*) as total_prompts,
            COUNT(CASE WHEN is_listed = true AND listing_status = 'active' THEN 1 END) as active_prompts,
            COALESCE(AVG(avg_rating), 0) as avg_rating,
            COALESCE(SUM(total_views), 0) as total_views,
            COALESCE(SUM(total_unlocks), 0) as total_unlocks
        FROM marketplace_prompts
        WHERE seller_id = p_user_id
    )
    SELECT
        ed.total_earnings,
        ed.period_earnings,
        ed.total_sales,
        ed.period_sales,
        pd.total_prompts,
        pd.active_prompts,
        pd.avg_rating,
        pd.total_views,
        pd.total_unlocks,
        CASE WHEN pd.total_views > 0
             THEN (pd.total_unlocks::DECIMAL / pd.total_views)
             ELSE 0 END as conversion_rate
    FROM earnings_data ed
    CROSS JOIN prompts_data pd;
END;
$$ LANGUAGE plpgsql;

-- Cleanup functions
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

CREATE OR REPLACE FUNCTION increment_user_prompts_listed(
    p_user_id TEXT
) RETURNS VOID AS $$
BEGIN
    INSERT INTO user_earnings (
        user_id, total_prompts_listed, created_at, updated_at
    ) VALUES (p_user_id, 1, NOW(), NOW())
    ON CONFLICT (user_id) DO UPDATE SET
        total_prompts_listed = user_earnings.total_prompts_listed + 1,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Marketplace helper functions
CREATE OR REPLACE FUNCTION update_marketplace_prompt_stats(
    p_prompt_id TEXT,
    p_revenue_cents INTEGER
) RETURNS VOID AS $$
BEGIN
    UPDATE marketplace_prompts
    SET
        total_sales = total_sales + 1,
        total_revenue_cents = total_revenue_cents + p_revenue_cents,
        updated_at = NOW()
    WHERE prompt_id = p_prompt_id;
END;
$$ LANGUAGE plpgsql;

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
        prompt_id, user_id, purchase_id, access_type,
        access_token, ip_address, user_agent
    ) VALUES (
        p_prompt_id, p_user_id, p_purchase_id, p_access_type,
        p_access_token, p_ip_address, p_user_agent
    ) RETURNING id INTO v_log_id;

    UPDATE marketplace_prompts
    SET total_views = total_views + 1, updated_at = NOW()
    WHERE prompt_id = p_prompt_id AND p_access_type = 'view';

    RETURN v_log_id;
END;
$$ LANGUAGE plpgsql;

-- Analytics trigger function
CREATE OR REPLACE FUNCTION update_prompt_analytics()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.event_type IN ('view', 'preview_click') THEN
        UPDATE marketplace_prompts
        SET total_views = total_views + 1, updated_at = NOW()
        WHERE prompt_id = NEW.prompt_id;
    ELSIF NEW.event_type = 'unlock' THEN
        UPDATE marketplace_prompts
        SET total_sales = total_sales + 1, updated_at = NOW()
        WHERE prompt_id = NEW.prompt_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create analytics trigger
DROP TRIGGER IF EXISTS trigger_update_prompt_analytics ON prompt_analytics_events;
CREATE TRIGGER trigger_update_prompt_analytics
    AFTER INSERT ON prompt_analytics_events
    FOR EACH ROW EXECUTE FUNCTION update_prompt_analytics();

-- ============================================================================
-- COMMENTS & DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE prompt_purchases IS 'Tracks all prompt unlock purchases for analytics and revenue sharing';
COMMENT ON TABLE user_earnings IS 'Aggregated earnings per user (updated on each sale)';
COMMENT ON TABLE prompt_analytics_events IS 'Tracks all user interactions for analytics';
COMMENT ON TABLE marketplace_prompts IS 'Marketplace metadata for listed prompts';
COMMENT ON TABLE auth_nonces IS 'Nonces for EIP-712 wallet authentication with replay protection';
COMMENT ON TABLE user_sessions IS 'Active user sessions after successful wallet authentication';
COMMENT ON TABLE payment_verifications IS 'On-chain verification records for all purchases';
COMMENT ON TABLE reconciliation_queue IS 'Queue for failed operations that need retry with exponential backoff';
COMMENT ON TABLE system_alerts IS 'System alerts for monitoring critical errors and events';
COMMENT ON COLUMN users.preferences IS 'User preferences and settings stored as JSONB';
COMMENT ON COLUMN users.wallet_address IS 'Wallet address associated with this user account (lowercase)';

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

DO $$
BEGIN
    RAISE NOTICE '✅ Complete database migration finished successfully!';
    RAISE NOTICE '📊 Tables created: prompt_purchases, user_earnings, prompt_analytics_events, marketplace_prompts, auth_nonces, user_sessions, payment_verifications, reconciliation_queue, system_alerts, content_access_logs, withdrawal_requests';
    RAISE NOTICE '🔧 Functions created: calculate_revenue_split, record_prompt_purchase, check_existing_purchase, get_creator_analytics, cleanup_expired_nonces, cleanup_expired_sessions, increment_user_prompts_listed, update_marketplace_prompt_stats, log_content_access, update_prompt_analytics';
    RAISE NOTICE '✨ User settings: preferences and wallet_address columns added to users table';
END $$;
