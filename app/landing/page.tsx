"use client";

// The marketing site lives as a self-contained document at /landing.html.
// We embed it below the app's global header (from the root layout) so it
// uses the app header instead of its own nav.
export default function LandingPage() {
  return (
    <div style={{ position: "fixed", top: 64, left: 0, right: 0, bottom: 0 }}>
      <iframe
        src="/landing.html"
        title="Enki Art"
        style={{ width: "100%", height: "100%", border: "none", display: "block" }}
      />
    </div>
  );
}
