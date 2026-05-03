import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { generateAuthMessage, createAuthHeaders } from '@/lib/auth';

const SOLANA_AUTH_KEY = 'solana-auth-data';
const AUTH_TTL = 24 * 60 * 60 * 1000;

export function useSolanaAuth() {
  const { publicKey, signMessage, connected } = useWallet();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SOLANA_AUTH_KEY);
      if (!stored) return;
      const { walletAddress, timestamp } = JSON.parse(stored);
      if (
        publicKey?.toBase58() === walletAddress &&
        Date.now() - new Date(timestamp).getTime() < AUTH_TTL
      ) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem(SOLANA_AUTH_KEY);
      }
    } catch {
      localStorage.removeItem(SOLANA_AUTH_KEY);
    }
  }, [publicKey]);

  // Clear auth when wallet disconnects
  useEffect(() => {
    if (!connected) {
      setIsAuthenticated(false);
    }
  }, [connected]);

  const authenticate = useCallback(async (): Promise<boolean> => {
    if (!publicKey || !signMessage) {
      setError('Solana wallet not connected');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const walletAddress = publicKey.toBase58();
      const nonceResponse = await fetch('/api/auth/nonce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, walletType: 'solana' }),
      });
      if (!nonceResponse.ok) {
        const errorData = await nonceResponse.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to get authentication nonce');
      }
      const { nonce } = await nonceResponse.json();
      if (typeof nonce !== 'string' || !nonce) {
        throw new Error('Invalid authentication nonce');
      }

      const { message, timestamp } = generateAuthMessage(walletAddress, nonce);
      const msgBytes = new TextEncoder().encode(message);
      const sigBytes = await signMessage(msgBytes);
      const signature = Buffer.from(sigBytes).toString('base64');

      localStorage.setItem(SOLANA_AUTH_KEY, JSON.stringify({
        walletAddress,
        signature,
        message,
        timestamp,
        nonce,
      }));

      setIsAuthenticated(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, signMessage]);

  const logout = useCallback(() => {
    localStorage.removeItem(SOLANA_AUTH_KEY);
    setIsAuthenticated(false);
  }, []);

  const getAuthHeaders = useCallback((): Record<string, string> | null => {
    try {
      const stored = localStorage.getItem(SOLANA_AUTH_KEY);
      if (!stored) return null;
      const { walletAddress, signature, message, timestamp, nonce } = JSON.parse(stored);
      return {
        ...createAuthHeaders(walletAddress, signature, message, timestamp, nonce),
        'X-Wallet-Type': 'solana',
      };
    } catch {
      return null;
    }
  }, []);

  return {
    isAuthenticated,
    isLoading,
    error,
    walletAddress: publicKey?.toBase58() ?? null,
    connected,
    authenticate,
    logout,
    getAuthHeaders,
  };
}
