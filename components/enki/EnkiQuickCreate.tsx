import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { ChevronUp, PenSquare, Sparkles, Plus, X, GripVertical, Settings2, Info, Image as ImageIcon, Wallet, Minus, ChevronDown, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const QC_MODELS = [
  { id: "nano-banana-pro", name: "Nano Banana Pro", cost: 0.04 },
  { id: "gpt-image-2", name: "GPT-Image-2", cost: 0.06 },
];

const QC_RATIOS = ["1:1", "4:5", "3:4", "16:9", "9:16"];
const QC_RESOLUTIONS = ["1K", "2K", "4K"];
const QC_QTY = [1, 2, 4, 8];

export default function EnkiQuickCreate() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("A photograph of [subject] at [location], [mood], lit by [lighting].");
  const [vars, setVars] = useState<Record<string, string>>({});
  
  // Settings
  const [model, setModel] = useState("nano-banana-pro");
  const [ratio, setRatio] = useState("1:1");
  const [resolution, setResolution] = useState("2K");
  const [qty, setQty] = useState(1);
  
  // Image Selection Mode: 'upload' | 'nft'
  const [imgMode, setImgMode] = useState<"upload" | "nft">("upload");
  const [images, setImages] = useState<(string | null)[]>(Array(4).fill(null));

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Variable parsing: support [], (), {} with stable IDs
  const [detectedVariables, setDetectedVariables] = useState<any[]>([]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const regex = /(?:\[([^\]]+)\]|\{([^\}]+)\}|\(([^\)]+)\))/gi;
      const detections: { content: string; full: string }[] = [];
      let match;
      while ((match = regex.exec(prompt)) !== null) {
        const content = match[1] || match[2] || match[3];
        if (content) detections.push({ content, full: match[0] });
      }

      setDetectedVariables((prev) => {
        const next: any[] = [];
        const seenTokens = new Set<string>();

        detections.forEach((det) => {
          if (seenTokens.has(det.full)) return;
          seenTokens.add(det.full);

          const existing = prev.find(v => v.fullToken === det.full);
          if (existing) {
            next.push(existing);
          } else {
            next.push({
              id: `var-${Math.random().toString(36).substring(2, 9)}`,
              label: det.content,
              fullToken: det.full,
              value: ""
            });
          }
        });
        return next;
      });
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [prompt]);

  // Sync vars state with detected variables
  useEffect(() => {
    setVars(prev => {
      const next: Record<string, string> = {};
      detectedVariables.forEach(v => {
        next[v.fullToken] = prev[v.fullToken] || "";
      });
      return next;
    });
  }, [detectedVariables]);

  const insertAtCursor = (text: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const newVal = prompt.substring(0, start) + text + prompt.substring(end);
    setPrompt(newVal);

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + text.length;
        textareaRef.current.focus();
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Backspace' && e.key !== 'Delete') return;
    const el = e.currentTarget;
    const pos = el.selectionStart;
    const charBefore = prompt[pos - 1];
    const isClosing = charBefore === ']' || charBefore === '}' || charBefore === ')';
    
    if (isClosing) {
      const openChar = charBefore === ']' ? '[' : charBefore === '}' ? '{' : '(';
      let startPos = pos - 2;
      while (startPos >= 0 && prompt[startPos] !== openChar) startPos--;
      
      if (startPos >= 0) {
        const fullToken = prompt.substring(startPos, pos);
        const variable = detectedVariables.find(v => v.fullToken === fullToken);
        if (variable) {
          e.preventDefault();
          const restoredText = variable.label;
          const newBody = prompt.substring(0, startPos) + restoredText + prompt.substring(pos);
          setPrompt(newBody);
          requestAnimationFrame(() => {
            if (textareaRef.current) {
              const newCursor = startPos + restoredText.length;
              textareaRef.current.selectionStart = textareaRef.current.selectionEnd = newCursor;
              textareaRef.current.focus();
            }
          });
        }
      }
    }
  };

  const handleScroll = useCallback(() => {
    if (textareaRef.current && overlayRef.current) {
      overlayRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  const totalCost = (QC_MODELS.find(m => m.id === model)?.cost || 0) * qty;

  return (
    <div className={`enki-qc ${open ? "is-open" : ""}`}>
      {/* 70% Center Aligned Panel V3 */}
      {open && (
        <>
          <div className="enki-qc-overlay" onClick={() => setOpen(false)} />
          <div className="enki-qc-panel-v3">
            
            {/* Header bar matching enki-previous */}
            <div className="enki-qc-header-v3" onClick={() => setOpen(false)} style={{ cursor: 'pointer' }}>
              <div className="enki-qc-header-info">
                <div className="enki-qc-bolt-v3">
                  <Sparkles size={12} fill="currentColor" />
                </div>
                <span className="enki-qc-header-title-v3">Quick create</span>
                <span className="enki-qc-header-hint-v3">Click to collapse</span>
              </div>
              <ChevronUp size={16} />
            </div>

            <div className="enki-qc-grid-v3">
              
              {/* Left Column: Prompt & Selectors */}
              <div className="enki-qc-col-left-v3">
                <div className="enki-qc-label-v3">PROMPT</div>
                
                <div className="enki-qc-prompt-area-v3">
                  <div className="enki-qc-overlay-v3" ref={overlayRef}>
                    {prompt}
                  </div>
                  <textarea
                    ref={textareaRef}
                    className="enki-qc-textarea-v3"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onScroll={handleScroll}
                    placeholder="[variable]"
                  />

                  {/* Variable Chips below prompt */}
                  <div className="enki-qc-chips-v3">
                    {detectedVariables.map(v => (
                      <span key={v.id} className="enki-qc-var-chip-v3">{v.fullToken}</span>
                    ))}
                  </div>
                </div>

                {/* Image Source Toggle (Smart Design) */}
                <div className="enki-qc-sources-v3">
                  <div className="enki-qc-source-toggle-v3">
                    <button 
                      className={`enki-qc-source-toggle-btn-v3 ${imgMode === "upload" ? "active" : ""}`}
                      onClick={() => setImgMode("upload")}
                    >
                      Images
                    </button>
                    <button 
                      className={`enki-qc-source-toggle-btn-v3 ${imgMode === "nft" ? "active" : ""}`}
                      onClick={() => setImgMode("nft")}
                    >
                      NFTs
                    </button>
                  </div>
                  <div className="enki-qc-source-assets-v3">
                    <button className="enki-qc-asset-slot-v3"><Plus size={14} /></button>
                    {[0,1,2].map(i => <div key={i} className="enki-qc-asset-slot-v3" />)}
                  </div>
                </div>

                {/* Horizontal Selectors matching reference */}
                <div className="enki-qc-selectors-v3">
                  <div className="enki-qc-selector-v3">
                    <span className="enki-qc-selector-label-v3">MODEL</span>
                    <select value={model} onChange={e => setModel(e.target.value)}>
                      {QC_MODELS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>
                  <div className="enki-qc-selector-v3">
                    <span className="enki-qc-selector-label-v3">ASPECT</span>
                    <select value={ratio} onChange={e => setRatio(e.target.value)}>
                      {QC_RATIOS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="enki-qc-selector-v3">
                    <span className="enki-qc-selector-label-v3">RESOLUTION</span>
                    <select value={resolution} onChange={e => setResolution(e.target.value)}>
                      {QC_RESOLUTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>
                  <div className="enki-qc-selector-v3">
                    <span className="enki-qc-selector-label-v3">GENERATIONS</span>
                    <select value={qty} onChange={e => setQty(Number(e.target.value))}>
                      {QC_QTY.map(q => <option key={q} value={q}>x {q}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Right Column: Variables */}
              <div className="enki-qc-col-right-v3">
                <div className="enki-qc-label-v3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>VARIABLES</span>
                  <span style={{ opacity: 0.5 }}>{detectedVariables.length} detected</span>
                </div>

                <div className="enki-qc-vars-list-v3">
                  {detectedVariables.map(v => (
                    <div key={v.id} className="enki-qc-var-row-v3">
                      <span className="enki-qc-var-name-v3 serif">{v.label}</span>
                      <input 
                        type="text" 
                        className="enki-qc-var-input-v3"
                        placeholder="example variable"
                        value={vars[v.fullToken] || ""}
                        onChange={(e) => setVars({ ...vars, [v.fullToken]: e.target.value })}
                      />
                    </div>
                  ))}
                </div>

                <div className="enki-qc-summary-v3">
                  <div className="enki-qc-summary-info-v3">
                    <div className="enki-qc-summary-text-v3">{qty} x {QC_MODELS.find(m => m.id === model)?.name}</div>
                    <div className="enki-qc-network-v3 mono">Solana / 4a...ef21</div>
                  </div>
                </div>

                <button className="enki-qc-generate-btn-v3">
                  Generate / ${totalCost.toFixed(2)}
                </button>
              </div>

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
