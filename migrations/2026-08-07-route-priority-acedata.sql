-- Ordered failover, and routes that only apply under certain settings.
--
-- Kev's routing policy, 2026-08-07, which is the cheapest option per cell
-- measured against the live APIs on 2026-08-06 (bench-output/):
--
--   Nano Banana Pro   normal: acedata -> wavespeed -> gemini
--                     boost:  gemini direct
--
--   GPT-Image-2       1k low            wavespeed  ($0.010 vs AceData $0.0105)
--                     2k low, 4k low    acedata    ($0.0105 vs $0.020 / $0.030)
--                     medium, high      wavespeed  (AceData has no such tier)
--                     then              openai
--                     boost:            openai direct
--
-- Two columns carry that:
--
--   priority      lower wins. The router walks routes in this order and takes
--                 the first whose breaker is closed, so failover order is
--                 stated rather than implied by role.
--
--   applies_when  null = always eligible. Otherwise every key must match the
--                 request, with the row listing the accepted values. This is
--                 what lets AceData serve gpt-image-2 at 2K/4K low and stay
--                 out of the way everywhere else — a plain ordered list cannot
--                 express "cheapest here, absent there".

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

-- ── AceData ──────────────────────────────────────────────────────────────
-- Settles per request over x402 on Solana with the USDC mint we already use,
-- and their facilitator pays the network fee, so no API key and no prepaid
-- balance are involved.
insert into providers (key, name, audience, active)
values ('acedata', 'AceData Cloud', 'public', true)
on conflict (key) do nothing;

-- ── Nano Banana Pro ──────────────────────────────────────────────────────
-- Measured: AceData 28.1s/37.2s/50.4s at $0.0491/$0.0491/$0.0736 against
-- WaveSpeed's 73.1s/78.1s/77.0s at $0.14/$0.14/$0.24 — faster AND cheaper at
-- every tier, which is why it goes first.
insert into model_providers (model_id, provider_id, provider_model, role, priority, applies_when, active)
select m.id, p.id, 'nano-banana-pro:official', 'normal', 10, null, true
from models m, providers p
where m.name = 'Nano Banana Pro' and p.key = 'acedata'
on conflict do nothing;

update model_providers set priority = 20
where provider_model = 'google/nano-banana-pro/text-to-image' and role = 'normal';

-- Gemini as the last normal resort. It is also the boost route: unlike
-- WaveSpeed it genuinely is faster (19.2s/28.5s/38.8s), so it is the only one
-- of the three that can honestly be sold as a speed upgrade.
insert into model_providers (model_id, provider_id, provider_model, role, priority, applies_when, active)
select m.id, p.id, 'gemini-3-pro-image-preview', 'normal', 30, null, true
from models m, providers p
where m.name = 'Nano Banana Pro' and p.key = 'gemini'
on conflict do nothing;

-- ── GPT-Image-2 ──────────────────────────────────────────────────────────
-- AceData only where it actually wins. Its price is flat, so at 1K low
-- WaveSpeed is cheaper ($0.010 vs $0.0105) and AceData must not be picked;
-- from 2K upward the flat price beats WaveSpeed's ladder.
--
-- AceData is excluded from medium and high on purpose: `quality` provably
-- does nothing there (same price, same resolution, both tiers) and the price
-- sits in WaveSpeed's low band, so selling it as medium or high would be
-- selling a control that is not connected.
insert into model_providers (model_id, provider_id, provider_model, role, priority, applies_when, active)
select m.id, p.id, 'gpt-image-2', 'normal', 10,
       '{"quality": ["low"], "resolution": ["2K", "4K"]}'::jsonb, true
from models m, providers p
where m.name = 'GPT-Image-2' and p.key = 'acedata'
on conflict do nothing;

update model_providers set priority = 20, applies_when = null
where provider_model = 'openai/gpt-image-2/text-to-image' and role = 'normal';

insert into model_providers (model_id, provider_id, provider_model, role, priority, applies_when, active)
select m.id, p.id, 'gpt-image-2', 'normal', 30, null, true
from models m, providers p
where m.name = 'GPT-Image-2' and p.key = 'openai'
on conflict do nothing;

-- Existing boost rows keep their meaning; make the order explicit.
update model_providers set priority = 10 where role = 'boost';
