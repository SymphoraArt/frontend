import { describe, it, expect } from "vitest";
import { join } from "node:path";
import { readSource } from "@/lib/__tests__/_read-source";
import { ABANDONED_AFTER_MS } from "@/lib/payments/authorization";

/**
 * The whole reason a deadline may replace a heartbeat.
 *
 * A heartbeat measures silence, so it works whatever the platform does. A
 * deadline only works if something guarantees an upper bound on the work — and
 * here Vercel does: past maxDuration the function no longer exists. That makes
 * ABANDONED_AFTER_MS a derived number, not a taste, and this file is where the
 * derivation is checked.
 *
 * Every other test of the sweep measures relative to the constant
 * (`ago(ABANDONED_AFTER_MS * 2)`), so they pass at ANY value — including 45s,
 * which would void live generations. Found by a mutation probe that survived.
 *
 * IF ENKI LEAVES VERCEL (Kev, 2026-08-19): there is no enforced upper bound to
 * derive from and this file's premise is gone. The heartbeat has to come back.
 */

const ROOT = join(__dirname, "..", "..", "..");

/**
 * Read a numeric literal out of a source file, underscores and all.
 *
 * No regex: an earlier draft built one from a template literal, where `\s`
 * collapses to a bare `s` and the pattern silently matched nothing. The guard
 * below caught it, which is the only reason this comment exists.
 */
function constant(relPath: string, name: string): number {
  const src = readSource(join(ROOT, ...relPath.split("/")));
  const at = src.indexOf(name + " ");
  expect(at, `${name} not found in ${relPath} — this test is reading the wrong thing`).toBeGreaterThan(-1);
  const eq = src.indexOf("=", at);
  const digits = src.slice(eq + 1).match(/[0-9_]+/);
  expect(digits, `no number after ${name} in ${relPath}`).not.toBeNull();
  return Number(digits![0].replace(/_/g, ""));
}

describe("the abandon deadline is derived from the budget ladder", () => {
  const maxDurationMs = constant("app/api/generate-image/route.ts", "maxDuration") * 1000;
  const slotTtlMs = constant("lib/generation/concurrency.ts", "SLOT_TTL_MS");
  const staleClaimMs = constant("lib/payments/generation-redemption.ts", "STALE_CLAIM_MS");

  it("reads the real numbers, not zeroes", () => {
    expect(maxDurationMs).toBe(300_000);
    expect(slotTtlMs).toBe(330_000);
    expect(staleClaimMs).toBe(360_000);
  });

  it("outlives the platform's own kill, or it voids running generations", () => {
    // Below this the sweep races a function that is still executing: one
    // payment buys two images, or the first is handed over unpaid.
    expect(ABANDONED_AFTER_MS).toBeGreaterThan(maxDurationMs);
  });

  it("outlives the concurrency slot, which outlives the function", () => {
    expect(ABANDONED_AFTER_MS).toBeGreaterThanOrEqual(slotTtlMs);
  });

  it("agrees with STALE_CLAIM_MS — same question, so it must be the same answer", () => {
    // generation-redemption decides "is this claim provably dead" for the
    // prepaid path using consumed_at and that number. Two answers to one
    // question is how a released claim and a live sweep disagree.
    expect(ABANDONED_AFTER_MS).toBe(staleClaimMs);
  });

  it("keeps the ladder in the order the route documents", () => {
    expect(maxDurationMs).toBeLessThan(slotTtlMs);
    expect(slotTtlMs).toBeLessThanOrEqual(ABANDONED_AFTER_MS);
  });
});
