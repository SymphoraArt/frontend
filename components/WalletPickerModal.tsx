"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useConnect } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { thirdwebClient, defaultChain } from "@/lib/thirdweb";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import type { WalletName } from "@solana/wallet-adapter-base";
import type { WalletId } from "thirdweb/wallets";
import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";
import { useTurnkeyWallet } from "@/hooks/useTurnkeyWallet";
import { createSolanaAuthSession, createSolanaAuthSessionWithSignIn } from "@/hooks/useSolanaAuth";
import { useToast } from "@/hooks/use-toast";

interface WalletPickerModalProps {
  open: boolean;
  onClose: () => void;
}

const EVM_WALLETS: Array<{ id: WalletId; name: string; icon: string }> = [
  { id: "io.metamask",         name: "MetaMask",       icon: "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" },
  { id: "com.coinbase.wallet", name: "Coinbase Wallet", icon: "https://avatars.githubusercontent.com/u/1885080?s=200&v=4" },
  { id: "walletConnect",       name: "WalletConnect",  icon: "https://avatars.githubusercontent.com/u/37784886?s=200&v=4" },
  { id: "me.rainbow",          name: "Rainbow",        icon: "https://rainbow.me/favicon.ico" },
  { id: "com.trustwallet.app", name: "Trust Wallet",   icon: "https://avatars.githubusercontent.com/u/32179889?s=200&v=4" },
];

type SolanaPhase = "connecting" | "signing";

function isUserRejection(e: unknown): boolean {
  const raw = ((e as Error)?.message ?? String(e ?? "")).toLowerCase();
  if (!raw) return false;
  return (
    raw.includes("user reject") ||
    raw.includes("user denied") ||
    raw.includes("user cancel") ||
    raw.includes("user closed") ||
    raw.includes("rejected the request") ||
    raw.includes("connection rejected") ||
    raw.includes("request rejected") ||
    raw.includes("popup closed") ||
    raw.includes("walletconnect modal closed") ||
    (e as { code?: number })?.code === 4001
  );
}

export function WalletPickerModal({ open, onClose }: WalletPickerModalProps) {
  const { connect: evmConnect } = useConnect();
  const {
    wallets: solanaWallets,
    wallet: solanaWallet,
    select: selectSolanaWallet,
  } = useWallet();
  const { toast } = useToast();

  const [connecting, setConnecting] = useState<string | null>(null);
  const [solanaPhase, setSolanaPhase] = useState<SolanaPhase | null>(null);
  const [solanaError, setSolanaError] = useState<string | null>(null);
  const solanaInFlight = useRef(false);

  // Email / Turnkey state
  const { set: setTurnkeyAuth } = useTurnkeyEmailAuth();
  const { step, error: turnkeyError, walletAddress: turnkeyWalletAddress, subOrganizationId, sessionToken, isReturning, sendOtp, verifyOtp, reset: resetTurnkey } = useTurnkeyWallet();
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");

  const handleClose = useCallback(() => {
    solanaInFlight.current = false;
    setSolanaPhase(null);
    setSolanaError(null);
    setConnecting(null);
    setEmail("");
    setOtpCode("");
    resetTurnkey();
    onClose();
  }, [onClose, resetTurnkey]);

  /* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
  useEffect(() => {
    if (step === "done" && turnkeyWalletAddress && subOrganizationId) {
      setTurnkeyAuth(turnkeyWalletAddress, subOrganizationId, sessionToken ?? undefined);
      toast({
        title: isReturning ? "Welcome back" : "Wallet ready",
        description: isReturning
          ? "Your existing wallet was recovered."
          : "A new Solana wallet was created for you.",
      });
      handleClose();
    }
  }, [step, turnkeyWalletAddress, subOrganizationId, sessionToken, isReturning]);
  /* eslint-enable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */

  const handleSolana = async (name: string) => {
    const found = solanaWallets.find((w) => w.adapter.name === name);
    if (!found) return;

    if (
      found.readyState === WalletReadyState.NotDetected ||
      found.readyState === WalletReadyState.Unsupported
    ) {
      window.open(found.adapter.url, "_blank");
      return;
    }

    if (solanaInFlight.current) return;
    if (connecting && connecting !== name) return;

    solanaInFlight.current = true;
    setSolanaError(null);
    setConnecting(name);

    const adapter = found.adapter;

    // Disconnect a previously-active different adapter so its standard:disconnect listener
    // does not interfere with the new adapter's connect popup.
    if (solanaWallet && solanaWallet.adapter.name !== name) {
      try { await solanaWallet.adapter.disconnect(); } catch { /* noop */ }
    }

    // Keep WalletProvider state in sync for Navbar / hooks. select() is sync — it just
    // updates the provider's `wallet` ref without firing connect (autoConnect=false).
    selectSolanaWallet(name as WalletName);

    // Diagnostic: log what global wallet objects exist so we can confirm whether the
    // extension exposes a window-level handle.
    if (name === "Solflare") {
      const w = window as unknown as { solflare?: unknown };
      console.log("[Solana diag] window.solflare =", w.solflare);
    }

    const failConnect = (e: unknown) => {
      if (isUserRejection(e)) {
        setSolanaError(null);
        setSolanaPhase(null);
        setConnecting(null);
        solanaInFlight.current = false;
        return;
      }
      const raw = (e as Error)?.message ?? String(e ?? "");
      const lower = raw.toLowerCase();
      const hint =
        name === "Solflare" && (lower.includes("rejected") || lower.includes("connection rejected"))
          ? " Open the Solflare extension popup, unlock it, then revoke any localhost entries under Settings → Trusted Apps and retry."
          : "";
      console.error(`[Solana connect] adapter=${name} raw=`, e);
      setSolanaError(`Connect failed (${name}): ${raw || "unknown error"}.${hint}`);
      setSolanaPhase(null);
      setConnecting(null);
      solanaInFlight.current = false;
    };

    try {
      if (!adapter.connected) {
        setSolanaPhase("connecting");
        await adapter.connect();
      }
    } catch (e) {
      failConnect(e);
      return;
    }

    const publicKey = adapter.publicKey;
    if (!publicKey) {
      failConnect(new Error("Wallet did not return a public key"));
      return;
    }

    setSolanaPhase("signing");
    const walletAddress = publicKey.toBase58();

    type SignInInput = {
      domain?: string;
      address?: string;
      statement?: string;
      uri?: string;
      version?: string;
      chainId?: string;
      nonce?: string;
      issuedAt?: string;
    };
    type SignInFn = (input?: SignInInput) => Promise<{ signedMessage: Uint8Array; signature: Uint8Array }>;
    type SignMessageFn = (message: Uint8Array) => Promise<Uint8Array>;

    const capable = adapter as unknown as { signIn?: SignInFn; signMessage?: SignMessageFn };
    const adapterSignIn = capable.signIn;
    const adapterSignMessage = capable.signMessage;

    // Some adapters (e.g. Zerion) expose a signIn method but don't actually
    // implement the SIWS standard feature — calling it throws
    // "WalletSignInError: signIn: Not Implemented". Detect that and fall back
    // to the plain signMessage flow, which those wallets do support.
    const isSignInUnsupported = (e: unknown): boolean => {
      const msg = ((e as Error)?.message ?? "").toLowerCase();
      return (
        (e as Error)?.name === "WalletSignInError" ||
        msg.includes("not implemented") ||
        msg.includes("signin is not")
      );
    };

    try {
      let authenticated = false;
      if (typeof adapterSignIn === "function") {
        try {
          // SIWS — single popup that both connects (already connected here) and signs.
          await createSolanaAuthSessionWithSignIn(walletAddress, adapterSignIn.bind(adapter));
          authenticated = true;
        } catch (signInErr) {
          // Re-throw genuine rejections; only fall back when SIWS is unsupported.
          if (isUserRejection(signInErr) || !isSignInUnsupported(signInErr)) throw signInErr;
        }
      }
      if (!authenticated) {
        if (typeof adapterSignMessage === "function") {
          await createSolanaAuthSession(walletAddress, adapterSignMessage.bind(adapter));
        } else {
          throw new Error("Wallet does not support message signing");
        }
      }
      setSolanaPhase(null);
      setConnecting(null);
      solanaInFlight.current = false;
      onClose();
    } catch (e) {
      if (isUserRejection(e)) {
        setSolanaError(null);
        try { await adapter.disconnect(); } catch { /* noop */ }
        setSolanaPhase(null);
        setConnecting(null);
        solanaInFlight.current = false;
        return;
      }
      const raw = (e as Error)?.message ?? String(e ?? "");
      console.error(`[Solana sign-in] adapter=${name} raw=`, e);
      setSolanaError(`Sign-in failed (${name}): ${raw || "unknown error"}`);
      // Don't leave the wallet half-logged-in.
      try { await adapter.disconnect(); } catch { /* noop */ }
      setSolanaPhase(null);
      setConnecting(null);
      solanaInFlight.current = false;
    }
  };

  const handleEVM = async (walletId: WalletId) => {
    setConnecting(walletId);
    try {
      await evmConnect(async () => {
        const wallet = createWallet(walletId);
        await wallet.connect({ client: thirdwebClient, chain: defaultChain });
        return wallet;
      });
      onClose();
    } catch (e) {
      if (!isUserRejection(e)) {
        console.error("EVM connect error:", e);
      }
    } finally {
      setConnecting(null);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendOtp(email.trim());
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await verifyOtp(otpCode.trim());
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); }}>
      <DialogContent className="sm:max-w-xs p-4">
        <DialogHeader>
          <DialogTitle className="text-base">Sign in</DialogTitle>
          <DialogDescription className="sr-only">
            Sign in with your email, or connect a Solana / EVM wallet.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-1">
          {/* Primary: email login (passwordless OTP) */}
          <div className="py-1">
            {step === "idle" || step === "sending" ? (
              <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2">
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
                />
                {turnkeyError && <p className="text-xs text-red-500">{turnkeyError}</p>}
                <button type="submit" disabled={step === "sending" || email.trim().length === 0}
                  className="w-full rounded-lg bg-foreground py-2.5 text-sm font-medium text-background disabled:opacity-50">
                  {step === "sending" ? "Sending…" : "Continue with email"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="flex flex-col gap-2">
                {isReturning ? (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400">
                    Existing wallet found, recovering — enter the code sent to <strong>{email}</strong>.
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Verification code sent to <strong>{email}</strong>
                  </p>
                )}
                <input
                  type="text"
                  required
                  placeholder="Enter code"
                  maxLength={32}
                  autoComplete="one-time-code"
                  spellCheck={false}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase())}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-center font-mono text-base tracking-wide outline-none focus:border-ring"
                />
                {turnkeyError && <p className="text-xs text-red-500">{turnkeyError}</p>}
                <button type="submit" disabled={step === "verifying" || otpCode.trim().length === 0}
                  className="w-full rounded-lg bg-foreground py-2.5 text-sm font-medium text-background disabled:opacity-50">
                  {step === "verifying" ? "Verifying…" : isReturning ? "Recover wallet" : "Verify"}
                </button>
                <button type="button" onClick={() => { resetTurnkey(); setOtpCode(""); }}
                  className="text-xs text-muted-foreground hover:text-foreground">
                  Use a different email
                </button>
              </form>
            )}
          </div>

          {/* Divider → web3 option */}
          <div className="my-3 flex items-center gap-3">
            <div className="flex-1 border-t" />
            <span className="text-xs text-muted-foreground whitespace-nowrap">or connect with wallet</span>
            <div className="flex-1 border-t" />
          </div>

          {solanaError && (
            <p className="px-3 py-1.5 text-xs text-red-500">{solanaError}</p>
          )}

          {solanaWallets.map((w) => {
            const notInstalled =
              w.readyState === WalletReadyState.NotDetected ||
              w.readyState === WalletReadyState.Unsupported;
            const isConnectingThis = connecting === w.adapter.name;
            return (
              <button
                key={w.adapter.name}
                disabled={!!connecting && !isConnectingThis}
                onClick={() => handleSolana(w.adapter.name)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted disabled:opacity-50 text-sm font-medium text-left transition-colors"
              >
                {w.adapter.icon ? (
                  <img src={w.adapter.icon} alt={w.adapter.name} className="h-6 w-6 rounded flex-shrink-0" />
                ) : (
                  <span className="h-6 w-6 rounded bg-gradient-to-br from-purple-500 to-green-400 flex-shrink-0" />
                )}
                <span className="flex-1">{w.adapter.name}</span>
                <span className="text-xs text-muted-foreground">
                  {isConnectingThis
                    ? solanaPhase === "signing" ? "Sign in wallet…" : "Connecting…"
                    : notInstalled ? "Install" : "Solana"}
                </span>
              </button>
            );
          })}

          <div className="border-t my-2" />

          {/* EVM wallets */}
          {EVM_WALLETS.map((w) => (
            <button
              key={w.id}
              disabled={!!connecting}
              onClick={() => handleEVM(w.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted disabled:opacity-50 text-sm font-medium text-left transition-colors"
            >
              <img
                src={w.icon}
                alt={w.name}
                className="h-6 w-6 rounded flex-shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <span className="flex-1">{w.name}</span>
              <span className="text-xs text-muted-foreground">
                {connecting === w.id ? "Connecting…" : "EVM"}
              </span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
