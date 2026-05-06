"use client";
import { useState, useEffect, useRef } from "react";

const FONT = "'Outfit', sans-serif";
const SERIF = "'Playfair Display', Georgia, serif";
const CREAM = "#f5f3ee";
const CREAM_CARD = "#faf9f7";
const BORDER = "#e8e5de";

type Step = "intro" | "view" | "verify" | "backup" | "done";

// Mock 24-word BIP39 phrase — in production, Turnkey generates this
const MOCK_PHRASE = [
  "velvet","crane","mirror","foster","bridge","lunar",
  "orbit","saffron","tangle","nimble","river","draft",
  "copper","ozone","fringe","lantern","pivot","cedar",
  "anchor","riddle","mossy","quartz","glimmer","dusk",
];

// Pick 4 random positions for verification
function pickVerifyPositions(): number[] {
  const pos = new Set<number>();
  while (pos.size < 4) pos.add(Math.floor(Math.random() * 24));
  return Array.from(pos).sort((a, b) => a - b);
}

// ── Shared ──────────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "2px", color: "#a09788", margin: "0 0 10px", textTransform: "uppercase" as const }}>{children}</p>;
}
function H({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 26, color: "#111", margin: "0 0 6px" }}>{children}</h2>;
}
function Sub({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 13, color: "#a09788", margin: "0 0 20px", lineHeight: 1.65 }}>{children}</p>;
}
function PrimaryBtn({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: "100%", padding: "13px", background: disabled ? "#e8e5de" : "#111",
      color: disabled ? "#b0a898" : "#fff", border: "none", borderRadius: 8,
      fontSize: 14, fontWeight: 600, fontFamily: FONT,
      cursor: disabled ? "default" : "pointer", transition: "all 0.2s",
    }}>{children}</button>
  );
}

// ── Step progress ────────────────────────────────────────────────────────────
function Progress({ current }: { current: Step }) {
  const steps: Step[] = ["intro", "view", "verify", "backup", "done"];
  const idx = steps.indexOf(current);
  return (
    <div style={{ display: "flex", gap: 6, marginBottom: 32 }}>
      {steps.slice(0, 4).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < idx ? "#111" : i === idx ? "#111" : BORDER, opacity: i <= idx ? 1 : 0.25, transition: "all 0.3s" }} />
      ))}
    </div>
  );
}

// ── View step: 10-second mandatory dwell ─────────────────────────────────────
function ViewPhrase({ onNext }: { onNext: () => void }) {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [acknowledged, setAcknowledged] = useState(false);
  const [hidden, setHidden] = useState(true);
  const timerStarted = useRef(false);

  // Start countdown only when user reveals the phrase
  useEffect(() => {
    if (!hidden && !timerStarted.current) {
      timerStarted.current = true;
      const id = setInterval(() => {
        setSecondsLeft(p => {
          if (p <= 1) { clearInterval(id); return 0; }
          return p - 1;
        });
      }, 1000);
      return () => clearInterval(id);
    }
  }, [hidden]);

  const dwellDone = secondsLeft === 0;
  const canContinue = dwellDone && acknowledged;

  return (
    <div>
      <Label>Step 1 — Your Recovery Phrase</Label>
      <H>Write this down.</H>
      <Sub>These 24 words are the master key to your account. Anyone who has them can take full control. Keep them secret and offline.</Sub>

      {/* Reveal / hide toggle */}
      {hidden ? (
        <div
          onClick={() => setHidden(false)}
          style={{ background: "#111", borderRadius: 12, padding: "40px 24px", textAlign: "center", cursor: "pointer", marginBottom: 20 }}
        >
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, margin: "0 0 8px" }}>🔒 Phrase hidden</p>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, margin: 0 }}>Click to reveal — make sure no one is watching your screen</p>
        </div>
      ) : (
        <div style={{ position: "relative", marginBottom: 20 }}>
          {/* Phrase grid */}
          <div style={{ background: "#111", borderRadius: 12, padding: "20px 24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {MOCK_PHRASE.map((word, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 10px", background: "rgba(255,255,255,0.06)", borderRadius: 6 }}>
                  <span style={{ fontSize: 10, color: "#555", fontFamily: "monospace", minWidth: 18 }}>{String(i + 1).padStart(2, "0")}</span>
                  <span style={{ fontSize: 13, color: "#f5f3ee", fontFamily: "monospace", letterSpacing: "0.3px" }}>{word}</span>
                </div>
              ))}
            </div>
            {/* Countdown badge */}
            {!dwellDone && (
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <span style={{ fontSize: 11, fontFamily: "monospace", color: "#666", letterSpacing: "1px" }}>
                  READ CAREFULLY — {secondsLeft}s remaining
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backup guidance inline */}
      <div style={{ background: CREAM_CARD, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "14px 18px", marginBottom: 18 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: "#4a4540", margin: "0 0 8px" }}>📋 Before you continue</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {[
            "Write it on paper — pen and paper, not a phone screenshot",
            "Make at least 2 copies stored in different physical locations",
            "Never type it into any website or app other than Enki Art",
            "Never store it in a notes app, email, or cloud storage",
          ].map(tip => (
            <p key={tip} style={{ fontSize: 12, color: "#6b5f55", margin: 0, lineHeight: 1.5 }}>· {tip}</p>
          ))}
        </div>
      </div>

      {/* Acknowledgement checkbox — only shows after dwell */}
      {!hidden && dwellDone && (
        <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer", marginBottom: 18, padding: "12px 14px", background: "#f8f6f1", border: `1px solid ${BORDER}`, borderRadius: 8 }}>
          <input type="checkbox" checked={acknowledged} onChange={e => setAcknowledged(e.target.checked)} style={{ marginTop: 2, flexShrink: 0 }} />
          <p style={{ fontSize: 13, color: "#3a3530", margin: 0, lineHeight: 1.6 }}>
            I have written down all 24 words in the correct order and stored them somewhere safe offline.
          </p>
        </label>
      )}

      <PrimaryBtn disabled={!canContinue} onClick={onNext}>
        {hidden ? "Reveal phrase to continue" : !dwellDone ? `Read carefully… (${secondsLeft}s)` : !acknowledged ? "Check the box above to continue" : "I've saved it — continue →"}
      </PrimaryBtn>
    </div>
  );
}

// ── Verify step: 4 random word positions ─────────────────────────────────────
function VerifyPhrase({ onNext }: { onNext: () => void }) {
  const [positions] = useState(pickVerifyPositions);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const setAnswer = (pos: number, val: string) =>
    setAnswers(p => ({ ...p, [pos]: val.toLowerCase().trim() }));

  const allCorrect = positions.every(p => answers[p] === MOCK_PHRASE[p]);
  const allFilled  = positions.every(p => (answers[p] || "").length > 0);

  return (
    <div>
      <Label>Step 2 — Confirm</Label>
      <H>Let's verify you wrote it down.</H>
      <Sub>Enter the words at the positions below. This confirms you have the full phrase before we continue.</Sub>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 22 }}>
        {positions.map(pos => {
          const val = answers[pos] || "";
          const attempted = val.length > 0;
          const correct = val === MOCK_PHRASE[pos];
          return (
            <div key={pos} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", background: CREAM_CARD, border: `1.5px solid ${attempted ? (correct ? "#9ecfac" : "#e8b4ae") : BORDER}`, borderRadius: 8, transition: "border-color 0.2s" }}>
              <span style={{ fontSize: 11, fontFamily: "monospace", color: "#b0a898", minWidth: 36 }}>#{pos + 1}</span>
              <input
                value={answers[pos] || ""}
                onChange={e => setAnswer(pos, e.target.value)}
                placeholder={`Word ${pos + 1}…`}
                autoComplete="off"
                spellCheck={false}
                style={{ flex: 1, border: "none", background: "transparent", fontSize: 14, fontFamily: "monospace", outline: "none", color: "#111" }}
              />
              {attempted && (
                <span style={{ fontSize: 16 }}>{correct ? "✓" : "✗"}</span>
              )}
            </div>
          );
        })}
      </div>

      {allFilled && !allCorrect && (
        <p style={{ fontSize: 12, color: "#b03020", marginBottom: 14, padding: "10px 14px", background: "#fdecea", borderRadius: 8 }}>
          One or more words don't match. Check your written copy and try again.
        </p>
      )}

      <PrimaryBtn disabled={!allCorrect} onClick={onNext}>
        {allCorrect ? "Verified — continue →" : "Enter all 4 words to continue"}
      </PrimaryBtn>
    </div>
  );
}

// ── Backup guidance step ─────────────────────────────────────────────────────
function BackupGuidance({ onNext }: { onNext: () => void }) {
  const [slip39Expanded, setSlip39Expanded] = useState(false);

  return (
    <div>
      <Label>Step 3 — Secure your backup</Label>
      <H>Phrase secured. Now protect it.</H>
      <Sub>Your recovery phrase is only as safe as your physical backup. A lost phrase means a lost account — permanently.</Sub>

      {/* Physical storage tiers */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
        {[
          {
            tier: "Minimum", icon: "📄",
            title: "2 paper copies in different locations",
            body: "Fireproof box at home + trusted family member's house, safety deposit box, etc. Use waterproof paper if possible.",
            color: "#fef9eb", border: "#f5e6c0", text: "#7a5c10",
          },
          {
            tier: "Recommended", icon: "🛡️",
            title: "Steel backup plate",
            body: "Metal plates survive fire, floods, and physical damage that destroy paper. Cryptosteel Capsule or Billfodl are purpose-built.",
            color: "#eaf6ee", border: "#9ecfac", text: "#276738",
            link: { label: "Cryptosteel →", href: "https://cryptosteel.com" },
          },
        ].map(opt => (
          <div key={opt.tier} style={{ background: opt.color, border: `1px solid ${opt.border}`, borderRadius: 10, padding: "14px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span>{opt.icon}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: opt.text, textTransform: "uppercase", letterSpacing: "0.5px" }}>{opt.tier}</span>
            </div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#111", margin: "0 0 4px" }}>{opt.title}</p>
            <p style={{ fontSize: 12, color: opt.text, margin: 0, lineHeight: 1.55 }}>{opt.body}</p>
            {opt.link && (
              <a href={opt.link.href} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: opt.text, marginTop: 6, display: "inline-block", textDecoration: "underline" }}>{opt.link.label}</a>
            )}
          </div>
        ))}
      </div>

      {/* SLIP-39 Shamir — advanced option */}
      <div style={{ background: CREAM_CARD, border: `1px solid ${BORDER}`, borderRadius: 10, marginBottom: 22, overflow: "hidden" }}>
        <button
          onClick={() => setSlip39Expanded(p => !p)}
          style={{ width: "100%", padding: "14px 18px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: FONT }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span>🔑</span>
            <div style={{ textAlign: "left" as const }}>
              <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: "#111" }}>SLIP-39 Shamir Secret Sharing</p>
              <p style={{ margin: 0, fontSize: 11, color: "#a09788" }}>Advanced · splits your phrase so no single copy is the full secret</p>
            </div>
          </div>
          <span style={{ fontSize: 12, color: "#a09788" }}>{slip39Expanded ? "▲" : "▼"}</span>
        </button>
        {slip39Expanded && (
          <div style={{ padding: "0 18px 16px", borderTop: `1px solid ${BORDER}` }}>
            <p style={{ fontSize: 13, color: "#4a4540", lineHeight: 1.65, marginTop: 14, marginBottom: 10 }}>
              SLIP-39 splits your mnemonic into <strong>5 shares</strong> where any <strong>3 are sufficient</strong> to reconstruct it — but 2 alone reveal nothing. This removes the "single point of failure" of one paper copy.
            </p>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              {["Share A", "Share B", "Share C", "Share D", "Share E"].map((s, i) => (
                <div key={s} style={{ flex: 1, padding: "8px 6px", background: i < 3 ? "#eaf6ee" : "#f5f3ee", border: `1px solid ${i < 3 ? "#9ecfac" : BORDER}`, borderRadius: 6, textAlign: "center" as const }}>
                  <p style={{ fontSize: 10, fontFamily: "monospace", color: i < 3 ? "#276738" : "#b0a898", margin: 0 }}>{s}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: "#b0a898", margin: "0 0 10px", lineHeight: 1.5 }}>Any 3 of the 5 shares reconstruct your phrase. Distribute to 5 trusted locations — no single location can compromise your account.</p>
            <div style={{ background: "#fef9eb", border: "1px solid #f5e6c0", borderRadius: 8, padding: "10px 14px" }}>
              <p style={{ fontSize: 11, color: "#7a5c10", margin: 0, lineHeight: 1.5 }}>
                <strong>Availability note:</strong> SLIP-39 generation depends on Turnkey infrastructure support. This option will be enabled once confirmed with our signing provider. Check back in Settings → Recovery when available.
              </p>
            </div>
          </div>
        )}
      </div>

      <PrimaryBtn onClick={onNext}>I've secured my backup →</PrimaryBtn>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export default function SetupPhrasePage() {
  const [step, setStep] = useState<Step>("intro");

  return (
    <div style={{ minHeight: "100vh", background: CREAM, fontFamily: FONT }}>
      <header style={{ padding: "18px 40px", borderBottom: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "rgba(245,243,238,0.96)", backdropFilter: "blur(8px)", zIndex: 10 }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 700, fontSize: 17, color: "#111" }}>Enki Art</span>
          <span style={{ color: "#d94f3d" }}>·</span>
        </a>
        <span style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "2px", color: "#a09788" }}>RECOVERY PHRASE SETUP</span>
        <span style={{ width: 80 }} />
      </header>

      <div style={{ display: "flex", justifyContent: "center", padding: "52px 24px 80px" }}>
        <div style={{ width: "100%", maxWidth: 560 }}>
          {step !== "intro" && step !== "done" && <Progress current={step} />}

          {step === "intro" && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 36 }}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>🔑</div>
                <Label>Recovery Phrase — Layer 1</Label>
                <h1 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 36, fontWeight: 900, color: "#111", margin: "0 0 12px", lineHeight: 1.1 }}>Your 24-word master key.</h1>
                <p style={{ fontSize: 14, color: "#a09788", lineHeight: 1.7, maxWidth: 420, marginInline: "auto" }}>
                  Turnkey will generate a unique 24-word BIP39 recovery phrase for your account. This is the highest-trust recovery method — entering it grants immediate access with no delay.
                </p>
              </div>

              <div style={{ background: CREAM_CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: 22, marginBottom: 20 }}>
                <p style={{ fontSize: 10, fontFamily: "monospace", letterSpacing: "1.5px", color: "#b0a898", margin: "0 0 16px" }}>WHAT THIS IS</p>
                {[
                  { icon: "🔐", title: "Cryptographic master key", body: "24 random words from the BIP39 wordlist. Mathematically tied to your wallet and account — impossible to guess." },
                  { icon: "⚡", title: "Immediate access on recovery", body: "Unlike manual review (2–5 days), entering your phrase restores access instantly. No waiting, no human review needed." },
                  { icon: "📄", title: "Physical-only — no cloud", body: "Never store this digitally. Write it on paper or stamp it in steel. The moment it exists in a note app or email, it's potentially compromised." },
                ].map(s => (
                  <div key={s.title} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{s.icon}</span>
                    <div>
                      <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: "#111" }}>{s.title}</p>
                      <p style={{ margin: 0, fontSize: 12, color: "#a09788", lineHeight: 1.5 }}>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <PrimaryBtn onClick={() => setStep("view")}>Generate my recovery phrase →</PrimaryBtn>
              <p style={{ textAlign: "center", fontSize: 12, color: "#c0b9ae", marginTop: 12 }}>You'll be asked to confirm 4 words before proceeding</p>
            </div>
          )}

          {step === "view"   && <ViewPhrase   onNext={() => setStep("verify")} />}
          {step === "verify" && <VerifyPhrase  onNext={() => setStep("backup")} />}
          {step === "backup" && <BackupGuidance onNext={() => setStep("done")} />}

          {step === "done" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 20 }}>✅</div>
              <h1 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 32, fontWeight: 900, color: "#111", margin: "0 0 12px" }}>You're protected.</h1>
              <p style={{ fontSize: 14, color: "#a09788", lineHeight: 1.7, maxWidth: 400, marginInline: "auto", marginBottom: 28 }}>
                Your 24-word recovery phrase is set. If you ever lose all other access, entering it at <strong style={{ color: "#111" }}>enki.art/recovery</strong> restores your account immediately.
              </p>
              <div style={{ background: CREAM_CARD, border: `1px solid ${BORDER}`, borderRadius: 12, padding: "18px 22px", marginBottom: 24, textAlign: "left" as const }}>
                <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "1px", color: "#b0a898", margin: "0 0 12px" }}>KEEP IN MIND</p>
                {[
                  "Your phrase works immediately — no team review, no delay",
                  "Anyone with these 24 words can access your account",
                  "You can rotate your phrase anytime in Settings → Recovery",
                  "Consider adding guardians as an additional layer",
                ].map(tip => (
                  <div key={tip} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
                    <span style={{ color: "#9ecfac", fontWeight: 700, flexShrink: 0 }}>·</span>
                    <p style={{ fontSize: 13, color: "#4a4540", margin: 0, lineHeight: 1.5 }}>{tip}</p>
                  </div>
                ))}
              </div>
              <a href="/settings" style={{ display: "inline-block", padding: "12px 32px", background: "#111", color: "#fff", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, fontFamily: FONT }}>
                Back to Settings
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
