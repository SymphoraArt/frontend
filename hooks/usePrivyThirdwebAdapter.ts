"use client";

/**
 * Privy → Thirdweb Wallet Bridge
 *
 * This hook bridges Privy's authenticated wallet into Thirdweb's wallet context.
 * It enables useActiveAccount() to return the Privy wallet, unblocking x402 payment flows.
 *
 * Architecture:
 * 1. Privy manages authentication & wallet connection
 * 2. This adapter extracts Privy's EIP-1193 provider
 * 3. Thirdweb wraps it as a native wallet
 * 4. useActiveAccount() becomes populated
 * 5. X402 payment modal can now appear
 *
 * CRITICAL: This must be mounted ONCE at the provider level.
 */

import { useEffect, useRef } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "thirdweb/react";
import { EIP1193 } from "thirdweb/wallets";
import { thirdwebClient } from "@/lib/thirdweb-client";

export function usePrivyThirdwebAdapter() {
  const { ready, authenticated } = usePrivy();
  const { wallets } = useWallets();
  const setActiveWallet = useSetActiveWallet();

  // Track if we've already set the wallet to avoid re-setting on every render
  const hasSetWalletRef = useRef(false);
  const currentWalletAddressRef = useRef<string | null>(null);

  useEffect(() => {
    // Exit early if conditions not met
    if (!ready || !authenticated || wallets.length === 0) {
      // Reset if user disconnected
      if (hasSetWalletRef.current) {
        console.log("🔌 Privy wallet disconnected, resetting Thirdweb wallet");
        hasSetWalletRef.current = false;
        currentWalletAddressRef.current = null;
      }
      return;
    }

    const privyWallet = wallets[0]; // Use first connected wallet
    const walletAddress = privyWallet.address;

    // Only set wallet if it's a new address or first time
    if (
      hasSetWalletRef.current &&
      currentWalletAddressRef.current === walletAddress
    ) {
      // Already set this wallet, skip
      return;
    }

    console.log("🌉 Bridging Privy wallet to Thirdweb...");
    console.log("📍 Wallet address:", walletAddress);

    // Create Thirdweb wallet from Privy's EIP-1193 provider
    (async () => {
      try {
        const ethereumProvider = await privyWallet.getEthereumProvider();

        const thirdwebWallet = EIP1193.fromProvider({
          provider: ethereumProvider,
          walletId: "privy" as any, // Custom wallet ID
        });

        // Connect the wallet to Thirdweb
        const account = await thirdwebWallet.connect({
          client: thirdwebClient,
        });

        console.log("✅ Thirdweb wallet connected");
        console.log("📍 Account address:", account.address);

        // Set as active wallet for Thirdweb hooks
        setActiveWallet(thirdwebWallet);

        // Mark as set
        hasSetWalletRef.current = true;
        currentWalletAddressRef.current = walletAddress;

        console.log("🎉 Privy ↔ Thirdweb bridge complete");
        console.log("✨ useActiveAccount() should now return:", account.address);
      } catch (error) {
        console.error("❌ Failed to bridge Privy wallet to Thirdweb:", error);
        hasSetWalletRef.current = false;
        currentWalletAddressRef.current = null;
      }
    })();
  }, [ready, authenticated, wallets, setActiveWallet]);
}
