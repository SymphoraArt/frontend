-- Automatic failover, per ROUTE.
--
-- Health belongs on model_providers, not providers: an aggregator hosts each
-- model on a different upstream, so AceData's nano-banana-pro (Google's own
-- channel) can serve happily while their gpt-image-2 (a reverse channel) is
-- broken. Keying this per provider would take down the working route with the
-- broken one.
--
-- Deliberately NOT a flag on model_providers.active. That column is an admin
-- switch: someone decided this route is off. Health is a machine observation
-- that flips back on its own. Merge them and a recovery probe would silently
-- re-enable something a human turned off.
--
-- provider_id is carried alongside so that the failures which are genuinely
-- account-wide — a dead API key, an empty balance, an unreachable host — can
-- open every route of that provider in one statement instead of waiting to be
-- rediscovered model by model.

create table if not exists model_provider_health (
  model_provider_id uuid primary key references model_providers(id) on delete cascade,
  provider_id uuid not null references providers(id) on delete cascade,

  -- 'healthy'  route here normally
  -- 'down'     breaker open; traffic goes to the fallback until a probe says
  --            otherwise
  status text not null default 'healthy' check (status in ('healthy', 'down')),

  -- Consecutive INFRASTRUCTURE failures. Reset by any success. A prompt
  -- refused for content is not a failure of the route and never counts —
  -- otherwise one policy-violating prompt disables a model for everyone.
  consecutive_failures integer not null default 0,

  opened_at timestamptz,
  last_probe_at timestamptz,
  last_success_at timestamptz,
  last_failure_at timestamptz,
  last_error text,

  -- What the route last quoted, in micro-USDC. The x402 liveness probe returns
  -- the current price for free, so a price change becomes visible here instead
  -- of arriving as a surprise on a customer's invoice.
  last_quoted_micro bigint,

  updated_at timestamptz not null default now()
);

comment on table model_provider_health is
  'Circuit-breaker state per model+provider route. Machine-written; model_providers.active stays the human switch.';

-- The router asks "which routes are down" on the hot path, and the
-- provider-wide sweep needs to find every route of one provider.
create index if not exists model_provider_health_down_idx
  on model_provider_health (status) where status = 'down';
create index if not exists model_provider_health_provider_idx
  on model_provider_health (provider_id);

alter table model_provider_health enable row level security;

-- Service role only: written by the generate route, read by the router. No
-- client has any business seeing or setting it.
drop policy if exists model_provider_health_service_all on model_provider_health;
create policy model_provider_health_service_all
  on model_provider_health for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
