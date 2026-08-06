/**
 * What every route costs, and whether we are actually using the cheap one.
 *
 * The matrix exists for two jobs that would otherwise be done by memory:
 *
 *   1. Track price movement. An x402 route quotes itself for free, so a change
 *      can be noticed before it lands on a customer's invoice rather than
 *      after.
 *   2. Check the routing policy against reality. `priority` is hand-written,
 *      prices are not. When they disagree, the hand-written one is usually the
 *      one that went stale — and nothing in the code would ever say so.
 *
 * Writes are append-only. A price observation is a fact that happened at a
 * time; the newer fact supersedes the older one, it does not edit it.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { matchesConditions } from "@/lib/generation/routing";

/** Micro-USD. Integers only — money never touches a float in this codebase. */
export type Micro = number;

export interface PriceCell {
  modelProviderId: string;
  providerKey: string;
  modelName: string;
  role: string;
  priority: number;
  /** null = this price applies to any value of that setting (a flat rate). */
  quality: string | null;
  resolution: string | null;
  priceMicro: Micro | null;
  source: "quoted" | "declared" | null;
  observedAt: string | null;
  appliesWhen: Record<string, string[]> | null;
  routeActive: boolean;
}

/**
 * Does this price cell describe the given request?
 *
 * A NULL setting is a wildcard, which is how a flat-rate route covers all nine
 * gpt-image-2 cells with one row instead of nine identical ones. Matching is
 * case-insensitive for the same reason routing is: a "2k" against a "2K" would
 * otherwise silently read the wrong price.
 */
export function cellMatches(
  cell: Pick<PriceCell, "quality" | "resolution">,
  settings: { quality?: string | null; resolution?: string | null },
): boolean {
  const eq = (cellValue: string | null, asked: string | null | undefined) => {
    if (cellValue === null) return true; // wildcard
    if (asked === undefined || asked === null || asked === "") return false;
    return cellValue.toLowerCase() === String(asked).toLowerCase();
  };
  return eq(cell.quality, settings.quality) && eq(cell.resolution, settings.resolution);
}

/**
 * The cheapest priced route for a request, and what the policy would pick.
 *
 * Both sides respect `applies_when`, because a route that is not allowed to
 * serve this combination is not a candidate for either answer. Skipping that
 * check would report "we use AceData at 1K low" when routing in fact sends it
 * to WaveSpeed — a comparison against a route that never runs.
 *
 * Returns nulls rather than guesses when a price is missing: an unpriced route
 * is not free, it is unknown, and treating unknown as zero would route every
 * generation to whichever provider we forgot to fill in.
 */
export function cheapestFor(
  cells: PriceCell[],
  settings: { quality?: string | null; resolution?: string | null },
  role = "normal",
): { cheapest: PriceCell | null; byPolicy: PriceCell | null } {
  const usable = cells.filter(
    (c) =>
      c.routeActive &&
      c.role === role &&
      cellMatches(c, settings) &&
      matchesConditions(c.appliesWhen, settings),
  );

  const priced = usable.filter((c) => typeof c.priceMicro === "number");
  const cheapest =
    priced.length === 0
      ? null
      : priced.reduce((best, c) =>
          (c.priceMicro as number) < (best.priceMicro as number) ? c : best,
        );

  const byPolicy =
    usable.length === 0
      ? null
      : usable.reduce((best, c) => (c.priority < best.priority ? c : best));

  return { cheapest, byPolicy };
}

export interface Disagreement {
  modelName: string;
  quality: string | null;
  resolution: string | null;
  usingProvider: string;
  usingMicro: Micro;
  cheaperProvider: string;
  cheaperMicro: Micro;
  /** How much every generation on this cell overpays. */
  deltaMicro: Micro;
}

/**
 * Cells where the policy does not pick the cheapest priced route.
 *
 * This is the point of keeping the matrix. Prices move, a hand-set priority
 * does not, and the failure is silent: every generation on that cell quietly
 * overpays until someone happens to compare two web pages.
 *
 * Only cells where BOTH routes have a price are reported — "cheaper than
 * something we never priced" is not a finding.
 */
export function findDisagreements(cells: PriceCell[], role = "normal"): Disagreement[] {
  const out: Disagreement[] = [];

  // Per model, because a combination only means something within one model.
  const byModel = new Map<string, PriceCell[]>();
  for (const c of cells) {
    // routeActive is enforced in cheapestFor, which is the only thing that
    // reads this list — checking it twice would just be untestable code.
    if (c.role !== role) continue;
    const list = byModel.get(c.modelName);
    if (list) list.push(c);
    else byModel.set(c.modelName, [c]);
  }

  for (const list of byModel.values()) {
    // A wildcard row (flat rate) covers every combination, so the concrete
    // ones have to be enumerated from whatever values appear anywhere —
    // in the price rows AND in the routing conditions, since a condition can
    // name a resolution no price row mentions.
    for (const settings of combinationsIn(list)) {
      const { cheapest, byPolicy } = cheapestFor(list, settings, role);
      if (!cheapest || !byPolicy) continue;
      if (typeof byPolicy.priceMicro !== "number") continue;
      // Strictly cheaper, or there is nothing to report. This also covers the
      // case where the policy already picks the cheapest route, since nothing
      // is cheaper than itself.
      if ((cheapest.priceMicro as number) >= byPolicy.priceMicro) continue;

      out.push({
        modelName: byPolicy.modelName,
        quality: settings.quality,
        resolution: settings.resolution,
        usingProvider: byPolicy.providerKey,
        usingMicro: byPolicy.priceMicro,
        cheaperProvider: cheapest.providerKey,
        cheaperMicro: cheapest.priceMicro as number,
        deltaMicro: byPolicy.priceMicro - (cheapest.priceMicro as number),
      });
    }
  }
  // Worst overpayment first — that is the one worth acting on.
  return out.sort((a, b) => b.deltaMicro - a.deltaMicro);
}

/**
 * Every concrete settings combination these routes could be asked for.
 *
 * Values are gathered from price rows and from routing conditions both: a
 * flat-rate provider names no resolutions at all, so without the conditions
 * a model priced only by AceData would produce an empty combination list and
 * silently report nothing.
 */
export function combinationsIn(
  cells: PriceCell[],
): { quality: string | null; resolution: string | null }[] {
  const qualities = new Set<string>();
  const resolutions = new Set<string>();
  for (const c of cells) {
    if (c.quality) qualities.add(c.quality.toLowerCase());
    if (c.resolution) resolutions.add(c.resolution.toLowerCase());
    for (const [k, vs] of Object.entries(c.appliesWhen ?? {})) {
      for (const v of vs ?? []) {
        if (k === "quality") qualities.add(String(v).toLowerCase());
        if (k === "resolution") resolutions.add(String(v).toLowerCase());
      }
    }
  }
  const qs: (string | null)[] = qualities.size ? [...qualities] : [null];
  const rs: (string | null)[] = resolutions.size ? [...resolutions] : [null];
  return qs.flatMap((quality) => rs.map((resolution) => ({ quality, resolution })));
}

/** The whole matrix, as the admin panel and the disagreement check read it. */
export async function loadMatrix(supabase: SupabaseClient): Promise<PriceCell[]> {
  const { data, error } = await supabase.from("current_route_prices").select("*");
  if (error) {
    console.warn("[price-matrix] could not read:", error.message);
    return [];
  }
  return (data ?? []).map((r: Record<string, unknown>) => ({
    modelProviderId: String(r.model_provider_id),
    providerKey: String(r.provider_key),
    modelName: String(r.model_name),
    role: String(r.role ?? "normal"),
    priority: Number(r.priority ?? 100),
    quality: (r.quality as string) ?? null,
    resolution: (r.resolution as string) ?? null,
    priceMicro: r.price_micro === null || r.price_micro === undefined ? null : Number(r.price_micro),
    source: (r.source as "quoted" | "declared") ?? null,
    observedAt: (r.observed_at as string) ?? null,
    appliesWhen: (r.applies_when as Record<string, string[]>) ?? null,
    routeActive: r.route_active !== false,
  }));
}

export interface Observation {
  modelProviderId: string;
  quality?: string | null;
  resolution?: string | null;
  priceMicro: Micro;
  source: "quoted" | "declared";
  sourceNote?: string | null;
}

/**
 * Record a price, superseding whatever stood there.
 *
 * Returns whether the price actually MOVED. An unchanged price writes nothing:
 * a refresh that runs often would otherwise bury the real changes under
 * thousands of identical rows, and the history is the reason this table exists.
 */
export async function recordPrice(
  supabase: SupabaseClient,
  obs: Observation,
): Promise<{ changed: boolean; previousMicro: Micro | null }> {
  const quality = obs.quality ?? null;
  const resolution = obs.resolution ?? null;

  let existing = supabase
    .from("route_prices")
    .select("id, price_micro")
    .eq("model_provider_id", obs.modelProviderId)
    .is("superseded_at", null);
  existing = quality === null ? existing.is("quality", null) : existing.eq("quality", quality);
  existing = resolution === null ? existing.is("resolution", null) : existing.eq("resolution", resolution);

  const { data: current } = await existing.maybeSingle();
  const previousMicro = current ? Number(current.price_micro) : null;

  if (previousMicro === obs.priceMicro) return { changed: false, previousMicro };

  const now = new Date().toISOString();
  if (current) {
    await supabase.from("route_prices").update({ superseded_at: now }).eq("id", current.id);
  }
  const { error } = await supabase.from("route_prices").insert({
    model_provider_id: obs.modelProviderId,
    quality,
    resolution,
    price_micro: obs.priceMicro,
    source: obs.source,
    source_note: obs.sourceNote ?? null,
    observed_at: now,
  });
  if (error) {
    console.warn("[price-matrix] could not record:", error.message);
    return { changed: false, previousMicro };
  }

  if (previousMicro !== null) {
    const pct = (((obs.priceMicro - previousMicro) / previousMicro) * 100).toFixed(1);
    console.warn(
      `[price-matrix] ${obs.modelProviderId} ${quality ?? "*"}/${resolution ?? "*"}: ` +
        `${previousMicro} -> ${obs.priceMicro} micro-USD (${pct}%)`,
    );
  }
  return { changed: true, previousMicro };
}
