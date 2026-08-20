/**
 * May the owner send this guardian a manual reminder right now?
 *
 * Kev, 2026-08-19: a "Send reminder" button on pending guardians, once per
 * 24h, seven times in total. Both limits protect the GUARDIAN — a stranger who
 * never asked to be one — from a nervous owner's clicking, so they are
 * enforced here on the server and the button merely reflects the answer.
 *
 * The cooldown reads last_reminded_at, which the AUTOMATIC engine also stamps.
 * Shared on purpose: whether the last mail came from the 14-day sweep or from
 * the button, the guardian got a mail, and a second one hours later reads as
 * pestering from the same sender. A manual send stamps the same column, which
 * also pushes the automatic nudge a full cycle out instead of stacking on top.
 *
 * The SEVEN-limit has its own counter (manual_reminder_count). Reusing the
 * automatic reminder_count would flip a guardian to "unresponsive" after three
 * manual sends — a state that means "the SYSTEM gave up", not "the owner is
 * eager" — and would silently eat the sweep's own budget.
 */
export const MANUAL_REMINDER_COOLDOWN_MS = 24 * 60 * 60 * 1000;
export const MANUAL_REMINDER_MAX = 7;

export type ManualReminderRefusal =
  | "not-pending"
  | "not-email"
  | "exhausted"
  | "cooling-down";

export interface ManualReminderInput {
  status: string;
  guardianType: string;
  manualCount: number;
  /** last_reminded_at ?? created_at ?? null — same fallback the sweep uses. */
  lastRemindedAt: string | null;
  now: number;
}

export type ManualReminderDecision =
  | { ok: true }
  | { ok: false; reason: ManualReminderRefusal; retryAt?: string };

export function manualReminderDecision(i: ManualReminderInput): ManualReminderDecision {
  if (i.status !== "pending") return { ok: false, reason: "not-pending" };
  // Only email guardians can be mailed. A wallet guardian confirms by signing;
  // there is no inbox to remind.
  if (i.guardianType !== "email") return { ok: false, reason: "not-email" };
  if (i.manualCount >= MANUAL_REMINDER_MAX) return { ok: false, reason: "exhausted" };
  if (i.lastRemindedAt) {
    const readyAt = Date.parse(i.lastRemindedAt) + MANUAL_REMINDER_COOLDOWN_MS;
    if (Number.isFinite(readyAt) && i.now < readyAt) {
      return { ok: false, reason: "cooling-down", retryAt: new Date(readyAt).toISOString() };
    }
  }
  return { ok: true };
}
