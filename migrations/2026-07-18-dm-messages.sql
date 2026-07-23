-- Direct messages — threads, messages, overview RPC (Kev, 2026-07-18).
-- Verified live 2026-07-18: no messaging tables existed; users(id uuid,
-- handle citext, display_name, avatar_url, deleted_at) confirmed via PostgREST.
-- Run once in the Supabase SQL editor. Idempotent — safe to run repeatedly.

CREATE TABLE IF NOT EXISTS dm_threads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Canonical pair: user_a < user_b (uuid order), so one row per pair.
  user_a uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user_b uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  a_last_read_at timestamptz,
  b_last_read_at timestamptz,
  last_message_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT dm_threads_pair_order CHECK (user_a < user_b)
);
CREATE UNIQUE INDEX IF NOT EXISTS dm_threads_pair_idx ON dm_threads (user_a, user_b);
CREATE INDEX IF NOT EXISTS dm_threads_user_a_idx ON dm_threads (user_a, last_message_at DESC);
CREATE INDEX IF NOT EXISTS dm_threads_user_b_idx ON dm_threads (user_b, last_message_at DESC);

CREATE TABLE IF NOT EXISTS dm_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL REFERENCES dm_threads(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body text,
  image_path text,  -- storage path in the private "dm" bucket (signed URLs at read time)
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT dm_messages_has_content CHECK (body IS NOT NULL OR image_path IS NOT NULL),
  CONSTRAINT dm_messages_body_len CHECK (body IS NULL OR char_length(body) <= 2000)
);
CREATE INDEX IF NOT EXISTS dm_messages_thread_idx ON dm_messages (thread_id, created_at);

-- Server-only tables: RLS on with no policies (anon/authenticated read nothing),
-- plus explicit grant revokes — Supabase grants table privileges to anon AND
-- authenticated by default (same lesson as 2026-07-15-security-hardening.sql).
ALTER TABLE dm_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE dm_messages ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE dm_threads FROM PUBLIC, anon, authenticated;
REVOKE ALL ON TABLE dm_messages FROM PUBLIC, anon, authenticated;

-- Conversation overview: one call returns every thread with peer info, the
-- latest message and the unread count — PostgREST can't express the lateral
-- join + per-thread count. SECURITY INVOKER on purpose (service_role has table
-- access and bypasses RLS; no DEFINER surface for the security advisor).
CREATE OR REPLACE FUNCTION dm_overview(p_user uuid)
RETURNS TABLE (
  thread_id uuid, peer_id uuid, peer_handle text, peer_name text, peer_avatar text,
  last_at timestamptz, last_body text, last_sender uuid, last_has_image boolean,
  unread bigint
)
LANGUAGE sql STABLE SET search_path = public
AS $$
  SELECT t.id, u.id, u.handle::text, u.display_name, u.avatar_url,
         m.created_at, m.body, m.sender_id, (m.image_path IS NOT NULL),
         (SELECT count(*) FROM dm_messages x
            WHERE x.thread_id = t.id AND x.sender_id <> p_user
              AND x.created_at > COALESCE(
                CASE WHEN t.user_a = p_user THEN t.a_last_read_at ELSE t.b_last_read_at END,
                'epoch'::timestamptz))
  FROM dm_threads t
  JOIN users u ON u.id = CASE WHEN t.user_a = p_user THEN t.user_b ELSE t.user_a END
             AND u.deleted_at IS NULL
  LEFT JOIN LATERAL (
    SELECT m.created_at, m.body, m.sender_id, m.image_path
    FROM dm_messages m WHERE m.thread_id = t.id
    ORDER BY m.created_at DESC LIMIT 1
  ) m ON true
  WHERE t.user_a = p_user OR t.user_b = p_user
  ORDER BY COALESCE(m.created_at, t.created_at) DESC
  -- Generous cap: the overview is also the unread-badge source, so threads
  -- must not silently fall off the end at realistic scale.
  LIMIT 200;
$$;
REVOKE ALL ON FUNCTION dm_overview(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION dm_overview(uuid) TO service_role;
