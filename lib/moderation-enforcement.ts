/**
 * Recording side of moderation — separate from lib/moderation on purpose.
 *
 * lib/moderation decides and touches no database; this writes the decision down
 * and decides what (if anything) happens to the account. Keeping them apart is
 * what lets the decision engine be unit-tested without mocking Supabase.
 *
 * Enforcement policy (Kev, 2026-08-04):
 *   Blocking is cheap — it costs a user one attempt.
 *   Banning is expensive — it costs them their account and us a customer.
 * So nothing here bans. A regex never can, and even the AI tier's strongest
 * signal only raises a case to 'pending' review. Bans are issued by a human or
 * the council, through the existing `bans` table — which is also why
 * bans.issued_by is NOT NULL: the schema already assumes a human signs off.
 */
import type { NextRequest } from "next/server";
import { getSupabaseServerClientSafe } from "@/lib/supabaseServer";
import { resolveSessionUserId } from "@/lib/session-user";
import { getClientIp, hashIp } from "@/lib/ip-hash";
import { encryptString } from "@/lib/crypto";
import type { ModerationVerdict } from "@/lib/moderation";

export interface RecordContext {
  surface: string;
  /** The request — the session token and client IP are read off it here. */
  request: NextRequest;
  /** The prompt itself; stored encrypted, never in clear. */
  prompt: string;
}

/**
 * Fire-and-forget: a failure to record must never break a generation, and must
 * never be the reason a block does not happen (the block already happened at
 * the call site).
 */
export async function recordModerationEvent(
  verdict: ModerationVerdict,
  ctx: RecordContext,
): Promise<void> {
  // Nothing to record for a clean pass. Blocked prompts and degraded checks are
  // worth keeping: the first is evidence, the second tells us the AI tier was
  // down when we let something through.
  if (verdict.allowed && !verdict.tier2Degraded) return;

  try {
    const supabase = getSupabaseServerClientSafe();
    if (!supabase) return;

    // Identity is derived server-side from the session, never from a
    // client-supplied wallet field: PR #54 keyed enforcement on a body
    // parameter, so anyone could get someone else's wallet struck, or omit it
    // and be untraceable. /api/generate-free has no session at all — those
    // events are attributed by hashed IP only, which is why user_id is nullable.
    const token = ctx.request.headers.get("X-Session-Token");
    let userId: string | null = null;
    if (token) {
      userId = await resolveSessionUserId(supabase, token).catch(() => null);
    }

    // Evidence is encrypted at rest: a blocked CSAM prompt is itself a liability
    // in plaintext. The hash (in lib/moderation) carries repeat-offender
    // detection without holding the text readable.
    let evidence: { encrypted: string; iv: string; authTag: string; kid?: string } | null = null;
    if (!verdict.allowed) {
      try {
        evidence = encryptString(ctx.prompt.slice(0, 4000));
      } catch {
        evidence = null; // never let a crypto config problem lose the event
      }
    }

    await supabase.from("automod_events").insert({
      user_id: userId,
      ip_hash: hashIp(getClientIp(ctx.request)),
      surface: ctx.surface,
      decision: verdict.allowed ? "allow" : "block",
      severity: verdict.enforcement === "none" ? "log" : verdict.enforcement,
      tier: verdict.tier,
      category: verdict.category,
      matched_rules: verdict.matchedRules.length ? verdict.matchedRules : null,
      scores: verdict.scores,
      prompt_hash: verdict.promptHash,
      evidence_ct: evidence?.encrypted ?? null,
      evidence_iv: evidence?.iv ?? null,
      evidence_tag: evidence?.authTag ?? null,
      evidence_kid: evidence?.kid ?? null,
      // Only the ambiguous band reaches a human. Everything else is recorded
      // and forgotten unless a pattern shows up in the numbers.
      review_state: verdict.enforcement === "review" ? "pending" : "none",
    });
  } catch {
    /* recording is best-effort by design */
  }
}
