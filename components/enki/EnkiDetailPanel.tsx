"use client";

import { useState } from "react";
import { MessageSquare, Star, X, Bookmark, Copy, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import type { EnkiPrompt } from "@/lib/enkiPromptAdapter";

type EnkiDetailPanelProps = {
  prompt: EnkiPrompt;
  onClose: () => void;
  faved: boolean;
  toggleFav: (id: string) => void;
};

export default function EnkiDetailPanel({ prompt, onClose, faved, toggleFav }: EnkiDetailPanelProps) {
  const router = useRouter();
  
  // Use versions for history or duplicate art if empty
  const historyImages = prompt.versions?.length
    ? prompt.versions.map((v) => v.url)
    : [prompt.art.url, prompt.art.url, prompt.art.url, prompt.art.url];

  const publicGallery = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=400&auto=format&fit=crop",
  ];

  const [displayImages, setDisplayImages] = useState(historyImages);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Dynamic grid calculation
  const gridCols = Math.ceil(Math.sqrt(displayImages.length));
  const gridStyle = {
    gridTemplateColumns: `repeat(${gridCols}, 1fr)`,
    gridTemplateRows: `repeat(${Math.ceil(displayImages.length / gridCols)}, 1fr)`,
  };

  return (
    <>
      <div className="enki-detail-modal" onClick={onClose}>
        <div className="enki-detail-card" onClick={(e) => e.stopPropagation()}>
          <button className="enki-detail-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>

          <div className="enki-detail-body">
            {/* LEFT SECTION (Settings & Actions) */}
            <div className="enki-detail-left hide-scrollbar">
              <h2>
                {prompt.title}
              </h2>

              <div className="enki-detail-setting-group">
                <div className="enki-detail-setting-label">Aspect Ratio</div>
                <div className="enki-detail-setting-value mono">4:5</div>
              </div>

              <div className="enki-detail-setting-group">
                <div className="enki-detail-setting-label">Resolution</div>
                <div className="enki-detail-setting-value mono">2K</div>
              </div>

              <div className="enki-detail-setting-group">
                <div className="enki-detail-setting-label">Variables Used</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                  {prompt.variables.map((v) => (
                    <span key={v.name} className="enki-tag-pill mono">[{v.name}]</span>
                  ))}
                </div>
              </div>

              <div className="enki-rule" style={{ borderColor: "rgba(255,255,255,0.1)", margin: "32px 0" }} />

              <button className="enki-detail-btn" style={{ background: "var(--enki-ember)", borderColor: "var(--enki-ember)" }} onClick={() => router.push(`/generator/${prompt.id}`)}>
                <Zap size={14} /> Generate / ${prompt.price.toFixed(2)}
              </button>
              <button className="enki-detail-btn" onClick={() => toggleFav(prompt.id)}>
                <Bookmark size={14} fill={faved ? "currentColor" : "none"} /> {faved ? "Saved" : "Save to Favorites"}
              </button>
              <button className="enki-detail-btn">
                <Copy size={14} /> Copy Prompt
              </button>
            </div>

            {/* CENTER SECTION (Dynamic Grid + Public Gallery) */}
            <div className="enki-detail-center hide-scrollbar">
              <div className="enki-detail-grid-container">
                <div className="enki-detail-dynamic-grid" style={gridStyle}>
                  {displayImages.map((img, i) => (
                    <div key={i} className="enki-detail-grid-item" onClick={() => setLightboxImage(img)}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`Generated ${i + 1}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Public Gallery & Comments (Below Grid) */}
              <div className="enki-detail-public-section">
                <div className="enki-detail-public-title">Other public images created with this prompt</div>
                <div className="enki-detail-public-gallery hide-scrollbar">
                  {publicGallery.map((img, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={`pub-${i}`}
                      src={img}
                      alt={`Public ${i + 1}`}
                      className={`enki-detail-public-img ${displayImages.includes(img) && displayImages.length === 1 ? "active" : ""}`}
                      onClick={() => setDisplayImages([img])}
                    />
                  ))}
                </div>

                <div className="enki-detail-bottom-actions">
                  <div style={{ display: "flex", gap: 12 }}>
                    <button className="enki-detail-tab-btn" type="button" style={{ background: "rgba(255,255,255,0.2)" }}>
                      <MessageSquare size={16} /> Comments
                      <span style={{ opacity: 0.6, fontSize: 12, marginLeft: 4 }}>(Image)</span>
                    </button>
                    <button className="enki-detail-tab-btn" type="button">
                      <Star size={16} /> Reviews
                      <span style={{ opacity: 0.6, fontSize: 12, marginLeft: 4 }}>(Requires Purchase)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SECTION (History) */}
            <div className="enki-detail-right hide-scrollbar">
              <div className="enki-detail-right-title">Your History</div>
              <div className="enki-detail-thumb-strip">
                {historyImages.map((img, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={`hist-${i}`}
                    src={img}
                    alt={`History ${i + 1}`}
                    className={`enki-detail-thumb ${displayImages.includes(img) && displayImages.length > 1 ? "active" : ""}`}
                    onClick={() => setDisplayImages(historyImages)}
                  />
                ))}
              </div>
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
