import Stripe from "stripe";
import { getSupabaseServerClientSafe } from "@/lib/supabaseServer";

/**
 * Balance persistence for fiat top-ups.
 *
 * The balance lives in a single `balance` column on the existing `turnkey_users`
 * table, keyed by `wallet_address` (the same wallet the payment recipient and
 * the navbar use). No extra tables.
 *
 * Idempotency is handled via Stripe PaymentIntent metadata (`credited=true`):
 * once an intent has been applied we never apply it again, so the confirm
 * endpoint and the webhook can both fire safely.
 *
 * NOTE: wallet addresses are matched exactly (NOT lowercased) — Solana base58
 * addresses are case-sensitive.
 */

export function normalizeUserId(address: string | null | undefined): string | null {
  if (!address) return null;
  const trimmed = address.trim();
  return trimmed.length ? trimmed : null;
}

export async function getBalance(walletAddress: string): Promise<number> {
  const supabase = getSupabaseServerClientSafe();
  if (!supabase) return 0;
  const { data, error } = await supabase
    .from("turnkey_users")
    .select("balance")
    .eq("wallet_address", walletAddress)
    .maybeSingle();
  if (error) {
    console.warn("[billing-db] getBalance failed:", error.message);
    return 0;
  }
  return data ? Number(data.balance) || 0 : 0;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

/**
 * Atomically-ish deduct `amount` from a wallet's balance. Read-modify-write
 * (acceptable for MVP). Returns { ok:false } when the balance is too low.
 */
export async function deductBalance(
  walletAddress: string,
  amount: number
): Promise<{ ok: boolean; balance: number }> {
  const supabase = getSupabaseServerClientSafe();
  if (!supabase) throw new Error("Supabase is not configured");
  const current = await getBalance(walletAddress);
  if (current < amount) return { ok: false, balance: current };
  const next = round2(current - amount);
  const { error } = await supabase
    .from("turnkey_users")
    .update({ balance: next, updated_at: new Date().toISOString() })
    .eq("wallet_address", walletAddress);
  if (error) throw new Error(error.message);
  return { ok: true, balance: next };
}

/** Add `amount` back to a wallet's balance (used to refund failed generations). */
export async function creditBalance(
  walletAddress: string,
  amount: number
): Promise<number> {
  const supabase = getSupabaseServerClientSafe();
  if (!supabase) throw new Error("Supabase is not configured");
  const next = round2((await getBalance(walletAddress)) + amount);
  const { error } = await supabase
    .from("turnkey_users")
    .update({ balance: next, updated_at: new Date().toISOString() })
    .eq("wallet_address", walletAddress);
  if (error) throw new Error(error.message);
  return next;
}

/**
 * Verifies a PaymentIntent with Stripe and, if it has succeeded and hasn't been
 * applied yet, adds the amount to the user's `turnkey_users.balance`. Returns
 * the new balance. Idempotent via the intent's `credited` metadata flag.
 */
export async function creditFromIntent(
  intentId: string,
  fallbackWallet?: string | null
): Promise<{ balance: number; credited: boolean; amount: number; funded: boolean; fundError?: string }> {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) throw new Error("STRIPE_SECRET_KEY is not set");

  const stripe = new Stripe(secret);
  const intent = await stripe.paymentIntents.retrieve(intentId);

  if (intent.status !== "succeeded") {
    return { balance: 0, credited: false, amount: 0, funded: false };
  }

  const wallet =
    normalizeUserId((intent.metadata?.recipient as string) || "") ||
    normalizeUserId(fallbackWallet);
  if (!wallet) throw new Error("No wallet on payment to credit");

  const amount = (intent.amount_received ?? intent.amount ?? 0) / 100;

  const supabase = getSupabaseServerClientSafe();
  if (!supabase) throw new Error("Supabase is not configured");

  // Idempotency: once an intent is applied we never apply it again, so confirm
  // and the webhook can both fire safely.
  const alreadyCredited = intent.metadata?.credited === "true";

  let balance = await getBalance(wallet);

  // Credit the spendable USD balance. The balance is used directly server-side
  // for generation (the platform pays the API cost) — no on-chain transfer.
  if (!alreadyCredited) {
    balance = balance + amount;
    const { error: updErr } = await supabase
      .from("turnkey_users")
      .update({ balance, updated_at: new Date().toISOString() })
      .eq("wallet_address", wallet);
    if (updErr) throw new Error(updErr.message);

    await stripe.paymentIntents.update(intent.id, {
      metadata: { ...intent.metadata, credited: "true" },
    });
  }

  // `funded: true` — the balance is immediately spendable (no wallet funding step).
  return { balance, credited: !alreadyCredited, amount, funded: true };
}
