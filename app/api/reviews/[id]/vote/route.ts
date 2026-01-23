/**
 * POST /api/reviews/[id]/vote
 * Vote on review helpfulness
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";

const voteSchema = z.object({
  voteType: z.enum(['helpful', 'unhelpful']),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: reviewId } = await params;

    // Authenticate user
    const authUser = await requireAuth(request);

    // Parse request body
    const body = await request.json();
    const validation = voteSchema.safeParse(body);

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

    const { voteType } = validation.data;

    const supabase = getSupabaseServerClient();

    // Check if user has already voted
    const { data: existingVote } = await supabase
      .from('review_votes')
      .select('id, vote_type')
      .eq('review_id', reviewId)
      .eq('user_id', authUser.userId)
      .single();

    if (existingVote) {
      // Update existing vote if different
      if (existingVote.vote_type !== voteType) {
        const { error: updateError } = await supabase
          .from('review_votes')
          .update({ vote_type: voteType })
          .eq('id', existingVote.id);

        if (updateError) {
          return NextResponse.json(
            { success: false, error: 'Failed to update vote' },
            { status: 500 }
          );
        }
      }
    } else {
      // Create new vote
      const { error: insertError } = await supabase
        .from('review_votes')
        .insert({
          review_id: reviewId,
          user_id: authUser.userId,
          vote_type: voteType,
        });

      if (insertError) {
        return NextResponse.json(
          { success: false, error: 'Failed to vote on review' },
          { status: 500 }
        );
      }
    }

    // Update helpful votes count (only count helpful votes)
    if (voteType === 'helpful') {
      const { error: countError } = await supabase.rpc('increment_review_helpful_votes', {
        p_review_id: reviewId,
      });

      if (countError) {
        console.error('Error updating helpful votes:', countError);
        // Don't fail the request - vote was recorded
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Vote recorded successfully',
    });

  } catch (error) {
    console.error('Error in POST /api/reviews/[id]/vote:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
