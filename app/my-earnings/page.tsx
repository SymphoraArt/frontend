"use client";

import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, DollarSign, Package, Activity, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface TopPrompt {
  promptId: string;
  title: string;
  sales: number;
  revenue: number;
  conversionRate: number;
}

interface RecentSale {
  id: string;
  promptId: string;
  promptTitle: string;
  promptPreviewImageUrl: string | null;
  buyerId: string;
  amountCents: number;
  createdAt: string;
}

interface EarningsData {
  userId: string;
  earnings: {
    total: number;
    thisMonth: number;
    thisWeek: number;
    pending: number;
    available: number;
  };
  sales: {
    total: number;
    thisMonth: number;
    thisWeek: number;
  };
  listings: {
    total: number;
    active: number;
    draft: number;
    paused: number;
  };
  recentSales: RecentSale[];
  topPrompts: TopPrompt[];
}

export default function MyEarningsPage() {
  const account = useActiveAccount();
  const [data, setData] = useState<EarningsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEarnings() {
      if (!account?.address) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${account.address}/earnings`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch earnings");
        }

        const earnings: EarningsData = await response.json();
        setData(earnings);
      } catch (err) {
        console.error("Error fetching earnings:", err);
        setError(err instanceof Error ? err.message : "Failed to load earnings");
      } finally {
        setLoading(false);
      }
    }

    fetchEarnings();
  }, [account?.address]);

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </main>
    );
  }

  if (!account) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Creator Earnings</CardTitle>
            <CardDescription>Connect your wallet to view your earnings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please connect your wallet to see your creator earnings and statistics.
            </p>
          </CardContent>
        </Card>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Error Loading Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive">{error}</p>
            <Button onClick={() => {
              setError(null);
              setLoading(true);
              if (account?.address) {
                fetch(`/api/users/${account.address}/earnings`, {
                  headers: { "Content-Type": "application/json" },
                })
                  .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch earnings");
                    return res.json();
                  })
                  .then((earnings: EarningsData) => {
                    setData(earnings);
                    setError(null);
                  })
                  .catch(err => {
                    setError(err instanceof Error ? err.message : "Failed to load earnings");
                  })
                  .finally(() => setLoading(false));
              }
            }} className="mt-4">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const hasEarnings = data && data.sales.total > 0;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Creator Earnings</h1>
        <p className="text-muted-foreground">
          Track your sales, earnings, and prompt performance
        </p>
      </div>

      {!hasEarnings ? (
        /* Empty State for New Creators */
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <TrendingUp className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Start Earning as a Creator</h3>
            <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
              Create and list your prompts on the marketplace to start earning. Share your creativity with the community!
            </p>
            <div className="flex gap-3">
              <Link href="/editor">
                <Button>
                  Create Your First Prompt
                </Button>
              </Link>
              <Link href="/showcase">
                <Button variant="outline">
                  Browse Inspiration
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Earnings Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Earnings
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${((data?.earnings.total || 0) / 100).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Available: ${((data?.earnings.available || 0) / 100).toFixed(2)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    This Month
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ${((data?.earnings.thisMonth || 0) / 100).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {data?.sales.thisMonth || 0} sales
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Sales
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {data?.sales.total || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  This week: {data?.sales.thisWeek || 0}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Listings
                  </CardTitle>
                  <Package className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {data?.listings.active || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Total: {data?.listings.total || 0}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Prompts */}
          {data?.topPrompts && data.topPrompts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Prompts</CardTitle>
                <CardDescription>Your best-selling prompts ranked by revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.topPrompts.map((prompt, index) => (
                    <div
                      key={prompt.promptId}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold">{prompt.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {prompt.sales} sales • {prompt.conversionRate.toFixed(1)}% conversion
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">
                          ${(prompt.revenue / 100).toFixed(2)}
                        </p>
                        <Link href={`/showcase/${prompt.promptId}`}>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Sales */}
          {data?.recentSales && data.recentSales.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>Your latest 10 sales</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {data.recentSales.map((sale) => (
                    <div
                      key={sale.id}
                      className="flex items-center gap-4 p-3 rounded-lg border bg-card"
                    >
                      {sale.promptPreviewImageUrl && (
                        <div className="relative w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <Image
                            src={sale.promptPreviewImageUrl}
                            alt={sale.promptTitle}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{sale.promptTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(sale.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold">
                          ${(sale.amountCents / 100).toFixed(2)}
                        </p>
                        <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                          {sale.buyerId.slice(0, 6)}...{sale.buyerId.slice(-4)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Link href="/editor">
                <Button>
                  Create New Prompt
                </Button>
              </Link>
              <Link href="/my-prompts">
                <Button variant="outline">
                  Manage My Prompts
                </Button>
              </Link>
              {data && data.earnings.available > 0 && (
                <Button variant="outline" disabled>
                  Request Withdrawal (Coming Soon)
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  );
}
