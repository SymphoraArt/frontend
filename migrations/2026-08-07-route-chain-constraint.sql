-- Let a model have MORE THAN ONE route per role.
--
-- 2026-08-07-route-priority.sql added a `priority` column so failover order
-- could be stated. It is inert: model_providers carries
--
--   unique constraint model_providers_model_id_role_key (model_id, role)
--
-- so a model may have exactly one normal route and one boost route, and two
-- rows can never compete for the same slot. Both fallback INSERTs in that
-- migration hit this and were swallowed by `on conflict do nothing`, which is
-- why they left no trace — a silent no-op rather than an error. Confirmed
-- against the live database: the insert returns 23505 naming this constraint.
--
-- The constraint and the feature are mutually exclusive. Kev's routing policy
-- is a CHAIN ("acedata -> wavespeed -> gemini"), so the constraint goes.
--
-- ── What replaces it ────────────────────────────────────────────────────
-- (model_id, role, provider_id, provider_model). Still refuses a genuine
-- duplicate — the same host offering the same model twice in the same role —
-- while allowing a chain of different hosts.
--
-- provider_model is part of the key on purpose: one provider can host the same
-- model under two ids at different prices and qualities. AceData's
-- `nano-banana-pro` and `nano-banana-pro:official` are exactly that (measured
-- 2026-08-06: $0.0333 flat 1K-only versus $0.0491/$0.0736 with a working
-- resolution ladder). Keying on provider_id alone would make those two
-- mutually exclusive.

alter table model_providers
  drop constraint if exists model_providers_model_id_role_key;

create unique index if not exists model_providers_unique_route
  on model_providers (model_id, role, provider_id, provider_model);

comment on index model_providers_unique_route is
  'One row per (model, role, host, host-side model id). Replaced the (model_id, role) unique key, which allowed only a single route per role and made `priority` unreachable.';

-- ── The fallback routes that could not be inserted before ────────────────
-- Measured 2026-08-06. Gemini direct is 19.2s/28.5s/38.8s at 1K/2K/4K against
-- WaveSpeed's 73.1/78.1/77.0, and dearer — which is why it is both the boost
-- route and the last normal resort: when WaveSpeed is down, paying more to
-- deliver at all beats not delivering.
insert into model_providers (model_id, provider_id, provider_model, role, priority, applies_when, active)
select m.id, p.id, 'gemini-3-pro-image-preview', 'normal', 20, null, true
from models m, providers p
where m.name = 'Nano Banana Pro' and p.key = 'gemini'
on conflict (model_id, role, provider_id, provider_model) do nothing;

insert into model_providers (model_id, provider_id, provider_model, role, priority, applies_when, active)
select m.id, p.id, 'gpt-image-2', 'normal', 20, null, true
from models m, providers p
where m.name = 'GPT-Image-2' and p.key = 'openai'
on conflict (model_id, role, provider_id, provider_model) do nothing;

-- Flux has one host and no fallback; give it a stated priority anyway so no
-- route in the table sits on the default and looks deliberate by accident.
update model_providers set priority = 10
where provider_model = 'flux' and role = 'normal' and priority = 100;
