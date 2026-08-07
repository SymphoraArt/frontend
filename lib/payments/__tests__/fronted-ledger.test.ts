/**
 * The books, and the two duplicates that would quietly rob an artist.
 *
 * A retried /authorize must not charge the setup cost twice, and a retried
 * post-capture write must not deduct the same instalment twice. Both are
 * refused by partial unique indexes in the migration, so the fake below has to
 * model those indexes honestly — a stub that accepts every insert would pass
 * all of this while the real table double-charges. It raises 23505 on exactly
 * the two conditions the migration declares, and nothing else.
 */
import { describe, expect, it } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  ATA_RENT_LAMPORTS,
  outstandingMicro,
  recordFronted,
  recordRecovery,
} from "@/lib/payments/fronted-ledger";

type Row = Record<string, unknown>;
type Result = { data: Row[] | null; error: { code: string; message: string } | null };

const ARTIST = "Art1stWa11etBase58Case";
const MINT = "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"; // devnet USDC
const INTENT = "11111111-1111-1111-1111-111111111111";

// ── a Postgres-shaped fake ──────────────────────────────────────────────

class Query implements PromiseLike<Result> {
  private filters: ((r: Row) => boolean)[] = [];
  private inserted: Row | null = null;

  constructor(
    private rows: Row[],
    private readFails: boolean,
  ) {}

  /** The column list is irrelevant here: the fake hands back whole rows. */
  select() {
    return this;
  }
  eq(col: string, v: unknown) {
    this.filters.push((r) => r[col] === v);
    return this;
  }
  insert(row: Row) {
    this.inserted = row;
    return this;
  }

  /** The two partial unique indexes from 2026-08-07-artist-cost-ledger.sql. */
  private violates(row: Row): boolean {
    if (row.entry === "fronted") {
      return this.rows.some(
        (r) =>
          r.entry === "fronted" && r.artist_wallet === row.artist_wallet && r.mint === row.mint,
      );
    }
    return this.rows.some((r) => r.entry === "recovered" && r.intent_id === row.intent_id);
  }

  then<A, B>(
    onfulfilled?: ((v: Result) => A | PromiseLike<A>) | null,
    onrejected?: ((reason: unknown) => B | PromiseLike<B>) | null,
  ): PromiseLike<A | B> {
    let result: Result;
    if (this.inserted) {
      if (this.violates(this.inserted)) {
        result = { data: null, error: { code: "23505", message: "duplicate key value" } };
      } else {
        this.rows.push(this.inserted);
        result = { data: null, error: null };
      }
    } else if (this.readFails) {
      result = { data: null, error: { code: "PGRST000", message: "connection reset" } };
    } else {
      result = { data: this.rows.filter((r) => this.filters.every((f) => f(r))), error: null };
    }
    return Promise.resolve(result).then(onfulfilled, onrejected);
  }
}

function fakeClient(rows: Row[], readFails = false): SupabaseClient {
  return { from: () => new Query(rows, readFails) } as unknown as SupabaseClient;
}

const account = { artistWallet: ARTIST, mint: MINT };

async function fronted(rows: Row[], micro = 150_000) {
  return recordFronted(fakeClient(rows), {
    ...account,
    micro,
    lamports: ATA_RENT_LAMPORTS,
    intentId: INTENT,
  });
}

// ── the tests ───────────────────────────────────────────────────────────

describe("the fronted-cost ledger", () => {
  it("opens a debt for the account we paid rent on", async () => {
    const rows: Row[] = [];
    expect(await fronted(rows)).toBe(true);
    expect(rows[0]).toMatchObject({
      artist_wallet: ARTIST,
      mint: MINT,
      entry: "fronted",
      micro: 150_000,
      lamports: 2_039_280,
    });
    expect(await outstandingMicro(fakeClient(rows), account)).toBe(150_000);
  });

  it("charges the one time setup cost exactly once per payout account", async () => {
    const rows: Row[] = [];
    expect(await fronted(rows)).toBe(true);
    // A second /authorize for the same artist, or an account they closed and
    // re-created. Either way it is ours to absorb, not theirs to pay twice.
    expect(await fronted(rows)).toBe(false);
    expect(rows).toHaveLength(1);
    expect(await outstandingMicro(fakeClient(rows), account)).toBe(150_000);
  });

  it("subtracts each recorded instalment from the balance", async () => {
    const rows: Row[] = [];
    await fronted(rows);

    expect(
      await recordRecovery(fakeClient(rows), { ...account, micro: 50_000, intentId: "i-1" }),
    ).toBe(true);
    expect(await outstandingMicro(fakeClient(rows), account)).toBe(100_000);

    expect(
      await recordRecovery(fakeClient(rows), { ...account, micro: 100_000, intentId: "i-2" }),
    ).toBe(true);
    expect(await outstandingMicro(fakeClient(rows), account)).toBe(0);
  });

  it("records one instalment per intent however often the write is retried", async () => {
    const rows: Row[] = [];
    await fronted(rows);
    const instalment = { ...account, micro: 50_000, intentId: "i-1" };

    expect(await recordRecovery(fakeClient(rows), instalment)).toBe(true);
    // The post-capture write is retryable; the share only moved once.
    expect(await recordRecovery(fakeClient(rows), instalment)).toBe(false);
    expect(await outstandingMicro(fakeClient(rows), account)).toBe(100_000);
  });

  it("keeps an over-recovery visible instead of hiding it at zero", async () => {
    const rows: Row[] = [];
    await fronted(rows);
    await recordRecovery(fakeClient(rows), { ...account, micro: 100_000, intentId: "i-1" });
    await recordRecovery(fakeClient(rows), { ...account, micro: 100_000, intentId: "i-2" });
    // Negative means we owe the artist 50_000 back. Clamping here would erase
    // the only record that we do.
    expect(await outstandingMicro(fakeClient(rows), account)).toBe(-50_000);
  });

  it("keeps each payout account's debt to itself", async () => {
    const rows: Row[] = [];
    await fronted(rows);
    // Same wallet, other mint: devnet USDC is not mainnet USDC, and an ATA
    // exists per (owner, mint). Recovering across them would take real
    // earnings for an account funded with play money.
    expect(await outstandingMicro(fakeClient(rows), { ...account, mint: "OtherMint111" })).toBe(0);
    expect(
      await outstandingMicro(fakeClient(rows), { artistWallet: "SomeoneE1se", mint: MINT }),
    ).toBe(0);
  });

  it("reports nothing outstanding when the ledger cannot be read", async () => {
    const rows: Row[] = [];
    await fronted(rows);
    // Deliberate direction: a bookkeeping query that fails costs Enki $0.15,
    // it does not fail an artist's sale.
    expect(await outstandingMicro(fakeClient(rows, true), account)).toBe(0);
  });
});
