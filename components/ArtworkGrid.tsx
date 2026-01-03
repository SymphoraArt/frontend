"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Download, Sparkles, Heart, Eye } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] h-full border-0 rounded-none"
      onClick={() => onCardClick?.(item.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-artwork-${item.id}`}
    >
      <div className="relative h-full bg-muted overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
            data-testid={`image-artwork-${item.id}`}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
            <Sparkles className="h-12 w-12 text-primary/30" />
          </div>
        )}

        {variant === "prompt" && (
          <Badge
            variant={
              item.isFree || item.isFreeShowcase ? "secondary" : "default"
            }
            className="absolute top-2 left-2 backdrop-blur-sm text-xs z-10"
            data-testid={`badge-price-${item.id}`}
          >
            {item.isFree || item.isFreeShowcase ? "FREE" : `${item.price}cr`}
          </Badge>
        )}

        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 pt-8 transition-opacity duration-200 ${isHovered ? "opacity-100" : "opacity-0"}`}
        >
          <h3
            className="font-bold text-base text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            data-testid={`text-title-${item.id}`}
          >
            {item.title}
          </h3>

          {showArtist && (
            <p
              className={`text-sm text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${item.artistId && onArtistClick ? "hover:text-primary cursor-pointer hover:underline" : ""}`}
              onClick={
                item.artistId && onArtistClick ? handleArtistClick : undefined
              }
              data-testid={`text-artist-${item.id}`}
            >
              by {item.artistName}
            </p>
          )}

          <div className="flex items-center gap-3 text-xs text-white/70 mt-1">
            {variant === "prompt" && item.rating !== undefined && (
              <>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
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
                    <Heart className="h-3 w-3" />
                    <span>{item.likes}</span>
                  </div>
                )}
                {item.views !== undefined && (
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
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
  useMasonryLayout?: boolean;
  onCardClick?: (id: string) => void;
  onArtistClick?: (artistId: string) => void;
}

export default function ArtworkGrid({
  items,
  variant = "prompt",
  showArtist = true,
  useMasonryLayout = true,
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

  if (useMasonryLayout) {
    const repeatedItems = [...items, ...items, ...items, ...items];

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-0 auto-rows-[200px]">
        {repeatedItems.map((item, idx) => {
          const spans =
            idx % 7 === 0
              ? "row-span-2 col-span-2"
              : idx % 5 === 0
                ? "row-span-2"
                : "";
          return (
            <div key={`${item.id}-${idx}`} className={spans}>
              <ArtworkCard
                item={item}
                variant={variant}
                showArtist={showArtist}
                onCardClick={handleCardClick}
                onArtistClick={handleArtistClick}
              />
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <ArtworkCard
          key={item.id}
          item={item}
          variant={variant}
          showArtist={showArtist}
          onCardClick={handleCardClick}
          onArtistClick={handleArtistClick}
        />
      ))}
    </div>
  );
}

export { ArtworkCard };
