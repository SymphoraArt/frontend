"use client";

import { useState, useEffect } from "react";
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

export function WalletPickerModal({ open, onClose }: WalletPickerModalProps) {
  const { connect: evmConnect } = useConnect();
  const { wallets: solanaWallets, wallet: currentWallet, select, connect: solanaConnect, connected } = useWallet();
  const [connecting, setConnecting] = useState<string | null>(null);
  const [pendingSolana, setPendingSolana] = useState<string | null>(null);

  // Email / Turnkey state
  const { set: setTurnkeyAuth } = useTurnkeyEmailAuth();
  const { step, error: turnkeyError, walletAddress: turnkeyWalletAddress, subOrganizationId, sessionToken, sendOtp, verifyOtp, reset: resetTurnkey } = useTurnkeyWallet();
  const [showEmail, setShowEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");

  // On Turnkey success, persist wallet address and close
  useEffect(() => {
    if (step === "done" && turnkeyWalletAddress && subOrganizationId) {
      setTurnkeyAuth(turnkeyWalletAddress, subOrganizationId, sessionToken ?? undefined);
      handleClose();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, turnkeyWalletAddress, subOrganizationId, sessionToken]);

  // After select() updates state and currentWallet changes, call connect()
  useEffect(() => {
    if (!pendingSolana) return;
    if (currentWallet?.adapter.name !== pendingSolana) return;
    if (connected) { setPendingSolana(null); setConnecting(null); onClose(); return; }

    solanaConnect()
      .then(() => {
        setPendingSolana(null);
        setConnecting(null);
        onClose();
      })
      .catch((e) => {
        console.error("Solana connect error:", e);
        setPendingSolana(null);
        setConnecting(null);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWallet?.adapter.name, pendingSolana, connected]);

  const handleSolana = (name: string) => {
    const found = solanaWallets.find((w) => w.adapter.name === name);
    if (!found) return;

    if (
      found.readyState === WalletReadyState.NotDetected ||
      found.readyState === WalletReadyState.Unsupported
    ) {
      window.open(found.adapter.url, "_blank");
      return;
    }

    setConnecting(name);
    select(name as WalletName);  // triggers state update → useEffect fires → solanaConnect()
    setPendingSolana(name);
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
      console.error("EVM connect error:", e);
    } finally {
      setConnecting(null);
    }
  };

  const handleClose = () => {
    setPendingSolana(null);
    setConnecting(null);
    setShowEmail(false);
    setEmail("");
    setOtpCode("");
    resetTurnkey();
    onClose();
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
          <DialogTitle className="text-base">Connect Wallet</DialogTitle>
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
                  <p className="text-xs text-muted-foreground">6-digit code sent to <strong>{email}</strong></p>
                  <input
                    type="text"
                    required
                    placeholder="123456"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-center font-mono text-lg tracking-widest outline-none focus:border-ring"
                  />
                  {turnkeyError && <p className="text-xs text-red-500">{turnkeyError}</p>}
                  <button type="submit" disabled={step === "verifying" || otpCode.length < 6}
                    className="w-full rounded-lg bg-foreground py-2 text-xs font-medium text-background disabled:opacity-50">
                    {step === "verifying" ? "Verifying…" : "Verify"}
                  </button>
                  <button type="button" onClick={() => { resetTurnkey(); setOtpCode(""); }}
                    className="text-xs text-muted-foreground hover:text-foreground">
                    Use a different email
                  </button>
                </form>
              )}
            </div>
          ) : null}

          {/* Solana wallets */}
          {solanaWallets.map((w) => {
            const notInstalled =
              w.readyState === WalletReadyState.NotDetected ||
              w.readyState === WalletReadyState.Unsupported;
            return (
              <button
                key={w.adapter.name}
                disabled={!!connecting}
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
                  {connecting === w.adapter.name ? "Connecting…" : notInstalled ? "Install" : "Solana"}
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
