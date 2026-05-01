import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt, variables } = await request.json();

    if (!variables || !Array.isArray(variables) || variables.length === 0) {
      return NextResponse.json({ error: "No variables provided" }, { status: 400 });
    }

    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "XAI API key is not configured" }, { status: 500 });
    }

    const systemPrompt = `You are a creative AI prompt engineer. 
The user will provide a base text-to-image prompt and a list of empty variable names (like 'subject', 'lighting', 'mood').
Your job is to generate highly creative, vivid, and distinct values for each of these variables that would result in a stunning image generation.
Return the result strictly as a valid JSON object where keys are the variable names and values are the generated strings.
DO NOT include any other text, markdown formatting, or explanation. Just the JSON object.`;

    const userMessage = `Base Prompt: ${prompt || "None"}
Variables to fill: ${variables.join(", ")}
Generate vivid and creative values for these variables.`;

    const response = await fetch("https://api.x.ai/v1/chat/completions", {
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
        temperature: 0.8,
        response_format: { type: "json_object" }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("xAI error:", errorText);
      return NextResponse.json({ error: "Failed to generate from xAI" }, { status: response.status });
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json({ error: "Empty response from xAI" }, { status: 500 });
    }

    const jsonStr = content.replace(/```json\n?|\n?```/g, "").trim();
    const parsed = JSON.parse(jsonStr);

    return NextResponse.json(parsed);
  } catch (error: any) {
    console.error("Grok Fill Error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
