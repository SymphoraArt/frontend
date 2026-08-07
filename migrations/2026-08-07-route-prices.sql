-- What every route costs, per settings combination, over time.
--
-- Two things this has to answer, and they pull in different directions:
--   "which provider do we use where"   -> one current price per cell
--   "how did prices move"              -> never overwrite anything
--
-- So it is append-only with a pointer to the current row, the same shape as
-- automod_events: an observation is a fact that happened, and a fact does not
-- get edited when a newer one arrives.
--
-- ── Why per (route, quality, resolution) ────────────────────────────────
-- One route does not have one price. WaveSpeed's gpt-image-2 has nine
-- ($0.01 to $0.72), AceData's has one flat rate, and Nano Banana Pro has a 4K
-- premium and nothing else. A single price column per route would have to lie
-- about at least one of them.
--
-- ── Why the source matters ──────────────────────────────────────────────
-- An x402 route quotes its own price for free, before any payment exists —
-- that number is true at the moment it is read. A price copied off a pricing
-- page is true only until someone changes the page. Marking which is which is
-- the difference between "our data is stale" and "we do not know that it is".

create table if not exists route_prices (
  id uuid primary key default gen_random_uuid(),
  model_provider_id uuid not null references model_providers(id) on delete cascade,

  -- The cell this price applies to. NULL means "any value of this setting",
  -- which is how a flat-rate route is expressed without inventing nine
  -- identical rows.
  quality text,
  resolution text,

  -- Micro-USD, integer. Money is never a float here, same rule as
  -- generation_payment_intents: 0.7727 credits at 0.095215 is $0.073572, and
  -- that has to survive being added up a million times.
  price_micro bigint not null check (price_micro >= 0),
  currency text not null default 'USD',

  -- 'quoted'   read from a live 402 handshake; true when observed
  -- 'declared' copied from a pricing page or a contract; true until it isn't
  source text not null check (source in ('quoted', 'declared')),
  -- Where it came from: a URL for declared, a trace id or endpoint for quoted.
  source_note text,

  observed_at timestamptz not null default now(),
  -- NULL = this is the current price for its cell.
  superseded_at timestamptz
);

comment on table route_prices is
  'Append-only price observations per route and settings cell. Never UPDATE a price; insert a new row and supersede the old one.';

-- Exactly one current row per cell. The coalesce is what makes a NULL setting
-- (flat rate) participate in uniqueness instead of silently allowing
-- duplicates, since NULL is never equal to NULL in a unique index.
create unique index if not exists route_prices_current_idx
  on route_prices (model_provider_id, coalesce(quality, '*'), coalesce(resolution, '*'))
  where superseded_at is null;

create index if not exists route_prices_history_idx
  on route_prices (model_provider_id, observed_at desc);

alter table route_prices enable row level security;

drop policy if exists route_prices_service_all on route_prices;
create policy route_prices_service_all
  on route_prices for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Prices are not secret and the admin panel reads them; anyone signed in may
-- look. Writing stays service-role only, so the history cannot be doctored
-- from a browser.
drop policy if exists route_prices_read on route_prices;
create policy route_prices_read
  on route_prices for select
  using (true);

-- ── The matrix ───────────────────────────────────────────────────────────
-- One row per cell we can actually serve, joined to what it costs. This is the
-- "which provider do we use where" view, and it is also what makes a
-- hand-written priority checkable against reality.
create or replace view current_route_prices as
select
  m.name              as model_name,
  m.id                as model_id,
  p.key               as provider_key,
  mp.id               as model_provider_id,
  mp.role,
  mp.priority,
  mp.provider_model,
  mp.applies_when,
  mp.active           as route_active,
  rp.quality,
  rp.resolution,
  rp.price_micro,
  rp.source,
  rp.observed_at
from model_providers mp
join models m    on m.id = mp.model_id
join providers p on p.id = mp.provider_id
left join route_prices rp
  on rp.model_provider_id = mp.id and rp.superseded_at is null;

comment on view current_route_prices is
  'The price matrix: every route, its settings conditions, and its current price per cell.';

-- ── Where an x402 quote can be fetched ───────────────────────────────────
-- Kev, 2026-08-07: "ich wette, wir werden auch noch andere x402 platformen
-- nutzen". Storing the endpoint makes the next one a row rather than a deploy,
-- exactly like allowed_ratios and max_reference_images on models.
alter table providers
  add column if not exists x402_endpoint text;

comment on column providers.x402_endpoint is
  'Base URL that answers HTTP 402 with a price. Set = this provider can be price-refreshed and liveness-probed for free.';

-- No provider is given an endpoint here. The column is the mechanism; which
-- hosts get one is a separate decision, and the only x402 platform measured so
-- far (AceData) is on hold until its commercial-use terms are answered in
-- writing. An UPDATE per provider is all it takes once that is settled.
