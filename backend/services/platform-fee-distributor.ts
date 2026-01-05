/**
 * Platform Fee Distributor (Option B: Backend Fee Collection)
 * 
 * This service handles collecting and distributing platform fees to the treasury.
 * For MVP, this uses backend wallet to collect fees and send to treasury.
 */

import { createThirdwebClient } from 'thirdweb';
import { privateKeyToAccount } from 'thirdweb/wallets';
import { sendTransaction, prepareTransaction } from 'thirdweb';
import { defineChain } from 'thirdweb/chains';
import { calculatePlatformFee } from './payment-verification';

// LUKSO Mainnet Configuration
const lukso = defineChain({
  id: 42,
  name: 'LUKSO',
  rpc: process.env.LUKSO_RPC_URL || 'https://42.rpc.thirdweb.com',
  nativeCurrency: {
    name: 'LYX',
    symbol: 'LYX',
    decimals: 18
  }
});

// Testnet Configuration
const luksoTestnet = defineChain({
  id: 4201,
  name: 'LUKSO Testnet',
  rpc: process.env.LUKSO_TESTNET_RPC_URL || 'https://4201.rpc.thirdweb.com',
  nativeCurrency: {
    name: 'LYXt',
    symbol: 'LYXt',
    decimals: 18
  }
});

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
 * Get platform wallet account
 */
function getPlatformWallet(useTestnet: boolean = false) {
  const privateKey = process.env.PLATFORM_WALLET_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('PLATFORM_WALLET_PRIVATE_KEY environment variable is not set');
  }

  const client = getThirdwebClient();
  const chain = getChain(useTestnet);

  return privateKeyToAccount({
    client,
    privateKey: privateKey as `0x${string}`
  });
}

/**
 * Distributes collected platform fees to treasury
 * 
 * Note: In production, fees should ideally be collected automatically via smart contract.
 * This backend approach is simpler for MVP but requires the platform wallet to hold funds.
 */
export async function distributePlatformFee(
  generationId: string,
  transactionAmount: string,
  useTestnet: boolean = false
): Promise<PlatformFeeDistribution> {
  try {
    const feeAmount = calculatePlatformFee(transactionAmount);
    const treasuryAddress = process.env.TREASURY_ADDRESS;

    if (!treasuryAddress) {
      console.warn('TREASURY_ADDRESS not set, skipping fee distribution');
      return {
        success: false,
        feeAmount: '0',
        error: 'Treasury address not configured'
      };
    }

    console.log(`💰 Distributing platform fee: ${feeAmount} LYX to ${treasuryAddress} for generation ${generationId}`);

    // Get platform wallet
    const platformWallet = getPlatformWallet(useTestnet);
    const chain = getChain(useTestnet);

    // Convert fee amount to wei (BigInt)
    const feeAmountWei = BigInt(Math.floor(parseFloat(feeAmount) * 1e18));

    // Send fee to treasury
    // Prepare transaction first, then send it
    const client = getThirdwebClient();
    const preparedTx = await prepareTransaction({
      client,
      chain: chain,
      to: treasuryAddress as `0x${string}`,
      value: feeAmountWei,
    });
    
    const transaction = await sendTransaction({
      account: platformWallet,
      transaction: preparedTx,
    });

    console.log(`✅ Platform fee distributed: ${transaction.transactionHash}`);

    return {
      success: true,
      feeAmount,
      transactionHash: transaction.transactionHash
    };

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`❌ Fee distribution failed for generation ${generationId}:`, error);
    return {
      success: false,
      feeAmount: '0',
      error: errorMessage
    };
  }
}

/**
 * Batch distribute fees (more gas-efficient)
 * Collects multiple fees and sends in one transaction
 */
export async function batchDistributeFees(
  pendingFees: Array<{ generationId: string; amount: string }>,
  useTestnet: boolean = false
): Promise<PlatformFeeDistribution> {
  try {
    const totalFee = pendingFees.reduce(
      (sum, fee) => sum + parseFloat(calculatePlatformFee(fee.amount)),
      0
    );

    if (totalFee <= 0) {
      return {
        success: false,
        feeAmount: '0',
        error: 'No fees to distribute'
      };
    }

    const result = await distributePlatformFee(
      `batch-${Date.now()}`,
      totalFee.toString(),
      useTestnet
    );

    if (result.success) {
      console.log(`✅ Batch distributed ${totalFee} LYX for ${pendingFees.length} generations`);
    }

    return result;
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Batch fee distribution failed:', error);
    return {
      success: false,
      feeAmount: '0',
      error: errorMessage
    };
  }
}

