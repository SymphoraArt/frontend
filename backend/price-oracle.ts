/**
 * Multi-Source Price Oracle Aggregation System
 *
 * Aggregates price data from multiple sources (Chainlink, DEX TWAPs, off-chain APIs)
 * with confidence scoring, outlier rejection, and timestamp validation.
 *
 * Safety-first design: payments with insufficient confidence FAIL SAFELY.
 */

import { type ChainKey } from "../../shared/payment-config";
import { tokenRegistry, type TokenRegistryEntry } from "./token-registry";
import { log } from "./app";

/**
 * Price quote from a specific source
 */
export interface PriceQuote {
  /** USD price per token */
  priceUsd: number;

  /** Source of the price */
  source: "chainlink" | "uniswap-v3-twap" | "coingecko" | "manual";

  /** Timestamp when price was fetched */
  timestamp: Date;

  /** Confidence score (0-1, where 1 is highest confidence) */
  confidence: number;

  /** Additional metadata */
  metadata?: {
    /** Block number (for on-chain sources) */
    blockNumber?: number;

    /** TWAP period in seconds (for DEX sources) */
    twapPeriod?: number;

    /** Raw response data */
    rawData?: any;
  };
}

/**
 * Aggregated price result with confidence metrics
 */
export interface AggregatedPrice {
  /** Final aggregated price in USD */
  priceUsd: number;

  /** Overall confidence score (0-1) */
  confidence: number;

  /** Individual quotes used in aggregation */
  quotes: PriceQuote[];

  /** Aggregation method used */
  method: "median" | "weighted-average" | "single-source";

  /** Price deviation across sources (as percentage) */
  deviation: number;

  /** Timestamp of aggregation */
  timestamp: Date;

  /** Whether this price is safe to use for settlement */
  isSafe: boolean;

  /** Reason if price is not safe */
  unsafeReason?: string;
}

/**
 * Price oracle configuration
 */
interface OracleConfig {
  /** Minimum confidence threshold to accept price */
  minConfidence: number;

  /** Maximum price deviation allowed across sources (as percentage) */
  maxDeviation: number;

  /** Maximum age of price data (in seconds) */
  maxAgeSeconds: number;

  /** Minimum number of sources required */
  minSources: number;

  /** Enable outlier rejection */
  enableOutlierRejection: boolean;

  /** Outlier rejection threshold (standard deviations from median) */
  outlierThreshold: number;
}

/**
 * Default oracle configuration (conservative settings)
 */
const DEFAULT_ORACLE_CONFIG: OracleConfig = {
  minConfidence: 0.7, // 70% minimum confidence
  maxDeviation: 2.0, // 2% maximum deviation
  maxAgeSeconds: 300, // 5 minutes max staleness
  minSources: 2, // Require at least 2 sources
  enableOutlierRejection: true,
  outlierThreshold: 2.0, // 2 standard deviations
};

/**
 * Multi-Source Price Oracle
 *
 * Fetches and aggregates prices from multiple sources with safety guarantees
 */
export class PriceOracle {
  private config: OracleConfig;
  private priceCache: Map<string, AggregatedPrice> = new Map();
  private readonly CACHE_TTL_MS = 60000; // 1 minute cache

  constructor(config: Partial<OracleConfig> = {}) {
    this.config = { ...DEFAULT_ORACLE_CONFIG, ...config };
  }

  /**
   * Get aggregated price for a token on a specific chain
   *
   * @param symbol - Token symbol (e.g., "USDC", "WETH")
   * @param chain - Chain to fetch price for
   * @returns Aggregated price with confidence metrics
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

    // Fetch prices from all configured sources
    const quotes = await this.fetchAllSources(token, chain);

    if (quotes.length === 0) {
      return this.createUnsafePrice("No price sources available");
    }

    // Aggregate prices
    const aggregated = this.aggregatePrices(quotes, token);

    // Cache result
    this.priceCache.set(cacheKey, aggregated);

    log(
      `Price for ${symbol}: $${aggregated.priceUsd.toFixed(6)} (confidence: ${(aggregated.confidence * 100).toFixed(1)}%, safe: ${aggregated.isSafe})`,
      'price-oracle'
    );

    return aggregated;
  }

  /**
   * Fetch prices from all configured sources for a token
   */
  private async fetchAllSources(
    token: TokenRegistryEntry,
    chain: ChainKey
  ): Promise<PriceQuote[]> {
    const quotes: PriceQuote[] = [];

    // Fetch from primary source
    const primaryQuote = await this.fetchFromSource(
      token.priceFeeds.primary,
      token,
      chain
    );
    if (primaryQuote) {
      quotes.push(primaryQuote);
    }

    // Fetch from fallback sources
    for (const source of token.priceFeeds.fallbacks) {
      const quote = await this.fetchFromSource(source, token, chain);
      if (quote) {
        quotes.push(quote);
      }
    }

    return quotes;
  }

  /**
   * Fetch price from a specific source
   */
  private async fetchFromSource(
    source: "chainlink" | "uniswap-v3-twap" | "coingecko" | "manual",
    token: TokenRegistryEntry,
    chain: ChainKey
  ): Promise<PriceQuote | null> {
    try {
      switch (source) {
        case "chainlink":
          return await this.fetchChainlinkPrice(token, chain);

        case "uniswap-v3-twap":
          return await this.fetchUniswapV3TWAP(token, chain);

        case "coingecko":
          return await this.fetchCoingeckoPrice(token);

        case "manual":
          return this.getManualPrice(token);

        default:
          log(`Unknown price source: ${source}`, 'price-oracle');
          return null;
      }
    } catch (error) {
      log(`Error fetching price from ${source}: ${error}`, 'price-oracle');
      return null;
    }
  }

  /**
   * Fetch price from Chainlink oracle
   *
   * Note: This is a placeholder. In production, you would use:
   * - thirdweb's read contract functionality
   * - Chainlink price feed ABI
   * - Latest round data from the oracle
   */
  private async fetchChainlinkPrice(
    token: TokenRegistryEntry,
    chain: ChainKey
  ): Promise<PriceQuote | null> {
    const feedAddress = token.priceFeeds.chainlink?.[chain];
    if (!feedAddress) {
      return null;
    }

    // TODO: Implement actual Chainlink price feed reading
    // For now, return null to fall back to other sources
    log(`Chainlink feed available at ${feedAddress} (not yet implemented)`, 'price-oracle');
    return null;
  }

  /**
   * Fetch TWAP from Uniswap V3
   *
   * Note: This is a placeholder. In production, you would:
   * - Query Uniswap V3 pool contract
   * - Calculate TWAP over configured period
   * - Handle pool availability and liquidity
   */
  private async fetchUniswapV3TWAP(
    token: TokenRegistryEntry,
    chain: ChainKey
  ): Promise<PriceQuote | null> {
    const poolAddress = token.priceFeeds.uniswapV3Pool?.[chain];
    if (!poolAddress) {
      return null;
    }

    // TODO: Implement actual Uniswap V3 TWAP calculation
    log(`Uniswap V3 pool available at ${poolAddress} (not yet implemented)`, 'price-oracle');
    return null;
  }

  /**
   * Fetch price from CoinGecko API
   *
   * Note: This is a placeholder. In production, you would:
   * - Call CoinGecko API with proper rate limiting
   * - Handle API errors and retries
   * - Validate response data
   */
  private async fetchCoingeckoPrice(
    token: TokenRegistryEntry
  ): Promise<PriceQuote | null> {
    if (!token.priceFeeds.coingeckoId) {
      return null;
    }

    // TODO: Implement actual CoinGecko API call
    // For now, return null
    log(`CoinGecko ID: ${token.priceFeeds.coingeckoId} (not yet implemented)`, 'price-oracle');
    return null;
  }

  /**
   * Get manual/hardcoded price (for stablecoins and testing)
   */
  private getManualPrice(token: TokenRegistryEntry): PriceQuote | null {
    // Hardcoded prices for stablecoins
    const manualPrices: Record<string, number> = {
      USDC: 1.0,
      "USDC.e": 1.0,
      DAI: 1.0,
      USDT: 1.0,
    };

    const price = manualPrices[token.symbol];
    if (price === undefined) {
      return null;
    }

    return {
      priceUsd: price,
      source: "manual",
      timestamp: new Date(),
      confidence: 0.95, // High confidence for stablecoins
    };
  }

  /**
   * Aggregate multiple price quotes into a single price
   */
  private aggregatePrices(
    quotes: PriceQuote[],
    token: TokenRegistryEntry
  ): AggregatedPrice {
    // Filter out stale quotes
    const freshQuotes = this.filterStaleQuotes(quotes);

    if (freshQuotes.length === 0) {
      return this.createUnsafePrice("All price quotes are stale");
    }

    // Remove outliers if enabled
    const validQuotes = this.config.enableOutlierRejection
      ? this.removeOutliers(freshQuotes)
      : freshQuotes;

    if (validQuotes.length === 0) {
      return this.createUnsafePrice("All price quotes rejected as outliers");
    }

    // Check minimum sources requirement
    if (validQuotes.length < this.config.minSources) {
      return this.createUnsafePrice(
        `Insufficient price sources: ${validQuotes.length} < ${this.config.minSources}`
      );
    }

    // Calculate aggregated price
    let aggregatedPrice: number;
    let method: "median" | "weighted-average" | "single-source";

    if (validQuotes.length === 1) {
      aggregatedPrice = validQuotes[0].priceUsd;
      method = "single-source";
    } else if (validQuotes.length === 2) {
      // Use weighted average for 2 sources
      aggregatedPrice = this.weightedAverage(validQuotes);
      method = "weighted-average";
    } else {
      // Use median for 3+ sources (more robust against outliers)
      aggregatedPrice = this.median(validQuotes);
      method = "median";
    }

    // Calculate price deviation
    const deviation = this.calculateDeviation(validQuotes);

    // Calculate overall confidence
    const confidence = this.calculateConfidence(validQuotes, deviation);

    // Determine if price is safe to use
    const isSafe = this.isSafePrice(confidence, deviation, token);
    const unsafeReason = isSafe
      ? undefined
      : this.getUnsafeReason(confidence, deviation, token);

    return {
      priceUsd: aggregatedPrice,
      confidence,
      quotes: validQuotes,
      method,
      deviation,
      timestamp: new Date(),
      isSafe,
      unsafeReason,
    };
  }

  /**
   * Filter out stale price quotes
   */
  private filterStaleQuotes(quotes: PriceQuote[]): PriceQuote[] {
    const now = Date.now();
    const maxAgeMs = this.config.maxAgeSeconds * 1000;

    return quotes.filter(quote => {
      const age = now - quote.timestamp.getTime();
      return age <= maxAgeMs;
    });
  }

  /**
   * Remove statistical outliers from price quotes
   */
  private removeOutliers(quotes: PriceQuote[]): PriceQuote[] {
    if (quotes.length < 3) {
      return quotes; // Need at least 3 points for outlier detection
    }

    const prices = quotes.map(q => q.priceUsd);
    const median = this.calculateMedian(prices);
    const stdDev = this.calculateStdDev(prices);

    return quotes.filter(quote => {
      const zScore = Math.abs((quote.priceUsd - median) / stdDev);
      return zScore <= this.config.outlierThreshold;
    });
  }

  /**
   * Calculate weighted average of price quotes
   */
  private weightedAverage(quotes: PriceQuote[]): number {
    const totalWeight = quotes.reduce((sum, q) => sum + q.confidence, 0);
    const weightedSum = quotes.reduce((sum, q) => sum + q.priceUsd * q.confidence, 0);

    return weightedSum / totalWeight;
  }

  /**
   * Calculate median of price quotes
   */
  private median(quotes: PriceQuote[]): number {
    const prices = quotes.map(q => q.priceUsd).sort((a, b) => a - b);
    return this.calculateMedian(prices);
  }

  /**
   * Calculate median of numeric array
   */
  private calculateMedian(values: number[]): number {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    return sorted.length % 2 === 0
      ? (sorted[mid - 1] + sorted[mid]) / 2
      : sorted[mid];
  }

  /**
   * Calculate standard deviation
   */
  private calculateStdDev(values: number[]): number {
    const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
    const squaredDiffs = values.map(v => Math.pow(v - mean, 2));
    const variance = squaredDiffs.reduce((sum, v) => sum + v, 0) / values.length;

    return Math.sqrt(variance);
  }

  /**
   * Calculate price deviation across quotes (as percentage)
   */
  private calculateDeviation(quotes: PriceQuote[]): number {
    if (quotes.length < 2) return 0;

    const prices = quotes.map(q => q.priceUsd);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = prices.reduce((sum, p) => sum + p, 0) / prices.length;

    return ((max - min) / avg) * 100;
  }

  /**
   * Calculate overall confidence score
   */
  private calculateConfidence(quotes: PriceQuote[], deviation: number): number {
    // Average confidence across all quotes
    const avgConfidence = quotes.reduce((sum, q) => sum + q.confidence, 0) / quotes.length;

    // Penalty for high deviation
    const deviationPenalty = Math.max(0, 1 - (deviation / 10)); // 10% deviation = 0 penalty

    // Bonus for multiple sources
    const sourceBonus = Math.min(0.1, (quotes.length - 1) * 0.03);

    return Math.min(1, avgConfidence * deviationPenalty + sourceBonus);
  }

  /**
   * Check if price is safe to use for settlement
   */
  private isSafePrice(
    confidence: number,
    deviation: number,
    token: TokenRegistryEntry
  ): boolean {
    // Check minimum confidence
    if (confidence < this.config.minConfidence) {
      return false;
    }

    // Check maximum deviation
    const maxDeviation = Math.max(
      this.config.maxDeviation,
      token.slippage.oracleTolerance * 100
    );

    if (deviation > maxDeviation) {
      return false;
    }

    return true;
  }

  /**
   * Get reason why price is not safe
   */
  private getUnsafeReason(
    confidence: number,
    deviation: number,
    token: TokenRegistryEntry
  ): string {
    const reasons: string[] = [];

    if (confidence < this.config.minConfidence) {
      reasons.push(
        `Low confidence: ${(confidence * 100).toFixed(1)}% < ${(this.config.minConfidence * 100).toFixed(1)}%`
      );
    }

    const maxDeviation = Math.max(
      this.config.maxDeviation,
      token.slippage.oracleTolerance * 100
    );

    if (deviation > maxDeviation) {
      reasons.push(
        `High deviation: ${deviation.toFixed(2)}% > ${maxDeviation.toFixed(2)}%`
      );
    }

    return reasons.join("; ");
  }

  /**
   * Create an unsafe price result
   */
  private createUnsafePrice(reason: string): AggregatedPrice {
    return {
      priceUsd: 0,
      confidence: 0,
      quotes: [],
      method: "single-source",
      deviation: 0,
      timestamp: new Date(),
      isSafe: false,
      unsafeReason: reason,
    };
  }

  /**
   * Check if cached price is still valid
   */
  private isCacheValid(cached: AggregatedPrice): boolean {
    const age = Date.now() - cached.timestamp.getTime();
    return age < this.CACHE_TTL_MS && cached.isSafe;
  }

  /**
   * Clear price cache (useful for testing)
   */
  clearCache(): void {
    this.priceCache.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; entries: string[] } {
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
