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
import { paymentLegs } from "@/lib/payments/generation-pay";
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

  const needsAta = Array.isArray(intent.fronted_atas)
    ? (intent.fronted_atas as { owner: string }[]).map((f) => f.owner)
    : [];

  return buildAuthorizationTx({
    nonceAccount: new PublicKey(intent.nonce_account),
    nonceAuthority: feePayerKeypair().publicKey,
    nonce,
    feePayer: feePayerKeypair().publicKey,
    buyer: new PublicKey(buyerWallet),
    mint: usdcMint(),
    legs: paymentLegs(intent, enkiWallet),
    needsAta,
  });
}

/** The Enki payout wallet, case-exact, from the server environment only. */
export function enkiWallet(): string {
  const addr =
    process.env.SOLANA_PLATFORM_WALLET || process.env.NEXT_PUBLIC_SOLANA_PLATFORM_WALLET;
  if (!addr) throw new Error("SOLANA_PLATFORM_WALLET is not set");
  return addr;
}
