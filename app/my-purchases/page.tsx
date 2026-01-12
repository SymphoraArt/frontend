"use client";

import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShoppingBag, ExternalLink, Download, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Purchase {
  id: string;
  promptId: string;
  promptTitle: string;
  promptPreviewImageUrl: string | null;
  sellerId: string;
  amountCents: number;
  transactionHash: string;
  chainId: number;
  status: string;
  createdAt: string;
  variables?: Record<string, any>;
}

interface PurchaseResponse {
  userId: string;
  purchases: Purchase[];
  totalPurchases: number;
  totalSpentCents: number;
}

export default function MyPurchasesPage() {
  const account = useActiveAccount();
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPurchases() {
      if (!account?.address) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${account.address}/purchases`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch purchases");
        }

        const data: PurchaseResponse = await response.json();
        setPurchases(data.purchases || []);
        setTotalSpent(data.totalSpentCents || 0);
      } catch (err) {
        console.error("Error fetching purchases:", err);
        setError(err instanceof Error ? err.message : "Failed to load purchases");
      } finally {
        setLoading(false);
      }
    }

    fetchPurchases();
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
            <CardTitle>My Purchases</CardTitle>
            <CardDescription>Connect your wallet to view your purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Please connect your wallet to see your purchased prompts.
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
            <CardTitle>Error Loading Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive">{error}</p>
            <Button onClick={() => {
              setError(null);
              setLoading(true);
              if (account?.address) {
                fetch(`/api/users/${account.address}/purchases`, {
                  headers: { "Content-Type": "application/json" },
                })
                  .then(res => {
                    if (!res.ok) throw new Error("Failed to fetch purchases");
                    return res.json();
                  })
                  .then((data: PurchaseResponse) => {
                    setPurchases(data.purchases || []);
                    setTotalSpent(data.totalSpentCents || 0);
                    setError(null);
                  })
                  .catch(err => {
                    setError(err instanceof Error ? err.message : "Failed to load purchases");
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

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">My Purchases</h1>
        <p className="text-muted-foreground">
          View and manage all the prompts you've purchased
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Purchases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{purchases.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${(totalSpent / 100).toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {purchases.filter(p => {
                const purchaseDate = new Date(p.createdAt);
                const now = new Date();
                return purchaseDate.getMonth() === now.getMonth() &&
                       purchaseDate.getFullYear() === now.getFullYear();
              }).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      {purchases.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No purchases yet</h3>
            <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
              Browse the marketplace to discover and purchase amazing prompts created by the community.
            </p>
            <Link href="/showcase">
              <Button>
                Browse Marketplace
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        /* Purchases Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {purchases.map((purchase) => (
            <Card key={purchase.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {purchase.promptPreviewImageUrl && (
                <div className="relative h-48 w-full bg-muted">
                  <Image
                    src={purchase.promptPreviewImageUrl}
                    alt={purchase.promptTitle}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg line-clamp-2">
                    {purchase.promptTitle}
                  </CardTitle>
                  <Badge variant={purchase.status === 'completed' ? 'default' : 'secondary'}>
                    {purchase.status}
                  </Badge>
                </div>
                <CardDescription className="text-xs">
                  Purchased {new Date(purchase.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-semibold">
                      ${(purchase.amountCents / 100).toFixed(2)}
                    </span>
                  </div>

                  {purchase.transactionHash && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Transaction</span>
                      <a
                        href={`https://basescan.org/tx/${purchase.transactionHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary hover:underline"
                      >
                        View
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}

                  <div className="pt-3 border-t flex gap-2">
                    <Link href={`/showcase/${purchase.promptId}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Prompt
                      </Button>
                    </Link>
                    <Link href={`/editor?promptId=${purchase.promptId}`} className="flex-1">
                      <Button size="sm" className="w-full">
                        Use Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}
