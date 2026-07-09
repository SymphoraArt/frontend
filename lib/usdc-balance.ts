import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { PAYMENT_CHAINS, isSolanaChain, type ChainKey } from "@/shared/payment-config";

/**
 * On-chain USDC balance for a Solana wallet, in USD (USDC is 1:1 to the dollar).
 *
 * Non-custodial source of truth: reads the wallet's own USDC token account —
 * Enki holds nothing. Returns 0 when the token account doesn't exist yet or the
 * address is invalid.
 *
 * Network is resolved exactly like the generation pay route so the balance reads
 * the same chain payments settle on: SOLANA_PAYMENT_CHAIN, falling back to the
 * existing SOLANA_FUND_CHAIN (then solana-devnet). RPC overridable with
 * SOLANA_RPC_URL. Nothing hardcoded, no new env vars.
 */
function getSolanaChain(): { rpcUrl: string; usdc: string } {
  const key = (process.env.SOLANA_PAYMENT_CHAIN ??
    process.env.SOLANA_FUND_CHAIN ??
    "solana-devnet") as ChainKey;
  if (!(key in PAYMENT_CHAINS) || !isSolanaChain(key)) {
    throw new Error(`Not a Solana chain key: ${key}`);
  }
  return PAYMENT_CHAINS[key] as { rpcUrl: string; usdc: string };
}

export async function getUsdcBalance(walletAddress: string): Promise<number> {
  try {
    const chain = getSolanaChain();
    const rpcUrl = process.env.SOLANA_RPC_URL || chain.rpcUrl;
    const owner = new PublicKey(walletAddress);
    const ata = getAssociatedTokenAddressSync(new PublicKey(chain.usdc), owner);
    const conn = new Connection(rpcUrl, "confirmed");
    const res = await conn.getTokenAccountBalance(ata);
    return res.value.uiAmount ?? 0;
  } catch {
    return 0;
  }
}
