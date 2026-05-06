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
  ["#2a3142", "#4a5468", "#8b8d8e"],
  ["#1f2a1a", "#3d5235", "#7c8c6e"],
  ["#3a1f1f", "#6b3a3a", "#a86b6b"],
  ["#2a1f3a", "#4a3a6b", "#8b7ca8"],
  ["#3a2a1f", "#6b4a3a", "#a8866b"],
  ["#1f3a3a", "#3a6b6b", "#6ba8a8"],
  ["#3a3a1f", "#6b6b3a", "#a8a86b"],
  ["#1f1f1f", "#3a3a3a", "#6b6b6b"],
  ["#3a1f2a", "#6b3a4a", "#a86b80"],
  ["#1f2a3a", "#3a4a6b", "#6b80a8"],
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

const UNSPLASH_IDS = [
  "1507608172909-5c74232bd868", // minimal architecture
  "1494438639946-1ebd1d20bf85", // minimal interior
  "1513694203232-719a280e022f", // minimal room
  "1600585154340-be6161a56a0c", // portrait
  "1534528741775-53994a69daeb", // fashion
  "1485965120184-e220f721d03e", // cinematic
  "1518005020951-eccb494ad742", // abstract
  "1500462918059-b1a0cb512f1d", // abstract colors
  "1618005182384-a83a8bd57fbe", // product
  "1523633589114-88e225471a4f", // editorial
  "1493246507139-91e8fad9978e", // mountain minimal
  "1470252656220-db63b3d11b33", // architectural curve
];

export function makeEnkiArtwork(seed: number): EnkiArtwork {
  const ratios = ["3:4", "4:5", "1:1", "2:3", "4:3", "16:9"];
  const ratio = ratios[seed % ratios.length];
  const [a, b] = ratio.split(":").map(Number);
  const base = 800;
  const [width, height] = a > b ? [base, Math.round((base * b) / a)] : [Math.round((base * a) / b), base];
  
  const imageId = UNSPLASH_IDS[seed % UNSPLASH_IDS.length];
  
  return {
    url: `https://images.unsplash.com/photo-${imageId}?auto=format&fit=crop&q=80&w=${width}&h=${height}`,
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
  if (typeof first === "string" && first.trim()) return first;
  const record = asRecord(first);
  return readString(record.url) || readString(record.thumbnail);
}

function imageFromUnknown(source: unknown, seed: number): EnkiArtwork {
  if (typeof source === "string" && source.trim()) {
    return { url: source, width: 720, height: 960, ratio: "3:4" };
  }

  const record = asRecord(source);
  const image =
    readString(record.previewImageUrl) ||
    readString(record.thumbnail) ||
    readString(record.imageUrl) ||
    readString(record.url) ||
    readString(record.src) ||
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
