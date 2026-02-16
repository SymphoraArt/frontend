/**
 * Token Registry
 *
 * Canonical registry for supported ERC-20 tokens with risk classifications,
 * payment bounds, price feeds, and supported chains.
 *
 * Safety-first design: tokens without registry entries are REJECTED.
 */

import { type ChainKey } from "../shared/payment-config";
import { log } from "./logger";

/**
 * Risk classification levels for tokens
 * - LOW: Established stablecoins with deep liquidity (e.g., USDC, DAI)
 * - MEDIUM: Major tokens with good liquidity (e.g., WETH, WBTC)
 * - HIGH: Volatile or lower liquidity tokens
 * - UNACCEPTABLE: Tokens that should be rejected
 */
export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "UNACCEPTABLE";

/**
 * Price feed sources for token valuation
 */
export type PriceFeedSource = "chainlink" | "uniswap-v3-twap" | "coingecko" | "manual";

/**
 * Audit status for token contracts
 */
export type AuditStatus = "audited" | "partially-audited" | "unaudited" | "unknown";

/**
 * Token metadata and risk parameters
 */
export interface TokenRegistryEntry {
  /** Token symbol (e.g., USDC, WETH) */
  symbol: string;

  /** Full token name */
  name: string;

  /** Decimals (6 for USDC, 18 for most ERC-20s) */
  decimals: number;

  /** Risk classification */
  riskLevel: RiskLevel;

  /** Audit status of token contract */
  auditStatus: AuditStatus;

  /** Supported chains and their token addresses */
  chains: Partial<Record<ChainKey, string>>;

  /** Price feed configuration */
  priceFeeds: {
    /** Primary price feed source */
    primary: PriceFeedSource;

    /** Fallback price feed sources (ordered by priority) */
    fallbacks: PriceFeedSource[];

    /** Chainlink price feed addresses (if applicable) */
    chainlink?: Partial<Record<ChainKey, string>>;

    /** Uniswap V3 pool addresses for TWAP (if applicable) */
    uniswapV3Pool?: Partial<Record<ChainKey, string>>;

    /** CoinGecko ID for price lookup */
    coingeckoId?: string;
  };

  /** Payment bounds in USD */
  paymentBounds: {
    /** Minimum payment amount in USD */
    minUsd: number;

    /** Maximum payment amount in USD */
    maxUsd: number;

    /** Maximum daily volume in USD per user */
    maxDailyVolumeUsd: number;
  };

  /** Slippage configuration */
  slippage: {
    /** Maximum allowed slippage percentage (e.g., 0.5 = 0.5%) */
    maxSlippagePercent: number;

    /** Slippage tolerance for price feed aggregation */
    oracleTolerance: number;
  };

  /** Liquidity requirements */
  liquidity: {
    /** Minimum liquidity in USD to accept payment */
    minLiquidityUsd: number;

    /** DEX pools to check for liquidity */
    dexPools?: string[];
  };

  /** Additional metadata */
  metadata?: {
    /** Official website */
    website?: string;

    /** Contract audit reports */
    auditReports?: string[];

    /** Token icon URL */
    iconUrl?: string;
  };
}

/**
 * Token Registry
 *
 * Maintains allowlist of supported tokens with risk parameters
 */
export class TokenRegistry {
  private tokens: Map<string, TokenRegistryEntry> = new Map();

  constructor() {
    this.initializeRegistry();
  }

  /**
   * Initialize registry with default supported tokens
   */
  private initializeRegistry(): void {
    // USDC - Native Circle USDC (lowest risk)
    this.registerToken({
      symbol: "USDC",
      name: "USD Coin",
      decimals: 6,
      riskLevel: "LOW",
      auditStatus: "audited",
      chains: {
        ethereum: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "ethereum-sepolia": "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238",
        base: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        "base-sepolia": "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
        unichain: "0x078d782b760474a361dda0af3839290b0ef57ad6",
        "unichain-sepolia": "0x5425837Ce827646D10C363eB89E8152bf8c2D921",
      },
      priceFeeds: {
        primary: "chainlink",
        fallbacks: ["manual"],
        chainlink: {
          ethereum: "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
          base: "0x7e860098F58bBFC8648a4311b374B1D669a2bc6B",
        },
        coingeckoId: "usd-coin",
      },
      paymentBounds: {
        minUsd: 0.01,
        maxUsd: 10000,
        maxDailyVolumeUsd: 50000,
      },
      slippage: {
        maxSlippagePercent: 0.1, // 0.1% - stablecoin should be very stable
        oracleTolerance: 0.005, // 0.5% oracle disagreement tolerance
      },
      liquidity: {
        minLiquidityUsd: 1000000, // $1M minimum liquidity
      },
      metadata: {
        website: "https://www.circle.com/en/usdc",
        iconUrl: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
      },
    });

    // USDC.e - Bridged USDC (slightly higher risk)
    this.registerToken({
      symbol: "USDC.e",
      name: "Bridged USD Coin",
      decimals: 6,
      riskLevel: "LOW",
      auditStatus: "audited",
      chains: {
        abstract: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
        "abstract-testnet": "0x4A8e0cd6c7Df0b54b6f3e3b3E7bDe9F4C8e5A3B2",
      },
      priceFeeds: {
        primary: "chainlink",
        fallbacks: ["manual"],
        coingeckoId: "usd-coin",
      },
      paymentBounds: {
        minUsd: 0.01,
        maxUsd: 5000,
        maxDailyVolumeUsd: 25000,
      },
      slippage: {
        maxSlippagePercent: 0.2, // 0.2% - slightly higher for bridged
        oracleTolerance: 0.01,
      },
      liquidity: {
        minLiquidityUsd: 500000, // $500K minimum liquidity
      },
    });

    // WETH - Wrapped Ethereum (medium risk, volatile)
    this.registerToken({
      symbol: "WETH",
      name: "Wrapped Ether",
      decimals: 18,
      riskLevel: "MEDIUM",
      auditStatus: "audited",
      chains: {
        ethereum: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        "ethereum-sepolia": "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
        base: "0x4200000000000000000000000000000000000006",
        "base-sepolia": "0x4200000000000000000000000000000000000006",
        abstract: "0x4200000000000000000000000000000000000006",
        "abstract-testnet": "0x4200000000000000000000000000000000000006",
      },
      priceFeeds: {
        primary: "chainlink",
        fallbacks: ["uniswap-v3-twap", "coingecko"],
        chainlink: {
          ethereum: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
          base: "0x71041dddad3595F9CEd3DcCFBe3D1F4b0a16Bb70",
        },
        coingeckoId: "weth",
      },
      paymentBounds: {
        minUsd: 1.0,
        maxUsd: 5000,
        maxDailyVolumeUsd: 20000,
      },
      slippage: {
        maxSlippagePercent: 1.0, // 1% - volatile asset
        oracleTolerance: 0.02, // 2% oracle disagreement tolerance
      },
      liquidity: {
        minLiquidityUsd: 5000000, // $5M minimum liquidity
      },
      metadata: {
        website: "https://weth.io",
        iconUrl: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      },
    });

    // DAI - Decentralized stablecoin (low-medium risk)
    this.registerToken({
      symbol: "DAI",
      name: "Dai Stablecoin",
      decimals: 18,
      riskLevel: "LOW",
      auditStatus: "audited",
      chains: {
        ethereum: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
        "ethereum-sepolia": "0x68194a729C2450ad26072b3D33ADaCbcef39D574",
        base: "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
      },
      priceFeeds: {
        primary: "chainlink",
        fallbacks: ["uniswap-v3-twap", "coingecko"],
        chainlink: {
          ethereum: "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
          base: "0x591e79239a7d3c8b9c5B1e3B5E6D2C1B4EBb7dF0",
        },
        coingeckoId: "dai",
      },
      paymentBounds: {
        minUsd: 0.01,
        maxUsd: 8000,
        maxDailyVolumeUsd: 40000,
      },
      slippage: {
        maxSlippagePercent: 0.3, // 0.3% - decentralized stablecoin
        oracleTolerance: 0.01,
      },
      liquidity: {
        minLiquidityUsd: 2000000, // $2M minimum liquidity
      },
      metadata: {
        website: "https://makerdao.com/en/",
        iconUrl: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png",
      },
    });

    log(`Token registry initialized with ${this.tokens.size} tokens`, 'token-registry');
  }

  /**
   * Register a new token in the registry
   */
  registerToken(entry: TokenRegistryEntry): void {
    if (entry.riskLevel === "UNACCEPTABLE") {
      throw new Error(`Cannot register UNACCEPTABLE token: ${entry.symbol}`);
    }

    this.tokens.set(entry.symbol.toUpperCase(), entry);
    log(`Registered token: ${entry.symbol} (${entry.name}) - Risk: ${entry.riskLevel}`, 'token-registry');
  }

  /**
   * Get token entry by symbol
   */
  getToken(symbol: string): TokenRegistryEntry | null {
    return this.tokens.get(symbol.toUpperCase()) || null;
  }

  /**
   * Check if token is supported
   */
  isSupported(symbol: string): boolean {
    return this.tokens.has(symbol.toUpperCase());
  }

  /**
   * Get token address for specific chain
   */
  getTokenAddress(symbol: string, chain: ChainKey): string | null {
    const token = this.getToken(symbol);
    if (!token) return null;

    return token.chains[chain] || null;
  }

  /**
   * Check if token is supported on specific chain
   */
  isSupportedOnChain(symbol: string, chain: ChainKey): boolean {
    const address = this.getTokenAddress(symbol, chain);
    return address !== null;
  }

  /**
   * Get all tokens with specific risk level
   */
  getTokensByRiskLevel(riskLevel: RiskLevel): TokenRegistryEntry[] {
    return Array.from(this.tokens.values()).filter(t => t.riskLevel === riskLevel);
  }

  /**
   * Get all supported tokens for a specific chain
   */
  getTokensForChain(chain: ChainKey): TokenRegistryEntry[] {
    return Array.from(this.tokens.values()).filter(t => !!t.chains[chain]);
  }

  /**
   * Validate payment amount against token bounds
   */
  validatePaymentAmount(symbol: string, amountUsd: number): {
    valid: boolean;
    reason?: string;
  } {
    const token = this.getToken(symbol);
    if (!token) {
      return { valid: false, reason: `Token ${symbol} not found in registry` };
    }

    if (token.riskLevel === "UNACCEPTABLE") {
      return { valid: false, reason: `Token ${symbol} is not acceptable for payments` };
    }

    const { minUsd, maxUsd } = token.paymentBounds;

    if (amountUsd < minUsd) {
      return { valid: false, reason: `Payment amount $${amountUsd} below minimum $${minUsd} for ${symbol}` };
    }

    if (amountUsd > maxUsd) {
      return { valid: false, reason: `Payment amount $${amountUsd} exceeds maximum $${maxUsd} for ${symbol}` };
    }

    return { valid: true };
  }

  /**
   * Get all registered tokens
   */
  getAllTokens(): TokenRegistryEntry[] {
    return Array.from(this.tokens.values());
  }

  /**
   * Get token count
   */
  getTokenCount(): number {
    return this.tokens.size;
  }
}

/**
 * Singleton token registry instance
 */
export const tokenRegistry = new TokenRegistry();
