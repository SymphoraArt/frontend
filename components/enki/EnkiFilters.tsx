"use client";

import { ChevronDown } from "lucide-react";
import { enkiTags } from "@/lib/enki-redesign";

export default function EnkiFilters({ active, toggle }: { active: string[]; toggle: (tag: string) => void }) {
  return (
    <div className="enki-filters">
      <span className="enki-chip" style={{ background: "transparent", border: "none", color: "var(--ink-3)", fontFamily: "var(--mono)", textTransform: "uppercase", fontSize: 10, letterSpacing: "0.12em", paddingLeft: 0 }}>
        Tags
      </span>
      {enkiTags.slice(0, 7).map((tag) => (
        <button key={tag} className={`enki-chip${active.includes(tag) ? " active" : ""}`} onClick={() => toggle(tag)} type="button">
          {tag}
        </button>
      ))}
      <span className="enki-filter-divider" />
      <span className="enki-chip">Model: any <ChevronDown size={12} /></span>
      <span className="enki-chip">$0 - $2 <ChevronDown size={12} /></span>
      <div className="enki-sort">
        <span className="mono" style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em" }}>Sort</span>
        <strong>Trending</strong>
        <ChevronDown size={12} />
      </div>
    </div>
  );
}
