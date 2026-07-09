/**
 * Client-side authentication hook
 * Handles wallet connection and signature-based authentication
 */

import { useState, useEffect, useCallback } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { generateAuthMessage } from '@/lib/auth';

export interface AuthState {
  isAuthenticated: boolean;
  walletAddress: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useAuth() {
  const account = useActiveAccount();

  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    walletAddress: null,
    isLoading: false,
    error: null,
  });

  // Check if user is already authenticated (from localStorage)
  useEffect(() => {
    const checkExistingAuth = () => {
      try {
        const storedAuth = localStorage.getItem('symphora_auth');
        if (storedAuth) {
          const { walletAddress, sessionToken, expiresAt } = JSON.parse(storedAuth) as {
            walletAddress?: string;
            sessionToken?: string;
            expiresAt?: string;
          };
          if (walletAddress && sessionToken && expiresAt && new Date(expiresAt).getTime() > Date.now()) {
            setAuthState({
              isAuthenticated: true,
              walletAddress,
              isLoading: false,
              error: null,
            });
            return;
          }
          // Missing/expired session (or a pre-migration signature blob) → clear.
          localStorage.removeItem('symphora_auth');
        }
      } catch (error) {
        console.warn('Error checking existing auth:', error);
        localStorage.removeItem('symphora_auth');
      }
    };

    checkExistingAuth();
  }, []);

  // Auto-authenticate when wallet connects
  useEffect(() => {
    if (account?.address && !authState.isAuthenticated && !authState.isLoading) {
      authenticate();
    }
  }, [account?.address]);

  const authenticate = useCallback(async (): Promise<boolean> => {
    if (!account?.address) {
      setAuthState(prev => ({
        ...prev,
        error: 'Wallet not connected',
      }));
      return false;
    }

    setAuthState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      // Nonce-bound session flow (same as Solana/Turnkey): fetch a single-use
      // server nonce, sign a message containing it, exchange it for a
      // server-issued session token. Replaces the replayable per-request
      // signature-header auth.
      const nonceRes = await fetch('/api/auth/nonce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: account.address, walletType: 'evm' }),
      });
      if (!nonceRes.ok) throw new Error('Failed to get nonce');
      const { nonce } = (await nonceRes.json()) as { nonce?: string };
      if (!nonce) throw new Error('Invalid nonce from server');

      const { message, timestamp } = generateAuthMessage(account.address, nonce);
      const signature = await account.signMessage({ message });

      const sessionRes = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: account.address,
          walletType: 'evm',
          signature,
          message,
          timestamp,
          nonce,
        }),
      });
      if (!sessionRes.ok) {
        const err = (await sessionRes.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error || 'Session creation failed');
      }
      const { sessionToken, expiresAt } = (await sessionRes.json()) as {
        sessionToken: string;
        expiresAt: string;
      };

      localStorage.setItem(
        'symphora_auth',
        JSON.stringify({ walletAddress: account.address, sessionToken, expiresAt }),
      );

      setAuthState({
        isAuthenticated: true,
        walletAddress: account.address,
        isLoading: false,
        error: null,
      });

      return true;
    } catch (error) {
      console.error('Authentication failed:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Authentication failed',
      }));
      return false;
    }
  }, [account]);

  const logout = useCallback(() => {
    localStorage.removeItem('symphora_auth');
    setAuthState({
      isAuthenticated: false,
      walletAddress: null,
      isLoading: false,
      error: null,
    });
  }, []);

  const getAuthHeaders = useCallback((): Record<string, string> | null => {
    try {
      const storedAuth = localStorage.getItem('symphora_auth');
      if (!storedAuth) return null;
      const { sessionToken } = JSON.parse(storedAuth) as { sessionToken?: string };
      return sessionToken ? { 'X-Session-Token': sessionToken } : null;
    } catch (error) {
      console.warn('Error getting auth headers:', error);
      return null;
    }
  }, []);

  return {
    ...authState,
    authenticate,
    logout,
    getAuthHeaders,
  };
}

/**
 * Hook for making authenticated API requests
 */
export function useAuthenticatedFetch() {
  const { getAuthHeaders, isAuthenticated } = useAuth();

  const authenticatedFetch = useCallback(async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    if (!isAuthenticated) {
      throw new Error('User not authenticated');
    }

    const authHeaders = getAuthHeaders();
    if (!authHeaders) {
      throw new Error('Authentication headers not available');
    }

    const headers = new Headers(options.headers);
    Object.entries(authHeaders).forEach(([key, value]) => {
      headers.set(key, value);
    });

    return fetch(url, {
      ...options,
      headers,
    });
  }, [getAuthHeaders, isAuthenticated]);

  return { authenticatedFetch, isAuthenticated };
}