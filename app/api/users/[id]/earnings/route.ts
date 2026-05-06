/**
 * GET /api/users/[id]/earnings
 * Get creator earnings and sales statistics
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { requireAuth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authUser = await requireAuth(request);
    const { id: userId } = await params;

    if (authUser.userId !== userId.toLowerCase()) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const supabase = getSupabaseServerClient();

    // Get user earnings
    const { data: earnings, error: earningsError } = await supabase
      .from('user_earnings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (earningsError && earningsError.code !== 'PGRST116') { // PGRST116 = not found
      console.error('Error fetching earnings:', earningsError);
      
      // Handle missing table gracefully (PGRST205 = table not found)
      if (earningsError.code === 'PGRST205' || earningsError.message?.includes('schema cache')) {
        console.warn('[API] user_earnings table not found - returning default earnings');
        // Continue with default earnings data below
      } else {
        return NextResponse.json(
          { success: false, error: `Failed to fetch earnings data: ${earningsError.message || 'Database error'}` },
          { status: 500 }
        );
      }
    }

    // Get recent sales (last 10)
    // Includes denormalized prompt_title to prevent N+1 queries
    const { data: recentSales, error: salesError } = await supabase
      .from('prompt_purchases')
      .select(`
        id,
        prompt_id,
        prompt_title,
        prompt_preview_image_url,
        buyer_id,
        amount_usd_cents,
        created_at
      `)
      .eq('seller_id', userId)
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(10);

    if (salesError) {
      console.error('Error fetching recent sales:', salesError);
      
      // Handle missing table gracefully (PGRST205 = table not found)
      if (salesError.code === 'PGRST205' || salesError.message?.includes('schema cache')) {
        console.warn('[API] prompt_purchases table not found - returning empty sales list');
        // Continue with empty recentSales array below
      } else {
        return NextResponse.json(
          { success: false, error: `Failed to fetch sales data: ${salesError.message || 'Database error'}` },
          { status: 500 }
        );
      }
    }

    // Get top performing prompts from marketplace_prompts table
    const { data: topPromptsData, error: topPromptsError } = await supabase
      .from('marketplace_prompts')
      .select('prompt_id, total_sales, total_revenue_cents, total_views')
      .eq('seller_id', userId)
      .eq('listing_status', 'active')
      .order('total_revenue_cents', { ascending: false })
      .limit(5);

    // Handle missing marketplace_prompts table gracefully
    if (topPromptsError && (topPromptsError.code === 'PGRST205' || topPromptsError.message?.includes('schema cache'))) {
      console.warn('[API] marketplace_prompts table not found - returning empty top prompts list');
    } else if (topPromptsError) {
      console.warn('[API] Error fetching top prompts:', topPromptsError);
    }

    // Enrich with prompt titles from MongoDB
    const topPrompts = [];
    if (!topPromptsError && topPromptsData && topPromptsData.length > 0) {
      const { storage } = await import('@/backend/storage');

      for (const promptData of topPromptsData) {
        try {
          const prompt = await storage.getPrompt(promptData.prompt_id);
          const conversionRate = promptData.total_views > 0
            ? (promptData.total_sales / promptData.total_views) * 100
            : 0;

          topPrompts.push({
            promptId: promptData.prompt_id,
            title: prompt?.title || `Prompt ${promptData.prompt_id.slice(-8)}`,
            sales: promptData.total_sales,
            revenue: promptData.total_revenue_cents,
            conversionRate: Math.round(conversionRate * 10) / 10,
          });
        } catch (error) {
          console.error(`Failed to fetch prompt ${promptData.prompt_id}:`, error);
          // Include anyway with placeholder title
          topPrompts.push({
            promptId: promptData.prompt_id,
            title: `Prompt ${promptData.prompt_id.slice(-8)}`,
            sales: promptData.total_sales,
            revenue: promptData.total_revenue_cents,
            conversionRate: 0,
          });
        }
      }
    }

    // Calculate summary statistics
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const earningsData = earnings || {
      total_earnings_cents: 0,
      total_sales: 0,
      total_prompts_listed: 0,
      pending_earnings_cents: 0,
      available_earnings_cents: 0,
      earnings_this_month_cents: 0,
      earnings_this_week_cents: 0,
      sales_this_month: 0,
    };

    return NextResponse.json({
      userId,
      earnings: {
        total: earningsData.total_earnings_cents,
        thisMonth: earningsData.earnings_this_month_cents,
        thisWeek: earningsData.earnings_this_week_cents,
        pending: earningsData.pending_earnings_cents,
        available: earningsData.available_earnings_cents,
      },
      sales: {
        total: earningsData.total_sales,
        thisMonth: earningsData.sales_this_month,
        thisWeek: 0, // Would need to calculate from purchases
      },
      listings: {
        total: earningsData.total_prompts_listed,
        active: earningsData.total_prompts_listed, // Mock - would need to query prompts
        draft: 0,
        paused: 0,
      },
      recentSales: ((salesError && (salesError.code === 'PGRST205' || salesError.message?.includes('schema cache'))) ? [] : (recentSales || [])).map((sale: any) => ({
        id: sale.id,
        promptId: sale.prompt_id,
        promptTitle: sale.prompt_title || 'Unknown Prompt', // Denormalized - no N+1 query needed
        promptPreviewImageUrl: sale.prompt_preview_image_url || null,
        buyerId: sale.buyer_id,
        amountCents: sale.amount_usd_cents,
        createdAt: sale.created_at,
      })),
      topPrompts,
    });

  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Authentication failed")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error('Error fetching user earnings:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}