 "use client";

import { useActiveAccount } from "thirdweb/react";
import { useEffect, useState, useRef, Fragment } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { getUserKeyFromAccount } from "@/lib/creations";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useRouter, useParams } from "next/navigation";
import { formatPricePerGeneration } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil, Check, UserPlus, UserMinus, Plus, ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CategoriesBar from "@/components/CategoriesBar";
import ImageLightbox from "@/components/ImageLightbox";

const BIO_MAX = 280;
const BIO_MAX_LINES = 7;

function limitBioTo7Lines(s: string): string {
  return s.split("\n").slice(0, BIO_MAX_LINES).join("\n").slice(0, BIO_MAX);
}

type FilterKind = "all" | "paid" | "free" | "showroom" | "private";
type SortKind = "likes" | "rating" | "generations";

type BannerSegment = { id: string; imageUrl: string | null; widthFraction: number };

type ProfileData = {
  wallet: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  bio: string | null;
  updatedAt: string | null;
  showWalletInProfile?: boolean;
};

type PromptItem = {
  id: string;
  type: string;
  title: string;
  description?: string;
  category: string;
  pricing?: { pricePerGeneration?: number };
  showcaseImages?: { url: string }[];
  stats?: {
    likes?: number;
    totalGenerations?: number;
    reviews?: { total?: number; averageRating?: number };
  };
  createdAt?: string;
};

type GalleryItem =
  | {
      kind: "prompt";
      id: string;
      title: string;
      type: "paid" | "free" | "showroom";
      category: string;
      imageUrl: string;
      priceStored: number;
      likes: number;
      rating: number;
      generations: number;
      createdAt: string;
    }
  | {
      kind: "private";
      id: string;
      title: string;
      imageUrl: string;
      createdAt: string;
      likes: number;
      rating: number;
      generations: number;
    };

export default function ProfilePage() {
  const params = useParams<{ wallet: string }>();
  const walletParam = (params?.wallet ?? "") as string;
  const router = useRouter();
  const account = useActiveAccount();
  const userKey = getUserKeyFromAccount(account);
  const wallet = walletParam?.trim() ?? "";
  const isOwnProfile = !!userKey && wallet.toLowerCase() === userKey.toLowerCase();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [privateGenerations, setPrivateGenerations] = useState<{ id: string; generatedImage?: string; createdAt?: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKind>("all");
  const [sort, setSort] = useState<SortKind>("likes");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editAvatarUrl, setEditAvatarUrl] = useState<string | null>(null);
  const [editBannerSegments, setEditBannerSegments] = useState<BannerSegment[]>([]);
  const [bannerSegmentFiles, setBannerSegmentFiles] = useState<Record<string, File>>({});
  const [bannerSegmentPreviewUrls, setBannerSegmentPreviewUrls] = useState<Record<string, string>>({});
  const [bannerSegmentOffsets, setBannerSegmentOffsets] = useState<Record<string, { x: number; y: number }>>({});
  const [segmentNaturalDimensions, setSegmentNaturalDimensions] = useState<Record<string, { w: number; h: number }>>({});
  const segmentImageDragRef = useRef<{ segmentId: string; startX: number; startY: number; originX: number; originY: number } | null>(null);
  const [bannerZoom, setBannerZoom] = useState(1);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const bannerTargetSegmentIdRef = useRef<string | null>(null);
  const bannerContainerRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);

  // Object URLs in useEffect to avoid side effects during render (prevents useMemo/dispatcher errors on file pick)
  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(avatarFile);
    setAvatarPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

  // Object URLs for per-segment banner file previews
  useEffect(() => {
    const ids = Object.keys(bannerSegmentFiles);
    const next: Record<string, string> = {};
    ids.forEach((id) => {
      const file = bannerSegmentFiles[id];
      if (file) next[id] = URL.createObjectURL(file);
    });
    setBannerSegmentPreviewUrls((prev) => {
      Object.values(prev).forEach((u) => URL.revokeObjectURL(u));
      return next;
    });
    return () => {
      Object.values(next).forEach((u) => URL.revokeObjectURL(u));
    };
  }, [bannerSegmentFiles]);

  useEffect(() => {
    if (!wallet) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/profile/${encodeURIComponent(wallet)}`);
        if (!res.ok) throw new Error("Failed to load profile");
        const data = await res.json();
        if (cancelled) return;
        setProfile(data.profile ?? null);
        setPrompts(Array.isArray(data.prompts) ? data.prompts : []);

        if (isOwnProfile && userKey) {
          const genRes = await fetch(
            `/api/enki/generations/my?userKey=${encodeURIComponent(userKey)}`
          );
          if (genRes.ok && !cancelled) {
            const j = await genRes.json();
            const list = Array.isArray(j.generations) ? j.generations : [];
            setPrivateGenerations(
              list
                .filter((g: { generatedImage?: unknown }) => g.generatedImage)
                .map((g: { id: string; generatedImage?: { url?: string } | string; createdAt?: string }) => ({
                  id: `gen-${g.id}`,
                  generatedImage: typeof g.generatedImage === "string" ? g.generatedImage : g.generatedImage?.url,
                  createdAt: g.createdAt,
                }))
            );
          }
        } else {
          setPrivateGenerations([]);
        }
      } catch {
        if (!cancelled) {
          setProfile(null);
          setPrompts([]);
          setPrivateGenerations([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [wallet, isOwnProfile, userKey]);

  useEffect(() => {
    if (profile && isEditing) {
      setEditBio(limitBioTo7Lines(profile.bio ?? ""));
      setEditAvatarUrl(profile.avatarUrl ?? null);
      if (profile.bannerUrl) {
        setEditBannerSegments([{ id: crypto.randomUUID(), imageUrl: profile.bannerUrl, widthFraction: 1 }]);
      } else {
        setEditBannerSegments([]);
      }
      setBannerSegmentFiles({});
      setBannerSegmentOffsets({});
      setSegmentNaturalDimensions({});
    }
  }, [profile, isEditing]);

  useEffect(() => {
    if (!userKey || !wallet || isOwnProfile) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/follows/check?userKey=${encodeURIComponent(userKey)}&wallet=${encodeURIComponent(wallet)}`
        );
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (!cancelled) setIsFollowing(!!data.following);
      } catch {
        if (!cancelled) setIsFollowing(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [userKey, wallet, isOwnProfile]);

  const items: GalleryItem[] = [
    ...prompts.map((p) => {
      const type =
        p.type === "paid" ? "paid" : p.type === "free" ? "free" : "showroom";
      const img = p.showcaseImages?.[0]?.url ?? "";
      const stats = p.stats ?? {};
      const reviews = (stats as { reviews?: { averageRating?: number } }).reviews ?? {};
      return {
        kind: "prompt",
        id: p.id,
        title: p.title,
        type,
        category: (p.category ?? "").trim() || "Uncategorized",
        imageUrl: img,
        priceStored: (p.pricing as { pricePerGeneration?: number })?.pricePerGeneration ?? 0,
        likes: (stats as { likes?: number }).likes ?? 0,
        rating: Number(reviews.averageRating ?? 0),
        generations: (stats as { totalGenerations?: number }).totalGenerations ?? 0,
        createdAt: p.createdAt ?? "",
      };
    }),
    ...privateGenerations.map((g) => ({
      kind: "private",
      id: g.id,
      title: "Private creation",
      imageUrl: g.generatedImage ?? "",
      createdAt: g.createdAt ?? "",
      likes: 0,
      rating: 0,
      generations: 0,
    })),
  ];

  const categories = Array.from(
    items.reduce((set, i) => {
      if (i.kind === "prompt" && i.category) set.add(i.category);
      return set;
    }, new Set<string>()),
  ).sort((a, b) => a.localeCompare(b));

  const filtered: GalleryItem[] = (() => {
    let list = items;
    if (filter === "paid") list = list.filter((i) => i.kind === "prompt" && i.type === "paid");
    else if (filter === "free") list = list.filter((i) => i.kind === "prompt" && i.type === "free");
    else if (filter === "showroom") list = list.filter((i) => i.kind === "prompt" && i.type === "showroom");
    else if (filter === "private") list = list.filter((i) => i.kind === "private");

    if (categoryFilter !== "all") {
      list = list.filter((i) => i.kind === "prompt" && i.category === categoryFilter);
    }

    if (sort === "likes") list = [...list].sort((a, b) => b.likes - a.likes);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    else if (sort === "generations") list = [...list].sort((a, b) => b.generations - a.generations);
    return list;
  })();

  const filterOptions: FilterKind[] = isOwnProfile
    ? ["all", "paid", "free", "showroom", "private"]
    : ["all", "paid", "free", "showroom"];

  const handleSaveProfile = async () => {
    if (!userKey) {
      toast({
        title: "Wallet required",
        description: "Connect your wallet to save your profile.",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    try {
      let avatarUrl = editAvatarUrl;
      if (avatarFile) {
        const fd = new FormData();
        fd.set("file", avatarFile);
        fd.set("userKey", userKey);
        fd.set("type", "avatar");
        const up = await fetch("/api/profile/upload", { method: "POST", body: fd });
        if (!up.ok) throw new Error("Avatar upload failed");
        const j = await up.json();
        avatarUrl = j.url ?? null;
      }
      let bannerUrl: string | null = null;
      const segs = editBannerSegments;
      if (segs.length > 0) {
        const first = segs[0];
        const pendingFile = bannerSegmentFiles[first.id];
        if (pendingFile) {
          const fd = new FormData();
          fd.set("file", pendingFile);
          fd.set("userKey", userKey);
          fd.set("type", "banner");
          const up = await fetch("/api/profile/upload", { method: "POST", body: fd });
          if (!up.ok) throw new Error("Banner upload failed");
          const j = await up.json();
          bannerUrl = j.url ?? null;
        } else {
          bannerUrl = first.imageUrl;
        }
      }
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userKey,
          bio: limitBioTo7Lines(editBio),
          avatarUrl: avatarUrl ?? undefined,
          bannerUrl: bannerUrl ?? undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to save");
      }
      const data = await res.json();
      const saved = data.profile ?? null;
      setProfile(saved);
      setAvatarFile(null);
      setBannerSegmentFiles({});
      setBannerSegmentOffsets({});
      setSegmentNaturalDimensions({});
      setBannerZoom(1);
      if (saved) {
        setEditBio(limitBioTo7Lines(saved.bio ?? ""));
        setEditAvatarUrl(saved.avatarUrl ?? null);
        setEditBannerSegments(
          saved.bannerUrl
            ? [{ id: crypto.randomUUID(), imageUrl: saved.bannerUrl, widthFraction: 1 }]
            : []
        );
      }
      setIsEditing(false);
      toast({ title: "Saved", description: "Profile updated." });
    } catch (e) {
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : "Failed to save profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const displayAvatar = isEditing && (editAvatarUrl || avatarFile)
    ? (avatarPreviewUrl ?? editAvatarUrl)
    : (profile?.avatarUrl ?? null);

  const setSegmentImage = (segmentId: string, file: File) => {
    setBannerSegmentFiles((prev) => ({ ...prev, [segmentId]: file }));
  };

  const openBannerForSegment = (segmentId: string) => {
    bannerTargetSegmentIdRef.current = segmentId;
    bannerInputRef.current?.click();
  };

  const getSegmentOffset = (segmentId: string) => bannerSegmentOffsets[segmentId] ?? { x: 0, y: 0 };

  useEffect(() => {
    const handleSegmentImageMove = (e: MouseEvent) => {
      const d = segmentImageDragRef.current;
      if (!d) return;
      const container = bannerContainerRef.current;
      if (!container) return;
      const dx = e.clientX - d.startX;
      const dy = e.clientY - d.startY;
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const seg = editBannerSegments.find((s) => s.id === d.segmentId);
      if (!seg) return;
      const n = editBannerSegments.length;
      const divW = 8;
      const segWidth = (cw - (n - 1) * divW) * seg.widthFraction;
      const segHeight = ch;
      const zoom = bannerZoom;
      const dim = segmentNaturalDimensions[d.segmentId];
      const imageHeightAtSegWidth = dim && dim.w > 0 ? segWidth * (dim.h / dim.w) : segHeight;
      const maxX = zoom > 1 ? (segWidth / 2) * (zoom - 1) : 0;
      const maxY =
        zoom > 1
          ? Math.max(0, (imageHeightAtSegWidth * zoom - segHeight) / 2)
          : Math.max(0, (imageHeightAtSegWidth - segHeight) / 2);
      const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v));
      const newX = clamp(d.originX + dx, maxX);
      const newY = clamp(d.originY + dy, maxY);
      setBannerSegmentOffsets((prev) => ({ ...prev, [d.segmentId]: { x: newX, y: newY } }));
    };
    const handleSegmentImageUp = () => {
      segmentImageDragRef.current = null;
    };
    window.addEventListener("mousemove", handleSegmentImageMove);
    window.addEventListener("mouseup", handleSegmentImageUp);
    return () => {
      window.removeEventListener("mousemove", handleSegmentImageMove);
      window.removeEventListener("mouseup", handleSegmentImageUp);
    };
  }, [bannerZoom, editBannerSegments, segmentNaturalDimensions]);

  const prevBannerZoomRef = useRef(bannerZoom);
  useEffect(() => {
    const prev = prevBannerZoomRef.current;
    prevBannerZoomRef.current = bannerZoom;
    if (prev > 1 && bannerZoom <= 1) {
      setBannerSegmentOffsets((prevOffsets) => {
        const next = { ...prevOffsets };
        editBannerSegments.forEach((seg) => {
          next[seg.id] = { x: 0, y: 0 };
        });
        return next;
      });
    }
  }, [bannerZoom, editBannerSegments]);

  if (!wallet) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <main className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground">Invalid profile.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <main className="flex-1 min-h-0 w-full px-2 sm:px-4 lg:px-6 py-6 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            Loading…
          </div>
        ) : (
          <>
            {/* Banner + Avatar + Bio */}
            <div className="relative rounded-xl border border-border/60 bg-card/60 mb-6 overflow-hidden">
              <div
                className="relative w-full rounded-t-xl bg-muted h-[14rem] sm:h-[16rem] md:h-[20rem] overflow-hidden"
                ref={bannerContainerRef}
              >
                {!isEditing ? (
                  /* Do not edit: banner image (profile URL) */
                  profile?.bannerUrl ? (
                    <img
                      src={profile.bannerUrl}
                      alt="Banner"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/70" />
                  )
                ) : (
                  /* Edit: segments or centered "Add image" */
                  <>
                    <input
                      ref={bannerInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        const id = bannerTargetSegmentIdRef.current;
                        if (f && id) setTimeout(() => setSegmentImage(id, f), 0);
                        e.target.value = "";
                      }}
                    />
                    {editBannerSegments.length === 0 ? (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/70" />
                        <div className="absolute inset-x-0 top-3 flex justify-center z-20">
                          <div className="flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 shadow border border-border/60 w-44">
                            <span className="text-xs text-muted-foreground">Zoom</span>
                            <Slider
                              value={[bannerZoom]}
                              min={0.5}
                              max={2}
                              step={0.02}
                              onValueChange={(v) => setBannerZoom(v[0] ?? 1)}
                            />
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const id = crypto.randomUUID();
                            setEditBannerSegments([{ id, imageUrl: null, widthFraction: 1 }]);
                            setTimeout(() => openBannerForSegment(id), 0);
                          }}
                          className="absolute inset-0 flex items-center justify-center"
                          title="Add image"
                          aria-label="Add image"
                        >
                          <span className="h-16 w-16 rounded-full bg-background/90 flex items-center justify-center shadow-lg text-muted-foreground">
                            <ImagePlus className="h-8 w-8" />
                          </span>
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-x-0 top-3 flex justify-center z-20">
                          <div className="flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 shadow border border-border/60 w-44">
                            <span className="text-xs text-muted-foreground">Zoom</span>
                            <Slider
                              value={[bannerZoom]}
                              min={0.5}
                              max={2}
                              step={0.02}
                              onValueChange={(v) => setBannerZoom(v[0] ?? 1)}
                            />
                          </div>
                        </div>
                        <div className="absolute inset-0 flex overflow-hidden">
                          {editBannerSegments.map((seg, i) => {
                            const displayUrl = bannerSegmentPreviewUrls[seg.id] ?? seg.imageUrl;
                            return (
                              <Fragment key={seg.id}>
                                <div
                                  className="relative flex-1 min-w-0 h-full overflow-hidden"
                                  style={{ flex: seg.widthFraction }}
                                >
                                  {displayUrl ? (
                                    <>
                                      <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                                        <div
                                          className={bannerZoom <= 1 ? "absolute inset-0 cursor-move" : "w-full cursor-move flex justify-center"}
                                          onMouseDown={(e) => {
                                            e.preventDefault();
                                            const o = getSegmentOffset(seg.id);
                                            segmentImageDragRef.current = {
                                              segmentId: seg.id,
                                              startX: e.clientX,
                                              startY: e.clientY,
                                              originX: o.x,
                                              originY: o.y,
                                            };
                                          }}
                                        >
                                          <img
                                            src={displayUrl}
                                            alt=""
                                            className={
                                              bannerZoom <= 1
                                                ? "absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                                                : "block w-full h-auto pointer-events-none select-none"
                                            }
                                            style={
                                              bannerZoom <= 1
                                                ? { objectPosition: `50% calc(50% + ${getSegmentOffset(seg.id).y}px)` }
                                                : {
                                                    transform: `translate(${getSegmentOffset(seg.id).x}px, ${getSegmentOffset(seg.id).y}px) scale(${bannerZoom})`,
                                                    transformOrigin: "center center",
                                                  }
                                            }
                                            onLoad={(e) => {
                                              const img = e.currentTarget;
                                              setSegmentNaturalDimensions((prev) => ({
                                                ...prev,
                                                [seg.id]: { w: img.naturalWidth, h: img.naturalHeight },
                                              }));
                                            }}
                                          />
                                        </div>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); openBannerForSegment(seg.id); }}
                                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-background/90 p-2 shadow border border-border/60 text-muted-foreground hover:bg-background hover:text-foreground"
                                        title="Choose image"
                                        aria-label="Choose image"
                                      >
                                        <ImagePlus className="h-6 w-6" />
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => openBannerForSegment(seg.id)}
                                      className="absolute inset-0 flex items-center justify-center bg-muted/80 hover:bg-muted"
                                      title="Add image"
                                      aria-label="Add image"
                                    >
                                      <span className="h-12 w-12 rounded-full bg-background/90 flex items-center justify-center shadow text-muted-foreground">
                                        <ImagePlus className="h-6 w-6" />
                                      </span>
                                    </button>
                                  )}
                                </div>
                              </Fragment>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
              {/* Avatar + edit pencil on the white area just below the banner, next to the profile image */}
              <div className="absolute left-4 sm:left-6 flex items-end gap-2 z-10 top-[11rem] sm:top-[12rem] md:top-[13rem]">
                  <div className="relative shrink-0">
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) queueMicrotask(() => setAvatarFile(f));
                        e.target.value = "";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => isOwnProfile && isEditing && avatarInputRef.current?.click()}
                      className={`relative block rounded-full overflow-hidden border-4 border-background bg-muted shadow-lg h-40 w-40 sm:h-48 sm:w-48 md:h-56 md:w-56 ${
                        isOwnProfile && isEditing ? "cursor-pointer" : "cursor-default"
                      }`}
                      title={isOwnProfile && isEditing ? "Change profile picture" : undefined}
                    >
                      {displayAvatar ? (
                        <img
                          src={displayAvatar}
                          alt="Avatar"
                          className="w-full h-full object-cover select-none pointer-events-none"
                        />
                      ) : (
                        <span className="flex w-full h-full items-center justify-center text-4xl sm:text-5xl md:text-6xl text-muted-foreground font-medium select-none pointer-events-none">
                          {wallet.slice(2, 4).toUpperCase()}
                        </span>
                      )}
                      {/* Button in the center of the profile image (edit mode only) */}
                      {isOwnProfile && isEditing && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full pointer-events-none">
                          <span className="rounded-full bg-background/95 p-2 shadow-sm">
                            <Pencil className="h-6 w-6 sm:h-8 sm:w-8 text-foreground" />
                          </span>
                        </span>
                      )}
                    </button>
                  </div>
                  {/* Edit pencil: shifted up by its height, top edge at banner boundary */}
                  {isOwnProfile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 sm:h-11 sm:w-11 rounded-full shrink-0 border border-border/70 hover:bg-muted/60 -ml-0.5 -translate-y-10 sm:-translate-y-11"
                      onClick={() => (isEditing ? handleSaveProfile() : setIsEditing(true))}
                      disabled={saving}
                      title={isEditing ? "Save" : "Edit profile"}
                    >
                      {isEditing ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Pencil className="h-4 w-4" />
                      )}
                    </Button>
                  )}
                  {/* Follow-Button: direkt rechts neben dem Profilbild bei anderen Usern */}
                  {!isOwnProfile && userKey && (
                    <Button
                      variant={isFollowing ? "secondary" : "default"}
                      size="sm"
                      className="gap-1.5 -translate-y-10 sm:-translate-y-11 shrink-0"
                      disabled={followLoading}
                      onClick={async () => {
                        setFollowLoading(true);
                        try {
                          if (isFollowing) {
                            await fetch("/api/follows", {
                              method: "DELETE",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ userKey, wallet }),
                            });
                            setIsFollowing(false);
                            toast({ title: "Unfollowed" });
                          } else {
                            await fetch("/api/follows", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ userKey, wallet }),
                            });
                            setIsFollowing(true);
                            toast({ title: "Following" });
                          }
                        } catch {
                          toast({ title: "Error", variant: "destructive", description: "Could not update follow." });
                        } finally {
                          setFollowLoading(false);
                        }
                      }}
                      title={isFollowing ? "Unfollow" : "Follow"}
                    >
                      {isFollowing ? (
                        <>
                          <UserMinus className="h-4 w-4" />
                          Following
                        </>
                      ) : (
                        <>
                          <UserPlus className="h-4 w-4" />
                          Follow
                        </>
                      )}
                    </Button>
                  )}
                </div>
              <div
                className={`pb-0 px-4 sm:px-6 rounded-b-xl bg-card/60 ${isEditing ? "pt-36 sm:pt-40 md:pt-44" : "pt-28 sm:pt-32 md:pt-36"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0 min-h-[4rem]">
                    {profile?.showWalletInProfile !== false && (
                      <p className="text-sm font-mono text-muted-foreground truncate select-none cursor-default" title={wallet}>
                        {wallet.slice(0, 6)}…{wallet.slice(-4)}
                      </p>
                    )}
                    <section className={`min-h-[3rem] ${isEditing ? "mt-4" : "mt-2"}`} aria-label="Bio">
                      {isEditing ? (
                        <>
                          <textarea
                            value={editBio}
                            onChange={(e) => setEditBio(limitBioTo7Lines(e.target.value))}
                            placeholder="Bio (max 280 characters, max 7 lines)"
                            maxLength={BIO_MAX}
                            className="w-full min-h-[80px] max-h-[10rem] p-3 rounded-md border bg-background text-sm resize-y"
                            rows={7}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            {editBio.length}/{BIO_MAX}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-foreground whitespace-pre-wrap break-words select-none cursor-default">
                          {profile?.bio ?? (isOwnProfile ? "No bio yet." : "No bio.")}
                        </p>
                      )}
                    </section>
                  </div>
                </div>
                {/* Categories below the bio, full width */}
                <div className="mt-4 -mx-4 sm:-mx-6 select-none">
                  <CategoriesBar
                    compact
                    allowedCategories={categories}
                    selectedCategory={categoryFilter === "all" ? undefined : categoryFilter}
                    onCategoryChange={(v) => setCategoryFilter(v ?? "all")}
                  />
                </div>
              </div>
            </div>

            {/* Filters + Sort */}
            <div className="flex flex-wrap items-center gap-4 mb-4 select-none">
              <RadioGroup
                value={filter}
                onValueChange={(v) => setFilter(v as FilterKind)}
                className="flex flex-wrap gap-3"
              >
                {filterOptions.map((f) => (
                  <div key={f} className="flex items-center space-x-2 cursor-pointer">
                    <RadioGroupItem value={f} id={`profile-filter-${f}`} />
                    <Label htmlFor={`profile-filter-${f}`} className="text-sm capitalize cursor-pointer">
                      {f}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className="flex items-center gap-2 cursor-default">
                <Label className="text-sm text-muted-foreground whitespace-nowrap">Sort by</Label>
                <Select value={sort} onValueChange={(v) => setSort(v as SortKind)}>
                  <SelectTrigger className="w-[140px] h-8 text-xs cursor-pointer">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="likes">Likes</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="generations">Generations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Gallery grid */}
            {filtered.length === 0 ? (
              <Card className="border border-border/60 bg-card/60 backdrop-blur">
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  {isOwnProfile
                    ? "No items match the filter. Create prompts or generate images to see them here."
                    : "No public prompts yet."}
                </CardContent>
              </Card>
            ) : (() => {
              const n = filtered.length;
              const renderCard = (item: (typeof filtered)[0]) => (
                <div key={item.id} className="min-w-0">
                  <Card
                    className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 hover:scale-[1.02] border-0 rounded-none min-w-0 p-0 select-none caret-transparent"
                    onClick={() => {
                      if (item.kind === "prompt") router.push(`/generator/${item.id}`);
                      else if (isOwnProfile) router.push("/my-gallery");
                    }}
                  >
                    <div
                      className="relative bg-muted overflow-hidden cursor-zoom-in"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxItem(item);
                      }}
                    >
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-auto block align-top"
                        />
                      ) : (
                        <div className="w-full aspect-square bg-muted flex items-center justify-center text-muted-foreground text-sm">
                          No image
                        </div>
                      )}
                      <span
                        className={`absolute top-1.5 left-1.5 z-20 rounded-full px-2 py-0.5 text-xs font-medium shadow-sm pointer-events-none ${
                          item.kind === "private"
                            ? "bg-neutral-500/90 text-white border border-neutral-600"
                            : item.type === "paid"
                              ? "bg-amber-50/95 text-gray-800 border border-amber-200/90 dark:bg-amber-950/90 dark:text-amber-100 dark:border-amber-700/80"
                              : item.type === "free"
                                ? "bg-green-100/95 text-green-900 border border-green-300/90 dark:bg-green-950/90 dark:text-green-100 dark:border-green-700/80"
                                : "bg-red-100/95 text-red-900 border border-red-300/90 dark:bg-red-950/90 dark:text-red-100 dark:border-red-700/80"
                        }`}
                      >
                        {item.kind === "private"
                          ? "Private"
                          : item.type === "paid"
                            ? formatPricePerGeneration(item.kind === "prompt" ? item.priceStored : 0)
                            : item.type === "free"
                              ? "FREE"
                              : "Show"}
                      </span>
                    </div>
                    <CardContent className="p-3 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <h3
                          className="font-semibold text-sm truncate flex-1 min-w-0 hover:underline cursor-pointer"
                          title={item.title}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (item.kind === "prompt") router.push(`/generator/${item.id}`);
                          }}
                        >
                          {item.title}
                        </h3>
                        {isOwnProfile && item.kind === "prompt" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/editor?promptId=${item.id}`);
                            }}
                            title="Update prompt"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-3">
                        <span>{item.likes} likes</span>
                        {item.kind === "prompt" && (
                          <>
                            <span>{item.rating.toFixed(1)} rating</span>
                            <span>{item.generations} generations</span>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
              if (n === 1) {
                return (
                  <div className="flex justify-center">
                    <div className="min-w-0 w-full max-w-[420px]">{renderCard(filtered[0])}</div>
                  </div>
                );
              }
              if (n === 2) {
                return (
                  <div className="flex justify-center">
                    <div className="grid grid-cols-2 gap-[3px] w-fit">{filtered.map(renderCard)}</div>
                  </div>
                );
              }
              if (n === 3) {
                return (
                  <div className="flex justify-center">
                    <div className="grid grid-cols-2 gap-[3px] w-fit">
                      {filtered.slice(0, 2).map(renderCard)}
                      <div className="col-span-2 flex justify-center min-w-0">{renderCard(filtered[2])}</div>
                    </div>
                  </div>
                );
              }
              if (n === 4) {
                return (
                  <div className="flex justify-center">
                    <div className="grid grid-cols-2 gap-[3px] w-fit">{filtered.map(renderCard)}</div>
                  </div>
                );
              }
              return (
                <div className="flex justify-center">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-[3px] w-full max-w-5xl">
                    {filtered.map(renderCard)}
                  </div>
                </div>
              );
            })()}
          </>
        )}
      </main>
      <ImageLightbox
        isOpen={!!lightboxItem}
        onClose={() => setLightboxItem(null)}
        imageUrl={lightboxItem?.imageUrl ?? ""}
        title={lightboxItem?.title}
        footerSubtitle={lightboxItem ? `${lightboxItem.likes} likes · ${lightboxItem.rating.toFixed(1)} rating · ${lightboxItem.generations} generations` : undefined}
        onGoToSingleImage={
          lightboxItem?.kind === "prompt"
            ? () => router.push(`/generator/${lightboxItem.id}`)
            : undefined
        }
      />
    </div>
  );
}
