/**
 * Server-side pricing for generation payments (backlog #2 — server-built payments).
 *
 * Single source of truth for the artist / model-cost / Enki-fee split.
 * All amounts are integer micro-USDC (1 USDC = 1_000_000 micro) so the split
 * math is exact — no floats past the input-conversion boundary.
 *
 * ─── POLICY KNOBS ───────────────────────────────────────────────────────────
 * Pending final confirmation from Kev. To change the fee policy, edit ONLY
 * `PRICING_POLICY` below — every quote and (later) transaction build follows it.
 *
 *   enkiFeeBps  fee rate in basis points  (1000 = 10%)
 *   feeBase     what the fee is computed on:
 *                 "subtotal"  → artist price + model cost
 *                 "modelCost" → model cost only
 *   feeMode     who bears the fee:
 *                 "addOn"            → buyer pays fee on top; artist receives
 *                                      their full listed price
 *                 "deductFromArtist" → buyer pays listed price + model cost;
 *                                      fee comes out of the artist share
 * ────────────────────────────────────────────────────────────────────────────
 */
import {
  MODEL_IMAGE_PRICING,
  toResolutionTier,
  type ResolutionTier,
} from "@/lib/pricing";

export type FeeBase = "subtotal" | "modelCost";
export type FeeMode = "addOn" | "deductFromArtist";

export const PRICING_POLICY: {
  enkiFeeBps: number;
  feeBase: FeeBase;
  feeMode: FeeMode;
  quoteTtlSeconds: number;
} = {
  enkiFeeBps: 1000,
  feeBase: "subtotal",
  feeMode: "addOn",
  quoteTtlSeconds: 300,
};

export const MICRO_PER_USDC = 1_000_000;

/** Convert a USD decimal amount to integer micro-USDC. */
export function usdToMicro(usd: number): number {
  if (!Number.isFinite(usd) || usd < 0) {
    throw new Error(`Invalid USD amount: ${usd}`);
  }
  return Math.round(usd * MICRO_PER_USDC);
}

/**
 * Model cost in micro-USDC for one image.
 *
 * Source is currently the published provider rates in `lib/pricing.ts`
 * (declared there as the single source of truth for generation pricing).
 * When `models.price` units in the DB are confirmed, swap the body of this
 * function to the DB lookup — callers only ever see micro-USDC.
 */
export function getModelCostMicro(
  modelFamily: string,
  resolution: string | undefined,
): number {
  const tiers = MODEL_IMAGE_PRICING[modelFamily];
  if (!tiers) {
    throw new UnknownModelError(modelFamily);
  }
  const tier: ResolutionTier = toResolutionTier(resolution);
  return usdToMicro(tiers[tier]);
}

export class UnknownModelError extends Error {
  constructor(modelFamily: string) {
    super(`Unknown model family: ${modelFamily}`);
    this.name = "UnknownModelError";
  }
}

export interface GenerationSplit {
  /** Goes directly to the artist wallet. */
  artistAmountMicro: number;
  /** Raw provider cost component (informational; part of the Enki leg). */
  modelCostMicro: number;
  /** Enki fee component (informational; part of the Enki leg). */
  enkiFeeMicro: number;
  /** Second transfer: model cost + fee → Enki wallet. */
  enkiTotalMicro: number;
  /** What the buyer pays in total (artist leg + Enki leg). */
  totalMicro: number;
}

/**
 * Compute the two-transfer split for one generation.
 *
 * Invariant: artistAmountMicro + enkiTotalMicro === totalMicro, always.
 * Fee rounding is floor (fractional micro goes to the buyer's favor).
 */
export function computeGenerationSplit(
  artistPriceMicro: number,
  modelCostMicro: number,
): GenerationSplit {
  assertMicro("artistPriceMicro", artistPriceMicro);
  assertMicro("modelCostMicro", modelCostMicro);

  const feeBaseMicro =
    PRICING_POLICY.feeBase === "subtotal"
      ? artistPriceMicro + modelCostMicro
      : modelCostMicro;
  const enkiFeeMicro = Math.floor(
    (feeBaseMicro * PRICING_POLICY.enkiFeeBps) / 10_000,
  );

  let artistAmountMicro: number;
  if (PRICING_POLICY.feeMode === "addOn") {
    artistAmountMicro = artistPriceMicro;
  } else {
    artistAmountMicro = artistPriceMicro - enkiFeeMicro;
    if (artistAmountMicro < 0) {
      throw new Error(
        `Fee (${enkiFeeMicro}) exceeds artist price (${artistPriceMicro}) under deductFromArtist policy`,
      );
    }
  }

  const enkiTotalMicro = modelCostMicro + enkiFeeMicro;
  const totalMicro = artistAmountMicro + enkiTotalMicro;

  return {
    artistAmountMicro,
    modelCostMicro,
    enkiFeeMicro,
    enkiTotalMicro,
    totalMicro,
  };
}

function assertMicro(name: string, value: number) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${name} must be a non-negative integer (micro-USDC), got: ${value}`);
  }
}

/** Serialize a split for API responses (amounts as strings, like on-chain u64s). */
export function splitToBreakdown(split: GenerationSplit) {
  return {
    artistAmount: String(split.artistAmountMicro),
    modelCost: String(split.modelCostMicro),
    enkiFee: String(split.enkiFeeMicro),
    enkiTotal: String(split.enkiTotalMicro),
    totalAmount: String(split.totalMicro),
    currency: "USDC" as const,
    decimals: 6,
    feePolicy: {
      feeBps: PRICING_POLICY.enkiFeeBps,
      feeBase: PRICING_POLICY.feeBase,
      feeMode: PRICING_POLICY.feeMode,
    },
  };
}
