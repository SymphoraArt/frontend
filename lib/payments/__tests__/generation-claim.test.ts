import { describe, it, expect } from "vitest";
import { claimForGeneration, modeOf } from "@/lib/payments/generation-claim";

/**
 * One intent must buy exactly one image, once, under either payment model.
 *
 * The fake below ENFORCES the filters rather than recording them. A stub that
 * returns a row regardless of `.is("consumed_at", null)` would make every test
 * here pass while the real double-claim went through — the failure mode this
 * file exists to rule out.
 */

type Row = Record<string, unknown>;

function fakeSupabase(initial: Row | null) {
  const state: { row: Row | null } = { row: initial ? { ...initial } : null };
  const calls = { updates: 0 };

  const builder = (mode: "select" | "update", patch?: Row) => {
    const preds: ((r: Row) => boolean)[] = [];
    const api: Record<string, unknown> = {
      eq: (c: string, v: unknown) => (preds.push((r) => r[c] === v), api),
      is: (c: string, v: unknown) => (preds.push((r) => r[c] === v || (v === null && r[c] == null)), api),
      not: (c: string, op: string, v: unknown) => {
        if (op !== "is" || v !== null) throw new Error(`fake: unsupported not(${op})`);
        return preds.push((r) => r[c] != null), api;
      },
      lt: (c: string, v: string) => (preds.push((r) => String(r[c] ?? "") < v), api),
      select: () => api,
      maybeSingle: async () => {
        const r = state.row;
        if (!r || !preds.every((p) => p(r))) return { data: null, error: null };
        if (mode === "update") {
          calls.updates += 1;
          state.row = { ...r, ...patch };
          return { data: { ...state.row }, error: null };
        }
        return { data: { ...r }, error: null };
      },
    };
    return api;
  };

  return {
    client: {
      from: () => ({
        select: () => builder("select"),
        update: (patch: Row) => builder("update", patch),
      }),
    } as never,
    state,
    calls,
  };
}

const BUYER = "So1anaBuyerWa11et";
const base = {
  id: "intent-1",
  buyer_wallet: BUYER,
  resolution: "2K",
  model_family: "nano-banana-pro",
  consumed_at: null,
  fulfilled_at: null,
  captured_at: null,
  voided_at: null,
  authorized_at: null,
  status: "quoted",
};

const claim = (row: Row | null) => {
  const f = fakeSupabase(row);
  return { run: () => claimForGeneration(f.client, { intentId: "intent-1", buyerWallet: BUYER }), f };
};

describe("which payment model this intent is in", () => {
  it("reads a settled transfer as prepaid", () => {
    expect(modeOf({ status: "confirmed", authorized_at: null, captured_at: null, voided_at: null })).toBe("prepaid");
  });

  it("reads a held signature as authorized", () => {
    expect(modeOf({ status: "generating", authorized_at: "t", captured_at: null, voided_at: null })).toBe("authorized");
  });

  it("calls a row carrying BOTH markers ambiguous, never one of them", () => {
    // Settled funds and a held signature on one row. Reading it either way
    // charges somebody twice.
    expect(modeOf({ status: "confirmed", authorized_at: "t", captured_at: null, voided_at: null })).toBe("ambiguous");
  });

  it("reads a fresh quote as neither", () => {
    expect(modeOf({ status: "quoted", authorized_at: null, captured_at: null, voided_at: null })).toBeNull();
  });
});

describe("claiming an authorised intent", () => {
  it("claims it once and reports the mode the route must capture under", async () => {
    const { run, f } = claim({ ...base, status: "generating", authorized_at: "2026-08-07T10:00:00Z" });
    const r = await run();
    expect(r).toMatchObject({ ok: true, mode: "authorized", resolution: "2K", modelFamily: "nano-banana-pro" });
    expect(f.state.row?.consumed_at).toBeTruthy();
  });

  it("refuses the SECOND claim, so one signature cannot buy two images", async () => {
    const f = fakeSupabase({ ...base, status: "generating", authorized_at: "2026-08-07T10:00:00Z" });
    const first = await claimForGeneration(f.client, { intentId: "intent-1", buyerWallet: BUYER });
    const second = await claimForGeneration(f.client, { intentId: "intent-1", buyerWallet: BUYER });

    expect(first.ok).toBe(true);
    expect(second).toMatchObject({ ok: false, status: 409 });
    // One row mutation, not two: the refusal is the database's, not a
    // read-then-check that a race could slip through.
    expect(f.calls.updates).toBe(1);
  });

  it("refuses one already captured — the money has moved", async () => {
    const { run } = claim({ ...base, status: "generating", authorized_at: "t", captured_at: "t" });
    expect(await run()).toMatchObject({ ok: false, status: 409, error: expect.stringMatching(/already used/i) });
  });

  it("refuses one already voided, and says so distinctly", async () => {
    const { run } = claim({ ...base, status: "generating", authorized_at: "t", voided_at: "t" });
    expect(await run()).toMatchObject({ ok: false, status: 409, error: expect.stringMatching(/cancelled/i) });
  });
});

describe("the guard against charging twice", () => {
  it("refuses an intent that is confirmed AND authorised instead of picking one", async () => {
    // Nothing should ever write this row. If something does, capturing the
    // held transaction would take a second payment for funds already settled.
    const { run, f } = claim({ ...base, status: "confirmed", authorized_at: "t" });
    const r = await run();
    expect(r).toMatchObject({ ok: false, status: 409 });
    expect((r as { error: string }).error).toMatch(/inconsistent/i);
    // And it must not have touched the row on the way out.
    expect(f.calls.updates).toBe(0);
  });
});

describe("refusals that are not about money", () => {
  it("reports a missing intent as not found, not as a payment problem", async () => {
    const { run } = claim(null);
    expect(await run()).toMatchObject({ ok: false, status: 404 });
  });

  it("refuses a quote nobody has paid or signed", async () => {
    const { run } = claim({ ...base });
    expect(await run()).toMatchObject({ ok: false, status: 402 });
  });

  it("will not let one buyer claim another's intent", async () => {
    const f = fakeSupabase({ ...base, status: "generating", authorized_at: "t" });
    const r = await claimForGeneration(f.client, { intentId: "intent-1", buyerWallet: "someoneElse" });
    expect(r).toMatchObject({ ok: false, status: 404 });
    expect(f.calls.updates).toBe(0);
  });
});
