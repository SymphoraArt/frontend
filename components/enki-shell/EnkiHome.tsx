"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTheme } from "../../providers/ThemeProvider";
import { useHoldings } from "@/hooks/useHoldings";
import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";
import { useEmailAuth } from "@/hooks/useEmailAuth";
import { useSolanaAuth } from "@/hooks/useSolanaAuth";
import { useBetaAccess } from "@/components/BetaGate";
import UsernameOnboard from "./UsernameOnboard";
import AnalyticsPanel from "./AnalyticsPanel";
import NotificationsPanel from "./NotificationsPanel";
import { useRecoveryStatus } from "@/hooks/useRecoveryStatus";
import { useNotifications } from "@/hooks/useNotifications";
import EnkiFeedPage from "@/components/enki/EnkiFeedPage";
import EnkiSidebar, { type NavItem } from "./EnkiSidebar";
import ReferModal from "./ReferModal";
import NodeCreator from "./NodeCreator";
import EnkiPanel from "./EnkiPanel";
import { EDIT_PROMPT_EVENT, consumePromptEdit } from "./editorBridge";
import { Icon } from "./icons";
import SettingsPage from "../../app/settings/page";
import ProfilePage from "../../app/profile/page";
import LeaderboardPage from "../../app/leaderboard/page";
import "./enki-shell.css";
import "./nodes.css";

const PANEL_TITLES: Record<string, string> = {
  billing: "Payment", settings: "Settings", profile: "My Profile",
  leaderboard: "Hall of Fame", favorites: "Bookmarks", notifications: "Notifications", messages: "Messages",
  color: "Color Setup", analytics: "Analytics",
};

const THEME_OPTIONS = [
  { key: "light", label: "Light", sub: "Bright paper look" },
  { key: "dark", label: "Dark", sub: "Teal dark — the default" },
  { key: "purple", label: "Purple", sub: "Purple-tinted dark" },
] as const;

const NAV: NavItem[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "search", label: "Search", icon: "search" },
  // Notifications = the activity feed (comments/ratings/generations/guardians);
  // Messages = person-to-person DMs (still a stub until that system exists).
  { id: "notifications", label: "Notifications", icon: "bell" },
  { id: "messages", label: "Messages", icon: "message" },
  { id: "favorites", label: "Bookmarks", icon: "bookmark" },
  { id: "leaderboard", label: "Hall of Fame", icon: "trophy" },
  { id: "analytics", label: "Analytics", icon: "chart" },
  { id: "color", label: "Color Setup", icon: "palette" },
  { id: "settings", label: "Settings", icon: "settings" },
];

// Personal areas: hidden from (and blocked for) visitors who aren't signed in.
// (Matters post-beta, when guests may browse the feed again.) History moved
// to the owner's own Profile as a tab.
const AUTHED_ONLY = new Set(["settings", "favorites", "analytics", "notifications", "messages"]);

// Same safe-wrapper pattern the old Navbar used: these wallet hooks throw if a
// provider is momentarily absent, so swallow and fall back to "not connected".
function useSafeActiveAccount() {
  try { return useActiveAccount(); } catch { return null; }
}

export default function EnkiHome() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const account = useSafeActiveAccount();
  const { address: turnkeyAddress, clear: turnkeyClear } = useTurnkeyEmailAuth();
  const { isAuthed: emailAuthed, email, logout: emailLogout } = useEmailAuth();
  const { isAuthenticated: solanaAuthed, walletAddress: solanaAddress, logout: solanaLogout } = useSolanaAuth();
  const { connected: adapterConnected, disconnect: adapterDisconnect } = useWallet();
  const walletAddress = account?.address ?? turnkeyAddress ?? (solanaAuthed ? solanaAddress : null);
  const { balance } = useHoldings(walletAddress);

  // Access + username come from the root BetaGate (it already verified the
  // session server-side before this shell could even mount).
  const { access, handle: myHandle, setHandle: setMyHandle, profile: myProfile } = useBetaAccess();
  const authed = access === "ok";

  const emailName = emailAuthed && email ? email.split("@")[0] : null;
  const initials = myHandle
    ? myHandle.slice(0, 2).toUpperCase()
    : walletAddress
      ? (walletAddress.startsWith("0x") ? walletAddress.slice(2, 4) : walletAddress.slice(0, 2)).toUpperCase()
      : emailName ? emailName.slice(0, 2).toUpperCase() : "EA";
  const handle = myHandle ?? (walletAddress ? walletAddress.replace(/^0x/, "").slice(0, 8).toLowerCase() : emailName?.toLowerCase() ?? "guest");
  const name = myHandle ?? (walletAddress ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}` : emailName ?? "Guest");

  const [narrow, setNarrow] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  // The user's own menu preference survives editor round-trips (localStorage)
  // and Create-Prompt-2 sessions (ref): opening the node creator force-collapses,
  // closing it restores whatever the menu was before.
  const MENU_KEY = "ek-menu-collapsed";
  const prevCollapsedRef = useRef<boolean | null>(null);
  useEffect(() => {
    try {
      const stored = localStorage.getItem(MENU_KEY);
      if (stored !== null && window.innerWidth >= 1100) setCollapsed(stored === "1");
    } catch { /* storage unavailable */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [nodeOpen, setNodeOpen] = useState(false);
  const [referOpen, setReferOpen] = useState(false);
  // Balance chip → Payment panel, scrolled to "Add money" with a heartbeat.
  const [payFocus, setPayFocus] = useState(false);
  const closePanel = () => { setPanel(null); setPayFocus(false); };
  // Bumped on every menu click that opens a panel: the panel content REMOUNTS,
  // so re-clicking Settings always starts back on its first page instead of
  // keeping the tab you were on.
  const [panelNonce, setPanelNonce] = useState(0);
  // settingsTab lets a caller (the recovery banner) deep-link Settings to a
  // specific tab; a plain Settings nav click clears it back to the first page.
  const [settingsTab, setSettingsTab] = useState<string | undefined>(undefined);
  const openPanel = (id: string, tab?: string) => {
    setSettingsTab(id === "settings" ? tab : undefined);
    setPanel(id);
    setPanelNonce((n) => n + 1);
  };
  const openRecoverySettings = () => { setNodeOpen(false); setActiveNav("settings"); openPanel("settings", "recovery"); };

  // Unread notifications → badge on Notifications. The shared store polls +
  // refreshes on focus (near-realtime) and clears optimistically on open, so
  // the badge here just follows it — no local fetch/race to manage.
  const { unseen } = useNotifications(authed);

  // No recovery set up → thin red banner across the top. The X hides it on
  // this device; Settings shows its own non-dismissible copy regardless.
  const recovery = useRecoveryStatus(authed);
  const [bannerDismissed, setBannerDismissed] = useState(true);
  useEffect(() => {
    try { setBannerDismissed(localStorage.getItem("ek-recovery-banner") === "1"); } catch { /* stays hidden */ }
  }, []);
  const dismissBanner = () => {
    setBannerDismissed(true);
    try { localStorage.setItem("ek-recovery-banner", "1"); } catch { /* session-only then */ }
  };
  const showRecoveryBanner = authed && recovery !== null && recovery.confirmed === 0 && !bannerDismissed;
  // Log off: confirm dialog + the actual sign-out across every auth surface.
  const [logoffOpen, setLogoffOpen] = useState(false);
  const [logoffBusy, setLogoffBusy] = useState(false);
  useEffect(() => {
    if (!logoffOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLogoffOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [logoffOpen]);
  const doLogoff = async () => {
    setLogoffBusy(true);
    try {
      await solanaLogout(); // deletes the server session, then local storage
      emailLogout();
      turnkeyClear();
      if (adapterConnected) await adapterDisconnect().catch(() => {});
    } finally {
      window.location.href = "/"; // hard reload → landing, all client state reset
    }
  };
  const [activeNav, setActiveNav] = useState("home");
  const [toast, setToast] = useState<string | null>(null);
  const [panel, setPanel] = useState<string | null>(null); // which menu item shows in the right panel
  const [editPrompt, setEditPrompt] = useState<unknown>(null); // prompt being edited in the node creator

  // A prompt card's pencil → open Create Prompt 2 loaded with that prompt.
  useEffect(() => {
    const onEdit = () => { setEditPrompt(consumePromptEdit()); setPanel(null); setNodeOpen(true); setActiveNav("home"); };
    window.addEventListener(EDIT_PROMPT_EVENT, onEdit);
    return () => window.removeEventListener(EDIT_PROMPT_EVENT, onEdit);
  }, []);

  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const searchRef = useRef<HTMLInputElement>(null);
  const debRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // The node creator no longer forces the rail — the collapse toggle stays a
  // pure menu open/close even while Create Prompt 2 is open.
  // The collapse toggle is the single source of truth, so the ">" arrow always
  // expands — narrow viewports only AUTO-collapse (and auto-expand) on crossing
  // the threshold; the user can still override either way.
  const rail = collapsed;

  useEffect(() => {
    const onResize = () => {
      const n = window.innerWidth < 1100;
      if (n !== narrow) { setNarrow(n); setCollapsed(n); }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [narrow]);

  // ⌘/Ctrl+K focuses search (matches the topbar hint).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Live search → drives the feed via the ?q= param EnkiFeedPage already reads.
  const pushQuery = (q: string) => {
    setQuery(q);
    if (debRef.current) clearTimeout(debRef.current);
    debRef.current = setTimeout(() => {
      router.replace(q ? `/home?q=${encodeURIComponent(q)}` : "/home", { scroll: false });
    }, 250);
  };

  const showToast = (msg: string) => { setToast(msg); window.setTimeout(() => setToast(null), 2400); };

  // Manual menu toggle → remember the preference (also mid-node-session).
  const toggleMenu = () => setCollapsed((c) => {
    const n = !c;
    try { localStorage.setItem(MENU_KEY, n ? "1" : "0"); } catch { /* noop */ }
    if (nodeOpen) prevCollapsedRef.current = n;
    return n;
  });

  // Closing Create Prompt 2 restores the menu to how it was before it opened.
  const closeNode = () => {
    setNodeOpen(false);
    setEditPrompt(null);
    if (prevCollapsedRef.current !== null && !narrow) setCollapsed(prevCollapsedRef.current);
    prevCollapsedRef.current = null;
  };

  const onNav = (id: string) => {
    if (nodeOpen) closeNode();
    // Guests can browse, but personal areas need an account.
    if (!authed && AUTHED_ONLY.has(id)) { showToast("Sign in to use this."); return; }
    if (id === "home") { setPanel(null); setActiveNav("home"); router.push("/home"); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    if (id === "search") { setPanel(null); setActiveNav("search"); window.scrollTo({ top: 0, behavior: "smooth" }); searchRef.current?.focus(); return; }
    // Every other menu item opens in the standalone right-side panel.
    setActiveNav(id);
    openPanel(id);
  };
  // Unified panel headline — same serif as the landing "Expert-crafted AI Art".
  const PanelHeadline = ({ title, sub }: { title: string; sub?: string }) => (
    <div className="ek-panel-hero">
      <h1><em>{title}</em></h1>
      {sub && <p>{sub}</p>}
    </div>
  );
  // Unified panel frame — same centered width as the Hall of Fame.
  const PanelFrame = ({ children }: { children: React.ReactNode }) => (
    <div style={{ maxWidth: 1080, margin: "0 auto" }}>{children}</div>
  );

  const renderPanel = (key: string) => {
    switch (key) {
      case "color": return (
        <>
        <PanelHeadline title="Color Setup" sub="Pick how Enki Art looks on this device." />
        <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "12px 40px 40px" }}>
          {THEME_OPTIONS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTheme(t.key)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2,
                padding: "14px 16px", borderRadius: 10, cursor: "pointer", textAlign: "left",
                border: theme === t.key ? "2px solid var(--enki-ember, #c96838)" : "1px solid var(--enki-rule)",
                background: theme === t.key ? "rgba(201, 104, 56, 0.08)" : "transparent",
                color: "var(--enki-ink)",
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600 }}>
                {t.label} {theme === t.key && <span style={{ color: "var(--enki-ember, #c96838)" }}>✓</span>}
              </span>
              <span style={{ fontSize: 12, color: "var(--enki-ink-3)" }}>{t.sub}</span>
            </button>
          ))}
        </div>
        </>
      );
      // Balance chip + billing entries render the EXACT Settings → Payment
      // view (same container, same scale), scrolled to "Add money".
      case "billing": return <SettingsPage initialTab="payment" focusRamp={payFocus} />;
      case "analytics": return (
        <PanelFrame>
          <PanelHeadline title="Analytics" sub="How your prompts perform: earnings, views, opens and ratings." />
          <div style={{ padding: "0 40px 40px" }}>
            <AnalyticsPanel />
          </div>
        </PanelFrame>
      );
      case "notifications": return (
        <PanelFrame>
          <PanelHeadline title="Notifications" sub="What happened around your work: comments, ratings, generations and guardian answers." />
          <NotificationsPanel onOpenRecovery={openRecoverySettings} />
        </PanelFrame>
      );
      case "messages": return (
        <PanelFrame>
          <PanelHeadline title="Messages" sub="Direct messages with other creators — coming soon." />
          <div className="ek-panel-stub" style={{ height: "auto", padding: "80px 40px" }}>
            <Icon name="message" size={26} stroke={1.6} />
            <p>Person-to-person messaging is on the way.</p>
          </div>
        </PanelFrame>
      );
      case "settings": return <SettingsPage initialTab={settingsTab} globalBannerVisible={showRecoveryBanner} focusGuardians={settingsTab === "recovery"} />;
      case "profile": return <ProfilePage onBack={() => { setPanel(null); setActiveNav("home"); }} />;
      case "leaderboard": return (
        <PanelFrame>
          <PanelHeadline title="Hall of Fame" sub="Top creators and earners on Enki Art." />
          <LeaderboardPage />
        </PanelFrame>
      );
      default: return (
        <PanelFrame>
          <PanelHeadline title={PANEL_TITLES[key] || key} />
          <div className="ek-panel-stub" style={{ height: "auto", padding: "80px 40px" }}>
            <Icon name="sparkles" size={26} stroke={1.6} />
            <p>This space is coming soon.</p>
          </div>
        </PanelFrame>
      );
    }
  };

  const rootClass = "ek-app" + (rail ? " ek-root--rail" : "") + (nodeOpen ? " ek-node-open" : "")
    + (showRecoveryBanner ? " ek-with-banner" : "");

  return (
    <div className={rootClass}>
      {showRecoveryBanner && (
        <div className="ek-recovery-banner" role="alert">
          <button className="ek-recovery-banner-msg" onClick={openRecoverySettings}>
            No recovery set up. Lose this login and the account is gone — set up a guardian.
          </button>
          <button
            className="ek-recovery-banner-x"
            aria-label="Dismiss"
            onClick={dismissBanner}
          >
            <Icon name="x" size={14} stroke={2.4} />
          </button>
        </div>
      )}
      <div className="ek-shell">
        <EnkiSidebar
          nav={(authed ? NAV : NAV.filter((n) => !AUTHED_ONLY.has(n.id))).map((n) =>
            n.id === "notifications" && unseen > 0 ? { ...n, badge: unseen } : n
          )}
          active={activeNav}
          onNav={onNav}
          rail={rail}
          onCreate={() => router.push("/editor")}
          onCreate2={() => {
            prevCollapsedRef.current = collapsed;
            // Close any open right-side panel first — the node creator (z 118)
            // sits below the panel scrim (z 160) and would open invisibly.
            closePanel();
            setNodeOpen(true); setActiveNav("home"); setCollapsed(true);
          }}
          nodeActive={nodeOpen}
          onRefer={() => setReferOpen(true)}
          account={{ name, handle, initials, avatarUrl: myProfile?.avatarUrl ?? null }}
          collapsed={rail}
          onToggleCollapse={toggleMenu}
          balance={balance ?? 0}
          onProfile={() => { setNodeOpen(false); setActiveNav(""); openPanel("profile"); }}
          onTopUp={() => { setNodeOpen(false); setPayFocus(true); openPanel("billing"); }}
          onLogoff={authed ? () => setLogoffOpen(true) : undefined}
          theme={theme}
          setTheme={setTheme}
        />

        <main className="ek-main">
          <div className="ek-topbar">
            <div className="ek-search">
              <Icon name="search" size={16} stroke={2} style={{ color: "var(--enki-ink-3)", flexShrink: 0 }} />
              <input
                ref={searchRef}
                value={query}
                placeholder="Search prompts, artists, tags…"
                onChange={(e) => pushQuery(e.target.value)}
                aria-label="Search prompts"
              />
              <span className="ek-kbd">Ctrl K</span>
            </div>
          </div>
          <EnkiFeedPage />
        </main>
      </div>

      {panel && (
        <EnkiPanel title={PANEL_TITLES[panel] || panel} onClose={closePanel} full>
          {/* The key remounts only the CONTENT (fresh state per menu click);
              the panel shell stays mounted, so its fade-in doesn't replay and
              the home feed never flashes through between panels. */}
          <div key={`${panel}:${panelNonce}`} style={{ display: "contents" }}>
            {renderPanel(panel)}
          </div>
        </EnkiPanel>
      )}

      {nodeOpen && (
        <NodeCreator onClose={closeNode} onToast={showToast} userKey={walletAddress} sidebarW={rail ? 78 : 256} editPrompt={editPrompt} />
      )}

      {referOpen && (
        <ReferModal
          userKey={walletAddress}
          onClose={() => setReferOpen(false)}
          onSubmit={(r) => {
            setReferOpen(false);
            showToast("Referral submitted for review · " + String(r.url).replace(/^https?:\/\//, "").slice(0, 32));
          }}
        />
      )}

      {logoffOpen && (
        <div className="ek-modal-scrim" onClick={() => !logoffBusy && setLogoffOpen(false)}>
          <div className="ek-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <div className="ek-modal-head">
              <span className="ek-sheet-bolt"><Icon name="logout" size={16} stroke={2} /></span>
              <span className="ek-modal-title">Log off?</span>
              <button className="ek-modal-x" onClick={() => setLogoffOpen(false)} disabled={logoffBusy}>
                <Icon name="x" size={17} stroke={2} />
              </button>
            </div>
            <div className="ek-modal-body">
              <p style={{ fontSize: 13.5, color: "var(--enki-ink-3)", lineHeight: 1.55, marginBottom: 18 }}>
                You&apos;ll be signed out on this device and land back on the front page.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <button className="ek-btn" style={{ minHeight: 44 }} onClick={doLogoff} disabled={logoffBusy}>
                  <Icon name="logout" size={15} stroke={2} /> {logoffBusy ? "Logging off…" : "Yes, log me off"}
                </button>
                <button
                  onClick={() => setLogoffOpen(false)}
                  disabled={logoffBusy}
                  style={{ minHeight: 36, border: "none", background: "transparent", color: "var(--enki-ink-3)", fontSize: 12.5, cursor: "pointer" }}
                >
                  Stay signed in
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="ek-toast"><Icon name="sparkles" size={16} stroke={2} fill="currentColor" /> {toast}</div>
      )}

      {/* First login with no username yet → the big name picker (no skip —
          a free adjective_artist default is prefilled). */}
      {myHandle === null && (
        <UsernameOnboard email={email} wallet={walletAddress} onDone={(h) => setMyHandle(h)} />
      )}
    </div>
  );
}
