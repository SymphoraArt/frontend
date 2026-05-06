/**
 * Wallet Authentication Hook
 *
 * Provides nonce-bound signature authentication for wallet users.
 */

import { useState, useCallback } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { createAuthHeaders, generateAuthMessage } from '@/lib/auth';

interface AuthHeaders {
  'X-Wallet-Address': string;
  'X-Wallet-Signature': string;
  'X-Auth-Message': string;
  'X-Timestamp': string;
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
 * Hook for wallet-based authentication using signed nonce messages.
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
        body: JSON.stringify({ walletAddress, walletType: 'evm' }),
      });

      if (!nonceResponse.ok) {
        const errorData = await nonceResponse.json();
        throw new Error(errorData.error || 'Failed to get authentication nonce');
      }

      const { nonce } = await nonceResponse.json();
      if (typeof nonce !== 'string' || !nonce) {
        throw new Error('Invalid authentication nonce');
      }

      // Step 2: Create nonce-bound message
      const { message, timestamp } = generateAuthMessage(walletAddress, nonce);

      // Step 3: Sign message with wallet
      const signature = await account.signMessage({ message });

      // Step 4: Store auth headers for API requests
      const headers = createAuthHeaders(walletAddress, signature, message, timestamp, nonce) as unknown as AuthHeaders;

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
