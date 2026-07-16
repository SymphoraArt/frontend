"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { sessionAuthHeaders } from "@/lib/session-headers";

type Metric = "generations" | "earnings";
type Row = {
  rank: number;
  handle: string;
  value: number;
  unit: "gen" | "usd";
  bestPromptId: string | null;
  bestPromptTitle: string | null;
};

const PERIODS: { label: string; key: string }[] = [
  { label: "This week", key: "week" },
  { label: "This month", key: "month" },
  { label: "All time", key: "all" },
];

const MEDALS = ["#e8b84b", "#c2c7d0", "#cd8a4a"]; // gold, silver, bronze
const initials = (h: string) => h.replace(/^@/, "").slice(0, 2).toUpperCase();
const fmt = (r: Row) => (r.unit === "usd" ? `$${r.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : `${r.value.toLocaleString()} gen`);

export default function LeaderboardPage() {
  const router = useRouter();
  const [metric, setMetric] = useState<Metric>("generations");
  const [period, setPeriod] = useState("week");
  const [rows, setRows] = useState<Row[] | null>(null);

  useEffect(() => {
    let dead = false;
    setRows(null);
    (async () => {
      try {
        const res = await fetch(`/api/leaderboard?metric=${metric}&period=${period}`, { headers: sessionAuthHeaders() });
        const data = res.ok ? await res.json() : { rows: [] };
        if (!dead) setRows(data.rows ?? []);
      } catch {
        if (!dead) setRows([]);
      }
    })();
    return () => { dead = true; };
  }, [metric, period]);

  // The buyer-facing generator page is the prompt's home — open it there.
  const openPrompt = (id: string | null) => { if (id) router.push(`/generator/${id}`); };

  return (
    <div style={{ padding: "0 40px 48px", maxWidth: 1080, margin: "0 auto" }}>
      {/* Tab + period controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 26 }}>
        <div style={{ display: "flex", border: "1px solid var(--enki-rule)", borderRadius: 10, overflow: "hidden" }}>
          {(["generations", "earnings"] as Metric[]).map((t) => (
            <button key={t} onClick={() => setMetric(t)} style={{
              padding: "9px 22px", border: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 600,
              background: metric === t ? "var(--enki-ink)" : "transparent",
              color: metric === t ? "var(--enki-paper)" : "var(--enki-ink-3)",
              transition: "all 0.15s",
            }}>
              {t === "generations" ? "Generations" : "Earnings"}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {PERIODS.map((p) => (
            <button key={p.key} onClick={() => setPeriod(p.key)} style={{
              padding: "7px 15px", fontSize: 12.5, borderRadius: 999, cursor: "pointer", transition: "all 0.15s",
              border: "1px solid " + (period === p.key ? "var(--enki-ink)" : "var(--enki-rule)"),
              background: period === p.key ? "var(--enki-ink)" : "transparent",
              color: period === p.key ? "var(--enki-paper)" : "var(--enki-ink-3)",
            }}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {rows === null ? (
        <div style={{ padding: "60px 0", textAlign: "center", color: "var(--enki-ink-3)", fontSize: 13 }}>Loading…</div>
      ) : rows.length === 0 ? (
        <div style={{ padding: "72px 0", textAlign: "center", maxWidth: 460, margin: "0 auto" }}>
          <div className="serif" style={{ fontSize: 24, fontStyle: "italic", color: "var(--enki-ink-2)" }}>No rankings yet.</div>
          <p style={{ fontSize: 14, color: "var(--enki-ink-3)", marginTop: 8 }}>
            Be the first to climb the board — publish a prompt and let people generate with it.
          </p>
        </div>
      ) : (
        <>
          {/* Podium (top 3) */}
          {rows.length >= 3 && (
            <div style={{ display: "flex", gap: 14, marginBottom: 34, alignItems: "flex-end" }}>
              {[rows[1], rows[0], rows[2]].map((row, i) => {
                const isFirst = i === 1;
                const heights = [118, 152, 96];
                const medal = MEDALS[isFirst ? 0 : i === 0 ? 1 : 2];
                return (
                  <div key={row.rank} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: isFirst ? 64 : 50, height: isFirst ? 64 : 50, borderRadius: "50%",
                      background: "var(--enki-paper-3)", border: `2px solid ${medal}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: isFirst ? 18 : 14, fontWeight: 700, color: "var(--enki-ink)", fontFamily: "var(--font-mono), monospace",
                    }}>
                      {initials(row.handle)}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--enki-ink)" }}>@{row.handle}</span>
                    <span style={{ fontSize: 11.5, color: "var(--enki-ink-3)" }}>{fmt(row)}</span>
                    <div style={{
                      width: "100%", height: heights[i], borderRadius: "10px 10px 0 0",
                      background: isFirst
                        ? "linear-gradient(180deg, color-mix(in oklab, var(--enki-ember) 30%, var(--enki-paper-3)), var(--enki-paper-3))"
                        : "var(--enki-paper-3)",
                      border: "1px solid var(--enki-rule)", borderBottom: "none",
                      display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 12,
                      fontSize: isFirst ? 26 : 20, color: medal, fontWeight: 800,
                    }}>
                      {isFirst ? "♛" : `#${row.rank}`}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Table */}
          <div style={{ border: "1px solid var(--enki-rule)", borderRadius: 14, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--enki-paper-2)", borderBottom: "1px solid var(--enki-rule)" }}>
                  {["Rank", "Creator", "Top prompt", metric === "generations" ? "Generations" : "Earned"].map((h) => (
                    <th key={h} style={{ padding: "12px 18px", textAlign: h === "Generations" || h === "Earned" ? "right" : "left", fontSize: 11, fontFamily: "var(--font-mono), monospace", letterSpacing: "0.7px", color: "var(--enki-ink-3)", fontWeight: 600, textTransform: "uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const medal = row.rank <= 3 ? MEDALS[row.rank - 1] : null;
                  return (
                    <tr key={row.rank} style={{ borderBottom: "1px solid var(--enki-rule)" }}>
                      <td style={{ padding: "14px 18px", fontFamily: "var(--font-mono), monospace", fontWeight: 700, fontSize: 15, color: medal ?? "var(--enki-ink-3)" }}>
                        {medal ? "●" : ""} #{row.rank}
                      </td>
                      <td style={{ padding: "14px 18px" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                          <span style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--enki-paper-3)", border: "1px solid var(--enki-rule)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-mono), monospace", color: "var(--enki-ink-2)" }}>
                            {initials(row.handle)}
                          </span>
                          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--enki-ink)" }}>@{row.handle}</span>
                        </span>
                      </td>
                      <td style={{ padding: "14px 18px", maxWidth: 260 }}>
                        {row.bestPromptTitle ? (
                          <button
                            onClick={() => openPrompt(row.bestPromptId)}
                            title="Open this prompt"
                            style={{
                              background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left",
                              fontSize: 13.5, color: "var(--enki-ember)", fontWeight: 600,
                              maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block",
                            }}
                          >
                            {row.bestPromptTitle}
                          </button>
                        ) : (
                          <span style={{ fontSize: 13, color: "var(--enki-ink-3)" }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: "14px 18px", textAlign: "right", fontFamily: "var(--font-mono), monospace", fontSize: 14, fontWeight: 700, color: "var(--enki-ink)" }}>
                        {fmt(row)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
