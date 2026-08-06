import { describe, it, expect, beforeEach } from "vitest";
import crypto from "crypto";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * These tests exist for one claim: an authorisation can be captured or voided,
 * never both, and it dies from SILENCE rather than from a clock.
 *
 * That means the fake below has to model a conditional UPDATE honestly — a
 * stub that always returns a row would pass every mutual-exclusion assertion
 * while the real thing double-spends. So it applies the accumulated filters to
 * the rows and updates only what matches, exactly as PostgREST would, and an
 * UPDATE matching nothing yields null without an error.
 */

// ── a Postgres-shaped fake ──────────────────────────────────────────────

type Row = Record<string, any>;

/** Split on top-level commas, so and(...) groups survive intact. */
function splitClauses(expr: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < expr.length; i++) {
    if (expr[i] === "(") depth++;
    else if (expr[i] === ")") depth--;
    else if (expr[i] === "," && depth === 0) {
      out.push(expr.slice(start, i));
      start = i + 1;
    }
  }
  out.push(expr.slice(start));
  return out;
}

function clauseToPredicate(clause: string): (r: Row) => boolean {
  // [\s\S] rather than the dotAll flag — the build target predates es2018.
  const and = clause.match(/^and\(([\s\S]*)\)$/);
  if (and) {
    const inner = splitClauses(and[1]).map(clauseToPredicate);
    return (r) => inner.every((p) => p(r));
  }
  const [col, op, ...rest] = clause.split(".");
  const value = rest.join(".");
  if (op === "is" && value === "null") return (r) => (r[col] ?? null) === null;
  if (op === "lt") return (r) => r[col] != null && String(r[col]) < value;
  throw new Error(`fake: unsupported or() clause "${clause}"`);
}

class Builder implements PromiseLike<{ data: any; error: any }> {
  private filters: ((r: Row) => boolean)[] = [];
  private patch: Row | null = null;
  private cap = Infinity;
  private single = false;

  constructor(private rows: Row[]) {}

  update(patch: Row) {
    this.patch = patch;
    return this;
  }
  select(_cols?: string) {
    return this;
  }
  eq(col: string, v: unknown) {
    this.filters.push((r) => r[col] === v);
    return this;
  }
  is(col: string, v: unknown) {
    this.filters.push((r) => (r[col] ?? null) === v);
    return this;
  }
  not(col: string, op: string, v: unknown) {
    if (op !== "is") throw new Error(`fake: unsupported not(${op})`);
    this.filters.push((r) => (r[col] ?? null) !== v);
    return this;
  }
  lt(col: string, v: string) {
    this.filters.push((r) => r[col] != null && String(r[col]) < v);
    return this;
  }
  or(expr: string) {
    const preds = splitClauses(expr).map(clauseToPredicate);
    this.filters.push((r) => preds.some((p) => p(r)));
    return this;
  }
  limit(n: number) {
    this.cap = n;
    return this;
  }
  maybeSingle() {
    this.single = true;
    return this;
  }

  private run() {
    const matched = this.rows.filter((r) => this.filters.every((f) => f(r))).slice(0, this.cap);
    if (this.patch) for (const r of matched) Object.assign(r, this.patch);
    return matched;
  }

  then<A, B>(
    onfulfilled?: ((v: { data: any; error: any }) => A | PromiseLike<A>) | null,
    onrejected?: ((reason: unknown) => B | PromiseLike<B>) | null,
  ): PromiseLike<A | B> {
    const matched = this.run();
    const data = this.single ? (matched[0] ?? null) : matched;
    return Promise.resolve({ data, error: null }).then(onfulfilled, onrejected);
  }
}

function fakeClient(rows: Row[]): SupabaseClient {
  return { from: () => new Builder(rows) } as unknown as SupabaseClient;
}

// ── fixtures ────────────────────────────────────────────────────────────

const BUYER = "8xKevBuyerWalletBase58";
const INTENT = "11111111-1111-1111-1111-111111111111";
const TX = "AQABBase64SignedTransactionBytes==";

const quotedRow = (over: Row = {}): Row => ({
  id: INTENT,
  buyer_wallet: BUYER,
  total_micro: 250_000,
  status: "quoted",
  authorized_at: null,
  heartbeat_at: null,
  captured_at: null,
  voided_at: null,
  void_reason: null,
  nonce_account: null,
  ...over,
});

const ago = (ms: number) => new Date(Date.now() - ms).toISOString();

async function mod() {
  return import("@/lib/payments/authorization");
}

/** Put a live authorisation on the table and hand back its row. */
async function authorized(rows: Row[]) {
  const { storeAuthorization } = await mod();
  const ok = await storeAuthorization(fakeClient(rows), {
    intentId: INTENT,
    buyerWallet: BUYER,
    signedTx: TX,
    nonceAccount: "NonceAcc111",
    nonceAuthority: "EnkiAuth111",
  });
  expect(ok).toBe(true);
  return rows[0];
}

describe("generation authorisation", () => {
  beforeEach(async () => {
    process.env.FIELD_ENCRYPTION_KEY_B64 = crypto.randomBytes(32).toString("base64");
    (await import("@/lib/crypto")).resetKeyringCache();
  });

  it("starts beating in the same write that records the signature", async () => {
    const rows = [quotedRow()];
    const row = await authorized(rows);

    // A signature with no first beat would be invisible to the sweeper, and a
    // signature nobody is working on is exactly what must not survive.
    expect(row.authorized_at).toBeTruthy();
    expect(row.heartbeat_at).toBe(row.authorized_at);
    expect(row.status).toBe("generating");
  });

  it("refuses to re-authorise a settled intent", async () => {
    const { storeAuthorization } = await mod();
    const rows = [quotedRow({ authorized_at: ago(1000), voided_at: ago(500) })];

    const ok = await storeAuthorization(fakeClient(rows), {
      intentId: INTENT,
      buyerWallet: BUYER,
      signedTx: TX,
      nonceAccount: "N",
      nonceAuthority: "A",
    });
    expect(ok).toBe(false);
    expect(rows[0].status).not.toBe("generating");
  });

  it("hands back the signed transaction, and only to its own row", async () => {
    const { captureAuthorization } = await mod();
    const rows = [quotedRow()];
    await authorized(rows);

    const held = await captureAuthorization(fakeClient(rows), INTENT);
    expect(held?.signedTx).toBe(TX);
    expect(held?.nonceAccount).toBe("NonceAcc111");

    // The ciphertext is bound to the intent id: lifted into another row it
    // must not open, so a leaked blob is not a charge against someone else.
    const other = "22222222-2222-2222-2222-222222222222";
    const stolen = [quotedRow({ ...rows[0], id: other, captured_at: null, voided_at: null })];
    await expect(captureAuthorization(fakeClient(stolen), other)).rejects.toThrow();
  });
});

describe("capture and void are mutually exclusive", () => {
  beforeEach(async () => {
    process.env.FIELD_ENCRYPTION_KEY_B64 = crypto.randomBytes(32).toString("base64");
    (await import("@/lib/crypto")).resetKeyringCache();
  });

  it("refuses to void what was already captured", async () => {
    const { captureAuthorization, voidAuthorization } = await mod();
    const rows = [quotedRow()];
    await authorized(rows);

    expect(await captureAuthorization(fakeClient(rows), INTENT)).not.toBeNull();
    expect(await voidAuthorization(fakeClient(rows), INTENT, "provider_failed")).toBeNull();

    expect(rows[0].captured_at).toBeTruthy();
    expect(rows[0].voided_at).toBeNull();
  });

  it("refuses to capture what was already voided", async () => {
    const { captureAuthorization, voidAuthorization } = await mod();
    const rows = [quotedRow()];
    await authorized(rows);

    expect(await voidAuthorization(fakeClient(rows), INTENT, "rejected")).not.toBeNull();
    // Losing here is the signal to hand the image over unpaid rather than
    // broadcast against a nonce that has already been advanced.
    expect(await captureAuthorization(fakeClient(rows), INTENT)).toBeNull();

    expect(rows[0].voided_at).toBeTruthy();
    expect(rows[0].void_reason).toBe("rejected");
    expect(rows[0].captured_at).toBeNull();
  });

  it("never captures twice", async () => {
    const { captureAuthorization } = await mod();
    const rows = [quotedRow()];
    await authorized(rows);

    expect(await captureAuthorization(fakeClient(rows), INTENT)).not.toBeNull();
    expect(await captureAuthorization(fakeClient(rows), INTENT)).toBeNull();
  });

  it("tells a running job it lost, so it stops", async () => {
    const { beat, voidAuthorization } = await mod();
    const rows = [quotedRow()];
    await authorized(rows);

    expect(await beat(fakeClient(rows), INTENT)).toBe(true);
    await voidAuthorization(fakeClient(rows), INTENT, "cancelled");
    expect(await beat(fakeClient(rows), INTENT)).toBe(false);
  });
});

describe("the abort condition is silence, not elapsed time", () => {
  beforeEach(async () => {
    process.env.FIELD_ENCRYPTION_KEY_B64 = crypto.randomBytes(32).toString("base64");
    (await import("@/lib/crypto")).resetKeyringCache();
  });

  it("leaves a two-hour-old authorisation alone while it is still beating", async () => {
    const { sweepAbandoned, HEARTBEAT_GRACE_MS } = await mod();
    const rows = [quotedRow()];
    const row = await authorized(rows);

    // Older than any deadline anyone would have picked — and irrelevant,
    // because the worker is still there. This is the whole point of the
    // design: no generation dies of taking long.
    row.authorized_at = ago(2 * 60 * 60_000);
    row.heartbeat_at = ago(HEARTBEAT_GRACE_MS / 3);

    expect(await sweepAbandoned(fakeClient(rows))).toEqual([]);
    expect(rows[0].voided_at).toBeNull();
  });

  it("voids one that went quiet, and says which nonce to flush", async () => {
    const { sweepAbandoned, HEARTBEAT_GRACE_MS } = await mod();
    const rows = [quotedRow()];
    const row = await authorized(rows);
    row.heartbeat_at = ago(HEARTBEAT_GRACE_MS + 1000);

    const flushed = await sweepAbandoned(fakeClient(rows));
    expect(flushed).toEqual([{ intentId: INTENT, nonceAccount: "NonceAcc111" }]);
    expect(rows[0].void_reason).toBe("abandoned");
  });

  it("does not touch a job one beat behind", async () => {
    const { sweepAbandoned } = await mod();
    const rows = [quotedRow()];
    const row = await authorized(rows);
    // One missed beat is a slow DB write, not a death. The grace is three.
    row.heartbeat_at = ago(20_000);

    expect(await sweepAbandoned(fakeClient(rows))).toEqual([]);
  });

  it("clears an authorised row that never beat, rather than leaving it forever", async () => {
    const { sweepAbandoned, HEARTBEAT_GRACE_MS } = await mod();
    const rows = [quotedRow()];
    const row = await authorized(rows);
    // storeAuthorization always writes a first beat, so this state is a bug —
    // the sweep makes the bug self-clearing instead of a permanent live nonce.
    row.heartbeat_at = null;
    row.authorized_at = ago(HEARTBEAT_GRACE_MS + 1000);

    expect(await sweepAbandoned(fakeClient(rows))).toHaveLength(1);
  });

  it("leaves settled rows out of the sweep entirely", async () => {
    const { sweepAbandoned, HEARTBEAT_GRACE_MS } = await mod();
    const stale = ago(HEARTBEAT_GRACE_MS + 1000);
    const rows = [
      quotedRow({ id: "a", authorized_at: stale, heartbeat_at: stale, captured_at: stale }),
      quotedRow({ id: "b", authorized_at: stale, heartbeat_at: stale, voided_at: stale }),
      quotedRow({ id: "c" }), // never authorised: only a quote, no signature to flush
    ];
    expect(await sweepAbandoned(fakeClient(rows))).toEqual([]);
  });
});
