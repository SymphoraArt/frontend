"use client";

/**
 * Analytics — the signed-in user's own performance, shown in the /home shell's
 * right panel. Summary cards (day/week/month/year earnings with trend vs the
 * previous period) + a per-prompt table with free/paid filter and sorting.
 * Data: /api/analytics/me — everything derived from real purchase receipts.
 */
import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import { sessionAuthHeaders } from "@/lib/session-headers";

interface PromptRow {
  id: string;
  title: string;
  type: "free" | "paid";
  priceCents: number;
  createdAt: string;
  earningsCents: number;
  sales: number;
  generations: number;
  views: number | null;
  opens: number | null;
  rating: number | null;
  comments: number | null;
  referralEarningsCents: number | null;
}
interface Summary {
  totalCents: number;
  salesCount: number;
  day: { cents: number; trendPct: number | null };
  week: { cents: number; trendPct: number | null };
  month: { cents: number; trendPct: number | null };
  year: { cents: number; trendPct: number | null };
}

type Filter = "all" | "free" | "paid";
type SortKey = "earnings" | "sales" | "generations" | "views" | "opens" | "rating" | "comments" | "newest";

const usd = (cents: number) => `$${(cents / 100).toFixed(2)}`;

function Trend({ pct }: { pct: number | null }) {
  if (pct === null) return <span style={{ color: "var(--enki-ink-3)", fontSize: 11 }}>—</span>;
  const up = pct >= 0;
  return (
    <span style={{ color: up ? "#1f8a5b" : "#e0392b", fontSize: 11, fontWeight: 700 }}>
      {up ? "↑" : "↓"} {up ? "+" : ""}{pct}%
    </span>
  );
}

export default function AnalyticsPanel() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [rows, setRows] = useState<PromptRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [sort, setSort] = useState<SortKey>("earnings");

  useEffect(() => {
    let dead = false;
    (async () => {
      try {
        const res = await fetch("/api/analytics/me", { headers: sessionAuthHeaders() });
        if (!res.ok) throw new Error((await res.json())?.error || "Failed to load");
        const data = await res.json();
        if (!dead) { setSummary(data.summary); setRows(data.prompts); }
      } catch (e) {
        if (!dead) setError(e instanceof Error ? e.message : "Failed to load");
      }
    })();
    return () => { dead = true; };
  }, []);

  const visible = useMemo(() => {
    if (!rows) return [];
    const filtered = filter === "all" ? rows : rows.filter((r) => r.type === filter);
    const n = (v: number | null) => v ?? -1; // "no data" sorts below 0
    const by: Record<SortKey, (a: PromptRow, b: PromptRow) => number> = {
      earnings: (a, b) => b.earningsCents - a.earningsCents,
      sales: (a, b) => b.sales - a.sales,
      generations: (a, b) => b.generations - a.generations,
      views: (a, b) => n(b.views) - n(a.views),
      opens: (a, b) => n(b.opens) - n(a.opens),
      rating: (a, b) => n(b.rating) - n(a.rating),
      comments: (a, b) => n(b.comments) - n(a.comments),
      newest: (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    };
    return [...filtered].sort(by[sort]);
  }, [rows, filter, sort]);

  if (error) return <p style={{ fontSize: 13, color: "var(--enki-ink-3)", padding: 8 }}>{error}</p>;
  if (!summary || !rows) return <div style={{ padding: 16 }}><Loader2 size={18} className="animate-spin" /></div>;

  const CARDS = [
    { label: "Today", ...summary.day },
    { label: "This week", ...summary.week },
    { label: "This month", ...summary.month },
    { label: "This year", ...summary.year },
  ];

  const cell = { padding: "10px 12px", fontSize: 12.5, color: "var(--enki-ink)", borderBottom: "1px solid var(--enki-rule)" } as const;
  const th = { ...cell, fontSize: 10, letterSpacing: "1px", textTransform: "uppercase" as const, color: "var(--enki-ink-3)", fontFamily: "var(--font-jetbrains-mono), monospace" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* ── Earnings summary ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8 }}>
        {CARDS.map((c) => (
          <div key={c.label} style={{ border: "1px solid var(--enki-rule)", borderRadius: 10, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, letterSpacing: "1px", textTransform: "uppercase", color: "var(--enki-ink-3)", marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: "var(--enki-ink)" }}>{usd(c.cents)}</div>
            <Trend pct={c.trendPct} />
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: "var(--enki-ink-3)" }}>
        All-time: <b style={{ color: "var(--enki-ink)" }}>{usd(summary.totalCents)}</b> from {summary.salesCount} sale{summary.salesCount === 1 ? "" : "s"}.
        Trends compare each period with the one before it.
      </div>

      {/* ── Filter + sort ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
        {(["all", "free", "paid"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "6px 12px", borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: "pointer",
              border: filter === f ? "1.5px solid var(--enki-ember, #c96838)" : "1px solid var(--enki-rule)",
              background: filter === f ? "rgba(201,104,56,0.1)" : "transparent",
              color: "var(--enki-ink)",
            }}
          >
            {f === "all" ? "All" : f === "free" ? "Free" : "Paid"}
          </button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 12, color: "var(--enki-ink-3)" }}>Sort by</span>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortKey)}
          style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid var(--enki-rule)", background: "transparent", color: "var(--enki-ink)", fontSize: 12 }}
        >
          <option value="earnings">Earnings</option>
          <option value="sales">Sales</option>
          <option value="generations">Generations</option>
          <option value="views">Views</option>
          <option value="opens">Opens</option>
          <option value="rating">Rating</option>
          <option value="comments">Comments</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* ── Prompt table ── */}
      {visible.length === 0 ? (
        <p style={{ fontSize: 13, color: "var(--enki-ink-3)" }}>
          No prompts here yet — release one and its numbers show up automatically.
        </p>
      ) : (
        <div style={{ overflowX: "auto", border: "1px solid var(--enki-rule)", borderRadius: 10 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
            <thead>
              <tr>
                <th style={{ ...th, textAlign: "left" }}>Prompt</th>
                <th style={th}>Type</th>
                <th style={th}>Price</th>
                <th style={th}>Sales</th>
                <th style={th}>Earnings</th>
                <th style={th}>Referrals</th>
                <th style={th}>Gens</th>
                <th style={th}>Views</th>
                <th style={th}>Opens</th>
                <th style={th}>Rating</th>
                <th style={th}>Comments</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((r) => (
                <tr key={r.id}>
                  <td style={{ ...cell, textAlign: "left", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 600 }}>{r.title}</td>
                  <td style={{ ...cell, textAlign: "center" }}>
                    <span style={{
                      padding: "2px 8px", borderRadius: 999, fontSize: 10.5, fontWeight: 700,
                      background: r.type === "paid" ? "rgba(201,104,56,0.14)" : "rgba(31,138,91,0.14)",
                      color: r.type === "paid" ? "var(--enki-ember, #c96838)" : "#1f8a5b",
                    }}>{r.type.toUpperCase()}</span>
                  </td>
                  <td style={{ ...cell, textAlign: "center", fontFamily: "var(--font-jetbrains-mono), monospace" }}>{r.type === "free" ? "—" : usd(r.priceCents)}</td>
                  <td style={{ ...cell, textAlign: "center" }}>{r.sales}</td>
                  <td style={{ ...cell, textAlign: "center", fontFamily: "var(--font-jetbrains-mono), monospace", fontWeight: 700 }}>{usd(r.earningsCents)}</td>
                  <td style={{ ...cell, textAlign: "center", color: "var(--enki-ink-3)" }}>{r.referralEarningsCents === null ? "—" : usd(r.referralEarningsCents)}</td>
                  <td style={{ ...cell, textAlign: "center" }}>{r.generations}</td>
                  <td style={{ ...cell, textAlign: "center", color: "var(--enki-ink-3)" }}>{r.views ?? "—"}</td>
                  <td style={{ ...cell, textAlign: "center", color: "var(--enki-ink-3)" }}>{r.opens ?? "—"}</td>
                  <td style={{ ...cell, textAlign: "center", color: "var(--enki-ink-3)" }}>{r.rating ?? "—"}</td>
                  <td style={{ ...cell, textAlign: "center", color: "var(--enki-ink-3)" }}>{r.comments ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p style={{ fontSize: 11.5, color: "var(--enki-ink-3)", margin: 0 }}>
        Views, ratings and comments are live once the engagement migration ran; referral payouts show “—” until they&apos;re paid out server-side.
      </p>
    </div>
  );
}
