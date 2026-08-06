-- Everything needed to say what produced an image — and to run it again.
--
-- Kev, 2026-08-06: "jedes generierte bild soll einen prompt, herkunft, datum,
-- referenced images, einstellungen, etc haben, damit man jedes bild
-- unverzüglich re-generieren kann."
--
-- The split follows one rule: a field gets a COLUMN if you filter, join or
-- constrain on it, and goes in the jsonb only if its shape will change. So the
-- reproduction contract is typed and queryable, the node graph — whose shape
-- belongs to the editor and will keep moving — is one versioned blob, and the
-- reference images are a real child table because they are rows, not a list.
--
-- ── What this does NOT promise ──────────────────────────────────────────
-- A faithful RECORD is not the same as byte-identical replay, and the
-- difference must be stated rather than implied:
--   * no provider we use exposes a seed except Pollinations, which generates
--     one and throws it away. `seed` is therefore NULL on every Gemini and
--     WaveSpeed row, and an always-NULL column would otherwise quietly imply
--     reproducibility we do not have.
--   * /api/generate-image rewrites every prompt through gemini-1.5-flash at
--     temperature 0.7 before generating. Replaying the ORIGINAL prompt gives a
--     different rewrite every time, which is why effective_prompt exists: it
--     is the text that actually reached the image model, and it is what a
--     replay must send.
-- Label the button "Re-run", not "Reproduce", until a seed-honouring provider
-- is wired.
--
-- Verified live before writing (PostgREST, 2026-08-06): generations has the
-- 21 columns referenced below and no seed, workflow, model or output column of
-- any kind; no reference-image table exists anywhere in the schema.
--
-- Additive and re-runnable. Requires 2026-08-06-providers.sql.

-- ── which model, and which route ────────────────────────────────────────
-- provider/provider_model are already here as free text. model_id is the join
-- back to the catalogue, so "how often was Nano Banana Pro used" is a query
-- rather than a string match, and boost records WHICH of the model's two
-- routes actually ran — the whole point of the feature being that the same
-- model reaches you two ways.
ALTER TABLE generations ADD COLUMN IF NOT EXISTS model_id uuid REFERENCES models(id);
ALTER TABLE generations ADD COLUMN IF NOT EXISTS boost boolean NOT NULL DEFAULT false;

-- ── the text that actually generated the picture ────────────────────────
-- final_prompt_* holds the prompt AFTER variable substitution but BEFORE the
-- rewrite. Encrypted like every other piece of user-authored text in this
-- schema — it is the sellable product and, for a blocked prompt, evidence.
ALTER TABLE generations ADD COLUMN IF NOT EXISTS effective_prompt_ct  text;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS effective_prompt_iv  text;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS effective_prompt_tag text;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS effective_prompt_kid text;

COMMENT ON COLUMN generations.effective_prompt_ct IS
  'The prompt as it reached the image model, after the gemini-1.5-flash '
  'rewrite. Replaying final_prompt instead re-runs that rewrite at temperature '
  '0.7 and produces a different request every time.';

-- ── determinism, where it exists at all ─────────────────────────────────
ALTER TABLE generations ADD COLUMN IF NOT EXISTS seed bigint;
COMMENT ON COLUMN generations.seed IS
  'NULL means the provider exposed no seed — true for Gemini and WaveSpeed '
  'today. Do not read NULL as "not recorded"; read it as "not reproducible".';

-- ── what came back, measured ────────────────────────────────────────────
-- Measured from the returned bytes, never echoed from the request. The old
-- metadata reported the REQUESTED size, so a record claimed 2K for an image
-- the model had rendered at 1024x1024.
ALTER TABLE generations ADD COLUMN IF NOT EXISTS output_width   int;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS output_height  int;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS output_bytes   int;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS output_format  text;
ALTER TABLE generations ADD COLUMN IF NOT EXISTS generation_ms  int;

-- ── the workflow, as the editor exported it ─────────────────────────────
-- One versioned blob, because the node graph's shape belongs to the editor and
-- will keep changing; modelling it in columns would mean a migration per
-- editor release. `{v:1}` is written by ONE server function and never accepted
-- from the client.
--
-- It must NOT carry image bytes. buildExportJSON() embeds reference images as
-- base64 data URLs — the editor's own draft save already exceeds the 5 MB
-- localStorage cap because of it — so the images are externalised into
-- generation_reference_images below and the graph keeps only their ids.
ALTER TABLE generations ADD COLUMN IF NOT EXISTS workflow jsonb;
COMMENT ON COLUMN generations.workflow IS
  'Versioned node graph ({v:1,...}), reference images externalised to '
  'generation_reference_images. Never store base64 image data here.';

CREATE INDEX IF NOT EXISTS generations_model_idx ON generations (model_id, created_at DESC);

-- ── the images that went IN ─────────────────────────────────────────────
-- A child table rather than an array column: each one has a URL, a hash and an
-- order, and we want to ask "which generations used this image" — which an
-- array cannot answer without a scan.
CREATE TABLE IF NOT EXISTS generation_reference_images (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  generation_id  uuid NOT NULL REFERENCES generations(id) ON DELETE CASCADE,
  -- Order matters: "@Image 2" in a prompt refers to this position.
  sequence_index smallint NOT NULL DEFAULT 0,
  storage_url    text NOT NULL,
  mime_type      text,
  bytes          int,
  -- sha256 of the file, so the same reference used across many generations is
  -- recognisable without comparing URLs.
  content_hash   text,
  created_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (generation_id, sequence_index)
);

COMMENT ON TABLE generation_reference_images IS
  'Images fed INTO a generation. Separate from generated_images, which holds '
  'what came out.';

CREATE INDEX IF NOT EXISTS gen_ref_images_hash_idx
  ON generation_reference_images (content_hash) WHERE content_hash IS NOT NULL;

ALTER TABLE generation_reference_images ENABLE ROW LEVEL SECURITY;

-- Check:
--   SELECT id, model_id, boost, seed, output_width, output_height,
--          output_format, generation_ms, workflow IS NOT NULL AS has_workflow
--   FROM generations ORDER BY created_at DESC LIMIT 10;
