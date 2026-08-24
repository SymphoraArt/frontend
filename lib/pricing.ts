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
  "nano-banana-pro": { "2K": 0.134, "4K": 0.24 },
  "gpt-image-2": { "2K": 0.167, "4K": 0.25 },
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

/** Published API cost (USD) for a single image at the given model + resolution. */
export function apiPricePerImage(modelId: string, resolution: string): number {
  const tier = toResolutionTier(resolution);
  return (MODEL_IMAGE_PRICING[modelId] ?? DEFAULT_IMAGE_PRICING)[tier];
}

/**
 * What the BOOST route — the vendor directly — really charges per image
 * (Kev, 2026-08-23: "boost preis als ECHTE KOSTEN von den API costs", the
 * flat x2 both overcharged cheap runs and would have LOST money on
 * gpt-image-2 high/4K).
 *
 * nano-banana-pro boost is Gemini direct, token-based: 1120 output tokens at
 * 1K/2K and 2000 at 4K — $0.134 / $0.24, measured 2026-08-06.
 *
 * gpt-image-2 boost is OpenAI direct, priced by QUALITY and size. The 1024
 * base row (low $0.006 / medium $0.053 / high $0.211) is MEASURED
 * (2026-08-06); the 2K and 4K rows are that base scaled by pixel count
 * (4.0x and 7.9x — output-token pricing scales with pixels). DERIVED, not
 * yet confirmed against OpenAI's official table: verify before mainnet.
 */
const GEMINI_BOOST: Record<ResolutionTier, number> = { "2K": 0.134, "4K": 0.24 };
const GPT_BOOST: Record<"low" | "medium" | "high", Record<ResolutionTier, number>> = {
  low: { "2K": 0.024, "4K": 0.047 },
  medium: { "2K": 0.212, "4K": 0.419 },
  high: { "2K": 0.844, "4K": 1.667 },
};

/** Boost-route cost per image; models without a boost route answer their normal price. */
export function apiBoostPricePerImage(
  modelId: string,
  resolution: string,
  quality?: "low" | "medium" | "high",
): number {
  const tier = toResolutionTier(resolution);
  if (modelId === "gpt-image-2") return GPT_BOOST[quality ?? "medium"][tier];
  if (modelId === "nano-banana-pro") return GEMINI_BOOST[tier];
  return apiPricePerImage(modelId, resolution);
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
  // never a multiplier on the normal one.
  const perImage = opts?.boost
    ? apiBoostPricePerImage(modelId, resolution, opts.quality)
    : apiPricePerImage(modelId, resolution);
  const n = Math.max(1, Math.floor(count) || 1);
  const apiSubtotal = perImage * n;
  const fee = apiSubtotal * PLATFORM_FEE_PERCENT;
  return { perImage, count: n, apiSubtotal, fee, total: apiSubtotal + fee };
}
