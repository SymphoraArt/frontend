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

/** Normalize an arbitrary resolution string to a known tier. */
export function toResolutionTier(resolution: string | undefined): ResolutionTier {
  return resolution === "4K" ? "4K" : "2K";
}

/** Published API cost (USD) for a single image at the given model + resolution. */
export function apiPricePerImage(modelId: string, resolution: string): number {
  const tier = toResolutionTier(resolution);
  return (MODEL_IMAGE_PRICING[modelId] ?? DEFAULT_IMAGE_PRICING)[tier];
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
  count: number
): PriceBreakdown {
  const perImage = apiPricePerImage(modelId, resolution);
  const n = Math.max(1, Math.floor(count) || 1);
  const apiSubtotal = perImage * n;
  const fee = apiSubtotal * PLATFORM_FEE_PERCENT;
  return { perImage, count: n, apiSubtotal, fee, total: apiSubtotal + fee };
}
