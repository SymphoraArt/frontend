"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, SlidersHorizontal, Check } from "lucide-react";

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

type EnkiFiltersProps = {
  active: string[];
  toggle: (tag: string) => void;
  /** When true, only one category can be active at a time (radio behavior) */
  exclusive?: boolean;
};

/** Self-contained dropdown (button + popover) styled to match the Enki feed. */
function FilterDropdown({
  label,
  value,
  options,
  onSelect,
}: {
  label: string;
  value: string | null;
  options: { value: string | null; label: string }[];
  onSelect: (value: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const current = options.find((o) => o.value === value) ?? options[0];

  return (
    <div className="enki-filter-dd" ref={ref}>
      <button
        type="button"
        className={`enki-filter-dd-trigger${value ? " active" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="enki-filter-dd-label">{label}</span>
        <span className="enki-filter-dd-value">{current?.label}</span>
        <ChevronDown size={14} className="enki-filter-dd-caret" />
      </button>
      {open && (
        <div className="enki-filter-dd-panel" role="listbox">
          {options.map((o) => {
            const isActive = o.value === value;
            return (
              <button
                key={o.value ?? "__all__"}
                type="button"
                role="option"
                aria-selected={isActive}
                className={`enki-filter-dd-opt${isActive ? " active" : ""}`}
                onClick={() => {
                  onSelect(o.value);
                  setOpen(false);
                }}
              >
                <span>{o.label}</span>
                {isActive && <Check size={14} />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function EnkiFilters({ active, toggle }: EnkiFiltersProps) {
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

  // The feed keeps a single active category (toggle sets [tag] or []).
  const activeCategory = active[0] ?? null;

  const categoryOptions: { value: string | null; label: string }[] = [
    { value: null, label: "All categories" },
    ...ENKI_CATEGORIES.map((label) => ({ value: label.toLowerCase(), label })),
  ];

  const selectCategory = (next: string | null) => {
    if (next === null) {
      // Clear: toggle the active tag back off.
      if (activeCategory) toggle(activeCategory);
      return;
    }
    // Selecting a different category replaces the current one (toggle([x])).
    if (next !== activeCategory) toggle(next);
  };

  return (
    <div className={`enki-filterbar${visible ? "" : " enki-filterbar--hidden"}`}>
      <span className="enki-filterbar-lead">
        <SlidersHorizontal size={14} />
        Filters
      </span>
      <FilterDropdown
        label="Category"
        value={activeCategory}
        options={categoryOptions}
        onSelect={selectCategory}
      />
    </div>
  );
}
