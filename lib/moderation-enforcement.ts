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

    if (userId) await maybeAutoBan(supabase, userId, verdict);
  } catch {
    /* recording is best-effort by design */
  }
}

/**
 * The one case severe enough to act on without waiting for a human.
 *
 * The trigger is deliberately narrow — ONLY the AI classifier's
 * `sexual/minors` score at >= 0.9, never the word list. That split is the whole
 * lesson of the earlier audit: the word list matched "nude girl statue,
 * classical marble" and would have permanently banned a paying artist, because
 * it reads letters. The classifier reads meaning, and at 0.9 on that specific
 * category there is no benign reading left.
 *
 * Anything below stays with a human. An automated ban is appealable through the
 * normal /banned flow like any other.
 */
const AUTO_BAN_MINORS_SCORE = 0.9;

async function maybeAutoBan(
  supabase: NonNullable<ReturnType<typeof getSupabaseServerClientSafe>>,
  userId: string,
  verdict: ModerationVerdict,
): Promise<void> {
  const minors = verdict.scores?.["sexual/minors"] ?? 0;
  if (verdict.tier !== 2 || minors < AUTO_BAN_MINORS_SCORE) return;

  // bans.issued_by is NOT NULL: the schema assumes a human signs off. An
  // automated ban is issued in the name of the moderation owner, who is
  // accountable for it and can lift it — rather than inventing a robot
  // identity that nobody answers for.
  const { data: policy } = await supabase
    .from("moderation_policy")
    .select("owner_user_id")
    .eq("id", 1)
    .maybeSingle();
  const issuedBy = policy?.owner_user_id as string | undefined;
  if (!issuedBy) return; // no owner configured — leave it to human review

  // Never stack a second ban on someone already banned.
  const { data: existing } = await supabase
    .from("bans")
    .select("id")
    .eq("user_id", userId)
    .is("lifted_at", null)
    .limit(1);
  if (existing?.length) return;

  await supabase.from("bans").insert({
    user_id: userId,
    issued_by: issuedBy,
    scope: "full",
    reason: `Automated: sexual/minors ${minors.toFixed(2)} (automod ${verdict.promptHash.slice(0, 12)})`,
  });
  console.warn("[automod] auto-ban issued", { userId, minors });
}
