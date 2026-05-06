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

import type { Prompt, Artist } from "../shared/schema";

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

const upstreamMocks = [
  { bg: "#2d3a52", circleBg: "#5a6a80", shape: "circle" },
  { bg: "#4a5a2a", circleBg: "#8a9a50", shape: "circle" },
  { bg: "#6a2a35", circleBg: "#a05060", shape: "circle" },
  { bg: "#1a3020", circleBg: "#4a7050", shape: "oval" },
  { bg: "#2a2a2a", circleBg: "#606060", shape: "oval" },
  { bg: "#2a2060", circleBg: "#7070c0", shape: "oval" },
  { bg: "#502030", circleBg: "#905060", shape: "door" },
  { bg: "#602040", circleBg: "#a06070", shape: "door" },
  { bg: "#604020", circleBg: "#a07050", shape: "door" },
  { bg: "#404040", circleBg: "#808080", shape: "door" },
];

export function makeFallbackArtwork(seed: number): EnkiArtwork {
  const m = upstreamMocks[Math.abs(seed) % upstreamMocks.length];
  const w = 480;
  const h = 640;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">
    <rect width="${w}" height="${h}" fill="${m.bg}"/>`;
  
  if (m.shape === "circle") {
    svg += `<circle cx="${w/2}" cy="${h/2 - 40}" r="${w * 0.25}" fill="${m.circleBg}" opacity="0.7"/>`;
    svg += `<circle cx="${w/2}" cy="${h/2 + 100}" r="${w * 0.15}" fill="${m.circleBg}" opacity="0.5"/>`;
  } else if (m.shape === "oval") {
    svg += `<circle cx="${w/2}" cy="${h/2 - 100}" r="${w * 0.1}" fill="${m.circleBg}" opacity="0.6"/>`;
    svg += `<rect x="${w * 0.325}" y="${h/2 - 20}" width="${w * 0.35}" height="${h * 0.4}" rx="${w * 0.175}" fill="${m.circleBg}" opacity="0.6"/>`;
  } else if (m.shape === "door") {
    svg += `<rect x="${w * 0.1}" y="${h * 0.3}" width="${w * 0.38}" height="${h * 0.6}" rx="4" fill="${m.circleBg}" opacity="0.7"/>`;
    svg += `<rect x="${w * 0.38}" y="${h * 0.54}" width="6" height="6" rx="1" fill="${m.bg}" opacity="0.8"/>`;
    svg += `<rect x="${w * 0.52}" y="${h * 0.45}" width="${w * 0.3}" height="${h * 0.45}" rx="4" fill="${m.circleBg}" opacity="0.5"/>`;
  }
  svg += `</svg>`;
  
  return { url: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`, ratio: "3:4", w, h };
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

export function adaptMarketplacePrompt(prompt: Prompt, artist?: Artist): EnkiPromptCard {
  const id = prompt.id || "prompt";
  const seed = seedFromId(id);
  const imageUrl = prompt.previewImageUrl || prompt.uploadedPhotos?.[0];
  const art = imageUrl ? { url: imageUrl, ratio: "3:4", w: 480, h: 640 } : makeFallbackArtwork(seed);
  
  const creatorName = artist?.displayName || prompt.artistId || "Creator";
  const creatorHandle = artist?.username || "creator";
  const category = prompt.category || "editorial";
  
  // Try to parse variables if they were stored as JSON string in publicPromptText or similar, or just provide fallbacks
  let vars: any[] = [];
  try {
    if (prompt.publicPromptText && prompt.publicPromptText.includes('variables":')) {
      const parsed = JSON.parse(prompt.publicPromptText);
      vars = parsed.variables || [];
    }
  } catch(e) {}

  const tags = Array.from(new Set([
    category, 
    ...(prompt.tags || []),
    ...(prompt.publicPromptText || "").toLowerCase().match(/\b(portrait|cinematic|infographic|landscape|architecture|abstract|product|fashion|editorial)\b/g) ?? []
  ])).slice(0, 4);

  return {
    id,
    title: prompt.title || "Untitled Prompt",
    artist: {
      handle: creatorHandle.length > 18 ? `${creatorHandle.slice(0, 6)}...${creatorHandle.slice(-4)}` : creatorHandle,
      name: creatorName.startsWith("0x") ? "Creator" : creatorName,
      avatar: initials(creatorName),
      bio: artist?.bio || "Prompt creator on Enki Art.",
    },
    isVideo: prompt.promptType === "video" || category.toLowerCase().includes("video"),
    art,
    tags: tags.length ? tags : ["editorial"],
    model: prompt.aiModel || "gemini",
    price: prompt.price ?? 0,
    visibility: prompt.isFreeShowcase || prompt.price === 0 ? "full" : "vars-only",
    downloads: prompt.downloads ?? 0,
    rating: prompt.rating ?? 0,
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
      prompt.publicPromptText ||
      "A refined image of [subject], lit by [lighting], editorial, restrained, no logos.",
    description: "A marketplace prompt template ready for generation.",
    versions: (prompt.uploadedPhotos ?? [])
      .slice(1, 5)
      .map((url, index) => ({ url: url || art.url, ratio: "3:4", w: 480 + index, h: 640 })),
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
