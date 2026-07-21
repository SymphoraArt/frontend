"use client";

/* Refer a prompt — the "Earn money" flow: drop a social link, we rebuild it
   as a prompt, referrer + original creator both earn. Slim 3-step layout
   from the "Enki Analytics" design; submit mechanics unchanged. */

import { useState, useEffect } from "react";
import { Icon } from "./icons";
import { addReferral, hasReferral } from "@/lib/referrals";
import { PLATFORM_FEE_PCT, REFERRAL_SHARE_PCT } from "@/shared/revenue-config";

const MONO = "var(--font-mono), monospace";
const SERIF = "var(--font-serif), Georgia, serif";

interface ReferModalProps {
  onClose: () => void;
  onSubmit: (r: { url: string; platform: string; note: string }) => void;
  userKey?: string | null;
}

export default function ReferModal({ onClose, onSubmit, userKey }: ReferModalProps) {
  const [url, setUrl] = useState("");
  const [dupError, setDupError] = useState(false);

  // ESC cancels/closes the refer dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { e.stopPropagation(); onClose(); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const detected = (() => {
    const u = url.toLowerCase();
    if (/x\.com|twitter\.com/.test(u)) return "X";
    if (/instagram\.com/.test(u)) return "Instagram";
    if (/tiktok\.com/.test(u)) return "TikTok";
    if (/youtube\.com|youtu\.be/.test(u)) return "YouTube";
    if (/pinterest\./.test(u)) return "Pinterest";
    if (/reddit\.com/.test(u)) return "Reddit";
    return null;
  })();
  const valid = /^https?:\/\/.+\..+/.test(url.trim());

  return (
    <div className="ek-modal-scrim" onClick={onClose}>
      <div className="ek-modal" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
        <div className="ek-modal-body" style={{ paddingTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
            <span style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(var(--ember-rgb), 0.12)", color: "var(--enki-ember)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Icon name="link" size={14} stroke={2} />
            </span>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 19, fontWeight: 700, flex: 1, color: "var(--enki-ink)" }}>Refer a prompt</span>
            <button className="ek-modal-x" onClick={onClose} aria-label="Close"><Icon name="x" size={15} stroke={2} /></button>
          </div>

          <p style={{ margin: "0 0 12px", fontSize: 12, color: "var(--enki-ink-3)", lineHeight: 1.55 }}>
            <b style={{ color: "var(--enki-ember)" }}>Earn a passive income by referring a new prompt!</b><br />
            Link work from a creator who is not on Enki yet, and we turn it into a prompt.<br />
            The creator earns from every sale, and so do you — {REFERRAL_SHARE_PCT}% of Enki&apos;s {PLATFORM_FEE_PCT}% fee.
          </p>
          {!userKey && (
            <p style={{ margin: "0 0 12px", fontSize: 11.5, color: "var(--enki-ember)", fontWeight: 600, lineHeight: 1.5 }}>
              Heads up: only signed-in users get the revenue split — sign in before you submit, so we know who to pay.
            </p>
          )}

          <span style={{ display: "block", fontFamily: MONO, fontSize: 8, letterSpacing: "0.13em", textTransform: "uppercase", color: "var(--enki-ink-3)", marginBottom: 4 }}>
            <b style={{ color: "var(--enki-ember)" }}>1</b> · Add the link
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 7, height: 34, border: "1px solid " + (url && !valid ? "#e0584f" : "var(--enki-rule)"), borderRadius: 9, background: "var(--enki-paper)", padding: "0 10px" }}>
            <Icon name="link" size={13} stroke={2} style={{ color: "var(--enki-ink-3)", flexShrink: 0 }} />
            <input
              type="url"
              placeholder="https://x.com/…  ·  instagram.com/p/…"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setDupError(false); }}
              autoFocus
              style={{ flex: 1, minWidth: 0, border: "none", background: "transparent", outline: "none", fontSize: 12, color: "var(--enki-ink)" }}
            />
            {detected && (
              <span style={{ fontFamily: MONO, fontSize: 8.5, fontWeight: 700, color: "#1F5C38", background: "#E8F8EE", borderRadius: 4, padding: "2px 6px", flexShrink: 0 }}>{detected}</span>
            )}
          </div>
          {url && !valid && <span style={{ display: "block", fontSize: 10, color: "#b33a3a", marginTop: 3 }}>Enter a full link starting with https://</span>}
          {dupError && (
            <span style={{ display: "block", fontSize: 10, color: "#b33a3a", fontWeight: 600, marginTop: 3 }}>
              This link was already submitted — check Settings → Referrals for its status.
            </span>
          )}

          <button
            title="We review and verify the source"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 7, width: "100%", minHeight: 34,
              marginTop: 12, border: "none", borderRadius: 999, cursor: valid ? "pointer" : "default",
              background: valid ? "var(--enki-ember)" : "color-mix(in oklab, var(--enki-ink-3) 55%, var(--enki-paper-2))",
              color: "#fff", fontSize: 12, fontWeight: 600,
            }}
            disabled={!valid}
            onClick={() => {
              const link = url.trim();
              if (hasReferral(userKey, link)) { setDupError(true); return; }
              addReferral(userKey, { url: link, platform: detected || "Link", note: "" });
              onSubmit({ url: link, platform: detected || "Link", note: "" });
            }}
          >
            <Icon name="send" size={12} stroke={2} /> <b>2</b> · Submit for review
          </button>
          <p style={{ margin: "8px 0 0", fontSize: 10, color: "var(--enki-ink-3)", textAlign: "center" }}>
            <b style={{ color: "var(--enki-ember)" }}>3</b> · We verify it, rebuild it as a prompt, and you get a message. You and the creator earn.
          </p>
        </div>
      </div>
    </div>
  );
}
