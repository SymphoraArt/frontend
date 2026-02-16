"use client";

import Navbar from "@/components/Navbar";
import { useActiveAccount } from "thirdweb/react";
import { useMemo, useEffect, useState } from "react";
import { getUserKeyFromAccount } from "@/lib/creations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ConnectWallet } from "@/components/ConnectWallet";
import Link from "next/link";

type SymphoraPrompt = {
  id: string;
  title: string;
  type: string;
  category: string;
  description?: string;
  showcaseImages?: { url: string; type?: string }[];
  stats?: { likes?: number };
  createdAt?: string;
};

export default function MyPromptsPage() {
  const account = useActiveAccount();
  const authenticated = !!account;
  const userKey = useMemo(() => getUserKeyFromAccount(account), [account]);
  const [prompts, setPrompts] = useState<SymphoraPrompt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userKey) {
      setPrompts([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/symphora/prompts/my?userKey=${encodeURIComponent(userKey)}`
        );
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as { prompts?: SymphoraPrompt[] };
        const list = Array.isArray(json.prompts) ? json.prompts : [];
        if (!cancelled) setPrompts(list);
      } catch {
        if (!cancelled) setPrompts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [userKey]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <Navbar />
        <main className="w-full px-6 lg:px-8 py-10 max-w-5xl mx-auto">
          <Card className="border border-border/60 bg-card/60 backdrop-blur">
            <CardHeader>
              <CardTitle>My Prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Connect your wallet to view and manage your saved prompts.
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
      <main className="w-full px-6 lg:px-8 py-10 max-w-5xl mx-auto">
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-foreground">My Prompts</h1>
          <p className="text-sm text-muted-foreground">
            Prompts you released to the marketplace or showroom.
          </p>
        </div>
        {loading ? (
          <Card className="border border-border/60 bg-card/60 backdrop-blur">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              Loading…
            </CardContent>
          </Card>
        ) : prompts.length === 0 ? (
          <Card className="border border-border/60 bg-card/60 backdrop-blur">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              No prompts yet. Create and release a prompt from the editor.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {prompts.map((p) => (
              <Card
                key={p.id}
                className="border border-border/60 bg-card/60 backdrop-blur overflow-hidden"
              >
                <div className="aspect-[4/3] bg-muted relative">
                  {p.showcaseImages?.[0]?.url ? (
                    <img
                      src={p.showcaseImages[0].url}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      No image
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <span className="text-xs bg-muted/90 text-foreground px-2 py-1 rounded">
                      {p.type === "paid" ? "Paid" : p.type === "free" ? "Free" : "Showcase"}
                    </span>
                  </div>
                </div>
                <CardContent className="p-3 space-y-2">
                  <div className="font-medium text-sm truncate" title={p.title}>
                    {p.title}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {p.category || "—"} · {(p.stats?.likes ?? 0)} likes
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link href={`/generator/${p.id}`}>Open</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
