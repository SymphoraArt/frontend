/**
 * Enhancement uses a single text model: gemini-1.5-flash.
 * Token counts and pricing are defined per this model (Count Tokens API + official pricing).
 */
export const ENHANCEMENT_MODEL = "gemini-1.5-flash";

/**
 * Official Gemini 1.5 Flash pricing (Google AI), per model.
 * Input $0.075/1M, output $0.30/1M tokens.
 */
export const GEMINI_15_FLASH_INPUT_USD_PER_1M = 0.075;
export const GEMINI_15_FLASH_OUTPUT_USD_PER_1M = 0.3;

/** Legacy flat rate when only total tokens are available (e.g. from usageMetadata). */
export const GEMINI_PRICE_PER_TOKEN = 0.00001;

/** Same prompt text as sent to Gemini for enhancement (for countTokens). */
const ENHANCEMENT_MESSAGE =
  "Rewrite the following text-to-image prompt to be more vivid and detailed while preserving intent. Return ONLY the rewritten prompt text, no quotes, no markdown.\n\nPROMPT:\n";

function buildEnhancementContents(prompt: string) {
  return [
    {
      role: "user" as const,
      parts: [{ text: ENHANCEMENT_MESSAGE + prompt }],
    },
  ];
}

/**
 * Google's Count Tokens API: exact input token count for the enhancement request.
 * Uses ENHANCEMENT_MODEL so tokenizer and count are accurate for that model.
 * @see https://ai.google.dev/api/tokens
 */
export async function countEnhancementInputTokens(prompt: string): Promise<number | null> {
  const key = process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!key) return null;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${ENHANCEMENT_MODEL}:countTokens?key=${encodeURIComponent(key)}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: buildEnhancementContents(prompt) }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      totalTokens?: number;
      totalTokenCount?: number;
      total_token_count?: number;
    };
    const count =
      data.totalTokens ??
      data.totalTokenCount ??
      data.total_token_count;
    return typeof count === "number" && count >= 0 ? count : null;
  } catch {
    return null;
  }
}

/**
 * Estimate output tokens for enhancement (no API; output only known after generateContent).
 * Rewritten prompt is typically 1.5–2.5x input prompt length; use 2.0 so estimate aligns with typical actual.
 */
function estimateEnhancementOutputTokens(prompt: string): number {
  const charsPerToken = 3;
  const inputPromptTokens = Math.ceil((prompt || "").length / charsPerToken);
  return Math.min(512, Math.max(50, Math.ceil(inputPromptTokens * 2.0)));
}

/**
 * Precise enhancement cost: exact input tokens via Google countTokens API + estimated output + official pricing.
 */
export async function getPreciseEnhancementEstimate(prompt: string): Promise<{
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  costUsd: number;
  fromCountTokensApi: boolean;
}> {
  const inputTokens = await countEnhancementInputTokens(prompt);
  const outputTokens = estimateEnhancementOutputTokens(prompt);
  if (inputTokens !== null) {
    const costUsd =
      (inputTokens / 1_000_000) * GEMINI_15_FLASH_INPUT_USD_PER_1M +
      (outputTokens / 1_000_000) * GEMINI_15_FLASH_OUTPUT_USD_PER_1M;
    return {
      inputTokens,
      outputTokens,
      totalTokens: inputTokens + outputTokens,
      costUsd: Math.round(costUsd * 1e6) / 1e6,
      fromCountTokensApi: true,
    };
  }
  const estimatedInput = Math.ceil((ENHANCEMENT_MESSAGE.length + (prompt || "").length) / 3);
  const costUsd =
    (estimatedInput / 1_000_000) * GEMINI_15_FLASH_INPUT_USD_PER_1M +
    (outputTokens / 1_000_000) * GEMINI_15_FLASH_OUTPUT_USD_PER_1M;
  return {
    inputTokens: estimatedInput,
    outputTokens,
    totalTokens: estimatedInput + outputTokens,
    costUsd: Math.round(costUsd * 1e6) / 1e6,
    fromCountTokensApi: false,
  };
}

/**
 * Enhancement cost in USD from input + output token counts (official Gemini 1.5 Flash pricing).
 */
export function computeEnhancementCostUsd(inputTokens: number, outputTokens: number): number {
  return (
    (inputTokens / 1_000_000) * GEMINI_15_FLASH_INPUT_USD_PER_1M +
    (outputTokens / 1_000_000) * GEMINI_15_FLASH_OUTPUT_USD_PER_1M
  );
}

/**
 * Enhance prompt via Gemini and return token usage (for cost calculation).
 * This is our own extra step: we call Gemini (text model) with a fixed "Rewrite …" prompt;
 * it is not a Google-built-in feature. The rewritten text is then sent to the image model.
 */
export async function enhancePromptWithGemini(prompt: string): Promise<{
  enhancedPrompt: string;
  tokensUsed: number;
  inputTokens: number;
  outputTokens: number;
}> {
  const key = process.env.GOOGLE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  if (!key) {
    return {
      enhancedPrompt: prompt,
      tokensUsed: 0,
      inputTokens: 0,
      outputTokens: 0,
    };
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${ENHANCEMENT_MODEL}:generateContent?key=${encodeURIComponent(
    key
  )}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: buildEnhancementContents(prompt),
      generationConfig: { temperature: 0.7, maxOutputTokens: 512 },
    }),
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Gemini error: ${res.status} ${t}`);
  }

  type GeminiResponse = {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: unknown }> };
    }>;
    usageMetadata?: {
      promptTokenCount?: number;
      candidatesTokenCount?: number;
      totalTokenCount?: number;
    };
  };

  const data = (await res.json()) as GeminiResponse;
  const text: unknown = data.candidates?.[0]?.content?.parts?.[0]?.text;
  const enhancedPrompt =
    typeof text === "string" && text.trim() ? text.trim() : prompt;

  const usage = data.usageMetadata || {};
  const inputTokens = usage.promptTokenCount || 0;
  const outputTokens = usage.candidatesTokenCount || 0;
  const tokensUsed =
    usage.totalTokenCount || inputTokens + outputTokens;

  return {
    enhancedPrompt,
    tokensUsed,
    inputTokens,
    outputTokens,
  };
}

/**
 * Compute total API cost: image cost (from Gemini image API) + enhancement tokens.
 * No hardcoded base prices; image cost is from usageMetadata or estimateGeminiCost.
 */
export function computeApiPriceUsd(
  imageCostUsd: number,
  enhancementTokens: number
): number {
  const enhancementCost = enhancementTokens * GEMINI_PRICE_PER_TOKEN;
  return imageCostUsd + enhancementCost;
}
