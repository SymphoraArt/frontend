import { describe, it, expect } from "vitest";
import {
  manualReminderDecision,
  MANUAL_REMINDER_COOLDOWN_MS,
  MANUAL_REMINDER_MAX,
} from "@/lib/recovery/manual-reminder";

/**
 * The limits protect the GUARDIAN — a stranger who never asked for the role —
 * so every case here is one where a wrong answer means either a pestered
 * stranger or a button that lies about why it is disabled.
 */
const NOW = Date.parse("2026-08-19T12:00:00Z");
const base = {
  status: "pending",
  guardianType: "email",
  manualCount: 0,
  lastRemindedAt: null as string | null,
  now: NOW,
};

describe("manualReminderDecision", () => {
  it("allows a fresh pending email guardian", () => {
    expect(manualReminderDecision(base)).toEqual({ ok: true });
  });

  it("refuses inside the 24h window, and says when to retry", () => {
    const last = new Date(NOW - MANUAL_REMINDER_COOLDOWN_MS + 60_000).toISOString();
    const d = manualReminderDecision({ ...base, lastRemindedAt: last });
    expect(d.ok).toBe(false);
    if (!d.ok) {
      expect(d.reason).toBe("cooling-down");
      expect(Date.parse(d.retryAt!)).toBe(Date.parse(last) + MANUAL_REMINDER_COOLDOWN_MS);
    }
  });

  it("allows again exactly AT the 24h mark, not one minute later", () => {
    const last = new Date(NOW - MANUAL_REMINDER_COOLDOWN_MS).toISOString();
    expect(manualReminderDecision({ ...base, lastRemindedAt: last })).toEqual({ ok: true });
  });

  it("counts the AUTOMATIC sweep's mail into the cooldown", () => {
    // The column is shared on purpose: the guardian got a mail three hours
    // ago, and it does not matter to them which engine sent it.
    const last = new Date(NOW - 3 * 60 * 60 * 1000).toISOString();
    const d = manualReminderDecision({ ...base, lastRemindedAt: last });
    expect(d.ok).toBe(false);
  });

  it("is exhausted exactly AT seven, not one past it", () => {
    expect(manualReminderDecision({ ...base, manualCount: MANUAL_REMINDER_MAX - 1 })).toEqual({ ok: true });
    const d = manualReminderDecision({ ...base, manualCount: MANUAL_REMINDER_MAX });
    expect(d.ok).toBe(false);
    if (!d.ok) expect(d.reason).toBe("exhausted");
  });

  it("refuses non-pending and non-email guardians", () => {
    expect(manualReminderDecision({ ...base, status: "confirmed" }).ok).toBe(false);
    expect(manualReminderDecision({ ...base, status: "unresponsive" }).ok).toBe(false);
    expect(manualReminderDecision({ ...base, guardianType: "wallet" }).ok).toBe(false);
    expect(manualReminderDecision({ ...base, guardianType: "phone" }).ok).toBe(false);
  });

  it("treats an unparseable timestamp as no cooldown rather than a permanent lock", () => {
    expect(manualReminderDecision({ ...base, lastRemindedAt: "not-a-date" })).toEqual({ ok: true });
  });

  it("the seven-limit is its own counter — three sends must NOT exhaust it", () => {
    // Three is the AUTOMATIC engine's ceiling; sharing its counter would flip
    // guardians to "unresponsive" from button presses.
    expect(manualReminderDecision({ ...base, manualCount: 3 })).toEqual({ ok: true });
  });
});
