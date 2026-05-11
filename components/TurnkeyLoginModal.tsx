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
      <div className="relative w-full max-w-md rounded-2xl bg-[var(--enki-paper)] p-8 shadow-2xl dark:bg-[#0a0a0a]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[var(--enki-ink-3)] hover:text-[var(--enki-ink-2)] dark:hover:text-[var(--enki-ink)]"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="mb-1 text-xl font-semibold text-[var(--enki-ink)] dark:text-[var(--enki-ink)]">
          Sign in with Email
        </h2>
        <p className="mb-6 text-sm text-[var(--enki-ink-3)]">
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
              className="w-full rounded-lg border border-[var(--enki-rule)] bg-[var(--enki-paper-2)] px-4 py-3 text-sm outline-none focus:border-[var(--enki-ink-3)] dark:border-[#27272b] dark:bg-[#17171a] dark:text-[var(--enki-ink)]"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={step === "sending"}
              className="w-full rounded-lg bg-[var(--enki-ink)] py-3 text-sm font-medium text-white transition hover:bg-[var(--enki-ink-2)] disabled:opacity-50 dark:bg-[var(--enki-paper)] dark:text-[var(--enki-ink)] dark:hover:bg-[var(--enki-rule)]"
            >
              {step === "sending" ? "Sending code..." : "Send verification code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerify} className="flex flex-col gap-4">
            <p className="text-sm text-[var(--enki-ink-3)]">
              Enter the verification code sent to <strong>{email}</strong>
            </p>
            <input
              type="text"
              required
              placeholder="Enter code"
              maxLength={32}
              autoComplete="one-time-code"
              spellCheck={false}
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase())}
              className="w-full rounded-lg border border-[var(--enki-rule)] bg-[var(--enki-paper-2)] px-4 py-3 text-center font-mono text-base tracking-wide outline-none focus:border-[var(--enki-ink-3)] dark:border-[#27272b] dark:bg-[#17171a] dark:text-[var(--enki-ink)]"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={step === "verifying" || otpCode.trim().length === 0}
              className="w-full rounded-lg bg-[var(--enki-ink)] py-3 text-sm font-medium text-white transition hover:bg-[var(--enki-ink-2)] disabled:opacity-50 dark:bg-[var(--enki-paper)] dark:text-[var(--enki-ink)] dark:hover:bg-[var(--enki-rule)]"
            >
              {step === "verifying" ? "Verifying..." : "Verify code"}
            </button>
            <button
              type="button"
              onClick={() => { reset(); setOtpCode(""); }}
              className="text-sm text-[var(--enki-ink-3)] hover:text-[var(--enki-ink-2)]"
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
      <div className="relative w-full max-w-sm rounded-2xl bg-[var(--enki-paper)] p-8 shadow-2xl dark:bg-[#0a0a0a]">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-[var(--enki-ink-3)] hover:text-[var(--enki-ink-2)] dark:hover:text-[var(--enki-ink)]"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="mb-1 text-xl font-semibold text-[var(--enki-ink)] dark:text-[var(--enki-ink)]">
          Confirm Deletion
        </h2>
        <p className="mb-6 text-sm text-[var(--enki-ink-3)]">
          {step === "sending"
            ? "Sending verification code..."
            : <>Enter the code sent to <strong>{email}</strong> to permanently delete this prompt.</>
          }
        </p>

        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <input
            type="text"
            required
            placeholder="Enter code"
            maxLength={32}
            autoComplete="one-time-code"
            spellCheck={false}
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase())}
            disabled={step === "sending"}
            className="w-full rounded-lg border border-[var(--enki-rule)] bg-[var(--enki-paper-2)] px-4 py-3 text-center font-mono text-base tracking-wide outline-none focus:border-[var(--enki-ink-3)] disabled:opacity-40 dark:border-[#27272b] dark:bg-[#17171a] dark:text-[var(--enki-ink)]"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={step === "verifying" || step === "sending" || otpCode.trim().length === 0}
            className="w-full rounded-lg bg-red-600 py-3 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
          >
            {step === "verifying" ? "Verifying..." : "Delete Prompt"}
          </button>
          <button
            type="button"
            onClick={() => { reset(); setOtpCode(""); sendOtp(email); }}
            className="text-sm text-[var(--enki-ink-3)] hover:text-[var(--enki-ink-2)]"
          >
            Resend code
          </button>
        </form>
      </div>
    </div>
  );
}
