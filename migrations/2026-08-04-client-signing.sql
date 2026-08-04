-- Client-side signing: pin the built transaction message on the intent row.
--
-- Today the server signs FOR the buyer via Turnkey
-- (app/api/payments/generation/pay/route.ts, "10. Buyer signature via
-- Turnkey"). That is custodial: a key the server controls can move a user's
-- funds. The replacement is two-phase —
--
--   phase 1  server builds the tx, the fee payer signs (gas + ATA rent only,
--            never the user's money), and the exact message is PINNED here
--   phase 2  the client signs that message with its own wallet (CDP) and
--            posts the signature back; the server verifies it against the
--            pinned bytes and only then broadcasts
--
-- Pinning is what makes phase 2 safe: without it a caller could hand back a
-- signature over a *different* transaction than the one we quoted and priced.
--
-- Verified live before writing (PostgREST, 2026-08-04): generation_payment_intents
-- has id, buyer_wallet, prompt_id, model_family, resolution, artist_wallet,
-- artist_amount_micro, model_cost_micro, enki_fee_micro, total_micro, currency,
-- fee_bps, fee_base, fee_mode, status, tx_signature, expires_at, created_at,
-- updated_at, last_valid_block_height, consumed_at, fulfilled_at, fronted_atas.
-- No built_message column exists yet, and status carries no CHECK we may break.
--
-- Additive and re-runnable: one nullable column, no constraint on any existing
-- column (the mistake that made PR #54's migration 004 roll back entirely).

ALTER TABLE generation_payment_intents
  ADD COLUMN IF NOT EXISTS built_message text;

COMMENT ON COLUMN generation_payment_intents.built_message IS
  'Base64 of the compiled v0 transaction message handed to the client in phase 1. '
  'Phase 2 verifies the returned signature against exactly these bytes, so a client '
  'can never swap in a different transaction. Cleared once the tx is broadcast.';

-- Phase 1 hands out a message and then waits for the client; a resumed or
-- retried request must find that row again. The existing status values are
-- reused deliberately ('building' already means "claimed, not yet broadcast"),
-- so no CHECK constraint has to change.
CREATE INDEX IF NOT EXISTS generation_payment_intents_awaiting_idx
  ON generation_payment_intents (status, updated_at)
  WHERE built_message IS NOT NULL AND tx_signature IS NULL;
