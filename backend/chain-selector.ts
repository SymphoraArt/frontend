/**
 * Intelligent Chain Selection
 *
 * Scoring-based chain selector that considers:
 * - Gas cost vs payment size
 * - Confirmation latency
 * - Network congestion
 * - Historical success rates
 * - User chain affinity
 *
 * Selection is explainable (returns reasoning metadata).
 */

import { PAYMENT_CHAINS, type ChainKey, getMainnetChains, getTestnetChains } from "../shared/payment-config";
import { tokenRegistry } from "./token-registry";
import { log } from "./logger";

/**
 * Chain selection criteria and weights
 */
export interface ChainSelectionCriteria {
  /** Payment amount in USD */
  amountUsd: number;

  /** Token symbol */
  tokenSymbol: string;

  /** User's preferred chain (if any) */
  preferredChain?: ChainKey;

  /** User's wallet address (for affinity tracking) */
  userAddress?: string;

  /** Whether to prioritize speed over cost */
  prioritizeSpeed?: boolean;

  /** Whether to use testnet chains */
  useTestnet?: boolean;
}

/**
 * Chain score with breakdown
 */
export interface ChainScore {
  /** Chain key */
  chain: ChainKey;

  /** Overall score (0-100, higher is better) */
  score: number;

  /** Individual component scores */
  components: {
    cost: number; // Gas cost efficiency
    latency: number; // Confirmation speed
    congestion: number; // Network congestion
    success: number; // Historical success rate
    affinity: number; // User preference/history
  };

  /** Estimated gas cost in USD */
  estimatedGasCostUsd: number;

  /** Estimated confirmation time in seconds */
  estimatedConfirmationSeconds: number;

  /** Whether this chain is recommended */
  recommended: boolean;

  /** Reasoning for score */
  reasoning: string[];
}

/**
 * Chain selection result with rankings
 */
export interface ChainSelectionResult {
  /** Optimal chain */
  optimal: ChainKey;

  /** All chain scores (sorted by score) */
  rankings: ChainScore[];

  /** Selection reasoning */
  reasoning: string;

  /** Timestamp of selection */
  timestamp: Date;
}

/**
 * Chain metrics for scoring
 */
interface ChainMetrics {
  /** Average gas price in Gwei */
  avgGasPrice: number;

  /** Average confirmation time in seconds */
  avgConfirmationTime: number;

  /** Congestion level (0-1, where 1 is highly congested) */
  congestionLevel: number;

  /** Success rate (0-1) */
  successRate: number;

  /** Last updated timestamp */
  lastUpdated: Date;
}

/**
 * User chain affinity tracking
 */
interface UserChainAffinity {
  /** User's wallet address */
  userAddress: string;

  /** Chain usage counts */
  chainUsage: Partial<Record<ChainKey, number>>;

  /** Last used chain */
  lastChain?: ChainKey;
}

/**
 * Chain selector configuration
 */
interface ChainSelectorConfig {
  /** Scoring weights */
  weights: {
    cost: number;
    latency: number;
    congestion: number;
    success: number;
    affinity: number;
  };

  /** Maximum gas cost as percentage of payment (e.g., 0.05 = 5%) */
  maxGasCostPercent: number;

  /** Enable user affinity tracking */
  enableAffinityTracking: boolean;
}

/**
 * Default chain selector configuration
 */
const DEFAULT_SELECTOR_CONFIG: ChainSelectorConfig = {
  weights: {
    cost: 0.35, // 35% - most important for small payments
    latency: 0.25, // 25% - important for UX
    congestion: 0.20, // 20% - affects reliability
    success: 0.15, // 15% - historical reliability
    affinity: 0.05, // 5% - user preference bonus
  },
  maxGasCostPercent: 0.10, // 10% max gas cost
  enableAffinityTracking: true,
};

/**
 * Estimated chain metrics (simplified for initial implementation)
 * In production, these would be fetched from real-time APIs
 */
const ESTIMATED_CHAIN_METRICS: Record<ChainKey, ChainMetrics> = {
  ethereum: {
    avgGasPrice: 30, // 30 Gwei
    avgConfirmationTime: 12,
    congestionLevel: 0.6,
    successRate: 0.98,
    lastUpdated: new Date(),
  },
  "ethereum-sepolia": {
    avgGasPrice: 2,
    avgConfirmationTime: 12,
    congestionLevel: 0.1,
    successRate: 0.95,
    lastUpdated: new Date(),
  },
  base: {
    avgGasPrice: 0.5, // Much cheaper L2
    avgConfirmationTime: 2,
    congestionLevel: 0.3,
    successRate: 0.99,
    lastUpdated: new Date(),
  },
  "base-sepolia": {
    avgGasPrice: 0.1,
    avgConfirmationTime: 2,
    congestionLevel: 0.1,
    successRate: 0.97,
    lastUpdated: new Date(),
  },
  abstract: {
    avgGasPrice: 0.3,
    avgConfirmationTime: 2,
    congestionLevel: 0.2,
    successRate: 0.97,
    lastUpdated: new Date(),
  },
  "abstract-testnet": {
    avgGasPrice: 0.1,
    avgConfirmationTime: 2,
    congestionLevel: 0.1,
    successRate: 0.95,
    lastUpdated: new Date(),
  },
  unichain: {
    avgGasPrice: 0.4,
    avgConfirmationTime: 2,
    congestionLevel: 0.25,
    successRate: 0.98,
    lastUpdated: new Date(),
  },
  "unichain-sepolia": {
    avgGasPrice: 0.1,
    avgConfirmationTime: 2,
    congestionLevel: 0.1,
    successRate: 0.96,
    lastUpdated: new Date(),
  },
  lukso: {
    avgGasPrice: 0.5,
    avgConfirmationTime: 5,
    congestionLevel: 0.2,
    successRate: 0.97,
    lastUpdated: new Date(),
  },
  "lukso-testnet": {
    avgGasPrice: 0.1,
    avgConfirmationTime: 3,
    congestionLevel: 0.1,
    successRate: 0.95,
    lastUpdated: new Date(),
  },
};

/**
 * Intelligent Chain Selector
 */
export class ChainSelector {
  private config: ChainSelectorConfig;
  private userAffinities: Map<string, UserChainAffinity> = new Map();

  constructor(config: Partial<ChainSelectorConfig> = {}) {
    this.config = { ...DEFAULT_SELECTOR_CONFIG, ...config };
  }

  /**
   * Select optimal chain for payment
   *
   * @param criteria - Selection criteria
   * @returns Chain selection result with rankings
   */
  async selectChain(criteria: ChainSelectionCriteria): Promise<ChainSelectionResult> {
    const { amountUsd, tokenSymbol, preferredChain, userAddress, prioritizeSpeed, useTestnet } = criteria;

    // Determine candidate chains
    const candidateChains = this.getCandidateChains(tokenSymbol, useTestnet);

    if (candidateChains.length === 0) {
      throw new Error(`No chains support token ${tokenSymbol}`);
    }

    // If only one candidate, return it
    if (candidateChains.length === 1) {
      const chain = candidateChains[0];
      return {
        optimal: chain,
        rankings: [await this.scoreChain(chain, criteria)],
        reasoning: `Only chain supporting ${tokenSymbol}`,
        timestamp: new Date(),
      };
    }

    // Score all candidate chains
    const scores = await Promise.all(
      candidateChains.map(chain => this.scoreChain(chain, criteria))
    );

    // Apply speed priority if requested
    if (prioritizeSpeed) {
      this.applySpeedPriority(scores);
    }

    // Sort by score (descending)
    scores.sort((a, b) => b.score - a.score);

    // Mark top chain as recommended
    scores[0].recommended = true;

    // Generate selection reasoning
    const reasoning = this.generateSelectionReasoning(scores[0], criteria);

    log(
      `Chain selected: ${scores[0].chain} (score: ${scores[0].score.toFixed(1)})`,
      'chain-selector'
    );

    return {
      optimal: scores[0].chain,
      rankings: scores,
      reasoning,
      timestamp: new Date(),
    };
  }

  /**
   * Get candidate chains that support the token
   */
  private getCandidateChains(tokenSymbol: string, useTestnet: boolean = false): ChainKey[] {
    const token = tokenRegistry.getToken(tokenSymbol);
    if (!token) return [];

    // Get all chains that support this token
    const supportedChains = Object.keys(token.chains) as ChainKey[];

    // Filter by testnet/mainnet preference
    const networkChains = useTestnet ? getTestnetChains() : getMainnetChains();

    return supportedChains.filter(chain => networkChains.includes(chain));
  }

  /**
   * Score a specific chain for payment
   */
  private async scoreChain(
    chain: ChainKey,
    criteria: ChainSelectionCriteria
  ): Promise<ChainScore> {
    const metrics = ESTIMATED_CHAIN_METRICS[chain];
    const { amountUsd, userAddress, preferredChain } = criteria;

    // Calculate component scores
    const costScore = this.scoreCost(chain, amountUsd, metrics);
    const latencyScore = this.scoreLatency(metrics);
    const congestionScore = this.scoreCongestion(metrics);
    const successScore = this.scoreSuccess(metrics);
    const affinityScore = this.scoreAffinity(chain, userAddress, preferredChain);

    // Calculate weighted overall score
    const score =
      costScore * this.config.weights.cost +
      latencyScore * this.config.weights.latency +
      congestionScore * this.config.weights.congestion +
      successScore * this.config.weights.success +
      affinityScore * this.config.weights.affinity;

    // Estimate gas cost in USD
    const estimatedGasCostUsd = this.estimateGasCost(chain, metrics);

    // Generate reasoning
    const reasoning = this.generateChainReasoning(
      chain,
      { costScore, latencyScore, congestionScore, successScore, affinityScore },
      estimatedGasCostUsd,
      amountUsd
    );

    return {
      chain,
      score: Math.round(score * 100) / 100,
      components: {
        cost: Math.round(costScore * 100) / 100,
        latency: Math.round(latencyScore * 100) / 100,
        congestion: Math.round(congestionScore * 100) / 100,
        success: Math.round(successScore * 100) / 100,
        affinity: Math.round(affinityScore * 100) / 100,
      },
      estimatedGasCostUsd,
      estimatedConfirmationSeconds: metrics.avgConfirmationTime,
      recommended: false,
      reasoning,
    };
  }

  /**
   * Score cost efficiency
   */
  private scoreCost(chain: ChainKey, amountUsd: number, metrics: ChainMetrics): number {
    const gasCostUsd = this.estimateGasCost(chain, metrics);
    const gasCostPercent = (gasCostUsd / amountUsd) * 100;

    // Penalize if gas cost exceeds threshold
    if (gasCostPercent > this.config.maxGasCostPercent * 100) {
      return 0.3; // Low score for expensive chains
    }

    // Score inversely proportional to gas cost
    // Lower gas cost = higher score
    const normalizedCost = Math.min(1, gasCostPercent / 5); // 5% = normalized to 1
    return Math.max(0, 1 - normalizedCost);
  }

  /**
   * Score latency (confirmation speed)
   */
  private scoreLatency(metrics: ChainMetrics): number {
    // Lower latency = higher score
    // 2 seconds = 1.0, 12 seconds = 0.5, 60 seconds = 0.1
    const latencyScore = Math.max(0, 1 - (metrics.avgConfirmationTime / 60));
    return latencyScore;
  }

  /**
   * Score congestion (network availability)
   */
  private scoreCongestion(metrics: ChainMetrics): number {
    // Lower congestion = higher score
    return 1 - metrics.congestionLevel;
  }

  /**
   * Score historical success rate
   */
  private scoreSuccess(metrics: ChainMetrics): number {
    // Direct mapping of success rate
    return metrics.successRate;
  }

  /**
   * Score user affinity (preference/history)
   */
  private scoreAffinity(
    chain: ChainKey,
    userAddress: string | undefined,
    preferredChain: ChainKey | undefined
  ): number {
    // Strong bonus for explicit preference
    if (preferredChain === chain) {
      return 1.0;
    }

    // Bonus for user's historically used chains
    if (userAddress && this.config.enableAffinityTracking) {
      const affinity = this.userAffinities.get(userAddress);
      if (affinity) {
        const usageCount = affinity.chainUsage[chain] || 0;
        const totalUsage = Object.values(affinity.chainUsage).reduce((sum, count) => sum + count, 0);

        if (totalUsage > 0) {
          return usageCount / totalUsage; // Proportional to usage
        }
      }
    }

    return 0.5; // Neutral score
  }

  /**
   * Estimate gas cost in USD
   */
  private estimateGasCost(chain: ChainKey, metrics: ChainMetrics): number {
    // Simplified gas cost estimation
    // In production, would use real gas prices and ETH/token prices

    const estimatedGasUnits = 100000; // ~100k gas for ERC-20 transfer + X402 overhead
    const gasCostGwei = metrics.avgGasPrice * estimatedGasUnits;
    const gasCostEth = gasCostGwei / 1e9;

    // Estimate ETH price (simplified)
    const ethPriceUsd = chain.includes('ethereum') ? 3000 : 3000; // Same for L2s (they use ETH)

    return gasCostEth * ethPriceUsd;
  }

  /**
   * Generate reasoning for chain score
   */
  private generateChainReasoning(
    chain: ChainKey,
    scores: {
      costScore: number;
      latencyScore: number;
      congestionScore: number;
      successScore: number;
      affinityScore: number;
    },
    gasCostUsd: number,
    amountUsd: number
  ): string[] {
    const reasoning: string[] = [];
    const chainConfig = PAYMENT_CHAINS[chain];

    // Cost reasoning
    const gasCostPercent = (gasCostUsd / amountUsd) * 100;
    if (scores.costScore > 0.8) {
      reasoning.push(`Excellent cost efficiency: ~$${gasCostUsd.toFixed(4)} gas (${gasCostPercent.toFixed(2)}% of payment)`);
    } else if (scores.costScore > 0.5) {
      reasoning.push(`Good cost efficiency: ~$${gasCostUsd.toFixed(4)} gas`);
    } else {
      reasoning.push(`High gas cost: ~$${gasCostUsd.toFixed(4)} (${gasCostPercent.toFixed(2)}% of payment)`);
    }

    // Latency reasoning
    const metrics = ESTIMATED_CHAIN_METRICS[chain];
    if (metrics.avgConfirmationTime <= 2) {
      reasoning.push(`Fast confirmations: ~${metrics.avgConfirmationTime}s`);
    } else if (metrics.avgConfirmationTime <= 12) {
      reasoning.push(`Moderate confirmation time: ~${metrics.avgConfirmationTime}s`);
    } else {
      reasoning.push(`Slower confirmations: ~${metrics.avgConfirmationTime}s`);
    }

    // Success rate
    if (scores.successScore >= 0.98) {
      reasoning.push(`Highly reliable: ${(scores.successScore * 100).toFixed(1)}% success rate`);
    }

    // Affinity
    if (scores.affinityScore >= 0.8) {
      reasoning.push("Matches user preference");
    }

    return reasoning;
  }

  /**
   * Generate overall selection reasoning
   */
  private generateSelectionReasoning(
    topScore: ChainScore,
    criteria: ChainSelectionCriteria
  ): string {
    const chainConfig = PAYMENT_CHAINS[topScore.chain];
    const parts: string[] = [];

    parts.push(`Selected ${chainConfig.name} for optimal payment routing.`);

    // Add top 2 reasons
    const topReasons = topScore.reasoning.slice(0, 2);
    if (topReasons.length > 0) {
      parts.push(topReasons.join(". "));
    }

    return parts.join(" ");
  }

  /**
   * Apply speed priority adjustment
   */
  private applySpeedPriority(scores: ChainScore[]): void {
    for (const score of scores) {
      // Boost latency weight, reduce cost weight
      const adjustedScore =
        score.components.latency * 0.5 + // 50% weight to latency
        score.components.cost * 0.2 + // 20% weight to cost
        score.components.congestion * 0.15 +
        score.components.success * 0.1 +
        score.components.affinity * 0.05;

      score.score = Math.round(adjustedScore * 100) / 100;
    }
  }

  /**
   * Record user chain usage for affinity tracking
   */
  recordChainUsage(userAddress: string, chain: ChainKey): void {
    if (!this.config.enableAffinityTracking) return;

    let affinity = this.userAffinities.get(userAddress);

    if (!affinity) {
      affinity = {
        userAddress,
        chainUsage: {},
      };
      this.userAffinities.set(userAddress, affinity);
    }

    affinity.chainUsage[chain] = (affinity.chainUsage[chain] || 0) + 1;
    affinity.lastChain = chain;

    log(`Recorded chain usage: ${userAddress} -> ${chain}`, 'chain-selector');
  }

  /**
   * Get user's chain affinity data
   */
  getUserAffinity(userAddress: string): UserChainAffinity | null {
    return this.userAffinities.get(userAddress) || null;
  }

  /**
   * Update chain metrics (for real-time updates in production)
   */
  updateChainMetrics(chain: ChainKey, metrics: Partial<ChainMetrics>): void {
    Object.assign(ESTIMATED_CHAIN_METRICS[chain], metrics, {
      lastUpdated: new Date(),
    });

    log(`Updated metrics for ${chain}`, 'chain-selector');
  }

  /**
   * Get current metrics for a chain
   */
  getChainMetrics(chain: ChainKey): ChainMetrics {
    return { ...ESTIMATED_CHAIN_METRICS[chain] };
  }
}

/**
 * Singleton chain selector instance
 */
export const chainSelector = new ChainSelector();
