"use client";

import FilterBar from "@/components/FilterBar";
import CategoriesBar from "@/components/CategoriesBar";
import ArtworkGrid, { type ArtworkItem } from "@/components/ArtworkGrid";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useActiveAccount } from "thirdweb/react";
import { getUserKeyFromAccount } from "@/lib/creations";

const PAGE_SIZE = 24;

export default function Gallery() {
  const router = useRouter();
  const account = useActiveAccount();
  const userKey = useMemo(() => getUserKeyFromAccount(account), [account]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [followersOnly, setFollowersOnly] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFilterChange = (filters: { category?: string; followersOnly?: boolean }) => {
    const newCategory = filters.category === "all" || !filters.category ? undefined : filters.category;
    const newFollowersOnly = filters.followersOnly ?? false;
    if (newCategory !== category || newFollowersOnly !== followersOnly) {
      setCategory(newCategory);
      setFollowersOnly(newFollowersOnly);
      setCursor(null);
    }
  };

  const { data: marketplaceData, isLoading: promptsLoading, fetchStatus } = useQuery<{
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
    queryKey: ["/api/enki/prompts/marketplace", cursor, category, followersOnly, userKey],
    queryFn: async () => {
      const url = new URL("/api/enki/prompts/marketplace", window.location.origin);
      if (cursor) url.searchParams.set("cursor", cursor);
      if (category) url.searchParams.set("category", category);
      if (followersOnly && userKey) {
        url.searchParams.set("onlyFollowing", "1");
        url.searchParams.set("userKey", userKey);
      }
      url.searchParams.set("limit", String(PAGE_SIZE));
      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
      return res.json();
    },
    enabled: isMounted,
  });

  const [allPrompts, setAllPrompts] = useState<Array<{
    id: string;
    creator: string;
    type: string;
    title: string;
    description?: string;
    category?: string;
    pricing?: { pricePerGeneration?: number };
    showcaseImages?: Array<{ url?: string; thumbnail?: string }>;
    stats?: { totalGenerations?: number; likes?: number; reviews?: { averageRating?: number } };
  }>>([]);

  useEffect(() => {
    const prompts = marketplaceData?.prompts ?? [];
    if (cursor === null) {
      setAllPrompts(prompts);
    } else {
      setAllPrompts((prev) => {
        const existingIds = new Set(prev.map((p: { id: string }) => p.id));
        return [...prev, ...prompts.filter((p: { id: string }) => !existingIds.has(p.id))];
      });
    }
  }, [marketplaceData, cursor]);

  const artworkItems: ArtworkItem[] = useMemo(
    () =>
      allPrompts
        .filter((p: { id: string }) => typeof p.id === "string" && !!p.id)
        .map((p: {
          id: string;
          creator: string;
          type: string;
          title: string;
          description?: string;
          category?: string;
          pricing?: { pricePerGeneration?: number };
          showcaseImages?: Array<{ url?: string; thumbnail?: string }>;
          stats?: { totalGenerations?: number; likes?: number; reviews?: { averageRating?: number } };
        }) => {
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
        }),
    [allPrompts]
  );

  const hasMore = !!marketplaceData?.nextCursor;
  const isLoadingMore = fetchStatus === "fetching" && cursor !== null;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || isLoadingMore) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && marketplaceData?.nextCursor) {
          setCursor(marketplaceData.nextCursor);
        }
      },
      { rootMargin: "800px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, marketplaceData?.nextCursor]);

  if (!isMounted || (promptsLoading && allPrompts.length === 0)) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <CategoriesBar selectedCategory={category} onCategoryChange={(v) => { setCategory(v); setCursor(null); }} />
        <FilterBar onFilterChange={handleFilterChange} showFollowersFilter={!!userKey} category={category} onCategoryChange={(v) => { setCategory(v); setCursor(null); }} />
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
        <CategoriesBar selectedCategory={category} onCategoryChange={(v) => { setCategory(v); setCursor(null); }} />
        <FilterBar onFilterChange={handleFilterChange} showFollowersFilter={!!userKey} category={category} onCategoryChange={(v) => { setCategory(v); setCursor(null); }} />
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
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <CategoriesBar
        selectedCategory={category}
        onCategoryChange={(v) => {
          setCategory(v);
          setCursor(null);
        }}
      />
      <FilterBar
        onFilterChange={handleFilterChange}
        showFollowersFilter={!!userKey}
        category={category}
        onCategoryChange={(v) => {
          setCategory(v);
          setCursor(null);
        }}
      />
      <main className="flex-1 min-h-0 w-full px-1 sm:px-2 py-2 overflow-y-auto">
        <ArtworkGrid
          items={artworkItems}
          variant="prompt"
          showArtist={true}
          onCardClick={(id) => router.push(`/generator/${id}`)}
        />
        <div ref={sentinelRef} className="h-10" />
        <div className="w-full py-4 flex items-center justify-center text-sm text-muted-foreground">
          {isLoadingMore
            ? "Loading more..."
            : hasMore
              ? "Scroll to load more..."
              : artworkItems.length > 0
                ? "You're all caught up."
                : null}
        </div>
      </main>
    </div>
  );
}
