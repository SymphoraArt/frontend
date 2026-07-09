-- One-profile consolidation: `users` absorbs the only field the orphaned
-- `artists` table had that it lacked — a cover/banner image. Run once in the
-- Supabase SQL editor. Idempotent.
ALTER TABLE users ADD COLUMN IF NOT EXISTS cover_image_url text;
