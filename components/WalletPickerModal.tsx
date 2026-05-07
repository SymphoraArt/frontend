"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useConnect } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { thirdwebClient, defaultChain } from "@/lib/thirdweb";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import type { WalletName } from "@solana/wallet-adapter-base";
import type { WalletId } from "thirdweb/wallets";

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
  // Name of the wallet we're waiting to connect after select() updates state
  const [pendingSolana, setPendingSolana] = useState<string | null>(null);

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

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { setPendingSolana(null); setConnecting(null); onClose(); } }}>
      <DialogContent className="sm:max-w-xs p-4">
        <DialogHeader>
          <DialogTitle className="text-base">Connect Wallet</DialogTitle>
        </DialogHeader>

        <div className="mt-2 space-y-1">
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
                  {connecting === w.adapter.name ? "연결 중…" : notInstalled ? "설치 필요" : "Solana"}
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
                {connecting === w.id ? "연결 중…" : "EVM"}
              </span>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
