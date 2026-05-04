"use client";

import { useState, useEffect } from "react";
import { useTurnkeyWallet, useTurnkeyDeleteConfirm } from "@/hooks/useTurnkeyWallet";

interface TurnkeyLoginModalProps {
  onSuccess: (walletAddress: string, subOrganizationId: string) => void;
  onClose: () => void;
}

export function TurnkeyLoginModal({ onSuccess, onClose }: TurnkeyLoginModalProps) {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const { step, error, walletAddress, subOrganizationId, sendOtp, verifyOtp, reset } = useTurnkeyWallet();

  // Notify parent after successful verification (not during render)
  useEffect(() => {
    if (step === "done" && walletAddress && subOrganizationId) {
      onSuccess(walletAddress, subOrganizationId);
    }
  }, [step, walletAddress, subOrganizationId, onSuccess]);

  async function handleSendCode(e: React.FormEvent) {
    e.preventDefault();
    await sendOtp(email.trim());
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    await verifyOtp(otpCode.trim());
  }

  const showEmailForm = step === "idle" || step === "sending" || (step === "error" && !otpCode);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-zinc-900">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="mb-1 text-xl font-semibold text-zinc-900 dark:text-white">
          Sign in with Email
        </h2>
        <p className="mb-6 text-sm text-zinc-500">
          We&apos;ll create a Solana wallet linked to your email.
        </p>

        {showEmailForm ? (
          <form onSubmit={handleSendCode} className="flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={step === "sending"}
              className="w-full rounded-lg bg-zinc-900 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {step === "sending" ? "Sending code..." : "Send verification code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="flex flex-col gap-4">
            <p className="text-sm text-zinc-500">
              Enter the 6-digit code sent to <strong>{email}</strong>
            </p>
            <input
              type="text"
              required
              placeholder="123456"
              maxLength={6}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
              className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-center text-xl font-mono tracking-widest outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={step === "verifying" || otpCode.length < 6}
              className="w-full rounded-lg bg-zinc-900 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {step === "verifying" ? "Verifying..." : "Verify code"}
            </button>
            <button
              type="button"
              onClick={() => { reset(); setOtpCode(""); }}
              className="text-sm text-zinc-400 hover:text-zinc-600"
            >
              Use a different email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

/**
 * 2FA confirmation modal for prompt deletion.
 * Auto-sends OTP on mount, verifies it, then calls onConfirmed with the delete token.
 */
interface TurnkeyDeleteConfirmProps {
  email: string;
  onConfirmed: (deleteToken: string) => void;
  onClose: () => void;
}

export function TurnkeyDeleteConfirm({ email, onConfirmed, onClose }: TurnkeyDeleteConfirmProps) {
  const [otpCode, setOtpCode] = useState("");
  const { step, error, sendOtp, verifyOtp, reset } = useTurnkeyDeleteConfirm();

  // Auto-send OTP when modal opens
  useEffect(() => {
    sendOtp(email);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    const deleteToken = await verifyOtp(otpCode.trim());
    if (deleteToken) onConfirmed(deleteToken);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl dark:bg-zinc-900">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="mb-1 text-xl font-semibold text-zinc-900 dark:text-white">
          Confirm Deletion
        </h2>
        <p className="mb-6 text-sm text-zinc-500">
          {step === "sending"
            ? "Sending verification code..."
            : <>Enter the code sent to <strong>{email}</strong> to permanently delete this prompt.</>
          }
        </p>

        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <input
            type="text"
            required
            placeholder="123456"
            maxLength={6}
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
            disabled={step === "sending"}
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-center text-xl font-mono tracking-widest outline-none focus:border-zinc-400 disabled:opacity-40 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={step === "verifying" || step === "sending" || otpCode.length < 6}
            className="w-full rounded-lg bg-red-600 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {step === "verifying" ? "Verifying..." : "Delete Prompt"}
          </button>
          <button
            type="button"
            onClick={() => { reset(); setOtpCode(""); sendOtp(email); }}
            className="text-sm text-zinc-400 hover:text-zinc-600"
          >
            Resend code
          </button>
        </form>
      </div>
    </div>
  );
}
