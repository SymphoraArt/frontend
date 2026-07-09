-- Plan A non-custodial onboarding: the passkey is the identity, email is
-- optional (added later, self-service). Run once in the Supabase SQL editor.
-- Idempotent.

-- Email is no longer required at wallet creation.
ALTER TABLE turnkey_users ALTER COLUMN email DROP NOT NULL;

-- The wallet address is now the identity key (email may be null). A unique
-- index makes it the reliable lookup the payment path resolves against.
-- (Postgres treats multiple NULL emails as distinct, so the existing UNIQUE
-- on email keeps working for the opt-in-later recovery emails.)
CREATE UNIQUE INDEX IF NOT EXISTS turnkey_users_wallet_unique_idx
  ON turnkey_users (wallet_address);
