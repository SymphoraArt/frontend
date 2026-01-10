"use client";

/**
 * Comprehensive Wallet Information Hook
 *
 * Provides detailed information about the connected wallet including:
 * - Wallet type (in-app vs external)
 * - Authentication method (email, Google, phone, passkey, external)
 * - Connection status
 * - Security validation
 * - Chain information
 *
 * @example
 * const walletInfo = useWalletInfo();
 *
 * if (walletInfo.isInAppWallet) {
 *   console.log(`User authenticated via ${walletInfo.authMethod}`);
 * }
 */

import { useActiveAccount, useActiveWallet, useActiveWalletChain } from "thirdweb/react";
import { useState, useEffect } from "react";

export type WalletType = "in-app" | "external" | "none";

export type AuthMethod =
  | "email"       // Email with OTP
  | "google"      // Google OAuth
  | "phone"       // Phone with SMS
  | "passkey"     // Biometric/FIDO2
  | "facebook"    // Facebook OAuth
  | "apple"       // Apple OAuth
  | "metamask"    // MetaMask extension
  | "coinbase"    // Coinbase Wallet
  | "walletconnect" // WalletConnect
  | "rainbow"     // Rainbow Wallet
  | "zerion"      // Zerion Wallet
  | "trust"       // Trust Wallet
  | "okx"         // OKX Wallet
  | "external"    // Generic external wallet
  | "unknown";    // Unable to determine

export interface WalletSecurityInfo {
  /** Is the wallet a smart account (ERC-4337)? */
  isSmartAccount: boolean;
  /** Is the wallet properly created by our app? */
  isValidWallet: boolean;
  /** Is the wallet connection secure? */
  isSecureConnection: boolean;
  /** Potential security warnings */
  warnings: string[];
}

export interface WalletInfoState {
  /** Wallet address (0x...) */
  address: string | null;
  /** Short wallet address (0x1234...5678) */
  shortAddress: string | null;
  /** Wallet type */
  type: WalletType;
  /** Authentication method used */
  authMethod: AuthMethod;
  /** Is wallet connected? */
  isConnected: boolean;
  /** Is wallet an in-app wallet (email, Google, etc.)? */
  isInAppWallet: boolean;
  /** Is wallet an external wallet (MetaMask, etc.)? */
  isExternalWallet: boolean;
  /** Wallet ID from Thirdweb */
  walletId: string | null;
  /** Current chain information */
  chain: {
    id: number | null;
    name: string | null;
  };
  /** Security information */
  security: WalletSecurityInfo;
  /** User-friendly wallet display name */
  displayName: string;
  /** Icon/emoji for the wallet */
  icon: string;
  /** Detailed description of the wallet */
  description: string;
}

/**
 * Detect authentication method from wallet
 */
function detectAuthMethod(walletId: string | null, accountAddress: string | null): AuthMethod {
  if (!walletId) return "unknown";

  // In-app wallet detection
  if (walletId === "inApp" || walletId === "embedded") {
    // For in-app wallets, we need to detect the auth method
    // Thirdweb stores this in localStorage or we can infer from wallet properties

    // Try to get auth method from localStorage
    if (typeof window !== "undefined") {
      try {
        // Check Thirdweb's storage for auth details
        const thirdwebKeys = Object.keys(localStorage).filter(key =>
          key.includes("thirdweb") || key.includes("wallet") || key.includes("auth")
        );

        for (const key of thirdwebKeys) {
          const value = localStorage.getItem(key);
          if (!value) continue;

          try {
            const parsed = JSON.parse(value);

            // Check for email indicators
            if (parsed.email || key.includes("email")) {
              return "email";
            }
            // Check for Google indicators
            if (parsed.google || key.includes("google") || parsed.provider === "google") {
              return "google";
            }
            // Check for phone indicators
            if (parsed.phone || key.includes("phone") || parsed.phoneNumber) {
              return "phone";
            }
            // Check for passkey indicators
            if (parsed.passkey || key.includes("passkey") || parsed.credentialId) {
              return "passkey";
            }
            // Check for Facebook indicators
            if (parsed.facebook || key.includes("facebook")) {
              return "facebook";
            }
            // Check for Apple indicators
            if (parsed.apple || key.includes("apple")) {
              return "apple";
            }
          } catch (e) {
            // Not JSON or parsing failed, check string value
            if (value.includes("email") || value.includes("@")) return "email";
            if (value.includes("google")) return "google";
            if (value.includes("phone") || value.includes("+1")) return "phone";
            if (value.includes("passkey")) return "passkey";
          }
        }
      } catch (error) {
        console.warn("Failed to detect auth method from localStorage:", error);
      }
    }

    // Default to email for in-app wallets if we can't determine
    return "email";
  }

  // External wallet detection
  const walletIdLower = walletId.toLowerCase();

  if (walletIdLower.includes("metamask") || walletId === "io.metamask") {
    return "metamask";
  }
  if (walletIdLower.includes("coinbase") || walletId === "com.coinbase.wallet") {
    return "coinbase";
  }
  if (walletIdLower.includes("walletconnect") || walletId === "walletConnect") {
    return "walletconnect";
  }
  if (walletIdLower.includes("rainbow") || walletId === "me.rainbow") {
    return "rainbow";
  }
  if (walletIdLower.includes("zerion") || walletId === "io.zerion.wallet") {
    return "zerion";
  }
  if (walletIdLower.includes("trust") || walletId === "com.trustwallet.app") {
    return "trust";
  }
  if (walletIdLower.includes("okx") || walletId === "com.okex.wallet") {
    return "okx";
  }

  // Generic external wallet
  return "external";
}

/**
 * Get user-friendly wallet information
 */
function getWalletDisplayInfo(authMethod: AuthMethod): {
  displayName: string;
  icon: string;
  description: string;
} {
  const displayInfo: Record<AuthMethod, { displayName: string; icon: string; description: string }> = {
    email: {
      displayName: "Email Wallet",
      icon: "📧",
      description: "Authenticated via email",
    },
    google: {
      displayName: "Google Wallet",
      icon: "🔐",
      description: "Authenticated via Google",
    },
    phone: {
      displayName: "Phone Wallet",
      icon: "📱",
      description: "Authenticated via phone number",
    },
    passkey: {
      displayName: "Passkey Wallet",
      icon: "🔑",
      description: "Authenticated via biometric passkey",
    },
    facebook: {
      displayName: "Facebook Wallet",
      icon: "👤",
      description: "Authenticated via Facebook",
    },
    apple: {
      displayName: "Apple Wallet",
      icon: "",
      description: "Authenticated via Apple",
    },
    metamask: {
      displayName: "MetaMask",
      icon: "🦊",
      description: "MetaMask browser extension",
    },
    coinbase: {
      displayName: "Coinbase Wallet",
      icon: "💼",
      description: "Coinbase Wallet",
    },
    walletconnect: {
      displayName: "WalletConnect",
      icon: "🔗",
      description: "Connected via WalletConnect",
    },
    rainbow: {
      displayName: "Rainbow Wallet",
      icon: "🌈",
      description: "Rainbow Wallet",
    },
    zerion: {
      displayName: "Zerion Wallet",
      icon: "⚡",
      description: "Zerion Wallet",
    },
    trust: {
      displayName: "Trust Wallet",
      icon: "🛡️",
      description: "Trust Wallet",
    },
    okx: {
      displayName: "OKX Wallet",
      icon: "⭕",
      description: "OKX Wallet",
    },
    external: {
      displayName: "External Wallet",
      icon: "🔌",
      description: "Connected external wallet",
    },
    unknown: {
      displayName: "Unknown Wallet",
      icon: "❓",
      description: "Unknown wallet type",
    },
  };

  return displayInfo[authMethod];
}

/**
 * Validate wallet security
 */
function validateWalletSecurity(
  walletId: string | null,
  accountAddress: string | null,
  type: WalletType
): WalletSecurityInfo {
  const warnings: string[] = [];
  let isSmartAccount = false;
  let isValidWallet = true;
  let isSecureConnection = true;

  // Check if connected
  if (!accountAddress) {
    warnings.push("No wallet address detected");
    isValidWallet = false;
  }

  // Check for smart account (ERC-4337)
  // Thirdweb smart accounts typically have specific wallet IDs
  if (walletId?.includes("smart") || walletId?.includes("account-abstraction")) {
    isSmartAccount = true;
  }

  // Validate in-app wallets
  if (type === "in-app") {
    // In-app wallets should be created by our app
    // Check if it's a legitimate Thirdweb in-app wallet
    if (walletId !== "inApp" && walletId !== "embedded") {
      warnings.push("Unexpected in-app wallet ID");
      isValidWallet = false;
    }

    // Check for secure storage
    if (typeof window !== "undefined") {
      try {
        // Verify Thirdweb wallet data exists in localStorage
        const hasThirdwebData = Object.keys(localStorage).some(key =>
          key.includes("thirdweb")
        );
        if (!hasThirdwebData) {
          warnings.push("Missing Thirdweb wallet data");
          isValidWallet = false;
        }
      } catch (error) {
        warnings.push("Cannot access wallet storage");
        isSecureConnection = false;
      }
    }
  }

  // Validate external wallets
  if (type === "external") {
    // External wallets should have proper provider
    if (typeof window !== "undefined") {
      const ethereum = (window as any).ethereum;
      if (!ethereum) {
        warnings.push("No Web3 provider detected");
        isSecureConnection = false;
      }
    }
  }

  // Validate address format
  if (accountAddress && !accountAddress.startsWith("0x")) {
    warnings.push("Invalid address format");
    isValidWallet = false;
  }

  if (accountAddress && accountAddress.length !== 42) {
    warnings.push("Invalid address length");
    isValidWallet = false;
  }

  return {
    isSmartAccount,
    isValidWallet,
    isSecureConnection,
    warnings,
  };
}

/**
 * Main hook to get comprehensive wallet information
 */
export function useWalletInfo(): WalletInfoState {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const chain = useActiveWalletChain();

  const [walletInfo, setWalletInfo] = useState<WalletInfoState>({
    address: null,
    shortAddress: null,
    type: "none",
    authMethod: "unknown",
    isConnected: false,
    isInAppWallet: false,
    isExternalWallet: false,
    walletId: null,
    chain: {
      id: null,
      name: null,
    },
    security: {
      isSmartAccount: false,
      isValidWallet: false,
      isSecureConnection: false,
      warnings: [],
    },
    displayName: "Not Connected",
    icon: "🔌",
    description: "No wallet connected",
  });

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7245/ingest/09072fc2-e9a8-4b0b-9748-5e9d2e8abc2b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useWalletInfo.ts:useEffect:entry',message:'Wallet info effect triggered',data:{hasWallet:!!wallet,hasAccount:!!account,walletId:wallet?.id,accountAddress:account?.address},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
    // #endregion

    if (!wallet || !account) {
      // #region agent log
      fetch('http://127.0.0.1:7245/ingest/09072fc2-e9a8-4b0b-9748-5e9d2e8abc2b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useWalletInfo.ts:useEffect:no-wallet',message:'No wallet or account found',data:{hasWallet:!!wallet,hasAccount:!!account},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      // No wallet connected
      setWalletInfo({
        address: null,
        shortAddress: null,
        type: "none",
        authMethod: "unknown",
        isConnected: false,
        isInAppWallet: false,
        isExternalWallet: false,
        walletId: null,
        chain: {
          id: null,
          name: null,
        },
        security: {
          isSmartAccount: false,
          isValidWallet: false,
          isSecureConnection: false,
          warnings: [],
        },
        displayName: "Not Connected",
        icon: "🔌",
        description: "No wallet connected",
      });
      return;
    }

    // Extract wallet information
    const address = account.address;
    const shortAddress = address
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : null;
    const walletId = wallet.id || null;

    // #region agent log
    (async () => {
      try {
        // Log account structure to understand what properties are available
        const accountKeys = Object.keys(account);
        const accountType = account.constructor?.name || typeof account;
        
        // Try to get the EOA address from the wallet
        let eoaAddress = null;
        let walletAccountData = null;
        try {
          const walletAccount = await wallet.getAccount();
          eoaAddress = walletAccount?.address || null;
          walletAccountData = {
            address: walletAccount?.address,
          };
        } catch (e) {
          // #region agent log
          fetch('http://127.0.0.1:7245/ingest/09072fc2-e9a8-4b0b-9748-5e9d2e8abc2b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useWalletInfo.ts:useEffect:getAccount-error',message:'Error getting wallet account',data:{error:String(e),walletId:walletId},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'B'})}).catch(()=>{});
          // #endregion
        }
        
        // Check if account has personalAccount property (smart account wrapper)
        let personalAccountAddress = null;
        let accountStructure = {};
        try {
          // Check for personalAccount property (Thirdweb account abstraction)
          if ((account as any).personalAccount) {
            personalAccountAddress = (account as any).personalAccount.address;
            accountStructure = {
              hasPersonalAccount: true,
              personalAccountAddress: personalAccountAddress,
              personalAccountType: typeof (account as any).personalAccount,
            };
          } else {
            accountStructure = { hasPersonalAccount: false };
          }
          
          // Log full account structure (limited to avoid huge payloads)
          const accountPreview = {
            address: account.address,
            type: accountType,
            keys: accountKeys.slice(0, 20), // First 20 keys
            hasPersonalAccount: !!(account as any).personalAccount,
          };
          
          fetch('http://127.0.0.1:7245/ingest/09072fc2-e9a8-4b0b-9748-5e9d2e8abc2b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useWalletInfo.ts:useEffect:account-structure',message:'Account structure analysis',data:{accountPreview:accountPreview,accountStructure:accountStructure},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})}).catch(()=>{});
        } catch (e) {
          fetch('http://127.0.0.1:7245/ingest/09072fc2-e9a8-4b0b-9748-5e9d2e8abc2b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useWalletInfo.ts:useEffect:structure-error',message:'Error analyzing account structure',data:{error:String(e)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'C'})}).catch(()=>{});
        }

        fetch('http://127.0.0.1:7245/ingest/09072fc2-e9a8-4b0b-9748-5e9d2e8abc2b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useWalletInfo.ts:useEffect:address-comparison',message:'Comparing account address vs wallet EOA',data:{accountAddress:address,walletEOA:eoaAddress,personalAccountAddress:personalAccountAddress,walletId:walletId,addressesMatch:address===eoaAddress,isSmartAccount:address!==eoaAddress,accountAbstractionActive:address!==eoaAddress},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
      } catch (e) {
        fetch('http://127.0.0.1:7245/ingest/09072fc2-e9a8-4b0b-9748-5e9d2e8abc2b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useWalletInfo.ts:useEffect:analysis-error',message:'Error in address analysis',data:{error:String(e)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'A'})}).catch(()=>{});
      }
    })();
    // #endregion

    // Determine wallet type
    const isInAppWallet = walletId === "inApp" || walletId === "embedded";
    const isExternalWallet = !isInAppWallet;
    const type: WalletType = isInAppWallet ? "in-app" : isExternalWallet ? "external" : "none";

    // Detect authentication method
    const authMethod = detectAuthMethod(walletId, address);

    // Get display information
    const displayInfo = getWalletDisplayInfo(authMethod);

    // Validate security
    const security = validateWalletSecurity(walletId, address, type);

    // Get chain information
    const chainInfo = {
      id: chain?.id || null,
      name: chain?.name || null,
    };

    setWalletInfo({
      address,
      shortAddress,
      type,
      authMethod,
      isConnected: true,
      isInAppWallet,
      isExternalWallet,
      walletId,
      chain: chainInfo,
      security,
      ...displayInfo,
    });

    // #region agent log
    (async () => {
      try {
        // Get EOA address from wallet
        let eoaAddress = null;
        let walletAccountData = null;
        try {
          const walletAccount = await wallet.getAccount();
          eoaAddress = walletAccount?.address || null;
          walletAccountData = {
            address: walletAccount?.address,
          };
        } catch (e) {
          // #region agent log
          fetch('http://127.0.0.1:7245/ingest/09072fc2-e9a8-4b0b-9748-5e9d2e8abc2b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useWalletInfo.ts:useEffect:getAccount-error',message:'Error getting wallet account',data:{error:String(e),walletId:walletId},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
          // #endregion
        }
        
        // Check if account has personalAccount property (smart account wrapper)
        let personalAccountAddress = null;
        try {
          if ((account as any).personalAccount) {
            personalAccountAddress = (account as any).personalAccount.address;
          }
        } catch (e) {}

        fetch('http://127.0.0.1:7245/ingest/09072fc2-e9a8-4b0b-9748-5e9d2e8abc2b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useWalletInfo.ts:useEffect:address-analysis',message:'Complete address analysis after connection',data:{accountAddress:address,walletEOA:eoaAddress,personalAccountAddress:personalAccountAddress,walletAccountData:walletAccountData,walletId:walletId,type:type,addressesMatch:address===eoaAddress,isSmartAccount:address!==eoaAddress,accountAbstractionActive:address!==eoaAddress},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      } catch (e) {
        fetch('http://127.0.0.1:7245/ingest/09072fc2-e9a8-4b0b-9748-5e9d2e8abc2b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useWalletInfo.ts:useEffect:analysis-error',message:'Error in address analysis',data:{error:String(e)},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      }
    })();
    // #endregion

    // Log wallet connection for debugging
    console.log("🔍 Wallet Info:", {
      address: shortAddress,
      type,
      authMethod,
      walletId,
      chain: chainInfo,
      security,
    });

    // Warn if there are security issues
    if (security.warnings.length > 0) {
      console.warn("⚠️ Wallet security warnings:", security.warnings);
    }
  }, [wallet, account, chain]);

  return walletInfo;
}

/**
 * Hook to check if wallet is properly authenticated for our app
 */
export function useWalletAuthentication() {
  const walletInfo = useWalletInfo();

  return {
    isAuthenticated: walletInfo.isConnected && walletInfo.security.isValidWallet,
    isSecure: walletInfo.security.isSecureConnection,
    warnings: walletInfo.security.warnings,
    canMakePayments: walletInfo.isConnected && walletInfo.security.isValidWallet && walletInfo.security.isSecureConnection,
  };
}
