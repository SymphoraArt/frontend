/**
 * Unified Payment System
 *
 * Main entry point for the enhanced X402 payment system with:
 * - Cross-chain aggregation
 * - Multi-token support
 * - Intelligent routing
 * - Risk management
 *
 * Maintains 100% backward compatibility with existing USDC flows.
 */

import { type ChainKey } from "../shared/payment-config";
import { X402PaymentEngine, type PaymentRequest, type PaymentResult } from "./x402-engine";
import { MultiTokenPaymentEngine, type TokenPaymentRequest } from "./multi-token-engine";
import { CrossChainPaymentAggregator, type UnifiedPaymentRequest } from "./cross-chain-aggregator";
import { tokenRegistry } from "./token-registry";
import { priceOracle } from "./price-oracle";
import { tokenRiskEngine } from "./token-risk-engine";
import { chainSelector } from "./chain-selector";
import { log } from "./logger";

/**
 * Payment system mode
 */
export type PaymentMode = "legacy" | "multi-token" | "cross-chain";

/**
 * Payment system configuration
 */
export interface PaymentSystemConfig {
  /** Default mode for payment processing */
  defaultMode: PaymentMode;

  /** Enable automatic chain selection */
  enableAutoChainSelection: boolean;

  /** Enable multi-token payments */
  enableMultiToken: boolean;

  /** Enable cross-chain aggregation */
  enableCrossChain: boolean;

  /** Enable risk assessment for all payments */
  enableRiskAssessment: boolean;

  /** Default token symbol */
  defaultToken: string;

  /** Default chain for payments */
  defaultChain: ChainKey;
}

/**
 * Default payment system configuration
 */
const DEFAULT_SYSTEM_CONFIG: PaymentSystemConfig = {
  defaultMode: "legacy", // Backward compatible by default
  enableAutoChainSelection: false, // Explicit chain selection by default
  enableMultiToken: false, // USDC only by default
  enableCrossChain: false, // Single chain by default
  enableRiskAssessment: true, // Always assess risk
  defaultToken: "USDC",
  defaultChain: "base-sepolia",
};

/**
 * Unified Payment System
 *
 * Provides a single interface for all payment operations with progressive enhancement
 */
export class PaymentSystem {
  private config: PaymentSystemConfig;
  private legacyEngine: X402PaymentEngine;
  private multiTokenEngine: MultiTokenPaymentEngine;
  private crossChainAggregator: CrossChainPaymentAggregator;

  constructor(config: Partial<PaymentSystemConfig> = {}) {
    this.config = { ...DEFAULT_SYSTEM_CONFIG, ...config };

    // Initialize engines
    this.legacyEngine = new X402PaymentEngine();
    this.multiTokenEngine = new MultiTokenPaymentEngine();
    this.crossChainAggregator = new CrossChainPaymentAggregator(this.multiTokenEngine);

    log('Payment system initialized', 'payment-system');
    this.logConfiguration();
  }

  /**
   * Process payment with automatic mode selection
   *
   * This is the recommended entry point for all payments.
   * It automatically selects the appropriate engine based on request parameters.
   *
   * @param request - Payment request (can be any supported format)
   * @returns Payment result
   */
  async processPayment(
    request: PaymentRequest | TokenPaymentRequest | UnifiedPaymentRequest
  ): Promise<PaymentResult> {
    // Determine which engine to use
    const mode = this.determineMode(request);

    log(`Processing payment in ${mode} mode`, 'payment-system');

    switch (mode) {
      case "cross-chain":
        return this.processCrossChainPayment(request as UnifiedPaymentRequest);

      case "multi-token":
        return this.processMultiTokenPayment(request as TokenPaymentRequest);

      case "legacy":
      default:
        return this.processLegacyPayment(request as PaymentRequest);
    }
  }

  /**
   * Process legacy USDC payment (100% backward compatible)
   */
  private async processLegacyPayment(request: PaymentRequest): Promise<PaymentResult> {
    log(`Legacy payment: ${request.description} on ${request.chainKey}`, 'payment-system');
    return this.legacyEngine.settle(request);
  }

  /**
   * Process multi-token payment
   */
  private async processMultiTokenPayment(request: TokenPaymentRequest): Promise<PaymentResult> {
    if (!this.config.enableMultiToken) {
      log('Multi-token payments are disabled, falling back to legacy mode', 'payment-system');
      return this.processLegacyPayment(request);
    }

    log(
      `Multi-token payment: ${request.tokenSymbol} on ${request.chainKey}`,
      'payment-system'
    );

    return this.multiTokenEngine.settle(request);
  }

  /**
   * Process cross-chain payment with intelligent routing
   */
  private async processCrossChainPayment(
    request: UnifiedPaymentRequest
  ): Promise<PaymentResult> {
    if (!this.config.enableCrossChain) {
      log('Cross-chain payments are disabled, falling back to legacy mode', 'payment-system');

      // Convert to legacy request
      const legacyRequest: PaymentRequest = {
        resourceUrl: request.resourceUrl,
        method: request.method,
        paymentHeader: request.paymentHeader,
        chainKey: request.preferredChain || this.config.defaultChain,
        price: request.price,
        description: request.description,
        payToAddress: request.payToAddress,
        category: request.category,
      };

      return this.processLegacyPayment(legacyRequest);
    }

    log('Cross-chain payment with automatic routing', 'payment-system');

    return this.crossChainAggregator.executePayment(request);
  }

  /**
   * Determine payment mode based on request
   */
  private determineMode(
    request: PaymentRequest | TokenPaymentRequest | UnifiedPaymentRequest
  ): PaymentMode {
    // Check if it's a unified (cross-chain) request
    if ('tokenSymbol' in request && !('chainKey' in request)) {
      return "cross-chain";
    }

    // Check if it's a multi-token request
    if ('tokenSymbol' in request && 'tokenAddress' in request) {
      return "multi-token";
    }

    // Default to legacy
    return "legacy";
  }

  /**
   * Get payment quote with automatic token/chain handling
   *
   * @param priceUsd - Price in USD (e.g., "$0.10")
   * @param options - Quote options
   * @returns Payment quote
   */
  async getQuote(
    priceUsd: string,
    options: {
      chain?: ChainKey;
      token?: string;
      userAddress?: string;
      prioritizeSpeed?: boolean;
    } = {}
  ) {
    const chain = options.chain || this.config.defaultChain;
    const token = options.token || this.config.defaultToken;

    // If multi-token is enabled and non-USDC token requested, get token quote
    if (this.config.enableMultiToken && token !== "USDC") {
      return this.multiTokenEngine.getTokenQuote(priceUsd, chain, token);
    }

    // Otherwise, use legacy quote
    return this.legacyEngine.getQuote(priceUsd, chain);
  }

  /**
   * Get optimal chain for a payment
   *
   * @param priceUsd - Payment amount in USD
   * @param options - Selection options
   * @returns Optimal chain
   */
  async getOptimalChain(
    priceUsd: number,
    options: {
      token?: string;
      userAddress?: string;
      prioritizeSpeed?: boolean;
      preferredChain?: ChainKey;
    } = {}
  ): Promise<ChainKey> {
    if (!this.config.enableAutoChainSelection) {
      return options.preferredChain || this.config.defaultChain;
    }

    const selection = await chainSelector.selectChain({
      amountUsd: priceUsd,
      tokenSymbol: options.token || this.config.defaultToken,
      preferredChain: options.preferredChain,
      userAddress: options.userAddress,
      prioritizeSpeed: options.prioritizeSpeed,
    });

    return selection.optimal;
  }

  /**
   * Validate payment configuration
   *
   * @param chain - Chain to validate
   * @param token - Token to validate (optional)
   * @returns Validation result
   */
  validateConfig(
    chain: ChainKey,
    token: string = "USDC"
  ): { valid: boolean; errors: string[] } {
    if (this.config.enableMultiToken && token !== "USDC") {
      return this.multiTokenEngine.validateTokenConfig(chain, token);
    }

    return this.legacyEngine.validateChainConfig(chain);
  }

  /**
   * Get supported tokens for a chain
   */
  getSupportedTokens(chain: ChainKey): string[] {
    if (!this.config.enableMultiToken) {
      return ["USDC"];
    }

    return this.multiTokenEngine.getSupportedTokens(chain);
  }

  /**
   * Get system statistics
   */
  getStats() {
    return {
      mode: this.config.defaultMode,
      multiTokenEnabled: this.config.enableMultiToken,
      crossChainEnabled: this.config.enableCrossChain,
      autoChainSelectionEnabled: this.config.enableAutoChainSelection,
      supportedTokens: tokenRegistry.getTokenCount(),
      defaultToken: this.config.defaultToken,
      defaultChain: this.config.defaultChain,
    };
  }

  /**
   * Update system configuration
   */
  updateConfig(config: Partial<PaymentSystemConfig>): void {
    this.config = { ...this.config, ...config };
    log('Payment system configuration updated', 'payment-system');
    this.logConfiguration();
  }

  /**
   * Get current configuration
   */
  getConfig(): PaymentSystemConfig {
    return { ...this.config };
  }

  /**
   * Log current configuration
   */
  private logConfiguration(): void {
    log('Configuration:', 'payment-system');
    log(`  Mode: ${this.config.defaultMode}`, 'payment-system');
    log(`  Multi-token: ${this.config.enableMultiToken}`, 'payment-system');
    log(`  Cross-chain: ${this.config.enableCrossChain}`, 'payment-system');
    log(`  Auto chain selection: ${this.config.enableAutoChainSelection}`, 'payment-system');
    log(`  Default token: ${this.config.defaultToken}`, 'payment-system');
    log(`  Default chain: ${this.config.defaultChain}`, 'payment-system');
  }

  /**
   * Get underlying engines (for advanced usage)
   */
  getEngines() {
    return {
      legacy: this.legacyEngine,
      multiToken: this.multiTokenEngine,
      crossChain: this.crossChainAggregator,
    };
  }

  /**
   * Get registry and utility services
   */
  getServices() {
    return {
      tokenRegistry,
      priceOracle,
      tokenRiskEngine,
      chainSelector,
    };
  }
}

/**
 * Create payment system with configuration
 *
 * @param config - System configuration
 * @returns Payment system instance
 */
export function createPaymentSystem(config: Partial<PaymentSystemConfig> = {}): PaymentSystem {
  return new PaymentSystem(config);
}

/**
 * Singleton payment system instance (legacy compatibility)
 *
 * Uses conservative defaults for backward compatibility.
 * To enable advanced features, create a new PaymentSystem with desired config.
 */
export const paymentSystem = new PaymentSystem({
  defaultMode: "legacy",
  enableAutoChainSelection: false,
  enableMultiToken: false,
  enableCrossChain: false,
});

/**
 * Export all components for direct access
 */
export {
  tokenRegistry,
  priceOracle,
  tokenRiskEngine,
  chainSelector,
  X402PaymentEngine,
  MultiTokenPaymentEngine,
  CrossChainPaymentAggregator,
};

export type {
  PaymentRequest,
  PaymentResult,
  TokenPaymentRequest,
  UnifiedPaymentRequest,
};
