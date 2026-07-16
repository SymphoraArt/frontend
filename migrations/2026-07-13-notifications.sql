-- Notifications: comments, ratings, generations, guardian confirms/declines
-- (Kev, 2026-07-13). ADAPTS the PRE-EXISTING notifications table (verified
-- live: id, user_id, kind, target_type, target_uuid, actor_user_id, title,
-- body, metadata NOT NULL, read_at, seen_at, sent_email, sent_push,
-- created_at — it was empty). Run once in the Supabase SQL editor. Idempotent.
--
-- Design (small runtime at scale):
--  * ONE row per (user, kind, target, day) — repeat events (e.g. hundreds of
--    generations on one prompt) COALESCE into a counter instead of new rows.
--  * Writes are a single atomic RPC (insert-or-increment), O(1) per event.
--  * The unread badge is a COUNT over a partial index (seen_at IS NULL) —
--    it only ever touches unread rows, no matter how large the table grows.
--  * title/body are denormalized snapshots: reading needs NO joins.

ALTER TABLE notifications ADD COLUMN IF NOT EXISTS count int NOT NULL DEFAULT 1;
ALTER TABLE notifications ADD COLUMN IF NOT EXISTS day date NOT NULL DEFAULT (now() AT TIME ZONE 'utc')::date;

-- The pre-existing table carries CHECK constraints from its old design that
-- reject our kind/target values (found live 2026-07-14: 23514 on every
-- insert — notifications silently never landed). Replace them with ours.
ALTER TABLE notifications DROP CONSTRAINT IF EXISTS notifications_kind_check;
ALTER TABLE notifications ADD CONSTRAINT notifications_kind_check
  CHECK (kind IN ('comment', 'rating', 'generation', 'guardian_confirmed', 'guardian_declined')) NOT VALID;
ALTER TABLE notifications DROP CONSTRAINT IF EXISTS notifications_target_type_check;
ALTER TABLE notifications ADD CONSTRAINT notifications_target_type_check
  CHECK (target_type IS NULL OR target_type IN ('prompt', 'guardian')) NOT VALID;

-- Coalescing identity. NULL target_uuid rows never coalesce (NULLS DISTINCT).
CREATE UNIQUE INDEX IF NOT EXISTS notifications_coalesce_idx
  ON notifications (user_id, kind, target_uuid, day);
-- Feed read: newest first per user.
CREATE INDEX IF NOT EXISTS notifications_user_created_idx
  ON notifications (user_id, created_at DESC);
-- Unread badge: partial index keeps the count O(unread).
CREATE INDEX IF NOT EXISTS notifications_unseen_idx
  ON notifications (user_id) WHERE seen_at IS NULL;

-- Atomic insert-or-increment. Re-surfacing: a coalesced row becomes unread
-- again (seen_at NULL) and jumps to the top (created_at now()).
CREATE OR REPLACE FUNCTION notify_event(
  p_user uuid,
  p_kind text,
  p_title text,
  p_body text DEFAULT NULL,
  p_target_type text DEFAULT NULL,
  p_target uuid DEFAULT NULL,
  p_actor uuid DEFAULT NULL,
  p_meta jsonb DEFAULT '{}'::jsonb
) RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  INSERT INTO notifications (user_id, kind, title, body, target_type, target_uuid, actor_user_id, metadata)
  VALUES (p_user, p_kind, p_title, p_body, p_target_type, p_target, p_actor, coalesce(p_meta, '{}'::jsonb))
  ON CONFLICT (user_id, kind, target_uuid, day)
  DO UPDATE SET
    count         = notifications.count + 1,
    title         = EXCLUDED.title,
    body          = EXCLUDED.body,
    metadata      = EXCLUDED.metadata,
    actor_user_id = EXCLUDED.actor_user_id,
    created_at    = now(),
    seen_at       = NULL,
    read_at       = NULL;
$$;

-- SECURITY DEFINER + PostgREST would expose this RPC to the public anon key
-- (anyone could inject/spoof notifications into any user's feed). Supabase
-- grants EXECUTE to anon AND authenticated by default, so REVOKE FROM PUBLIC
-- alone is NOT enough — the two roles must be revoked explicitly.
REVOKE ALL ON FUNCTION notify_event(uuid, text, text, text, text, uuid, uuid, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION notify_event(uuid, text, text, text, text, uuid, uuid, jsonb) TO service_role;

-- Only our server (service_role) writes/reads; RLS stays on, no public policies.
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
