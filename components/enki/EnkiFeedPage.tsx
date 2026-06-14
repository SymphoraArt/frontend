"use client";

import { useMemo, useState, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import EnkiCard from "@/components/enki/EnkiCard";
import EnkiDetailPanel from "@/components/enki/EnkiDetailPanel";
import EnkiFilters from "@/components/enki/EnkiFilters";
import GenerateLauncher from "@/components/GenerateLauncher";
import type { EnkiPrompt } from "@/lib/enkiPromptAdapter";
import { mapMarketplacePromptToEnkiPrompt } from "@/lib/enkiPromptAdapter";

function useLocalFavorites() {
  const [favs, setFavs] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem("enki:favorites") || "{}");
    } catch {
      return {};
    }
  });

  const toggleFav = (id: string) => {
    setFavs((current) => {
      const next = { ...current, [id]: !current[id] };
      if (typeof window !== "undefined") {
        localStorage.setItem("enki:favorites", JSON.stringify(next));
      }
      return next;
    });
  };

  return { favs, toggleFav };
}

export default function EnkiFeedPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [open, setOpen] = useState<EnkiPrompt | null>(null);
  const { favs, toggleFav } = useLocalFavorites();

  type Page = { prompts: unknown[]; hasMore: boolean; nextCursor?: string };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useInfiniteQuery<Page, Error, { pages: Page[]; pageParams: number[] }, string[], number>({
    queryKey: ["/api/marketplace/prompts", "home"],
    queryFn: async ({ pageParam }) => {
      const params = new URLSearchParams({
        limit: "24",
        sortBy: "trending",
        cursor: String(pageParam),
      });
      const res = await fetch(`/api/marketplace/prompts?${params.toString()}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load marketplace prompts");
      const json = await res.json();
      return json as Page;
    },
    getNextPageParam: (lastPage) => {
      const next = lastPage.nextCursor ? parseInt(lastPage.nextCursor, 10) : undefined;
      return Number.isNaN(next) ? undefined : next;
    },
    initialPageParam: 0,
    staleTime: 60_000,
  });

  /* IntersectionObserver for infinite scroll */
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelCallback = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  const allPrompts = useMemo<EnkiPrompt[]>(() => {
    const pages = data?.pages ?? [];
    const flat = pages.flatMap((page, pageIndex) =>
      Array.isArray(page.prompts)
        ? page.prompts.map((item: unknown, idx: number) => mapMarketplacePromptToEnkiPrompt(item, pageIndex * 24 + idx))
        : []
    );
    return flat;
  }, [data]);

  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const visible = useMemo<EnkiPrompt[]>(() => {
    let filtered = allPrompts;
    if (tags.length) {
      filtered = filtered.filter((prompt) => tags.every((tag) => prompt.tags.includes(tag)));
    }
    if (query) {
      filtered = filtered.filter((prompt) =>
        prompt.title.toLowerCase().includes(query) ||
        prompt.description.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [allPrompts, tags, query]);

  const toggleTag = (tag: string) => {
    setTags((current) => (current.includes(tag) ? [] : [tag]));
  };

  const showEmpty = !isPending && visible.length === 0 && !isFetchingNextPage;

  return (
    <>
      <main className="enki">
        {visible.length > 0 ? (
          <section className="enki-masonry">
            {visible.map((prompt) => (
              <EnkiCard
                key={prompt.id}
                prompt={prompt}
                onOpen={setOpen}
                faved={Boolean(favs[prompt.id])}
                toggleFav={toggleFav}
              />
            ))}
            {/* Sentinel for infinite scroll */}
            <div ref={sentinelCallback} style={{ height: 1, breakInside: "avoid" }} />
            {/* Skeleton loaders for next page */}
            {isFetchingNextPage && (
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={`sk-${i}`} className="enki-skeleton" />
                ))}
              </>
            )}
          </section>
        ) : isPending ? (
          <section className="enki-masonry">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`sk-init-${i}`} className="enki-skeleton" />
            ))}
          </section>
        ) : showEmpty ? (
          <section className="enki-empty-state">
            <div className="enki-account-card">
              <div className="serif" style={{ fontSize: 28, marginBottom: 8 }}>No prompts here yet.</div>
              <p style={{ margin: 0, color: "var(--enki-ink-2)" }}>
                Adjust your filters to widen the results.
              </p>
            </div>
          </section>
        ) : null}

        <GenerateLauncher />
        {open && (
          <EnkiDetailPanel
            prompt={open}
            onClose={() => setOpen(null)}
            faved={Boolean(favs[open.id])}
            toggleFav={toggleFav}
          />
        )}
      </main>

      <EnkiFilters active={tags} toggle={toggleTag} />
    </>
  );
}
