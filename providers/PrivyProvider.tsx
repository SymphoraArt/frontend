"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import React from "react";

class PrivyErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Privy provider failed to initialize:", error);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
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

  if (!appId || !clientId) {
    console.warn(
      "⚠️  Privy is disabled: NEXT_PUBLIC_PRIVY_APP_ID and/or NEXT_PUBLIC_PRIVY_CLIENT_ID is not set."
    );
    return <>{children}</>;
  }

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
