-- App-side WebAuthn passkeys for STEP-UP 2FA (opt-in): a user who registers a
-- passkey must re-authenticate with it before sensitive actions (delete work,
-- withdrawals). Independent of Privy/Turnkey — gates OUR API endpoints via OUR
-- session. Run once in the Supabase SQL editor. Idempotent.

CREATE TABLE IF NOT EXISTS webauthn_credentials (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  credential_id text NOT NULL UNIQUE,   -- base64url of the raw credential id
  public_key    text NOT NULL,          -- base64url of the COSE public key
  counter       bigint NOT NULL DEFAULT 0,
  transports    text,                   -- JSON array of hints, nullable
  device_label  text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  last_used_at  timestamptz
);

CREATE INDEX IF NOT EXISTS webauthn_credentials_user_idx ON webauthn_credentials (user_id);

-- RLS on, no policies: clients never touch this directly; our server routes
-- (service_role) bypass RLS.
ALTER TABLE webauthn_credentials ENABLE ROW LEVEL SECURITY;
