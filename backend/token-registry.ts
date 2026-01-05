/**
 * Token Registry
 * 
 * Registry of supported tokens with their configurations and risk levels
 */

import { type ChainKey } from '../shared/payment-config';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'UNACCEPTABLE';

export type AuditStatus = 'audited' | 'partially-audited' | 'unaudited' | 'unknown';

export interface TokenRegistryEntry {
  symbol: string;
  name: string;
  address: Record<ChainKey, string>;
  decimals: number;
  riskLevel: RiskLevel;
  auditStatus: AuditStatus;
  liquidity: {
    minLiquidityUsd: number;
  };
  slippage: {
    maxSlippagePercent: number;
  };
  paymentLimits: {
    minUsd: number;
    maxUsd: number;
  };
}

/**
 * Simplified token registry for hackathon
 * Only includes stablecoins with basic configuration
 */
class TokenRegistry {
  private tokens: Map<string, TokenRegistryEntry> = new Map();

  constructor() {
    // Register USDC on multiple chains
    this.registerToken({
      symbol: 'USDC',
      name: 'USD Coin',
      address: {
        ethereum: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
        base: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
        lukso: '0x0000000000000000000000000000000000000000', // Not deployed on LUKSO
        polygon: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
        arbitrum: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        optimism: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
      },
      decimals: 6,
      riskLevel: 'LOW',
      auditStatus: 'audited',
      liquidity: {
        minLiquidityUsd: 1000000,
      },
      slippage: {
        maxSlippagePercent: 0.5,
      },
      paymentLimits: {
        minUsd: 0.01,
        maxUsd: 10000,
      },
    });

    // Register DAI
    this.registerToken({
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      address: {
        ethereum: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        base: '0x0000000000000000000000000000000000000000',
        lukso: '0x0000000000000000000000000000000000000000',
        polygon: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
        arbitrum: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
        optimism: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
      },
      decimals: 18,
      riskLevel: 'LOW',
      auditStatus: 'audited',
      liquidity: {
        minLiquidityUsd: 500000,
      },
      slippage: {
        maxSlippagePercent: 0.5,
      },
      paymentLimits: {
        minUsd: 0.01,
        maxUsd: 10000,
      },
    });
  }

  registerToken(token: TokenRegistryEntry): void {
    this.tokens.set(token.symbol.toUpperCase(), token);
  }

  getToken(symbol: string): TokenRegistryEntry | undefined {
    return this.tokens.get(symbol.toUpperCase());
  }

  isSupportedOnChain(symbol: string, chain: ChainKey): boolean {
    const token = this.getToken(symbol);
    if (!token) return false;
    
    const address = token.address[chain];
    return address !== '0x0000000000000000000000000000000000000000' && address !== undefined;
  }

  validatePaymentAmount(symbol: string, amountUsd: number): { valid: boolean; reason?: string } {
    const token = this.getToken(symbol);
    if (!token) {
      return { valid: false, reason: `Token ${symbol} not found in registry` };
    }

    if (amountUsd < token.paymentLimits.minUsd) {
      return { valid: false, reason: `Amount below minimum: $${token.paymentLimits.minUsd}` };
    }

    if (amountUsd > token.paymentLimits.maxUsd) {
      return { valid: false, reason: `Amount above maximum: $${token.paymentLimits.maxUsd}` };
    }

    return { valid: true };
  }

  getAllTokens(): TokenRegistryEntry[] {
    return Array.from(this.tokens.values());
  }
}

export const tokenRegistry = new TokenRegistry();

