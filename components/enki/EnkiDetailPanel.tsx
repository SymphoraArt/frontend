"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import dynamic from "next/dynamic";
import type { EnkiPrompt } from "@/lib/enkiPromptAdapter";

const PromptGeneratorView = dynamic(() => import("@/components/PromptGeneratorView"), { ssr: false });

type EnkiDetailPanelProps = {
  prompt: EnkiPrompt;
  onClose: () => void;
  faved: boolean;
  toggleFav: (id: string) => void;
};

export default function EnkiDetailPanel({ prompt, onClose }: EnkiDetailPanelProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

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
