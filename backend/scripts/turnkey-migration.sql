-- Turnkey embedded wallet integration
-- Run this in Supabase SQL editor

-- Passkey-based Turnkey sub-orgs (linked to EVM wallet address)
CREATE TABLE IF NOT EXISTS user_turnkey_orgs (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_address text        UNIQUE NOT NULL,
  sub_org_id     text        UNIQUE NOT NULL,
  solana_address text,
  created_at     timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS user_turnkey_orgs_wallet_idx ON user_turnkey_orgs(wallet_address);
CREATE INDEX IF NOT EXISTS user_turnkey_orgs_solana_idx ON user_turnkey_orgs(solana_address);

-- Email OTP-based Turnkey users (standalone email login, no EVM wallet required)
CREATE TABLE IF NOT EXISTS turnkey_users (
  id                  uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  email               text        UNIQUE NOT NULL,
  sub_organization_id text        UNIQUE NOT NULL,
  wallet_address      text        NOT NULL,
  wallet_id           text,
  created_at          timestamptz DEFAULT now(),
  updated_at          timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS turnkey_users_email_idx  ON turnkey_users(email);
CREATE INDEX IF NOT EXISTS turnkey_users_wallet_idx ON turnkey_users(wallet_address);

-- Short-lived delete confirmation tokens (TTL: 5 minutes)
CREATE TABLE IF NOT EXISTS delete_confirm_tokens (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  token      text        UNIQUE NOT NULL,
  user_email text        NOT NULL,
  expires_at timestamptz NOT NULL,
  used       boolean     DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS delete_confirm_tokens_token_idx ON delete_confirm_tokens(token);

-- Auto-cleanup expired tokens (optional, run as a cron or manual cleanup)
-- DELETE FROM delete_confirm_tokens WHERE expires_at < now();

-- OTP session tracking: ties otpId to the email it was issued for (prevents email substitution attacks)
CREATE TABLE IF NOT EXISTS otp_sessions (
  otp_id         text        PRIMARY KEY,
  email          text        NOT NULL,
  organization_id text       NOT NULL,
  expires_at     timestamptz NOT NULL,
  created_at     timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS otp_sessions_email_idx ON otp_sessions(email);
