/**
 * Single source of truth for prompt categories.
 * Used in Prompt Editor (PromptSettingsPanel), FilterBar (Marketplace, Showroom), and APIs.
 */
export const PROMPT_CATEGORIES = [
  // Order defines how categories appear in the UI (after "All")
  { value: "avatars", label: "Profile Pictures" },
  { value: "infographics", label: "Infographics" },
  { value: "photography", label: "Photography" },
  { value: "anime", label: "Anime" },
  { value: "optical-illusion", label: "Optical Illusion" },
  { value: "fashion", label: "Fashion" },
  { value: "architecture", label: "Architecture" },
  { value: "design", label: "Design" },
  { value: "illustration", label: "Illustration" },
  { value: "3d", label: "3D" },
  { value: "other", label: "Other" },
] as const;

export type PromptCategoryValue = (typeof PROMPT_CATEGORIES)[number]["value"];
