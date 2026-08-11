/**
 * The two halves of authorising a generation payment, sharing one builder.
 *
 * /authorize builds the transaction and hands it to the buyer to sign.
 * /submit takes the signed one back and stores it.
 *
 * Both must agree byte for byte on what the transaction is, or /submit rejects
 * an honest buyer. That is why the two inputs which could drift — the nonce
 * account and the set of token accounts we front — are written to the intent
 * row by /authorize and READ BACK by /submit rather than recomputed. An ATA
 * created by someone else in between would otherwise change the rebuild and
 * look exactly like tampering.
 *
 * The happy side effect is that fronted_atas finally gets written. The column
 * has existed since the intents table was created and nothing has ever put a
 * value in it, while the Terms of Use (Section 7) promise artists an
 * accounting of precisely those costs.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { PublicKey, type Transaction } from "@solana/web3.js";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { paymentLegs, type PaymentLeg } from "@/lib/payments/generation-pay";
import { splitForRecovery } from "@/lib/payments/fronted-recovery";
import { ATA_FRONTED_MICRO } from "@/lib/payments/fronted-ledger";
import { buildAuthorizationTx } from "@/lib/payments/authorize-tx";
import { feePayerKeypair, solanaConnection, usdcMint } from "@/lib/payments/solana";

export interface IntentRow {
  id: string;
  buyer_wallet: string;
  artist_wallet: string | null;
  artist_amount_micro: number;
  model_cost_micro: number;
  enki_fee_micro: number;
  total_micro: number;
  nonce_account: string | null;
  fronted_atas: unknown;
}

/**
 * One instalment of the Terms-of-Use Section 7 recovery, as PLANNED at
 * /authorize and carried on the intent row. Written once and read back by
 * /submit and by capture — never recomputed, because the ledger can change
 * between the two reads and a recomputed plan would make the rebuilt
 * transaction differ from the one the buyer signed, which /submit rightly
 * treats as tampering.
 */
export interface RecoveryPlan {
  /** Case-exact artist wallet the deduction is booked against. */
  artistWallet: string;
  /** The mint at plan time; capture records against THIS, not a re-derived one. */
  mint: string;
  /** The instalment moved from the artist's leg to Enki's, micro-USDC. */
  micro: number;
  /** The original fronted amount the instalment was computed from. */
  frontedTotalMicro: number;
  /** True when THIS payment's transaction creates the artist's token account. */
  frontingNow: boolean;
}

/** What generation_payment_intents.fronted_atas holds since the ledger wiring. */
export interface FrontedPlan {
  owners: { owner: string }[];
  recovery: RecoveryPlan | null;
}

/**
 * Read the stored plan, accepting the pre-ledger shape (a bare array of
 * owners) as a plan with no recovery. Rows in that shape exist only from
 * before the feature ever ran end to end, but a parser that throws on them
 * would strand those intents unredeemable.
 */
export function frontedPlanOf(raw: unknown): FrontedPlan {
  if (Array.isArray(raw)) {
    return { owners: raw.filter((o): o is { owner: string } => typeof o?.owner === "string"), recovery: null };
  }
  if (raw && typeof raw === "object") {
    const o = raw as { owners?: unknown; recovery?: unknown };
    return {
      owners: Array.isArray(o.owners)
        ? o.owners.filter((x): x is { owner: string } => typeof (x as { owner?: unknown })?.owner === "string")
        : [],
      recovery: (o.recovery as RecoveryPlan) ?? null,
    };
  }
  return { owners: [], recovery: null };
}

/**
 * Decide this payment's instalment. Pure — the ledger numbers come in as
 * arguments, so the rule is testable without a database.
 *
 * Returns null whenever there is nothing to recover: no debt and no fronting
 * happening now, or an artist share of zero (nothing to deduct from), or an
 * instalment that rounds to zero (the ledger refuses micro = 0 rows, and a
 * deduction of nothing is not a deduction).
 */
export function planRecovery(args: {
  artistWallet: string | null;
  mint: string;
  artistAmountMicro: number;
  frontingNow: boolean;
  ledger: { frontedMicro: number; outstandingMicro: number };
}): RecoveryPlan | null {
  const { artistWallet, mint, artistAmountMicro, frontingNow, ledger } = args;
  if (!artistWallet || artistAmountMicro <= 0) return null;

  // A fronting that happens in THIS transaction starts the debt now: the plan
  // must see it, because the ledger entry is only written after broadcast.
  const frontedTotal = frontingNow ? ATA_FRONTED_MICRO : ledger.frontedMicro;
  // No `remaining <= 0` short-circuit here: splitForRecovery clamps a
  // negative balance to zero itself, and short-circuiting would also skip the
  // fronting-only marker below when an over-recovered artist's account is
  // being (re)created — the one case where a negative balance and a fronting
  // coincide, and the fronting must still reach the books.
  const remaining = ledger.outstandingMicro + (frontingNow ? ATA_FRONTED_MICRO : 0);
  if (frontedTotal <= 0) return null;

  const split = splitForRecovery(remaining, artistAmountMicro, frontedTotal);
  if (split.toRecovery <= 0) return frontingNow
    // Even when nothing can be deducted this time (a tiny share), the fronting
    // itself still has to reach the books at capture.
    ? { artistWallet, mint, micro: 0, frontedTotalMicro: frontedTotal, frontingNow }
    : null;

  return {
    artistWallet,
    mint,
    micro: split.toRecovery,
    frontedTotalMicro: frontedTotal,
    frontingNow,
  };
}

/**
 * Move the instalment between the legs of the SAME payment: the artist's leg
 * shrinks, Enki's grows, the buyer's total is untouched — they signed for a
 * fixed amount and the recovery is none of their business.
 *
 * Throws instead of guessing when the plan does not fit the legs; a plan for
 * an artist who has no leg here is a corrupted row, not a rounding matter.
 */
export function applyRecoveryToLegs(
  legs: PaymentLeg[],
  plan: RecoveryPlan | null,
  enkiWallet: string,
): PaymentLeg[] {
  if (!plan || plan.micro <= 0) return legs;

  const artist = legs.find((l) => l.recipient === plan.artistWallet);
  if (!artist) throw new Error("Recovery plan names an artist with no payment leg");
  if (plan.micro > artist.amountMicro) {
    throw new Error("Recovery plan exceeds the artist's leg");
  }

  const adjusted = legs.map((l) =>
    l.recipient === plan.artistWallet ? { ...l, amountMicro: l.amountMicro - plan.micro } : { ...l },
  );
  const enki = adjusted.find((l) => l.recipient === enkiWallet);
  if (enki) enki.amountMicro += plan.micro;
  else adjusted.push({ recipient: enkiWallet, amountMicro: plan.micro });

  // The artist's leg can shrink to zero (a share smaller than the instalment
  // cap can't, but a corrupted plan could) — a zero-amount transferChecked is
  // pointless weight in the transaction.
  return adjusted.filter((l) => l.amountMicro > 0);
}

/**
 * Sessions store wallet addresses lowercased, which is lossy for base58 — a
 * lowercased Solana address is a different (and usually nonexistent) account.
 * The case-exact one lives in user_wallets.
 */
export async function exactWallet(
  supabase: SupabaseClient,
  lowercased: string,
): Promise<string | null> {
  const { data } = await supabase
    .from("user_wallets")
    .select("address")
    .ilike("address", lowercased)
    .is("removed_at", null)
    .maybeSingle();
  return (data?.address as string) ?? null;
}

/** Recipients with no USDC account yet — Enki fronts the rent for those. */
export async function findMissingAtas(recipients: string[]): Promise<string[]> {
  const connection = solanaConnection();
  const mint = usdcMint();
  const missing: string[] = [];
  for (const owner of recipients) {
    const ata = getAssociatedTokenAddressSync(mint, new PublicKey(owner));
    const info = await connection.getAccountInfo(ata, "confirmed");
    if (!info) missing.push(owner);
  }
  return missing;
}

/**
 * Rebuild the exact transaction for an intent. Deterministic given the row:
 * same legs, same nonce, same fronted accounts, same bytes.
 */
export function authorizationFor(
  intent: IntentRow,
  buyerWallet: string,
  nonce: string,
  enkiWallet: string,
): { transaction: Transaction; frontedAtas: { owner: string; ata: string }[] } {
  if (!intent.nonce_account) throw new Error("Intent has no nonce account");

  const plan = frontedPlanOf(intent.fronted_atas);

  // The Section 7 instalment is applied from the STORED plan, never
  // recomputed: /submit rebuilds this transaction to compare it against the
  // one the buyer signed, and a plan re-derived from a ledger that moved in
  // between would make an honest signature look tampered with.
  const legs = applyRecoveryToLegs(paymentLegs(intent, enkiWallet), plan.recovery, enkiWallet);

  return buildAuthorizationTx({
    nonceAccount: new PublicKey(intent.nonce_account),
    nonceAuthority: feePayerKeypair().publicKey,
    nonce,
    feePayer: feePayerKeypair().publicKey,
    buyer: new PublicKey(buyerWallet),
    mint: usdcMint(),
    legs,
    needsAta: plan.owners.map((o) => o.owner),
  });
}

/** The Enki payout wallet, case-exact, from the server environment only. */
export function enkiWallet(): string {
  const addr =
    process.env.SOLANA_PLATFORM_WALLET || process.env.NEXT_PUBLIC_SOLANA_PLATFORM_WALLET;
  if (!addr) throw new Error("SOLANA_PLATFORM_WALLET is not set");
  return addr;
}
