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
ALTER TABLE models ADD COLUMN IF NOT EXISTS wavespeed_model text;

COMMENT ON COLUMN models.provider IS
  'Which API the BOOST route calls: gemini | openai | wavespeed.';
COMMENT ON COLUMN models.provider_model IS
  'The provider''s own model id for the BOOST (direct) route, e.g. '
  'gemini-3-pro-image-preview. Null falls back to lib/generation/models.ts.';
COMMENT ON COLUMN models.wavespeed_model IS
  'WaveSpeed model id for the NORMAL route, e.g. '
  'google/nano-banana-pro/text-to-image. Null means this model has no '
  'WaveSpeed host, so boost is a no-op and both routes go direct.';

-- Nano Banana Pro IS gemini-3-pro-image-preview. Measured 2026-08-06 against
-- the live API: it honours imageSize (1K 1024x1024 0.71MB, 2K 2048x2048
-- 3.00MB, 4K 4096x4096 8.77MB, all JPEG). gemini-2.5-flash-image — plain
-- "Nano Banana" — ignores imageSize entirely and always returns 1024x1024.
-- Both routes run the SAME model; only the host differs. Measured on one
-- prompt, 2026-08-06: WaveSpeed 1K 73.1s / 2K 78.1s / 4K 77.0s against direct
-- 1K 19.2s / 2K 28.5s / 4K 38.8s. Boost buys time, not quality.
UPDATE models
SET provider = 'gemini',
    provider_model = 'gemini-3-pro-image-preview',
    wavespeed_model = 'google/nano-banana-pro/text-to-image'
WHERE name ILIKE 'nano banana pro%';

-- GPT-Image-2 has no code path yet; recording the target so the row is honest
-- about what it is meant to be rather than silently running Gemini.
UPDATE models
SET provider = 'openai',
    provider_model = 'gpt-image-2'
WHERE name ILIKE 'gpt%image%2';

-- Check:
--   SELECT name, provider, provider_model, wavespeed_model, allowed_ratios FROM models;
