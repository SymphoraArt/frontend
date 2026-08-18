import { describe, it, expect, afterEach, vi } from "vitest";
import { PAYMENT_CHAINS, isSolanaChain } from "@/shared/payment-config";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Where the money settles is a server decision.
 *
 * The generate route asserted a raw query parameter into ChainKey and, in the
 * Solana branch, used that string as the chain while the fee payer, the RPC
 * connection and the USDC mint all came from SOLANA_PAYMENT_CHAIN. Two sources
 * of truth for one decision, and the one a stranger controls was winning for
 * half the code.
 */

const ROOT = join(__dirname, "..", "..", "..");
const read = (p: string) => readFileSync(p, "utf8").split("\r\n").join("\n");
const ROUTE = read(join(ROOT, "app", "api", "generate-image", "route.ts"));

afterEach(() => { vi.unstubAllEnvs(); vi.resetModules(); });

describe("the caller cannot choose the settlement chain", () => {
  it("an unknown chain is refused before it can reach PAYMENT_CHAINS", () => {
    // isSolanaChain does PAYMENT_CHAINS[key].isSolana — on an unknown key that
    // is a TypeError, i.e. a 500 on a payment route from one query parameter.
    expect(() => isSolanaChain("not-a-chain" as never)).toThrow();
    expect(ROUTE).toMatch(/requestedChain in PAYMENT_CHAINS/);
    expect(ROUTE).toMatch(/Unknown chain/);
  });

  it("the Solana branch reads the server's key, not the query string", () => {
    expect(ROUTE).toMatch(/const solanaChain = solanaChainKey\(\)/);
    expect(ROUTE).not.toMatch(/const solanaChain = chain as/);
  });

  it("every key the route may accept really exists in the config", () => {
    // The default the route falls back to must itself be a real chain.
    expect("base-sepolia" in PAYMENT_CHAINS).toBe(true);
    expect(ROUTE).toMatch(/requestedChain \|\| 'base-sepolia'/);
  });
});

describe("solanaChainKey", () => {
  it("returns the configured chain", async () => {
    vi.stubEnv("SOLANA_PAYMENT_CHAIN", "solana-devnet");
    const { solanaChainKey } = await import("@/lib/payments/solana");
    expect(solanaChainKey()).toBe("solana-devnet");
  });

  it("refuses a non-Solana chain rather than settling on it", async () => {
    // "base" is a real chain and still the wrong answer here — a silent
    // acceptance would build a Solana transfer against an EVM config.
    vi.stubEnv("SOLANA_PAYMENT_CHAIN", "base");
    const { solanaChainKey } = await import("@/lib/payments/solana");
    expect(() => solanaChainKey()).toThrow(/Not a Solana chain key/);
  });

  it("refuses a chain that does not exist", async () => {
    vi.stubEnv("SOLANA_PAYMENT_CHAIN", "solana-mainnet-beta-typo");
    const { solanaChainKey } = await import("@/lib/payments/solana");
    expect(() => solanaChainKey()).toThrow(/Not a Solana chain key/);
  });

  it("treats an empty env value as unset rather than as a chain", async () => {
    // The || is deliberate: `SOLANA_PAYMENT_CHAIN=` puts an empty string in
    // the environment and ?? would take it, which threw on the devnet dry run.
    vi.stubEnv("SOLANA_PAYMENT_CHAIN", "");
    vi.stubEnv("SOLANA_FUND_CHAIN", "");
    const { solanaChainKey } = await import("@/lib/payments/solana");
    expect(solanaChainKey()).toBe("solana-devnet");
  });
});
