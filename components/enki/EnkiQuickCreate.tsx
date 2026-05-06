"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ExternalLink, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EnkiQuickCreate() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("A photograph of [subject] at [location], [mood], lit by [lighting].");
  const tokens = useMemo(() => Array.from(new Set(Array.from(prompt.matchAll(/\[(\w+)\]/g)).map((match) => match[1]))), [prompt]);

  return (
    <div className={`enki-qc${open ? " open" : ""}`}>
      <button className="enki-qc-bar" onClick={() => setOpen((value) => !value)} type="button">
        <span className="enki-qc-bar-bolt"><Zap size={12} /></span>
        <span className="serif" style={{ fontSize: 18 }}>Quick create</span>
        <span className="mono" style={{ color: "var(--enki-ink-3)", fontSize: 11 }}>
          {open ? "Click to collapse" : "Paste a prompt - wrap variables in [brackets]"}
        </span>
        <ChevronDown size={14} style={{ marginLeft: "auto", transform: open ? "rotate(180deg)" : undefined }} />
      </button>
      {open && (
        <div className="enki-qc-panel">
          <div className="enki-qc-grid">
            <div>
              <div className="enki-qc-section-label mono">Prompt template</div>
              <textarea className="enki-qc-textarea" value={prompt} onChange={(event) => setPrompt(event.target.value)} />
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 10 }}>
                {tokens.length ? tokens.map((token) => (
                  <span key={token} className="enki-tag-pill mono">[{token}]</span>
                )) : <span className="mono" style={{ color: "var(--enki-ink-3)", fontSize: 11 }}>No variables detected</span>}
              </div>
            </div>
            <div>
              <div className="enki-qc-section-label mono">Release flow</div>
              <p style={{ color: "var(--enki-ink-2)", fontSize: 13, lineHeight: 1.5, marginTop: 0 }}>
                The finished prompt editor stays in the existing merged editor. Continue there to preserve variable metadata, validation, and generation wiring.
              </p>
              <button className="enki-btn" onClick={() => router.push("/editor")} type="button">
                Open editor <ExternalLink size={13} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
