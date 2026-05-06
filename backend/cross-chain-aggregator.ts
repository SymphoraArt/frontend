/**
 * Cross-Chain Payment Aggregator
 *
 * Sits above X402PaymentEngine to provide:
 * - Unified balance aggregation across chains
 * - Intelligent chain selection per payment
 * - Automatic routing and fallback
 * - Cross-chain failure recovery
 *
 * Preserves backward compatibility - existing USDC flows work unchanged.
 */

import { type ChainKey } from "../shared/payment-config";
import { X402PaymentEngine, type PaymentRequest, type PaymentResult } from "./x402-engine";
import { chainSelector, type ChainSelectionCriteria } from "./chain-selector";
import { tokenRegistry } from "./token-registry";
import { log } from "./logger";

/**
 * Unified payment request across chains
 */
export interface UnifiedPaymentRequest {
  /** Resource URL */
  resourceUrl: string;

  /** HTTP method */
  method: string;

  /** Payment header (if already provided) */
  paymentHeader?: string;

  /** Price in USD (e.g., "$0.10") */
  price: string;

  /** Payment description */
  description: string;

  /** Payment category */
  category?: string;

  /** Server wallet address */
  payToAddress: string;

  /** Token symbol (defaults to USDC) */
  tokenSymbol?: string;

  /** User's preferred chain (optional) */
  preferredChain?: ChainKey;

  /** User's wallet address (for affinity tracking) */
  userAddress?: string;

  /** Whether to prioritize speed over cost */
  prioritizeSpeed?: boolean;

  /** Whether to use testnet chains */
  useTestnet?: boolean;
}

/**
 * Payment route with chain selection reasoning
 */
export interface PaymentRoute {
  /** Selected chain */
  chain: ChainKey;

  /** Token to use */
  tokenSymbol: string;

  /** Token address on selected chain */
  tokenAddress: string;

  /** Estimated gas cost in USD */
  estimatedGasCostUsd: number;

  /** Estimated confirmation time in seconds */
  estimatedConfirmationSeconds: number;

  /** Selection reasoning */
  reasoning: string;

  /** Alternative chains (fallbacks) */
  alternatives: Array<{
    chain: ChainKey;
    score: number;
  }>;

  /** Timestamp of route calculation */
  timestamp: Date;
}

/**
 * Unified balance across all chains
 */
export interface UnifiedBalance {
  /** Total balance in USD across all chains */
  totalBalanceUsd: number;

  /** Breakdown by chain */
  breakdownByChain: Record<ChainKey, ChainBalance>;

  /** Timestamp of balance calculation */
  timestamp: Date;
}

/**
 * Balance for a specific chain
 */
export interface ChainBalance {
  /** Chain key */
  chain: ChainKey;

  /** Token balances on this chain */
  tokens: Array<{
    symbol: string;
    address: string;
    balance: string; // Raw balance (with decimals)
    balanceUsd: number;
    decimals: number;
  }>;

  /** Total balance in USD for this chain */
  totalUsd: number;

  /** Pending/locked funds */
  pendingUsd: number;

  /** Available balance (total - pending) */
  availableUsd: number;
}

/**
 * Recovery result after cross-chain failure
 */
export interface RecoveryResult {
  /** Whether recovery was successful */
  success: boolean;

  /** Recovery method used */
  method: "retry" | "fallback-chain" | "fallback-token" | "manual";

  /** Original chain that failed */
  originalChain: ChainKey;

  /** Chain used for recovery (if different) */
  recoveryChain?: ChainKey;

  /** New payment result (if recovery succeeded) */
  paymentResult?: PaymentResult;

  /** Recovery attempts made */
  attempts: number;

  /** Reason if recovery failed */
  failureReason?: string;
}

/**
 * Cross-Chain Payment Aggregator Configuration
 */
interface AggregatorConfig {
  /** Enable automatic fallback to other chains */
  enableFallback: boolean;

  /** Maximum fallback attempts */
  maxFallbackAttempts: number;

  /** Enable balance aggregation */
  enableBalanceAggregation: boolean;

  /** Enable analytics emission */
  enableAnalytics: boolean;
}

/**
 * Default aggregator configuration
 */
const DEFAULT_AGGREGATOR_CONFIG: AggregatorConfig = {
  enableFallback: true,
  maxFallbackAttempts: 3,
  enableBalanceAggregation: true,
  enableAnalytics: true,
};

/**
 * Cross-Chain Payment Aggregator
 *
 * Orchestrates payments across multiple chains with intelligent routing
 */
export class CrossChainPaymentAggregator {
  private config: AggregatorConfig;
  private engine: X402PaymentEngine;
  private balanceCache: Map<string, UnifiedBalance> = new Map();
  private readonly BALANCE_CACHE_TTL_MS = 30000; // 30 seconds

  constructor(
    engine: X402PaymentEngine = new X402PaymentEngine(),
    config: Partial<AggregatorConfig> = {}
  ) {
    this.engine = engine;
    this.config = { ...DEFAULT_AGGREGATOR_CONFIG, ...config };

    log('Cross-chain payment aggregator initialized', 'aggregator');
  }

  /**
   * Get unified balance across all chains
   *
   * @param userId - User identifier (wallet address)
   * @returns Unified balance across all chains
   */
  async getUnifiedBalance(userId: string): Promise<UnifiedBalance> {
    if (!this.config.enableBalanceAggregation) {
      throw new Error("Balance aggregation is disabled");
    }

    // Check cache
    const cached = this.balanceCache.get(userId);
    if (cached && this.isBalanceCacheValid(cached)) {
      log(`Balance cache hit for user ${userId}`, 'aggregator');
      return cached;
    }

    log(`Fetching cross-chain balances for ${userId}`, 'aggregator');

    // Import dependencies
    const { createThirdwebClient, getContract, readContract } = await import('thirdweb');
    const { defineChain } = await import('thirdweb/chains');
    const { PAYMENT_CHAINS } = await import('../shared/payment-config');

    const client = createThirdwebClient({
      secretKey: process.env.THIRDWEB_SECRET_KEY || 'dummy_secret_key_for_build_time',
    });

    const ERC20_ABI = [
      {
        inputs: [{ name: 'account', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
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

    const breakdownByChain: Partial<Record<ChainKey, ChainBalance>> = {};
    let totalBalanceUsd = 0;

    // Fetch balances from all chains in parallel
    const chainKeys = Object.keys(PAYMENT_CHAINS) as ChainKey[];
    const balancePromises = chainKeys.map(async (chainKey) => {
      try {
        const chainConfig = PAYMENT_CHAINS[chainKey];
        const thirdwebChain = defineChain({
          id: chainConfig.id,
          rpc: chainConfig.rpcUrl,
        });

        const contract = getContract({
          client,
          chain: thirdwebChain,
          address: chainConfig.usdc,
          abi: ERC20_ABI,
        });

        // Fetch balance and decimals in parallel
        const [balance, decimals] = await Promise.all([
          readContract({
            contract,
            method: 'balanceOf',
            params: [userId as `0x${string}`],
          }),
          readContract({
            contract,
            method: 'decimals',
            params: [],
          }),
        ]);

        const balanceUsd = Number(balance) / Math.pow(10, Number(decimals));

        const chainBalance: ChainBalance = {
          chain: chainKey,
          tokens: [
            {
              symbol: 'USDC',
              address: chainConfig.usdc,
              balance: balance.toString(),
              balanceUsd,
              decimals: Number(decimals),
            },
          ],
          totalUsd: balanceUsd,
          pendingUsd: 0, // Would query pending transactions
          availableUsd: balanceUsd,
        };

        return { chainKey, chainBalance, balanceUsd };
      } catch (error) {
        log(`Failed to fetch balance on ${chainKey}: ${error}`, 'aggregator');
        return null;
      }
    });

    const results = await Promise.all(balancePromises);

    // Aggregate results
    for (const result of results) {
      if (result) {
        breakdownByChain[result.chainKey] = result.chainBalance;
        totalBalanceUsd += result.balanceUsd;
      }
    }

    const balance: UnifiedBalance = {
      totalBalanceUsd,
      breakdownByChain: breakdownByChain as Record<ChainKey, ChainBalance>,
      timestamp: new Date(),
    };

    // Cache result
    this.balanceCache.set(userId, balance);

    log(`Total balance for ${userId}: $${totalBalanceUsd.toFixed(2)} across ${Object.keys(breakdownByChain).length} chains`, 'aggregator');

    return balance;
  }

  /**
   * Select optimal chain for payment
   *
   * @param request - Unified payment request
   * @returns Optimal chain selection
   */
  async selectOptimalChain(request: UnifiedPaymentRequest): Promise<ChainKey> {
    const route = await this.routePayment(request);
    return route.chain;
  }

  /**
   * Route payment with intelligent chain selection
   *
   * @param request - Unified payment request
   * @returns Payment route with reasoning
   */
  async routePayment(request: UnifiedPaymentRequest): Promise<PaymentRoute> {
    const tokenSymbol = request.tokenSymbol || "USDC";
    const priceUsd = parseFloat(request.price.replace('$', ''));

    // Build selection criteria
    const criteria: ChainSelectionCriteria = {
      amountUsd: priceUsd,
      tokenSymbol,
      preferredChain: request.preferredChain,
      userAddress: request.userAddress,
      prioritizeSpeed: request.prioritizeSpeed,
      useTestnet: request.useTestnet,
    };

    // Select optimal chain
    const selection = await chainSelector.selectChain(criteria);

    // Get token address on selected chain
    const tokenAddress = tokenRegistry.getTokenAddress(tokenSymbol, selection.optimal);

    if (!tokenAddress) {
      throw new Error(`Token ${tokenSymbol} not supported on ${selection.optimal}`);
    }

    // Build route
    const route: PaymentRoute = {
      chain: selection.optimal,
      tokenSymbol,
      tokenAddress,
      estimatedGasCostUsd: selection.rankings[0].estimatedGasCostUsd,
      estimatedConfirmationSeconds: selection.rankings[0].estimatedConfirmationSeconds,
      reasoning: selection.reasoning,
      alternatives: selection.rankings.slice(1, 4).map(rank => ({
        chain: rank.chain,
        score: rank.score,
      })),
      timestamp: new Date(),
    };

    log(
      `Routed payment to ${route.chain}: ${tokenSymbol} (${route.reasoning})`,
      'aggregator'
    );

    return route;
  }

  /**
   * Execute payment with automatic routing and fallback
   *
   * This is the main entry point for cross-chain payments.
   * It maintains backward compatibility with existing USDC flows.
   *
   * @param request - Unified payment request
   * @returns Payment result
   */
  async executePayment(request: UnifiedPaymentRequest): Promise<PaymentResult> {
    // Route payment to optimal chain
    const route = await this.routePayment(request);

    // Convert to engine-specific payment request
    const engineRequest: PaymentRequest = {
      resourceUrl: request.resourceUrl,
      method: request.method,
      paymentHeader: request.paymentHeader,
      chainKey: route.chain,
      price: request.price,
      description: request.description,
      payToAddress: request.payToAddress,
      category: request.category,
    };

    // Execute payment on selected chain
    const result = await this.engine.settle(engineRequest);

    // Record chain usage for affinity tracking
    if (request.userAddress && result.success) {
      chainSelector.recordChainUsage(request.userAddress, route.chain);
    }

    // Handle failure with fallback if enabled
    if (!result.success && this.config.enableFallback) {
      const recovery = await this.handleCrossChainFailure(result, request, route);

      if (recovery.success && recovery.paymentResult) {
        return recovery.paymentResult;
      }
    }

    // Emit analytics if enabled
    if (this.config.enableAnalytics) {
      this.emitAnalytics(request, route, result);
    }

    return result;
  }

  /**
   * Handle payment failure with cross-chain recovery
   *
   * @param result - Failed payment result
   * @param request - Original payment request
   * @param route - Original route
   * @returns Recovery result
   */
  async handleCrossChainFailure(
    result: PaymentResult,
    request: UnifiedPaymentRequest,
    route: PaymentRoute
  ): Promise<RecoveryResult> {
    log(
      `Attempting recovery for failed payment on ${route.chain}: ${result.error}`,
      'aggregator'
    );

    let attempts = 0;
    const maxAttempts = this.config.maxFallbackAttempts;

    // Try fallback chains in order of score
    for (const alternative of route.alternatives) {
      if (attempts >= maxAttempts) {
        break;
      }

      attempts++;

      log(
        `Fallback attempt ${attempts}/${maxAttempts}: trying ${alternative.chain}`,
        'aggregator'
      );

      // Get token address on fallback chain
      const tokenAddress = tokenRegistry.getTokenAddress(
        route.tokenSymbol,
        alternative.chain
      );

      if (!tokenAddress) {
        log(`Token not supported on fallback chain ${alternative.chain}, skipping`, 'aggregator');
        continue;
      }

      // Convert to engine request for fallback chain
      const fallbackRequest: PaymentRequest = {
        resourceUrl: request.resourceUrl,
        method: request.method,
        paymentHeader: request.paymentHeader,
        chainKey: alternative.chain,
        price: request.price,
        description: request.description,
        payToAddress: request.payToAddress,
        category: request.category,
      };

      // Attempt payment on fallback chain
      const fallbackResult = await this.engine.settle(fallbackRequest);

      if (fallbackResult.success) {
        log(`Recovery successful on ${alternative.chain}`, 'aggregator');

        // Record successful fallback
        if (request.userAddress) {
          chainSelector.recordChainUsage(request.userAddress, alternative.chain);
        }

        return {
          success: true,
          method: "fallback-chain",
          originalChain: route.chain,
          recoveryChain: alternative.chain,
          paymentResult: fallbackResult,
          attempts,
        };
      }

      log(`Fallback on ${alternative.chain} failed: ${fallbackResult.error}`, 'aggregator');
    }

    // All fallback attempts exhausted
    log(`Recovery failed after ${attempts} attempts`, 'aggregator');

    return {
      success: false,
      method: "fallback-chain",
      originalChain: route.chain,
      attempts,
      failureReason: `All fallback chains failed after ${attempts} attempts`,
    };
  }

  /**
   * Emit payment analytics
   */
  private emitAnalytics(
    request: UnifiedPaymentRequest,
    route: PaymentRoute,
    result: PaymentResult
  ): void {
    const analyticsData = {
      timestamp: new Date().toISOString(),
      success: result.status,
      chain: route.chain,
      tokenSymbol: route.tokenSymbol,
      priceUsd: parseFloat(request.price.replace('$', '')),
      gasCostUsd: route.estimatedGasCostUsd,
      confirmationSeconds: route.estimatedConfirmationSeconds,
      category: request.category,
      userAddress: request.userAddress,
      txHash: result.metadata?.txHash,
      error: result.error,
    };

    // Log to console (in production, send to analytics service)
    log(
      `📊 Payment Analytics: ${result.success ? 'SUCCESS' : 'FAILED'} | ${route.chain} | ${route.tokenSymbol} | $${analyticsData.priceUsd}`,
      'aggregator'
    );

    // In production, you would send this to:
    // - Google Analytics / Mixpanel / Amplitude
    // - Custom metrics backend
    // - Blockchain indexer
    // - MongoDB for historical analysis

    // Example: Send to custom analytics endpoint
    if (process.env.ANALYTICS_ENDPOINT) {
      fetch(process.env.ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(analyticsData),
      }).catch((error) => {
        log(`Failed to send analytics: ${error}`, 'aggregator');
      });
    }
  }

  /**
   * Check if balance cache is valid
   */
  private isBalanceCacheValid(balance: UnifiedBalance): boolean {
    const age = Date.now() - balance.timestamp.getTime();
    return age < this.BALANCE_CACHE_TTL_MS;
  }

  /**
   * Clear balance cache
   */
  clearBalanceCache(): void {
    this.balanceCache.clear();
    log('Balance cache cleared', 'aggregator');
  }

  /**
   * Get underlying payment engine (for backward compatibility)
   */
  getEngine(): X402PaymentEngine {
    return this.engine;
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<AggregatorConfig>): void {
    this.config = { ...this.config, ...config };
    log('Aggregator configuration updated', 'aggregator');
  }

  /**
   * Get current configuration
   */
  getConfig(): AggregatorConfig {
    return { ...this.config };
  }
}

/**
 * Singleton cross-chain aggregator instance
 * Uses the default payment engine
 */
export const crossChainAggregator = new CrossChainPaymentAggregator();
