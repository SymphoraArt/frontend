import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Stored price is in 1/10000 USDC (same scale as Prompt Editor save). */
export const PRICE_PER_GENERATION_SCALE = 10000;

/**
 * Format stored pricePerGeneration (1/10000 USDC) for display.
 * Returns "FREE" for 0, otherwise e.g. "0.0001 USDC" or "1 USDC".
 */
export function formatPricePerGeneration(stored: number): string {
  if (stored === 0) return "FREE";
  const realUsdc = stored / PRICE_PER_GENERATION_SCALE;
  const s =
    realUsdc >= 1
      ? String(realUsdc)
      : realUsdc.toFixed(4).replace(/\.?0+$/, "") || "0";
  return `${s} USDC`;
}

/** Convert stored pricePerGeneration to real USDC number. */
export function storedPriceToUsdc(stored: number): number {
  return stored / PRICE_PER_GENERATION_SCALE;
}
