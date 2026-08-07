-- The artist side of the payout-account setup cost.
--
-- Terms of Use, Section 7: "A one time network setup cost for the payout
-- account (currently about $0.15; it varies with network conditions) is
-- deducted in halves from an artist's first revenue shares until covered."
--
-- Enki pays that cost — a Solana token account needs 2,039,280 lamports of
-- rent-exempt deposit (165 bytes, measured 2026-08-06) — so an artist can be
-- paid without ever holding SOL. Until now only the paying half existed:
-- generation_payment_intents.fronted_atas records WHICH accounts we funded,
-- and nothing anywhere recorded what that cost or what came back. This table
-- is the accounting we promised.
--
-- ── Why a table of its own ──────────────────────────────────────────────
-- Not on generation_payment_intents: an intent is one purchase by one buyer,
-- while this debt spans many purchases and outlives all of them. A running
-- balance on a per-purchase row needs a rule for which row is authoritative,
-- and the answer is always "none of them".
-- Not on users or user_wallets: it is not an attribute of an identity. A
-- wallet row can be soft-removed (user_wallets.removed_at) while the debt and
-- its history must survive for the accounting.
-- Not on fronted_recipient_atas: that table (live, empty, no migration in this
-- repo) records the FACT that an account was funded and carries no money at
-- all. An amount and its repayment do not belong on a row about an address.
--
-- ── Why entries and not two counters ────────────────────────────────────
-- Counters cannot say WHEN or FROM WHICH sale, and "an accounting" that
-- cannot itemise is not one. Entries also buy the two properties that
-- otherwise have to be hoped for in application code, here as constraints:
-- the setup cost can be charged once per payout account and a recovery can be
-- written once per intent. The balance is then derived, so it can never
-- disagree with the entries the way a counter drifts from its history.
--
-- Idempotent. Run in the Supabase SQL editor.

CREATE TABLE IF NOT EXISTS artist_cost_ledger (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Case-EXACT base58, as stored in user_wallets. A lowercased Solana address
  -- is a different (and usually nonexistent) account, so a caller that passes
  -- the session's lowercased copy would open a second, parallel debt and lose
  -- the first. Callers go through lib/payments/fronted-ledger.ts, which takes
  -- the address from exactWallet().
  artist_wallet text NOT NULL,
  -- An ATA belongs to (owner, mint), and devnet USDC is not mainnet USDC.
  -- Without this column a cost fronted on devnet would be recovered from real
  -- mainnet earnings.
  mint          text NOT NULL,
  entry         text NOT NULL CHECK (entry IN ('fronted', 'recovered')),
  -- integer micro-USDC (1 USDC = 1e6), matching generation_payment_intents.
  -- Both directions are positive; `entry` carries the sign. Zero is excluded
  -- because a recovery of nothing is not written at all.
  micro         bigint NOT NULL CHECK (micro > 0),
  -- What the chain actually charged us, on the fronting entry only. Kept
  -- beside micro so the rate the debt was priced at stays derivable
  -- (micro / lamports) and the artist's number can be audited years later,
  -- long after SOL has moved.
  lamports      bigint CHECK (lamports IS NULL OR lamports > 0),
  -- The intent this entry arose from. Deliberately NOT a foreign key: a
  -- ledger entry must outlive the operational row that caused it, and no
  -- cascade may ever delete a record of money taken from an artist.
  intent_id     uuid,
  created_at    timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT artist_cost_ledger_lamports_on_fronting
    CHECK ((entry = 'fronted') = (lamports IS NOT NULL)),
  -- The recovery's idempotency key; see the unique index below.
  CONSTRAINT artist_cost_ledger_recovery_has_intent
    CHECK (entry <> 'recovered' OR intent_id IS NOT NULL)
);

-- "A one time network setup cost" as a constraint rather than as a hope.
-- Re-running /authorize, or an artist closing and re-creating their token
-- account, must never put the charge on their books twice; the second
-- fronting is Enki's to absorb.
CREATE UNIQUE INDEX IF NOT EXISTS artist_cost_ledger_one_fronting
  ON artist_cost_ledger (artist_wallet, mint) WHERE entry = 'fronted';

-- One instalment per intent PER PAYOUT ACCOUNT. The recovery is recorded after
-- the payment is broadcast, and that write can be retried; without this a
-- retry would deduct a second time from a share that only moved once.
--
-- Keyed on (intent_id, artist_wallet, mint) rather than intent_id alone,
-- because one intent will not always mean one artist: source-split payouts pay
-- several artists from a single atomic transaction. With intent_id alone, the
-- SECOND artist on a shared intent hits the constraint, recordRecovery returns
-- false, and their deduction is silently never booked. Free to fix while the
-- table is empty and the migration unapplied; a data repair afterwards.
CREATE UNIQUE INDEX IF NOT EXISTS artist_cost_ledger_one_recovery_per_intent
  ON artist_cost_ledger (intent_id, artist_wallet, mint) WHERE entry = 'recovered';

-- The only hot query: the outstanding balance of one payout account.
CREATE INDEX IF NOT EXISTS artist_cost_ledger_account_idx
  ON artist_cost_ledger (artist_wallet, mint);

COMMENT ON TABLE artist_cost_ledger IS
  'Payout-account setup cost fronted by Enki and its recovery from artist '
  'revenue shares (Terms of Use, Section 7). Append-only: entries are never '
  'updated or deleted, and the balance is SUM(fronted) - SUM(recovered). A '
  'NEGATIVE balance means we recovered more than we fronted — possible when '
  'two sales are authorised against the same balance at once — and is a debt '
  'owed BACK to the artist, so it is left visible rather than clamped away.';

-- Written exclusively by the backend via the service role, like every other
-- money table here. An artist may be shown their own entries through an
-- endpoint; the anon key must never read the ledger directly.
ALTER TABLE artist_cost_ledger ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename   = 'artist_cost_ledger'
      AND policyname  = 'Service role can manage the artist cost ledger'
  ) THEN
    CREATE POLICY "Service role can manage the artist cost ledger"
      ON artist_cost_ledger FOR ALL TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Check:
--   SELECT artist_wallet, mint,
--          SUM(micro) FILTER (WHERE entry = 'fronted')
--            - COALESCE(SUM(micro) FILTER (WHERE entry = 'recovered'), 0) AS outstanding_micro
--   FROM artist_cost_ledger GROUP BY 1, 2 ORDER BY 3 DESC;
