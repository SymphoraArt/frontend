"use client";

/* Admin panel — the "Enki Admin" design on REAL moderation data.
   Gate: BetaGate role (admin/mod) client-side for the UI states; every API
   call re-checks the role server-side (app/api/admin — the actual wall).
   The content area follows the app theme (--enki-* vars); the sidebar is the
   deliberately inverted warm-dark "admin mode" identity in every theme. */

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/enki-shell/icons";
import { useBetaAccess } from "@/components/BetaGate";
import { useTheme } from "../../providers/ThemeProvider";
import { sessionAuthHeaders } from "@/lib/session-headers";

/* ── data shapes (from /api/admin) ── */
type Imp = { id: string; name: string; url: string | null; hunter: string; tags: string[]; at: string };
type Rep = { id: string; target: string; type: "prompt" | "profile"; reason: string; details: string | null; reporter: string; severity: number | string | null; at: string };
type Fb = { id: string; name: string; email: string | null; desc: string; images: number; paid: boolean; payoutCents: number | null; at: string };
type Friend = { id: string; name: string; address: string; type: string; notes: string | null };
type Hunter = { handle: string; total: number; approved: number; denied: number; earningsCents: number };
type StrikeRow = { userId: string; handle: string; strikes: { id: string; reason: string | null }[]; banned: boolean; permanent: boolean; note: string | null; appeal: { id: string; note: string | null } | null };
type Rec = { id: string; handle: string; wallet: string | null; contact: string | null; explanation: string | null; evidence: { kind: string; matched: boolean | null }[]; status: string; at: string };
type AdminData = { imports: Imp[]; reports: Rep[]; feedback: Fb[]; friends: Friend[]; hunters: Hunter[]; strikes: StrikeRow[]; recovery: Rec[] };

type Tab = "imports" | "reports" | "feedback" | "friends" | "hunters" | "strikes" | "recovery";
const REJECT_REASONS = ["Duplicate", "Low quality", "Not a prompt", "Spam", "Policy violation", "Other"];

/* ── the admin sidebar's own palette: inverted warm dark, theme-independent ── */
const SB = {
  bg: "#1a1715", ink: "#f0ece3", muted: "#8a8377", nav: "#b9b2a4", navOn: "#faf8f4",
  emberText: "#f0b799", emberHover: "#ffd9c2",
};
const MONO = "var(--font-mono), monospace";
const SERIF = "var(--font-serif), Georgia, serif";
/* status pill palettes (literal pastels, same family as the rest of the app) */
const PILL = {
  green: { bg: "#E8F8EE", ink: "#1F5C38", border: "#9AD4B0" },
  red: { bg: "#FDE8E8", ink: "#8B2E2E", border: "#E8A0A0" },
  amber: { bg: "#FDF6E8", ink: "#6E4A1E", border: "#E8C89A" },
  purple: { bg: "#F3E8FD", ink: "#4A2E6E", border: "#C4A0E8" },
  blue: { bg: "#E8F4FD", ink: "#1E4A6E", border: "#9CCAE8" },
};
const THEME_OPTS = [
  { id: "light" as const, name: "Bright", sw: "linear-gradient(135deg,#faf8f4,#e8e2d6)" },
  { id: "dark" as const, name: "Dark", sw: "linear-gradient(135deg,#0a1825,#16303f)" },
  { id: "purple" as const, name: "Purple", sw: "linear-gradient(135deg,#1a1228,#6d28d9)" },
];

const timeAgo = (iso: string) => {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 3600) return `${Math.max(1, Math.floor(s / 60))}m`;
  if (s < 86400) return `${Math.floor(s / 3600)}h`;
  return `${Math.floor(s / 86400)}d`;
};
const dollars = (cents: number) => "$" + Math.round(cents / 100).toLocaleString("en-US");

const microLabel: React.CSSProperties = { fontFamily: MONO, fontSize: 7.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--enki-ink-3)" };
const cardStyle: React.CSSProperties = { border: "1px solid var(--enki-rule-2, var(--enki-rule))", borderRadius: 13, background: "var(--enki-paper)", padding: "4px 14px 6px" };
const rowStyle: React.CSSProperties = { display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px dashed var(--enki-rule-2, var(--enki-rule))" };

function Pill({ kind, label, onClick, title }: { kind: keyof typeof PILL | "plain"; label: string; onClick?: () => void; title?: string }) {
  const c = kind === "plain"
    ? { bg: "var(--enki-paper)", ink: "var(--enki-ink-2)", border: "var(--enki-rule)" }
    : PILL[kind];
  return (
    <button onClick={onClick} title={title} style={{
      padding: "4px 11px", borderRadius: 999, fontSize: 10, fontWeight: 600, whiteSpace: "nowrap",
      background: c.bg, color: c.ink, border: `1px solid ${c.border}`, cursor: onClick ? "pointer" : "default",
    }}>
      {label}
    </button>
  );
}
function Badge({ pal, label }: { pal: { bg: string; ink: string }; label: string }) {
  return (
    <span style={{ fontFamily: MONO, fontSize: 8.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", borderRadius: 4, padding: "2px 7px", background: pal.bg, color: pal.ink, whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

const TABS: { id: Tab; label: string; icon: string; sub: string; search: boolean }[] = [
  { id: "imports", label: "Pending imports", icon: "inbox", sub: "Hunt submissions waiting for review before they hit the marketplace.", search: true },
  { id: "reports", label: "Reports", icon: "flag", sub: "User-flagged prompts and profiles, grouped by target.", search: false },
  { id: "feedback", label: "Feedback", icon: "message", sub: "Submissions from the “Earn $100 for feedback” program. Click a row to read it all.", search: true },
  { id: "friends", label: "Friends (whitelist)", icon: "key", sub: "Wallets and collections with early or elevated access.", search: false },
  { id: "hunters", label: "Hunter trust", icon: "target", sub: "Importers ranked by how often their finds get approved.", search: false },
  { id: "strikes", label: "Strikes & bans", icon: "zap", sub: "Users with active strikes, bans, and open appeals.", search: false },
  { id: "recovery", label: "Recovery requests", icon: "lifebuoy", sub: "People who lost every sign-in method. Click a row to check their evidence.", search: true },
];

export default function AdminPage() {
  const router = useRouter();
  const { access, role, handle, profile } = useBetaAccess();
  const { theme, setTheme } = useTheme();
  const isAdmin = role === "admin" || role === "mod";

  const [data, setData] = useState<AdminData | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [tab, setTab] = useState<Tab>("imports");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const toastT = useRef<number | null>(null);
  const say = (m: string) => {
    setToast(m);
    if (toastT.current) window.clearTimeout(toastT.current);
    toastT.current = window.setTimeout(() => setToast(null), 2600);
  };

  // per-tab interaction state
  const [impSel, setImpSel] = useState<Set<string>>(new Set());
  const [impRejectId, setImpRejectId] = useState<string | null>(null);
  const [impReason, setImpReason] = useState(REJECT_REASONS[0]);
  const [fbOpen, setFbOpen] = useState<string | null>(null);
  const [flAdd, setFlAdd] = useState(false);
  const [flName, setFlName] = useState(""); const [flAddr, setFlAddr] = useState("");
  const [flType, setFlType] = useState("EOA"); const [flNotes, setFlNotes] = useState("");
  const [delPending, setDelPending] = useState<Friend | null>(null);
  const [appealOpen, setAppealOpen] = useState<string | null>(null);
  const [recOpen, setRecOpen] = useState<string | null>(null);
  const [kebabOpen, setKebabOpen] = useState(false);
  const kebabRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!kebabOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (kebabRef.current && !kebabRef.current.contains(e.target as Node)) setKebabOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [kebabOpen]);

  useEffect(() => {
    if (access !== "ok" || !isAdmin) return;
    let dead = false;
    (async () => {
      try {
        const res = await fetch("/api/admin", { headers: sessionAuthHeaders() });
        if (!res.ok) throw new Error();
        const d = (await res.json()) as AdminData;
        if (!dead) setData(d);
      } catch {
        if (!dead) setLoadFailed(true);
      }
    })();
    return () => { dead = true; };
  }, [access, isAdmin]);

  const post = async (payload: Record<string, unknown>, okMsg: string, apply: (d: AdminData) => AdminData) => {
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...sessionAuthHeaders() },
        body: JSON.stringify(payload),
      });
      const d = await res.json().catch(() => ({} as { error?: string }));
      if (!res.ok) { say(d.error || "That didn't work."); return false; }
      setData((cur) => (cur ? apply(cur) : cur));
      if (okMsg) say(okMsg);
      return true;
    } catch {
      say("Network hiccup — nothing was changed.");
      return false;
    }
  };

  const q = query.trim().toLowerCase();
  const tabDef = TABS.find((t) => t.id === tab)!;
  const counts = useMemo(() => ({
    imports: data?.imports.length ?? 0,
    reports: data?.reports.length ?? 0,
    feedback: data?.feedback.filter((f) => !f.paid).length ?? 0,
    friends: 0,
    hunters: 0,
    strikes: data?.strikes.filter((s) => s.appeal).length ?? 0,
    recovery: data?.recovery.filter((r) => r.status === "pending").length ?? 0,
  }), [data]);

  /* ── gate states ── */
  if (access === "checking" || (access === "ok" && isAdmin && !data && !loadFailed)) {
    return (
      <div className="ek-app" style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, background: "var(--enki-paper)", color: "var(--enki-ink)" }}>
        <span style={{ color: "var(--enki-ember)", animation: "adm-pulse 1.1s infinite" }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
        </span>
        <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--enki-ink-3)" }}>Verifying admin access…</span>
        <style>{"@keyframes adm-pulse{0%,100%{opacity:.35}50%{opacity:1}}"}</style>
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="ek-app" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "var(--enki-paper)" }}>
        <div style={{ maxWidth: 380, textAlign: "center", border: "1px solid var(--enki-rule-2, var(--enki-rule))", borderRadius: 16, background: "var(--enki-paper)", padding: "34px 30px" }}>
          <span style={{ color: "#b33a3a", display: "inline-block", marginBottom: 10 }}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m14.5 9.5-5 5" /><path d="m9.5 9.5 5 5" /></svg>
          </span>
          <h1 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 26, fontWeight: 400, margin: "0 0 8px", color: "var(--enki-ink)" }}>Admins only.</h1>
          <p style={{ fontSize: 12.5, color: "var(--enki-ink-3)", lineHeight: 1.6, margin: "0 0 18px" }}>
            This area is for database admins. Your account doesn&apos;t have admin rights, so there&apos;s nothing for you here.
          </p>
          <button onClick={() => router.push("/home")} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 999, border: "none", background: "var(--enki-ink)", color: "var(--enki-paper)", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            ← Back to Enki Art
          </button>
        </div>
      </div>
    );
  }

  const d: AdminData = data ?? { imports: [], reports: [], feedback: [], friends: [], hunters: [], strikes: [], recovery: [] };
  const filteredImports = d.imports.filter((r) => !q || r.name.toLowerCase().includes(q) || r.hunter.toLowerCase().includes(q));
  const filteredFeedback = d.feedback.filter((r) => !q || r.name.toLowerCase().includes(q) || (r.email ?? "").toLowerCase().includes(q) || r.desc.toLowerCase().includes(q));
  const filteredRecovery = d.recovery.filter((r) => !q || r.handle.toLowerCase().includes(q) || (r.contact ?? "").toLowerCase().includes(q));

  const stats: { label: string; value: number; dot: string; go: Tab }[] = [
    { label: "Pending imports", value: d.imports.length, dot: "var(--enki-ember)", go: "imports" },
    { label: "Open reports", value: d.reports.length, dot: "#b33a3a", go: "reports" },
    { label: "Unpaid feedback", value: d.feedback.filter((f) => !f.paid).length, dot: "#6E4A1E", go: "feedback" },
    { label: "Active strikes", value: d.strikes.reduce((n, s) => n + s.strikes.length, 0), dot: "#8B2E2E", go: "strikes" },
    { label: "Open appeals", value: d.strikes.filter((s) => s.appeal).length, dot: "#4A2E6E", go: "strikes" },
    { label: "Recovery pending", value: d.recovery.filter((r) => r.status === "pending").length, dot: "#1E4A6E", go: "recovery" },
  ];

  const initials = ((profile?.handle || handle || "?") as string).slice(0, 2).toUpperCase();

  return (
    <div className="ek-app" style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--enki-paper-2)", color: "var(--enki-ink)", animation: "adm-fade .25s ease" }}>
      <style>{`
        @keyframes adm-fade{from{opacity:0}to{opacity:1}}
        @keyframes adm-pop{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
        @keyframes adm-toast{from{opacity:0;transform:translateX(-50%) translateY(12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
        @keyframes adm-pulse{0%,100%{opacity:.35}50%{opacity:1}}
        .adm-nav{display:flex;align-items:center;gap:10px;height:37px;padding:0 12px;border:none;border-radius:999px;background:transparent;color:${SB.nav};font-size:13px;width:100%;text-align:left;cursor:pointer;}
        .adm-nav:hover{background:rgba(255,255,255,.09);color:${SB.navOn};}
        .adm-nav.on{background:rgba(255,255,255,.12);color:${SB.navOn};font-weight:600;}
        .adm-off{display:flex;align-items:center;justify-content:center;gap:7px;height:36px;margin:0 2px 8px;border:1px solid rgba(201,104,56,.55);border-radius:999px;background:rgba(201,104,56,.14);color:${SB.emberText};font-size:12px;font-weight:600;cursor:pointer;width:calc(100% - 4px);}
        .adm-off:hover{background:rgba(201,104,56,.28);color:${SB.emberHover};}
        .adm-stat{border:1px solid var(--enki-rule-2,var(--enki-rule));border-radius:11px;background:var(--enki-paper);padding:9px 11px;text-align:left;cursor:pointer;}
        .adm-stat:hover,.adm-stat.on{border-color:var(--enki-ember);}
        .adm-kebab{opacity:0;transition:opacity .15s;width:24px;height:24px;border:none;border-radius:6px;background:none;color:${SB.muted};display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;}
        .adm-account:hover .adm-kebab{opacity:1;}
        .adm-kebab:hover{background:rgba(255,255,255,.1);color:${SB.navOn};}
      `}</style>

      {/* ── inverted admin sidebar (theme-independent by design) ── */}
      <aside style={{ width: 208, flexShrink: 0, display: "flex", flexDirection: "column", padding: "12px 10px 14px", background: SB.bg, color: SB.ink, overflowY: "auto" }}>
        <div style={{ padding: "4px 8px 10px" }}>
          <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase", color: SB.muted }}>Enki Art</div>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 22, color: SB.navOn }}>Admin.</span>
            <span style={{ fontFamily: MONO, fontSize: 7.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: SB.emberText, border: "1px solid rgba(201,104,56,0.55)", background: "rgba(201,104,56,0.16)", borderRadius: 4, padding: "2px 6px" }}>
              {role === "admin" ? "DB admin" : "Moderator"}
            </span>
          </div>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {TABS.map((t) => (
            <button key={t.id} className={"adm-nav" + (tab === t.id ? " on" : "")} onClick={() => { setTab(t.id); setQuery(""); }}>
              <Icon name={t.icon} size={16} stroke={1.9} />
              <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.label}</span>
              {counts[t.id] > 0 && (
                <span style={{ minWidth: 17, height: 17, padding: "0 5px", borderRadius: 999, background: "var(--enki-ember, #c96838)", color: "#fff", fontFamily: MONO, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {counts[t.id]}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div style={{ flex: 1 }} />
        <button className="adm-off" onClick={() => router.push("/home")}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18.36 6.64A9 9 0 0 1 20.77 15" /><path d="M6.16 6.16a9 9 0 1 0 12.68 12.68" /><path d="M12 2v4" /></svg>
          Turn off admin mode
        </button>
        <div className="adm-account" ref={kebabRef} style={{ position: "relative", display: "flex", alignItems: "center", gap: 9, padding: "8px 8px 2px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <span style={{ width: 32, height: 32, borderRadius: "50%", background: SB.navOn, color: SB.bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: 11, fontWeight: 600, overflow: "hidden", flexShrink: 0 }}>
            {profile?.avatarUrl
              ? /* eslint-disable-next-line @next/next/no-img-element */
                <img src={profile.avatarUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : initials}
          </span>
          <span style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: SB.navOn, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{handle || "you"}</span>
            <span style={{ fontSize: 11, color: SB.muted, fontFamily: MONO }}>@{handle || "—"}</span>
          </span>
          {/* 3-dot menu: theme mode lives here (hover to reveal) */}
          <button className="adm-kebab" title="Options" onClick={() => setKebabOpen((o) => !o)}>
            <Icon name="dots" size={15} stroke={2.2} />
          </button>
          {kebabOpen && (
            <div style={{ position: "absolute", bottom: "calc(100% + 6px)", right: 4, zIndex: 40, minWidth: 168, background: SB.bg, border: "1px solid rgba(255,255,255,0.14)", borderRadius: 12, padding: 6, boxShadow: "0 14px 34px rgba(0,0,0,0.4)", animation: "adm-pop .15s ease" }}>
              <div style={{ fontFamily: MONO, fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: SB.muted, padding: "4px 8px 6px" }}>Color theme</div>
              {THEME_OPTS.map((t) => (
                <button key={t.id} onClick={() => setTheme(t.id)} style={{ display: "flex", alignItems: "center", gap: 9, width: "100%", padding: "7px 8px", border: "none", borderRadius: 8, background: theme === t.id ? "rgba(255,255,255,0.1)" : "none", color: theme === t.id ? SB.navOn : SB.nav, fontSize: 12.5, fontWeight: theme === t.id ? 600 : 400, cursor: "pointer", textAlign: "left" }}>
                  <span style={{ width: 16, height: 16, borderRadius: 5, background: t.sw, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)", flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{t.name}</span>
                  {theme === t.id && <Icon name="check" size={13} stroke={2.6} />}
                </button>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* ── content ── */}
      <div style={{ flex: 1, minWidth: 0, overflowY: "auto" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 26px 40px" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
            <h1 style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 30, fontWeight: 400, margin: 0, lineHeight: 1, color: "var(--enki-ink)" }}>
              {tabDef.label.charAt(0).toUpperCase() + tabDef.label.slice(1)}.
            </h1>
            <p style={{ margin: 0, fontSize: 12, color: "var(--enki-ink-3)" }}>{tabDef.sub}</p>
            {tabDef.search && (
              <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, height: 30, border: "1px solid var(--enki-rule)", borderRadius: 999, background: "var(--enki-paper)", padding: "0 11px", width: 200 }}>
                <Icon name="search" size={12} stroke={2} style={{ color: "var(--enki-ink-3)" }} />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search…" style={{ flex: 1, minWidth: 0, border: "none", background: "transparent", outline: "none", fontSize: 12, color: "var(--enki-ink)" }} />
              </span>
            )}
          </div>

          {loadFailed ? (
            <div style={{ padding: "50px 0", textAlign: "center", color: "var(--enki-ink-3)", fontSize: 13 }}>Could not load the moderation queues — refresh to retry.</div>
          ) : (
            <>
              {/* stat cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(138px, 1fr))", gap: 8, marginBottom: 14 }}>
                {stats.map((s) => (
                  <button key={s.label} className={"adm-stat" + (tab === s.go ? " on" : "")} onClick={() => { setTab(s.go); setQuery(""); }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
                      <span style={{ ...microLabel, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.label}</span>
                    </span>
                    <span style={{ display: "block", fontFamily: SERIF, fontSize: 23, fontWeight: 700, color: "var(--enki-ink)" }}>{s.value}</span>
                  </button>
                ))}
              </div>

              {/* ── PENDING IMPORTS ── */}
              {tab === "imports" && (
                <>
                  {impSel.size > 0 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <span style={{ fontFamily: MONO, fontSize: 10, color: "var(--enki-ink-3)" }}>{impSel.size} selected</span>
                      <Pill kind="green" label="Approve all" onClick={() => {
                        const ids = [...impSel];
                        void post({ resource: "imports", action: "approve", ids }, `${ids.length} imports approved.`, (cur) => ({ ...cur, imports: cur.imports.filter((r) => !impSel.has(r.id)) }));
                        setImpSel(new Set());
                      }} />
                      <Pill kind="red" label="Reject all" onClick={() => {
                        const ids = [...impSel];
                        void post({ resource: "imports", action: "reject", ids, reason: "Other" }, `${ids.length} imports rejected.`, (cur) => ({ ...cur, imports: cur.imports.filter((r) => !impSel.has(r.id)) }));
                        setImpSel(new Set());
                      }} />
                    </div>
                  )}
                  <div style={cardStyle}>
                    {filteredImports.length === 0 && <div style={{ padding: 30, textAlign: "center", fontSize: 12, color: "var(--enki-ink-3)" }}>Queue empty — all caught up ✓</div>}
                    {filteredImports.map((r) => (
                      <div key={r.id} style={{ ...rowStyle, background: impSel.has(r.id) ? "rgba(var(--ember-rgb), 0.05)" : "transparent" }}>
                        <input type="checkbox" checked={impSel.has(r.id)} onChange={() => setImpSel((s) => { const n = new Set(s); if (n.has(r.id)) n.delete(r.id); else n.add(r.id); return n; })} style={{ accentColor: "var(--enki-ember, #c96838)" }} />
                        <span style={{ flex: 1.2, minWidth: 0 }}>
                          <span style={{ display: "block", fontFamily: SERIF, fontSize: 14, color: "var(--enki-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</span>
                          {r.url && (
                            <a href={r.url} target="_blank" rel="noreferrer" style={{ fontFamily: MONO, fontSize: 9, color: "var(--enki-ember)" }}>
                              {r.url.replace(/^https?:\/\//, "").slice(0, 30)}…
                            </a>
                          )}
                        </span>
                        <span style={{ width: 88, fontFamily: MONO, fontSize: 10.5, color: "var(--enki-ink-3)", overflow: "hidden", textOverflow: "ellipsis" }}>@{r.hunter}</span>
                        <span style={{ flex: 0.9, display: "flex", gap: 4, flexWrap: "wrap" }}>
                          {r.tags.map((t) => <span key={t} style={{ fontFamily: MONO, fontSize: 8.5, color: "var(--enki-ink-3)", background: "var(--enki-paper-2)", borderRadius: 4, padding: "2px 6px" }}>{t}</span>)}
                        </span>
                        <span style={{ width: 52, textAlign: "right", fontFamily: MONO, fontSize: 9, color: "var(--enki-ink-3)" }}>{timeAgo(r.at)}</span>
                        {impRejectId === r.id ? (
                          <span style={{ display: "flex", gap: 5, alignItems: "center" }}>
                            <select value={impReason} onChange={(e) => setImpReason(e.target.value)} style={{ height: 26, border: "1px solid var(--enki-rule)", borderRadius: 7, background: "var(--enki-paper)", color: "var(--enki-ink)", fontSize: 10.5 }}>
                              {REJECT_REASONS.map((x) => <option key={x}>{x}</option>)}
                            </select>
                            <Pill kind="red" label="Confirm" onClick={() => {
                              void post({ resource: "imports", action: "reject", id: r.id, reason: impReason }, `Rejected: ${impReason}.`, (cur) => ({ ...cur, imports: cur.imports.filter((x) => x.id !== r.id) }));
                              setImpRejectId(null);
                            }} />
                            <Pill kind="plain" label="Cancel" onClick={() => setImpRejectId(null)} />
                          </span>
                        ) : (
                          <span style={{ display: "flex", gap: 5 }}>
                            <Pill kind="green" label="Approve" onClick={() => void post({ resource: "imports", action: "approve", id: r.id }, `“${r.name}” approved — it's live.`, (cur) => ({ ...cur, imports: cur.imports.filter((x) => x.id !== r.id) }))} />
                            <Pill kind="red" label="Reject" onClick={() => setImpRejectId(r.id)} />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* ── REPORTS ── */}
              {tab === "reports" && (
                <div style={cardStyle}>
                  {d.reports.length === 0 && <div style={{ padding: 30, textAlign: "center", fontSize: 12, color: "var(--enki-ink-3)" }}>No open reports ✓</div>}
                  {d.reports.map((r) => (
                    <div key={r.id} style={rowStyle}>
                      <span style={{ width: 30, textAlign: "center", fontFamily: MONO, fontSize: 15, fontWeight: 700, color: typeof r.severity === "number" && r.severity >= 3 ? "#b33a3a" : "var(--enki-ink)" }}>!</span>
                      <span style={{ flex: 1, minWidth: 0, fontFamily: SERIF, fontSize: 14, color: "var(--enki-ink)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={r.details ?? undefined}>{r.target}</span>
                      <Badge pal={r.type === "prompt" ? PILL.blue : PILL.amber} label={r.type} />
                      <span style={{ width: 90, fontSize: 11, color: "var(--enki-ink-2)", overflow: "hidden", textOverflow: "ellipsis" }}>{r.reason}</span>
                      <span style={{ width: 76, fontFamily: MONO, fontSize: 9.5, color: "var(--enki-ink-3)", overflow: "hidden", textOverflow: "ellipsis" }}>@{r.reporter}</span>
                      <span style={{ width: 40, textAlign: "right", fontFamily: MONO, fontSize: 9, color: "var(--enki-ink-3)" }}>{timeAgo(r.at)}</span>
                      <span style={{ display: "flex", gap: 5 }}>
                        <Pill kind="green" label="Resolve" onClick={() => void post({ resource: "reports", action: "resolve", id: r.id }, "Report resolved.", (cur) => ({ ...cur, reports: cur.reports.filter((x) => x.id !== r.id) }))} />
                        <Pill kind="plain" label="Dismiss" onClick={() => void post({ resource: "reports", action: "dismiss", id: r.id }, "Report dismissed.", (cur) => ({ ...cur, reports: cur.reports.filter((x) => x.id !== r.id) }))} />
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* ── FEEDBACK ── */}
              {tab === "feedback" && (
                <div style={cardStyle}>
                  {filteredFeedback.length === 0 && <div style={{ padding: 30, textAlign: "center", fontSize: 12, color: "var(--enki-ink-3)" }}>No feedback yet.</div>}
                  {filteredFeedback.map((r) => (
                    <div key={r.id}>
                      <div style={{ ...rowStyle, cursor: "pointer" }} onClick={() => setFbOpen((v) => (v === r.id ? null : r.id))}>
                        <span style={{ width: 116, fontSize: 12, fontWeight: 600, color: "var(--enki-ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</span>
                        <span style={{ width: 132, fontFamily: MONO, fontSize: 9.5, color: "var(--enki-ink-3)", overflow: "hidden", textOverflow: "ellipsis" }}>{r.email ?? "—"}</span>
                        <span style={{ flex: 1, minWidth: 0, fontSize: 11.5, color: "var(--enki-ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.desc}</span>
                        <span style={{ width: 34, textAlign: "center", fontFamily: MONO, fontSize: 9, color: "var(--enki-ink-3)" }}>{r.images > 0 ? `${r.images} img` : "—"}</span>
                        <span style={{ width: 42, fontFamily: MONO, fontSize: 9, color: "var(--enki-ink-3)" }}>{timeAgo(r.at)}</span>
                        <Badge pal={r.paid ? PILL.green : PILL.amber} label={r.paid ? "Paid" : "Unpaid"} />
                        {!r.paid && (
                          <span onClick={(e) => e.stopPropagation()}>
                            <Pill kind="green" label="Mark paid" onClick={() => void post({ resource: "feedback", action: "markPaid", id: r.id }, `$100 payout marked as paid to ${r.name}.`, (cur) => ({ ...cur, feedback: cur.feedback.map((x) => (x.id === r.id ? { ...x, paid: true } : x)) }))} />
                          </span>
                        )}
                      </div>
                      {fbOpen === r.id && (
                        <div style={{ padding: "2px 0 12px 10px", borderLeft: "3px solid #e8c89a", margin: "0 0 8px 4px" }}>
                          <p style={{ margin: 0, fontSize: 12, color: "var(--enki-ink-2)", lineHeight: 1.65, maxWidth: 640 }}>{r.desc}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ── FRIENDS (WHITELIST) ── */}
              {tab === "friends" && (
                <>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                    <button onClick={() => setFlAdd((v) => !v)} style={{ padding: "5px 14px", borderRadius: 999, border: "none", background: "var(--enki-ink)", color: "var(--enki-paper)", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                      {flAdd ? "Close" : "+ Add entry"}
                    </button>
                  </div>
                  {flAdd && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, border: "1px solid var(--enki-rule-2, var(--enki-rule))", borderRadius: 11, background: "var(--enki-paper)", padding: "10px 12px", marginBottom: 8 }}>
                      {([
                        ["Name", flName, setFlName, 1, false],
                        ["Address / collection ID", flAddr, setFlAddr, 1.4, true],
                        ["Notes", flNotes, setFlNotes, 1.2, false],
                      ] as [string, string, (v: string) => void, number, boolean][]).map(([ph, val, set, grow, mono]) => (
                        <input key={ph} placeholder={ph} value={val} onChange={(e) => set(e.target.value)} style={{ flex: grow, minWidth: 110, height: 28, border: "1px solid var(--enki-rule)", borderRadius: 8, background: "var(--enki-paper-2)", color: "var(--enki-ink)", fontSize: 11.5, padding: "0 9px", fontFamily: mono ? MONO : undefined, outline: "none" }} />
                      ))}
                      <select value={flType} onChange={(e) => setFlType(e.target.value)} style={{ height: 28, border: "1px solid var(--enki-rule)", borderRadius: 8, background: "var(--enki-paper-2)", color: "var(--enki-ink)", fontSize: 11.5 }}>
                        {["EOA", "Collection", "Multi-sig"].map((t) => <option key={t}>{t}</option>)}
                      </select>
                      <Pill kind="green" label="Save" onClick={() => {
                        if (!flName.trim() || !flAddr.trim()) { say("Name and address are required."); return; }
                        void (async () => {
                          const ok = await post({ resource: "friends", action: "add", name: flName, address: flAddr, type: flType, notes: flNotes }, "Whitelist entry added.", (cur) => cur);
                          if (ok) {
                            setFlAdd(false); setFlName(""); setFlAddr(""); setFlNotes("");
                            // re-fetch to pick up the server-assigned id
                            try {
                              const res = await fetch("/api/admin", { headers: sessionAuthHeaders() });
                              if (res.ok) setData(await res.json());
                            } catch { /* next visit reconciles */ }
                          }
                        })();
                      }} />
                    </div>
                  )}
                  <div style={cardStyle}>
                    {d.friends.length === 0 && <div style={{ padding: 30, textAlign: "center", fontSize: 12, color: "var(--enki-ink-3)" }}>Whitelist is empty.</div>}
                    {d.friends.map((r) => (
                      <div key={r.id} style={rowStyle}>
                        <span style={{ width: 140, fontSize: 12.5, fontWeight: 600, color: "var(--enki-ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.name}</span>
                        <span style={{ flex: 1, minWidth: 0, fontFamily: MONO, fontSize: 10.5, color: "var(--enki-ink-2)", overflow: "hidden", textOverflow: "ellipsis" }}>{r.address}</span>
                        <Badge pal={PILL.blue} label={r.type} />
                        <span style={{ flex: 1, fontSize: 11, color: "var(--enki-ink-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.notes ?? "—"}</span>
                        <Pill kind="red" label="Delete" onClick={() => setDelPending(r)} />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* ── HUNTER TRUST ── */}
              {tab === "hunters" && (
                <div style={cardStyle}>
                  {d.hunters.length === 0 && <div style={{ padding: 30, textAlign: "center", fontSize: 12, color: "var(--enki-ink-3)" }}>No hunter activity yet.</div>}
                  {d.hunters.map((r) => {
                    const score = r.total > 0 ? Math.round((r.approved / r.total) * 100) : 0;
                    const col = score >= 80 ? "#1f8a5b" : score >= 50 ? "#b8860b" : "#b33a3a";
                    return (
                      <div key={r.handle} style={{ ...rowStyle, gap: 12, padding: "10px 0" }}>
                        <span style={{ width: 110, fontFamily: MONO, fontSize: 11.5, fontWeight: 700, color: "var(--enki-ink)" }}>@{r.handle}</span>
                        <span style={{ width: 66, fontSize: 11, color: "var(--enki-ink-3)" }}>{r.total} total</span>
                        <Badge pal={PILL.green} label={`${r.approved} ✓`} />
                        <Badge pal={PILL.red} label={`${r.denied} ✗`} />
                        <span style={{ flex: 1, minWidth: 60, height: 5, borderRadius: 3, background: "var(--enki-rule-2, var(--enki-rule))", overflow: "hidden" }}>
                          <span style={{ display: "block", height: "100%", width: `${score}%`, background: col, borderRadius: 3 }} />
                        </span>
                        <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, color: col }}>{score}%</span>
                        <span style={{ width: 56, textAlign: "right", fontFamily: MONO, fontSize: 12, fontWeight: 700, color: "var(--enki-ember)" }}>{dollars(r.earningsCents)}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── STRIKES & BANS ── */}
              {tab === "strikes" && (
                <div style={cardStyle}>
                  {d.strikes.length === 0 && <div style={{ padding: 30, textAlign: "center", fontSize: 12, color: "var(--enki-ink-3)" }}>No active strikes, bans or appeals ✓</div>}
                  {d.strikes.map((r) => {
                    const n = r.strikes.length;
                    return (
                      <div key={r.userId}>
                        <div style={rowStyle}>
                          <span style={{ width: 116, fontFamily: MONO, fontSize: 11.5, fontWeight: 700, color: "var(--enki-ink)", overflow: "hidden", textOverflow: "ellipsis" }}>@{r.handle}</span>
                          <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            {[0, 1, 2].map((i) => <span key={i} style={{ width: 9, height: 9, borderRadius: "50%", background: i < Math.min(n, 3) ? "#b33a3a" : "var(--enki-rule-2, var(--enki-rule))" }} />)}
                            <span style={{ fontFamily: MONO, fontSize: 9, color: "var(--enki-ink-3)", marginLeft: 2 }}>{n}/3</span>
                          </span>
                          <Badge pal={r.banned ? PILL.red : { bg: "var(--enki-paper-2)", ink: "var(--enki-ink-3)" } as { bg: string; ink: string }} label={r.permanent ? "permbanned" : r.banned ? "banned" : "active"} />
                          <span style={{ flex: 1, minWidth: 0, fontSize: 11, color: "var(--enki-ink-3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.note ?? "—"}</span>
                          {r.appeal && (
                            <button onClick={() => setAppealOpen((v) => (v === r.userId ? null : r.userId))} style={{ padding: "3px 9px", borderRadius: 999, border: `1px solid ${PILL.purple.border}`, background: PILL.purple.bg, color: PILL.purple.ink, fontSize: 9.5, fontWeight: 600, cursor: "pointer" }}>
                              Appeal filed
                            </button>
                          )}
                          {n > 0 && (
                            <Pill kind="plain" label="Revoke" title="Revoke the newest active strike"
                              onClick={() => void post({ resource: "strikes", action: "revoke", id: r.strikes[0].id }, `Strike revoked for @${r.handle}.`, (cur) => ({
                                ...cur,
                                strikes: cur.strikes
                                  .map((x) => (x.userId === r.userId ? { ...x, strikes: x.strikes.slice(1) } : x))
                                  .filter((x) => x.strikes.length > 0 || x.banned || x.appeal),
                              }))} />
                          )}
                        </div>
                        {appealOpen === r.userId && r.appeal && (
                          <div style={{ padding: "2px 0 12px 10px", borderLeft: `3px solid ${PILL.purple.border}`, margin: "0 0 8px 4px" }}>
                            <span style={{ ...microLabel, display: "block", marginBottom: 4 }}>Appeal note</span>
                            <p style={{ margin: 0, fontSize: 12, fontStyle: "italic", color: "var(--enki-ink-2)", lineHeight: 1.6, maxWidth: 640 }}>
                              “{r.appeal.note ?? "No statement provided."}”
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── RECOVERY REQUESTS ── */}
              {tab === "recovery" && (
                <div style={cardStyle}>
                  {filteredRecovery.length === 0 && <div style={{ padding: 30, textAlign: "center", fontSize: 12, color: "var(--enki-ink-3)" }}>No recovery requests.</div>}
                  {filteredRecovery.map((r) => {
                    const statusPal =
                      r.status === "approved" ? PILL.green
                      : r.status === "rejected" ? PILL.red
                      : r.status === "needs_info" ? PILL.amber
                      : { bg: "var(--enki-paper-2)", ink: "var(--enki-ink-3)" } as { bg: string; ink: string };
                    return (
                      <div key={r.id}>
                        <div style={{ ...rowStyle, cursor: "pointer" }} onClick={() => setRecOpen((v) => (v === r.id ? null : r.id))}>
                          <span style={{ width: 112, fontFamily: MONO, fontSize: 11.5, fontWeight: 700, color: "var(--enki-ink)", overflow: "hidden", textOverflow: "ellipsis" }}>@{r.handle}</span>
                          <span style={{ width: 168, fontFamily: MONO, fontSize: 9.5, color: "var(--enki-ink-3)", overflow: "hidden", textOverflow: "ellipsis" }}>{r.contact ?? "—"}</span>
                          <span style={{ flex: 1, display: "flex", gap: 4, flexWrap: "wrap" }}>
                            {r.evidence.length === 0
                              ? <Badge pal={PILL.red} label="minimal evidence" />
                              : r.evidence.map((e, i) => (
                                  <Badge key={i}
                                    pal={e.kind.toLowerCase().includes("zkp") ? PILL.purple : { bg: "var(--enki-paper-2)", ink: "var(--enki-ink-3)" } as { bg: string; ink: string }}
                                    label={e.kind + (e.matched ? " ✓" : "")} />
                                ))}
                          </span>
                          <span style={{ width: 42, textAlign: "right", fontFamily: MONO, fontSize: 9, color: "var(--enki-ink-3)" }}>{timeAgo(r.at)}</span>
                          <Badge pal={statusPal} label={r.status === "needs_info" ? "Needs info" : r.status.charAt(0).toUpperCase() + r.status.slice(1)} />
                          <span style={{ display: "flex", gap: 5 }} onClick={(e) => e.stopPropagation()}>
                            {r.status === "pending" && <>
                              <Pill kind="green" label="Approve" onClick={() => void post({ resource: "recovery", action: "setStatus", id: r.id, status: "approved" }, `Access restored for @${r.handle}.`, (cur) => ({ ...cur, recovery: cur.recovery.map((x) => (x.id === r.id ? { ...x, status: "approved" } : x)) }))} />
                              <Pill kind="plain" label="Need more" onClick={() => void post({ resource: "recovery", action: "setStatus", id: r.id, status: "needs_info" }, "", (cur) => ({ ...cur, recovery: cur.recovery.map((x) => (x.id === r.id ? { ...x, status: "needs_info" } : x)) }))} />
                              <Pill kind="red" label="Reject" onClick={() => void post({ resource: "recovery", action: "setStatus", id: r.id, status: "rejected" }, "", (cur) => ({ ...cur, recovery: cur.recovery.map((x) => (x.id === r.id ? { ...x, status: "rejected" } : x)) }))} />
                            </>}
                            {r.status === "needs_info" && (
                              <Pill kind="plain" label="Re-review" onClick={() => void post({ resource: "recovery", action: "setStatus", id: r.id, status: "pending" }, "", (cur) => ({ ...cur, recovery: cur.recovery.map((x) => (x.id === r.id ? { ...x, status: "pending" } : x)) }))} />
                            )}
                          </span>
                        </div>
                        {recOpen === r.id && (
                          <div style={{ padding: "4px 0 12px 10px", borderLeft: `3px solid ${PILL.blue.border}`, margin: "0 0 8px 4px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 26px", maxWidth: 720 }}>
                            <span><span style={{ ...microLabel, display: "block" }}>Wallet address</span><span style={{ fontSize: 11.5, fontFamily: MONO, color: "var(--enki-ink-2)" }}>{r.wallet ?? "Not submitted"}</span></span>
                            <span><span style={{ ...microLabel, display: "block" }}>Contact</span><span style={{ fontSize: 11.5, fontFamily: MONO, color: "var(--enki-ink-2)" }}>{r.contact ?? "Not submitted"}</span></span>
                            <span style={{ gridColumn: "1 / -1" }}>
                              <span style={{ ...microLabel, display: "block" }}>Explanation</span>
                              <span style={{ fontSize: 12, color: "var(--enki-ink-2)", lineHeight: 1.65, display: "block", maxWidth: 640 }}>{r.explanation ?? "—"}</span>
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── whitelist delete confirm (honest — no fake device approval) ── */}
      {delPending && (
        <div onClick={() => setDelPending(null)} style={{ position: "fixed", inset: 0, zIndex: 350, background: "rgba(26,23,21,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", animation: "adm-fade .15s ease" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 380, maxWidth: "92vw", background: "var(--enki-paper)", border: "1px solid var(--enki-rule)", borderRadius: 14, padding: "24px 22px", boxShadow: "0 24px 64px rgba(0,0,0,0.3)", animation: "adm-pop .2s ease" }}>
            <div style={{ ...microLabel, fontSize: 8, letterSpacing: "0.18em", marginBottom: 6 }}>Whitelist</div>
            <div style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 20, fontWeight: 700, color: "var(--enki-ink)", marginBottom: 8 }}>Remove this entry?</div>
            <p style={{ margin: "0 0 16px", fontSize: 12.5, color: "var(--enki-ink-3)", lineHeight: 1.6 }}>
              “{delPending.name}” loses its whitelist access. The entry is deactivated (kept for the audit trail) and disappears from this list.
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
              <Pill kind="plain" label="Cancel" onClick={() => setDelPending(null)} />
              <Pill kind="red" label="Remove entry" onClick={() => {
                const f = delPending;
                setDelPending(null);
                void post({ resource: "friends", action: "remove", id: f.id }, "Whitelist entry removed.", (cur) => ({ ...cur, friends: cur.friends.filter((x) => x.id !== f.id) }));
              }} />
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div style={{ position: "fixed", bottom: 22, left: "50%", transform: "translateX(-50%)", zIndex: 400, background: "#1a1715", color: "#fff", fontSize: 12.5, padding: "9px 16px", borderRadius: 999, boxShadow: "0 10px 30px rgba(0,0,0,0.3)", animation: "adm-toast .2s ease", whiteSpace: "nowrap" }}>
          {toast}
        </div>
      )}
    </div>
  );
}
