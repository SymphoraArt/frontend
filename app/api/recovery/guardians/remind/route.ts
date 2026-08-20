/**
 * POST /api/recovery/guardians/remind — the owner's "Send reminder" button.
 *
 *   Body:    { guardianId }
 *   Returns  { sent: true, remindersLeft } or a refusal that names its reason.
 *
 * The limits (24h cooldown, 7 sends total) live in
 * lib/recovery/manual-reminder.ts and are enforced HERE — the button in the
 * settings panel only mirrors the answer. Stamp-first with a row guard, same
 * pattern as the automatic sweep: the counter is bumped in a conditional
 * UPDATE before the mail goes out, so two concurrent clicks cannot both send,
 * and a lost race costs a click rather than a duplicate email.
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { resolveSessionUserId } from "@/lib/session-user";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";
import { sendMail } from "@/lib/mailer";
import {
  manualReminderDecision,
  MANUAL_REMINDER_MAX,
} from "@/lib/recovery/manual-reminder";

export const runtime = "nodejs";

const schema = z.object({ guardianId: z.string().uuid() });

/** Same mail the invite and the automatic sweep send, reminder wording. */
function reminderMail(origin: string, token: string, value: string) {
  const t = encodeURIComponent(token);
  return {
    to: value,
    subject: "Reminder: you were asked to be a recovery guardian on Enki Art",
    text:
      `Hi,\n\n` +
      `A quick reminder — someone named you as a recovery guardian for their Enki Art account and is still waiting for your answer.\n\n` +
      `Accept the role:\n${origin}/guardian?token=${t}&action=accept\n\n` +
      `Or decline it:\n${origin}/guardian?token=${t}&action=decline\n\n` +
      `If you don't know what this is about, you can safely ignore this email.`,
  };
}

export async function POST(req: NextRequest) {
  const supabase = getSupabaseServerClient();
  const userId = await resolveSessionUserId(supabase, req.headers.get("X-Session-Token"));
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const limit = checkRequestRateLimit(rateLimitKey(req, "guardian-remind"), 10, 60_000);
  if (!limit.allowed) return rateLimitResponse(limit.retryAfterSeconds);

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "guardianId must be a UUID" }, { status: 400 });
  }

  const { data: g, error } = await supabase
    .from("recovery_guardians")
    .select("id, guardian_type, value, status, invite_token, manual_reminder_count, last_reminded_at, created_at")
    .eq("id", parsed.data.guardianId)
    .eq("user_id", userId) // the owner's own guardian, never someone else's
    .maybeSingle();

  if (error) {
    // The one schema-shaped failure: the migration has not run yet. Saying so
    // beats a generic 500 that reads as "the button is broken".
    const missingColumn = /manual_reminder_count/.test(error.message);
    return NextResponse.json(
      {
        error: missingColumn
          ? "Reminders need a database migration (2026-08-19-guardian-manual-reminders.sql) that has not run yet."
          : "Could not load the guardian",
      },
      { status: missingColumn ? 503 : 500 },
    );
  }
  if (!g) return NextResponse.json({ error: "Guardian not found" }, { status: 404 });

  const manualCount = (g.manual_reminder_count as number | null) ?? 0;
  const decision = manualReminderDecision({
    status: g.status as string,
    guardianType: g.guardian_type as string,
    manualCount,
    lastRemindedAt: (g.last_reminded_at as string | null) ?? (g.created_at as string | null),
    now: Date.now(),
  });
  if (!decision.ok) {
    const status = decision.reason === "cooling-down" ? 429 : 409;
    const message =
      decision.reason === "cooling-down"
        ? "A reminder already went out in the last 24 hours."
        : decision.reason === "exhausted"
          ? `All ${MANUAL_REMINDER_MAX} reminders for this guardian have been used.`
          : decision.reason === "not-email"
            ? "Only email guardians can be reminded by mail."
            : "This guardian is not pending.";
    return NextResponse.json(
      { error: message, reason: decision.reason, ...(decision.retryAt ? { retryAt: decision.retryAt } : {}) },
      { status },
    );
  }

  // Stamp first. The guard on the old counter value means a concurrent click
  // loses the race and sends nothing, instead of both sending.
  const { data: stamped } = await supabase
    .from("recovery_guardians")
    .update({
      manual_reminder_count: manualCount + 1,
      last_reminded_at: new Date().toISOString(),
    })
    .eq("id", g.id)
    .eq("manual_reminder_count", manualCount)
    .eq("status", "pending")
    .select("id");
  if (!stamped?.length) {
    return NextResponse.json({ error: "A reminder is already on its way." }, { status: 409 });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://enki.gallery";
  const mailed = await sendMail(reminderMail(origin, g.invite_token as string, g.value as string)).catch(() => ({ ok: false }));

  return NextResponse.json({
    sent: (mailed as { ok?: boolean }).ok !== false,
    remindersLeft: MANUAL_REMINDER_MAX - (manualCount + 1),
  });
}
