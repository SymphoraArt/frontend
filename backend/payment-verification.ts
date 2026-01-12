/**
 * On-Chain Payment Verification Module
 *
 * Provides independent verification of blockchain transactions
 * to prevent fraud and ensure payment integrity.
 */

import { ethers } from 'ethers';
import { getSupabaseServerClient } from '@/lib/supabaseServer';

// USDC Contract ABI (ERC20 Transfer event)
const USDC_ABI = [
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'function decimals() view returns (uint8)',
];

// Chain configurations
const CHAIN_CONFIGS: Record<string, {
  rpcUrl: string;
  usdcAddress: string;
  chainId: number;
  chainName: string;
  blockConfirmations: number;
}> = {
  'base-sepolia': {
    rpcUrl: process.env.BASE_SEPOLIA_RPC_URL || 'https://sepolia.base.org',
    usdcAddress: '0x036CbD53842c5426634e7929541eC2318f3dCF7e', // USDC on Base Sepolia
    chainId: 84532,
    chainName: 'Base Sepolia',
    blockConfirmations: 1,
  },
  'base': {
    rpcUrl: process.env.BASE_RPC_URL || 'https://mainnet.base.org',
    usdcAddress: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', // USDC on Base
    chainId: 8453,
    chainName: 'Base',
    blockConfirmations: 3,
  },
};

export interface PaymentVerificationParams {
  txHash: string;
  chainKey: string;
  expectedRecipient: string;
  expectedAmountUSDC: number; // Amount in cents (e.g., 1000 = $10.00)
  tolerancePercent?: number; // Default 1%
}

export interface PaymentVerificationResult {
  verified: boolean;
  onChainData?: {
    from: string;
    to: string;
    amountUSDC: number; // In cents
    amountRaw: string; // Raw wei value
    blockNumber: number;
    blockTimestamp: number;
    confirmations: number;
    txHash: string;
  };
  error?: string;
  verificationMethod: string;
}

/**
 * Verify a payment transaction on-chain
 *
 * This function:
 * 1. Fetches the transaction from the blockchain
 * 2. Verifies it's a USDC transfer to the expected recipient
 * 3. Verifies the amount matches (within tolerance)
 * 4. Checks block confirmations
 * 5. Records verification in database
 */
export async function verifyPaymentOnChain(
  params: PaymentVerificationParams
): Promise<PaymentVerificationResult> {
  const {
    txHash,
    chainKey,
    expectedRecipient,
    expectedAmountUSDC,
    tolerancePercent = 1,
  } = params;

  const config = CHAIN_CONFIGS[chainKey];
  if (!config) {
    return {
      verified: false,
      error: `Unsupported chain: ${chainKey}`,
      verificationMethod: 'rpc',
    };
  }

  try {
    // Create provider
    const provider = new ethers.JsonRpcProvider(config.rpcUrl);

    // Fetch transaction receipt
    const receipt = await provider.getTransactionReceipt(txHash);
    if (!receipt) {
      return {
        verified: false,
        error: 'Transaction not found or not confirmed',
        verificationMethod: 'rpc',
      };
    }

    // Verify chain ID matches
    const network = await provider.getNetwork();
    if (Number(network.chainId) !== config.chainId) {
      return {
        verified: false,
        error: `Chain ID mismatch. Expected ${config.chainId}, got ${network.chainId}`,
        verificationMethod: 'rpc',
      };
    }

    // Check if transaction was successful
    if (receipt.status !== 1) {
      return {
        verified: false,
        error: 'Transaction failed on-chain',
        verificationMethod: 'rpc',
      };
    }

    // Parse USDC transfer event
    const usdcContract = new ethers.Contract(
      config.usdcAddress,
      USDC_ABI,
      provider
    );

    const transferEvents = receipt.logs
      .filter(log => log.address.toLowerCase() === config.usdcAddress.toLowerCase())
      .map(log => {
        try {
          return usdcContract.interface.parseLog({
            topics: log.topics as string[],
            data: log.data,
          });
        } catch {
          return null;
        }
      })
      .filter(event => event !== null && event.name === 'Transfer');

    if (transferEvents.length === 0) {
      return {
        verified: false,
        error: 'No USDC transfer found in transaction',
        verificationMethod: 'rpc',
      };
    }

    // Find the transfer to our recipient
    const transferEvent = transferEvents.find(event =>
      event && event.args.to.toLowerCase() === expectedRecipient.toLowerCase()
    );

    if (!transferEvent) {
      return {
        verified: false,
        error: `No USDC transfer to expected recipient ${expectedRecipient}`,
        verificationMethod: 'rpc',
      };
    }

    // Get block for timestamp
    const block = await provider.getBlock(receipt.blockNumber);
    if (!block) {
      return {
        verified: false,
        error: 'Could not fetch block data',
        verificationMethod: 'rpc',
      };
    }

    // Convert USDC amount (6 decimals) to cents
    const amountRaw = transferEvent.args.value.toString();
    const amountUSDC = Number(ethers.formatUnits(amountRaw, 6)) * 100; // Convert to cents

    // Verify amount within tolerance
    const expectedMin = expectedAmountUSDC * (1 - tolerancePercent / 100);
    const expectedMax = expectedAmountUSDC * (1 + tolerancePercent / 100);

    if (amountUSDC < expectedMin || amountUSDC > expectedMax) {
      return {
        verified: false,
        error: `Amount mismatch. Expected ${expectedAmountUSDC} cents, got ${amountUSDC} cents`,
        verificationMethod: 'rpc',
        onChainData: {
          from: transferEvent.args.from,
          to: transferEvent.args.to,
          amountUSDC,
          amountRaw,
          blockNumber: receipt.blockNumber,
          blockTimestamp: block.timestamp,
          confirmations: 0,
          txHash,
        },
      };
    }

    // Check confirmations
    const currentBlock = await provider.getBlockNumber();
    const confirmations = currentBlock - receipt.blockNumber + 1;

    if (confirmations < config.blockConfirmations) {
      return {
        verified: false,
        error: `Insufficient confirmations. Required ${config.blockConfirmations}, got ${confirmations}`,
        verificationMethod: 'rpc',
        onChainData: {
          from: transferEvent.args.from,
          to: transferEvent.args.to,
          amountUSDC,
          amountRaw,
          blockNumber: receipt.blockNumber,
          blockTimestamp: block.timestamp,
          confirmations,
          txHash,
        },
      };
    }

    // All checks passed
    return {
      verified: true,
      verificationMethod: 'rpc',
      onChainData: {
        from: transferEvent.args.from,
        to: transferEvent.args.to,
        amountUSDC,
        amountRaw,
        blockNumber: receipt.blockNumber,
        blockTimestamp: block.timestamp,
        confirmations,
        txHash,
      },
    };

  } catch (error) {
    console.error('Payment verification error:', error);
    return {
      verified: false,
      error: error instanceof Error ? error.message : 'Unknown verification error',
      verificationMethod: 'rpc',
    };
  }
}

/**
 * Record payment verification in database
 */
export async function recordPaymentVerification(
  purchaseId: string,
  verificationResult: PaymentVerificationResult,
  chainId: number,
  chainName: string
): Promise<void> {
  const supabase = getSupabaseServerClient();

  await supabase.from('payment_verifications').insert({
    purchase_id: purchaseId,
    transaction_hash: verificationResult.onChainData?.txHash || '',
    chain_id: chainId,
    chain_name: chainName,
    verified: verificationResult.verified,
    verification_method: verificationResult.verificationMethod,
    on_chain_amount_usdc: verificationResult.onChainData?.amountUSDC
      ? (verificationResult.onChainData.amountUSDC / 100).toString()
      : null,
    on_chain_recipient: verificationResult.onChainData?.to || null,
    on_chain_sender: verificationResult.onChainData?.from || null,
    block_number: verificationResult.onChainData?.blockNumber || null,
    block_timestamp: verificationResult.onChainData?.blockTimestamp
      ? new Date(verificationResult.onChainData.blockTimestamp * 1000).toISOString()
      : null,
    confirmations: verificationResult.onChainData?.confirmations || null,
    verification_error: verificationResult.error || null,
  });
}

/**
 * Check if a transaction has already been verified
 */
export async function checkExistingVerification(
  txHash: string
): Promise<{ exists: boolean; verified?: boolean; purchaseId?: string }> {
  const supabase = getSupabaseServerClient();

  const { data, error } = await supabase
    .from('payment_verifications')
    .select('verified, purchase_id')
    .eq('transaction_hash', txHash)
    .maybeSingle();

  if (error || !data) {
    return { exists: false };
  }

  return {
    exists: true,
    verified: data.verified,
    purchaseId: data.purchase_id,
  };
}
