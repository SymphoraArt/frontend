/**
 * Pure helpers for the pay endpoint (app/api/payments/generation/pay).
 *
 * paymentLegs() turns a stored payment-intent row into the exact on-chain
 * transfer legs. The transaction is built ONLY from these DB values — nothing
 * the client sent is ever used for an amount or destination — and the split
 * invariant is re-asserted here so a corrupted row can never move a different
 * total than the one quoted.
 */

/** The amount columns of a generation_payment_intents row (integer micro-USDC). */
export interface IntentAmounts {
  artist_wallet: string | null;
  artist_amount_micro: number;
  model_cost_micro: number;
  enki_fee_micro: number;
  total_micro: number;
}

/** One USDC transfer: recipient owner wallet (not the ATA) and its amount. */
export interface PaymentLeg {
  recipient: string;
  amountMicro: number;
}

function assertMicro(name: string, value: unknown): asserts value is number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
    throw new Error(`${name} must be a non-negative integer (micro-USDC), got: ${value}`);
  }
}

/**
 * Derive the transfer legs (artist leg + Enki leg) from an intent row.
 *
 * Throws — instead of guessing — on any inconsistency: non-integer amounts,
 * artist amount without an artist wallet, legs not summing to total_micro,
 * or a zero total (free generations never reach the pay endpoint).
 */
export function paymentLegs(intent: IntentAmounts, enkiWallet: string): PaymentLeg[] {
  assertMicro("artist_amount_micro", intent.artist_amount_micro);
  assertMicro("model_cost_micro", intent.model_cost_micro);
  assertMicro("enki_fee_micro", intent.enki_fee_micro);
  assertMicro("total_micro", intent.total_micro);
  if (!enkiWallet) {
    throw new Error("Enki payout wallet is not configured");
  }

  const enkiTotalMicro = intent.model_cost_micro + intent.enki_fee_micro;
  if (intent.artist_amount_micro + enkiTotalMicro !== intent.total_micro) {
    throw new Error(
      `Split invariant violated: ${intent.artist_amount_micro} + ${enkiTotalMicro} !== ${intent.total_micro}`,
    );
  }
  if (intent.total_micro === 0) {
    throw new Error("Intent total is zero — nothing to pay");
  }

  const legs: PaymentLeg[] = [];
  if (intent.artist_amount_micro > 0) {
    if (!intent.artist_wallet) {
      throw new Error("Intent has an artist amount but no artist wallet");
    }
    legs.push({ recipient: intent.artist_wallet, amountMicro: intent.artist_amount_micro });
  }
  if (enkiTotalMicro > 0) {
    legs.push({ recipient: enkiWallet, amountMicro: enkiTotalMicro });
  }
  return legs;
}

/**
 * Cap on the per-CU price so a fee-market spike can never make the fee payer
 * overpay: 1,000,000 micro-lamports/CU × 120k CU = 0.00012 SOL per payment.
 */
export const MAX_PRIORITY_FEE_MICROLAMPORTS = 1_000_000;

/**
 * p75 of the cluster's recent prioritization fees (never hardcoded), capped.
 * Returns 0 when the fee market is idle — the caller then skips the
 * ComputeBudget price instruction entirely.
 */
export function priorityFeeMicroLamports(
  recent: ReadonlyArray<{ prioritizationFee: number }>,
): number {
  const fees = recent
    .map((f) => f.prioritizationFee)
    .filter((f) => Number.isFinite(f) && f >= 0)
    .sort((a, b) => a - b);
  if (fees.length === 0) return 0;
  const p75 = fees[Math.floor((fees.length - 1) * 0.75)];
  return Math.min(p75, MAX_PRIORITY_FEE_MICROLAMPORTS);
}
