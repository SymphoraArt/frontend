"use client";

/**
 * Wallet Balance Hook for x402 Payments
 *
 * Queries USDC balance across different chains to determine if user can make payments.
 * Supports both native USDC and bridged USDC.e tokens.
 *
 * @example
 * const { balance, isLoading, hasBalance, symbol } = usePaymentBalance('base-sepolia');
 *
 * if (hasBalance) {
 *   // User can make payments
 *   await generateImage(...);
 * }
 */

import { useWalletBalance } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import { defineChain } from "thirdweb/chains";
import { thirdwebClient } from "../lib/thirdweb-client";
import { PAYMENT_CHAINS, type ChainKey, getTokenSymbol } from "../lib/payment-config";

/**
 * Safe wrapper for useActiveAccount that handles provider context issues
 */
function useSafeActiveAccount() {
  try {
    return useActiveAccount();
  } catch (error) {
    // If we're outside of ThirdwebProvider context, return null
    if (error instanceof Error && error.message.includes('must be used within')) {
      console.warn('⚠️ useActiveAccount called outside ThirdwebProvider context');
      return null;
    }
    throw error;
  }
}

export interface BalanceInfo {
  /** Raw balance in wei (6 decimals for USDC) */
  balance: bigint | undefined;
  /** Human-readable balance (e.g., "10.50") */
  displayBalance: string;
  /** Token symbol (USDC or USDC.e) */
  symbol: string;
  /** Whether balance query is loading */
  isLoading: boolean;
  /** Whether user has any balance */
  hasBalance: boolean;
  /** Whether user has enough for minimum transaction (0.01 USDC) */
  hasSufficientBalance: boolean;
  /** Chain being queried */
  chain: ChainKey;
}

/**
 * Hook to query USDC balance for a specific chain
 *
 * @param chainKey - Chain to query (e.g., 'base-sepolia', 'ethereum', 'abstract')
 * @returns Balance information
 */
export function usePaymentBalance(chainKey: ChainKey): BalanceInfo {
  const account = useSafeActiveAccount();
  const chainConfig = PAYMENT_CHAINS[chainKey];

  const { data: balance, isLoading } = useWalletBalance({
    client: thirdwebClient,
    address: account?.address,
    chain: defineChain({
      id: chainConfig.id,
      rpc: chainConfig.rpcUrl,
    }),
    tokenAddress: chainConfig.usdc,
  });

  const symbol = getTokenSymbol(chainKey);

  // Convert balance from wei to human-readable (USDC has 6 decimals)
  const displayBalance = balance?.displayValue || "0";
  const rawBalance = balance?.value || 0n;

  // Minimum transaction is 0.01 USDC = 10000 wei (6 decimals)
  const MIN_BALANCE = 10_000n;

  return {
    balance: rawBalance,
    displayBalance,
    symbol,
    isLoading,
    hasBalance: rawBalance > 0n,
    hasSufficientBalance: rawBalance >= MIN_BALANCE,
    chain: chainKey,
  };
}

/**
 * Hook to query balances across multiple chains simultaneously
 *
 * @param chains - Array of chain keys to query
 * @returns Map of chain keys to balance info
 */
export function useMultiChainBalances(chains: ChainKey[]) {
  const balances = chains.reduce((acc, chain) => {
    // This will trigger multiple useWalletBalance calls
    // eslint-disable-next-line react-hooks/rules-of-hooks
    acc[chain] = usePaymentBalance(chain);
    return acc;
  }, {} as Record<ChainKey, BalanceInfo>);

  const isAnyLoading = Object.values(balances).some(b => b.isLoading);
  const totalBalance = Object.values(balances).reduce(
    (sum, b) => sum + (b.balance || 0n),
    0n
  );

  return {
    balances,
    isLoading: isAnyLoading,
    totalBalance,
    hasAnyBalance: totalBalance > 0n,
  };
}

/**
 * Hook to find the best chain for payment based on balance
 *
 * @param preferredChains - Ordered list of preferred chains (most preferred first)
 * @returns Best chain to use for payment, or null if no balance
 */
export function useBestPaymentChain(
  preferredChains: ChainKey[] = ['base-sepolia', 'base', 'ethereum', 'abstract', 'unichain']
) {
  const { balances } = useMultiChainBalances(preferredChains);

  // Find first chain with sufficient balance
  const bestChain = preferredChains.find(
    chain => balances[chain]?.hasSufficientBalance
  );

  return {
    chainKey: bestChain || null,
    balance: bestChain ? balances[bestChain] : null,
    allBalances: balances,
  };
}
