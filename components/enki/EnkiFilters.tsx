"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutGrid } from "lucide-react";

/**
 * Canonical category list — shared between the feed filter bar and the
 * prompt editor's category dropdown so both always offer the same set.
 * Add/rename categories here only.
 */
export const ENKI_CATEGORIES = [
  "Portrait",
  "Character",
  "Cinematic",
  "Architecture",
  "Abstract",
  "Product",
  "Minimal",
  "Editorial",
] as const;

const CATEGORIES = ENKI_CATEGORIES.map((label) => ({ label }));

type EnkiFiltersProps = {
  active: string[];
  toggle: (tag: string) => void;
  /** When true, only one category can be active at a time (radio behavior) */
  exclusive?: boolean;
};

export default function EnkiFilters({ active, toggle }: EnkiFiltersProps) {
  const allActive = active.length === 0;
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          if (currentY < 80) setVisible(true);
          else if (currentY < lastScrollY.current - 4) setVisible(true);
          else if (currentY > lastScrollY.current + 4) setVisible(false);
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`enki-catbar${visible ? "" : " enki-catbar--hidden"}`}>
      {/* All button */}
      <button
        className={`enki-catbar-all${allActive ? " active" : ""}`}
        onClick={() => active.forEach((tag) => toggle(tag))}
        type="button"
        aria-label="All categories"
      >
        <LayoutGrid size={14} />
        All
      </button>

      <div className="enki-catbar-divider" />

      {/* All categories, inline in a single row */}
      <div className="enki-catbar-scroll">
        {CATEGORIES.map((cat) => {
          const key = cat.label.toLowerCase();
          const isActive = active.includes(key);
          return (
            <button
              key={key}
              className={`enki-catbar-chip${isActive ? " active" : ""}`}
              onClick={() => toggle(key)}
              type="button"
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
