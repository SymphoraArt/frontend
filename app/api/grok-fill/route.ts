import { NextResponse } from "next/server";

// Creative fallback values used if Grok key is not configured
const FALLBACK_FILLS: Record<string, string[]> = {
  subject: ["a shattered marble statue", "an elderly fisherman at dusk", "a woman reading in fog", "twin brothers in a doorway"],
  mood: ["melancholic and still", "electric, barely contained", "wistful, golden-hour soft", "cold and architectural"],
  lighting: ["overcast diffuse, no shadows", "single candle, warm rim light", "harsh noon sun, sharp angles", "tungsten practical, deep amber"],
  location: ["a derelict greenhouse", "rooftop terrace at midnight", "flooded city street", "empty cathedral nave"],
  style: ["painterly, textured oil", "clinical editorial", "1970s Italian cinema", "high-fashion monochrome"],
};

function getRandomFill(varName: string): string {
  const key = varName.toLowerCase();
  const pool = FALLBACK_FILLS[key] ?? FALLBACK_FILLS.subject;
  return pool[Math.floor(Math.random() * pool.length)];
}

export async function POST(req: Request) {
  try {
    const { prompt, variables } = (await req.json()) as {
      prompt: string;
      variables: string[];
    };

    if (!Array.isArray(variables) || variables.length === 0) {
      return NextResponse.json({});
    }

    const apiKey = process.env.XAI_API_KEY;

    if (apiKey) {
      // ── Live Grok path ──────────────────────────────────────────────
      const systemPrompt = `You are a creative AI assistant helping an artist fill in prompt variables.
Given a prompt template and a list of variable names, return a JSON object where each key is a variable name and the value is a vivid, distinct, artistically interesting fill value.
Be specific, cinematic, and avoid generic descriptions. Keep values under 12 words.
Return ONLY valid JSON with no extra text.`;

      const userMessage = `Prompt: "${prompt}"\nVariables to fill: ${variables.join(", ")}\nReturn JSON:`;

      const res = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-3-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage },
          ],
          temperature: 0.9,
        }),
      });

      if (res.ok) {
        const data = await res.json() as { choices?: { message?: { content?: string } }[] };
        const raw = data?.choices?.[0]?.message?.content ?? "{}";
        try {
          // Strip markdown fences if present
          const cleaned = raw.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
          const filled = JSON.parse(cleaned) as Record<string, string>;
          return NextResponse.json(filled);
        } catch {
          // JSON parse failed — fall through to fallback
        }
      }
    }

    // ── Fallback: creative random fills ────────────────────────────
    const filled: Record<string, string> = {};
    for (const varName of variables) {
      filled[varName] = getRandomFill(varName);
    }
    return NextResponse.json(filled);

  } catch (e) {
    console.error("[/api/grok-fill]", e);
    return NextResponse.json({}, { status: 500 });
  }
}
