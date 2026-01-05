"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import React from "react";

class PrivyErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean; errorMessage: string }
> {
  state = { hasError: false, errorMessage: "" };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error: unknown, errorInfo: React.ErrorInfo) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Privy provider failed to initialize:", error);
    console.error("Error details:", errorInfo);

    // Check for specific errors
    if (errorMessage.includes("resource.clone") || errorMessage.includes("ambire")) {
      console.warn("⚠️  Detected Ambire wallet extension compatibility issue. Privy will fallback to basic wallet connection.");
    } else if (errorMessage.includes("Missing or invalid Privy app client ID") || 
               errorMessage.includes("400") ||
               errorMessage.includes("Bad Request")) {
      console.warn("⚠️  Privy credentials appear invalid. Check NEXT_PUBLIC_PRIVY_APP_ID and NEXT_PUBLIC_PRIVY_CLIENT_ID in .env");
      console.warn("⚠️  App will continue working - wallet connection via Thirdweb is still available.");
    }

    this.setState({ errorMessage });
  }

  render() {
    if (this.state.hasError) {
      console.warn(`⚠️  Privy provider failed, using fallback. Error: ${this.state.errorMessage}`);
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function PrivyWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";
  const clientId = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID || "";

  // Validate environment variables
  if (!appId || !clientId) {
    console.warn(
      "⚠️  Privy is disabled: NEXT_PUBLIC_PRIVY_APP_ID and/or NEXT_PUBLIC_PRIVY_CLIENT_ID is not set."
    );
    console.warn("⚠️  App will work without Privy - wallet connection via Thirdweb will still function.");
    return <>{children}</>;
  }

  // Validate format (basic checks)
  if (!appId.startsWith('cm') || clientId.length < 20) {
    console.warn(
      "⚠️  Privy credentials appear invalid. App ID should start with 'cm' and Client ID should be longer."
    );
    console.warn("⚠️  App will work without Privy - wallet connection via Thirdweb will still function.");
    return <>{children}</>;
  }

  console.log("✅ Privy credentials found, initializing Privy provider...");

  return (
    <PrivyErrorBoundary fallback={<>{children}</>}>
      <PrivyProvider
        appId={appId}
        clientId={clientId}
        config={{
          loginMethods: ["wallet", "google"],
          appearance: {
            theme: "light",
            walletList: [
              "metamask",
              "coinbase_wallet",
              "zerion",
              "phantom",
              "solflare",
              "universal_profile",
            ],
          },
          embeddedWallets: {
            ethereum: {
              createOnLogin: "users-without-wallets",
            },
          },
        }}
      >
        {children}
      </PrivyProvider>
    </PrivyErrorBoundary>
  );
}
