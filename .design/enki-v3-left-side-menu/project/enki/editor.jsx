/* Create Prompt — all-at-once 3-column editor (Settings · Prompt+Variables · Verify)
   Over the content area so the sidebar (and Enki logo) stays visible. */
const Icon = window.Icon;
const { useState, useRef, useMemo, useEffect } = React;

const CE_RE = /(\[[^\]\n]+\])/g;
const CE_PASTEL = [
  { bg: "#FDE8E8", text: "#8B2E2E", border: "#E8A0A0" },
  { bg: "#E8F4FD", text: "#1E4A6E", border: "#9CCAE8" },
  { bg: "#E8F8EE", text: "#1F5C38", border: "#9AD4B0" },
  { bg: "#F3E8FD", text: "#4A2E6E", border: "#C4A0E8" },
  { bg: "#FDF6E8", text: "#6E4A1E", border: "#E8C89A" },
  { bg: "#E8F8F8", text: "#1E5C5C", border: "#9AD4D4" },
];
const ceColor = (i) => CE_PASTEL[i % CE_PASTEL.length];
/* Distinct colors for grouping example images by prompt+variable constellation */
const CE_CFG = [
  { bar: "#2a6fdb", soft: "#E8F0FD", ink: "#1E4A6E" },
  { bar: "#1f8a5b", soft: "#E8F6EE", ink: "#1F5C38" },
  { bar: "#c96838", soft: "#FBEEE6", ink: "#7a3d1e" },
  { bar: "#8e44ad", soft: "#F3EAFA", ink: "#4A2E6E" },
  { bar: "#c0398a", soft: "#FBE9F3", ink: "#6E2E5A" },
];
const cfgLetter = (n) => String.fromCharCode(65 + n);
const CE_MODELS = [
  { id: "nano-banana-pro", name: "Nano Banana Pro", price: 0.10 },
  { id: "gpt-image-2", name: "GPT Image 2", price: 0.12 },
  { id: "seedance-2", name: "Seedance 2", price: 0.15 },
];
const CE_RATIOS = ["Any ratio", "1:1", "4:5", "3:2", "16:9", "21:9"];
const CE_DEFAULT = "Variable [asdsdsd] technique and aesthetic of the source drawing, one key element highlighted in [its] [dominant color] with vibrant saturation, monochromatic graphite for surrounding [elements], soft breeze seen on [fabrics], hyperrealistic texture.";

function CEPrompt({ value, onChange, colors }) {
  const taRef = useRef(null), ovRef = useRef(null);
  const sync = () => { if (taRef.current && ovRef.current) ovRef.current.scrollTop = taRef.current.scrollTop; };
  const parts = value.split(CE_RE);
  return (
    <div className="ek-pf ce-promptbox">
      <div className="ek-pf-ov" ref={ovRef} aria-hidden="true">
        {parts.map((p, i) => { const c = /^\[[^\]\n]+\]$/.test(p) ? colors[p] : null; return c ? <span key={i} className="ek-pf-tok" style={{ background: c.bg, color: c.text, boxShadow: "inset 0 0 0 1px " + c.border }}>{p}</span> : <span key={i}>{p}</span>; })}
        {"\n"}
      </div>
      <textarea ref={taRef} className="ek-pf-ta ce-promptta" value={value} onChange={(e) => onChange(e.target.value)} onScroll={sync} spellCheck={false} placeholder="Describe your image. Wrap variables in [brackets]." />
    </div>
  );
}

/* Multi-select dropdown for the ribbon (absolute panel) */
function MultiPick({ items, selected, onToggle, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => { if (!open) return; const f = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }; document.addEventListener("mousedown", f); return () => document.removeEventListener("mousedown", f); }, [open]);
  const total = selected.reduce((s, id) => s + (items.find((m) => m.id === id)?.price || 0), 0);
  const label = selected.length === 0 ? placeholder : selected.length === 1 ? items.find((m) => m.id === selected[0]).name : selected.length + " models";
  return (
    <div className="ce-msel" ref={ref}>
      <button type="button" className={"ce-rb-field ce-msel-trigger" + (open ? " open" : "")} onClick={() => setOpen((o) => !o)}>
        <span className="ce-msel-val">{label}</span>
        <span className="ce-msel-right">{selected.length > 0 && <span className="ce-msel-total">${total.toFixed(2)}</span>}<Icon name="chevronDown" size={14} stroke={2} style={{ transform: open ? "rotate(180deg)" : "none", opacity: .6 }} /></span>
      </button>
      {open && (
        <div className="ce-msel-panel">
          {items.map((m) => (
            <button key={m.id} type="button" className={"ce-msel-opt" + (selected.includes(m.id) ? " active" : "")} onClick={() => onToggle(m.id)}>
              <span className={"ce-check" + (selected.includes(m.id) ? " on" : "")}>{selected.includes(m.id) && <Icon name="check" size={11} stroke={3} />}</span>
              <span className="ce-msel-name">{m.name}</span>
              <span className="ek-ed-model-price">${m.price.toFixed(2)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PromptEditor({ onClose, seed, categories, generators, onToast }) {
  const [title, setTitle] = useState(seed ? seed.title : "Dominant color");
  const [body, setBody] = useState(seed ? seed.prompt : CE_DEFAULT);
  const [mode, setMode] = useState("premium");
  const [cat, setCat] = useState(seed ? seed.category : "");
  const [models, setModels] = useState([seed ? seed.generator : "nano-banana-pro"]);
  const [ratio, setRatio] = useState("Any ratio");
  const [price, setPrice] = useState(0.1);
  const [refs, setRefs] = useState([]);
  const [meta, setMeta] = useState({ "[its]": { type: "bool", def: "render the highlighted element with a soft volumetric glow and gentle bloom around its brightest edges" } });
  const [vsets, setVsets] = useState([{}, {}, {}, {}]);   // per-example variable values
  const [openVar, setOpenVar] = useState(null);           // which variable card is expanded
  const [deepVar, setDeepVar] = useState(null);           // which variable's text is being edited
  const [gallery, setGallery] = useState([]);             // all rendered images, tagged by config signature
  const [genRefs, setGenRefs] = useState([]);             // reference images attached to the next render(s)
  const [sortMode, setSortMode] = useState("group");      // group | newest
  const fileRef = useRef(null);
  const genFileRef = useRef(null);
  const onGenFiles = (e) => { Array.from(e.target.files || []).forEach((f) => { const r = new FileReader(); r.onload = () => setGenRefs((p) => p.length >= 4 ? p : [...p, r.result]); r.readAsDataURL(f); }); e.target.value = ""; };

  const CE_FILL = {
    color: ["a deep oxidized crimson fading into rust along the edges, with faint gold flecks catching the light", "muted teal that shifts toward petrol blue in the shadows and pale seafoam where the light hits"],
    colour: ["warm amber bleeding into burnt sienna, almost glowing from within like late afternoon sun"],
    mood: ["a quiet, melancholic stillness, the kind of calm that feels like the moment right before rain", "tense and dramatic, heavy with anticipation, shadows pressing in from every corner of the frame"],
    time: ["the golden hour just before sunset, long raking light, dust suspended and glowing in the warm air"],
    lens: ["shot on an 85mm portrait lens wide open, creamy out-of-focus background, gentle compression on the features"],
    style: ["baroque chiaroscuro painting reinterpreted through a modern minimalist lens, restrained palette, deliberate negative space", "soft art-nouveau linework wrapped around organic forms, flowing and ornamental yet quietly understated"],
    its: ["softly diffused and barely-there, almost dissolving into the surrounding tones", "bold and unmistakable, the single loudest element anchoring the whole composition"],
    element: ["thin curling tendrils of smoke drifting upward and catching stray beams of light as they rise"],
    fabric: ["heavy raw silk with a subtle sheen, draped in deep folds that pool softly on the floor", "coarse natural linen, slightly wrinkled, with a dry matte texture that absorbs the light"],
    _: ["an ethereal, weathered surface where centuries of patina have softened every hard edge into something tender", "luminous and ornate, almost overwhelming in detail, yet balanced by wide stretches of calm empty space", "windswept and raw, textures roughened by salt and time, the whole scene feeling honest and unguarded", "vivid and saturated to the point of feeling slightly dreamlike, colors humming just past the realistic"],
  };
  const ceFill = (name) => { const k = name.toLowerCase().replace(/[^a-z]/g, ""); for (const key in CE_FILL) if (key !== "_" && k.includes(key)) return CE_FILL[key][Math.floor(Math.random() * CE_FILL[key].length)]; return CE_FILL._[Math.floor(Math.random() * CE_FILL._.length)]; };

  useEffect(() => { const k = (e) => { if (e.key === "Escape") onClose(); }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose]);

  const variables = useMemo(() => {
    const seen = new Set(); const out = []; let m; const re = new RegExp(CE_RE.source, "g"); let i = 0;
    while ((m = re.exec(body)) !== null) { if (seen.has(m[0])) continue; seen.add(m[0]); out.push({ token: m[0], label: m[0].slice(1, -1), ci: i++ }); }
    return out;
  }, [body]);
  const colorMap = useMemo(() => { const o = {}; variables.forEach((v) => { o[v.token] = ceColor(v.ci); }); return o; }, [variables]);

  const setMetaFor = (t, p) => setMeta((m) => ({ ...m, [t]: { ...(m[t] || {}), ...p } }));
  const addVar = () => setBody((b) => b + (b && !b.endsWith(" ") ? " " : "") + "[variable_" + (variables.length + 1) + "]");
  const removeVar = (t) => setBody((b) => b.split(t).join("").replace(/\s{2,}/g, " ").trim());
  const onFiles = (e) => { Array.from(e.target.files || []).forEach((f) => { const r = new FileReader(); r.onload = () => setRefs((p) => [...p, r.result]); r.readAsDataURL(f); }); e.target.value = ""; };
  const toggleModel = (id) => setModels((ms) => ms.includes(id) ? ms.filter((x) => x !== id) : [...ms, id]);
  const batchCost = models.reduce((s, id) => s + (CE_MODELS.find((m) => m.id === id)?.price || 0), 0);
  const need = mode === "premium" ? 4 : 1;
  // signature = prompt body + variable schema (tokens + types) — NOT the values
  const curSig = useMemo(() => body + "||" + variables.map((v) => v.token + ":" + ((meta[v.token] || {}).type || "text")).join(","), [body, variables, meta]);

  // seed a demo gallery + working values once variables exist
  const seeded = useRef(false);
  useEffect(() => {
    if (seeded.current || variables.length === 0) return;
    seeded.current = true;
    const mk = (sig, n, tag) => Array.from({ length: n }, (_, i) => { const vals = {}; variables.forEach((v) => { const b = (meta[v.token] || {}).type === "bool"; vals[v.token] = b ? (Math.random() > .5 ? "on" : "off") : ceFill(v.label); }); return { id: "g" + tag + i + Math.random().toString(36).slice(2, 6), img: window.ENKI.genResult("vg" + tag + i, "4:5"), sig, vals, refs: [], picked: false }; });
    setGallery([
      ...mk(curSig, 5, "A"),
      ...mk(curSig + "~hi-contrast", 3, "B"),
      ...mk(curSig + "~soft-wash", 2, "C"),
    ]);
  }, [variables]);

  // distinct config signatures in first-seen order → {label, color}
  const cfgGroups = useMemo(() => {
    const order = []; const map = {};
    gallery.forEach((g) => { if (!(g.sig in map)) { map[g.sig] = { idx: order.length, label: "Constellation " + cfgLetter(order.length), color: CE_CFG[order.length % CE_CFG.length], sig: g.sig, items: [] }; order.push(g.sig); } map[g.sig].items.push(g); });
    return order.map((s) => map[s]);
  }, [gallery]);
  const cfgOf = (sig) => cfgGroups.find((g) => g.sig === sig) || { label: "Constellation A", color: CE_CFG[0] };

  const genInto = (n, randomize) => {
    const add = [];
    for (let i = 0; i < n; i++) {
      const vals = {}; variables.forEach((v) => { const md = meta[v.token] || {}; const b = md.type === "bool"; vals[v.token] = randomize ? (b ? (Math.random() > .5 ? "on" : "off") : ceFill(v.label)) : (b ? "on" : (md.def || ceFill(v.label))); });
      add.push({ id: "g" + Date.now() + i, img: window.ENKI.genResult("live" + Date.now() + i, "4:5"), sig: curSig, vals, refs: genRefs.slice(), picked: false });
    }
    setGallery((g) => [...add, ...g]);
    onToast("Rendered " + n + " image" + (n > 1 ? "s" : "") + " · $" + (batchCost * n).toFixed(2) + " · " + cfgOf(curSig).label);
  };
  const togglePick = (id) => setGallery((g) => g.map((x) => x.id === id ? { ...x, picked: !x.picked } : x));
  const pickedCount = gallery.filter((g) => g.picked).length;
  const sortedFlat = useMemo(() => [...gallery].reverse(), [gallery]);

  return (
    <div className="ek-ed">
      {/* ── Word-style settings ribbon (single row, borderless) ── */}
      <div className="ce-ribbon">
        <div className="ce-rb-cell ce-rb-titlecell">
          <span className="ce-rb-lab">Prompt title</span>
          <input className="ce-rb-titlein" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Untitled prompt" />
        </div>
        <div className="ce-rb-sep" />
        <div className="ce-rb-cell ce-rb-modecell">
          <span className="ce-rb-lab">Mode</span>
          <div className="ce-seg">
            <button type="button" className={mode === "free" ? "active" : ""} onClick={() => setMode("free")}>Free</button>
            <button type="button" className={mode === "premium" ? "active" : ""} onClick={() => setMode("premium")}>Premium</button>
          </div>
          <span className="ce-rb-hint" title={mode === "premium" ? "Premium: the prompt body is hidden. Users only fill in your variables and pay you per render." : "Free: the entire prompt is public. Anyone can view, copy and remix it for free."}>
            {mode === "premium" ? "Paid · body hidden" : "Free · copy & remix"}
          </span>
        </div>
        <div className="ce-rb-sep" />
        <div className="ce-rb-cell">
          <span className="ce-rb-lab">Models</span>
          <MultiPick items={CE_MODELS} selected={models} onToggle={toggleModel} placeholder="Select" />
        </div>
        <div className="ce-rb-cell">
          <span className="ce-rb-lab">Category</span>
          <select className="ce-rb-field" value={cat} onChange={(e) => setCat(e.target.value)}>
            <option value="">Any</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="ce-rb-cell">
          <span className="ce-rb-lab">Ratio</span>
          <select className="ce-rb-field" value={ratio} onChange={(e) => setRatio(e.target.value)}>
            {CE_RATIOS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div className={"ce-rb-cell" + (mode === "premium" ? "" : " ce-invis")}>
          <span className="ce-rb-lab">Price · per render</span>
          <div className="ce-price ce-rb-price"><span>$</span><input type="number" step="0.01" value={price} onChange={(e) => setPrice(parseFloat(e.target.value) || 0)} /><span className="ce-price-cur">USDC</span></div>
        </div>
        <div className="ce-rb-spacer" />
        <button className="ce-rb-close" onClick={onClose} aria-label="Close editor"><Icon name="x" size={18} stroke={2} /></button>
      </div>

      {/* ── Prompt · Variables · Verify ── */}
      <div className="ce-main">
        <div className="ce-main-col ce-col-prompt">
          <div className="ce-main-head"><span className="ce-main-t">Prompt</span><button className="mm-addvar" onClick={addVar}>+ Variable</button></div>
          <div className="ce-main-scroll">
            <CEPrompt value={body} onChange={setBody} colors={colorMap} />
            <div className="ek-ed-sec" style={{ marginTop: 16, marginBottom: 0 }}>
              <span className="ek-ed-lab">Reference images · optional</span>
              <div style={{ display: "flex", gap: 9, flexWrap: "wrap" }}>
                <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={onFiles} />
                <button className="ek-editor-cover" style={{ width: 64, height: 64 }} onClick={() => fileRef.current && fileRef.current.click()}><Icon name="plus" size={17} stroke={2} /></button>
                {refs.map((src, i) => <img key={i} src={src} alt="ref" style={{ width: 64, height: 64, borderRadius: 9, objectFit: "cover", border: "1px solid var(--enki-rule)" }} />)}
              </div>
            </div>
          </div>
        </div>

        <div className="ce-main-col ce-col-vars">
          <div className="ce-main-head"><span className="ce-main-t">Variables</span><span className="ce-main-count">{variables.length}</span>
            <span className="ce-help-q" tabIndex={0}>?
              <span className="ce-help-pop"><b>Text</b> lets the user type their own words. <b>Checkbox</b> shows the user a tick-box to switch this detail on or off.</span>
            </span>
          </div>
          <div className="ce-main-scroll">
            {variables.length === 0 && <div className="ek-ed-hint">Wrap words in [brackets] in the prompt to create variables.</div>}
            {variables.map((v) => { const md = meta[v.token] || {}; const c = ceColor(v.ci); const isBool = md.type === "bool"; const open = openVar === v.token; const deep = deepVar === v.token; return (
              <div key={v.token} className={"ce-var" + (open ? " open" : "")} style={{ borderColor: open ? c.border : "var(--enki-rule)" }}>
                <button className="ce-var-head" onClick={() => { setOpenVar(open ? null : v.token); setDeepVar(null); }}>
                  <span className="ce-var-dot" style={{ background: c.border }} />
                  <span className="ce-var-name" style={{ color: c.text }}>{v.label}</span>
                  <span className="ce-var-type">{isBool ? "Checkbox" : "Text"}</span>
                  <Icon name="chevronDown" size={14} stroke={2} style={{ transform: open ? "rotate(180deg)" : "none", color: "var(--enki-ink-3)", transition: "transform .16s" }} />
                </button>
                {open && (
                  <div className="ce-var-body">
                    <div className="ek-ed-vtoggle ek-ed-vtoggle--wide">
                      <button className={!isBool ? "active" : ""} title="Text — the user types their own words for this variable" onClick={() => setMetaFor(v.token, { type: "text" })}>Text</button>
                      <button className={isBool ? "active" : ""} title="Checkbox — the user just toggles this detail on or off (no typing); the text below is the label shown next to it" onClick={() => setMetaFor(v.token, { type: "bool" })}>Checkbox</button>
                    </div>
                    {deep ? (
                      <textarea className="ek-ed-vin ek-ed-vta" rows={4} autoFocus value={md.def || ""} onChange={(e) => setMetaFor(v.token, { def: e.target.value })}
                        onBlur={() => setDeepVar(null)} placeholder={isBool ? "Label shown next to the checkbox · e.g. " + v.label : "Default value · e.g. " + v.label} />
                    ) : (
                      <button className="ce-var-preview" onClick={() => setDeepVar(v.token)}>
                        <span className="ce-var-preview-lab">{isBool ? "Checkbox label" : "Default value"}</span>
                        <span className={"ce-var-preview-val" + (md.def ? "" : " empty")}>{md.def || "Tap to write the " + (isBool ? "label" : "default") + "…"}</span>
                      </button>
                    )}
                    <button className="ce-var-del" onClick={() => { removeVar(v.token); setOpenVar(null); }}><Icon name="trash" size={13} stroke={2} /> Remove variable</button>
                  </div>
                )}
              </div>
            ); })}
          </div>
          <div className="ek-ed-batch ce-vars-foot">
            <div className="ce-genbar-refs">
              <input ref={genFileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={onGenFiles} />
              {genRefs.map((src, i) => (
                <span className="ce-genref" key={i}><img src={src} alt="ref" /><button onClick={() => setGenRefs((p) => p.filter((_, x) => x !== i))}><Icon name="x" size={9} stroke={2.6} /></button></span>
              ))}
              <button className="ce-genref-add" onClick={() => genFileRef.current && genFileRef.current.click()} title="Attach a reference image for the render"><Icon name="plus" size={13} stroke={2} /><Icon name="image" size={13} stroke={2} /></button>
              <span className="ce-vars-foot-note">Reference image for this render</span>
            </div>
            <div className="ce-genbar-actions">
              <button className="ek-btn" style={{ flex: 1, minHeight: 44, whiteSpace: "nowrap" }} onClick={() => genInto(1, false)}><Icon name="zap" size={15} stroke={2} fill="var(--cta-ink)" /> Render · ${batchCost.toFixed(2)}</button>
              <button className="ek-btn ek-btn-2" style={{ flex: "0 0 auto", minHeight: 44, padding: "0 14px", whiteSpace: "nowrap" }} onClick={() => genInto(4, true)} title="Generate 4 with varied variable values"><Icon name="wand" size={15} stroke={2} /> ×4</button>
            </div>
          </div>
        </div>

        <div className="ce-main-col ce-col-verify">
          <div className="ce-main-head"><span className="ce-main-t">Verify</span><span className="ce-main-count">{pickedCount}/{need} picked</span>
            <span className="ce-help-q" tabIndex={0}>?
              <span className="ce-help-pop" style={{ width: 230 }}>Render as many images as you like with different variable values. Images from the same prompt &amp; variable setup are grouped &amp; color-coded. Pick {need} to publish.</span>
            </span>
          </div>
          <div className="ce-main-scroll">
            {/* gallery sort */}
            <div className="ce-gallery-bar">
              <span className="ek-ed-lab" style={{ margin: 0 }}>{gallery.length} renders · {cfgGroups.length} constellations</span>
              <div className="ce-sort">
                <button className={sortMode === "group" ? "active" : ""} onClick={() => setSortMode("group")}>By config</button>
                <button className={sortMode === "newest" ? "active" : ""} onClick={() => setSortMode("newest")}>Newest</button>
              </div>
            </div>

            {sortMode === "group" ? cfgGroups.map((grp) => (
              <div key={grp.sig} className="ce-cfg" style={{ borderColor: grp.color.bar }}>
                <div className="ce-cfg-head" style={{ background: grp.color.soft, color: grp.color.ink }}>
                  <span className="ce-cfg-dot" style={{ background: grp.color.bar }} />
                  <span className="ce-cfg-label">{grp.label}</span>
                  <span className="ce-cfg-count">{grp.items.length} image{grp.items.length > 1 ? "s" : ""}</span>
                  {grp.sig === curSig && <span className="ce-cfg-now">current</span>}
                </div>
                <div className="ce-cfg-grid">
                  {grp.items.map((g) => (
                    <button key={g.id} className={"ce-shot" + (g.picked ? " picked" : "")} onClick={() => togglePick(g.id)} style={{ outlineColor: grp.color.bar }}>
                      <img src={g.img} alt="render" />
                      {g.picked && <span className="ce-shot-check" style={{ background: grp.color.bar }}><Icon name="check" size={12} stroke={3} /></span>}
                    </button>
                  ))}
                </div>
              </div>
            )) : (
              <div className="ce-cfg-grid ce-cfg-grid--flat">
                {sortedFlat.map((g) => { const col = cfgOf(g.sig).color; return (
                  <button key={g.id} className={"ce-shot" + (g.picked ? " picked" : "")} onClick={() => togglePick(g.id)} style={{ outlineColor: col.bar }}>
                    <img src={g.img} alt="render" />
                    <span className="ce-shot-tag" style={{ background: col.bar }}>{cfgOf(g.sig).label.replace("Constellation ", "")}</span>
                    {g.picked && <span className="ce-shot-check" style={{ background: col.bar }}><Icon name="check" size={12} stroke={3} /></span>}
                  </button>
                ); })}
              </div>
            )}
          </div>
          <div className="ek-ed-batch">
            <div className="ek-ed-batch-row">
              <span className="ek-ed-batch-lab">{pickedCount} of {need} selected to publish</span>
              <span><span className="ek-ed-batch-cost">${(batchCost).toFixed(2)} USDC</span><span className="ek-ed-batch-net">/ render</span></span>
            </div>
            <div className="ek-ed-batch-actions">
              <button className="ek-btn" style={{ width: "auto", flex: 1 }} onClick={() => { if (pickedCount < need) { onToast("Pick " + need + " image" + (need > 1 ? "s" : "") + " to publish (" + pickedCount + "/" + need + ")"); return; } onToast(pickedCount + " image" + (pickedCount > 1 ? "s" : "") + " published · prompt released"); onClose(); }}>
                <Icon name="sparkles" size={15} stroke={2} fill="var(--cta-ink)" /> Release with {pickedCount}/{need}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { PromptEditor });
