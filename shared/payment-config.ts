/**
 * Multi-Chain Payment Configuration
 *
 * Verified USDC addresses for production and testnet deployments.
 * This config is shared between frontend and backend to ensure consistency.
 */

export const PAYMENT_CHAINS = {
  // Ethereum Mainnet
  ethereum: {
    id: 1,
    name: "Ethereum Mainnet",
    rpcUrl: "https://ethereum-rpc.publicnode.com",
    usdc: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    usdcType: "native" as const,
    explorer: "https://etherscan.io",
  },
  // Ethereum Sepolia Testnet
  "ethereum-sepolia": {
    id: 11155111,
    name: "Ethereum Sepolia",
    rpcUrl: "https://ethereum-sepolia-rpc.publicnode.com",
    usdc: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
    usdcType: "native" as const,
    explorer: "https://sepolia.etherscan.io",
  },
  // Base Mainnet
  base: {
    id: 8453,
    name: "Base Mainnet",
    rpcUrl: "https://mainnet.base.org",
    usdc: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    usdcType: "native" as const,
    explorer: "https://basescan.org",
  },
  // Base Sepolia Testnet
  "base-sepolia": {
    id: 84532,
    name: "Base Sepolia",
    rpcUrl: "https://sepolia.base.org",
    usdc: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
    usdcType: "native" as const,
    explorer: "https://sepolia.basescan.org",
  },
  // Abstract Mainnet (uses bridged USDC.e)
  abstract: {
    id: 2741,
    name: "Abstract Mainnet",
    rpcUrl: "https://api.mainnet.abs.xyz",
    usdc: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
    usdcType: "bridged" as const,
    explorer: "https://abscan.org",
  },
  // Abstract Testnet (uses bridged USDC.e)
  "abstract-testnet": {
    id: 11124,
    name: "Abstract Testnet",
    rpcUrl: "https://api.testnet.abs.xyz",
    usdc: "0x4A8e0cd6c7Df0b54b6f3e3b3E7bDe9F4C8e5A3B2",
    usdcType: "bridged" as const,
    explorer: "https://sepolia.abscan.org",
  },
  // Unichain Mainnet
  unichain: {
    id: 1301,
    name: "Unichain Mainnet",
    rpcUrl: "https://mainnet.unichain.org",
    usdc: "0x078d782b760474a361dda0af3839290b0ef57ad6",
    usdcType: "native" as const,
    explorer: "https://uniscan.xyz",
  },
  // Unichain Sepolia Testnet
  "unichain-sepolia": {
    id: 1301,
    name: "Unichain Sepolia",
    rpcUrl: "https://sepolia.unichain.org",
    usdc: "0x5425837Ce827646D10C363eB89E8152bf8c2D921",
    usdcType: "native" as const,
    explorer: "https://sepolia.uniscan.xyz",
  },
} as const;

export type ChainKey = keyof typeof PAYMENT_CHAINS;

/**
 * Check if a chain uses bridged USDC (USDC.e) instead of native Circle USDC
 */
export function isBridgedToken(chainKey: ChainKey): boolean {
  return PAYMENT_CHAINS[chainKey].usdcType === "bridged";
}

/**
 * Get the correct token symbol for a chain (USDC or USDC.e)
 */
export function getTokenSymbol(chainKey: ChainKey): string {
  return isBridgedToken(chainKey) ? "USDC.e" : "USDC";
}

/**
 * Get all mainnet chains
 */
export function getMainnetChains(): ChainKey[] {
  return ["ethereum", "base", "abstract", "unichain"];
}

/**
 * Get all testnet chains
 */
export function getTestnetChains(): ChainKey[] {
  return ["ethereum-sepolia", "base-sepolia", "abstract-testnet", "unichain-sepolia"];
}

/**
 * Default chain for development
 */
export const DEFAULT_CHAIN: ChainKey = "base-sepolia";
