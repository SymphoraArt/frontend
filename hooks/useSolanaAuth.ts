import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { generateAuthMessage } from '@/lib/auth';
import { APP_NAME } from '@/shared/app-config';

const SOLANA_AUTH_KEY = 'solana-auth-session';
const SOLANA_AUTH_EVENT = 'solana-auth-session-changed';

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

function loadAnySession(): StoredSession | null {
  try {
    const raw = localStorage.getItem(SOLANA_AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredSession;
    if (new Date(parsed.expiresAt).getTime() - Date.now() > 60_000) {
      return parsed;
    }
    localStorage.removeItem(SOLANA_AUTH_KEY);
    return null;
  } catch {
    localStorage.removeItem(SOLANA_AUTH_KEY);
    return null;
  }
}

async function createSessionFromSignedMessage(params: {
  walletAddress: string;
  signature: string;
  message: string;
  timestamp: number;
  nonce: string;
}): Promise<StoredSession> {
  const { walletAddress, signature, message, timestamp, nonce } = params;

  const sessionRes = await fetch('/api/auth/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ walletAddress, walletType: 'solana', signature, message, timestamp, nonce }),
  });
  if (!sessionRes.ok) {
    const err = await sessionRes.json().catch(() => ({})) as { error?: string; notWhitelisted?: boolean };
    const e = new Error(err.error || 'Session creation failed') as Error & { notWhitelisted?: boolean };
    // Surface the allowlist rejection so the UI can show "not allowed yet"
    // instead of a generic failure.
    if (sessionRes.status === 403 || err.notWhitelisted) e.notWhitelisted = true;
    throw e;
  }
  const { sessionToken, expiresAt } = await sessionRes.json() as { sessionToken: string; expiresAt: string };

  const stored: StoredSession = { walletAddress, sessionToken, expiresAt };
  localStorage.setItem(SOLANA_AUTH_KEY, JSON.stringify(stored));
  window.dispatchEvent(new Event(SOLANA_AUTH_EVENT));
  return stored;
}

export async function createSolanaAuthSession(
  walletAddress: string,
  signMessage: (message: Uint8Array) => Promise<Uint8Array>
): Promise<StoredSession> {
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

  const { message, timestamp } = generateAuthMessage(walletAddress, nonce);
  const msgBytes = new TextEncoder().encode(message);
  const sigBytes = await signMessage(msgBytes);
  const signature = bytesToBase64(sigBytes);

  return createSessionFromSignedMessage({ walletAddress, signature, message, timestamp, nonce });
}

export async function createSolanaAuthSessionWithSignIn(
  walletAddress: string,
  signIn: (input?: {
    domain?: string;
    address?: string;
    statement?: string;
    uri?: string;
    version?: string;
    chainId?: string;
    nonce?: string;
    issuedAt?: string;
  }) => Promise<{
    signedMessage: Uint8Array;
    signature: Uint8Array;
  }>
): Promise<StoredSession> {
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

  const timestamp = Date.now();
  const issuedAt = new Date(timestamp).toISOString();
  // No chainId: signing a login message proves wallet ownership and is
  // network-agnostic. Pinning it to a cluster made wallets on a different
  // network (e.g. mainnet vs the app's devnet) reject with "chain id doesn't
  // match", blocking sign-in for no reason — the payment flow handles the
  // network separately.
  const { signedMessage, signature: sigBytes } = await signIn({
    domain: window.location.host,
    address: walletAddress,
    statement: `Sign in to ${APP_NAME} Marketplace.`,
    uri: window.location.origin,
    version: '1',
    nonce,
    issuedAt,
  });

  const message = new TextDecoder().decode(signedMessage);
  const signature = bytesToBase64(sigBytes);
  return createSessionFromSignedMessage({ walletAddress, signature, message, timestamp, nonce });
}

export function useSolanaAuth() {
  const { publicKey, signMessage, connected } = useWallet();
  const [session, setSession] = useState<StoredSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Prefer the session matching the connected publicKey. On hard navigation the
    // Solana adapter has autoConnect disabled, so publicKey is null even when a
    // valid session is still in localStorage — fall back to it so the user does
    // not appear signed out until they re-connect to sign new transactions.
    const next = publicKey ? loadSession(publicKey.toBase58()) : loadAnySession();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSession(next);
  }, [publicKey, connected]);

  useEffect(() => {
    const refreshSession = () => {
      setSession(publicKey ? loadSession(publicKey.toBase58()) : loadAnySession());
    };
    window.addEventListener(SOLANA_AUTH_EVENT, refreshSession);
    return () => window.removeEventListener(SOLANA_AUTH_EVENT, refreshSession);
  }, [publicKey]);

  const authenticate = useCallback(async (): Promise<boolean> => {
    if (!publicKey || !signMessage) {
      setError('Solana wallet not connected');
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const walletAddress = publicKey.toBase58();
      const stored = await createSolanaAuthSession(walletAddress, signMessage);
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
    window.dispatchEvent(new Event(SOLANA_AUTH_EVENT));
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
