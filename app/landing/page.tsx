"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "../../providers/ThemeProvider";

// The marketing site lives as a self-contained document at /landing.html.
// We embed it below the app's global header and forward the active "Color
// setup" theme so the landing re-tints to match (teal / dark / purple).
export default function LandingPage() {
  const { theme } = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage({ type: "enki-theme", theme }, "*");
  }, [theme]);

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
    </div>
  );
}
