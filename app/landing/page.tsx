"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../providers/ThemeProvider";
import { WalletPickerModal } from "@/components/WalletPickerModal";

// The marketing site lives as a self-contained document at /landing.html.
// We embed it below the app's global header and forward the active "Color
// setup" theme so the landing re-tints to match (teal / dark / purple).
export default function LandingPage() {
  const { theme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showWalletPicker, setShowWalletPicker] = useState(false);

  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage({ type: "enki-theme", theme }, "*");
  }, [theme]);

  // The landing iframe owns all scrolling. Without this, the app shell's
  // `scrollbar-gutter: stable` (globals.css) reserves a permanent dark
  // gutter next to the iframe's own scrollbar — a dead dark column on the
  // right edge. Neutralise both while the landing is mounted.
  useEffect(() => {
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    const prevGutter = html.style.scrollbarGutter;
    html.style.overflow = "hidden";
    html.style.scrollbarGutter = "auto";
    return () => {
      html.style.overflow = prevOverflow;
      html.style.scrollbarGutter = prevGutter;
    };
  }, []);

  // The landing (inside the iframe) hands off "Connect wallet" to the app
  // shell's Turnkey wallet UI instead of navigating away, so the user stays put.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.source !== iframeRef.current?.contentWindow) return;
      if ((e.data as { type?: string })?.type === "enki-open-wallet") {
        setShowWalletPicker(true);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div style={{ position: "fixed", top: 64, left: 0, right: 0, bottom: 0 }}>
      <iframe
        ref={iframeRef}
        src="/landing.html"
        title="Enki Art"
        onLoad={() =>
          iframeRef.current?.contentWindow?.postMessage({ type: "enki-theme", theme }, "*")
        }
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
      />
      <WalletPickerModal open={showWalletPicker} onClose={() => setShowWalletPicker(false)} />
    </div>
  );
}
