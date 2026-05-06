"use client";

/**
 * ConnectWallet Component
 * 
 * Comprehensive Thirdweb ConnectButton supporting ALL authentication methods:
 * 
 * In-App Wallets:
 * - Email (passwordless with OTP)
 * - Google OAuth
 * - Phone (SMS verification)
 * - Passkey (biometric/FIDO2)
 * 
 * External Wallets:
 * - MetaMask
 * - Coinbase Wallet
 * - WalletConnect (supports 100+ wallets)
 * - And any other EIP-1193 compatible wallet
 * 
 * Features:
 * - Wide modal for better UX
 * - Theme-aware styling (follows system colors)
 * - Professional UI/UX
 * - Auto-detects installed wallets
 */

import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { thirdwebClient, defaultChain } from "@/lib/thirdweb";

export function ConnectWallet({ className, label }: { className?: string; label?: string }) {
  const account = useActiveAccount();

  // #region agent log
  if (typeof window !== 'undefined') {
    fetch('http://127.0.0.1:7245/ingest/09072fc2-e9a8-4b0b-9748-5e9d2e8abc2b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'ConnectWallet.tsx:render',message:'ConnectWallet rendering with account abstraction disabled',data:{hasAccount:!!account,accountAddress:account?.address,accountAbstractionEnabled:false},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
  }
  // #endregion

  return (
    <ConnectButton
      client={thirdwebClient}
      chain={defaultChain}
      wallets={[
        // In-App Wallet with ALL authentication methods
        inAppWallet({
          auth: {
            options: [
              "email",      // Email with OTP verification
              "google",     // Google OAuth
              "phone",      // Phone number with SMS verification
              "passkey",    // Biometric/FIDO2 passkeys
            ],
          },
        }),
        // External Wallets - All major wallet options
        createWallet("io.metamask"),           // MetaMask
        createWallet("com.coinbase.wallet"),   // Coinbase Wallet
        createWallet("walletConnect"),         // WalletConnect (supports 100+ wallets)
        // Additional popular wallets (auto-detected if installed)
        createWallet("me.rainbow"),            // Rainbow Wallet
        createWallet("io.zerion.wallet"),      // Zerion Wallet
        createWallet("com.trustwallet.app"),  // Trust Wallet
        createWallet("com.okex.wallet"),      // OKX Wallet
      ]}
      connectModal={{
        size: "wide",
        title: "Sign in to Symphora",
        titleIcon: "/favicon.svg", // Your app logo
        showThirdwebBranding: false,
        termsOfServiceUrl: "https://symphora.com/terms",
        privacyPolicyUrl: "https://symphora.com/privacy",
      }}
      connectButton={{
        label: label || "Connect Wallet",
        className: className || "connect-wallet-button",
      }}
      // Account abstraction disabled to show actual wallet addresses (EOA)
      // Users will see their MetaMask address or email wallet address directly
      // If you need smart accounts later, you can enable this but will need to
      // extract the EOA from the smart account wrapper
      // accountAbstraction={{
      //   chain: defaultChain,
      //   sponsorGas: false,
      // }}
    />
  );
}
