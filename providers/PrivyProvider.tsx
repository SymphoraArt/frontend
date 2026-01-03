"use client";

import { PrivyProvider } from "@privy-io/react-auth";

export default function PrivyWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID || "";
  const clientId = process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID || "";

  return (
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
  );
}
