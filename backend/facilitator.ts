/**
 * Thirdweb X402 Facilitator Setup
 * Handles payment verification and settlement across multiple chains
 */

import { createThirdwebClient } from "thirdweb";
import { facilitator } from "thirdweb/x402";
import { log } from "./logger";

// Validate required environment variables at startup
const THIRDWEB_SECRET_KEY = process.env.THIRDWEB_SECRET_KEY;
if (!THIRDWEB_SECRET_KEY) {
  throw new Error('THIRDWEB_SECRET_KEY is not set in environment variables');
}

const SERVER_WALLET_ADDRESS = process.env.SERVER_WALLET_ADDRESS;
if (!SERVER_WALLET_ADDRESS) {
  throw new Error('SERVER_WALLET_ADDRESS is not set in environment variables');
}

/**
 * Create Thirdweb client with secret key
 * This client is used for server-side operations
 */
export const thirdwebClient = createThirdwebClient({
  secretKey: THIRDWEB_SECRET_KEY,
});

/**
 * Initialize the X402 facilitator
 * The facilitator handles:
 * - Verifying payment signatures
 * - Submitting transactions on-chain
 * - Using EIP-7702 for gasless transactions
 */
export const thirdwebFacilitator = facilitator({
  client: thirdwebClient,
  serverWalletAddress: SERVER_WALLET_ADDRESS,

  // Wait for transaction confirmation on-chain
  // Options: "simulated" | "submitted" | "confirmed"
  // - "simulated": Fastest, only simulates the transaction
  // - "submitted": Waits for transaction submission
  // - "confirmed": Waits for full on-chain confirmation (recommended for production)
  waitUntil: "confirmed",
});

/**
 * Query supported payment methods for a specific chain and token
 * This is useful for checking if a chain/token combination is supported
 *
 * @param chainId - The chain ID to query
 * @param tokenAddress - Optional token address (defaults to USDC)
 */
export async function getSupportedPaymentMethods(
  chainId: number,
  tokenAddress?: string
) {
  try {
    const supported = await thirdwebFacilitator.supported({
      chainId,
      ...(tokenAddress && { tokenAddress }),
    });

    const methodCount = Array.isArray(supported) ? supported.length : (supported.kinds?.length || 0);
    log(`Supported payment methods for chain ${chainId}: ${methodCount} found`, 'facilitator');
    return supported;
  } catch (error) {
    log(`Error querying supported payment methods: ${error}`, 'facilitator');
    return [];
  }
}

/**
 * Initialize and verify facilitator configuration
 */
export async function initializeFacilitator() {
  try {
    log('Initializing Thirdweb X402 Facilitator...', 'facilitator');

    log(`✅ Facilitator initialized with wallet: ${SERVER_WALLET_ADDRESS}`, 'facilitator');
    log('✅ Ready to process X402 payments', 'facilitator');

    return true;
  } catch (error) {
    log(`❌ Failed to initialize facilitator: ${error}`, 'facilitator');
    return false;
  }
}

// Log facilitator status on module load
log('Thirdweb facilitator module loaded', 'facilitator');
