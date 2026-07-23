-- Email + password login as a SECOND auth method ALONGSIDE Turnkey.
-- Isolated in its own table (mirrors how turnkey_users isolates Turnkey), so it
-- touches neither the rich users profile / encrypted-email design nor the
-- Turnkey tables. Passwords are Argon2id + env-pepper (see lib/password-auth);
-- the wallet stays non-custodial (Privy embedded, attached after login).
-- Run once in the Supabase SQL editor. Idempotent, additive only — no changes
-- to existing tables or constraints.

-- Credential store. Plaintext email is consistent with the existing auth-layer
-- tables (turnkey_users.email, otp_sessions.email are plaintext too). user_id
-- is the app identity: register creates one bare users row per password account
-- so wallets (user_wallets) and content (prompts.creator_id) link normally.
CREATE TABLE IF NOT EXISTS password_credentials (
  user_id    uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  email      text NOT NULL,
  pw_hash    text NOT NULL,
  pw_salt    text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- One account per email (case-insensitive).
CREATE UNIQUE INDEX IF NOT EXISTS password_credentials_email_unique_idx
  ON password_credentials (lower(email));

-- Single-use password-reset tokens (forgot/reset flow).
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  token      text PRIMARY KEY,
  user_id    uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- RLS on, NO policies: anon/authenticated clients are fully locked out of the
-- credential store; our server routes use the service-role key which bypasses
-- RLS, so auth keeps working unchanged.
ALTER TABLE password_credentials ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;
