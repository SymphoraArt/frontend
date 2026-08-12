"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import dynamic from "next/dynamic";

const PromptGeneratorView = dynamic(() => import("./PromptGeneratorView"), { ssr: false });

interface PromptData {
  id: string;
  title: string;
  artist: string;
  artistHandle?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  showcaseImages?: any[];
  variables?: any[];
  price?: number;
  tags?: string[];
  createdAt?: string;
  uses?: number;
  isFree?: boolean;
}

interface PromptDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  prompt: PromptData | null;
}

export default function PromptDetailModal({ isOpen, onClose, prompt }: PromptDetailModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen || !prompt) return null;

  return (
    /* Same frame as EnkiDetailPanel, from one class now. This surface renders
       outside the shell, where --ek-sw is undefined and the fallback of 0
       keeps it full-width exactly as before. */
    <div className="pgv-detail-panel">
      <button onClick={onClose} aria-label="Close" className="pgv-detail-close">
        <X size={16} />
      </button>
      <PromptGeneratorView
        promptId={prompt.id}
        title={prompt.title}
        artistName={prompt.artist}
        imageUrl={prompt.imageUrl}
        showcaseImages={prompt.showcaseImages || []}
        isFreeShowcase={prompt.isFree}
      />
    </div>
  );
}
