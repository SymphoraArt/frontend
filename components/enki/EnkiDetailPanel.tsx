"use client";

import { useMemo, useState } from "react";
import { Bookmark, Copy, Heart, Maximize, X } from "lucide-react";
import type { EnkiPromptCard } from "@/lib/enki-redesign";
import { makeFallbackArtwork } from "@/lib/enki-redesign";
import { useRouter } from "next/navigation";

export default function EnkiDetailPanel({
  prompt,
  onClose,
  faved,
  onFavorite,
}: {
  prompt: EnkiPromptCard;
  onClose: () => void;
  faved: boolean;
  onFavorite: (id: string) => void;
}) {
  const router = useRouter();
  const [vars, setVars] = useState<Record<string, string | boolean>>(
    () => Object.fromEntries(prompt.variables.map((v) => [v.name, v.value]))
  );
  const [activeVar, setActiveVar] = useState<string | null>(prompt.variables[0]?.name || null);
  const [heroIdx, setHeroIdx] = useState(0);
  const [ratio, setRatio] = useState("4:5");
  const [resolution, setResolution] = useState("2K");

  const RATIOS = ["3:4", "4:5", "1:1", "2:3", "4:3", "16:9"];
  const RESOLUTIONS = ["1K", "2K", "4K"];

  // Mock user generations for visual parity
  const userGenerations = useMemo(() => {
    return [1, 2, 3, 4, 5, 6].map((i) => ({
      art: makeFallbackArtwork(prompt.id.length * i + 100),
      label: ["2h ago", "yesterday", "3d ago", "1w ago", "2w ago", "3w ago"][i - 1],
    }));
  }, [prompt.id]);

  const heroImages = [
    { art: prompt.art, label: "Cover", kind: "cover" as const },
    ...prompt.versions.map((a, i) => ({ art: a, label: `v0${i + 1}`, kind: "artist" as const })),
    ...userGenerations.map((g, i) => ({ art: g.art, label: `run ${i + 1}`, kind: "user" as const })),
  ];

  const current = heroImages[heroIdx] || heroImages[0];
  const locked = prompt.visibility === "vars-only";

  const tokens = useMemo(() => {
    const out: { type: "t" | "v"; text?: string; name?: string }[] = [];
    let last = 0;
    const re = /\[([^\]]+)\]/g;
    let m;
    while ((m = re.exec(prompt.promptTemplate))) {
      if (m.index > last) out.push({ type: "t", text: prompt.promptTemplate.slice(last, m.index) });
      const varName = m[1].split(":")[0]?.split("=")[0]?.trim() || m[1];
      out.push({ type: "v", name: varName });
      last = m.index + m[0].length;
    }
    if (last < prompt.promptTemplate.length) out.push({ type: "t", text: prompt.promptTemplate.slice(last) });
    return out;
  }, [prompt.promptTemplate]);

  return (
    <>
      <div className="enki-overlay" onClick={onClose} />
      <aside className="enki-panel" onClick={(event) => event.stopPropagation()}>
        <button className="enki-panel-close" onClick={onClose} title="Close" type="button">
          <X size={14} />
        </button>

        <div className="enki-panel-hero-stack">
          <div className="enki-panel-hero-main">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={current.art.url} alt={prompt.title} />
            <div className="enki-hero-overlay-hint mono">
              {current.kind === "user"
                ? `Your run`
                : current.kind === "artist"
                ? `Artist version · ${current.label}`
                : "Cover"}
              <span style={{ opacity: 0.6, marginLeft: 8 }}>· click to expand</span>
            </div>
            <button className="enki-hero-maximize" title="Maximize" type="button">
              <Maximize size={14} />
            </button>
          </div>
          <div className="enki-panel-hero-thumbs">
            {heroImages.slice(0, 5).map((h, i) => (
              <div
                key={i}
                className={`enki-hero-thumb${heroIdx === i ? " active" : ""}`}
                onClick={() => setHeroIdx(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={h.art.url} alt="" />
                <div className="enki-hero-thumb-label mono">{h.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="enki-panel-body">
          <div className="enki-panel-eyebrow">
            {prompt.isVideo ? "Video prompt" : "Image prompt"} · {prompt.publishedAt} ·{" "}
            {prompt.downloads.toLocaleString()} uses
          </div>
          <h1 className="enki-panel-title serif">
            <em>{prompt.title.split(" ").slice(0, -1).join(" ")}</em> {prompt.title.split(" ").slice(-1)}
          </h1>

          <div className="enki-panel-by">
            <div className="enki-panel-avatar">{prompt.artist.avatar}</div>
            <div>
              <div className="enki-panel-by-name">
                By <strong>{prompt.artist.name}</strong>
              </div>
              <div className="enki-panel-by-meta">
                @{prompt.artist.handle} · {prompt.model}
              </div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <button
                className={`enki-icon-btn${faved ? " active" : ""}`}
                style={{ color: faved ? "var(--ember)" : "var(--ink-2)" }}
                onClick={() => onFavorite(prompt.id)}
                type="button"
              >
                <Heart size={14} fill={faved ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          <div className="enki-tag-pills">
            {prompt.tags.map((tag) => (
              <span key={tag} className="enki-tag-pill">
                {tag}
              </span>
            ))}
          </div>
          <div className="enki-rule" />

          <div className="enki-panel-section-label">
            <span>{locked ? "Variables · prompt body locked" : "The prompt"}</span>
            <span className="mono" style={{ textTransform: "none", letterSpacing: 0 }}>
              {prompt.variables.length} variables
            </span>
          </div>

          {locked ? (
            <div className="enki-vars-stack">
              {prompt.variables.map((v) => (
                <div
                  key={v.name}
                  className={`enki-var-row${activeVar === v.name ? " active" : ""}`}
                  onClick={() => setActiveVar(v.name)}
                >
                  <div className="enki-var-row-label">[{v.name}]</div>
                  {v.type === "checkbox" ? (
                    <label className="enki-var-row-checkbox" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={Boolean(vars[v.name])}
                        onChange={(e) => setVars((s) => ({ ...s, [v.name]: e.target.checked }))}
                      />
                      <span>On</span>
                    </label>
                  ) : (
                    <textarea
                      className="enki-var-row-input"
                      value={String(vars[v.name] || "")}
                      onChange={(e) => setVars((s) => ({ ...s, [v.name]: e.target.value }))}
                      onClick={(e) => e.stopPropagation()}
                      rows={1}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="enki-prompt-margin">
              <div className="enki-prompt-text serif">
                {tokens.map((tok, i) => {
                  if (tok.type === "t") return <span key={i}>{tok.text}</span>;
                  const v = prompt.variables.find((x) => x.name === tok.name);
                  if (!v) return <span key={i} className="enki-var">[{tok.name}]</span>;
                  if (v.type === "checkbox") {
                    return (
                      <span
                        key={i}
                        className={`enki-var checkbox${vars[v.name] ? " checked" : ""}${
                          activeVar === v.name ? " active" : ""
                        }`}
                        onClick={() => {
                          setActiveVar(v.name);
                          setVars((s) => ({ ...s, [v.name]: !s[v.name] }));
                        }}
                      >
                        {v.label}
                      </span>
                    );
                  }
                  return (
                    <span
                      key={i}
                      className={`enki-var${activeVar === v.name ? " active" : ""}`}
                      onClick={() => setActiveVar(v.name)}
                    >
                      {String(vars[v.name] || `[${v.name}]`)}
                    </span>
                  );
                })}
              </div>
              <div className="enki-prompt-comments">
                {prompt.variables.map((v) => (
                  <div
                    key={v.name}
                    className={`enki-comment${activeVar === v.name ? " active" : ""}`}
                    onClick={() => setActiveVar(v.name)}
                  >
                    <div className="enki-comment-name">
                      <span>[{v.name}]</span>
                      <span className="enki-comment-type">{v.type}</span>
                    </div>
                    {v.type === "checkbox" ? (
                      <label className="enki-comment-checkbox" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={Boolean(vars[v.name])}
                          onChange={(e) => setVars((s) => ({ ...s, [v.name]: e.target.checked }))}
                        />
                        {v.label}
                      </label>
                    ) : (
                      <input
                        className="enki-comment-input"
                        value={String(vars[v.name] || "")}
                        onChange={(e) => setVars((s) => ({ ...s, [v.name]: e.target.value }))}
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="enki-size-picker">
            <div className="enki-size-row">
              <span className="enki-size-label mono">Aspect</span>
              <div className="enki-size-chips">
                {RATIOS.map((r) => (
                  <button
                    key={r}
                    className={`enki-size-chip mono${ratio === r ? " active" : ""}`}
                    onClick={() => setRatio(r)}
                    type="button"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="enki-size-row">
              <span className="enki-size-label mono">Resolution</span>
              <div className="enki-size-chips">
                {RESOLUTIONS.map((r) => (
                  <button
                    key={r}
                    className={`enki-size-chip mono${resolution === r ? " active" : ""}`}
                    onClick={() => setResolution(r)}
                    type="button"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="enki-rule" />

          <div className="enki-actions">
            <button
              className="enki-btn"
              onClick={() => router.push(`/generator/${prompt.id}`)}
              type="button"
            >
              Generate · ${prompt.price.toFixed(2)}
              <span className="mono" style={{ fontSize: 10, opacity: 0.7, marginLeft: 4 }}>
                {prompt.model}
              </span>
            </button>
            <button className="enki-btn enki-btn-secondary" type="button" onClick={() => onFavorite(prompt.id)}>
              <Bookmark size={14} /> Save
            </button>
            <button 
              className="enki-btn enki-btn-secondary" 
              type="button"
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
            >
              <Copy size={12} /> Share
            </button>
          </div>

          <div className="enki-rule" />

          <div className="enki-panel-section-label">
            <span>Your generations from this prompt</span>
            <span className="mono" style={{ textTransform: "none", letterSpacing: 0 }}>
              {userGenerations.length} runs · last 30 days
            </span>
          </div>
          <div className="enki-user-gens">
            {userGenerations.map((g, i) => (
              <div
                key={i}
                className={`enki-user-gen${heroIdx === (1 + prompt.versions.length + i) ? " active" : ""}`}
                onClick={() => setHeroIdx(1 + prompt.versions.length + i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.art.url} alt="" />
                <div className="enki-user-gen-meta mono">
                  <span>{g.label}</span>
                  <span>·</span>
                  <span>${prompt.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
