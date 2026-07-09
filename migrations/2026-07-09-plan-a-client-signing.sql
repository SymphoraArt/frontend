-- Plan A client-side signing: the pay route persists the built (unsigned-by-
-- buyer) transaction message between the build and submit phases, so the
-- buyer's passkey signature can be attached to exactly the bytes that were
-- built. Run once in the Supabase SQL editor. Idempotent.
ALTER TABLE generation_payment_intents ADD COLUMN IF NOT EXISTS built_message text;
