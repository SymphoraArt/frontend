/**
 * Image-generation pricing.
 *
 * The displayed "price per generation" in Quick Create reflects the REAL
 * published per-image API cost of the selected model at the chosen resolution,
 * multiplied by the number of images, plus the platform fee.
 *
 *   total = perImage(model, resolution) × count × (1 + PLATFORM_FEE_PERCENT)
 *
 * Per-image costs below are the providers' published standard-API rates
 * (sources verified Feb 2026 — update here if provider pricing changes):
 *   • Nano Banana Pro (Google "Gemini 3 Pro Image"):
 *       1K/2K → $0.134, 4K → $0.24   (token-based: 1120 / 2000 output tokens)
 *   • GPT-Image-2 (OpenAI image model, high-quality tier):
 *       1024² → $0.167, 1536 → $0.25
 *
 * This file is the single source of truth for generation pricing — change the
 * numbers here and both the price label and any breakdown update everywhere.
 */
import { PLATFORM_FEE_PERCENT } from "@/shared/app-config";
import { normalizeTier } from "@/lib/generation/resolution";

export { PLATFORM_FEE_PERCENT };

export type ResolutionTier = "2K" | "4K";

/** Real per-image API cost (USD) by model id and resolution tier. */
export const MODEL_IMAGE_PRICING: Record<
  string,
  Record<ResolutionTier, number>
> = {
  /* nano-banana-pro runs Gemini direct since 2026-09-05: WaveSpeed raised
     its 1K/2K to $0.14 while Gemini stays $0.134 (official page). */
  "nano-banana-pro": { "2K": 0.134, "4K": 0.24 },
  /* gpt-image-2 runs OpenAI direct on EVERY quality since 2026-09-05 —
     WaveSpeed dropped its flat $0.167/$0.25 for a quality matrix that would
     have lost us money at high ($0.40/$0.72 vs our $0.167/$0.25). This row
     is the MEDIUM cell (the picker's "from" price and the tier ratio); the
     charged price per quality is GPT_OPENAI below. */
  "gpt-image-2": { "2K": 0.107, "4K": 0.178 },
};

/** Fallback used when a model id isn't in the table above. */
export const DEFAULT_IMAGE_PRICING: Record<ResolutionTier, number> = {
  "2K": 0.134,
  "4K": 0.24,
};

/**
 * Normalize an arbitrary resolution string to a priced tier.
 *
 * The old body was `resolution === "4K" ? "4K" : "2K"`, which priced EVERY
 * other spelling as 2K — including the lowercase "4k" that the editor surfaces
 * send. WaveSpeed's adapter reads that same "4k" through a map that falls back
 * to '1k', so one input produced two different wrong answers: billed at 2K,
 * rendered at the smallest tier. Case is repaired here rather than defaulted,
 * and 1K is priced as 2K because Google charges the same 1120 tokens for both
 * — a real fact, not a shrug.
 */
export function toResolutionTier(resolution: string | undefined): ResolutionTier {
  const tier = normalizeTier(resolution);
  return tier === "4K" ? "4K" : "2K";
}

export type GptQuality = "low" | "medium" | "high";

/**
 * The quality a gpt request renders at when the caller does not say.
 * MUST mirror TIER_QUALITY in backend/services/openai-image-generation.ts —
 * the service applies this default at render time, so pricing and routing
 * applying a different one would charge for a quality that never runs.
 */
export const TIER_DEFAULT_QUALITY: Record<"1K" | "2K" | "4K", GptQuality> = {
  "1K": "low",
  "2K": "medium",
  "4K": "high",
};

/** The quality that will actually run: the caller's, or the tier default. */
export function effectiveQuality(resolution: string | undefined, quality?: string | null): GptQuality {
  if (quality === "low" || quality === "medium" || quality === "high") return quality;
  return TIER_DEFAULT_QUALITY[normalizeTier(resolution) ?? "2K"];
}

/**
 * gpt-image-2 on OpenAI DIRECT — billed as image output tokens at $30/1M
 * (official rate, confirmed 2026-08-24). Every cell MEASURED (metered
 * bench, 2026-08-24, Kev-approved) at the exact sizes our OpenAI service
 * requests — 2K = 2048x2048, 4K = 2880x2880 (its 8.29MP ceiling):
 *   low    2K  397 tok   4K   659 tok
 *   medium 2K 3568 tok   4K  5930 tok
 *   high   2K 14272 tok  4K 23719 tok
 * Rounded up to the next tenth of a cent, never down.
 */
const GPT_OPENAI: Record<GptQuality, Record<ResolutionTier, number>> = {
  low: { "2K": 0.012, "4K": 0.02 },
  medium: { "2K": 0.107, "4K": 0.178 },
  high: { "2K": 0.428, "4K": 0.712 },
};

/**
 * Published API cost (USD) for a single image at the given model, resolution
 * and (for gpt) quality.
 *
 * gpt-image-2 runs OpenAI direct on EVERY quality (Kev, 2026-09-05, after
 * WaveSpeed dropped its flat price for a quality matrix: the 2026-08-24
 * "high → WaveSpeed" split rested on a $0.167/$0.25 that no longer exists,
 * and WaveSpeed's new high cells — $0.40/$0.72 — would have lost money
 * against what we charged). Every cell here is a MEASURED OpenAI cost; the
 * remaining WaveSpeed gpt row is an outage fallback only.
 */
export function apiPricePerImage(modelId: string, resolution: string, quality?: string | null): number {
  const tier = toResolutionTier(resolution);
  if (modelId === "gpt-image-2") {
    return GPT_OPENAI[effectiveQuality(resolution, quality)][tier];
  }
  return (MODEL_IMAGE_PRICING[modelId] ?? DEFAULT_IMAGE_PRICING)[tier];
}

/**
 * Boost-route cost per image; models without a boost route answer their
 * normal price.
 *
 * nano-banana-pro boost is Gemini direct, token-based: 1120 output tokens at
 * 1K/2K and 2000 at 4K — $0.134 / $0.24. CONFIRMED against the official
 * pricing page 2026-08-24 (ai.google.dev/gemini-api/docs/pricing).
 *
 * gpt-image-2 has NO boost any more (Kev, 2026-08-24: "deaktiviere boost bei
 * gpt image 2") — quality-aware routing already runs every request on its
 * cheapest host, so a paid "faster host" stopped existing. The flag answers
 * the routed normal price.
 */
const GEMINI_BOOST: Record<ResolutionTier, number> = { "2K": 0.134, "4K": 0.24 };

export function apiBoostPricePerImage(
  modelId: string,
  resolution: string,
  quality?: "low" | "medium" | "high",
): number {
  if (modelId === "nano-banana-pro") return GEMINI_BOOST[toResolutionTier(resolution)];
  return apiPricePerImage(modelId, resolution, quality);
}

export interface PriceBreakdown {
  /** API cost for one image at the chosen model + resolution. */
  perImage: number;
  /** Number of images requested. */
  count: number;
  /** perImage × count (raw provider cost, before fee). */
  apiSubtotal: number;
  /** Platform fee applied on top of the API subtotal. */
  fee: number;
  /** What the user pays: apiSubtotal + fee. */
  total: number;
}

/** Full price breakdown for a generation request. */
export function computeGenerationPrice(
  modelId: string,
  resolution: string,
  count: number,
  opts?: { boost?: boolean; quality?: "low" | "medium" | "high" },
): PriceBreakdown {
  // Boost swaps the ROUTE, so the price is the boost route's real cost —
  // never a multiplier on the normal one. Quality feeds the normal path too:
  // gpt routes by quality, so its normal price depends on it.
  const perImage = opts?.boost
    ? apiBoostPricePerImage(modelId, resolution, opts.quality)
    : apiPricePerImage(modelId, resolution, opts?.quality);
  const n = Math.max(1, Math.floor(count) || 1);
  const apiSubtotal = perImage * n;
  const fee = apiSubtotal * PLATFORM_FEE_PERCENT;
  return { perImage, count: n, apiSubtotal, fee, total: apiSubtotal + fee };
}
