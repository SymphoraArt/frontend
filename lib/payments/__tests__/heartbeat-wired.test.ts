import { describe, it, expect, vi, afterEach } from "vitest";
import { readSource } from "@/lib/__tests__/_read-source";
import { join } from "node:path";

/**
 * beat() and sweepAbandoned() were already tested. Nobody tested that anything
 * CALLS them, and nothing did: startHeartbeat had zero callers outside its own
 * definition. sweepAbandoned voids an authorised intent whose heartbeat is
 * older than 45s, a nano-banana-pro generation takes 73-78s, and every request
 * to the generate route sweeps opportunistically on its way in. So an
 * authorisation was voided by ordinary concurrent traffic while its own image
 * was still rendering, the nonce account was closed, and the image shipped
 * uncaptured.
 */

const ROOT = join(__dirname, "..", "..", "..");
const ROUTE = readSource(join(ROOT, "app", "api", "generate-image", "route.ts"));

describe("the generate route keeps its authorisation alive", () => {
  it("starts a heartbeat when it claims one", () => {
    expect(ROUTE).toMatch(/heartbeat = startHeartbeat\(supabase, intentId\)/);
  });

  it("only beats for an AUTHORIZED claim — a prepaid one has nothing to lose", () => {
    expect(ROUTE).toMatch(/redemption\.mode === "authorized"\) heartbeat = startHeartbeat/);
  });

  it("stops it in the finally, where the slot is released", () => {
    const tail = ROUTE.slice(ROUTE.lastIndexOf("} finally {"));
    expect(tail).toMatch(/stopHeartbeat\(\)/);
  });

  it("stops it when the claim is given up, so no timer renews a dead row", () => {
    const block = ROUTE.slice(ROUTE.indexOf("const releaseIfConsumed"));
    expect(block.slice(0, block.indexOf("};"))).toMatch(/stopHeartbeat\(\)/);
  });
});

describe("startHeartbeat", () => {
  afterEach(() => { vi.useRealTimers(); vi.resetModules(); });

  /** A client whose heartbeat UPDATE returns whatever the test wants. */
  function client(stillOurs: boolean) {
    const calls = { n: 0 };
    // Mirrors beat()'s real chain: update → eq → not → is → is → select →
    // maybeSingle. A missing link here does not fail loudly, it makes the
    // whole beat vanish inside the `void …then()` — which is how the first
    // draft of this test reported zero beats and looked like a code bug.
    const chain = {
      update: () => chain,
      eq: () => chain,
      not: () => chain,
      is: () => chain,
      select: () => chain,
      maybeSingle: () => { calls.n++; return Promise.resolve({ data: stillOurs ? { id: "i" } : null, error: null }); },
    };
    return { supabase: { from: () => chain }, calls };
  }

  it("beats on the interval rather than once", async () => {
    vi.useFakeTimers();
    const { startHeartbeat, HEARTBEAT_INTERVAL_MS } = await import("@/lib/payments/authorization");
    const { supabase, calls } = client(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hb = startHeartbeat(supabase as any, "intent-1");

    expect(calls.n).toBe(0);
    await vi.advanceTimersByTimeAsync(HEARTBEAT_INTERVAL_MS * 3 + 1);
    // Three beats inside one grace window is the whole design: the sweeper
    // needs three MISSED ones before it acts.
    expect(calls.n).toBe(3);
    hb.stop();
  });

  it("stop() really stops it", async () => {
    vi.useFakeTimers();
    const { startHeartbeat, HEARTBEAT_INTERVAL_MS } = await import("@/lib/payments/authorization");
    const { supabase, calls } = client(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hb = startHeartbeat(supabase as any, "intent-1");
    await vi.advanceTimersByTimeAsync(HEARTBEAT_INTERVAL_MS + 1);
    const after = calls.n;
    hb.stop();
    await vi.advanceTimersByTimeAsync(HEARTBEAT_INTERVAL_MS * 5);
    expect(calls.n).toBe(after);
  });

  it("reports the claim lost once a beat is refused", async () => {
    vi.useFakeTimers();
    const { startHeartbeat, HEARTBEAT_INTERVAL_MS } = await import("@/lib/payments/authorization");
    const { supabase } = client(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const hb = startHeartbeat(supabase as any, "intent-1");
    expect(hb.lost()).toBe(false);
    await vi.advanceTimersByTimeAsync(HEARTBEAT_INTERVAL_MS + 1);
    expect(hb.lost()).toBe(true);
    hb.stop();
  });

  it("the grace is three intervals — a single slow write must not void a live job", async () => {
    const { HEARTBEAT_GRACE_MS, HEARTBEAT_INTERVAL_MS } = await import("@/lib/payments/authorization");
    expect(HEARTBEAT_GRACE_MS).toBe(HEARTBEAT_INTERVAL_MS * 3);
    // And the grace must stay well under the generation time it protects,
    // or the heartbeat is decorative: nano-banana-pro measured 73-78s.
    expect(HEARTBEAT_GRACE_MS).toBeLessThan(73_000);
  });
});
