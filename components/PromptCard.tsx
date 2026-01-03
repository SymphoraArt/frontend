"use client"


import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Download, Sparkles } from "lucide-react";
import { useState } from "react";

interface PromptCardProps {
  id: string;
  title: string;
  artist: string;
  price: number;
  isFree: boolean;
  rating: number;
  downloads: number;
  thumbnail: string;
  category: string;
  onClick?: () => void;
}

export default function PromptCard({
  id,
  title,
  artist,
  price,
  isFree,
  rating,
  downloads,
  thumbnail,
  category,
  onClick
}: PromptCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 hover:scale-[1.01] h-full border-[0.5px]"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`card-prompt-${id}`}
    >
      <div className="relative h-full bg-muted overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
          <Sparkles className="h-12 w-12 text-primary/30" />
        </div>

        <Badge
          variant={isFree ? "secondary" : "default"}
          className="absolute top-2 right-2 backdrop-blur-sm text-xs"
          data-testid={`badge-price-${id}`}
        >
          {isFree ? 'FREE' : `${price}cr`}
        </Badge>

        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent flex flex-col items-center justify-end p-3 gap-2">
            <div className="w-full space-y-1">
              <h3 className="font-semibold text-sm truncate text-center" data-testid={`text-title-${id}`}>
                {title}
              </h3>
              <p className="text-xs text-muted-foreground truncate text-center">by {artist}</p>
              <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  <span>{rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  <span>{downloads}</span>
                </div>
              </div>
            </div>
            <Button size="sm" className="w-full" data-testid={`button-use-${id}`}>
              Use Prompt
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}
