/**
 * X402 Payment Engine
 * Standalone payment processor - decoupled from routes/UI
 * Production-ready with retry logic and comprehensive error handling
 */

import { settlePayment, decodePayment } from "thirdweb/x402";
import { thirdwebFacilitator } from "./facilitator";
import { PAYMENT_CHAINS, type ChainKey } from "../shared/payment-config";
import { log } from "./logger";

/**
 * Payment configuration constants
 */
const PAYMENT_CONFIG = {
  maxTimeoutSeconds: 3600, // 1 hour
  mimeTypes: {
    prompt: 'application/json',
    image: 'image/png',
    template: 'application/json'
  }
} as const;

export interface PaymentRequest {
  resourceUrl: string;
  method: string;
  paymentHeader?: string;
  chainKey: ChainKey;
  price: string;
  description: string;
  payToAddress: string;
  category?: string;
}

export interface PaymentResult {
  success: boolean;
  status: number;
  headers: Record<string, string>;
  body?: any;
  metadata?: PaymentMetadata;
  error?: string;
}

export interface PaymentMetadata {
  txHash?: string;
  chainId: number;
  chainName: string;
  price: string;
  description: string;
  category?: string;
  timestamp: string;
  payTo: string;
}

export interface PaymentQuote {
  price: string;
  priceUsd: number;
  currency: string;
  chain: string;
  chainId: number;
  usdcAddress: string;
  blockExplorer: string;
}

export interface VerificationResult {
  verified: boolean;
  chainId: number;
  error?: string;
}

/**
 * Configuration for retry behavior
 */
const RETRY_CONFIG = {
  maxAttempts: 3,
  initialDelayMs: 1000,
  maxDelayMs: 5000,
  backoffMultiplier: 2,
};

/**
 * Transient errors that should trigger retry
 */
const TRANSIENT_ERROR_PATTERNS = [
  /network/i,
  /timeout/i,
  /connection/i,
  /temporary/i,
  /rate limit/i,
  /too many requests/i,
];

/**
 * Check if error is transient and retryable
 */
function isTransientError(error: Error): boolean {
  const message = error.message.toLowerCase();
  return TRANSIENT_ERROR_PATTERNS.some(pattern => pattern.test(message));
}

/**
 * Delay execution for specified milliseconds
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * X402 Payment Engine
 * Handles payment settlement, verification, and quotes
 */
export class X402PaymentEngine {
  /**
   * Process payment settlement with retry logic
   *
   * @param request - Payment request details
   * @returns Payment result with success status and metadata
   */
  async settle(request: PaymentRequest): Promise<PaymentResult> {
    const chainConfig = PAYMENT_CHAINS[request.chainKey];

    // Validate chain configuration
    if (!chainConfig) {
      log(`❌ Invalid chain: ${request.chainKey}`, 'payment-engine');
      return {
        success: false,
        status: 400,
        headers: {},
        error: `Unsupported chain: ${request.chainKey}. Supported chains: ${Object.keys(PAYMENT_CHAINS).join(', ')}`
      };
    }

    // Type assertion to fix TypeScript inference issue
    const config = chainConfig as typeof PAYMENT_CHAINS[keyof typeof PAYMENT_CHAINS];

    // Validate USDC address is configured
    if (!config.usdc || config.usdc.length < 10) {
      log(`❌ USDC not configured for chain: ${request.chainKey}`, 'payment-engine');
      return {
        success: false,
        status: 500,
        headers: {},
        error: `USDC token address not configured for ${config.name}`
      };
    }

    // Validate wallet address
    if (!request.payToAddress || request.payToAddress.length !== 42 || !request.payToAddress.startsWith('0x')) {
      log(`❌ Invalid payTo address: ${request.payToAddress}`, 'payment-engine');
      return {
        success: false,
        status: 500,
        headers: {},
        error: 'Invalid server wallet address configuration'
      };
    }

    log(`⚡ Processing payment: ${request.description} (${request.price}) on ${config.name}`, 'payment-engine');

    // Attempt settlement with retry logic
    let lastError: Error | null = null;
    let attempt = 0;

    while (attempt < RETRY_CONFIG.maxAttempts) {
      attempt++;

      try {
        const result = await settlePayment({
          resourceUrl: request.resourceUrl,
          method: request.method,
          paymentData: request.paymentHeader,
          payTo: request.payToAddress,
          network: {
            id: config.id,
            name: config.name,
            rpc: config.rpcUrl,
          },
          price: request.price,
          facilitator: thirdwebFacilitator,
          routeConfig: {
            description: request.description,
            mimeType: PAYMENT_CONFIG.mimeTypes.prompt,
            maxTimeoutSeconds: PAYMENT_CONFIG.maxTimeoutSeconds,
          },
        });

        // Payment successful
        if (result.status === 200) {
          const metadata: PaymentMetadata = {
            txHash: result.responseHeaders['x-payment-receipt'],
            chainId: config.id,
            chainName: config.name,
            price: request.price,
            description: request.description,
            category: request.category,
            timestamp: new Date().toISOString(),
            payTo: request.payToAddress,
          };

          log(`✅ Payment successful: ${metadata.txHash || 'N/A'}`, 'payment-engine');

          return {
            success: true,
            status: 200,
            headers: result.responseHeaders,
            metadata,
          };
        }

        // Payment required (402) or other non-success status
        log(`⚠️  Payment status ${result.status}: ${request.description}`, 'payment-engine');

        return {
          success: false,
          status: result.status,
          headers: result.responseHeaders,
          body: result.responseBody,
        };

      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));

        // Log detailed error information for debugging
        const errorDetails = error instanceof Error ? {
          message: error.message,
          name: error.name,
          stack: error.stack?.split('\n').slice(0, 3).join('\n'),
        } : { message: String(error) };
        
        log(`❌ Payment error on attempt ${attempt}: ${JSON.stringify(errorDetails, null, 2)}`, 'payment-engine');

        // Check if error is transient and we should retry
        if (isTransientError(lastError) && attempt < RETRY_CONFIG.maxAttempts) {
          const delayMs = Math.min(
            RETRY_CONFIG.initialDelayMs * Math.pow(RETRY_CONFIG.backoffMultiplier, attempt - 1),
            RETRY_CONFIG.maxDelayMs
          );

          log(
            `⚠️  Transient error on attempt ${attempt}/${RETRY_CONFIG.maxAttempts}: ${lastError.message}. Retrying in ${delayMs}ms...`,
            'payment-engine'
          );

          await delay(delayMs);
          continue;
        }

        // Non-transient error or max retries exceeded
        break;
      }
    }

    // All retries exhausted
    const errorMessage = lastError?.message || "Payment processing failed";
    log(`❌ Payment failed after ${attempt} attempts: ${errorMessage}`, 'payment-engine');

    return {
      success: false,
      status: 500,
      headers: {},
      error: `Payment processing failed: ${errorMessage}`,
    };
  }

  /**
   * Verify payment without settlement
   * Used for optional payment verification or audit trails
   *
   * @param paymentHeader - X-Payment header value
   * @param chainKey - Chain to verify on
   * @returns Verification result
   */
  async verify(paymentHeader: string, chainKey: ChainKey): Promise<VerificationResult> {
    if (!paymentHeader) {
      return {
        verified: false,
        chainId: 0,
        error: 'No payment header provided',
      };
    }

    const chainConfig = PAYMENT_CHAINS[chainKey];

    if (!chainConfig) {
      return {
        verified: false,
        chainId: 0,
        error: `Invalid chain: ${chainKey}`,
      };
    }

    // Type assertion to fix TypeScript inference
    const config = chainConfig as typeof PAYMENT_CHAINS[keyof typeof PAYMENT_CHAINS];

    try {
      // Decode the payment header to verify its structure and validity
      const decodedPayment = decodePayment(paymentHeader);

      // Basic validation - check if the payment has required fields
      const verified = !!(
        decodedPayment &&
        typeof decodedPayment === 'object' &&
        'amount' in decodedPayment &&
        'tokenAddress' in decodedPayment &&
        'chainId' in decodedPayment
      );

      log(
        `${verified ? '✅' : '❌'} Payment verification: ${verified}`,
        'payment-engine'
      );

      return {
        verified,
        chainId: config.id,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      log(`❌ Payment verification error: ${errorMessage}`, 'payment-engine');

      return {
        verified: false,
        chainId: config.id,
        error: errorMessage,
      };
    }
  }

  /**
   * Get payment quote for UI display
   * Does not perform any blockchain operations
   *
   * @param price - Price string (e.g., "$0.10")
   * @param chainKey - Chain for payment
   * @returns Payment quote information
   */
  getQuote(price: string, chainKey: ChainKey): PaymentQuote | null {
    const chainConfig = PAYMENT_CHAINS[chainKey];

    if (!chainConfig) {
      return null;
    }

    const priceUsd = parseFloat(price.replace('$', ''));

    return {
      price,
      priceUsd,
      currency: "USDC",
      chain: chainConfig.name,
      chainId: chainConfig.id,
      usdcAddress: chainConfig.usdc,
      blockExplorer: chainConfig.explorer
    };
  }

  /**
   * Validate payment configuration for a chain
   *
   * @param chainKey - Chain to validate
   * @returns Validation result with errors if any
   */
  validateChainConfig(chainKey: ChainKey): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    const chainConfig = PAYMENT_CHAINS[chainKey];

    if (!chainConfig) {
      errors.push(`Chain ${chainKey} not found in configuration`);
      return { valid: false, errors };
    }

    if (!chainConfig.usdc || chainConfig.usdc.length < 10) {
      errors.push(`USDC address not configured for ${chainConfig.name}`);
    }

    if (!chainConfig.rpcUrl || chainConfig.rpcUrl.length === 0) {
      errors.push(`RPC URL not configured for ${chainConfig.name}`);
    }

    if (chainConfig.id <= 0) {
      errors.push(`Invalid chain ID for ${chainConfig.name}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

/**
 * Singleton instance of payment engine
 * Import this to use across the application
 */
export const paymentEngine = new X402PaymentEngine();
