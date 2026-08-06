-- GPT-Image-2 gets both routes, like Nano Banana Pro.
--
-- It had an 'openai' normal route and no boost, which meant the cheaper host
-- was unreachable and the boost button never appeared. WaveSpeed serves the
-- same model — path confirmed live 2026-08-06 against the real API:
--
--   POST https://api.wavespeed.ai/api/v3/openai/gpt-image-2/text-to-image
--     aspect_ratio    15 values, including all ten Gemini takes
--     quality         low | medium | high   (identical to OpenAI's)
--     output_format   png | jpeg | webp
--     size, background, moderation  NOT recognised — WaveSpeed ignores them
--
-- So the split is the same one boost always means: same model, cheaper and
-- slower on WaveSpeed, dearer and faster direct.
--
--   normal  wavespeed  openai/gpt-image-2/text-to-image
--   boost   openai     gpt-image-2
--
-- allowed_ratios is widened to the ten both hosts accept. It was ['1:1',
-- '4:5', '16:9'] — three of them — which is not a limit either provider
-- imposes.
--
-- Requires 2026-08-06-providers.sql. Additive and re-runnable.

UPDATE models
SET allowed_ratios = ARRAY['1:1', '2:3', '3:2', '3:4', '4:3', '4:5', '5:4', '9:16', '16:9', '21:9']
WHERE name ILIKE 'gpt%image%2';

-- normal: the cheaper host
INSERT INTO model_providers (model_id, provider_id, provider_model, role)
SELECT m.id, p.id, 'openai/gpt-image-2/text-to-image', 'normal'
FROM models m, providers p
WHERE m.name ILIKE 'gpt%image%2' AND p.key = 'wavespeed'
ON CONFLICT (model_id, role) DO UPDATE
  SET provider_model = EXCLUDED.provider_model,
      provider_id    = EXCLUDED.provider_id;

-- boost: straight to OpenAI
INSERT INTO model_providers (model_id, provider_id, provider_model, role)
SELECT m.id, p.id, 'gpt-image-2', 'boost'
FROM models m, providers p
WHERE m.name ILIKE 'gpt%image%2' AND p.key = 'openai'
ON CONFLICT (model_id, role) DO UPDATE
  SET provider_model = EXCLUDED.provider_model,
      provider_id    = EXCLUDED.provider_id;

-- Check:
--   SELECT m.name, mp.role, p.key, mp.provider_model
--   FROM model_providers mp
--   JOIN models m ON m.id = mp.model_id
--   JOIN providers p ON p.id = mp.provider_id
--   ORDER BY m.name, mp.role;
