/**
 * LUKSO Payment Verification Service
 *
 * Verifies blockchain payments on the LUKSO network using Thirdweb.
 * Handles transaction validation, amount verification, and platform fee distribution.
 */

import { createThirdwebClient, getContract } from 'thirdweb';
import { defineChain } from 'thirdweb/chains';
import { getRpcClient, eth_getTransactionByHash, eth_getBlockByNumber } from 'thirdweb/rpc';

// LUKSO Mainnet Configuration
const lukso = defineChain({
  id: 42,
  name: 'LUKSO',
  rpc: 'https://42.rpc.thirdweb.com',
  nativeCurrency: {
    name: 'LYX',
    symbol: 'LYX',
    decimals: 18
  }
});

// Testnet Configuration (for testing)
const luksoTestnet = defineChain({
  id: 4201,
  name: 'LUKSO Testnet',
  rpc: 'https://4201.rpc.thirdweb.com',
  nativeCurrency: {
    name: 'LYXt',
    symbol: 'LYXt',
    decimals: 18
  }
});

export interface PaymentVerification {
  verified: boolean;
  amountPaid?: string;
  from?: string;
  to?: string;
  blockNumber?: number;
  timestamp?: number;
  transactionHash?: string;
  error?: string;
}

export interface PlatformFeeDistribution {
  success: boolean;
  feeAmount: string;
  transactionHash?: string;
  error?: string;
}

/**
 * Initialize Thirdweb client
 */
function getThirdwebClient() {
  const secretKey = process.env.THIRDWEB_SECRET_KEY;
  if (!secretKey) {
    throw new Error('THIRDWEB_SECRET_KEY environment variable is not set');
  }

  return createThirdwebClient({ secretKey });
}

/**
 * Get the appropriate chain (mainnet or testnet)
 */
function getChain(useTestnet: boolean = false) {
  return useTestnet ? luksoTestnet : lukso;
}

/**
 * Verifies a payment transaction on the LUKSO blockchain
 *
 * @param transactionHash - The transaction hash to verify
 * @param expectedAmount - Expected payment amount in LYX (as string)
 * @param recipientAddress - Expected recipient address (prompt creator)
 * @param useTestnet - Whether to use testnet instead of mainnet
 * @returns Verification result
 */
export async function verifyPayment(
  transactionHash: string,
  expectedAmount: string,
  recipientAddress: string,
  useTestnet: boolean = false
): Promise<PaymentVerification> {
  try {
    console.log(`🔍 Verifying payment: ${transactionHash} on ${useTestnet ? 'testnet' : 'mainnet'}`);

    const client = getThirdwebClient();
    const chain = getChain(useTestnet);
    const rpcRequest = getRpcClient({ client, chain });

    // 1. Get transaction details from blockchain
    const tx = await eth_getTransactionByHash(rpcRequest, {
      hash: transactionHash as `0x${string}`
    });

    if (!tx) {
      return {
        verified: false,
        error: 'Transaction not found on blockchain'
      };
    }

    // 2. Verify transaction was successful (mined)
    if (!tx.blockNumber) {
      return {
        verified: false,
        error: 'Transaction not yet mined'
      };
    }

    // 3. Verify recipient address
    if (tx.to?.toLowerCase() !== recipientAddress.toLowerCase()) {
      return {
        verified: false,
        error: `Payment sent to wrong address. Expected ${recipientAddress}, got ${tx.to}`
      };
    }

    // 4. Verify amount (convert expectedAmount to wei)
    const expectedAmountWei = BigInt(parseFloat(expectedAmount) * 1e18);
    const actualAmountWei = BigInt(tx.value);

    // Allow 0.1% tolerance for rounding errors
    const tolerance = expectedAmountWei / 1000n;
    const difference = actualAmountWei > expectedAmountWei
      ? actualAmountWei - expectedAmountWei
      : expectedAmountWei - actualAmountWei;

    if (difference > tolerance) {
      const actualAmountLYX = Number(actualAmountWei) / 1e18;
      return {
        verified: false,
        error: `Incorrect payment amount. Expected ${expectedAmount} LYX, got ${actualAmountLYX.toFixed(6)} LYX`
      };
    }

    // 5. Get block timestamp for additional verification
    let timestamp: number | undefined;
    try {
      const block = await eth_getBlockByNumber(rpcRequest, {
        blockNumber: tx.blockNumber,
        includeTransactions: false
      });
      timestamp = block ? Number(block.timestamp) : undefined;
    } catch (blockError) {
      console.warn('Could not fetch block timestamp:', blockError);
    }

    console.log(`✅ Payment verified: ${expectedAmount} LYX from ${tx.from} to ${tx.to}`);

    return {
      verified: true,
      amountPaid: expectedAmount,
      from: tx.from,
      to: tx.to!,
      blockNumber: Number(tx.blockNumber),
      timestamp,
      transactionHash
    };

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Payment verification error:', error);
    return {
      verified: false,
      error: `Verification failed: ${errorMessage}`
    };
  }
}

/**
 * Calculates platform fee (3% of transaction amount)
 */
export function calculatePlatformFee(amount: string): string {
  // Use BigInt for precise calculation to avoid floating point errors
  const amountWei = BigInt(Math.floor(parseFloat(amount) * 1e18));
  const feeWei = amountWei * 3n / 100n; // 3% = 3/100
  return (Number(feeWei) / 1e18).toFixed(18);
}

/**
 * Calculates the total amount including platform fee
 */
export function calculateTotalWithFee(amount: string): { total: string; fee: string } {
  // Use BigInt for precise calculation
  const amountWei = BigInt(Math.floor(parseFloat(amount) * 1e18));
  const feeWei = amountWei * 3n / 100n; // 3% = 3/100
  const totalWei = amountWei + feeWei;

  return {
    total: (Number(totalWei) / 1e18).toFixed(18),
    fee: (Number(feeWei) / 1e18).toFixed(18)
  };
}

/**
 * Distributes platform fee to treasury
 * Delegates to platform-fee-distributor service (Option B: Backend Fee Collection)
 */
export async function distributePlatformFee(
  generationId: string,
  transactionAmount: string,
  useTestnet: boolean = false
): Promise<PlatformFeeDistribution> {
  // Import and use the real fee distributor
  const { distributePlatformFee: distributeFee } = await import('./platform-fee-distributor');
  return distributeFee(generationId, transactionAmount, useTestnet);
}

/**
 * Validates LUKSO address format
 */
export function isValidLUKSOAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Validates LYX amount format and reasonableness
 */
export function isValidLYXAmount(amount: string): boolean {
  const num = parseFloat(amount);
  return !isNaN(num) && num > 0 && num <= 1000000; // Reasonable upper bound
}

/**
 * Gets current LYX price (delegates to price oracle)
 */
export async function getLYXPrice(): Promise<{ price: number; currency: string } | null> {
  // Import and use the real price oracle
  const { getLYXPrice: getPriceFromOracle } = await import('./lyx-price-oracle');
  return getPriceFromOracle();
}

/**
 * Converts USD to LYX amount
 */
export async function convertUSDToLYX(usdAmount: number): Promise<string> {
  const priceInfo = await getLYXPrice();
  if (!priceInfo) {
    throw new Error('Could not fetch LYX price');
  }

  const lyxAmount = usdAmount / priceInfo.price;
  return lyxAmount.toFixed(18);
}

/**
 * Converts LYX to USD amount
 */
export async function convertLYXToUSD(lyxAmount: string): Promise<number> {
  const priceInfo = await getLYXPrice();
  if (!priceInfo) {
    throw new Error('Could not fetch LYX price');
  }

  const usdAmount = parseFloat(lyxAmount) * priceInfo.price;
  return usdAmount;
}

// Export testnet versions for testing
export const testnet = {
  verifyPayment: (txHash: string, amount: string, recipient: string) =>
    verifyPayment(txHash, amount, recipient, true),
  distributePlatformFee: (generationId: string, amount: string) =>
    distributePlatformFee(generationId, amount, true)
};
