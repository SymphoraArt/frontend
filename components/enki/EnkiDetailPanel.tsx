"use client";

import { useState } from "react";
import { MessageSquare, Star, X } from "lucide-react";
import type { EnkiPrompt } from "@/lib/enkiPromptAdapter";

type EnkiDetailPanelProps = {
  prompt: EnkiPrompt;
  onClose: () => void;
  faved: boolean;
  toggleFav: (id: string) => void;
};

export default function EnkiDetailPanel({ prompt, onClose }: EnkiDetailPanelProps) {
  // We'll use prompt.versions if available, otherwise just duplicate the main art to simulate multiple images for the demo
  const images = prompt.versions?.length
    ? prompt.versions.map((v) => v.url)
    : [prompt.art.url, prompt.art.url, prompt.art.url, prompt.art.url];

  const v2Covers = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=400&auto=format&fit=crop"
  ];

  const [activeImage, setActiveImage] = useState(images[0]);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState(false);

  return (
    <>
      <div className="enki-detail-modal" onClick={onClose}>
        <div className="enki-detail-card" onClick={(e) => e.stopPropagation()}>
          <button className="enki-detail-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>

          <div className="enki-detail-body">
            {/* CENTER SECTION */}
            <div className="enki-detail-center hide-scrollbar">
              {/* 4 Images Side-by-Side */}
              <div className="enki-detail-img-grid">
                {images.slice(0, 4).map((img, i) => (
                  <div key={i} className="enki-detail-img-wrapper" onClick={() => setLightboxImage(img)}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img} alt={`Image ${i + 1}`} />
                  </div>
                ))}
              </div>

              {/* Version 2 Covers */}
              <div className="enki-detail-v2-section">
                <div className="enki-detail-v2-title">Version 2</div>
                <div className="enki-detail-v2-grid hide-scrollbar">
                  {v2Covers.map((cover, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={cover} alt={`V2 Cover ${i + 1}`} className="enki-detail-v2-cover" />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SECTION: Thumbnails */}
            <div className="enki-detail-right hide-scrollbar">
              <div className="enki-detail-thumb-strip">
                {images.map((img, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    className={`enki-detail-thumb ${activeImage === img ? "active" : ""}`}
                    onClick={() => setActiveImage(img)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* BOTTOM SECTION */}
          <div className="enki-detail-bottom">
            <div className="enki-detail-bottom-left">
              <span style={{ fontSize: 14, fontWeight: 500 }}>Make Public</span>
              <input
                type="checkbox"
                className="enki-toggle-switch"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
            </div>
            <div className="enki-detail-bottom-right">
              <button className="enki-detail-tab-btn" type="button">
                <MessageSquare size={16} /> Comments
                <span style={{ opacity: 0.6, fontSize: 12, marginLeft: 4 }}>(Image)</span>
              </button>
              <button className="enki-detail-tab-btn" type="button">
                <Star size={16} /> Reviews
                <span style={{ opacity: 0.6, fontSize: 12, marginLeft: 4 }}>(Prompt)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="enki-lightbox" onClick={() => setLightboxImage(null)}>
          <button className="enki-lightbox-close" onClick={() => setLightboxImage(null)}>
            <X size={24} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightboxImage} alt="Fullscreen" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
