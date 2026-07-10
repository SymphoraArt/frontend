-- Email + password login. The wallet stays non-custodial (Dynamic embedded
-- wallet, provisioned from the session) — these columns only gate app login.
-- Passwords are Argon2id + env-pepper (see lib/password-auth); the DB never
-- holds anything usable on its own. Run once in the Supabase SQL editor.

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS email   text,
  ADD COLUMN IF NOT EXISTS pw_hash text,
  ADD COLUMN IF NOT EXISTS pw_salt text;

CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique_idx
  ON users (lower(email)) WHERE email IS NOT NULL;

CREATE TABLE IF NOT EXISTS password_reset_tokens (
  token      text PRIMARY KEY,
  user_id    uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- If auth_sessions.wallet_type has a CHECK constraint, allow 'password' too,
-- e.g.:  ALTER TABLE auth_sessions DROP CONSTRAINT <name>;
--        ALTER TABLE auth_sessions ADD CONSTRAINT auth_sessions_wallet_type_check
--          CHECK (wallet_type IN ('turnkey','solana','evm','password'));
