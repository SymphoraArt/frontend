-- Per-model generation limits (Kev, 2026-07-12): every generator has its own
-- maximum of reference images and its own allowed file types. The UIs
-- (Create Prompt 2, Generate modal, editor) pull these on model selection
-- via /api/models.
-- models table verified live: id, name, price, allowed_ratios, active, created_at.
-- Run once in the Supabase SQL editor. Idempotent.

ALTER TABLE models ADD COLUMN IF NOT EXISTS max_reference_images int NOT NULL DEFAULT 14;
ALTER TABLE models ADD COLUMN IF NOT EXISTS allowed_filetypes text[] NOT NULL
  DEFAULT ARRAY['image/png', 'image/jpeg', 'image/webp'];

-- Nano Banana Pro → 18 reference images
UPDATE models
SET max_reference_images = 18,
    allowed_filetypes = ARRAY['image/png', 'image/jpeg', 'image/webp']
WHERE name ILIKE 'nano banana%';

-- GPT-Image-2 → 16 reference images (created if the row doesn't exist yet)
INSERT INTO models (name, price, allowed_ratios, active, max_reference_images, allowed_filetypes)
SELECT 'GPT-Image-2', 0.1, ARRAY['1:1', '4:5', '16:9'], true, 16,
       ARRAY['image/png', 'image/jpeg', 'image/webp']
WHERE NOT EXISTS (SELECT 1 FROM models WHERE name ILIKE 'gpt%image%2');

UPDATE models
SET max_reference_images = 16
WHERE name ILIKE 'gpt%image%2';

-- Check:
--   SELECT name, max_reference_images, allowed_filetypes, active FROM models;
-- Adjust any limit later without a deploy:
--   UPDATE models SET max_reference_images = 20 WHERE name = 'Nano Banana Pro';
