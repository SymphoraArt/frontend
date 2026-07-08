"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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

// EIP-6963 announced provider info (name + icon + reverse-DNS id).
type EIP6963Info = { uuid: string; name: string; icon: string; rdns: string };

// One row per wallet, carrying whichever chains that wallet supports, so a
// multi-chain wallet (Phantom, Brave, Zerion…) is shown once instead of twice.
type MergedWallet = {
  key: string;
  name: string;
  icon: string;
  solana?: { name: string };
  evm?: { rdns: string };
};

type SolanaPhase = "connecting" | "signing";

// "phantom.app" → "app.phantom": lets an EVM provider's rdns be checked
// against the domain the Solana adapter itself points at.
function reversedHost(url: string | undefined): string | null {
  try {
    const host = new URL(url ?? "").hostname.replace(/^www\./, "");
    return host ? host.split(".").reverse().join(".") : null;
  } catch {
    return null;
  }
}

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
  // Bumped on close and on every new connect attempt: an async flow that
  // awaited a wallet popup across a close/reopen is superseded and must not
  // keep signing, writing state, or closing the new flow's modal.
  const flowSeq = useRef(0);

  // Email / Turnkey state
  const { set: setTurnkeyAuth } = useTurnkeyEmailAuth();
  const { step, error: turnkeyError, walletAddress: turnkeyWalletAddress, subOrganizationId, sessionToken, isReturning, sendOtp, verifyOtp, reset: resetTurnkey } = useTurnkeyWallet();
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");

  // EVM wallets are auto-detected via EIP-6963 (no hardcoded list) — the same
  // way Solana wallets come from Wallet Standard. Only installed extensions show.
  const [evmProviders, setEvmProviders] = useState<EIP6963Info[]>([]);
  useEffect(() => {
    if (!open) return;
    const found = new Map<string, EIP6963Info>();
    const onAnnounce = (event: Event) => {
      const info = (event as CustomEvent<{ info?: Partial<EIP6963Info> }>).detail?.info;
      // Any script can dispatch this event with an arbitrary payload: a
      // non-string name crashed the merge below, and EIP-6963 mandates a
      // data:-URI icon — a remote URL would let a fake provider spoof another
      // wallet's hosted icon (and phone home). Drop malformed announcements.
      if (!info || typeof info.name !== "string" || !info.name.trim()) return;
      if (typeof info.rdns !== "string" || !info.rdns) return;
      const icon = typeof info.icon === "string" && info.icon.startsWith("data:image/") ? info.icon : "";
      found.set(info.rdns, {
        uuid: typeof info.uuid === "string" ? info.uuid : "",
        name: info.name.trim(),
        icon,
        rdns: info.rdns,
      });
      setEvmProviders(Array.from(found.values()));
    };
    window.addEventListener("eip6963:announceProvider", onAnnounce as EventListener);
    // Ask installed wallets to announce themselves (EIP-6963 handshake).
    window.dispatchEvent(new Event("eip6963:requestProvider"));
    return () => window.removeEventListener("eip6963:announceProvider", onAnnounce as EventListener);
  }, [open]);

  // Merge Solana (Wallet Standard) and EVM (EIP-6963) lists so a genuine
  // multi-chain wallet (Phantom, Brave, Zerion…) shows once. The join must
  // NOT be the display name: any extension can announce name "Phantom" and
  // would have inherited the trusted row, its icon, and its EVM button. An
  // EVM provider only joins a Solana row when its rdns lies inside the
  // reversed domain of the Solana adapter's own url (phantom.app ↔
  // app.phantom); everything else gets its own row keyed by rdns, showing
  // only its own announced identity — icons are never shared across sources.
  const mergedWallets = useMemo<MergedWallet[]>(() => {
    const solRows = solanaWallets.map((w) => ({
      domain: reversedHost(w.adapter.url),
      row: {
        key: `sol:${w.adapter.name.trim().toLowerCase()}`,
        name: w.adapter.name,
        icon: w.adapter.icon ?? "",
        solana: { name: w.adapter.name },
      } as MergedWallet,
    }));
    const rows = solRows.map((s) => s.row);
    for (const p of evmProviders) {
      const owner = solRows.find(
        (s) => s.domain && (p.rdns === s.domain || p.rdns.startsWith(s.domain + ".")),
      );
      if (owner && !owner.row.evm) {
        owner.row.evm = { rdns: p.rdns };
      } else {
        rows.push({ key: `evm:${p.rdns}`, name: p.name, icon: p.icon, evm: { rdns: p.rdns } });
      }
    }
    return rows;
  }, [solanaWallets, evmProviders]);

  const handleClose = useCallback(() => {
    flowSeq.current += 1;
    solanaInFlight.current = false;
    setSolanaPhase(null);
    setSolanaError(null);
    setConnecting(null);
    setShowEmail(false);
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

    const flow = ++flowSeq.current;
    const stale = () => flowSeq.current !== flow;

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
      if (stale()) return;
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

    // The user may have closed the modal (or started another wallet) while
    // the extension popup was open — a superseded flow must not sign in.
    if (stale()) {
      try { await adapter.disconnect(); } catch { /* noop */ }
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
      if (stale()) return;
      setSolanaPhase(null);
      setConnecting(null);
      solanaInFlight.current = false;
      onClose();
    } catch (e) {
      if (stale()) return;
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
    const flow = ++flowSeq.current;
    setConnecting(walletId);
    try {
      await evmConnect(async () => {
        const wallet = createWallet(walletId);
        await wallet.connect({ client: thirdwebClient, chain: defaultChain });
        return wallet;
      });
      if (flowSeq.current === flow) onClose();
    } catch (e) {
      if (!isUserRejection(e)) {
        console.error("EVM connect error:", e);
      }
    } finally {
      if (flowSeq.current === flow) setConnecting(null);
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
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => { if (showEmail) { setShowEmail(false); resetTurnkey(); } else { handleClose(); } }}
              aria-label="Back"
              className="-ml-1 rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <DialogTitle className="text-base">Connect Wallet</DialogTitle>
          </div>
          <DialogDescription className="sr-only">
            Select a Solana or EVM wallet to connect to Symphora.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-1">
          {/* Email / Turnkey login */}
          {showEmail ? (
            <div className="py-1">
              {step === "idle" || step === "sending" ? (
                <form onSubmit={handleEmailSubmit} className="flex flex-col gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring"
                  />
                  {turnkeyError && <p className="text-xs text-red-500">{turnkeyError}</p>}
                  <div className="flex gap-2">
                    <button type="button" onClick={() => { setShowEmail(false); resetTurnkey(); }}
                      className="flex-1 rounded-lg border border-input py-2 text-xs font-medium text-muted-foreground hover:bg-muted">
                      Cancel
                    </button>
                    <button type="submit" disabled={step === "sending"}
                      className="flex-1 rounded-lg bg-foreground py-2 text-xs font-medium text-background disabled:opacity-50">
                      {step === "sending" ? "Sending…" : "Send code"}
                    </button>
                  </div>
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
                    className="w-full rounded-lg bg-foreground py-2 text-xs font-medium text-background disabled:opacity-50">
                    {step === "verifying" ? "Verifying…" : isReturning ? "Recover wallet" : "Verify"}
                  </button>
                  <button type="button" onClick={() => { resetTurnkey(); setOtpCode(""); }}
                    className="text-xs text-muted-foreground hover:text-foreground">
                    Use a different email
                  </button>
                </form>
              )}
            </div>
          ) : null}

          {solanaError && (
            <p className="px-3 py-1.5 text-xs text-red-500">{solanaError}</p>
          )}

          {/* One row per wallet; each supported chain is a button. Solana comes
              from Wallet Standard, EVM from EIP-6963 — both auto-detected. */}
          {mergedWallets.map((w) => {
            const solConnecting = !!w.solana && connecting === w.solana.name;
            const evmConnecting = !!w.evm && connecting === w.evm.rdns;
            return (
              <div
                key={w.key}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted text-sm font-medium transition-colors"
              >
                {w.icon ? (
                  <img
                    src={w.icon}
                    alt={w.name}
                    className="h-6 w-6 rounded flex-shrink-0"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                ) : (
                  <span className="h-6 w-6 rounded bg-gradient-to-br from-purple-500 to-green-400 flex-shrink-0" />
                )}
                <span className="flex-1 truncate">{w.name}</span>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {w.solana && (
                    <button
                      disabled={!!connecting}
                      onClick={() => handleSolana(w.solana!.name)}
                      className="rounded-md border border-input px-2 py-1 text-[11px] font-medium text-muted-foreground hover:bg-foreground hover:text-background disabled:opacity-50 transition-colors"
                    >
                      {solConnecting ? (solanaPhase === "signing" ? "Sign in…" : "Connecting…") : "Solana"}
                    </button>
                  )}
                  {w.evm && (
                    <button
                      disabled={!!connecting}
                      onClick={() => handleEVM(w.evm!.rdns as WalletId)}
                      className="rounded-md border border-input px-2 py-1 text-[11px] font-medium text-muted-foreground hover:bg-foreground hover:text-background disabled:opacity-50 transition-colors"
                    >
                      {evmConnecting ? "Connecting…" : "EVM"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          {!showEmail && (
            <>
              <div className="border-t my-2" />
              <button
                disabled={!!connecting}
                onClick={() => setShowEmail(true)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted disabled:opacity-50 text-sm font-medium text-left transition-colors"
              >
                <span className="h-6 w-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-400 flex items-center justify-center text-white text-xs flex-shrink-0">@</span>
                <span className="flex-1">Sign in with Email</span>
                <span className="text-xs text-muted-foreground">Embedded Wallet</span>
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
