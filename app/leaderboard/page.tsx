"use client";
import { useState } from "react";

type LbTab = "generations" | "earnings";

const MOCK_GENERATIONS = [
  { rank: 1, handle: "@pixel_sage",    avatar: "PS", gens: 14820, change: +340, badge: "👑", bestPrompt: "A photograph of [subject] at [location], cinematic lighting, 8k resolution" },
  { rank: 2, handle: "@lune_lab",      avatar: "LL", gens: 11203, change: +120, badge: "🥈", bestPrompt: "Macro photography of [insect] on a [flower] leaf, morning dew, f/2.8" },
  { rank: 3, handle: "@driftwood",     avatar: "DW", gens: 9870,  change: -55,  badge: "🥉", bestPrompt: "Cyberpunk cityscape with [vehicle] flying past neon signs, raining" },
  { rank: 4, handle: "@nxrthx",        avatar: "NX", gens: 7654,  change: +88,  badge: "" },
  { rank: 5, handle: "@solarpunk_io",  avatar: "SP", gens: 5430,  change: +12,  badge: "" },
  { rank: 6, handle: "@artnomad",      avatar: "AN", gens: 4210,  change: -30,  badge: "" },
  { rank: 7, handle: "@mossglow",      avatar: "MG", gens: 3880,  change: +55,  badge: "" },
  { rank: 8, handle: "@raven_frames",  avatar: "RF", gens: 2990,  change: 0,    badge: "" },
  { rank: 9, handle: "@terra_vis",     avatar: "TV", gens: 2100,  change: -12,  badge: "" },
  { rank: 10, handle: "@coldvoid",     avatar: "CV", gens: 1870,  change: +5,   badge: "" },
];

const MOCK_EARNINGS = [
  { rank: 1, handle: "@pixel_sage",    avatar: "PS", earned: "$4,320", prompts: 12, change: +210, badge: "👑", bestPrompt: "A photograph of [subject] at [location], cinematic lighting, 8k resolution" },
  { rank: 2, handle: "@solarpunk_io",  avatar: "SP", earned: "$3,180", prompts: 8,  change: +80,  badge: "🥈", bestPrompt: "Vintage polaroid of [subject] posing in [outfit], warm tones, light leaks" },
  { rank: 3, handle: "@mossglow",      avatar: "MG", earned: "$2,450", prompts: 5,  change: -40,  badge: "🥉", bestPrompt: "Minimalist logo design for [company], [color] gradient, clean vector art" },
  { rank: 4, handle: "@lune_lab",      avatar: "LL", earned: "$1,920", prompts: 9,  change: +120, badge: "" },
  { rank: 5, handle: "@artnomad",      avatar: "AN", earned: "$1,340", prompts: 4,  change: +30,  badge: "" },
  { rank: 6, handle: "@driftwood",     avatar: "DW", earned: "$890",   prompts: 7,  change: -15,  badge: "" },
  { rank: 7, handle: "@nxrthx",        avatar: "NX", earned: "$740",   prompts: 3,  change: +60,  badge: "" },
  { rank: 8, handle: "@raven_frames",  avatar: "RF", earned: "$510",   prompts: 2,  change: 0,    badge: "" },
  { rank: 9, handle: "@terra_vis",     avatar: "TV", earned: "$320",   prompts: 6,  change: -8,   badge: "" },
  { rank: 10, handle: "@coldvoid",     avatar: "CV", earned: "$190",   prompts: 1,  change: +5,   badge: "" },
];

const PERIODS = ["This week", "This month", "All time"];

export default function LeaderboardPage() {
  const [tab, setTab] = useState<LbTab>("generations");
  const [period, setPeriod] = useState("This week");

  const rows = tab === "generations" ? MOCK_GENERATIONS : MOCK_EARNINGS;

  return (
    <div style={{ minHeight: "100%", background: "transparent", fontFamily: "var(--font-outfit),'Outfit',sans-serif", paddingTop: 8 }}>
      {/* Hero */}
      <div style={{ padding: "48px 48px 0", maxWidth: 900, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "2px", color: "var(--enki-ink-3)", margin: "0 0 10px" }}>COMMUNITY</p>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: 52, fontWeight: 900, color: "var(--enki-ink)", margin: "0 0 6px", lineHeight: 1.1 }}>
          Leaderboard.
        </h1>
        <p style={{ fontSize: 15, color: "var(--enki-ink-3)", marginBottom: 36 }}>Top creators and earners on Enki Art.</p>

        {/* Tab + Period row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ display: "flex", border: "1px solid #e0ddd5", borderRadius: 8, overflow: "hidden" }}>
            {(["generations", "earnings"] as LbTab[]).map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "8px 24px", border: "none", cursor: "pointer", fontSize: 12,
                fontFamily: "monospace", letterSpacing: "0.5px", textTransform: "uppercase",
                background: tab === t ? "var(--enki-ink)" : "var(--enki-paper-2)",
                color: tab === t ? "var(--enki-paper-2)" : "var(--enki-ink-3)",
                borderRight: t === "generations" ? "1px solid #e0ddd5" : "none",
                transition: "all 0.15s",
              }}>
                {t === "generations" ? "⚡ Generations" : "💰 Earnings"}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 6 }}>
            {PERIODS.map(p => (
              <button key={p} onClick={() => setPeriod(p)} style={{
                padding: "6px 14px", fontSize: 12, borderRadius: 20,
                border: "1px solid " + (period === p ? "var(--enki-ink)" : "var(--enki-rule)"),
                background: period === p ? "var(--enki-ink)" : "var(--enki-paper-2)",
                color: period === p ? "var(--enki-paper-2)" : "#666",
                cursor: "pointer", transition: "all 0.15s",
              }}>
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 podium */}
        <div style={{ display: "flex", gap: 16, marginBottom: 32, alignItems: "flex-end" }}>
          {[rows[1], rows[0], rows[2]].map((row, i) => {
            const heights = [120, 160, 100];
            const isFirst = i === 1;
            return (
              <div key={row.rank} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                {/* Avatar */}
                <div style={{ width: isFirst ? 60 : 48, height: isFirst ? 60 : 48, borderRadius: "50%", background: isFirst ? "var(--enki-ink)" : "var(--enki-rule)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: isFirst ? 18 : 14, fontWeight: 700, color: isFirst ? "var(--enki-paper-2)" : "var(--enki-ink-2)", fontFamily: "monospace", boxShadow: isFirst ? "0 4px 20px rgba(0,0,0,0.2)" : "none" }}>
                  {row.avatar}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--enki-ink)" }}>{row.handle}</span>
                <span style={{ fontSize: 11, color: "var(--enki-ink-3)" }}>{tab === "generations" ? `${(row as typeof MOCK_GENERATIONS[0]).gens.toLocaleString()} gen` : (row as typeof MOCK_EARNINGS[0]).earned}</span>
                {/* Podium bar */}
                <div style={{ width: "100%", height: heights[i], background: isFirst ? "var(--enki-ink)" : "var(--enki-rule)", borderRadius: "8px 8px 0 0", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 10 }}>
                  <span style={{ fontSize: isFirst ? 22 : 18 }}>{row.badge || `#${row.rank}`}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Full table */}
        <div style={{ background: "var(--enki-paper-2)", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", marginBottom: 60 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--enki-rule)" }}>
                {["RANK", "CREATOR", tab === "generations" ? "GENERATIONS" : "EARNED", tab === "earnings" ? "PROMPTS" : null, "CHANGE"].filter(Boolean).map(h => (
                  <th key={h!} style={{ padding: "12px 20px", textAlign: "left", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.8px", color: "var(--enki-ink-3)", fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(row => {
                const isTop3 = row.rank <= 3;
                const change = row.change;
                return (
                  <tr key={row.rank} style={{ borderBottom: "1px solid #f9fafb", background: isTop3 ? "var(--enki-paper-2)" : "var(--enki-paper-2)", transition: "background 0.1s" }}>
                    <td style={{ padding: "14px 20px", fontFamily: "monospace", fontWeight: 700, fontSize: 15, color: isTop3 ? "var(--enki-ink)" : "var(--enki-ink-3)" }}>
                      {row.badge || `#${row.rank}`}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <a href={`/profile/${row.handle.replace('@', '')}`} style={{ fontSize: 14, fontWeight: isTop3 ? 700 : 500, color: "var(--enki-ink)", textDecoration: "none", width: "fit-content" }} onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'} onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}>
                          {row.handle}
                        </a>
                        {isTop3 && (row as any).bestPrompt && (
                          <div style={{ marginTop: 6, padding: "10px 12px", background: "var(--enki-paper-2)", borderRadius: 8, border: "1px solid #e5e7eb", maxWidth: 320 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, color: "var(--enki-ink-3)", letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>Best Prompt</div>
                            <div style={{ fontSize: 12, color: "var(--enki-ink-2)", marginBottom: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}>
                              {(row as any).bestPrompt}
                            </div>
                            <a href={`/editor?prompt=${encodeURIComponent((row as any).bestPrompt)}`} style={{ display: "inline-flex", background: "var(--enki-ink)", border: "none", padding: "4px 10px", fontSize: 11, color: "var(--enki-paper-2)", fontWeight: 600, borderRadius: 6, cursor: "pointer", textDecoration: "none" }}>
                              Use this prompt →
                            </a>
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px", fontFamily: "monospace", fontSize: 14, fontWeight: 600, color: "var(--enki-ink)" }}>
                      {tab === "generations" ? (row as typeof MOCK_GENERATIONS[0]).gens.toLocaleString() : (row as typeof MOCK_EARNINGS[0]).earned}
                    </td>
                    {tab === "earnings" && (
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "var(--enki-ink-3)" }}>
                        {(row as typeof MOCK_EARNINGS[0]).prompts} prompts
                      </td>
                    )}
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ fontSize: 12, fontFamily: "monospace", color: change > 0 ? "#16a34a" : change < 0 ? "#dc2626" : "var(--enki-ink-3)" }}>
                        {change > 0 ? `↑ +${change}` : change < 0 ? `↓ ${change}` : "—"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ padding: 16, textAlign: "center", background: "var(--enki-paper-2)", borderTop: "1px solid var(--enki-rule)" }}>
            <p style={{ fontSize: 12, color: "var(--enki-ink-3)", margin: 0 }}>Leaderboard is togglable per-user in Settings → Profile → Show leaderboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}
