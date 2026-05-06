"use client";

import { useMemo, useState } from "react";
import { ChevronUp, ExternalLink, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EnkiQuickCreate() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("A photograph of [subject] at [location], [mood], lit by [lighting].");
  const tokens = useMemo(() => Array.from(new Set(Array.from(prompt.matchAll(/\[(\w+)\]/g)).map((match) => match[1]))), [prompt]);

  return (
    <div className="enki-qc">
      {/* Floating panel above the pill — only visible when open */}
      {open && (
        <div className="enki-qc-panel">
          <div className="enki-qc-grid">
            <div>
              <div className="enki-qc-section-label mono">Prompt template</div>
              <textarea className="enki-qc-textarea" value={prompt} onChange={(e) => setPrompt(e.target.value)} />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                {tokens.length ? tokens.map((t) => (
                  <span key={t} className="enki-tag-pill mono">[{t}]</span>
                )) : <span className="mono" style={{ color: "var(--enki-ink-3)", fontSize: 11 }}>No variables detected</span>}
              </div>
            </div>
            <div>
              <div className="enki-qc-section-label mono">Release flow</div>
              <p style={{ color: "var(--enki-ink-2)", fontSize: 13, lineHeight: 1.6, marginTop: 0 }}>
                The finished prompt editor stays in the existing merged editor. Continue there to preserve variable metadata, validation, and generation wiring.
              </p>
              <button className="enki-btn" onClick={() => router.push("/editor")} type="button">
                Open editor <ExternalLink size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permanent pill bar */}
      <button className="enki-qc-bar" onClick={() => setOpen((v) => !v)} type="button">
        <span className="enki-qc-bar-bolt"><Zap size={13} /></span>
        <span className="serif" style={{ fontSize: 16 }}>Quick create</span>
        <span className="mono" style={{ color: "var(--enki-ink-2)", fontSize: 11, opacity: 0.8 }}>
          {open ? "Click to collapse" : "Paste a prompt · wrap variables in [brackets]"}
        </span>
        <ChevronUp
          size={14}
          style={{ marginLeft: "auto", transform: open ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s ease" }}
        />
      </button>
    </div>
  );
}
