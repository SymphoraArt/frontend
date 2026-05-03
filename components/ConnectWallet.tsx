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
import { APP_NAME, TERMS_URL, PRIVACY_URL } from "@/shared/app-config";

export function ConnectWallet() {
  const account = useActiveAccount();

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
        title: `Sign in to ${APP_NAME}`,
        titleIcon: "/favicon.svg", // Your app logo
        showThirdwebBranding: false,
        ...(TERMS_URL ? { termsOfServiceUrl: TERMS_URL } : {}),
        ...(PRIVACY_URL ? { privacyPolicyUrl: PRIVACY_URL } : {}),
      }}
      connectButton={{
        label: "Connect Wallet",
        className: "connect-wallet-button",
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
