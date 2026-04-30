/**
 * Client-side authentication hook
 * Handles wallet connection and signature-based authentication
 */

import { useState, useEffect, useCallback } from 'react';
import { useActiveAccount } from 'thirdweb/react';
import { generateAuthMessage, createAuthHeaders } from '@/lib/auth';
import { AUTH_STORAGE_KEY } from '@/shared/app-config';

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
        const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
        if (storedAuth) {
          const { walletAddress, timestamp, signature } = JSON.parse(storedAuth);

          // Check if signature is still valid (within 24 hours)
          const authTime = new Date(timestamp).getTime();
          const now = Date.now();
          const expiryTime = 24 * 60 * 60 * 1000; // 24 hours

          if (now - authTime < expiryTime && walletAddress && signature) {
            setAuthState({
              isAuthenticated: true,
              walletAddress,
              isLoading: false,
              error: null,
            });
            return;
          } else {
            // Clear expired auth
            localStorage.removeItem(AUTH_STORAGE_KEY);
          }
        }
      } catch (error) {
        console.warn('Error checking existing auth:', error);
        localStorage.removeItem(AUTH_STORAGE_KEY);
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
      // Generate authentication message
      const { message, timestamp } = generateAuthMessage(account.address);

      // Sign the message
      if (!account) {
        throw new Error('No account connected');
      }
      const signature = await account.signMessage({ message });

      // Store authentication data
      const authData = {
        walletAddress: account.address,
        signature,
        message,
        timestamp,
      };

      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));

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
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setAuthState({
      isAuthenticated: false,
      walletAddress: null,
      isLoading: false,
      error: null,
    });
  }, []);

  const getAuthHeaders = useCallback((): Record<string, string> | null => {
    try {
      const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!storedAuth) return null;

      const { walletAddress, signature, message, timestamp } = JSON.parse(storedAuth);
      return createAuthHeaders(walletAddress, signature, message, timestamp);
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