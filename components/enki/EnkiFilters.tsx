"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, Search, X, Cpu, Check, ChevronDown } from "lucide-react";
import { usePanelPos, panelStyle } from "@/components/generation/RatioSelect";
import "@/components/generation/ratio-select.css";

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
  /** Generator filter — the catalogue grouped by media type. */
  generators?: GeneratorGroup[];
  /** Selected generator ids; empty = all. */
  generatorFilter?: string[];
  onGeneratorFilter?: (ids: string[]) => void;
};

export type GeneratorGroup = {
  /** "Image" | "Video" — subgroups arrive with the models that carry them. */
  label: string;
  entries: Array<{ id: string; name: string }>;
};

export default function EnkiFilters({ active, toggle, generators, generatorFilter, onGeneratorFilter }: EnkiFiltersProps) {
  const allActive = active.length === 0;
  const [visible, setVisible] = useState(true);
  /* Lifted out of SearchChip: while the search is open it OWNS the row —
     the categories fade back and the field spreads over them (Kev,
     2026-08-24: "predominant temporarily aufgeklappt über den rubriken"). */
  const [searchOpen, setSearchOpen] = useState(false);
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
    <div className={`enki-catbar${visible ? "" : " enki-catbar--hidden"}${searchOpen ? " enki-catbar--searching" : ""}`}>
      {/* All button */}
      <button
        className={`enki-catbar-all${allActive ? " active" : ""}`}
        onClick={() => active.forEach((tag) => toggle(tag))}
        type="button"
        aria-label="All categories"
        tabIndex={searchOpen ? -1 : 0}
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
              tabIndex={searchOpen ? -1 : 0}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Which generators feed the wall — grouped Image/Video (Kev,
          2026-08-24). */}
      {generators && onGeneratorFilter && (
        <GeneratorChip groups={generators} selected={generatorFilter ?? []} onChange={onGeneratorFilter} />
      )}

      {/* Search lives here now, closed, as a single glyph after the last
          category (Kev, 2026-08-13). Open, it takes the WHOLE row: the field
          spreads over the categories and they fade back until it closes
          (Kev, 2026-08-24). */}
      <SearchChip open={searchOpen} setOpen={setSearchOpen} />
    </div>
  );
}

/**
 * Generator filter — which launchers feed the wall, grouped by media type
 * (Image / Video) so a whole medium is one click and single generators are
 * the rows beneath (Kev, 2026-08-24). A group header toggles its whole
 * group; empty selection means "all". Same portal panel as every dropdown.
 */
function GeneratorChip({ groups, selected, onChange }: {
  groups: GeneratorGroup[];
  selected: string[];
  onChange: (ids: string[]) => void;
}) {
  const rows = groups.reduce((n, g) => n + g.entries.length + 1, 0);
  const { pos, close, toggle, trigRef, wrapRef, panelRef } = usePanelPos(rows);
  const flip = (id: string) =>
    onChange(selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id]);
  const flipGroup = (g: GeneratorGroup) => {
    const ids = g.entries.map((e) => e.id);
    const all = ids.every((id) => selected.includes(id));
    onChange(all ? selected.filter((x) => !ids.includes(x)) : [...new Set([...selected, ...ids])]);
  };

  return (
    <div ref={wrapRef} className="enki-genchip-wrap">
      <button ref={trigRef} type="button"
        className={`enki-genchip${selected.length ? " active" : ""}`}
        aria-label="Filter by generator" title="Filter by generator"
        onClick={toggle}>
        <Cpu size={13} aria-hidden />
        {selected.length ? `Generators · ${selected.length}` : "Generators"}
        <ChevronDown size={11} aria-hidden />
      </button>
      {pos && createPortal(
        <div ref={panelRef} className="enki-ratio-panel enki-gen-panel" role="listbox" style={panelStyle(pos)}>
          {groups.map((g) => {
            const ids = g.entries.map((e) => e.id);
            const all = ids.length > 0 && ids.every((id) => selected.includes(id));
            return (
              <div key={g.label}>
                <button type="button" className={"enki-ratio-opt enki-gen-group" + (all ? " on" : "")}
                  onClick={() => flipGroup(g)}>
                  <span>{g.label}</span>
                  {all && <Check size={13} className="enki-ratio-opt-sub" aria-hidden />}
                </button>
                {g.entries.map((e) => (
                  <button key={e.id} type="button" role="option" aria-selected={selected.includes(e.id)}
                    className={"enki-ratio-opt enki-gen-entry" + (selected.includes(e.id) ? " on" : "")}
                    onClick={() => flip(e.id)}>
                    <span>{e.name}</span>
                    {selected.includes(e.id) && <Check size={13} className="enki-ratio-opt-sub" aria-hidden />}
                  </button>
                ))}
              </div>
            );
          })}
          {selected.length > 0 && (
            <button type="button" className="enki-ratio-opt enki-gen-clear"
              onClick={() => { onChange([]); close(); }}>
              <span>Show all</span>
            </button>
          )}
        </div>,
        document.body,
      )}
    </div>
  );
}

function SearchChip({ open, setOpen }: { open: boolean; setOpen: (v: boolean | ((v: boolean) => boolean)) => void }) {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  /* Open when it has something to show. A search that closed itself while a
     query was still filtering the feed would leave the user looking at a
     narrowed list with nothing on screen saying why. */
  useEffect(() => {
    if (params.get("q")) setOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
