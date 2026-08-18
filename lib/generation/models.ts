/**
 * Which provider model a user's pick actually maps to.
 *
 * This is the piece that was missing: the editor sent `modelIds`, the route
 * used them for ratio validation only, and the generation then ran on whatever
 * the service happened to default to (gemini-2.5-flash-image). So "Nano Banana
 * Pro" and "GPT-Image-2" produced identical output from a third model, while
 * the price was charged per the user's selection.
 *
 * Config lives in the `models` table so a new generator is a row, not a
 * deploy — same principle as allowed_ratios and max_reference_images. The
 * slug map below is only a bridge for rows written before the provider columns
 * existed; it is not the source of truth.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { eligibleRoutes, pickRoute, type RouteLink, type RouteCandidate } from "@/lib/generation/routing";
import { loadHealth, breakerVerdict, runProbe } from "@/lib/generation/provider-health";
import { canCarryReferenceImages } from "@/lib/generation/provider-capabilities";
import { maxTier, type ResolutionTier } from "@/lib/generation/resolution";

export type Provider = "gemini" | "openai" | "wavespeed" | "pollinations" | "acedata";

export interface Route {
  provider: Provider;
  /** The provider's own model id, e.g. "gemini-3-pro-image". */
  providerModel: string;
  /**
   * The model_providers row this came from, and its provider. Carried so the
   * circuit breaker can be told which ROUTE succeeded or failed — health is
   * per route, because an aggregator hosts each model on a different upstream
   * and they fail independently.
   */
  modelProviderId?: string;
  providerId?: string;
}

export interface ResolvedModel {
  /** Row id in `models`, when it came from the database. */
  id: string | null;
  /** Display name, e.g. "Nano Banana Pro". */
  name: string;
  /**
   * The same model can be reached two ways, and that is the product:
   *   normal — WaveSpeed, cheaper, ~73-78s
   *   boost  — the vendor directly, dearer, ~19-39s
   * Boost picks WHERE the model runs, never WHICH model runs, so the picture
   * a user gets is the same either way. Measured 2026-08-06 on the same
   * prompt; where a model has no WaveSpeed host, both routes are the same.
   */
  normal: Route;
  boost: Route;
  allowedRatios: string[];
  maxRefs: number;
  /**
   * Every model_providers row for this model, unfiltered. chooseRoute() walks
   * them per request; normal/boost above stay as the settings-independent
   * answer everything else already depends on.
   */
  links?: unknown[];
  /** True when the model honours a size/resolution request. */
  supportsResolution: boolean;
  /**
   * The largest tier this model genuinely renders, so a picker can offer the
   * sizes that exist instead of a fixed 1K/2K/4K list. Flux caps at 2K: its
   * worker clamps on total pixels, so a 4K request there never exceeds 0.59 MP.
   */
  maxResolution: ResolutionTier;
  /**
   * True when the model takes a low|medium|high quality tier as its OWN
   * parameter. Only the gpt-image family does — on both hosts. For Gemini the
   * concept does not exist, and offering a control that changes nothing is the
   * kind of lie this file was written to remove.
   */
  supportsQuality: boolean;
}

/** The route to use for this request. */
export function routeFor(model: ResolvedModel, boost: boolean | undefined): Route {
  return boost ? model.boost : model.normal;
}

/**
 * Does boost actually do anything for this model?
 *
 * Derived, never stored. A column saying "has boost" would be a second truth
 * next to the model_providers rows, and two truths drift: someone deletes the
 * boost row and the flag still says yes, so the UI offers a paid speed-up that
 * changes nothing. The rows ARE the answer — a boost route that differs from
 * the normal one is exactly what "has boost" means.
 */
export function hasBoost(model: ResolvedModel): boolean {
  return (
    model.boost.provider !== model.normal.provider ||
    model.boost.providerModel !== model.normal.providerModel
  );
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/**
 * Bridge for rows that predate models.provider_model. Measured 2026-08-06:
 * gemini-3-pro-image honours imageSize (1K 1024², 2K 2048², 4K 4096²);
 * gemini-2.5-flash-image ignores it and always returns 1024².
 *
 * The id here was gemini-3-pro-image-PREVIEW, which Google shut down on
 * 2026-06-25 ("The gemini-3-pro-image-preview models are deprecated and will
 * be shut down on June 25, 2026"). The GA id, released 2026-05-28, is
 * gemini-3-pro-image. The live model_providers rows carried the dead id too;
 * migrations/2026-08-12-reference-image-limits.sql renames them.
 */
const BY_SLUG: Record<string, Pick<ResolvedModel, "normal" | "boost" | "supportsResolution" | "supportsQuality">> = {
  "nano-banana-pro": {
    normal: { provider: "wavespeed", providerModel: "google/nano-banana-pro/text-to-image" },
    boost: { provider: "gemini", providerModel: "gemini-3-pro-image" },
    supportsResolution: true,
    supportsQuality: false,
  },
  "nano-banana": {
    // gemini-2.5-flash-image ignores imageSize entirely — measured, it always
    // returns 1024x1024 — so it must never be charged by resolution.
    normal: { provider: "gemini", providerModel: "gemini-2.5-flash-image" },
    boost: { provider: "gemini", providerModel: "gemini-2.5-flash-image" },
    supportsResolution: false,
    supportsQuality: false,
  },
  "gpt-image-2": {
    // Same trade as Nano Banana Pro: WaveSpeed hosts it cheaper and slower,
    // OpenAI direct is the boost. Path verified live 2026-08-06.
    normal: { provider: "wavespeed", providerModel: "openai/gpt-image-2/text-to-image" },
    boost: { provider: "openai", providerModel: "gpt-image-2" },
    // OpenAI takes pixels rather than a tier; the service converts, so the
    // resolution the user picks really does change the image.
    supportsResolution: true,
    // low | medium | high, accepted by BOTH hosts — verified live 2026-08-06.
    // It is also the real price lever on OpenAI: roughly 0.006 / 0.053 / 0.211
    // USD at 1024², a 35x spread. AceData is the exception — measured
    // 2026-08-06, quality changes neither its price nor its output there.
    supportsQuality: true,
  },
  "flux-free": {
    // The free generator is a provider like any other (Kev, 2026-08-06), not a
    // branch in the code. No faster host exists, so boost is the same route
    // and hasBoost() reports false — the button never appears for it.
    normal: { provider: "pollinations", providerModel: "flux" },
    boost: { provider: "pollinations", providerModel: "flux" },
    /* "Honoured in spirit" was the old claim here, and it is false. The
       worker clamps on TOTAL pixels before diffusing, so nothing this route
       returns exceeds 0.59 MP — at 1:1 and 16:9 a 2K and a 4K request come
       back as the very same image. The ceiling that matters now lives in
       lib/generation/resolution.ts, which caps this route at 2K. */
    supportsResolution: true,
    supportsQuality: false,
  },
};

/** What we fall back to when nothing is selected or the lookup fails. */
export const DEFAULT_MODEL: ResolvedModel = {
  id: null,
  name: "Nano Banana Pro",
  ...BY_SLUG["nano-banana-pro"],
  maxResolution: maxTier("wavespeed", "google/nano-banana-pro/text-to-image"),
  allowedRatios: ["1:1", "16:9", "9:16"],
  maxRefs: 3,
};

/** A row of model_providers with its provider embedded. */
interface LinkRow {
  id?: string | null;
  role?: string | null;
  provider_model?: string | null;
  active?: boolean | null;
  priority?: number | null;
  applies_when?: Record<string, string[]> | null;
  provider_id?: string | null;
  providers?: {
    id?: string | null;
    key?: string | null;
    audience?: string | null;
    active?: boolean | null;
  } | null;
}

interface ModelRow {
  id?: string;
  name?: string;
  allowed_ratios?: string[] | null;
  max_reference_images?: number | null;
  model_providers?: LinkRow[] | null;
}

/** Who the caller is allowed to be routed to. */
export type Audience = "public" | "enterprise" | "internal";

function linkToRoute(link: LinkRow | undefined, audience: Audience): Route | null {
  if (!link || link.active === false) return null;
  const p = link.providers;
  if (!p?.key || p.active === false) return null;
  // An enterprise-only host must stay invisible to a normal account even when
  // a model lists it — otherwise the routing quietly grants access the
  // customer never bought.
  const want = (p.audience as Audience) ?? "public";
  if (want !== "public" && want !== audience) return null;
  if (!link.provider_model) return null;
  return {
    provider: p.key as Provider,
    providerModel: link.provider_model,
    modelProviderId: link.id ?? undefined,
    providerId: link.provider_id ?? p.id ?? undefined,
  };
}

function fromRow(row: ModelRow, audience: Audience): ResolvedModel {
  const bridge = BY_SLUG[slug(row.name ?? "")] ?? BY_SLUG["nano-banana-pro"];
  const links = row.model_providers ?? [];

  // The database is the truth once the providers migration has run; the slug
  // bridge only covers the window before that.
  const normal =
    linkToRoute(links.find((l) => l.role === "normal"), audience) ?? bridge.normal;
  // No boost row means this model simply has no faster host. Falling back to
  // `normal` makes boost a no-op instead of an error, and instead of silently
  // routing somewhere the row never named.
  const boost =
    linkToRoute(links.find((l) => l.role === "boost"), audience) ??
    (row.model_providers?.length ? normal : bridge.boost);

  return {
    id: row.id ?? null,
    name: row.name ?? DEFAULT_MODEL.name,
    normal,
    boost,
    // The raw rows travel with the model because the ORDERED choice cannot be
    // made here: which route is cheapest depends on the quality and resolution
    // of the request, which fromRow never sees.
    links,
    allowedRatios: row.allowed_ratios?.length ? row.allowed_ratios : DEFAULT_MODEL.allowedRatios,
    maxRefs: typeof row.max_reference_images === "number" ? row.max_reference_images : DEFAULT_MODEL.maxRefs,
    /* Derived from the ROUTE, never from a column and no longer from the
       display-name bridge. Whether a model honours a resolution is a fact
       about the provider and the provider model, and the bridge answered it
       by slugging row.name with a fallback to the Nano Banana Pro entry — so
       any name it did not recognise inherited supportsResolution: true and
       was billed by resolution against a host that may ignore the field.
       lib/generation/resolution.ts fails closed at 1K instead. */
    supportsResolution: maxTier(normal.provider, normal.providerModel) !== "1K",
    maxResolution: maxTier(normal.provider, normal.providerModel),
    supportsQuality: bridge.supportsQuality,
  };
}

/**
 * Look a model up by display name. For routes that know WHICH model they run
 * but never receive an id — the free path is hard-wired to Flux and has no
 * model picker, yet its generations still belong in the same catalogue.
 */
export async function resolveModelByName(
  supabase: SupabaseClient | null,
  name: string,
  audience: Audience = "public",
): Promise<ResolvedModel> {
  if (!supabase) return DEFAULT_MODEL;
  try {
    const { data, error } = await supabase
      .from("models")
      .select(
        "id, name, allowed_ratios, max_reference_images, " +
        "model_providers(id, role, provider_model, active, priority, applies_when, provider_id, providers(id, key, audience, active))",
      )
      .ilike("name", name)
      .eq("active", true)
      .limit(1);
    if (error || !data?.length) return DEFAULT_MODEL;
    return fromRow(data[0] as unknown as ModelRow, audience);
  } catch {
    return DEFAULT_MODEL;
  }
}

/**
 * Resolve the user's selection. Takes the FIRST id that resolves — multi-select
 * exists in the editor for prompt authoring (which models a prompt is meant
 * for), while a single generation runs on exactly one model.
 */
export async function resolveModel(
  supabase: SupabaseClient | null,
  modelIds: string[] | undefined,
  audience: Audience = "public",
): Promise<ResolvedModel> {
  if (!supabase || !modelIds?.length) return DEFAULT_MODEL;
  try {
    const pick = (cols: string) =>
      supabase.from("models").select(cols).in("id", modelIds).eq("active", true);

    // Embed the provider links. Asking for a relation that does not exist
    // fails the whole query, so the fallback is a plain select — that is the
    // window before the providers migration has run, where the slug bridge in
    // fromRow() takes over.
    let rows: ModelRow[];
    const joined = await pick(
      "id, name, allowed_ratios, max_reference_images, " +
      "model_providers(id, role, provider_model, active, priority, applies_when, provider_id, providers(id, key, audience, active))",
    );
    if (joined.error) {
      const flat = await pick("id, name, allowed_ratios, max_reference_images");
      rows = (flat.data ?? []) as unknown as ModelRow[];
    } else {
      rows = (joined.data ?? []) as unknown as ModelRow[];
    }
    // Preserve the user's order rather than the database's.
    for (const wanted of modelIds) {
      const row = rows.find((r) => r.id === wanted);
      if (row) return fromRow(row, audience);
    }
    return rows.length ? fromRow(rows[0], audience) : DEFAULT_MODEL;
  } catch {
    return DEFAULT_MODEL;
  }
}

/** Exposed for tests: the pure row -> route mapping, without a database. */
export const __testing__ = { fromRow, linkToRoute };

/**
 * The route this request should actually run on: cheapest first, skipping
 * hosts whose breaker is open, probing one that is due.
 *
 * routeFor() above still answers the settings-independent question everything
 * else asks. This is the one the generation itself uses, because which host is
 * cheapest depends on the quality and resolution being requested — AceData's
 * flat gpt-image-2 price loses at 1K and wins from 2K up.
 *
 * Falls back to routeFor() whenever the ordered list cannot be built: no
 * priority columns yet, no matching row, everything down. Delivering the image
 * matters more than delivering it cheaply.
 *
 * Returns NULL in exactly one case: the request carries reference images and no
 * host — not the ordered candidates, not the fallback — can pass them to the
 * model. Null rather than a route the caller might use anyway, because the
 * fallback path is precisely how the silent drop used to happen: candidates
 * came back empty and routeFor() handed over WaveSpeed, which discards them.
 * A nullable return makes the compiler force every caller to decide.
 */
export async function chooseRoute(
  supabase: SupabaseClient | null,
  model: ResolvedModel,
  opts: {
    boost?: boolean;
    quality?: string | null;
    resolution?: string | null;
    /** How many reference images the request carries. */
    referenceImages?: number;
  },
  audience: Audience = "public",
): Promise<Route | null> {
  const refs = opts.referenceImages ?? 0;
  const rawFallback = routeFor(model, opts.boost);
  // The fallback is a route like any other and gets the same capability test.
  const fallback = canCarryReferenceImages(rawFallback.provider, refs) ? rawFallback : null;

  const links = (model.links ?? []) as RouteLink[];
  if (!supabase || links.length === 0) return fallback;

  const candidates = eligibleRoutes(
    links,
    { quality: opts.quality, resolution: opts.resolution },
    opts.boost ? "boost" : "normal",
    audience,
    { referenceImages: refs },
  );
  if (candidates.length === 0) return fallback;

  const health = await loadHealth(
    supabase,
    candidates.map((c) => c.id).filter(Boolean),
  );
  const now = Date.now();
  const { chosen, probe } = pickRoute(candidates, (id) =>
    breakerVerdict(health.get(id) ?? null, now),
  );

  // A route that is due a probe gets one before we spend more of the buyer's
  // money elsewhere: the x402 quote is free and takes about 200ms, so asking
  // is cheaper than assuming it is still down.
  for (const c of probe) {
    const alive = await runProbe(supabase, c.id, c.providerId, c.providerKey, c.providerModel);
    if (alive) return toRoute(c);
  }

  return chosen ? toRoute(chosen) : fallback;
}

const toRoute = (c: RouteCandidate): Route => ({
  provider: c.providerKey as Provider,
  providerModel: c.providerModel,
  modelProviderId: c.id,
  providerId: c.providerId,
});
