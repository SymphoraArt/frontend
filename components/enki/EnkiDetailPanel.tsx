"use client";

import { useMemo, useState } from "react";
import { Bookmark, Copy, Heart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { EnkiPrompt } from "@/lib/enkiPromptAdapter";

type EnkiDetailPanelProps = {
  prompt: EnkiPrompt;
  onClose: () => void;
  faved: boolean;
  toggleFav: (id: string) => void;
};

export default function EnkiDetailPanel({ prompt, onClose, faved, toggleFav }: EnkiDetailPanelProps) {
  const router = useRouter();
  const [vars, setVars] = useState<Record<string, string | boolean>>(() =>
    Object.fromEntries(prompt.variables.map((variable) => [variable.name, variable.value]))
  );
  const [ratio, setRatio] = useState("4:5");
  const [resolution, setResolution] = useState("2K");

  const tokens = useMemo(() => {
    const out: { type: "text" | "var"; text?: string; name?: string }[] = [];
    let last = 0;
    const re = /\[(\w+)\]/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(prompt.promptTemplate))) {
      if (match.index > last) out.push({ type: "text", text: prompt.promptTemplate.slice(last, match.index) });
      out.push({ type: "var", name: match[1] });
      last = match.index + match[0].length;
    }
    if (last < prompt.promptTemplate.length) out.push({ type: "text", text: prompt.promptTemplate.slice(last) });
    return out;
  }, [prompt.promptTemplate]);

  return (
    <>
      <div className="enki-overlay" onClick={onClose} />
      <aside className="enki-panel" onClick={(event) => event.stopPropagation()}>
        <button className="enki-panel-close" onClick={onClose} title="Close" type="button">
          <X size={14} />
        </button>
        <div className="enki-panel-hero-main">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={prompt.art.url} alt={prompt.title} />
        </div>
        <div className="enki-panel-body">
          <div className="enki-panel-eyebrow">
            {prompt.isVideo ? "Video prompt" : "Image prompt"} / {prompt.publishedAt} / {prompt.downloads.toLocaleString()} uses
          </div>
          <h1 className="enki-panel-title serif">
            <em>{prompt.title}</em>
          </h1>

          <div className="enki-panel-by">
            <div className="enki-panel-avatar">{prompt.artist.avatar}</div>
            <div>
              <div>By <strong>{prompt.artist.name}</strong></div>
              <div className="mono" style={{ color: "var(--enki-ink-3)", fontSize: 11 }}>
                @{prompt.artist.handle} / {prompt.model}
              </div>
            </div>
            <button
              className={`enki-icon-btn${faved ? " active" : ""}`}
              onClick={() => toggleFav(prompt.id)}
              type="button"
              style={{ marginLeft: "auto" }}
            >
              <Heart size={14} fill={faved ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="enki-tag-pills">
            {prompt.tags.map((tag) => <span key={tag} className="enki-tag-pill">{tag}</span>)}
          </div>
          <div className="enki-rule" />

          <div className="enki-panel-section-label">
            {prompt.visibility === "vars-only" ? "Variables / prompt body locked" : "The prompt"}
          </div>
          {prompt.visibility === "vars-only" ? (
            <div className="enki-vars-stack">
              {prompt.variables.map((variable) => (
                <label key={variable.name} className="enki-var-row">
                  <span>{variable.label}</span>
                  {variable.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={Boolean(vars[variable.name])}
                      onChange={(event) => setVars((prev) => ({ ...prev, [variable.name]: event.target.checked }))}
                    />
                  ) : (
                    <input
                      className="enki-var-row-input"
                      value={String(vars[variable.name] ?? "")}
                      onChange={(event) => setVars((prev) => ({ ...prev, [variable.name]: event.target.value }))}
                    />
                  )}
                </label>
              ))}
            </div>
          ) : (
            <div className="enki-prompt-text serif">
              {tokens.map((token, index) => {
                if (token.type === "text") return <span key={index}>{token.text}</span>;
                const variable = prompt.variables.find((item) => item.name === token.name);
                return (
                  <span key={index} className="enki-var">
                    {String(vars[token.name || ""] ?? variable?.label ?? token.name)}
                  </span>
                );
              })}
            </div>
          )}

          <div className="enki-rule" />
          <div className="enki-size-picker">
            <div className="enki-size-row">
              <span className="enki-size-label mono">Aspect</span>
              <div className="enki-size-chips">
                {["3:4", "4:5", "1:1", "16:9"].map((item) => (
                  <button key={item} className={`enki-size-chip mono${ratio === item ? " active" : ""}`} onClick={() => setRatio(item)} type="button">
                    {item}
                  </button>
                ))}
              </div>
            </div>
            <div className="enki-size-row">
              <span className="enki-size-label mono">Resolution</span>
              <div className="enki-size-chips">
                {["1K", "2K", "4K"].map((item) => (
                  <button key={item} className={`enki-size-chip mono${resolution === item ? " active" : ""}`} onClick={() => setResolution(item)} type="button">
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="enki-rule" />
          <div className="enki-actions">
            <button className="enki-btn" onClick={() => router.push(`/generator/${prompt.id}`)} type="button">
              Generate / ${prompt.price.toFixed(2)}
            </button>
            <button className="enki-btn enki-btn-secondary" type="button"><Bookmark size={14} /> Save</button>
            <button className="enki-btn enki-btn-secondary" type="button"><Copy size={13} /> Share</button>
          </div>
        </div>
      </aside>
    </>
  );
}
