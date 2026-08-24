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
 * 1K/2K and 2000 at 4K — $0.134 / $0.24. CONFIRMED against the official
 * pricing page 2026-08-24 (ai.google.dev/gemini-api/docs/pricing:
 * gemini-3-pro-image, $120/1M image output tokens; the footnote states
 * these exact token counts and per-image equivalents).
 *
 * gpt-image-2 boost is OpenAI direct, priced by QUALITY and size — billed
 * as image output tokens at $30/1M (official rate, confirmed 2026-08-24).
 * Every cell below is MEASURED (metered bench, 2026-08-24, Kev-approved)
 * at the exact sizes our OpenAI service requests — 2K = 2048x2048,
 * 4K = 2880x2880 (its 8.29MP ceiling):
 *   low    2K  397 tok   4K   659 tok
 *   medium 2K 3568 tok   4K  5930 tok
 *   high   2K 14272 tok  4K 23719 tok
 * The earlier pixel-scaled estimates ran ~2x HIGH (high/4K $1.667 vs the
 * real $0.712) — token counts do not scale with pixels, as OpenAI's guide
 * warns. Rounded up to the next tenth of a cent, never down.
 */
const GEMINI_BOOST: Record<ResolutionTier, number> = { "2K": 0.134, "4K": 0.24 };
const GPT_BOOST: Record<"low" | "medium" | "high", Record<ResolutionTier, number>> = {
  low: { "2K": 0.012, "4K": 0.02 },
  medium: { "2K": 0.107, "4K": 0.178 },
  high: { "2K": 0.428, "4K": 0.712 },
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
