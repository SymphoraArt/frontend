-- Payment intents for server-built generation payments (backlog #2).
-- Not yet applied automatically — run in the Supabase SQL editor before
-- wiring the confirm endpoint. The quote endpoint is read-only and does
-- not require this table.

CREATE TABLE IF NOT EXISTS generation_payment_intents (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_wallet        text NOT NULL,
  prompt_id           text NOT NULL,
  model_family        text NOT NULL,
  resolution          text NOT NULL DEFAULT '2K',
  artist_wallet       text,
  -- All amounts are integer micro-USDC (1 USDC = 1e6).
  artist_amount_micro bigint NOT NULL CHECK (artist_amount_micro >= 0),
  model_cost_micro    bigint NOT NULL CHECK (model_cost_micro >= 0),
  enki_fee_micro      bigint NOT NULL CHECK (enki_fee_micro >= 0),
  total_micro         bigint NOT NULL CHECK (total_micro >= 0),
  currency            text NOT NULL DEFAULT 'USDC',
  -- Snapshot of the fee policy the amounts were computed under.
  fee_bps             integer NOT NULL,
  fee_base            text NOT NULL,
  fee_mode            text NOT NULL,
  status              text NOT NULL DEFAULT 'quoted'
                      CHECK (status IN ('quoted', 'building', 'submitted', 'confirmed', 'failed', 'expired')),
  tx_signature        text,
  expires_at          timestamptz NOT NULL,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS generation_payment_intents_buyer_idx
  ON generation_payment_intents (buyer_wallet, created_at DESC);
CREATE INDEX IF NOT EXISTS generation_payment_intents_status_idx
  ON generation_payment_intents (status, expires_at);

-- Row Level Security: written exclusively by the backend via the service
-- role — the anon key must never read or write intents.
ALTER TABLE generation_payment_intents ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename   = 'generation_payment_intents'
      AND policyname  = 'Service role can manage payment intents'
  ) THEN
    CREATE POLICY "Service role can manage payment intents"
      ON generation_payment_intents FOR ALL TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END $$;
