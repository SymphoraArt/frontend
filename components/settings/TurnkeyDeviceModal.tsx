"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Camera, CameraOff, CheckCircle } from "lucide-react";
import "./settings.css";

interface TurnkeyDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function QRCode() {
  const matrix = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,0,1,1,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0],
    [1,1,0,1,1,0,1,1,0,1,1,0,1,0,1,1,0,1,1],
    [0,1,0,0,1,1,0,1,1,0,0,1,0,1,1,0,1,0,0],
    [1,0,1,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,1],
    [0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,0,1,1,0],
    [1,1,1,1,1,1,1,0,0,0,1,0,1,1,1,0,0,1,0],
    [1,0,0,0,0,0,1,0,1,1,0,1,0,0,0,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,0,0,1,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,0,1,0,1,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,1,0,0,1,0,1],
    [1,0,0,0,0,0,1,0,1,1,0,1,0,0,1,1,0,1,0],
    [1,1,1,1,1,1,1,0,0,0,1,0,1,0,1,0,1,1,1],
  ];

  const cellSize = 6;
  const totalSize = matrix.length * cellSize;

  return (
    <svg width={totalSize} height={totalSize} viewBox={`0 0 ${totalSize} ${totalSize}`} style={{ display: "block" }}>
      {matrix.map((row, y) =>
        row.map((cell, x) =>
          cell === 1 ? (
            <rect key={`${y}-${x}`} x={x * cellSize} y={y * cellSize} width={cellSize} height={cellSize} fill="#111" />
          ) : null
        )
      )}
    </svg>
  );
}

// Camera QR scanner component
function CameraScanner({ onScanned }: { onScanned: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [camState, setCamState] = useState<"idle" | "requesting" | "active" | "denied" | "scanned">("idle");
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    setCamState("requesting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCamState("active");

      // Mock: auto-detect after 4 seconds
      setTimeout(() => {
        setCamState("scanned");
        stream.getTracks().forEach(t => t.stop());
        setTimeout(onScanned, 1200);
      }, 4000);
    } catch {
      setCamState("denied");
    }
  }, [onScanned]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  if (camState === "idle") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <div style={{
          width: "100%",
          aspectRatio: "1",
          background: "#f0ede6",
          border: "2px dashed #d8d4cc",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          color: "#888",
          cursor: "pointer",
        }} onClick={startCamera}>
          <Camera size={32} style={{ color: "#b0a898" }} />
          <span style={{ fontSize: 13, color: "#888" }}>Tap to open camera</span>
        </div>
        <button onClick={startCamera} style={{
          padding: "10px 24px", background: "#111", color: "#fff",
          border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 500,
        }}>
          Open Camera
        </button>
      </div>
    );
  }

  if (camState === "denied") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "20px 0" }}>
        <CameraOff size={28} style={{ color: "#e23b3b" }} />
        <p style={{ fontSize: 13, color: "#666", textAlign: "center", margin: 0 }}>
          Camera access was denied. Please allow camera access in your browser settings, then try again.
        </p>
        <button onClick={startCamera} style={{
          padding: "8px 20px", background: "#111", color: "#fff",
          border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13,
        }}>
          Try Again
        </button>
      </div>
    );
  }

  if (camState === "scanned") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "20px 0" }}>
        <CheckCircle size={32} style={{ color: "#3daa6e" }} />
        <p style={{ fontSize: 14, fontWeight: 500, color: "#111", margin: 0 }}>QR code detected!</p>
        <p style={{ fontSize: 12, color: "#888", margin: 0 }}>Pairing device…</p>
      </div>
    );
  }

  if (camState === "requesting") {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "20px 0" }}>
        <div style={{ width: 28, height: 28, border: "3px solid #e0ddd5", borderTopColor: "#111", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <p style={{ fontSize: 13, color: "#888", margin: 0 }}>Requesting camera…</p>
      </div>
    );
  }

  // Active camera
  return (
    <div style={{ position: "relative", width: "100%", borderRadius: 8, overflow: "hidden", background: "#000" }}>
      <video ref={videoRef} autoPlay muted playsInline style={{ width: "100%", display: "block", aspectRatio: "1", objectFit: "cover" }} />
      {/* Scanning overlay */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {/* Corner brackets */}
        {[
          { top: "20%", left: "20%", borderTop: "2px solid #fff", borderLeft: "2px solid #fff" },
          { top: "20%", right: "20%", borderTop: "2px solid #fff", borderRight: "2px solid #fff" },
          { bottom: "20%", left: "20%", borderBottom: "2px solid #fff", borderLeft: "2px solid #fff" },
          { bottom: "20%", right: "20%", borderBottom: "2px solid #fff", borderRight: "2px solid #fff" },
        ].map((style, i) => (
          <div key={i} style={{ position: "absolute", width: 20, height: 20, ...style }} />
        ))}
        {/* Scanning line animation */}
        <div style={{
          position: "absolute",
          left: "20%", right: "20%",
          height: 2,
          background: "rgba(255,255,255,0.8)",
          boxShadow: "0 0 8px rgba(255,255,255,0.6)",
          animation: "scanLine 2s ease-in-out infinite",
          top: "35%",
        }} />
      </div>
      <p style={{ position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center", fontSize: 12, color: "rgba(255,255,255,0.7)", margin: 0 }}>
        Scanning for QR code…
      </p>
      <style>{`
        @keyframes scanLine {
          0% { top: 22%; }
          50% { top: 72%; }
          100% { top: 22%; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function TurnkeyDeviceModal({ isOpen, onClose }: TurnkeyDeviceModalProps) {
  const [activeTab, setActiveTab] = useState<"scan" | "enter">("scan");
  const [enterMode, setEnterMode] = useState<"type" | "camera">("type");
  const [deviceName, setDeviceName] = useState("");
  const [showName, setShowName] = useState(false);
  const [enterCode, setEnterCode] = useState("");

  const autoGeneratedCode = "FERN · 4TWO · MOSS";

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
          background: "#f5f3ee", borderRadius: "12px", width: "100%", maxWidth: "520px",
          overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.25)",
          fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: "32px 32px 0 32px" }}>
          {/* Tab Toggle */}
          <div style={{ display: "flex", marginBottom: 20, border: "1px solid #d8d4cc", borderRadius: 6, overflow: "hidden", width: "fit-content" }}>
            {(["scan", "enter"] as const).map((tab, i) => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: "6px 16px", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.5px",
                background: activeTab === tab ? "#111" : "transparent",
                color: activeTab === tab ? "#fff" : "#888",
                border: "none", borderLeft: i > 0 ? "1px solid #d8d4cc" : "none",
                cursor: "pointer", transition: "all 0.2s",
              }}>
                {tab === "scan" ? "SCAN / SHOW CODE" : "I HAVE A CODE"}
              </button>
            ))}
          </div>

          <p style={{ fontSize: 11, color: "#a09788", fontFamily: "monospace", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 8px 0" }}>
            ADD A DEVICE
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', 'Merriweather', Georgia, serif", fontSize: 36, fontStyle: "italic", fontWeight: 400, color: "#111", margin: "0 0 12px 0", lineHeight: 1.2 }}>
            {activeTab === "scan" ? "Add another device." : "Enter a pairing code."}
          </h2>
          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6, margin: "0 0 24px 0" }}>
            {activeTab === "scan"
              ? <>Enter this code on your other device in the <strong>"I have a code"</strong> section to register it.</>
              : <>Open enki.art on your other device, go to <strong>Settings → Recovery & 2FA → Add a device</strong>, then enter or scan the code shown.</>}
          </p>
        </div>

        {/* Content Card */}
        <div style={{ margin: "0 32px 20px 32px", background: "#fff", border: "1px solid #e0ddd5", borderRadius: 8, padding: 20 }}>
          {activeTab === "scan" ? (
            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
              <div style={{ border: "1px solid #e0ddd5", borderRadius: 4, padding: 8, background: "#fff", flexShrink: 0 }}>
                <QRCode />
              </div>
              <div>
                <p style={{ fontSize: 10, color: "#a09788", fontFamily: "monospace", letterSpacing: "1.5px", textTransform: "uppercase", margin: "0 0 8px 0" }}>
                  OR PASTE THIS CODE
                </p>
                <p style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 600, color: "#111", letterSpacing: "3px", margin: "0 0 8px 0", whiteSpace: "nowrap" }}>
                  {autoGeneratedCode}
                </p>
                <p style={{ fontSize: 13, color: "#888", margin: 0 }}>Expires in 5 minutes.</p>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Mode toggle: Type vs Camera */}
              <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                {(["type", "camera"] as const).map((m) => (
                  <button key={m} onClick={() => setEnterMode(m)} style={{
                    padding: "5px 14px", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.5px",
                    background: enterMode === m ? "#111" : "#f0ede6",
                    color: enterMode === m ? "#fff" : "#666",
                    border: "1px solid #d8d4cc", borderRadius: 6,
                    cursor: "pointer", transition: "all 0.15s",
                  }}>
                    {m === "type" ? "TYPE CODE" : "📷 SCAN QR"}
                  </button>
                ))}
              </div>

              {enterMode === "type" ? (
                <>
                  <p style={{ fontSize: 10, color: "#a09788", fontFamily: "monospace", letterSpacing: "1.5px", textTransform: "uppercase", margin: 0 }}>
                    PASTE CODE FROM OTHER DEVICE
                  </p>
                  <input
                    type="text"
                    value={enterCode}
                    onChange={(e) => setEnterCode(e.target.value)}
                    placeholder="e.g. FERN · 4TWO · MOSS"
                    style={{
                      width: "100%", padding: "12px 16px", fontFamily: "monospace",
                      fontSize: 18, letterSpacing: "2px", textAlign: "center",
                      border: "1px solid #d8d4cc", borderRadius: 6, background: "#f7f6f1",
                      outline: "none", boxSizing: "border-box",
                    }}
                  />
                </>
              ) : (
                <CameraScanner onScanned={() => {
                  setShowName(true);
                }} />
              )}
            </div>
          )}
        </div>

        {/* Expandable Name Section */}
        <div style={{ margin: "0 32px 24px 32px" }}>
          <button onClick={() => setShowName(!showName)} style={{
            background: "none", border: "none", fontSize: 13, color: "#666",
            cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{ fontSize: 11 }}>{showName ? "▾" : "▸"}</span>
            Pretend you've connected — give it a name
          </button>
          {showName && (
            <input
              type="text"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              placeholder="e.g. MacBook Pro · Work"
              style={{
                marginTop: 10, width: "100%", padding: "10px 14px", fontSize: 13,
                border: "1px solid #d8d4cc", borderRadius: 6, background: "#fff",
                outline: "none", boxSizing: "border-box",
              }}
            />
          )}
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid #e0ddd5", padding: "16px 32px", display: "flex", justifyContent: "flex-end", gap: 12, background: "#f5f3ee" }}>
          <button onClick={onClose} style={{
            padding: "10px 24px", fontSize: 14, background: "transparent",
            border: "1px solid #d8d4cc", borderRadius: 8, cursor: "pointer",
            color: "#111", fontFamily: "var(--font-outfit), 'Outfit', sans-serif",
          }}>
            Cancel
          </button>
          <button onClick={onClose} style={{
            padding: "10px 24px", fontSize: 14, background: "#111", border: "none",
            borderRadius: 8, cursor: "pointer", color: "#fff",
            fontFamily: "var(--font-outfit), 'Outfit', sans-serif", fontWeight: 500,
          }}>
            Done — add it
          </button>
        </div>
      </div>
    </div>
  );
}
