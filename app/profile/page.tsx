"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useActiveAccount } from "thirdweb/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";
import EnkiCard from "@/components/enki/EnkiCard";
import EnkiDetailPanel from "@/components/enki/EnkiDetailPanel";
import {
  mapMarketplacePromptToEnkiPrompt
} from "@/lib/enkiPromptAdapter";
import type { EnkiPrompt } from "@/lib/enkiPromptAdapter";
import { listCreations, subscribeCreations, type StoredCreation } from "@/lib/creations";
import GalleryImageModal from "@/components/GalleryImageModal";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronDown, MessageSquare, UserPlus, Sparkles, ImageOff } from "lucide-react";
import "@/components/enki/enki.css";

const PROFILE_STAT_LABELS = ["Prompts", "Uses", "Followers", "This month"] as const;

function useSafeActiveAccount() {
  try { return useActiveAccount(); } catch { return null; }
}

const PROFILE_TABS = ["Released", "Gallery", "Reviews", "About"] as const;

export default function ProfilePage() {
  const searchParams = useSearchParams();
  // Open straight to a specific tab when ?tab=... is set (e.g. "My Gallery"
  // in the navbar links here with ?tab=Gallery).
  const tabParam = searchParams.get("tab");
  const initialTab = PROFILE_TABS.includes(tabParam as (typeof PROFILE_TABS)[number])
    ? (tabParam as string)
    : "Released";
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [open, setOpen] = useState<EnkiPrompt | null>(null);
  const [activeCreation, setActiveCreation] = useState<StoredCreation | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // When arriving via a deep-linked tab (e.g. ?tab=Gallery), scroll so the
  // sticky tab bar pins to the top — the banner/avatar scroll up out of view
  // and the selected tab's content is what you land on.
  useEffect(() => {
    if (!tabParam || tabParam === "Released") return;
    // Small delay so the responsive (isMobile) reflow settles before measuring.
    const id = window.setTimeout(() => {
      const el = tabsRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }, 160);
    return () => window.clearTimeout(id);
    // Run once on mount for the initial deep link.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
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
  // Address used to charge the balance when regenerating from the gallery modal.
  const payAddress = account?.address ?? turnkeyAddress ?? null;
  const isAuthed = !!walletAddress;
  const shortAddress = walletAddress
    ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
    : null;
  const avatarInitials = walletAddress
    ? (walletAddress.startsWith("0x") ? walletAddress.slice(2, 4) : walletAddress.slice(0, 2)).toUpperCase()
    : "—";
  
  // Favorites logic (reused from feed)
  const [favs, setFavs] = useState<Record<string, boolean>>(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem("enki:favorites") || "{}");
    } catch {
      return {};
    }
  });

  const toggleFav = (id: string) => {
    setFavs((current) => {
      const next = { ...current, [id]: !current[id] };
      if (typeof window !== "undefined") {
        localStorage.setItem("enki:favorites", JSON.stringify(next));
      }
      return next;
    });
  };

  const { data, isError } = useQuery({
    queryKey: ["/api/marketplace/prompts", "profile"],
    queryFn: async () => {
      const params = new URLSearchParams({ limit: "20", sortBy: "newest" });
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

  // Gallery state
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

  return (
    <div className="enki" style={{ paddingTop: 64 }}>
      {/* ─── Profile Header Section ─── */}
      <div style={{ position: "relative" }}>
        {/* Banner */}
        <div style={{ 
          height: isMobile ? 180 : 320, 
          background: "var(--enki-paper-3)", 
          backgroundImage: "linear-gradient(135deg, var(--enki-paper-3) 0%, var(--enki-paper-2) 100%)",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Subtle geometric pattern or abstract art for the banner */}
          <div style={{ 
            position: "absolute", 
            inset: 0, 
            opacity: 0.1, 
            backgroundImage: "radial-gradient(circle at 2px 2px, var(--enki-ink) 1px, transparent 0)",
            backgroundSize: "40px 40px"
          }} />
        </div>

        {/* Hero Content Container */}
        <div style={{ 
          maxWidth: 1400, 
          margin: "0 auto", 
          padding: isMobile ? "0 16px" : "0 40px",
          position: "relative",
          marginTop: isMobile ? -44 : -80
        }}>
          <div style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "flex-end",
            gap: isMobile ? 16 : 32,
            marginBottom: isMobile ? 28 : 40,
          }}>
            {/* Avatar */}
            <div style={{ 
              width: isMobile ? 88 : 160, 
              height: isMobile ? 88 : 160, 
              flexShrink: 0,
              aspectRatio: "1 / 1",
              borderRadius: "50%", 
              background: "#111", 
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isMobile ? 30 : 48,
              fontFamily: "var(--font-instrument-serif), serif",
              fontStyle: "italic",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              border: `${isMobile ? 5 : 8}px solid var(--enki-paper)`,
              zIndex: 2,
              overflow: "hidden",
            }}>
              {avatarInitials}
            </div>

            {/* Title & Actions */}
            <div style={{ flex: 1, width: isMobile ? "100%" : "auto", paddingBottom: isMobile ? 0 : 10 }}>
              <div className="mono" style={{ fontSize: isMobile ? 11 : 13, color: "var(--enki-ember)", marginBottom: 8, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                {shortAddress ?? "Not connected"}
              </div>
              <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "center", justifyContent: "space-between", gap: isMobile ? 16 : 0 }}>
                <h1 className="serif" style={{ fontSize: isMobile ? "clamp(30px, 8vw, 40px)" : "clamp(48px, 5vw, 72px)", fontWeight: 400, margin: 0, lineHeight: 1 }}>
                  {isAuthed ? <em>My</em> : <em>Guest</em>} {isAuthed ? "Profile" : ""}
                </h1>
                <div style={{ display: "flex", gap: 12 }}>
                  <button className="enki-catbar-all" style={{ height: 44, opacity: 0.5, cursor: "not-allowed" }} disabled>
                    <UserPlus size={16} /> Follow
                  </button>
                  <button className="enki-catbar-all active" style={{ height: 44, opacity: 0.5, cursor: "not-allowed" }} disabled>
                    <MessageSquare size={16} /> Message
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Stats */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 420px", gap: isMobile ? 28 : 80, marginBottom: isMobile ? 40 : 60 }}>
            <div style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.6, color: "var(--enki-ink-3)", maxWidth: 640, fontStyle: "italic" }}>
              {isAuthed
                ? "Add a bio in Settings."
                : "Connect your wallet to see your profile."}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: isMobile ? "20px 24px" : "24px 40px" }}>
              {PROFILE_STAT_LABELS.map(label => (
                <div key={label}>
                  <div className="serif" style={{ fontSize: isMobile ? 28 : 32, lineHeight: 1, marginBottom: 4 }}>—</div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--enki-ink-3)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Tabs & Filter Section ─── */}
      <div ref={tabsRef} style={{ 
        borderTop: "1px solid var(--enki-rule)", 
        borderBottom: "1px solid var(--enki-rule)",
        background: "var(--enki-paper)",
        position: "sticky",
        top: 64, // below global navbar
        zIndex: 40
      }}>
        <div style={{ 
          maxWidth: 1400, 
          margin: "0 auto", 
          padding: isMobile ? "0 16px" : "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          overflowX: isMobile ? "auto" : "visible",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 20 : 32 }}>
            {["Released", "Gallery", "Reviews", "About"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "20px 0",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === tab ? "2px solid var(--enki-ink)" : "2px solid transparent",
                  color: activeTab === tab ? "var(--enki-ink)" : "var(--enki-ink-3)",
                  fontSize: 14,
                  fontWeight: activeTab === tab ? 600 : 400,
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {tab}
                {tab === "Released" && prompts.length > 0 && (
                  <span className="mono" style={{ fontSize: 11, marginLeft: 8, opacity: 0.6 }}>{prompts.length}</span>
                )}
                {tab === "Gallery" && galleryItems.length > 0 && (
                  <span className="mono" style={{ fontSize: 11, marginLeft: 8, opacity: 0.6 }}>{galleryItems.length}</span>
                )}
              </button>
            ))}
            
            <button className="enki-catbar-all" style={{ height: 36, fontSize: 11, gap: 6, marginLeft: 16 }}>
              <Sparkles size={14} /> Filter by NFT <ChevronDown size={12} />
            </button>
          </div>

        </div>
      </div>

      {/* ─── Content Section ─── */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: isMobile ? "24px 16px" : "40px" }}>
        {activeTab === "Released" && prompts.length > 0 ? (
          <div className="enki-masonry">
            {prompts.map((prompt) => (
              <EnkiCard
                key={prompt.id}
                prompt={prompt}
                onOpen={setOpen}
                faved={Boolean(favs[prompt.id])}
                toggleFav={toggleFav}
              />
            ))}
          </div>
        ) : activeTab === "Gallery" ? (
          galleryLoading ? (
            <div style={{ padding: "80px 0", textAlign: "center" }}>
              <div className="mono" style={{ fontSize: 13, color: "var(--enki-ink-3)" }}>Loading gallery…</div>
            </div>
          ) : galleryItems.length === 0 ? (
            <div style={{ padding: "80px 0", textAlign: "center" }}>
              <ImageOff size={32} color="var(--enki-ink-3)" style={{ margin: "0 auto 12px" }} />
              <div className="serif" style={{ fontSize: 24, color: "var(--enki-ink-3)" }}>
                No creations yet.
              </div>
              <p style={{ fontSize: 14, color: "var(--enki-ink-3)", marginTop: 8 }}>
                Generate an image or upload one and it will appear here.
              </p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: 16,
            }}>
              {galleryItems.map((c) => (
                <div
                  key={c.id}
                  style={{
                    border: "1px solid var(--enki-rule)",
                    background: "var(--enki-paper)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    onClick={() => setActiveCreation(c)}
                    style={{ aspectRatio: "4/3", position: "relative", overflow: "hidden", background: "var(--enki-paper-3)", cursor: "pointer" }}
                  >
                    <img
                      src={c.imageUrl}
                      alt={(c as any).isUploaded ? "Uploaded" : "Generated"}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    {(c as any).isUploaded && (
                      <span style={{
                        position: "absolute", top: 8, left: 8,
                        fontSize: 9, fontFamily: "var(--font-mono)", letterSpacing: "1px",
                        textTransform: "uppercase",
                        background: "rgba(26,23,21,0.8)", color: "#fff",
                        padding: "3px 7px",
                      }}>
                        Uploaded
                      </span>
                    )}
                  </div>
                  <div style={{ padding: 12 }}>
                    <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--enki-ink-3)" }}>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                    <p style={{
                      margin: "4px 0 0", fontSize: 12, color: "var(--enki-ink-2)",
                      lineHeight: 1.5, maxHeight: 60, overflow: "hidden",
                      textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical",
                    }}>
                      {c.prompt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div style={{ padding: "80px 0", textAlign: "center" }}>
            <div className="serif" style={{ fontSize: 24, color: "var(--enki-ink-3)" }}>
              Nothing to show in {activeTab} yet.
            </div>
          </div>
        )}
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
        onTopUp={() => {
          setActiveCreation(null);
          router.push("/settings?tab=billing");
        }}
      />
    </div>
  );
}
