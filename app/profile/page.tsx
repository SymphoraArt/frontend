"use client";

import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useActiveAccount } from "thirdweb/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";
import EnkiDetailPanel from "@/components/enki/EnkiDetailPanel";
import { mapMarketplacePromptToEnkiPrompt } from "@/lib/enkiPromptAdapter";
import type { EnkiPrompt } from "@/lib/enkiPromptAdapter";
import { listCreations, subscribeCreations, type StoredCreation } from "@/lib/creations";
import GalleryImageModal from "@/components/GalleryImageModal";
import { useSearchParams, useRouter } from "next/navigation";
import {
  LayoutGrid,
  Bookmark,
  Clock,
  User,
  CreditCard,
  BarChart3,
  Sparkles,
  Plus,
  ImageOff,
  Pencil,
  Check,
  SlidersHorizontal,
} from "lucide-react";

// ─── Dark dashboard palette (matches the profile reference design) ───
const C = {
  bg: "#0c0c11",
  panel: "#15151d",
  panelHover: "#1b1b25",
  border: "rgba(255,255,255,0.08)",
  borderStrong: "rgba(255,255,255,0.14)",
  text: "#f4f4f6",
  muted: "#8a8a95",
  faint: "#5f5f6a",
  accent: "#8b5cf6",
  accentGrad: "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
};

type Mode = "buyer" | "creator";
type Section =
  | "renders"
  | "saved"
  | "purchases"
  | "analytics"
  | "prompts"
  | "profile"
  | "billing";

function useSafeActiveAccount() {
  try { return useActiveAccount(); } catch { return null; }
}

export default function ProfilePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 860px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const account = useSafeActiveAccount();
  const { publicKey: solanaPublicKey } = useWallet();
  const { address: turnkeyAddress, sessionToken: turnkeySession } = useTurnkeyEmailAuth();
  const walletAddress =
    account?.address ?? solanaPublicKey?.toBase58() ?? turnkeyAddress ?? null;
  const payAddress = account?.address ?? turnkeyAddress ?? null;
  const isAuthed = !!walletAddress;

  // ─── Mode (Buyer / Creator) + active sidebar section ───
  const [mode, setMode] = useState<Mode>("buyer");
  const tabParam = searchParams.get("tab");
  const initialSection: Section = tabParam === "Gallery" ? "renders" : "renders";
  const [section, setSection] = useState<Section>(initialSection);

  const switchMode = (next: Mode) => {
    setMode(next);
    setSection(next === "buyer" ? "renders" : "analytics");
  };

  // ─── Editable username (stored locally per wallet) ───
  const [username, setUsername] = useState<string>("");
  const [editingName, setEditingName] = useState(false);

  useEffect(() => {
    if (!walletAddress) { setUsername(""); return; }
    try {
      setUsername(localStorage.getItem(`enki:username:${walletAddress}`) ?? "");
    } catch { setUsername(""); }
  }, [walletAddress]);

  useEffect(() => {
    if (!walletAddress) return;
    try { localStorage.setItem(`enki:username:${walletAddress}`, username); } catch { /* ignore */ }
  }, [username, walletAddress]);

  const displayName = username.trim() || (isAuthed ? "Your account" : "Guest");
  const handle = username.trim()
    ? `@${username.trim().toLowerCase().replace(/\s+/g, "")}`
    : isAuthed
      ? "@you"
      : "@guest";
  const avatarInitials = useMemo(() => {
    const base = username.trim();
    if (!base) return isAuthed ? "EA" : "—";
    const parts = base.split(/\s+/).filter(Boolean).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("") || base[0]?.toUpperCase() || "EA";
  }, [username, isAuthed]);

  // ─── Favorites (saved styles) ───
  const [favs, setFavs] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(localStorage.getItem("enki:favorites") || "{}"); } catch { return {}; }
  });
  const toggleFav = (id: string) => {
    setFavs((current) => {
      const next = { ...current, [id]: !current[id] };
      if (typeof window !== "undefined") localStorage.setItem("enki:favorites", JSON.stringify(next));
      return next;
    });
  };

  // ─── Released / marketplace prompts ───
  const { data, isError } = useQuery({
    queryKey: ["/api/marketplace/prompts", "profile"],
    queryFn: async () => {
      const params = new URLSearchParams({ limit: "24", sortBy: "newest" });
      const res = await fetch(`/api/marketplace/prompts?${params.toString()}`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to load prompts");
      return res.json();
    },
    staleTime: 60_000,
  });
  const prompts = useMemo<EnkiPrompt[]>(() => {
    if (isError) return [];
    return Array.isArray(data?.prompts)
      ? data.prompts.map((item: unknown, index: number) => mapMarketplacePromptToEnkiPrompt(item, index))
      : [];
  }, [data, isError]);

  const savedPrompts = useMemo(() => prompts.filter((p) => favs[p.id]), [prompts, favs]);

  // ─── Gallery / "My renders" ───
  const [galleryItems, setGalleryItems] = useState<StoredCreation[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);

  useEffect(() => {
    if (!walletAddress) { setGalleryItems([]); setGalleryLoading(false); return; }
    let cancelled = false;
    const load = async () => {
      setGalleryLoading(true);
      const local = await listCreations(walletAddress);
      try {
        const res = await fetch(`/api/generations?userId=${encodeURIComponent(walletAddress)}&limit=50`);
        if (!res.ok) throw new Error("Failed");
        const json = await res.json();
        const raw = json?.data?.generations ?? json?.generations ?? json?.items ?? [];
        const gens = Array.isArray(raw) ? raw : [];
        const dbMapped = gens
          .filter((g: any) => g.image_urls?.length || g.image_url)
          .map((g: any) => ({
            id: String(g.id),
            imageUrl: g.image_urls?.[0] || g.image_url || "",
            prompt: g.final_prompt || g.prompt || "",
            createdAt: typeof g.created_at === "string" ? g.created_at : new Date().toISOString(),
            isUploaded: g.settings?.origin === "uploaded" || g.status === "uploaded",
          }));
        const dbUrls = new Set(dbMapped.map((c: any) => c.imageUrl));
        const localOnly = local.filter((c) => c.imageUrl && !dbUrls.has(c.imageUrl));
        const merged = [...dbMapped, ...localOnly].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        if (!cancelled) setGalleryItems(merged);
      } catch {
        if (!cancelled) setGalleryItems(local);
      } finally {
        if (!cancelled) setGalleryLoading(false);
      }
    };
    load();
    const unsub = subscribeCreations(walletAddress, () => load());
    return () => { cancelled = true; unsub(); };
  }, [walletAddress]);

  const [open, setOpen] = useState<EnkiPrompt | null>(null);
  const [activeCreation, setActiveCreation] = useState<StoredCreation | null>(null);

  const savedCount = Object.values(favs).filter(Boolean).length;

  // ─── Sidebar nav config ───
  const activityItems =
    mode === "buyer"
      ? [
          { id: "renders" as Section, label: "My renders", icon: LayoutGrid, badge: galleryItems.length || undefined },
          { id: "saved" as Section, label: "Saved styles", icon: Bookmark, badge: savedCount || undefined },
          { id: "purchases" as Section, label: "Purchases", icon: Clock, badge: undefined },
        ]
      : [
          { id: "analytics" as Section, label: "Analytics", icon: BarChart3, badge: undefined },
          { id: "prompts" as Section, label: "My prompts", icon: LayoutGrid, badge: prompts.length || undefined },
        ];

  const accountItems = [
    { id: "profile" as Section, label: "Profile", icon: User },
    { id: "billing" as Section, label: "Billing", icon: CreditCard },
  ];

  const handleSectionClick = (id: Section) => {
    if (id === "billing") { router.push("/settings?tab=billing"); return; }
    setSection(id);
  };

  // ─── Reusable bits ───
  const navButton = (
    id: Section,
    label: string,
    Icon: any,
    badge?: number,
  ) => {
    const active = section === id;
    return (
      <button
        key={id}
        onClick={() => handleSectionClick(id)}
        style={{
          display: "flex", alignItems: "center", gap: 10, width: "100%",
          padding: "9px 12px", borderRadius: 10, border: "none", cursor: "pointer",
          background: active ? "rgba(139,92,246,0.14)" : "transparent",
          color: active ? C.text : C.muted,
          fontSize: 13.5, fontWeight: active ? 600 : 500, textAlign: "left",
          fontFamily: "var(--font-sans)", transition: "background 0.15s, color 0.15s",
        }}
        onMouseEnter={(e) => { if (!active) { e.currentTarget.style.background = C.panelHover; e.currentTarget.style.color = C.text; } }}
        onMouseLeave={(e) => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.muted; } }}
      >
        <Icon size={16} style={{ flexShrink: 0 }} />
        <span style={{ flex: 1 }}>{label}</span>
        {typeof badge === "number" && (
          <span style={{
            fontSize: 11, fontWeight: 700, padding: "1px 8px", borderRadius: 999,
            background: C.accentGrad, color: "#fff", lineHeight: 1.7,
          }}>{badge}</span>
        )}
      </button>
    );
  };

  const Sidebar = (
    <aside
      style={{
        width: isMobile ? "100%" : 264,
        flexShrink: 0,
        borderRight: isMobile ? "none" : `1px solid ${C.border}`,
        padding: isMobile ? "16px 16px 0" : "28px 20px",
        position: isMobile ? "static" : "sticky",
        top: 64,
        alignSelf: "flex-start",
        height: isMobile ? "auto" : "calc(100vh - 64px)",
        overflowY: "auto",
      }}
    >
      {/* Identity */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : "center", gap: 10, textAlign: "center" }}>
        <div style={{
          width: 64, height: 64, borderRadius: "50%", background: C.accentGrad,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "0.5px",
        }}>{avatarInitials}</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{displayName}</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>
            {handle} · {mode === "creator" ? "Creator" : "Buyer"}
          </div>
        </div>
      </div>

      {/* Buyer / Creator toggle */}
      <div style={{
        display: "flex", gap: 4, marginTop: 18, padding: 4, borderRadius: 12,
        background: C.panel, border: `1px solid ${C.border}`,
      }}>
        {(["buyer", "creator"] as Mode[]).map((m) => {
          const active = mode === m;
          return (
            <button
              key={m}
              onClick={() => switchMode(m)}
              style={{
                flex: 1, padding: "8px 0", borderRadius: 9, border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 600, textTransform: "capitalize",
                background: active ? C.accentGrad : "transparent",
                color: active ? "#fff" : C.muted,
                transition: "all 0.15s", fontFamily: "var(--font-sans)",
              }}
            >{m}</button>
          );
        })}
      </div>

      {/* Activity / Creator group */}
      <div style={{ marginTop: 22 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", color: C.faint, textTransform: "uppercase", padding: "0 12px 8px" }}>
          {mode === "buyer" ? "My activity" : "Creator"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {activityItems.map((it) => navButton(it.id, it.label, it.icon, it.badge))}
          {mode === "creator" && (
            <button
              onClick={() => router.push("/editor")}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: "9px 12px", borderRadius: 10, border: "none", cursor: "pointer",
                background: "transparent", color: C.muted, fontSize: 13.5, fontWeight: 500,
                textAlign: "left", fontFamily: "var(--font-sans)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.panelHover; e.currentTarget.style.color = C.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.muted; }}
            >
              <Plus size={16} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>Upload new</span>
            </button>
          )}
        </div>
      </div>

      {/* Account group */}
      <div style={{ marginTop: 22 }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.08em", color: C.faint, textTransform: "uppercase", padding: "0 12px 8px" }}>
          Account
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {accountItems.map((it) => navButton(it.id, it.label, it.icon))}
        </div>
      </div>

      {/* Become a creator */}
      {mode === "buyer" && (
        <button
          onClick={() => switchMode("creator")}
          style={{
            marginTop: 24, width: "100%", padding: "11px 0", borderRadius: 12, border: "none",
            cursor: "pointer", background: C.accentGrad, color: "#fff", fontSize: 13.5, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            boxShadow: "0 8px 24px rgba(124,58,237,0.35)", fontFamily: "var(--font-sans)",
          }}
        >
          <Sparkles size={15} /> Become a creator →
        </button>
      )}
    </aside>
  );

  // ─── Main content header ───
  const HEADINGS: Record<Section, { title: string; sub: string }> = {
    renders: { title: "My renders", sub: "All your generated images" },
    saved: { title: "Saved styles", sub: "Prompts you bookmarked for later" },
    purchases: { title: "Purchases", sub: "Styles and prompts you've bought" },
    analytics: { title: "Analytics", sub: "How your prompts are performing" },
    prompts: { title: "My prompts", sub: "Styles you've released to the marketplace" },
    profile: { title: "Profile", sub: "How you appear across Enki Art" },
    billing: { title: "Billing", sub: "" },
  };
  const heading = HEADINGS[section];

  const cardGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 16,
  };

  const emptyState = (icon: React.ReactNode, title: string, body: string) => (
    <div style={{ padding: "90px 0", textAlign: "center" }}>
      <div style={{ marginBottom: 14, display: "flex", justifyContent: "center", color: C.faint }}>{icon}</div>
      <div style={{ fontSize: 18, fontWeight: 600, color: C.text }}>{title}</div>
      <p style={{ fontSize: 13.5, color: C.muted, marginTop: 6, maxWidth: 360, margin: "6px auto 0" }}>{body}</p>
    </div>
  );

  const renderCard = (c: StoredCreation) => (
    <div
      key={c.id}
      onClick={() => setActiveCreation(c)}
      style={{
        borderRadius: 14, overflow: "hidden", background: C.panel,
        border: `1px solid ${C.border}`, cursor: "pointer", transition: "transform 0.15s, border-color 0.15s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.borderStrong; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ aspectRatio: "1 / 1", position: "relative", background: "#0a0a0f" }}>
        <img src={c.imageUrl} alt="render" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        {(c as any).isUploaded && (
          <span style={{
            position: "absolute", top: 8, left: 8, fontSize: 9, letterSpacing: "0.5px",
            textTransform: "uppercase", background: "rgba(0,0,0,0.65)", color: "#fff", padding: "3px 7px", borderRadius: 6,
          }}>Uploaded</span>
        )}
      </div>
    </div>
  );

  const promptCard = (p: EnkiPrompt) => (
    <div
      key={p.id}
      onClick={() => setOpen(p)}
      style={{
        borderRadius: 14, overflow: "hidden", background: C.panel,
        border: `1px solid ${C.border}`, cursor: "pointer", transition: "transform 0.15s, border-color 0.15s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.borderStrong; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      <div style={{ aspectRatio: "1 / 1", background: "#0a0a0f" }}>
        {p.art?.url && <img src={p.art.url} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />}
      </div>
      <div style={{ padding: "10px 12px" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
          <span style={{ fontSize: 11.5, color: C.muted }}>{p.artist?.name}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: C.accent }}>{p.price ? `$${p.price.toFixed(2)}` : "Free"}</span>
        </div>
      </div>
    </div>
  );

  const statCard = (label: string, value: string, hint?: string) => (
    <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 18px" }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: C.muted }}>{label}</div>
      <div style={{ fontSize: 30, fontWeight: 700, color: C.text, marginTop: 8, lineHeight: 1 }}>{value}</div>
      {hint && <div style={{ fontSize: 12, color: C.faint, marginTop: 6 }}>{hint}</div>}
    </div>
  );

  let content: React.ReactNode;
  if (!isAuthed) {
    content = emptyState(<User size={34} />, "You're not signed in", "Connect a wallet or sign in to see your renders, saved styles and analytics.");
  } else if (section === "renders") {
    content = galleryLoading
      ? emptyState(<LayoutGrid size={34} />, "Loading renders…", "")
      : galleryItems.length === 0
        ? emptyState(<ImageOff size={34} />, "No renders yet", "Generate an image or upload one and it will appear here.")
        : <div style={cardGridStyle}>{galleryItems.map(renderCard)}</div>;
  } else if (section === "saved") {
    content = savedPrompts.length === 0
      ? emptyState(<Bookmark size={34} />, "No saved styles yet", "Tap the bookmark on any prompt to save it here for later.")
      : <div style={cardGridStyle}>{savedPrompts.map(promptCard)}</div>;
  } else if (section === "purchases") {
    content = emptyState(<Clock size={34} />, "No purchases yet", "Styles and prompts you buy from the marketplace will show up here.");
  } else if (section === "analytics") {
    content = (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap: 16 }}>
          {statCard("Prompts released", String(prompts.length))}
          {statCard("Total renders", String(galleryItems.length))}
          {statCard("Saved by others", String(savedCount))}
          {statCard("Revenue", "—", "Coming soon")}
        </div>
        <div style={{ marginTop: 20, background: C.panel, border: `1px solid ${C.border}`, borderRadius: 14, padding: "22px 20px" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Performance over time</div>
          <p style={{ fontSize: 13, color: C.muted, marginTop: 6 }}>
            Detailed charts for views, sales and conversion are on the way. Release a prompt to start collecting data.
          </p>
          <button
            onClick={() => router.push("/editor")}
            style={{
              marginTop: 16, padding: "10px 18px", borderRadius: 10, border: "none", cursor: "pointer",
              background: C.accentGrad, color: "#fff", fontSize: 13, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 8,
            }}
          >
            <Plus size={15} /> Release a new prompt
          </button>
        </div>
      </div>
    );
  } else if (section === "prompts") {
    content = (
      <div style={cardGridStyle}>
        <button
          onClick={() => router.push("/editor")}
          style={{
            borderRadius: 14, border: `1px dashed ${C.borderStrong}`, background: "transparent",
            cursor: "pointer", color: C.muted, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 8, minHeight: 220, fontFamily: "var(--font-sans)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = C.text; e.currentTarget.style.borderColor = C.accent; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.borderStrong; }}
        >
          <Plus size={26} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>Upload new</span>
          <span style={{ fontSize: 11.5 }}>Open the Prompt Editor</span>
        </button>
        {prompts.map(promptCard)}
      </div>
    );
  } else if (section === "profile") {
    content = (
      <div style={{ maxWidth: 520 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>Display name</label>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
          {editingName ? (
            <>
              <input
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => setEditingName(false)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === "Escape") setEditingName(false); }}
                maxLength={32}
                placeholder="Your name"
                style={{
                  flex: 1, padding: "10px 12px", borderRadius: 10, fontSize: 14,
                  background: C.panel, border: `1px solid ${C.borderStrong}`, color: C.text, outline: "none",
                }}
              />
              <button onClick={() => setEditingName(false)} aria-label="Save" style={{ background: C.accentGrad, border: "none", borderRadius: 10, padding: "10px 12px", cursor: "pointer", color: "#fff", display: "flex" }}>
                <Check size={16} />
              </button>
            </>
          ) : (
            <>
              <div style={{ flex: 1, padding: "10px 12px", borderRadius: 10, fontSize: 14, background: C.panel, border: `1px solid ${C.border}`, color: C.text }}>
                {username.trim() || "Set a display name"}
              </div>
              <button onClick={() => setEditingName(true)} aria-label="Edit" style={{ background: "transparent", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 12px", cursor: "pointer", color: C.muted, display: "flex" }}>
                <Pencil size={16} />
              </button>
            </>
          )}
        </div>
        <p style={{ fontSize: 12.5, color: C.faint, marginTop: 10 }}>
          Your wallet address is never shown publicly — you appear as {handle}.
        </p>
      </div>
    );
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh", paddingTop: 64, color: C.text, fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", maxWidth: 1500, margin: "0 auto" }}>
        {Sidebar}

        <main style={{ flex: 1, minWidth: 0, padding: isMobile ? "20px 16px 60px" : "32px 40px 80px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 26 }}>
            <div>
              <h1 style={{ fontSize: isMobile ? 22 : 26, fontWeight: 700, margin: 0, color: C.text }}>{heading.title}</h1>
              {heading.sub && <p style={{ fontSize: 13.5, color: C.muted, marginTop: 4 }}>{heading.sub}</p>}
            </div>
            {(section === "renders" || section === "saved" || section === "prompts") && (
              <button
                style={{
                  display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 10,
                  background: "transparent", border: `1px solid ${C.borderStrong}`, color: C.text,
                  fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0, fontFamily: "var(--font-sans)",
                }}
                title="Filtering options are on the way"
              >
                <SlidersHorizontal size={15} /> Filter
              </button>
            )}
          </div>

          {content}
        </main>
      </div>

      {/* ─── Modals ─── */}
      {open && (
        <EnkiDetailPanel
          prompt={open}
          onClose={() => setOpen(null)}
          faved={Boolean(favs[open.id])}
          toggleFav={toggleFav}
        />
      )}

      <GalleryImageModal
        open={!!activeCreation}
        creation={activeCreation}
        creations={galleryItems}
        onSelect={(c) => setActiveCreation(c)}
        onClose={() => setActiveCreation(null)}
        payAddress={payAddress}
        sessionToken={turnkeySession ?? null}
        userKey={walletAddress}
        onTopUp={() => { setActiveCreation(null); router.push("/settings?tab=billing"); }}
      />
    </div>
  );
}
