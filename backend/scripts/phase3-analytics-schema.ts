/**
 * Phase 3: Analytics Database Schema
 * Creates tables and functions for comprehensive analytics tracking
 */

async function setupPhase3AnalyticsSchema() {
  console.log('📊 Phase 3 Analytics Schema Setup');
  console.log('==================================');
  console.log('');
  console.log('⚠️  IMPORTANT: These SQL commands must be run manually in your Supabase SQL Editor');
  console.log('   Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql-editor');
  console.log('');

  const analyticsSchemaSQL = `
-- Phase 3: Analytics Dashboard - Database Schema
-- Date: 2026-01-10
-- Description: Comprehensive analytics tracking for creator dashboards

-- =====================================================
-- 1. ANALYTICS EVENTS TABLE
-- Tracks all user interactions for analytics
-- =====================================================

CREATE TABLE IF NOT EXISTS prompt_analytics_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- What happened
    event_type TEXT NOT NULL
        CHECK (event_type IN (
            'view', 'preview_click', 'unlock_intent', 'unlock',
            'generation', 'rating', 'share', 'favorite', 'download'
        )),

    -- Who did it
    user_id TEXT,                         -- NULL for anonymous events
    session_id TEXT,                      -- Browser session tracking

    -- What was interacted with
    prompt_id TEXT,                       -- Which prompt (if applicable)
    creator_id TEXT,                      -- Whose content (for attribution)

    -- Context and metadata
    referrer TEXT,                        -- Where they came from
    source TEXT DEFAULT 'marketplace',    -- Entry point (marketplace, direct, etc.)
    campaign TEXT,                        -- Marketing campaign tracking

    -- Technical details
    user_agent TEXT,                      -- Browser/device info
    ip_hash TEXT,                         -- Anonymized IP for geo analysis
    country TEXT,                         -- Geo location (anonymized)
    device_type TEXT,                     -- mobile, desktop, tablet

    -- Event-specific data
    metadata JSONB DEFAULT '{}'::jsonb,   -- Flexible event data

    -- Timing
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    event_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for fast analytics queries
CREATE INDEX IF NOT EXISTS idx_analytics_events_type_time ON prompt_analytics_events(event_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_time ON prompt_analytics_events(user_id, created_at DESC) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_analytics_events_prompt_time ON prompt_analytics_events(prompt_id, created_at DESC) WHERE prompt_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_analytics_events_creator ON prompt_analytics_events(creator_id, created_at DESC) WHERE creator_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_analytics_events_source ON prompt_analytics_events(source, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session ON prompt_analytics_events(session_id, created_at DESC);

-- =====================================================
-- 2. ENHANCED USER EARNINGS (PERIOD BREAKDOWNS)
-- Add detailed period tracking to existing table
-- =====================================================

-- Add period-specific earnings columns
ALTER TABLE user_earnings
ADD COLUMN IF NOT EXISTS earnings_last_7d_cents INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS earnings_last_30d_cents INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS sales_last_7d INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS sales_last_30d INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS best_selling_prompt_id TEXT,
ADD COLUMN IF NOT EXISTS avg_sale_price_cents INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS conversion_rate DECIMAL(5,4) DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_views INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_unlocks INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMP WITH TIME ZONE;

-- =====================================================
-- 3. PROMPT ANALYTICS AGGREGATION
-- Add analytics fields to prompts (denormalized for performance)
-- =====================================================

-- Note: These fields will be populated by background analytics jobs
ALTER TABLE prompts
ADD COLUMN IF NOT EXISTS total_views INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_unlocks INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_generations INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS avg_rating DECIMAL(3,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS rating_count INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS conversion_rate DECIMAL(5,4) DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_analytics_update TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add indexes for analytics queries on prompts
CREATE INDEX IF NOT EXISTS idx_prompts_views ON prompts(total_views DESC) WHERE is_listed = true;
CREATE INDEX IF NOT EXISTS idx_prompts_rating ON prompts(avg_rating DESC, rating_count DESC) WHERE is_listed = true;
CREATE INDEX IF NOT EXISTS idx_prompts_conversion ON prompts(conversion_rate DESC) WHERE is_listed = true;

-- =====================================================
-- 4. ANALYTICS AGGREGATION FUNCTIONS
-- Functions to calculate analytics metrics
-- =====================================================

-- Function to calculate creator analytics
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
        FROM prompts
        WHERE user_id = p_user_id OR artist_id = p_user_id
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

-- Function to calculate prompt performance metrics
CREATE OR REPLACE FUNCTION get_prompt_analytics(
    p_prompt_id TEXT,
    p_period_days INTEGER DEFAULT 30
)
RETURNS TABLE (
    total_views BIGINT,
    period_views BIGINT,
    total_unlocks BIGINT,
    period_unlocks BIGINT,
    total_generations BIGINT,
    period_generations BIGINT,
    avg_rating DECIMAL(3,2),
    rating_count BIGINT,
    conversion_rate DECIMAL(5,4),
    revenue_cents BIGINT
) AS $$
BEGIN
    RETURN QUERY
    WITH period_start AS (
        SELECT NOW() - INTERVAL '1 day' * p_period_days as start_date
    ),
    views_data AS (
        SELECT
            COUNT(*) as total_views,
            COUNT(CASE WHEN created_at >= (SELECT start_date FROM period_start) THEN 1 END) as period_views
        FROM prompt_analytics_events
        WHERE prompt_id = p_prompt_id AND event_type IN ('view', 'preview_click')
    ),
    unlocks_data AS (
        SELECT
            COUNT(*) as total_unlocks,
            COUNT(CASE WHEN created_at >= (SELECT start_date FROM period_start) THEN 1 END) as period_unlocks
        FROM prompt_analytics_events
        WHERE prompt_id = p_prompt_id AND event_type = 'unlock'
    ),
    generations_data AS (
        SELECT
            COUNT(*) as total_generations,
            COUNT(CASE WHEN created_at >= (SELECT start_date FROM period_start) THEN 1 END) as period_generations
        FROM prompt_analytics_events
        WHERE prompt_id = p_prompt_id AND event_type = 'generation'
    ),
    ratings_data AS (
        SELECT
            COALESCE(AVG((metadata->>'rating')::DECIMAL), 0) as avg_rating,
            COUNT(*) as rating_count
        FROM prompt_analytics_events
        WHERE prompt_id = p_prompt_id AND event_type = 'rating'
    ),
    revenue_data AS (
        SELECT COALESCE(SUM(amount_usd_cents), 0) as revenue
        FROM prompt_purchases
        WHERE prompt_id = p_prompt_id AND status = 'completed'
    )
    SELECT
        vd.total_views, vd.period_views,
        ud.total_unlocks, ud.period_unlocks,
        gd.total_generations, gd.period_generations,
        rd.avg_rating, rd.rating_count,
        CASE WHEN vd.total_views > 0
             THEN (ud.total_unlocks::DECIMAL / vd.total_views)
             ELSE 0 END as conversion_rate,
        rd.revenue
    FROM views_data vd
    CROSS JOIN unlocks_data ud
    CROSS JOIN generations_data gd
    CROSS JOIN ratings_data rd
    CROSS JOIN revenue_data rv;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 5. ANALYTICS UPDATE TRIGGERS
-- Automatically update analytics when events occur
-- =====================================================

-- Function to update prompt analytics when events are inserted
CREATE OR REPLACE FUNCTION update_prompt_analytics()
RETURNS TRIGGER AS $$
BEGIN
    -- Update prompt statistics based on event type
    IF NEW.event_type IN ('view', 'preview_click') THEN
        UPDATE prompts
        SET total_views = total_views + 1,
            last_analytics_update = NOW()
        WHERE id = NEW.prompt_id;
    ELSIF NEW.event_type = 'unlock' THEN
        UPDATE prompts
        SET total_unlocks = total_unlocks + 1,
            last_analytics_update = NOW()
        WHERE id = NEW.prompt_id;
    ELSIF NEW.event_type = 'generation' THEN
        UPDATE prompts
        SET total_generations = total_generations + 1,
            last_analytics_update = NOW()
        WHERE id = NEW.prompt_id;
    ELSIF NEW.event_type = 'rating' THEN
        -- Recalculate average rating
        WITH rating_stats AS (
            SELECT
                AVG((metadata->>'rating')::DECIMAL) as new_avg,
                COUNT(*) as new_count
            FROM prompt_analytics_events
            WHERE prompt_id = NEW.prompt_id AND event_type = 'rating'
        )
        UPDATE prompts
        SET avg_rating = rating_stats.new_avg,
            rating_count = rating_stats.new_count,
            last_analytics_update = NOW()
        FROM rating_stats
        WHERE id = NEW.prompt_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic analytics updates
DROP TRIGGER IF EXISTS trigger_update_prompt_analytics ON prompt_analytics_events;
CREATE TRIGGER trigger_update_prompt_analytics
    AFTER INSERT ON prompt_analytics_events
    FOR EACH ROW EXECUTE FUNCTION update_prompt_analytics();

-- =====================================================
-- 6. DATA MIGRATION HELPERS
-- Migrate existing data to analytics system
-- =====================================================

-- Migrate existing purchase data to analytics events
-- This should be run once after deploying the schema
-- INSERT INTO prompt_analytics_events (
--     event_type, user_id, prompt_id, creator_id,
--     metadata, created_at, event_timestamp
-- )
-- SELECT
--     'unlock' as event_type,
--     buyer_id as user_id,
--     prompt_id,
--     seller_id as creator_id,
--     jsonb_build_object('amount_cents', amount_usd_cents) as metadata,
--     created_at,
--     completed_at
-- FROM prompt_purchases
-- WHERE status = 'completed'
-- AND completed_at IS NOT NULL;

-- =====================================================
-- 7. PERFORMANCE OPTIMIZATION
-- Additional indexes for analytics queries
-- =====================================================

-- Index for time-based analytics queries
CREATE INDEX IF NOT EXISTS idx_analytics_time_range ON prompt_analytics_events(created_at DESC, event_type);

-- Index for user behavior analysis
CREATE INDEX IF NOT EXISTS idx_analytics_user_behavior ON prompt_analytics_events(user_id, event_type, created_at DESC);

-- Index for geographic analytics
CREATE INDEX IF NOT EXISTS idx_analytics_geo ON prompt_analytics_events(country, created_at DESC) WHERE country IS NOT NULL;

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================

-- Log successful migration
DO $$
BEGIN
    RAISE NOTICE 'Phase 3 analytics schema migration completed successfully';
    RAISE NOTICE 'Tables created/enhanced: prompt_analytics_events, user_earnings, prompts';
    RAISE NOTICE 'Functions created: get_creator_analytics, get_prompt_analytics';
    RAISE NOTICE 'Triggers created: automatic analytics updates';
END $$;
`;

  console.log(analyticsSchemaSQL);
  console.log('');
  console.log('🎯 After running the SQL commands:');
  console.log('');
  console.log('1. ✅ Verify tables exist: SELECT tablename FROM pg_tables WHERE schemaname = \'public\';');
  console.log('2. ✅ Test functions: SELECT * FROM get_creator_analytics(\'test-user\', 30);');
  console.log('3. ⏳ Run: npm run phase3:validate (to test analytics functionality)');
  console.log('4. ⏳ Add event tracking to your components');
  console.log('');
  console.log('💡 Analytics will start collecting data immediately after deployment.');
  console.log('   Historical data can be migrated using the commented INSERT statements.');

  return true;
}

// Run setup if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupPhase3AnalyticsSchema()
    .then(() => {
      console.log('🏁 Analytics schema setup completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Analytics schema setup failed:', error);
      process.exit(1);
    });
}

export { setupPhase3AnalyticsSchema };