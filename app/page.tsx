"use client";

import FilterBar from "@/components/FilterBar";
import ArtworkGrid, { type ArtworkItem } from "@/components/ArtworkGrid";
import CompactPromptCreator from "@/components/CompactPromptCreator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Prompt, Artist } from "../shared/schema";

export default function Gallery() {
  const router = useRouter();
  
  // Prevent SSR issues by only running queries after mount
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data: promptsData, isLoading: promptsLoading } = useQuery<{
    items: Prompt[];
    nextCursor: string | null;
  }>({
    queryKey: ["/api/prompts"],
    enabled: isMounted, // Only run after mounting
  });

  const { data: artists = [] } = useQuery<Artist[]>({
    queryKey: ["/api/artists"],
    enabled: isMounted, // Only run after mounting
  });

  const prompts = promptsData?.items ?? [];

  const artworkItems: ArtworkItem[] = prompts
    .filter(
      (prompt): prompt is Prompt & { id: string } =>
        typeof prompt.id === "string" && !!prompt.id
    )
    .map((prompt) => {
      const artist = artists.find((a) => a.id === prompt.artistId);
      return {
        id: prompt.id,
        title: prompt.title,
        artistId: prompt.artistId,
        artistName: artist?.displayName || "Unknown Artist",
        price: prompt.price || 0,
        isFree: (prompt.price || 0) === 0,
        rating: prompt.rating || 0,
        downloads: prompt.downloads || 0,
        imageUrl: prompt.previewImageUrl || "",
        category: prompt.category,
        isFreeShowcase: prompt.isFreeShowcase || false,
        publicPromptText: prompt.publicPromptText,
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
      <CompactPromptCreator />
    </div>
  );
}
