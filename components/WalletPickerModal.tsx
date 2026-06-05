"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";
import { useTurnkeyWallet } from "@/hooks/useTurnkeyWallet";
import { useToast } from "@/hooks/use-toast";

interface WalletPickerModalProps {
  open: boolean;
  onClose: () => void;
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71s.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  );
}

/**
 * Sign in / Sign up modal — ported from the new marketing layout's auth form.
 * Wallet logins were removed in favour of a single, simple email flow. The
 * app's email auth is passwordless (a one-time code), so the form collects an
 * email (and name on sign up), then a verification code.
 */
export function WalletPickerModal({ open, onClose }: WalletPickerModalProps) {
  const { toast } = useToast();
  const { set: setTurnkeyAuth } = useTurnkeyEmailAuth();
  const {
    step,
    error,
    walletAddress,
    subOrganizationId,
    sessionToken,
    isReturning,
    sendOtp,
    verifyOtp,
    reset,
  } = useTurnkeyWallet();

  const [tab, setTab] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const handleClose = useCallback(() => {
    setEmail("");
    setCode("");
    setName("");
    reset();
    onClose();
  }, [onClose, reset]);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    if (step === "done" && walletAddress && subOrganizationId) {
      setTurnkeyAuth(walletAddress, subOrganizationId, sessionToken ?? undefined);
      // Persist the chosen name as the local username (same key the profile uses).
      if (name.trim()) {
        try {
          localStorage.setItem(`enki:username:${walletAddress}`, name.trim());
        } catch {
          /* ignore */
        }
      }
      toast({ title: isReturning ? "Welcome back" : "Account ready" });
      handleClose();
    }
  }, [step, walletAddress, subOrganizationId, sessionToken, isReturning]);
  /* eslint-enable react-hooks/exhaustive-deps */

  const codeStep = step === "code_sent" || step === "verifying";
  const submitting = step === "sending" || step === "verifying";

  const onEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) sendOtp(email.trim());
  };
  const onCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) verifyOtp(code.trim());
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 14px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.05)",
    border: "1.5px solid rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: 14,
    outline: "none",
    fontFamily: "var(--font-sans)",
  };
  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 11,
    fontWeight: 700,
    color: "rgba(255,255,255,0.55)",
    marginBottom: 5,
    letterSpacing: "0.02em",
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent
        className="border-0 shadow-2xl"
        style={{
          background: "#0E0E12",
          border: "1px solid rgba(139,92,246,0.2)",
          borderRadius: 20,
          padding: "32px 34px",
          maxWidth: 420,
          width: "100%",
          boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.08)",
        }}
      >
        <style>{`
          .enki-auth-input::placeholder { color: rgba(255,255,255,0.25); }
          .enki-auth-input:focus { border-color: rgba(139,92,246,0.55) !important; background: rgba(139,92,246,0.06) !important; }
        `}</style>

        <DialogTitle asChild>
          <div style={{ fontSize: 21, fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", textAlign: "center", marginBottom: 22 }}>
            Enki Art<span style={{ color: "#C084FC" }}>.</span>
          </div>
        </DialogTitle>
        <DialogDescription className="sr-only">
          Sign in or create an account with your email.
        </DialogDescription>

        {/* Tabs */}
        <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: 3, marginBottom: 22, border: "1px solid rgba(255,255,255,0.07)" }}>
          {(["login", "signup"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTab(t); if (codeStep) { reset(); setCode(""); } }}
              style={{
                flex: 1, padding: 8, borderRadius: 8, fontSize: 13, fontWeight: 700,
                border: "none", cursor: "pointer", transition: "all 0.2s",
                background: tab === t ? "rgba(139,92,246,0.25)" : "transparent",
                color: tab === t ? "#fff" : "rgba(255,255,255,0.45)",
                boxShadow: tab === t ? "0 2px 8px rgba(139,92,246,0.2)" : "none",
                fontFamily: "var(--font-sans)",
              }}
            >
              {t === "login" ? "Log in" : "Sign up"}
            </button>
          ))}
        </div>

        {!codeStep ? (
          <form onSubmit={onEmailSubmit}>
            {tab === "signup" && (
              <div style={{ marginBottom: 14 }}>
                <label style={labelStyle}>Full name</label>
                <input
                  className="enki-auth-input"
                  style={inputStyle}
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Email</label>
              <input
                className="enki-auth-input"
                style={inputStyle}
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {error && <p style={{ fontSize: 12, color: "#f87171", marginBottom: 12 }}>{error}</p>}

            <button
              type="submit"
              disabled={submitting || email.trim().length === 0}
              style={{
                width: "100%", padding: 13, borderRadius: 11, border: "none",
                background: "linear-gradient(135deg, #4C1D95, #7C3AED, #A78BFA)",
                color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer",
                boxShadow: "0 6px 20px rgba(124,58,237,0.45)", marginBottom: 16,
                opacity: submitting || email.trim().length === 0 ? 0.6 : 1,
                fontFamily: "var(--font-sans)",
              }}
            >
              {submitting ? "Sending…" : tab === "login" ? "Log in" : "Create account"}
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0 16px" }}>
              <div style={{ flex: 1, borderTop: "1px solid rgba(255,255,255,0.1)" }} />
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>or</span>
              <div style={{ flex: 1, borderTop: "1px solid rgba(255,255,255,0.1)" }} />
            </div>

            <button
              type="button"
              onClick={() => toast({ title: "Google sign-in coming soon" })}
              style={{
                width: "100%", padding: 11, borderRadius: 11,
                background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(255,255,255,0.1)",
                color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                fontFamily: "var(--font-sans)",
              }}
            >
              <GoogleIcon /> Continue with Google
            </button>

            <div style={{ textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 18 }}>
              {tab === "login" ? (
                <>Don&apos;t have an account?{" "}
                  <button type="button" onClick={() => setTab("signup")} style={{ color: "#A78BFA", background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 12 }}>Sign up</button>
                </>
              ) : (
                <>Already have an account?{" "}
                  <button type="button" onClick={() => setTab("login")} style={{ color: "#A78BFA", background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 12 }}>Log in</button>
                </>
              )}
            </div>
          </form>
        ) : (
          <form onSubmit={onCodeSubmit}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 14, textAlign: "center" }}>
              {isReturning ? "Welcome back — enter the code we sent to " : "We sent a verification code to "}
              <strong style={{ color: "#fff" }}>{email}</strong>
            </p>
            <div style={{ marginBottom: 18 }}>
              <label style={labelStyle}>Verification code</label>
              <input
                className="enki-auth-input"
                style={{ ...inputStyle, textAlign: "center", letterSpacing: "0.2em", fontFamily: "var(--font-mono)" }}
                type="text"
                required
                autoComplete="one-time-code"
                spellCheck={false}
                maxLength={32}
                placeholder="Enter code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase())}
              />
            </div>

            {error && <p style={{ fontSize: 12, color: "#f87171", marginBottom: 12 }}>{error}</p>}

            <button
              type="submit"
              disabled={submitting || code.trim().length === 0}
              style={{
                width: "100%", padding: 13, borderRadius: 11, border: "none",
                background: "linear-gradient(135deg, #4C1D95, #7C3AED, #A78BFA)",
                color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer",
                boxShadow: "0 6px 20px rgba(124,58,237,0.45)", marginBottom: 14,
                opacity: submitting || code.trim().length === 0 ? 0.6 : 1,
                fontFamily: "var(--font-sans)",
              }}
            >
              {submitting ? "Verifying…" : isReturning ? "Log in" : "Create account"}
            </button>

            <button
              type="button"
              onClick={() => { reset(); setCode(""); }}
              style={{ width: "100%", background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "rgba(255,255,255,0.45)" }}
            >
              Use a different email
            </button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
