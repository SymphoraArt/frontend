import { describe, it, expect } from "vitest";
import { freeQuotaFor, FREE_GENERATIONS_PER_ACCOUNT } from "@/lib/generation/free-quota";

/** Minimal stub of the one query shape freeQuotaFor issues. */
function stub(result: { count?: number | null; error?: { message: string } | null }) {
  const calls: Record<string, unknown>[] = [];
  const chain = {
    select: () => chain,
    eq: (col: string, val: unknown) => { calls.push({ eq: [col, val] }); return chain; },
    is: (col: string, val: unknown) => { calls.push({ is: [col, val] }); return Promise.resolve(result) as never; },
  };
  return { client: { from: (t: string) => { calls.push({ from: t }); return chain; } }, calls };
}

describe("freeQuotaFor", () => {
  it("reports what is left before the allowance is spent", async () => {
    const { client } = stub({ count: 1, error: null });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const q = await freeQuotaFor(client as any, "u1");
    expect(q).toEqual({ used: 1, limit: FREE_GENERATIONS_PER_ACCOUNT, remaining: 2, exhausted: false });
  });

  it("is exhausted exactly AT the limit, not one past it", async () => {
    // Off-by-one here is the difference between 3 free images and 4.
    const { client } = stub({ count: FREE_GENERATIONS_PER_ACCOUNT, error: null });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const q = await freeQuotaFor(client as any, "u1");
    expect(q.exhausted).toBe(true);
    expect(q.remaining).toBe(0);
  });

  it("never reports a negative remainder for an account already over the line", async () => {
    const { client } = stub({ count: 9, error: null });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const q = await freeQuotaFor(client as any, "u1");
    expect(q.remaining).toBe(0);
    expect(q.exhausted).toBe(true);
  });

  it("counts unpaid rows for THIS user, and does not filter by provider", async () => {
    // Filtering on provider = 'pollinations' would reset everyone's allowance
    // the day the free provider changes.
    const { client, calls } = stub({ count: 0, error: null });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await freeQuotaFor(client as any, "user-42");
    expect(calls).toContainEqual({ from: "generations" });
    expect(calls).toContainEqual({ eq: ["user_id", "user-42"] });
    expect(calls).toContainEqual({ is: ["amount_paid_cents", null] });
    expect(JSON.stringify(calls)).not.toContain("provider");
  });

  it("throws on a failed lookup instead of granting a free generation", async () => {
    // Treating an outage as "0 used" turns a database blip into an unlimited
    // free tier — the expensive direction to be wrong in.
    const { client } = stub({ count: null, error: { message: "connection reset" } });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await expect(freeQuotaFor(client as any, "u1")).rejects.toThrow(/free quota lookup failed/);
  });
});
