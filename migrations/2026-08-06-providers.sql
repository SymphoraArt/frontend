-- Providers, and which of them can serve which model.
--
-- The same model is reachable through several hosts at different speeds and
-- prices — Nano Banana Pro runs at Google directly (~19-39s) and on WaveSpeed
-- (~73-78s), and that difference IS the boost feature. A column per provider
-- on `models` would mean a new column for every host we ever add, and four
-- dead columns as soon as a model is not on all of them (Kev, 2026-08-06).
--
-- So: a providers table, and a link row per (model, role). Adding a host is
-- then two inserts and no deploy, and `audience` leaves room for hosts that
-- only enterprise customers may reach.
--
-- Verified live before writing (PostgREST, 2026-08-06): `models` has
-- id, name, price, allowed_ratios, active, created_at, max_reference_images,
-- allowed_filetypes — no provider columns of any kind. Two active rows:
-- Nano Banana Pro, GPT-Image-2.
--
-- Additive and re-runnable.

CREATE TABLE IF NOT EXISTS providers (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Matches the union in lib/generation/models.ts; the code switches on it.
  key         text NOT NULL UNIQUE,
  name        text NOT NULL,
  -- Who is allowed to be routed here. 'enterprise' hosts stay invisible to
  -- normal accounts even when a model lists them.
  audience    text NOT NULL DEFAULT 'public'
              CHECK (audience IN ('public', 'enterprise', 'internal')),
  active      boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE providers IS
  'Image-generation hosts. A model can be served by several of them; see model_providers.';

CREATE TABLE IF NOT EXISTS model_providers (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id       uuid NOT NULL REFERENCES models(id) ON DELETE CASCADE,
  provider_id    uuid NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  -- The host's own id for this model, e.g. 'gemini-3-pro-image-preview' or
  -- 'google/nano-banana-pro/text-to-image'. The whole reason this table
  -- exists: the same model is named differently everywhere.
  provider_model text NOT NULL,
  -- Which button reaches this row. One 'normal' and at most one 'boost' per
  -- model; a model with no 'boost' row simply has no boost.
  role           text NOT NULL CHECK (role IN ('normal', 'boost')),
  active         boolean NOT NULL DEFAULT true,
  created_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (model_id, role)
);

COMMENT ON COLUMN model_providers.role IS
  'normal = the default route (cheaper, slower). boost = paid speed-up, same '
  'model on a faster host. Boost changes WHERE a model runs, never which.';

CREATE INDEX IF NOT EXISTS model_providers_model_idx ON model_providers (model_id) WHERE active;

-- RLS: these are read by the server with the service role, like models.
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE model_providers ENABLE ROW LEVEL SECURITY;

-- ── seed ────────────────────────────────────────────────────────────────

INSERT INTO providers (key, name, audience)
VALUES ('gemini', 'Google Gemini', 'public'),
       ('wavespeed', 'WaveSpeed', 'public'),
       ('openai', 'OpenAI', 'public')
ON CONFLICT (key) DO NOTHING;

-- Nano Banana Pro: both routes run the SAME model, only the host differs.
-- Measured on one prompt, 2026-08-06 — WaveSpeed 1K 73.1s / 2K 78.1s /
-- 4K 77.0s against direct 1K 19.2s / 2K 28.5s / 4K 38.8s.
INSERT INTO model_providers (model_id, provider_id, provider_model, role)
SELECT m.id, p.id, 'google/nano-banana-pro/text-to-image', 'normal'
FROM models m, providers p
WHERE m.name ILIKE 'nano banana pro%' AND p.key = 'wavespeed'
ON CONFLICT (model_id, role) DO UPDATE SET provider_model = EXCLUDED.provider_model;

INSERT INTO model_providers (model_id, provider_id, provider_model, role)
SELECT m.id, p.id, 'gemini-3-pro-image-preview', 'boost'
FROM models m, providers p
WHERE m.name ILIKE 'nano banana pro%' AND p.key = 'gemini'
ON CONFLICT (model_id, role) DO UPDATE SET provider_model = EXCLUDED.provider_model;

-- GPT-Image-2 has no code path yet and no WaveSpeed host, so it gets a normal
-- route only: boost is simply absent rather than pointing somewhere false.
INSERT INTO model_providers (model_id, provider_id, provider_model, role)
SELECT m.id, p.id, 'gpt-image-2', 'normal'
FROM models m, providers p
WHERE m.name ILIKE 'gpt%image%2' AND p.key = 'openai'
ON CONFLICT (model_id, role) DO UPDATE SET provider_model = EXCLUDED.provider_model;

-- Check:
--   SELECT m.name, mp.role, p.key, mp.provider_model
--   FROM model_providers mp
--   JOIN models m ON m.id = mp.model_id
--   JOIN providers p ON p.id = mp.provider_id
--   ORDER BY m.name, mp.role;
