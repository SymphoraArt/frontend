"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "../providers/ThemeProvider";

// The marketing site is the landing page. It lives as a self-contained
// document at /landing.html and is embedded below the app's global header.
// The browse/feed experience now lives at /explore.
//
// The landing reads the active "Color setup" from localStorage on load and
// from the `storage` event; we also postMessage the theme directly so a switch
// in the profile menu re-tints the landing instantly.
export default function HomePage() {
  const { theme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage({ type: "enki-theme", theme }, "*");
  }, [theme]);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}>
      <iframe
        ref={iframeRef}
        src="/landing.html"
        title="Enki Art"
        onLoad={() =>
          iframeRef.current?.contentWindow?.postMessage({ type: "enki-theme", theme }, "*")
        }
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
      />
    </div>
  );
}
