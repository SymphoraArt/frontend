/**
 * GET /api/users/[id]/earnings
 * Get creator earnings and sales statistics
 */

import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { connectDB, getPool } from "@/backend/db-mysql";
import type { RowDataPacket } from "mysql2/promise";

interface EarningsRow extends RowDataPacket {
  total_earnings_cents: number;
  total_sales: number;
  total_prompts_listed: number;
  pending_earnings_cents: number;
  available_earnings_cents: number;
  earnings_this_month_cents: number;
  earnings_this_week_cents: number;
  sales_this_month: number;
}

interface SaleRow extends RowDataPacket {
  id: string;
  prompt_id: string;
  prompt_title: string | null;
  prompt_preview_image_url: string | null;
  buyer_id: string;
  amount_usd_cents: number;
  created_at: Date;
}

interface TopPromptRow extends RowDataPacket {
  prompt_id: string;
  description: string | null;
  total_sales: number;
  total_revenue_cents: number;
  total_views: number;
}

interface SupabaseSale {
  id: string;
  prompt_id: string;
  prompt_title?: string | null;
  prompt_preview_image_url?: string | null;
  buyer_id: string;
  amount_usd_cents: number;
  created_at: string;
}

async function getMysqlEarnings(userId: string) {
  await connectDB();
  const pool = getPool();
  if (!pool) return null;

  const [earningsRows] = await pool.execute<EarningsRow[]>(
    `SELECT * FROM user_earnings WHERE user_id = ? LIMIT 1`,
    [userId]
  );
  const earnings = earningsRows[0] ?? null;

  const [salesRows] = await pool.execute<SaleRow[]>(
    `SELECT id, prompt_id, prompt_title, prompt_preview_image_url, buyer_id, amount_usd_cents, created_at
     FROM prompt_purchases
     WHERE seller_id = ? AND status = 'completed'
     ORDER BY created_at DESC
     LIMIT 10`,
    [userId]
  );

  const [topRows] = await pool.execute<TopPromptRow[]>(
    `SELECT prompt_id, description, total_sales, total_revenue_cents, total_views
     FROM marketplace_prompts
     WHERE seller_id = ? AND listing_status = 'active'
     ORDER BY total_revenue_cents DESC
     LIMIT 5`,
    [userId]
  );

  const fallback = {
    total_earnings_cents: 0,
    total_sales: 0,
    total_prompts_listed: 0,
    pending_earnings_cents: 0,
    available_earnings_cents: 0,
    earnings_this_month_cents: 0,
    earnings_this_week_cents: 0,
    sales_this_month: 0,
  };
  const e = earnings ?? fallback;

  return NextResponse.json({
    userId,
    earnings: {
      total: e.total_earnings_cents,
      thisMonth: e.earnings_this_month_cents,
      thisWeek: e.earnings_this_week_cents,
      pending: e.pending_earnings_cents,
      available: e.available_earnings_cents,
    },
    sales: {
      total: e.total_sales,
      thisMonth: e.sales_this_month,
      thisWeek: 0,
    },
    listings: {
      total: e.total_prompts_listed,
      active: e.total_prompts_listed,
      draft: 0,
      paused: 0,
    },
    recentSales: salesRows.map((sale) => ({
      id: sale.id,
      promptId: sale.prompt_id,
      promptTitle: sale.prompt_title || "Unknown Prompt",
      promptPreviewImageUrl: sale.prompt_preview_image_url || null,
      buyerId: sale.buyer_id,
      amountCents: sale.amount_usd_cents,
      createdAt: sale.created_at,
    })),
    topPrompts: topRows.map((prompt) => {
      const conversionRate =
        prompt.total_views > 0 ? (prompt.total_sales / prompt.total_views) * 100 : 0;
      return {
        promptId: prompt.prompt_id,
        title: prompt.description || `Prompt ${prompt.prompt_id}`,
        sales: prompt.total_sales,
        revenue: prompt.total_revenue_cents,
        conversionRate: Math.round(conversionRate * 10) / 10,
      };
    }),
  });
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: userId } = await params;

    if (process.env.SUPABASE_URL?.includes("mock.supabase.co")) {
      const mysqlResponse = await getMysqlEarnings(userId);
      if (mysqlResponse) return mysqlResponse;
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
      recentSales: ((salesError && (salesError.code === 'PGRST205' || salesError.message?.includes('schema cache'))) ? [] : ((recentSales || []) as SupabaseSale[])).map((sale) => ({
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
    console.error('Error fetching user earnings:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
