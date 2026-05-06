"use client";
import { useState } from "react";
import { Key, Shield, User, CheckCircle2, Mail, Search, Lock } from "lucide-react";

const FONT = "'Outfit', sans-serif";
const SERIF = "'Playfair Display', Georgia, serif";
const CREAM = "#f5f3ee";
const CREAM_CARD = "#faf9f7";
const BORDER = "#e8e5de";

type Step = "choose" | "phrase" | "phrase-done" | "form" | "submitted";

function Label({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "2px", color: "#a09788", margin: "0 0 10px", textTransform: "uppercase" as const }}>{children}</p>;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 24, color: "#111", margin: "0 0 6px" }}>{children}</h2>;
}
function Sub({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 13, color: "#a09788", margin: "0 0 20px", lineHeight: 1.65 }}>{children}</p>;
}
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontSize: 11, fontWeight: 600, color: "#4a4540", display: "block", marginBottom: hint ? 2 : 6, letterSpacing: "0.2px" }}>{label}</label>
      {hint && <p style={{ fontSize: 11, color: "#b0a898", margin: "0 0 6px", lineHeight: 1.5 }}>{hint}</p>}
      {children}
    </div>
  );
}
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 13px", border: `1.5px solid ${BORDER}`,
  borderRadius: 8, fontSize: 13, fontFamily: FONT, background: "#fff",
  outline: "none", boxSizing: "border-box", color: "#111",
};
const taStyle: React.CSSProperties = { ...inputStyle, minHeight: 90, resize: "vertical" as const, lineHeight: 1.6 };

export default function RecoveryPage() {
  const [step, setStep] = useState<Step>("choose");

  // Phrase entry state (Layer 1)
  const [words, setWords] = useState<string[]>(Array(24).fill(""));
  const [phraseVerifying, setPhraseVerifying] = useState(false);
  const setWord = (i: number, v: string) => setWords(p => { const n = [...p]; n[i] = v.toLowerCase().trim(); return n; });
  const allWordsEntered = words.every(w => w.length >= 2);

  const handlePhraseSubmit = () => {
    setPhraseVerifying(true);
    setTimeout(() => { setPhraseVerifying(false); setStep("phrase-done"); }, 1800);
  };

  // Form state
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [ownedContent, setOwnedContent] = useState("");
  const [socials, setSocials] = useState("");
  const [explanation, setExplanation] = useState("");
  const [zkpHash, setZkpHash] = useState("");
  const [agree, setAgree] = useState(false);

  const canSubmit = handle.trim() && contactEmail.trim() && explanation.trim() && agree;

  return (
    <div style={{ minHeight: "100vh", background: CREAM, fontFamily: FONT }}>
      {/* Header */}
      <header style={{ padding: "18px 40px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(245,243,238,0.96)", backdropFilter: "blur(8px)", zIndex: 10 }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 700, fontSize: 17, color: "#111" }}>Enki Art</span>
          <span style={{ color: "#d94f3d" }}>·</span>
        </a>
        <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "2px", color: "#a09788" }}>ACCOUNT RECOVERY</span>
        <span style={{ width: 80 }} />
      </header>

      <div style={{ display: "flex", justifyContent: "center", padding: "52px 24px 80px" }}>
        <div style={{ width: "100%", maxWidth: 580 }}>

          {/* ── Choose: Layer 1 vs Layer 2 ── */}
          {step === "choose" && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <h1 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 36, fontWeight: 900, color: "#111", margin: "0 0 10px", lineHeight: 1.1 }}>Recover your account.</h1>
                <p style={{ fontSize: 14, color: "#a09788", margin: 0, lineHeight: 1.65 }}>Choose the recovery method you set up.</p>
              </div>

              {/* Layer 1 — Phrase */}
              <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 8, padding: "16px 20px", marginBottom: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 16, transition: "background 0.2s" }} onClick={() => setStep("phrase")} onMouseOver={e => e.currentTarget.style.background = '#faf9f7'} onMouseOut={e => e.currentTarget.style.background = '#fff'}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#eaf6ee', color: '#276738', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Key size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#111" }}>24-word recovery phrase</p>
                    <span style={{ fontSize: 10, fontWeight: 600, color: "#276738", background: "#eaf6ee", padding: "2px 8px", borderRadius: 20 }}>IMMEDIATE</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 12, color: "#666", lineHeight: 1.5 }}>Enter your 24 BIP39 words. Verified instantly — no waiting.</p>
                </div>
                <span style={{ fontSize: 16, color: "#ccc" }}>→</span>
              </div>

              {/* Layer 2 — Social recovery */}
              <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 8, padding: "16px 20px", marginBottom: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 16, transition: "background 0.2s" }} onClick={() => window.location.href = "/recovery/social"} onMouseOver={e => e.currentTarget.style.background = '#faf9f7'} onMouseOut={e => e.currentTarget.style.background = '#fff'}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#eff6ff', color: '#4a6fa5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Shield size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#111" }}>Guardian-based recovery</p>
                    <span style={{ fontSize: 10, fontWeight: 600, color: "#4a6fa5", background: "#eff6ff", padding: "2px 8px", borderRadius: 20 }}>48H TIMELOCK</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 12, color: "#666", lineHeight: 1.5 }}>Secure verification + guardian approvals. Requires {`3-of-5`} sign-off.</p>
                </div>
                <span style={{ fontSize: 16, color: "#ccc" }}>→</span>
              </div>

              {/* Layer 3 — Manual */}
              <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 8, padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", gap: 16, transition: "background 0.2s" }} onClick={() => setStep("form")} onMouseOver={e => e.currentTarget.style.background = '#faf9f7'} onMouseOut={e => e.currentTarget.style.background = '#fff'}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#fef9eb', color: '#7a5c10', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={18} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#111" }}>Manual review by our team</p>
                    <span style={{ fontSize: 10, fontWeight: 600, color: "#7a5c10", background: "#fef9eb", padding: "2px 8px", borderRadius: 20 }}>LAST RESORT</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 12, color: "#666", lineHeight: 1.5 }}>Lost everything including guardians. Submit evidence — human review.</p>
                </div>
                <span style={{ fontSize: 16, color: "#ccc" }}>→</span>
              </div>


              <p style={{ textAlign: "center", fontSize: 12, color: "#c0b9ae", marginTop: 20 }}>
                Still have a device or email? <a href="/" style={{ color: "#a09788", textDecoration: "underline" }}>Try signing in normally first</a>
              </p>
            </div>
          )}

          {/* ── Layer 1: Phrase Entry ── */}
          {step === "phrase" && (
            <div>
              <button onClick={() => setStep("choose")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#a09788", fontFamily: FONT, padding: 0, marginBottom: 24 }}>← Back</button>
              <Label>Layer 1 — Recovery Phrase</Label>
              <H2>Enter your 24 words.</H2>
              <Sub>Type each word exactly as you wrote it, in order. All 24 must match before submission is enabled.</Sub>

              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "20px 24px", marginBottom: 18 }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                  {Array.from({ length: 24 }, (_, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 10, color: "#a09788", fontFamily: "monospace", minWidth: 16 }}>{String(i + 1).padStart(2, "0")}</span>
                      <input
                        value={words[i]}
                        onChange={e => setWord(i, e.target.value)}
                        autoComplete="off"
                        spellCheck={false}
                        placeholder="word"
                        style={{ flex: 1, background: words[i].length >= 2 ? "#eaf6ee" : "#fbfaf8", border: `1px solid ${words[i].length >= 2 ? "#9ecfac" : BORDER}`, borderRadius: 6, padding: "6px 8px", fontSize: 13, fontFamily: "monospace", color: "#111", outline: "none", width: "100%", boxSizing: "border-box" as const, transition: "all 0.15s" }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "#fef9eb", border: "1px solid #f5e6c0", borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
                <p style={{ fontSize: 11, color: "#7a5c10", margin: 0 }}>Make sure you're on <strong>enki.art</strong> before entering your phrase. We will never ask for it via email or support chat.</p>
              </div>

              <button
                disabled={!allWordsEntered || phraseVerifying}
                onClick={handlePhraseSubmit}
                style={{ width: "100%", padding: "13px", background: allWordsEntered && !phraseVerifying ? "#111" : "#e8e5de", color: allWordsEntered && !phraseVerifying ? "#fff" : "#b0a898", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, fontFamily: FONT, cursor: allWordsEntered && !phraseVerifying ? "pointer" : "default", transition: "all 0.2s" }}
              >
                {phraseVerifying ? "Verifying phrase…" : allWordsEntered ? "Verify & restore access →" : `${words.filter(w => w.length >= 2).length} / 24 words entered`}
              </button>
            </div>
          )}

          {/* ── Phrase verified ── */}
          {step === "phrase-done" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: '50%', background: '#eaf6ee', border: `1px solid #9ecfac`, marginBottom: 20 }}>
                <CheckCircle2 size={32} color="#276738" strokeWidth={1.5} />
              </div>
              <Label>Access restored</Label>
              <h1 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 32, fontWeight: 900, color: "#111", margin: "0 0 12px" }}>You're back in.</h1>
              <p style={{ fontSize: 14, color: "#a09788", lineHeight: 1.7, maxWidth: 400, marginInline: "auto", marginBottom: 28 }}>
                Phrase verified. Your account, prompts, and earnings are intact. We recommend rotating your phrase and re-confirming your guardians now.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 360, marginInline: "auto", marginBottom: 24 }}>
                <a href="/settings?tab=recovery" style={{ padding: "12px", background: "#111", color: "#fff", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600, fontFamily: FONT }}>
                  Rotate recovery phrase →
                </a>
                <a href="/" style={{ padding: "12px", background: "#f5f3ee", border: "1px solid #e8e5de", color: "#4a4540", borderRadius: 8, textDecoration: "none", fontSize: 13, fontFamily: FONT }}>
                  Continue to Enki Art
                </a>
              </div>
              <p style={{ fontSize: 11, color: "#c0b9ae" }}>All previously registered devices have been de-authorized as a security precaution.</p>
            </div>
          )}

          {/* ── Manual Review: Form ── */}
          {step === "form" && (
            <div>
              <button onClick={() => setStep("choose")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#a09788", fontFamily: FONT, padding: 0, marginBottom: 24 }}>← Back</button>

              <div style={{ marginBottom: 28 }}>
                <Label>Recovery Request</Label>
                <h1 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 30, fontWeight: 900, color: "#111", margin: "0 0 8px" }}>Tell us your case.</h1>
                <p style={{ fontSize: 13, color: "#a09788", lineHeight: 1.65, margin: 0 }}>
                  Be as specific as possible. The more we can verify independently, the faster and more likely a successful review.
                </p>
              </div>

              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "24px 28px", marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "1px", color: "#b0a898", margin: "0 0 18px", textTransform: "uppercase" }}>Account Identifiers</p>

                <Field label="Your Enki Art handle *" hint="e.g. @mira — even approximate helps">
                  <input value={handle} onChange={e => setHandle(e.target.value)} placeholder="@handle" style={inputStyle} />
                </Field>

                <Field label="Email address linked to your account" hint="The one you signed up with, or any connected social email">
                  <input value={email} onChange={e => setEmail(e.target.value)} placeholder="original@email.com" type="email" style={inputStyle} />
                </Field>

                <Field label="Wallet address(es)" hint="Any wallet you ever connected — even partial addresses help">
                  <input value={wallet} onChange={e => setWallet(e.target.value)} placeholder="0x… or multiple, comma separated" style={inputStyle} />
                </Field>

                <Field label="Linked social accounts" hint="X (Twitter), Instagram, or other connected profiles">
                  <input value={socials} onChange={e => setSocials(e.target.value)} placeholder="@handle on X, @handle on Instagram…" style={inputStyle} />
                </Field>
              </div>

              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "24px 28px", marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "1px", color: "#b0a898", margin: "0 0 18px", textTransform: "uppercase" }}>Ownership Evidence</p>

                <Field label="Content you own on the platform" hint="Prompt names, image titles, collections — anything we can cross-reference">
                  <textarea value={ownedContent} onChange={e => setOwnedContent(e.target.value)} placeholder="e.g. 'Moody Forest Fog', 'Neon Brutalism Vol. 2', ..." style={taStyle} />
                </Field>

                <Field label="Approx. last login date" hint="Even a rough timeframe is useful">
                  <input value={lastLogin} onChange={e => setLastLogin(e.target.value)} placeholder="e.g. March 2025, or 'around 3 months ago'" style={inputStyle} />
                </Field>

                <Field label="Guardian Passcode hash (if you set one)" hint="From Settings → Recovery → Last Resort Recovery setup. Optional but strong evidence.">
                  <input value={zkpHash} onChange={e => setZkpHash(e.target.value)} placeholder="0x…" style={{ ...inputStyle, fontFamily: "monospace", fontSize: 12 }} />
                </Field>
              </div>

              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "24px 28px", marginBottom: 16 }}>
                <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "1px", color: "#b0a898", margin: "0 0 18px", textTransform: "uppercase" }}>Your Story</p>

                <Field label="What happened? *" hint="Explain in your own words how you lost access and why you believe you should be restored">
                  <textarea value={explanation} onChange={e => setExplanation(e.target.value)} placeholder="e.g. My phone was stolen, I lost my hardware wallet, and my Google account was compromised in the same incident. I can verify ownership by…" style={{ ...taStyle, minHeight: 130 }} />
                </Field>

                <Field label="Contact email for our response *" hint="Where we should reach you. Must be reachable — we won't restore access through an unconfirmed channel.">
                  <input value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder="new-reachable@email.com" type="email" style={inputStyle} />
                </Field>
              </div>

              {/* Agreement */}
              <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", marginBottom: 22, padding: "14px 16px", background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8 }}>
                <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} style={{ marginTop: 2, flexShrink: 0 }} />
                <p style={{ fontSize: 12, color: "#4a4540", margin: 0, lineHeight: 1.6 }}>
                  I understand that this request will be reviewed manually by the Enki Art team, that there is no guarantee of recovery, and that submitting false information to gain unauthorized access to another person's account is a violation of the Terms of Service and potentially illegal.
                </p>
              </label>

              <button
                disabled={!canSubmit}
                onClick={() => setStep("submitted")}
                style={{ width: "100%", padding: "14px", background: canSubmit ? "#111" : "#e8e5de", color: canSubmit ? "#fff" : "#b0a898", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: FONT, cursor: canSubmit ? "pointer" : "default", transition: "all 0.2s" }}
              >
                Submit recovery request
              </button>
              <p style={{ fontSize: 11, color: "#c0b9ae", textAlign: "center", marginTop: 12 }}>Typically reviewed within 2–5 business days</p>
            </div>
          )}

          {/* ── Submitted ── */}
          {step === "submitted" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: '50%', background: '#fff', border: `1px solid ${BORDER}`, marginBottom: 20 }}>
                <Mail size={32} color="#111" strokeWidth={1.5} />
              </div>
              <Label>Request received</Label>
              <h1 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 32, fontWeight: 900, color: "#111", margin: "0 0 12px" }}>We've got your request.</h1>
              <p style={{ fontSize: 14, color: "#a09788", lineHeight: 1.7, maxWidth: 420, marginInline: "auto", marginBottom: 32 }}>
                A member of the Enki Art team will review your case and reach out to <strong style={{ color: "#111" }}>{contactEmail || "your contact email"}</strong> within 2–5 business days.
              </p>

              <div style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "20px 24px", marginBottom: 24, textAlign: "left" }}>
                <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "1px", color: "#b0a898", margin: "0 0 14px", textTransform: "uppercase" }}>What happens next</p>
                {[
                  { icon: <Search size={16} color="#7a5c10" />, bg: "#fef9eb", text: "Our team cross-references your submitted details against account records." },
                  { icon: <Mail size={16} color="#4a6fa5" />, bg: "#eff6ff", text: `We'll email ${contactEmail || "you"} if we need more information or to confirm your identity.` },
                  { icon: <CheckCircle2 size={16} color="#276738" />, bg: "#eaf6ee", text: "If verified, you'll receive a one-time access link to set new credentials." },
                  { icon: <Lock size={16} color="#b03020" />, bg: "#fdecea", text: "If we can't verify with confidence, access won't be restored — this protects you from attackers making the same claim." },
                ].map(s => (
                  <div key={s.text} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: '50%', background: s.bg, flexShrink: 0, marginTop: -2 }}>
                      {s.icon}
                    </span>
                    <p style={{ fontSize: 13, color: "#4a4540", margin: 0, lineHeight: 1.55 }}>{s.text}</p>
                  </div>
                ))}
              </div>

              <div style={{ background: "#fef9eb", border: "1px solid #f5e6c0", borderRadius: 10, padding: "12px 16px", marginBottom: 24 }}>
                <p style={{ fontSize: 12, color: "#7a5c10", margin: 0, lineHeight: 1.6 }}>
                  <strong>Keep your contact email accessible.</strong> If we can't reach you within 14 days of our outreach, the request will be closed and you'll need to resubmit.
                </p>
              </div>

              <a href="/" style={{ display: "inline-block", padding: "12px 32px", background: "#111", color: "#fff", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, fontFamily: FONT }}>
                Back to Enki Art
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
