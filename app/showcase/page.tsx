"use client";


import PromptCard from "@/components/PromptCard";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";
import PromptDetailModal from "@/components/PromptDetailModal";
import { useQuery, useQueries } from "@tanstack/react-query";

// Dynamically import components that use browser-only hooks to prevent SSR errors


const ShowroomUploadZone = dynamic(
  () => import("@/components/ShowroomUploadZone"),
  { ssr: false }
);

export default function Showcase() {
  const router = useRouter();
  const PAGE_SIZE = 12;
  const [cursor, setCursor] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [selectedPromptData, setSelectedPromptData] = useState<any>(null);

  // Prevent SSR issues by only rendering after mount
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    data: promptsData,
    isLoading,
    fetchStatus,
  } = useQuery({
    queryKey: ["/api/prompts", cursor],
    queryFn: async () => {
      const url = new URL("/api/prompts", window.location.origin);
      if (cursor) url.searchParams.set("cursor", cursor);
      url.searchParams.set("limit", String(PAGE_SIZE));
      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
      return res.json();
    },
    enabled: isMounted, // Only run query after mounting
  });

  const [allPrompts, setAllPrompts] = useState<any[]>([]);

  useEffect(() => {
    if (promptsData?.items) {
      const items = promptsData.items.map((item: any) => ({
        ...item,
        id: item._id?.toString() || item.id,
        creatorId: item.creator?.toString?.() || item.creator || item.creatorId,
      }));

      if (cursor === null) {
        setAllPrompts(items);
      } else {
        setAllPrompts((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          return [
            ...prev,
            ...items.filter((item: any) => !existingIds.has(item.id)),
          ];
        });
      }
    }
  }, [promptsData, cursor]);

  const creatorIds = useMemo(
    () => [...new Set(allPrompts.map((p: any) => p.creatorId).filter(Boolean))],
    [allPrompts]
  );

  const creatorQueries = useQueries({
    queries: creatorIds.map((id) => ({
      queryKey: ["/api/users", id],
      queryFn: async () => {
        const res = await fetch(`/api/users/${id}`, { credentials: "include" });
        return res.ok ? (await res.json()).user : null;
      },
      staleTime: 5 * 60 * 1000,
      enabled: isMounted && creatorIds.length > 0, // Only run after mounting
    })),
  });

  const creatorsMap = useMemo(() => {
    const map = new Map();
    creatorQueries.forEach((q) => {
      if (q.data) {
        map.set(q.data._id?.toString() || q.data.id, {
          displayName: q.data.profile?.displayName,
          username: q.data.profile?.username,
        });
      }
    });
    return map;
  }, [creatorQueries]);

  const visiblePrompts = useMemo(() => {
    return allPrompts
      .filter((p: any) => p.id)
      .map((p: any) => {
        const creator = creatorsMap.get(p.creatorId);

        const primaryImage = p.showcaseImages?.find(
          (i: any) => i.isPrimary === true
        );
        const selectedImage = primaryImage || p.showcaseImages?.[0];
        const imageUrl = selectedImage?.thumbnail || selectedImage?.url || "";

        return {
          id: p.id,
          title: p.title,
          artist: creator?.displayName || creator?.username || "Unknown Artist",
          price: p.pricing?.pricePerGeneration || 0,
          isFree: p.type === "showcase" || p.type === "free",
          rating: p.stats?.reviews?.averageRating || 0,
          downloads: p.stats?.totalGenerations || 0,
          thumbnail: imageUrl,
          category: p.category || "",
        };
      });
  }, [allPrompts, creatorsMap]);

  const hasMore = promptsData?.nextCursor !== null;
  const isLoadingMore = fetchStatus === "fetching" && cursor !== null;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && promptsData?.nextCursor) {
          setCursor(promptsData.nextCursor);
        }
      },
      { rootMargin: "800px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, promptsData?.nextCursor]);

  // Show loading state during SSR and initial mount
  if (!isMounted || (isLoading && allPrompts.length === 0)) {
    return (
      <div className="min-h-screen bg-background pt-16">

        <main className="w-full px-2 py-2 flex items-center justify-center">
          <p className="text-foreground text-lg">Loading prompts...</p>
        </main>
      </div>
    );
  }

  if (visiblePrompts.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-16">

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
    <div className="min-h-screen bg-background pt-16">

      <main className="w-full px-2 py-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 auto-rows-[200px]">
          {visiblePrompts.map((prompt, idx) => {
            const spans =
              idx % 7 === 0
                ? "row-span-2 col-span-2"
                : idx % 5 === 0
                  ? "row-span-2"
                  : "";
            return (
              <div key={prompt.id} className={spans}>
                <PromptCard
                  {...prompt}
                  onClick={() => setSelectedPromptData({ ...prompt, imageUrl: prompt.thumbnail })}
                />
              </div>
            );
          })}
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
      <PromptDetailModal
        isOpen={!!selectedPromptData}
        onClose={() => setSelectedPromptData(null)}
        prompt={selectedPromptData}
      />
    </div>
  );
}
