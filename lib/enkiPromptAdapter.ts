export type EnkiArtwork = {
  url: string;
  width: number;
  height: number;
  ratio: string;
};

export type EnkiArtist = {
  id?: string;
  name: string;
  handle: string;
  avatar: string;
  bio?: string;
};

export type EnkiPromptVariable = {
  name: string;
  label: string;
  type: "text" | "checkbox";
  value: string | boolean;
};

export type EnkiPrompt = {
  id: string;
  title: string;
  description: string;
  artist: EnkiArtist;
  tags: string[];
  price: number;
  downloads: number;
  rating: number;
  isVideo: boolean;
  visibility: "full" | "vars-only";
  art: EnkiArtwork;
  versions: EnkiArtwork[];
  variables: EnkiPromptVariable[];
  promptTemplate: string;
  model: string;
  publishedAt: string;
};

type UnknownRecord = Record<string, unknown>;

const SWATCHES = [
  ["#2f3f4f", "#8c9c8d"],
  ["#4a2f36", "#d08b6d"],
  ["#1d2430", "#7b8da8"],
  ["#3a3329", "#c4aa80"],
  ["#1f3930", "#76a58d"],
  ["#3a2741", "#b2789c"],
];

const FALLBACK_TITLES = [
  "Quiet Window, Late Afternoon",
  "Editorial Product Table",
  "Archive Room Portrait",
  "Soft Geometry Lobby",
  "Noir Street Still",
  "Museum Audio Guide",
  "Ceramic Object Study",
  "Rain Loop Establishing Shot",
  "Botanical Lab Plate",
  "Cinematic Harbor Walk",
  "Monochrome Fashion Proof",
  "Minimal Interface Poster",
];

const FALLBACK_TAGS = [
  "portrait",
  "cinematic",
  "infographic",
  "architecture",
  "editorial",
  "abstract",
  "product",
  "minimal",
];

export function makeEnkiArtwork(seed: number): EnkiArtwork {
  const swatch = SWATCHES[seed % SWATCHES.length];
  const ratios = ["3:4", "4:5", "1:1", "2:3", "16:9"];
  const ratio = ratios[seed % ratios.length];
  const [rw, rh] = ratio.split(":").map(Number);
  const width = 720;
  const height = Math.round((width * rh) / rw);
  const accentX = 20 + ((seed * 13) % 60);
  const accentY = 18 + ((seed * 17) % 62);
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">`,
    "<defs>",
    `<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${swatch[0]}"/><stop offset="1" stop-color="${swatch[1]}"/></linearGradient>`,
    "</defs>",
    `<rect width="${width}" height="${height}" fill="url(#g)"/>`,
    `<circle cx="${(accentX / 100) * width}" cy="${(accentY / 100) * height}" r="${Math.min(width, height) * 0.18}" fill="rgba(255,255,255,0.22)"/>`,
    `<rect x="${width * 0.52}" y="${height * 0.18}" width="${width * 0.22}" height="${height * 0.52}" rx="18" fill="rgba(0,0,0,0.18)"/>`,
    `<path d="M0 ${height * 0.78} C ${width * 0.3} ${height * 0.66}, ${width * 0.62} ${height * 0.92}, ${width} ${height * 0.75} L ${width} ${height} L 0 ${height} Z" fill="rgba(255,255,255,0.16)"/>`,
    "</svg>",
  ].join("");

  return {
    url: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    width,
    height,
    ratio,
  };
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "EA";
}

function dollars(value: unknown) {
  if (typeof value !== "number" || Number.isNaN(value)) return 0;
  return value > 20 ? value / 100 : value;
}

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" ? value as UnknownRecord : {};
}

function readString(value: unknown) {
  return typeof value === "string" ? value : undefined;
}

function readNumber(value: unknown) {
  return typeof value === "number" && !Number.isNaN(value) ? value : undefined;
}

function readArray(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function firstImageUrl(value: unknown) {
  const first = readArray(value)[0];
  const record = asRecord(first);
  return readString(record.url) || readString(record.thumbnail);
}

function imageFromUnknown(source: unknown, seed: number): EnkiArtwork {
  const record = asRecord(source);
  const image =
    readString(record.previewImageUrl) ||
    readString(record.thumbnail) ||
    readString(record.imageUrl) ||
    firstImageUrl(record.previewImages) ||
    firstImageUrl(record.showcaseImages);

  if (typeof image === "string" && image.trim()) {
    return { url: image, width: 720, height: 960, ratio: "3:4" };
  }

  return makeEnkiArtwork(seed);
}

function variablesFromUnknown(source: unknown): EnkiPromptVariable[] {
  const record = asRecord(source);
  const promptData = asRecord(record.promptData);
  const raw = readArray(promptData.variables).length ? readArray(promptData.variables) : readArray(record.variables);
  if (Array.isArray(raw) && raw.length > 0) {
    return raw.slice(0, 6).map((item, index: number) => {
      const variable = asRecord(item);
      const name = readString(variable.name) || readString(variable.label) || `variable_${index + 1}`;
      const label = readString(variable.label) || readString(variable.name) || `Variable ${index + 1}`;
      const type = variable.type === "checkbox" ? "checkbox" : "text";
      const defaultValue = variable.defaultValue ?? variable.default_value ?? variable.value;
      return {
        name: name.replace(/\s+/g, "_").toLowerCase(),
        label,
        type,
        value: type === "checkbox" ? Boolean(defaultValue) : String(defaultValue ?? ""),
      };
    });
  }

  return [
    { name: "subject", label: "Subject", type: "text", value: "a young woman, dark hair" },
    { name: "mood", label: "Mood", type: "text", value: "contemplative, soft" },
    { name: "lighting", label: "Lighting", type: "text", value: "late afternoon window" },
  ];
}

function promptTemplateFrom(source: unknown, variables: EnkiPromptVariable[]) {
  const record = asRecord(source);
  const explicit =
    readString(record.promptTemplate) ||
    readString(record.publicPromptText) ||
    readString(record.prompt) ||
    readString(record.description);
  if (typeof explicit === "string" && explicit.includes("[")) return explicit;
  if (variables.length) {
    return `A refined editorial image of [${variables[0].name}], [${variables[1]?.name || variables[0].name}], lit by [${variables[2]?.name || variables[0].name}].`;
  }
  return "A refined editorial image with soft natural light, restrained composition, and precise art direction.";
}

export function mapMarketplacePromptToEnkiPrompt(prompt: unknown, index = 0): EnkiPrompt {
  const record = asRecord(prompt);
  const creator = asRecord(record.creator);
  const name = readString(creator.displayName) || readString(creator.username) || readString(record.artist) || "Enki Artist";
  const variables = variablesFromUnknown(prompt);
  const art = imageFromUnknown(prompt, index);
  const pricing = asRecord(record.pricing);
  const price = dollars(readNumber(record.priceUsdCents) ?? readNumber(record.price) ?? readNumber(pricing.pricePerGeneration));
  const id = String(readString(record.id) || readString(record._id) || `fallback_${index}`);
  const stats = asRecord(record.stats);
  const reviews = asRecord(stats.reviews);
  const previewImages = readArray(record.previewImages);
  const showcaseImages = readArray(record.showcaseImages);
  const listedAt = readString(record.listedAt);
  const createdAt = readString(record.createdAt);

  return {
    id,
    title: readString(record.title) || FALLBACK_TITLES[index % FALLBACK_TITLES.length],
    description: readString(record.description) || "A flexible prompt release prepared for repeatable generation.",
    artist: {
      id: readString(creator.id) || readString(record.artistId) || readString(record.userId),
      name,
      handle: String(creator.username || name).replace(/^@/, "").toLowerCase().replace(/\s+/g, "."),
      avatar: initials(name),
    },
    tags: readArray(record.tags).length ? readArray(record.tags).slice(0, 5).map(String) : FALLBACK_TAGS.slice(index % 4, index % 4 + 3),
    price,
    downloads: Number(readNumber(record.totalSales) ?? readNumber(record.downloads) ?? readNumber(stats.totalGenerations) ?? 0),
    rating: Number(readNumber(record.avgRating) ?? readNumber(record.rating) ?? readNumber(reviews.averageRating) ?? 0),
    isVideo: String(readString(record.category) || readString(record.promptType) || "").toLowerCase().includes("video") || Boolean(record.isVideo),
    visibility: record.visibility === "vars-only" || record.type === "premium" ? "vars-only" : "full",
    art,
    versions: [1, 2, 3, 4].map((offset) => imageFromUnknown(previewImages[offset] || showcaseImages[offset], index + offset)),
    variables,
    promptTemplate: promptTemplateFrom(prompt, variables),
    model: readString(record.model) || readString(record.aiModel) || "Nano Banana Pro",
    publishedAt: listedAt || createdAt ? new Date(listedAt || createdAt || "").toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "this week",
  };
}

export function mapLegacyPromptToEnkiPrompt(prompt: unknown, index = 0): EnkiPrompt {
  return mapMarketplacePromptToEnkiPrompt(prompt, index);
}

export function getFallbackEnkiPrompts(count = 18): EnkiPrompt[] {
  return Array.from({ length: count }, (_, index) => {
    const variables = variablesFromUnknown({});
    const title = FALLBACK_TITLES[index % FALLBACK_TITLES.length];
    const isVideo = index % 5 === 3 || index % 7 === 2;
    const art = makeEnkiArtwork(index);
    return {
      id: `fallback_${index}`,
      title,
      description: "Editorial fallback content shown while marketplace data is unavailable.",
      artist: {
        name: ["Mira Veil", "Studio North", "Noah Lumen", "Iris Chen"][index % 4],
        handle: ["mira.veil", "studio.north", "noah.lumen", "iris.chen"][index % 4],
        avatar: ["MV", "SN", "NL", "IC"][index % 4],
      },
      tags: FALLBACK_TAGS.slice(index % 5, index % 5 + 3),
      price: [0.05, 0.1, 0.25, 0.5, 1, 2][index % 6],
      downloads: 120 + index * 137,
      rating: 4 + (index % 10) / 10,
      isVideo,
      visibility: index % 3 === 0 ? "vars-only" : "full",
      art,
      versions: [1, 2, 3, 4].map((offset) => makeEnkiArtwork(index + offset + 20)),
      variables,
      promptTemplate: promptTemplateFrom({}, variables),
      model: ["Nano Banana Pro", "GPT-Image-2", "Midjourney v7", "Runway Gen-4"][index % 4],
      publishedAt: "this week",
    };
  });
}
