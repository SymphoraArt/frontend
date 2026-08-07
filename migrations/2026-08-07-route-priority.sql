-- Ordered failover, and routes that only apply under certain settings.
--
-- Two columns on model_providers:
--
--   priority      lower wins. The router walks routes in this order and takes
--                 the first whose breaker is closed, so failover order is
--                 stated rather than implied by role.
--
--   applies_when  null = always eligible. Otherwise every key must match the
--                 request, with the row listing the accepted values.
--
-- The second column exists because the cheapest host can change with the
-- SETTINGS, not just with the model. A provider charging one flat price for
-- gpt-image-2 loses at 1K and wins from 2K up; a plain ordered list cannot
-- express "cheapest here, absent there". Nothing in this migration uses it
-- yet — it is here because the router already reads it and a column added
-- later would mean a second migration against a live table.
--
-- ── Deliberately NOT in this migration ──────────────────────────────────
-- AceData. It measured faster and cheaper than WaveSpeed at every tier
-- (bench-output/), but Kev's call, 2026-08-07: no provider row until the
-- commercial-use question is answered in writing. Their terms forbid
-- redistributing or reselling "the services" and say nothing about who owns
-- the generated image, and this platform sells generated images. Adding the
-- row would put a route one UPDATE away from live before that is settled.
--
-- Order below is therefore the order we can actually serve today.

alter table model_providers
  add column if not exists priority integer not null default 100,
  add column if not exists applies_when jsonb;

comment on column model_providers.priority is
  'Failover order within a role; lower is tried first.';
comment on column model_providers.applies_when is
  'null = always. Otherwise {"key": ["accepted","values"]} — every key must match the request.';

-- Walking candidates for one model+role is the hot path.
create index if not exists model_providers_route_idx
  on model_providers (model_id, role, priority) where active;

-- ── Nano Banana Pro ──────────────────────────────────────────────────────
-- WaveSpeed first, Gemini behind it. Measured 2026-08-06: WaveSpeed
-- 73.1s/78.1s/77.0s at 1K/2K/4K for $0.14/$0.14/$0.24; Gemini direct
-- 19.2s/28.5s/38.8s and dearer. Gemini is the boost route because it is
-- genuinely faster — the only honest reason to charge more for a speed tier.
update model_providers set priority = 10
where provider_model = 'google/nano-banana-pro/text-to-image' and role = 'normal';

insert into model_providers (model_id, provider_id, provider_model, role, priority, applies_when, active)
select m.id, p.id, 'gemini-3-pro-image-preview', 'normal', 20, null, true
from models m, providers p
where m.name = 'Nano Banana Pro' and p.key = 'gemini'
on conflict do nothing;

-- ── GPT-Image-2 ──────────────────────────────────────────────────────────
-- WaveSpeed first, OpenAI as the fallback and the boost. WaveSpeed is also
-- the only host of the two whose low|medium|high tier does anything, which is
-- what the quality control in the editor is sold on.
update model_providers set priority = 10, applies_when = null
where provider_model = 'openai/gpt-image-2/text-to-image' and role = 'normal';

insert into model_providers (model_id, provider_id, provider_model, role, priority, applies_when, active)
select m.id, p.id, 'gpt-image-2', 'normal', 20, null, true
from models m, providers p
where m.name = 'GPT-Image-2' and p.key = 'openai'
on conflict do nothing;

-- Existing boost rows keep their meaning; make the order explicit.
update model_providers set priority = 10 where role = 'boost';
