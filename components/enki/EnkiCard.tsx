"use client";

import { Heart } from "lucide-react";
import type { EnkiPromptCard } from "@/lib/enki-redesign";

export default function EnkiCard({
  prompt,
  faved,
  onOpen,
  onFavorite,
}: {
  prompt: EnkiPromptCard;
  faved: boolean;
  onOpen: (prompt: EnkiPromptCard) => void;
  onFavorite: (id: string) => void;
}) {
  return (
    <article className="enki-card" onClick={() => onOpen(prompt)}>
      <div className="enki-card-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={prompt.art.url} alt={prompt.title} />
        <span className={`enki-card-badge${prompt.isVideo ? " video" : ""}`}>{prompt.isVideo ? "Video" : "Image"}</span>
        <div className="enki-card-tl-hover">
          <span className="enki-card-stat">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>
            {(prompt.downloads || 0).toLocaleString()}
          </span>
          <span className="enki-card-stat enki-card-stat-price">${(prompt.price || 0).toFixed(2)}</span>
        </div>
        <button
          className={`enki-heart${faved ? " active" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            onFavorite(prompt.id);
          }}
          aria-label={faved ? "Remove favorite" : "Save favorite"}
          type="button"
        >
          <Heart size={14} fill={faved ? "currentColor" : "none"} />
        </button>
        <div className="enki-card-overlay">
          <div>
            <div className="enki-card-overlay-title serif">{prompt.title}</div>
            <div className="enki-card-overlay-artist mono">{prompt.artist.name}</div>
          </div>
        </div>
      </div>
      <div className="enki-card-mobile-meta">
        <div className="enki-card-mobile-title serif">{prompt.title}</div>
        <div className="enki-card-mobile-row">
          <span>{prompt.artist.name}</span>
          <span className="mono">${prompt.price.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
}
