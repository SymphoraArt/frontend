"use client";

import { Heart, Play, Image as ImageIcon, Film, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { preloadImageUI } from "@/components/enki/EnkiDetailPanel";
import type { EnkiPrompt } from "@/lib/enkiPromptAdapter";
import "./enki.css";

type EnkiCardProps = {
  prompt: EnkiPrompt;
  onOpen?: (prompt: EnkiPrompt) => void;
  faved: boolean;
  toggleFav: (id: string) => void;
  onEdit?: (prompt: EnkiPrompt) => void;
};

export default function EnkiCard({ prompt, onOpen, faved, toggleFav, onEdit }: EnkiCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  /* Warm what the click is about to need, while the pointer is still on its
     way: the image view's chunk, which next/dynamic otherwise fetches only on
     first render, and the two requests that view makes before it can paint.
     All three are idempotent, so hovering ten cards costs one chunk fetch and
     one models request. Failures are swallowed on purpose — this is an
     optimisation, and a broken one must never interfere with the click. */
  const warm = () => {
    preloadImageUI();
    queryClient.prefetchQuery({ queryKey: [`/api/prompts/${prompt.id}`] }).catch(() => {});
    queryClient.prefetchQuery({ queryKey: ["/api/models"] }).catch(() => {});
  };

  return (
    <article
      className="enki-card"
      onClick={() => onOpen?.(prompt)}
      onMouseEnter={warm}
      onFocus={warm}
    >
      <div className="enki-card-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={prompt.art.url} alt={prompt.title} />
        <span className={`enki-card-badge${prompt.isVideo ? " video" : " image"}`}>
          {prompt.isVideo ? <Film size={12} style={{ color: "var(--enki-ember)" }} /> : <ImageIcon size={12} style={{ color: "var(--enki-ink-3)" }} />}
          {prompt.isVideo ? "Video" : "Image"}
        </span>
        <div className="enki-card-tl-hover">
          <span className="enki-card-stat mono">
            <Heart size={10} fill="currentColor" />
            {prompt.downloads.toLocaleString()}
          </span>
          <span className="enki-card-stat mono enki-card-stat-price">${prompt.price.toFixed(2)}</span>
        </div>
        <button
          className={`enki-heart${faved ? " active" : ""}`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            toggleFav(prompt.id);
          }}
          type="button"
          aria-label={faved ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={14} fill={faved ? "currentColor" : "none"} />
        </button>
        {onEdit && (
          <button
            className="enki-edit"
            onClick={(event) => { event.preventDefault(); event.stopPropagation(); onEdit(prompt); }}
            type="button"
            aria-label="Edit this prompt in the node editor"
            title="Edit in Create Prompt 2"
          >
            <PencilLine size={14} />
          </button>
        )}
        {prompt.isVideo && (
          <div className="enki-video-icon" aria-hidden="true">
            <Play size={14} fill="currentColor" />
          </div>
        )}
        <div className="enki-card-overlay">
          <div className="enki-card-overlay-bottom">
            <div className="enki-card-overlay-title serif">{prompt.title}</div>
            <div
              className="enki-card-overlay-artist mono"
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (prompt.artist.id) {
                  router.push(`/creators/${prompt.artist.handle}`);
                }
              }}
            >
              {prompt.artist.name}
            </div>
          </div>
        </div>
      </div>
      <div className="enki-card-mobile-meta">
        <div className="enki-card-mobile-title serif">{prompt.title}</div>
        <div className="enki-card-mobile-row">
          <span
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (prompt.artist.id) {
                router.push(`/creators/${prompt.artist.handle}`);
              }
            }}
          >
            {prompt.artist.name}
          </span>
          <span className="mono">${prompt.price.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
}
