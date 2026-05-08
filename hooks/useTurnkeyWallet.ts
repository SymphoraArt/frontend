"use client";

import { useState } from "react";

type Step = "idle" | "sending" | "code_sent" | "verifying" | "done" | "error";

interface TurnkeyWalletState {
  step: Step;
  walletAddress: string | null;
  subOrganizationId: string | null;
  error: string | null;
}

export function useTurnkeyWallet() {
  const [state, setState] = useState<TurnkeyWalletState>({
    step: "idle",
    walletAddress: null,
    subOrganizationId: null,
    error: null,
  });
  const [otpId, setOtpId] = useState<string | null>(null);

  async function sendOtp(email: string) {
    setState({ step: "sending", walletAddress: null, subOrganizationId: null, error: null });

    try {
      const res = await fetch("/api/auth/turnkey/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState((s) => ({ ...s, step: "error", error: data.error ?? "Failed to send code" }));
        return;
      }

      setOtpId(data.otpId);
      setState((s) => ({ ...s, step: "code_sent" }));
    } catch {
      setState((s) => ({ ...s, step: "error", error: "Network error. Please try again." }));
    }
  }

  async function verifyOtp(otpCode: string) {
    if (!otpId) return;

    setState((s) => ({ ...s, step: "verifying" }));

    try {
      const res = await fetch("/api/auth/turnkey/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otpId, otpCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState((s) => ({ ...s, step: "error", error: data.error ?? "Verification failed" }));
        return;
      }

      setState({
        step: "done",
        walletAddress: data.walletAddress,
        subOrganizationId: data.subOrganizationId,
        error: null,
      });
    } catch {
      setState((s) => ({ ...s, step: "error", error: "Network error. Please try again." }));
    }
  }

  function reset() {
    setOtpId(null);
    setState({ step: "idle", walletAddress: null, subOrganizationId: null, error: null });
  }

  return { ...state, sendOtp, verifyOtp, reset };
}

/**
 * Hook for getting a 2FA delete-confirm token.
 * Usage: call sendOtp(email) → verifyOtp(code) → returns token string
 */
export function useTurnkeyDeleteConfirm() {
  const [step, setStep] = useState<Step>("idle");
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [otpId, setOtpId] = useState<string | null>(null);

  async function sendOtp(email: string) {
    setStep("sending");
    setError(null);

    try {
      const res = await fetch("/api/auth/turnkey/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStep("error");
        setError(data.error ?? "Failed to send code");
        return;
      }

      setOtpId(data.otpId);
      setStep("code_sent");
    } catch {
      setStep("error");
      setError("Network error. Please try again.");
    }
  }

  async function verifyOtp(otpCode: string): Promise<string | null> {
    if (!otpId) return null;

    setStep("verifying");

    try {
      const res = await fetch("/api/auth/turnkey/delete-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otpId, otpCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStep("error");
        setError(data.error ?? "Verification failed");
        return null;
      }

      setToken(data.token);
      setStep("done");
      return data.token;
    } catch {
      setStep("error");
      setError("Network error. Please try again.");
      return null;
    }
  }

  function reset() {
    setOtpId(null);
    setToken(null);
    setStep("idle");
    setError(null);
  }

  return { step, error, token, sendOtp, verifyOtp, reset };
}
