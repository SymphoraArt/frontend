"use client";

import { LayoutGrid, MoreHorizontal } from "lucide-react";

const CATEGORIES = [
  { label: "All",              thumb: null },
  { label: "Portrait",         thumb: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop" },
  { label: "Character",        thumb: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=80&h=80&fit=crop" },
  { label: "Cinematic",        thumb: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=80&h=80&fit=crop" },
  { label: "Architecture",     thumb: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=80&h=80&fit=crop" },
  { label: "Abstract",         thumb: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=80&h=80&fit=crop" },
  { label: "Product",          thumb: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop" },
  { label: "Minimal",          thumb: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=80&h=80&fit=crop" },
  { label: "Editorial",        thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop" },
];

type EnkiFiltersProps = {
  active: string[];
  toggle: (tag: string) => void;
};

export default function EnkiFilters({ active, toggle }: EnkiFiltersProps) {
  const allActive = active.length === 0;

  return (
    <div className="enki-catbar">
      <button
        className={`enki-catbar-all${allActive ? " active" : ""}`}
        onClick={() => {
          // clear all active tags when "All" is clicked
          active.forEach((tag) => toggle(tag));
        }}
        type="button"
        aria-label="All categories"
      >
        <span className="enki-catbar-all-icon">
          <LayoutGrid size={16} />
        </span>
        All
      </button>

      <div className="enki-catbar-scroll">
        {CATEGORIES.slice(1).map((cat) => {
          const key = cat.label.toLowerCase();
          const isActive = active.includes(key);
          return (
            <button
              key={key}
              className={`enki-catbar-chip${isActive ? " active" : ""}`}
              onClick={() => toggle(key)}
              type="button"
            >
              {cat.thumb && (
                <img
                  src={cat.thumb}
                  alt={cat.label}
                  className="enki-catbar-thumb"
                  loading="lazy"
                />
              )}
              <span className="enki-catbar-chip-label">{cat.label}</span>
            </button>
          );
        })}
      </div>

      <button className="enki-catbar-more" type="button" aria-label="More categories">
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
}
