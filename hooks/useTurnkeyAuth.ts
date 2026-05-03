'use client';

import { useState, useCallback } from 'react';
import { TurnkeyClient, PasskeyStamper } from '@turnkey/sdk-browser';

const TURNKEY_BASE_URL = 'https://api.turnkey.com';
const TURNKEY_ORG_STORAGE_KEY = 'turnkey-sub-orgs';

function getPasskeyStamper() {
  return new PasskeyStamper({ rpId: window.location.hostname });
}

function getStoredSubOrgId(walletAddress: string): string | null {
  try {
    const stored = localStorage.getItem(TURNKEY_ORG_STORAGE_KEY);
    if (!stored) return null;
    const orgs = JSON.parse(stored) as Record<string, string>;
    return orgs[walletAddress.toLowerCase()] || null;
  } catch {
    localStorage.removeItem(TURNKEY_ORG_STORAGE_KEY);
    return null;
  }
}

function storeSubOrgId(walletAddress: string, subOrgId: string) {
  const stored = localStorage.getItem(TURNKEY_ORG_STORAGE_KEY);
  const orgs = stored ? JSON.parse(stored) as Record<string, string> : {};
  orgs[walletAddress.toLowerCase()] = subOrgId;
  localStorage.setItem(TURNKEY_ORG_STORAGE_KEY, JSON.stringify(orgs));
}

export function useTurnkeyAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Register passkey and create Turnkey sub-org for the user
  const register = useCallback(async (
    walletAddress: string,
    authHeaders: Record<string, string>
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const stamper = getPasskeyStamper();
      const client = new TurnkeyClient({ baseUrl: TURNKEY_BASE_URL }, stamper);

      const { encodedChallenge, attestation } = await client.createUserPasskey({
        publicKey: {
          rp: {
            id: window.location.hostname,
            name: document.title || 'Enki',
          },
          user: {
            id: walletAddress,
            name: walletAddress,
            displayName: walletAddress.slice(0, 8) + '...',
          },
        },
      });

      const res = await fetch('/api/turnkey/init-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify({ walletAddress, encodedChallenge, attestation }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to register passkey');
      }

      if (typeof result.subOrgId !== 'string' || !result.subOrgId) {
        throw new Error('Turnkey registration did not return a sub-organization');
      }

      storeSubOrgId(walletAddress, result.subOrgId);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Returns the passkey stamp headers for use in authenticated DELETE requests
  const getDeleteStampHeaders = useCallback(async (walletAddress: string): Promise<Record<string, string> | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const subOrgId = getStoredSubOrgId(walletAddress);
      if (!subOrgId) {
        throw new Error('No Turnkey 2FA registration found for this wallet');
      }

      const stamper = getPasskeyStamper();
      const client = new TurnkeyClient({ baseUrl: TURNKEY_BASE_URL }, stamper);

      const stamp = await client.stampGetWhoami({
        organizationId: subOrgId,
      });

      return {
        'X-Turnkey-Stamp': stamp.stampHeaderName,
        'X-Turnkey-Stamp-Value': stamp.stampHeaderValue,
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : '2FA verification failed');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { register, getDeleteStampHeaders, isLoading, error };
}
