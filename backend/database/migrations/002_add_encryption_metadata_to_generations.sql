-- Migration: Add encryption metadata to generations table
-- Date: 2026-01-05
-- Description: Adds iv and auth_tag fields for proper prompt encryption storage

-- Add encryption metadata columns to generations table
ALTER TABLE generations
ADD COLUMN IF NOT EXISTS final_prompt_iv TEXT,
ADD COLUMN IF NOT EXISTS final_prompt_auth_tag TEXT;

-- Update existing rows to have empty strings (will need manual migration if data exists)
UPDATE generations
SET
  final_prompt_iv = '',
  final_prompt_auth_tag = ''
WHERE
  final_prompt_iv IS NULL
  OR final_prompt_auth_tag IS NULL;

-- Add NOT NULL constraint after updating existing rows
-- ALTER TABLE generations
-- ALTER COLUMN final_prompt_iv SET NOT NULL,
-- ALTER COLUMN final_prompt_auth_tag SET NOT NULL;

-- Add comment explaining the encryption fields
COMMENT ON COLUMN generations.final_prompt IS 'Encrypted final prompt content (base64)';
COMMENT ON COLUMN generations.final_prompt_iv IS 'Initialization vector for encryption (base64)';
COMMENT ON COLUMN generations.final_prompt_auth_tag IS 'Authentication tag for GCM mode (base64)';

-- Create index for faster lookups (optional)
CREATE INDEX IF NOT EXISTS idx_generations_encryption_complete
ON generations(id)
WHERE final_prompt IS NOT NULL
  AND final_prompt_iv IS NOT NULL
  AND final_prompt_auth_tag IS NOT NULL;
