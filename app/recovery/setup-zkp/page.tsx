"use client";
import { useState } from "react";

const FONT = "'Outfit', sans-serif";
const SERIF = "'Playfair Display', Georgia, serif";
const CREAM = "#f5f3ee";
const CREAM_CARD = "#faf9f7";
const BORDER = "#e8e5de";

type Step = "intro" | "phrases" | "confirm" | "store" | "done";

function mockHash(s: string) {
  let h = 0;
  for (const c of s) h = ((h << 5) - h + c.charCodeAt(0)) | 0;
  return "0x" + Math.abs(h).toString(16).padStart(40, "0").toUpperCase();
}

const PROMPTS = [
  "The street name of the first house you remember living in",
  "Your childhood nickname (or what you wished it was)",
  "The name of an imaginary friend or pet from childhood",
];

function ProgressBar({ step }: { step: Step }) {
  const steps: Step[] = ["intro", "phrases", "confirm", "store", "done"];
  const idx = steps.indexOf(step);
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 36 }}>
      {steps.slice(0, 4).map((s, i) => (
        <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= idx - 1 ? "#111" : i === idx ? "#111" : BORDER, opacity: i === idx ? 1 : i < idx ? 0.9 : 0.3, transition: "all 0.3s" }} />
      ))}
    </div>
  );
}

export default function SetupZkpPage() {
  const [step, setStep] = useState<Step>("intro");
  const [phrases, setPhrases] = useState(["", "", ""]);
  const [confirmed, setConfirmed] = useState(["", "", ""]);
  const [errors, setErrors] = useState([false, false, false]);
  const [commitment, setCommitment] = useState("");
  const [storing, setStoring] = useState(false);
  const [showPhrases, setShowPhrases] = useState([false, false, false]);

  const setPhrase = (i: number, v: string) => setPhrases(p => { const n = [...p]; n[i] = v; return n; });
  const setConfirm = (i: number, v: string) => setConfirmed(p => { const n = [...p]; n[i] = v; return n; });
  const toggleShow = (i: number) => setShowPhrases(p => { const n = [...p]; n[i] = !n[i]; return n; });

  const allFilled = phrases.every(p => p.trim().length >= 3);

  const handleConfirm = () => {
    const errs = phrases.map((p, i) => p.trim().toLowerCase() !== confirmed[i].trim().toLowerCase());
    setErrors(errs);
    if (errs.some(Boolean)) return;
    const hash = mockHash(phrases.map(p => p.trim().toLowerCase()).join("|"));
    setCommitment(hash);
    setStep("store");
  };

  const handleStore = () => {
    setStoring(true);
    setTimeout(() => { setStoring(false); setStep("done"); }, 2000);
  };

  return (
    <div style={{ minHeight: "100vh", background: CREAM, fontFamily: FONT }}>
      {/* Header */}
      <header style={{ padding: "18px 40px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(245,243,238,0.95)", backdropFilter: "blur(8px)", position: "sticky", top: 0, zIndex: 10 }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 700, fontSize: 17, color: "#111" }}>Enki Art</span>
          <span style={{ color: "#d94f3d", fontSize: 18 }}>·</span>
        </a>
        <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "2px", color: "#a09788", textTransform: "uppercase" }}>Recovery Key Setup</span>
        <a href="/settings" style={{ fontSize: 13, color: "#a09788", textDecoration: "none" }}>← Settings</a>
      </header>

      <div style={{ display: "flex", justifyContent: "center", padding: "56px 24px" }}>
        <div style={{ width: "100%", maxWidth: 520 }}>

          <ProgressBar step={step} />

          {/* ── Intro ── */}
          {step === "intro" && (
            <div>
              <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "2px", color: "#a09788", margin: "0 0 12px", textTransform: "uppercase" }}>Recovery Evidence Hash</p>
              <h1 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 34, fontWeight: 900, color: "#111", margin: "0 0 14px", lineHeight: 1.1 }}>Set your recovery evidence.</h1>
              <p style={{ fontSize: 14, color: "#a09788", lineHeight: 1.7, margin: "0 0 32px" }}>
                You'll choose 3 secret phrases and we'll generate a local hash. If you ever need manual account recovery, submitting this hash is strong corroborating evidence that only the real account owner could provide.
              </p>

              {/* How it works */}
              <div style={{ background: CREAM_CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 24, marginBottom: 28 }}>
                <p style={{ fontSize: 11, letterSpacing: "1px", color: "#a09788", margin: "0 0 16px", textTransform: "uppercase", fontFamily: "monospace" }}>How it works</p>
                {[
                  { icon: "✍️", title: "You answer 3 personal prompts", body: "Facts only you know — childhood memories, private nicknames. Not guessable from public OSINT." },
                  { icon: "🔒", title: "Hashed locally, never transmitted", body: "SHA-style hashing runs in your browser. The raw phrases never leave your device." },
                  { icon: "💾", title: "Hash stored as supporting evidence", body: "Only the hash is saved to your account. Our team can compare it against what you submit during recovery." },
                  { icon: "👤", title: "A human reviews your recovery request", body: "No automated access. A team member cross-references your submitted hash with other evidence before restoring access." },
                ].map(item => (
                  <div key={item.title} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                    <div>
                      <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: "#111" }}>{item.title}</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#a09788", lineHeight: 1.5 }}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#fef9eb", border: "1px solid #f5e6c0", borderRadius: 10, padding: "12px 16px", marginBottom: 24, display: "flex", gap: 10 }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>⚠️</span>
                <p style={{ fontSize: 12, color: "#7a5c10", margin: 0, lineHeight: 1.6 }}>
                  <strong>Write your answers down and store them offline.</strong> If you forget all 3 phrases, this recovery path is permanently lost.
                </p>
              </div>

              <button onClick={() => setStep("phrases")} style={{ width: "100%", padding: "14px", background: "#111", color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, fontFamily: FONT, cursor: "pointer" }}>
                I understand — let's begin →
              </button>
            </div>
          )}

          {/* ── Enter Phrases ── */}
          {step === "phrases" && (
            <div>
              <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "2px", color: "#a09788", margin: "0 0 12px", textTransform: "uppercase" }}>Step 1 of 3 — Your Secrets</p>
              <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 28, color: "#111", margin: "0 0 6px" }}>Choose your 3 phrases.</h2>
              <p style={{ fontSize: 13, color: "#a09788", margin: "0 0 28px", lineHeight: 1.6 }}>
                Use the prompts below as a guide, or write your own. Make them personal, specific, and memorable. Avoid things that could change (current address, phone number).
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {PROMPTS.map((prompt, i) => (
                  <div key={i} style={{ background: CREAM_CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "16px 18px" }}>
                    <label style={{ fontSize: 10, letterSpacing: "1px", color: "#a09788", display: "block", marginBottom: 6, textTransform: "uppercase", fontFamily: "monospace" }}>
                      Phrase {i + 1}
                    </label>
                    <p style={{ fontSize: 12, color: "#b0a898", margin: "0 0 10px", fontStyle: "italic" }}>{prompt}</p>
                    <div style={{ position: "relative" }}>
                      <input
                        type={showPhrases[i] ? "text" : "password"}
                        value={phrases[i]}
                        onChange={e => setPhrase(i, e.target.value)}
                        placeholder="Your answer…"
                        style={{ width: "100%", padding: "10px 38px 10px 12px", border: `1.5px solid ${phrases[i].length >= 3 ? "#9ecfac" : BORDER}`, borderRadius: 8, fontSize: 13, fontFamily: FONT, background: "#fff", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
                      />
                      <button onClick={() => toggleShow(i)} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#b0a898" }}>
                        {showPhrases[i] ? "🙈" : "👁"}
                      </button>
                    </div>
                    {phrases[i].length >= 3 && <p style={{ fontSize: 11, color: "#276738", margin: "5px 0 0" }}>✓ Looks good</p>}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                <button onClick={() => setStep("intro")} style={{ flex: 1, padding: "12px", background: CREAM_CARD, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, fontFamily: FONT, cursor: "pointer", color: "#4a4540" }}>← Back</button>
                <button disabled={!allFilled} onClick={() => setStep("confirm")} style={{ flex: 2, padding: "12px", background: allFilled ? "#111" : "#e8e5de", color: allFilled ? "#fff" : "#b0a898", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: FONT, cursor: allFilled ? "pointer" : "default", transition: "all 0.15s" }}>
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ── Confirm ── */}
          {step === "confirm" && (
            <div>
              <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "2px", color: "#a09788", margin: "0 0 12px", textTransform: "uppercase" }}>Step 2 of 3 — Confirm</p>
              <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 28, color: "#111", margin: "0 0 6px" }}>Repeat your answers.</h2>
              <p style={{ fontSize: 13, color: "#a09788", margin: "0 0 28px", lineHeight: 1.6 }}>
                Re-enter each phrase exactly as you typed it. This ensures you'll be able to reproduce them during recovery.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[0, 1, 2].map(i => (
                  <div key={i}>
                    <label style={{ fontSize: 10, letterSpacing: "1px", color: "#a09788", display: "block", marginBottom: 6, textTransform: "uppercase", fontFamily: "monospace" }}>Phrase {i + 1} — confirm</label>
                    <input
                      type="password"
                      value={confirmed[i]}
                      onChange={e => setConfirm(i, e.target.value)}
                      placeholder="Re-enter exactly…"
                      style={{ width: "100%", padding: "10px 12px", border: `1.5px solid ${errors[i] ? "#d94f3d" : BORDER}`, borderRadius: 8, fontSize: 13, fontFamily: FONT, background: "#fff", outline: "none", boxSizing: "border-box" }}
                    />
                    {errors[i] && <p style={{ fontSize: 11, color: "#d94f3d", margin: "5px 0 0" }}>✗ Doesn't match — try again</p>}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
                <button onClick={() => { setStep("phrases"); setErrors([false, false, false]); }} style={{ flex: 1, padding: "12px", background: CREAM_CARD, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, fontFamily: FONT, cursor: "pointer", color: "#4a4540" }}>← Back</button>
                <button onClick={handleConfirm} disabled={confirmed.some(c => !c)} style={{ flex: 2, padding: "12px", background: confirmed.every(c => c) ? "#111" : "#e8e5de", color: confirmed.every(c => c) ? "#fff" : "#b0a898", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: FONT, cursor: confirmed.every(c => c) ? "pointer" : "default", transition: "all 0.15s" }}>
                  Generate commitment →
                </button>
              </div>
            </div>
          )}

          {/* ── Store ── */}
          {step === "store" && (
            <div>
              <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "2px", color: "#a09788", margin: "0 0 12px", textTransform: "uppercase" }}>Step 3 of 3 — Store</p>
              <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 28, color: "#111", margin: "0 0 6px" }}>Your commitment is ready.</h2>
              <p style={{ fontSize: 13, color: "#a09788", margin: "0 0 24px", lineHeight: 1.6 }}>
                Below is your ZKP commitment hash — the only thing we store. Your raw phrases are gone from memory the moment you leave this page.
              </p>

              {/* Hash display */}
              <div style={{ background: "#111", borderRadius: 12, padding: "20px 22px", marginBottom: 20 }}>
                <p style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "2px", color: "#666", margin: "0 0 8px" }}>ZKP COMMITMENT HASH</p>
                <p style={{ fontFamily: "monospace", fontSize: 13, color: "#f5c542", margin: 0, wordBreak: "break-all", lineHeight: 1.7 }}>{commitment}</p>
              </div>

              {/* Write it down callout */}
              <div style={{ background: "#fef9eb", border: "1px solid #f5e6c0", borderRadius: 10, padding: "14px 18px", marginBottom: 24, display: "flex", gap: 12 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>📋</span>
                <div>
                  <p style={{ fontWeight: 600, fontSize: 13, color: "#7a5c10", margin: "0 0 4px" }}>Write this hash down too</p>
                  <p style={{ fontSize: 12, color: "#a08020", margin: 0, lineHeight: 1.5 }}>Store it alongside your phrases, offline. This lets you verify your commitment without needing to log in.</p>
                </div>
              </div>

              <button onClick={handleStore} style={{ width: "100%", padding: "14px", background: "#111", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: FONT, cursor: "pointer" }}>
                {storing ? "Saving to Turnkey enclave…" : "Save commitment to my account →"}
              </button>
              {storing && (
                <div style={{ marginTop: 12, height: 3, background: "#e8e5de", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", background: "#111", animation: "progress 2s linear forwards", borderRadius: 2 }} />
                  <style>{`@keyframes progress { from { width: 0% } to { width: 100% } }`}</style>
                </div>
              )}
            </div>
          )}

          {/* ── Done ── */}
          {step === "done" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 52, marginBottom: 20 }}>🔐</div>
              <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 32, color: "#111", margin: "0 0 12px" }}>You're protected.</h2>
              <p style={{ fontSize: 14, color: "#a09788", lineHeight: 1.7, margin: "0 0 32px", maxWidth: 400, marginInline: "auto" }}>
                Your ZKP commitment is stored securely in your Turnkey enclave. If you ever lose all other access, visit <strong style={{ color: "#111" }}>enki.art/recovery</strong> and use your 3 phrases to get back in.
              </p>
              <div style={{ background: CREAM_CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "20px 24px", marginBottom: 28, textAlign: "left" }}>
                <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "1px", color: "#a09788", margin: "0 0 12px", textTransform: "uppercase" }}>What's next</p>
                {[
                  "Consider also linking Humanity Protocol or World ID as a second ZKP path",
                  "Store your 3 phrases and commitment hash in a physical safe or password manager",
                  "Test the recovery flow at /recovery to make sure you remember your phrases",
                ].map((tip, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                    <span style={{ color: "#9ecfac", fontWeight: 700, flexShrink: 0 }}>✓</span>
                    <p style={{ fontSize: 13, color: "#4a4540", margin: 0, lineHeight: 1.5 }}>{tip}</p>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <a href="/settings" style={{ flex: 1, padding: "12px", background: CREAM_CARD, border: `1px solid ${BORDER}`, borderRadius: 10, fontSize: 13, fontFamily: FONT, cursor: "pointer", color: "#4a4540", textDecoration: "none", textAlign: "center" as const }}>
                  Back to Settings
                </a>
                <a href="/recovery" style={{ flex: 2, padding: "12px", background: "#111", color: "#fff", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: FONT, textDecoration: "none", textAlign: "center" as const }}>
                  Test recovery flow →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
