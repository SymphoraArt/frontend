"use client";

import { sessionAuthHeaders } from "@/lib/session-headers";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useActiveAccount } from "thirdweb/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";
import { useToast } from "@/hooks/use-toast";
import { addCreation } from "@/lib/creations";
import {
  Star,
  Share2,
  Info,
  X,
  Copy,
  Check,
  Sparkles,
  Loader2,
  Bookmark,
  BookmarkCheck,
  Download,
  Image as ImageIcon,
  MessageSquare,
  ChevronDown,
} from "lucide-react";
import "./prompt-generator.css";

/* ── Types ── */
type VarType = "text" | "checkbox" | "single-select" | "multi-select" | "slider" | "radio";

interface VariableOption {
  visibleName: string;
  promptValue: string;
}

interface PromptVariable {
  id: string;
  name: string;
  label: string;
  description?: string;
  type: VarType;
  defaultValue?: string | number | boolean | string[];
  required?: boolean;
  position?: number;
  min?: number;
  max?: number;
  options?: VariableOption[];
  allowReferenceImage?: boolean;
}

interface ShowcaseImage {
  url: string;
  thumbnail?: string;
  isPrimary?: boolean;
}

interface Props {
  promptId: string;
  title?: string;
  artistName?: string;
  artistId?: string;
  imageUrl?: string;
  showcaseImages?: ShowcaseImage[];
  isFreeShowcase?: boolean;
}

const ASPECTS = ["3:4", "4:5", "1:1", "2:3", "4:3", "16:9"];
const RESOLUTIONS = ["1K", "2K", "4K"];

function getFavs(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("prompt-favorites") || "[]"); }
  catch { return []; }
}
function setFavs(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("prompt-favorites", JSON.stringify(ids));
}

/* ── Component ── */
export default function PromptGeneratorView({
  promptId,
  title: propTitle,
  artistName: propArtistName,
  imageUrl: propImageUrl,
  showcaseImages: propShowcaseImages = [],
  isFreeShowcase: propIsFree,
}: Props) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  /* Auth */
  const account = useActiveAccount();
  const { publicKey: solanaPublicKey } = useWallet();
  const { address: turnkeyAddress } = useTurnkeyEmailAuth();
  const userKey = useMemo(
    () => account?.address ?? solanaPublicKey?.toBase58() ?? turnkeyAddress ?? null,
    [account?.address, solanaPublicKey, turnkeyAddress]
  );

  /* State */
  const [vars, setVars] = useState<Record<string, string>>({});
  const [aspect, setAspect] = useState("4:5");
  const [resolution, setResolution] = useState("2K");
  const [generator, setGenerator] = useState("Nano Banana Pro");
  const [refs, setRefs] = useState<string[]>([]);
  const [fav, setFav] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeThumb, setActiveThumb] = useState(0);
  const [thumbOffset, setThumbOffset] = useState(0);
  const [activeTab, setActiveTab] = useState<"comments" | "reviews">("comments");
  const [localHistory, setLocalHistory] = useState<string[]>([]);
  const [savedToGallery, setSavedToGallery] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  /* Fetch available models from DB */
  const { data: modelsData } = useQuery<Array<{ id?: string; name?: string }>>({
    queryKey: ["/api/models"],
    queryFn: async () => {
      const res = await fetch("/api/models", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
  const GENERATORS = useMemo(() => {
    const fromDb = (modelsData ?? [])
      .map((m) => (typeof m.name === "string" ? m.name : ""))
      .filter(Boolean);
    return fromDb.length > 0
      ? fromDb
      : ["Nano Banana Pro", "Seedream 5.0 lite (coming soon)", "GPT-Image-2 (coming soon)"];
  }, [modelsData]);

  useEffect(() => {
    if (GENERATORS.length > 0 && !GENERATORS.includes(generator)) {
      setGenerator(GENERATORS[0]);
    }
  }, [GENERATORS, generator]);

  /* Fetch prompt */
  const { data: promptData, isLoading: loading } = useQuery<{
    prompt?: {
      _id?: string; id?: string; title?: string;
      type?: string; prompt_type?: string;
      is_free_showcase?: boolean; price?: number; tags?: string[];
      content?: string; created_at?: string; creator?: string;
      publicPromptText?: string; showcaseImages?: ShowcaseImage[];
      promptData?: { variables?: PromptVariable[] };
    };
  }>({
    queryKey: [`/api/prompts/${promptId}`],
    enabled: !!promptId,
  });

  const prompt = promptData?.prompt;
  const variables = useMemo(() => prompt?.promptData?.variables || [], [prompt]);
  const title = prompt?.title || propTitle || "Untitled Prompt";
  const artistName = propArtistName || "Unknown Artist";
  const isFree =
    prompt?.prompt_type === "showcase" ||
    prompt?.prompt_type === "free-prompt" ||
    prompt?.is_free_showcase === true ||
    propIsFree ||
    false;
  const price = prompt?.price ?? 0;
  const tags = prompt?.tags?.length ? prompt.tags : [];
  const showcaseImages = prompt?.showcaseImages?.length ? prompt.showcaseImages : propShowcaseImages;
  const mainImage = showcaseImages[0]?.thumbnail || showcaseImages[0]?.url || propImageUrl || "";
  const promptText = prompt?.publicPromptText || "";

  /* Fetch user's generations — API returns { data: { generations, total } } via createSuccessResponse */
  const genQueryKey = ["user-generations", userKey, promptId];
  const { data: genData } = useQuery<{
    data?: { generations?: Array<{ id: string; image_urls?: string[]; created_at: string; prompt_id?: string }> };
    generations?: Array<{ id: string; image_urls?: string[]; created_at: string; prompt_id?: string }>;
  }>({
    queryKey: genQueryKey,
    queryFn: async () => {
      if (!userKey) return {};
      const res = await fetch(`/api/generations?userId=${encodeURIComponent(userKey)}&limit=20`);
      return res.ok ? res.json() : {};
    },
    enabled: !!userKey,
    staleTime: 30_000,
  });

  const dbHistory = useMemo(() => {
    const gens = genData?.data?.generations ?? genData?.generations ?? [];
    return (gens as Array<{ id: string; image_urls?: string[]; created_at: string }>)
      .filter(g => g.image_urls?.length)
      .flatMap(g => g.image_urls as string[]);
  }, [genData]);

  /* Merge local (immediate) + DB history, deduplicate, cap at 20 */
  const history = useMemo(() => {
    const seen = new Set<string>();
    return [...localHistory, ...dbHistory].filter(url => {
      if (seen.has(url)) return false;
      seen.add(url);
      return true;
    }).slice(0, 20);
  }, [localHistory, dbHistory]);

  /* Init */
  useEffect(() => { setFav(getFavs().includes(promptId)); }, [promptId]);
  useEffect(() => {
    if (variables.length) {
      const init: Record<string, string> = {};
      variables.forEach(v => {
        if (v.type === "checkbox") {
          init[v.name] = v.defaultValue ? "true" : "false";
        } else if (v.type === "slider") {
          init[v.name] = String(v.defaultValue ?? v.min ?? 0);
        } else if (v.type === "single-select" || v.type === "radio") {
          const defOpt = v.options?.[0]?.promptValue ?? "";
          init[v.name] = v.defaultValue != null ? String(v.defaultValue) : defOpt;
        } else if (v.type === "multi-select") {
          init[v.name] = "";
        } else {
          init[v.name] = v.defaultValue != null ? String(v.defaultValue) : "";
        }
      });
      setVars(init);
    }
  }, [variables]);

  /* Handlers */
  const toggleFav = useCallback(() => {
    const list = getFavs();
    setFavs(fav ? list.filter(id => id !== promptId) : [...list, promptId]);
    setFav(p => !p);
    toast({ title: fav ? "Removed from favorites" : "Saved to favorites" });
  }, [fav, promptId, toast]);

  const copyPrompt = useCallback(() => {
    if (!promptText) return;
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [promptText]);

  const onRefUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const remaining = 10 - refs.length;
    Array.from(files).slice(0, remaining).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => setRefs(prev => prev.length >= 10 ? prev : [...prev, ev.target?.result as string]);
      reader.readAsDataURL(file);
    });
    if (fileRef.current) fileRef.current.value = "";
  }, [refs.length]);

  const removeRef = useCallback((i: number) => setRefs(prev => prev.filter((_, idx) => idx !== i)), []);

  const onVarChange = useCallback((name: string, value: string) => {
    setVars(prev => ({ ...prev, [name]: value }));
  }, []);

  const generate = useCallback(async () => {
    setGenerating(true);
    setResultUrl(null);
    try {
      /* 1. Build final prompt text */
      // Resolve each variable's raw string value → prompt value
      const resolvedVars: Record<string, string> = {};
      variables.forEach(v => {
        const raw = vars[v.name] ?? "";
        if (v.type === "checkbox") {
          // checkbox: if true, use label as prompt value; if false, use empty
          resolvedVars[v.name] = raw === "true" ? (v.label || v.name) : "";
        } else if (v.type === "multi-select" && v.options) {
          // multi-select: raw is comma-joined promptValues already
          resolvedVars[v.name] = raw;
        } else if ((v.type === "single-select" || v.type === "radio") && v.options) {
          // single-select/radio: raw IS the promptValue already
          resolvedVars[v.name] = raw;
        } else {
          resolvedVars[v.name] = raw;
        }
      });

      let final = "";
      if (isFree && promptText) {
        final = promptText;
        Object.entries(resolvedVars).forEach(([k, v]) => {
          if (v) final = final.replace(new RegExp(`\\[${k}\\]`, "gi"), v);
        });
      } else {
        final = title || "A beautiful artistic image";
        const filled = Object.entries(resolvedVars)
          .filter(([, v]) => v)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", ");
        if (filled) final = `${final}, ${filled}`;
      }

      /* 2. Generate image */
      const res = await fetch("/api/generate-free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: final.trim(), aspectRatio: aspect, resolution }),
      });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || "Generation failed"); }
      const data = await res.json();
      if (!data.imageUrl) throw new Error("No image returned");
      setResultUrl(data.imageUrl);
      setSavedToGallery(false);
      /* Immediately add to local history so it shows up regardless of auth type */
      setLocalHistory(prev => [data.imageUrl, ...prev].slice(0, 20));
      setActiveThumb(0);

      /* 3. Persist to local gallery */
      if (userKey) {
        addCreation(userKey, { id: `gen-${Date.now()}`, imageUrl: data.imageUrl, prompt: final, createdAt: new Date().toISOString() });
        window.dispatchEvent(new Event("gallery-refresh"));
      }

      /* 4. Persist to Supabase: POST record, then PATCH image_urls */
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (userKey && isUuid.test(userKey)) {
        try {
          const postRes = await fetch("/api/generations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: userKey,
              promptId,
              encryptedPrompt: final,
              variableValues: Object.entries(vars).map(([k, v]) => ({ variableName: k, value: v })),
              settings: { aspectRatio: aspect, resolution, referenceImageCount: refs.length },
            }),
          });
          if (postRes.ok) {
            const postData = await postRes.json();
            const genId = postData?.data?.generationId ?? postData?.generationId;
            if (genId) {
              /* PATCH image_urls + mark completed */
              await fetch(`/api/generations/${genId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", ...sessionAuthHeaders() },
                body: JSON.stringify({
                  status: "completed",
                  imageUrls: [data.imageUrl],
                  completedAt: new Date().toISOString(),
                }),
              });
            }
          }
        } catch { /* non-critical */ }
        /* Refetch history panel */
        queryClient.invalidateQueries({ queryKey: genQueryKey });
      }

      toast({ title: "Image Generated!", description: `Generated using ${data.provider || "AI"}` });
    } catch (e: any) {
      toast({ title: "Generation Failed", description: e.message, variant: "destructive" });
    } finally { setGenerating(false); }
  }, [isFree, promptText, vars, title, aspect, resolution, userKey, promptId, refs.length, toast, queryClient, genQueryKey]);

  const download = useCallback(() => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl; a.download = `generated-${Date.now()}.png`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }, [resultUrl]);

  if (loading) {
    return (
      <div className="pgv-page">
        <div className="pgv-loading"><Loader2 size={20} className="pgv-spinner" /> Loading prompt…</div>
      </div>
    );
  }

  const displayImage = resultUrl || mainImage;
  const allImages = resultUrl
    ? [{ url: resultUrl, thumbnail: resultUrl }, ...showcaseImages]
    : showcaseImages;
  const visibleThumbs = allImages.slice(thumbOffset, thumbOffset + 6);

  return (
    <div className="pgv-page">
      {/* ═══ LEFT SIDEBAR ═══ */}
      <aside className="pgv-sidebar">
        <div className="pgv-sidebar-scroll">
          {/* Title + meta */}
          <div className="pgv-sidebar-header">
            <h1>{title}</h1>
            <div className="pgv-meta-row">
              <span className="pgv-star-badge"><Star size={11} fill="currentColor" /> 4.9</span>
              <button className="pgv-icon-btn"><Share2 size={12} /></button>
              <button className="pgv-icon-btn"><Bookmark size={12} fill={fav ? "currentColor" : "none"} /></button>
            </div>
          </div>

          {/* Free: show prompt text */}
          {isFree && promptText && (
            <div className="pgv-block">
              <span className="pgv-section-label">Prompt · Free</span>
              <textarea className="pgv-prompt-area" value={promptText} readOnly rows={4} />
              <button onClick={copyPrompt} style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#666", background: "none", border: "none", cursor: "pointer" }}>
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copied" : "Copy prompt"}
              </button>
            </div>
          )}

          {/* Variable inputs — type-aware, one block per variable */}
          {variables.map(v => (
            <div key={v.id || v.name} className="pgv-block">
              <span className="pgv-section-label">{v.label || v.name}</span>

              {/* TEXT */}
              {v.type === "text" && (
                <input
                  className="pgv-input"
                  value={vars[v.name] || ""}
                  onChange={e => onVarChange(v.name, e.target.value)}
                  placeholder={v.defaultValue ? String(v.defaultValue) : `Enter ${(v.label || v.name).toLowerCase()}…`}
                />
              )}

              {/* CHECKBOX */}
              {v.type === "checkbox" && (
                <label className="pgv-check-row">
                  <input
                    type="checkbox"
                    checked={vars[v.name] === "true"}
                    onChange={e => onVarChange(v.name, e.target.checked ? "true" : "false")}
                  />
                  {v.description || v.label}
                </label>
              )}

              {/* SINGLE-SELECT */}
              {v.type === "single-select" && v.options && (
                <select
                  className="pgv-generator-select"
                  value={vars[v.name] || ""}
                  onChange={e => onVarChange(v.name, e.target.value)}
                >
                  {v.options.map((opt, i) => (
                    <option key={i} value={opt.promptValue}>{opt.visibleName}</option>
                  ))}
                </select>
              )}

              {/* RADIO */}
              {v.type === "radio" && v.options && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                  {v.options.map((opt, i) => (
                    <label key={i} className="pgv-check-row">
                      <input
                        type="radio"
                        name={v.name}
                        value={opt.promptValue}
                        checked={vars[v.name] === opt.promptValue}
                        onChange={() => onVarChange(v.name, opt.promptValue)}
                        style={{ accentColor: "var(--pgv-accent)" }}
                      />
                      {opt.visibleName}
                    </label>
                  ))}
                </div>
              )}

              {/* MULTI-SELECT */}
              {v.type === "multi-select" && v.options && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                  {v.options.map((opt, i) => {
                    const selected = (vars[v.name] || "").split(",").filter(Boolean);
                    const checked = selected.includes(opt.promptValue);
                    return (
                      <label key={i} className="pgv-check-row">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={e => {
                            const next = e.target.checked
                              ? [...selected, opt.promptValue]
                              : selected.filter(s => s !== opt.promptValue);
                            onVarChange(v.name, next.join(","));
                          }}
                        />
                        {opt.visibleName}
                      </label>
                    );
                  })}
                </div>
              )}

              {/* SLIDER */}
              {v.type === "slider" && (
                <div style={{ marginTop: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#888", marginBottom: 4 }}>
                    <span>{v.min ?? 0}</span>
                    <span style={{ color: "#ddd", fontWeight: 600 }}>{vars[v.name] ?? v.defaultValue ?? v.min ?? 0}</span>
                    <span>{v.max ?? 100}</span>
                  </div>
                  <input
                    type="range"
                    min={v.min ?? 0}
                    max={v.max ?? 100}
                    step={1}
                    value={Number(vars[v.name] ?? v.defaultValue ?? v.min ?? 0)}
                    onChange={e => onVarChange(v.name, e.target.value)}
                    style={{ width: "100%", accentColor: "var(--pgv-accent)" }}
                  />
                </div>
              )}
            </div>
          ))}

          {/* Style Preset */}
          <div className="pgv-block">
            <span className="pgv-section-label">Style Preset</span>
            <input className="pgv-input" defaultValue="Minimal Brutalism" placeholder="e.g. Minimal Brutalism" />
          </div>

          {/* Camera / Lens */}
          <div className="pgv-block">
            <span className="pgv-section-label">Camera / Lens</span>
            <input className="pgv-input" defaultValue="35mm" placeholder="e.g. 35mm" />
          </div>

          {/* Detail options checkboxes */}
          <div className="pgv-block">
            <span className="pgv-section-label">Detail Options</span>
            <label className="pgv-check-row">
              <input type="checkbox" defaultChecked /> Keep brutalist geometry
            </label>
            <label className="pgv-check-row">
              <input type="checkbox" defaultChecked /> Boost concrete textures
            </label>
          </div>

          {/* Reference Images */}
          <div className="pgv-block">
            <div className="pgv-ref-header">
              <span className="pgv-section-label" style={{ marginBottom: 0 }}>Reference Images</span>
              <span className="pgv-ref-count">{refs.length}/10</span>
            </div>
            {refs.length > 0 && (
              <div className="pgv-ref-grid">
                {refs.map((img, idx) => (
                  <div key={idx} className="pgv-ref-slot filled">
                    <img src={img} alt={`ref ${idx + 1}`} />
                    <button className="pgv-ref-remove" onClick={() => removeRef(idx)}>
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {refs.length < 10 && (
              <button className="pgv-ref-add-btn" onClick={() => fileRef.current?.click()}>
                <span className="pgv-ref-add-icon">+</span>
                Add Reference Images
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={onRefUpload} />
          </div>

          {/* Image Settings: aspect + resolution side by side */}
          <div className="pgv-block">
            <span className="pgv-section-label">Image Settings</span>
            <div className="pgv-img-settings">
              <div>
                <label>Aspect Ratio</label>
                <select value={aspect} onChange={e => setAspect(e.target.value)}>
                  {ASPECTS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label>Resolution</label>
                <select value={resolution} onChange={e => setResolution(e.target.value)}>
                  {RESOLUTIONS.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Generator dropdown */}
          <div className="pgv-block">
            <span className="pgv-section-label">Generator</span>
            <select className="pgv-generator-select" value={generator} onChange={e => setGenerator(e.target.value)}>
              {GENERATORS.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
        </div>

        {/* ── Sticky footer: Generate button ── */}
        <div className="pgv-sidebar-footer">
          <button className="pgv-generate-btn" onClick={generate} disabled={generating}>
            {generating ? <Loader2 size={16} className="pgv-spinner" /> : <Sparkles size={15} />}
            Generate / ${(price ? price / 100 : 10.00).toFixed(2)}
          </button>
        </div>
      </aside>

      {/* ═══ CENTER ═══ */}
      <main className="pgv-center">
        {/* Main image */}
        <div className="pgv-main-image">
          {generating && (
            <div className="pgv-overlay-generating">
              <Loader2 size={36} className="pgv-spinner" />
              <span>Generating…</span>
            </div>
          )}
          {displayImage
            ? <img src={displayImage} alt={title} onClick={() => setLightbox(displayImage)} style={{ cursor: "pointer" }} />
            : <ImageIcon size={56} color="#333" />
          }
          {/* Action buttons — appear on hover when result is ready */}
          {resultUrl && !generating && (
            <div className="pgv-image-actions">
              <button
                className={`pgv-img-action-btn ${savedToGallery ? "saved" : ""}`}
                onClick={() => {
                  if (!savedToGallery) {
                    if (userKey) {
                      addCreation(userKey, { id: `gen-${Date.now()}`, imageUrl: resultUrl, prompt: title, createdAt: new Date().toISOString() });
                      window.dispatchEvent(new Event("gallery-refresh"));
                    }
                    setSavedToGallery(true);
                    toast({ title: "Saved to Gallery" });
                  }
                }}
              >
                {savedToGallery ? <Check size={13} /> : <Bookmark size={13} />}
                {savedToGallery ? "Saved" : "Save to Gallery"}
              </button>
              <button
                className="pgv-img-action-btn"
                onClick={download}
              >
                <Download size={13} />
                Download
              </button>
            </div>
          )}
        </div>

        {/* Thumbnail strip with arrows */}
        <div className="pgv-thumb-row">
          <button
            className="pgv-thumb-arrow"
            onClick={() => setThumbOffset(o => Math.max(0, o - 1))}
            disabled={thumbOffset === 0}
          >
            <ChevronDown size={14} style={{ transform: "rotate(90deg)" }} />
          </button>

          <div className="pgv-thumb-strip">
            {visibleThumbs.map((img, idx) => {
              const absIdx = thumbOffset + idx;
              return (
                <div
                  key={absIdx}
                  className={`pgv-thumb-item ${activeThumb === absIdx ? "active" : ""}`}
                  onClick={() => { setActiveThumb(absIdx); }}
                >
                  {(img.thumbnail || img.url)
                    ? <img src={img.thumbnail || img.url} alt="" />
                    : <span style={{ fontSize: 9, color: "#444" }}>v{absIdx + 1}</span>
                  }
                  {absIdx === 0 && resultUrl && (
                    <span className="pgv-thumb-status success">✓</span>
                  )}
                </div>
              );
            })}
          </div>

          <button
            className="pgv-thumb-arrow"
            onClick={() => setThumbOffset(o => Math.min(allImages.length - 1, o + 1))}
            disabled={thumbOffset + 6 >= allImages.length}
          >
            <ChevronDown size={14} style={{ transform: "rotate(-90deg)" }} />
          </button>
        </div>

        {/* Comments / Reviews tabs */}
        <div className="pgv-center-tabs">
          <button
            className={`pgv-center-tab ${activeTab === "comments" ? "active" : ""}`}
            onClick={() => setActiveTab("comments")}
          >
            <MessageSquare size={13} />
            Comments
            <span className="pgv-center-tab-sub">(Image)</span>
          </button>
          <button
            className={`pgv-center-tab ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            <Star size={13} />
            Reviews
            <span className="pgv-center-tab-sub">(Requires Purchase)</span>
          </button>
        </div>
      </main>

      {/* ═══ RIGHT HISTORY ═══ */}
      <aside className="pgv-history">
        <div className="pgv-history-header">
          <span>Your History</span>
          <button><X size={12} /></button>
        </div>
        <div className="pgv-history-list">
          {history.length === 0 && (
            <div className="pgv-history-empty">
              Generate an image<br />to see it here
            </div>
          )}
          {history.map((url, idx) => (
            <div
              key={idx}
              className="pgv-history-item"
              onClick={() => setLightbox(url)}
            >
              <img src={url} alt="" />
              <span className="pgv-history-status success">✓</span>
            </div>
          ))}
        </div>
        {history.length > 5 && (
          <div className="pgv-history-scroll-hint">
            <ChevronDown size={12} />
          </div>
        )}
      </aside>

      {/* Lightbox */}
      {lightbox && (
        <div className="pgv-lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Expanded" />
          <button className="pgv-lightbox-close" onClick={() => setLightbox(null)}>
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
