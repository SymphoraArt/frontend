"use client";

import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ConnectWallet } from "@/components/ConnectWallet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, DollarSign, ShoppingBag, FileText, ImageIcon, TrendingUp, Eye, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface DashboardData {
  earnings: {
    total: number;
    thisMonth: number;
    available: number;
  };
  sales: {
    total: number;
    thisMonth: number;
  };
  purchases: {
    total: number;
    recent: Array<{
      id: string;
      promptTitle: string;
      promptPreviewImageUrl: string | null;
      amountCents: number;
      createdAt: string;
    }>;
  };
  listings: {
    active: number;
    total: number;
  };
}

export default function DashboardPage() {
  const account = useActiveAccount();
  const authenticated = !!account;
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      if (!account?.address) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Fetch earnings
        const earningsResponse = await fetch(`/api/users/${account.address}/earnings`);
        const earningsData = earningsResponse.ok ? await earningsResponse.json() : null;

        // Fetch purchases
        const purchasesResponse = await fetch(`/api/users/${account.address}/purchases`);
        const purchasesData = purchasesResponse.ok ? await purchasesResponse.json() : null;

        setData({
          earnings: {
            total: earningsData?.earnings?.total || 0,
            thisMonth: earningsData?.earnings?.thisMonth || 0,
            available: earningsData?.earnings?.available || 0,
          },
          sales: {
            total: earningsData?.sales?.total || 0,
            thisMonth: earningsData?.sales?.thisMonth || 0,
          },
          purchases: {
            total: purchasesData?.totalPurchases || 0,
            recent: (purchasesData?.purchases || []).slice(0, 5),
          },
          listings: {
            active: earningsData?.listings?.active || 0,
            total: earningsData?.listings?.total || 0,
          },
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, [account?.address]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background pt-16">

        <main className="w-full px-6 lg:px-8 py-10 max-w-5xl mx-auto">
          <Card className="border border-border/60 bg-card/60 backdrop-blur">
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Connect your wallet to view your dashboard.
              </p>
              <ConnectWallet />
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-16">

        <main className="w-full px-6 lg:px-8 py-10 max-w-6xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  const isCreator = data && data.sales.total > 0;

  return (
    <div className="min-h-screen bg-background pt-16">

      <main className="w-full px-6 lg:px-8 py-10 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your activity.
          </p>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
              <div className="text-2xl font-bold">
                ${((data?.earnings.total || 0) / 100).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This month: ${((data?.earnings.thisMonth || 0) / 100).toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Purchases
                </CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.purchases.total || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Prompts owned
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Listings
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.listings.active || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {data?.sales.total || 0} total sales
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Available Balance
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${((data?.earnings.available || 0) / 100).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Ready to withdraw
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Purchases */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Purchases</CardTitle>
                  <CardDescription>Your latest prompt purchases</CardDescription>
                </div>
                <Link href="/my-purchases">
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {data?.purchases.recent && data.purchases.recent.length > 0 ? (
                <div className="space-y-3">
                  {data.purchases.recent.map((purchase) => (
                    <div
                      key={purchase.id}
                      className="flex items-center gap-4 p-3 rounded-lg border bg-card"
                    >
                      {purchase.promptPreviewImageUrl && (
                        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <Image
                            src={purchase.promptPreviewImageUrl}
                            alt={purchase.promptTitle}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate text-sm">{purchase.promptTitle}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(purchase.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-sm">
                          ${(purchase.amountCents / 100).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  No purchases yet. Browse the marketplace to get started!
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Get started with common tasks</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Link href="/editor">
                <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                  <Plus className="h-5 w-5" />
                  <span className="text-xs">Create Prompt</span>
                </Button>
              </Link>
              <Link href="/showcase">
                <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                  <Eye className="h-5 w-5" />
                  <span className="text-xs">Browse Marketplace</span>
                </Button>
              </Link>
              <Link href="/my-gallery">
                <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                  <ImageIcon className="h-5 w-5" />
                  <span className="text-xs">My Gallery</span>
                </Button>
              </Link>
              <Link href="/my-prompts">
                <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                  <FileText className="h-5 w-5" />
                  <span className="text-xs">My Prompts</span>
                </Button>
              </Link>
              {isCreator && (
                <>
                  <Link href="/my-earnings">
                    <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                      <DollarSign className="h-5 w-5" />
                      <span className="text-xs">My Earnings</span>
                    </Button>
                  </Link>
                  <Link href="/my-purchases">
                    <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                      <ShoppingBag className="h-5 w-5" />
                      <span className="text-xs">My Purchases</span>
                    </Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Creator Stats (if applicable) */}
        {isCreator && (
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Creator Stats</CardTitle>
                  <CardDescription>Your performance as a creator</CardDescription>
                </div>
                <Link href="/my-earnings">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                  <p className="text-2xl font-bold">{data?.sales.total || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">{data?.sales.thisMonth || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Prompts</p>
                  <p className="text-2xl font-bold">{data?.listings.active || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold">
                    ${((data?.earnings.thisMonth || 0) / 100).toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
