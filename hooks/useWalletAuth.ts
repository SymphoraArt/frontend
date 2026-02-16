/**
 * Wallet Authentication Hook
 *
 * Provides EIP-712 typed data signature authentication for wallet users.
 */

import { useState, useCallback } from 'react';
import { useActiveAccount } from 'thirdweb/react';

const AUTH_DOMAIN = {
  name: 'Symphora Marketplace',
  version: '1',
  chainId: 84532,
};

const AUTH_TYPES = {
  Authentication: [
    { name: 'purpose', type: 'string' },
    { name: 'nonce', type: 'string' },
    { name: 'issuedAt', type: 'uint256' },
    { name: 'expiresAt', type: 'uint256' },
  ],
};

interface AuthHeaders {
  'X-Wallet-Address': string;
  'X-Wallet-Signature': string;
  'X-Wallet-Nonce': string;
}

interface UseWalletAuthReturn {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
  authHeaders: AuthHeaders | null;
  authenticate: () => Promise<boolean>;
  clearAuth: () => void;
  error: string | null;
}

/**
 * Hook for wallet-based authentication using EIP-712 signatures
 */
export function useWalletAuth(): UseWalletAuthReturn {
  const account = useActiveAccount();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authHeaders, setAuthHeaders] = useState<AuthHeaders | null>(null);
  const [error, setError] = useState<string | null>(null);

  const authenticate = useCallback(async (): Promise<boolean> => {
    if (!account) {
      setError('No wallet connected');
      return false;
    }

    setIsAuthenticating(true);
    setError(null);

    try {
      const walletAddress = account.address;

      // Step 1: Request nonce from server
      const nonceResponse = await fetch('/api/auth/nonce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress }),
      });

      if (!nonceResponse.ok) {
        const errorData = await nonceResponse.json();
        throw new Error(errorData.error || 'Failed to get authentication nonce');
      }

      const { nonce, expiresAt } = await nonceResponse.json();
      const issuedAt = Date.now();
      const expiresAtMs = new Date(expiresAt).getTime();

      // Step 2: Create typed data message
      const message = {
        purpose: 'Sign in to Symphora Marketplace',
        nonce,
        issuedAt,
        expiresAt: expiresAtMs,
      };

      // Step 3: Sign typed data with wallet
      const signature = await account.signTypedData({
        domain: AUTH_DOMAIN,
        types: AUTH_TYPES,
        primaryType: 'Authentication',
        message,
      });

      // Step 4: Store auth headers for API requests
      const headers: AuthHeaders = {
        'X-Wallet-Address': walletAddress,
        'X-Wallet-Signature': signature,
        'X-Wallet-Nonce': nonce,
      };

      setAuthHeaders(headers);
      setIsAuthenticating(false);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed';
      setError(errorMessage);
      setIsAuthenticating(false);
      return false;
    }
  }, [account]);

  const clearAuth = useCallback(() => {
    setAuthHeaders(null);
    setError(null);
  }, []);

  return {
    isAuthenticated: !!authHeaders,
    isAuthenticating,
    authHeaders,
    authenticate,
    clearAuth,
    error,
  };
}

/**
 * Helper function to create authenticated fetch request
 */
export async function authenticatedFetch(
  url: string,
  authHeaders: AuthHeaders,
  options?: RequestInit
): Promise<Response> {
  return fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      ...authHeaders,
      'Content-Type': 'application/json',
    },
  });
}
