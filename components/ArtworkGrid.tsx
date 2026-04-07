"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Download, Sparkles, Heart, Eye } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPricePerGeneration } from "@/lib/utils";

export interface ArtworkItem {
  id: string;
  title: string;
  artistId?: string;
  artistName: string;
  price?: number;
  isFree?: boolean;
  rating?: number;
  downloads?: number;
  likes?: number;
  views?: number;
  thumbnail?: string;
  imageUrl?: string;
  category?: string;
  tags?: string[];
  isFreeShowcase?: boolean;
  publicPromptText?: string;
}

interface ArtworkCardProps {
  item: ArtworkItem;
  showArtist?: boolean;
  onArtistClick?: (artistId: string) => void;
  onCardClick?: (id: string) => void;
  variant?: "prompt" | "artwork";
}

function ArtworkCard({
  item,
  showArtist = true,
  onArtistClick,
  onCardClick,
  variant = "prompt",
}: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imageUrl = item.imageUrl || item.thumbnail || "";

  const handleArtistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.artistId && onArtistClick) {
      onArtistClick(item.artistId);
    }
  };

  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] border-0 rounded-none min-w-0 p-0 select-none caret-transparent"
      onClick={() => onCardClick?.(item.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-artwork-${item.id}`}
    >
      <div className="relative bg-muted overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.title}
            className="w-full h-auto block align-top"
            data-testid={`image-artwork-${item.id}`}
          />
        ) : (
          <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
            <Sparkles className="h-12 w-12 text-primary/30" />
          </div>
        )}
        {/* Price overlay: on image, top-left corner, fully inside image bounds */}
        {variant === "prompt" && (
          <span
            className="absolute top-1.5 left-1.5 z-20 rounded-full px-2 py-0.5 text-xs font-medium bg-amber-50/95 text-gray-800 border border-amber-200/90 shadow-sm pointer-events-none dark:bg-amber-950/90 dark:text-amber-100 dark:border-amber-700/80"
            data-testid={`badge-price-${item.id}`}
          >
            {item.isFree || item.isFreeShowcase
              ? "FREE"
              : formatPricePerGeneration(Number(item.price) || 0)}
          </span>
        )}

        <div
          className={`absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 pt-8 transition-opacity duration-200 text-white ${isHovered ? "opacity-100" : "opacity-0"}`}
          aria-hidden
        >
          <h3
            className="font-bold text-base !text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            data-testid={`text-title-${item.id}`}
          >
            {item.title}
          </h3>

          {showArtist && (
            <p
              className={`text-sm !text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${item.artistId && onArtistClick ? "hover:!text-white hover:underline cursor-pointer" : ""}`}
              onClick={
                item.artistId && onArtistClick ? handleArtistClick : undefined
              }
              data-testid={`text-artist-${item.id}`}
            >
              by {item.artistName}
            </p>
          )}

          <div className="flex items-center gap-3 text-xs !text-white/70 mt-1">
            {variant === "prompt" && item.rating !== undefined && (
              <>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-white text-white" />
                  <span>{item.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  <span>{item.downloads}</span>
                </div>
              </>
            )}
            {variant === "artwork" && (
              <>
                {item.likes !== undefined && (
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-white" />
                    <span>{item.likes}</span>
                  </div>
                )}
                {item.views !== undefined && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3 text-white" />
                    <span>{item.views}</span>
                  </div>
                )}
              </>
            )}
          </div>

          {variant === "prompt" && (
            <Button
              size="sm"
              className="w-full mt-2"
              data-testid={`button-use-${item.id}`}
            >
              Use Prompt
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

interface ArtworkGridProps {
  items: ArtworkItem[];
  variant?: "prompt" | "artwork";
  showArtist?: boolean;
  onCardClick?: (id: string) => void;
  onArtistClick?: (artistId: string) => void;
}

export default function ArtworkGrid({
  items,
  variant = "prompt",
  showArtist = true,
  onCardClick,
  onArtistClick,
}: ArtworkGridProps) {
  const router = useRouter();

  const handleArtistClick = (artistId: string) => {
    if (onArtistClick) {
      onArtistClick(artistId);
    } else {
      router.push(`/artist/${artistId}`);
    }
  };

  const handleCardClick = (id: string) => {
    if (onCardClick) {
      onCardClick(id);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-[3px]">
      {items.map((item) => (
        <div key={item.id} className="min-w-0">
          <ArtworkCard
            item={item}
            variant={variant}
            showArtist={showArtist}
            onCardClick={handleCardClick}
            onArtistClick={handleArtistClick}
          />
        </div>
      ))}
    </div>
  );
}

export { ArtworkCard };
