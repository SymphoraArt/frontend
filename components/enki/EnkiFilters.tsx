"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, Search, X } from "lucide-react";

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

      {/* Search lives here now, closed, as a single glyph after the last
          category (Kev, 2026-08-13). It used to be a permanent input across
          the top bar, which spent a whole row on a control most visits never
          touch — on a feed you browse first and search second. Opening it
          rolls the field out from the icon rather than swapping one thing for
          another, so the row never jumps. */}
      <SearchChip />
    </div>
  );
}

function SearchChip() {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  /* Open when it has something to show. A search that closed itself while a
     query was still filtering the feed would leave the user looking at a
     narrowed list with nothing on screen saying why. */
  const [open, setOpen] = useState(Boolean(params.get("q")));
  const inputRef = useRef<HTMLInputElement>(null);

  const push = (value: string) => {
    setQuery(value);
    const next = new URLSearchParams(Array.from(params.entries()));
    if (value) next.set("q", value);
    else next.delete("q");
    router.replace(`?${next.toString()}`, { scroll: false });
  };

  /* Two ways in, both ending here because the field lives here now.
     Ctrl/Cmd+K, and the sidebar's own Search item, which can no longer hold a
     ref to an input in another component and asks by event instead. Both OPEN
     it before focusing: focusing something that is not on screen does nothing
     a user can see. */
  useEffect(() => {
    const reveal = () => {
      setOpen(true);
      requestAnimationFrame(() => inputRef.current?.focus());
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        reveal();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("enki:open-search", reveal);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("enki:open-search", reveal);
    };
  }, []);

  return (
    <div className={`enki-catbar-search${open ? " open" : ""}`}>
      <button
        type="button"
        className="enki-catbar-searchbtn"
        aria-label={open ? "Close search" : "Search prompts"}
        aria-expanded={open}
        title="Search prompts (Ctrl K)"
        onClick={() => {
          if (open && query) push("");
          setOpen((v) => !v);
          if (!open) requestAnimationFrame(() => inputRef.current?.focus());
        }}
      >
        {open ? <X size={14} /> : <Search size={14} />}
      </button>
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => push(e.target.value)}
        placeholder="Search prompts, artists, tags…"
        aria-label="Search prompts"
        /* Hidden from tab order while closed: a field nobody can see must not
           be reachable by keyboard either, or focus vanishes off screen. */
        tabIndex={open ? 0 : -1}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            if (query) push("");
            setOpen(false);
          }
        }}
      />
    </div>
  );
}
