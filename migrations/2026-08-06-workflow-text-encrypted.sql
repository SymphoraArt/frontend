-- The workflow graph must not carry authored text in the clear.
--
-- generations.workflow is a plain jsonb column, and the editor's export puts
-- the prompt straight into it (`prompt: s.body`, plus userInput / value / str
-- on the nodes). Stored verbatim, the prompt would sit in cleartext two
-- columns away from final_prompt_ct — so a database dump would hand over
-- exactly what that encryption exists to protect, and the encryption would be
-- decoration. Kev caught this before it shipped, 2026-08-06.
--
-- Same split the images already use: the structure stays queryable in jsonb,
-- the content moves into an encrypted envelope.
--
--   workflow            node ids, types, positions, links, enum settings,
--                       and { "$text": n } / { "$ref": n } markers
--   workflow_text_*     the strings those markers point at, encrypted with
--                       the one keyring (lib/crypto), like every other piece
--                       of user-authored text in this schema
--
-- What is PUBLIC stays a separate, deliberate decision: prompts.public_prompt_text.
-- Nothing in the graph is public by default — a new editor field is encrypted
-- until someone chooses otherwise, rather than leaking until someone notices.
--
-- Requires 2026-08-06-generation-provenance.sql. Additive and re-runnable.

ALTER TABLE generations ADD COLUMN IF NOT EXISTS workflow_text_ct  text;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS workflow_text_iv  text;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS workflow_text_tag text;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS workflow_text_kid text;

COMMENT ON COLUMN generations.workflow_text_ct IS
  'Encrypted JSON array of every authored string pulled out of the workflow '
  'graph. workflow holds { "$text": n } markers pointing into it.';

COMMENT ON COLUMN generations.workflow IS
  'Structure ONLY — ids, types, positions, links, enum settings, and $ref / '
  '$text markers. Never store prompt text or image bytes here.';

-- Check (must return 0 rows — anything here is cleartext that should not be):
--   SELECT id FROM generations
--   WHERE workflow::text ILIKE '%data:image%'
--      OR workflow::text ~ '"(prompt|userInput|title)":\s*"[^"]{20,}"';
