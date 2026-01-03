"use client";

import Navbar from "@/components/Navbar";
import FilterBar from "@/components/FilterBar";
import ArtworkGrid, { type ArtworkItem } from "@/components/ArtworkGrid";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import type { Prompt, Artist } from "../../shared/schema";

export default function Gallery() {
  const router = useRouter();

  const { data: prompts = [], isLoading: promptsLoading } = useQuery<Prompt[]>({
    queryKey: ["/api/prompts"],
  });

  const { data: artists = [] } = useQuery<Artist[]>({
    queryKey: ["/api/artists"],
  });

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

  if (promptsLoading) {
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
            className="text-foreground/60 text-sm"
            data-testid="text-empty-hint"
          >
            Be the first to create and release a prompt!
          </p>
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
