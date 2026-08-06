-- The free generator belongs in the provider tables like every other host.
--
-- Pollinations was a special case in code: /api/generate-free called it
-- directly, so it had no row, no price, no ratio list and no reference-image
-- limit — none of the things every other generator gets to declare. Kev,
-- 2026-08-06: free services go in the same table, because there will be more
-- of them.
--
-- Requires 2026-08-06-providers.sql (providers, model_providers).
-- Additive and re-runnable.

INSERT INTO providers (key, name, audience)
VALUES ('pollinations', 'Pollinations', 'public')
ON CONFLICT (key) DO NOTHING;

-- price 0 is what makes it free; nothing in the code special-cases the name.
-- allowed_ratios matches what the service can actually express: it maps a
-- ratio to width/height itself (backend/services/pollinations-image-generation.ts),
-- and anything outside this list silently becomes 1:1 — so offering more would
-- hand the user a ratio they did not ask for.
INSERT INTO models (name, price, allowed_ratios, active, max_reference_images, allowed_filetypes)
SELECT 'Flux (free)', 0, ARRAY['1:1', '16:9', '9:16', '4:3', '3:4'], true,
       -- Text-to-image only. Zero is the honest number, and it is what stops
       -- the UI offering an upload slot that the model never sees.
       0, ARRAY['image/png', 'image/jpeg', 'image/webp']
WHERE NOT EXISTS (SELECT 1 FROM models WHERE name ILIKE 'flux (free)');

-- One route only: there is no faster host to boost to, so boost is absent
-- rather than pointing back at itself.
INSERT INTO model_providers (model_id, provider_id, provider_model, role)
SELECT m.id, p.id, 'flux', 'normal'
FROM models m, providers p
WHERE m.name ILIKE 'flux (free)' AND p.key = 'pollinations'
ON CONFLICT (model_id, role) DO UPDATE SET provider_model = EXCLUDED.provider_model;

-- Check:
--   SELECT m.name, m.price, mp.role, p.key, mp.provider_model
--   FROM model_providers mp
--   JOIN models m ON m.id = mp.model_id
--   JOIN providers p ON p.id = mp.provider_id
--   ORDER BY m.name, mp.role;
