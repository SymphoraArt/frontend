"use client";

import Navbar from "@/components/Navbar";
import { useActiveAccount } from "thirdweb/react";
import { useEffect, useMemo, useState } from "react";
import {
  clearCreations,
  getUserKeyFromAccount,
  listCreations,
  removeCreation,
  subscribeCreations,
  type StoredCreation,
} from "@/lib/creations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConnectWallet } from "@/components/ConnectWallet";

type SupabaseGeneration = {
  id: string;
  image_url?: string;
  image_urls?: string[];
  final_prompt?: string | null;
  settings?: {
    origin?: string;
    [key: string]: any;
  };
  status?: string;
  created_at: string;
};

export default function MyGalleryPage() {
  const account = useActiveAccount();
  const authenticated = !!account;
  const userKey = useMemo(() => getUserKeyFromAccount(account), [account]);
  const [items, setItems] = useState<StoredCreation[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [mediaFilter, setMediaFilter] = useState<"all" | "images" | "videos">("all");

  // Listen for gallery refresh events
  useEffect(() => {
    const handleRefresh = () => {
      setRefreshTrigger((prev) => prev + 1);
    };

    window.addEventListener('gallery-refresh', handleRefresh);
    return () => window.removeEventListener('gallery-refresh', handleRefresh);
  }, []);

  useEffect(() => {
    if (!userKey) {
      setItems([]);
      return;
    }

    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      setFetchError(null);
      try {
        const res = await fetch(`/api/generations?userKey=${encodeURIComponent(userKey)}`);
        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}));
          throw new Error(errBody.error || `Server responded with ${res.status}`);
        }
        const json = (await res.json()) as { generations?: SupabaseGeneration[] };
        const generations = Array.isArray(json.generations) 
          ? json.generations 
          : Array.isArray((json as any).items) 
            ? (json as any).items 
            : [];
        
        const mapped: StoredCreation[] = generations.map((g: SupabaseGeneration) => {
          const imageUrl = g.image_urls && g.image_urls.length > 0
            ? g.image_urls[0]
            : g.image_url || "";
          
          const prompt = g.final_prompt || (g as any).prompt || "";
          
          return {
            id: String(g.id),
            imageUrl: String(imageUrl),
            prompt: typeof prompt === "string" ? prompt : "",
            createdAt: typeof g.created_at === "string" ? g.created_at : new Date().toISOString(),
            isUploaded: g.settings?.origin === 'uploaded' || g.status === 'uploaded',
          };
        });
        if (!cancelled) setItems(mapped);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error('Gallery fetch error:', message);
        if (!cancelled) {
          setFetchError(message);
          setItems(listCreations(userKey));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();

    const unsub = subscribeCreations(userKey, () => {
      load();
    });

    return () => {
      cancelled = true;
      unsub();
    };
  }, [userKey, refreshTrigger]);

  const handleClear = async () => {
    if (!userKey) return;
    try {
      await fetch(`/api/generations?userKey=${encodeURIComponent(userKey)}`, { method: "DELETE" });
    } catch {
      // ignore
    }
    clearCreations(userKey);
  };

  const handleRemove = async (id: string) => {
    if (!userKey) return;
    try {
      await fetch(`/api/generations/${encodeURIComponent(id)}`, { method: "DELETE" });
    } catch {
      // ignore
    }
    removeCreation(userKey, id);
  };

  if (!authenticated || !userKey) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <Navbar />
        <main className="w-full px-6 lg:px-8 py-10 max-w-5xl mx-auto">
          <Card className="border border-border/60 bg-card/60 backdrop-blur">
            <CardHeader>
              <CardTitle>My Gallery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Connect your wallet to view your private creations.
              </p>
              <ConnectWallet />
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar />
      <main className="w-full px-6 lg:px-8 py-6 max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              My Gallery
            </h1>
            <p className="text-sm text-muted-foreground">
              Your generated and uploaded images.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleClear}
            disabled={items.length === 0}
            data-testid="button-clear-my-gallery"
          >
            Clear
          </Button>
        </div>

        {fetchError && (
          <div className="mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/20 flex items-center justify-between">
            <p className="text-sm text-destructive">Failed to load gallery: {fetchError}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRefreshTrigger(prev => prev + 1)}
              data-testid="button-retry-gallery"
            >
              Retry
            </Button>
          </div>
        )}

        <div className="flex gap-1 mb-4">
          {(["all", "images", "videos"] as const).map((filter) => (
            <Button
              key={filter}
              variant={mediaFilter === filter ? "default" : "outline"}
              size="sm"
              className="text-xs capitalize"
              onClick={() => setMediaFilter(filter)}
              data-testid={`button-filter-${filter}`}
            >
              {filter === "all" ? "All" : filter === "images" ? "Images" : "Videos"}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <Card className="border border-border/60 bg-card/60 backdrop-blur">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              Loading your gallery...
            </CardContent>
          </Card>
        ) : (() => {
          const isVideo = (url: string) => /\.(mp4|webm|mov|avi)$/i.test(url);
          const filtered = mediaFilter === "all" ? items
            : mediaFilter === "images" ? items.filter(c => !isVideo(c.imageUrl))
            : items.filter(c => isVideo(c.imageUrl));

          return filtered.length === 0 ? (
          <Card className="border border-border/60 bg-card/60 backdrop-blur">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              No creations yet. Generate an image or upload one from the showroom and it will appear here.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((c) => (
              <Card
                key={c.id}
                className="border border-border/60 bg-card/60 backdrop-blur overflow-hidden"
                data-testid={`my-creation-${c.id}`}
              >
                <div className="aspect-[4/3] bg-muted relative">
                  <img
                    src={c.imageUrl}
                    alt={(c as any).isUploaded ? "Uploaded" : "Generated"}
                    className="w-full h-full object-cover"
                  />
                  {(c as any).isUploaded && (
                    <div className="absolute top-2 left-2">
                      <span className="text-xs bg-blue-500/80 text-white px-2 py-1 rounded">
                        Uploaded
                      </span>
                    </div>
                  )}
                </div>
                <CardContent className="p-3 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-muted-foreground">
                      {new Date(c.createdAt).toLocaleString()}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2"
                      onClick={() => handleRemove(c.id)}
                      data-testid={`button-delete-creation-${c.id}`}
                    >
                      Remove
                    </Button>
                  </div>
                  <div className="text-xs font-mono text-foreground/80 whitespace-pre-wrap break-words max-h-24 overflow-y-auto scrollbar-thin">
                    {c.prompt}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );
        })()}
      </main>
    </div>
  );
}
