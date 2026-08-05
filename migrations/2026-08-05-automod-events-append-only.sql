-- automod_events becomes append-only: the record of what the filter saw and
-- decided can never be deleted, and never rewritten after the fact.
--
-- Why (Kev, 2026-08-05): these rows are evidence. A CSAM prompt blocked at
-- 23:40 is the thing a prosecutor asks for, and it is worth nothing if anyone
-- who reaches the database can make it disappear afterwards. RLS already keeps
-- the public out; RLS does not stop the service_role key our own server uses,
-- and that key is exactly what leaks.
--
-- Deliberately NOT a blanket write ban. The review workflow has to keep
-- working, so the split is:
--
--   never                DELETE, TRUNCATE
--   never                any change to WHAT HAPPENED — who, when, from which
--                        IP, which decision, which scores, the evidence
--   still allowed        the moderator's own work: review_state, reviewed_by,
--                        reviewed_at, review_notes, ban_id, strike_id
--
-- Limits, stated plainly: this stops the application, the service_role key,
-- and anyone who steals either. It does not stop whoever owns the database —
-- a table owner can drop the trigger from the Supabase SQL editor. That is a
-- property of Postgres, not a gap here: no in-database rule can bind the
-- owner. Off-site backups are what covers that, and they are worth having for
-- the same reason.
--
-- Re-runnable: DROP ... IF EXISTS before each CREATE.

CREATE OR REPLACE FUNCTION automod_events_no_delete()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION
    'automod_events is append-only: % is not permitted on moderation evidence',
    TG_OP
    USING ERRCODE = 'insufficient_privilege';
END;
$$;

CREATE OR REPLACE FUNCTION automod_events_immutable_facts()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  -- Everything describing the event itself is frozen. Compared with
  -- IS DISTINCT FROM so a NULL -> NULL update is not mistaken for a change.
  IF NEW.id            IS DISTINCT FROM OLD.id
  OR NEW.user_id       IS DISTINCT FROM OLD.user_id
  OR NEW.ip_hash       IS DISTINCT FROM OLD.ip_hash
  OR NEW.surface       IS DISTINCT FROM OLD.surface
  OR NEW.decision      IS DISTINCT FROM OLD.decision
  OR NEW.severity      IS DISTINCT FROM OLD.severity
  OR NEW.tier          IS DISTINCT FROM OLD.tier
  OR NEW.category      IS DISTINCT FROM OLD.category
  OR NEW.matched_rules IS DISTINCT FROM OLD.matched_rules
  OR NEW.scores        IS DISTINCT FROM OLD.scores
  OR NEW.prompt_hash   IS DISTINCT FROM OLD.prompt_hash
  OR NEW.evidence_ct   IS DISTINCT FROM OLD.evidence_ct
  OR NEW.evidence_iv   IS DISTINCT FROM OLD.evidence_iv
  OR NEW.evidence_tag  IS DISTINCT FROM OLD.evidence_tag
  OR NEW.evidence_kid  IS DISTINCT FROM OLD.evidence_kid
  OR NEW.created_at    IS DISTINCT FROM OLD.created_at
  THEN
    RAISE EXCEPTION
      'automod_events: the record of the event is immutable; only review_state, reviewed_by, reviewed_at, review_notes, ban_id and strike_id may change'
      USING ERRCODE = 'insufficient_privilege';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS automod_events_block_delete ON automod_events;
CREATE TRIGGER automod_events_block_delete
  BEFORE DELETE ON automod_events
  FOR EACH ROW EXECUTE FUNCTION automod_events_no_delete();

-- TRUNCATE bypasses row-level triggers entirely, so it needs its own.
DROP TRIGGER IF EXISTS automod_events_block_truncate ON automod_events;
CREATE TRIGGER automod_events_block_truncate
  BEFORE TRUNCATE ON automod_events
  FOR EACH STATEMENT EXECUTE FUNCTION automod_events_no_delete();

DROP TRIGGER IF EXISTS automod_events_freeze_facts ON automod_events;
CREATE TRIGGER automod_events_freeze_facts
  BEFORE UPDATE ON automod_events
  FOR EACH ROW EXECUTE FUNCTION automod_events_immutable_facts();

COMMENT ON TABLE automod_events IS
  'Append-only moderation record. Rows can never be deleted and the event '
  'facts can never be rewritten; only the review columns are mutable. Kept as '
  'evidence, so treat retention as a legal question, not a storage one.';
