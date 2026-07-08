-- Front-ledger: Enki's fee payer funds each recipient's USDC token account
-- (ATA) rent AT MOST ONCE, ever. Recipients own their ATA and can close it,
-- pocketing the rent (~0.002 SOL); without this bound a close-and-recreate
-- loop drains the fee payer's float one payment at a time. A row here means
-- the rent for this exact ATA has been paid once — the pay endpoint refuses
-- to front it again.
--
-- Run once in the Supabase SQL editor. Idempotent.

CREATE TABLE IF NOT EXISTS fronted_recipient_atas (
  ata_address      text PRIMARY KEY,
  recipient_wallet text NOT NULL,
  mint             text NOT NULL,
  -- The intent whose confirmed payment created the ATA (audit trail).
  intent_id        uuid,
  first_funded_at  timestamptz NOT NULL DEFAULT now()
);

-- Written exclusively by the backend via the service role.
ALTER TABLE fronted_recipient_atas ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename   = 'fronted_recipient_atas'
      AND policyname  = 'Service role can manage fronted ATAs'
  ) THEN
    CREATE POLICY "Service role can manage fronted ATAs"
      ON fronted_recipient_atas FOR ALL TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Which ATAs a broadcast payment is about to create (jsonb array of
-- {ata, recipient, mint}); copied into the ledger when the tx confirms, so
-- a crash between broadcast and confirmation cannot lose the record.
ALTER TABLE generation_payment_intents
  ADD COLUMN IF NOT EXISTS fronted_atas jsonb;
