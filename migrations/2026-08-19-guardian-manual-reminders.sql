-- Manual "Send reminder" button on pending email guardians (Kev, 2026-08-19):
-- once per 24h, seven times in total.
--
-- Its own counter, NOT reminder_count. The automatic sweep owns that one and
-- flips a guardian to 'unresponsive' when it reaches 3 — mixing the two would
-- let three button presses mark a guardian as having ignored the system. The
-- 24h cooldown needs no new column: it reads last_reminded_at, shared with the
-- sweep on purpose so a guardian never gets two mails in one day from any
-- combination of sources.
ALTER TABLE recovery_guardians
  ADD COLUMN IF NOT EXISTS manual_reminder_count integer NOT NULL DEFAULT 0;

-- Read back what actually happened, per the migration rule.
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'recovery_guardians'
  AND column_name IN ('manual_reminder_count', 'reminder_count', 'last_reminded_at')
ORDER BY column_name;
