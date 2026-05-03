-- ============================================================================
-- COMPLETE DATABASE MIGRATION FOR ENKI (MYSQL/MARIADB VERSION)
-- ============================================================================
-- This script is optimized for XAMPP (MariaDB/MySQL)
-- Date: 2026-05-02
-- ============================================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- ============================================================================
-- PHASE 1: FOUNDATION MVP - Core Marketplace Schema
-- ============================================================================

-- 1. PROMPT PURCHASES TABLE
CREATE TABLE IF NOT EXISTS prompt_purchases (
    id VARCHAR(36) PRIMARY KEY,
    prompt_id VARCHAR(255) NOT NULL,
    buyer_id VARCHAR(255) NOT NULL,
    seller_id VARCHAR(255) NOT NULL,
    amount_usd_cents INTEGER NOT NULL,
    platform_fee_cents INTEGER NOT NULL,
    creator_earnings_cents INTEGER NOT NULL,
    transaction_hash VARCHAR(255),
    chain_id INTEGER NOT NULL,
    chain_name VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    payment_scheme VARCHAR(50) DEFAULT 'exact',
    prompt_title VARCHAR(255),
    prompt_preview_image_url TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    purchased_at DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,
    refunded_at DATETIME,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_purchase_status CHECK (status IN ('pending', 'completed', 'refunded', 'disputed')),
    CONSTRAINT chk_positive_amount CHECK (amount_usd_cents > 0),
    CONSTRAINT chk_positive_fee CHECK (platform_fee_cents >= 0),
    CONSTRAINT chk_positive_earnings CHECK (creator_earnings_cents >= 0),
    CONSTRAINT chk_amount_split CHECK (amount_usd_cents = platform_fee_cents + creator_earnings_cents)
);

CREATE INDEX idx_purchases_buyer ON prompt_purchases(buyer_id);
CREATE INDEX idx_purchases_seller ON prompt_purchases(seller_id);
CREATE INDEX idx_purchases_prompt ON prompt_purchases(prompt_id);
CREATE INDEX idx_purchases_status ON prompt_purchases(status);
CREATE INDEX idx_purchases_created ON prompt_purchases(created_at);

-- 2. USER EARNINGS TABLE
CREATE TABLE IF NOT EXISTS user_earnings (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL UNIQUE,
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
    best_selling_prompt_id VARCHAR(255),
    avg_sale_price_cents INTEGER DEFAULT 0,
    conversion_rate DECIMAL(5,4) DEFAULT 0,
    total_views INTEGER NOT NULL DEFAULT 0,
    total_unlocks INTEGER NOT NULL DEFAULT 0,
    last_activity_at DATETIME,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_sale_at DATETIME,
    CONSTRAINT chk_non_negative_earnings CHECK (
        total_earnings_cents >= 0 AND
        pending_earnings_cents >= 0 AND
        available_earnings_cents >= 0 AND
        withdrawn_earnings_cents >= 0 AND
        earnings_this_month_cents >= 0 AND
        earnings_this_week_cents >= 0
    )
);

CREATE INDEX idx_earnings_user ON user_earnings(user_id);
CREATE INDEX idx_earnings_total ON user_earnings(total_earnings_cents);

-- 3. ENHANCED GENERATIONS TABLE
-- Since MySQL ALTER TABLE doesn't support IF NOT EXISTS, we use a procedure for safety
DELIMITER //
CREATE PROCEDURE AddGenerationColumns()
BEGIN
    IF NOT EXISTS (SELECT * FROM information_schema.columns WHERE table_name = 'generations' AND column_name = 'source_prompt_id') THEN
        ALTER TABLE generations ADD COLUMN source_prompt_id VARCHAR(255);
    END IF;
    IF NOT EXISTS (SELECT * FROM information_schema.columns WHERE table_name = 'generations' AND column_name = 'prompt_creator_id') THEN
        ALTER TABLE generations ADD COLUMN prompt_creator_id VARCHAR(255);
    END IF;
    IF NOT EXISTS (SELECT * FROM information_schema.columns WHERE table_name = 'generations' AND column_name = 'prompt_price_paid_cents') THEN
        ALTER TABLE generations ADD COLUMN prompt_price_paid_cents INTEGER;
    END IF;
    IF NOT EXISTS (SELECT * FROM information_schema.columns WHERE table_name = 'generations' AND column_name = 'is_from_purchased_prompt') THEN
        ALTER TABLE generations ADD COLUMN is_from_purchased_prompt BOOLEAN DEFAULT FALSE;
    END IF;
END //
DELIMITER ;
-- CALL AddGenerationColumns();
-- DROP PROCEDURE AddGenerationColumns;

-- 4. PLATFORM ANALYTICS TABLE
CREATE TABLE IF NOT EXISTS platform_analytics (
    id VARCHAR(36) PRIMARY KEY,
    metric_type VARCHAR(100) NOT NULL,
    metric_value NUMERIC(18, 4) NOT NULL,
    metadata JSON,
    recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_platform_analytics_type ON platform_analytics(metric_type, recorded_at);

-- ============================================================================
-- PHASE 3: ANALYTICS - Event Tracking
-- ============================================================================

-- 1. ANALYTICS EVENTS TABLE
CREATE TABLE IF NOT EXISTS prompt_analytics_events (
    id VARCHAR(36) PRIMARY KEY,
    event_type VARCHAR(50) NOT NULL,
    user_id VARCHAR(255),
    session_id VARCHAR(255),
    prompt_id VARCHAR(255),
    creator_id VARCHAR(255),
    referrer TEXT,
    source VARCHAR(100) DEFAULT 'marketplace',
    campaign VARCHAR(100),
    user_agent TEXT,
    ip_hash VARCHAR(100),
    country VARCHAR(100),
    device_type VARCHAR(50),
    metadata JSON,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    event_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_event_type CHECK (event_type IN (
        'view', 'preview_click', 'unlock_intent', 'unlock',
        'generation', 'rating', 'share', 'favorite', 'download'
    ))
);

CREATE INDEX idx_analytics_events_type_time ON prompt_analytics_events(event_type, created_at);
CREATE INDEX idx_analytics_events_user_time ON prompt_analytics_events(user_id, created_at);
CREATE INDEX idx_analytics_events_prompt_time ON prompt_analytics_events(prompt_id, created_at);

-- 2. ENHANCED PROMPTS TABLE
DELIMITER //
CREATE PROCEDURE UpgradePromptsTable()
BEGIN
    IF EXISTS (SELECT * FROM information_schema.tables WHERE table_name = 'prompts') THEN
        IF NOT EXISTS (SELECT * FROM information_schema.columns WHERE table_name = 'prompts' AND column_name = 'total_views') THEN
            ALTER TABLE prompts
            ADD COLUMN total_views INTEGER NOT NULL DEFAULT 0,
            ADD COLUMN total_unlocks INTEGER NOT NULL DEFAULT 0,
            ADD COLUMN total_generations INTEGER NOT NULL DEFAULT 0,
            ADD COLUMN avg_rating DECIMAL(3,2) DEFAULT 0,
            ADD COLUMN rating_count INTEGER NOT NULL DEFAULT 0,
            ADD COLUMN conversion_rate DECIMAL(5,4) DEFAULT 0,
            ADD COLUMN last_analytics_update DATETIME DEFAULT CURRENT_TIMESTAMP;
        END IF;
    END IF;
END //
DELIMITER ;
-- CALL UpgradePromptsTable();
-- DROP PROCEDURE UpgradePromptsTable;

-- ============================================================================
-- PHASE 4: SECURITY & AUTHENTICATION
-- ============================================================================

-- 1. AUTHENTICATION TABLES
CREATE TABLE IF NOT EXISTS auth_nonces (
    id VARCHAR(36) PRIMARY KEY,
    wallet_address VARCHAR(255) NOT NULL,
    nonce VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    consumed BOOLEAN DEFAULT FALSE,
    consumed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_auth_nonces_wallet ON auth_nonces(wallet_address);
CREATE INDEX idx_auth_nonces_expires ON auth_nonces(expires_at);

CREATE TABLE IF NOT EXISTS user_sessions (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    wallet_address VARCHAR(255) NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_active_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. PAYMENT VERIFICATION TABLE
CREATE TABLE IF NOT EXISTS payment_verifications (
    id VARCHAR(36) PRIMARY KEY,
    purchase_id VARCHAR(36),
    transaction_hash VARCHAR(255) NOT NULL,
    chain_id INTEGER NOT NULL,
    chain_name VARCHAR(100) NOT NULL,
    verified BOOLEAN NOT NULL,
    verification_method VARCHAR(100) NOT NULL,
    on_chain_amount_usdc DECIMAL(20, 6),
    on_chain_recipient VARCHAR(255),
    on_chain_sender VARCHAR(255),
    block_number BIGINT,
    block_timestamp DATETIME,
    confirmations INTEGER,
    verification_error TEXT,
    verified_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (purchase_id) REFERENCES prompt_purchases(id) ON DELETE SET NULL
);

-- 3. PROMPT DELETIONS TABLE
CREATE TABLE IF NOT EXISTS prompt_deletions (
    id VARCHAR(36) PRIMARY KEY,
    prompt_id VARCHAR(255) NOT NULL UNIQUE,
    deleted_by VARCHAR(255) NOT NULL,
    deletion_type VARCHAR(50) NOT NULL,
    reason TEXT,
    purchase_count INTEGER NOT NULL DEFAULT 0,
    deleted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_deletion_type CHECK (deletion_type IN ('soft', 'hard'))
);

-- 4. FAILED OPERATIONS TABLE
CREATE TABLE IF NOT EXISTS failed_operations (
    id VARCHAR(36) PRIMARY KEY,
    task_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    payload JSON NOT NULL,
    error_message TEXT,
    attempt_count INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 5,
    next_retry_at DATETIME,
    status VARCHAR(50) DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at DATETIME,
    CONSTRAINT chk_failed_status CHECK (status IN ('pending', 'processing', 'completed', 'failed'))
);

-- ============================================================================
-- PHASE 5: ADDITIONAL TABLES
-- ============================================================================

-- 1. SYSTEM ALERTS TABLE
CREATE TABLE IF NOT EXISTS system_alerts (
    id VARCHAR(36) PRIMARY KEY,
    alert_type VARCHAR(100) NOT NULL,
    severity VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    metadata JSON,
    resolved BOOLEAN DEFAULT FALSE,
    resolved_at DATETIME,
    resolved_by VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_alert_severity CHECK (severity IN ('low', 'medium', 'high', 'critical'))
);

-- 2. RECONCILIATION QUEUE TABLE
CREATE TABLE IF NOT EXISTS reconciliation_queue (
    id VARCHAR(36) PRIMARY KEY,
    task_type VARCHAR(100) NOT NULL,
    entity_id VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100) NOT NULL,
    payload JSON NOT NULL,
    attempt_count INTEGER DEFAULT 0,
    max_attempts INTEGER DEFAULT 5,
    status VARCHAR(50) DEFAULT 'pending',
    error TEXT,
    next_retry_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    completed_at DATETIME,
    CONSTRAINT chk_recon_status CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
    CONSTRAINT chk_recon_type CHECK (task_type IN ('earnings_update', 'prompt_stats_update', 'purchase_recording')),
    CONSTRAINT chk_recon_entity CHECK (entity_type IN ('purchase', 'prompt', 'user'))
);

-- 3. MARKETPLACE PROMPTS TABLE
CREATE TABLE IF NOT EXISTS marketplace_prompts (
    id VARCHAR(36) PRIMARY KEY,
    prompt_id VARCHAR(255) NOT NULL UNIQUE,
    seller_id VARCHAR(255) NOT NULL,
    price_usd_cents INTEGER NOT NULL,
    license_type VARCHAR(50) NOT NULL,
    is_listed BOOLEAN DEFAULT TRUE,
    listing_status VARCHAR(50) DEFAULT 'active',
    category VARCHAR(100),
    tags JSON, -- MySQL uses JSON for arrays
    description TEXT,
    total_views INTEGER DEFAULT 0,
    total_sales INTEGER DEFAULT 0,
    total_revenue_cents INTEGER DEFAULT 0,
    average_rating DECIMAL(3, 2) DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    listed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    delisted_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_market_price CHECK (price_usd_cents >= 0),
    CONSTRAINT chk_market_license CHECK (license_type IN ('personal', 'commercial', 'exclusive')),
    CONSTRAINT chk_market_status CHECK (listing_status IN ('active', 'inactive', 'deleted', 'suspended'))
);

-- 4. CONTENT ACCESS LOGS TABLE
CREATE TABLE IF NOT EXISTS content_access_logs (
    id VARCHAR(36) PRIMARY KEY,
    prompt_id VARCHAR(255) NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    purchase_id VARCHAR(36),
    access_type VARCHAR(50) NOT NULL,
    access_token VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent TEXT,
    accessed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (purchase_id) REFERENCES prompt_purchases(id) ON DELETE SET NULL,
    CONSTRAINT chk_access_type CHECK (access_type IN ('view', 'download', 'preview'))
);

-- 5. WITHDRAWAL REQUESTS TABLE
CREATE TABLE IF NOT EXISTS withdrawal_requests (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    amount_cents INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    payout_address VARCHAR(255) NOT NULL,
    payout_method VARCHAR(50) DEFAULT 'crypto',
    transaction_hash VARCHAR(255),
    rejection_reason TEXT,
    requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    processed_at DATETIME,
    completed_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_withdraw_amount CHECK (amount_cents > 0),
    CONSTRAINT chk_withdraw_status CHECK (status IN ('pending', 'processing', 'completed', 'rejected', 'cancelled')),
    CONSTRAINT chk_withdraw_method CHECK (payout_method IN ('crypto', 'bank', 'paypal'))
);

-- ============================================================================
-- USER SETTINGS - Preferences Column
-- ============================================================================
DELIMITER //
CREATE PROCEDURE UpgradeUsersTable()
BEGIN
    IF EXISTS (SELECT * FROM information_schema.tables WHERE table_name = 'users') THEN
        IF NOT EXISTS (SELECT * FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'preferences') THEN
            ALTER TABLE users
            ADD COLUMN preferences JSON,
            ADD COLUMN wallet_address VARCHAR(255);
            CREATE UNIQUE INDEX idx_users_wallet_address ON users(wallet_address);
        END IF;
    END IF;
END //
DELIMITER ;
-- CALL UpgradeUsersTable();
-- DROP PROCEDURE UpgradeUsersTable;

-- ============================================================================
-- STORED PROCEDURES (MYSQL VERSION)
-- ============================================================================

DELIMITER //

-- 1. RECORD PROMPT PURCHASE
CREATE PROCEDURE record_prompt_purchase(
    IN p_id VARCHAR(36),
    IN p_prompt_id VARCHAR(255),
    IN p_buyer_id VARCHAR(255),
    IN p_seller_id VARCHAR(255),
    IN p_amount_usd_cents INTEGER,
    IN p_platform_fee_cents INTEGER,
    IN p_creator_earnings_cents INTEGER,
    IN p_transaction_hash VARCHAR(255),
    IN p_chain_id INTEGER,
    IN p_chain_name VARCHAR(100),
    IN p_payment_scheme VARCHAR(50),
    IN p_prompt_title VARCHAR(255),
    IN p_prompt_preview_image_url TEXT
)
BEGIN
    DECLARE v_existing_id VARCHAR(36);
    
    -- Idempotency check
    SELECT id INTO v_existing_id
    FROM prompt_purchases
    WHERE prompt_id = p_prompt_id
        AND buyer_id = p_buyer_id
        AND status = 'completed'
    LIMIT 1;

    IF v_existing_id IS NULL THEN
        -- Insert purchase
        INSERT INTO prompt_purchases (
            id, prompt_id, buyer_id, seller_id,
            amount_usd_cents, platform_fee_cents, creator_earnings_cents,
            transaction_hash, chain_id, chain_name, payment_scheme,
            status, prompt_title, prompt_preview_image_url,
            purchased_at, created_at
        ) VALUES (
            p_id, p_prompt_id, p_buyer_id, p_seller_id,
            p_amount_usd_cents, p_platform_fee_cents, p_creator_earnings_cents,
            p_transaction_hash, p_chain_id, p_chain_name, p_payment_scheme,
            'completed', p_prompt_title, p_prompt_preview_image_url,
            NOW(), NOW()
        );

        -- Update earnings
        INSERT INTO user_earnings (
            id, user_id, total_earnings_cents, total_sales,
            available_earnings_cents, earnings_this_month_cents,
            earnings_this_week_cents, sales_this_month,
            created_at
        ) VALUES (
            UUID(), p_seller_id, p_creator_earnings_cents, 1,
            p_creator_earnings_cents, p_creator_earnings_cents,
            p_creator_earnings_cents, 1,
            NOW()
        )
        ON DUPLICATE KEY UPDATE
            total_earnings_cents = total_earnings_cents + p_creator_earnings_cents,
            total_sales = total_sales + 1,
            available_earnings_cents = available_earnings_cents + p_creator_earnings_cents,
            earnings_this_month_cents = earnings_this_month_cents + p_creator_earnings_cents,
            earnings_this_week_cents = earnings_this_week_cents + p_creator_earnings_cents,
            sales_this_month = sales_this_month + 1,
            updated_at = NOW();

        -- Update marketplace stats
        INSERT INTO marketplace_prompts (
            id, prompt_id, seller_id, total_sales, total_revenue_cents, price_usd_cents, license_type
        ) VALUES (
            UUID(), p_prompt_id, p_seller_id, 1, p_amount_usd_cents, p_amount_usd_cents, 'personal'
        )
        ON DUPLICATE KEY UPDATE
            total_sales = total_sales + 1,
            total_revenue_cents = total_revenue_cents + p_amount_usd_cents,
            updated_at = NOW();

        -- Record analytics
        INSERT INTO platform_analytics (id, metric_type, metric_value, metadata, recorded_at)
        VALUES (UUID(), 'purchase', 1, JSON_OBJECT(
            'promptId', p_prompt_id,
            'buyerId', p_buyer_id,
            'sellerId', p_seller_id,
            'amountCents', p_amount_usd_cents
        ), NOW());
        
        SELECT p_id AS purchase_id, TRUE AS earnings_updated, TRUE AS is_new_purchase;
    ELSE
        SELECT v_existing_id AS purchase_id, FALSE AS earnings_updated, FALSE AS is_new_purchase;
    END IF;
END //

-- 2. GET CREATOR ANALYTICS
CREATE PROCEDURE get_creator_analytics(
    IN p_user_id VARCHAR(255),
    IN p_period_days INTEGER
)
BEGIN
    DECLARE v_start_date DATETIME;
    SET v_start_date = DATE_SUB(NOW(), INTERVAL p_period_days DAY);

    SELECT 
        COALESCE(SUM(amount_usd_cents), 0) as total_earnings_cents,
        COALESCE(SUM(CASE WHEN created_at >= v_start_date THEN amount_usd_cents ELSE 0 END), 0) as period_earnings_cents,
        COUNT(*) as total_sales,
        COUNT(CASE WHEN created_at >= v_start_date THEN 1 END) as period_sales,
        (SELECT COUNT(*) FROM marketplace_prompts WHERE seller_id = p_user_id) as total_prompts,
        (SELECT COALESCE(SUM(total_views), 0) FROM marketplace_prompts WHERE seller_id = p_user_id) as total_views
    FROM prompt_purchases
    WHERE seller_id = p_user_id AND status = 'completed';
END //

DELIMITER ;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================
