import { NextRequest, NextResponse } from "next/server";

type MetadataVariableInput = {
  id?: string;
  name?: string;
  description?: string;
  type?: string;
  defaultValue?: unknown;
  options?: Array<{ visibleName?: string; promptValue?: string }>;
};

type MetadataBody = {
  prompt?: string;
  variables?: MetadataVariableInput[];
};

function extractJsonObject(text: string): Record<string, unknown> | null {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed) as Record<string, unknown>;
  } catch {
    // continue with fenced block fallback
  }
  const fenced =
    trimmed.match(/```json\s*([\s\S]*?)```/i) ??
    trimmed.match(/```([\s\S]*?)```/);
  if (!fenced?.[1]) return null;
  try {
    return JSON.parse(fenced[1].trim()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function cleanLabel(value: string): string {
  return value
    .replace(/[\[\]\{\}\(\)]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 42);
}

function cleanDescription(value: string): string {
  return value
    .replace(/[\[\]\{\}\(\)]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
}

function ensureUnique(base: string, used: Set<string>): string {
  const normalized = cleanLabel(base) || "Field";
  if (!used.has(normalized)) {
    used.add(normalized);
    return normalized;
  }
  let i = 2;
  while (used.has(`${normalized}_${i}`)) i += 1;
  const next = `${normalized}_${i}`;
  used.add(next);
  return next;
}

function heuristicLabelFromDefault(variable: MetadataVariableInput): {
  name: string;
  description: string;
} {
  const fallbackName = cleanLabel(String(variable.name ?? "")) || "Field";
  const existingDescription = cleanDescription(String(variable.description ?? ""));
  const rawDefault =
    typeof variable.defaultValue === "string"
      ? variable.defaultValue
      : Array.isArray(variable.defaultValue)
        ? variable.defaultValue.join(", ")
        : "";
  const tokens = rawDefault
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);
  const titleWords = tokens.slice(0, 3).map((w) => w[0].toUpperCase() + w.slice(1));
  const inferredName = cleanLabel(titleWords.join(" ")) || fallbackName;
  const description =
    existingDescription ||
    (rawDefault.trim()
      ? cleanDescription(rawDefault)
      : `Provide the value for ${inferredName}.`);
  return { name: inferredName, description };
}

async function fetchDeepSeekVariableMetadata(
  prompt: string,
  variables: MetadataVariableInput[]
): Promise<Array<{ id: string; name: string; description: string }>> {
  const key = process.env.DEEPSEEK_API_KEY?.trim();
  if (!key) {
    throw new Error("DEEPSEEK_API_KEY missing");
  }

  const compact = variables.map((v) => ({
    id: String(v.id ?? ""),
    name: String(v.name ?? ""),
    description: String(v.description ?? ""),
    type: String(v.type ?? "text"),
    defaultValue: v.defaultValue ?? "",
    options: Array.isArray(v.options)
      ? v.options.map((o) => ({
          visibleName: String(o?.visibleName ?? ""),
          promptValue: String(o?.promptValue ?? ""),
        }))
      : [],
  }));

  const response = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      temperature: 0,
      stream: false,
      messages: [
        {
          role: "system",
          content:
            "You create concise user-facing variable labels and input descriptions for prompt editors. Return strict JSON only.",
        },
        {
          role: "user",
          content: [
            "Create better variable names and descriptions for these prompt variables.",
            "Use simple labels users understand (2-4 words).",
            "Generate each description from that variable's defaultValue and the prompt context.",
            "Description must tell the user what to type in plain language.",
            "Description length: 6 to 40 characters (hard max 40).",
            "",
            'Return JSON only in this shape: {"variables":[{"id":"Field1","name":"Subject","description":"..."}]}',
            "",
            "Prompt:",
            prompt,
            "",
            "Variables:",
            JSON.stringify(compact),
          ].join("\n"),
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`DeepSeek metadata failed: ${text.slice(0, 500)}`);
  }

  const json = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const content = json?.choices?.[0]?.message?.content ?? "";
  const parsed = extractJsonObject(content);
  if (!parsed) {
    throw new Error("DeepSeek metadata response is not valid JSON.");
  }
  const rows = Array.isArray((parsed as { variables?: unknown[] }).variables)
    ? ((parsed as { variables: unknown[] }).variables as unknown[])
    : [];
  return rows
    .filter((row): row is Record<string, unknown> => typeof row === "object" && row !== null)
    .map((row) => ({
      id: String(row.id ?? ""),
      name: cleanLabel(String(row.name ?? "")),
      description: cleanDescription(String(row.description ?? "")),
    }))
    .filter((row) => row.id.length > 0);
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as MetadataBody;
    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";
    const variables = Array.isArray(body.variables)
      ? body.variables.filter(
          (v): v is MetadataVariableInput =>
            typeof v === "object" &&
            v !== null &&
            typeof v.id === "string" &&
            v.id.trim().length > 0
        )
      : [];

    if (!prompt || variables.length === 0) {
      return NextResponse.json({ variables: [] });
    }

    let suggested: Array<{ id: string; name: string; description: string }> = [];
    try {
      suggested = await fetchDeepSeekVariableMetadata(prompt, variables);
    } catch {
      suggested = [];
    }

    const byId = new Map(suggested.map((v) => [v.id, v] as const));
    const usedNames = new Set<string>();
    const normalized = variables.map((variable) => {
      const fromAi = byId.get(String(variable.id));
      const fallback = heuristicLabelFromDefault(variable);
      const name = ensureUnique(fromAi?.name || fallback.name, usedNames);
      const description =
        cleanDescription(fromAi?.description || "") ||
        cleanDescription(fallback.description) ||
        cleanDescription(`Provide the value for ${name}.`);
      return {
        id: String(variable.id),
        name,
        description,
      };
    });

    return NextResponse.json({ variables: normalized });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
