/**
 * Thirdweb Configuration
 * 
 * Centralized configuration for Thirdweb client, chains, and wallet setup.
 * Supports multiple chains with environment-aware defaults.
 */

import { createThirdwebClient } from "thirdweb";
import { baseSepolia, base, polygon, optimism, arbitrum } from "thirdweb/chains";

// Validate client ID
if (!process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID) {
  throw new Error("Missing NEXT_PUBLIC_THIRDWEB_CLIENT_ID");
}

// Create client instance
export const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});

/**
 * Chain logo URLs. Trust Wallet Assets (blockchains/{slug}/info/logo.png).
 * Base Sepolia (84532) uses Base logo.
 */
const TRUST_ASSETS = "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains";
const CHAIN_SLUG: Record<number, string> = {
  84532: "base",   // Base Sepolia -> same as Base
  8453: "base",
  137: "polygon",
  10: "optimism",
  42161: "arbitrum",
};
export function getChainLogoUrl(chainId: number): string {
  const slug = CHAIN_SLUG[chainId] ?? "base";
  return `${TRUST_ASSETS}/${slug}/info/logo.png`;
}

/**
 * All supported chains in the application
 * Users can switch between these chains
 */
export const supportedChains = [
  baseSepolia,  // Base Sepolia testnet
  base,         // Base mainnet
  polygon,      // Polygon mainnet
  optimism,     // Optimism mainnet
  arbitrum,     // Arbitrum mainnet
];

/**
 * Default chain based on environment
 * - Production: Base mainnet
 * - Development: Base Sepolia testnet
 */
export const defaultChain =
  process.env.NODE_ENV === "production" ? base : baseSepolia;

/**
 * Get chain by ID
 * Useful for chain switching functionality
 */
export function getChainById(chainId: number) {
  return supportedChains.find((chain) => chain.id === chainId) || defaultChain;
}

/**
 * Get chain name for display
 */
export function getChainName(chainId: number): string {
  const chain = getChainById(chainId);
  return chain.name || `Chain ${chainId}`;
}

/**
 * Get chain explorer URL
 */
export function getChainExplorerUrl(chainId: number, address: string): string {
  const chain = getChainById(chainId);
  const explorerUrl = chain.blockExplorers?.[0]?.url || "https://etherscan.io";
  return `${explorerUrl}/address/${address}`;
}
