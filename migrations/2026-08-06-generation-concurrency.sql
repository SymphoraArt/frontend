-- How many generations one user may have in flight at once.
--
-- Kev, 2026-08-06: unlimited for now, but adjustable from the admin panel, and
-- adjustable by an ADMIN only — not a mod. So the number lives in a row rather
-- than in an env var: changing it must not need a deploy, and it must be
-- something the panel can write.
--
-- NULL means unlimited, and that is the shipped default. An unlimited setting
-- expressed as a very large number would look like a limit and behave like
-- none; NULL says plainly that nothing is enforced yet.
--
-- ── Why a slot table and not a count over generations ───────────────────
-- A generation is synchronous inside the request, so "in flight" is not a
-- state any existing table records: generations only gets a row once the
-- picture exists, and generation_jobs is an unused queue. Counting rows in a
-- recent time window would guess. A slot is taken when the work starts and
-- released when it ends, which is the actual thing being limited.
--
-- Slots carry an expiry above the route's maxDuration (120s), so a function
-- killed mid-generation cannot leak a slot and lock a user out for good.
--
-- Additive and re-runnable.

CREATE TABLE IF NOT EXISTS generation_policy (
  id                      smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  -- NULL = unlimited. A positive number caps concurrent generations per user.
  max_concurrent_per_user int CHECK (max_concurrent_per_user IS NULL OR max_concurrent_per_user > 0),
  updated_at              timestamptz NOT NULL DEFAULT now(),
  updated_by              uuid REFERENCES users(id)
);

COMMENT ON COLUMN generation_policy.max_concurrent_per_user IS
  'NULL means unlimited — the shipped default. Editable by an admin only; '
  'mods must not be able to throttle the product.';

INSERT INTO generation_policy (id, max_concurrent_per_user)
VALUES (1, NULL)
ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS generation_slots (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  started_at timestamptz NOT NULL DEFAULT now(),
  -- Above maxDuration (120s) on purpose: a crashed function must release its
  -- own slot by expiry, or one bad request locks a user out permanently.
  expires_at timestamptz NOT NULL DEFAULT now() + interval '150 seconds'
);

CREATE INDEX IF NOT EXISTS generation_slots_user_idx ON generation_slots (user_id, expires_at);

COMMENT ON TABLE generation_slots IS
  'One row per generation currently running. Taken before the provider call, '
  'released after it, and self-expiring so a killed function cannot leak one.';

ALTER TABLE generation_policy ENABLE ROW LEVEL SECURITY;
ALTER TABLE generation_slots  ENABLE ROW LEVEL SECURITY;

-- Check:
--   SELECT max_concurrent_per_user FROM generation_policy WHERE id = 1;
--   SELECT user_id, count(*) FROM generation_slots
--   WHERE expires_at > now() GROUP BY user_id;
