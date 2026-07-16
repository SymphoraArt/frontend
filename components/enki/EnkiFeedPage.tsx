"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import EnkiCard from "@/components/enki/EnkiCard";
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

  // OPEN counter: opening a prompt fires a fire-and-forget beacon; the server
  // dedupes per viewer for 10 min and increments prompts.opens atomically.
  useEffect(() => {
    if (!open?.id) return;
    fetch(`/api/prompts/${encodeURIComponent(open.id)}/view`, { method: "POST" }).catch(() => {});
  }, [open?.id]);

  // VIEW counter (timeline impressions): one IntersectionObserver watches every
  // card; ids that became at least half visible are buffered and flushed as ONE
  // batched call every 3s. A session-level set makes sure each prompt is sent
  // at most once per visit (the server dedupes again on top).
  const impressionSeen = useRef<Set<string>>(new Set());
  const impressionBuffer = useRef<Set<string>>(new Set());
  const impressionObserver = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    impressionObserver.current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const pid = (e.target as HTMLElement).dataset.pid;
          if (e.isIntersecting && pid && !impressionSeen.current.has(pid)) {
            impressionSeen.current.add(pid);
            impressionBuffer.current.add(pid);
          }
        }
      },
      { threshold: 0.5 },
    );
    const flush = setInterval(() => {
      if (impressionBuffer.current.size === 0) return;
      const ids = [...impressionBuffer.current];
      impressionBuffer.current.clear();
      fetch("/api/prompts/views-batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      }).catch(() => {});
    }, 3000);
    return () => { impressionObserver.current?.disconnect(); clearInterval(flush); };
  }, []);
  const observeCard = useCallback((el: HTMLDivElement | null) => {
    if (el) impressionObserver.current?.observe(el);
  }, []);

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
              <div key={prompt.id} data-pid={prompt.id} ref={observeCard} style={{ breakInside: "avoid" }}>
                <EnkiCard
                  prompt={prompt}
                  onOpen={setOpen}
                  faved={Boolean(favs[prompt.id])}
                  toggleFav={toggleFav}
                />
              </div>
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

        {/* One launcher drives both the blank floating "Generate" button and the
            seeded view opened by clicking a feed card. */}
        <GenerateLauncher seedPrompt={open} onSeedClose={() => setOpen(null)} />
      </main>

      <EnkiFilters active={tags} toggle={toggleTag} />
    </>
  );
}
