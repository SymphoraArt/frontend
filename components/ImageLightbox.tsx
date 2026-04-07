"use client"


import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { useState, useEffect } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  /** Shown in footer; clicking footer calls onGoToSingleImage */
  title?: string;
  /** e.g. "12 likes · 4.5 rating · 8 generations" */
  footerSubtitle?: string;
  /** When set, footer is shown and clickable to go to single image view */
  onGoToSingleImage?: () => void;
}

export default function ImageLightbox({ isOpen, onClose, imageUrl, title, footerSubtitle, onGoToSingleImage }: ImageLightboxProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setScale(1);
      setRotation(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === '+' || e.key === '=') setScale(s => Math.min(s + 0.25, 3));
      if (e.key === '-') setScale(s => Math.max(s - 0.25, 0.5));
      if (e.key === 'r') setRotation(r => r + 90);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleZoomIn = () => setScale(s => Math.min(s + 0.25, 3));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.25, 0.5));
  const handleRotate = () => setRotation(r => r + 90);
  /** Click on image: toggle between fullscreen (1) and zoomed in (2) */
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScale(s => (s === 1 ? 2 : 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="!fixed !inset-0 !left-0 !top-0 !right-0 !bottom-0 w-screen h-screen max-w-none max-h-none !translate-x-0 !translate-y-0 p-0 bg-black/95 border-none overflow-hidden rounded-none [&>button]:hidden"
        aria-describedby={undefined}
        data-testid="lightbox-container"
      >
        <VisuallyHidden>
          <DialogTitle>Image viewer</DialogTitle>
        </VisuallyHidden>
        <div className="absolute top-3 right-3 z-50 flex items-center gap-1 bg-black/50 rounded-lg p-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={handleZoomOut}
            className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20"
            data-testid="button-zoom-out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-white/80 text-xs min-w-[3rem] text-center font-mono">
            {Math.round(scale * 100)}%
          </span>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleZoomIn}
            className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20"
            data-testid="button-zoom-in"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleRotate}
            className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20"
            data-testid="button-rotate"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <div className="w-px h-5 bg-white/20 mx-1" />
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            className="h-8 w-8 text-white/80 hover:text-white hover:bg-white/20"
            data-testid="button-close-lightbox"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div
          className="absolute inset-0 flex items-center justify-center cursor-zoom-out"
          style={{ paddingBottom: onGoToSingleImage ? "80px" : 0 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Fullscreen view"
              className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-200 select-none cursor-zoom-in"
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                maxHeight: onGoToSingleImage ? "calc(100vh - 80px)" : "100vh",
                maxWidth: "100vw",
              }}
              draggable={false}
              onClick={handleImageClick}
              data-testid="lightbox-image"
            />
          )}
        </div>

        {onGoToSingleImage && (title || footerSubtitle) && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => {
              onClose();
              onGoToSingleImage();
            }}
            onKeyDown={(e) => e.key === "Enter" && (onClose(), onGoToSingleImage())}
            className="absolute bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur px-4 py-3 cursor-pointer hover:bg-black/90 transition-colors border-t border-white/10"
            data-testid="lightbox-footer"
          >
            {title && <p className="font-semibold text-white truncate">{title}</p>}
            {footerSubtitle && (
              <p className="text-sm text-white/80 mt-0.5">{footerSubtitle}</p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
