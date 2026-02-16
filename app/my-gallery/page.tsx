"use client";

import Navbar from "@/components/Navbar";
import { useActiveAccount } from "thirdweb/react";
import { useEffect, useMemo, useState } from "react";
import { getUserKeyFromAccount } from "@/lib/creations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConnectWallet } from "@/components/ConnectWallet";

type SymphoraGeneration = {
  id: string;
  generatedImage?: string | null;
  variableValues?: Record<string, unknown>;
  status?: string;
  createdAt?: string;
};

type GalleryItem = {
  id: string;
  imageUrl: string;
  prompt: string;
  createdAt: string;
  isUploaded?: boolean;
};

export default function MyGalleryPage() {
  const account = useActiveAccount();
  const authenticated = !!account;
  const userKey = useMemo(() => getUserKeyFromAccount(account), [account]);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const handleRefresh = () => setRefreshTrigger((prev) => prev + 1);
    window.addEventListener("gallery-refresh", handleRefresh);
    return () => window.removeEventListener("gallery-refresh", handleRefresh);
  }, []);

  useEffect(() => {
    if (!userKey) {
      setItems([]);
      return;
    }
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(
          `/api/symphora/generations/my?userKey=${encodeURIComponent(userKey)}`
        );
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as { generations?: SymphoraGeneration[] };
        const generations = Array.isArray(json.generations)
          ? json.generations
          : [];
        const mapped: GalleryItem[] = generations.map((g) => ({
          id: String(g.id),
          imageUrl: g.generatedImage ?? "",
          prompt: "",
          createdAt: g.createdAt ?? new Date().toISOString(),
          isUploaded: false,
        }));
        if (!cancelled) setItems(mapped);
      } catch {
        if (!cancelled) setItems([]);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [userKey, refreshTrigger]);

  const handleClear = () => setItems([]);
  const handleRemove = (id: string) =>
    setItems((prev) => prev.filter((c) => c.id !== id));

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

        {items.length === 0 ? (
          <Card className="border border-border/60 bg-card/60 backdrop-blur">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              No creations yet. Generate an image or upload one from the showroom and it will appear here.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((c) => (
              <Card
                key={c.id}
                className="border border-border/60 bg-card/60 backdrop-blur overflow-hidden"
                data-testid={`my-gallery-item-${c.id}`}
              >
                <div className="aspect-[4/3] bg-muted relative">
                  <img
                    src={c.imageUrl}
                    alt={c.isUploaded ? "Uploaded" : "Generated"}
                    className="w-full h-full object-cover"
                  />
                  {c.isUploaded && (
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
        )}
      </main>
    </div>
  );
}
