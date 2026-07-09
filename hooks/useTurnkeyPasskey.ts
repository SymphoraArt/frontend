"use client";

/**
 * Passkey onboarding + login (Plan A, non-custodial).
 *
 * signUp():  creates a device passkey and a Turnkey sub-org where that passkey
 *            is the SOLE root credential (POST /api/auth/turnkey/passkey) —
 *            Enki cannot sign for the wallet, ever.
 * signIn():  passkey-stamps a whoami request against the parent org; Turnkey
 *            resolves the credential to its EXISTING sub-org (POST
 *            /api/auth/turnkey/passkey-login) — a device switch or new browser
 *            always lands in the same wallet, never a fresh one.
 *
 * The wallet is invisible: the user only ever sees Face ID / fingerprint.
 * Exposes the same completion shape as the retired email-OTP hook so the
 * WalletPickerModal completion effect works unchanged.
 */
import { useState } from "react";
import { Turnkey } from "@turnkey/sdk-browser";

type Step = "idle" | "working" | "done" | "error";

interface PasskeyAuthState {
  step: Step;
  walletAddress: string | null;
  subOrganizationId: string | null;
  sessionToken: string | null;
  error: string | null;
  isReturning: boolean;
}

const IDLE: PasskeyAuthState = {
  step: "idle",
  walletAddress: null,
  subOrganizationId: null,
  sessionToken: null,
  error: null,
  isReturning: false,
};

const TURNKEY_BASE_URL = "https://api.turnkey.com";

function getPasskeyClient() {
  const sdk = new Turnkey({
    apiBaseUrl: TURNKEY_BASE_URL,
    defaultOrganizationId: process.env.NEXT_PUBLIC_TURNKEY_ORGANIZATION_ID ?? "",
  });
  return sdk.passkeyClient({ rpId: window.location.hostname });
}

// A user hitting "cancel" on the browser passkey sheet is not an error state
// worth shouting about — show a soft message.
function friendlyError(e: unknown, fallback: string): string {
  const msg = e instanceof Error ? e.message : String(e);
  if (/not allowed|abort|timed? ?out|cancel/i.test(msg)) {
    return "Passkey prompt was cancelled — try again.";
  }
  return msg || fallback;
}

export function useTurnkeyPasskey() {
  const [state, setState] = useState<PasskeyAuthState>(IDLE);

  async function signUp() {
    setState({ ...IDLE, step: "working" });
    try {
      const passkeyClient = getPasskeyClient();
      const userId = crypto.randomUUID();
      const { encodedChallenge, attestation } = await passkeyClient.createUserPasskey({
        publicKey: {
          rp: { id: window.location.hostname, name: "Enki Art" },
          user: { id: userId, name: "Enki Art", displayName: "Enki Art" },
        },
      });

      const res = await fetch("/api/auth/turnkey/passkey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ encodedChallenge, attestation }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState({ ...IDLE, step: "error", error: data.error ?? "Could not create your account" });
        return;
      }
      setState({
        step: "done",
        walletAddress: data.walletAddress,
        subOrganizationId: data.subOrganizationId,
        sessionToken: data.sessionToken ?? null,
        error: null,
        isReturning: false,
      });
    } catch (e) {
      setState({ ...IDLE, step: "error", error: friendlyError(e, "Could not create your account") });
    }
  }

  async function signIn() {
    setState({ ...IDLE, step: "working" });
    try {
      const parentOrgId = process.env.NEXT_PUBLIC_TURNKEY_ORGANIZATION_ID ?? "";
      const passkeyClient = getPasskeyClient();
      // Stamp a whoami against the parent org: the browser shows the passkey
      // sheet (discoverable credential), and Turnkey resolves the signing
      // credential to its existing sub-org server-side.
      const stamped = await passkeyClient.stampGetWhoami({ organizationId: parentOrgId });
      if (!stamped?.body || !stamped.stamp) throw new Error("Passkey prompt was cancelled — try again.");

      const res = await fetch("/api/auth/turnkey/passkey-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signedWhoami: {
            body: stamped.body,
            stamp: {
              stampHeaderName: stamped.stamp.stampHeaderName,
              stampHeaderValue: stamped.stamp.stampHeaderValue,
            },
          },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState({
          ...IDLE,
          step: "error",
          error:
            res.status === 404
              ? "No account found for this passkey — create one instead."
              : data.error ?? "Sign-in failed",
        });
        return;
      }
      setState({
        step: "done",
        walletAddress: data.walletAddress,
        subOrganizationId: data.subOrganizationId,
        sessionToken: data.sessionToken ?? null,
        error: null,
        isReturning: true,
      });
    } catch (e) {
      setState({ ...IDLE, step: "error", error: friendlyError(e, "Sign-in failed") });
    }
  }

  function reset() {
    setState(IDLE);
  }

  return { ...state, signUp, signIn, reset };
}
