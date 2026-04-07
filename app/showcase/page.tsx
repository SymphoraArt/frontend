"use client";

import FilterBar from "@/components/FilterBar";
import CategoriesBar from "@/components/CategoriesBar";
import PromptCard from "@/components/PromptCard";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useActiveAccount } from "thirdweb/react";
import { getUserKeyFromAccount } from "@/lib/creations";

const ShowroomUploadZone = dynamic(
  () => import("@/components/ShowroomUploadZone"),
  { ssr: false }
);

export default function Showcase() {
  const router = useRouter();
  const account = useActiveAccount();
  const userKey = useMemo(() => getUserKeyFromAccount(account), [account]);
  const PAGE_SIZE = 12;
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

  const {
    data: showroomData,
    isLoading,
    fetchStatus,
  } = useQuery({
    queryKey: ["/api/enki/prompts/showroom", cursor, category, followersOnly, userKey],
    queryFn: async () => {
      const url = new URL("/api/enki/prompts/showroom", window.location.origin);
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

  const [allPrompts, setAllPrompts] = useState<any[]>([]);

  useEffect(() => {
    const items = showroomData?.prompts ?? [];
    const mapped = items.map((item: any) => ({
      ...item,
      id: item._id ?? item.id,
      creatorId: item.creator,
    }));
    if (cursor === null) {
      setAllPrompts(mapped);
    } else {
      setAllPrompts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        return [...prev, ...mapped.filter((item: any) => !existingIds.has(item.id))];
      });
    }
  }, [showroomData, cursor]);

  const visiblePrompts = useMemo(() => {
    return allPrompts
      .filter((p: any) => p.id)
      .map((p: any) => {
        const img = p.showcaseImages?.[0];
        const imageUrl = img?.thumbnail ?? img?.url ?? "";
        return {
          id: p.id,
          title: p.title,
          artist: "Creator",
          price: p.pricing?.pricePerGeneration ?? 0,
          isFree: true,
          rating: p.stats?.reviews?.averageRating ?? 0,
          downloads: p.stats?.totalGenerations ?? 0,
          thumbnail: imageUrl,
          category: p.category ?? "",
        };
      });
  }, [allPrompts]);

  const hasMore = !!showroomData?.nextCursor;
  const isLoadingMore = fetchStatus === "fetching" && cursor !== null;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && showroomData?.nextCursor) {
          setCursor(showroomData.nextCursor);
        }
      },
      { rootMargin: "800px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, showroomData?.nextCursor]);

  // Show loading state during SSR and initial mount
  if (!isMounted || (isLoading && allPrompts.length === 0)) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <CategoriesBar selectedCategory={category} onCategoryChange={(v) => { setCategory(v); setCursor(null); }} />
        <FilterBar onFilterChange={handleFilterChange} hidePriceFilter showFollowersFilter={!!userKey} category={category} onCategoryChange={(v) => { setCategory(v); setCursor(null); }} />
        <main className="w-full px-2 py-2 flex items-center justify-center">
          <p className="text-foreground text-lg">Loading prompts...</p>
        </main>
      </div>
    );
  }

  if (visiblePrompts.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <CategoriesBar selectedCategory={category} onCategoryChange={(v) => { setCategory(v); setCursor(null); }} />
        <FilterBar onFilterChange={handleFilterChange} hidePriceFilter showFollowersFilter={!!userKey} category={category} onCategoryChange={(v) => { setCategory(v); setCursor(null); }} />
        <main className="w-full px-2 py-8 flex flex-col items-center justify-center">
          <p className="text-foreground text-lg mb-4">
            No prompts available yet
          </p>
          <p className="text-foreground/60 text-sm">
            Be the first to create and release a prompt!
          </p>
        </main>
        <ShowroomUploadZone />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <CategoriesBar selectedCategory={category} onCategoryChange={(v) => { setCategory(v); setCursor(null); }} />
      <FilterBar onFilterChange={handleFilterChange} hidePriceFilter showFollowersFilter={!!userKey} category={category} onCategoryChange={(v) => { setCategory(v); setCursor(null); }} />
      <main className="flex-1 min-h-0 w-full px-1 sm:px-2 py-2 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[3px]">
          {visiblePrompts.map((prompt) => (
            <div key={prompt.id} className="min-w-0">
              <PromptCard {...prompt} onClick={() => router.push(`/generator/${prompt.id}`)} />
            </div>
          ))}
        </div>
        <div ref={sentinelRef} className="h-10" />
        <div className="w-full py-4 flex items-center justify-center text-sm text-muted-foreground">
          {isLoadingMore
            ? "Loading more..."
            : hasMore
              ? "Scroll to load more..."
              : "You're all caught up."}
        </div>
      </main>
      <ShowroomUploadZone />
    </div>
  );
}
