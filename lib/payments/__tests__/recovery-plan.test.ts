import { describe, it, expect } from "vitest";
import {
  planRecovery,
  applyRecoveryToLegs,
  frontedPlanOf,
  type RecoveryPlan,
} from "@/lib/payments/authorize-flow";
import { ATA_FRONTED_MICRO } from "@/lib/payments/fronted-ledger";

/**
 * The Section 7 wiring: what is DECIDED at /authorize (planRecovery), how it
 * reshapes the transaction (applyRecoveryToLegs), and how it survives the
 * round trip through the stored row (frontedPlanOf). The plan is written once
 * and read back by /submit and capture — so the failure that matters most is
 * any path where the two sides could compute different answers.
 */

const ARTIST = "ArtistWa11etCaseExact111111111111111111111";
const ENKI = "EnkiPayoutWa11et11111111111111111111111111";
const MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

const plan = (over: Partial<Parameters<typeof planRecovery>[0]> = {}) =>
  planRecovery({
    artistWallet: ARTIST,
    mint: MINT,
    artistAmountMicro: 100_000,
    frontingNow: false,
    ledger: { frontedMicro: 0, outstandingMicro: 0 },
    ...over,
  });

describe("planRecovery — what /authorize decides", () => {
  it("plans nothing when nothing was fronted and nothing is being fronted", () => {
    expect(plan()).toBeNull();
  });

  it("starts the debt in the same transaction that creates the account", () => {
    // The ledger is still empty at plan time — the entry lands after
    // broadcast — so frontingNow must inject the debt into the plan itself.
    expect(plan({ frontingNow: true })).toEqual({
      artistWallet: ARTIST,
      mint: MINT,
      micro: 37_500, // one instalment of $0.15, below half of the share
      frontedTotalMicro: ATA_FRONTED_MICRO,
      frontingNow: true,
    });
  });

  it("continues an existing debt from the ledger's numbers", () => {
    const p = plan({ ledger: { frontedMicro: 150_000, outstandingMicro: 75_000 } });
    expect(p).toMatchObject({ micro: 37_500, frontedTotalMicro: 150_000, frontingNow: false });
  });

  it("takes only the remainder on the last instalment", () => {
    const p = plan({ ledger: { frontedMicro: 150_000, outstandingMicro: 10_000 } });
    expect(p?.micro).toBe(10_000);
  });

  it("plans nothing against an over-recovered balance", () => {
    // A negative balance is money owed BACK to the artist; deducting more
    // would deepen a hole the ledger already shows.
    expect(plan({ ledger: { frontedMicro: 150_000, outstandingMicro: -25_000 } })).toBeNull();
  });

  it("plans nothing without an artist or without a share", () => {
    expect(plan({ artistWallet: null, frontingNow: true })).toBeNull();
    expect(plan({ artistAmountMicro: 0, frontingNow: true })).toBeNull();
  });

  it("still records a fronting when the share is too small to deduct from", () => {
    // A 1-micro share halves to zero, so nothing can be taken — but the
    // account IS being created and the debt must reach the books at capture.
    const p = plan({ artistAmountMicro: 1, frontingNow: true });
    expect(p).toMatchObject({ micro: 0, frontingNow: true, frontedTotalMicro: ATA_FRONTED_MICRO });
  });

  it("plans nothing (not even a marker) for a tiny share on an EXISTING debt", () => {
    // Nothing to book: the fronting is already on the ledger and no money
    // moves. A zero-micro plan here would be noise on every small sale.
    expect(plan({ artistAmountMicro: 1, ledger: { frontedMicro: 150_000, outstandingMicro: 150_000 } })).toBeNull();
  });
});

describe("applyRecoveryToLegs — how the transaction changes", () => {
  const LEGS = [
    { recipient: ARTIST, amountMicro: 100_000 },
    { recipient: ENKI, amountMicro: 40_000 },
  ];
  const PLAN: RecoveryPlan = {
    artistWallet: ARTIST,
    mint: MINT,
    micro: 37_500,
    frontedTotalMicro: 150_000,
    frontingNow: true,
  };

  it("moves the instalment from the artist's leg to Enki's, total unchanged", () => {
    const out = applyRecoveryToLegs(LEGS, PLAN, ENKI);
    expect(out).toEqual([
      { recipient: ARTIST, amountMicro: 62_500 },
      { recipient: ENKI, amountMicro: 77_500 },
    ]);
    // The buyer signed for a fixed total; the recovery is none of their business.
    const sum = (legs: { amountMicro: number }[]) => legs.reduce((s, l) => s + l.amountMicro, 0);
    expect(sum(out)).toBe(sum(LEGS));
  });

  it("creates Enki's leg when the payment had none", () => {
    const out = applyRecoveryToLegs([{ recipient: ARTIST, amountMicro: 100_000 }], PLAN, ENKI);
    expect(out).toContainEqual({ recipient: ENKI, amountMicro: 37_500 });
  });

  it("changes nothing for a null plan or a fronting-only plan", () => {
    expect(applyRecoveryToLegs(LEGS, null, ENKI)).toEqual(LEGS);
    expect(applyRecoveryToLegs(LEGS, { ...PLAN, micro: 0 }, ENKI)).toEqual(LEGS);
  });

  it("refuses a plan for an artist with no leg — that is a corrupted row", () => {
    expect(() =>
      applyRecoveryToLegs([{ recipient: ENKI, amountMicro: 40_000 }], PLAN, ENKI),
    ).toThrow(/no payment leg/);
  });

  it("refuses a plan larger than the artist's leg", () => {
    expect(() =>
      applyRecoveryToLegs([{ recipient: ARTIST, amountMicro: 10_000 }, { recipient: ENKI, amountMicro: 1 }], PLAN, ENKI),
    ).toThrow(/exceeds/);
  });

  it("does not mutate its input", () => {
    const before = JSON.stringify(LEGS);
    applyRecoveryToLegs(LEGS, PLAN, ENKI);
    expect(JSON.stringify(LEGS)).toBe(before);
  });
});

describe("frontedPlanOf — the stored row read back", () => {
  it("round-trips the shape /authorize writes", () => {
    const stored = {
      owners: [{ owner: ARTIST }],
      recovery: { artistWallet: ARTIST, mint: MINT, micro: 37_500, frontedTotalMicro: 150_000, frontingNow: true },
    };
    expect(frontedPlanOf(stored)).toEqual(stored);
  });

  it("reads the pre-ledger array shape as a plan with no recovery", () => {
    // Rows from before the wiring — a parser that throws on them would strand
    // those intents unredeemable.
    expect(frontedPlanOf([{ owner: ARTIST }])).toEqual({ owners: [{ owner: ARTIST }], recovery: null });
  });

  it("treats garbage as an empty plan rather than crashing the rebuild", () => {
    for (const junk of [null, undefined, "x", 42, { owners: "no" }, [{ notOwner: 1 }]]) {
      const p = frontedPlanOf(junk);
      expect(p.owners).toEqual([]);
      expect(p.recovery ?? null).toBeNull();
    }
  });
});
