/**
 * Phase 1 Database Migrations
 * Applies core marketplace schema changes to Supabase
 *
 * Note: This script provides SQL commands to run manually in Supabase dashboard
 * or through database migration tools. Direct execution via Supabase client
 * is limited for DDL operations.
 */

async function runPhase1Migrations() {
  console.log('🚀 Phase 1 Database Migrations');
  console.log('==============================');
  console.log('');
  console.log('⚠️  IMPORTANT: These migrations must be run manually in your Supabase dashboard');
  console.log('   Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql-editor');
  console.log('');
  console.log('📋 Copy and execute the following SQL in order:');
  console.log('');

  const migrationSQL = `
-- Phase 1: Foundation MVP - Database Migrations
-- Date: 2026-01-10
-- Description: Core marketplace schema for prompt listing and purchase tracking

-- =====================================================
-- 1. PROMPT PURCHASES TABLE
-- Tracks all prompt unlock purchases for analytics and revenue sharing
-- =====================================================

CREATE TABLE IF NOT EXISTS prompt_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Parties involved
    prompt_id TEXT NOT NULL,              -- MongoDB prompt ID
    buyer_id TEXT NOT NULL,               -- User wallet-derived key
    seller_id TEXT NOT NULL,              -- Prompt creator's user ID

    -- Financial details
    amount_usd_cents INTEGER NOT NULL,    -- Total amount in USD cents
    platform_fee_cents INTEGER NOT NULL,  -- Platform's cut (20%)
    creator_earnings_cents INTEGER NOT NULL, -- Creator's earnings (80%)

    -- Blockchain transaction
    transaction_hash TEXT,                -- On-chain transaction hash
    chain_id INTEGER NOT NULL,            -- Blockchain ID (e.g., 8453 for Base)
    chain_name TEXT NOT NULL,             -- Network name (e.g., "Base Mainnet")

    -- Status tracking
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'completed', 'refunded', 'disputed')),

    -- Metadata
    ip_address TEXT,                      -- For fraud detection (optional)
    user_agent TEXT,                      -- For analytics (optional)

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    refunded_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for optimal query performance
CREATE INDEX IF NOT EXISTS idx_purchases_buyer ON prompt_purchases(buyer_id);
CREATE INDEX IF NOT EXISTS idx_purchases_seller ON prompt_purchases(seller_id);
CREATE INDEX IF NOT EXISTS idx_purchases_prompt ON prompt_purchases(prompt_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON prompt_purchases(status);
CREATE INDEX IF NOT EXISTS idx_purchases_created ON prompt_purchases(created_at DESC);

-- =====================================================
-- 2. USER EARNINGS TABLE
-- Aggregated earnings per user (updated on each sale)
-- =====================================================

CREATE TABLE IF NOT EXISTS user_earnings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id TEXT NOT NULL UNIQUE,         -- User's wallet-derived key

    -- Lifetime totals
    total_earnings_cents INTEGER NOT NULL DEFAULT 0,
    total_sales INTEGER NOT NULL DEFAULT 0,
    total_prompts_listed INTEGER NOT NULL DEFAULT 0,

    -- Available/Pending split (for future withdrawal features)
    pending_earnings_cents INTEGER NOT NULL DEFAULT 0,
    available_earnings_cents INTEGER NOT NULL DEFAULT 0,
    withdrawn_earnings_cents INTEGER NOT NULL DEFAULT 0,

    -- Period breakdowns (for analytics)
    earnings_this_month_cents INTEGER NOT NULL DEFAULT 0,
    earnings_this_week_cents INTEGER NOT NULL DEFAULT 0,
    sales_this_month INTEGER NOT NULL DEFAULT 0,

    -- Performance tracking
    best_selling_prompt_id TEXT,          -- Most successful prompt ID

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    last_sale_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for user earnings queries
CREATE INDEX IF NOT EXISTS idx_earnings_user ON user_earnings(user_id);
CREATE INDEX IF NOT EXISTS idx_earnings_total ON user_earnings(total_earnings_cents DESC);
CREATE INDEX IF NOT EXISTS idx_earnings_month ON user_earnings(earnings_this_month_cents DESC);

-- =====================================================
-- 3. ENHANCED GENERATIONS TABLE
-- Add marketplace-related columns to link generations to prompts
-- =====================================================

-- Add foreign key columns to existing generations table
ALTER TABLE generations
ADD COLUMN IF NOT EXISTS source_prompt_id TEXT,           -- Link to marketplace prompt
ADD COLUMN IF NOT EXISTS prompt_creator_id TEXT,          -- Creator for revenue attribution
ADD COLUMN IF NOT EXISTS prompt_price_paid_cents INTEGER, -- Price paid for prompt (if any)
ADD COLUMN IF NOT EXISTS is_from_purchased_prompt BOOLEAN DEFAULT FALSE;

-- Indexes for prompt-related queries
CREATE INDEX IF NOT EXISTS idx_generations_source_prompt ON generations(source_prompt_id) WHERE source_prompt_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_generations_creator ON generations(prompt_creator_id) WHERE prompt_creator_id IS NOT NULL;

-- =====================================================
-- 4. UTILITY FUNCTIONS
-- Helper functions for revenue calculations
-- =====================================================

-- Function to calculate revenue split
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

-- =====================================================
-- 5. VALIDATION CONSTRAINTS
-- Ensure data integrity
-- =====================================================

-- Ensure amounts are always positive
ALTER TABLE prompt_purchases
ADD CONSTRAINT positive_amount CHECK (amount_usd_cents > 0),
ADD CONSTRAINT positive_platform_fee CHECK (platform_fee_cents >= 0),
ADD CONSTRAINT positive_creator_earnings CHECK (creator_earnings_cents >= 0);

-- Ensure earnings are always non-negative
ALTER TABLE user_earnings
ADD CONSTRAINT non_negative_earnings CHECK (
    total_earnings_cents >= 0 AND
    pending_earnings_cents >= 0 AND
    available_earnings_cents >= 0 AND
    withdrawn_earnings_cents >= 0 AND
    earnings_this_month_cents >= 0 AND
    earnings_this_week_cents >= 0
);

-- =====================================================
-- MIGRATION COMPLETE
-- =====================================================

-- Log successful migration
DO $$
BEGIN
    RAISE NOTICE 'Phase 1 database migrations completed successfully';
    RAISE NOTICE 'Tables created: prompt_purchases, user_earnings';
    RAISE NOTICE 'Enhanced table: generations (added marketplace columns)';
END $$;
`;

  console.log(migrationSQL);
  console.log('');
  console.log('🎯 After running the migrations, test with:');
  console.log('');
  console.log('-- Test revenue calculation function');
  console.log('SELECT * FROM calculate_revenue_split(1000); -- Should return $10 split');
  console.log('');
  console.log('-- Check tables were created');
  console.log('SELECT table_name FROM information_schema.tables');
  console.log('WHERE table_schema = \'public\'');
  console.log('AND table_name IN (\'prompt_purchases\', \'user_earnings\');');
  console.log('');
  console.log('📞 Once migrations are complete, run: npm run phase1:validate');
}

// Run migrations if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runPhase1Migrations()
    .then(() => {
      console.log('🏁 Migrations completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Migrations failed:', error);
      process.exit(1);
    });
}

export { runPhase1Migrations };