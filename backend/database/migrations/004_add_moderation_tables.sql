-- ============================================================================
-- Migration: Add Content Moderation Tables
-- ============================================================================
-- Creates tables for the wallet violation tracking and blacklist system.
--
-- These tables support the 3-tier content moderation architecture:
--   - wallet_violations: Logs every content violation with the wallet address,
--     reason, and a truncated prompt snippet for audit purposes.
--   - wallet_blacklist: Stores permanently blacklisted wallet addresses.
--     Wallets are auto-blacklisted after exceeding the violation threshold.
--
-- Security considerations:
--   - prompt_snippet is truncated to 200 chars to avoid storing full harmful content
--   - wallet_address is stored in lowercase for consistent lookups
--   - RLS (Row Level Security) should be enabled in production for these tables
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Table: wallet_violations
-- ---------------------------------------------------------------------------
-- Tracks individual content moderation violations per wallet address.
-- Used for audit logging and automatic blacklist threshold enforcement.
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS wallet_violations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL,
  reason TEXT NOT NULL,
  prompt_snippet TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Index for fast lookups by wallet address (used on every violation check)
CREATE INDEX IF NOT EXISTS idx_wallet_violations_address
  ON wallet_violations(wallet_address);

-- Index for time-based queries (admin dashboard, cleanup jobs)
CREATE INDEX IF NOT EXISTS idx_wallet_violations_created
  ON wallet_violations(created_at DESC);

-- ---------------------------------------------------------------------------
-- Table: wallet_blacklist
-- ---------------------------------------------------------------------------
-- Stores permanently blacklisted wallet addresses.
-- Primary key on wallet_address ensures uniqueness and enables fast lookups.
-- The blacklist check runs on every generation request, so this must be fast.
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS wallet_blacklist (
  wallet_address TEXT PRIMARY KEY,
  reason TEXT NOT NULL,
  blacklisted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ---------------------------------------------------------------------------
-- Row Level Security (RLS)
-- ---------------------------------------------------------------------------
-- Enable RLS to prevent unauthorized access. Only the service role key
-- (used by our backend) should be able to read/write these tables.
-- Frontend/client connections via the anon key must NOT have access.
-- ---------------------------------------------------------------------------

ALTER TABLE wallet_violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_blacklist ENABLE ROW LEVEL SECURITY;

-- Policy: Only service role can access wallet_violations
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'wallet_violations' AND policyname = 'Service role access only'
  ) THEN
    CREATE POLICY "Service role access only" ON wallet_violations
      FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Policy: Only service role can access wallet_blacklist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'wallet_blacklist' AND policyname = 'Service role access only'
  ) THEN
    CREATE POLICY "Service role access only" ON wallet_blacklist
      FOR ALL TO service_role USING (true) WITH CHECK (true);
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- Add provider tracking column to generations table
-- ---------------------------------------------------------------------------
-- Tracks which provider handled each generation for billing reconciliation.
-- ---------------------------------------------------------------------------

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'generations' AND column_name = 'provider'
  ) THEN
    ALTER TABLE generations ADD COLUMN provider TEXT;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'generations' AND column_name = 'provider_cost_usd'
  ) THEN
    ALTER TABLE generations ADD COLUMN provider_cost_usd DECIMAL(10,6);
  END IF;
END $$;

-- ---------------------------------------------------------------------------
-- Update generations status constraint to include 'queued'
-- ---------------------------------------------------------------------------

DO $$
BEGIN
  -- Drop the old constraint
  ALTER TABLE generations DROP CONSTRAINT IF EXISTS generations_status_check;
  -- Add the new constraint with 'queued'
  ALTER TABLE generations ADD CONSTRAINT generations_status_check
    CHECK (status IN ('pending', 'payment_verified', 'queued', 'generating', 'completed', 'failed'));
END $$;
