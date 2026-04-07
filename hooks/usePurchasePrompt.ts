"use client";

/**
 * Purchase Prompt Hook
 *
 * Handles the complete flow for purchasing a prompt including:
 * - Authentication
 * - Payment processing
 * - Content access
 */

import { useState, useCallback } from 'react';
import { useWalletAuth, authenticatedFetch } from './useWalletAuth';

interface PurchasePromptParams {
  promptId: string;
  chain?: string;
}

interface PurchaseResult {
  success: boolean;
  accessToken?: string;
  expiresAt?: string;
  expiresIn?: number;
  variables?: any[];
  contentUrl?: string;
  purchase?: {
    transactionHash?: string;
    amountPaid?: string;
    creatorEarnings?: string;
    platformFee?: string;
    chainId?: number;
    chainName?: string;
  };
  alreadyPurchased?: boolean;
  isFree?: boolean;
  message?: string;
  error?: string;
}

interface UsePurchasePromptReturn {
  isPurchasing: boolean;
  purchaseResult: PurchaseResult | null;
  purchasePrompt: (params: PurchasePromptParams) => Promise<PurchaseResult>;
  reset: () => void;
  error: string | null;
}

/**
 * Hook for purchasing prompts with authentication
 */
export function usePurchasePrompt(): UsePurchasePromptReturn {
  const { authHeaders, authenticate } = useWalletAuth();
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState<PurchaseResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const purchasePrompt = useCallback(
    async (params: PurchasePromptParams): Promise<PurchaseResult> => {
      setIsPurchasing(true);
      setError(null);
      setPurchaseResult(null);

      try {
        // Step 1: Ensure user is authenticated
        let headers = authHeaders;
        if (!headers) {
          const authSuccess = await authenticate();
          if (!authSuccess) {
            throw new Error('Authentication failed');
          }
          // Get headers after authentication
          headers = authHeaders;
          if (!headers) {
            throw new Error('Failed to get authentication headers');
          }
        }

        // Step 2: Make purchase request
        const response = await authenticatedFetch(
          `/api/prompts/${params.promptId}/purchase`,
          headers,
          {
            method: 'POST',
            body: JSON.stringify({
              chain: params.chain || 'base-sepolia',
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          // Handle specific error cases
          if (response.status === 402) {
            // Payment required - check for payment headers
            const paymentHeader = response.headers.get('X-Payment');
            if (paymentHeader) {
              throw new Error(
                'Payment required. Please ensure you have sufficient USDC balance and approve the transaction.'
              );
            }
          }

          throw new Error(data.error || `Purchase failed with status ${response.status}`);
        }

        const result: PurchaseResult = {
          success: true,
          ...data,
        };

        setPurchaseResult(result);
        setIsPurchasing(false);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Purchase failed';
        setError(errorMessage);
        setIsPurchasing(false);

        const errorResult: PurchaseResult = {
          success: false,
          error: errorMessage,
        };

        setPurchaseResult(errorResult);
        return errorResult;
      }
    },
    [authHeaders, authenticate]
  );

  const reset = useCallback(() => {
    setPurchaseResult(null);
    setError(null);
  }, []);

  return {
    isPurchasing,
    purchaseResult,
    purchasePrompt,
    reset,
    error,
  };
}

/**
 * Hook for fetching prompt content after purchase
 */
export function usePromptContent(accessToken: string | null) {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchContent = useCallback(
    async (promptId: string) => {
      if (!accessToken) {
        setError('No access token available');
        return null;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/prompts/${promptId}/content/secure?token=${accessToken}`
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch content');
        }

        const data = await response.json();
        setContent(data.content);
        setIsLoading(false);
        return data.content;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch content';
        setError(errorMessage);
        setIsLoading(false);
        return null;
      }
    },
    [accessToken]
  );

  return {
    isLoading,
    content,
    fetchContent,
    error,
  };
}

/**
 * Hook for listing a prompt on the marketplace
 */
export function useListPrompt() {
  const { authHeaders, authenticate } = useWalletAuth();
  const [isListing, setIsListing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const listPrompt = useCallback(
    async (
      promptId: string,
      params: {
        priceUsdCents: number;
        licenseType: 'personal' | 'commercial' | 'exclusive';
        description?: string;
        tags?: string[];
        category?: string;
      }
    ) => {
      setIsListing(true);
      setError(null);

      try {
        // Ensure user is authenticated
        let headers = authHeaders;
        if (!headers) {
          const authSuccess = await authenticate();
          if (!authSuccess) {
            throw new Error('Authentication failed');
          }
          headers = authHeaders;
          if (!headers) {
            throw new Error('Failed to get authentication headers');
          }
        }

        const response = await authenticatedFetch(
          `/api/prompts/${promptId}/list`,
          headers,
          {
            method: 'POST',
            body: JSON.stringify(params),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to list prompt');
        }

        setIsListing(false);
        return data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to list prompt';
        setError(errorMessage);
        setIsListing(false);
        throw err;
      }
    },
    [authHeaders, authenticate]
  );

  return {
    isListing,
    listPrompt,
    error,
  };
}
