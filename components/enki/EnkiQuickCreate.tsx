import { useMemo, useState, useEffect } from "react";
import { ChevronUp, PenSquare, Sparkles, Plus, X, GripVertical, Settings2, Info, Image as ImageIcon, Wallet, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

const QC_MODELS = [
  { id: "nano-banana-pro", name: "Nano Banana Pro", cost: 0.04 },
  { id: "gpt-image-2", name: "GPT-Image-2", cost: 0.06 },
];

const QC_RATIOS = ["1:1", "4:5", "3:4", "16:9", "9:16"];
const QC_RESOLUTIONS = ["1K", "2K", "4K"];

export default function EnkiQuickCreate() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("A photograph of [subject] at (location), {mood}, lit by [lighting].");
  const [vars, setVars] = useState<Record<string, string>>({});
  
  // Settings
  const [model, setModel] = useState("nano-banana-pro");
  const [ratio, setRatio] = useState("1:1");
  const [resolution, setResolution] = useState("2K");
  const [qty, setQty] = useState(1);
  
  // Image Selection Mode: 'upload' | 'nft'
  const [imgMode, setImgMode] = useState<"upload" | "nft">("upload");
  const [images, setImages] = useState<(string | null)[]>(Array(10).fill(null));

  // Variable parsing: support [], (), {}
  const tokens = useMemo(() => {
    const matches = Array.from(prompt.matchAll(/[\(\[\{]([^)\]}]+)[\)\]\}]/g)).map((m) => m[1]);
    return Array.from(new Set(matches));
  }, [prompt]);

  // Sync vars state with tokens
  useEffect(() => {
    setVars(prev => {
      const next: Record<string, string> = {};
      tokens.forEach(t => {
        // Keep existing values if they are still in tokens, otherwise new ones are empty
        next[t] = prev[t] || "";
      });
      return next;
    });
  }, [tokens]);

  const totalCost = (QC_MODELS.find(m => m.id === model)?.cost || 0) * qty;

  return (
    <div className={`enki-qc ${open ? "is-open" : ""}`}>
      {/* Panel — 70% width, center aligned */}
      {open && (
        <>
          <div className="enki-qc-overlay" onClick={() => setOpen(false)} />
          <div className="enki-qc-panel-large">
            {/* Header bar matching the reference */}
            <div className="enki-qc-header-bar">
              <div className="enki-qc-header-left">
                <div className="enki-qc-header-icon">
                  <Sparkles size={18} fill="white" stroke="white" />
                </div>
                <span className="enki-qc-header-title">Quick Create</span>
              </div>
              <button className="enki-qc-collapse-btn" onClick={() => setOpen(false)}>
                Collapse <ChevronUp size={14} />
              </button>
            </div>

            <div className="enki-qc-panel-content">
              {/* Main Two-Column Grid */}
              <div className="enki-qc-main-grid">
                
                {/* Left Column: Prompt, Images, Settings */}
                <div className="enki-qc-col-left">
                  <div className="enki-qc-section">
                    <div className="enki-qc-section-label-ref mono">PROMPT</div>
                    <textarea
                      className="enki-qc-textarea-ref"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe your vision..."
                    />
                  </div>

                  <div className="enki-qc-section">
                    <div className="enki-qc-section-label-ref mono">IMAGE SOURCES</div>
                    
                    {/* Smart Source Selector */}
                    <div className="enki-qc-source-tabs">
                      <button 
                        className={`enki-qc-source-tab ${imgMode === "upload" ? "active" : ""}`}
                        onClick={() => setImgMode("upload")}
                      >
                        <ImageIcon size={14} /> Upload Images
                      </button>
                      <button 
                        className={`enki-qc-source-tab ${imgMode === "nft" ? "active" : ""}`}
                        onClick={() => setImgMode("nft")}
                      >
                        <Wallet size={14} /> Select NFTs
                      </button>
                    </div>

                    <div className="enki-qc-image-slots-container">
                      <div className="enki-qc-image-slots">
                        <button className="enki-qc-add-image-btn-ref">
                          <Plus size={20} style={{ color: '#ff4444' }} />
                          <div className="enki-qc-add-label">
                            <strong>{imgMode === "upload" ? "Add Image" : "Select NFT"}</strong>
                            <span>{imgMode === "upload" ? "Local file" : "Wallet assets"}</span>
                          </div>
                        </button>
                        
                        {images.slice(0, 4).map((img, i) => (
                          <div key={i} className="enki-qc-image-placeholder group">
                            <div className="enki-qc-image-grip">
                              <GripVertical size={12} />
                            </div>
                            {img ? <img src={img} alt="" /> : <div className="enki-qc-image-empty" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Settings Row matching reference */}
                  <div className="enki-qc-settings-footer">
                    <div className="enki-qc-settings-label-row">
                      <span className="enki-qc-section-label-ref mono">SETTINGS</span>
                      <div className="enki-qc-settings-pills">
                        <div className="enki-qc-setting-pill">
                          <ImageIcon size={12} opacity={0.5} />
                          <select value={ratio} onChange={(e) => setRatio(e.target.value)}>
                            {QC_RATIOS.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                          <ChevronUp size={12} className="rotate-180" opacity={0.5} />
                        </div>
                        <div className="enki-qc-setting-pill">
                          <span className="mono opacity-50 text-[10px]">RES</span>
                          <select value={resolution} onChange={(e) => setResolution(e.target.value)}>
                            {QC_RESOLUTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                          </select>
                          <ChevronUp size={12} className="rotate-180" opacity={0.5} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="enki-qc-qty-row">
                      <span className="enki-qc-section-label-ref mono">QTY</span>
                      <div className="enki-qc-qty-stepper">
                        <button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14} /></button>
                        <span className="mono">{qty}</span>
                        <button onClick={() => setQty(qty + 1)}><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Variables matching reference */}
                <div className="enki-qc-col-right">
                  <div className="enki-qc-vars-header">
                    <div className="enki-qc-section-label-ref mono">VARIABLES ({tokens.length})</div>
                    <button className="enki-qc-var-add-btn mono">+ Add</button>
                  </div>
                  
                  <div className="enki-qc-vars-list">
                    {tokens.length === 0 ? (
                      <div className="enki-qc-vars-empty-ref">
                        <p className="serif">No variables detected.</p>
                        <p className="mono opacity-50 text-[11px]">Wrap text in [], (), or {"{}"} to create one.</p>
                      </div>
                    ) : (
                      tokens.map((t) => (
                        <div key={t} className="enki-qc-var-card">
                          <label className="enki-qc-var-card-label mono uppercase">{t}</label>
                          <input
                            type="text"
                            className="enki-qc-var-card-input"
                            value={vars[t] || ""}
                            onChange={(e) => setVars({ ...vars, [t]: e.target.value })}
                            placeholder={`example ${t}`}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Generate Bar matching reference */}
              <button className="enki-qc-generate-bar-ref" onClick={() => {}}>
                <span>Connect Wallet to Generate</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Pill bar — always visible */}
      {!open && (
        <div className="enki-qc-bar" onClick={() => setOpen(true)}>
          <span className="enki-qc-bar-bolt"><Sparkles size={14} /></span>
          <span className="enki-qc-label">Quick Create</span>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={(e) => { e.stopPropagation(); router.push("/editor"); }}
              className="enki-qc-editor-btn"
              type="button"
            >
              <PenSquare size={12} />
              Prompt Editor
            </button>

            <button
              className="enki-qc-toggle-btn"
              type="button"
              aria-label="Expand"
            >
              <ChevronUp
                size={13}
                style={{ transform: "rotate(180deg)" }}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

