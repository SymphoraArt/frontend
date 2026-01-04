/**
 * Deterministic Oracle Resolver
 *
 * Production-grade oracle resolution with:
 * - Chainlink primary, Uniswap TWAP fallback
 * - Fail-closed architecture (reject if both fail)
 * - Confidence scoring
 * - Explainable decision metadata
 * - Per-token safety rules
 *
 * This is the SINGLE SOURCE OF TRUTH for settlement pricing.
 */

import { type ChainKey } from "../../shared/payment-config";
import { chainlinkOracle, type ChainlinkPriceResult, ChainlinkOracleError } from "./chainlink-oracle";
import { uniswapTwapOracle, type TwapPriceResult, UniswapOracleError } from "./uniswap-twap-oracle";
import { log } from "../app";

/**
 * Price source used for resolution
 */
export type PriceSource = "CHAINLINK" | "UNISWAP_TWAP" | "MANUAL";

/**
 * Resolved price with full metadata
 */
export interface ResolvedPrice {
  /** Price in USD */
  priceUsd: number;

  /** Source used for price */
  source: PriceSource;

  /** Confidence score (0-1) */
  confidence: number;

  /** Whether price is safe for settlement */
  isSafe: boolean;

  /** Reason if price is not safe */
  unsafeReason?: string;

  /** Timestamp of resolution */
  timestamp: Date;

  /** Explanation of decision process */
  explanation: string[];

  /** Source-specific metadata */
  metadata: {
    chainlink?: ChainlinkPriceResult;
    uniswapTwap?: TwapPriceResult;
    manual?: {
      price: number;
      reason: string;
    };
  };
}

/**
 * Oracle resolution configuration
 */
export interface OracleResolverConfig {
  /** Enable Chainlink oracle */
  enableChainlink: boolean;

  /** Enable Uniswap TWAP oracle */
  enableUniswapTwap: boolean;

  /** Minimum confidence for settlement (0-1) */
  minConfidence: number;

  /** Stablecoin symbols (use manual pricing) */
  stablecoins: string[];

  /** Manual stablecoin price */
  stablecoinPrice: number;

  /** Confidence for manual stablecoin pricing */
  stablecoinConfidence: number;
}

/**
 * Default oracle resolver configuration
 */
const DEFAULT_RESOLVER_CONFIG: OracleResolverConfig = {
  enableChainlink: true,
  enableUniswapTwap: true,
  minConfidence: 0.75, // 75% minimum confidence
  stablecoins: ['USDC', 'USDC.e', 'DAI', 'USDT'],
  stablecoinPrice: 1.0,
  stablecoinConfidence: 0.98, // High confidence for stablecoins
};

/**
 * Oracle resolution error
 */
export class OracleResolutionError extends Error {
  constructor(
    message: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'OracleResolutionError';
  }
}

/**
 * Deterministic Oracle Resolver
 *
 * Resolves token prices using primary/fallback oracle strategy
 */
export class OracleResolver {
  private config: OracleResolverConfig;

  constructor(config: Partial<OracleResolverConfig> = {}) {
    this.config = { ...DEFAULT_RESOLVER_CONFIG, ...config };

    log('Oracle resolver initialized', 'oracle-resolver');
    log(`  Chainlink: ${this.config.enableChainlink}`, 'oracle-resolver');
    log(`  Uniswap TWAP: ${this.config.enableUniswapTwap}`, 'oracle-resolver');
    log(`  Min confidence: ${this.config.minConfidence * 100}%`, 'oracle-resolver');
  }

  /**
   * Resolve token price for settlement
   *
   * Resolution strategy:
   * 1. Check if token is stablecoin → use manual pricing
   * 2. Try Chainlink (primary)
   * 3. If Chainlink fails, try Uniswap TWAP (fallback)
   * 4. If both fail, reject payment
   *
   * @param tokenSymbol - Token symbol
   * @param chain - Chain to query
   * @returns Resolved price with metadata
   * @throws OracleResolutionError if unable to resolve safe price
   */
  async resolvePrice(tokenSymbol: string, chain: ChainKey): Promise<ResolvedPrice> {
    const explanation: string[] = [];

    log(`Resolving price for ${tokenSymbol} on ${chain}`, 'oracle-resolver');

    // Step 1: Check if stablecoin
    if (this.isStablecoin(tokenSymbol)) {
      return this.resolveStablecoinPrice(tokenSymbol, explanation);
    }

    // Step 2: Try Chainlink (primary)
    if (this.config.enableChainlink) {
      const chainlinkResult = await this.tryChainlink(tokenSymbol, chain, explanation);

      if (chainlinkResult) {
        return chainlinkResult;
      }
    } else {
      explanation.push('Chainlink disabled in configuration');
    }

    // Step 3: Try Uniswap TWAP (fallback)
    if (this.config.enableUniswapTwap) {
      const twapResult = await this.tryUniswapTwap(tokenSymbol, chain, explanation);

      if (twapResult) {
        return twapResult;
      }
    } else {
      explanation.push('Uniswap TWAP disabled in configuration');
    }

    // Step 4: Both failed - reject payment
    const errorMessage = `Unable to resolve price for ${tokenSymbol} on ${chain}: all oracles failed`;
    explanation.push('❌ PAYMENT REJECTED: No oracle available');

    log(`❌ ${errorMessage}`, 'oracle-resolver');
    log(`   Explanation: ${explanation.join(' → ')}`, 'oracle-resolver');

    throw new OracleResolutionError(errorMessage, {
      tokenSymbol,
      chain,
      explanation,
    });
  }

  /**
   * Try to get price from Chainlink
   */
  private async tryChainlink(
    tokenSymbol: string,
    chain: ChainKey,
    explanation: string[]
  ): Promise<ResolvedPrice | null> {
    try {
      explanation.push('Attempting Chainlink (primary)');

      const chainlinkPrice = await chainlinkOracle.getPrice(tokenSymbol, chain);

      // Calculate confidence based on data age
      const confidence = this.calculateChainlinkConfidence(chainlinkPrice);

      // Check if confidence meets minimum threshold
      if (confidence < this.config.minConfidence) {
        explanation.push(
          `Chainlink confidence ${(confidence * 100).toFixed(1)}% < ${(this.config.minConfidence * 100).toFixed(1)}%`
        );
        return null;
      }

      explanation.push(
        `✅ Chainlink success: $${chainlinkPrice.priceUsd.toFixed(6)} (confidence: ${(confidence * 100).toFixed(1)}%)`
      );

      log(
        `✅ Resolved via Chainlink: ${tokenSymbol} = $${chainlinkPrice.priceUsd.toFixed(6)}`,
        'oracle-resolver'
      );

      return {
        priceUsd: chainlinkPrice.priceUsd,
        source: 'CHAINLINK',
        confidence,
        isSafe: true,
        timestamp: new Date(),
        explanation,
        metadata: {
          chainlink: chainlinkPrice,
        },
      };
    } catch (error) {
      if (error instanceof ChainlinkOracleError) {
        explanation.push(`Chainlink failed: ${error.code}`);
        log(`Chainlink failed: ${error.code} - ${error.message}`, 'oracle-resolver');
      } else {
        const errorMessage = error instanceof Error ? error.message : String(error);
        explanation.push(`Chainlink error: ${errorMessage}`);
        log(`Chainlink error: ${errorMessage}`, 'oracle-resolver');
      }

      return null;
    }
  }

  /**
   * Try to get price from Uniswap TWAP
   */
  private async tryUniswapTwap(
    tokenSymbol: string,
    chain: ChainKey,
    explanation: string[]
  ): Promise<ResolvedPrice | null> {
    try {
      explanation.push('Attempting Uniswap TWAP (fallback)');

      const twapPrice = await uniswapTwapOracle.getPrice(tokenSymbol, chain);

      // Calculate confidence based on deviation and liquidity
      const confidence = this.calculateTwapConfidence(twapPrice);

      // Check if confidence meets minimum threshold
      if (confidence < this.config.minConfidence) {
        explanation.push(
          `TWAP confidence ${(confidence * 100).toFixed(1)}% < ${(this.config.minConfidence * 100).toFixed(1)}%`
        );
        return null;
      }

      explanation.push(
        `✅ TWAP success: $${twapPrice.priceUsd.toFixed(6)} (confidence: ${(confidence * 100).toFixed(1)}%)`
      );

      log(
        `✅ Resolved via TWAP: ${tokenSymbol} = $${twapPrice.priceUsd.toFixed(6)}`,
        'oracle-resolver'
      );

      return {
        priceUsd: twapPrice.priceUsd,
        source: 'UNISWAP_TWAP',
        confidence,
        isSafe: true,
        timestamp: new Date(),
        explanation,
        metadata: {
          uniswapTwap: twapPrice,
        },
      };
    } catch (error) {
      if (error instanceof UniswapOracleError) {
        explanation.push(`TWAP failed: ${error.code}`);
        log(`TWAP failed: ${error.code} - ${error.message}`, 'oracle-resolver');
      } else {
        const errorMessage = error instanceof Error ? error.message : String(error);
        explanation.push(`TWAP error: ${errorMessage}`);
        log(`TWAP error: ${errorMessage}`, 'oracle-resolver');
      }

      return null;
    }
  }

  /**
   * Resolve stablecoin price using manual pricing
   */
  private resolveStablecoinPrice(tokenSymbol: string, explanation: string[]): ResolvedPrice {
    explanation.push(`Stablecoin detected: ${tokenSymbol}`);
    explanation.push(`✅ Manual pricing: $${this.config.stablecoinPrice.toFixed(2)}`);

    log(
      `✅ Resolved via manual: ${tokenSymbol} = $${this.config.stablecoinPrice.toFixed(2)}`,
      'oracle-resolver'
    );

    return {
      priceUsd: this.config.stablecoinPrice,
      source: 'MANUAL',
      confidence: this.config.stablecoinConfidence,
      isSafe: true,
      timestamp: new Date(),
      explanation,
      metadata: {
        manual: {
          price: this.config.stablecoinPrice,
          reason: 'Stablecoin with known peg',
        },
      },
    };
  }

  /**
   * Calculate confidence score for Chainlink price
   *
   * Based on data age - fresher data = higher confidence
   */
  private calculateChainlinkConfidence(price: ChainlinkPriceResult): number {
    // Base confidence for Chainlink
    let confidence = 0.95;

    // Reduce confidence based on age
    const ageMinutes = price.ageSeconds / 60;

    if (ageMinutes > 30) {
      confidence -= 0.1; // -10% for data > 30 minutes old
    }

    if (ageMinutes > 60) {
      confidence -= 0.1; // Additional -10% for data > 1 hour old
    }

    return Math.max(0, confidence);
  }

  /**
   * Calculate confidence score for TWAP price
   *
   * Based on deviation from spot and liquidity
   */
  private calculateTwapConfidence(price: TwapPriceResult): number {
    // Base confidence for TWAP (lower than Chainlink)
    let confidence = 0.85;

    // Reduce confidence based on deviation from spot
    const absDeviation = Math.abs(price.deviationFromSpot);

    if (absDeviation > 1.0) {
      confidence -= 0.05; // -5% for >1% deviation
    }

    if (absDeviation > 2.0) {
      confidence -= 0.05; // Additional -5% for >2% deviation
    }

    if (absDeviation > 3.0) {
      confidence -= 0.1; // Additional -10% for >3% deviation
    }

    // Note: In production, would also factor in liquidity
    // For now, liquidity is validated in the TWAP oracle

    return Math.max(0, confidence);
  }

  /**
   * Check if token is a stablecoin
   */
  private isStablecoin(tokenSymbol: string): boolean {
    return this.config.stablecoins.includes(tokenSymbol.toUpperCase());
  }

  /**
   * Check oracle availability for token on chain
   */
  async checkAvailability(tokenSymbol: string, chain: ChainKey): Promise<{
    chainlinkAvailable: boolean;
    uniswapTwapAvailable: boolean;
    anyAvailable: boolean;
  }> {
    // Stablecoins always available via manual pricing
    if (this.isStablecoin(tokenSymbol)) {
      return {
        chainlinkAvailable: true, // Considered available (manual pricing)
        uniswapTwapAvailable: false,
        anyAvailable: true,
      };
    }

    const chainlinkAvailable = this.config.enableChainlink &&
      chainlinkOracle.isFeedAvailable(tokenSymbol, chain);

    const uniswapTwapAvailable = this.config.enableUniswapTwap &&
      uniswapTwapOracle.isPoolAvailable(tokenSymbol, chain);

    return {
      chainlinkAvailable,
      uniswapTwapAvailable,
      anyAvailable: chainlinkAvailable || uniswapTwapAvailable,
    };
  }

  /**
   * Get configuration
   */
  getConfig(): OracleResolverConfig {
    return { ...this.config };
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<OracleResolverConfig>): void {
    this.config = { ...this.config, ...config };
    log('Oracle resolver configuration updated', 'oracle-resolver');
  }
}

/**
 * Singleton oracle resolver instance
 */
export const oracleResolver = new OracleResolver();
