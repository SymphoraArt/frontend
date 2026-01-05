/**
 * Payment Configuration
 * 
 * Shared types and configuration for payment processing across chains
 */

export type ChainKey = 'ethereum' | 'base' | 'lukso' | 'polygon' | 'arbitrum' | 'optimism';

export interface PaymentChainConfig {
  id: number;
  name: string;
  rpcUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export const PAYMENT_CHAINS: Record<ChainKey, PaymentChainConfig> = {
  ethereum: {
    id: 1,
    name: 'Ethereum',
    rpcUrl: 'https://1.rpc.thirdweb.com',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  base: {
    id: 8453,
    name: 'Base',
    rpcUrl: 'https://8453.rpc.thirdweb.com',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  lukso: {
    id: 42,
    name: 'LUKSO',
    rpcUrl: 'https://42.rpc.thirdweb.com',
    nativeCurrency: {
      name: 'LYX',
      symbol: 'LYX',
      decimals: 18,
    },
  },
  polygon: {
    id: 137,
    name: 'Polygon',
    rpcUrl: 'https://137.rpc.thirdweb.com',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
  },
  arbitrum: {
    id: 42161,
    name: 'Arbitrum',
    rpcUrl: 'https://42161.rpc.thirdweb.com',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
  optimism: {
    id: 10,
    name: 'Optimism',
    rpcUrl: 'https://10.rpc.thirdweb.com',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18,
    },
  },
};

