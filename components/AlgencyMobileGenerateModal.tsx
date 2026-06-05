import React, { useEffect, useMemo, useRef, useState } from "react";
import { X, Sparkles, Plus, ImageIcon, Ratio, Maximize2, Copy, Settings, FileText, CheckCircle2 } from "lucide-react";
import { getVariableColors } from "../lib/variableColors";
import "../app/editor/mobile-modal.css"; // We will create this next

const CATEGORY_OPTIONS = [
  { value: "portrait", label: "Portrait" },
  { value: "character", label: "Character" },
  { value: "landscape", label: "Landscape" },
  { value: "abstract", label: "Abstract" },
  { value: "anime", label: "Anime" },
  { value: "3d-render", label: "3D Render" },
  { value: "photography", label: "Photography" },
  { value: "concept-art", label: "Concept Art" },
  { value: "logo", label: "Logo" },
  { value: "product", label: "Product" },
];

interface PromptVariable {
  id: string;
  name: string;
  label: string;
  type: string;
  defaultValue: string | boolean;
  values: string[];
  colorIndex?: number;
}

/**
 * Editable prompt field that highlights `[variable]` tokens in colour,
 * mirroring the prompt editor. A transparent textarea sits on top of a
 * colour backdrop so the caret/typing stays native while the tokens get
 * their pastel pills. Both layers share identical typography (via the
 * `.mobile-modal-hl-*` classes) so the text aligns pixel-for-pixel.
 */
function HighlightedPromptInput({
  value,
  onChange,
  placeholder,
  variables,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  variables: PromptVariable[];
}) {
  const taRef = useRef<HTMLTextAreaElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const colorByToken = useMemo(() => {
    const map: Record<string, ReturnType<typeof getVariableColors>> = {};
    variables.forEach((v, i) => {
      map[`[${v.name}]`] = getVariableColors(
        typeof v.colorIndex === "number" ? v.colorIndex : i
      );
    });
    return map;
  }, [variables]);

  const syncScroll = () => {
    if (backRef.current && taRef.current) {
      backRef.current.scrollTop = taRef.current.scrollTop;
      backRef.current.scrollLeft = taRef.current.scrollLeft;
    }
  };

  const parts = value.split(/(\[[^\]\n]+\])/g);

  return (
    <div className="mobile-modal-hl-wrap">
      <div className="mobile-modal-hl-backdrop" ref={backRef} aria-hidden="true">
        {parts.map((part, i) => {
          const colors = /^\[[^\]\n]+\]$/.test(part) ? colorByToken[part] : null;
          if (colors) {
            return (
              <span
                key={i}
                className="mobile-modal-hl-pill"
                style={{
                  background: colors.bg,
                  color: colors.text,
                  boxShadow: `inset 0 0 0 1px ${colors.border}`,
                }}
              >
                {part}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
        {"\n"}
      </div>
      <textarea
        ref={taRef}
        className="mobile-modal-hl-textarea"
        value={value}
        placeholder={placeholder}
        spellCheck={false}
        onChange={(e) => onChange(e.target.value)}
        onScroll={syncScroll}
      />
    </div>
  );
}

interface AlgencyMobileGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptBody: string;
  setPromptBody?: (val: string) => void;
  variables: PromptVariable[];
  onVariableChange?: (id: string, val: string) => void;
  onAddVariable?: () => void;
  onRemoveVariable?: (name: string) => void;
  models: { available: any[], selected: string[] };
  setModel?: (id: string) => void;
  ratios: { available: string[], selected: string };
  setRatio?: (val: string) => void;
  pricePerSlot: number;
  onGenerate: () => void;
  onAutoFill?: () => void;
  isAutoFilling?: boolean;
  /* Feed launcher additions (all optional → editor usage unchanged):
     hide the Release tab and surface reference-image inputs. */
  hideReleaseTab?: boolean;
  referenceImages?: string[];
  onAddReferenceImages?: (files: FileList) => void;
  onRemoveReferenceImage?: (index: number) => void;
  generateLabel?: string;
  /* Freshly generated images to surface ABOVE the sheet (newest first). */
  resultImages?: string[];
  isGenerating?: boolean;
  /* Release flow: how many verified variations are required before publishing.
     Defaults to 1 for free prompts, 4 for paid. onRelease fires the publish action. */
  requiredVariations?: number;
  onRelease?: () => void;
  /* Editor left-column settings (all optional → fall back to internal state).
     Provided by AlgencyPromptEditor so the mobile Settings tab mirrors the browser editor. */
  title?: string;
  setTitle?: (v: string) => void;
  promptType?: string;
  setPromptType?: (v: string) => void;
  tags?: string[];
  onAddTag?: (t: string) => void;
  onRemoveTag?: (t: string) => void;
  price?: number;
  setPrice?: (v: number) => void;
  /* Multi-select model toggle (editor). Falls back to single-select via setModel. */
  onToggleModel?: (id: string) => void;
  /* Desktop only: opens the full /editor instead of showing the Release flow. */
  onOpenPromptEditor?: () => void;
  /* Account balance in USD (already abstracted away from any chain) + a way to
     top it up. When provided, the footer frames spend as "from your balance"
     and surfaces an "Add funds" action instead of any crypto wording. */
  balance?: number | null;
  onTopUp?: () => void;
}

/**
 * Compact single-select used in the footer settings row. Unlike a native
 * <select>, the options panel is rendered inside the modal and opens UPWARD,
 * so it never spills outside the sheet frame (desktop or mobile).
 */
function MiniSelect({
  value,
  options,
  onChange,
  icon,
  title,
  maxWidth,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
  icon?: React.ReactNode;
  title?: string;
  maxWidth?: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const current = options.find((o) => o.value === value);

  return (
    <div className="mobile-modal-setting" title={title}>
      {icon}
      <div className="mobile-modal-minisel" ref={ref}>
        <button
          type="button"
          className="mobile-modal-select mobile-modal-select--mini mobile-modal-minisel-trigger"
          style={maxWidth ? { maxWidth } : undefined}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="mobile-modal-minisel-value">{current?.label ?? value}</span>
        </button>
        {open && (
          <div className="mobile-modal-minisel-panel" role="listbox">
            {options.map((o) => (
              <button
                key={o.value}
                type="button"
                role="option"
                aria-selected={o.value === value}
                className={`mobile-modal-minisel-opt ${o.value === value ? "active" : ""}`}
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
              >
                {o.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AlgencyMobileGenerateModal({
  isOpen,
  onClose,
  promptBody,
  setPromptBody,
  variables,
  onVariableChange,
  onAddVariable,
  onRemoveVariable,
  models,
  setModel,
  ratios,
  setRatio,
  pricePerSlot,
  onGenerate,
  onAutoFill,
  isAutoFilling = false,
  hideReleaseTab = false,
  referenceImages,
  onAddReferenceImages,
  onRemoveReferenceImage,
  generateLabel,
  resultImages,
  isGenerating = false,
  requiredVariations,
  onRelease,
  title,
  setTitle,
  promptType,
  setPromptType,
  tags,
  onAddTag,
  onRemoveTag,
  price,
  setPrice,
  onToggleModel,
  onOpenPromptEditor,
  balance,
  onTopUp,
}: AlgencyMobileGenerateModalProps) {
  const [activeTab, setActiveTab] = useState<"Generate" | "Release">("Generate");
  const [releaseSection, setReleaseSection] = useState<"settings" | "prompt" | "verify">("settings");
  const [isDesktop, setIsDesktop] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  /* Release "Preferred Models" multi-select. When the parent wires a real
     multi-select handler (editor → onToggleModel) we defer to it; otherwise
     (feed launcher) we keep selection locally so it's still multiple-choice. */
  const [internalPrefModels, setInternalPrefModels] = useState<string[]>(() => models.selected);
  const [genResolution, setGenResolution] = useState("2K");
  const [genCount, setGenCount] = useState("x 1");
  const prefModels = onToggleModel ? models.selected : internalPrefModels;
  const togglePrefModel = (id: string) => {
    if (onToggleModel) {
      onToggleModel(id);
      return;
    }
    setInternalPrefModels((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Close on Escape while open
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);
  type Variation = {
    model: string;
    ratio: string;
    resolution: string;
    vars: { name: string; value: string }[];
    refs: string[];
    prompt: string;
  };
  const [variations, setVariations] = useState<Variation[]>([]);
  /* The prompt template the queued Verify images were composed from. While
     images exist, editing the prompt away from this triggers a reset warning. */
  const [committedPrompt, setCommittedPrompt] = useState<string | null>(null);
  const [verifyDialog, setVerifyDialog] = useState<
    null | { kind: "duplicate" } | { kind: "prompt-change"; pending: string }
  >(null);
  const [varTypes, setVarTypes] = useState<Record<string, "text" | "bool">>({});
  const refInputRef = useRef<HTMLInputElement>(null);

  // Internal fallbacks for editor settings when the parent doesn't supply them (e.g. feed launcher)
  const [localTitle, setLocalTitle] = useState("");
  const [localType, setLocalType] = useState("free-prompt");
  const [localTags, setLocalTags] = useState<string[]>([]);
  const [localPrice, setLocalPrice] = useState(0);

  if (!isOpen) return null;

  const titleVal = title ?? localTitle;
  const onTitle = setTitle ?? setLocalTitle;
  const typeVal = promptType ?? localType;
  const onType = setPromptType ?? setLocalType;
  const tagsVal = tags ?? localTags;
  const addTagFn = onAddTag ?? ((t: string) => setLocalTags((p) => (p.includes(t) ? p : [...p, t])));
  const removeTagFn = onRemoveTag ?? ((t: string) => setLocalTags((p) => p.filter((x) => x !== t)));
  const priceVal = price ?? localPrice;
  const onPrice = setPrice ?? setLocalPrice;
  const showReferenceImages = typeof onAddReferenceImages === "function";
  // Web has no Release flow — it offers a "Prompt editor" button instead.
  const showRelease = !hideReleaseTab && !isDesktop;
  const tab: "Generate" | "Release" = showRelease ? activeTab : "Generate";
  const reqVars = requiredVariations ?? (pricePerSlot > 0 ? 4 : 1);
  const variationsDone = variations.length;
  const releaseReady = variationsDone >= reqVars;

  const snapshotVars = () =>
    variables.map((v) => ({
      name: v.name,
      value: String((v.values && v.values[0]) || v.defaultValue || ""),
    }));
  const currentRefs = () => referenceImages ?? [];

  /* Signature of a "pack input": variable values + reference images. Used to
     detect a redundant pack (nothing changed since an existing image). */
  const packSig = (vars: { name: string; value: string }[], refs: string[]) =>
    JSON.stringify({ vars: vars.map((v) => `${v.name}=${v.value}`), refs });

  const commitPack = () => {
    const vars = snapshotVars();
    const refs = currentRefs();
    setVariations((prev) => [
      ...prev,
      {
        model: models.selected[0] || "",
        ratio: ratios.selected || "1:1",
        resolution: "2K",
        vars,
        refs,
        prompt: promptBody,
      },
    ]);
    setCommittedPrompt(promptBody);
  };

  const packToVerify = () => {
    const sig = packSig(snapshotVars(), currentRefs());
    const isDuplicate = variations.some((v) => packSig(v.vars, v.refs) === sig);
    if (isDuplicate) {
      setVerifyDialog({ kind: "duplicate" });
      return;
    }
    commitPack();
  };

  const updateVariation = (i: number, patch: Partial<Variation>) =>
    setVariations((v) => v.map((x, idx) => (idx === i ? { ...x, ...patch } : x)));
  const removeVariation = (i: number) =>
    setVariations((v) => {
      const next = v.filter((_, idx) => idx !== i);
      if (next.length === 0) setCommittedPrompt(null);
      return next;
    });

  /* Editing the prompt template after images are queued changes the whole
     composition → confirm. Reset wipes Verify; cancel reverts the prompt. */
  const handleReleasePromptChange = (val: string) => {
    if (!setPromptBody) return;
    if (variations.length > 0 && committedPrompt !== null && val !== committedPrompt) {
      setVerifyDialog({ kind: "prompt-change", pending: val });
      return;
    }
    setPromptBody(val);
  };

  // Helper to render prompt with pills
  const renderPromptWithPills = () => {
    // Only detect [square bracket] variables as pills
    const parts = promptBody.split(/(\[[a-z_0-9]+\])/gi);
    return (
      <div className="mobile-modal-prompt-text">
        {parts.map((part, index) => {
          if (part.match(/^\[[a-z_0-9]+\]$/i)) {
            return (
              <span key={index} className="mobile-modal-pill">
                {part}
              </span>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </div>
    );
  };

  return (
      <div className="mobile-modal-overlay" onClick={onClose}>
      {/* Generated results — floated ABOVE the sheet */}
      {((resultImages && resultImages.length > 0) || isGenerating) && (
        <div className="mobile-modal-results" onClick={(e) => e.stopPropagation()}>
          {isGenerating && (
            <div className="mobile-modal-result-thumb mobile-modal-result-thumb--loading">
              <Sparkles size={18} />
            </div>
          )}
          {(resultImages ?? []).map((src, i) => (
            <a
              key={i}
              href={src}
              target="_blank"
              rel="noreferrer"
              className="mobile-modal-result-thumb"
            >
              <img src={src} alt={`Generated ${i + 1}`} />
            </a>
          ))}
        </div>
      )}
      <div className="mobile-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Drag handle — click to close */}
        <div
          className="mobile-modal-handle"
          role="button"
          aria-label="Close"
          onClick={onClose}
        ></div>

        {/* Header */}
        <div className="mobile-modal-header">
          {/* Tabs hidden on desktop (Generate-only there) */}
          <div className="mobile-modal-tabs">
            {!isDesktop && (
              <>
                <button
                  className={`mobile-modal-tab ${tab === "Generate" ? "active" : ""}`}
                  onClick={() => setActiveTab("Generate")}
                >
                  Generate
                </button>
                {showRelease && (
                  <button
                    className={`mobile-modal-tab ${tab === "Release" ? "active" : ""}`}
                    onClick={() => setActiveTab("Release")}
                  >
                    Release
                  </button>
                )}
              </>
            )}
          </div>
          <div className="mobile-modal-header-actions">
            <button className="mobile-modal-close" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="mobile-modal-content">
          {tab === "Generate" ? (
            <>
              {/* Generate Tab Content */}
              {/* Prompt + Variables (prompt left, variables appear on the right) */}
              <div className="mobile-modal-section">
                <div className="mobile-modal-gen-prompthead">
                  <label className="mobile-modal-label" style={{ margin: 0 }}>PROMPT</label>
                  {onAddVariable && (
                    <button className="mobile-modal-add-var-btn" onClick={onAddVariable}>
                      + Variable
                    </button>
                  )}
                </div>
                <div className="mobile-modal-gen-row">
                  <div className="mobile-modal-gen-promptcol">
                    {setPromptBody ? (
                      <HighlightedPromptInput
                        value={promptBody}
                        onChange={setPromptBody}
                        placeholder="Describe your image…"
                        variables={variables}
                      />
                    ) : (
                      <div className="mobile-modal-prompt-box">
                        {renderPromptWithPills()}
                      </div>
                    )}
                  </div>
                  {variables.length > 0 && (
                    <div className="mobile-modal-gen-varscol">
                      {variables.map((variable, vi) => {
                        const c = getVariableColors(
                          typeof variable.colorIndex === "number" ? variable.colorIndex : vi
                        );
                        return (
                        <div
                          key={variable.id}
                          className="mobile-modal-var-row"
                          style={{ background: c.bg, border: `1px solid ${c.border}` }}
                        >
                          <span
                            className="mobile-modal-var-name"
                            style={{ color: c.text, borderRightColor: c.border }}
                          >
                            {variable.name}
                          </span>
                          <input
                            type="text"
                            className="mobile-modal-var-input"
                            value={variable.values[0] || (variable.defaultValue as string)}
                            onChange={(e) => onVariableChange && onVariableChange(variable.id, e.target.value)}
                            placeholder={`Enter ${variable.name}...`}
                          />
                          {onRemoveVariable && (
                            <button
                              type="button"
                              className="mobile-modal-var-remove"
                              aria-label={`Remove ${variable.name}`}
                              onClick={() => onRemoveVariable(variable.name)}
                            >
                              <X size={12} />
                            </button>
                          )}
                        </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Reference Images (upload + NFT) */}
              {showReferenceImages && (
                <div className="mobile-modal-section">
                  <label className="mobile-modal-label">REFERENCE IMAGES</label>
                  <div className="mobile-modal-ref-grid">
                    <input
                      ref={refInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      style={{ display: "none" }}
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          onAddReferenceImages?.(e.target.files);
                        }
                        e.target.value = "";
                      }}
                    />
                    <button
                      type="button"
                      className="mobile-modal-ref-add"
                      onClick={() => refInputRef.current?.click()}
                      aria-label="Add reference image"
                    >
                      <Plus size={16} />
                    </button>
                    {(referenceImages ?? []).map((src, i) => (
                      <div key={i} className="mobile-modal-ref-thumb">
                        <img src={src} alt={`Reference ${i + 1}`} />
                        <button
                          type="button"
                          className="mobile-modal-ref-remove"
                          onClick={() => onRemoveReferenceImage?.(i)}
                          aria-label="Remove reference image"
                        >
                          <X size={11} />
                        </button>
                      </div>
                    ))}
                    {(referenceImages ?? []).length === 0 && (
                      <div className="mobile-modal-ref-empty">
                        <ImageIcon size={14} />
                        <span>Upload or pick an NFT</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </>
          ) : (
            <>
              {/* ── Section: Settings (mirrors the /editor left column) ── */}
              {releaseSection === "settings" && (
                <>
                  <div className="mobile-modal-section">
                    <label className="mobile-modal-label">PROMPT TITLE</label>
                    <input
                      type="text"
                      className="mobile-modal-var-manager-input"
                      placeholder="Untitled Prompt"
                      value={titleVal}
                      onChange={(e) => onTitle(e.target.value)}
                    />
                  </div>

                  <div className="mobile-modal-section">
                    <label className="mobile-modal-label">DISPLAY MODE</label>
                    <div className="mobile-modal-segment">
                      <button
                        type="button"
                        className={`mobile-modal-segment-btn ${typeVal === "free-prompt" ? "active" : ""}`}
                        onClick={() => onType("free-prompt")}
                      >
                        Free prompt
                      </button>
                      <button
                        type="button"
                        className={`mobile-modal-segment-btn ${typeVal === "premium-prompt" ? "active" : ""}`}
                        onClick={() => onType("premium-prompt")}
                      >
                        Premium prompt
                      </button>
                    </div>
                  </div>

                  <div className="mobile-modal-settings-2col">
                    <div className="mobile-modal-section" style={{ flex: 1 }}>
                      <label className="mobile-modal-label">CATEGORY</label>
                      <select
                        className="mobile-modal-select mobile-modal-select--full"
                        value={(tagsVal[0] || "").toLowerCase()}
                        onChange={(e) => {
                          const val = e.target.value;
                          tagsVal.forEach((t) => removeTagFn(t));
                          if (val) addTagFn(val);
                        }}
                      >
                        <option value="">Theme…</option>
                        {CATEGORY_OPTIONS.map((c) => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="mobile-modal-section" style={{ flex: 1 }}>
                      <label className="mobile-modal-label">PREFERRED RATIO</label>
                      <select
                        className="mobile-modal-select mobile-modal-select--full"
                        value={ratios.selected}
                        onChange={(e) => setRatio && setRatio(e.target.value)}
                      >
                        {ratios.available.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mobile-modal-section">
                    <label className="mobile-modal-label">PREFERRED MODELS · {prefModels.length}</label>
                    <div className="mobile-modal-multiselect">
                      <button
                        type="button"
                        className="mobile-modal-select mobile-modal-select--full mobile-modal-multiselect-trigger"
                        onClick={() => setModelOpen((o) => !o)}
                      >
                        {prefModels.length > 0
                          ? models.available.filter((m) => prefModels.includes(m.id)).map((m) => m.name).join(", ")
                          : "Select models…"}
                      </button>
                      {modelOpen && (
                        <div className="mobile-modal-multiselect-panel">
                          {models.available.map((m) => {
                            const active = prefModels.includes(m.id);
                            return (
                              <button
                                key={m.id}
                                type="button"
                                className="mobile-modal-multiselect-opt"
                                onClick={() => togglePrefModel(m.id)}
                              >
                                <span className={`mobile-modal-checkbox ${active ? "checked" : ""}`}>{active ? "✓" : ""}</span>
                                <span className="mobile-modal-multiselect-name">{m.name}</span>
                                {typeof m.price === "number" && (
                                  <span className="mobile-modal-model-card-price">${m.price.toFixed(2)}</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mobile-modal-section">
                    <label className="mobile-modal-label">PRICING</label>
                    {typeVal === "premium-prompt" ? (
                      <div className="mobile-modal-price-input-wrap">
                        <span className="mobile-modal-price-input-prefix">$</span>
                        <input
                          type="number"
                          inputMode="decimal"
                          min={0}
                          step="0.0001"
                          className="mobile-modal-price-input"
                          placeholder="0.0000"
                          value={priceVal || ""}
                          onChange={(e) => onPrice(parseFloat(e.target.value) || 0)}
                        />
                        <span className="mobile-modal-price-input-suffix">USDC / render</span>
                      </div>
                    ) : (
                      <p className="mobile-modal-hint">Free prompts have no per-render price. Switch to Premium to set one.</p>
                    )}
                  </div>
                </>
              )}

              {/* ── Section: Prompt + Variables ── */}
              {releaseSection === "prompt" && (
                <>
                  <div className="mobile-modal-section">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                      <label className="mobile-modal-label" style={{ margin: 0 }}>PROMPT TEMPLATE</label>
                      <button className="mobile-modal-add-var-btn" onClick={onAddVariable}>
                        + Variable
                      </button>
                    </div>
                    {setPromptBody ? (
                      <HighlightedPromptInput
                        value={promptBody}
                        onChange={handleReleasePromptChange}
                        placeholder="Describe your image…"
                        variables={variables}
                      />
                    ) : (
                      <div className="mobile-modal-prompt-box">
                        <div className="mobile-modal-dashed-prompt">
                          {variables.map((v, i) => (
                            <span key={i} className="mobile-modal-dashed-pill">[{v.name}]</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {showReferenceImages && (
                    <div className="mobile-modal-section">
                      <label className="mobile-modal-label">REFERENCE IMAGES · optional</label>
                      <div className="mobile-modal-ref-grid">
                        <input
                          ref={refInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          style={{ display: "none" }}
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              onAddReferenceImages?.(e.target.files);
                            }
                            e.target.value = "";
                          }}
                        />
                        <button
                          type="button"
                          className="mobile-modal-ref-add"
                          onClick={() => refInputRef.current?.click()}
                          aria-label="Add reference image"
                        >
                          <Plus size={16} />
                        </button>
                        {(referenceImages ?? []).map((src, i) => (
                          <div key={i} className="mobile-modal-ref-thumb">
                            <img src={src} alt={`Reference ${i + 1}`} />
                            <button
                              type="button"
                              className="mobile-modal-ref-remove"
                              onClick={() => onRemoveReferenceImage?.(i)}
                              aria-label="Remove reference image"
                            >
                              <X size={11} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mobile-modal-section">
                    <label className="mobile-modal-label">VARIABLES · {variables.length}</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {variables.map((variable) => {
                        const vType = varTypes[variable.id] ?? "text";
                        return (
                          <div key={variable.id} className="mobile-modal-var-manager-card">
                            <div className="mobile-modal-var-manager-header">
                              <span className="mobile-modal-dashed-name">[{variable.name}]</span>
                              <button
                                className="mobile-modal-close"
                                style={{ width: 24, height: 24, border: "none", background: "#F2EFEA" }}
                                onClick={() => onRemoveVariable && onRemoveVariable(variable.name)}
                              >
                                <X size={14} color="#8A7F72" />
                              </button>
                            </div>
                            <div className="mobile-modal-var-types">
                              <button
                                type="button"
                                className={`mobile-modal-var-type ${vType === "text" ? "active" : ""}`}
                                onClick={() => setVarTypes((p) => ({ ...p, [variable.id]: "text" }))}
                              >
                                Text
                              </button>
                              <button
                                type="button"
                                className={`mobile-modal-var-type ${vType === "bool" ? "active" : ""}`}
                                onClick={() => setVarTypes((p) => ({ ...p, [variable.id]: "bool" }))}
                              >
                                Yes / No
                              </button>
                            </div>
                            {vType === "bool" ? (
                              <div className="mobile-modal-yesno">
                                <button
                                  type="button"
                                  className={`mobile-modal-yesno-btn ${String(variable.defaultValue) === "Yes" ? "active" : ""}`}
                                  onClick={() => onVariableChange && onVariableChange(variable.id, "Yes")}
                                >
                                  Yes
                                </button>
                                <button
                                  type="button"
                                  className={`mobile-modal-yesno-btn ${String(variable.defaultValue) === "No" ? "active" : ""}`}
                                  onClick={() => onVariableChange && onVariableChange(variable.id, "No")}
                                >
                                  No
                                </button>
                              </div>
                            ) : (
                              <input
                                type="text"
                                className="mobile-modal-var-manager-input"
                                placeholder="Comma-separated options: option a, option b..."
                                value={variable.defaultValue as string}
                                onChange={(e) => onVariableChange && onVariableChange(variable.id, e.target.value)}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Push the configured prompt into Verify as an image to render.
                      Stay on this section; the button goes green once enough
                      variations are queued. */}
                  <button
                    type="button"
                    className={`mobile-modal-verify-gen ${releaseReady ? "is-ready" : ""}`}
                    onClick={packToVerify}
                  >
                    {releaseReady ? <CheckCircle2 size={14} /> : <Plus size={14} />}
                    {releaseReady
                      ? `Ready (${variationsDone}/${reqVars}) — pack more`
                      : `Pack to Verify (${variationsDone}/${reqVars})`}
                  </button>
                </>
              )}

              {/* ── Section: Verify + Generate (per-image model / aspect / resolution) ── */}
              {releaseSection === "verify" && (
                <div className="mobile-modal-section">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <label className="mobile-modal-label" style={{ margin: 0 }}>VERIFY · {variationsDone}/{reqVars}</label>
                    <span
                      className="mobile-modal-verify-check"
                      title={releaseReady ? "Ready to release" : `${reqVars - variationsDone} more image${reqVars - variationsDone !== 1 ? "s" : ""} required`}
                    >
                      <CheckCircle2 size={18} style={{ color: releaseReady ? "#1E9E5A" : "#D8D0C4" }} />
                    </span>
                  </div>

                  {variations.length === 0 && (
                    <p className="mobile-modal-hint">No images yet — configure Prompt + Variables and use “Pack to Verify”.</p>
                  )}

                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12 }}>
                    {variations.map((v, i) => (
                      <div key={i} className="mobile-modal-varimg-card">
                        <div className="mobile-modal-varimg-head">
                          <span className="mobile-modal-varimg-title">Image {i + 1}</span>
                          <button
                            type="button"
                            className="mobile-modal-close"
                            style={{ width: 24, height: 24, border: "none", background: "#F2EFEA" }}
                            onClick={() => removeVariation(i)}
                          >
                            <X size={14} color="#8A7F72" />
                          </button>
                        </div>
                        {v.refs.length > 0 && (
                          <div className="mobile-modal-varimg-refs">
                            {v.refs.map((src, k) => (
                              <div key={k} className="mobile-modal-varimg-ref">
                                <img src={src} alt={`Reference ${k + 1}`} />
                              </div>
                            ))}
                          </div>
                        )}
                        {v.vars.length > 0 && (
                          <div className="mobile-modal-varimg-vars">
                            {v.vars.map((kv, k) => (
                              <div key={k} className="mobile-modal-varimg-var">
                                <span className="k">{kv.name}</span>
                                <span className="v">{kv.value || "—"}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="mobile-modal-settings-grid">
                          <div className="mobile-modal-setting mobile-modal-setting--model" title="Model">
                            <select className="mobile-modal-select" value={v.model} onChange={(e) => updateVariation(i, { model: e.target.value })}>
                              {models.available.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
                            </select>
                          </div>
                          <div className="mobile-modal-setting" title="Aspect ratio">
                            <Ratio size={15} style={{ color: "#8A7F72", flexShrink: 0 }} aria-label="Aspect ratio" />
                            <select className="mobile-modal-select" value={v.ratio} onChange={(e) => updateVariation(i, { ratio: e.target.value })}>
                              {ratios.available.map((r) => <option key={r} value={r}>{r}</option>)}
                            </select>
                          </div>
                          <div className="mobile-modal-setting" title="Resolution">
                            <Maximize2 size={15} style={{ color: "#8A7F72", flexShrink: 0 }} aria-label="Resolution" />
                            <select className="mobile-modal-select" value={v.resolution} onChange={(e) => updateVariation(i, { resolution: e.target.value })}>
                              <option>2K</option><option>4K</option>
                            </select>
                          </div>
                        </div>
                        <button type="button" className="mobile-modal-varimg-gen" onClick={() => onGenerate()}>
                          <Sparkles size={13} />
                          Generate this image
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="mobile-modal-generate-btn"
                    style={{ width: "100%", marginTop: 14, ...(releaseReady ? { background: "#1E9E5A" } : { opacity: 0.45 }) }}
                    disabled={!releaseReady}
                    onClick={() => (onRelease || onGenerate)()}
                  >
                    <Sparkles size={14} style={{ fill: "white" }} />
                    Release prompt
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className={`mobile-modal-footer ${tab === "Release" ? "mobile-modal-footer--nav" : ""}`}>
          {tab === "Generate" ? (
            <div className="mobile-modal-footer-actions">
              {/* [model · ratio · size · count · pay] — packed left of Generate.
                  Custom dropdowns open upward so the list stays inside the sheet. */}
              <div className="mobile-modal-gen-left">
                <MiniSelect
                  title="Model"
                  value={models.selected[0] || ""}
                  options={models.available.map((m) => ({ value: m.id, label: m.name }))}
                  onChange={(v) => setModel && setModel(v)}
                  maxWidth={150}
                />
                <MiniSelect
                  title="Aspect ratio"
                  icon={<Ratio size={14} style={{ color: "#8A7F72", flexShrink: 0 }} aria-label="Aspect ratio" />}
                  value={ratios.selected}
                  options={ratios.available.map((r) => ({ value: r, label: r }))}
                  onChange={(v) => setRatio && setRatio(v)}
                />
                <MiniSelect
                  title="Resolution"
                  icon={<Maximize2 size={14} style={{ color: "#8A7F72", flexShrink: 0 }} aria-label="Resolution" />}
                  value={genResolution}
                  options={[{ value: "2K", label: "2K" }, { value: "4K", label: "4K" }]}
                  onChange={setGenResolution}
                />
                <MiniSelect
                  title="Generations"
                  icon={<Copy size={14} style={{ color: "#8A7F72", flexShrink: 0 }} aria-label="Generations" />}
                  value={genCount}
                  options={[1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({ value: `x ${n}`, label: `x ${n}` }))}
                  onChange={setGenCount}
                />
              </div>
              <div className="mobile-modal-pay-inline">
                <span className="mobile-modal-pay-inline-price">${pricePerSlot.toFixed(2)}</span>
                {/* Inline "Add funds" shows only when the price exceeds the
                    current balance; the Generate button stays actionable. */}
                {onTopUp && typeof balance === "number" && balance < pricePerSlot && (
                  <button type="button" className="mobile-modal-addfunds" onClick={onTopUp}>
                    Add funds
                  </button>
                )}
              </div>
              <button className="mobile-modal-generate-btn" onClick={onGenerate} disabled={isGenerating}>
                <Sparkles size={13} style={{ fill: "white" }} />
                {generateLabel || "Generate"}
              </button>
            </div>
          ) : (
            /* Ultra-bottom menu: full-width section nav flush with the screen edge */
            <div className="mobile-modal-bottomnav">
              <button
                type="button"
                className={`mobile-modal-bottomnav-btn ${releaseSection === "settings" ? "active" : ""}`}
                onClick={() => setReleaseSection("settings")}
              >
                <Settings size={18} />
                <span>Settings</span>
              </button>
              <button
                type="button"
                className={`mobile-modal-bottomnav-btn ${releaseSection === "prompt" ? "active" : ""}`}
                onClick={() => setReleaseSection("prompt")}
              >
                <FileText size={18} />
                <span>Prompt + Variables</span>
              </button>
              <button
                type="button"
                className={`mobile-modal-bottomnav-btn ${releaseSection === "verify" ? "active" : ""}`}
                onClick={() => setReleaseSection("verify")}
              >
                <CheckCircle2 size={18} style={{ color: releaseReady ? "#1E9E5A" : undefined }} />
                <span>Verify + Generate</span>
                {releaseReady && <span className="mobile-modal-bottomnav-dot" />}
              </button>
            </div>
          )}
        </div>

        {/* Verify-flow confirmation dialogs */}
        {verifyDialog && (
          <div className="mobile-modal-confirm" onClick={() => setVerifyDialog(null)}>
            <div className="mobile-modal-confirm-card" onClick={(e) => e.stopPropagation()}>
              {verifyDialog.kind === "duplicate" ? (
                <>
                  <h4 className="mobile-modal-confirm-title">Identical image already queued</h4>
                  <p className="mobile-modal-confirm-text">
                    Nothing changed in the prompt, variables or reference images
                    since an image already in Verify. Add it anyway?
                  </p>
                  <div className="mobile-modal-confirm-actions">
                    <button
                      type="button"
                      className="mobile-modal-confirm-btn"
                      onClick={() => setVerifyDialog(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="mobile-modal-confirm-btn mobile-modal-confirm-btn--primary"
                      onClick={() => {
                        commitPack();
                        setVerifyDialog(null);
                      }}
                    >
                      Add anyway
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h4 className="mobile-modal-confirm-title">Reset the Verify section?</h4>
                  <p className="mobile-modal-confirm-text">
                    Changing the prompt changes the entire image composition.
                    Resetting removes all {variations.length} queued image
                    {variations.length !== 1 ? "s" : ""}. Keep them and revert the
                    prompt instead?
                  </p>
                  <div className="mobile-modal-confirm-actions">
                    <button
                      type="button"
                      className="mobile-modal-confirm-btn"
                      onClick={() => {
                        // Refuse: revert the prompt to its committed state, keep images.
                        if (committedPrompt !== null) setPromptBody?.(committedPrompt);
                        setVerifyDialog(null);
                      }}
                    >
                      Keep images
                    </button>
                    <button
                      type="button"
                      className="mobile-modal-confirm-btn mobile-modal-confirm-btn--danger"
                      onClick={() => {
                        // Agree: wipe Verify and accept the new prompt.
                        const pending = verifyDialog.pending;
                        setVariations([]);
                        setCommittedPrompt(null);
                        setPromptBody?.(pending);
                        setVerifyDialog(null);
                      }}
                    >
                      Reset Verify
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
