"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, CheckCircle, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ReviewForm } from "./ReviewForm";
import { useActiveAccount } from "thirdweb/react";

interface Review {
  id: string;
  reviewer: {
    id: string;
    displayName: string;
    username: string;
    avatarUrl?: string;
  };
  rating: number;
  title?: string;
  content: string;
  pros?: string[];
  cons?: string[];
  helpfulVotes: number;
  verifiedPurchase: boolean;
  createdAt: string;
  userVote?: 'helpful' | 'unhelpful';
}

interface ReviewsSectionProps {
  promptId: string;
  promptTitle: string;
  userHasPurchased?: boolean;
}

export function ReviewsSection({ promptId, promptTitle, userHasPurchased }: ReviewsSectionProps) {
  const account = useActiveAccount();
  const [showReviewForm, setShowReviewForm] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<{
    reviews: Review[];
    summary: {
      averageRating: number;
      totalReviews: number;
      ratingDistribution: { [key: number]: number };
    };
  }>({
    queryKey: [`/api/prompts/${promptId}/reviews`],
    queryFn: async () => {
      const res = await fetch(`/api/prompts/${promptId}/reviews`);
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    },
  });

  const voteMutation = useMutation({
    mutationFn: async ({ reviewId, voteType }: { reviewId: string; voteType: 'helpful' | 'unhelpful' }) => {
      const res = await fetch(`/api/reviews/${reviewId}/vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voteType }),
      });
      if (!res.ok) throw new Error("Failed to vote");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/prompts/${promptId}/reviews`] });
    },
  });

  const handleVote = (reviewId: string, voteType: 'helpful' | 'unhelpful') => {
    if (!account) return;
    voteMutation.mutate({ reviewId, voteType });
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Failed to load reviews</p>
        </CardContent>
      </Card>
    );
  }

  const { reviews, summary } = data;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? 'fill-primary text-primary'
            : 'fill-muted text-muted-foreground'
        }`}
      />
    ));
  };

  const getRatingPercentage = (rating: number) => {
    const count = summary.ratingDistribution[rating] || 0;
    const total = summary.totalReviews || 1;
    return (count / total) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Summary Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reviews</CardTitle>
            {account && userHasPurchased && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowReviewForm(true)}
              >
                Write a Review
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Average Rating */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-4xl font-bold">{summary.averageRating.toFixed(1)}</div>
                <div className="flex items-center gap-1 mt-1">
                  {renderStars(Math.round(summary.averageRating))}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {summary.totalReviews} {summary.totalReviews === 1 ? 'review' : 'reviews'}
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const percentage = getRatingPercentage(rating);
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm">{rating}</span>
                      <Star className="h-3 w-3 fill-primary text-primary" />
                    </div>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-12 text-right">
                      {summary.ratingDistribution[rating] || 0}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Review Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={review.reviewer.avatarUrl} />
                        <AvatarFallback>
                          {review.reviewer.displayName.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.reviewer.displayName}</span>
                          {review.verifiedPurchase && (
                            <Badge variant="secondary" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {renderStars(review.rating)}
                          <span className="text-xs text-muted-foreground ml-2">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Review Content */}
                  {review.title && (
                    <h4 className="font-semibold">{review.title}</h4>
                  )}
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {review.content}
                  </p>

                  {/* Pros and Cons */}
                  {((review.pros?.length || 0) > 0 || (review.cons?.length || 0) > 0) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {review.pros && review.pros.length > 0 && (
                        <div>
                          <div className="text-xs font-medium text-green-600 mb-1">Pros</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {review.pros.map((pro, i) => (
                              <li key={i}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {review.cons && review.cons.length > 0 && (
                        <div>
                          <div className="text-xs font-medium text-red-600 mb-1">Cons</div>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            {review.cons.map((con, i) => (
                              <li key={i}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Helpful Votes */}
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVote(review.id, 'helpful')}
                      disabled={!account || voteMutation.isPending}
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpfulVotes})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
            {account && userHasPurchased && (
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setShowReviewForm(true)}
              >
                Write the First Review
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          promptId={promptId}
          promptTitle={promptTitle}
          isOpen={showReviewForm}
          onClose={() => setShowReviewForm(false)}
          onSuccess={() => {
            setShowReviewForm(false);
            queryClient.invalidateQueries({ queryKey: [`/api/prompts/${promptId}/reviews`] });
          }}
        />
      )}
    </div>
  );
}
