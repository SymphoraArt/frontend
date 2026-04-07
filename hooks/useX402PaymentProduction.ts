"use client";

/**
 * Production x402 Payment Hook
 *
 * Handles x402 payments for prompt unlocking and image generation using Thirdweb SDK.
 * Uses useFetchWithPayment for real blockchain payments.
 *
 * @example
 * const { unlockPrompt, generateImage, isPending } = useX402PaymentProduction();
 *
 * // Unlock a prompt
 * const promptContent = await unlockPrompt('prompt-id-123', 'base-sepolia');
 *
 * // Generate an image
 * const image = await generateImage({ prompt: 'A cat', resolution: '2K' }, 'base-sepolia');
 */

import React, { useState, useEffect } from 'react';
import { useFetchWithPayment } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import { thirdwebClient } from "../lib/thirdweb-client";
import { type ChainKey, PAYMENT_CHAINS } from "../lib/payment-config";
import { getContract, readContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

/**
 * ERC-20 ABI (minimal for balance checking)
 */
const ERC20_ABI = [
  {
    inputs: [{ name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export interface ImageGenerationSettings {
  prompt: string;
  evil?: number;
  middleFinger?: boolean;
  cameraEffects?: string[];
  aspectRatio?: string;
  resolution?: '1K' | '2K' | '4K';
  referenceImage?: string;
  /** If false, skip prompt enhancement. Default true. */
  useEnhancement?: boolean;
  userId?: string;
}

/**
 * Safe wrapper for useActiveAccount that handles provider context issues
 */
function useSafeActiveAccount() {
  try {
    // Always call the hook - this must be consistent
    return useActiveAccount();
  } catch (error) {
    // If we're outside of ThirdwebProvider context, return null
    // This happens during SSR or if providers aren't set up yet
    if (error instanceof Error && error.message.includes('must be used within')) {
      return null;
    }
    // Re-throw other errors
    throw error;
  }
}

/**
 * Production hook for x402 payment operations
 * NOTE: This hook requires being used within ThirdwebProvider context
 */
export function useX402PaymentProduction() {
  const account = useActiveAccount();

  const { fetchWithPayment, isPending } = useFetchWithPayment(thirdwebClient, {
    maxValue: BigInt(10000000), // Maximum 10 USDC (6 decimals)
    parseAs: "json",
    theme: "dark",
    uiEnabled: true,
    // Customize wallet funding modal for insufficient balance
    fundWalletOptions: {
      title: "Add Funds to Continue",
      description: "Top up your wallet with USDC to complete this transaction",
    },
    // Note: connectOptions not needed - wallets are already connected via hybrid wallet system
  });

  /**
   * Unlock encrypted prompt content
   *
   * @param promptId - ID of the prompt to unlock
   * @param chain - Blockchain network to use for payment
   * @returns Decrypted prompt content
   */
  const unlockPrompt = async (promptId: string, chain: ChainKey = 'base-sepolia') => {
    if (!account) {
      throw new Error("Wallet not connected. Please connect your wallet to unlock prompts.");
    }

    try {
      // Construct absolute URL for x402 payment (required by the protocol)
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      
      const url = `${baseUrl}/api/prompts/${promptId}/content?chain=${chain}`;
      
      const result = await fetchWithPayment(
        url,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      return result;
    } catch (error) {
      console.error('Failed to unlock prompt:', error);
      throw error;
    }
  };

  /**
   * Generate AI image with payment
   *
   * @param settings - Image generation settings
   * @param chain - Blockchain network to use for payment
   * @returns Generated image URL
   */
  const generateImage = async (
    settings: ImageGenerationSettings,
    chain: ChainKey = 'base-sepolia'
  ) => {
    if (!account) {
      throw new Error("Wallet not connected. Please connect your wallet to generate images.");
    }

    try {
      // Construct absolute URL for x402 payment (required by the protocol)
      const baseUrl = typeof window !== 'undefined' 
        ? window.location.origin 
        : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      
      const url = `${baseUrl}/api/generate-image?chain=${chain}`;
      
      console.log('📡 Calling fetchWithPayment with URL:', url);
      
      const result = await fetchWithPayment(
        url,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(settings),
        }
      );

      console.log('✅ fetchWithPayment result:', result);
      return result;
    } catch (error) {
      console.error('❌ Failed to generate image:', error);
      throw error;
    }
  };

  /**
   * Get payment status information
   */
  const getPaymentStatus = () => {
    return {
      isPending,
      isReady: !isPending && !!account,
      isConnected: !!account,
      walletAddress: account?.address,
    };
  };

  return {
    unlockPrompt,
    generateImage,
    fetchWithPayment,
    isPending,
    getPaymentStatus,
  };
}

/**
 * Helper hook to check if user can make payments
 * Checks wallet connection AND USDC balance on specified chain
 */
export function usePaymentReady(chain: ChainKey = 'base-sepolia', requiredAmount: number = 0) {
  const account = useSafeActiveAccount();
  const [balance, setBalance] = useState<bigint | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [decimals, setDecimals] = useState<number>(6); // USDC default

  useEffect(() => {
    if (!account?.address || requiredAmount === 0) {
      setBalance(null);
      return;
    }

    const checkBalance = async () => {
      setIsChecking(true);
      try {
        const chainConfig = PAYMENT_CHAINS[chain];
        const thirdwebChain = defineChain({
          id: chainConfig.id,
          rpc: chainConfig.rpcUrl,
        });

        const contract = getContract({
          client: thirdwebClient,
          chain: thirdwebChain,
          address: chainConfig.usdc,
          abi: ERC20_ABI,
        });

        // Fetch balance and decimals in parallel
        const [balanceResult, decimalsResult] = await Promise.all([
          readContract({
            contract,
            method: 'balanceOf',
            params: [account.address as `0x${string}`],
          }),
          readContract({
            contract,
            method: 'decimals',
            params: [],
          }),
        ]);

        setBalance(balanceResult);
        setDecimals(Number(decimalsResult));
      } catch (error) {
        console.error('Failed to check USDC balance:', error);
        setBalance(null);
      } finally {
        setIsChecking(false);
      }
    };

    checkBalance();
  }, [account?.address, chain, requiredAmount]);

  // Convert balance to USD for comparison
  const balanceUsd = balance !== null
    ? Number(balance) / Math.pow(10, decimals)
    : 0;

  const shortfall = requiredAmount > 0 && balance !== null
    ? Math.max(0, requiredAmount - balanceUsd)
    : 0;

  return {
    isReady: !!account && (requiredAmount === 0 || balanceUsd >= requiredAmount),
    needsConnection: !account,
    needsFunding: balance !== null && balanceUsd < requiredAmount,
    walletAddress: account?.address,
    balance: balanceUsd,
    shortfall,
    isChecking,
  };
}
