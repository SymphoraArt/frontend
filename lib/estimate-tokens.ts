/**
 * Fast token estimation for Gemini-style text (no API call).
 * Uses a conservative formula so estimates are not lower than real API usage.
 * Real Gemini tokenizer often yields more tokens per character (~3 chars/token);
 * output (rewritten prompt) is typically longer than the input prompt.
 */

const ENHANCEMENT_PREFIX =
  "Rewrite the following text-to-image prompt to be more vivid and detailed while preserving intent. Return ONLY the rewritten prompt text, no quotes, no markdown.\n\nPROMPT:\n";

/** Conservative: ~3 chars per token so we don't underestimate vs real Gemini tokenizer. */
const CHARS_PER_TOKEN = 3;

/** Minimum output tokens (short prompts still get a full rewritten sentence). */
const MIN_OUTPUT_TOKENS = 50;

/** Rewritten prompt is often 1.5–2x longer than input; use 1.8 for estimate. */
const OUTPUT_EXPANSION = 1.8;

/**
 * Estimate total tokens for one enhancement call: input (prefix + prompt) + output (rewritten prompt).
 * Used for real-time cost display. Kept conservative so displayed cost is not lower than actual charge.
 */
export function estimateEnhancementTokens(prompt: string): number {
  const p = prompt || "";
  const inputText = ENHANCEMENT_PREFIX + p;
  const inputTokens = Math.ceil(inputText.length / CHARS_PER_TOKEN);
  const inputPromptTokens = Math.ceil(p.length / CHARS_PER_TOKEN);
  const outputTokens = Math.min(
    512,
    Math.max(MIN_OUTPUT_TOKENS, Math.ceil(inputPromptTokens * OUTPUT_EXPANSION))
  );
  return inputTokens + outputTokens;
}
