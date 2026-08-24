"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import RatioRect from "./RatioRect";
// Self-carried styles, the BoostToggle pattern: surfaces outside the editor
// (buyer generator, quick create) do not load nodes.css.
import "./ratio-select.css";

/** Fixed-position coordinates for an open panel, measured from the trigger. */
export interface PanelPos {
  left: number;
  minWidth: number;
  top?: number;
  bottom?: number;
  maxHeight: number;
}

/**
 * Shared popover plumbing for the ratio-styled selects (ratio, quality).
 *
 * The panel is position:FIXED, not absolute: an absolute panel inside the
 * scrollable settings rail extends the rail's scroll extent, so opening a
 * dropdown grew the rail a scrollbar and every control lost that width
 * (Kev, 2026-08-24: "scrollable im element selbst statt die ganze UI").
 * Fixed positioning leaves the rail's scrollbar alone; the panel itself
 * scrolls internally only when the viewport cannot hold the full list, and
 * it closes on any scroll so it can never sit detached from its trigger.
 */
export function usePanelPos(itemCount: number) {
  const [pos, setPos] = useState<PanelPos | null>(null);
  const trigRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const open = pos !== null;

  useEffect(() => {
    if (!open) return;
    const close = () => setPos(null);
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); close(); }
    };
    window.addEventListener("pointerdown", onDown, true);
    window.addEventListener("keydown", onKey, true);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("pointerdown", onDown, true);
      window.removeEventListener("keydown", onKey, true);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  const toggle = () => {
    if (open) { setPos(null); return; }
    const r = trigRef.current?.getBoundingClientRect();
    if (!r) return;
    const panelH = itemCount * 30 + 12;
    const below = window.innerHeight - r.bottom - 8;
    const above = r.top - 8;
    // Open where the full list fits; when neither side holds it, take the
    // larger side and let the panel scroll inside itself.
    const up = below < panelH && above > below;
    setPos({
      left: r.left,
      minWidth: r.width,
      top: up ? undefined : r.bottom + 4,
      bottom: up ? window.innerHeight - r.top + 4 : undefined,
      maxHeight: Math.max(90, Math.min(panelH, (up ? above : below))),
    });
  };

  return { pos, open, toggle, close: () => setPos(null), trigRef, wrapRef };
}

/** Inline style applying a PanelPos to the .enki-ratio-panel element. */
export function panelStyle(pos: PanelPos): React.CSSProperties {
  return {
    position: "fixed",
    left: pos.left,
    top: pos.top,
    bottom: pos.bottom,
    minWidth: pos.minWidth,
    maxHeight: pos.maxHeight,
    overflowY: "auto",
  };
}

/**
 * The one aspect-ratio picker for surfaces that used a native <select>.
 *
 * A native option cannot render the ratio's shape, and Kev wants the little
 * rectangle beside every ratio everywhere ("globally ... mit den fitting
 * rechtecken", 2026-08-22). The editor's NcSelect draws the same rects; this
 * component brings them to the plain-CSS surfaces without dragging the whole
 * editor module along.
 */
export default function RatioSelect({ value, options, onChange, title }: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  title?: string;
}) {
  const { pos, open, toggle, close, trigRef, wrapRef } = usePanelPos(options.length);

  return (
    <div ref={wrapRef} className="enki-ratio-sel">
      <button ref={trigRef} type="button" className={"enki-ratio-trig" + (open ? " open" : "")}
        title={title} aria-label={title ?? "Aspect ratio"} aria-expanded={open} onClick={toggle}>
        <RatioRect ratio={value} size={14} />
        <span>{value}</span>
        <ChevronDown size={12} aria-hidden />
      </button>
      {pos && (
        <div className="enki-ratio-panel" role="listbox" style={panelStyle(pos)}>
          {options.map((r) => (
            <button key={r} type="button" role="option" aria-selected={r === value}
              className={"enki-ratio-opt" + (r === value ? " on" : "")}
              onClick={() => { onChange(r); close(); }}>
              <RatioRect ratio={r} size={15} />
              <span>{r}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
