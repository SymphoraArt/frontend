"use client";

const QUICK_TAGS = ["portrait", "cinematic", "infographic", "architecture", "editorial", "abstract", "product", "minimal"];

type EnkiFiltersProps = {
  active: string[];
  toggle: (tag: string) => void;
};

export default function EnkiFilters({ active, toggle }: EnkiFiltersProps) {
  return (
    <div className="enki-filters">
      <span className="enki-filter-label">Tags</span>
      {QUICK_TAGS.map((tag) => (
        <button
          key={tag}
          className={`enki-filter-chip${active.includes(tag) ? " active" : ""}`}
          onClick={() => toggle(tag)}
          type="button"
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
