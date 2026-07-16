-- Runtime config + pricing rules (discounts) — change values in the DB and the
-- next request uses them. No deploy, no restart.
--
--   app_config     — global knobs (fee %, referral share, …), JSONB per key.
--   pricing_rules  — "audience X gets effect Z on scope Y" discount rules,
--                    applied server-side in computeQuote (quote + intent + pay
--                    all inherit them because the intent persists the
--                    discounted amounts).
--   (free-generation caps are derived from generation_payment_intents rows —
--    no counter table by design.)
--
-- Run once in the Supabase SQL editor. Idempotent.

-- ── 1) Global config ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS app_config (
  key        text PRIMARY KEY,
  value      jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Effective revenue knobs; shared/revenue-config.ts stays as the fallback when
-- a key is missing here.
INSERT INTO app_config (key, value) VALUES
  ('revenue', '{"platform_fee_pct": 10, "referral_share_pct": 50, "hunt_share_pct": 50}')
ON CONFLICT (key) DO NOTHING;

-- ── 2) Pricing rules ─────────────────────────────────────────────────────────
-- audience: {"roles": [...], "ranks": [...], "user_ids": [...]} — every given
--           field must match (AND); {} = everyone. OR-cases = separate rules.
-- scope:    {"models": [...], "prompt_ids": [...]} — same semantics; {} = everything.
-- effect:   {"type": "fee_percent_off", "value": 30}
--             → Enki fee reduced by 30% (costs us only margin, artist unaffected)
--           {"type": "free_generation", "uses_per_day": 3}
--             → buyer's Enki leg (model cost + fee) waived, artist share STAYS;
--               capped per user per UTC day when uses_per_day is set
CREATE TABLE IF NOT EXISTS pricing_rules (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  active     boolean NOT NULL DEFAULT true,
  priority   int NOT NULL DEFAULT 0,          -- higher wins when several match
  audience   jsonb NOT NULL DEFAULT '{}'::jsonb,
  scope      jsonb NOT NULL DEFAULT '{}'::jsonb,
  effect     jsonb NOT NULL,
  starts_at  timestamptz,                      -- NULL = immediately
  ends_at    timestamptz,                      -- NULL = until deactivated
  created_at timestamptz NOT NULL DEFAULT now()
);

-- NO redemption-counter table: free-use quotas are DERIVED from
-- generation_payment_intents rows (reserved at intent creation, auto-refunded
-- by expiry, permanent once fulfilled — see lib/payments/pricing-rules.ts).
-- Counters would drift and be gameable; committed rows can't.
-- Cleanup in case an earlier version of this migration already created them:
DROP FUNCTION IF EXISTS increment_rule_redemption(uuid, uuid);
DROP TABLE IF EXISTS pricing_rule_redemptions;

-- Audit + quota source: which rule discounted a persisted intent.
ALTER TABLE generation_payment_intents
  ADD COLUMN IF NOT EXISTS applied_rule_id uuid REFERENCES pricing_rules(id);
-- Fast per-user-per-day quota counting:
CREATE INDEX IF NOT EXISTS gpi_rule_buyer_day_idx
  ON generation_payment_intents (applied_rule_id, buyer_wallet, created_at)
  WHERE applied_rule_id IS NOT NULL;

-- ── Examples (edit/insert live — active on the next request) ────────────────
-- 30% off the Enki fee for everyone with rank 'artist' or higher... (AND
-- semantics: use one rule per rank, or target roles/user lists):
--   INSERT INTO pricing_rules (name, priority, audience, scope, effect) VALUES
--     ('Artists: 30% fee off', 10, '{"ranks": ["artist"]}', '{}', '{"type": "fee_percent_off", "value": 30}');
--
-- 3 free generations per day on one model for mods:
--   INSERT INTO pricing_rules (name, priority, audience, scope, effect) VALUES
--     ('Mods: 3 free/day on Nano Banana', 20,
--      '{"roles": ["mod"]}', '{"models": ["nano-banana-pro"]}',
--      '{"type": "free_generation", "uses_per_day": 3}');
--
-- Launch weekend, everyone, scheduled:
--   INSERT INTO pricing_rules (name, priority, effect, starts_at, ends_at) VALUES
--     ('Launch weekend: half fee', 5, '{"type": "fee_percent_off", "value": 50}',
--      '2026-08-01T00:00:00Z', '2026-08-03T23:59:59Z');
--
-- Turn a rule off instantly:  UPDATE pricing_rules SET active = false WHERE name = '…';

-- RLS: only server routes (service role) read these.
ALTER TABLE app_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_rule_redemptions ENABLE ROW LEVEL SECURITY;
