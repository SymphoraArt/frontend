"use client";

import { useEffect, useState } from "react";
import { WalletPickerModal } from "@/components/WalletPickerModal";

/**
 * THE login popup — pluggable anywhere (Kev, 2026-08-24: "come up with a
 * composable way how we can plug and play that UI login form").
 *
 * It does not rebuild the auth form. It mounts the landing's own modal in a
 * transparent iframe (/landing.html?modal=1 renders nothing but the modal),
 * so email/password, Request access, the tabs and every future change to
 * that form appear here automatically — one login UI, zero drift. The
 * page's "Continue with Wallet" already postMessages enki-open-wallet; here
 * that opens the wallet picker in the same overlay. Backdrop close inside
 * the iframe posts enki-login-close.
 */
export default function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [walletOpen, setWalletOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onMessage = (e: MessageEvent) => {
      const t = (e.data as { type?: string } | null)?.type;
      if (t === "enki-login-close") onClose();
      if (t === "enki-open-wallet") setWalletOpen(true);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <iframe
        src="/landing.html?modal=1"
        title="Log in"
        style={{
          position: "fixed", inset: 0, width: "100%", height: "100%",
          border: "none", zIndex: 2000, background: "transparent",
          // Hidden while the wallet picker is on top — two stacked modals
          // reading each other's scrims is noise.
          visibility: walletOpen ? "hidden" : "visible",
        }}
        allowTransparency
      />
      <WalletPickerModal open={walletOpen} onClose={() => { setWalletOpen(false); onClose(); }} />
    </>
  );
}
