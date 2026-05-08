import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { generateAuthMessage } from '@/lib/auth';

const SOLANA_AUTH_KEY = 'solana-auth-session';

type StoredSession = {
  walletAddress: string;
  sessionToken: string;
  expiresAt: string;
};

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function loadSession(publicKeyBase58: string): StoredSession | null {
  try {
    const raw = localStorage.getItem(SOLANA_AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSession;
    if (
      parsed.walletAddress === publicKeyBase58 &&
      new Date(parsed.expiresAt).getTime() - Date.now() > 60_000
    ) {
      return parsed;
    }
    localStorage.removeItem(SOLANA_AUTH_KEY);
    return null;
  } catch {
    localStorage.removeItem(SOLANA_AUTH_KEY);
    return null;
  }
}

export function useSolanaAuth() {
  const { publicKey, signMessage, connected } = useWallet();
  const [session, setSession] = useState<StoredSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Restore or clear session whenever the connected public key changes
    const next = publicKey ? loadSession(publicKey.toBase58()) : null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(next);
  }, [publicKey, connected]);

  const authenticate = useCallback(async (): Promise<boolean> => {
    if (!publicKey || !signMessage) {
      setError('Solana wallet not connected');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const walletAddress = publicKey.toBase58();

      // Step 1: Get nonce
      const nonceRes = await fetch('/api/auth/nonce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, walletType: 'solana' }),
      });
      if (!nonceRes.ok) {
        const err = await nonceRes.json().catch(() => ({})) as { error?: string };
        throw new Error(err.error || 'Failed to get nonce');
      }
      const { nonce } = await nonceRes.json() as { nonce: string };
      if (!nonce) throw new Error('Invalid nonce from server');

      // Step 2: Sign message
      const { message, timestamp } = generateAuthMessage(walletAddress, nonce);
      const msgBytes = new TextEncoder().encode(message);
      const sigBytes = await signMessage(msgBytes);
      const signature = bytesToBase64(sigBytes);

      // Step 3: Exchange for session token
      const sessionRes = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress, walletType: 'solana', signature, message, timestamp, nonce }),
      });
      if (!sessionRes.ok) {
        const err = await sessionRes.json().catch(() => ({})) as { error?: string };
        throw new Error(err.error || 'Session creation failed');
      }
      const { sessionToken, expiresAt } = await sessionRes.json() as { sessionToken: string; expiresAt: string };

      const stored: StoredSession = { walletAddress, sessionToken, expiresAt };
      localStorage.setItem(SOLANA_AUTH_KEY, JSON.stringify(stored));
      setSession(stored);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [publicKey, signMessage]);

  const logout = useCallback(async () => {
    const raw = localStorage.getItem(SOLANA_AUTH_KEY);
    if (raw) {
      const { sessionToken } = JSON.parse(raw) as StoredSession;
      await fetch('/api/auth/session', {
        method: 'DELETE',
        headers: { 'X-Session-Token': sessionToken },
      }).catch(() => {});
    }
    localStorage.removeItem(SOLANA_AUTH_KEY);
    setSession(null);
  }, []);

  const getAuthHeaders = useCallback((): Record<string, string> | null => {
    if (!session) return null;
    return { 'X-Session-Token': session.sessionToken };
  }, [session]);

  return {
    isAuthenticated: !!session,
    isLoading,
    error,
    walletAddress: session?.walletAddress ?? publicKey?.toBase58() ?? null,
    connected,
    authenticate,
    logout,
    getAuthHeaders,
  };
}
