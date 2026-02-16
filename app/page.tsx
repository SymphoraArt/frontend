"use client";

import FilterBar from "@/components/FilterBar";
import ArtworkGrid, { type ArtworkItem } from "@/components/ArtworkGrid";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Gallery() {
  const router = useRouter();
  
  // Prevent SSR issues by only running queries after mount
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: marketplaceData, isLoading: promptsLoading } = useQuery<{
    prompts: Array<{
      id: string;
      creator: string;
      type: string;
      title: string;
      description?: string;
      category?: string;
      pricing?: { pricePerGeneration?: number };
      showcaseImages?: Array<{ url?: string; thumbnail?: string }>;
      stats?: { totalGenerations?: number; likes?: number; reviews?: { averageRating?: number } };
    }>;
    nextCursor?: string;
  }>({
    queryKey: ["/api/symphora/prompts/marketplace"],
    enabled: isMounted,
  });

  const prompts = marketplaceData?.prompts ?? [];
  const artworkItems: ArtworkItem[] = prompts
    .filter((p) => typeof p.id === "string" && !!p.id)
    .map((p) => {
      const img = p.showcaseImages?.[0];
      const imageUrl = img?.url ?? img?.thumbnail ?? "";
      return {
        id: p.id,
        title: p.title,
        artistId: p.creator,
        artistName: "Creator",
        price: p.pricing?.pricePerGeneration ?? 0,
        isFree: p.type === "free",
        rating: p.stats?.reviews?.averageRating ?? 0,
        downloads: p.stats?.totalGenerations ?? 0,
        imageUrl,
        category: p.category ?? "",
        isFreeShowcase: p.type === "showcase",
        publicPromptText: p.description,
      };
    });

  // Show loading state during SSR and initial mount
  if (!isMounted || promptsLoading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <FilterBar onFilterChange={(f) => console.log("Filters:", f)} />
        <main className="w-full px-2 py-2 flex items-center justify-center">
          <p className="text-foreground text-lg" data-testid="text-loading">
            Loading prompts...
          </p>
        </main>
      </div>
    );
  }

  if (artworkItems.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <FilterBar onFilterChange={(f) => console.log("Filters:", f)} />
        <main className="w-full px-2 py-8 flex flex-col items-center justify-center">
          <p className="text-foreground text-lg mb-4" data-testid="text-empty">
            No prompts available yet
          </p>
          <p
            className="text-foreground/60 text-sm mb-6"
            data-testid="text-empty-hint"
          >
            Be the first to create and release a prompt!
          </p>
          <Button
            onClick={() => router.push("/editor")}
            size="lg"
            className="gap-2"
            data-testid="button-create-prompt-cta"
          >
            Create Your First Prompt
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <FilterBar onFilterChange={(f) => console.log("Filters:", f)} />
      <main className="w-full px-2 py-2">
        <ArtworkGrid
          items={artworkItems}
          variant="prompt"
          showArtist={true}
          useMasonryLayout={true}
          onCardClick={(id) => router.push(`/generator/${id}`)}
        />
      </main>
    </div>
  );
}
