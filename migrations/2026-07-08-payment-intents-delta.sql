-- Delta for generation_payment_intents installs created from the PR #58
-- version of migrations/generation_payment_intents.sql (already applied in
-- Supabase). Idempotent — safe to run once in the Supabase SQL editor.

-- Blockhash validity horizon of the broadcast tx: once the chain passes this
-- height without including the signature, the tx provably never lands
-- (dropped-transaction detection in the pay endpoint).
ALTER TABLE generation_payment_intents
  ADD COLUMN IF NOT EXISTS last_valid_block_height bigint;

-- One-shot redemption marker: a confirmed intent buys exactly one generation.
-- Set atomically by the generate endpoint; cleared when generation fails so
-- the buyer can retry without paying again.
ALTER TABLE generation_payment_intents
  ADD COLUMN IF NOT EXISTS consumed_at timestamptz;

-- Delivery marker: distinguishes a delivered generation (never reusable)
-- from a dead claim (process died mid-generation) that the redeem path may
-- atomically rescue after its staleness window.
ALTER TABLE generation_payment_intents
  ADD COLUMN IF NOT EXISTS fulfilled_at timestamptz;
