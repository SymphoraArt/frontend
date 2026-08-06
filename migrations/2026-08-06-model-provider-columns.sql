-- Which provider model a row in `models` actually runs on.
--
-- Until now the models table said what a generator COSTS and which ratios it
-- takes, but not which API to call — so the route resolved nothing and every
-- generation fell through to the service default, gemini-2.5-flash-image.
-- "Nano Banana Pro" and "GPT-Image-2" produced identical output from a third
-- model while the price was charged per the user's selection.
--
-- Same principle as allowed_ratios and max_reference_images: a new generator
-- should be a row, not a deploy. lib/generation/models.ts reads these columns
-- and falls back to a slug map while they are absent, so running this changes
-- nothing that was working — it just moves the truth into the database.
--
-- Verified live before writing (PostgREST, 2026-08-06): models has
-- id, name, price, allowed_ratios, active, created_at, max_reference_images,
-- allowed_filetypes. Two active rows: Nano Banana Pro, GPT-Image-2.
--
-- Additive and re-runnable.

ALTER TABLE models ADD COLUMN IF NOT EXISTS provider text;
ALTER TABLE models ADD COLUMN IF NOT EXISTS provider_model text;

COMMENT ON COLUMN models.provider IS
  'Which API to call: gemini | openai | wavespeed.';
COMMENT ON COLUMN models.provider_model IS
  'The provider''s own model id, e.g. gemini-3-pro-image-preview. Null falls '
  'back to the slug map in lib/generation/models.ts.';

-- Nano Banana Pro IS gemini-3-pro-image-preview. Measured 2026-08-06 against
-- the live API: it honours imageSize (1K 1024x1024 0.71MB, 2K 2048x2048
-- 3.00MB, 4K 4096x4096 8.77MB, all JPEG). gemini-2.5-flash-image — plain
-- "Nano Banana" — ignores imageSize entirely and always returns 1024x1024.
UPDATE models
SET provider = 'gemini',
    provider_model = 'gemini-3-pro-image-preview'
WHERE name ILIKE 'nano banana pro%';

-- GPT-Image-2 has no code path yet; recording the target so the row is honest
-- about what it is meant to be rather than silently running Gemini.
UPDATE models
SET provider = 'openai',
    provider_model = 'gpt-image-2'
WHERE name ILIKE 'gpt%image%2';

-- Check:
--   SELECT name, provider, provider_model, allowed_ratios FROM models;
