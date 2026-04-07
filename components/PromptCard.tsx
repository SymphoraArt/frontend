"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Sparkles } from "lucide-react";
import { useState } from "react";
import { formatPricePerGeneration } from "@/lib/utils";

interface PromptCardProps {
  id: string;
  title: string;
  artist: string;
  price?: number; // whole USDC
  priceUsdCents?: number; // cents
  isFree?: boolean;
  isListed?: boolean;
  licenseType?: string;
  totalSales?: number;
  rating: number;
  downloads: number;
  thumbnail: string;
  category?: string;
  onClick?: () => void;
}

export default function PromptCard({
  id,
  title,
  artist,
  price,
  priceUsdCents,
  isFree,
  rating,
  downloads,
  thumbnail,
  category,
  onClick,
}: PromptCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const resolvedPrice = priceUsdCents !== undefined ? priceUsdCents / 100 : (price ?? 0);
  const resolvedIsFree = isFree !== undefined ? isFree : resolvedPrice === 0;

  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 hover:scale-[1.01] border-[0.5px] min-w-0 p-0"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-prompt-${id}`}
    >
      <div className="relative bg-muted overflow-hidden">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-auto block align-top"
            onError={(e) => {
              e.currentTarget.style.opacity = "0";
              e.currentTarget.style.pointerEvents = "none";
              e.currentTarget.nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : (
          <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
            <Sparkles className="h-12 w-12 text-primary/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center hidden">
          <Sparkles className="h-12 w-12 text-primary/30" />
        </div>
        {/* Price overlay: on image, top-left corner, fully inside image bounds */}
        <span
          className="absolute top-1.5 left-1.5 z-20 rounded-full px-2 py-0.5 text-xs font-medium bg-amber-50/95 text-gray-800 border border-amber-200/90 shadow-sm pointer-events-none dark:bg-amber-950/90 dark:text-amber-100 dark:border-amber-700/80"
          data-testid={`badge-price-${id}`}
        >
          {resolvedIsFree ? "FREE" : formatPricePerGeneration(Number(resolvedPrice) || 0)}
        </span>

        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent flex flex-col items-center justify-end p-3 gap-2">
            <div className="w-full space-y-1">
              <h3
                className="font-semibold text-sm truncate text-center"
                data-testid={`text-title-${id}`}
              >
                {title}
              </h3>
              <p className="text-xs text-muted-foreground truncate text-center">
                by {artist}
              </p>
              <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span>{rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
            <Button
              size="sm"
              className="w-full"
              data-testid={`button-use-${id}`}
            >
              Use Prompt
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
