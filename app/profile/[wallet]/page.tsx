"use client";

import { useActiveAccount } from "thirdweb/react";
import { useEffect, useState, useRef, useMemo } from "react";
import { getUserKeyFromAccount } from "@/lib/creations";
import { useRouter, useParams } from "next/navigation";
import { formatPricePerGeneration } from "@/lib/utils";
import { Pencil, Check, UserPlus, UserMinus, ImagePlus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import CategoriesBar from "@/components/CategoriesBar";
import ImageLightbox from "@/components/ImageLightbox";
import EnkiCard from "@/components/enki/EnkiCard";
import { adaptMarketplacePrompt, type EnkiPromptCard } from "@/lib/enki-redesign";

const BIO_MAX = 280;
const BIO_MAX_LINES = 7;

function limitBioTo7Lines(s: string): string {
  return s.split("\n").slice(0, BIO_MAX_LINES).join("\n").slice(0, BIO_MAX);
}

type FilterKind = "all" | "paid" | "free" | "showroom" | "private";
type SortKind = "likes" | "rating" | "generations";

type ProfileData = {
  wallet: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  bio: string | null;
  updatedAt: string | null;
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
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterKind>("all");
  const [sort, setSort] = useState<SortKind>("likes");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const [isEditing, setIsEditing] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [bannerPreviewUrl, setBannerPreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [openedPrompt, setOpenedPrompt] = useState<EnkiPromptCard | null>(null);

  useEffect(() => {
    if (avatarFile) {
      const url = URL.createObjectURL(avatarFile);
      setAvatarPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [avatarFile]);

  useEffect(() => {
    if (bannerFile) {
      const url = URL.createObjectURL(bannerFile);
      setBannerPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [bannerFile]);

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
      } catch {
        if (!cancelled) {
          setProfile(null);
          setPrompts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [wallet]);

  useEffect(() => {
    if (profile && isEditing) {
      setEditBio(limitBioTo7Lines(profile.bio ?? ""));
    }
  }, [profile, isEditing]);

  const cards = useMemo(() => prompts.map(adaptMarketplacePrompt), [prompts]);

  const categories = useMemo(() => Array.from(
    cards.reduce((set, c) => {
      if (c.category) set.add(c.category);
      return set;
    }, new Set<string>()),
  ).sort((a, b) => a.localeCompare(b)), [cards]);

  const filtered = useMemo(() => {
    let list = cards;
    if (filter === "paid") list = list.filter(c => c.type === "paid");
    else if (filter === "free") list = list.filter(c => c.type === "free");
    else if (filter === "showroom") list = list.filter(c => c.type === "showroom");

    if (categoryFilter !== "all") {
      list = list.filter(c => c.category === categoryFilter);
    }

    if (sort === "likes") list = [...list].sort((a, b) => b.likes - a.likes);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [cards, filter, categoryFilter, sort]);

  const handleSaveProfile = async () => {
    if (!userKey) return;
    setSaving(true);
    try {
      let avatarUrl = profile?.avatarUrl;
      if (avatarFile) {
        const fd = new FormData();
        fd.set("file", avatarFile);
        fd.set("userKey", userKey);
        fd.set("type", "avatar");
        const up = await fetch("/api/profile/upload", { method: "POST", body: fd });
        const j = await up.json();
        avatarUrl = j.url;
      }
      let bannerUrl = profile?.bannerUrl;
      if (bannerFile) {
        const fd = new FormData();
        fd.set("file", bannerFile);
        fd.set("userKey", userKey);
        fd.set("type", "banner");
        const up = await fetch("/api/profile/upload", { method: "POST", body: fd });
        const j = await up.json();
        bannerUrl = j.url;
      }
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userKey,
          bio: limitBioTo7Lines(editBio),
          avatarUrl,
          bannerUrl,
        }),
      });
      const data = await res.json();
      setProfile(data.profile);
      setIsEditing(false);
      setAvatarFile(null);
      setBannerFile(null);
      toast({ title: "Profile updated" });
    } catch (e) {
      toast({ title: "Error", description: String(e), variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="enki-loading"><Loader2 className="animate-spin" /></div>;

  const displayAvatar = (isEditing && avatarPreviewUrl) || profile?.avatarUrl;
  const displayBanner = (isEditing && bannerPreviewUrl) || profile?.bannerUrl;

  return (
    <div className="enki">
      <div className="enki-profile-banner">
        <div className="enki-profile-banner-art">
          {displayBanner ? (
            <img src={displayBanner} alt="" />
          ) : (
            <div className="enki-profile-banner-placeholder" />
          )}
          {isEditing && (
            <button className="enki-banner-edit-btn" onClick={() => bannerInputRef.current?.click()}>
              <ImagePlus size={20} />
            </button>
          )}
        </div>
        <div className="enki-profile-avatar-overlap">
          {displayAvatar ? (
            <img src={displayAvatar} alt="" />
          ) : (
            <div className="enki-avatar-placeholder">{wallet.slice(2, 4).toUpperCase()}</div>
          )}
          {isEditing && (
            <button className="enki-avatar-edit-btn" onClick={() => avatarInputRef.current?.click()}>
              <Pencil size={16} />
            </button>
          )}
        </div>
        <input ref={avatarInputRef} type="file" hidden onChange={e => setAvatarFile(e.target.files?.[0] || null)} />
        <input ref={bannerInputRef} type="file" hidden onChange={e => setBannerFile(e.target.files?.[0] || null)} />
      </div>

      <div className="enki-profile-hero">
        <div className="enki-profile-actions">
          {isOwnProfile ? (
            <button className="enki-btn enki-btn-secondary" onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}>
              {saving ? <Loader2 className="animate-spin h-4 w-4" /> : isEditing ? <Check size={16} /> : <Pencil size={16} />}
              <span>{isEditing ? "Save profile" : "Edit profile"}</span>
            </button>
          ) : (
            <button className="enki-btn" onClick={() => setIsFollowing(!isFollowing)}>
              {isFollowing ? <UserMinus size={16} /> : <UserPlus size={16} />}
              <span>{isFollowing ? "Unfollow" : "Follow"}</span>
            </button>
          )}
        </div>
        
        <div className="enki-profile-name serif">
          {wallet.slice(0, 6)}...{wallet.slice(-4)}
        </div>
        
        <div className="enki-profile-bio">
          {isEditing ? (
            <textarea 
              className="enki-qc-textarea serif" 
              value={editBio} 
              onChange={e => setEditBio(limitBioTo7Lines(e.target.value))}
              placeholder="Tell the world about your art..."
              rows={4}
            />
          ) : (
            <p className="serif">{profile?.bio || "No bio yet."}</p>
          )}
        </div>

        <div className="enki-profile-stats mono">
          <span><strong>{cards.length}</strong> prompts</span>
          <span><strong>0</strong> followers</span>
          <span><strong>0</strong> following</span>
        </div>
      </div>

      <div className="enki-profile-content">
        <div className="enki-profile-filters">
          <div className="enki-filter-row">
            {["all", "paid", "free", "showroom"].map(f => (
              <button key={f} className={`enki-filter-chip mono ${filter === f ? "active" : ""}`} onClick={() => setFilter(f as any)}>
                {f}
              </button>
            ))}
          </div>
          <CategoriesBar
            compact
            allowedCategories={categories}
            selectedCategory={categoryFilter === "all" ? undefined : categoryFilter}
            onCategoryChange={v => setCategoryFilter(v ?? "all")}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="enki-empty serif">No prompts found in this category.</div>
        ) : (
          <div className="enki-masonry enki-desktop-feed" style={{ "--cols": 4 } as any}>
            {filtered.map(p => (
              <EnkiCard key={p.id} prompt={p} onOpen={setOpenedPrompt} />
            ))}
          </div>
        )}
      </div>

      {openedPrompt && <ImageLightbox isOpen={!!openedPrompt} onClose={() => setOpenedPrompt(null)} imageUrl={openedPrompt.imageUrl} title={openedPrompt.title} />}
    </div>
  );
}
