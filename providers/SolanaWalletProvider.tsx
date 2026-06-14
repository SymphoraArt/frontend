"use client";

import { useMemo } from "react";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

const SOLANA_DEVNET_RPC = "https://api.devnet.solana.com";

export function SolanaWalletProvider({ children }: { children: React.ReactNode }) {
  // Wallet Standard 자동감지로 Phantom / Solflare / Backpack / Glow 등이 등록된다.
  // Solflare도 Wallet Standard로 정상 등록되며 (콘솔 로그로 확인), 레거시 어댑터를 추가하면
  // wallet-adapter가 "Solflare can be removed from your app" 경고를 띄울 뿐 무의미하므로 빈 배열로 둔다.
  const wallets = useMemo(() => [], []);
  const walletStorageKey = "symphoraSolanaWalletName";

  return (
    <ConnectionProvider endpoint={SOLANA_DEVNET_RPC}>
      <WalletProvider
        wallets={wallets}
        // autoConnect를 끈다. select() 직후 adapter.connect()가 두 번 호출되면
        // Solflare 같은 일부 Standard wallet에서 "Connection rejected" 에러로 이어지기 때문.
        // 모달이 명시적으로 connect()를 호출한다.
        autoConnect={false}
        localStorageKey={walletStorageKey}
        onError={(error) => {
          const msg = (error.message ?? "").toLowerCase();
          if (msg.includes("rejected") || msg.includes("closed") || msg.includes("user reject")) return;
          // SIWS (signIn) isn't supported by every wallet (e.g. Zerion). The wallet
          // picker already falls back to signMessage, so this adapter-emitted
          // "signIn: Not Implemented" event is expected — don't surface it as an error.
          if (error.name === "WalletSignInError" || msg.includes("not implemented")) return;
          console.error("[Solana Wallet]", error);
        }}
      >
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
