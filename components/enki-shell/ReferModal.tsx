"use client";

import { useState, useEffect } from "react";
import { Icon } from "./icons";
import { addReferral, hasReferral } from "@/lib/referrals";
import { PLATFORM_FEE_PCT, REFERRAL_SHARE_PCT } from "@/shared/revenue-config";

interface ReferModalProps {
  onClose: () => void;
  onSubmit: (r: { url: string; platform: string; note: string }) => void;
  userKey?: string | null;
}

export default function ReferModal({ onClose, onSubmit, userKey }: ReferModalProps) {
  const [url, setUrl] = useState("");
  const [note, setNote] = useState("");
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
      <div className="ek-modal" onClick={(e) => e.stopPropagation()}>
        <div className="ek-modal-head">
          <span className="ek-sheet-bolt"><Icon name="link" size={17} stroke={2} /></span>
          <span className="ek-modal-title">Refer a prompt</span>
          <button className="ek-modal-x" onClick={onClose}><Icon name="x" size={17} stroke={2} /></button>
        </div>
        <div className="ek-modal-body">
          <p style={{ fontSize: 13.5, color: "var(--enki-ink-3)", marginBottom: 10, lineHeight: 1.55 }}>
            Found a great AI image or prompt out in the wild? Drop the social link — our team reviews it and,
            if it&apos;s a fit, recreates it as a referrable prompt and credits you.
          </p>
          <p style={{ fontSize: 13.5, color: "var(--enki-ink)", fontWeight: 600, marginBottom: 16, lineHeight: 1.55 }}>
            If it goes live, we split our cut with you: you get {REFERRAL_SHARE_PCT}% of Enki&apos;s{" "}
            {PLATFORM_FEE_PCT}% fee on every sale of that prompt.
          </p>
          {!userKey && (
            <p style={{ fontSize: 12.5, color: "var(--enki-ember, #c96838)", fontWeight: 600, marginBottom: 16, lineHeight: 1.5 }}>
              Heads up: only signed-in users get the revenue split. Sign in before you submit, so we know who to pay.
            </p>
          )}
          <span className="ek-ed-lab">Social media link</span>
          <div className={"ek-refer-input" + (url && !valid ? " err" : "")}>
            <Icon name="link" size={16} stroke={2} style={{ color: "var(--enki-ink-3)", flexShrink: 0 }} />
            <input
              type="url"
              placeholder="https://x.com/…  ·  instagram.com/p/…  ·  tiktok.com/@…"
              value={url}
              onChange={(e) => { setUrl(e.target.value); setDupError(false); }}
              autoFocus
            />
            {detected && <span className="ek-refer-detected">{detected}</span>}
          </div>
          {url && !valid && <div className="ek-refer-hint">Enter a full link starting with https://</div>}
          {dupError && (
            <div className="ek-refer-hint" style={{ color: "#e0392b", fontWeight: 600 }}>
              This link was already submitted — check Settings → Referrals for its status.
            </div>
          )}

          <span className="ek-ed-lab" style={{ marginTop: 16 }}>Why is it worth adding? · optional</span>
          <textarea
            className="ek-refer-note"
            rows={3}
            placeholder="e.g. amazing cinematic lighting style, would love this as a reusable prompt…"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div className="ek-refer-steps">
            {["You submit the link", "We review & verify the source", "We rebuild it as a prompt — you're credited"].map((s, i) => (
              <div className="ek-refer-step" key={i}><span className="ek-refer-step-n">{i + 1}</span> {s}</div>
            ))}
          </div>

          <button
            className="ek-btn"
            style={{ minHeight: 50, marginTop: 4 }}
            disabled={!valid}
            onClick={() => {
              const link = url.trim();
              if (hasReferral(userKey, link)) { setDupError(true); return; }
              addReferral(userKey, { url: link, platform: detected || "Link", note: note.trim() });
              onSubmit({ url: link, platform: detected || "Link", note: note.trim() });
            }}
          >
            <Icon name="send" size={16} stroke={2} /> Submit for review
          </button>
          <p style={{ fontSize: 11.5, color: "var(--enki-ink-3)", textAlign: "center", marginTop: 12 }}>
            You&apos;ll get a message when your referral has been reviewed.
          </p>
        </div>
      </div>
    </div>
  );
}
