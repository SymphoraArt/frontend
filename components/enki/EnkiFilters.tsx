"use client";

import { useEffect, useRef, useState } from "react";
import { LayoutGrid, MoreHorizontal } from "lucide-react";

const CATEGORIES = [
  { label: "Portrait" },
  { label: "Character" },
  { label: "Cinematic" },
  { label: "Architecture" },
  { label: "Abstract" },
  { label: "Product" },
  { label: "Minimal" },
  { label: "Editorial" },
];

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
          if (currentY < 80) {
            // Always show near top
            setVisible(true);
          } else if (currentY < lastScrollY.current - 4) {
            // Scrolling up
            setVisible(true);
          } else if (currentY > lastScrollY.current + 4) {
            // Scrolling down
            setVisible(false);
          }
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

      {/* Category chips */}
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

      <div className="enki-catbar-divider" />

      <button className="enki-catbar-more" type="button" aria-label="More">
        <MoreHorizontal size={15} />
      </button>
    </div>
  );
}
