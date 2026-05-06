"use client";

import { Heart } from "lucide-react";
import type { EnkiPrompt } from "@/lib/enkiPromptAdapter";
import "./enki.css";

type EnkiCardProps = {
  prompt: EnkiPrompt;
  onOpen?: (prompt: EnkiPrompt) => void;
  faved: boolean;
  toggleFav: (id: string) => void;
};

export default function EnkiCard({ prompt, onOpen, faved, toggleFav }: EnkiCardProps) {
  return (
    <article className="enki-card" onClick={() => onOpen?.(prompt)}>
      <div className="enki-card-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={prompt.art.url} alt={prompt.title} />
        <span className={`enki-card-badge${prompt.isVideo ? " video" : ""}`}>{prompt.isVideo ? "Video" : "Image"}</span>
        <button
          className={`enki-heart${faved ? " active" : ""}`}
          onClick={(event) => {
            event.stopPropagation();
            toggleFav(prompt.id);
          }}
          type="button"
          aria-label={faved ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={14} fill={faved ? "currentColor" : "none"} />
        </button>
        <div className="enki-card-overlay">
          <div className="enki-card-overlay-title serif">{prompt.title}</div>
          <div className="enki-card-overlay-artist mono">
            @{prompt.artist.handle} / ${prompt.price.toFixed(2)}
          </div>
        </div>
      </div>
      <div className="enki-card-mobile-meta">
        <div className="enki-card-mobile-title serif">{prompt.title}</div>
        <div className="enki-card-mobile-row">
          <span>@{prompt.artist.handle}</span>
          <span className="mono">${prompt.price.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
}
