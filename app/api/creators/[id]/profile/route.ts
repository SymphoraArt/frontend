/**
 * GET /api/creators/[id]/profile
 * Get creator profile with portfolio and stats
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: creatorId } = await params;

    const supabase = getSupabaseServerClient();

    // Get creator user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, username, display_name, avatar_url, cover_image_url, created_at')
      .eq('id', creatorId)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { success: false, error: 'Creator not found' },
        { status: 404 }
      );
    }

    // Get creator earnings
    const { data: earnings, error: earningsError } = await supabase
      .from('user_earnings')
      .select('*')
      .eq('user_id', creatorId)
      .single();

    // Handle missing table gracefully
    if (earningsError && earningsError.code !== 'PGRST116' && (earningsError.code === 'PGRST205' || earningsError.message?.includes('schema cache'))) {
      console.warn('[API] user_earnings table not found - using default earnings');
    } else if (earningsError && earningsError.code !== 'PGRST116') {
      console.error('[API] Error fetching earnings:', earningsError);
    }

    // Get creator's prompts from Supabase (ownership is user_id only).
    // There is no unlist mechanism in Supabase, so every row for this creator
    // is treated as an active listing.
    const { data: creatorPromptRows, error: creatorPromptsError } = await supabase
      .from('prompts')
      .select('id, title, price, uploaded_photos, created_at')
      .eq('user_id', creatorId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (creatorPromptsError) {
      console.error('[API] Error fetching creator prompts:', creatorPromptsError);
    }

    const listedPrompts = (creatorPromptRows || []).map((p) => ({
      id: p.id as string,
      title: p.title as string,
      priceUsdCents: typeof p.price === 'number' ? p.price : 0,
      previewImageUrl: Array.isArray(p.uploaded_photos)
        ? (p.uploaded_photos[0] as string | undefined)
        : undefined,
      listedAt: p.created_at as string | undefined,
    }));

    // Get recent sales
    const { data: recentSales, error: salesError } = await supabase
      .from('prompt_purchases')
      .select(`
        id,
        prompt_id,
        prompt_title,
        prompt_preview_image_url,
        amount_usd_cents,
        created_at
      `)
      .eq('seller_id', creatorId)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(10);

    // Handle missing table gracefully
    if (salesError && (salesError.code === 'PGRST205' || salesError.message?.includes('schema cache'))) {
      console.warn('[API] prompt_purchases table not found - returning empty recent sales');
    } else if (salesError) {
      console.error('[API] Error fetching recent sales:', salesError);
    }

    // Calculate stats
    const stats = {
      totalEarnings: earnings?.total_earnings_cents || 0,
      totalSales: earnings?.total_sales || 0,
      activePrompts: listedPrompts?.length || 0,
      averageRating: 0, // Would calculate from reviews
      totalPrompts: listedPrompts?.length || 0,
    };

    // Enrich prompts with additional data
    const featuredPrompts = listedPrompts.slice(0, 6).map((prompt) => ({
      id: prompt.id,
      title: prompt.title,
      priceUsdCents: prompt.priceUsdCents,
      previewImageUrl: prompt.previewImageUrl,
      listedAt: prompt.listedAt,
    }));

    return NextResponse.json({
      creator: {
        id: userData.id,
        username: userData.username,
        displayName: userData.display_name || userData.username,
        avatarUrl: userData.avatar_url,
        coverImageUrl: userData.cover_image_url,
        joinedAt: userData.created_at,
      },
      stats,
      featuredPrompts,
      recentSales: ((salesError && (salesError.code === 'PGRST205' || salesError.message?.includes('schema cache'))) ? [] : (recentSales || [])).map((sale: any) => ({
        id: sale.id,
        promptId: sale.prompt_id,
        promptTitle: sale.prompt_title,
        promptPreviewImageUrl: sale.prompt_preview_image_url,
        amountCents: sale.amount_usd_cents,
        createdAt: sale.created_at,
      })),
    });

  } catch (error) {
    console.error('Error fetching creator profile:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
