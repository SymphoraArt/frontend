/**
 * GET /api/prompts/[id]/reviews
 * POST /api/prompts/[id]/reviews
 * Review management for prompts
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  title: z.string().max(200).optional(),
  content: z.string().min(10).max(2000),
  pros: z.array(z.string().max(200)).max(5).optional(),
  cons: z.array(z.string().max(200)).max(5).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: promptId } = await params;
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const cursor = searchParams.get('cursor');

    const supabase = getSupabaseServerClient();

    // Get reviews with pagination
    let query = supabase
      .from('prompt_reviews')
      .select(`
        id,
        rating,
        title,
        content,
        pros,
        cons,
        helpful_votes,
        verified_purchase,
        created_at,
        reviewer_id
      `)
      .eq('prompt_id', promptId)
      .eq('status', 'approved')
      .order('helpful_votes', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit + 1);

    if (cursor) {
      query = query.lt('created_at', cursor);
    }

    const { data: reviews, error: reviewsError } = await query;

    if (reviewsError) {
      console.error('Error fetching reviews:', reviewsError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch reviews' },
        { status: 500 }
      );
    }

    // Get reviewer information
    const reviewerIds = [...new Set(reviews?.map(r => r.reviewer_id) || [])];
    const { data: reviewers, error: reviewersError } = await supabase
      .from('users')
      .select('id, username, display_name, avatar_url')
      .in('id', reviewerIds);

    const reviewersMap = new Map(
      reviewers?.map(r => [r.id, r]) || []
    );

    // Calculate summary statistics
    const { data: summaryData, error: summaryError } = await supabase
      .rpc('get_review_summary', { p_prompt_id: promptId });

    const summary = summaryData?.[0] || {
      average_rating: 0,
      total_reviews: 0,
      rating_distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };

    // Enrich reviews with reviewer info
    const enrichedReviews = (reviews || []).slice(0, limit).map((review: any) => {
      const reviewer = reviewersMap.get(review.reviewer_id);
      return {
        id: review.id,
        reviewer: reviewer ? {
          id: reviewer.id,
          displayName: reviewer.display_name || reviewer.username,
          username: reviewer.username,
          avatarUrl: reviewer.avatar_url,
        } : null,
        rating: review.rating,
        title: review.title,
        content: review.content,
        pros: review.pros || [],
        cons: review.cons || [],
        helpfulVotes: review.helpful_votes,
        verifiedPurchase: review.verified_purchase,
        createdAt: review.created_at,
      };
    });

    const hasMore = (reviews || []).length > limit;
    const nextCursor = hasMore ? enrichedReviews[enrichedReviews.length - 1]?.createdAt : undefined;

    return NextResponse.json({
      reviews: enrichedReviews,
      pagination: {
        hasMore,
        nextCursor,
      },
      summary: {
        averageRating: summary.average_rating || 0,
        totalReviews: summary.total_reviews || 0,
        ratingDistribution: summary.rating_distribution || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      },
    });

  } catch (error) {
    console.error('Error in GET /api/prompts/[id]/reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: promptId } = await params;

    // Authenticate user
    const authUser = await requireAuth(request);

    // Parse request body
    const body = await request.json();
    const validation = reviewSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validation.error.issues
        },
        { status: 400 }
      );
    }

    const { rating, title, content, pros, cons } = validation.data;

    const supabase = getSupabaseServerClient();

    // Check if user has already reviewed this prompt
    const { data: existingReview } = await supabase
      .from('prompt_reviews')
      .select('id')
      .eq('prompt_id', promptId)
      .eq('reviewer_id', authUser.userId)
      .single();

    if (existingReview) {
      return NextResponse.json(
        { success: false, error: 'You have already reviewed this prompt' },
        { status: 400 }
      );
    }

    // Check if user has purchased this prompt (for verified purchase badge)
    const { data: purchase, error: purchaseCheckError } = await supabase
      .from('prompt_purchases')
      .select('id')
      .eq('prompt_id', promptId)
      .eq('buyer_id', authUser.userId)
      .eq('status', 'completed')
      .single();

    // Handle missing table gracefully - just skip verified purchase check
    if (purchaseCheckError && (purchaseCheckError.code === 'PGRST205' || purchaseCheckError.message?.includes('schema cache'))) {
      console.warn('[API] prompt_purchases table not found - skipping verified purchase check');
    }

    // Insert review
    const { data: review, error: reviewError } = await supabase
      .from('prompt_reviews')
      .insert({
        prompt_id: promptId,
        reviewer_id: authUser.userId,
        rating,
        title: title || null,
        content,
        pros: pros || [],
        cons: cons || [],
        verified_purchase: !!purchase,
        status: 'pending', // Will be moderated
      })
      .select()
      .single();

    if (reviewError) {
      console.error('Error creating review:', reviewError);
      return NextResponse.json(
        { success: false, error: 'Failed to create review' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      review: {
        id: review.id,
        rating: review.rating,
        title: review.title,
        content: review.content,
        status: review.status,
      },
      message: 'Review submitted successfully. It will be visible after moderation.',
    });

  } catch (error) {
    console.error('Error in POST /api/prompts/[id]/reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
