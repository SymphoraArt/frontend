-- Default bio for every new (and bio-less existing) user (Kev, 2026-07-12).
-- users.bio verified live. Run once in the Supabase SQL editor. Idempotent.

ALTER TABLE users ALTER COLUMN bio SET DEFAULT 'A visitor on the canvas of time.';

UPDATE users SET bio = 'A visitor on the canvas of time.'
WHERE bio IS NULL OR btrim(bio) = '';
