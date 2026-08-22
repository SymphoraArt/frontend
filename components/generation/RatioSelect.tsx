"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import RatioRect from "./RatioRect";
// Self-carried styles, the BoostToggle pattern: surfaces outside the editor
// (buyer generator, quick create) do not load nodes.css.
import "./ratio-select.css";

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

  const toggle = () => {
    if (!open) {
      const r = trigRef.current?.getBoundingClientRect();
      const panelH = options.length * 30 + 12;
      if (r) setFlipUp(window.innerHeight - r.bottom < panelH + 12 && r.top > panelH + 12);
    }
    setOpen((o) => !o);
  };

  return (
    <div ref={ref} className={"enki-ratio-sel" + (flipUp ? " up" : "")}>
      <button ref={trigRef} type="button" className={"enki-ratio-trig" + (open ? " open" : "")}
        title={title} aria-label={title ?? "Aspect ratio"} aria-expanded={open} onClick={toggle}>
        <RatioRect ratio={value} size={14} />
        <span>{value}</span>
        <ChevronDown size={12} aria-hidden />
      </button>
      {open && (
        <div className="enki-ratio-panel" role="listbox">
          {options.map((r) => (
            <button key={r} type="button" role="option" aria-selected={r === value}
              className={"enki-ratio-opt" + (r === value ? " on" : "")}
              onClick={() => { onChange(r); setOpen(false); }}>
              <RatioRect ratio={r} size={15} />
              <span>{r}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
