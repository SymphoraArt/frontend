/**
 * Unified wallet auth hook — EVM primary, Solana layered on top.
 *
 * Both produce X-Session-Token. This hook tries EVM first, falls back to Solana.
 * Use this instead of useAuth() / useSolanaAuth() in pages that need to work for both.
 */

import { useCallback } from 'react';
import { useAuth } from './useAuth';
import { useSolanaAuth } from './useSolanaAuth';

export function useWalletAuth() {
  const evm = useAuth();
  const solana = useSolanaAuth();

  const isAuthenticated = evm.isAuthenticated || solana.isAuthenticated;
  const isLoading = evm.isLoading || solana.isLoading;
  const walletAddress = evm.walletAddress ?? solana.walletAddress ?? null;

  const getAuthHeaders = useCallback((): Record<string, string> | null => {
    return evm.getAuthHeaders() ?? solana.getAuthHeaders() ?? null;
  }, [evm, solana]);

  const logout = useCallback(async () => {
    if (evm.isAuthenticated) await evm.logout();
    if (solana.isAuthenticated) await solana.logout();
  }, [evm, solana]);

  return { isAuthenticated, isLoading, walletAddress, getAuthHeaders, logout };
}

/** Authenticated fetch using whichever session (EVM or Solana) is active */
export function useAuthenticatedFetch() {
  const { getAuthHeaders, isAuthenticated } = useWalletAuth();

  const authenticatedFetch = useCallback(async (
    url: string,
    options: RequestInit = {}
  ): Promise<Response> => {
    if (!isAuthenticated) throw new Error('Not authenticated');
    const authHeaders = getAuthHeaders();
    if (!authHeaders) throw new Error('Auth headers unavailable');
    const headers = new Headers(options.headers);
    Object.entries(authHeaders).forEach(([k, v]) => headers.set(k, v));
    return fetch(url, { ...options, headers });
  }, [getAuthHeaders, isAuthenticated]);

  return { authenticatedFetch, isAuthenticated };
}
