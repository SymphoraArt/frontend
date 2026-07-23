"use client";

/**
 * Shared full-screen card for standalone link-target pages (/reset-password,
 * /guardian) — the same visual language as the landing login popup and the
 * beta gate: #0E0E12 panel, ember-dot eyebrow, serif headline, DM Sans body.
 */
export default function EnkiCardPage({
  eyebrow = "Enki Art",
  title,
  children,
  maxWidth = 440,
  embed = false,
  onBack,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  maxWidth?: number;
  /** embed=true: no full-screen backdrop/card chrome — for iframing inside the login popup. */
  embed?: boolean;
  /** Renders a ← back arrow next to the eyebrow. */
  onBack?: () => void;
}) {
  const card = (
    <div
      style={
        embed
          ? { width: "100%", color: "#f5f2ec", padding: "4px 2px" }
          : {
              width: "100%", maxWidth, background: "#0E0E12",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20,
              padding: "36px 32px", color: "#f5f2ec",
              boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
            }
      }
    >
      {/* Embedded in the login popup the modal provides its own context — no
          eyebrow; just the back arrow when there's somewhere to go back to. */}
      {(!embed || onBack) && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          {onBack && (
            <button
              onClick={onBack}
              aria-label="Back"
              style={{
                background: "none", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 8,
                color: "rgba(245,242,236,0.8)", cursor: "pointer", padding: "3px 9px",
                fontSize: 14, lineHeight: 1, marginRight: 4,
              }}
            >
              ←
            </button>
          )}
          {!embed && (
            <>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "linear-gradient(135deg,#d9863f,#e8a83a)" }} />
              <span style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,242,236,0.55)" }}>
                {eyebrow}
              </span>
            </>
          )}
        </div>
      )}
      <h1 style={{ fontFamily: "var(--font-instrument-serif), Georgia, serif", fontStyle: "italic", fontWeight: 400, fontSize: 30, lineHeight: 1.15, margin: "0 0 12px", color: "#f5f2ec" }}>
        {title}
      </h1>
      {children}
    </div>
  );

  if (embed) {
    // Painted OPAQUE in the login popup's exact panel color (#0E0E12 — the
    // modal is always dark, in every color scheme). Deliberately NOT
    // transparent/theme-driven: the app's ThemeProvider re-applies the page
    // theme after mount, which flashed a white page for light-theme users.
    return (
      <div
        style={{
          fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
          background: "#0E0E12",
          minHeight: "100vh",
        }}
      >
        {card}
      </div>
    );
  }
  return (
    <div
      style={{
        position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        background: "#08080B",
        fontFamily: "var(--font-dm-sans), 'DM Sans', system-ui, sans-serif",
        padding: 20,
      }}
    >
      {card}
    </div>
  );
}

/** Input styled to match the card (dark field, ember focus ring via border). */
export function EnkiCardInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        width: "100%", padding: "13px 16px", borderRadius: 12,
        border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)",
        color: "#f5f2ec", fontSize: 14, outline: "none",
        ...props.style,
      }}
    />
  );
}

/** Primary (ember gradient) button matching the login popup. */
export function EnkiCardButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      style={{
        width: "100%", padding: "13px 16px", borderRadius: 12, border: "none",
        background: props.disabled ? "rgba(255,255,255,0.08)" : "linear-gradient(135deg,#d9863f,#e8a83a)",
        color: props.disabled ? "rgba(245,242,236,0.4)" : "#181209",
        fontSize: 14, fontWeight: 700, cursor: props.disabled ? "not-allowed" : "pointer",
        ...props.style,
      }}
    >
      {children}
    </button>
  );
}
