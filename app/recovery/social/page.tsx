"use client";
import { useState, useEffect, useRef } from "react";
import { Shield, Key, AlertCircle, Clock, Users, Mail, Link, User } from "lucide-react";

const FONT = "'Outfit', sans-serif";
const SERIF = "'Playfair Display', Georgia, serif";
const CREAM = "#f5f3ee";
const CREAM_CARD = "#faf9f7";
const BORDER = "#e8e5de";

type Step = "identify" | "pow" | "proof" | "window" | "approved" | "lost-guardians";

// Mock PoW
function runPoW(seed: string, onProg: (n: number) => void): Promise<void> {
  return new Promise(resolve => {
    let n = 0;
    const tick = () => {
      const end = n + 4000;
      while (n < end) { if ((n * 1337 + seed.charCodeAt(0)) % 10000 === 0) { resolve(); return; } n++; }
      onProg(Math.min(94, n / 400000 * 100));
      setTimeout(tick, 0);
    };
    tick();
  });
}

function useCountdown(secs: number) {
  const [left, setLeft] = useState(secs);
  useEffect(() => { const id = setInterval(() => setLeft(p => Math.max(0, p - 1)), 1000); return () => clearInterval(id); }, []);
  const h = Math.floor(left / 3600), m = Math.floor((left % 3600) / 60), s = left % 60;
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}

function Label({ c }: { c: string }) {
  return <p style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "2px", color: "#a09788", margin: "0 0 10px", textTransform: "uppercase" as const }}>{c}</p>;
}
function H({ c }: { c: string }) {
  return <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 24, color: "#111", margin: "0 0 6px" }}>{c}</h2>;
}
function Sub({ c }: { c: string }) {
  return <p style={{ fontSize: 13, color: "#a09788", margin: "0 0 20px", lineHeight: 1.65 }}>{c}</p>;
}
function PBtn({ label, onClick, disabled }: { label: string; onClick?: () => void; disabled?: boolean }) {
  return <button onClick={onClick} disabled={disabled} style={{ width: "100%", padding: "13px", background: disabled ? "#e8e5de" : "#111", color: disabled ? "#b0a898" : "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, fontFamily: FONT, cursor: disabled ? "default" : "pointer", transition: "all 0.2s" }}>{label}</button>;
}

// Mock guardians for the window step
const MOCK_GUARDIANS = [
  { id: "g1", name: "@lune_lab",  type: "handle",  approved: true },
  { id: "g2", name: "0xA1B2…C3D4", type: "wallet", approved: false },
  { id: "g3", name: "friend@email.com", type: "email", approved: true },
  { id: "g4", name: "@drift_wood", type: "handle",  approved: false },
  { id: "g5", name: "0xF5E6…D7C8", type: "wallet", approved: false },
];

export default function SocialRecoveryPage() {
  const [step, setStep] = useState<Step>("identify");
  const [identifier, setIdentifier] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [powProg, setPowProg] = useState(0);
  const [powDone, setPowDone] = useState(false);
  const powStarted = useRef(false);
  const [proving, setProving] = useState(false);
  const [guardians, setGuardians] = useState(MOCK_GUARDIANS);
  const countdown = useCountdown(48 * 3600);
  const approvedCount = guardians.filter(g => g.approved).length;
  const threshold = 3;

  // Start PoW when step = pow
  useEffect(() => {
    if (step === "pow" && !powStarted.current) {
      powStarted.current = true;
      runPoW(identifier, setPowProg).then(() => { setPowProg(100); setPowDone(true); });
    }
  }, [step]);

  // Simulate guardian approvals ticking in
  useEffect(() => {
    if (step !== "window") return;
    const timers = [
      setTimeout(() => setGuardians(g => g.map((x, i) => i === 1 ? { ...x, approved: true } : x)), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [step]);

  return (
    <div style={{ minHeight: "100vh", background: CREAM, fontFamily: FONT }}>
      <header style={{ padding: "18px 40px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(245,243,238,0.96)", backdropFilter: "blur(8px)", zIndex: 10 }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 700, fontSize: 17, color: "#111" }}>Enki Art</span>
          <span style={{ color: "#d94f3d" }}>·</span>
        </a>
        <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "2px", color: "#a09788" }}>LAYER 2 · SOCIAL RECOVERY</span>
        <a href="/recovery" style={{ fontSize: 12, color: "#a09788", textDecoration: "none" }}>← Recovery options</a>
      </header>

      <div style={{ display: "flex", justifyContent: "center", padding: "52px 24px 80px" }}>
        <div style={{ width: "100%", maxWidth: 540 }}>

          {/* ── Step 1: Identify ── */}
          {step === "identify" && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: '50%', background: '#fff', border: `1px solid ${BORDER}`, marginBottom: 14 }}>
                  <Shield size={28} strokeWidth={1.5} color="#111" />
                </div>
                <Label c="Layer 2 · Social Recovery" />
                <h1 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 32, fontWeight: 900, color: "#111", margin: "0 0 10px" }}>Guardian-based recovery.</h1>
                <p style={{ fontSize: 13, color: "#a09788", lineHeight: 1.65, maxWidth: 400, marginInline: "auto" }}>
                  Your guardians will receive approval requests. Access is granted only after 48 hours and the required number of guardian approvals.
                </p>
              </div>

              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "18px 22px", marginBottom: 20 }}>
                <p style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "1.5px", color: "#b0a898", margin: "0 0 14px" }}>HOW IT WORKS</p>
                {[
                  { n: "01", t: "You submit a secure verification", b: "Prove you know the passcode + guardian set that matches your stored commitment. Nothing is revealed." },
                  { n: "02", t: "48-hour timelock starts", b: "All channels associated with your account receive a cancellation link immediately." },
                  { n: "03", t: "Guardians approve", b: "Each guardian is contacted via every channel they registered. They click approve." },
                  { n: "04", t: "Access restored", b: "After 48h + required approvals + no cancel signal. New keypair issued via Turnkey." },
                ].map(s => (
                  <div key={s.n} style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                    <span style={{ fontFamily: "monospace", fontSize: 11, color: "#c0b9ae", minWidth: 20, flexShrink: 0 }}>{s.n}</span>
                    <div>
                      <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: "#111" }}>{s.t}</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#a09788", lineHeight: 1.5 }}>{s.b}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#4a4540", display: "block", marginBottom: 5 }}>Email or wallet address (routing only — not authentication)</label>
                <input value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="you@email.com or 0x…"
                  style={{ width: "100%", padding: "10px 13px", border: `1.5px solid ${BORDER}`, borderRadius: 8, fontSize: 13, fontFamily: FONT, background: "#fff", outline: "none", boxSizing: "border-box" as const }} />
              </div>

              <PBtn label="Continue →" disabled={!identifier.trim()} onClick={() => setStep("pow")} />
              <p style={{ textAlign: "center", fontSize: 11, color: "#c0b9ae", marginTop: 12 }}>Lost your guardians too? <button onClick={() => setStep("lost-guardians")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 11, color: "#a09788", textDecoration: "underline", fontFamily: FONT, padding: 0 }}>Manual review instead</button></p>
            </div>
          )}

          {/* ── Step 2: PoW ── */}
          {step === "pow" && (
            <div>
              <Label c="Anti-brute-force · Proof of Work" />
              <H c="Solving challenge…" />
              <Sub c="Your browser solves a computational puzzle before any proof is accepted. Caps brute-force attempts to ~100/sec globally." />
              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "20px 22px", marginBottom: 20 }}>
                <div style={{ height: 6, background: BORDER, borderRadius: 3, overflow: "hidden", marginBottom: 10 }}>
                  <div style={{ height: "100%", width: `${powProg}%`, background: "#111", borderRadius: 3, transition: "width 0.3s" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 11, color: "#a09788" }}>{powDone ? "Challenge complete ✓" : "Working…"}</span>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: "#a09788" }}>{Math.round(powProg)}%</span>
                </div>
              </div>
              <div style={{ background: "#fef9eb", border: "1px solid #f5e6c0", borderRadius: 8, padding: "10px 14px", marginBottom: 18, fontSize: 11, color: "#7a5c10", lineHeight: 1.6 }}>
                <strong>5 attempts per 24h</strong> per identifier. Failures log an attempt and notify guardians. Commitment existence is never publicly enumerable.
              </div>
              <PBtn label={powDone ? "Continue to proof →" : "Solving…"} disabled={!powDone} onClick={() => setStep("proof")} />
            </div>
          )}

          {/* ── Step 3: Secure Verification ── */}
          {step === "proof" && (
            <div>
              <Label c="Step 3 · Secure Verification" />
              <H c="Enter your Guardian Passcode." />
              <Sub c="The high-entropy passcode you wrote down separately from your 24-word mnemonic. This securely verifies that you know the guardian set and passcode behind your stored commitment." />

              <div style={{ background: "#111", borderRadius: 12, padding: "18px 20px", marginBottom: 18 }}>
                <p style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "1.5px", color: "#555", margin: "0 0 10px" }}>GUARDIAN PASSCODE</p>
                <input
                  type="password"
                  value={passphrase}
                  onChange={e => setPassphrase(e.target.value)}
                  placeholder="Enter your Guardian Passcode…"
                  style={{ width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 6, padding: "10px 13px", fontSize: 14, fontFamily: "monospace", color: "#f5f3ee", outline: "none", boxSizing: "border-box" as const }}
                />
              </div>

              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "12px 16px", marginBottom: 18 }}>
                <p style={{ fontSize: 11, color: "#a09788", margin: 0, lineHeight: 1.6 }}>
                  The proof is verified against your on-chain commitment hash. Your passcode and guardian list are never stored by the platform — we can only confirm the proof passes or fails.
                </p>
              </div>

              <PBtn
                label={proving ? "Generating proof…" : "Submit secure verification →"}
                disabled={!passphrase.trim() || proving}
                onClick={() => { setProving(true); setTimeout(() => { setProving(false); setStep("window"); }, 1800); }}
              />
            </div>
          )}

          {/* ── Step 4: 48h Window ── */}
          {step === "window" && (
            <div>
              <Label c="Recovery in progress · 48-hour timelock" />
              <H c="Proof accepted. Waiting for guardians." />
              <Sub c="Access is not granted yet. All channels have been notified. Guardians must approve within 48 hours. You or any guardian can cancel instantly." />

              {/* Countdown */}
              <div style={{ background: "#111", borderRadius: 10, padding: "18px 22px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "1.5px", color: "#555", margin: "0 0 4px" }}>ACCESS GRANTED IN</p>
                  <p style={{ fontFamily: "monospace", fontSize: 28, fontWeight: 700, color: "#f5c542", margin: 0, letterSpacing: "2px" }}>{countdown}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 11, color: "#555", margin: "0 0 2px" }}>Approvals</p>
                  <p style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 700, color: approvedCount >= threshold ? "#9ecfac" : "#f5c542", margin: 0 }}>{approvedCount} / {threshold}</p>
                </div>
              </div>

              {/* Guardian status */}
              <p style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "1px", color: "#b0a898", margin: "0 0 10px" }}>GUARDIAN STATUS</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {guardians.map(g => (
                  <div key={g.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: g.approved ? "#eaf6ee" : "#fff", border: `1px solid ${g.approved ? "#9ecfac" : BORDER}`, borderRadius: 8, transition: "all 0.4s" }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: '50%', background: '#f5f3ee', color: '#666' }}>
                      {g.type === "handle" ? <User size={12} /> : g.type === "wallet" ? <Link size={12} /> : <Mail size={12} />}
                    </span>
                    <p style={{ flex: 1, margin: 0, fontSize: 13, fontFamily: g.type === "wallet" ? "monospace" : FONT, color: "#111" }}>{g.name}</p>
                    {g.approved
                      ? <span style={{ fontSize: 11, fontWeight: 700, color: "#276738" }}>✓ Approved</span>
                      : <span style={{ fontSize: 11, color: "#b0a898" }}>Pending…</span>
                    }
                  </div>
                ))}
              </div>

              {/* Notifications */}
              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 10, padding: "14px 18px", marginBottom: 18 }}>
                <p style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "1px", color: "#b0a898", margin: "0 0 10px" }}>NOTIFICATIONS SENT</p>
                {[
                  "📧 All emails ever linked to this account",
                  "⛓ On-chain event · Base mainnet",
                  "📱 Push to all logged-in devices",
                  "🔗 Cancellation link to each guardian",
                ].map(n => <p key={n} style={{ fontSize: 12, color: "#4a4540", margin: "0 0 6px" }}>{n}</p>)}
              </div>

              {approvedCount >= threshold && (
                <div style={{ background: "#eaf6ee", border: "1px solid #9ecfac", borderRadius: 10, padding: "14px 18px", marginBottom: 18 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "#276738", margin: "0 0 4px" }}>✓ Threshold reached</p>
                  <p style={{ fontSize: 12, color: "#376b3a", margin: 0 }}>Required approvals received. Access will execute when the 48-hour window closes.</p>
                </div>
              )}

              <button onClick={() => {}} style={{ width: "100%", padding: "12px", background: "#fdecea", border: "1px solid #e8b4ae", borderRadius: 8, fontSize: 14, fontWeight: 600, fontFamily: FONT, cursor: "pointer", color: "#b03020" }}>
                🚫 Cancel this recovery attempt
              </button>
              <p style={{ fontSize: 11, color: "#c0b9ae", textAlign: "center", marginTop: 10 }}>If you didn't start this, cancel immediately and rotate your commitment in Settings.</p>

              <div style={{ marginTop: 32, paddingTop: 24, borderTop: `1px solid ${BORDER}`, textAlign: "center" }}>
                <p style={{ fontSize: 12, color: "#6b5f55", margin: "0 0 10px" }}>Guardians unresponsive or lost their accounts?</p>
                <button onClick={() => setStep("lost-guardians")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#111", fontWeight: 600, textDecoration: "underline", fontFamily: FONT, padding: 0 }}>
                  Escalate to manual review →
                </button>
              </div>
            </div>
          )}

          {/* ── Lost guardians → manual review ── */}
          {step === "lost-guardians" && (
            <div>
              <button onClick={() => setStep("identify")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#a09788", fontFamily: FONT, padding: 0, marginBottom: 24 }}>← Back</button>
              <Label c="Escalation · Manual Review" />
              <H c="Lost your guardians too?" />
              <Sub c="If you can't reach your guardians, we'll escalate this to manual review. A team member will handle it — and this triggers an automatic report to our security team." />

              <div style={{ background: "#fef9eb", border: "1px solid #f5e6c0", borderRadius: 10, padding: "14px 18px", marginBottom: 22, display: "flex", gap: 10 }}>
                <span style={{ flexShrink: 0 }}>⚠️</span>
                <p style={{ fontSize: 12, color: "#7a5c10", margin: 0, lineHeight: 1.6 }}>
                  Submitting this generates an automatic security report visible to the Enki Art admin team. This is expected — we use it to monitor for unusual recovery patterns.
                </p>
              </div>

              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px 22px", marginBottom: 18 }}>
                <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "1px", color: "#b0a898", margin: "0 0 14px" }}>WHAT YOU'LL NEED</p>
                {["Your Enki Art handle or original email", "Any wallet address you ever connected", "Names of prompts or content you own", "Approximate dates of account activity", "A contact email the team can reach you at"].map(e => (
                  <p key={e} style={{ fontSize: 12, color: "#4a4540", margin: "0 0 7px" }}>· {e}</p>
                ))}
              </div>

              <a href="/recovery?tab=manual" style={{ display: "block", textAlign: "center" as const, padding: "13px", background: "#111", color: "#fff", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, fontFamily: FONT }}>
                Submit manual recovery request →
              </a>
              <p style={{ textAlign: "center", fontSize: 11, color: "#c0b9ae", marginTop: 12 }}>Reviewed within 2–5 business days · A security report is auto-filed</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
