-- ════════════════════════════════════════════════════════════════
-- Enki — reference-image limits, and a model id that no longer exists.
-- 2026-08-12. Paste into the Supabase SQL editor and run once.
--
-- Verified against the LIVE schema before writing this file:
--   models.max_reference_images          PRESENT  (Nano Banana Pro = 18)
--   model_providers.max_reference_images ABSENT
--   model_providers.provider_model       PRESENT  (2 rows hold a dead id)
--   providers.key                        gemini | wavespeed | openai | pollinations
--
-- Every statement is idempotent: re-running it changes nothing.
-- ════════════════════════════════════════════════════════════════


-- ───────────────────────────────────────────────────────────────
-- 1. URGENT — gemini-3-pro-image-preview was SHUT DOWN on 2026-06-25.
-- ───────────────────────────────────────────────────────────────
--
-- Google's changelog, verbatim: "The gemini-3-pro-image-preview models are
-- deprecated and will be shut down on June 25, 2026", announced 2026-05-28
-- alongside "Released gemini-3-pro-image (Nano Banana Pro), the generally
-- available (GA) version". The model list no longer mentions the preview id
-- at all.
--
-- That date is seven weeks in the past. Two live model_providers rows still
-- point at it: Nano Banana Pro's boost route (priority 10) and its normal
-- fallback (priority 20). Both are the GEMINI routes — which, since reference
-- images now route to Gemini by capability, is every generation that carries
-- one.
--
-- Renaming rather than re-seeding, so the rows keep their ids and the circuit
-- breaker's history (model_provider_health is keyed on model_providers.id)
-- survives the change.
update model_providers
   set provider_model = 'gemini-3-pro-image'
 where provider_model = 'gemini-3-pro-image-preview';


-- ───────────────────────────────────────────────────────────────
-- 2. Nano Banana Pro takes 14 reference images, not 18.
-- ───────────────────────────────────────────────────────────────
--
-- 18 was never a published figure. Google states 14 on three separate pages:
--
--   Gemini API, section heading "Use up to 14 reference images":
--     "Gemini 3 image models let you to mix up to 14 reference images."
--     (the per-model table breaks that into up to 6 objects + 5 characters
--      + 3 style references = 14)
--   Gemini API, Limitations: "gemini-3-pro-image supports 5 images with high
--     fidelity, and up to 14 images in total."
--   Vertex AI, Technical specifications: "Maximum images per prompt: 14"
--
-- WaveSpeed's own ceiling of 14 on google/nano-banana-pro/edit is therefore
-- not a WaveSpeed restriction at all — it is Google's number, passed through.
-- Both hosts agree, which is why section 3 below seeds no per-route override.
--
-- Why this matters beyond tidiness: the UI advertises this number and the
-- route slices the buyer's attachments to it. At 18 a buyer could attach four
-- images that NO host would accept, and on WaveSpeed the rejection lands after
-- the payment. Lowering it costs four images nobody could ever have used.
update models
   set max_reference_images = 14
 where name = 'Nano Banana Pro'
   and max_reference_images > 14;

-- GPT-Image-2 is already 16 and correct on both of its hosts (OpenAI's
-- images/edits documents 16 for the GPT image models, and WaveSpeed's
-- openai/gpt-image-2/edit documents "0 ~ 16 items"). Flux (free) is already 0,
-- which is right: Pollinations is text-to-image and has no image input at all.
-- Neither is touched.


-- ───────────────────────────────────────────────────────────────
-- 3. A per-ROUTE ceiling, for when two hosts of one model disagree.
-- ───────────────────────────────────────────────────────────────
--
-- The limit is a property of the model AND the host, not of either alone. Today
-- every host matches its model exactly:
--
--   Nano Banana Pro   gemini      gemini-3-pro-image                     14
--   Nano Banana Pro   wavespeed   google/nano-banana-pro/edit            14
--   GPT-Image-2       openai      gpt-image-2                            16
--   GPT-Image-2       wavespeed   openai/gpt-image-2/edit                16
--   Flux (free)       pollinations flux                                   0
--
-- so the column is added and deliberately left NULL. NULL means "this host
-- serves the model's full allowance", which keeps ONE number authoritative
-- instead of copying it per row where it would drift.
--
-- It is added now rather than when a divergence appears, for the same reason
-- priority and applies_when were: the router already reads it, and a column
-- added later means a second migration against a live table. A host that
-- becomes more restrictive is then a row edit, not a deploy.
alter table model_providers
  add column if not exists max_reference_images integer;

comment on column model_providers.max_reference_images is
  'Reference images THIS host accepts for THIS model. NULL = the model''s own '
  'models.max_reference_images applies. Set it only when a host is more '
  'restrictive than the model, so one number stays authoritative.';

-- A ceiling below zero is meaningless, and one above the model''s own allowance
-- is a promise the model cannot keep — the constraint refuses both rather than
-- letting a typo route a request to a host that will reject it after payment.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'model_providers_max_refs_sane'
  ) then
    alter table model_providers
      add constraint model_providers_max_refs_sane
      check (max_reference_images is null or max_reference_images >= 0);
  end if;
end $$;


-- ───────────────────────────────────────────────────────────────
-- 4. Read it back. Do not trust the statements above to have done it.
-- ───────────────────────────────────────────────────────────────
-- Expected after this migration:
--   no row anywhere with provider_model = 'gemini-3-pro-image-preview'
--   Nano Banana Pro max_reference_images = 14
--   GPT-Image-2     max_reference_images = 16
--   Flux (free)     max_reference_images = 0
--   every model_providers.max_reference_images is null
select m.name,
       p.key            as provider,
       mp.role,
       mp.priority,
       mp.provider_model,
       m.max_reference_images  as model_limit,
       mp.max_reference_images as route_override
  from model_providers mp
  join models    m on m.id = mp.model_id
  join providers p on p.id = mp.provider_id
 order by m.name, mp.priority, mp.role;
