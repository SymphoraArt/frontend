"use client";

/**
 * Full-screen gate shown on /home when nobody is signed in — same visual
 * language as the landing page / wallet picker (#0E0E12 panel, ember
 * gradient, DM Sans). "Request access" opens a prefilled email; "OK" returns
 * to the landing page.
 */
import { useRouter } from "next/navigation";

const REQUEST_EMAIL = process.env.NEXT_PUBLIC_ACCESS_REQUEST_EMAIL || "kirikev4d@gmail.com";

export default function AccessGate() {
  const router = useRouter();

  const requestAccess = () => {
    const subject = encodeURIComponent("Enki Art — access request");
    const body = encodeURIComponent(
      "Hi! I'd like access to the Enki Art private beta.\n\nMy email: \nMy Solana wallet (optional): \n"
    );
    window.location.href = `mailto:${REQUEST_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1500,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(8, 8, 11, 0.86)", backdropFilter: "blur(10px)",
        fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%", maxWidth: 420, background: "#0E0E12",
          border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20,
          padding: "36px 32px", color: "#f5f2ec", textAlign: "center",
          boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 18 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(135deg,#d9863f,#e8a83a)" }} />
          <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,242,236,0.55)" }}>
            Enki Art · Private beta
          </span>
        </div>
        <h1 style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: 30, lineHeight: 1.15, margin: "0 0 12px", color: "#f5f2ec" }}>
          You&apos;re not in yet.
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(245,242,236,0.72)", margin: "0 0 26px" }}>
          Enki Art is in closed beta. Only beta testers can enter right now —
          sign in with a beta account, or ask us for access and we&apos;ll get back to you.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={requestAccess}
            style={{
              width: "100%", padding: "13px 16px", borderRadius: 12, border: "none",
              background: "linear-gradient(135deg,#d9863f,#e8a83a)", color: "#181209",
              fontSize: 14, fontWeight: 700, cursor: "pointer",
            }}
          >
            Request access
          </button>
          <button
            onClick={() => router.push("/")}
            style={{
              width: "100%", padding: "13px 16px", borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.14)", background: "transparent",
              color: "rgba(245,242,236,0.85)", fontSize: 14, fontWeight: 600, cursor: "pointer",
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
