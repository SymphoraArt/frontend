"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";

export type ThemeId = "light" | "dark" | "purple";

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
}

/* Sidebar shows at most 10 characters of the name — the row stays tidy. */
const clip10 = (s: string) => (s.length > 10 ? s.slice(0, 10) + "…" : s);

const THEME_OPTS: { id: ThemeId; name: string; sw: string }[] = [
  { id: "light", name: "Bright", sw: "linear-gradient(135deg,#faf8f4,#e8e2d6)" },
  { id: "dark", name: "Dark", sw: "linear-gradient(135deg,#0a1825,#16303f)" },
  { id: "purple", name: "Purple", sw: "linear-gradient(135deg,#1a1228,#6d28d9)" },
];

interface SidebarProps {
  nav: NavItem[];
  active: string;
  onNav: (id: string) => void;
  rail: boolean;
  onCreate: () => void;
  onCreate2: () => void;
  nodeActive?: boolean;
  onRefer: () => void;
  onFeedback?: () => void;
  account: { name: string; handle: string; initials: string; avatarUrl?: string | null };
  onToggleCollapse: () => void;
  collapsed: boolean;
  balance: number;
  onProfile: () => void;
  onTopUp: () => void;
  onLogoff?: () => void;
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
}

export default function EnkiSidebar({
  nav, active, onNav, rail, onCreate, onCreate2, nodeActive, onRefer, onFeedback,
  account, onToggleCollapse, collapsed, balance, onProfile, onTopUp, onLogoff, theme, setTheme,
}: SidebarProps) {
  const [colorOpen, setColorOpen] = useState(false);
  const colorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!colorOpen) return;
    const onDoc = (e: MouseEvent) => {
      if (colorRef.current && !colorRef.current.contains(e.target as Node)) setColorOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [colorOpen]);

  return (
    <aside className="ek-sidebar">
      <button
        className="ek-collapse-btn"
        type="button"
        onClick={onToggleCollapse}
        aria-label={collapsed ? "Expand menu" : "Collapse menu"}
        title={collapsed ? "Expand menu" : "Collapse menu"}
      >
        <Icon name="chevronLeft" size={16} stroke={2.4} style={{ transform: collapsed ? "rotate(180deg)" : "none" }} />
      </button>

      <a className="ek-logo" onClick={() => onNav("home")}>
        {rail ? (
          <span className="ek-logo-mark"><img className="ek-logo-mark-img" src="/favicon.svg" alt="Enki Art" /></span>
        ) : (
          <img className="ek-logo-img" src="/enki-art-logo.png" alt="Enki Art" />
        )}
      </a>

      <nav className="ek-nav">
        {nav.map((item) => {
          return (
            <button key={item.id} className={"ek-nav-item" + (active === item.id ? " active" : "")} onClick={() => onNav(item.id)} type="button">
              <span className="ek-nav-ico"><Icon name={item.icon} size={23} stroke={active === item.id ? 2.4 : 1.9} /></span>
              {!rail && <span className="ek-nav-label">{item.label}</span>}
              {item.badge ? <span className="ek-nav-badge">{item.badge}</span> : null}
              {rail && <span className="ek-nav-tip">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* ── Earn money: refer + feedback, both pay out ── */}
      {!rail && (
        <div className="ek-earn-lab">
          <span>Earn money</span>
          <span className="ek-earn-rule" />
        </div>
      )}
      <button className="ek-earn-row" onClick={onRefer} type="button" title="Refer a prompt — earn when it goes live">
        <Icon name="link" size={18} stroke={1.9} />
        {!rail && <span className="ek-earn-label">Refer a prompt</span>}
        {!rail && <span className="ek-earn-chip">$</span>}
        {rail && <span className="ek-nav-tip">Refer a prompt · earn</span>}
      </button>
      {onFeedback && (
        <button className="ek-earn-row" onClick={onFeedback} type="button" title="Feedback — win $100 if we build your change">
          <Icon name="message" size={18} stroke={1.9} />
          {!rail && <span className="ek-earn-label">Feedback</span>}
          {!rail && <span className="ek-earn-chip">$100</span>}
          {rail && <span className="ek-nav-tip">Feedback · win $100</span>}
        </button>
      )}

      <button className="ek-create" onClick={onCreate} type="button" title="Create Prompt" style={{ marginTop: 12 }}>
        <Icon name="pen" size={20} stroke={2.2} />
        {!rail && <span className="ek-create-label">Create Prompt</span>}
        {rail && <span className="ek-nav-tip">Create Prompt</span>}
      </button>

      <button className={"ek-create ek-create2" + (nodeActive ? " active" : "")} onClick={onCreate2} type="button" title="Create Prompt 2 — Node Creator">
        <Icon name="grid" size={19} stroke={2.2} />
        {!rail && <span className="ek-create-label">Create Prompt 2</span>}
        {rail && <span className="ek-nav-tip">Node Creator</span>}
      </button>

      <div className="ek-side-spacer" />

      <div className="ek-account" role="button" onClick={onProfile} title="View profile" ref={colorRef}>
        <span className="ek-avatar">
          {account.avatarUrl
            ? /* eslint-disable-next-line @next/next/no-img-element */
              <img src={account.avatarUrl} alt="" />
            : account.initials}
        </span>
        {!rail && (
          <>
            <span className="ek-account-info">
              <span className="ek-account-nametext">{clip10(account.name)}</span>
              <span className="ek-account-handle">@{clip10(account.handle)}</span>
            </span>
            {/* money + log off stacked at the far right — long names stay clear */}
            <span className="ek-account-side">
              <span className="ek-balance" onClick={(e) => { e.stopPropagation(); onTopUp(); }} title="Add funds">
                <Icon name="dollar" size={11} stroke={2.4} />{balance.toFixed(2)}
              </span>
              {onLogoff && (
                <button
                  className="ek-logoff"
                  type="button"
                  title="Log off"
                  aria-label="Log off"
                  onClick={(e) => { e.stopPropagation(); onLogoff(); }}
                >
                  <Icon name="logout" size={13} stroke={2.2} />
                </button>
              )}
            </span>
          </>
        )}
        {/* 3-dot menu (hover to reveal): the color theme lives here */}
        <button
          className={"ek-kebab" + (colorOpen ? " on" : "") + (rail ? " ek-kebab--rail" : "")}
          type="button"
          title="Options"
          aria-haspopup="menu"
          aria-expanded={colorOpen}
          onClick={(e) => { e.stopPropagation(); setColorOpen((o) => !o); }}
        >
          <Icon name="dots" size={14} stroke={2.2} />
        </button>
        {colorOpen && (
          <div className="ek-color-dd ek-color-dd--up" onClick={(e) => e.stopPropagation()}>
            <div className="ek-color-dd-h">Color theme</div>
            {THEME_OPTS.map((t) => (
              <button key={t.id} type="button" className={"ek-color-opt" + (theme === t.id ? " active" : "")} onClick={() => setTheme(t.id)}>
                <span className="ek-color-sw" style={{ background: t.sw }} />
                {t.name}
                {theme === t.id && <span className="ek-color-check"><Icon name="check" size={16} stroke={2.4} /></span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}
