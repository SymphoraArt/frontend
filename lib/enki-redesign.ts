export interface EnkiArtwork {
  url: string;
  ratio: string;
  w: number;
  h: number;
}

export interface EnkiArtist {
  handle: string;
  name: string;
  avatar: string;
  bio: string;
}

export interface EnkiVariable {
  name: string;
  label: string;
  type: "text" | "checkbox";
  value: string | boolean;
}

export interface EnkiPromptCard {
  id: string;
  title: string;
  artist: EnkiArtist;
  isVideo: boolean;
  art: EnkiArtwork;
  tags: string[];
  model: string;
  price: number;
  visibility: "full" | "vars-only";
  downloads: number;
  rating: number;
  publishedAt: string;
  variables: EnkiVariable[];
  promptTemplate: string;
  description: string;
  versions: EnkiArtwork[];
}

export interface MarketplacePrompt {
  id?: string;
  _id?: string;
  creator?: string;
  type?: string;
  title?: string;
  description?: string;
  category?: string;
  pricing?: { pricePerGeneration?: number };
  showcaseImages?: Array<{ url?: string; thumbnail?: string }>;
  stats?: {
    totalGenerations?: number;
    likes?: number;
    reviews?: { averageRating?: number };
  };
  createdAt?: string;
  promptData?: {
    promptTemplate?: string;
    variables?: Array<{
      name?: string;
      type?: string;
      defaultValue?: unknown;
      value?: unknown;
    }>;
    aiSettings?: {
      model?: string;
      aspectRatio?: string;
    };
  };
}

const swatches = [
  ["#2a3142", "#4a5468", "#8b8d8e"],
  ["#1f2a1a", "#3d5235", "#7c8c6e"],
  ["#3a1f1f", "#6b3a3a", "#a86b6b"],
  ["#2a1f3a", "#4a3a6b", "#8b7ca8"],
  ["#3a2a1f", "#6b4a3a", "#a8866b"],
  ["#1f3a3a", "#3a6b6b", "#6ba8a8"],
];

export const enkiTags = [
  "portrait",
  "cinematic",
  "infographic",
  "landscape",
  "architecture",
  "editorial",
  "abstract",
  "product",
  "fashion",
  "sci-fi",
];

export function makeFallbackArtwork(seed: number): EnkiArtwork {
  const s = swatches[Math.abs(seed) % swatches.length] ?? swatches[0];
  const ratio = ["3:4", "4:5", "1:1", "2:3", "4:3"][Math.abs(seed) % 5] ?? "3:4";
  const [a, b] = ratio.split(":").map(Number);
  const base = 640;
  const w = a > b ? base : Math.round((base * a) / b);
  const h = a > b ? Math.round((base * b) / a) : base;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${s[0]}"/><stop offset="1" stop-color="${s[1]}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/><ellipse cx="${w * 0.52}" cy="${h * 0.58}" rx="${w * 0.2}" ry="${h * 0.27}" fill="${s[2]}" opacity=".78"/><circle cx="${w * 0.52}" cy="${h * 0.34}" r="${Math.min(w, h) * 0.08}" fill="${s[2]}" opacity=".72"/></svg>`;
  return { url: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`, ratio, w, h };
}

function initials(input?: string) {
  const clean = (input || "Creator").replace(/^0x/i, "").trim();
  if (!clean) return "CR";
  return clean.slice(0, 2).toUpperCase();
}

function relativeDate(value?: string) {
  if (!value) return "recent";
  const then = new Date(value).getTime();
  if (!Number.isFinite(then)) return "recent";
  const days = Math.max(0, Math.round((Date.now() - then) / 86400000));
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

function seedFromId(id: string) {
  return id.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
}

export function adaptMarketplacePrompt(prompt: MarketplacePrompt): EnkiPromptCard {
  const id = prompt.id || prompt._id || "prompt";
  const seed = seedFromId(id);
  const firstImage = prompt.showcaseImages?.[0];
  const imageUrl = firstImage?.url || firstImage?.thumbnail;
  const art = imageUrl ? { url: imageUrl, ratio: "3:4", w: 480, h: 640 } : makeFallbackArtwork(seed);
  const creator = prompt.creator || "creator";
  const vars = prompt.promptData?.variables ?? [];
  const category = prompt.category || "editorial";
  const tags = Array.from(new Set([category, ...(prompt.description || "").toLowerCase().match(/\b(portrait|cinematic|infographic|landscape|architecture|abstract|product|fashion|editorial)\b/g) ?? []])).slice(0, 4);

  return {
    id,
    title: prompt.title || "Untitled Prompt",
    artist: {
      handle: creator.length > 18 ? `${creator.slice(0, 6)}...${creator.slice(-4)}` : creator,
      name: creator.startsWith("0x") ? "Creator" : creator,
      avatar: initials(creator),
      bio: "Prompt creator on Enki Art.",
    },
    isVideo: prompt.type === "video" || category.toLowerCase().includes("video"),
    art,
    tags: tags.length ? tags : ["editorial"],
    model: prompt.promptData?.aiSettings?.model || "Nano Banana Pro",
    price: prompt.pricing?.pricePerGeneration ?? 0,
    visibility: prompt.type === "free" ? "full" : "vars-only",
    downloads: prompt.stats?.totalGenerations ?? 0,
    rating: prompt.stats?.reviews?.averageRating ?? 0,
    publishedAt: relativeDate(prompt.createdAt),
    variables: vars.length
      ? vars.slice(0, 8).map((v) => ({
          name: v.name || "subject",
          label: v.name || "Subject",
          type: v.type === "checkbox" ? "checkbox" : "text",
          value: typeof v.defaultValue === "boolean" ? v.defaultValue : String(v.defaultValue ?? v.value ?? ""),
        }))
      : [
          { name: "subject", label: "Subject", type: "text", value: "a quiet editorial subject" },
          { name: "lighting", label: "Lighting", type: "text", value: "late afternoon window light" },
        ],
    promptTemplate:
      prompt.promptData?.promptTemplate ||
      prompt.description ||
      "A refined image of [subject], lit by [lighting], editorial, restrained, no logos.",
    description: prompt.description || "A marketplace prompt template ready for generation.",
    versions: (prompt.showcaseImages ?? [])
      .slice(1, 5)
      .map((img, index) => ({ url: img.url || img.thumbnail || art.url, ratio: "3:4", w: 480 + index, h: 640 })),
  };
}

const fallbackTitles = [
  "Quiet Window, Late Afternoon",
  "The Editor - Scientific Infographic",
  "Concrete Cathedral",
  "Boy with the Linen Shirt",
  "Slow Tide, Iron Coast",
  "Hands Holding Citrus",
  "Brutalist Lobby, Empty",
  "Annual Report - Financial Spread",
  "Couple, Two Frames",
  "Studio Portrait - Soft Key",
  "Highway at Night, Long Lens",
  "Ceramic Vessel on Marble",
];

const fallbackArtists = [
  ["mira.veil", "Mira Veil", "MV"],
  ["kael.atrium", "Kael Atrium", "KA"],
  ["nori.field", "Nori Field", "NF"],
  ["sasha.ren", "Sasha Ren", "SR"],
];

export function buildFallbackPrompts(count = 12): EnkiPromptCard[] {
  return Array.from({ length: count }, (_, index) => {
    const artist = fallbackArtists[index % fallbackArtists.length] ?? fallbackArtists[0];
    const tags = [
      enkiTags[index % enkiTags.length] ?? "editorial",
      enkiTags[(index + 3) % enkiTags.length] ?? "portrait",
    ];
    return {
      id: `fallback_${index}`,
      title: fallbackTitles[index % fallbackTitles.length] ?? "Untitled Prompt",
      artist: {
        handle: artist[0],
        name: artist[1],
        avatar: artist[2],
        bio: "Editorial prompt creator.",
      },
      isVideo: index % 5 === 3,
      art: makeFallbackArtwork(index),
      tags,
      model: ["Nano Banana Pro", "Flux 1.1 Pro", "Imagen 4"][index % 3] ?? "Nano Banana Pro",
      price: [0.05, 0.1, 0.25, 0.5][index % 4] ?? 0.1,
      visibility: index % 3 === 0 ? "vars-only" : "full",
      downloads: 120 + index * 137,
      rating: 4.2 + (index % 6) / 10,
      publishedAt: `${index + 1} days ago`,
      variables: [
        { name: "subject", label: "Subject", type: "text", value: "a young woman with dark hair" },
        { name: "location", label: "Location", type: "text", value: "a small wooden room" },
        { name: "lighting", label: "Lighting", type: "text", value: "late afternoon window" },
      ],
      promptTemplate: "A photograph of [subject] at [location], contemplative, lit by [lighting]. Editorial. Restrained. No logos.",
      description: "A flexible editorial prompt template for image generation.",
      versions: [1, 2, 3, 4].map((offset) => makeFallbackArtwork(index * 9 + offset)),
    };
  });
}
