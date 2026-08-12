"use client";

import { sessionAuthHeaders } from "@/lib/session-headers";
import { fetchGenerationQuote, authorizePaidGeneration, toModelFamily } from "@/lib/generation-checkout";
import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useActiveAccount } from "thirdweb/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCdpAddress } from "@/hooks/useCdpAddress";
import { useToast } from "@/hooks/use-toast";
import { addCreation } from "@/lib/creations";
import {
  Star,
  Share2,
  Info,
  X,
  Copy,
  Check,
  Sparkles,
  Loader2,
  Bookmark,
  BookmarkCheck,
  Download,
  Image as ImageIcon,
  MessageSquare,
  ChevronDown,
  Crop,
  Maximize2,
} from "lucide-react";
import "./prompt-generator.css";
import BoostToggle, { boostedCost } from "@/components/generation/BoostToggle";
import DiceButton from "@/components/DiceButton";
import { DICE_LIMITS, type DiceValue, type DiceVariable } from "@/lib/generation/variable-dice";

/* ── Types ── */
type VarType = "text" | "checkbox" | "single-select" | "multi-select" | "slider" | "radio";

interface VariableOption {
  visibleName: string;
  promptValue: string;
}

interface PromptVariable {
  id: string;
  name: string;
  label: string;
  description?: string;
  type: VarType;
  defaultValue?: string | number | boolean | string[];
  required?: boolean;
  position?: number;
  min?: number;
  max?: number;
  options?: VariableOption[];
  allowReferenceImage?: boolean;
}

interface ShowcaseImage {
  url: string;
  thumbnail?: string;
  isPrimary?: boolean;
}

interface Props {
  promptId: string;
  title?: string;
  artistName?: string;
  artistId?: string;
  imageUrl?: string;
  showcaseImages?: ShowcaseImage[];
  isFreeShowcase?: boolean;
}

const ASPECTS = ["3:4", "4:5", "1:1", "2:3", "4:3", "16:9"];
const RESOLUTIONS = ["1K", "2K", "4K"];

function getFavs(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem("prompt-favorites") || "[]"); }
  catch { return []; }
}
function setFavs(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("prompt-favorites", JSON.stringify(ids));
}

/* ── Component ── */
export default function PromptGeneratorView({
  promptId,
  title: propTitle,
  artistName: propArtistName,
  imageUrl: propImageUrl,
  showcaseImages: propShowcaseImages = [],
  isFreeShowcase: propIsFree,
}: Props) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  /* Auth */
  const account = useActiveAccount();
  const { publicKey: solanaPublicKey } = useWallet();
  const { address: cdpAddress } = useCdpAddress();
  const userKey = useMemo(
    () => account?.address ?? solanaPublicKey?.toBase58() ?? cdpAddress ?? null,
    [account?.address, solanaPublicKey, cdpAddress]
  );

  /* State */
  const [vars, setVars] = useState<Record<string, string>>({});
  const [aspect, setAspect] = useState("4:5");
  const [resolution, setResolution] = useState("2K");
  const [generator, setGenerator] = useState("Nano Banana Pro");
  const [refs, setRefs] = useState<string[]>([]);
  const [fav, setFav] = useState(false);
  const [generating, setGenerating] = useState(false);
  // Same model on a priority host — faster, dearer, identical image.
  const [boost, setBoost] = useState(false);
  /* Only consulted below the 960px breakpoint, where the history is an
     overlay. Above it the panel is always in the layout and this is inert. */
  const [historyOpen, setHistoryOpen] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [activeThumb, setActiveThumb] = useState(0);
  const [thumbOffset, setThumbOffset] = useState(0);
  const [activeTab, setActiveTab] = useState<"comments" | "reviews">("comments");
  const [localHistory, setLocalHistory] = useState<string[]>([]);
  const [savedToGallery, setSavedToGallery] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  /* Fetch available models from DB */
  const { data: modelsData } = useQuery<Array<{ id?: string; name?: string; price?: number }>>({
    queryKey: ["/api/models"],
    queryFn: async () => {
      const res = await fetch("/api/models", { credentials: "include" });
      if (!res.ok) return [];
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
  const GENERATORS = useMemo(() => {
    const fromDb = (modelsData ?? [])
      .map((m) => (typeof m.name === "string" ? m.name : ""))
      .filter(Boolean);
    return fromDb.length > 0
      ? fromDb
      : ["Nano Banana Pro", "Seedream 5.0 lite (coming soon)", "GPT-Image-2 (coming soon)"];
  }, [modelsData]);

  useEffect(() => {
    if (GENERATORS.length > 0 && !GENERATORS.includes(generator)) {
      setGenerator(GENERATORS[0]);
    }
  }, [GENERATORS, generator]);

  /* Fetch prompt */
  const { data: promptData, isLoading: loading } = useQuery<{
    prompt?: {
      _id?: string; id?: string; title?: string;
      type?: string; prompt_type?: string;
      is_free_showcase?: boolean; price?: number; tags?: string[];
      content?: string; created_at?: string; creator?: string;
      publicPromptText?: string; showcaseImages?: ShowcaseImage[];
      promptData?: { variables?: PromptVariable[] };
    };
  }>({
    queryKey: [`/api/prompts/${promptId}`],
    enabled: !!promptId,
  });

  const prompt = promptData?.prompt;
  const variables = useMemo(() => prompt?.promptData?.variables || [], [prompt]);
  const title = prompt?.title || propTitle || "Untitled Prompt";
  const artistName = propArtistName || "Unknown Artist";
  const isFree =
    prompt?.prompt_type === "showcase" ||
    prompt?.prompt_type === "free-prompt" ||
    prompt?.is_free_showcase === true ||
    propIsFree ||
    false;
  const price = prompt?.price ?? 0;
  const tags = prompt?.tags?.length ? prompt.tags : [];

  /* The real total, from the server's own arithmetic. boostedCost(price) was
     only ever the ARTIST price — it omitted model cost, platform fee and the
     network fee, so the button promised less than the charge. A paid prompt
     with no quote greys out rather than showing a number we invented. */
  const modelFamily = toModelFamily(generator);
  const quoteResolution = resolution === "4K" ? ("4K" as const) : ("2K" as const);

  /* A model priced at 0 in the DB runs on the free provider (Kev,
     2026-08-12 — "den preis entfernen, falls free model verfügbar ist").
     There is nothing to quote and nothing to charge, so the whole payment
     path is skipped rather than quoted at zero: a quote of $0.00 would still
     build an intent, a nonce account and a signature request for a payment
     that moves nothing. */
  const freeModel = useMemo(() => {
    const row = (modelsData ?? []).find((m) => m.name === generator);
    return typeof row?.price === "number" && row.price === 0;
  }, [modelsData, generator]);

  /* Free of charge for either reason: the artist gave the prompt away, or the
     chosen model costs nothing to run. */
  const noCharge = isFree || freeModel;

  const { data: paidQuote } = useQuery({
    queryKey: ["generation-quote", promptId, modelFamily, quoteResolution],
    queryFn: () =>
      fetchGenerationQuote({ promptId: promptId!, modelFamily, resolution: quoteResolution }),
    enabled: !noCharge && !!promptId && !loading,
    // Quotes expire server-side after 5 minutes; refresh a little sooner.
    refetchInterval: 4 * 60 * 1000,
  });
  const showcaseImages = prompt?.showcaseImages?.length ? prompt.showcaseImages : propShowcaseImages;
  const mainImage = showcaseImages[0]?.thumbnail || showcaseImages[0]?.url || propImageUrl || "";
  const promptText = prompt?.publicPromptText || "";

  /* Fetch user's generations — API returns { data: { generations, total } } via createSuccessResponse */
  const genQueryKey = ["user-generations", userKey, promptId];
  const { data: genData } = useQuery<{
    data?: { generations?: Array<{ id: string; image_urls?: string[]; created_at: string; prompt_id?: string }> };
    generations?: Array<{ id: string; image_urls?: string[]; created_at: string; prompt_id?: string }>;
  }>({
    queryKey: genQueryKey,
    queryFn: async () => {
      if (!userKey) return {};
      const res = await fetch(`/api/generations?userId=${encodeURIComponent(userKey)}&limit=20`);
      return res.ok ? res.json() : {};
    },
    enabled: !!userKey,
    staleTime: 30_000,
  });

  const dbHistory = useMemo(() => {
    const gens = genData?.data?.generations ?? genData?.generations ?? [];
    return (gens as Array<{ id: string; image_urls?: string[]; created_at: string }>)
      .filter(g => g.image_urls?.length)
      .flatMap(g => g.image_urls as string[]);
  }, [genData]);

  /* Merge local (immediate) + DB history, deduplicate, cap at 20 */
  const history = useMemo(() => {
    const seen = new Set<string>();
    return [...localHistory, ...dbHistory].filter(url => {
      if (seen.has(url)) return false;
      seen.add(url);
      return true;
    }).slice(0, 20);
  }, [localHistory, dbHistory]);

  /* Init */
  useEffect(() => { setFav(getFavs().includes(promptId)); }, [promptId]);
  useEffect(() => {
    if (variables.length) {
      const init: Record<string, string> = {};
      variables.forEach(v => {
        if (v.type === "checkbox") {
          init[v.name] = v.defaultValue ? "true" : "false";
        } else if (v.type === "slider") {
          init[v.name] = String(v.defaultValue ?? v.min ?? 0);
        } else if (v.type === "single-select" || v.type === "radio") {
          const defOpt = v.options?.[0]?.promptValue ?? "";
          init[v.name] = v.defaultValue != null ? String(v.defaultValue) : defOpt;
        } else if (v.type === "multi-select") {
          init[v.name] = "";
        } else {
          init[v.name] = v.defaultValue != null ? String(v.defaultValue) : "";
        }
      });
      setVars(init);
    }
  }, [variables]);

  /* Handlers */
  const toggleFav = useCallback(() => {
    const list = getFavs();
    setFavs(fav ? list.filter(id => id !== promptId) : [...list, promptId]);
    setFav(p => !p);
    toast({ title: fav ? "Removed from favorites" : "Saved to favorites" });
  }, [fav, promptId, toast]);

  const copyPrompt = useCallback(() => {
    if (!promptText) return;
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [promptText]);

  const onRefUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const remaining = 10 - refs.length;
    Array.from(files).slice(0, remaining).forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => setRefs(prev => prev.length >= 10 ? prev : [...prev, ev.target?.result as string]);
      reader.readAsDataURL(file);
    });
    if (fileRef.current) fileRef.current.value = "";
  }, [refs.length]);

  const removeRef = useCallback((i: number) => setRefs(prev => prev.filter((_, idx) => idx !== i)), []);

  /* How much of each buried reference card stays visible.
   *
   * The deck must fit on ONE line inside a fixed 230px sidebar that clips
   * horizontally (.pgv-sidebar has overflow: hidden, .pgv-sidebar-scroll has
   * overflow-x: hidden), so a deck that overruns does not scroll — the last
   * cards simply vanish. Measured budget for the deck itself is 155px: 201px
   * of block content, minus the 36px add-tile and the 10px gap.
   *
   * So the strip is derived from the count rather than fixed: ten images pack
   * to 13px each (36 + 9x13 = 153), six or fewer get the comfortable 20px.
   * The badge width is the same value, so the ordinal always sits exactly on
   * the part of the card that is not covered by its neighbour — and the drop
   * seam below splits on the middle of that same strip.
   */
  const refStrip = useMemo(() => {
    const DECK_PX = 155;
    const TILE_PX = 36;
    if (refs.length < 2) return 20;
    return Math.min(20, Math.floor((DECK_PX - TILE_PX) / (refs.length - 1)));
  }, [refs.length]);

  /* Reorder by dragging a card onto another position.
   *
   * The numbers on the deck are not labels, they are the order the images are
   * sent in, and a prompt refers to them by that position. Without this the
   * only way to fix an upload that landed in the wrong order is to delete the
   * images and add them again. The editor deck has had this from the start
   * (NodeCreator's moveRef); this is the buyer side catching up.
   */
  const [refDragI, setRefDragI] = useState<number | null>(null);
  /* The seam the pointer is currently aiming at, as an insertion index into
   * the deck as it stands (0 = before the first card, refs.length = past the
   * last). Tracking the SEAM rather than the hovered card is what makes the
   * feedback honest: it follows the cursor across each card's midpoint, and
   * it does not depend on which side the drag started from. */
  const [refSeam, setRefSeam] = useState<number | null>(null);

  const moveRef = useCallback((from: number, to: number) => {
    if (from === to) return;
    setRefs(prev => {
      if (from < 0 || to < 0 || from >= prev.length || to >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  const endRefDrag = useCallback(() => {
    setRefDragI(null);
    setRefSeam(null);
  }, []);

  /* Which seam to draw the gap at.
   *
   * Nothing is drawn for the two seams either side of the carried card,
   * because dropping there moves nothing: promising a change and then not
   * making one is worse than showing no marker at all.
   */
  const refGapAt = useMemo(() => {
    if (refDragI === null || refSeam === null) return -1;
    if (refSeam === refDragI || refSeam === refDragI + 1) return -1;
    return refSeam;
  }, [refDragI, refSeam]);

  /* The deck's geometry as it stood when the drag STARTED.
   *
   * This has to be a snapshot, not a live measurement, or the indicator
   * oscillates and the user sees nothing settle. Opening the gap moves every
   * card behind it to the right; measuring live would then put a different
   * card under a stationary cursor, which flips the seam, which moves the gap
   * back, which flips it again. The seam has to be a function of the pointer
   * alone, and the pointer is not moved by our own reflow.
   */
  const refGeom = useRef<{ lefts: number[]; strip: number; lastRight: number } | null>(null);

  const captureRefGeometry = useCallback((deck: Element | null) => {
    if (!deck) return;
    const cards = [...deck.querySelectorAll<HTMLElement>(".pgv-ref-slot")];
    if (cards.length === 0) return;
    const last = cards[cards.length - 1].getBoundingClientRect();
    refGeom.current = {
      lefts: cards.map((c) => c.getBoundingClientRect().left),
      strip: refStrip,
      lastRight: last.right,
    };
  }, [refStrip]);

  /* Which seam the pointer is over, from its x against the midpoint of the
   * part of each card the user can actually SEE.
   *
   * Not the midpoint of the card's box: cards overlap, so all but the last
   * show only their leftmost strip and the rest lies buried under their
   * neighbours. Splitting on box midpoints would flip the seam at a point
   * sitting under a different card entirely, and the marker would appear
   * somewhere the cursor is not.
   */
  const seamFromX = useCallback((clientX: number): number | null => {
    const g = refGeom.current;
    if (!g) return null;
    for (let i = 0; i < g.lefts.length; i++) {
      const visible = i === g.lefts.length - 1 ? g.lastRight - g.lefts[i] : g.strip;
      if (clientX < g.lefts[i] + visible / 2) return i;
    }
    return g.lefts.length;
  }, []);

  const onVarChange = useCallback((name: string, value: string) => {
    setVars(prev => ({ ...prev, [name]: value }));
  }, []);

  // This surface keys `vars` by variable NAME, so name is the dice id — the
  // promptId path makes the server load the authoritative definitions from
  // prompt_variables and key its reply by name too.
  const diceVariables = useMemo<DiceVariable[]>(
    () =>
      variables.map((v) => ({
        id: v.name,
        name: v.name,
        label: v.label,
        description: v.description || undefined,
        // radio is a pick-one control; the dice knows it as single-select
        type: v.type === "radio" ? "single-select" : v.type,
        options: v.options,
        min: v.min,
        max: v.max,
      })),
    [variables]
  );

  /* Fill the gaps, never overwrite a decision.
   *
   * On this surface the dice is a helper for the fields the buyer left empty,
   * not a reset button. Someone who typed "brass, heavily tarnished" into one
   * field and wants the rest invented would otherwise lose that sentence on
   * the click that was supposed to help them, with no undo anywhere on the
   * page. So an existing value wins over a rolled one, always.
   *
   * The roll itself still covers every variable: on the promptId path the
   * server loads the definitions and rolls a COHERENT set, so it has to see
   * the whole picture. Narrowing the request would buy nothing and cost the
   * coherence. The filtering belongs here, at the point of application.
   *
   * `vars` stores every value as a string (checkbox "true"/"false",
   * multi-select comma-joined), so encode to match.
   */
  const applyDiceValues = useCallback((values: Record<string, DiceValue>) => {
    setVars((prev) => {
      const next = { ...prev };
      for (const [name, value] of Object.entries(values)) {
        if (typeof prev[name] === "string" && prev[name].trim() !== "") continue;
        next[name] = Array.isArray(value) ? value.join(",") : String(value);
      }
      return next;
    });
  }, []);

  const generate = useCallback(async () => {
    setGenerating(true);
    setResultUrl(null);
    try {
      /* 1. Build final prompt text */
      // Resolve each variable's raw string value → prompt value
      const resolvedVars: Record<string, string> = {};
      variables.forEach(v => {
        const raw = vars[v.name] ?? "";
        if (v.type === "checkbox") {
          // checkbox: if true, use label as prompt value; if false, use empty
          resolvedVars[v.name] = raw === "true" ? (v.label || v.name) : "";
        } else if (v.type === "multi-select" && v.options) {
          // multi-select: raw is comma-joined promptValues already
          resolvedVars[v.name] = raw;
        } else if ((v.type === "single-select" || v.type === "radio") && v.options) {
          // single-select/radio: raw IS the promptValue already
          resolvedVars[v.name] = raw;
        } else {
          resolvedVars[v.name] = raw;
        }
      });

      let final = "";
      if (isFree && promptText) {
        final = promptText;
        Object.entries(resolvedVars).forEach(([k, v]) => {
          if (v) final = final.replace(new RegExp(`\\[${k}\\]`, "gi"), v);
        });
      } else {
        final = title || "A beautiful artistic image";
        const filled = Object.entries(resolvedVars)
          .filter(([, v]) => v)
          .map(([k, v]) => `${k}: ${v}`)
          .join(", ");
        if (filled) final = `${final}, ${filled}`;
      }

      /* 2. Generate image.

         Paid prompts hold a payment FIRST — intent → authorize → sign in the
         buyer's wallet → submit — and generate with the intentId; the server
         captures only after the image is stored, and voids on any failure, so
         no branch of this function can end with money gone and no picture.
         This surface previously displayed a price and then called the FREE
         route: the marketplace showed prices and never charged anyone. */
      let res: Response;
      if (!noCharge && promptId) {
        const { intentId } = await authorizePaidGeneration({
          promptId,
          modelFamily,
          resolution: quoteResolution,
        });
        res = await fetch("/api/generate-image", {
          method: "POST",
          headers: { "Content-Type": "application/json", ...sessionAuthHeaders() },
          body: JSON.stringify({ intentId, prompt: final.trim(), aspectRatio: aspect }),
        });
      } else {
        res = await fetch("/api/generate-free", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: final.trim(), aspectRatio: aspect, resolution }),
        });
      }
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error || "Generation failed"); }
      const data = await res.json();
      if (!data.imageUrl) throw new Error("No image returned");
      setResultUrl(data.imageUrl);
      setSavedToGallery(false);
      /* Immediately add to local history so it shows up regardless of auth type */
      setLocalHistory(prev => [data.imageUrl, ...prev].slice(0, 20));
      setActiveThumb(0);

      /* 3. Persist to local gallery */
      if (userKey) {
        addCreation(userKey, { id: `gen-${Date.now()}`, imageUrl: data.imageUrl, prompt: final, createdAt: new Date().toISOString() });
        window.dispatchEvent(new Event("gallery-refresh"));
      }

      /* 4. Persist to Supabase: POST record, then PATCH image_urls */
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (userKey && isUuid.test(userKey)) {
        try {
          const postRes = await fetch("/api/generations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: userKey,
              promptId,
              encryptedPrompt: final,
              variableValues: Object.entries(vars).map(([k, v]) => ({ variableName: k, value: v })),
              settings: { aspectRatio: aspect, resolution, referenceImageCount: refs.length },
              boost,
            }),
          });
          if (postRes.ok) {
            const postData = await postRes.json();
            const genId = postData?.data?.generationId ?? postData?.generationId;
            if (genId) {
              /* PATCH image_urls + mark completed */
              await fetch(`/api/generations/${genId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", ...sessionAuthHeaders() },
                body: JSON.stringify({
                  status: "completed",
                  imageUrls: [data.imageUrl],
                  completedAt: new Date().toISOString(),
                }),
              });
            }
          }
        } catch { /* non-critical */ }
        /* Refetch history panel */
        queryClient.invalidateQueries({ queryKey: genQueryKey });
      }

      toast({ title: "Image Generated!", description: `Generated using ${data.provider || "AI"}` });
    } catch (e: any) {
      toast({ title: "Generation Failed", description: e.message, variant: "destructive" });
    } finally { setGenerating(false); }
  }, [isFree, noCharge, modelFamily, quoteResolution, promptText, vars, title, aspect, resolution, userKey, promptId, refs.length, toast, queryClient, genQueryKey]);

  const download = useCallback(() => {
    if (!resultUrl) return;
    const a = document.createElement("a");
    a.href = resultUrl; a.download = `generated-${Date.now()}.png`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }, [resultUrl]);

  if (loading) {
    return (
      <div className="pgv-page">
        <div className="pgv-loading"><Loader2 size={20} className="pgv-spinner" /> Loading prompt…</div>
      </div>
    );
  }

  const displayImage = resultUrl || mainImage;
  const allImages = resultUrl
    ? [{ url: resultUrl, thumbnail: resultUrl }, ...showcaseImages]
    : showcaseImages;
  const visibleThumbs = allImages.slice(thumbOffset, thumbOffset + 6);

  return (
    <div className="pgv-page">
      {/* ═══ LEFT SIDEBAR ═══ */}
      <aside className="pgv-sidebar">
        <div className="pgv-sidebar-scroll">
          {/* Title + meta */}
          <div className="pgv-sidebar-header">
            <h1>{title}</h1>
            <div className="pgv-meta-row">
              <span className="pgv-star-badge"><Star size={11} fill="currentColor" /> 4.9</span>
              <button className="pgv-icon-btn"><Share2 size={12} /></button>
              <button className="pgv-icon-btn"><Bookmark size={12} fill={fav ? "currentColor" : "none"} /></button>
            </div>
          </div>

          {/* Free: show prompt text */}
          {isFree && promptText && (
            <div className="pgv-block">
              <span className="pgv-section-label">Prompt · Free</span>
              <textarea className="pgv-prompt-area" value={promptText} readOnly rows={4} />
              <button onClick={copyPrompt} style={{ marginTop: 6, display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#666", background: "none", border: "none", cursor: "pointer" }}>
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copied" : "Copy prompt"}
              </button>
            </div>
          )}

          {/* Variable inputs — type-aware, one block per variable */}
          {variables.map(v => (
            <div key={v.id || v.name} className="pgv-block">
              <span className="pgv-section-label">{v.label || v.name}</span>

              {/* TEXT */}
              {v.type === "text" && (
                <input
                  className="pgv-input"
                  value={vars[v.name] || ""}
                  onChange={e => onVarChange(v.name, e.target.value)}
                  placeholder={v.defaultValue ? String(v.defaultValue) : `Enter ${(v.label || v.name).toLowerCase()}…`}
                />
              )}

              {/* CHECKBOX */}
              {v.type === "checkbox" && (
                <label className="pgv-check-row">
                  <input
                    type="checkbox"
                    checked={vars[v.name] === "true"}
                    onChange={e => onVarChange(v.name, e.target.checked ? "true" : "false")}
                  />
                  {v.description || v.label}
                </label>
              )}

              {/* SINGLE-SELECT */}
              {v.type === "single-select" && v.options && (
                <select
                  className="pgv-generator-select"
                  value={vars[v.name] || ""}
                  onChange={e => onVarChange(v.name, e.target.value)}
                >
                  {v.options.map((opt, i) => (
                    <option key={i} value={opt.promptValue}>{opt.visibleName}</option>
                  ))}
                </select>
              )}

              {/* RADIO */}
              {v.type === "radio" && v.options && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                  {v.options.map((opt, i) => (
                    <label key={i} className="pgv-check-row">
                      <input
                        type="radio"
                        name={v.name}
                        value={opt.promptValue}
                        checked={vars[v.name] === opt.promptValue}
                        onChange={() => onVarChange(v.name, opt.promptValue)}
                        style={{ accentColor: "var(--pgv-accent)" }}
                      />
                      {opt.visibleName}
                    </label>
                  ))}
                </div>
              )}

              {/* MULTI-SELECT */}
              {v.type === "multi-select" && v.options && (
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
                  {v.options.map((opt, i) => {
                    const selected = (vars[v.name] || "").split(",").filter(Boolean);
                    const checked = selected.includes(opt.promptValue);
                    return (
                      <label key={i} className="pgv-check-row">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={e => {
                            const next = e.target.checked
                              ? [...selected, opt.promptValue]
                              : selected.filter(s => s !== opt.promptValue);
                            onVarChange(v.name, next.join(","));
                          }}
                        />
                        {opt.visibleName}
                      </label>
                    );
                  })}
                </div>
              )}

              {/* SLIDER */}
              {v.type === "slider" && (
                <div style={{ marginTop: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#888", marginBottom: 4 }}>
                    <span>{v.min ?? 0}</span>
                    <span style={{ color: "#ddd", fontWeight: 600 }}>{vars[v.name] ?? v.defaultValue ?? v.min ?? 0}</span>
                    <span>{v.max ?? 100}</span>
                  </div>
                  <input
                    type="range"
                    min={v.min ?? 0}
                    max={v.max ?? 100}
                    step={1}
                    value={Number(vars[v.name] ?? v.defaultValue ?? v.min ?? 0)}
                    onChange={e => onVarChange(v.name, e.target.value)}
                    style={{ width: "100%", accentColor: "var(--pgv-accent)" }}
                  />
                </div>
              )}
            </div>
          ))}

          {/* Style Preset, Camera / Lens and Detail Options used to sit here as
              HARDCODED demo fields — "Minimal Brutalism", "35mm", "Keep
              brutalist geometry". They rendered for every prompt, took the
              buyer's input, and were bound to nothing: generate() only reads
              `vars`, which is keyed by the prompt's real variables. So a buyer
              filled in four fields that changed nothing about their image, on
              a page they had paid on. Removed rather than wired up: what a
              prompt asks for is the artist's decision, expressed by its
              variables, not a fixed set every prompt inherits. */}

          {/* Reference Images */}
          <div className="pgv-block">
            <div className="pgv-ref-header">
              <span className="pgv-section-label" style={{ marginBottom: 0 }}>Reference Images</span>
              <span className="pgv-ref-count">{refs.length}/10</span>
            </div>
            {/* Cascading numbered card-deck, the same shape the prompt
                editor uses for the author's own reference row: one line,
                each card overlapping the one before it, the ordinal
                always readable on the exposed left strip.

                It replaces a 4-column grid. The grid wrapped to three
                rows at ten images and pushed everything below it down
                the panel, and it showed no numbers at all — which is the
                one thing that matters here, because a prompt addresses
                these images by position (`@Image3`). Hover lifts a card
                clear of the stack so its remove button stays reachable
                from underneath. */}
            {/* dragover/drop live on the ROW, not on each card. A card only
                covers its own strip, so per-card handlers went silent over the
                opened gap and over the empty space right of the deck — exactly
                the two places the user aims at when moving an image to the
                end. The row spans all of it, and the seam comes from the
                frozen geometry, so which element reports the event no longer
                matters. */}
            <div
              className="pgv-ref-row"
              style={{ ["--pgv-ref-strip" as string]: `${refStrip}px` } as React.CSSProperties}
              onDragOver={e => {
                if (refDragI === null) return;
                // Without preventDefault the browser refuses the drop outright
                // and the card springs back with no indication why.
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                const seam = seamFromX(e.clientX);
                if (seam !== null && seam !== refSeam) setRefSeam(seam);
              }}
              onDrop={e => {
                if (refDragI === null) return;
                e.preventDefault();
                const from = Number.parseInt(e.dataTransfer.getData("text/plain"), 10);
                const seam = seamFromX(e.clientX);
                // The seam counts positions in the deck WITH the carried card
                // still in it. Removing that card shifts every later position
                // down by one, so a seam to its right loses one to land where
                // the gap was drawn.
                if (!Number.isNaN(from) && seam !== null) {
                  moveRef(from, seam > from ? seam - 1 : seam);
                }
                endRefDrag();
              }}
            >
              <button
                type="button"
                className="pgv-ref-add"
                onClick={() => fileRef.current?.click()}
                disabled={refs.length >= 10}
                aria-label="Add reference images"
                title="Add reference images"
              >
                +
              </button>
              {refs.length === 0 ? (
                <span className="pgv-ref-hint">Add images this prompt can refer to</span>
              ) : (
                <div className="pgv-ref-deck">
                  {refs.map((img, idx) => (
                    <div
                      key={idx}
                      className={
                        "pgv-ref-slot" +
                        (refDragI === idx ? " dragging" : "") +
                        (refGapAt === idx ? " gap-before" : "")
                      }
                      aria-label={`Reference image ${idx + 1}`}
                      draggable
                      onDragStart={e => {
                        // Freeze the layout before anything moves; every seam
                        // for the rest of this drag is measured against it.
                        captureRefGeometry(e.currentTarget.parentElement);
                        setRefDragI(idx);
                        e.dataTransfer.effectAllowed = "move";
                        e.dataTransfer.setData("text/plain", String(idx));
                      }}
                      onDragEnd={endRefDrag}
                    >
                      <img src={img} alt={`Reference ${idx + 1}`} draggable={false} />
                      <span className="pgv-ref-num" aria-hidden="true">{idx + 1}</span>
                      <button
                        type="button"
                        className="pgv-ref-remove"
                        aria-label={`Remove reference image ${idx + 1}`}
                        onClick={() => removeRef(idx)}
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                  {/* The seam past the last card needs its own element: the
                      last card may itself be the one being carried, and that
                      card's margins are already spoken for. */}
                  {refGapAt === refs.length && (
                    <span className="pgv-ref-gap-end" aria-hidden="true" />
                  )}
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={onRefUpload} />
          </div>

          {/* Image Settings: aspect + resolution side by side */}
          <div className="pgv-block">
            <span className="pgv-section-label">Image Settings</span>
            {/* Icon instead of a stacked caps label, the way quick create
                labels its controls. "ASPECT RATIO" and "RESOLUTION" cost a
                whole line each and half the field's width in a 230px rail,
                to name two things the values already say: nobody reads
                "16:9" and wonders what it is. The word survives as the
                title/aria-label for anyone who does. */}
            <div className="pgv-img-settings">
              <div className="pgv-field">
                <Crop size={12} aria-hidden />
                <select
                  value={aspect}
                  onChange={e => setAspect(e.target.value)}
                  title="Aspect ratio"
                  aria-label="Aspect ratio"
                >
                  {ASPECTS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div className="pgv-field">
                <Maximize2 size={12} aria-hidden />
                <select
                  value={resolution}
                  onChange={e => setResolution(e.target.value)}
                  title="Resolution"
                  aria-label="Resolution"
                >
                  {RESOLUTIONS.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Generator dropdown */}
          <div className="pgv-block">
            <span className="pgv-section-label">Generator</span>
            <select className="pgv-generator-select" value={generator} onChange={e => setGenerator(e.target.value)}>
              {GENERATORS.map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
        </div>

        {/* ── Sticky footer: Generate button ── */}
        {/* Both settings sit BEFORE Generate. They change what Generate will
            do, so reaching them after passing the button reads backwards, and
            the dice in particular was easy to mistake for a post-generation
            action out on the right. */}
        <div className="pgv-sidebar-footer" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BoostToggle boost={boost} onChange={setBoost} disabled={generating} compact />
          {/* publicPromptText is the only prompt text this surface may hold
              for a paid prompt; sliced because the route's zod max REJECTS an
              over-long context rather than clipping it. */}
          <DiceButton
            variables={diceVariables}
            promptId={promptId}
            context={promptText ? promptText.slice(0, DICE_LIMITS.maxContextLen) : undefined}
            onValues={applyDiceValues}
            headers={sessionAuthHeaders()}
            disabled={generating}
            title="Roll the dice — fill the fields you left empty"
          />
          {/* The label is the QUOTE total — the server's arithmetic, model
              cost and fees included. boostedCost(price) was the artist price
              alone and understated every paid generation. A paid prompt with
              no quote yet cannot promise a number, so it cannot be clicked. */}
          <div className="pgv-generate-wrap">
            <button
              className="pgv-generate-btn"
              onClick={generate}
              disabled={generating || (!noCharge && !paidQuote)}
            >
              {generating ? <Loader2 size={14} className="pgv-spinner" /> : <Sparkles size={14} />}
              {noCharge
                ? "Generate free"
                : paidQuote
                  ? `Generate $${paidQuote.totalUsd}`
                  : "Generate …"}
            </button>
            {/* ToS §4 requires the network fee to be itemised before the buyer
                confirms. It used to occupy its own line above the footer,
                which in a 230px rail is a lot of permanent space for a number
                that only matters once. As a marker on the button it is still
                there, still before the click, and reachable by hover, focus
                and touch — but it stops competing with the price it qualifies.
                Rendered only when the quote actually carries a fee. */}
            {!noCharge && paidQuote && (
              <span
                className="pgv-fee-info"
                tabIndex={0}
                role="note"
                aria-label={`Total includes a $${paidQuote.networkFeeUsd} network fee`}
              >
                <Info size={11} aria-hidden />
                <span className="pgv-fee-tip">
                  incl. ${paidQuote.networkFeeUsd} network fee
                  {paidQuote.appliedRule ? ` · ${paidQuote.appliedRule.name}` : ""}
                </span>
              </span>
            )}
          </div>
        </div>
      </aside>

      {/* ═══ CENTER ═══ */}
      <main className="pgv-center">
        {/* Main image */}
        <div className="pgv-main-image">
          {generating && (
            <div className="pgv-overlay-generating">
              <Loader2 size={36} className="pgv-spinner" />
              <span>Generating…</span>
            </div>
          )}
          {displayImage
            ? <img src={displayImage} alt={title} onClick={() => setLightbox(displayImage)} style={{ cursor: "pointer" }} />
            : <ImageIcon size={56} color="#333" />
          }
          {/* Action buttons — appear on hover when result is ready */}
          {resultUrl && !generating && (
            <div className="pgv-image-actions">
              <button
                className={`pgv-img-action-btn ${savedToGallery ? "saved" : ""}`}
                onClick={() => {
                  if (!savedToGallery) {
                    if (userKey) {
                      addCreation(userKey, { id: `gen-${Date.now()}`, imageUrl: resultUrl, prompt: title, createdAt: new Date().toISOString() });
                      window.dispatchEvent(new Event("gallery-refresh"));
                    }
                    setSavedToGallery(true);
                    toast({ title: "Saved to Gallery" });
                  }
                }}
              >
                {savedToGallery ? <Check size={13} /> : <Bookmark size={13} />}
                {savedToGallery ? "Saved" : "Save to Gallery"}
              </button>
              <button
                className="pgv-img-action-btn"
                onClick={download}
              >
                <Download size={13} />
                Download
              </button>
            </div>
          )}
        </div>

        {/* Thumbnail strip with arrows */}
        <div className="pgv-thumb-row">
          <button
            className="pgv-thumb-arrow"
            onClick={() => setThumbOffset(o => Math.max(0, o - 1))}
            disabled={thumbOffset === 0}
          >
            <ChevronDown size={14} style={{ transform: "rotate(90deg)" }} />
          </button>

          <div className="pgv-thumb-strip">
            {visibleThumbs.map((img, idx) => {
              const absIdx = thumbOffset + idx;
              return (
                <div
                  key={absIdx}
                  className={`pgv-thumb-item ${activeThumb === absIdx ? "active" : ""}`}
                  onClick={() => { setActiveThumb(absIdx); }}
                >
                  {(img.thumbnail || img.url)
                    ? <img src={img.thumbnail || img.url} alt="" />
                    : <span style={{ fontSize: 9, color: "#444" }}>v{absIdx + 1}</span>
                  }
                  {absIdx === 0 && resultUrl && (
                    <span className="pgv-thumb-status success">✓</span>
                  )}
                </div>
              );
            })}
          </div>

          <button
            className="pgv-thumb-arrow"
            onClick={() => setThumbOffset(o => Math.min(allImages.length - 1, o + 1))}
            disabled={thumbOffset + 6 >= allImages.length}
          >
            <ChevronDown size={14} style={{ transform: "rotate(-90deg)" }} />
          </button>
        </div>

        {/* Comments / Reviews tabs */}
        <div className="pgv-center-tabs">
          <button
            className={`pgv-center-tab ${activeTab === "comments" ? "active" : ""}`}
            onClick={() => setActiveTab("comments")}
          >
            <MessageSquare size={13} />
            Comments
            <span className="pgv-center-tab-sub">(Image)</span>
          </button>
          <button
            className={`pgv-center-tab ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            <Star size={13} />
            Reviews
            <span className="pgv-center-tab-sub">(Requires Purchase)</span>
          </button>
        </div>
      </main>

      {/* ═══ RIGHT HISTORY ═══
          Below 960px this used to be `display: none` and nothing replaced it,
          so a narrow window simply lost every generated image with no way to
          reach them — the images were still in state, just unreachable. It is
          now an off-canvas panel with a handle, so the content stays available
          at any width instead of being thrown away by a breakpoint. */}
      {!historyOpen && (
        <button
          type="button"
          className="pgv-history-handle"
          onClick={() => setHistoryOpen(true)}
          aria-label={`Your history${history.length ? ` (${history.length})` : ""}`}
          title="Your history"
        >
          <ImageIcon size={13} aria-hidden />
          {history.length > 0 && <span className="pgv-history-handle__n">{history.length}</span>}
        </button>
      )}
      <aside className={`pgv-history${historyOpen ? " pgv-history--open" : ""}`}>
        <div className="pgv-history-header">
          <span>Your History</span>
          <button
            type="button"
            onClick={() => setHistoryOpen(false)}
            aria-label="Close history"
            title="Close history"
          >
            <X size={12} />
          </button>
        </div>
        <div className="pgv-history-list">
          {history.length === 0 && (
            <div className="pgv-history-empty">
              Generate an image<br />to see it here
            </div>
          )}
          {history.map((url, idx) => (
            <div
              key={idx}
              className="pgv-history-item"
              onClick={() => setLightbox(url)}
            >
              <img src={url} alt="" />
              <span className="pgv-history-status success">✓</span>
            </div>
          ))}
        </div>
        {history.length > 5 && (
          <div className="pgv-history-scroll-hint">
            <ChevronDown size={12} />
          </div>
        )}
      </aside>

      {/* Lightbox */}
      {lightbox && (
        <div className="pgv-lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} alt="Expanded" />
          <button className="pgv-lightbox-close" onClick={() => setLightbox(null)}>
            <X size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
