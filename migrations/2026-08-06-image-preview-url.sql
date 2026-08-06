-- A middle rendition between the thumbnail and the original.
--
-- generated_images already has thumbnail_url (the grid) and storage_url (the
-- original), and nothing has ever written the first of the two. The detail
-- view therefore loads the original — measured 2026-08-06 against the real
-- providers, that is 3.0 MB for a 2K image from Gemini, 7.0 MB from WaveSpeed,
-- and 8.8 / 21.1 MB at 4K. Twenty of those in a grid is a quarter-gigabyte for
-- pictures shown at 300px.
--
-- So three objects per image, the way every gallery does it:
--   storage_url    the original, untouched, what the download hands over
--   preview_url    WebP ~1280px — what the detail view shows, and what a
--                  right-click actually saves
--   thumbnail_url  WebP ~384px — the grid
--
-- Verified live before writing (PostgREST, 2026-08-06): generated_images has
-- 24 columns and `preview_url` returns 42703 "column does not exist".
--
-- Additive and re-runnable.

ALTER TABLE generated_images ADD COLUMN IF NOT EXISTS preview_url text;

COMMENT ON COLUMN generated_images.preview_url IS
  'WebP rendition bounded to ~1280px, for the detail view. Null means the '
  'derivative step has not run for this row — fall back to storage_url.';

-- Check:
--   SELECT count(*) FILTER (WHERE preview_url IS NULL) AS without_preview,
--          count(*) AS total
--   FROM generated_images WHERE deleted_at IS NULL;
