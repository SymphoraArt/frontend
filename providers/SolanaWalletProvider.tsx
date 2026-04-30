"use client";

/**
 * Solana Wallet Adapter Provider
 *
 * Wraps children with Solana connection and wallet adapter context.
 * Supports Phantom, Solflare, and other popular Solana wallets.
 */

import { useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

// Import Solana wallet adapter styles
import "@solana/wallet-adapter-react-ui/styles.css";

const SOLANA_DEVNET_RPC = "https://api.devnet.solana.com";

export function SolanaWalletProvider({ children }: { children: React.ReactNode }) {
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={SOLANA_DEVNET_RPC}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
