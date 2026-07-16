-- Security hardening — lock down the SECURITY DEFINER RPCs I added
-- (Kev, 2026-07-15). VERIFIED LIVE 2026-07-15: calling these with the anon key
-- succeeded (notify_event ran an INSERT; leaderboard_* returned 200). Root
-- cause: Supabase grants EXECUTE to anon AND authenticated by default, so the
-- earlier "REVOKE … FROM PUBLIC" left those role grants intact. This revokes
-- them explicitly so ONLY the server's service_role can call the functions.
-- Idempotent — safe to run repeatedly. Run once in the Supabase SQL editor.

REVOKE ALL ON FUNCTION notify_event(uuid, text, text, text, text, uuid, uuid, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION notify_event(uuid, text, text, text, text, uuid, uuid, jsonb) TO service_role;

REVOKE ALL ON FUNCTION leaderboard_generations(timestamptz, int) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION leaderboard_generations(timestamptz, int) TO service_role;

REVOKE ALL ON FUNCTION leaderboard_earnings(timestamptz, int) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION leaderboard_earnings(timestamptz, int) TO service_role;

-- Verify after running (all three should return NO rows = anon/authenticated
-- can no longer execute them):
--   SELECT p.proname, r.rolname
--   FROM pg_proc p
--   JOIN pg_namespace n ON n.oid = p.pronamespace AND n.nspname = 'public'
--   CROSS JOIN LATERAL (VALUES ('anon'), ('authenticated')) AS r(rolname)
--   WHERE p.proname IN ('notify_event','leaderboard_generations','leaderboard_earnings')
--     AND has_function_privilege(r.rolname, p.oid, 'EXECUTE');
