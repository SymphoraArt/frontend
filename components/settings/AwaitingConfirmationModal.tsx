"use client";

import React from "react";
import { Mail, Laptop, Loader2, ArrowRight } from "lucide-react";
import "./settings.css";

interface AwaitingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  device?: string;
}

export default function AwaitingConfirmationModal({ 
  isOpen, 
  onClose,
  email = "eli@enki.studio",
  device = "MacBook Pro"
}: AwaitingConfirmationModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
      }}
    >
      <div
        style={{
          background: "var(--enki-paper)", borderRadius: '4px', width: "100%", maxWidth: "480px",
          overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
          fontFamily: "var(--font-sans)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: "32px 32px 0 32px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: '4px', background: 'var(--enki-paper-2)', border: `1px solid var(--enki-rule)`, marginBottom: 20 }}>
            <Mail size={28} color="var(--enki-ink)" strokeWidth={1.5} />
          </div>
          
          <p style={{ fontSize: 11, color: "var(--enki-ink-3)", fontFamily: "var(--font-mono)", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 10px 0" }}>
            PENDING VERIFICATION
          </p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: 32, fontStyle: "italic", fontWeight: 900, color: "var(--enki-ink)", margin: "0 0 12px 0", lineHeight: 1.2 }}>
            Awaiting confirmation.
          </h2>
          <p style={{ fontSize: 14, color: "var(--enki-ink-3)", lineHeight: 1.6, margin: "0 0 24px 0", maxWidth: 360, marginInline: "auto" }}>
            We sent a secure link to <strong style={{ color: "var(--enki-ink)" }}>{email}</strong>. Click the link to confirm this as your primary recovery email.
          </p>
        </div>

        <div style={{ padding: "0 32px 24px 32px" }}>
          {/* Status Box */}
          <div style={{ background: "var(--enki-paper-2)", border: "1px solid var(--enki-rule)", borderRadius: '4px', padding: 20, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Loader2 size={16} color="var(--enki-ember)" className="spin" style={{ animation: "spin 2s linear infinite" }} />
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "var(--enki-ink)" }}>Waiting for you to click the link…</p>
            </div>
            
            <div style={{ height: 1, background: "var(--enki-rule-2)", margin: "0 -20px 16px -20px" }} />

            <p style={{ fontSize: 10, fontFamily: "var(--font-mono)", letterSpacing: "1px", color: "var(--enki-ink-3)", margin: "0 0 12px 0", textTransform: "uppercase" }}>REQUEST INITIATED FROM</p>
            
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: '4px', background: "var(--enki-paper)" }}>
                <Laptop size={16} color="var(--enki-ink)" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 2px 0", fontSize: 14, fontWeight: 500, color: "var(--enki-ink)" }}>{device}</p>
                <p style={{ margin: 0, fontSize: 12, color: "var(--enki-ink-3)" }}>Active Device &middot; Touch ID</p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#3daa6e", background: "#eaf6ee", padding: "4px 8px", borderRadius: '4px' }}>
                Verified
              </span>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "var(--enki-ink-3)", margin: "0 0 8px 0" }}>
              Didn't receive the email? Check your spam folder.
            </p>
            <button style={{ background: "none", border: "none", color: "var(--enki-ink)", fontSize: 13, fontWeight: 500, textDecoration: "underline", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
              Resend confirmation email
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid var(--enki-rule)", padding: "16px 32px", display: "flex", justifyContent: "center", background: "var(--enki-paper-2)" }}>
          <button onClick={onClose} style={{
            padding: "12px 24px", fontSize: 14, background: "var(--enki-ink)", border: "none",
            borderRadius: '4px', cursor: "pointer", color: "#fff", width: "100%",
            fontFamily: "var(--font-sans)", fontWeight: 600,
          }}>
            I'll do this later
          </button>
        </div>
        
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}
