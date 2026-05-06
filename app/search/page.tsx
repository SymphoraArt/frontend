"use client";

import { useSearchParams } from "next/navigation";
import EnkiFeed from "@/components/enki/EnkiFeed";

export default function SearchPage() {
  const params = useSearchParams();
  const query = params.get("q") ?? "";
  return (
    <div className="enki-search-layout">
      <aside className="enki-filter-sidebar">
        <div style={{ marginBottom: 32 }}>
          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6 }}>Searching for</div>
          <div className="serif" style={{ fontSize: 24, fontStyle: 'italic', lineHeight: 1.1 }}>&quot;{query}&quot;</div>
        </div>
        
        <div className="enki-filter-group">
          <div className="enki-filter-group-title">Type</div>
          <div className="enki-filter-row"><span><input type="checkbox" defaultChecked />Images</span><span className="enki-filter-count">...</span></div>
          <div className="enki-filter-row"><span><input type="checkbox" />Videos</span><span className="enki-filter-count">...</span></div>
        </div>

        <div className="enki-filter-group">
          <div className="enki-filter-group-title">Tags</div>
          {['infographic', 'editorial', 'minimal', 'portrait', 'cinematic'].map((t) => (
            <div key={t} className="enki-filter-row">
              <span><input type="checkbox" />{t}</span>
              <span className="enki-filter-count">...</span>
            </div>
          ))}
        </div>
      </aside>

      <div style={{ minWidth: 0 }}>
        <div className="enki-search-results-head">
          <div>
            <div className="enki-page-eyebrow">Results · search</div>
            <h2 className="serif" style={{ fontSize: 36, fontStyle: 'italic', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1 }}>Filtered archive.</h2>
          </div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            {query && <span className="enki-chip active">{query} <span className="enki-chip-x">×</span></span>}
            <span className="enki-chip" style={{ background: 'transparent', border: '1px dashed var(--rule)', color: 'var(--ink-3)' }}>Clear all</span>
          </div>
        </div>
        
        <EnkiFeed
          mode="search"
          query={query}
          hideHeader
        />
      </div>
    </div>
  );
}
