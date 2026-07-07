/* Quick Create — faithful port of AlgencyMobileGenerateModal (Generate-only bottom sheet) */
const Icon = window.Icon;
const { useState, useEffect, useRef, useMemo, useCallback } = React;

const PASTEL = [
  { bg: "#FDE8E8", text: "#8B2E2E", border: "#E8A0A0" },
  { bg: "#E8F4FD", text: "#1E4A6E", border: "#9CCAE8" },
  { bg: "#E8F8EE", text: "#1F5C38", border: "#9AD4B0" },
  { bg: "#F3E8FD", text: "#4A2E6E", border: "#C4A0E8" },
  { bg: "#FDF6E8", text: "#6E4A1E", border: "#E8C89A" },
  { bg: "#E8F8F8", text: "#1E5C5C", border: "#9AD4D4" },
  { bg: "#FDE8F4", text: "#6E2E5A", border: "#E8A0C8" },
  { bg: "#F0F0E8", text: "#4A4A2E", border: "#C8C8A0" },
];
const colorAt = (i) => PASTEL[((i % PASTEL.length) + PASTEL.length) % PASTEL.length];

const QC_MODELS2 = [
  { id: "nano-banana-pro", name: "Nano Banana Pro", price: 0.04 },
  { id: "gpt-image-2", name: "GPT Image 2", price: 0.06 },
  { id: "seedance-2", name: "Seedance 2", price: 0.08 },
];
const QC_RATIOS2 = ["1:1", "4:5", "3:4", "16:9", "9:16"];

/* MiniSelect — compact pill whose options panel opens UPWARD (stays inside sheet) */
function MiniSelect({ value, options, onChange, icon, title, maxWidth }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);
  const cur = options.find((o) => o.value === value);
  return (
    <div className="mm-setting" title={title}>
      {icon}
      <div className="mm-minisel" ref={ref}>
        <button type="button" className="mm-minisel-trigger" style={maxWidth ? { maxWidth } : undefined} onClick={() => setOpen((o) => !o)}>
          <span className="mm-minisel-value">{cur ? cur.label : value}</span>
          <Icon name="chevronDown" size={13} stroke={2} style={{ transform: open ? "rotate(180deg)" : "none", flexShrink: 0, opacity: .6 }} />
        </button>
        {open && (
          <div className="mm-minisel-panel" role="listbox">
            {options.map((o) => (
              <button key={o.value} type="button" className={"mm-minisel-opt" + (o.value === value ? " active" : "")} onClick={() => { onChange(o.value); setOpen(false); }}>{o.label}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* HighlightedPromptInput — transparent textarea over a coloured pill backdrop */
function HLInput({ value, onChange, placeholder, varColors, taRef, onSel }) {
  const backRef = useRef(null);
  const sync = () => { if (backRef.current && taRef.current) { backRef.current.scrollTop = taRef.current.scrollTop; backRef.current.scrollLeft = taRef.current.scrollLeft; } };
  const parts = value.split(/(\[[^\]\n]+\])/g);
  const report = () => { const ta = taRef.current; if (ta && onSel) onSel(ta.selectionStart, ta.selectionEnd); };
  return (
    <div className="mm-hl-wrap">
      <div className="mm-hl-back" ref={backRef} aria-hidden="true">
        {parts.map((p, i) => {
          const c = /^\[[^\]\n]+\]$/.test(p) ? varColors[p] : null;
          return c ? <span key={i} className="mm-hl-pill" style={{ background: c.bg, color: c.text, boxShadow: "inset 0 0 0 1px " + c.border }}>{p}</span> : <span key={i}>{p}</span>;
        })}
        {"\n"}
      </div>
      <textarea ref={taRef} className="mm-hl-ta" value={value} placeholder={placeholder} spellCheck={false}
        onChange={(e) => onChange(e.target.value)} onScroll={sync} onSelect={report} onKeyUp={report} onMouseUp={report} />
    </div>
  );
}

function QuickCreate({ onOpenEditor, onGenerated, onToast, seed, openTick, sidebarW, pillHidden }) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [vals, setVals] = useState({});
  const [model, setModel] = useState("nano-banana-pro");
  const [ratio, setRatio] = useState("1:1");
  const [resolution, setResolution] = useState("2K");
  const [count, setCount] = useState("x 1");
  const [refs, setRefs] = useState([]);
  const [nfts, setNfts] = useState([]);
  const [busy, setBusy] = useState(false);
  const [results, setResults] = useState([]);
  const [sheetH, setSheetH] = useState(null);
  const taRef = useRef(null), fileRef = useRef(null), nftRef = useRef(null), sheetRef = useRef(null), selRef = useRef({ start: 0, end: 0 });
  const resize = useRef(null), moved = useRef(false);

  useEffect(() => {
    if (!openTick) return;
    if (seed) { setPrompt(seed.prompt || ""); if (seed.generator) setModel(seed.generator); }
    setResults([]); setOpen(true);
  }, [openTick]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open && sheetH == null) setSheetH(Math.round(Math.min(Math.max(window.innerHeight * 0.5, 340), window.innerHeight * 0.86)));
  }, [open]);

  const variables = useMemo(() => {
    const seen = new Set(); const out = [];
    const re = /\[([^\]\n]+)\]/g; let m; let idx = 0;
    while ((m = re.exec(prompt)) !== null) { const tok = m[0]; if (seen.has(tok)) continue; seen.add(tok); out.push({ id: tok, name: m[1], colorIndex: idx++ }); }
    return out;
  }, [prompt]);
  const varColors = useMemo(() => { const map = {}; variables.forEach((v) => { map[v.id] = colorAt(v.colorIndex); }); return map; }, [variables]);

  const cnt = Math.max(1, parseInt(count.replace(/\D/g, ""), 10) || 1);
  const resMult = resolution === "4K" ? 2 : 1;
  const price = (QC_MODELS2.find((m) => m.id === model)?.price || 0) * cnt * resMult;

  const addVariable = () => {
    const ta = taRef.current; const sel = selRef.current;
    if (ta && sel.end > sel.start) {
      const s = prompt.slice(sel.start, sel.end).trim();
      if (s && !s.includes("[") && !s.includes("]")) { setPrompt(prompt.split(s).join("[" + s + "]")); selRef.current = { start: 0, end: 0 }; return; }
    }
    const n = variables.length + 1;
    setPrompt((p) => p + (p && !p.endsWith(" ") ? " " : "") + "[variable_" + n + "]");
  };

  const generate = () => {
    if (busy) return;
    if (!prompt.trim()) { onToast("Enter a prompt first"); return; }
    setBusy(true);
    setTimeout(() => {
      const out = [];
      for (let i = 0; i < cnt; i++) out.push(window.ENKI.genResult("qc" + Date.now() + i, ratio));
      setResults((prev) => [...out, ...prev]);
      onGenerated && onGenerated({ prompt, img: out[0], ratio, model });
      setBusy(false);
      onToast("Generated & saved to gallery");
    }, 1800);
  };

  const onFiles = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((f) => { const r = new FileReader(); r.onload = () => setRefs((p) => p.length >= 8 ? p : [...p, r.result]); r.readAsDataURL(f); });
    e.target.value = "";
  };
  const onNft = (e) => {
    const files = Array.from(e.target.files || []);
    files.forEach((f) => { const r = new FileReader(); r.onload = () => setNfts((p) => p.length >= 8 ? p : [...p, r.result]); r.readAsDataURL(f); });
    e.target.value = "";
  };

  /* resize handle */
  const onMove = useCallback((e) => {
    const st = resize.current; if (!st) return;
    const delta = st.startY - e.clientY;
    if (Math.abs(delta) > 6) moved.current = true;
    setSheetH(Math.min(Math.max(st.startH + delta, 280), window.innerHeight * 0.88));
  }, []);
  const onUp = useCallback(() => {
    resize.current = null; document.body.style.userSelect = "";
    window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp);
    if (!moved.current) setOpen(false);
  }, [onMove]);
  const onDown = (e) => {
    const h = sheetRef.current ? sheetRef.current.getBoundingClientRect().height : sheetH;
    moved.current = false; resize.current = { startY: e.clientY, startH: h };
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", onMove); window.addEventListener("pointerup", onUp);
  };

  const offset = { left: (sidebarW || 0) + "px" };

  return (
    <>
      {!open && !pillHidden && (
        <div className="mm-pill-wrap" style={offset}>
          <button className="mm-pill" type="button" onClick={() => setOpen(true)}>
            <span className="mm-pill-l"><span className="mm-pill-bolt"><Icon name="sparkles" size={17} stroke={2} fill="var(--qc-ink)" /></span><span className="mm-pill-txt">Generate</span></span>
            <span className="mm-pill-right">
              <span className="mm-pill-editor" onClick={(e) => { e.stopPropagation(); onOpenEditor(); }}><Icon name="pen" size={13} stroke={2} /> Prompt editor</span>
              <span className="mm-pill-hint">new image</span>
            </span>
          </button>
        </div>
      )}

      {open && (
        <div className="mm-overlay" style={offset} onClick={() => setOpen(false)}>
          {(results.length > 0 || busy) && (
            <div className="mm-results" onClick={(e) => e.stopPropagation()}>
              {busy && <div className="mm-result mm-result--load"><Icon name="sparkles" size={18} stroke={2} className="ek-spin-ico" /></div>}
              {results.map((src, i) => <a key={i} href={src} target="_blank" rel="noreferrer" className="mm-result"><img src={src} alt={"Generated " + (i + 1)} /></a>)}
            </div>
          )}
          <div ref={sheetRef} className="mm-sheet" style={sheetH ? { height: sheetH + "px" } : undefined} onClick={(e) => e.stopPropagation()}>
            <div className="mm-handle" onPointerDown={onDown} style={{ touchAction: "none" }} title="Drag to resize · click to close" />

            <div className="mm-content">
              <div className="mm-prompthead">
                <div className="mm-prompthead-l">
                  <span className="mm-label">Prompt</span>
                  <button className="mm-addvar" onClick={addVariable}>+ Variable</button>
                </div>
                <button className="mm-close" onClick={() => setOpen(false)} aria-label="Close"><Icon name="x" size={16} stroke={2} /></button>
              </div>
              <div className="mm-genrow">
                <div className="mm-promptcol">
                  <HLInput value={prompt} onChange={setPrompt} placeholder="Describe your image…  wrap variables in [brackets]." varColors={varColors} taRef={taRef} onSel={(s, e) => { selRef.current = { start: s, end: e }; }} />
                </div>
                {variables.length > 0 && (
                  <div className="mm-varscol">
                    {variables.map((v) => {
                      const c = colorAt(v.colorIndex);
                      return (
                        <div key={v.id} className="mm-var-row" style={{ background: c.bg, border: "1px solid " + c.border }}>
                          <span className="mm-var-name" style={{ color: c.text, borderRightColor: c.border }}>{v.name}</span>
                          <input className="mm-var-input" value={vals[v.id] || ""} onChange={(e) => setVals({ ...vals, [v.id]: e.target.value })} placeholder={"Enter " + v.name + "…"} style={{ color: c.text }} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="mm-footer">
              <div className="mm-gen-left">
                <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={onFiles} />
                <div className="mm-ref-deck">
                  <button type="button" className="mm-ref-btn" onClick={() => fileRef.current && fileRef.current.click()} title="Upload an image"><Icon name="plus" size={13} stroke={2} /><Icon name="image" size={15} stroke={2} /></button>
                  {refs.length > 0 && <div className="mm-ref-chip" title={refs.length + " image(s)"}><img src={refs[0]} alt="ref" /><span className="mm-ref-count">{refs.length}</span></div>}
                </div>
                <input ref={nftRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={onNft} />
                <div className="mm-ref-deck">
                  <button type="button" className="mm-ref-btn" onClick={() => nftRef.current && nftRef.current.click()} title="Pick an NFT from your wallet"><Icon name="plus" size={13} stroke={2} /> NFT</button>
                  {nfts.length > 0 && <div className="mm-ref-chip" title={nfts.length + " NFT(s)"}><img src={nfts[0]} alt="nft" /><span className="mm-ref-count">{nfts.length}</span></div>}
                </div>
                <MiniSelect title="Model" value={model} maxWidth={150} options={QC_MODELS2.map((m) => ({ value: m.id, label: m.name }))} onChange={setModel} />
                <MiniSelect title="Aspect ratio" icon={<Icon name="image" size={14} stroke={2} style={{ color: "var(--enki-ink-3)", flexShrink: 0 }} />} value={ratio} options={QC_RATIOS2.map((r) => ({ value: r, label: r }))} onChange={setRatio} />
                <MiniSelect title="Resolution" icon={<Icon name="expand" size={14} stroke={2} style={{ color: "var(--enki-ink-3)", flexShrink: 0 }} />} value={resolution} options={[{ value: "2K", label: "2K" }, { value: "4K", label: "4K" }]} onChange={setResolution} />
                <MiniSelect title="Generations" icon={<Icon name="copy" size={14} stroke={2} style={{ color: "var(--enki-ink-3)", flexShrink: 0 }} />} value={count} options={[1, 2, 3, 4, 6, 8].map((n) => ({ value: "x " + n, label: "x " + n }))} onChange={setCount} />
              </div>
              <div className="mm-pay" title={cnt + " × image · " + resolution}>
                <span className="mm-pay-price">${price.toFixed(2)}</span>
              </div>
              <button className="mm-generate" onClick={generate} disabled={busy}>
                <Icon name="sparkles" size={14} stroke={2} fill="#fff" /> {busy ? "Generating…" : "Generate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

Object.assign(window, { QuickCreate });
