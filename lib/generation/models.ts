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

export type Provider = "gemini" | "openai" | "wavespeed" | "pollinations";

export interface Route {
  provider: Provider;
  /** The provider's own model id, e.g. "gemini-3-pro-image-preview". */
  providerModel: string;
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
  /** True when the model honours a size/resolution request. */
  supportsResolution: boolean;
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
 * gemini-3-pro-image-preview honours imageSize (1K 1024², 2K 2048², 4K 4096²);
 * gemini-2.5-flash-image ignores it and always returns 1024².
 */
const BY_SLUG: Record<string, Pick<ResolvedModel, "normal" | "boost" | "supportsResolution">> = {
  "nano-banana-pro": {
    normal: { provider: "wavespeed", providerModel: "google/nano-banana-pro/text-to-image" },
    boost: { provider: "gemini", providerModel: "gemini-3-pro-image-preview" },
    supportsResolution: true,
  },
  "nano-banana": {
    // gemini-2.5-flash-image ignores imageSize entirely — measured, it always
    // returns 1024x1024 — so it must never be charged by resolution.
    normal: { provider: "gemini", providerModel: "gemini-2.5-flash-image" },
    boost: { provider: "gemini", providerModel: "gemini-2.5-flash-image" },
    supportsResolution: false,
  },
  "gpt-image-2": {
    // No WaveSpeed host and no OpenAI code path yet; both routes name the
    // target so the row is honest rather than silently running Gemini.
    normal: { provider: "openai", providerModel: "gpt-image-2" },
    boost: { provider: "openai", providerModel: "gpt-image-2" },
    supportsResolution: true,
  },
  "flux-free": {
    // The free generator is a provider like any other (Kev, 2026-08-06), not a
    // branch in the code. No faster host exists, so boost is the same route
    // and hasBoost() reports false — the button never appears for it.
    normal: { provider: "pollinations", providerModel: "flux" },
    boost: { provider: "pollinations", providerModel: "flux" },
    // Pollinations maps a ratio to width/height itself and its "resolution"
    // only picks the base edge, so a size request is honoured in spirit.
    supportsResolution: true,
  },
};

/** What we fall back to when nothing is selected or the lookup fails. */
export const DEFAULT_MODEL: ResolvedModel = {
  id: null,
  name: "Nano Banana Pro",
  ...BY_SLUG["nano-banana-pro"],
  allowedRatios: ["1:1", "16:9", "9:16"],
  maxRefs: 3,
};

/** A row of model_providers with its provider embedded. */
interface LinkRow {
  role?: string | null;
  provider_model?: string | null;
  active?: boolean | null;
  providers?: { key?: string | null; audience?: string | null; active?: boolean | null } | null;
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
  return { provider: p.key as Provider, providerModel: link.provider_model };
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
    allowedRatios: row.allowed_ratios?.length ? row.allowed_ratios : DEFAULT_MODEL.allowedRatios,
    maxRefs: typeof row.max_reference_images === "number" ? row.max_reference_images : DEFAULT_MODEL.maxRefs,
    // Derived from the model, never from a column: whether a model honours a
    // resolution is a fact about that model, and a stale column would make us
    // charge for a size the model silently ignores.
    supportsResolution: bridge.supportsResolution,
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
        "model_providers(role, provider_model, active, providers(key, audience, active))",
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
      "model_providers(role, provider_model, active, providers(key, audience, active))",
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
