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

import React from 'react';
import { useFetchWithPayment } from "thirdweb/react";
import { useActiveAccount } from "thirdweb/react";
import { thirdwebClient } from "../lib/thirdweb-client";
import { type ChainKey } from "../lib/payment-config";

export interface ImageGenerationSettings {
  prompt: string;
  evil?: number;
  middleFinger?: boolean;
  cameraEffects?: string[];
  aspectRatio?: string;
  resolution?: '1K' | '2K' | '4K';
  referenceImage?: string;
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
    maxValue: 10_000_000n, // Maximum 10 USDC (6 decimals)
    parseAs: "json",
    theme: "dark",
    uiEnabled: true,
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
      const result = await fetchWithPayment(
        `/api/prompts/${promptId}/content?chain=${chain}`,
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
      const result = await fetchWithPayment(
        `/api/generate-image?chain=${chain}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(settings),
        }
      );

      return result;
    } catch (error) {
      console.error('Failed to generate image:', error);
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
    isPending,
    getPaymentStatus,
  };
}

/**
 * Helper hook to check if user can make payments
 * (Has wallet connected via Privy/Thirdweb)
 */
export function usePaymentReady() {
  const account = useSafeActiveAccount();

  return {
    isReady: !!account,
    needsConnection: !account,
    needsFunding: false, // TODO: Check USDC balance in next hook
    walletAddress: account?.address,
  };
}
