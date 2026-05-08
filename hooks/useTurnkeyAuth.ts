"use client";

import { useState, useEffect, useCallback } from "react";
import { Turnkey } from "@turnkey/sdk-browser";

// ─── localStorage-based Turnkey email auth state ────────────────────────────
// Used by Navbar and user pages to detect Turnkey email login.

/**
 * Reads / writes the Turnkey email wallet address stored in localStorage
 * after a successful OTP login via /api/auth/turnkey/verify.
 */
export function useTurnkeyEmailAuth() {
  const [address, setAddress] = useState<string | null>(null);
  const [subOrgId, setSubOrgId] = useState<string | null>(null);

  useEffect(() => {
    setAddress(localStorage.getItem("turnkey_wallet_address"));
    setSubOrgId(localStorage.getItem("turnkey_sub_org_id"));
  }, []);

  const set = (addr: string, orgId: string) => {
    localStorage.setItem("turnkey_wallet_address", addr);
    localStorage.setItem("turnkey_sub_org_id", orgId);
    setAddress(addr);
    setSubOrgId(orgId);
  };

  const clear = () => {
    localStorage.removeItem("turnkey_wallet_address");
    localStorage.removeItem("turnkey_sub_org_id");
    setAddress(null);
    setSubOrgId(null);
  };

  return { address, subOrgId, set, clear };
}

// ─── Passkey-based Turnkey auth (2FA / delete confirm) ──────────────────────
// Used by TurnkeySetup and TurnkeyDeleteConfirm components.

const TURNKEY_BASE_URL = "https://api.turnkey.com";
const TURNKEY_ORG_STORAGE_KEY = "turnkey-sub-orgs";

function getTurnkeySDK() {
  return new Turnkey({
    apiBaseUrl: TURNKEY_BASE_URL,
    defaultOrganizationId: process.env.NEXT_PUBLIC_TURNKEY_ORGANIZATION_ID ?? "",
  });
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
  const orgs = stored ? (JSON.parse(stored) as Record<string, string>) : {};
  orgs[walletAddress.toLowerCase()] = subOrgId;
  localStorage.setItem(TURNKEY_ORG_STORAGE_KEY, JSON.stringify(orgs));
}

/**
 * Passkey-based Turnkey auth for 2FA / delete confirmation flows.
 * Exports: register, getDeleteStampHeaders, isLoading, error.
 * Used by TurnkeySetup and TurnkeyDeleteConfirm.
 */
export function useTurnkeyAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Register a passkey and create a Turnkey sub-org for the given wallet. */
  const register = useCallback(
    async (
      walletAddress: string,
      authHeaders: Record<string, string>
    ): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      try {
        const sdk = getTurnkeySDK();
        const passkeyClient = sdk.passkeyClient({ rpId: window.location.hostname });

        const { encodedChallenge, attestation } =
          await passkeyClient.createUserPasskey({
            publicKey: {
              rp: {
                id: window.location.hostname,
                name: document.title || "Enki",
              },
              user: {
                id: walletAddress,
                name: walletAddress,
                displayName: walletAddress.slice(0, 8) + "...",
              },
            },
          });

        const res = await fetch("/api/turnkey/init-user", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...authHeaders },
          body: JSON.stringify({ encodedChallenge, attestation }),
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.error || "Failed to register passkey");
        }

        if (typeof result.subOrgId !== "string" || !result.subOrgId) {
          throw new Error(
            "Turnkey registration did not return a sub-organization"
          );
        }

        storeSubOrgId(walletAddress, result.subOrgId);
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Registration failed");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /** Returns a passkey-signed whoami stamp for use in authenticated DELETE requests. */
  const getDeleteStampHeaders = useCallback(
    async (
      walletAddress: string
    ): Promise<Record<string, string> | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const subOrgId = getStoredSubOrgId(walletAddress);
        if (!subOrgId) {
          throw new Error(
            "No Turnkey 2FA registration found for this wallet"
          );
        }

        const sdk = getTurnkeySDK();
        const passkeyClient = sdk.passkeyClient({ rpId: window.location.hostname });

        const stamp = await passkeyClient.stampGetWhoami({
          organizationId: subOrgId,
        });

        if (!stamp) throw new Error("Failed to get passkey stamp");

        return {
          "X-Turnkey-Stamp": stamp.stamp.stampHeaderName,
          "X-Turnkey-Stamp-Value": stamp.stamp.stampHeaderValue,
        };
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "2FA verification failed"
        );
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { register, getDeleteStampHeaders, isLoading, error };
}
