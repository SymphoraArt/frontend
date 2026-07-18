"use client";

/* Doc view for Create Prompt 2 — the "Enki Docs Editor" design: edit the
   prompt like a document (serif page, token chips, comment-rail variable
   cards, refs + generate at the page foot, results/release on the right).
   It is a THIN SKIN over NodeCreator's `st`: every mutation goes through the
   same handlers the node canvas uses, so both views stay in perfect sync. */

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "./icons";
import {
  NcSelect, NC_MODELS, NC_QUALITIES, NC_QUALITY_MULT, NC_RATIOS, TOKEN_RE, isRefTok,
  type Con, type EditorView, type Kind, type NodeT, type St, type TextNode,
} from "./NodeCreator";

export interface DocViewApi {
  st: St;
  texts: TextNode[];
  refs: NodeT[];
  outs: NodeT[];
  cons: Con[];
  curSig: string;
  liveTokNames: Set<string>;
  liveRefCount: number;
  pubNames: Set<string>;
  colorForTok: (tok: string) => { bg: string; text: string; border: string; dot: string };
  palOf: (cidx: number) => { bg: string; bar: string; ink: string; soft: string };
  perImage: number;
  canGenerate: boolean;
  pickedOuts: NodeT[];
  releaseMin: number;
  canRelease: boolean;
  modelAccept: string;
  onBodyChange: (v: string) => void;
  pushHist: () => void;
  addText: (atPos?: { x: number; y: number }, presetName?: string) => void;
  patchText: (id: string, patch: Partial<NodeT>) => void;
  setTextKind: (id: string, kind: Kind) => void;
  renameText: (id: string, name: string) => void;
  deleteNodeId: (id: string) => void;
  addRefsFromFiles: (files: FileList | null) => void;
  onRefFiles: (id: string, files: FileList | null) => void;
  toggleRefUserInput: (id: string) => void;
  setRefMax: (url: string | null) => void;
  spawnOutput: (autofill?: boolean) => void;
  togglePick: (id: string) => void;
  release: () => void;
  openLightbox: (id: string) => void;
  setModel: (id: string) => void;
  setRatio: (v: string) => void;
  setQuality: (v: string) => void;
  onToast: (msg: string) => void;
  switchView: (v: EditorView) => void;
}

export default function DocView({ api }: { api: DocViewApi }) {
  const {
    st, texts, refs, outs, cons, curSig, liveTokNames, liveRefCount, pubNames,
    colorForTok, palOf, perImage, canGenerate, pickedOuts, releaseMin, canRelease,
  } = api;

  // Which variable card is open in the rail (token incl. brackets), and the
  // floating "+ Add variable" pill (page-relative position + selection range).
  const [openVar, setOpenVar] = useState<string | null>(null);
  const [pill, setPill] = useState<{ x: number; y: number; start: number; end: number } | null>(null);
  const [autoFill, setAutoFill] = useState(true);
  const openVarRef = useRef(openVar); openVarRef.current = openVar;
  const pillRef = useRef(pill); pillRef.current = pill;
  const pageRef = useRef<HTMLDivElement | null>(null);
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const refUpRef = useRef<HTMLInputElement | null>(null);

  // ESC closes doc-local popups BEFORE NodeCreator's close flow sees the key.
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openVarRef.current || pillRef.current) {
        e.stopPropagation();
        setOpenVar(null);
        setPill(null);
      }
    };
    window.addEventListener("keydown", k, true);
    return () => window.removeEventListener("keydown", k, true);
  }, []);

  /* ── selection → variable ── */
  const readSelection = (e: { clientX?: number; clientY?: number }) => {
    const ta = taRef.current, page = pageRef.current;
    if (!ta || !page) return;
    const s = ta.selectionStart, en = ta.selectionEnd;
    const seg = st.body.slice(s, en);
    if (en <= s || !seg.trim() || /[[\]\n]/.test(seg)) { setPill(null); return; }
    const r = page.getBoundingClientRect();
    // The design anchors the pill to the mouse — cheap and always visible.
    const x = Math.max(8, Math.min((e.clientX ?? r.left + 80) - r.left - 56, r.width - 150));
    const y = (e.clientY ?? r.top + 40) - r.top + 18;
    setPill({ x, y, start: s, end: en });
  };
  const addVariableFromPill = () => {
    if (!pill) return;
    const seg = st.body.slice(pill.start, pill.end).trim();
    if (!seg) { setPill(null); return; }
    const body = st.body.slice(0, pill.start) + "[" + seg + "]" + st.body.slice(pill.end);
    // Body first, then the backing node: addText sees the token already in the
    // (queued) body and skips its own append — same path as typing a token.
    api.onBodyChange(body);
    if (!texts.some((t) => t.name === seg)) api.addText(undefined, seg);
    setPill(null);
    setOpenVar("[" + seg + "]");
    api.onToast(`"${seg}" is now a variable.`);
  };

  /* ── rail cards: text variables in the order they appear in the body ── */
  const railVars = useMemo(() => {
    const order = new Map<string, number>();
    let m: RegExpExecArray | null;
    const re = new RegExp(TOKEN_RE.source, "g");
    while ((m = re.exec(st.body)) !== null) if (!order.has(m[0])) order.set(m[0], m.index);
    return texts
      .slice()
      .sort((a, b) => (order.get("[" + a.name + "]") ?? 1e9) - (order.get("[" + b.name + "]") ?? 1e9));
  }, [st.body, texts]);

  const needsSetup = (t: TextNode) => (t.kind === "bool" ? !(t.str && t.str.trim()) : !t.value.trim());

  const openCard = (tok: string) => {
    setOpenVar((v) => (v === tok ? null : tok));
    // Bring the card into view when a chip in the text is clicked.
    requestAnimationFrame(() => {
      railRef.current?.querySelector(`[data-vcard="${CSS.escape(tok)}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  };

  /* ── results groups: constellation rows with their outputs ── */
  const groups = useMemo(
    () =>
      cons
        .map((c) => ({ con: c, pal: palOf(c.cidx), outs: outs.filter((o) => o.sig === c.sig), current: c.sig === curSig }))
        .filter((g) => g.outs.length > 0),
    [cons, outs, curSig, palOf],
  );

  const genCost = perImage; // one render per doc-Generate click
  const model = NC_MODELS.find((mm) => mm.id === st.models[0]) || NC_MODELS[0];

  return (
    <div className="ncd" onPointerDown={(e) => {
      // Clicking plain desk (not a card, chip or the pill) closes the open card.
      const t = e.target as HTMLElement;
      if (!t.closest("[data-vcard]") && !t.closest(".nc-tok") && !t.closest(".ncd-pill")) setOpenVar(null);
    }}>
      <div className="ncd-desk">
        <div className="ncd-wrap">
          {/* ── the page ── */}
          <div className="ncd-page" ref={pageRef}>
            <div className="ncd-pbox">
              <div className="ncd-pov" aria-hidden>
                {(() => {
                  const parts = st.body.split(TOKEN_RE);
                  return parts.map((part, i) => {
                    if (!/^\[[^\]\n]+\]$/.test(part)) return <span key={i}>{part}</span>;
                    const name = part.slice(1, -1);
                    const refTok = isRefTok(part);
                    const refN = refTok ? parseInt(part.replace(/\D/g, ""), 10) : 0;
                    const alive = refTok ? refN >= 1 && refN <= liveRefCount : liveTokNames.has(name);
                    if (!alive) return <span key={i}>{part}</span>;
                    const c = colorForTok(part);
                    const isPub = pubNames.has(name);
                    return (
                      <span key={i}
                        className={"nc-tok" + (isPub ? " pub" : "") + (openVar === part ? " ncd-tok-open" : "")}
                        style={{
                          "--tok-bg": c.bg,
                          "--tok-ring": isPub ? "inset 0 0 0 1px " + c.border + ", 0 0 0 2px var(--enki-turq)" : "inset 0 0 0 1px " + c.border,
                          color: c.text,
                        } as React.CSSProperties}
                        title={refTok ? "Reference image " + refN : "Click to edit this variable"}
                        onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); if (!refTok) openCard(part); }}
                      >
                        <span className="nc-tok-br">[</span>{name}<span className="nc-tok-br">]</span>
                      </span>
                    );
                  });
                })()}{"\n"}
              </div>
              <textarea
                ref={taRef}
                className="ncd-pta"
                value={st.body}
                placeholder="Describe your image. Wrap any word in [brackets] — or select it and click Add variable — to turn it into a variable."
                spellCheck={false}
                onChange={(e) => { api.onBodyChange(e.target.value); setPill(null); }}
                onFocus={api.pushHist}
                onMouseUp={readSelection}
                onKeyUp={(e) => { if (e.shiftKey || e.key === "Shift") readSelection({}); }}
                onBlur={() => setTimeout(() => setPill(null), 180)}
              />
            </div>

            {pill && (
              <button className="ncd-pill" style={{ left: pill.x, top: pill.y }}
                onMouseDown={(e) => { e.preventDefault(); addVariableFromPill(); }}>
                <Icon name="plus" size={12} stroke={2.6} /> Add variable
              </button>
            )}

            {/* ── page foot: refs + generate ── */}
            <div className="ncd-foot">
              <div className="ncd-refs">
                <span className="ncd-lab">Refs</span>
                {refs.map((r, i) => (
                  <span key={r.id} className={"ncd-ref" + (r.userInput ? " ui" : "")}>
                    {r.img ? (
                      <img src={r.img} alt={"reference " + (i + 1)} draggable={false} title="Click to maximize" onClick={() => api.setRefMax(r.img!)} />
                    ) : (
                      <label className="ncd-ref-up" title="Upload this reference image">
                        <input type="file" accept="image/*" multiple style={{ display: "none" }} onChange={(e) => { api.onRefFiles(r.id, e.target.files); e.currentTarget.value = ""; }} />
                        <Icon name="image" size={12} stroke={1.8} />
                      </label>
                    )}
                    <button className="ncd-ref-x" title="Remove reference" onClick={() => api.deleteNodeId(r.id)}>×</button>
                    <button className={"ncd-ref-ui" + (r.userInput ? " on" : "")} role="checkbox" aria-checked={!!r.userInput}
                      title={r.userInput ? "User input — the buyer supplies this image" : "Mark as user input (buyer supplies this image)"}
                      onClick={() => api.toggleRefUserInput(r.id)}>
                      {r.userInput && <Icon name="check" size={7} stroke={4} />}
                    </button>
                  </span>
                ))}
                <button className="ncd-ref-add" title="Upload reference images" onClick={() => refUpRef.current?.click()}>+</button>
                <input ref={refUpRef} type="file" accept={api.modelAccept} multiple style={{ display: "none" }} onChange={(e) => { api.addRefsFromFiles(e.target.files); e.currentTarget.value = ""; }} />
              </div>
              <div className="ncd-genopts">
                <NcSelect value={st.models[0]} width={148} title="Model used for this prompt"
                  options={NC_MODELS.map((mm) => ({ value: mm.id, label: mm.name, sub: "$" + mm.price.toFixed(2) }))}
                  onChange={api.setModel} />
                <NcSelect value={st.ratio} width={84} title="Aspect ratio"
                  options={NC_RATIOS.map((r) => ({ value: r, label: r }))} onChange={api.setRatio} />
                <NcSelect value={st.quality} width={76} title="Quality"
                  options={NC_QUALITIES.map((q) => ({ value: q, label: q, sub: "×" + (NC_QUALITY_MULT[q] ?? 1) }))}
                  onChange={api.setQuality} />
              </div>
              <div className="ncd-genrow">
                <label className="nc-chk ncd-autofill" title="An AI writes the variable values for each new image before rendering" onClick={() => setAutoFill((v) => !v)}>
                  <span className={"nc-chk-box" + (autoFill ? " on" : "")}>{autoFill && <Icon name="check" size={11} stroke={3} />}</span> Auto&nbsp;Fill
                </label>
                <button className={"nc-prompt-genbtn nc-prompt-genbtn--stack" + (canGenerate ? "" : " disabled")}
                  title={canGenerate ? (autoFill ? "AI fills the variables, then renders · " + st.quality : "Render with the current variable values · " + st.quality) : "Write a prompt first"}
                  onClick={() => { if (!canGenerate) return; api.spawnOutput(autoFill); }}>
                  <span className="nc-genbtn-top"><Icon name="zap" size={13} stroke={2.2} fill={canGenerate ? "var(--cta-ink)" : "none"} /> Generate</span>
                  <span className="nc-genbtn-sub">{model.name.split(" ")[0]} · ${genCost.toFixed(2)}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── comment rail: variable cards ── */}
          <div className="ncd-rail" ref={railRef}>
            {railVars.length === 0 && (
              <div className="ncd-rail-empty">
                No variables yet. Select a word in your prompt and click <b>Add variable</b> — it will show up here like a comment.
              </div>
            )}
            {railVars.map((t) => {
              const tok = "[" + t.name + "]";
              const c = colorForTok(tok);
              const warn = needsSetup(t);
              const open = openVar === tok || warn;
              return (
                <div key={t.id} data-vcard={tok}
                  className={"ncd-vcard" + (open ? " open" : "") + (warn ? " warn" : "")}
                  style={{ borderLeftColor: c.border }}
                  onPointerDown={(e) => e.stopPropagation()}>
                  <button className="ncd-vhead" onClick={() => setOpenVar((v) => (v === tok ? null : tok))}>
                    <span className="ncd-vdot" style={{ background: c.dot }} />
                    <span className="ncd-vname" style={{ color: c.text }}>{t.name}</span>
                    <span className={"ncd-vtype" + (t.kind === "bool" ? " bool" : "")}>{t.kind === "bool" ? "Checkbox" : "Text"}</span>
                    <span className="ncd-vtrash" role="button" title="Remove this variable (the words stay in your prompt)"
                      onClick={(e) => { e.stopPropagation(); api.deleteNodeId(t.id); api.onToast("Variable removed."); }}>
                      <Icon name="trash" size={12} stroke={2} />
                    </span>
                    <Icon name="chevronDown" size={12} stroke={2.4} style={{ transform: open ? "rotate(180deg)" : "none", opacity: warn ? 0.3 : 0.7, transition: "transform .15s" }} />
                  </button>
                  {!open ? (
                    <div className="ncd-vprev">{(t.kind === "bool" ? t.str : t.value)?.trim() || <i>No default yet — tap to add one.</i>}</div>
                  ) : (
                    <div className="ncd-vbody">
                      <div className="nc-vtoggle">
                        <button className={t.kind === "text" ? "active" : ""} title="The buyer types their own words" onClick={() => api.setTextKind(t.id, "text")}>Text</button>
                        <button className={t.kind === "bool" ? "active" : ""} title="The buyer just switches this on or off" onClick={() => api.setTextKind(t.id, "bool")}>Checkbox</button>
                      </div>
                      <span className="ncd-lab">Default value</span>
                      {t.kind === "text" ? (
                        <textarea className="nc-vin nc-varea" rows={3} spellCheck={false}
                          placeholder={"What the buyer starts with, e.g. " + t.name}
                          value={t.value}
                          onChange={(e) => api.patchText(t.id, { value: e.target.value })} />
                      ) : (
                        <>
                          <textarea className="nc-vin nc-varea" rows={3} spellCheck={false}
                            placeholder="Text added to the prompt when the buyer checks this"
                            value={t.str || ""}
                            onChange={(e) => api.patchText(t.id, { str: e.target.value })} />
                          <label className="nc-chk" onClick={() => api.patchText(t.id, { value: t.value === "on" || t.value === "Yes" ? "off" : "on" })}>
                            <span className={"nc-chk-box" + (t.value === "on" || t.value === "Yes" ? " on" : "")}>{(t.value === "on" || t.value === "Yes") && <Icon name="check" size={11} stroke={3} />}</span> Checked by default
                          </label>
                        </>
                      )}
                      {t.kind === "text" && (
                        <label className="nc-chk" onClick={() => api.patchText(t.id, { pub: !t.pub })}>
                          <span className={"nc-chk-box" + (t.pub ? " on" : "")}>{t.pub && <Icon name="check" size={11} stroke={3} />}</span> User input — buyer types their own words
                        </label>
                      )}
                      {warn && <div className="ncd-vwarn">Set a default value to collapse this card.</div>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── results / release column ── */}
      <aside className="ncd-results">
        <div className="ncd-res-head">
          <span className="ncd-res-title serif">Results</span>
          <span className="ncd-res-stats">{groups.length} group{groups.length === 1 ? "" : "s"} · {outs.filter((o) => o.img).length} result{outs.filter((o) => o.img).length === 1 ? "" : "s"}</span>
          <span className="ncd-res-help" title="Every different mix of prompt text + variables gets its own group. Pick images from ONE group to publish.">?</span>
        </div>
        <div className="ncd-res-body">
          {groups.length === 0 && (
            <div className="ncd-res-empty">Renders appear here, grouped by prompt version — hit <b>Generate</b>.</div>
          )}
          {groups.map((g) => {
            const picked = g.outs.filter((o) => o.picked && o.img).length;
            return (
              <div key={g.con.sig} className="ncd-group" style={{ borderColor: g.pal.bar }}>
                <div className="ncd-group-h" style={{ background: g.pal.soft, color: g.pal.ink }}>
                  <span className="ncd-vdot" style={{ background: g.pal.bar }} />
                  <span className="ncd-group-name">{g.current ? "Current prompt" : "Prompt variant"}</span>
                  <span className="ncd-group-n">{g.outs.filter((o) => o.img).length}</span>
                  {picked > 0 && <span className="ncd-group-pick" style={{ background: g.pal.bar }}>{picked}/{releaseMin}</span>}
                </div>
                <div className="ncd-strip">
                  {g.outs.map((o) => (
                    <div key={o.id} className={"ncd-tile" + (o.picked ? " picked" : "")} style={o.picked ? { outlineColor: g.pal.bar } : undefined}>
                      {o.img ? (
                        <>
                          <img src={o.img} alt="render" draggable={false} onClick={() => api.openLightbox(o.id)} title="Open preview" />
                          <button className={"ncd-tile-pick" + (o.picked ? " on" : "")} style={o.picked ? { background: g.pal.bar } : undefined}
                            title={o.picked ? "Unpick" : "Pick for publishing (one group only)"}
                            onClick={() => api.togglePick(o.id)}>
                            {o.picked ? <Icon name="check" size={9} stroke={3.4} /> : null}
                          </button>
                        </>
                      ) : o.status === "loading" ? (
                        <span className="ncd-tile-load"><span className="ek-spinner" /></span>
                      ) : (
                        <span className="ncd-tile-empty">empty</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="ncd-res-release">
          <span className={"ncd-res-status" + (canRelease ? " ready" : "")}>
            {canRelease ? pickedOuts.length + " of " + releaseMin + " picked — ready" : pickedOuts.length + " of " + releaseMin + " picked · pick " + releaseMin + " from one group"}
          </span>
          <button className={"nc-gp-release ncd-release" + (canRelease ? "" : " disabled")} disabled={!canRelease} onClick={api.release}>
            <Icon name="sparkles" size={12} stroke={2} fill="var(--cta-ink)" /> Release
          </button>
        </div>
      </aside>
    </div>
  );
}
