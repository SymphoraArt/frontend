"use client";

/* Create Prompt 2 — node-based prompt creator.
   Ported from the design bundle (enki/nodecreator.jsx) and wired to real, free
   Nano Banana Pro generation (Puter.js) + best-effort DB persistence. */

import { useState, useRef, useEffect, useMemo, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Ratio as RatioIcon, Maximize2 } from "lucide-react";
import { Icon } from "./icons";
import { generateNanoBanana, persistCreation, placeholderArt } from "./generation";

/* ── constants ── */
const NC_MODELS = [
  { id: "nano-banana-pro", name: "Nano Banana Pro", price: 0.04 },
  { id: "gpt-image-2", name: "GPT Image 2", price: 0.06 },
  { id: "seedance-2", name: "Seedance 2", price: 0.08 },
];
const NC_RATIOS = ["Any", "1:1", "4:5", "3:4", "16:9", "9:16"];
const CATEGORIES = ["Portrait", "Character", "Cinematic", "Architecture", "Abstract", "Product", "Minimal", "Editorial"];

const REF_COLOR = { bg: "#E8F8EE", text: "#1F5C38", border: "#1f8a5b", dot: "#1f8a5b" };
const TEXT_PALETTE = [
  { bg: "#F3E8FD", text: "#4A2E6E", border: "#8e44ad", dot: "#8e44ad" },
  { bg: "#FDF6E8", text: "#6E4A1E", border: "#c96838", dot: "#c96838" },
  { bg: "#E8F4FD", text: "#1E4A6E", border: "#2a6fdb", dot: "#2a6fdb" },
  { bg: "#FDE8F4", text: "#6E2E5A", border: "#c0398a", dot: "#c0398a" },
  { bg: "#E8F8F8", text: "#1E5C5C", border: "#0e8a8a", dot: "#0e8a8a" },
];
const OUT_PALETTE = [
  { bg: "#FBE9E7", bar: "#e8836b", ink: "#8a3322", soft: "#FDF3F1" },
  { bg: "#E6F2FB", bar: "#5b9bd5", ink: "#1e4a6e", soft: "#F2F8FD" },
  { bg: "#E9F6EC", bar: "#5cb874", ink: "#1f5c38", soft: "#F4FBF6" },
  { bg: "#F4ECFB", bar: "#a06bd0", ink: "#4a2e6e", soft: "#FAF6FD" },
  { bg: "#FCF2E2", bar: "#e0a13a", ink: "#6e4a1e", soft: "#FEF9F0" },
  { bg: "#FBE9F3", bar: "#d56baa", ink: "#6e2e5a", soft: "#FDF3F9" },
];
const VPOOL: Record<string, string[]> = {
  style: ["flowing art-nouveau linework wrapped around organic forms, ornamental yet restrained", "bold baroque chiaroscuro reinterpreted through a modern minimalist lens", "soft watercolor washes bleeding into raw paper, loose and airy", "high-contrast cyberpunk neon, wet reflective surfaces everywhere", "delicate ukiyo-e woodblock flatness with fine outline", "grainy 1970s film still, faded kodachrome palette"],
  mood: ["serene and quietly melancholic, the calm right before rain", "tense and dramatic, heavy with anticipation", "warm, nostalgic golden-hour stillness", "electric, restless, buzzing with night energy", "dreamlike and weightless, softly out of focus"],
  texture: ["hyperreal graphite with fine tooth and soft smudging", "cracked oil-paint impasto catching raking light", "rough cold-press paper grain, visible fibers", "glossy chrome with sharp specular highlights", "matte risograph print with subtle misregistration"],
};
const TOKEN_RE = /(\[[^\]\n]+\])/g;
const isRefTok = (t: string) => /^\[Reference Image \d+\]$/.test(t);
const pick = (a: string[]) => a[Math.floor(Math.random() * a.length)];

let NID = 1;
const nid = (p: string) => p + NID++;

type Kind = "text" | "bool";
type NodeT = {
  id: string;
  type: "prompt" | "ref" | "text" | "output";
  x?: number; y?: number;
  index?: number; img?: string | null; userInput?: boolean;
  name?: string; kind?: Kind; pub?: boolean; value?: string; str?: string;
  sig?: string; vals?: Record<string, string>; status?: "empty" | "loading" | "ready"; picked?: boolean;
  off?: { x: number; y: number };
};
type Con = { sig: string; body: string; cidx: number; off?: { x: number; y: number } };
type St = {
  title: string; mode: "free" | "premium"; models: string[]; cat: string; ratio: string; quality: string;
  price: number; body: string; cons: Con[]; conSeq: number; genCount: number; nodes: NodeT[];
};
const NC_QUALITIES = ["1K", "2K", "4K"];
// price multiplier per quality (relative to the model's base 2K price)
const NC_QUALITY_MULT: Record<string, number> = { "1K": 0.5, "2K": 1, "4K": 2 };
type TextNode = NodeT & { name: string; kind: Kind; value: string };

const sigOf = (body: string, texts: TextNode[]) => body + "||" + texts.map((t) => t.name + ":" + t.kind).join(",");
const randVals = (texts: TextNode[]) => {
  const o: Record<string, string> = {};
  texts.forEach((t) => { o["[" + t.name + "]"] = t.kind === "bool" ? (Math.random() > 0.5 ? "on" : "off") : pick(VPOOL[t.name] || VPOOL.style); });
  return o;
};

/* Approximate node footprints (used for tidy row/column placement). */
const NODE_DIM: Record<string, { w: number; h: number }> = {
  prompt: { w: 480, h: 360 }, ref: { w: 172, h: 210 }, text: { w: 260, h: 188 }, output: { w: 208, h: 250 },
};

/* build the literal prompt sent to Nano Banana Pro: substitute [var] tokens with
   their values, strip [Reference Image N] tokens (txt2img is text-only). */
function buildPrompt(body: string, texts: TextNode[], valsOverride?: Record<string, string>) {
  let out = body;
  texts.forEach((t) => {
    const tok = "[" + t.name + "]";
    const raw = valsOverride ? valsOverride[tok] : t.value;
    let val = "";
    // Checkbox: when ticked, insert its own prompt string (falls back to the name).
    if (t.kind === "bool") val = raw === "on" || raw === "Yes" ? ((t.str && t.str.trim()) || t.name || "") : "";
    else val = raw || "";
    out = out.split(tok).join(val);
  });
  return out.replace(/\[Reference Image \d+\]/g, "").replace(/\s{2,}/g, " ").trim();
}

/* double-click to rename; static span otherwise */
function EditName({ value, onChange, className, placeholder, title }: { value: string; onChange: (v: string) => void; className?: string; placeholder?: string; title?: string }) {
  const [edit, setEdit] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { if (edit && ref.current) { ref.current.focus(); ref.current.select(); } }, [edit]);
  if (edit)
    return (
      <input ref={ref} className={className} value={value} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)} onBlur={() => setEdit(false)}
        onKeyDown={(e) => { if (e.key === "Enter") setEdit(false); }}
        onPointerDown={(e) => e.stopPropagation()} />
    );
  return (
    <span className={className} title={title || "Double-click to rename"} style={{ cursor: "grab", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", ...(value ? null : { color: "var(--enki-ink-3)", fontStyle: "italic", opacity: 0.8 }) }} onDoubleClick={() => setEdit(true)}>
      {value || placeholder}
    </span>
  );
}

/* Custom themed dropdown (same look + animation as the prompt's model picker),
   reused for every select in the editor so they all match. */
function NcSelect({ value, options, onChange, width, title, align = "left", icon }: {
  value: string; options: { value: string; label: string; sub?: string }[]; onChange: (v: string) => void;
  width?: number; title?: string; align?: "left" | "right"; icon?: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [flipUp, setFlipUp] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const trigRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { e.stopPropagation(); setOpen(false); } };
    window.addEventListener("pointerdown", onDown, true);
    window.addEventListener("keydown", onKey, true);
    return () => { window.removeEventListener("pointerdown", onDown, true); window.removeEventListener("keydown", onKey, true); };
  }, [open]);
  // Decide flip direction so the panel never spills past the viewport bottom.
  const toggle = () => {
    if (!open) {
      const r = trigRef.current?.getBoundingClientRect();
      const panelH = options.length * 34 + 16;
      if (r) setFlipUp(window.innerHeight - r.bottom < panelH + 14 && r.top > panelH + 14);
    }
    setOpen((o) => !o);
  };
  const cur = options.find((o) => o.value === value);
  return (
    <div className={"nc-sel" + (align === "right" ? " nc-sel--r" : "") + (flipUp ? " nc-sel--up" : "")} ref={ref} style={width ? { width } : undefined} onPointerDown={(e) => e.stopPropagation()}>
      <button ref={trigRef} className={"nc-pm-trigger" + (open ? " open" : "")} title={title} onClick={(e) => { e.stopPropagation(); toggle(); }}>
        {icon && <span className="nc-pm-ico">{icon}</span>}
        <span className="nc-pm-name">{cur ? cur.label : value}</span>
        {cur?.sub && <span className="nc-pm-price">{cur.sub}</span>}
        <Icon name="chevronDown" size={13} stroke={2.4} className="nc-pm-chev" />
      </button>
      {open && (
        <div className="nc-pm-panel" role="listbox">
          {options.map((o) => (
            <button key={o.value} role="option" aria-selected={o.value === value} className={"nc-pm-opt" + (o.value === value ? " on" : "")} onClick={() => { onChange(o.value); setOpen(false); }}>
              <span className="nc-pm-opt-name">{o.label}</span>
              {o.sub && <span className="nc-pm-opt-cost">{o.sub}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface NodeCreatorProps {
  onClose: () => void;
  onToast: (msg: string) => void;
  userKey?: string | null;
  sidebarW?: number;
  editPrompt?: unknown;
}

export default function NodeCreator({ onClose, onToast, userKey, sidebarW = 78, editPrompt }: NodeCreatorProps) {
  const sidebarWRef = useRef(sidebarW); sidebarWRef.current = sidebarW;
  // Prompt-box height, sized so the whole node fits between the top ribbon and the bottom.
  const boxH = useRef(0);
  if (!boxH.current) boxH.current = typeof window !== "undefined" ? Math.round(Math.min(400, Math.max(220, window.innerHeight - 420))) : 340;
  // Start with just the prompt box — the user adds references / text inputs and
  // generates; constellation rows then form automatically as outputs appear.
  const initial = (): St => {
    const h = typeof window !== "undefined" ? window.innerHeight : 800;
    const w = typeof window !== "undefined" ? window.innerWidth - sidebarW : 1100;
    const TOPBAR = 64, BOTTOM = 16;
    const nodeH = boxH.current + 240; // header + refs deck + add-row + note + paddings
    const dockLeft = w - 224;
    // Centre the node between the left-menu edge and the Generate dock, fully below the ribbon.
    const x = Math.max(40, Math.round(dockLeft / 2 - 240));
    const y = Math.max(TOPBAR, Math.round(TOPBAR + (h - TOPBAR - BOTTOM - nodeH) / 2));
    const nodes: NodeT[] = [{ id: "prompt", type: "prompt", x, y }];

    // Editing an existing released prompt → rebuild its node graph.
    const ep = editPrompt as { title?: string; promptTemplate?: string; price?: number; variables?: Array<{ name?: string; type?: string; value?: unknown }> } | null;
    if (ep && (ep.promptTemplate || ep.title)) {
      const vars = Array.isArray(ep.variables) ? ep.variables : [];
      let ti = 0;
      vars.forEach((v) => {
        if (v.type === "image") {
          // reference images go into the prompt's in-built deck (no canvas node)
          nodes.push({ id: nid("r"), type: "ref", img: typeof v.value === "string" ? v.value : null, userInput: false });
        } else {
          const kind: Kind = v.type === "checkbox" ? "bool" : "text";
          nodes.push({ id: nid("t"), type: "text", x: x - 288, y: y + ti * 254, name: String(v.name || "var_" + (ti + 1)), kind, pub: true, value: kind === "bool" ? (v.value ? "on" : "off") : String(v.value ?? "") });
          ti += 1;
        }
      });
      return {
        title: String(ep.title || ""), mode: (ep.price ?? 0) > 0 ? "premium" : "free",
        models: ["nano-banana-pro"], cat: "", ratio: "Any", quality: "2K",
        price: typeof ep.price === "number" ? ep.price : 0.1, body: String(ep.promptTemplate || ""),
        cons: [], conSeq: 0, genCount: 4, nodes,
      };
    }

    return {
      title: "", mode: "premium", models: ["nano-banana-pro"], cat: "", ratio: "Any", quality: "2K",
      price: 0.1, body: "", cons: [], conSeq: 0, genCount: 4, nodes,
    };
  };

  const [st, setSt] = useState<St>(initial);
  const stRef = useRef(st); stRef.current = st;
  const hist = useRef<{ past: St[]; future: St[] }>({ past: [], future: [] });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(1); zoomRef.current = zoom;
  const panRef = useRef(pan); panRef.current = pan;
  const zoomAnim = useRef<number | null>(null);
  const [zoomEditing, setZoomEditing] = useState(false);
  const [zoomInput, setZoomInput] = useState("");
  const [sel, setSel] = useState<string | null>(null);
  const [selRow, setSelRow] = useState<string | null>(null);
  const selRef = useRef<string | null>(null); selRef.current = sel;
  const selRowRef = useRef<string | null>(null); selRowRef.current = selRow;
  const [selSet, setSelSet] = useState<Set<string>>(new Set());
  const selSetRef = useRef<Set<string>>(new Set()); selSetRef.current = selSet;
  const [marquee, setMarquee] = useState<{ x0: number; y0: number; x1: number; y1: number } | null>(null);
  const spaceRef = useRef(false);
  const [armed, setArmed] = useState<string | null>(null);
  const [ctx, setCtx] = useState<{ x: number; y: number; wx: number; wy: number } | null>(null);
  const [dropOn, setDropOn] = useState(false);
  const [pulseId, setPulseId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false); // top-right burger menu
  const fileRef = useRef<HTMLInputElement>(null);   // hidden picker for JSON import
  const refUploadRef = useRef<HTMLInputElement>(null); // hidden picker for multi reference upload
  // mock-up mode: Generate fills outputs with instant placeholder art (no API)
  // so the whole flow — groups, lightbox, release — can be demoed offline.
  const [mockMode, setMockMode] = useState(false);
  const mockModeRef = useRef(false); mockModeRef.current = mockMode;
  // canvas tool: "select" (left = marquee, right = pan) or "hand" (left = pan)
  const [tool, setTool] = useState<"select" | "hand">("select");
  // `panning` is state (not just the drag ref) so releasing the mouse re-renders and
  // the grabbing-hand cursor reverts to the pointer immediately.
  const [panning, setPanning] = useState(false);
  const [modelOpen, setModelOpen] = useState(false); // per-prompt model dropdown
  const [modelFlipUp, setModelFlipUp] = useState(false);
  const modelTrigRef = useRef<HTMLButtonElement>(null);
  const [genPanelOpen, setGenPanelOpen] = useState(true); // toolbar Generate panel (open by default)
  // image lightbox: maximize an output, browse its group + switch between groups
  const [lbOpen, setLbOpen] = useState(false);
  const [lbG, setLbG] = useState(0);   // group (constellation row) index
  const [lbI, setLbI] = useState(0);   // image index within the group
  const lbOpenRef = useRef(false); lbOpenRef.current = lbOpen;
  const [refMax, setRefMax] = useState<string | null>(null); // maximized reference image
  const deckRef = useRef<HTMLDivElement>(null);               // referenced-images deck (for overlap fit)
  const [deckW, setDeckW] = useState(440);
  const [refDragI, setRefDragI] = useState<number | null>(null); // card being dragged
  const [refOverI, setRefOverI] = useState<number | null>(null); // insertion target slot
  useEffect(() => {
    const el = deckRef.current; if (!el) return;
    const ro = new ResizeObserver(() => setDeckW(el.clientWidth));
    ro.observe(el); setDeckW(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  const [expandedOuts, setExpandedOuts] = useState<Record<string, boolean>>({});
  const toggleExpand = (id: string) => setExpandedOuts((m) => ({ ...m, [id]: !m[id] }));
  const [outEdit, setOutEdit] = useState<string | null>(null);
  const [confirmPush, setConfirmPush] = useState<string | null>(null);
  const [dock, setDock] = useState({ x: 0, y: 0, placed: false });
  const dockTopRef = useRef(80);
  const [tipOpen, setTipOpen] = useState(true);
  const [dockSide, setDockSide] = useState<"left" | "right" | null>(null);
  const pendingDockSide = useRef<"left" | "right" | null>(null);
  const [connectLine, setConnectLine] = useState<{ from: { x: number; y: number }; to: { x: number; y: number }; color: string } | null>(null);
  // Prompt box height — roughly doubled but capped so the node never spills past the frame.
  const canvasRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const ovRef = useRef<HTMLDivElement>(null);
  const failedOnce = useRef(false);

  const pushHist = () => { hist.current.past.push(stRef.current); if (hist.current.past.length > 60) hist.current.past.shift(); hist.current.future = []; };
  const commit = (updater: (p: St) => St) => { pushHist(); setSt(updater); };
  const undo = () => { if (!hist.current.past.length) return; hist.current.future.push(stRef.current); setSt(hist.current.past.pop()!); };
  const redo = () => { if (!hist.current.future.length) return; hist.current.past.push(stRef.current); setSt(hist.current.future.pop()!); };

  /* ── JSON export / import (ComfyUI-style node graph) ──
     ComfyUI serialises a workflow as a flat `nodes[]` array — each node carries
     an id, a `type`, a `pos:[x,y]`, and its widget values — plus top-level
     graph metadata. We mirror that shape so the file reads like a Comfy graph,
     while keeping every Enki-specific field needed for a lossless round-trip. */
  const NTYPE_OUT: Record<NodeT["type"], string> = { prompt: "EnkiPrompt", ref: "EnkiReferenceImage", text: "EnkiTextInput", output: "EnkiOutputImage" };
  const NTYPE_IN: Record<string, NodeT["type"]> = { EnkiPrompt: "prompt", EnkiReferenceImage: "ref", EnkiTextInput: "text", EnkiOutputImage: "output" };
  const buildExportJSON = () => {
    const s = stRef.current;
    const nodes = s.nodes.map((n) => {
      const out: Record<string, unknown> = { id: n.id, type: NTYPE_OUT[n.type] || n.type };
      out.pos = (typeof n.x === "number" && typeof n.y === "number") ? [n.x, n.y] : null;
      if (n.off) out.off = n.off;
      if (n.img != null) out.image = n.img;
      if (n.userInput != null) out.userInput = n.userInput;
      if (n.name != null) out.name = n.name;
      if (n.kind != null) out.kind = n.kind;
      if (n.value != null) out.value = n.value;
      if (n.str != null) out.str = n.str;
      if (n.pub != null) out.pub = n.pub;
      if (n.picked != null) out.picked = n.picked;
      if (n.sig != null) out.sig = n.sig;
      if (n.status != null) out.status = n.status;
      if (n.index != null) out.index = n.index;
      if (n.vals != null) out.widgets_values = n.vals;
      return out;
    });
    return {
      format: "enki-prompt-graph", version: 1, comfy_version: 0.4,
      title: s.title,
      settings: { mode: s.mode, models: s.models, category: s.cat, ratio: s.ratio, quality: s.quality, price: s.price, genCount: s.genCount },
      prompt: s.body,
      nodes,
      constellations: s.cons || [], conSeq: s.conSeq || 0,
      view: { pan: panRef.current, zoom: zoomRef.current },
    };
  };
  const exportPrompt = () => {
    setMenuOpen(false);
    try {
      const data = buildExportJSON();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const safe = (stRef.current.title || "untitled-prompt").replace(/[^a-z0-9\-_]+/gi, "-").replace(/^-+|-+$/g, "").toLowerCase() || "prompt";
      a.href = url; a.download = `${safe}.enki.json`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 0);
      onToast("Prompt exported as JSON");
    } catch { onToast("Couldn't export this prompt"); }
  };
  const applyImportJSON = (raw: unknown) => {
    const data = raw as { format?: string; title?: string; prompt?: string; nodes?: unknown[]; settings?: Record<string, unknown>; constellations?: unknown[]; conSeq?: number; view?: { pan?: { x: number; y: number }; zoom?: number } };
    if (!data || data.format !== "enki-prompt-graph" || !Array.isArray(data.nodes)) { onToast("Not a valid Enki prompt JSON file"); return; }
    const nodes: NodeT[] = data.nodes.map((raw2) => {
      const o = raw2 as Record<string, unknown>;
      const n: NodeT = { id: String(o.id), type: NTYPE_IN[String(o.type)] || (o.type as NodeT["type"]) };
      if (Array.isArray(o.pos)) { n.x = Number(o.pos[0]); n.y = Number(o.pos[1]); }
      if (o.off) n.off = o.off as NodeT["off"];
      if (o.image != null) n.img = o.image as string;
      if (o.userInput != null) n.userInput = !!o.userInput;
      if (o.name != null) n.name = String(o.name);
      if (o.kind != null) n.kind = o.kind as Kind;
      if (o.value != null) n.value = String(o.value);
      if (o.str != null) n.str = String(o.str);
      if (o.pub != null) n.pub = !!o.pub;
      if (o.picked != null) n.picked = !!o.picked;
      if (o.sig != null) n.sig = String(o.sig);
      if (o.status != null) n.status = o.status as NodeT["status"];
      if (o.index != null) n.index = Number(o.index);
      if (o.widgets_values != null) n.vals = o.widgets_values as Record<string, string>;
      return n;
    });
    if (!nodes.some((n) => n.type === "prompt")) { onToast("That JSON has no prompt node — can't import"); return; }
    const s = data.settings || {};
    pushHist();
    setSt((p) => ({
      ...p,
      title: typeof data.title === "string" ? data.title : "",
      mode: s.mode === "free" ? "free" : "premium",
      models: Array.isArray(s.models) && s.models.length ? (s.models as string[]) : ["nano-banana-pro"],
      cat: typeof s.category === "string" ? s.category : "",
      ratio: typeof s.ratio === "string" ? s.ratio : "Any",
      quality: typeof s.quality === "string" ? s.quality : "2K",
      price: typeof s.price === "number" ? s.price : 0.1,
      genCount: typeof s.genCount === "number" ? s.genCount : 4,
      body: typeof data.prompt === "string" ? data.prompt : "",
      cons: Array.isArray(data.constellations) ? (data.constellations as Con[]) : [],
      conSeq: typeof data.conSeq === "number" ? data.conSeq : 0,
      nodes,
    }));
    // Keep new-node ids from colliding with imported ones.
    let maxN = NID;
    nodes.forEach((n) => { const m = /(\d+)$/.exec(n.id || ""); if (m) maxN = Math.max(maxN, parseInt(m[1], 10) + 1); });
    NID = maxN;
    if (data.view) { if (data.view.pan) setPan(data.view.pan); if (typeof data.view.zoom === "number") setZoom(Math.min(1, Math.max(0.3, data.view.zoom))); }
    onToast("Prompt imported from JSON");
  };
  const importPrompt = () => { setMenuOpen(false); fileRef.current?.click(); };
  const onImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; e.target.value = "";
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => { try { applyImportJSON(JSON.parse(String(reader.result))); } catch { onToast("Couldn't read that JSON file"); } };
    reader.readAsText(f);
  };

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // ESC returns the canvas to a neutral state — it cancels whatever is in
        // progress (drag / connect / marquee / context menu) and clears the
        // selection. It never closes the editor; use the × button for that.
        if (drag.current) {
          drag.current = null;
          document.body.style.userSelect = "";
          window.removeEventListener("pointermove", onPointerMove);
          window.removeEventListener("pointerup", endDrag);
        }
        rightPan.current.active = false;
        setConnectLine(null);
        setMarquee(null);
        setMenuOpen(false);
        setModelOpen(false);
        setGenPanelOpen(false);
        setRefMax(null);
        setGenConfirm(null);
        if (ctx) setCtx(null);
        setSel(null); setSelRow(null); setSelSet(new Set());
        return;
      }
      const meta = e.ctrlKey || e.metaKey;
      if (meta && (e.key === "z" || e.key === "Z")) { e.preventDefault(); if (e.shiftKey) redo(); else undo(); return; }
      if (meta && (e.key === "y" || e.key === "Y")) { e.preventDefault(); redo(); return; }
      if (e.key === "Delete" || e.key === "Backspace") {
        const ae = document.activeElement as HTMLElement | null;
        // don't hijack deletes while typing in a field (token-delete etc.)
        if (ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA" || ae.isContentEditable)) return;
        if (selSetRef.current.size) { e.preventDefault(); selSetRef.current.forEach((id) => deleteNodeId(id)); setSelSet(new Set()); }
        else if (selRef.current) { e.preventDefault(); deleteNodeId(selRef.current); setSel(null); }
        else if (selRowRef.current) { e.preventDefault(); deleteRow(selRowRef.current); setSelRow(null); }
      }
    };
    const onSpace = (e: KeyboardEvent) => { if (e.code === "Space") { const ae = document.activeElement as HTMLElement | null; if (ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA" || ae.isContentEditable)) return; spaceRef.current = e.type === "keydown"; } };
    window.addEventListener("keydown", k);
    window.addEventListener("keydown", onSpace);
    window.addEventListener("keyup", onSpace);
    return () => { window.removeEventListener("keydown", k); window.removeEventListener("keydown", onSpace); window.removeEventListener("keyup", onSpace); };
  }, [onClose, ctx]);
  useEffect(() => () => { if (zoomAnim.current) clearTimeout(zoomAnim.current); if (panAnim.current) clearTimeout(panAnim.current); }, []);
  // lock page scroll while the editor is open so the frame (and the flush-right
  // Generate panel) sit at the true window edge with no scrollbar gap.
  useEffect(() => {
    const root = document.documentElement;
    const prevBody = document.body.style.overflow;
    const prevRoot = root.style.overflow;
    const prevGutter = root.style.scrollbarGutter;
    document.body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    // html{scrollbar-gutter:stable} keeps a ~15px gutter even with overflow hidden,
    // which would push the flush-right Generate panel off the window edge. Drop it
    // while the editor owns the viewport so the frame fills the full width.
    root.style.scrollbarGutter = "auto";
    return () => {
      document.body.style.overflow = prevBody;
      root.style.overflow = prevRoot;
      root.style.scrollbarGutter = prevGutter;
    };
  }, []);
  // Close the model dropdown on any click outside it.
  useEffect(() => {
    if (!modelOpen) return;
    const onDown = (e: PointerEvent) => { if (!(e.target as HTMLElement).closest(".nc-pm")) setModelOpen(false); };
    window.addEventListener("pointerdown", onDown, true);
    return () => window.removeEventListener("pointerdown", onDown, true);
  }, [modelOpen]);

  /* cursor-anchored wheel zoom (max = 1) */
  useEffect(() => {
    const el = canvasRef.current; if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const z = zoomRef.current, p = panRef.current;
      // Continuous, cursor-anchored zoom — magnitude follows the scroll delta
      // (normalised across mouse "line" and trackpad "pixel" modes) for a
      // smooth, non-jumpy feel.
      const unit = e.deltaMode === 1 ? 33 : e.deltaMode === 2 ? 400 : 1;
      const factor = Math.exp(-e.deltaY * unit * 0.0042);
      const nz = Math.max(0.3, Math.min(1, z * factor));
      if (nz === z) return;
      const mx = e.clientX - sidebarWRef.current, my = e.clientY;
      const wx = (mx - p.x) / z, wy = (my - p.y) / z;
      setPan({ x: mx - wx * nz, y: my - wy * nz }); setZoom(nz);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);
  // Smooth, animated zoom toward a target level (cursor/center-anchored). The
  // % readout follows the animation frame-by-frame, so it ramps up/down too.
  const tweenZoom = (target: number) => {
    const z0 = zoomRef.current;
    const z1 = Math.max(0.3, Math.min(1, target));
    if (Math.abs(z1 - z0) < 0.001) return;
    const mx = (window.innerWidth - sidebarWRef.current) / 2, my = window.innerHeight / 2;
    const p0 = panRef.current;
    const wx = (mx - p0.x) / z0, wy = (my - p0.y) / z0;
    if (zoomAnim.current) clearTimeout(zoomAnim.current);
    // Fixed-step tween (clock-independent so it always terminates and stays smooth).
    const STEPS = 14; let i = 0;
    const step = () => {
      i += 1;
      const t = i / STEPS;
      const e = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const zt = z0 + (z1 - z0) * e;
      setZoom(zt);
      setPan({ x: mx - wx * zt, y: my - wy * zt });
      zoomAnim.current = i < STEPS ? (window.setTimeout(step, 16) as unknown as number) : null;
    };
    step();
  };
  const commitZoomInput = () => {
    const v = parseFloat(zoomInput);
    setZoomEditing(false);
    if (!Number.isNaN(v)) tweenZoom(v / 100);
  };
  // Smooth pan tween (fixed-step easeOutCubic) used by the edge-arrow focus jump.
  const panAnim = useRef<number | null>(null);
  const tweenPan = (tx: number, ty: number) => {
    const p0 = panRef.current;
    if (Math.abs(tx - p0.x) < 1 && Math.abs(ty - p0.y) < 1) return;
    if (panAnim.current) clearTimeout(panAnim.current);
    const STEPS = 16; let i = 0;
    const step = () => {
      i += 1; const t = i / STEPS; const e = 1 - Math.pow(1 - t, 3);
      setPan({ x: p0.x + (tx - p0.x) * e, y: p0.y + (ty - p0.y) * e });
      panAnim.current = i < STEPS ? (window.setTimeout(step, 16) as unknown as number) : null;
    };
    step();
  };
  const focusFrame = (fx: number, fw: number, fy: number) => {
    const z = zoomRef.current;
    const cx = (window.innerWidth - sidebarWRef.current) / 2, cy = window.innerHeight / 2;
    const wcx = fx + fw / 2, wcy = fy + 150;
    tweenPan(cx - wcx * z, cy - wcy * z);
  };
  // Track viewport so the off-screen edge arrows reposition on resize.
  const [vp, setVp] = useState({ w: typeof window !== "undefined" ? window.innerWidth : 1280, h: typeof window !== "undefined" ? window.innerHeight : 800 });
  useEffect(() => {
    const onR = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);

  const prompt = st.nodes.find((n) => n.id === "prompt")!;
  const refs = st.nodes.filter((n) => n.type === "ref");
  // Card-deck overlap: advance per card so all refs fit the deck width (reserving
  // the "+"). Few cards → full gap (no overlap); many → they slide under each other.
  const REF_CARD = 62, REF_GAP = 7;
  const refStep = refs.length <= 1 ? REF_CARD + REF_GAP
    : Math.min(REF_CARD + REF_GAP, Math.max(15, (Math.max(REF_CARD, deckW - (REF_CARD + REF_GAP)) - REF_CARD) / (refs.length - 1)));
  const refOverlap = Math.round(refStep - REF_CARD); // marginLeft for cards after the first (negative = overlap)
  const texts = st.nodes.filter((n) => n.type === "text") as TextNode[];
  const pubNames = new Set(texts.filter((t) => t.pub).map((t) => t.name)); // user-input vars → turquoise
  const outs = st.nodes.filter((n) => n.type === "output");
  // Can only generate once there's an actual prompt and every text var has a value.
  // Only a prompt is required to generate — unfilled variables just resolve to empty.
  const canGenerate = st.body.trim().length > 0;

  const curSig = sigOf(st.body, texts);
  const layout = useMemo(() => {
    // First group sits to the RIGHT of the prompt at the same height; every
    // further group stacks below it.
    const OX = (prompt.x || 0) + 560, ROWH = 326, COLW = 196, TOP = (prompt.y || 0);
    const map: Record<string, { x: number; y: number }> = {};
    const frames: { sig: string; cidx: number; body: string; ri: number; x: number; y: number; w: number; count: number; current: boolean }[] = [];
    const seen = (st.cons || []).map((c) => c.sig);
    const order = seen.includes(curSig) ? st.cons.slice() : [{ sig: curSig, body: st.body, cidx: st.conSeq || 0 }, ...(st.cons || [])];
    order.forEach((con, ri) => {
      const rowOuts = outs.filter((o) => o.sig === con.sig);
      const off = con.off || { x: 0, y: 0 };
      // Row is keyed off the group's STABLE cidx (assigned once at creation),
      // not its position in the order array — so spawning/removing other groups
      // never shifts an already-placed group. It only moves when the user drags
      // its row handle (the `off` offset).
      const fx = OX + off.x, y = TOP + (con.cidx || 0) * ROWH + off.y;
      rowOuts.forEach((o, ci) => { map[o.id] = { x: fx + 18 + ci * COLW, y: y + 34 }; });
      frames.push({ sig: con.sig, cidx: con.cidx, body: con.body, ri, x: fx, y, w: Math.max(1, rowOuts.length) * COLW + 30, count: rowOuts.length, current: con.sig === curSig });
    });
    return { map, frames, OX, ROWH, COLW, TOP };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st.cons, st.nodes, st.body, prompt.x, prompt.y, curSig]);
  const palOf = (cidx: number) => OUT_PALETTE[((cidx % OUT_PALETTE.length) + OUT_PALETTE.length) % OUT_PALETTE.length];

  // Lightbox groups: every constellation row that has rendered images, in the
  // same top-to-bottom order as the canvas. Each group keeps its colour + body.
  const lbGroups = useMemo(() => {
    const imgOuts = outs.filter((o) => o.img);
    return layout.frames
      .map((f) => ({ sig: f.sig, cidx: f.cidx, body: f.body, imgs: imgOuts.filter((o) => o.sig === f.sig) }))
      .filter((g) => g.imgs.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout.frames, st.nodes]);

  const openLightbox = (id: string) => {
    const target = stRef.current.nodes.find((n) => n.id === id);
    if (!target || !target.img) return;
    const imgOuts = stRef.current.nodes.filter((n) => n.type === "output" && n.img);
    const order = layout.frames.map((f) => f.sig);
    const gi = order.findIndex((sig) => sig === target.sig && imgOuts.some((o) => o.sig === sig));
    const gIdx = gi >= 0 ? layout.frames.slice(0, gi).filter((f) => imgOuts.some((o) => o.sig === f.sig)).length : 0;
    const groupImgs = imgOuts.filter((o) => o.sig === target.sig);
    const iIdx = Math.max(0, groupImgs.findIndex((o) => o.id === id));
    setLbG(gIdx); setLbI(iIdx); setLbOpen(true);
  };
  const lbGroupsRef = useRef(lbGroups); lbGroupsRef.current = lbGroups;
  // ↑/↓ switch image group · ←/→ switch image within the group · Esc closes.
  // Capture phase so these keys never fall through to the canvas shortcuts.
  useEffect(() => {
    if (!lbOpen) return;
    const onKey = (e: KeyboardEvent) => {
      const groups = lbGroupsRef.current;
      if (!groups.length) { if (e.key === "Escape") { e.stopPropagation(); setLbOpen(false); } return; }
      if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); setLbOpen(false); }
      else if (e.key === "ArrowDown") { e.preventDefault(); e.stopPropagation(); setLbG((g) => Math.min(groups.length - 1, g + 1)); setLbI(0); }
      else if (e.key === "ArrowUp") { e.preventDefault(); e.stopPropagation(); setLbG((g) => Math.max(0, g - 1)); setLbI(0); }
      else if (e.key === "ArrowRight") { e.preventDefault(); e.stopPropagation(); setLbI((i) => { const g = Math.min(lbGRef.current, groups.length - 1); const n = groups[g].imgs.length; return Math.min(n - 1, i + 1); }); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); e.stopPropagation(); setLbI((i) => Math.max(0, i - 1)); }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [lbOpen]);
  const lbGRef = useRef(lbG); lbGRef.current = lbG;

  const textColor = useMemo(() => {
    const m: Record<string, typeof TEXT_PALETTE[number]> = {};
    texts.forEach((t, i) => { m[t.name] = TEXT_PALETTE[i % TEXT_PALETTE.length]; });
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [st.nodes]);
  const colorForTok = (tok: string) => {
    if (isRefTok(tok)) return REF_COLOR;
    return textColor[tok.slice(1, -1)] || TEXT_PALETTE[0];
  };

  /* ── mutations ── */
  // Reference images live inside the prompt node as a reorderable deck (no canvas nodes).
  const refDrag = useRef<number | null>(null); // deck reorder: dragged card index
  const addRef = (img: string | null = null) => commit((p) => ({
    ...p, nodes: [...p.nodes, { id: nid("r"), type: "ref", img: img ?? null, userInput: false }],
  }));
  const moveRef = (from: number, to: number) => commit((p) => {
    const refs = p.nodes.filter((n) => n.type === "ref");
    if (from === to || from < 0 || to < 0 || from >= refs.length || to >= refs.length) return p;
    const order = refs.slice(); const [m] = order.splice(from, 1); order.splice(to, 0, m);
    return { ...p, nodes: [...p.nodes.filter((n) => n.type !== "ref"), ...order] };
  });
  const toggleRefUserInput = (id: string) => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => (n.id === id ? { ...n, userInput: !n.userInput } : n)) }));
  const addText = (atPos?: { x: number; y: number }) => commit((p) => {
    const existing = p.nodes.filter((n) => n.type === "text");
    const k = existing.length + 1;
    let name = "var_" + k; const used = new Set(existing.map((n) => n.name));
    let kk = k; while (used.has(name)) { kk++; name = "var_" + kk; }
    const base = p.nodes.find((n) => n.id === "prompt")!;
    const d = NODE_DIM.text;
    // Drag-release drops it exactly there; otherwise text inputs stack
    // vertically (untereinander) in a column just left of the prompt. The 80px
    // gap (mirroring the output side) leaves the input bus-trunk in open space
    // so each cable's run is clearly visible as nodes are spawned.
    let x: number, y: number;
    if (atPos) { x = atPos.x; y = atPos.y; }
    else {
      x = (base.x || 0) - d.w - 80;
      y = existing.length ? Math.max(...existing.map((n) => n.y || 0)) + d.h + 14 : (base.y || 0);
    }
    const node: NodeT = { id: nid("t"), type: "text", x, y, name, kind: "text", pub: true, value: "" };
    return { ...p, nodes: [...p.nodes, node], body: p.body.replace(/\s*$/, "") + " [" + name + "]" };
  });
  const allFilled = () => stRef.current.nodes.filter((n) => n.type === "text").every((t) => t.kind === "bool" || (t.value && t.value.trim()));

  // Add an empty output slot; Generate fills every empty slot at once.
  // With a drop position it sits exactly there (free); otherwise it joins the current row.
  const addOutput = (atPos?: { x: number; y: number }) => commit((p) => {
    if (atPos) {
      return { ...p, nodes: [...p.nodes, { id: nid("o"), type: "output", x: atPos.x, y: atPos.y, img: null, status: "empty", picked: false }] };
    }
    const tx = p.nodes.filter((n) => n.type === "text") as TextNode[];
    const sig = sigOf(p.body, tx);
    let cons = (p.cons || []).slice(); let conSeq = p.conSeq || 0;
    if (!cons.some((c) => c.sig === sig)) { cons = [{ sig, body: p.body, cidx: conSeq }, ...cons]; conSeq += 1; }
    const vals: Record<string, string> = {}; tx.forEach((t) => { vals["[" + t.name + "]"] = t.value; });
    return { ...p, cons, conSeq, nodes: [...p.nodes, { id: nid("o"), type: "output", sig, vals, img: null, status: "empty", picked: false }] };
  });

  /* ── real async generation (Nano Banana Pro via Puter, free) ── */
  const finalizeOutput = useCallback(async (oid: string, promptText: string) => {
    const ratio = stRef.current.ratio && stRef.current.ratio !== "Any" ? stRef.current.ratio : "1:1";
    // Mock-up mode: skip the API and drop in instant placeholder art.
    if (mockModeRef.current) {
      const mock = placeholderArt("mock" + oid + ":" + promptText.slice(0, 24), ratio);
      setSt((p) => ({ ...p, nodes: p.nodes.map((n) => (n.id === oid ? { ...n, img: mock, status: "ready" } : n)) }));
      return;
    }
    let url = await generateNanoBanana(promptText, ratio);
    if (!url) {
      url = placeholderArt("fallback" + oid, "4:5");
      if (!failedOnce.current) { failedOnce.current = true; onToast("Generation failed — showing a placeholder. Is the dev server reachable?"); }
    } else {
      persistCreation({ prompt: promptText, imageUrl: url, model: stRef.current.models[0], title: stRef.current.title, userKey });
    }
    const finalUrl = url;
    setSt((p) => ({ ...p, nodes: p.nodes.map((n) => (n.id === oid ? { ...n, img: finalUrl, status: "ready" } : n)) }));
  }, [onToast, userKey]);

  /* ▶ generate → new output in the current constellation row.
     Never reassigns/removes an empty slot that belongs to a DIFFERENT prompt
     composition — those are left alone and offered via a co-generate dialog. */
  const spawnOutput = () => {
    if (!stRef.current.body.trim()) return;
    const tx = stRef.current.nodes.filter((n) => n.type === "text") as TextNode[];
    const body = stRef.current.body;
    const vals: Record<string, string> = {}; tx.forEach((t) => { vals["[" + t.name + "]"] = t.value; });
    const finalPrompt = buildPrompt(body, tx, vals);
    const sig = sigOf(body, tx);
    // empties belonging to THIS composition (or sig-less) → fill them now.
    const mine = stRef.current.nodes.filter((n) => n.type === "output" && n.status === "empty" && (!n.sig || n.sig === sig));
    // empties created for OTHER compositions → never touch; offer to co-generate.
    const others = stRef.current.nodes.filter((n) => n.type === "output" && n.status === "empty" && n.sig && n.sig !== sig);
    pushHist();
    if (mine.length) {
      const ids = mine.map((e) => e.id);
      setSt((p) => {
        let cons = (p.cons || []).slice(); let conSeq = p.conSeq || 0;
        if (!cons.some((c) => c.sig === sig)) { cons = [{ sig, body: p.body, cidx: conSeq }, ...cons]; conSeq += 1; }
        return { ...p, cons, conSeq, nodes: p.nodes.map((n) => (ids.includes(n.id) ? { ...n, sig, vals, status: "loading" } : n)) };
      });
      ids.forEach((id) => finalizeOutput(id, finalPrompt));
    } else {
      const oid = nid("o");
      setSt((p) => {
        let cons = (p.cons || []).slice(); let conSeq = p.conSeq || 0;
        if (!cons.some((c) => c.sig === sig)) { cons = [{ sig, body: p.body, cidx: conSeq }, ...cons]; conSeq += 1; }
        return { ...p, cons, conSeq, nodes: [...p.nodes, { id: oid, type: "output", sig, vals, img: null, status: "loading", picked: false }] };
      });
      setPulseId(oid); setTimeout(() => setPulseId((v) => (v === oid ? null : v)), 2800);
      finalizeOutput(oid, finalPrompt);
    }
    if (others.length) setGenConfirm({ ids: others.map((o) => o.id), checked: new Set(others.map((o) => o.id)) });
  };
  // Co-generate dialog: which leftover empty slots (from other settings) to also run.
  const [genConfirm, setGenConfirm] = useState<{ ids: string[]; checked: Set<string> } | null>(null);
  const confirmCoGen = () => {
    if (!genConfirm) return;
    const ids = [...genConfirm.checked];
    pushHist();
    ids.forEach((id) => {
      const o = stRef.current.nodes.find((n) => n.id === id); if (!o) return;
      const con = (stRef.current.cons || []).find((c) => c.sig === o.sig);
      const bodyC = con?.body || stRef.current.body;
      const txC = stRef.current.nodes.filter((n) => n.type === "text") as TextNode[];
      const fp = buildPrompt(bodyC, txC, o.vals || {});
      setSt((p) => ({ ...p, nodes: p.nodes.map((n) => (n.id === id ? { ...n, status: "loading" } : n)) }));
      finalizeOutput(id, fp);
    });
    setGenConfirm(null);
  };

  // Only ONE output group can be up for release: picking an image in a new group
  // clears every pick in the other groups.
  const togglePick = (id: string) => setSt((p) => {
    const target = p.nodes.find((n) => n.id === id);
    if (!target) return p;
    const on = !target.picked, sig = target.sig;
    return { ...p, nodes: p.nodes.map((n) => {
      if (n.id === id) return { ...n, picked: on };
      if (on && n.type === "output" && n.sig !== sig && n.picked) return { ...n, picked: false };
      return n;
    }) };
  });
  const setOutVal = (id: string, tok: string, v: string) => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => (n.id === id ? { ...n, vals: { ...(n.vals || {}), [tok]: v } } : n)) }));
  const pushValuesLeft = (id: string) => {
    commit((p) => {
      const o = p.nodes.find((n) => n.id === id);
      const vals = (o && o.vals) || {};
      return { ...p, nodes: p.nodes.map((n) => (n.type === "text" && vals["[" + n.name + "]"] !== undefined ? { ...n, value: vals["[" + n.name + "]"] } : n)) };
    });
    setConfirmPush(null);
    onToast("Variable values copied to the editor on the left");
  };

  const deleteNodeId = (id: string) => commit((p) => {
    const node = p.nodes.find((n) => n.id === id);
    if (!node || node.type === "prompt") return p;
    const nodes = p.nodes.filter((n) => n.id !== id);
    let body = p.body;
    // Reference images are a deck inside the prompt (no body token); text vars still drop their token.
    if (node.type === "text") body = body.split("[" + node.name + "]").join("").replace(/\s{2,}/g, " ").trim();
    return { ...p, nodes, body };
  });

  // Delete a whole constellation group: its prompt-variant + every output in it.
  const deleteRow = (sig: string) => commit((p) => ({
    ...p,
    cons: (p.cons || []).filter((c) => c.sig !== sig),
    nodes: p.nodes.filter((n) => !(n.type === "output" && n.sig === sig)),
  }));

  const renameText = (id: string, newName: string) => setSt((p) => {
    const node = p.nodes.find((n) => n.id === id); if (!node) return p;
    const clean = newName.replace(/[[\]\n]/g, "");
    const body = p.body.split("[" + node.name + "]").join("[" + clean + "]");
    return { ...p, nodes: p.nodes.map((n) => (n.id === id ? { ...n, name: clean } : n)), body };
  });

  /* delete-key two-press on prompt tokens */
  const tokenAtCaret = () => {
    const ta = taRef.current; if (!ta) return null;
    const c = ta.selectionStart; let m: RegExpExecArray | null; const re = new RegExp(TOKEN_RE.source, "g");
    while ((m = re.exec(st.body)) !== null) { if (c >= m.index && c <= m.index + m[0].length) return m[0]; }
    return null;
  };
  const onPromptKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      const tok = tokenAtCaret();
      if (tok) {
        // Deleting a token removes the whole token AND its variable node in one press.
        e.preventDefault();
        if (isRefTok(tok)) { const idx = +tok.match(/\d+/)![0]; const r = refs.find((x) => x.index === idx); if (r) deleteNodeId(r.id); }
        else { const t = texts.find((x) => x.name === tok.slice(1, -1)); if (t) deleteNodeId(t.id); }
      }
    }
  };
  // Keep the canvas in sync with the text: if a variable's [token] is no longer
  // anywhere in the prompt body, drop its text node too.
  const onBodyChange = (val: string) => setSt((p) => {
    const present = new Set<string>();
    const re = /\[([^\]\n]+)\]/g; let m: RegExpExecArray | null;
    while ((m = re.exec(val)) !== null) present.add(m[1]);
    const nodes = p.nodes.filter((n) => n.type !== "text" || present.has(n.name || ""));
    return { ...p, body: val, nodes };
  });

  /* ── pricing ── */
  const qualityMult = NC_QUALITY_MULT[st.quality] ?? 1;
  const perImage = (st.models.reduce((s, id) => s + (NC_MODELS.find((m) => m.id === id)?.price || 0), 0) || 0.04) * qualityMult;
  const imgCount = st.genCount;
  const cost = perImage * imgCount;
  const pickedOuts = outs.filter((o) => o.picked && o.img); // images marked for public release (always one group)
  const releaseMin = st.mode === "free" ? 1 : 4;            // Free needs ≥1, Premium ≥4 selected
  const canRelease = pickedOuts.length >= releaseMin;

  /* dock batch generate */
  const runGenerate = (autofill: boolean) => {
    if (!stRef.current.body.trim()) { onToast("Write a prompt first"); return; }
    pushHist();
    const n = st.genCount;
    const baseTx = stRef.current.nodes.filter((nn) => nn.type === "text") as TextNode[];
    const rv = autofill ? randVals(baseTx) : null;
    const resolved: TextNode[] = baseTx.map((t) => ({ ...t, value: autofill && rv ? (rv["[" + t.name + "]"] ?? t.value) : t.value }));
    const body = stRef.current.body;
    const sig = sigOf(body, resolved);
    const created: { oid: string; vals: Record<string, string>; prompt: string }[] = [];
    for (let i = 0; i < n; i++) {
      const vals: Record<string, string> = {}; resolved.forEach((t) => { vals["[" + t.name + "]"] = t.value; });
      created.push({ oid: nid("o"), vals, prompt: buildPrompt(body, resolved, vals) });
    }
    setSt((p) => {
      let nodes = p.nodes.map((x) => ({ ...x }));
      if (autofill && rv) nodes = nodes.map((nn) => (nn.type === "text" ? { ...nn, value: rv["[" + nn.name + "]"] ?? nn.value } : nn));
      let cons = (p.cons || []).slice(); let conSeq = p.conSeq || 0;
      if (!cons.some((c) => c.sig === sig)) { cons = [{ sig, body: p.body, cidx: conSeq }, ...cons]; conSeq += 1; }
      created.forEach((c) => nodes.push({ id: c.oid, type: "output", sig, vals: c.vals, img: null, status: "loading", picked: false }));
      return { ...p, cons, conSeq, nodes };
    });
    created.forEach((c) => finalizeOutput(c.oid, c.prompt));
    onToast((autofill ? "Auto-filled & generating " : "Generating ") + n + " image" + (n > 1 ? "s" : "") + " · Nano Banana Pro");
  };

  const release = () => {
    const need = st.mode === "free" ? 1 : 4;
    const ready = outs.filter((o) => o.img && o.status === "ready");
    const picked = ready.filter((o) => o.picked);
    if (ready.length < need) { onToast("Generate " + need + " example" + (need > 1 ? "s" : "") + " first — fill variables and click ▶ on the prompt (" + ready.length + "/" + need + ")"); return; }
    if (picked.length < need) { onToast("Select " + need + " output" + (need > 1 ? "s" : "") + " to publish — tap the ★ on the ones you want shown (" + picked.length + "/" + need + ")"); return; }
    onToast(picked.length + " selected output" + (picked.length > 1 ? "s" : "") + " published · prompt released to marketplace");
    onClose();
  };

  /* ── dragging ── */
  const drag = useRef<{ kind: string; sx: number; sy: number; id?: string; ox: number; oy: number; sig?: string; portType?: string; from?: { x: number; y: number }; color?: string; moved?: boolean } | null>(null);
  const rightPan = useRef({ active: false, moved: false }); // right-drag pans; suppresses the context menu if it moved
  const onPointerMove = useCallback((e: PointerEvent) => {
    const d = drag.current; if (!d) return;
    const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
    if (d.kind === "pan") { setPan({ x: d.ox + dx, y: d.oy + dy }); if (rightPan.current.active && Math.abs(dx) + Math.abs(dy) > 4) rightPan.current.moved = true; }
    else if (d.kind === "node") setSt((p) => ({ ...p, nodes: p.nodes.map((n) => (n.id === d.id ? { ...n, x: d.ox + dx / zoomRef.current, y: d.oy + dy / zoomRef.current } : n)) }));
    else if (d.kind === "dock") {
      setDock({ x: d.ox + dx, y: d.oy + dy, placed: true });
      // Dock only when the CURSOR itself is right at the canvas edge.
      const EDGE = 8;
      pendingDockSide.current = (e.clientX - sidebarWRef.current) <= EDGE ? "left" : (e.clientX >= window.innerWidth - EDGE ? "right" : null);
    }
    else if (d.kind === "connect") {
      const to = { x: (e.clientX - sidebarWRef.current - panRef.current.x) / zoomRef.current, y: (e.clientY - panRef.current.y) / zoomRef.current };
      if (Math.abs(dx) + Math.abs(dy) > 6) d.moved = true;
      setConnectLine({ from: d.from!, to, color: d.color! });
    }
    else if (d.kind === "outoff") setSt((p) => ({ ...p, nodes: p.nodes.map((n) => (n.id === d.id ? { ...n, off: { x: d.ox + dx / zoomRef.current, y: d.oy + dy / zoomRef.current } } : n)) }));
    else if (d.kind === "marquee") {
      if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
      setMarquee({ x0: d.sx, y0: d.sy, x1: e.clientX, y1: e.clientY });
      // live touch-select: a node is selected the moment the box touches it
      const box = { left: Math.min(d.sx, e.clientX), top: Math.min(d.sy, e.clientY), right: Math.max(d.sx, e.clientX), bottom: Math.max(d.sy, e.clientY) };
      const ids: string[] = [];
      document.querySelectorAll<HTMLElement>(".nc-node[data-nid]").forEach((el) => {
        const r = el.getBoundingClientRect(); const id = el.getAttribute("data-nid");
        if (id && id !== "prompt" && r.left < box.right && r.right > box.left && r.top < box.bottom && r.bottom > box.top) ids.push(id);
      });
      setSelSet(new Set(ids));
    }
    else if (d.kind === "row") setSt((p) => ({ ...p, cons: (p.cons || []).map((c) => (c.sig === d.sig ? { ...c, off: { x: d.ox + dx / zoomRef.current, y: d.oy + dy / zoomRef.current } } : c)) }));
  }, []);
  const endDrag = useCallback((e: PointerEvent) => {
    const d = drag.current; drag.current = null;
    document.body.style.userSelect = "";
    window.removeEventListener("pointermove", onPointerMove); window.removeEventListener("pointerup", endDrag);
    if (!d) return;
    if (d.kind === "pan") { rightPan.current.active = false; setPanning(false); } // keep `moved` for the contextmenu that fires next
    if (d.kind === "dock") setDockSide(pendingDockSide.current);
    if (d.kind === "connect") {
      setConnectLine(null);
      if (d.moved) {
        const pos = { x: (e.clientX - sidebarWRef.current - panRef.current.x) / zoomRef.current, y: (e.clientY - panRef.current.y) / zoomRef.current };
        spawnFromPortKind(d.portType!, pos);
      }
    }
    if (d.kind === "marquee") {
      setMarquee(null);
      if (!d.moved) setSelSet(new Set()); // a plain click clears; a drag kept its live selection
    }
  }, [onPointerMove]);
  const startDrag = (kind: string, e: React.PointerEvent, extra: Record<string, unknown>) => {
    e.stopPropagation();
    if (kind === "pan") setPanning(true);
    drag.current = { kind, sx: e.clientX, sy: e.clientY, ox: 0, oy: 0, ...extra } as typeof drag.current;
    document.body.style.userSelect = "none";
    window.addEventListener("pointermove", onPointerMove); window.addEventListener("pointerup", endDrag);
  };
  // Ctrl/⌘+click toggles a node in/out of the multi-selection.
  const toggleSel = (id: string) => setSelSet((s) => { const n = new Set(s); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const startNodeDrag = (id: string, e: React.PointerEvent) => { if (e.ctrlKey || e.metaKey) { e.stopPropagation(); toggleSel(id); return; } const n = st.nodes.find((x) => x.id === id)!; pushHist(); setSel(id); setSelRow(null); setSelSet(new Set()); startDrag("node", e, { id, ox: n.x || 0, oy: n.y || 0 }); };
  // Output nodes are positioned by the constellation grid, so dragging moves an offset on top.
  const startOutDrag = (id: string, e: React.PointerEvent) => { if (e.ctrlKey || e.metaKey) { e.stopPropagation(); toggleSel(id); return; } const n = st.nodes.find((x) => x.id === id); const off = n?.off || { x: 0, y: 0 }; pushHist(); setSel(id); setSelRow(null); setSelSet(new Set()); startDrag("outoff", e, { id, ox: off.x, oy: off.y }); };
  const startRowDrag = (sig: string, e: React.PointerEvent) => {
    setSel(null); setSelRow(sig);
    const con = (st.cons || []).find((c) => c.sig === sig); const off = (con && con.off) || { x: 0, y: 0 };
    if (!con) setSt((p) => ({ ...p, cons: [{ sig, body: p.body, cidx: p.conSeq || 0, off: { x: 0, y: 0 } }, ...(p.cons || [])], conSeq: (p.conSeq || 0) + 1 }));
    startDrag("row", e, { sig, ox: off.x, oy: off.y });
  };
  const startPan = (e: React.PointerEvent) => {
    setCtx(null); setZoomEditing(false);
    // Right-drag, middle-mouse, or Space-hold → pan the canvas.
    if (e.button === 2) { rightPan.current = { active: true, moved: false }; startDrag("pan", e, { ox: pan.x, oy: pan.y }); return; }
    if (e.button === 1 || spaceRef.current || tool === "hand") { startDrag("pan", e, { ox: pan.x, oy: pan.y }); return; }
    if (e.button !== 0) return;
    // Ctrl/⌘ + left-drag on empty canvas → marquee-select.
    if (e.ctrlKey || e.metaKey) {
      setSel(null); setSelRow(null);
      if (typeof window !== "undefined") window.getSelection()?.removeAllRanges();
      setMarquee({ x0: e.clientX, y0: e.clientY, x1: e.clientX, y1: e.clientY });
      startDrag("marquee", e, {});
      return;
    }
    // Plain left-drag on empty canvas → pan the view; a plain click clears the selection.
    setSel(null); setSelRow(null); setSelSet(new Set());
    startDrag("pan", e, { ox: pan.x, oy: pan.y });
  };
  const startDock = (e: React.PointerEvent) => {
    const ncW = window.innerWidth - sidebarWRef.current;
    let dx: number, dy: number;
    if (dockSide === "left") { dx = 0; dy = 54; }
    else if (dockSide === "right") { dx = ncW - 216; dy = 54; }
    else { dx = dock.placed ? dock.x : ncW - 332; dy = dock.placed ? dock.y : dockTopRef.current; }
    setDockSide(null); pendingDockSide.current = null;
    startDrag("dock", e, { ox: dx, oy: dy });
  };

  /* ── ports: drag-out / double-click to spawn a connected node ── */
  const promptPortWorld = (pt: string) => { const x = prompt.x || 0, y = prompt.y || 0; if (pt === "out") return { x: x + 480, y: y + 123 }; return { x, y: y + 123 }; };
  const portColor = (pt: string) => (pt === "text" ? TEXT_PALETTE[0].dot : pt === "out" ? "var(--enki-ember)" : REF_COLOR.dot);
  // pos given (drag-release) → drop the node exactly there; no pos (double-click) → auto-place / generate.
  const spawnFromPortKind = (pt: string, pos?: { x: number; y: number }) => {
    // Drag-release offsets the new node so ITS connecting port lands on the drop point.
    if (pt === "text") { if (pos) addText({ x: pos.x - 250, y: pos.y - 30 }); else addText(); }
    else if (pt === "out") { if (pos) addOutput({ x: pos.x, y: pos.y - 30 }); else spawnOutput(); }
  };
  const startConnect = (pt: string, e: React.PointerEvent) => { const from = promptPortWorld(pt); setConnectLine({ from, to: from, color: portColor(pt) }); startDrag("connect", e, { portType: pt, from, color: portColor(pt), moved: false }); };
  const portDbl = (pt: string, e: React.MouseEvent) => { e.stopPropagation(); spawnFromPortKind(pt); };

  /* ── image input (real files, no placeholders) ── */
  const setRefImg = (id: string, url: string) => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => (n.id === id ? { ...n, img: url } : n)) }));
  const readImages = (fileList: FileList | null): Promise<string[]> => {
    const files = Array.from(fileList || []).filter((f) => f.type.startsWith("image/"));
    return Promise.all(files.map((f) => new Promise<string>((res) => { const r = new FileReader(); r.onload = () => res(r.result as string); r.readAsDataURL(f); })));
  };
  // Click/drop on one empty node: the first image fills it, extras become new reference nodes.
  const onRefFiles = async (id: string, fileList: FileList | null) => {
    const urls = await readImages(fileList);
    urls.forEach((url, i) => (i === 0 ? setRefImg(id, url) : addRef(url)));
  };
  // "+" on the deck → multi-file upload; every picked image becomes a ref card.
  const addRefsFromFiles = async (fileList: FileList | null) => {
    const urls = await readImages(fileList);
    if (!urls.length) return;
    commit((p) => ({ ...p, nodes: [...p.nodes, ...urls.map((u) => ({ id: nid("r"), type: "ref", img: u, userInput: false } as NodeT))] }));
  };
  // Drop anywhere on the canvas: fill empty reference nodes first, then add new ones.
  const onCanvasDrop = async (e: React.DragEvent) => {
    e.preventDefault(); setDropOn(false);
    const urls = await readImages(e.dataTransfer.files);
    if (!urls.length) return;
    const empties = stRef.current.nodes.filter((n) => n.type === "ref" && !n.img).map((n) => n.id);
    urls.forEach((url, i) => (i < empties.length ? setRefImg(empties[i], url) : addRef(url)));
  };

  /* ports & edges */
  // Exact centres of the rendered 15px port dots so edges always meet the dot.
  const portPos = (n: NodeT, which?: string) => {
    if (n.type === "prompt") {
      if (which === "text") return { x: n.x || 0, y: (n.y || 0) + 123 };
      return { x: (n.x || 0) + 480, y: (n.y || 0) + 123 };
    }
    if (n.type === "output") return { x: n.x || 0, y: (n.y || 0) + 30 };
    return { x: (n.x || 0) + (n.type === "ref" ? 172 : 250), y: (n.y || 0) + 30 };
  };
  // Shared "bus" lines (like PCB traces): inputs converge on a trunk just left
  // of the prompt; outputs all spring from a trunk just right of it.
  const IN_TRUNK = (prompt.x || 0) - 36;
  const OUT_TRUNK = (prompt.x || 0) + 480 + 36;
  // Output position = its grid/free slot + any drag offset.
  const outPos = (o: NodeT) => { const b = layout.map[o.id] || (o.status === "empty" ? { x: o.x || 0, y: o.y || 0 } : null); return b ? { x: b.x + (o.off?.x || 0), y: b.y + (o.off?.y || 0) } : null; };
  const edges: { from: { x: number; y: number }; to: { x: number; y: number }; trunk: number; c: string }[] = [];
  texts.forEach((t) => edges.push({ from: portPos(t), to: portPos(prompt, "text"), trunk: IN_TRUNK, c: (textColor[t.name] || TEXT_PALETTE[0]).dot }));
  outs.forEach((o) => { const pos = outPos(o); if (pos) edges.push({ from: portPos(prompt, "out"), to: { x: pos.x, y: pos.y + 30 }, trunk: OUT_TRUNK, c: palOf((st.cons.find((c) => c.sig === o.sig) || { cidx: 0 }).cidx || 0).bar }); });
  // Rounded orthogonal path: run to the shared trunk x, then branch to the target.
  const path = (a: { x: number; y: number }, b: { x: number; y: number }, tx: number) => {
    if (Math.abs(b.y - a.y) < 1) return "M" + a.x + " " + a.y + " H" + b.x;
    const sy = b.y >= a.y ? 1 : -1, sx1 = tx >= a.x ? 1 : -1, sx2 = b.x >= tx ? 1 : -1;
    const r1 = Math.max(0, Math.min(9, Math.abs(tx - a.x), Math.abs(b.y - a.y) / 2));
    const r2 = Math.max(0, Math.min(9, Math.abs(b.x - tx), Math.abs(b.y - a.y) / 2));
    return ["M" + a.x + " " + a.y, "H" + (tx - sx1 * r1), "Q" + tx + " " + a.y + " " + tx + " " + (a.y + sy * r1),
      "V" + (b.y - sy * r2), "Q" + tx + " " + b.y + " " + (tx + sx2 * r2) + " " + b.y, "H" + b.x].join(" ");
  };

  const ctxAdd = (type: string) => { if (!ctx) return; const w = { x: ctx.wx, y: ctx.wy }; setCtx(null); if (type === "text") addText(w); else addOutput(w); };
  // Full-screen overlays (maximize / lightbox) portal above the sidebar (z-index
  // 120) into .ek-app so they cover the whole viewport, including the left menu.
  const portalRoot = typeof document !== "undefined" ? ((document.querySelector(".ek-app") as HTMLElement) || document.body) : null;
  // Generate dock is anchored to the upper-right corner, just below the toolbar.
  const dockTop = 64;
  dockTopRef.current = dockTop;

  return (
    <div className="nc" onDrop={onCanvasDrop} onDragOver={(e) => { if (!e.dataTransfer.types.includes("Files")) return; e.preventDefault(); setDropOn(true); }} onDragLeave={(e) => { if (e.currentTarget === e.target) setDropOn(false); }}>
      {/* canvas */}
      <div ref={canvasRef} className={"nc-canvas" + (panning ? " panning" : "") + (tool === "hand" ? " hand" : "")}
        style={{ backgroundPosition: `${pan.x}px ${pan.y}px`, backgroundSize: `${26 * zoom}px ${26 * zoom}px` }}
        onPointerDown={startPan}
        onContextMenu={(e) => { e.preventDefault(); if (rightPan.current.moved) { rightPan.current.moved = false; return; } setCtx({ x: e.clientX, y: e.clientY, wx: (e.clientX - sidebarWRef.current - pan.x) / zoom, wy: (e.clientY - pan.y) / zoom }); }}>
        <div className="nc-world" style={{ transform: "translate(" + pan.x + "px," + pan.y + "px) scale(" + zoom + ")" }}>
          {/* edges */}
          <svg className="nc-edges" width="4000" height="3000">
            {edges.map((e, i) => <path key={i} className="nc-edge" d={path(e.from, e.to, e.trunk)} stroke={e.c} />)}
            {connectLine && <path className="nc-edge" style={{ stroke: connectLine.color, strokeDasharray: "6 6" }} d={path(connectLine.from, connectLine.to, (connectLine.from.x + connectLine.to.x) / 2)} />}
          </svg>

          {/* constellation row frames */}
          {layout.frames.filter((f) => f.count > 0).map((f) => { const pal = palOf(f.cidx); return (
            <div key={f.sig} className={"nc-cframe" + (f.current ? " current" : "") + (selRow === f.sig ? " sel" : "")} style={{ left: f.x, top: f.y, width: f.w, height: 300, background: pal.soft, borderColor: pal.bar }}>
              <div className="nc-clabel" style={{ background: pal.bg, color: pal.ink }} onPointerDown={(e) => startRowDrag(f.sig, e)} title="Drag to move this prompt variant">
                <Icon name="grip" size={13} stroke={2} style={{ opacity: 0.6 }} />
                <span className="nc-clabel-dot" style={{ background: pal.bar }} />
                {f.current ? "Current prompt" : "Prompt variant"} · {f.count} image{f.count === 1 ? "" : "s"}
              </div>
            </div>
          ); })}

          {/* prompt node */}
          <div className={"nc-node nc-prompt" + (sel === "prompt" ? " sel" : "")} style={{ left: prompt.x, top: prompt.y }}
            onPointerDown={() => setSel("prompt")}>
            {dropOn && <div className="nc-dropglow" />}
            <div className="nc-nhead" style={{ background: "color-mix(in oklab, var(--enki-ember) 16%, transparent)" }} onPointerDown={(e) => startNodeDrag("prompt", e)}>
              <span className="nc-ndot" style={{ background: "var(--enki-ember)" }} />
              <EditName className="nc-ribbon-title" value={st.title} onChange={(v) => setSt((p) => ({ ...p, title: v }))} placeholder="Write prompt title…" />
              <div className={"nc-pm" + (modelFlipUp ? " nc-pm--up" : "")} onPointerDown={(e) => e.stopPropagation()}>
                <button ref={modelTrigRef} className={"nc-pm-trigger" + (modelOpen ? " open" : "")} title="Model used for this prompt — price shown is the production cost"
                  onClick={(e) => { e.stopPropagation(); if (!modelOpen) { const r = modelTrigRef.current?.getBoundingClientRect(); const ph = NC_MODELS.length * 38 + 16; if (r) setModelFlipUp(window.innerHeight - r.bottom < ph + 14 && r.top > ph + 14); } setModelOpen((o) => !o); }}>
                  <span className="nc-pm-name">{(NC_MODELS.find((m) => m.id === st.models[0]) || NC_MODELS[0]).name}</span>
                  <span className="nc-pm-price">${(NC_MODELS.find((m) => m.id === st.models[0]) || NC_MODELS[0]).price.toFixed(2)}</span>
                  <Icon name="chevronDown" size={13} stroke={2.4} className="nc-pm-chev" />
                </button>
                {modelOpen && (
                  <div className="nc-pm-panel" role="listbox">
                    {NC_MODELS.map((m) => (
                      <button key={m.id} role="option" aria-selected={m.id === st.models[0]}
                        className={"nc-pm-opt" + (m.id === st.models[0] ? " on" : "")}
                        onClick={() => { setSt((p) => ({ ...p, models: [m.id] })); setModelOpen(false); }}>
                        <span className="nc-pm-opt-name">{m.name}</span>
                        <span className="nc-pm-opt-cost"><b>${m.price.toFixed(2)}</b> prod. cost</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="nc-nbody">
              <div className={"nc-refs" + (dropOn ? " drop" : "")}>
                <div className="nc-refs-h">Referenced images{dropOn && <span className="nc-refs-h-drop"> · release to add here</span>}</div>
                <div className="nc-refs-deck" ref={deckRef}>
                  {refs.map((r, i) => { const isOver = refOverI === i && refDragI !== null && refDragI !== i; return (
                    <div key={r.id} className={"nc-refcard" + (r.userInput ? " ui" : "") + (refDragI === i ? " dragging" : "") + (isOver ? " over" : "")} draggable
                      style={{ marginLeft: (i === 0 ? 0 : refOverlap) + (isOver ? 44 : 0), zIndex: refDragI === i ? 320 : i + 1 }}
                      onDragStart={() => { refDrag.current = i; setRefDragI(i); }}
                      onDragOver={(e) => { e.preventDefault(); if (refDragI !== null && refOverI !== i) setRefOverI(i); }}
                      onDrop={(e) => { e.preventDefault(); if (refDrag.current !== null) moveRef(refDrag.current, i); refDrag.current = null; setRefDragI(null); setRefOverI(null); }}
                      onDragEnd={() => { refDrag.current = null; setRefDragI(null); setRefOverI(null); }}>
                      {r.img ? (
                        <img src={r.img} alt={"reference " + (i + 1)} draggable={false} title="Click to maximize" onClick={(e) => { e.stopPropagation(); setRefMax(r.img!); }} />
                      ) : (
                        <label className="nc-refcard-up"
                          onDrop={(e) => { e.preventDefault(); e.stopPropagation(); onRefFiles(r.id, e.dataTransfer.files); }}
                          onDragOver={(e) => e.preventDefault()}>
                          <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => { onRefFiles(r.id, e.target.files); e.currentTarget.value = ""; }} />
                          <Icon name="imageDrop" size={15} stroke={1.8} />
                        </label>
                      )}
                      <span className="nc-refcard-num">{i + 1}</span>
                      <button className="nc-refcard-x" title="Remove reference" onClick={() => deleteNodeId(r.id)}>×</button>
                      <button className={"nc-refcard-ui" + (r.userInput ? " on" : "")} title={r.userInput ? "User input — the buyer supplies this image" : "Mark as user input (buyer supplies this image)"} onClick={() => toggleRefUserInput(r.id)} role="checkbox" aria-checked={!!r.userInput}>
                        <span className="nc-refcard-ui-box">{r.userInput && <Icon name="check" size={8} stroke={4} />}</span>
                        User input
                      </button>
                    </div>
                  ); })}
                  <button className="nc-refadd" style={{ marginLeft: REF_GAP }} title="Upload reference images" onClick={() => refUploadRef.current?.click()}>+</button>
                  <input ref={refUploadRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => { addRefsFromFiles(e.target.files); e.currentTarget.value = ""; }} />
                </div>
              </div>
              <div className="nc-pbox">
                <div className="nc-pov" ref={ovRef} aria-hidden="true">
                  {st.body.split(TOKEN_RE).map((part, i) => {
                    if (/^\[[^\]\n]+\]$/.test(part)) { const c = colorForTok(part); const isPub = pubNames.has(part.slice(1, -1)); return <span key={i} className={"nc-tok" + (armed === part ? " armed" : "") + (isPub ? " pub" : "")} style={{ background: c.bg, color: c.text, boxShadow: isPub ? "inset 0 0 0 1px " + c.border + ", 0 0 0 2.5px var(--enki-turq)" : "inset 0 0 0 1px " + c.border }}>{part}</span>; }
                    return <span key={i}>{part}</span>;
                  })}{"\n"}
                </div>
                <textarea ref={taRef} className="nc-pta" value={st.body} style={{ minHeight: boxH.current }}
                  placeholder="Describe the image you want to sell as a prompt…"
                  onChange={(e) => onBodyChange(e.target.value)}
                  onFocus={pushHist} onKeyDown={onPromptKey}
                  onScroll={() => { if (ovRef.current && taRef.current) ovRef.current.scrollTop = taRef.current.scrollTop; }}
                  onPointerDown={(e) => e.stopPropagation()} spellCheck={false} />
              </div>
              <div className="nc-addrow nc-addrow--gen">
                <div className="nc-genopts">
                  <NcSelect icon={<RatioIcon size={14} style={{ color: "var(--enki-ink-3)" }} />} value={st.ratio} width={104} title="Aspect ratio · does not affect grouping"
                    options={NC_RATIOS.map((r) => ({ value: r, label: r }))} onChange={(v) => setSt((p) => ({ ...p, ratio: v }))} />
                  <NcSelect icon={<Maximize2 size={14} style={{ color: "var(--enki-ink-3)" }} />} value={st.quality} width={88} title="Quality · does not affect grouping"
                    options={NC_QUALITIES.map((q) => ({ value: q, label: q }))} onChange={(v) => setSt((p) => ({ ...p, quality: v }))} />
                </div>
                <button className={"nc-prompt-genbtn nc-prompt-genbtn--stack" + (canGenerate ? "" : " disabled")} title={canGenerate ? "Generate one image at " + st.quality : "Write a prompt first"} onClick={spawnOutput}>
                  <span className="nc-genbtn-top"><Icon name="sparkles" size={14} stroke={2} fill={canGenerate ? "var(--cta-ink)" : "none"} /> Generate</span>
                  <span className="nc-genbtn-sub">${perImage.toFixed(2)}</span>
                </button>
              </div>
            </div>
            {/* ports — text input (left) + generated-images output (right); reference images are an in-prompt deck */}
            <span className="nc-port nc-port--io" style={{ left: -7.5, top: 115.5, background: TEXT_PALETTE[0].dot }}
              title="Text inputs · drag out (or double-click) to add one"
              onPointerDown={(e) => startConnect("text", e)} onDoubleClick={(e) => portDbl("text", e)} />
            <span className="nc-port-lab nc-port-lab--in" style={{ top: 116 }}>text</span>
            <button className="nc-port-add" style={{ left: -28, top: 115 }} title="Add a text input node"
              onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); addText(); }}><Icon name="plus" size={11} stroke={2.6} /></button>
            <span className="nc-port nc-port--io" style={{ right: -7.5, top: 115.5, background: "var(--enki-ember)" }}
              title="Generated images output · drag out (or double-click) to render"
              onPointerDown={(e) => startConnect("out", e)} onDoubleClick={(e) => portDbl("out", e)} />
            <span className="nc-port-lab nc-port-lab--out" style={{ top: 110 }}>Output<br />Images</span>
            <button className="nc-port-add" style={{ right: -28, top: 115 }}
              title="Add an output image node (Generate also creates one automatically)"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); addOutput(); }}>
              <Icon name="plus" size={11} stroke={2.6} /></button>
          </div>

          {/* text nodes */}
          {texts.map((t) => { const c = textColor[t.name] || TEXT_PALETTE[0]; return (
            <div key={t.id} data-nid={t.id} className={"nc-node nc-text" + (sel === t.id || selSet.has(t.id) ? " sel" : "")} style={{ left: t.x, top: t.y, ...(t.pub ? { borderColor: "var(--enki-turq)", boxShadow: "0 0 0 2.5px var(--enki-turq), 0 6px 22px rgba(0,0,0,.12)" } : null) }} onPointerDown={(e) => { if (e.ctrlKey || e.metaKey) { e.stopPropagation(); toggleSel(t.id); } else setSel(t.id); }}>
              <div className="nc-nhead" style={{ background: `color-mix(in oklab, ${c.dot} 15%, transparent)` }} onPointerDown={(e) => startNodeDrag(t.id, e)}>
                <span className="nc-ndot" style={{ background: c.dot }} />
                <EditName className="nc-ntitle" value={t.name} onChange={(v) => renameText(t.id, v)} placeholder={t.name} title={`Double-click to change the name of "${t.name}"`} />
                <button className="nc-ntrash" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); deleteNodeId(t.id); }}><Icon name="trash" size={14} stroke={2} /></button>
              </div>
              <div className="nc-nbody">
                <div className="nc-vtoggle">
                  <button className={t.kind === "text" ? "active" : ""} title="Text — the user types their own words" onClick={() => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => (n.id === t.id ? { ...n, kind: "text" } : n)) }))}>Text</button>
                  <button className={t.kind === "bool" ? "active" : ""} title="Checkbox — the user just toggles this detail on or off (no typing)" onClick={() => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => (n.id === t.id ? { ...n, kind: "bool", value: n.value === "Yes" || n.value === "on" ? "on" : "off" } : n)) }))}>Checkbox</button>
                </div>
                {t.kind === "text" ? (
                  <textarea className="nc-vin nc-varea" placeholder={"Default value · e.g. " + t.name} value={t.value} onChange={(e) => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => (n.id === t.id ? { ...n, value: e.target.value } : n)) }))} onPointerDown={(e) => e.stopPropagation()} spellCheck={false} />
                ) : (
                  <>
                    <textarea className="nc-vin nc-varea" placeholder={"Prompt added when checked · e.g. " + t.name} value={t.str || ""} onChange={(e) => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => (n.id === t.id ? { ...n, str: e.target.value } : n)) }))} onPointerDown={(e) => e.stopPropagation()} spellCheck={false} />
                    <label className="nc-chk" title="Default state of the checkbox the user will see" onClick={() => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => (n.id === t.id ? { ...n, value: n.value === "on" || n.value === "Yes" ? "off" : "on" } : n)) }))}>
                      <span className={"nc-chk-box" + (t.value === "on" || t.value === "Yes" ? " on" : "")}>{(t.value === "on" || t.value === "Yes") && <Icon name="check" size={11} stroke={3} />}</span> Checked by default
                    </label>
                  </>
                )}
                <label className="nc-chk" onClick={() => setSt((p) => ({ ...p, nodes: p.nodes.map((n) => (n.id === t.id ? { ...n, pub: !n.pub } : n)) }))}>
                  <span className={"nc-chk-box" + (t.pub ? " on" : "")}>{t.pub && <Icon name="check" size={11} stroke={3} />}</span> Publicly visible (user input)
                </label>
              </div>
              <span className="nc-port" style={{ right: -7.5, top: 22.5, background: c.dot }} />
            </div>
          ); })}

          {/* output nodes */}
          {outs.map((o, oi) => {
            const pos = outPos(o); if (!pos) return null;
            const pal = palOf((st.cons.find((c) => c.sig === o.sig) || { cidx: 0 }).cidx || 0);
            const exp = expandedOuts[o.id];
            return (
              <div key={o.id} data-nid={o.id} className={"nc-node nc-out" + (sel === o.id || selSet.has(o.id) ? " sel" : "") + (o.picked ? " picked" : "")} style={{ left: pos.x, top: pos.y, borderColor: o.picked ? undefined : pal.bar }} onPointerDown={(e) => { if (e.ctrlKey || e.metaKey) { e.stopPropagation(); toggleSel(o.id); } else setSel(o.id); }} onDoubleClick={(e) => { e.stopPropagation(); addOutput(); }}>
                {pulseId === o.id && <span className="nc-pulse" style={{ color: pal.bar }}><Icon name="arrowRight" size={20} stroke={3} /></span>}
                <div className="nc-nhead" style={{ background: `color-mix(in oklab, ${pal.bar} 16%, transparent)` }} onPointerDown={(e) => startOutDrag(o.id, e)}>
                  <span className="nc-ndot" style={{ background: pal.bar }} />
                  <span className="nc-ntitle" style={{ color: "var(--enki-ink)" }}>Output Image {oi + 1}</span>
                  {o.img && <button className={"nc-out-pick" + (o.picked ? " on" : "")} title={o.picked ? "Marked for public release — will be shown publicly. Click to unmark." : "Mark for public release (shown publicly). Only one group can be released."} onPointerDown={(e) => e.stopPropagation()} onClick={() => togglePick(o.id)}><Icon name="star" size={14} stroke={2} fill={o.picked ? "currentColor" : "none"} /></button>}
                  {o.img && <button className="nc-out-pushbtn" title="Send these values to the editor on the left" onPointerDown={(e) => e.stopPropagation()} onClick={() => setConfirmPush(o.id)}><Icon name="chevronLeft" size={15} stroke={2.4} /></button>}
                  <button className="nc-ntrash" onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); deleteNodeId(o.id); }}><Icon name="trash" size={14} stroke={2} /></button>
                </div>
                <div className="nc-nbody">
                  {o.img ? (
                    <img className="nc-out-img" src={o.img} alt="output" draggable={false} style={{ cursor: "zoom-in" }}
                      onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); openLightbox(o.id); }} />
                  ) : o.status === "loading" ? (
                    <div className="nc-out-empty"><span className="ek-spinner" /> generating…</div>
                  ) : (
                    <div className="nc-out-empty nc-out-empty--click" title="Click to load this image's variables & prompt into the editor on the left"
                      onPointerDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); pushValuesLeft(o.id); }}>
                      <Icon name="image" size={20} stroke={1.6} /> empty<span className="nc-out-empty-hint">show composition ←</span>
                    </div>
                  )}
                  {o.img && texts.length > 0 && (
                    <>
                      <button className="nc-out-toggle" onPointerDown={(e) => e.stopPropagation()} onClick={() => toggleExpand(o.id)}>
                        <Icon name="chevronDown" size={13} stroke={2.4} style={{ transform: exp ? "rotate(180deg)" : "none" }} /> {texts.length} variable value{texts.length === 1 ? "" : "s"}
                      </button>
                      {exp && (
                        <div className="nc-out-vars">
                          {texts.map((t) => {
                            const c = textColor[t.name] || TEXT_PALETTE[0];
                            const tok = "[" + t.name + "]";
                            const raw = (o.vals || {})[tok];
                            const val = raw !== undefined ? raw : t.value;
                            const isBool = t.kind === "bool";
                            const disp = isBool ? (val === "on" ? "On" : "Off") : (val || "—");
                            const ekey = o.id + ":" + tok;
                            const open = outEdit === ekey;
                            if (open)
                              return isBool ? (
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
                    <div className="nc-confirm-t">Overwrite the variable values in the left-hand editor with this image&apos;s values?</div>
                    <div className="nc-confirm-actions">
                      <button className="nc-confirm-no" onClick={() => setConfirmPush(null)}>Cancel</button>
                      <button className="nc-confirm-yes" onClick={() => pushValuesLeft(o.id)}>Overwrite</button>
                    </div>
                  </div>
                )}
                <span className="nc-port" style={{ left: -7.5, top: 22.5, background: pal.bar }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* edge arrows — point to image groups that are scrolled off-screen;
          click to glide the view onto that group */}
      {(() => {
        const W = vp.w - sidebarW, H = vp.h, M = 32;
        return layout.frames.filter((f) => f.count > 0).map((f) => {
          const scx = (f.x + f.w / 2) * zoom + pan.x, scy = (f.y + 150) * zoom + pan.y;
          if (scx >= 0 && scx <= W && scy >= 0 && scy <= H) return null; // on-screen
          const cx = W / 2, cy = H / 2; const dx = scx - cx, dy = scy - cy;
          if (dx === 0 && dy === 0) return null;
          const s = Math.min(dx !== 0 ? (W / 2 - M) / Math.abs(dx) : Infinity, dy !== 0 ? (H / 2 - M) / Math.abs(dy) : Infinity);
          const ex = cx + dx * s, ey = cy + dy * s;
          const deg = Math.atan2(dy, dx) * 180 / Math.PI;
          const pal = palOf(f.cidx);
          return (
            <button key={f.sig} className="nc-edgearrow" style={{ left: ex, top: ey, color: pal.bar }}
              title="Jump to this image group" onClick={() => focusFrame(f.x, f.w, f.y)}>
              <span className="nc-edgearrow-ico" style={{ transform: "rotate(" + deg + "deg)" }}><Icon name="arrowRight" size={20} stroke={2.6} /></span>
            </button>
          );
        });
      })()}

      {/* tool group — top-right, separate from the prompt-settings bar */}
      <div className="nc-toolbar">
        <button className="nc-iconbtn" onClick={undo} disabled={!hist.current.past.length} title="Undo"><Icon name="undo" size={15} stroke={2} /></button>
        <button className="nc-iconbtn" onClick={redo} disabled={!hist.current.future.length} title="Redo"><Icon name="redo" size={15} stroke={2} /></button>
        <span className="nc-rb-div" />
        <button className="nc-iconbtn" onClick={() => tweenZoom(zoomRef.current / 1.25)} disabled={zoom <= 0.3} title="Zoom out">−</button>
        {zoomEditing ? (
          <input className="nc-zoomval nc-zoomedit" autoFocus value={zoomInput} inputMode="numeric"
            onChange={(e) => setZoomInput(e.target.value.replace(/[^0-9]/g, ""))}
            onBlur={commitZoomInput}
            onKeyDown={(e) => { if (e.key === "Enter") commitZoomInput(); else if (e.key === "Escape") setZoomEditing(false); }} />
        ) : (
          <span className="nc-zoomval" title="Click to type a zoom level" onClick={() => { setZoomInput(String(Math.round(zoom * 100))); setZoomEditing(true); }}>{Math.round(zoom * 100)}%</span>
        )}
        <button className="nc-iconbtn" onClick={() => tweenZoom(zoomRef.current * 1.25)} disabled={zoom >= 1} title="Zoom in">+</button>
        {mockMode && <button className="nc-mock-chip" title="Mock-up mode is on — Generate produces instant placeholder images. Click to turn off." onClick={() => setMockMode(false)}><Icon name="wand" size={12} stroke={2.2} /> Mock-up</button>}
        <span className="nc-rb-div" />
        <div className="nc-toolseg" role="group" aria-label="Canvas tool">
          <button className={tool === "select" ? "on" : ""} title="Select tool — left-drag moves the view, Ctrl+left-drag marquee-selects, right-drag also moves" onClick={() => setTool("select")}><Icon name="cursor" size={15} stroke={2} /></button>
          <button className={tool === "hand" ? "on" : ""} title="Hand tool — drag anywhere to move the view" onClick={() => setTool("hand")}><Icon name="hand" size={15} stroke={2} /></button>
        </div>
        <span className="nc-rb-div" />
        <div className="nc-menu-wrap">
          <button className={"nc-iconbtn" + (menuOpen ? " on" : "")} onClick={() => setMenuOpen((o) => !o)} title="Menu" aria-haspopup="menu" aria-expanded={menuOpen}><Icon name="menu" size={17} stroke={2} /></button>
          {menuOpen && (
            <>
              <div className="nc-menu-scrim" onPointerDown={() => setMenuOpen(false)} />
              <div className="nc-menu" role="menu">
                <button className={"nc-menu-item nc-menu-toggle" + (mockMode ? " on" : "")} role="menuitemcheckbox" aria-checked={mockMode} onClick={() => setMockMode((v) => !v)}>
                  <Icon name="wand" size={15} stroke={2} /> <span className="nc-menu-grow">Mock-up mode</span>
                  <span className="nc-menu-state">{mockMode ? "On" : "Off"}</span>
                </button>
                <div className="nc-menu-sep" />
                <button className="nc-menu-item" role="menuitem" onClick={exportPrompt}><Icon name="download" size={15} stroke={2} /> Export prompt as JSON</button>
                <button className="nc-menu-item" role="menuitem" onClick={importPrompt}><Icon name="upload" size={15} stroke={2} /> Import prompt JSON</button>
                <div className="nc-menu-sep" />
                <button className="nc-menu-item" role="menuitem" onClick={onClose}><Icon name="x" size={15} stroke={2} /> Close editor</button>
              </div>
            </>
          )}
        </div>
        <input ref={fileRef} type="file" accept="application/json,.json" style={{ display: "none" }} onChange={onImportFile} />
      </div>

      {/* Generate panel — flush to the top-right frame edge, in line with the toolbar */}
      <div className="nc-gp" role="dialog">
        <div className="nc-gp-row">
          <span className="nc-gp-lab">{imgCount} image{imgCount > 1 ? "s" : ""}</span>
          <span className="nc-gp-cost">${cost.toFixed(2)}</span>
        </div>
        <div className="nc-gp-gen">
          <button className="nc-gp-btn" onClick={() => runGenerate(true)} title="Autofill variables & generate"><Icon name="wand" size={12} stroke={2} /> Autofill</button>
          <button className="nc-gp-btn" onClick={() => runGenerate(false)} title="Pay & generate"><Icon name="zap" size={12} stroke={2} fill="currentColor" /> Pay&nbsp;&amp;&nbsp;Gen</button>
        </div>
        <div className="nc-gp-rel">
          <div className="nc-gp-relh"><Icon name="star" size={10} stroke={2} fill="currentColor" /> To release{pickedOuts.length ? " · " + pickedOuts.length : ""}</div>
          {pickedOuts.length ? (() => {
            const pSig = pickedOuts[0].sig; const pCon = (st.cons || []).find((c) => c.sig === pSig);
            const pPal = palOf(pCon?.cidx ?? 0); const pLabel = pSig === curSig ? "Current prompt" : "Prompt variant";
            const pFrame = layout.frames.find((f) => f.sig === pSig);
            return (
              <>
                <button className="nc-gp-group" style={{ background: pPal.bg, color: pPal.ink }} title="Focus this group in the editor"
                  onClick={() => { if (pFrame) focusFrame(pFrame.x, pFrame.w, pFrame.y); }}>
                  <span className="nc-release-gdot" style={{ background: pPal.bar }} /> {pLabel} · {pickedOuts.length} <Icon name="arrowRight" size={10} stroke={2.4} />
                </button>
                <div className="nc-gp-strip">
                  {pickedOuts.map((o) => (
                    <button key={o.id} className="nc-gp-thumb" style={{ borderColor: pPal.bar }} title="Click to preview" onClick={() => setRefMax(o.img!)}>
                      <img src={o.img || undefined} alt="" draggable={false} />
                    </button>
                  ))}
                </div>
              </>
            );
          })() : (
            <div className="nc-gp-relhint">Tap <b>★</b> on outputs to publish them publicly · one group only.</div>
          )}
        </div>
        <button className={"nc-gp-release" + (canRelease ? "" : " disabled")} disabled={!canRelease} onClick={release}>
          <Icon name="sparkles" size={12} stroke={2} fill="var(--cta-ink)" /> Release{pickedOuts.length ? " " + pickedOuts.length : ""}
        </button>
        {!canRelease && <div className="nc-gp-need">{st.mode === "free" ? "Pick ≥ 1 image" : "Pick ≥ 4 (" + pickedOuts.length + "/4)"}</div>}
      </div>

      {/* prompt-settings ribbon (top-left) */}
      <div className="nc-ribbon">
        <div className="nc-rb-cell">
          <span className="nc-rb-lab">Title</span>
          <input className="nc-rb-input" value={st.title} onChange={(e) => setSt((p) => ({ ...p, title: e.target.value }))} placeholder="Write prompt title…" />
        </div>
        <div className="nc-rb-cell">
          <span className="nc-rb-lab">Prompt type</span>
          <div className="ce-seg">
            <button type="button" className={st.mode === "free" ? "active" : ""} title="Free prompt — anyone can run it at no cost. You publish 1 example image when releasing." onClick={() => setSt((p) => ({ ...p, mode: "free" }))}>Free</button>
            <button type="button" className={st.mode === "premium" ? "active" : ""} title="Premium prompt — buyers pay to unlock it; you earn per sale. You publish 4 example images when releasing." onClick={() => setSt((p) => ({ ...p, mode: "premium" }))}>Premium</button>
          </div>
        </div>
        <div className="nc-rb-cell">
          <span className="nc-rb-lab">Category</span>
          <NcSelect value={st.cat} width={138} title="Prompt category"
            options={[{ value: "", label: "Any" }, ...CATEGORIES.map((c) => ({ value: c, label: c }))]}
            onChange={(v) => setSt((p) => ({ ...p, cat: v }))} />
        </div>
        <div className="nc-rb-cell">
          <span className="nc-rb-lab">Ratio</span>
          <NcSelect value={st.ratio} width={92} title="Aspect ratio"
            options={NC_RATIOS.map((r) => ({ value: r, label: r }))}
            onChange={(v) => setSt((p) => ({ ...p, ratio: v }))} />
        </div>
      </div>

      {/* context menu */}
      {ctx && (
        <div className="nc-ctx" style={{ left: Math.min(ctx.x, window.innerWidth - 210), top: Math.min(ctx.y, window.innerHeight - 170) }} onPointerDown={(e) => e.stopPropagation()}>
          <button className="nc-ctx-item" onClick={() => ctxAdd("text")}><span className="nc-ctx-ico" style={{ background: TEXT_PALETTE[0].dot }}><Icon name="type" size={15} stroke={2} /></span> Add Text Input</button>
          <button className="nc-ctx-item" onClick={() => ctxAdd("output")}><span className="nc-ctx-ico" style={{ background: "var(--enki-ember)" }}><Icon name="image" size={15} stroke={2} /></span> Add Output Slot</button>
        </div>
      )}

      {marquee && (
        <div className="nc-marquee" style={{ left: Math.min(marquee.x0, marquee.x1), top: Math.min(marquee.y0, marquee.y1), width: Math.abs(marquee.x1 - marquee.x0), height: Math.abs(marquee.y1 - marquee.y0) }} />
      )}

      {tipOpen ? (
        <div className="nc-help">
          <button className="nc-help-x" onClick={() => setTipOpen(false)} title="Hide tip" aria-label="Hide tip">‹</button>
          <b>Tip:</b> right-click the canvas to add nodes · drag images onto the prompt · press <b>Delete</b> on a colored token to remove its variable.
        </div>
      ) : (
        <button className="nc-help-q" onClick={() => setTipOpen(true)} title="Show tip" aria-label="Show tip">?</button>
      )}

      {/* image lightbox — maximize an output, browse its group (←/→) and switch
          between image groups (↑/↓) via the vertical rail on the left */}
      {lbOpen && lbGroups.length > 0 && (() => {
        const g = Math.min(lbG, lbGroups.length - 1);
        const grp = lbGroups[g];
        const i = Math.min(lbI, grp.imgs.length - 1);
        const cur = grp.imgs[i];
        const pal = palOf(grp.cidx);
        if (!portalRoot) return null;
        return createPortal(
          <div className="nc-lb" onPointerDown={() => setLbOpen(false)}>
            <div className="nc-lb-rail" onPointerDown={(e) => e.stopPropagation()}>
              {lbGroups.map((gr, gi) => { const gp = palOf(gr.cidx); return (
                <button key={gr.sig} className={"nc-lb-railitem" + (gi === g ? " on" : "")} style={{ borderColor: gi === g ? gp.bar : "transparent" }}
                  title={"Group " + (gi + 1) + " · " + gr.imgs.length + " image" + (gr.imgs.length === 1 ? "" : "s")}
                  onClick={() => { setLbG(gi); setLbI(0); }}>
                  <img src={gr.imgs[0].img || undefined} alt="" draggable={false} />
                  <span className="nc-lb-raildot" style={{ background: gp.bar }} />
                </button>
              ); })}
            </div>
            <div className="nc-lb-stage" onPointerDown={(e) => e.stopPropagation()}>
              <div className="nc-lb-mainwrap">
                <img className="nc-lb-main" src={cur.img || undefined} alt="output" draggable={false} />
              </div>
              {grp.imgs.length > 1 && (
                <div className="nc-lb-strip">
                  {grp.imgs.map((im, ii) => (
                    <button key={im.id} className={"nc-lb-thumb" + (ii === i ? " on" : "")} style={{ borderColor: ii === i ? pal.bar : "transparent" }} onClick={() => setLbI(ii)}>
                      <img src={im.img || undefined} alt="" draggable={false} />
                    </button>
                  ))}
                </div>
              )}
              <div className="nc-lb-meta">
                <span className="nc-lb-badge" style={{ background: pal.bg, color: pal.ink }}>Group {g + 1}/{lbGroups.length}</span>
                <span className="nc-lb-count">Image {i + 1}/{grp.imgs.length}</span>
                <span className="nc-lb-hint">↑ ↓ groups · ← → images · Esc close</span>
              </div>
            </div>
            <button className="nc-lb-close" onPointerDown={(e) => e.stopPropagation()} onClick={() => setLbOpen(false)} title="Close (Esc)"><Icon name="x" size={20} stroke={2} /></button>
          </div>, portalRoot);
      })()}

      {/* maximized reference image — portaled over the whole screen (incl. sidebar) */}
      {refMax && portalRoot && createPortal(
        <div className="nc-refmax" onPointerDown={() => setRefMax(null)}>
          <img className="nc-refmax-img" src={refMax} alt="reference" draggable={false} onPointerDown={(e) => e.stopPropagation()} />
          <button className="nc-refmax-x" onPointerDown={(e) => e.stopPropagation()} onClick={() => setRefMax(null)} title="Close (Esc)"><Icon name="x" size={20} stroke={2} /></button>
        </div>, portalRoot)}

      {/* co-generate dialog: leftover empty slots set up with different settings */}
      {genConfirm && portalRoot && createPortal((() => {
        const items = genConfirm.ids.map((id) => {
          const o = st.nodes.find((n) => n.id === id);
          const con = (st.cons || []).find((c) => c.sig === o?.sig);
          const fp = o ? buildPrompt(con?.body || st.body, texts, o.vals || {}) : "";
          const vars = Object.entries((o?.vals) || {}).filter(([, v]) => v);
          return { id, fp, vars };
        });
        const allOn = genConfirm.checked.size === items.length && items.length > 0;
        const total = genConfirm.checked.size * perImage;
        const toggle = (id: string) => setGenConfirm((g) => { if (!g) return g; const n = new Set(g.checked); if (n.has(id)) n.delete(id); else n.add(id); return { ...g, checked: n }; });
        return (
          <div className="nc-gconf-scrim" onPointerDown={() => setGenConfirm(null)}>
            <div className="nc-gconf" onPointerDown={(e) => e.stopPropagation()}>
              <div className="nc-gconf-h">You set up {items.length} empty image{items.length > 1 ? "s" : ""} with different settings and haven&apos;t generated {items.length > 1 ? "them" : "it"} yet. Pick which to generate too — nothing is removed.</div>
              <button className="nc-gconf-all" onClick={() => setGenConfirm((g) => g ? { ...g, checked: allOn ? new Set() : new Set(items.map((i) => i.id)) } : g)}>
                <span className={"nc-gconf-cb" + (allOn ? " on" : "")}>{allOn && <Icon name="check" size={11} stroke={3} />}</span> Select all
              </button>
              <div className="nc-gconf-list">
                {items.map((it) => { const on = genConfirm.checked.has(it.id); return (
                  <button key={it.id} className={"nc-gconf-item" + (on ? " on" : "")} onClick={() => toggle(it.id)}>
                    <span className={"nc-gconf-cb" + (on ? " on" : "")}>{on && <Icon name="check" size={11} stroke={3} />}</span>
                    <span className="nc-gconf-body">
                      <span className="nc-gconf-prompt">{it.fp || "(no prompt text)"}</span>
                      {it.vars.length > 0 && <span className="nc-gconf-vars">{it.vars.map(([k, v]) => <span key={k} className="nc-gconf-var">{k.slice(1, -1)}: {String(v)}</span>)}</span>}
                    </span>
                  </button>
                ); })}
              </div>
              <div className="nc-gconf-foot">
                <span className="nc-gconf-total">Total to pay: <b>${total.toFixed(2)}</b></span>
                <div className="nc-gconf-btns">
                  <button className="nc-gconf-cancel" onClick={() => setGenConfirm(null)}>Not now</button>
                  <button className="nc-gconf-go" disabled={!genConfirm.checked.size} onClick={confirmCoGen}><Icon name="sparkles" size={13} stroke={2} fill="var(--cta-ink)" /> Generate {genConfirm.checked.size}</button>
                </div>
              </div>
            </div>
          </div>
        );
      })(), portalRoot)}
    </div>
  );
}
