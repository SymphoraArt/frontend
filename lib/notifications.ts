/**
 * Server-side notification writer. One atomic RPC per event (notify_event,
 * see migrations/2026-07-13-notifications.sql): repeat events on the same
 * target coalesce into a counter row per day, so even hot prompts produce a
 * handful of rows, not thousands.
 *
 * Fire-and-forget by design: a notification must NEVER break the flow that
 * triggered it — failures (e.g. migration not run yet) are logged and dropped.
 */
import type { getSupabaseServerClient } from "@/lib/supabaseServer";

type Supabase = ReturnType<typeof getSupabaseServerClient>;

export type NotificationKind =
  | "comment"
  | "rating"
  | "generation"
  | "guardian_confirmed"
  | "guardian_declined";

export async function notifyEvent(
  supabase: Supabase,
  n: {
    userId: string; // recipient
    kind: NotificationKind;
    title: string;
    body?: string;
    targetType?: "prompt" | "guardian";
    targetId?: string; // uuid of the prompt/guardian row (coalescing identity)
    actorUserId?: string;
    meta?: Record<string, unknown>;
  }
): Promise<void> {
  try {
    const { error } = await supabase.rpc("notify_event", {
      p_user: n.userId,
      p_kind: n.kind,
      p_title: n.title,
      p_body: n.body ?? null,
      p_target_type: n.targetType ?? null,
      p_target: n.targetId ?? null,
      p_actor: n.actorUserId ?? null,
      p_meta: n.meta ?? {},
    });
    if (error) console.error("[notify] dropped:", n.kind, error.message);
  } catch (e) {
    console.error("[notify] dropped:", n.kind, e instanceof Error ? e.message : e);
  }
}
