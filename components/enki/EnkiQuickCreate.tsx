"use client";

import { useMemo, useState } from "react";
import { ChevronUp, PenSquare, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EnkiQuickCreate() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("A photograph of [subject] at [location], [mood], lit by [lighting].");
  const tokens = useMemo(() => Array.from(new Set(Array.from(prompt.matchAll(/\[(\w+)\]/g)).map((m) => m[1]))), [prompt]);

  return (
    <div className="enki-qc">
      {/* Panel — floats above the pill */}
      {open && (
        <div className="enki-qc-panel">
          <div className="enki-qc-section-label mono">Prompt template</div>
          <textarea
            className="enki-qc-textarea"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your image…"
          />
          {tokens.length > 0 && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 8 }}>
              {tokens.map((t) => (
                <span key={t} className="enki-tag-pill mono">[{t}]</span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Pill bar — always visible */}
      <div className="enki-qc-bar">
        <span className="enki-qc-bar-bolt"><Sparkles size={14} /></span>
        <span style={{ fontFamily: "var(--font-sora), sans-serif", fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em" }}>Quick Create</span>
        <span className="mono" style={{ color: "var(--enki-ink-3)", fontSize: 11, marginLeft: 8 }}>
          {open ? "wrap variables in [brackets]" : ""}
        </span>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          {/* Prompt Editor button */}
          <button
            onClick={() => router.push("/editor")}
            className="enki-qc-editor-btn"
            type="button"
          >
            <PenSquare size={12} />
            Prompt Editor
          </button>

          {/* Toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="enki-qc-toggle-btn"
            type="button"
            aria-label={open ? "Collapse" : "Expand"}
          >
            <ChevronUp
              size={13}
              style={{ transform: open ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s ease" }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
