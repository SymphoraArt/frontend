/* Create Prompt 2 — node-based prompt creator */
const Icon = window.Icon;
const { useState, useRef, useEffect, useMemo, useCallback } = React;

const NC_MODELS = [
  { id: "nano-banana-pro", name: "Nano Banana Pro", price: 0.04 },
  { id: "gpt-image-2", name: "GPT Image 2", price: 0.06 },
  { id: "seedance-2", name: "Seedance 2", price: 0.08 },
];
const NC_RATIOS = ["Any", "1:1", "4:5", "3:4", "16:9", "9:16"];
const REF_COLOR = { bg: "#E8F8EE", text: "#1F5C38", border: "#1f8a5b", dot: "#1f8a5b" };
const TEXT_PALETTE = [
  { bg: "#F3E8FD", text: "#4A2E6E", border: "#8e44ad", dot: "#8e44ad" },
  { bg: "#FDF6E8", text: "#6E4A1E", border: "#c96838", dot: "#c96838" },
  { bg: "#E8F4FD", text: "#1E4A6E", border: "#2a6fdb", dot: "#2a6fdb" },
  { bg: "#FDE8F4", text: "#6E2E5A", border: "#c0398a", dot: "#c0398a" },
  { bg: "#E8F8F8", text: "#1E5C5C", border: "#0e8a8a", dot: "#0e8a8a" },
];
const FILL_DICT = {
  color: ["crimson", "teal", "amber", "indigo", "sage"],
  colour: ["crimson", "teal", "amber", "indigo"],
  mood: ["serene", "dramatic", "melancholic", "joyful"],
  time: ["golden hour", "blue hour", "midnight", "dawn"],
  lens: ["35mm", "85mm portrait", "anamorphic"],
  subject: ["a lone wanderer", "a porcelain dancer", "an old fisherman"],
  style: ["baroque", "minimalist", "cyberpunk", "art nouveau"],
  _: ["ethereal", "weathered", "luminous", "ornate", "windswept"],
};
const fillFor = (name) => {
  const k = name.toLowerCase().replace(/[^a-z]/g, "");
  for (const key in FILL_DICT) if (key !== "_" && k.includes(key)) return FILL_DICT[key][Math.floor(Math.random() * FILL_DICT[key].length)];
  return FILL_DICT._[Math.floor(Math.random() * FILL_DICT._.length)];
};

let NID = 1;
const nid = (p) => p + (NID++);

/* double-click to rename; static span otherwise */
function EditName({ value, onChange, className, placeholder, serif }) {
  const [edit, setEdit] = useState(false);
  const ref = useRef(null);
  useEffect(() => { if (edit && ref.current) { ref.current.focus(); ref.current.select(); } }, [edit]);
  if (edit) return (
    <input ref={ref} className={className} value={value} placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)} onBlur={() => setEdit(false)}
      onKeyDown={(e) => { if (e.key === "Enter") setEdit(false); }}
      onPointerDown={(e) => e.stopPropagation()} />
  );
  return <span className={className} title="Double-click to rename" style={{ cursor: "grab", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
    onDoubleClick={() => setEdit(true)}>{value || placeholder}</span>;
}

const TOKEN_RE = /(\[[^\]\n]+\])/g;
const isRefTok = (t) => /^\[Reference Image \d+\]$/.test(t);

const OUT_SETS = null;

/* pastel constellation colors (one per prompt-configuration row) */
const OUT_PALETTE = [
  { bg: "#FBE9E7", bar: "#e8836b", ink: "#8a3322", soft: "#FDF3F1" },
  { bg: "#E6F2FB", bar: "#5b9bd5", ink: "#1e4a6e", soft: "#F2F8FD" },
  { bg: "#E9F6EC", bar: "#5cb874", ink: "#1f5c38", soft: "#F4FBF6" },
  { bg: "#F4ECFB", bar: "#a06bd0", ink: "#4a2e6e", soft: "#FAF6FD" },
  { bg: "#FCF2E2", bar: "#e0a13a", ink: "#6e4a1e", soft: "#FEF9F0" },
  { bg: "#FBE9F3", bar: "#d56baa", ink: "#6e2e5a", soft: "#FDF3F9" },
];
const VPOOL = {
  style: ["flowing art-nouveau linework wrapped around organic forms, ornamental yet restrained", "bold baroque chiaroscuro reinterpreted through a modern minimalist lens", "soft watercolor washes bleeding into raw paper, loose and airy", "high-contrast cyberpunk neon, wet reflective surfaces everywhere", "delicate ukiyo-e woodblock flatness with fine outline", "grainy 1970s film still, faded kodachrome palette"],
  mood: ["serene and quietly melancholic, the calm right before rain", "tense and dramatic, heavy with anticipation", "warm, nostalgic golden-hour stillness", "electric, restless, buzzing with night energy", "dreamlike and weightless, softly out of focus"],
  texture: ["hyperreal graphite with fine tooth and soft smudging", "cracked oil-paint impasto catching raking light", "rough cold-press paper grain, visible fibers", "glossy chrome with sharp specular highlights", "matte risograph print with subtle misregistration"],
};
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const sigOf = (body, texts) => body + "||" + texts.map((t) => t.name + ":" + t.kind).join(",");
const randVals = (texts) => { const o = {}; texts.forEach((t) => { o["[" + t.name + "]"] = t.kind === "bool" ? (Math.random() > .5 ? "on" : "off") : pick(VPOOL[t.name] || VPOOL.style); }); return o; };
const CON_BODIES = [
  "Blend [Reference Image 1], [Reference Image 2] and [Reference Image 3] into one scene, reimagined in [style], dramatic [mood] lighting, [color] color grade, finished with a [texture] surface.",
  "Merge [Reference Image 1], [Reference Image 2] and [Reference Image 3] into a single composition — [style], a [mood] atmosphere, [color] color grade, a [texture] finish.",
  "A loose reinterpretation of [Reference Image 1] and [Reference Image 2] rendered in [style], carrying a [mood] tone, [color] grade and a [texture] look.",
  "[Reference Image 1] reimagined as [style], lit with a [mood] feeling, a [color] palette and a [texture] surface throughout.",
];

function NodeCreator({ onClose, onToast, theme }) {
  const PCX = 540, PCY = 300;
  const initial = () => {
    const refImgs = [window.ENKI.genResult("ncref1", "3:4"), window.ENKI.genResult("ncref2", "1:1"), window.ENKI.genResult("ncref3", "4:5")];
    const body = "Blend [Reference Image 1], [Reference Image 2] and [Reference Image 3] into one scene, reimagined in [style], dramatic [mood] lighting, [color] color grade, finished with a [texture] surface.";
    const texts = [
      { name: "style", kind: "text", value: "flowing art-nouveau linework wrapped around organic forms, ornamental yet restrained" },
      { name: "mood", kind: "text", value: "serene and quietly melancholic, the calm right before rain" },
      { name: "color", kind: "bool", value: "on" },
      { name: "texture", kind: "text", value: "hyperreal graphite with fine tooth and soft smudging" },
    ];
    const nodes = [
      { id: "prompt", type: "prompt", x: PCX, y: PCY },
      // 3 reference images in a row above the prompt
      { id: nid("r"), type: "ref", x: PCX - 250, y: PCY - 300, index: 1, img: refImgs[0], userInput: false },
      { id: nid("r"), type: "ref", x: PCX - 65, y: PCY - 300, index: 2, img: refImgs[1], userInput: true },
      { id: nid("r"), type: "ref", x: PCX + 120, y: PCY - 300, index: 3, img: refImgs[2], userInput: false },
      // text variables down the left
      ...texts.map((t, i) => ({ id: nid("t"), type: "text", x: PCX - 360, y: PCY - 40 + i * 165, name: t.name, kind: t.kind, pub: true, value: t.value })),
    ];
    // constellations: newest (current prompt) first; one pastel color each
    const cons = CON_BODIES.map((b, i) => ({ sig: sigOf(b, texts), body: b, cidx: i }));
    // 20 example images spread across the 4 prompt-configurations
    const counts = [8, 6, 4, 2];
    cons.forEach((con, ci) => {
      for (let j = 0; j < counts[ci]; j++) {
        nodes.push({ id: nid("o"), type: "output", sig: con.sig, vals: randVals(texts), img: window.ENKI.genResult("seed" + ci + "_" + j, "4:5"), status: "ready", picked: ci === 0 && j < 0 });
      }
    });
    return { title: "Untitled prompt", mode: "premium", models: ["nano-banana-pro"], cat: "", ratio: "Any", price: 0.1, body, cons, conSeq: CON_BODIES.length, genCount: 4, nodes };
  };

  const [st, setSt] = useState(initial);
  const stRef = useRef(st); stRef.current = st;
  const hist = useRef({ past: [], future: [] });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(1); zoomRef.current = zoom;
  const panRef = useRef(pan); panRef.current = pan;
  const [sel, setSel] = useState(null);
  const [armed, setArmed] = useState(null);
  const [ctx, setCtx] = useState(null);
  const [stale, setStale] = useState(false);
  const [dropOn, setDropOn] = useState(false);
  const [pulseId, setPulseId] = useState(null);
  const [expandedOuts, setExpandedOuts] = useState({});
  const toggleExpand = (id) => setExpandedOuts((m) => ({ ...m, [id]: !m[id] }));
  const [outEdit, setOutEdit] = useState(null);     // "outId:[token]" being edited in an output node
  const [confirmPush, setConfirmPush] = useState(null); // output id awaiting confirm to push values left
  const [dock, setDock] = useState({ x: 0, y: 0, placed: false });
  const canvasRef = useRef(null);
  const taRef = useRef(null), ovRef = useRef(null);

  const pushHist = () => { hist.current.past.push(stRef.current); if (hist.current.past.length > 60) hist.current.past.shift(); hist.current.future = []; };
  const commit = (updater) => { pushHist(); setSt(updater); };
  const undo = () => { if (!hist.current.past.length) return; hist.current.future.push(stRef.current); setSt(hist.current.past.pop()); };
  const redo = () => { if (!hist.current.future.length) return; hist.current.past.push(stRef.current); setSt(hist.current.future.pop()); };

  useEffect(() => { const k = (e) => { if (e.key === "Escape") { if (ctx) setCtx(null); else onClose(); } }; window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose, ctx]);

  /* cursor-anchored wheel zoom (max = 1, current size) */
  useEffect(() => {
    const el = canvasRef.current; if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      const z = zoomRef.current, p = panRef.current;
      const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
      const nz = Math.max(0.3, Math.min(1, z * factor));
      if (nz === z) return;
      const mx = e.clientX - 78, my = e.clientY;
      const wx = (mx - p.x) / z, wy = (my - p.y) / z;
      setPan({ x: mx - wx * nz, y: my - wy * nz }); setZoom(nz);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);
  const zoomBy = (factor) => {
    const z = zoomRef.current, p = panRef.current, nz = Math.max(0.3, Math.min(1, z * factor));
    if (nz === z) return;
    const mx = (window.innerWidth - 78) / 2, my = window.innerHeight / 2;
    const wx = (mx - p.x) / z, wy = (my - p.y) / z;
    setPan({ x: mx - wx * nz, y: my - wy * nz }); setZoom(nz);
  };

  const prompt = st.nodes.find((n) => n.id === "prompt");
  const refs = st.nodes.filter((n) => n.type === "ref");
  const texts = st.nodes.filter((n) => n.type === "text");
  const outs = st.nodes.filter((n) => n.type === "output");

  /* constellation rows: each unique prompt-config is one colored row; current prompt on top */
  const curSig = sigOf(st.body, texts);
  const layout = useMemo(() => {
    const OX = prompt.x + 560, ROWH = 326, COLW = 196, TOP = prompt.y - 330;
    const map = {}, frames = [];
    const seen = (st.cons || []).map((c) => c.sig);
    const order = seen.includes(curSig) ? st.cons.slice() : [{ sig: curSig, body: st.body, cidx: (st.conSeq || 0) }, ...(st.cons || [])];
    order.forEach((con, ri) => {
      const rowOuts = outs.filter((o) => o.sig === con.sig);
      const off = con.off || { x: 0, y: 0 };
      const fx = OX + off.x, y = TOP + ri * ROWH + off.y;
      rowOuts.forEach((o, ci) => { map[o.id] = { x: fx + 18 + ci * COLW, y: y + 34 }; });
      frames.push({ sig: con.sig, cidx: con.cidx, body: con.body, ri, x: fx, y, w: Math.max(1, rowOuts.length) * COLW + 30, count: rowOuts.length, current: con.sig === curSig });
    });
    return { map, frames, OX, ROWH, COLW, TOP };
  }, [st.cons, st.nodes, st.body, prompt.x, prompt.y, curSig]);
  const palOf = (cidx) => OUT_PALETTE[((cidx % OUT_PALETTE.length) + OUT_PALETTE.length) % OUT_PALETTE.length];

  /* token colors */
  const textColor = useMemo(() => { const m = {}; texts.forEach((t, i) => { m[t.name] = TEXT_PALETTE[i % TEXT_PALETTE.length]; }); return m; }, [st.nodes]);
  const colorForTok = (tok) => {
    if (isRefTok(tok)) return REF_COLOR;
    const name = tok.slice(1, -1);
    return textColor[name] || TEXT_PALETTE[0];
  };

  /* structure key → stale detection (disabled: prompt changes spawn a new constellation row instead) */

  /* ── mutations ── */
  const addRef = (img, atPos) => commit((p) => {
    const existing = p.nodes.filter((n) => n.type === "ref");
    const idx = existing.length + 1;
    const base = p.nodes.find((n) => n.id === "prompt");
    let pos = atPos;
    if (!pos) pos = existing.length
      ? { x: Math.max(...existing.map((n) => n.x)) + 185, y: Math.min(...existing.map((n) => n.y)) }
      : { x: base.x - 120, y: base.y - 250 };
    const node = { id: nid("r"), type: "ref", x: pos.x, y: pos.y, index: idx, img: img || window.ENKI.genResult("ncr" + Date.now(), "3:4"), userInput: false };
    return { ...p, nodes: [...p.nodes, node], body: p.body.replace(/\s*$/, "") + " [Reference Image " + idx + "]" };
  });
  const addText = (atPos) => commit((p) => {
    const existing = p.nodes.filter((n) => n.type === "text");
    const k = existing.length + 1;
    let name = "var_" + k; const used = new Set(existing.map((n) => n.name));
    let kk = k; while (used.has(name)) { kk++; name = "var_" + kk; }
    const base = p.nodes.find((n) => n.id === "prompt");
    let pos = atPos;
    if (!pos) pos = existing.length
      ? { x: Math.min(...existing.map((n) => n.x)), y: Math.max(...existing.map((n) => n.y)) + 220 }
      : { x: base.x - 330, y: base.y - 20 };
    const node = { id: nid("t"), type: "text", x: pos.x, y: pos.y, name, kind: "text", pub: true, value: "" };
    return { ...p, nodes: [...p.nodes, node], body: p.body.replace(/\s*$/, "") + " [" + name + "]" };
  });
  const addOutput = (atPos) => commit((p) => {
    const base = p.nodes.find((n) => n.id === "prompt");
    const n = p.nodes.filter((x) => x.type === "output").length;
    const pos = atPos || { x: base.x + 560, y: base.y - 30 + n * 230 };
    return { ...p, nodes: [...p.nodes, { id: nid("o"), type: "output", x: pos.x, y: pos.y, img: null, status: "empty" }] };
  });

  // current values from the text nodes, keyed by token
  const currentVals = () => { const o = {}; stRef.current.nodes.filter((n) => n.type === "text").forEach((t) => { o["[" + t.name + "]"] = t.value; }); return o; };
  const allFilled = () => stRef.current.nodes.filter((n) => n.type === "text").every((t) => t.kind === "bool" || (t.value && t.value.trim()));

  // generate (or regenerate) a single output, filling it with current variable data
  const genOutput = (id) => commit((p) => {
    const vals = {}; p.nodes.filter((n) => n.type === "text").forEach((t) => { vals["[" + t.name + "]"] = t.value; });
    return { ...p, nodes: p.nodes.map((n) => n.id === id ? { ...n, img: window.ENKI.genResult("ncout" + id + Date.now(), "4:5"), status: "ready", vals } : n) };
  });
  // ▶ generate → new output in the current constellation (new colored row on top if the prompt changed)
  const spawnOutput = () => {
    if (!allFilled()) { onToast("Fill in every variable value first"); return; }
    pushHist();
    const oid = nid("o");
    setSt((p) => {
      const tx = p.nodes.filter((n) => n.type === "text");
      const sig = sigOf(p.body, tx);
      let cons = (p.cons || []).slice(); let conSeq = p.conSeq || 0;
      if (!cons.some((c) => c.sig === sig)) { cons = [{ sig, body: p.body, cidx: conSeq }, ...cons]; conSeq += 1; }
      const vals = {}; tx.forEach((t) => { vals["[" + t.name + "]"] = t.value; });
      return { ...p, cons, conSeq, nodes: [...p.nodes, { id: oid, type: "output", sig, vals, img: window.ENKI.genResult("gen" + oid, "4:5"), status: "ready", picked: false }] };
    });
    setPulseId(oid); setTimeout(() => setPulseId((v) => (v === oid ? null : v)), 2800);
    onToast("Generated a new output in this prompt's row");
  };
  const togglePick = (id) => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => n.id === id ? { ...n, picked: !n.picked } : n) }));
  // edit one variable value stored on an output node
  const setOutVal = (id, tok, v) => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => n.id === id ? { ...n, vals: { ...(n.vals || {}), [tok]: v } } : n) }));
  // overwrite the left-side text-node values with an output's stored values
  const pushValuesLeft = (id) => { commit((p) => { const o = p.nodes.find((n) => n.id === id); const vals = (o && o.vals) || {}; return { ...p, nodes: p.nodes.map((n) => n.type === "text" && vals["[" + n.name + "]"] !== undefined ? { ...n, value: vals["[" + n.name + "]"] } : n) }; }); setConfirmPush(null); onToast("Variable values copied to the editor on the left"); };

  const reindexRefs = (nodes, body) => {
    const rfs = nodes.filter((n) => n.type === "ref");
    let nb = body; const map = {};
    rfs.forEach((r, i) => { map[r.index] = i + 1; });
    // placeholder pass
    Object.keys(map).forEach((oldI) => { nb = nb.split("[Reference Image " + oldI + "]").join("[[REFTMP " + map[oldI] + "]]"); });
    nb = nb.split("[[REFTMP ").join("[Reference Image ").split("]]").join("]");
    const nn = nodes.map((n) => n.type === "ref" ? { ...n, index: map[n.index] } : n);
    return { nodes: nn, body: nb };
  };

  const deleteNodeId = (id) => commit((p) => {
    const node = p.nodes.find((n) => n.id === id);
    if (!node || node.type === "prompt") return p;
    let nodes = p.nodes.filter((n) => n.id !== id);
    let body = p.body;
    if (node.type === "ref") { body = body.split("[Reference Image " + node.index + "]").join("").replace(/\s{2,}/g, " ").trim(); const r = reindexRefs(nodes, body); nodes = r.nodes; body = r.body; }
    else if (node.type === "text") { body = body.split("[" + node.name + "]").join("").replace(/\s{2,}/g, " ").trim(); }
    return { ...p, nodes, body };
  });

  const renameText = (id, newName) => setSt((p) => {
    const node = p.nodes.find((n) => n.id === id); if (!node) return p;
    const clean = newName.replace(/[\[\]\n]/g, "");
    const body = p.body.split("[" + node.name + "]").join("[" + clean + "]");
    return { ...p, nodes: p.nodes.map((n) => n.id === id ? { ...n, name: clean } : n), body };
  });

  /* ── delete-key two-press on prompt tokens ── */
  const tokenAtCaret = () => {
    const ta = taRef.current; if (!ta) return null;
    const c = ta.selectionStart; let m; const re = new RegExp(TOKEN_RE.source, "g");
    while ((m = re.exec(st.body)) !== null) { if (c >= m.index && c <= m.index + m[0].length) return m[0]; }
    return null;
  };
  const onPromptKey = (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      const tok = tokenAtCaret();
      if (tok) {
        e.preventDefault();
        if (armed === tok) { setArmed(null); if (isRefTok(tok)) { const idx = +tok.match(/\d+/)[0]; const r = refs.find((x) => x.index === idx); if (r) deleteNodeId(r.id); } else { const t = texts.find((x) => x.name === tok.slice(1, -1)); if (t) deleteNodeId(t.id); } }
        else setArmed(tok);
      } else setArmed(null);
    }
  };

  /* ── generation ── */
  const perImage = st.models.reduce((s, id) => s + (NC_MODELS.find((m) => m.id === id)?.price || 0), 0) || 0.04;
  const imgCount = st.genCount;
  const cost = perImage * imgCount;

  const runGenerate = (autofill) => {
    pushHist();
    const n = st.genCount;
    setSt((p) => {
      let tx = p.nodes.filter((nn) => nn.type === "text");
      let nodes = p.nodes.map((nn) => ({ ...nn }));
      if (autofill) { const rv = randVals(tx); nodes = nodes.map((nn) => nn.type === "text" ? { ...nn, value: (rv["[" + nn.name + "]"] !== undefined ? rv["[" + nn.name + "]"] : nn.value) } : nn); tx = nodes.filter((nn) => nn.type === "text"); }
      const sig = sigOf(p.body, tx);
      let cons = (p.cons || []).slice(); let conSeq = p.conSeq || 0;
      if (!cons.some((c) => c.sig === sig)) { cons = [{ sig, body: p.body, cidx: conSeq }, ...cons]; conSeq += 1; }
      for (let i = 0; i < n; i++) { const vals = autofill ? randVals(tx) : (() => { const o = {}; tx.forEach((t) => { o["[" + t.name + "]"] = t.value; }); return o; })(); const oid = nid("o"); nodes.push({ id: oid, type: "output", sig, vals, img: window.ENKI.genResult("batch" + oid + i, "4:5"), status: "ready", picked: false }); }
      return { ...p, cons, conSeq, nodes };
    });
    onToast((autofill ? "Auto-filled & rendered " : "Rendered ") + n + " images · $" + (perImage * n).toFixed(2));
  };

  const release = () => {
    const need = st.mode === "free" ? 1 : 4;
    const ready = outs.filter((o) => o.img && o.status === "ready");
    const picked = ready.filter((o) => o.picked);
    if (ready.length < need) { onToast("Generate " + need + " example" + (need > 1 ? "s" : "") + " first — fill variables and click ▶ on the prompt (" + ready.length + "/" + need + ")"); return; }
    if (picked.length < need) { onToast("Select " + need + " output" + (need > 1 ? "s" : "") + " to publish — tap the ★ on the ones you want shown (" + picked.length + "/" + need + ")"); return; }
    onToast(picked.length + " selected output" + (picked.length > 1 ? "s" : "") + " published · prompt released to marketplace"); onClose();
  };

  /* ── dragging (nodes / pan / dock) ── */
  const drag = useRef(null);
  const onPointerMove = useCallback((e) => {
    const d = drag.current; if (!d) return;
    const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
    if (d.kind === "pan") setPan({ x: d.ox + dx, y: d.oy + dy });
    else if (d.kind === "node") setSt((p) => ({ ...p, nodes: p.nodes.map((n) => n.id === d.id ? { ...n, x: d.ox + dx / zoomRef.current, y: d.oy + dy / zoomRef.current } : n) }));
    else if (d.kind === "dock") { let nx = d.ox + dx, ny = d.oy + dy; setDock({ x: nx, y: ny, placed: true }); }
    else if (d.kind === "row") setSt((p) => ({ ...p, cons: (p.cons || []).map((c) => c.sig === d.sig ? { ...c, off: { x: d.ox + dx / zoomRef.current, y: d.oy + dy / zoomRef.current } } : c) }));
  }, []);
  const endDrag = useCallback(() => { drag.current = null; document.body.style.userSelect = ""; window.removeEventListener("pointermove", onPointerMove); window.removeEventListener("pointerup", endDrag); }, [onPointerMove]);
  const startDrag = (kind, e, extra) => {
    e.stopPropagation();
    drag.current = { kind, sx: e.clientX, sy: e.clientY, ...extra };
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", onPointerMove); window.addEventListener("pointerup", endDrag);
  };
  const startNodeDrag = (id, e) => { const n = st.nodes.find((x) => x.id === id); pushHist(); setSel(id); startDrag("node", e, { id, ox: n.x, oy: n.y }); };
  const startRowDrag = (sig, e) => {
    const con = (st.cons || []).find((c) => c.sig === sig); const off = (con && con.off) || { x: 0, y: 0 };
    if (!con) setSt((p) => ({ ...p, cons: [{ sig, body: p.body, cidx: (p.conSeq || 0), off: { x: 0, y: 0 } }, ...(p.cons || [])], conSeq: (p.conSeq || 0) + 1 }));
    startDrag("row", e, { sig, ox: off.x, oy: off.y });
  };
  const startPan = (e) => { if (e.button !== 0) return; setSel(null); setCtx(null); startDrag("pan", e, { ox: pan.x, oy: pan.y }); };
  const startDock = (e) => { const dx = dock.placed ? dock.x : window.innerWidth - 78 - 332, dy = dock.placed ? dock.y : 80; startDrag("dock", e, { ox: dx, oy: dy }); };

  /* ── drop images ── */
  const onDrop = (e) => {
    e.preventDefault(); setDropOn(false);
    const files = Array.from(e.dataTransfer.files || []).filter((f) => f.type.startsWith("image/"));
    if (!files.length) { addRef(null); return; }
    files.forEach((f) => { const r = new FileReader(); r.onload = () => addRef(r.result); r.readAsDataURL(f); });
  };

  /* ── ports & edges ── */
  const portPos = (n, which) => {
    if (n.type === "prompt") {
      if (which === "ref") return { x: n.x, y: n.y + 116 };
      if (which === "text") return { x: n.x, y: n.y + 150 };
      return { x: n.x + 480, y: n.y + 116 }; // output
    }
    if (n.type === "output") return { x: n.x, y: n.y + 30 };
    return { x: n.x + (n.type === "ref" ? 172 : 250), y: n.y + 30 };
  };
  const edges = [];
  refs.forEach((r) => edges.push({ from: portPos(r), to: portPos(prompt, "ref"), c: REF_COLOR.dot }));
  texts.forEach((t) => edges.push({ from: portPos(t), to: portPos(prompt, "text"), c: (textColor[t.name] || TEXT_PALETTE[0]).dot }));
  outs.forEach((o) => { const pos = layout.map[o.id]; if (pos) edges.push({ from: portPos(prompt, "out"), to: { x: pos.x, y: pos.y + 30 }, c: palOf((st.cons.find((c) => c.sig === o.sig) || {}).cidx || 0).bar }); });
  const path = (a, b) => { const mx = Math.round((a.x + b.x) / 2); return "M" + a.x + "," + a.y + " H" + mx + " V" + b.y + " H" + b.x; };

  const ctxAdd = (type) => { const w = { x: ctx.wx, y: ctx.wy }; setCtx(null); if (type === "text") addText(w); else if (type === "ref") addRef(null, w); else addOutput(w); };

  return (
    <div className="nc">
      {/* canvas */}
      <div ref={canvasRef} className={"nc-canvas" + (drag.current && drag.current.kind === "pan" ? " panning" : "")}
        onPointerDown={startPan}
        onContextMenu={(e) => { e.preventDefault(); setCtx({ x: e.clientX, y: e.clientY, wx: (e.clientX - 78 - pan.x) / zoom, wy: (e.clientY - pan.y) / zoom }); }}>
        <div className="nc-world" style={{ transform: "translate(" + pan.x + "px," + pan.y + "px) scale(" + zoom + ")" }}>
          {/* edges */}
          <svg className="nc-edges" width="4000" height="3000">
            {edges.map((e, i) => <path key={i} className="nc-edge" d={path(e.from, e.to)} stroke={e.c} />)}
          </svg>

          {/* constellation row frames (one pastel per prompt-config) */}
          {layout.frames.map((f) => { const pal = palOf(f.cidx); return (
            <div key={f.sig} className={"nc-cframe" + (f.current ? " current" : "")} style={{ left: f.x, top: f.y, width: f.w, height: 300, background: pal.soft, borderColor: pal.bar }}>
              <div className="nc-clabel" style={{ background: pal.bg, color: pal.ink }} onPointerDown={(e) => startRowDrag(f.sig, e)} title="Drag to move this prompt variant">
                <Icon name="grip" size={13} stroke={2} style={{ opacity: .6 }} />
                <span className="nc-clabel-dot" style={{ background: pal.bar }} />
                {f.current ? "Current prompt" : "Prompt variant"} · {f.count} image{f.count === 1 ? "" : "s"}
              </div>
            </div>
          ); })}

          {/* prompt node */}
          <div className={"nc-node nc-prompt" + (sel === "prompt" ? " sel" : "")} style={{ left: prompt.x, top: prompt.y }}
            onDrop={onDrop} onDragOver={(e) => { e.preventDefault(); setDropOn(true); }} onDragLeave={() => setDropOn(false)} onPointerDown={() => setSel("prompt")}>
            {dropOn && <div className="nc-dropglow" />}
            <div className="nc-nhead" onPointerDown={(e) => startNodeDrag("prompt", e)}>
              <span className="nc-ndot" style={{ background: "var(--enki-ember)" }} />
              <EditName className="nc-ribbon-title" value={st.title} onChange={(v) => setSt((p) => ({ ...p, title: v }))} placeholder="Untitled prompt" />
              <button className={"nc-prompt-genbtn" + (allFilled() ? "" : " disabled")} title={allFilled() ? "Generate an image into this prompt's row" : "Fill every variable value first"} onPointerDown={(e) => e.stopPropagation()} onClick={spawnOutput}>
                <Icon name="sparkles" size={14} stroke={2} fill={allFilled() ? "var(--cta-ink)" : "none"} /> Generate
              </button>
            </div>
            <div className="nc-nbody">
              <div className="nc-pbox">
                <div className="nc-pov" ref={ovRef} aria-hidden="true">
                  {st.body.split(TOKEN_RE).map((p, i) => { if (TOKEN_RE.test(p) && /^\[[^\]\n]+\]$/.test(p)) { const c = colorForTok(p); return <span key={i} className={"nc-tok" + (armed === p ? " armed" : "")} style={{ background: c.bg, color: c.text, boxShadow: "inset 0 0 0 1px " + c.border }}>{p}</span>; } return <span key={i}>{p}</span>; })}{"\n"}
                </div>
                <textarea ref={taRef} className="nc-pta" value={st.body}
                  onChange={(e) => setSt((p) => ({ ...p, body: e.target.value }))}
                  onFocus={pushHist} onKeyDown={onPromptKey}
                  onScroll={() => { if (ovRef.current && taRef.current) ovRef.current.scrollTop = taRef.current.scrollTop; }}
                  onPointerDown={(e) => e.stopPropagation()} spellCheck={false} />
              </div>
              <div className="nc-addrow">
                <button className="nc-addbtn" style={{ borderColor: REF_COLOR.border, color: REF_COLOR.text, background: REF_COLOR.bg }} onClick={() => addRef(null)}>
                  <Icon name="imageDrop" size={15} stroke={2} /> Add Reference Image
                </button>
                <button className="nc-addbtn" style={{ borderColor: TEXT_PALETTE[0].border, color: TEXT_PALETTE[0].text, background: TEXT_PALETTE[0].bg }} onClick={() => addText()}>
                  <Icon name="type" size={15} stroke={2} /> Add Text Input
                </button>
              </div>
              <div className="nc-pnote">Drag images onto this node to attach them · drop generates a numbered reference.</div>
            </div>
            {/* ports */}
            <span className="nc-port" style={{ left: -7, top: 109, background: REF_COLOR.dot }} />
            <span className="nc-port-lab" style={{ left: 16, top: 104 }}>ref</span>
            <span className="nc-port" style={{ left: -7, top: 143, background: TEXT_PALETTE[0].dot }} />
            <span className="nc-port-lab" style={{ left: 16, top: 138 }}>text</span>
            <button className={"nc-prompt-out" + (allFilled() ? "" : " disabled")} title={allFilled() ? "Generate an output from the current variables" : "Fill every variable value first"}
              onPointerDown={(e) => e.stopPropagation()} onClick={spawnOutput}>
              <Icon name="arrowRight" size={16} stroke={2.6} />
            </button>
            <span className="nc-port-lab" style={{ right: 14, top: 138 }}>images</span>
          </div>

          {/* ref nodes */}
          {refs.map((r) => (
            <div key={r.id} className={"nc-node nc-ref" + (sel === r.id ? " sel" : "")} style={{ left: r.x, top: r.y }} onPointerDown={() => setSel(r.id)}>
              <div className="nc-nhead" onPointerDown={(e) => startNodeDrag(r.id, e)}>
                <span className="nc-ndot" style={{ background: REF_COLOR.dot }} />
                <span className="nc-ntitle">Reference Image {r.index}</span>
                <button className="nc-ntrash" onClick={() => deleteNodeId(r.id)}><Icon name="trash" size={14} stroke={2} /></button>
              </div>
              <div className="nc-nbody">
                <img className="nc-ref-img" src={r.img} alt={"ref " + r.index} draggable={false} />
                <span className="nc-ref-num">{r.index}</span>
                <label className="nc-chk" onClick={() => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => n.id === r.id ? { ...n, userInput: !n.userInput } : n) }))}>
                  <span className={"nc-chk-box" + (r.userInput ? " on" : "")}>{r.userInput && <Icon name="check" size={11} stroke={3} />}</span> User input
                </label>
              </div>
              <span className="nc-port" style={{ right: -7, top: 23, background: REF_COLOR.dot }} />
            </div>
          ))}

          {/* text nodes */}
          {texts.map((t) => { const c = textColor[t.name] || TEXT_PALETTE[0]; return (
            <div key={t.id} className={"nc-node nc-text" + (sel === t.id ? " sel" : "")} style={{ left: t.x, top: t.y }} onPointerDown={() => setSel(t.id)}>
              <div className="nc-nhead" onPointerDown={(e) => startNodeDrag(t.id, e)}>
                <span className="nc-ndot" style={{ background: c.dot }} />
                <EditName className="nc-ntitle" value={t.name} onChange={(v) => renameText(t.id, v)} placeholder={t.name} />
                <button className="nc-ntrash" onClick={() => deleteNodeId(t.id)}><Icon name="trash" size={14} stroke={2} /></button>
              </div>
              <div className="nc-nbody">
                <div className="nc-vtoggle">
                  <button className={t.kind === "text" ? "active" : ""} title="Text — the user types their own words" onClick={() => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => n.id === t.id ? { ...n, kind: "text" } : n) }))}>Text</button>
                  <button className={t.kind === "bool" ? "active" : ""} title="Checkbox — the user just toggles this detail on or off (no typing)" onClick={() => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => n.id === t.id ? { ...n, kind: "bool", value: (n.value === "Yes" || n.value === "on") ? "on" : "off" } : n) }))}>Checkbox</button>
                </div>
                {t.kind === "text"
                  ? <textarea className="nc-vin nc-varea" placeholder={"Default value · e.g. " + t.name} value={t.value} onChange={(e) => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => n.id === t.id ? { ...n, value: e.target.value } : n) }))} onPointerDown={(e) => e.stopPropagation()} spellCheck={false} />
                  : <label className="nc-chk" title="Default state of the checkbox the user will see" onClick={() => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => n.id === t.id ? { ...n, value: (n.value === "on" || n.value === "Yes") ? "off" : "on" } : n) }))}>
                      <span className={"nc-chk-box" + (t.value === "on" || t.value === "Yes" ? " on" : "")}>{(t.value === "on" || t.value === "Yes") && <Icon name="check" size={11} stroke={3} />}</span> Checked by default
                    </label>}
                <label className="nc-chk" onClick={() => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => n.id === t.id ? { ...n, pub: !n.pub } : n) }))}>
                  <span className={"nc-chk-box" + (t.pub ? " on" : "")}>{t.pub && <Icon name="check" size={11} stroke={3} />}</span> Publicly visible (user controls)
                </label>
              </div>
              <span className="nc-port" style={{ right: -7, top: 23, background: c.dot }} />
            </div>
          ); })}

          {/* output nodes (auto-laid-out into constellation rows) */}
          {outs.map((o) => { const pos = layout.map[o.id]; if (!pos) return null; const pal = palOf((st.cons.find((c) => c.sig === o.sig) || {}).cidx || 0); const exp = expandedOuts[o.id];
            return (
            <div key={o.id} className={"nc-node nc-out" + (sel === o.id ? " sel" : "") + (o.picked ? " picked" : "")} style={{ left: pos.x, top: pos.y, borderColor: o.picked ? undefined : pal.bar }} onPointerDown={() => setSel(o.id)}>
              {pulseId === o.id && <span className="nc-pulse" style={{ color: pal.bar }}><Icon name="arrowRight" size={20} stroke={3} /></span>}
              <div className="nc-nhead" style={{ background: pal.bg }}>
                <span className="nc-ndot" style={{ background: pal.bar }} />
                <span className="nc-ntitle" style={{ color: pal.ink }}>Image</span>
                {o.img && <button className={"nc-out-pick" + (o.picked ? " on" : "")} title={o.picked ? "Selected to publish" : "Select this output to publish"} onPointerDown={(e) => e.stopPropagation()} onClick={() => togglePick(o.id)}><Icon name="star" size={14} stroke={2} fill={o.picked ? "currentColor" : "none"} /></button>}
                {o.img && <button className="nc-out-pushbtn" title="Send these values to the editor on the left" onPointerDown={(e) => e.stopPropagation()} onClick={() => setConfirmPush(o.id)}><Icon name="chevronLeft" size={15} stroke={2.4} /></button>}
                <button className="nc-ntrash" onClick={() => deleteNodeId(o.id)}><Icon name="trash" size={14} stroke={2} /></button>
              </div>
              <div className="nc-nbody">
                {o.img ? <img className="nc-out-img" src={o.img} alt="output" draggable={false} /> : <div className="nc-out-empty"><Icon name="image" size={20} stroke={1.6} /> empty</div>}
                {o.img && texts.length > 0 && (
                  <>
                    <button className="nc-out-toggle" onPointerDown={(e) => e.stopPropagation()} onClick={() => toggleExpand(o.id)}>
                      <Icon name="chevronDown" size={13} stroke={2.4} style={{ transform: exp ? "rotate(180deg)" : "none" }} /> {texts.length} variable value{texts.length === 1 ? "" : "s"}
                    </button>
                    {exp && (
                      <div className="nc-out-vars">
                        {texts.map((t) => { const c = textColor[t.name] || TEXT_PALETTE[0]; const tok = "[" + t.name + "]"; const raw = (o.vals || {})[tok]; const val = raw !== undefined ? raw : t.value; const isBool = t.kind === "bool"; const disp = isBool ? (val === "on" ? "On" : "Off") : (val || "—"); const ekey = o.id + ":" + tok; const open = outEdit === ekey;
                          if (open) return isBool ? (
                            <div className="nc-out-var nc-out-var--edit" key={t.id} style={{ background: c.bg, boxShadow: "inset 0 0 0 1px " + c.border }} onPointerDown={(e) => e.stopPropagation()}>
                              <span className="nc-out-var-k" style={{ color: c.text }}>{t.name}</span>
                              <button type="button" className={"ce-vex-knob" + (val === "on" ? " on" : "")} style={{ background: val === "on" ? "var(--enki-ember)" : "var(--enki-rule)" }} onClick={() => setOutVal(o.id, tok, val === "on" ? "off" : "on")} />
                              <span style={{ fontSize: 11 }}>{disp}</span>
                              <button className="nc-out-var-done" onClick={() => setOutEdit(null)}><Icon name="check" size={12} stroke={2.6} /></button>
                            </div>
                          ) : (
                            <div className="nc-out-var nc-out-var--edit" key={t.id} style={{ background: c.bg, boxShadow: "inset 0 0 0 1px " + c.border }} onPointerDown={(e) => e.stopPropagation()}>
                              <span className="nc-out-var-k" style={{ color: c.text }}>{t.name}</span>
                              <textarea className="nc-out-var-input" rows={2} autoFocus value={val} onChange={(e) => setOutVal(o.id, tok, e.target.value)} onBlur={() => setOutEdit(null)} />
                            </div>
                          );
                          return (
                            <button className="nc-out-var" key={t.id} title={"Click to edit · " + t.name + ": " + disp} style={{ background: c.bg, boxShadow: "inset 0 0 0 1px " + c.border }} onPointerDown={(e) => e.stopPropagation()} onClick={() => setOutEdit(ekey)}>
                              <span className="nc-out-var-k" style={{ color: c.text }}>{t.name}</span>
                              <span className="nc-out-var-v">{disp}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
              {confirmPush === o.id && (
                <div className="nc-confirm" onPointerDown={(e) => e.stopPropagation()}>
                  <div className="nc-confirm-t">Overwrite the variable values in the left-hand editor with this image's values?</div>
                  <div className="nc-confirm-actions">
                    <button className="nc-confirm-no" onClick={() => setConfirmPush(null)}>Cancel</button>
                    <button className="nc-confirm-yes" onClick={() => pushValuesLeft(o.id)}>Overwrite</button>
                  </div>
                </div>
              )}
            </div>
          ); })}
        </div>
      </div>

      {/* settings ribbon (compact, auto-width) */}
      <div className="nc-ribbon">
        <div className="nc-rb-tools">
          <button className="nc-iconbtn" onClick={undo} disabled={!hist.current.past.length} title="Undo"><Icon name="undo" size={15} stroke={2} /></button>
          <button className="nc-iconbtn" onClick={redo} disabled={!hist.current.future.length} title="Redo"><Icon name="redo" size={15} stroke={2} /></button>
          <span className="nc-rb-div" />
          <button className="nc-iconbtn" onClick={() => zoomBy(1 / 1.2)} title="Zoom out">−</button>
          <span className="nc-zoomval" title="Reset zoom" onClick={() => zoomBy(1 / zoomRef.current)}>{Math.round(zoom * 100)}%</span>
          <button className="nc-iconbtn" onClick={() => zoomBy(1.2)} disabled={zoom >= 1} title="Zoom in">+</button>
        </div>
        <span className="nc-rb-div" />
        <div className="nc-rb-cell">
          <span className="nc-rb-lab">Title</span>
          <input className="nc-rb-input" value={st.title} onChange={(e) => setSt((p) => ({ ...p, title: e.target.value }))} placeholder="Untitled prompt" />
        </div>
        <div className="nc-rb-cell">
          <span className="nc-rb-lab">Mode</span>
          <div className="ce-seg">
            <button type="button" className={st.mode === "free" ? "active" : ""} onClick={() => setSt((p) => ({ ...p, mode: "free" }))}>Free</button>
            <button type="button" className={st.mode === "premium" ? "active" : ""} onClick={() => setSt((p) => ({ ...p, mode: "premium" }))}>Premium</button>
          </div>
        </div>
        <div className="nc-rb-cell">
          <span className="nc-rb-lab">Models</span>
          <select className="nc-rb-sel" value={st.models[0]} onChange={(e) => setSt((p) => ({ ...p, models: [e.target.value] }))}>
            {NC_MODELS.map((m) => <option key={m.id} value={m.id}>{m.name} · ${m.price.toFixed(2)}</option>)}
          </select>
        </div>
        <div className="nc-rb-cell">
          <span className="nc-rb-lab">Category</span>
          <select className="nc-rb-sel" value={st.cat} onChange={(e) => setSt((p) => ({ ...p, cat: e.target.value }))}>
            <option value="">Any</option>
            {window.ENKI.CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="nc-rb-cell">
          <span className="nc-rb-lab">Ratio</span>
          <select className="nc-rb-sel" value={st.ratio} onChange={(e) => setSt((p) => ({ ...p, ratio: e.target.value }))}>
            {NC_RATIOS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <span className="nc-rb-div" />
        <button className="nc-iconbtn" onClick={onClose} title="Close"><Icon name="x" size={17} stroke={2} /></button>
      </div>

      {/* stale banner removed — prompt changes now spawn a new colored constellation row */}

      {/* generate dock (draggable) */}
      <div className="nc-dock" style={{ left: dock.placed ? dock.x : "auto", right: dock.placed ? "auto" : 16, top: dock.placed ? dock.y : 80 }}>
        <div className="nc-dock-grip" onPointerDown={startDock}>
          <Icon name="grip" size={15} stroke={2} style={{ color: "var(--enki-ink-3)" }} />
          <span className="nc-dock-grip-t">Generate</span>
        </div>
        <div className="nc-dock-body">
          <div className="nc-dock-row">
            <span className="nc-dock-lab">Batch images</span>
            <div className="nc-step">
              <button onClick={() => setSt((p) => ({ ...p, genCount: Math.max(1, p.genCount - 1) }))}>−</button>
              <span>{imgCount}</span>
              <button onClick={() => setSt((p) => ({ ...p, genCount: Math.min(8, p.genCount + 1) }))}>+</button>
            </div>
          </div>
          <div className="nc-cost">
            <span><span className="nc-cost-v">${cost.toFixed(2)}</span> <span className="nc-cost-net">USDC</span></span>
            <span className="nc-cost-net">{imgCount}×${perImage.toFixed(2)}</span>
          </div>
          <div className="nc-dock-actions">
            <button className="ek-btn ek-btn-2" onClick={() => runGenerate(true)}><Icon name="wand" size={13} stroke={2} /> Autofill</button>
            <button className="ek-btn ek-btn-2" onClick={() => runGenerate(false)}><Icon name="zap" size={13} stroke={2} fill="currentColor" /> Pay &amp; Gen</button>
            <button className="ek-btn" onClick={release}><Icon name="sparkles" size={13} stroke={2} fill="var(--cta-ink)" /> Release</button>
          </div>
          <div className="nc-reqnote">Set variables → click <b>Generate</b> on the prompt (or batch here) · images group by prompt into colored rows · tap <b>★</b> to choose which publish. <b>Free</b> 1 · <b>Paid</b> 4.</div>
        </div>
      </div>

      {/* context menu */}
      {ctx && (
        <div className="nc-ctx" style={{ left: Math.min(ctx.x, window.innerWidth - 210), top: Math.min(ctx.y, window.innerHeight - 170) }} onPointerDown={(e) => e.stopPropagation()}>
          <button className="nc-ctx-item" onClick={() => ctxAdd("text")}><span className="nc-ctx-ico" style={{ background: TEXT_PALETTE[0].dot }}><Icon name="type" size={15} stroke={2} /></span> Add Text Input</button>
          <button className="nc-ctx-item" onClick={() => ctxAdd("ref")}><span className="nc-ctx-ico" style={{ background: REF_COLOR.dot }}><Icon name="imageDrop" size={15} stroke={2} /></span> Add Reference Image</button>
          <button className="nc-ctx-item" onClick={() => ctxAdd("output")}><span className="nc-ctx-ico" style={{ background: "var(--enki-ember)" }}><Icon name="image" size={15} stroke={2} /></span> Add Output Image</button>
        </div>
      )}

      <div className="nc-help"><b>Tip:</b> right-click the canvas to add nodes · drag images onto the prompt · press <b>Delete</b> twice on a colored token to remove it.</div>
    </div>
  );
}

Object.assign(window, { NodeCreator });
