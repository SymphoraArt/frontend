import { NextResponse } from "next/server";

type Body = {
  prompt?: string;
};

async function maybeEnhancePrompt(prompt: string): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return prompt;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(
    key
  )}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Rewrite the following text-to-image prompt to be more vivid and detailed while preserving intent. Return ONLY the rewritten prompt text, no quotes, no markdown.\n\nPROMPT:\n${prompt}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 512,
      },
    }),
  });

  if (!res.ok) {
    const t = await res.text().catch(() => "");
    throw new Error(`Gemini error: ${res.status} ${t}`);
  }

  type GeminiResponse = {
    candidates?: Array<{
      content?: {
        parts?: Array<{
          text?: unknown;
        }>;
      };
    }>;
  };

  const data = (await res.json()) as GeminiResponse;
  const text: unknown = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (typeof text !== "string" || !text.trim()) return prompt;
  return text.trim();
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    let enhancedPrompt = prompt;
    let usedGemini = false;

    try {
      const maybe = await maybeEnhancePrompt(prompt);
      if (maybe && maybe !== prompt) {
        enhancedPrompt = maybe;
        usedGemini = Boolean(process.env.GEMINI_API_KEY);
      }
    } catch {
      enhancedPrompt = prompt;
      usedGemini = false;
    }

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      enhancedPrompt
    )}?width=1024&height=1024&nologo=true`;

    return NextResponse.json({
      imageUrl,
      prompt: enhancedPrompt,
      provider: "pollinations",
      usedGemini,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
