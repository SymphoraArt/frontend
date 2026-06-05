-- Adds the prompt encryption + showcase columns that /api/prompt and
-- /api/prompts/seed write but that are missing from the live `prompts` table
-- (the cause of: PGRST204 "Could not find the 'auth_tag' column of 'prompts'").
--
-- Idempotent — safe to run more than once. Run it in the Supabase SQL editor.

ALTER TABLE prompts ADD COLUMN IF NOT EXISTS encrypted_content text;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS iv text;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS auth_tag text;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS public_prompt_text text;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS uploaded_photos jsonb DEFAULT '[]'::jsonb;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS aspect_ratio text;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS photo_count integer DEFAULT 1;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS resolution text;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS is_free_showcase boolean DEFAULT false;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS prompt_type text;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS ai_model text;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS downloads integer DEFAULT 0;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS rating numeric DEFAULT 0;

-- Structured showcase strip: each released render paired with the variable
-- values that produced it, so the buyer image UI can show the exact settings
-- behind every image as you click through them.
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS showcase_images jsonb DEFAULT '[]'::jsonb;

-- Some schemas name the AES-GCM fields with an `encrypted_content_` prefix and
-- mark them NOT NULL (the cause of: 23502 null value in column
-- "encrypted_content_iv"). The API writes BOTH naming conventions; make sure
-- the columns exist and don't block inserts if a value is ever missing.
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS encrypted_content_iv text;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS encrypted_content_tag text;
ALTER TABLE prompts ADD COLUMN IF NOT EXISTS encrypted_content_auth_tag text;
DO $$
DECLARE col text;
BEGIN
  FOREACH col IN ARRAY ARRAY['encrypted_content_iv','encrypted_content_tag','encrypted_content_auth_tag','iv','auth_tag','tag'] LOOP
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='prompts' AND column_name=col) THEN
      EXECUTE format('ALTER TABLE prompts ALTER COLUMN %I DROP NOT NULL', col);
    END IF;
  END LOOP;
END $$;

-- The new flow encrypts the prompt body into `encrypted_content`, so it never
-- writes a plaintext `content`. If a legacy NOT NULL `content` column exists it
-- would block inserts — make it optional.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'prompts' AND column_name = 'content'
  ) THEN
    EXECUTE 'ALTER TABLE prompts ALTER COLUMN content DROP NOT NULL';
  END IF;
END $$;

-- Force PostgREST to reload its schema cache so the new columns are visible
-- immediately (otherwise the PGRST204 error can linger for a minute).
NOTIFY pgrst, 'reload schema';
