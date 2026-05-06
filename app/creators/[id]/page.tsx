"use client";

import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DollarSign, 
  ShoppingCart, 
  Star, 
  Sparkles,
  Calendar,
  TrendingUp
} from "lucide-react";
import { useRouter } from "next/navigation";
import PromptCard from "@/components/PromptCard";
import { ReviewsSection } from "@/components/ReviewsSection";

export default function CreatorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: creatorId } = use(params);
  const router = useRouter();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: [`/api/creators/${creatorId}/profile`],
    queryFn: async () => {
      const res = await fetch(`/api/creators/${creatorId}/profile`);
      if (!res.ok) throw new Error("Failed to fetch creator profile");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Loading creator profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <p className="text-destructive">Failed to load creator profile</p>
          </div>
        </div>
      </div>
    );
  }

  const { creator, stats, featuredPrompts, recentSales } = profile;

  const formatCurrency = (cents: number) => `$${(cents / 100).toFixed(2)}`;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header Section */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={creator.avatarUrl} />
                <AvatarFallback className="text-2xl">
                  {creator.displayName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{creator.displayName}</h1>
                <p className="text-muted-foreground mb-2">@{creator.username}</p>
                {creator.bio && (
                  <p className="text-sm text-foreground/80 mb-3 max-w-2xl">{creator.bio}</p>
                )}
                {creator.niches && creator.niches.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {creator.niches.map((niche: string) => (
                      <Badge key={niche} variant="secondary" className="text-xs">
                        {niche}
                      </Badge>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {formatDate(creator.joinedAt)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">
                  {formatCurrency(stats.totalEarnings)}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Sales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{stats.totalSales}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Prompts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{stats.activePrompts}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Rating
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary fill-primary" />
                <span className="text-2xl font-bold">
                  {stats.averageRating > 0 ? stats.averageRating.toFixed(1) : 'N/A'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="prompts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="prompts">Prompts</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="prompts" className="space-y-4">
            {featuredPrompts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {featuredPrompts.map((prompt: any) => (
                  <PromptCard
                    key={prompt.id}
                    id={prompt.id}
                    title={prompt.title}
                    artist={creator.displayName}
                    priceUsdCents={prompt.priceUsdCents}
                    isListed={true}
                    licenseType={prompt.licenseType}
                    totalSales={prompt.totalSales}
                    rating={prompt.avgRating}
                    downloads={prompt.totalSales}
                    thumbnail={prompt.previewImageUrl || ""}
                    isFree={prompt.priceUsdCents === 0}
                    onClick={() => router.push(`/generator/${prompt.id}`)}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No prompts listed yet</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsSection
              promptId={""} // Would need to show reviews for all prompts or a specific one
              promptTitle={creator.displayName}
              userHasPurchased={false}
            />
            <p className="text-sm text-muted-foreground mt-4">
              Note: Reviews are shown per prompt. Visit individual prompts to see their reviews.
            </p>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            {recentSales.length > 0 ? (
              <div className="space-y-2">
                {recentSales.map((sale: any) => (
                  <Card key={sale.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        {sale.promptPreviewImageUrl && (
                          <img
                            src={sale.promptPreviewImageUrl}
                            alt={sale.promptTitle}
                            className="w-16 h-16 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-medium">{sale.promptTitle}</h4>
                          <p className="text-sm text-muted-foreground">
                            Sold for {formatCurrency(sale.amountCents)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(sale.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="secondary">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Sale
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No recent activity</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
