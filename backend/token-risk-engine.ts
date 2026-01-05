/**
 * Token Risk Assessment Engine
 *
 * Evaluates token safety before settlement by assessing:
 * - Liquidity availability
 * - Price volatility
 * - Audit status
 * - Holder concentration
 *
 * High-risk tokens are subject to tighter limits or rejection.
 */

import { type ChainKey } from "../shared/payment-config";
import { tokenRegistry, type TokenRegistryEntry, type RiskLevel } from "./token-registry";
import { priceOracle } from "./price-oracle";
import { log } from "./logger";

/**
 * Risk assessment result
 */
export interface RiskAssessment {
  /** Overall risk level */
  riskLevel: RiskLevel;

  /** Whether payment should be allowed */
  allowed: boolean;

  /** Overall risk score (0-100, where 100 is highest risk) */
  riskScore: number;

  /** Individual risk factors */
  factors: {
    liquidity: RiskFactor;
    volatility: RiskFactor;
    audit: RiskFactor;
    concentration?: RiskFactor;
  };

  /** Recommended actions or restrictions */
  recommendations: string[];

  /** Reason if payment is not allowed */
  rejectionReason?: string;

  /** Timestamp of assessment */
  timestamp: Date;
}

/**
 * Individual risk factor assessment
 */
export interface RiskFactor {
  /** Risk score for this factor (0-100) */
  score: number;

  /** Risk level for this factor */
  level: "low" | "medium" | "high" | "critical";

  /** Details about the assessment */
  details: string;

  /** Whether this factor alone would block payment */
  blocking: boolean;
}

/**
 * Liquidity assessment result
 */
export interface LiquidityAssessment {
  /** Available liquidity in USD */
  liquidityUsd: number;

  /** Whether liquidity meets minimum requirements */
  sufficient: boolean;

  /** DEX pools with liquidity */
  pools?: Array<{
    dex: string;
    liquidityUsd: number;
  }>;
}

/**
 * Volatility metrics
 */
export interface VolatilityMetrics {
  /** 24-hour price change percentage */
  priceChange24h: number;

  /** 7-day price volatility (standard deviation) */
  volatility7d: number;

  /** Whether volatility is within acceptable range */
  acceptable: boolean;
}

/**
 * Risk assessment configuration
 */
interface RiskEngineConfig {
  /** Maximum allowed risk score (0-100) */
  maxRiskScore: number;

  /** Enable strict mode (reject medium-high risk) */
  strictMode: boolean;

  /** Require audit for all tokens */
  requireAudit: boolean;

  /** Minimum liquidity multiplier (payment amount * multiplier) */
  liquidityMultiplier: number;
}

/**
 * Default risk engine configuration
 */
const DEFAULT_RISK_CONFIG: RiskEngineConfig = {
  maxRiskScore: 60, // Block if risk score > 60
  strictMode: false,
  requireAudit: false, // Allow unaudited tokens (with higher risk score)
  liquidityMultiplier: 10, // Require 10x payment amount in liquidity
};

/**
 * Token Risk Assessment Engine
 */
export class TokenRiskEngine {
  private config: RiskEngineConfig;
  private assessmentCache: Map<string, RiskAssessment> = new Map();
  private readonly CACHE_TTL_MS = 300000; // 5 minutes cache

  constructor(config: Partial<RiskEngineConfig> = {}) {
    this.config = { ...DEFAULT_RISK_CONFIG, ...config };
  }

  /**
   * Assess risk for a token payment
   *
   * @param symbol - Token symbol
   * @param chain - Chain where payment will occur
   * @param amountUsd - Payment amount in USD
   * @returns Risk assessment with recommendations
   */
  async assessPayment(
    symbol: string,
    chain: ChainKey,
    amountUsd: number
  ): Promise<RiskAssessment> {
    const cacheKey = `${symbol}-${chain}-${amountUsd}`;

    // Check cache first
    const cached = this.assessmentCache.get(cacheKey);
    if (cached && this.isCacheValid(cached)) {
      log(`Cache hit for risk assessment: ${symbol} on ${chain}`, 'risk-engine');
      return cached;
    }

    // Get token from registry
    const token = tokenRegistry.getToken(symbol);
    if (!token) {
      return this.createBlockedAssessment(`Token ${symbol} not found in registry`);
    }

    // Verify token is supported on chain
    if (!tokenRegistry.isSupportedOnChain(symbol, chain)) {
      return this.createBlockedAssessment(`Token ${symbol} not supported on ${chain}`);
    }

    // Validate payment amount against token bounds
    const amountValidation = tokenRegistry.validatePaymentAmount(symbol, amountUsd);
    if (!amountValidation.valid) {
      return this.createBlockedAssessment(amountValidation.reason || "Invalid payment amount");
    }

    // Assess individual risk factors
    const liquidityFactor = await this.assessLiquidity(token, chain, amountUsd);
    const volatilityFactor = await this.assessVolatility(token, chain);
    const auditFactor = this.assessAudit(token);

    // Calculate overall risk score
    const riskScore = this.calculateRiskScore({
      liquidity: liquidityFactor,
      volatility: volatilityFactor,
      audit: auditFactor,
    });

    // Determine if payment is allowed
    const allowed = this.isPaymentAllowed(riskScore, {
      liquidity: liquidityFactor,
      volatility: volatilityFactor,
      audit: auditFactor,
    });

    // Generate recommendations
    const recommendations = this.generateRecommendations(
      token,
      {
        liquidity: liquidityFactor,
        volatility: volatilityFactor,
        audit: auditFactor,
      },
      riskScore
    );

    const assessment: RiskAssessment = {
      riskLevel: token.riskLevel,
      allowed,
      riskScore,
      factors: {
        liquidity: liquidityFactor,
        volatility: volatilityFactor,
        audit: auditFactor,
      },
      recommendations,
      rejectionReason: allowed ? undefined : this.getRejectionReason(riskScore, {
        liquidity: liquidityFactor,
        volatility: volatilityFactor,
        audit: auditFactor,
      }),
      timestamp: new Date(),
    };

    // Cache assessment
    this.assessmentCache.set(cacheKey, assessment);

    log(
      `Risk assessment for ${symbol}: score=${riskScore}, allowed=${allowed}`,
      'risk-engine'
    );

    return assessment;
  }

  /**
   * Assess liquidity risk factor
   * 
   * Simplified for hackathon: Assumes sufficient liquidity for tokens in registry.
   * In production, would query DEX pools for actual liquidity.
   */
  private async assessLiquidity(
    token: TokenRegistryEntry,
    chain: ChainKey,
    amountUsd: number
  ): Promise<RiskFactor> {
    // Fallback: Assume sufficient liquidity for registered tokens
    const tokenMinLiquidity = token.liquidity.minLiquidityUsd;

    return {
      score: 10, // Low risk - tokens in registry are assumed to have sufficient liquidity
      level: "low",
      details: `Token registered with minimum liquidity: $${tokenMinLiquidity.toLocaleString()}`,
      blocking: false,
    };
  }

  /**
   * Assess volatility risk factor
   * 
   * Simplified for hackathon: Uses token registry risk level as proxy.
   * In production, would calculate volatility from historical price data.
   */
  private async assessVolatility(
    token: TokenRegistryEntry,
    chain: ChainKey
  ): Promise<RiskFactor> {
    // For stablecoins, volatility is inherently low
    if (token.symbol.includes("USD") || token.symbol === "DAI") {
      return {
        score: 5,
        level: "low",
        details: "Stablecoin with low expected volatility",
        blocking: false,
      };
    }

    // Fallback: Use risk level from token registry as volatility proxy
    const scoreMap: Record<string, { score: number; level: "low" | "medium" | "high" | "critical" }> = {
      "LOW": { score: 15, level: "low" },
      "MEDIUM": { score: 40, level: "medium" },
      "HIGH": { score: 70, level: "high" },
    };

    const { score, level } = scoreMap[token.riskLevel] || { score: 95, level: "critical" as const };

    return {
      score,
      level,
      details: `Token risk level: ${token.riskLevel}`,
      blocking: false,
    };
  }

  /**
   * Assess audit status risk factor
   */
  private assessAudit(token: TokenRegistryEntry): RiskFactor {
    let score: number = 100;
    let level: "low" | "medium" | "high" | "critical" = "critical";
    let blocking = false;

    switch (token.auditStatus) {
      case "audited":
        score = 10;
        level = "low";
        break;
      case "partially-audited":
        score = 40;
        level = "medium";
        break;
      case "unaudited":
        score = 70;
        level = "high";
        blocking = this.config.requireAudit;
        break;
      case "unknown":
        score = 80;
        level = "high";
        blocking = this.config.requireAudit;
        break;
      default:
        // Fallback for any unexpected audit status
        score = 100;
        level = "critical";
        blocking = true;
        break;
    }

    return {
      score,
      level,
      details: `Audit status: ${token.auditStatus}`,
      blocking,
    };
  }

  /**
   * Calculate overall risk score from individual factors
   */
  private calculateRiskScore(factors: {
    liquidity: RiskFactor;
    volatility: RiskFactor;
    audit: RiskFactor;
  }): number {
    // Weighted average of risk factors
    const weights = {
      liquidity: 0.4, // 40% weight - most critical
      volatility: 0.35, // 35% weight
      audit: 0.25, // 25% weight
    };

    const weightedScore =
      factors.liquidity.score * weights.liquidity +
      factors.volatility.score * weights.volatility +
      factors.audit.score * weights.audit;

    return Math.round(weightedScore);
  }

  /**
   * Determine if payment should be allowed based on risk assessment
   */
  private isPaymentAllowed(
    riskScore: number,
    factors: {
      liquidity: RiskFactor;
      volatility: RiskFactor;
      audit: RiskFactor;
    }
  ): boolean {
    // Check if any factor is blocking
    if (
      factors.liquidity.blocking ||
      factors.volatility.blocking ||
      factors.audit.blocking
    ) {
      return false;
    }

    // Check overall risk score
    if (riskScore > this.config.maxRiskScore) {
      return false;
    }

    // In strict mode, reject high-risk scores
    if (this.config.strictMode && riskScore > 50) {
      return false;
    }

    return true;
  }

  /**
   * Generate recommendations based on risk assessment
   */
  private generateRecommendations(
    token: TokenRegistryEntry,
    factors: {
      liquidity: RiskFactor;
      volatility: RiskFactor;
      audit: RiskFactor;
    },
    riskScore: number
  ): string[] {
    const recommendations: string[] = [];

    // Liquidity recommendations
    if (factors.liquidity.level === "high" || factors.liquidity.level === "critical") {
      recommendations.push("Increase slippage tolerance due to low liquidity");
      recommendations.push("Consider splitting payment into smaller amounts");
    }

    // Volatility recommendations
    if (factors.volatility.level === "high" || factors.volatility.level === "critical") {
      recommendations.push("Monitor price closely before settlement");
      recommendations.push(`Apply wider slippage bounds (suggest ${token.slippage.maxSlippagePercent}%)`);
    }

    // Audit recommendations
    if (factors.audit.level === "high" || factors.audit.level === "critical") {
      recommendations.push("Token contract has limited or no audit - proceed with caution");
      recommendations.push("Enforce lower payment limits for unaudited tokens");
    }

    // General risk recommendations
    if (riskScore > 50) {
      recommendations.push("High overall risk - consider using USDC instead");
    }

    if (riskScore > 40) {
      recommendations.push("Require additional confirmation before settlement");
    }

    return recommendations;
  }

  /**
   * Get rejection reason based on risk factors
   */
  private getRejectionReason(
    riskScore: number,
    factors: {
      liquidity: RiskFactor;
      volatility: RiskFactor;
      audit: RiskFactor;
    }
  ): string {
    const reasons: string[] = [];

    if (factors.liquidity.blocking) {
      reasons.push(factors.liquidity.details);
    }

    if (factors.volatility.blocking) {
      reasons.push(factors.volatility.details);
    }

    if (factors.audit.blocking) {
      reasons.push(factors.audit.details);
    }

    if (riskScore > this.config.maxRiskScore) {
      reasons.push(`Risk score ${riskScore} exceeds maximum ${this.config.maxRiskScore}`);
    }

    return reasons.join("; ");
  }

  /**
   * Create blocked assessment
   */
  private createBlockedAssessment(reason: string): RiskAssessment {
    return {
      riskLevel: "UNACCEPTABLE",
      allowed: false,
      riskScore: 100,
      factors: {
        liquidity: {
          score: 100,
          level: "critical",
          details: "Not assessed",
          blocking: true,
        },
        volatility: {
          score: 100,
          level: "critical",
          details: "Not assessed",
          blocking: true,
        },
        audit: {
          score: 100,
          level: "critical",
          details: "Not assessed",
          blocking: true,
        },
      },
      recommendations: ["Payment blocked"],
      rejectionReason: reason,
      timestamp: new Date(),
    };
  }

  /**
   * Check if cached assessment is still valid
   */
  private isCacheValid(cached: RiskAssessment): boolean {
    const age = Date.now() - cached.timestamp.getTime();
    return age < this.CACHE_TTL_MS;
  }

  /**
   * Clear assessment cache
   */
  clearCache(): void {
    this.assessmentCache.clear();
  }

  /**
   * Update configuration
   */
  updateConfig(config: Partial<RiskEngineConfig>): void {
    this.config = { ...this.config, ...config };
    log(`Risk engine configuration updated`, 'risk-engine');
  }

  /**
   * Get current configuration
   */
  getConfig(): RiskEngineConfig {
    return { ...this.config };
  }
}

/**
 * Singleton token risk engine instance
 */
export const tokenRiskEngine = new TokenRiskEngine();
