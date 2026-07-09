-- Private drafts vs. published listings.
--
-- `published_at` is set when a creator releases a prompt
-- (PATCH /api/prompts/[id] { published: true }). The marketplace and
-- creator-profile reads now filter on `published_at IS NOT NULL`, so drafts
-- stay private until released.
--
-- Backfill every existing row to its creation time so nothing that is currently
-- visible disappears when the filter goes live. Run once in the Supabase SQL
-- editor BEFORE deploying the filtered code. Idempotent.
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS published_at timestamptz;
UPDATE prompts SET published_at = created_at WHERE published_at IS NULL;
