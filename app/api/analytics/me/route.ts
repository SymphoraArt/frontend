/**
 * GET /api/analytics/me → the signed-in user's own performance.
 *
 * Everything is DERIVED from live tables (verified 2026-07-12) — no counter
 * tables: prompt_purchases is the receipt-per-sale ledger (sum = earnings),
 * prompts (creator_id, price_usd_cents, is_free_showcase, listing_status),
 * generations (prompt_id) for per-prompt generation counts.
 *
 * Response:
 *   summary: totals + earnings per day/week/month/year, each with a trend %
 *            vs the PREVIOUS same-length period (null when previous = 0)
 *   prompts: per-prompt rows for the Analytics table (earnings, sales,
 *            generations; views/rating/comments are null until tracking
 *            tables exist — no fake numbers).
 */
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { resolveSessionUserId } from "@/lib/session-user";

const DAY_MS = 24 * 60 * 60 * 1000;

function sumBetween(rows: { cents: number; at: number }[], from: number, to: number): number {
  let s = 0;
  for (const r of rows) if (r.at >= from && r.at < to) s += r.cents;
  return s;
}

/** % change vs previous period; null when there's nothing to compare against. */
function trend(current: number, previous: number): number | null {
  if (previous <= 0) return null;
  return Math.round(((current - previous) / previous) * 100);
}

export async function GET(req: NextRequest) {
  const supabase = getSupabaseServerClient();
  const userId = await resolveSessionUserId(supabase, req.headers.get("X-Session-Token"));
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  // My prompts + my completed sales + generations on my prompts — three reads.
  // prompts.views exists only after 2026-07-12-prompt-engagement.sql ran —
  // degrade to a views-less select instead of failing.
  type PromptRow = {
    id: unknown; title?: string | null; prompt_type?: string | null; is_free_showcase?: boolean | null;
    price_usd_cents?: number | null; listing_status?: string | null; created_at?: string;
    views?: number | null; opens?: number | null;
  };
  // ?summary=1 → totals + recent sales only (the Payment tab): skips the
  // per-prompt joins entirely — noticeably faster than the full table load.
  const summaryOnly = req.nextUrl.searchParams.get("summary") === "1";
  const baseCols = "id, title, prompt_type, is_free_showcase, price_usd_cents, listing_status, created_at";
  // Prompts + sales in parallel — they don't depend on each other.
  const [primary, salesRes] = await Promise.all([
    supabase.from("prompts").select(`${baseCols}, views, opens`).eq("creator_id", userId),
    supabase
      .from("prompt_purchases")
      .select("prompt_id, amount_usd_cents, created_at")
      .eq("seller_id", userId)
      .eq("status", "completed"),
  ]);
  const fallback = primary.error
    ? await supabase.from("prompts").select(baseCols).eq("creator_id", userId)
    : null;
  const myPrompts = ((fallback ? fallback.data : primary.data) ?? []) as PromptRow[];
  const pErr = fallback ? fallback.error : null;
  const { data: sales, error: sErr } = salesRes;
  if (pErr || sErr) {
    console.error("[analytics/me] load failed:", pErr?.message || sErr?.message);
    return NextResponse.json({ error: "Failed to load analytics" }, { status: 500 });
  }

  const promptIds = (myPrompts ?? []).map((p) => String(p.id));
  const genCounts = new Map<string, number>();
  const commentStats = new Map<string, { count: number; sum: number; rated: number }>();
  if (promptIds.length > 0 && !summaryOnly) {
    const [{ data: gens }, comments] = await Promise.all([
      supabase.from("generations").select("prompt_id").in("prompt_id", promptIds),
      supabase.from("prompt_comments").select("prompt_id, rating").in("prompt_id", promptIds),
    ]);
    for (const g of gens ?? []) {
      const k = String(g.prompt_id);
      genCounts.set(k, (genCounts.get(k) ?? 0) + 1);
    }
    // prompt_comments may not be migrated yet → comments.error → stays empty.
    for (const c of comments.data ?? []) {
      const k = String(c.prompt_id);
      const s = commentStats.get(k) ?? { count: 0, sum: 0, rated: 0 };
      s.count += 1;
      if (typeof c.rating === "number") { s.sum += c.rating; s.rated += 1; }
      commentStats.set(k, s);
    }
  }

  // ── Summary: totals + period sums with trends vs the previous period ──────
  const saleRows = (sales ?? []).map((s) => ({
    cents: typeof s.amount_usd_cents === "number" ? s.amount_usd_cents : 0,
    at: new Date(s.created_at as string).getTime(),
    promptId: String(s.prompt_id),
  }));
  const now = Date.now();
  const period = (days: number) => {
    const cur = sumBetween(saleRows, now - days * DAY_MS, now);
    const prev = sumBetween(saleRows, now - 2 * days * DAY_MS, now - days * DAY_MS);
    return { cents: cur, trendPct: trend(cur, prev) };
  };

  const summary = {
    totalCents: saleRows.reduce((s, r) => s + r.cents, 0),
    salesCount: saleRows.length,
    day: period(1),
    week: period(7),
    month: period(30),
    year: period(365),
  };

  // ── Per-prompt table rows ──────────────────────────────────────────────────
  const earningsByPrompt = new Map<string, { cents: number; sales: number }>();
  for (const r of saleRows) {
    const e = earningsByPrompt.get(r.promptId) ?? { cents: 0, sales: 0 };
    e.cents += r.cents;
    e.sales += 1;
    earningsByPrompt.set(r.promptId, e);
  }

  const prompts = summaryOnly ? [] : (myPrompts ?? []).map((p) => {
    const id = String(p.id);
    const isFree =
      p.is_free_showcase === true || p.prompt_type === "showcase" || p.prompt_type === "free-prompt" ||
      (typeof p.price_usd_cents === "number" ? p.price_usd_cents : 0) === 0;
    const e = earningsByPrompt.get(id);
    return {
      id,
      title: p.title ?? "Untitled",
      type: (isFree ? "free" : "paid") as "free" | "paid",
      priceCents: typeof p.price_usd_cents === "number" ? p.price_usd_cents : 0,
      listingStatus: p.listing_status ?? null,
      createdAt: p.created_at,
      earningsCents: e?.cents ?? 0,
      sales: e?.sales ?? 0,
      generations: genCounts.get(id) ?? 0,
      // Live once 2026-07-12-prompt-engagement.sql ran; null (UI: "—") before.
      views: typeof p.views === "number" ? p.views : null,
      opens: typeof p.opens === "number" ? p.opens : null,
      rating: (() => {
        const s = commentStats.get(id);
        return s && s.rated > 0 ? Math.round((s.sum / s.rated) * 10) / 10 : null;
      })(),
      comments: commentStats.get(id)?.count ?? 0,
      referralEarningsCents: null as number | null, // referral payouts not server-side yet
    };
  });

  // Last 5 receipts for the Payment tab's mini list.
  const titleById = new Map((myPrompts ?? []).map((p) => [String(p.id), p.title ?? "Untitled"]));
  const recentSales = [...saleRows]
    .sort((a, b) => b.at - a.at)
    .slice(0, 5)
    .map((r, i) => ({
      id: `${r.promptId}-${r.at}-${i}`,
      promptTitle: titleById.get(r.promptId) ?? "Untitled",
      amountCents: r.cents,
      createdAt: new Date(r.at).toISOString(),
    }));

  return NextResponse.json({ summary, prompts, recentSales });
}
