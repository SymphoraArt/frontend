import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * How many images an account may generate for free.
 *
 * Kev, 2026-08-18: free usage is an onboarding allowance for new accounts,
 * not a permanent tier — "3 pro account wären super".
 *
 * Counted rather than stored. A column would be a second truth next to the
 * generations rows and the two would drift the first time a row was inserted
 * by a path that forgot to bump the counter; the rows ARE the record of what
 * was generated. It also means changing this number changes the allowance
 * immediately, with nothing to migrate.
 */
export const FREE_GENERATIONS_PER_ACCOUNT = 3;

export interface FreeQuota {
  used: number;
  limit: number;
  remaining: number;
  exhausted: boolean;
}

/**
 * What this account has already spent of its free allowance.
 *
 * "Free" is defined as nothing having been paid, NOT as a provider name. If a
 * second free provider is ever added, or Pollinations is replaced, the count
 * still means the same thing — whereas `provider = 'pollinations'` would
 * quietly reset everyone's allowance the day that changed.
 *
 * Deleted rows still count. A generation that happened, happened; letting a
 * delete refund the allowance would make the limit a formality.
 */
export async function freeQuotaFor(
  supabase: SupabaseClient,
  userId: string,
): Promise<FreeQuota> {
  const { count, error } = await supabase
    .from("generations")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .is("amount_paid_cents", null);

  /* A failed count must not hand out free generations. The alternative —
     treating an outage as "0 used" — turns a database blip into an unlimited
     free tier, which is the expensive direction to be wrong in. */
  if (error) throw new Error(`free quota lookup failed: ${error.message}`);

  const used = count ?? 0;
  const limit = FREE_GENERATIONS_PER_ACCOUNT;
  return { used, limit, remaining: Math.max(0, limit - used), exhausted: used >= limit };
}
