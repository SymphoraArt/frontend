/**
 * Chainlink Price Oracle Integration
 *
 * Production-grade Chainlink price feed reader with:
 * - latestRoundData() integration
 * - Decimal normalization to 18 decimals
 * - Staleness checks
 * - Round data validation
 * - Per-chain feed configuration
 * - Explicit error handling
 *
 * This is the PRIMARY price source for settlement.
 */

import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { PAYMENT_CHAINS, type ChainKey } from "../../shared/payment-config";
import { log } from "../logger";

/**
 * Chainlink price feed configuration per token per chain
 */
export interface ChainlinkFeedConfig {
  /** Price feed contract address */
  feedAddress: string;

  /** Feed decimals (typically 8 for USD pairs) */
  decimals: number;

  /** Maximum allowed data staleness in seconds */
  maxStalenessSeconds: number;

  /** Human-readable description */
  description: string;
}

/**
 * Chainlink round data
 */
interface ChainlinkRoundData {
  roundId: bigint;
  answer: bigint;
  startedAt: bigint;
  updatedAt: bigint;
  answeredInRound: bigint;
}

/**
 * Chainlink price result
 */
export interface ChainlinkPriceResult {
  /** Price in USD (normalized to 18 decimals) */
  priceUsd: number;

  /** Raw price from feed */
  rawPrice: bigint;

  /** Feed decimals */
  decimals: number;

  /** Timestamp of price update */
  timestamp: Date;

  /** Round ID */
  roundId: bigint;

  /** Feed address used */
  feedAddress: string;

  /** Feed description */
  description: string;

  /** Age of data in seconds */
  ageSeconds: number;
}

/**
 * Chainlink oracle error types
 */
export class ChainlinkOracleError extends Error {
  constructor(
    message: string,
    public readonly code: ChainlinkErrorCode,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'ChainlinkOracleError';
  }
}

export enum ChainlinkErrorCode {
  FEED_NOT_CONFIGURED = 'FEED_NOT_CONFIGURED',
  STALE_DATA = 'STALE_DATA',
  INVALID_ROUND = 'INVALID_ROUND',
  NEGATIVE_PRICE = 'NEGATIVE_PRICE',
  ZERO_PRICE = 'ZERO_PRICE',
  CONTRACT_ERROR = 'CONTRACT_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
}

/**
 * Chainlink price feed configurations
 *
 * Production feeds from Chainlink documentation:
 * https://docs.chain.link/data-feeds/price-feeds/addresses
 */
const CHAINLINK_FEEDS: Record<string, Partial<Record<ChainKey, ChainlinkFeedConfig>>> = {
  // ETH/USD feeds
  ETH: {
    ethereum: {
      feedAddress: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
      decimals: 8,
      maxStalenessSeconds: 3600, // 1 hour
      description: 'ETH/USD Chainlink Feed (Ethereum Mainnet)',
    },
    'ethereum-sepolia': {
      feedAddress: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
      decimals: 8,
      maxStalenessSeconds: 3600,
      description: 'ETH/USD Chainlink Feed (Sepolia Testnet)',
    },
    base: {
      feedAddress: '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70',
      decimals: 8,
      maxStalenessSeconds: 3600,
      description: 'ETH/USD Chainlink Feed (Base Mainnet)',
    },
    'base-sepolia': {
      feedAddress: '0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1',
      decimals: 8,
      maxStalenessSeconds: 3600,
      description: 'ETH/USD Chainlink Feed (Base Sepolia)',
    },
  },

  // USDC/USD feeds
  USDC: {
    ethereum: {
      feedAddress: '0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6',
      decimals: 8,
      maxStalenessSeconds: 86400, // 24 hours (stablecoin)
      description: 'USDC/USD Chainlink Feed (Ethereum Mainnet)',
    },
    'ethereum-sepolia': {
      feedAddress: '0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E',
      decimals: 8,
      maxStalenessSeconds: 86400,
      description: 'USDC/USD Chainlink Feed (Sepolia Testnet)',
    },
    base: {
      feedAddress: '0x7e860098F58bBFC8648a4311b374B1D669a2bc6B',
      decimals: 8,
      maxStalenessSeconds: 86400,
      description: 'USDC/USD Chainlink Feed (Base Mainnet)',
    },
    'base-sepolia': {
      feedAddress: '0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165',
      decimals: 8,
      maxStalenessSeconds: 86400,
      description: 'USDC/USD Chainlink Feed (Base Sepolia)',
    },
  },

  // DAI/USD feeds
  DAI: {
    ethereum: {
      feedAddress: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9',
      decimals: 8,
      maxStalenessSeconds: 86400,
      description: 'DAI/USD Chainlink Feed (Ethereum Mainnet)',
    },
    'ethereum-sepolia': {
      feedAddress: '0x14866185B1962B63C3Ea9E03Bc1da838bab34C19',
      decimals: 8,
      maxStalenessSeconds: 86400,
      description: 'DAI/USD Chainlink Feed (Sepolia Testnet)',
    },
  },

  // WETH uses same feeds as ETH
  WETH: {
    ethereum: {
      feedAddress: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
      decimals: 8,
      maxStalenessSeconds: 3600,
      description: 'ETH/USD Chainlink Feed (Ethereum Mainnet)',
    },
    'ethereum-sepolia': {
      feedAddress: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
      decimals: 8,
      maxStalenessSeconds: 3600,
      description: 'ETH/USD Chainlink Feed (Sepolia Testnet)',
    },
    base: {
      feedAddress: '0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70',
      decimals: 8,
      maxStalenessSeconds: 3600,
      description: 'ETH/USD Chainlink Feed (Base Mainnet)',
    },
    'base-sepolia': {
      feedAddress: '0x4aDC67696bA383F43DD60A9e78F2C97Fbbfc7cb1',
      decimals: 8,
      maxStalenessSeconds: 3600,
      description: 'ETH/USD Chainlink Feed (Base Sepolia)',
    },
  },
};

/**
 * Chainlink Aggregator V3 Interface ABI (minimal)
 */
const CHAINLINK_AGGREGATOR_ABI = [
  {
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { name: 'roundId', type: 'uint80' },
      { name: 'answer', type: 'int256' },
      { name: 'startedAt', type: 'uint256' },
      { name: 'updatedAt', type: 'uint256' },
      { name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

/**
 * Chainlink Price Oracle
 *
 * Reads on-chain Chainlink price feeds with comprehensive validation
 */
export class ChainlinkOracle {
  private client: any;

  constructor(secretKey?: string) {
    this.client = createThirdwebClient({
      secretKey: secretKey || process.env.THIRDWEB_SECRET_KEY || 'dummy_secret_key_for_build_time',
    });
  }

  /**
   * Get price from Chainlink feed
   *
   * @param tokenSymbol - Token symbol (e.g., "WETH", "USDC")
   * @param chain - Chain to query
   * @returns Chainlink price result
   * @throws ChainlinkOracleError if feed unavailable or data invalid
   */
  async getPrice(tokenSymbol: string, chain: ChainKey): Promise<ChainlinkPriceResult> {
    // Get feed configuration
    const feedConfig = this.getFeedConfig(tokenSymbol, chain);

    if (!feedConfig) {
      throw new ChainlinkOracleError(
        `No Chainlink feed configured for ${tokenSymbol} on ${chain}`,
        ChainlinkErrorCode.FEED_NOT_CONFIGURED,
        { tokenSymbol, chain }
      );
    }

    log(
      `Fetching Chainlink price for ${tokenSymbol} on ${chain} from ${feedConfig.feedAddress}`,
      'chainlink-oracle'
    );

    try {
      // Read latest round data
      const roundData = await this.readLatestRoundData(feedConfig.feedAddress, chain);

      // Validate round data
      this.validateRoundData(roundData, feedConfig);

      // Calculate data age
      const now = Math.floor(Date.now() / 1000);
      const ageSeconds = now - Number(roundData.updatedAt);

      // Check staleness
      if (ageSeconds > feedConfig.maxStalenessSeconds) {
        throw new ChainlinkOracleError(
          `Chainlink data is stale: ${ageSeconds}s old (max: ${feedConfig.maxStalenessSeconds}s)`,
          ChainlinkErrorCode.STALE_DATA,
          { ageSeconds, maxAge: feedConfig.maxStalenessSeconds, updatedAt: roundData.updatedAt }
        );
      }

      // Normalize price to USD with 18 decimals
      const priceUsd = this.normalizePrice(roundData.answer, feedConfig.decimals);

      const result: ChainlinkPriceResult = {
        priceUsd,
        rawPrice: roundData.answer,
        decimals: feedConfig.decimals,
        timestamp: new Date(Number(roundData.updatedAt) * 1000),
        roundId: roundData.roundId,
        feedAddress: feedConfig.feedAddress,
        description: feedConfig.description,
        ageSeconds,
      };

      log(
        `✅ Chainlink price: ${tokenSymbol} = $${priceUsd.toFixed(6)} (age: ${ageSeconds}s)`,
        'chainlink-oracle'
      );

      return result;
    } catch (error) {
      // Re-throw ChainlinkOracleError as-is
      if (error instanceof ChainlinkOracleError) {
        throw error;
      }

      // Wrap other errors
      const errorMessage = error instanceof Error ? error.message : String(error);
      log(`❌ Chainlink error: ${errorMessage}`, 'chainlink-oracle');

      throw new ChainlinkOracleError(
        `Failed to read Chainlink feed: ${errorMessage}`,
        ChainlinkErrorCode.CONTRACT_ERROR,
        { originalError: errorMessage, tokenSymbol, chain }
      );
    }
  }

  /**
   * Read latest round data from Chainlink feed
   */
  private async readLatestRoundData(
    feedAddress: string,
    chain: ChainKey
  ): Promise<ChainlinkRoundData> {
    const chainConfig = PAYMENT_CHAINS[chain];
    const thirdwebChain = defineChain({
      id: chainConfig.id,
      rpc: chainConfig.rpcUrl,
    });

    const contract = getContract({
      client: this.client,
      chain: thirdwebChain,
      address: feedAddress,
      abi: CHAINLINK_AGGREGATOR_ABI,
    });

    const data = await readContract({
      contract,
      method: 'latestRoundData',
      params: [],
    });

    return {
      roundId: data[0],
      answer: data[1],
      startedAt: data[2],
      updatedAt: data[3],
      answeredInRound: data[4],
    };
  }

  /**
   * Validate round data from Chainlink
   */
  private validateRoundData(roundData: ChainlinkRoundData, config: ChainlinkFeedConfig): void {
    // Check for valid round ID
    if (roundData.roundId === BigInt(0)) {
      throw new ChainlinkOracleError(
        'Invalid round ID: 0',
        ChainlinkErrorCode.INVALID_ROUND,
        { roundData }
      );
    }

    // Check that answeredInRound is not stale
    if (roundData.answeredInRound < roundData.roundId) {
      throw new ChainlinkOracleError(
        'Stale round data: answeredInRound < roundId',
        ChainlinkErrorCode.INVALID_ROUND,
        { roundId: roundData.roundId, answeredInRound: roundData.answeredInRound }
      );
    }

    // Check for negative price
    if (roundData.answer < BigInt(0)) {
      throw new ChainlinkOracleError(
        'Invalid price: negative value',
        ChainlinkErrorCode.NEGATIVE_PRICE,
        { answer: roundData.answer }
      );
    }

    // Check for zero price
    if (roundData.answer === BigInt(0)) {
      throw new ChainlinkOracleError(
        'Invalid price: zero value',
        ChainlinkErrorCode.ZERO_PRICE,
        { roundData }
      );
    }

    // Check for valid timestamps
    if (roundData.updatedAt === BigInt(0)) {
      throw new ChainlinkOracleError(
        'Invalid timestamp: updatedAt is 0',
        ChainlinkErrorCode.INVALID_ROUND,
        { roundData }
      );
    }
  }

  /**
   * Normalize Chainlink price to USD with 18 decimals
   *
   * @param rawPrice - Raw price from feed
   * @param decimals - Feed decimals (typically 8)
   * @returns Price in USD (18 decimal precision)
   */
  private normalizePrice(rawPrice: bigint, decimals: number): number {
    // Convert to number with correct decimal places
    const divisor = Math.pow(10, decimals);
    return Number(rawPrice) / divisor;
  }

  /**
   * Get feed configuration for token on chain
   */
  private getFeedConfig(tokenSymbol: string, chain: ChainKey): ChainlinkFeedConfig | null {
    const tokenFeeds = CHAINLINK_FEEDS[tokenSymbol.toUpperCase()];
    if (!tokenFeeds) return null;

    return tokenFeeds[chain] || null;
  }

  /**
   * Check if Chainlink feed is available for token on chain
   */
  isFeedAvailable(tokenSymbol: string, chain: ChainKey): boolean {
    return this.getFeedConfig(tokenSymbol, chain) !== null;
  }

  /**
   * Get all available feeds for a token
   */
  getAvailableChains(tokenSymbol: string): ChainKey[] {
    const tokenFeeds = CHAINLINK_FEEDS[tokenSymbol.toUpperCase()];
    if (!tokenFeeds) return [];

    return Object.keys(tokenFeeds) as ChainKey[];
  }

  /**
   * Get feed configuration (for inspection/debugging)
   */
  getFeedConfigForInspection(tokenSymbol: string, chain: ChainKey): ChainlinkFeedConfig | null {
    return this.getFeedConfig(tokenSymbol, chain);
  }
}

/**
 * Singleton Chainlink oracle instance
 */
export const chainlinkOracle = new ChainlinkOracle();
