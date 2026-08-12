"use client";

import { useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import type { EnkiPrompt } from "@/lib/enkiPromptAdapter";

/* The spinner is centred in the FRAME, not the viewport.
   The frame starts at the shell's menu edge and below the recovery banner, so
   a viewport-centred spinner sits visibly off to one side inside it — which
   reads as a misplaced element rather than as "loading". Until this existed
   the panel simply opened empty while the chunk and its queries landed, which
   is the "should be in the middle" Kev asked for: there was nothing there at
   all. */
const PromptGeneratorView = dynamic(() => import("@/components/PromptGeneratorView"), {
  ssr: false,
  loading: () => (
    <div className="pgv-detail-loading" role="status" aria-label="Loading">
      <Loader2 className="pgv-detail-spinner" size={26} aria-hidden />
    </div>
  ),
});

/* Warm the chunk without opening anything. next/dynamic only fetches on first
   render, so the very first image a visitor clicks pays for the download; every
   later one is instant. Calling the loader on hover moves that cost into the
   moment the pointer is still travelling. Idempotent — the module registry
   dedupes, so hovering ten cards fetches once. */
export const preloadImageUI = () => { void import("@/components/PromptGeneratorView"); };

type EnkiDetailPanelProps = {
  prompt: EnkiPrompt;
  onClose: () => void;
  faved: boolean;
  toggleFav: (id: string) => void;
};

export default function EnkiDetailPanel({ prompt, onClose }: EnkiDetailPanelProps) {
  /* Locking the body would otherwise cost the reader their place: a body at
     overflow:hidden collapses to scrollTop 0, so closing the panel drops them
     back at the top of a feed they had scrolled far into. The offset is
     captured on open and put back on close, which is what "zurück wo ich war"
     means for an overlay. */
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollY, behavior: "auto" });
    };
  }, []);

  /* Two more ways out, both landing on the same close.
     ESC, because a full-screen overlay that traps you until you find its X is
     the thing every dialog convention exists to prevent. And the shell's Home
     item, which cannot reach this component's state and asks by event — the
     same shape the search chip uses. Kev, 2026-08-13: "clicking on home when
     in image ui muss mich wieder zurück befördern wo ich war, das sollte auch
     mitm ESC gehen". */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("enki:close-detail", onClose);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("enki:close-detail", onClose);
    };
  }, [onClose]);

  return (
    /* Frame and close button come from .pgv-detail-panel / .pgv-detail-close
       in prompt-generator.css, which PromptGeneratorView imports itself. They
       were inline here and identically inline in PromptDetailModal — two
       copies of a frame that started at x=0 and so ran under the shell's icon
       rail, and of a palette that ignored the theme. */
    <div className="pgv-detail-panel">
      <button onClick={onClose} aria-label="Close" className="pgv-detail-close">
        <X size={16} />
      </button>
      <PromptGeneratorView
        promptId={prompt.id}
        title={prompt.title}
        artistName={prompt.artist?.name}
        imageUrl={prompt.art.url}
        showcaseImages={[prompt.art, ...(prompt.versions || [])].map(v => ({ url: v.url }))}
        isFreeShowcase={prompt.visibility === "full"}
      />
    </div>
  );
}
