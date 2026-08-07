-- ════════════════════════════════════════════════════════════════
-- Enki — pending migrations, 2026-08-07, in dependency order.
-- Paste the whole file into the Supabase SQL editor and run once.
--
-- Already applied and NOT repeated here: 2026-08-07-provider-health.sql
-- Verified against the live schema before generating this file:
--   model_providers.priority      absent
--   model_providers.applies_when  absent
--   route_prices                  absent
--   providers.x402_endpoint       absent
--   artist_cost_ledger            absent
--   model_provider_health         PRESENT
--
-- Every statement is IF NOT EXISTS / ON CONFLICT DO NOTHING, so a second run
-- is a no-op rather than an error.
-- ════════════════════════════════════════════════════════════════


-- ───────────────────────────────────────────────────────────────
-- 2026-08-07-route-priority.sql
-- adds model_providers.priority + applies_when — the price view below SELECTS both, so this must run first
-- ───────────────────────────────────────────────────────────────

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

-- ───────────────────────────────────────────────────────────────
-- 2026-08-07-route-prices.sql
-- route_prices table + current_route_prices view (depends on the two columns above)
-- ───────────────────────────────────────────────────────────────

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

-- ───────────────────────────────────────────────────────────────
-- 2026-08-07-artist-cost-ledger.sql
-- artist_cost_ledger — independent of the other two
-- ───────────────────────────────────────────────────────────────

-- The artist side of the payout-account setup cost.
--
-- Terms of Use, Section 7: "A one time network setup cost for the payout
-- account (currently about $0.15; it varies with network conditions) is
-- deducted in halves from an artist's first revenue shares until covered."
--
-- Enki pays that cost — a Solana token account needs 2,039,280 lamports of
-- rent-exempt deposit (165 bytes, measured 2026-08-06) — so an artist can be
-- paid without ever holding SOL. Until now only the paying half existed:
-- generation_payment_intents.fronted_atas records WHICH accounts we funded,
-- and nothing anywhere recorded what that cost or what came back. This table
-- is the accounting we promised.
--
-- ── Why a table of its own ──────────────────────────────────────────────
-- Not on generation_payment_intents: an intent is one purchase by one buyer,
-- while this debt spans many purchases and outlives all of them. A running
-- balance on a per-purchase row needs a rule for which row is authoritative,
-- and the answer is always "none of them".
-- Not on users or user_wallets: it is not an attribute of an identity. A
-- wallet row can be soft-removed (user_wallets.removed_at) while the debt and
-- its history must survive for the accounting.
-- Not on fronted_recipient_atas: that table (live, empty, no migration in this
-- repo) records the FACT that an account was funded and carries no money at
-- all. An amount and its repayment do not belong on a row about an address.
--
-- ── Why entries and not two counters ────────────────────────────────────
-- Counters cannot say WHEN or FROM WHICH sale, and "an accounting" that
-- cannot itemise is not one. Entries also buy the two properties that
-- otherwise have to be hoped for in application code, here as constraints:
-- the setup cost can be charged once per payout account and a recovery can be
-- written once per intent. The balance is then derived, so it can never
-- disagree with the entries the way a counter drifts from its history.
--
-- Idempotent. Run in the Supabase SQL editor.

CREATE TABLE IF NOT EXISTS artist_cost_ledger (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Case-EXACT base58, as stored in user_wallets. A lowercased Solana address
  -- is a different (and usually nonexistent) account, so a caller that passes
  -- the session's lowercased copy would open a second, parallel debt and lose
  -- the first. Callers go through lib/payments/fronted-ledger.ts, which takes
  -- the address from exactWallet().
  artist_wallet text NOT NULL,
  -- An ATA belongs to (owner, mint), and devnet USDC is not mainnet USDC.
  -- Without this column a cost fronted on devnet would be recovered from real
  -- mainnet earnings.
  mint          text NOT NULL,
  entry         text NOT NULL CHECK (entry IN ('fronted', 'recovered')),
  -- integer micro-USDC (1 USDC = 1e6), matching generation_payment_intents.
  -- Both directions are positive; `entry` carries the sign. Zero is excluded
  -- because a recovery of nothing is not written at all.
  micro         bigint NOT NULL CHECK (micro > 0),
  -- What the chain actually charged us, on the fronting entry only. Kept
  -- beside micro so the rate the debt was priced at stays derivable
  -- (micro / lamports) and the artist's number can be audited years later,
  -- long after SOL has moved.
  lamports      bigint CHECK (lamports IS NULL OR lamports > 0),
  -- The intent this entry arose from. Deliberately NOT a foreign key: a
  -- ledger entry must outlive the operational row that caused it, and no
  -- cascade may ever delete a record of money taken from an artist.
  intent_id     uuid,
  created_at    timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT artist_cost_ledger_lamports_on_fronting
    CHECK ((entry = 'fronted') = (lamports IS NOT NULL)),
  -- The recovery's idempotency key; see the unique index below.
  CONSTRAINT artist_cost_ledger_recovery_has_intent
    CHECK (entry <> 'recovered' OR intent_id IS NOT NULL)
);

-- "A one time network setup cost" as a constraint rather than as a hope.
-- Re-running /authorize, or an artist closing and re-creating their token
-- account, must never put the charge on their books twice; the second
-- fronting is Enki's to absorb.
CREATE UNIQUE INDEX IF NOT EXISTS artist_cost_ledger_one_fronting
  ON artist_cost_ledger (artist_wallet, mint) WHERE entry = 'fronted';

-- One instalment per intent PER PAYOUT ACCOUNT. The recovery is recorded after
-- the payment is broadcast, and that write can be retried; without this a
-- retry would deduct a second time from a share that only moved once.
--
-- Keyed on (intent_id, artist_wallet, mint) rather than intent_id alone,
-- because one intent will not always mean one artist: source-split payouts pay
-- several artists from a single atomic transaction. With intent_id alone, the
-- SECOND artist on a shared intent hits the constraint, recordRecovery returns
-- false, and their deduction is silently never booked. Free to fix while the
-- table is empty and the migration unapplied; a data repair afterwards.
CREATE UNIQUE INDEX IF NOT EXISTS artist_cost_ledger_one_recovery_per_intent
  ON artist_cost_ledger (intent_id, artist_wallet, mint) WHERE entry = 'recovered';

-- The only hot query: the outstanding balance of one payout account.
CREATE INDEX IF NOT EXISTS artist_cost_ledger_account_idx
  ON artist_cost_ledger (artist_wallet, mint);

COMMENT ON TABLE artist_cost_ledger IS
  'Payout-account setup cost fronted by Enki and its recovery from artist '
  'revenue shares (Terms of Use, Section 7). Append-only: entries are never '
  'updated or deleted, and the balance is SUM(fronted) - SUM(recovered). A '
  'NEGATIVE balance means we recovered more than we fronted — possible when '
  'two sales are authorised against the same balance at once — and is a debt '
  'owed BACK to the artist, so it is left visible rather than clamped away.';

-- Written exclusively by the backend via the service role, like every other
-- money table here. An artist may be shown their own entries through an
-- endpoint; the anon key must never read the ledger directly.
ALTER TABLE artist_cost_ledger ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename   = 'artist_cost_ledger'
      AND policyname  = 'Service role can manage the artist cost ledger'
  ) THEN
    CREATE POLICY "Service role can manage the artist cost ledger"
      ON artist_cost_ledger FOR ALL TO service_role
      USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Check:
--   SELECT artist_wallet, mint,
--          SUM(micro) FILTER (WHERE entry = 'fronted')
--            - COALESCE(SUM(micro) FILTER (WHERE entry = 'recovered'), 0) AS outstanding_micro
--   FROM artist_cost_ledger GROUP BY 1, 2 ORDER BY 3 DESC;
