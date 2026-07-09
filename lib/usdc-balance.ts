import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddressSync } from "@solana/spl-token";
import { PAYMENT_CHAINS } from "@/shared/payment-config";

/**
 * On-chain USDC balance for a Solana wallet, in USD (USDC is 1:1 to the dollar).
 *
 * Non-custodial source of truth: reads the wallet's own USDC token account —
 * Enki holds nothing. Returns 0 when the token account doesn't exist yet or the
 * address is invalid. RPC + mint come from the shared payment config (chain via
 * SOLANA_PAYMENT_CHAIN, RPC overridable with SOLANA_RPC_URL — nothing hardcoded).
 */
export async function getUsdcBalance(walletAddress: string): Promise<number> {
  const key = process.env.SOLANA_PAYMENT_CHAIN === "solana-devnet" ? "solana-devnet" : "solana";
  const chain = PAYMENT_CHAINS[key];
  const rpcUrl = process.env.SOLANA_RPC_URL || chain.rpcUrl;

  try {
    const owner = new PublicKey(walletAddress);
    const ata = getAssociatedTokenAddressSync(new PublicKey(chain.usdc), owner);
    const conn = new Connection(rpcUrl, "confirmed");
    const res = await conn.getTokenAccountBalance(ata);
    return res.value.uiAmount ?? 0;
  } catch {
    return 0;
  }
}
