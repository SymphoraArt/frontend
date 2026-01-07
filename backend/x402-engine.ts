/**
 * X402 Payment Engine
 * Standalone payment processor - decoupled from routes/UI
 * Production-ready with retry logic and comprehensive error handling
 */

import { settlePayment, verifyPayment, decodePayment } from "thirdweb/x402";
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

/**
 * Price format: USD string or ERC20 token specification
 */
export type PriceFormat = 
  | string // USD string (e.g., "$0.10") - defaults to USDC
  | {
      amount: string; // Amount in base units (e.g., "1000000" for 1 USDC with 6 decimals)
      asset: {
        address: string; // ERC20 token address
        decimals?: number; // Optional decimals (defaults to token's native decimals)
      };
    };

export interface PaymentRequest {
  resourceUrl: string;
  method: string;
  paymentHeader?: string;
  chainKey: ChainKey;
  price: PriceFormat; // Supports both USD strings and ERC20 format
  description: string;
  payToAddress: string;
  category?: string;
}

/**
 * Upto payment scheme request
 * Allows dynamic pricing based on actual usage
 */
export interface UptoPaymentRequest extends Omit<PaymentRequest, 'price'> {
  scheme: "upto";
  maxPrice: PriceFormat; // Maximum amount user authorizes (USD string or ERC20)
  minPrice: PriceFormat; // Minimum amount that must be paid (USD string or ERC20)
  actualPrice?: PriceFormat; // Actual price after work is done (calculated dynamically)
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
  // Upto payment scheme metadata (optional)
  maxPrice?: string;
  minPrice?: string;
  actualPrice?: string;
  workMetadata?: Record<string, any>;
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

    // Format price for settlePayment (supports both USD string and ERC20 format)
    const priceConfig = typeof request.price === 'string' 
      ? request.price 
      : {
          amount: request.price.amount,
          asset: {
            address: request.price.asset.address as `0x${string}`,
            ...(request.price.asset.decimals !== undefined && { decimals: request.price.asset.decimals }),
          },
        };

    const priceDisplay = typeof request.price === 'string' 
      ? request.price 
      : `${request.price.amount} tokens at ${request.price.asset.address}`;

    log(`⚡ Processing payment: ${request.description} (${priceDisplay}) on ${config.name}`, 'payment-engine');

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
          price: priceConfig,
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
            price: typeof request.price === 'string' ? request.price : `${request.price.amount} @ ${request.price.asset.address}`,
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
   * Settle payment with upto scheme (dynamic pricing)
   * 
   * Flow:
   * 1. Verify payment is valid for maximum amount
   * 2. Do the expensive work (e.g., call AI API)
   * 3. Calculate actual price based on usage
   * 4. Settle payment with actual price
   * 
   * This is perfect for AI APIs that charge based on token usage.
   * 
   * @param request - Upto payment request with max/min prices
   * @param workCallback - Async function that does the work and returns actual price
   * @returns Payment result with actual settled price
   */
  async settleWithUpto(
    request: UptoPaymentRequest,
    workCallback: () => Promise<{ actualPrice: PriceFormat; metadata?: Record<string, any> }>
  ): Promise<PaymentResult> {
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

    const config = chainConfig as typeof PAYMENT_CHAINS[keyof typeof PAYMENT_CHAINS];

    // Validate USDC address
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

    // Format prices for verifyPayment (supports both USD string and ERC20 format)
    const maxPriceConfig = typeof request.maxPrice === 'string' 
      ? request.maxPrice 
      : {
          amount: request.maxPrice.amount,
          asset: {
            address: request.maxPrice.asset.address as `0x${string}`,
            ...(request.maxPrice.asset.decimals !== undefined && { decimals: request.maxPrice.asset.decimals }),
          },
        };
    
    const minPriceConfig = typeof request.minPrice === 'string' 
      ? request.minPrice 
      : {
          amount: request.minPrice.amount,
          asset: {
            address: request.minPrice.asset.address as `0x${string}`,
            ...(request.minPrice.asset.decimals !== undefined && { decimals: request.minPrice.asset.decimals }),
          },
        };

    const maxPriceDisplay = typeof request.maxPrice === 'string' 
      ? request.maxPrice 
      : `${request.maxPrice.amount} @ ${request.maxPrice.asset.address}`;
    const minPriceDisplay = typeof request.minPrice === 'string' 
      ? request.minPrice 
      : `${request.minPrice.amount} @ ${request.minPrice.asset.address}`;

    log(`⚡ Processing upto payment: ${request.description} (max: ${maxPriceDisplay}, min: ${minPriceDisplay}) on ${config.name}`, 'payment-engine');

    // Step 1: Verify payment is valid for maximum amount
    let verifyResult;
    let attempt = 0;

    while (attempt < RETRY_CONFIG.maxAttempts) {
      attempt++;

      try {
        verifyResult = await verifyPayment({
          resourceUrl: request.resourceUrl,
          method: request.method,
          paymentData: request.paymentHeader,
          payTo: request.payToAddress,
          network: {
            id: config.id,
            name: config.name,
            rpc: config.rpcUrl,
          },
          scheme: "upto",
          price: maxPriceConfig,
          minPrice: minPriceConfig,
          facilitator: thirdwebFacilitator,
          routeConfig: {
            description: request.description,
            mimeType: PAYMENT_CONFIG.mimeTypes.prompt,
            maxTimeoutSeconds: PAYMENT_CONFIG.maxTimeoutSeconds,
          },
        });

        if (verifyResult.status === 200) {
          break; // Verification successful
        }

        // Verification failed - return payment required response
        log(`⚠️  Payment verification failed: ${request.description}`, 'payment-engine');
        return {
          success: false,
          status: verifyResult.status,
          headers: verifyResult.responseHeaders,
          body: verifyResult.responseBody,
        };

      } catch (error) {
        const lastError = error instanceof Error ? error : new Error(String(error));
        
        if (isTransientError(lastError) && attempt < RETRY_CONFIG.maxAttempts) {
          const delayMs = Math.min(
            RETRY_CONFIG.initialDelayMs * Math.pow(RETRY_CONFIG.backoffMultiplier, attempt - 1),
            RETRY_CONFIG.maxDelayMs
          );
          log(`⚠️  Transient error on verify attempt ${attempt}: ${lastError.message}. Retrying...`, 'payment-engine');
          await delay(delayMs);
          continue;
        }

        log(`❌ Payment verification failed after ${attempt} attempts: ${lastError.message}`, 'payment-engine');
        return {
          success: false,
          status: 500,
          headers: {},
          error: `Payment verification failed: ${lastError.message}`,
        };
      }
    }

    if (!verifyResult || verifyResult.status !== 200) {
      return {
        success: false,
        status: 500,
        headers: {},
        error: 'Payment verification failed',
      };
    }

    // Step 2: Do the expensive work and get actual price
    log(`✅ Payment verified for max amount. Doing work...`, 'payment-engine');
    
    let workResult;
    try {
      workResult = await workCallback();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      log(`❌ Work callback failed: ${errorMessage}`, 'payment-engine');
      return {
        success: false,
        status: 500,
        headers: {},
        error: `Work execution failed: ${errorMessage}`,
      };
    }

    const actualPrice = workResult.actualPrice;
    
    // Validate actual price is within bounds
    // For USD strings, parse and compare
    // For ERC20 format, compare amounts directly (must be same token)
    let finalPrice: PriceFormat;
    
    if (typeof request.maxPrice === 'string' && typeof request.minPrice === 'string' && typeof actualPrice === 'string') {
      // All USD strings - compare numerically
      const actualPriceUsd = parseFloat(actualPrice.replace('$', ''));
      const minPriceUsd = parseFloat(request.minPrice.replace('$', ''));
      const maxPriceUsd = parseFloat(request.maxPrice.replace('$', ''));

      if (actualPriceUsd < minPriceUsd) {
        log(`⚠️  Actual price ${actualPrice} is below minimum ${request.minPrice}. Using minimum.`, 'payment-engine');
        finalPrice = request.minPrice;
      } else if (actualPriceUsd > maxPriceUsd) {
        log(`⚠️  Actual price ${actualPrice} exceeds maximum ${request.maxPrice}. Using maximum.`, 'payment-engine');
        finalPrice = request.maxPrice;
      } else {
        finalPrice = actualPrice;
      }
    } else if (typeof request.maxPrice === 'object' && typeof request.minPrice === 'object' && typeof actualPrice === 'object') {
      // All ERC20 format - compare amounts (must be same token)
      if (request.maxPrice.asset.address !== request.minPrice.asset.address || 
          request.maxPrice.asset.address !== actualPrice.asset.address) {
        log(`❌ Token mismatch in upto payment. All prices must use the same token.`, 'payment-engine');
        return {
          success: false,
          status: 400,
          headers: {},
          error: 'Token mismatch: max, min, and actual prices must use the same ERC20 token',
        };
      }
      
      const actualAmount = BigInt(actualPrice.amount);
      const minAmount = BigInt(request.minPrice.amount);
      const maxAmount = BigInt(request.maxPrice.amount);

      if (actualAmount < minAmount) {
        log(`⚠️  Actual amount ${actualPrice.amount} is below minimum ${request.minPrice.amount}. Using minimum.`, 'payment-engine');
        finalPrice = request.minPrice;
      } else if (actualAmount > maxAmount) {
        log(`⚠️  Actual amount ${actualPrice.amount} exceeds maximum ${request.maxPrice.amount}. Using maximum.`, 'payment-engine');
        finalPrice = request.maxPrice;
      } else {
        finalPrice = actualPrice;
      }
    } else {
      log(`❌ Price format mismatch in upto payment. All prices must use the same format.`, 'payment-engine');
      return {
        success: false,
        status: 400,
        headers: {},
        error: 'Price format mismatch: max, min, and actual prices must all be USD strings or all ERC20 format',
      };
    }

    const finalPriceDisplay = typeof finalPrice === 'string' 
      ? finalPrice 
      : `${finalPrice.amount} @ ${finalPrice.asset.address}`;
    const maxPriceDisplayFinal = typeof request.maxPrice === 'string' 
      ? request.maxPrice 
      : `${request.maxPrice.amount} @ ${request.maxPrice.asset.address}`;

    log(`💰 Settling payment with actual price: ${finalPriceDisplay} (was authorized for max: ${maxPriceDisplayFinal})`, 'payment-engine');

    // Step 3: Settle payment with actual price
    attempt = 0;
    while (attempt < RETRY_CONFIG.maxAttempts) {
      attempt++;

      try {
        // Format final price for settlePayment
        const finalPriceConfig = typeof finalPrice === 'string' 
          ? finalPrice 
          : {
              amount: finalPrice.amount,
              asset: {
                address: finalPrice.asset.address as `0x${string}`,
                ...(finalPrice.asset.decimals !== undefined && { decimals: finalPrice.asset.decimals }),
              },
            };

        const settleResult = await settlePayment({
          resourceUrl: request.resourceUrl,
          method: request.method,
          paymentData: request.paymentHeader,
          payTo: request.payToAddress,
          network: {
            id: config.id,
            name: config.name,
            rpc: config.rpcUrl,
          },
          price: finalPriceConfig,
          facilitator: thirdwebFacilitator,
          routeConfig: {
            description: request.description,
            mimeType: PAYMENT_CONFIG.mimeTypes.prompt,
            maxTimeoutSeconds: PAYMENT_CONFIG.maxTimeoutSeconds,
          },
        });

        if (settleResult.status === 200) {
          const priceDisplay = typeof finalPrice === 'string' 
            ? finalPrice 
            : `${finalPrice.amount} @ ${finalPrice.asset.address}`;
          const maxPriceDisplay = typeof request.maxPrice === 'string' 
            ? request.maxPrice 
            : `${request.maxPrice.amount} @ ${request.maxPrice.asset.address}`;

          const metadata: PaymentMetadata = {
            txHash: settleResult.responseHeaders['x-payment-receipt'],
            chainId: config.id,
            chainName: config.name,
            price: priceDisplay,
            description: request.description,
            category: request.category,
            timestamp: new Date().toISOString(),
            payTo: request.payToAddress,
          };

          log(`✅ Upto payment settled successfully: ${metadata.txHash || 'N/A'} (actual: ${priceDisplay}, max: ${maxPriceDisplay})`, 'payment-engine');

          return {
            success: true,
            status: 200,
            headers: settleResult.responseHeaders,
            metadata: {
              ...metadata,
              ...(workResult.metadata && { workMetadata: workResult.metadata }),
              maxPrice: maxPriceDisplay,
              minPrice: typeof request.minPrice === 'string' ? request.minPrice : `${request.minPrice.amount} @ ${request.minPrice.asset.address}`,
              actualPrice: priceDisplay,
            },
          };
        }

        log(`⚠️  Settlement status ${settleResult.status}: ${request.description}`, 'payment-engine');
        return {
          success: false,
          status: settleResult.status,
          headers: settleResult.responseHeaders,
          body: settleResult.responseBody,
        };

      } catch (error) {
        const lastError = error instanceof Error ? error : new Error(String(error));
        
        if (isTransientError(lastError) && attempt < RETRY_CONFIG.maxAttempts) {
          const delayMs = Math.min(
            RETRY_CONFIG.initialDelayMs * Math.pow(RETRY_CONFIG.backoffMultiplier, attempt - 1),
            RETRY_CONFIG.maxDelayMs
          );
          log(`⚠️  Transient error on settle attempt ${attempt}: ${lastError.message}. Retrying...`, 'payment-engine');
          await delay(delayMs);
          continue;
        }

        log(`❌ Payment settlement failed after ${attempt} attempts: ${lastError.message}`, 'payment-engine');
        return {
          success: false,
          status: 500,
          headers: {},
          error: `Payment settlement failed: ${lastError.message}`,
        };
      }
    }

    return {
      success: false,
      status: 500,
      headers: {},
      error: 'Payment settlement failed after all retries',
    };
  }

  /**
   * Verify payment without settlement (using official verifyPayment API)
   * This is the official Thirdweb verifyPayment function that checks:
   * - Allowance is valid and greater than min price
   * - Balance is valid and greater than min price
   * - Payment is still valid (not expired)
   * 
   * @param request - Payment request to verify
   * @returns Verification result with status and headers
   */
  async verifyPaymentOfficial(request: PaymentRequest & { scheme?: "exact" | "upto"; minPrice?: PriceFormat }): Promise<{ status: number; responseHeaders: Record<string, string>; responseBody?: any }> {
    const chainConfig = PAYMENT_CHAINS[request.chainKey];

    if (!chainConfig) {
      throw new Error(`Unsupported chain: ${request.chainKey}`);
    }

    const config = chainConfig as typeof PAYMENT_CHAINS[keyof typeof PAYMENT_CHAINS];

    // Format price for verifyPayment (supports both USD string and ERC20 format)
    const priceConfig = typeof request.price === 'string' 
      ? request.price 
      : {
          amount: request.price.amount,
          asset: {
            address: request.price.asset.address as `0x${string}`,
            ...(request.price.asset.decimals !== undefined && { decimals: request.price.asset.decimals }),
          },
        };

    const verifyArgs: any = {
      resourceUrl: request.resourceUrl,
      method: request.method,
      paymentData: request.paymentHeader,
      payTo: request.payToAddress,
      network: {
        id: config.id,
        name: config.name,
        rpc: config.rpcUrl,
      },
      price: priceConfig,
      facilitator: thirdwebFacilitator,
      routeConfig: {
        description: request.description,
        mimeType: PAYMENT_CONFIG.mimeTypes.prompt,
        maxTimeoutSeconds: PAYMENT_CONFIG.maxTimeoutSeconds,
      },
    };

    if (request.scheme === "upto" && request.minPrice) {
      verifyArgs.scheme = "upto";
      const minPriceConfig = typeof request.minPrice === 'string' 
        ? request.minPrice 
        : {
            amount: request.minPrice.amount,
            asset: {
              address: request.minPrice.asset.address as `0x${string}`,
              ...(request.minPrice.asset.decimals !== undefined && { decimals: request.minPrice.asset.decimals }),
            },
          };
      verifyArgs.minPrice = minPriceConfig;
    }

    const verifyResult = await verifyPayment(verifyArgs);
    
    // Convert verifyPayment result to expected format
    return {
      status: verifyResult.status,
      responseHeaders: verifyResult.status === 200 
        ? { 'x-payment-verified': 'true' }
        : {},
      responseBody: verifyResult.status !== 200 ? verifyResult : undefined,
    };
  }

  /**
   * Verify payment without settlement (legacy method - decodes only)
   * 
   * @deprecated This method only decodes the payment structure and does not check
   * allowance, balance, or expiration. Use `verifyPaymentOfficial()` for full validation
   * that checks allowance, balance, and expiration using the official Thirdweb API.
   * 
   * This method is retained for backward compatibility but should not be used for
   * payment authorization decisions.
   * 
   * @param paymentHeader - X-Payment header value
   * @param chainKey - Chain to verify on
   * @returns Verification result (structural only, not authorization)
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
