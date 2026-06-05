"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { X, Sparkles, Loader2, Download, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addCreation, type StoredCreation } from "@/lib/creations";
import "./prompt-generator.css";

const ASPECTS = ["3:4", "4:5", "1:1", "2:3", "4:3", "16:9", "9:16"];
const MAX_REFERENCE_IMAGES = 10;

type Props = {
  open: boolean;
  /** The creation that was clicked open. */
  creation: StoredCreation | null;
  /** Full gallery list — rendered in the right "Your History" rail. */
  creations: StoredCreation[];
  onClose: () => void;
  /** Switch the active creation (clicking a history thumb). */
  onSelect: (c: StoredCreation) => void;
  /** Address used to charge the balance on regenerate. */
  payAddress: string | null;
  /** Turnkey email session token (server-side identity), if any. */
  sessionToken: string | null;
  /** localStorage user key the new creation is saved under. */
  userKey: string | null;
  /** Sends the user to billing when the balance is too low. */
  onTopUp: () => void;
};

/**
 * GalleryImageModal — opens a generated image in the same dark "free prompt"
 * generator layout as PromptGeneratorView (prompt-generator.css / pgv-* classes):
 * the entire prompt is shown and editable in the left sidebar with reference
 * images, the image fills the center, and the user's gallery is the right
 * "Your History" rail. Editing the prompt / refs and pressing Regenerate creates
 * a NEW image that is appended to the gallery (the original is untouched).
 */
export default function GalleryImageModal({
  open,
  creation,
  creations,
  onClose,
  onSelect,
  payAddress,
  sessionToken,
  userKey,
  onTopUp,
}: Props) {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [refs, setRefs] = useState<string[]>([]);
  const [aspect, setAspect] = useState("1:1");
  const [generating, setGenerating] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const [sessionImages, setSessionImages] = useState<string[]>([]);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Load the opened creation into the editable state.
  useEffect(() => {
    if (!creation) return;
    setPrompt(creation.prompt || "");
    setRefs(creation.referenceImages ? [...creation.referenceImages] : []);
    setAspect(creation.aspectRatio || "1:1");
    setActiveImage(creation.imageUrl || "");
    setSessionImages(creation.imageUrl ? [creation.imageUrl] : []);
  }, [creation]);

  // Lock page scroll while open (restored on close).
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const title = useMemo(() => {
    const t = (creation?.prompt || "").trim().split(/\s+/).slice(0, 6).join(" ");
    return t ? (t.length < (creation?.prompt || "").length ? `${t}…` : t) : "Your creation";
  }, [creation]);

  if (!open || !creation) return null;

  const onRefUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const remaining = MAX_REFERENCE_IMAGES - refs.length;
    Array.from(files).slice(0, remaining).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) =>
        setRefs((prev) =>
          prev.length >= MAX_REFERENCE_IMAGES ? prev : [...prev, ev.target?.result as string]
        );
      reader.readAsDataURL(file);
    });
    if (fileRef.current) fileRef.current.value = "";
  };

  const regenerate = async () => {
    if (generating) return;
    const finalPrompt = prompt.trim();
    if (!finalPrompt) {
      toast({ title: "Enter a prompt", description: "The prompt can't be empty.", variant: "destructive" });
      return;
    }
    if (!payAddress) {
      toast({ title: "Sign in to generate", description: "Log in with your email or wallet first." });
      return;
    }
    setGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(sessionToken ? { "X-Session-Token": sessionToken } : {}),
        },
        body: JSON.stringify({
          prompt: finalPrompt,
          aspectRatio: aspect,
          resolution: "2K",
          address: payAddress,
          referenceImages: refs,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        imageUrl?: string;
        error?: string;
        code?: string;
      };

      if (res.status === 402 || data.code === "INSUFFICIENT_BALANCE") {
        toast({ title: "Add funds to generate", description: "Your balance is too low. Top up to keep creating." });
        onTopUp();
        return;
      }
      if (!res.ok || !data.imageUrl) {
        throw new Error(data.error || "Generation failed");
      }

      const next: StoredCreation = {
        id: `gl-${Date.now()}`,
        imageUrl: data.imageUrl,
        prompt: finalPrompt,
        createdAt: new Date().toISOString(),
        referenceImages: refs.length ? refs : undefined,
        aspectRatio: aspect,
      };
      if (userKey) {
        addCreation(userKey, next);
        window.dispatchEvent(new Event("gallery-refresh"));
      }
      setActiveImage(data.imageUrl);
      setSessionImages((prev) => [data.imageUrl as string, ...prev]);
      toast({ title: "Generated & saved to gallery", description: "Your new image is ready." });
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      toast({ title: "Generation failed", description: msg, variant: "destructive" });
    } finally {
      setGenerating(false);
    }
  };

  const download = () => {
    if (!activeImage) return;
    const a = document.createElement("a");
    a.href = activeImage;
    a.download = `creation-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "#0F0E0D" }}>
      <button
        onClick={onClose}
        aria-label="Close"
        style={{
          position: "absolute",
          top: 12,
          right: 16,
          zIndex: 1001,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: "50%",
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#fff",
        }}
      >
        <X size={16} />
      </button>

      <div className="pgv-page">
        {/* ═══ LEFT SIDEBAR — editable prompt + references ═══ */}
        <aside className="pgv-sidebar">
          <div className="pgv-sidebar-scroll">
            <div className="pgv-sidebar-header">
              <h1>{title}</h1>
              <div className="pgv-meta-row">
                <span className="pgv-star-badge" style={{ color: "#888" }}>
                  {new Date(creation.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Full prompt — editable */}
            <div className="pgv-block">
              <span className="pgv-section-label">Prompt · Free</span>
              <textarea
                className="pgv-prompt-area"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={10}
                spellCheck={false}
                style={{ resize: "vertical", minHeight: 160 }}
              />
            </div>

            {/* Reference Images */}
            <div className="pgv-block">
              <div className="pgv-ref-header">
                <span className="pgv-section-label" style={{ marginBottom: 0 }}>Reference Images</span>
                <span className="pgv-ref-count">{refs.length}/{MAX_REFERENCE_IMAGES}</span>
              </div>
              {refs.length > 0 && (
                <div className="pgv-ref-grid">
                  {refs.map((img, idx) => (
                    <div key={idx} className="pgv-ref-slot filled">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt={`ref ${idx + 1}`} />
                      <button
                        className="pgv-ref-remove"
                        onClick={() => setRefs((prev) => prev.filter((_, i) => i !== idx))}
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {refs.length < MAX_REFERENCE_IMAGES && (
                <button className="pgv-ref-add-btn" onClick={() => fileRef.current?.click()}>
                  <span className="pgv-ref-add-icon">+</span>
                  Add Reference Images
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={onRefUpload}
              />
            </div>

            {/* Image Settings */}
            <div className="pgv-block">
              <span className="pgv-section-label">Image Settings</span>
              <div className="pgv-img-settings">
                <div>
                  <label>Aspect Ratio</label>
                  <select value={aspect} onChange={(e) => setAspect(e.target.value)}>
                    {ASPECTS.map((a) => (
                      <option key={a}>{a}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky footer: Regenerate */}
          <div className="pgv-sidebar-footer">
            <button className="pgv-generate-btn" onClick={regenerate} disabled={generating}>
              {generating ? <Loader2 size={16} className="pgv-spinner" /> : <Sparkles size={15} />}
              Regenerate
            </button>
          </div>
        </aside>

        {/* ═══ CENTER — main image + session thumbnails ═══ */}
        <main className="pgv-center">
          <div className="pgv-main-image">
            {generating && (
              <div className="pgv-overlay-generating">
                <Loader2 size={36} className="pgv-spinner" />
                <span>Generating…</span>
              </div>
            )}
            {activeImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={activeImage}
                alt={title}
                onClick={() => setLightbox(activeImage)}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <ImageIcon size={56} color="#333" />
            )}
            {activeImage && !generating && (
              <div className="pgv-image-actions">
                <button className="pgv-img-action-btn" onClick={download}>
                  <Download size={13} /> Download
                </button>
              </div>
            )}
          </div>

          {sessionImages.length > 1 && (
            <div className="pgv-thumb-row">
              <div className="pgv-thumb-strip">
                {sessionImages.map((url, idx) => (
                  <div
                    key={idx}
                    className={`pgv-thumb-item ${activeImage === url ? "active" : ""}`}
                    onClick={() => setActiveImage(url)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* ═══ RIGHT — Your History (the gallery) ═══ */}
        <aside className="pgv-history">
          <div className="pgv-history-header">
            <span>Your History</span>
          </div>
          <div className="pgv-history-list">
            {creations.length === 0 && (
              <div className="pgv-history-empty">
                Generate an image<br />to see it here
              </div>
            )}
            {creations.map((c) => (
              <div
                key={c.id}
                className="pgv-history-item"
                style={c.id === creation.id ? { borderColor: "var(--pgv-accent)" } : undefined}
                onClick={() => onSelect(c)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.imageUrl} alt="" />
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="pgv-lightbox" onClick={() => setLightbox(null)} style={{ zIndex: 1100 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="Expanded" />
          <button className="pgv-lightbox-close" onClick={() => setLightbox(null)}>
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
