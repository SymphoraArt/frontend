import { describe, it, expect } from "vitest";
import { isChainKey, PAYMENT_CHAINS } from "@/shared/payment-config";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

/**
 * `key in PAYMENT_CHAINS` is not a membership test — it walks the prototype
 * chain. The first version of the chain validation used it, so every
 * Object.prototype key passed, and PAYMENT_CHAINS["constructor"] is a
 * function: .isSolana is undefined, and the request proceeded down the EVM
 * path with a chain that does not exist. It did not even fail loudly.
 */
describe("isChainKey", () => {
  it("accepts every chain that is actually configured", () => {
    for (const k of Object.keys(PAYMENT_CHAINS)) expect(isChainKey(k)).toBe(true);
  });

  it("refuses inherited Object.prototype keys", () => {
    for (const k of ["constructor", "toString", "valueOf", "hasOwnProperty", "__proto__", "isPrototypeOf"]) {
      expect(isChainKey(k), `${k} must not pass as a chain`).toBe(false);
      // and the reason the old check let them through:
      expect(k in PAYMENT_CHAINS || k === "__proto__").toBe(true);
    }
  });

  it("refuses an empty string, so it can be treated as absent", () => {
    expect(isChainKey("")).toBe(false);
  });

  it("refuses non-strings rather than coercing them", () => {
    for (const v of [null, undefined, 0, {}, [], true]) expect(isChainKey(v)).toBe(false);
  });
});

describe("every route that settles a payment validates its chain", () => {
  const ROOT = join(__dirname, "..", "..", "..");
  const read = (p: string) => readFileSync(p, "utf8").split("\r\n").join("\n");
  function walk(dir: string): string[] {
    const out: string[] = [];
    for (const e of readdirSync(dir)) {
      const p = join(dir, e);
      if (statSync(p).isDirectory()) out.push(...walk(p));
      else if (e === "route.ts") out.push(p);
    }
    return out;
  }
  const routes = walk(join(ROOT, "app", "api"));

  it("finds routes that read a chain at all", () => {
    const readers = routes.filter((r) => /searchParams\.get\(['"]chain['"]\)/.test(read(r)));
    expect(readers.length).toBeGreaterThan(0);
  });

  it("no route asserts a raw chain parameter into ChainKey without checking it", () => {
    // The generate route was fixed and its twin under prompts/[id]/content was
    // left with the pre-fix line verbatim — same paymentEngine.settle flow.
    const offenders = routes.filter((r) => {
      const src = read(r);
      return /searchParams\.get\(['"]chain['"]\)/.test(src) && !/isChainKey\(/.test(src);
    });
    expect(offenders.map((o) => o.slice(ROOT.length + 1))).toEqual([]);
  });
});
