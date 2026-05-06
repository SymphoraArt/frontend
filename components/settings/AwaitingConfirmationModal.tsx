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
          background: "#f5f3ee", borderRadius: "12px", width: "100%", maxWidth: "480px",
          overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
          fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: "32px 32px 0 32px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: '50%', background: '#fff', border: `1px solid #e8e5de`, marginBottom: 20 }}>
            <Mail size={28} color="#111" strokeWidth={1.5} />
          </div>
          
          <p style={{ fontSize: 11, color: "#a09788", fontFamily: "monospace", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 10px 0" }}>
            PENDING VERIFICATION
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', 'Merriweather', Georgia, serif", fontSize: 32, fontStyle: "italic", fontWeight: 900, color: "#111", margin: "0 0 12px 0", lineHeight: 1.2 }}>
            Awaiting confirmation.
          </h2>
          <p style={{ fontSize: 14, color: "#a09788", lineHeight: 1.6, margin: "0 0 24px 0", maxWidth: 360, marginInline: "auto" }}>
            We sent a secure link to <strong style={{ color: "#111" }}>{email}</strong>. Click the link to confirm this as your primary recovery email.
          </p>
        </div>

        <div style={{ padding: "0 32px 24px 32px" }}>
          {/* Status Box */}
          <div style={{ background: "#fff", border: "1px solid #e8e5de", borderRadius: 10, padding: 20, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <Loader2 size={16} color="#7a5c10" className="spin" style={{ animation: "spin 2s linear infinite" }} />
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#7a5c10" }}>Waiting for you to click the link…</p>
            </div>
            
            <div style={{ height: 1, background: "#f0ede6", margin: "0 -20px 16px -20px" }} />

            <p style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "1px", color: "#b0a898", margin: "0 0 12px 0", textTransform: "uppercase" }}>REQUEST INITIATED FROM</p>
            
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "50%", background: "#f5f3ee" }}>
                <Laptop size={16} color="#111" />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: "0 0 2px 0", fontSize: 14, fontWeight: 500, color: "#111" }}>{device}</p>
                <p style={{ margin: 0, fontSize: 12, color: "#888" }}>Active Device &middot; Touch ID</p>
              </div>
              <span style={{ fontSize: 11, fontWeight: 600, color: "#3daa6e", background: "#eaf6ee", padding: "4px 8px", borderRadius: 20 }}>
                Verified
              </span>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "#a09788", margin: "0 0 8px 0" }}>
              Didn't receive the email? Check your spam folder.
            </p>
            <button style={{ background: "none", border: "none", color: "#111", fontSize: 13, fontWeight: 500, textDecoration: "underline", cursor: "pointer", fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}>
              Resend confirmation email
            </button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid #e8e5de", padding: "16px 32px", display: "flex", justifyContent: "center", background: "#fbfaf8" }}>
          <button onClick={onClose} style={{
            padding: "12px 24px", fontSize: 14, background: "#111", border: "none",
            borderRadius: 8, cursor: "pointer", color: "#fff", width: "100%",
            fontFamily: "var(--font-outfit), 'Outfit', sans-serif", fontWeight: 600,
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
