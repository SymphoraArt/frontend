-- Authorise-then-capture for generation payments (Kev, 2026-08-06):
-- "once the image goes through, we will receive the money. otherwise it will
-- be sent back."
--
-- The buyer signs a Solana transfer built on a DURABLE NONCE, and we do not
-- broadcast it. A durable-nonce transaction never expires by itself, which is
-- precisely what turns it into an AUTHORISATION rather than a payment: it
-- stays spendable until either we broadcast it (capture) or we advance the
-- nonce (void). There is no refund path because no money ever moves before
-- the image exists.
--
-- ── Why a heartbeat and not a deadline ──────────────────────────────────
-- A deadline on the ORDER is wrong in both directions: a slow generation dies
-- mid-flight and the buyer pays nothing for an image they receive, while a
-- finished one leaves a live authorisation lying around for the rest of its
-- window. So the authorisation is bound to a STATE — "someone is working on
-- this" — and the only clock left measures SILENCE rather than elapsed work.
-- A job that keeps beating may run as long as it likes; a job that stops
-- beating is dead, and that is a platform guarantee, not a guess: past the
-- route's maxDuration the process is gone, not merely slow.
--
-- expires_at is deliberately untouched and keeps its old meaning. A QUOTE
-- expires — a price from yesterday is not honourable, which is a commercial
-- decision and rightly time-based. An AUTHORISATION does not.
--
-- Idempotent. Run in the Supabase SQL editor.

-- ── The authorisation itself ────────────────────────────────────────────
ALTER TABLE generation_payment_intents
  -- Set when the buyer's signature arrives. Until then this is only a quote.
  ADD COLUMN IF NOT EXISTS authorized_at    timestamptz,
  -- The durable nonce this signature is bound to. Advancing it is what makes
  -- the signed transaction permanently unusable.
  ADD COLUMN IF NOT EXISTS nonce_account    text,
  ADD COLUMN IF NOT EXISTS nonce_authority  text;

-- The signed, unbroadcast transaction. Encrypted at rest like every other
-- authored value in this schema: a dump would otherwise hand an attacker a
-- stack of ready-to-broadcast charges against real buyers.
--
-- Note what the nonce buys us here — a leaked authorisation whose nonce has
-- since been advanced is INERT. The flush is not only hygiene, it is what
-- bounds the blast radius of losing this column.
ALTER TABLE generation_payment_intents
  ADD COLUMN IF NOT EXISTS authorized_tx_ct  text,
  ADD COLUMN IF NOT EXISTS authorized_tx_iv  text,
  ADD COLUMN IF NOT EXISTS authorized_tx_tag text,
  ADD COLUMN IF NOT EXISTS authorized_tx_kid text;

-- ── The liveness signal ─────────────────────────────────────────────────
-- Renewed by the running generation. Not "valid until" but "last seen".
ALTER TABLE generation_payment_intents
  ADD COLUMN IF NOT EXISTS heartbeat_at timestamptz;

-- ── The two terminal outcomes, mutually exclusive by construction ───────
-- Exactly one of these may ever be set. Both are claimed with a conditional
-- UPDATE that requires the other to be NULL, so the loser updates zero rows
-- and learns it lost. We must never both broadcast and flush the same nonce.
ALTER TABLE generation_payment_intents
  ADD COLUMN IF NOT EXISTS captured_at  timestamptz,
  ADD COLUMN IF NOT EXISTS voided_at    timestamptz,
  -- Why it was voided: provider_failed | rejected | cancelled | abandoned.
  -- Kept for the false-positive review Kev asked for — a spike of "rejected"
  -- is a moderation problem, not a payment one, and the two must stay
  -- distinguishable in the record.
  ADD COLUMN IF NOT EXISTS void_reason  text;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'generation_payment_intents_void_reason_check'
  ) THEN
    ALTER TABLE generation_payment_intents
      ADD CONSTRAINT generation_payment_intents_void_reason_check
      CHECK (void_reason IS NULL OR void_reason IN
        ('provider_failed', 'rejected', 'cancelled', 'abandoned', 'expired'));
  END IF;
END $$;

-- Belt and braces for the invariant the application already enforces: no row
-- may be captured and voided at once. A bug that tried would fail loudly here
-- instead of quietly charging for an image we also refused.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'generation_payment_intents_single_outcome'
  ) THEN
    ALTER TABLE generation_payment_intents
      ADD CONSTRAINT generation_payment_intents_single_outcome
      CHECK (captured_at IS NULL OR voided_at IS NULL);
  END IF;
END $$;

-- ── Status mirror ───────────────────────────────────────────────────────
-- status stays a human-readable mirror and is never the thing a claim tests:
-- correctness rests on the nullable timestamps above, so status drifting can
-- annoy an admin but cannot mis-charge a buyer.
DO $$
BEGIN
  ALTER TABLE generation_payment_intents DROP CONSTRAINT IF EXISTS generation_payment_intents_status_check;
  ALTER TABLE generation_payment_intents
    ADD CONSTRAINT generation_payment_intents_status_check
    CHECK (status IN (
      'quoted', 'building', 'submitted', 'confirmed', 'failed', 'expired',
      -- signed, not broadcast; generation not started yet
      'authorized',
      -- a worker holds it and is beating
      'generating',
      -- broadcast: the image was delivered
      'captured',
      -- nonce advanced: nothing was or will be charged
      'voided'
    ));
END $$;

-- The sweeper's only query: authorisations still open whose worker went
-- quiet. Partial, so it stays small however many intents accumulate.
CREATE INDEX IF NOT EXISTS generation_payment_intents_live_idx
  ON generation_payment_intents (heartbeat_at)
  WHERE authorized_at IS NOT NULL
    AND captured_at IS NULL
    AND voided_at IS NULL;
