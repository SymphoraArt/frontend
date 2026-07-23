-- User ROLES (permissions): user / beta / mod / admin.
-- DB-managed list (no hardcoded CHECK), enforced via FOREIGN KEY.
-- The Admin settings section + the closed-beta wall read users.role.
--
-- NOTE: the achievement RANKS system was split out on purpose — see
-- migrations/DRAFT-ranks-system.sql. It is NOT to be run yet (Kev wants a
-- professionally designed rank ladder first).
--
-- Run once in the Supabase SQL editor. Idempotent (also cleans up the earlier
-- CHECK-constraint version if it already ran).

CREATE TABLE IF NOT EXISTS roles (
  key      text PRIMARY KEY,          -- referenced by users.role
  label    text NOT NULL,
  is_staff boolean NOT NULL DEFAULT false
);

INSERT INTO roles (key, label, is_staff) VALUES
  ('user',  'User',        false),
  ('beta',  'Beta tester', false),  -- closed-beta access
  ('mod',   'Moderator',   true),
  ('admin', 'Admin',       true)
ON CONFLICT (key) DO NOTHING;

ALTER TABLE users ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'user';
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;      -- old hardcoded version
DO $$ BEGIN
  ALTER TABLE users ADD CONSTRAINT users_role_fkey FOREIGN KEY (role) REFERENCES roles(key);
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- CLOSED BETA: every page only renders for role IN ('beta','mod','admin').
-- ⚠ Run these right after the migration, or every existing account (including
-- yours) is locked out:
--
--   -- yourself, by email:
--   UPDATE users SET role = 'admin'
--   WHERE id = (SELECT user_id FROM password_credentials
--               WHERE email = 'kirikev4d@gmail.com');
--   -- or by wallet:
--   UPDATE users SET role = 'admin'
--   WHERE id = (SELECT user_id FROM user_wallets
--               WHERE address = '<WALLET>' AND removed_at IS NULL);
--
--   -- all current accounts become beta testers:
--   UPDATE users SET role = 'beta' WHERE role = 'user';
--
-- Check: SELECT role, count(*) FROM users GROUP BY role;

-- RLS: only server routes (service role) read this.
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
