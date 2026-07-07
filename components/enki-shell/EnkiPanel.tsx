"use client";

import { useEffect, type ReactNode } from "react";
import { Icon } from "./icons";

/**
 * Standalone right-side menu panel. It appears (fades in — no slide) over the
 * main area, leaving the left menu fully usable, and closes with the X or Esc.
 * Hosts the existing page/components so every menu item shows on the right.
 */
export default function EnkiPanel({ title, onClose, children, full }: { title: string; onClose: () => void; children: ReactNode; full?: boolean }) {
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);

  return (
    <div className={"ek-panel-scrim" + (full ? " ek-panel-scrim--full" : "")} onClick={onClose}>
      <aside className={"ek-panel" + (full ? " ek-panel--full" : "")} onClick={(e) => e.stopPropagation()}>
        <div className="ek-panel-head">
          <span className="ek-panel-title">{title}</span>
          <button className="ek-panel-x" onClick={onClose} aria-label="Close">
            <Icon name="x" size={18} stroke={2} />
          </button>
        </div>
        <div className="ek-panel-body">{children}</div>
      </aside>
    </div>
  );
}
