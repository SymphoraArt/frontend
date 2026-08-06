import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Cap how many generations one user can have running at once.
 *
 * Unlimited by default (Kev, 2026-08-06) — the point is that the number is
 * adjustable from the admin panel without a deploy, not that it is small.
 *
 * ── Why a slot and not a count ──────────────────────────────────────────
 * A generation runs synchronously inside the request, so "in flight" is not a
 * state any table records: `generations` only gets a row once the picture
 * exists. Counting recent rows would guess at it. A slot is taken when the
 * work starts and released when it ends, which is the thing actually being
 * limited.
 *
 * ── Why insert first and count second ───────────────────────────────────
 * Count-then-insert loses the race: two requests arriving together both see
 * one slot free and both take it. Inserting first and counting afterwards
 * means every racer sees its own row, so at most `limit` of them survive the
 * check and the rest stand down. Optimistic, correct under concurrency, and
 * no database function needed.
 */

/** Above the route's maxDuration of 120s, so a killed function frees its own. */
const SLOT_TTL_MS = 150_000;

export interface SlotResult {
  /** Null when the request may proceed without a slot (unlimited policy). */
  slotId: string | null;
  allowed: boolean;
  /** The configured cap, for the message shown to the user. */
  limit: number | null;
}

async function currentLimit(supabase: SupabaseClient): Promise<number | null> {
  try {
    const { data, error } = await supabase
      .from("generation_policy")
      .select("max_concurrent_per_user")
      .eq("id", 1)
      .maybeSingle();
    if (error) return null;
    const v = data?.max_concurrent_per_user;
    return typeof v === "number" && v > 0 ? v : null;
  } catch {
    // A policy we cannot read must not stop generation. Failing closed here
    // would turn one database hiccup into a full outage of the product.
    return null;
  }
}

export async function acquireSlot(
  supabase: SupabaseClient | null,
  userId: string | null,
): Promise<SlotResult> {
  if (!supabase || !userId) return { slotId: null, allowed: true, limit: null };

  const limit = await currentLimit(supabase);
  if (limit === null) return { slotId: null, allowed: true, limit: null };

  try {
    const now = Date.now();
    const { data: mine, error } = await supabase
      .from("generation_slots")
      .insert({ user_id: userId, expires_at: new Date(now + SLOT_TTL_MS).toISOString() })
      .select("id, started_at")
      .single();
    if (error || !mine) return { slotId: null, allowed: true, limit };

    // Everything still live for this user, ours included. Ordering by
    // started_at and taking our position means the OLDEST requests win, so a
    // burst does not starve the one that arrived first.
    const { data: live } = await supabase
      .from("generation_slots")
      .select("id, started_at")
      .eq("user_id", userId)
      .gt("expires_at", new Date(now).toISOString())
      .order("started_at", { ascending: true });

    const position = (live ?? []).findIndex((s) => s.id === mine.id);
    if (position >= 0 && position < limit) {
      return { slotId: mine.id as string, allowed: true, limit };
    }

    // We lost — give the slot straight back rather than holding one while
    // refusing.
    await releaseSlot(supabase, mine.id as string);
    return { slotId: null, allowed: false, limit };
  } catch {
    return { slotId: null, allowed: true, limit };
  }
}

export async function releaseSlot(
  supabase: SupabaseClient | null,
  slotId: string | null,
): Promise<void> {
  if (!supabase || !slotId) return;
  try {
    await supabase.from("generation_slots").delete().eq("id", slotId);
  } catch {
    // The expiry is the backstop: a slot we fail to delete frees itself.
  }
}
