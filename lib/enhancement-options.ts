/**
 * Enhancement options for image generation.
 * Used in Quick Create, Prompt Editor, Workspace; for Marketplace the value is set by the artist and stored in the prompt (aiSettings.usePromptEnhancement).
 */

export type EnhancementId = "none" | "prompt";

export const ENHANCEMENT_OPTIONS: Array<{
  value: EnhancementId;
  label: string;
  description: string;
  /** Shown in tooltip: what output/effect the user gets. */
  outputDescription: string;
}> = [
  {
    value: "none",
    label: "None",
    description: "Use your prompt as-is. No extra API cost for text rewriting.",
    outputDescription: "Your exact prompt text is sent to the image model. No change to wording.",
  },
  {
    value: "prompt",
    label: "Prompt enhancement",
    description:
      "AI rewrites your prompt to be more vivid and detailed before generating the image. Slight extra cost (Gemini text tokens).",
    outputDescription:
      "Your prompt is first rewritten by AI to be more vivid and detailed (same intent), then that improved text is used for image generation. Estimated cost updates in real time with API rates. To edit the enhancement instruction (the text sent to the AI), see lib/generation-pricing.ts, function enhancePromptWithGemini.",
  },
];

export function useEnhancement(id: EnhancementId): boolean {
  return id === "prompt";
}

export function getDefaultEnhancement(): EnhancementId {
  return "prompt";
}
