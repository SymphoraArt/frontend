/**
 * Multi-Token Payment Engine
 *
 * Extends X402PaymentEngine to support custom ERC-20 tokens beyond USDC.
 *
 * Features:
 * - Real-time USD conversion via price oracles
 * - Risk & compliance gating via risk engine
 * - Slippage protection
 * - Enhanced payment metadata
 *
 * Maintains full backward compatibility with USDC-only flows.
 */

import { X402PaymentEngine, type PaymentRequest, type PaymentResult, type PaymentMetadata } from "./x402-engine";
import { type ChainKey } from "../../shared/payment-config";
import { tokenRegistry, type TokenRegistryEntry } from "./token-registry";
import { oracleResolver, type ResolvedPrice } from "./oracles/oracle-resolver";
import { tokenRiskEngine, type RiskAssessment } from "./token-risk-engine";
import { log } from "./app";

/**
 * Token-specific payment request
 */
export interface TokenPaymentRequest extends PaymentRequest {
  /** Token symbol (e.g., "USDC", "WETH", "DAI") */
  tokenSymbol: string;

  /** Token address on the chain */
  tokenAddress: string;

  /** Maximum allowed slippage in percentage (e.g., 0.5 = 0.5%) */
  maxSlippagePercent?: number;

  /** Whether to skip risk assessment (use with caution) */
  skipRiskAssessment?: boolean;
}

/**
 * Enhanced payment metadata with token information
 */
export interface TokenPaymentMetadata extends PaymentMetadata {
  /** Token symbol used for payment */
  tokenSymbol: string;

  /** Token address used */
  tokenAddress: string;

  /** Price in USD at execution time */
  priceUsdAtExecution: number;

  /** Price confidence score (0-1) */
  priceConfidence: number;

  /** Token amount paid (in token units) */
  tokenAmount: string;

  /** Risk assessment score (0-100) */
  riskScore: number;

  /** Risk level */
  riskLevel: string;

  /** Slippage applied (percentage) */
  slippagePercent: number;

  /** Whether risk assessment was performed */
  riskAssessed: boolean;
}

/**
 * Token payment result with enhanced metadata
 */
export interface TokenPaymentResult extends PaymentResult {
  metadata?: TokenPaymentMetadata;
}

/**
 * Multi-Token Payment Engine
 *
 * Extends X402PaymentEngine with support for custom ERC-20 tokens
 */
export class MultiTokenPaymentEngine extends X402PaymentEngine {
  /**
   * Settle payment with token support
   *
   * This method extends the base settle() to support any registered ERC-20 token.
   * For USDC payments, it delegates to the base implementation for backward compatibility.
   *
   * @param request - Token payment request
   * @returns Payment result with enhanced metadata
   */
  async settle(request: TokenPaymentRequest): Promise<TokenPaymentResult> {
    const { tokenSymbol, tokenAddress, maxSlippagePercent, skipRiskAssessment } = request;

    log(
      `Processing multi-token payment: ${tokenSymbol} on ${request.chainKey}`,
      'multi-token-engine'
    );

    // Validate token is registered
    if (!tokenRegistry.isSupported(tokenSymbol)) {
      log(`❌ Token ${tokenSymbol} not found in registry`, 'multi-token-engine');
      return {
        success: false,
        status: 400,
        headers: {},
        error: `Unsupported token: ${tokenSymbol}. Only registered tokens are accepted.`,
      };
    }

    // Get token entry
    const token = tokenRegistry.getToken(tokenSymbol);
    if (!token) {
      return {
        success: false,
        status: 500,
        headers: {},
        error: `Failed to retrieve token ${tokenSymbol} from registry`,
      };
    }

    // Verify token is supported on this chain
    if (!tokenRegistry.isSupportedOnChain(tokenSymbol, request.chainKey)) {
      log(
        `❌ Token ${tokenSymbol} not supported on ${request.chainKey}`,
        'multi-token-engine'
      );
      return {
        success: false,
        status: 400,
        headers: {},
        error: `Token ${tokenSymbol} is not supported on ${request.chainKey}`,
      };
    }

    // Verify token address matches registry
    const registryAddress = tokenRegistry.getTokenAddress(tokenSymbol, request.chainKey);
    if (registryAddress?.toLowerCase() !== tokenAddress.toLowerCase()) {
      log(
        `❌ Token address mismatch for ${tokenSymbol}: expected ${registryAddress}, got ${tokenAddress}`,
        'multi-token-engine'
      );
      return {
        success: false,
        status: 400,
        headers: {},
        error: `Token address ${tokenAddress} does not match registry for ${tokenSymbol}`,
      };
    }

    // Parse USD amount from price string
    const priceUsd = parseFloat(request.price.replace('$', ''));

    // Validate payment amount against token bounds
    const amountValidation = tokenRegistry.validatePaymentAmount(tokenSymbol, priceUsd);
    if (!amountValidation.valid) {
      log(`❌ Payment amount validation failed: ${amountValidation.reason}`, 'multi-token-engine');
      return {
        success: false,
        status: 400,
        headers: {},
        error: amountValidation.reason || "Invalid payment amount",
      };
    }

    // Perform risk assessment (unless explicitly skipped)
    let riskAssessment: RiskAssessment | null = null;

    if (!skipRiskAssessment) {
      riskAssessment = await tokenRiskEngine.assessPayment(
        tokenSymbol,
        request.chainKey,
        priceUsd
      );

      // Check if payment is allowed based on risk assessment
      if (!riskAssessment.allowed) {
        log(
          `❌ Payment blocked by risk assessment: ${riskAssessment.rejectionReason}`,
          'multi-token-engine'
        );
        return {
          success: false,
          status: 403,
          headers: {},
          error: `Payment rejected: ${riskAssessment.rejectionReason}`,
        };
      }

      // Log risk assessment results
      log(
        `Risk assessment: score=${riskAssessment.riskScore}, level=${riskAssessment.riskLevel}`,
        'multi-token-engine'
      );

      // Log recommendations if any
      if (riskAssessment.recommendations.length > 0) {
        log(
          `Risk recommendations: ${riskAssessment.recommendations.join('; ')}`,
          'multi-token-engine'
        );
      }
    }

    // Get real-time price from on-chain oracles (Chainlink or Uniswap TWAP)
    let resolvedPrice: ResolvedPrice;

    try {
      resolvedPrice = await oracleResolver.resolvePrice(tokenSymbol, request.chainKey);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      log(`❌ Oracle resolution error: ${errorMessage}`, 'multi-token-engine');
      return {
        success: false,
        status: 500,
        headers: {},
        error: `Failed to resolve token price: ${errorMessage}`,
      };
    }

    // Check if price is safe to use
    if (!resolvedPrice.isSafe) {
      log(
        `❌ Price not safe for settlement: ${resolvedPrice.unsafeReason}`,
        'multi-token-engine'
      );
      return {
        success: false,
        status: 500,
        headers: {},
        error: `Price oracle error: ${resolvedPrice.unsafeReason}`,
      };
    }

    // Log price resolution details
    log(
      `Price resolved via ${resolvedPrice.source}: $${resolvedPrice.priceUsd.toFixed(6)} (confidence: ${(resolvedPrice.confidence * 100).toFixed(1)}%)`,
      'multi-token-engine'
    );
    log(`  Explanation: ${resolvedPrice.explanation.join(' → ')}`, 'multi-token-engine');

    // Calculate token amount required
    const tokenAmount = priceUsd / resolvedPrice.priceUsd;

    // Apply slippage protection
    const slippagePercent = maxSlippagePercent || token.slippage.maxSlippagePercent;
    const slippageMultiplier = 1 + slippagePercent / 100;
    const tokenAmountWithSlippage = tokenAmount * slippageMultiplier;

    log(
      `Token conversion: $${priceUsd} @ $${resolvedPrice.priceUsd.toFixed(6)}/${tokenSymbol} = ${tokenAmount.toFixed(token.decimals)} ${tokenSymbol} (with ${slippagePercent}% slippage: ${tokenAmountWithSlippage.toFixed(token.decimals)})`,
      'multi-token-engine'
    );

    // For USDC (or equivalent stablecoins), use the base engine implementation
    // This ensures backward compatibility
    if (this.isStablecoin(tokenSymbol)) {
      log(`Using base engine for stablecoin ${tokenSymbol}`, 'multi-token-engine');

      const baseResult = await super.settle(request as PaymentRequest);

      // Enhance metadata with token information
      if (baseResult.success && baseResult.metadata) {
        const enhancedMetadata: TokenPaymentMetadata = {
          ...baseResult.metadata,
          tokenSymbol,
          tokenAddress,
          priceUsdAtExecution: resolvedPrice.priceUsd,
          priceConfidence: resolvedPrice.confidence,
          tokenAmount: priceUsd.toFixed(token.decimals), // For stablecoins, 1:1 with USD
          riskScore: riskAssessment?.riskScore || 0,
          riskLevel: riskAssessment?.riskLevel || "LOW",
          slippagePercent,
          riskAssessed: !skipRiskAssessment,
        };

        return {
          ...baseResult,
          metadata: enhancedMetadata,
        };
      }

      return baseResult;
    }

    // For non-stablecoin tokens, we need custom settlement logic
    // This would involve:
    // 1. Converting USD amount to token amount using oracle price
    // 2. Applying slippage bounds
    // 3. Executing token transfer with X402
    // 4. Verifying settlement with price bounds

    // TODO: Implement full non-stablecoin settlement
    // For now, return error indicating this is not yet implemented
    log(
      `❌ Non-stablecoin settlement not yet implemented for ${tokenSymbol}`,
      'multi-token-engine'
    );

    return {
      success: false,
      status: 501,
      headers: {},
      error: `Non-stablecoin payments (${tokenSymbol}) are not yet fully implemented. Please use USDC or USDC.e.`,
    };
  }

  /**
   * Check if token is a stablecoin
   */
  private isStablecoin(tokenSymbol: string): boolean {
    const stablecoins = ["USDC", "USDC.e", "DAI", "USDT"];
    return stablecoins.includes(tokenSymbol.toUpperCase());
  }

  /**
   * Get payment quote with token conversion
   *
   * Extends base getQuote() with token-specific information
   *
   * @param price - Price string (e.g., "$0.10")
   * @param chainKey - Chain for payment
   * @param tokenSymbol - Token to use (defaults to USDC)
   * @returns Payment quote with token conversion
   */
  async getTokenQuote(
    price: string,
    chainKey: ChainKey,
    tokenSymbol: string = "USDC"
  ): Promise<{
    price: string;
    priceUsd: number;
    tokenSymbol: string;
    tokenAmount: string;
    tokenDecimals: number;
    chain: string;
    chainId: number;
    tokenAddress: string;
    blockExplorer: string;
    priceConfidence: number;
    riskLevel: string;
    estimatedGasCostUsd: number;
  } | null> {
    // Get base quote
    const baseQuote = super.getQuote(price, chainKey);
    if (!baseQuote) return null;

    // Validate token
    const token = tokenRegistry.getToken(tokenSymbol);
    if (!token) return null;

    const tokenAddress = tokenRegistry.getTokenAddress(tokenSymbol, chainKey);
    if (!tokenAddress) return null;

    // Get price from on-chain oracles
    const priceUsd = parseFloat(price.replace('$', ''));

    let resolvedPrice: ResolvedPrice;
    try {
      resolvedPrice = await oracleResolver.resolvePrice(tokenSymbol, chainKey);
    } catch (error) {
      log(`Failed to resolve price for quote: ${error}`, 'multi-token-engine');
      return null;
    }

    if (!resolvedPrice.isSafe) {
      log(`Price not safe for quote: ${resolvedPrice.unsafeReason}`, 'multi-token-engine');
      return null;
    }

    // Calculate token amount
    const tokenAmount = priceUsd / resolvedPrice.priceUsd;

    return {
      price,
      priceUsd,
      tokenSymbol,
      tokenAmount: tokenAmount.toFixed(token.decimals),
      tokenDecimals: token.decimals,
      chain: baseQuote.chain,
      chainId: baseQuote.chainId,
      tokenAddress,
      blockExplorer: baseQuote.blockExplorer,
      priceConfidence: resolvedPrice.confidence,
      riskLevel: token.riskLevel,
      estimatedGasCostUsd: 0.5, // Placeholder - would calculate from gas price
    };
  }

  /**
   * Validate token payment configuration
   *
   * @param chainKey - Chain to validate
   * @param tokenSymbol - Token to validate
   * @returns Validation result with errors if any
   */
  validateTokenConfig(
    chainKey: ChainKey,
    tokenSymbol: string
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate chain config
    const chainValidation = super.validateChainConfig(chainKey);
    if (!chainValidation.valid) {
      errors.push(...chainValidation.errors);
    }

    // Validate token is registered
    if (!tokenRegistry.isSupported(tokenSymbol)) {
      errors.push(`Token ${tokenSymbol} not found in registry`);
      return { valid: false, errors };
    }

    // Validate token on chain
    if (!tokenRegistry.isSupportedOnChain(tokenSymbol, chainKey)) {
      errors.push(`Token ${tokenSymbol} not supported on ${chainKey}`);
    }

    // Validate token address
    const tokenAddress = tokenRegistry.getTokenAddress(tokenSymbol, chainKey);
    if (!tokenAddress || tokenAddress.length < 10) {
      errors.push(`Token address not configured for ${tokenSymbol} on ${chainKey}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Get supported tokens for a chain
   *
   * @param chainKey - Chain to query
   * @returns List of supported token symbols
   */
  getSupportedTokens(chainKey: ChainKey): string[] {
    const tokens = tokenRegistry.getTokensForChain(chainKey);
    return tokens.map(t => t.symbol);
  }

  /**
   * Get token information
   *
   * @param tokenSymbol - Token symbol
   * @returns Token registry entry or null
   */
  getTokenInfo(tokenSymbol: string): TokenRegistryEntry | null {
    return tokenRegistry.getToken(tokenSymbol);
  }
}

/**
 * Singleton multi-token payment engine instance
 */
export const multiTokenEngine = new MultiTokenPaymentEngine();
