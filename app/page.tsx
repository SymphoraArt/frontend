"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Heart, Play, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import type { Prompt, Artist } from "../shared/schema";

// ─── Mock data for the Discover page (used when no DB prompts exist) ───
const MOCK_CARDS = [
  { id: "m1", type: "IMAGE", bg: "#2d3a52", circleBg: "#5a6a80", circleShape: "circle", liked: false },
  { id: "m2", type: "IMAGE", bg: "#4a5a2a", circleBg: "#8a9a50", circleShape: "circle", liked: false },
  { id: "m3", type: "IMAGE", bg: "#6a2a35", circleBg: "#a05060", circleShape: "circle", liked: false },
  { id: "m4", type: "VIDEO", bg: "#4a2040", circleBg: "#8a4070", circleShape: "circle", liked: false },
  { id: "m5", type: "IMAGE", bg: "#1a3020", circleBg: "#4a7050", circleShape: "oval", liked: false },
  { id: "m6", type: "IMAGE", bg: "#2a2a2a", circleBg: "#606060", circleShape: "oval", liked: false },
  { id: "m7", type: "VIDEO", bg: "#2a2060", circleBg: "#7070c0", circleShape: "oval", liked: false },
  { id: "m8", type: "IMAGE", bg: "#1a2a40", circleBg: "#5070a0", circleShape: "oval", liked: false },
  { id: "m9", type: "VIDEO", bg: "#502030", circleBg: "#905060", circleShape: "door", liked: true },
  { id: "m10", type: "VIDEO", bg: "#602040", circleBg: "#a06070", circleShape: "door", liked: false },
  { id: "m11", type: "IMAGE", bg: "#604020", circleBg: "#a07050", circleShape: "door", liked: false },
  { id: "m12", type: "IMAGE", bg: "#404040", circleBg: "#808080", circleShape: "door", liked: false },
];

const TAGS = ["portrait", "cinematic", "infographic", "architecture", "editorial", "abstract"];

function MockThumbnail({ bg, circleBg, circleShape }: { bg: string; circleBg: string; circleShape: string }) {
  return (
    <div style={{ width: "100%", aspectRatio: "3/4", background: bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
      {circleShape === "circle" && (
        <>
          <div style={{ width: "50%", aspectRatio: "1", borderRadius: "50%", background: circleBg, opacity: 0.7 }} />
          <div style={{ width: "30%", aspectRatio: "1", borderRadius: "50%", background: circleBg, opacity: 0.5 }} />
        </>
      )}
      {circleShape === "oval" && (
        <>
          <div style={{ width: "20%", aspectRatio: "1", borderRadius: "50%", background: circleBg, opacity: 0.6 }} />
          <div style={{ width: "35%", height: "50%", borderRadius: "100px", background: circleBg, opacity: 0.6 }} />
        </>
      )}
      {circleShape === "door" && (
        <div style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}>
          <div style={{ width: "38%", height: "60%", background: circleBg, opacity: 0.7, borderRadius: "4px 4px 0 0", position: "relative" }}>
            <div style={{ position: "absolute", right: 4, top: "40%", width: 6, height: 6, background: bg, opacity: 0.8, borderRadius: 1 }} />
          </div>
          <div style={{ width: "30%", height: "45%", background: circleBg, opacity: 0.5, borderRadius: "4px 4px 0 0" }} />
        </div>
      )}
    </div>
  );
}

export default function DiscoverPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { month: "long", day: "numeric" }).toUpperCase();

  useEffect(() => { setIsMounted(true); }, []);

  const { data: promptsData } = useQuery<{ items: Prompt[]; nextCursor: string | null }>({
    queryKey: ["/api/prompts"],
    enabled: isMounted,
  });
  const { data: artists = [] } = useQuery<Artist[]>({ queryKey: ["/api/artists"], enabled: isMounted });

  const prompts = promptsData?.items ?? [];
  const hasRealData = prompts.length > 0;

  const toggleLike = (id: string) => setLiked(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ minHeight: "100vh", background: "#f5f3ee", fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}>
      <Navbar />

      <div style={{ paddingTop: "56px" }}>
        {/* ─── Hero Header ─── */}
        <div style={{ padding: "40px 48px 24px" }}>
          <p style={{ fontFamily: "monospace", fontSize: 11, color: "#a09788", letterSpacing: "2px", textTransform: "uppercase", margin: "0 0 12px 0" }}>
            CURATED THIS WEEK · {dateStr}
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', 'Merriweather', Georgia, serif", fontSize: 56, fontWeight: 900, color: "#111", lineHeight: 1.1, margin: "0 0 0 0" }}>
            <em>Discover</em> prompts<br />worth keeping.
          </h1>
        </div>

        {/* ─── Filter Bar ─── */}
        <div style={{ padding: "0 48px", borderBottom: "1px solid #e0ddd5", display: "flex", alignItems: "center", gap: 0, overflowX: "auto" }}>
          {/* Tags label */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, paddingRight: 16, borderRight: "1px solid #e0ddd5", marginRight: 16, flexShrink: 0 }}>
            <span style={{ fontSize: 12, color: "#888", cursor: "pointer" }}>TAGS</span>
            <ChevronDown size={12} color="#888" />
          </div>
          {/* Tag pills */}
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "nowrap" }}>
            {TAGS.map(tag => (
              <button key={tag} onClick={() => setActiveTag(activeTag === tag ? null : tag)} style={{
                padding: "6px 14px", fontSize: 12, borderRadius: 20,
                background: activeTag === tag ? "#111" : "transparent",
                color: activeTag === tag ? "#fff" : "#555",
                border: "1px solid " + (activeTag === tag ? "#111" : "#d8d4cc"),
                cursor: "pointer", marginBottom: 12, marginTop: 12, whiteSpace: "nowrap",
                transition: "all 0.15s",
              }}>
                {tag}
              </button>
            ))}
            <button style={{ padding: "6px 14px", fontSize: 12, borderRadius: 20, background: "transparent", color: "#555", border: "1px solid #d8d4cc", cursor: "pointer", marginBottom: 12, marginTop: 12, whiteSpace: "nowrap" }}>
              + more
            </button>
          </div>
          {/* Divider */}
          <div style={{ marginLeft: 16, marginRight: 16, height: 20, width: 1, background: "#e0ddd5", flexShrink: 0 }} />
          {/* Model filter */}
          <button style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#555", background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap", marginBottom: 12, marginTop: 12, flexShrink: 0 }}>
            Model: any <ChevronDown size={12} />
          </button>
          {/* Price filter */}
          <button style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#555", background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap", marginBottom: 12, marginTop: 12, flexShrink: 0, marginLeft: 8 }}>
            $0 – $2 <ChevronDown size={12} />
          </button>
          {/* Sort */}
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
            <span style={{ fontSize: 11, color: "#a09788", letterSpacing: "1px", textTransform: "uppercase" }}>SORT</span>
            <button style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#555", background: "none", border: "none", cursor: "pointer" }}>
              Trending <ChevronDown size={12} />
            </button>
          </div>
        </div>

        {/* ─── Cards Grid ─── */}
        <div style={{ padding: "0 40px", marginTop: 0 }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2px",
          }}>
            {(hasRealData
              ? prompts.map((p) => {
                  const artist = artists.find(a => a.id === p.artistId);
                  return { id: p.id, type: "IMAGE", imageUrl: p.previewImageUrl, title: p.title, artistName: artist?.displayName };
                })
              : MOCK_CARDS
            ).map((card: any) => (
              <div
                key={card.id}
                onClick={() => hasRealData ? router.push(`/generator/${card.id}`) : null}
                style={{ position: "relative", cursor: hasRealData ? "pointer" : "default", overflow: "hidden", background: "#2a2a2a" }}
                className="group"
              >
                {/* Thumbnail */}
                {hasRealData && card.imageUrl ? (
                  <img src={card.imageUrl} alt={card.title} style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", display: "block" }} />
                ) : (
                  <MockThumbnail bg={card.bg} circleBg={card.circleBg} circleShape={card.circleShape} />
                )}

                {/* Type badge */}
                <div style={{
                  position: "absolute", top: 10, left: 10,
                  background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
                  color: "#fff", fontSize: 9, fontFamily: "monospace", letterSpacing: "1px",
                  padding: "3px 8px", borderRadius: 4, display: "flex", alignItems: "center", gap: 4,
                }}>
                  {card.type === "VIDEO" && <Play size={8} fill="white" />}
                  {card.type}
                </div>

                {/* Heart button */}
                <button
                  onClick={(e) => { e.stopPropagation(); toggleLike(card.id); }}
                  style={{
                    position: "absolute", top: 8, right: 8,
                    width: 28, height: 28, borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)",
                    border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.15s",
                  }}
                >
                  <Heart size={13} fill={(liked[card.id] || card.liked) ? "#e23b3b" : "none"} color={(liked[card.id] || card.liked) ? "#e23b3b" : "white"} />
                </button>

                {/* Video play overlay */}
                {card.type === "VIDEO" && (
                  <div style={{
                    position: "absolute", bottom: 10, right: 10,
                    width: 28, height: 28, borderRadius: "50%",
                    background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Play size={11} fill="white" color="white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ─── Quick Create Bar ─── */}
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "rgba(245, 243, 238, 0.9)", backdropFilter: "blur(8px)",
          borderTop: "1px solid #e0ddd5", padding: "12px 48px",
          display: "flex", alignItems: "center", gap: 12, zIndex: 50,
        }}>
          <div style={{ width: 20, height: 20, borderRadius: "50%", background: "#f5c542", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 10 }}>✦</span>
          </div>
          <span style={{ fontSize: 12, color: "#888", fontFamily: "monospace" }}>
            <strong style={{ color: "#111" }}>Quick create</strong> &nbsp;Paste a prompt — wrap variables in [brackets]
          </span>
          <ChevronDown size={14} color="#888" style={{ marginLeft: "auto", transform: "rotate(-90deg)" }} />
        </div>
        <div style={{ height: 52 }} />
      </div>
    </div>
  );
}
