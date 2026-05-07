/**
 * EVM wallet authentication hook (Thirdweb).
 *
 * Flow:
 *  1. Request nonce from /api/auth/nonce
 *  2. Sign auth message with connected wallet
 *  3. Exchange signature for session token via /api/auth/session
 *  4. Store session token; send X-Session-Token on every authenticated request
 */

import { useState, useEffect, useCallback } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { generateAuthMessage } from '@/lib/auth';
import { AUTH_STORAGE_KEY } from '@/shared/app-config';

export interface AuthState {
  isAuthenticated: boolean;
  walletAddress: string | null;
  isLoading: boolean;
  error: string | null;
}

type StoredSession = {
  walletAddress: string;
  sessionToken: string;
  expiresAt: string;
};

function loadStoredSession(walletAddress: string): StoredSession | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSession;
    if (
      parsed.walletAddress?.toLowerCase() === walletAddress.toLowerCase() &&
      parsed.sessionToken &&
      new Date(parsed.expiresAt).getTime() - Date.now() > 60_000
    ) {
      return parsed;
    }
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function useAuth() {
  const account = useActiveAccount();

  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    walletAddress: null,
    isLoading: false,
    error: null,
  });

  // Restore session from localStorage when wallet address is known.
  useEffect(() => {
    if (!account?.address) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAuthState(s => ({ ...s, isAuthenticated: false, walletAddress: null }));
      return;
    }
    const stored = loadStoredSession(account.address);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuthState(s => ({
      ...s,
      isAuthenticated: !!stored,
      walletAddress: stored?.walletAddress ?? account.address,
    }));
  }, [account?.address]);

  const authenticate = useCallback(async (): Promise<boolean> => {
    if (!account?.address) {
      setAuthState(prev => ({ ...prev, error: 'Wallet not connected' }));
      return false;
    }

    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Step 1: Get nonce
      const nonceRes = await fetch('/api/auth/nonce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: account.address, walletType: 'evm' }),
      });
      if (!nonceRes.ok) {
        const err = await nonceRes.json().catch(() => ({})) as { error?: string };
        throw new Error(err.error || 'Failed to get nonce');
      }
      const { nonce } = await nonceRes.json() as { nonce: string };
      if (!nonce) throw new Error('Invalid nonce from server');

      // Step 2: Sign message
      const { message, timestamp } = generateAuthMessage(account.address, nonce);
      const signature = await account.signMessage({ message });

      // Step 3: Exchange for session token
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
        const err = await sessionRes.json().catch(() => ({})) as { error?: string };
        throw new Error(err.error || 'Session creation failed');
      }
      const { sessionToken, expiresAt } = await sessionRes.json() as { sessionToken: string; expiresAt: string };

      const stored: StoredSession = {
        walletAddress: account.address.toLowerCase(),
        sessionToken,
        expiresAt,
      };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(stored));

      setAuthState({ isAuthenticated: true, walletAddress: stored.walletAddress, isLoading: false, error: null });
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Authentication failed';
      setAuthState(prev => ({ ...prev, isLoading: false, error: message }));
      return false;
    }
  }, [account]);

  const logout = useCallback(async () => {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (raw) {
      const { sessionToken } = JSON.parse(raw) as StoredSession;
      await fetch('/api/auth/session', {
        method: 'DELETE',
        headers: { 'X-Session-Token': sessionToken },
      }).catch(() => {});
    }
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthState({ isAuthenticated: false, walletAddress: null, isLoading: false, error: null });
  }, []);

  const getAuthHeaders = useCallback((): Record<string, string> | null => {
    if (!account?.address) return null;
    const stored = loadStoredSession(account.address);
    if (!stored) return null;
    return { 'X-Session-Token': stored.sessionToken };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return { ...authState, authenticate, logout, getAuthHeaders };
}

/**
 * Hook for making authenticated API requests.
 */
export function useAuthenticatedFetch() {
  const { getAuthHeaders, isAuthenticated } = useAuth();

  const authenticatedFetch = useCallback(async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    if (!isAuthenticated) throw new Error('User not authenticated');

    const authHeaders = getAuthHeaders();
    if (!authHeaders) throw new Error('Authentication headers not available');

    const headers = new Headers(options.headers);
    Object.entries(authHeaders).forEach(([key, value]) => headers.set(key, value));

    return fetch(url, { ...options, headers });
  }, [getAuthHeaders, isAuthenticated]);

  return { authenticatedFetch, isAuthenticated };
}
