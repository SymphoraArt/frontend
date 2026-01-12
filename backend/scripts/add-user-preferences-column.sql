-- Add preferences and wallet_address columns to users table
-- Run this in your Supabase SQL Editor

-- Add preferences column as JSONB to store user settings
ALTER TABLE users
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}'::jsonb;

-- Add wallet_address column to link wallet addresses to user records
ALTER TABLE users
ADD COLUMN IF NOT EXISTS wallet_address TEXT;

-- Add unique index on wallet_address (one wallet per user)
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_wallet_address ON users(wallet_address) WHERE wallet_address IS NOT NULL;

-- Add index for preferences queries (optional, but can help with performance)
CREATE INDEX IF NOT EXISTS idx_users_preferences ON users USING GIN (preferences);

-- Add comments for documentation
COMMENT ON COLUMN users.preferences IS 'User preferences and settings stored as JSONB';
COMMENT ON COLUMN users.wallet_address IS 'Wallet address associated with this user account (lowercase)';
