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

export interface ResolvedModel {
  /** Row id in `models`, when it came from the database. */
  id: string | null;
  /** Display name, e.g. "Nano Banana Pro". */
  name: string;
  /** Which API to call. */
  provider: "gemini" | "openai" | "wavespeed";
  /** The provider's own model id, e.g. "gemini-3-pro-image-preview". */
  providerModel: string;
  allowedRatios: string[];
  maxRefs: number;
  /** True when the provider model honours a size/resolution request. */
  supportsResolution: boolean;
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

/**
 * Bridge for rows that predate models.provider_model. Measured 2026-08-06:
 * gemini-3-pro-image-preview honours imageSize (1K 1024², 2K 2048², 4K 4096²);
 * gemini-2.5-flash-image ignores it and always returns 1024².
 */
const BY_SLUG: Record<string, Pick<ResolvedModel, "provider" | "providerModel" | "supportsResolution">> = {
  "nano-banana-pro": { provider: "gemini", providerModel: "gemini-3-pro-image-preview", supportsResolution: true },
  "nano-banana": { provider: "gemini", providerModel: "gemini-2.5-flash-image", supportsResolution: false },
  "gpt-image-2": { provider: "openai", providerModel: "gpt-image-2", supportsResolution: true },
};

/** What we fall back to when nothing is selected or the lookup fails. */
export const DEFAULT_MODEL: ResolvedModel = {
  id: null,
  name: "Nano Banana Pro",
  provider: "gemini",
  providerModel: "gemini-3-pro-image-preview",
  allowedRatios: ["1:1", "16:9", "9:16"],
  maxRefs: 3,
  supportsResolution: true,
};

interface ModelRow {
  id?: string;
  name?: string;
  provider?: string | null;
  provider_model?: string | null;
  allowed_ratios?: string[] | null;
  max_reference_images?: number | null;
}

function fromRow(row: ModelRow): ResolvedModel {
  const bridge = BY_SLUG[slug(row.name ?? "")];
  const providerModel = row.provider_model || bridge?.providerModel || DEFAULT_MODEL.providerModel;
  return {
    id: row.id ?? null,
    name: row.name ?? DEFAULT_MODEL.name,
    provider: (row.provider as ResolvedModel["provider"]) || bridge?.provider || "gemini",
    providerModel,
    allowedRatios: row.allowed_ratios?.length ? row.allowed_ratios : DEFAULT_MODEL.allowedRatios,
    maxRefs: typeof row.max_reference_images === "number" ? row.max_reference_images : DEFAULT_MODEL.maxRefs,
    // Derived from the provider model, never from the row: whether a model
    // honours a resolution is a fact about that model, and a stale column
    // would make us charge for a size the model silently ignores.
    supportsResolution: bridge?.supportsResolution ?? providerModel.includes("gemini-3-pro"),
  };
}

/**
 * Resolve the user's selection. Takes the FIRST id that resolves — multi-select
 * exists in the editor for prompt authoring (which models a prompt is meant
 * for), while a single generation runs on exactly one model.
 */
export async function resolveModel(
  supabase: SupabaseClient | null,
  modelIds: string[] | undefined,
): Promise<ResolvedModel> {
  if (!supabase || !modelIds?.length) return DEFAULT_MODEL;
  try {
    // Ask for the provider columns first; fall back to the columns that exist
    // today if the migration has not run. Selecting a missing column fails the
    // whole query, so this cannot be one hopeful select.
    const pick = (cols: string) =>
      supabase.from("models").select(cols).in("id", modelIds).eq("active", true);

    let rows: ModelRow[];
    const withProvider = await pick("id, name, provider, provider_model, allowed_ratios, max_reference_images");
    if (withProvider.error) {
      const legacy = await pick("id, name, allowed_ratios, max_reference_images");
      rows = (legacy.data ?? []) as unknown as ModelRow[];
    } else {
      rows = (withProvider.data ?? []) as unknown as ModelRow[];
    }
    // Preserve the user's order rather than the database's.
    for (const wanted of modelIds) {
      const row = rows.find((r) => r.id === wanted);
      if (row) return fromRow(row);
    }
    return rows.length ? fromRow(rows[0]) : DEFAULT_MODEL;
  } catch {
    return DEFAULT_MODEL;
  }
}
