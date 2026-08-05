import { getSupabaseServerClientSafe } from "@/lib/supabaseServer";

/**
 * Balance persistence for fiat top-ups.
 *
 * The balance lives in a single `balance` column on the existing `turnkey_users`
 * table, keyed by `wallet_address` (the same wallet the payment recipient and
 * the navbar use). No extra tables.
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
