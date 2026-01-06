-- Migration: Create enhanced generations table for AIgency
-- Date: 2026-01-05
-- Description: Adds comprehensive generation tracking with variable substitution support

-- Create the enhanced generations table
CREATE TABLE IF NOT EXISTS generations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL,
    prompt_id UUID NOT NULL,

    -- Encrypted final prompt after variable substitution
    final_prompt TEXT NOT NULL,

    -- Store variable values used for this generation (JSONB for flexibility)
    variable_values JSONB NOT NULL DEFAULT '[]'::jsonb,

    -- Generation settings (aspect ratio, num images, etc.)
    settings JSONB NOT NULL DEFAULT '{}'::jsonb,

    -- Payment information
    transaction_hash TEXT,
    payment_verified BOOLEAN NOT NULL DEFAULT FALSE,
    amount_paid TEXT, -- in wei/smallest unit

    -- Generation status tracking
    status TEXT NOT NULL DEFAULT 'pending'
        CHECK (status IN ('pending', 'payment_verified', 'generating', 'completed', 'failed')),

    -- Generated image URLs (array for multiple images)
    image_urls JSONB DEFAULT '[]'::jsonb,

    -- Error handling
    error_message TEXT,
    retry_count INTEGER NOT NULL DEFAULT 0,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for optimal query performance
CREATE INDEX IF NOT EXISTS idx_generations_user_id ON generations(user_id);
CREATE INDEX IF NOT EXISTS idx_generations_prompt_id ON generations(prompt_id);
CREATE INDEX IF NOT EXISTS idx_generations_status ON generations(status);
CREATE INDEX IF NOT EXISTS idx_generations_transaction_hash ON generations(transaction_hash);
CREATE INDEX IF NOT EXISTS idx_generations_created_at ON generations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_generations_payment_verified ON generations(payment_verified) WHERE payment_verified = true;

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to automatically update updated_at
CREATE TRIGGER update_generations_updated_at
    BEFORE UPDATE ON generations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add foreign key constraint to prompts table (if it exists)
-- This will be added when the prompts table migration is complete
-- ALTER TABLE generations ADD CONSTRAINT fk_generations_prompt_id
--     FOREIGN KEY (prompt_id) REFERENCES prompts(id) ON DELETE CASCADE;

-- Create a view for generation statistics (optional)
CREATE OR REPLACE VIEW generation_stats AS
SELECT
    COUNT(*) as total_generations,
    COUNT(*) FILTER (WHERE status = 'completed') as successful_generations,
    COUNT(*) FILTER (WHERE status = 'failed') as failed_generations,
    AVG(EXTRACT(EPOCH FROM (completed_at - created_at))) FILTER (WHERE status = 'completed') as avg_generation_time_seconds,
    SUM(CAST(amount_paid AS DECIMAL)) FILTER (WHERE payment_verified = true) as total_revenue_wei,
    COUNT(DISTINCT user_id) as unique_users,
    COUNT(DISTINCT prompt_id) as unique_prompts_used
FROM generations;

-- Grant necessary permissions (adjust based on your Supabase setup)
-- GRANT SELECT, INSERT, UPDATE ON generations TO authenticated;
-- GRANT SELECT ON generation_stats TO authenticated;
