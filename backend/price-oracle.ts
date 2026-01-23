/**
 * Simplified Price Oracle for Hackathon
 *
 * Only supports stablecoins with hardcoded prices for demo purposes.
 * Complex oracle implementations removed to focus on X402 payment flow.
 */

import { type ChainKey } from "../shared/payment-config";
import { tokenRegistry } from "./token-registry";
import { log } from "./logger";

/**
 * Price quote from a specific source
 */
export interface PriceQuote {
  /** USD price per token */
  priceUsd: number;

  /** Source of the price */
  source: string;

  /** Confidence score (0-1) */
  confidence: number;

  /** Timestamp when price was fetched */
  timestamp: number;
}

/**
 * Aggregated price result
 */
export interface AggregatedPrice {
  /** Final USD price per token */
  priceUsd: number;

  /** Confidence score (0-1) */
  confidence: number;

  /** Sources used for aggregation */
  sources: string[];

  /** Timestamp of aggregation */
  timestamp: number;

  /** Whether price is considered stale */
  isStale: boolean;

  /** Price deviation from sources */
  deviation: number;
}

/**
 * Simplified Price Oracle for Hackathon
 *
 * Only supports stablecoins with hardcoded prices for demo purposes.
 */
export class PriceOracle {
  private priceCache: Map<string, AggregatedPrice> = new Map();
  private readonly CACHE_TTL_MS = 300000; // 5 minutes cache

  constructor() {
    // No config needed for simplified version
  }

  /**
   * Get price for a token on a specific chain
   *
   * @param symbol - Token symbol (only USDC/USDC.e supported for hackathon)
   * @param chain - Chain to fetch price for
   * @returns Price with confidence metrics
   */
  async getPrice(symbol: string, chain: ChainKey): Promise<AggregatedPrice> {
    const cacheKey = `${symbol}-${chain}`;

    // Check cache first
    const cached = this.priceCache.get(cacheKey);
    if (cached && this.isCacheValid(cached)) {
      log(`Cache hit for ${symbol} on ${chain}`, 'price-oracle');
      return cached;
    }

    // Get token from registry
    const token = tokenRegistry.getToken(symbol);
    if (!token) {
      return this.createUnsafePrice(`Token ${symbol} not found in registry`);
    }

    // Verify token is supported on this chain
    if (!tokenRegistry.isSupportedOnChain(symbol, chain)) {
      return this.createUnsafePrice(`Token ${symbol} not supported on ${chain}`);
    }

    // Only support stablecoins for hackathon
    if (!this.isStablecoin(symbol)) {
      return this.createUnsafePrice(`Token ${symbol} not supported (only stablecoins for hackathon demo)`);
    }

    // Return hardcoded price for stablecoins
    const price = this.getHardcodedStablecoinPrice(symbol, chain);

    // Cache result
    this.priceCache.set(cacheKey, price);

    return price;
  }

  /**
   * Check if token is a stablecoin
   */
  private isStablecoin(symbol: string): boolean {
    return ['USDC', 'USDC.e', 'DAI'].includes(symbol);
  }

  /**
   * Get hardcoded price for stablecoins (always $1.00 for hackathon)
   */
  private getHardcodedStablecoinPrice(symbol: string, chain: ChainKey): AggregatedPrice {
    const now = Date.now();

    return {
      priceUsd: 1.0, // Stablecoins are pegged to $1.00
      confidence: 1.0, // 100% confidence for hardcoded stable prices
      sources: ['manual'],
      timestamp: now,
      isStale: false,
      deviation: 0.0,
    };
  }

  /**
   * Create unsafe price result (when price cannot be determined)
   */
  private createUnsafePrice(reason: string): AggregatedPrice {
    return {
      priceUsd: 0,
      confidence: 0,
      sources: [],
      timestamp: Date.now(),
      isStale: true,
      deviation: 0,
    };
  }

  /**
   * Check if cached price is still valid
   */
  private isCacheValid(price: AggregatedPrice): boolean {
    const age = Date.now() - price.timestamp;
    return age < this.CACHE_TTL_MS;
  }

  /**
   * Clear all cached prices
   */
  clearCache(): void {
    this.priceCache.clear();
    log('Price cache cleared', 'price-oracle');
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      size: this.priceCache.size,
      entries: Array.from(this.priceCache.keys()),
    };
  }
}

/**
 * Singleton price oracle instance
 */
export const priceOracle = new PriceOracle();
