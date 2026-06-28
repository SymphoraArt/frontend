"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";
import { useTheme } from "../../providers/ThemeProvider";
import { useHoldings } from "@/hooks/useHoldings";
import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";
import EnkiFeedPage from "@/components/enki/EnkiFeedPage";
import EnkiSidebar, { type NavItem } from "./EnkiSidebar";
import ReferModal from "./ReferModal";
import NodeCreator from "./NodeCreator";
import EnkiPanel from "./EnkiPanel";
import { EDIT_PROMPT_EVENT, consumePromptEdit } from "./editorBridge";
import { Icon } from "./icons";
import BillingPanel from "@/components/settings/BillingPanel";
import SettingsPage from "../../app/settings/page";
import ProfilePage from "../../app/profile/page";
import LeaderboardPage from "../../app/leaderboard/page";
import "./enki-shell.css";
import "./nodes.css";

const PANEL_TITLES: Record<string, string> = {
  billing: "Balance & Top-up", settings: "Settings", profile: "My Profile",
  leaderboard: "Hall of Fame", favorites: "Favorites", history: "History", messages: "Messages",
};

const NAV: NavItem[] = [
  { id: "home", label: "Home", icon: "home" },
  { id: "search", label: "Search", icon: "search" },
  { id: "favorites", label: "Favorites", icon: "heart" },
  { id: "leaderboard", label: "Hall of Fame", icon: "trophy" },
  { id: "history", label: "History", icon: "history" },
  { id: "messages", label: "Messages", icon: "message", badge: 3 },
  { id: "color", label: "Color Setup", icon: "palette" },
  { id: "settings", label: "Settings", icon: "settings" },
];

// Same safe-wrapper pattern the old Navbar used: these wallet hooks throw if a
// provider is momentarily absent, so swallow and fall back to "not connected".
function useSafeActiveAccount() {
  try { return useActiveAccount(); } catch { return null; }
}

export default function EnkiHome() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const account = useSafeActiveAccount();
  const { address: turnkeyAddress } = useTurnkeyEmailAuth();
  const walletAddress = account?.address ?? turnkeyAddress ?? null;
  const { balance } = useHoldings(walletAddress);

  const initials = walletAddress
    ? (walletAddress.startsWith("0x") ? walletAddress.slice(2, 4) : walletAddress.slice(0, 2)).toUpperCase()
    : "EA";
  const handle = walletAddress ? walletAddress.replace(/^0x/, "").slice(0, 8).toLowerCase() : "guest";
  const name = walletAddress ? `${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}` : "Guest";

  const [narrow, setNarrow] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [nodeOpen, setNodeOpen] = useState(false);
  const [referOpen, setReferOpen] = useState(false);
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

  const onNav = (id: string) => {
    setNodeOpen(false);
    if (id === "home") { setPanel(null); setActiveNav("home"); router.push("/home"); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    if (id === "search") { setPanel(null); setActiveNav("search"); window.scrollTo({ top: 0, behavior: "smooth" }); searchRef.current?.focus(); return; }
    // Every other menu item opens in the standalone right-side panel.
    setActiveNav(id);
    setPanel(id);
  };
  const renderPanel = (key: string) => {
    switch (key) {
      case "billing": return <BillingPanel />;
      case "settings": return <SettingsPage />;
      case "profile": return <ProfilePage />;
      case "leaderboard": return <LeaderboardPage />;
      default: return (
        <div className="ek-panel-stub">
          <Icon name="sparkles" size={26} stroke={1.6} />
          <p>{PANEL_TITLES[key] || key} is coming to this panel soon.</p>
        </div>
      );
    }
  };

  const rootClass = "ek-app" + (rail ? " ek-root--rail" : "") + (nodeOpen ? " ek-node-open" : "");

  return (
    <div className={rootClass}>
      <div className="ek-shell">
        <EnkiSidebar
          nav={NAV}
          active={activeNav}
          onNav={onNav}
          rail={rail}
          onCreate={() => router.push("/editor")}
          onCreate2={() => { setNodeOpen(true); setActiveNav("home"); setCollapsed(true); }}
          nodeActive={nodeOpen}
          onRefer={() => setReferOpen(true)}
          account={{ name, handle, initials }}
          collapsed={rail}
          onToggleCollapse={() => setCollapsed((c) => !c)}
          balance={balance ?? 0}
          onProfile={() => { setNodeOpen(false); setActiveNav(""); setPanel("profile"); }}
          onTopUp={() => { setNodeOpen(false); setPanel("billing"); }}
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
        <EnkiPanel title={PANEL_TITLES[panel] || panel} onClose={() => setPanel(null)} full>
          {renderPanel(panel)}
        </EnkiPanel>
      )}

      {nodeOpen && (
        <NodeCreator onClose={() => { setNodeOpen(false); setEditPrompt(null); }} onToast={showToast} userKey={walletAddress} sidebarW={rail ? 78 : 256} editPrompt={editPrompt} />
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

      {toast && (
        <div className="ek-toast"><Icon name="sparkles" size={16} stroke={2} fill="currentColor" /> {toast}</div>
      )}
    </div>
  );
}
