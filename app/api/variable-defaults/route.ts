import { NextRequest, NextResponse } from "next/server";
import { paymentEngine } from "@/backend/x402-engine";
import type { ChainKey } from "@/shared/payment-config";
import { getBlitzQuota, consumeBlitzFree } from "@/lib/blitz-quota";
import {
  extractDefaultsRecord,
  mapAiDefaultsToVariableNames,
} from "@/lib/ai-defaults-map";

type Option = { visibleName?: string; promptValue?: string };
type VariableInput = {
  name?: string;
  type?: string;
  options?: Option[];
};
type Body = {
  prompt?: string;
  variables?: VariableInput[];
  userId?: string;
};

const BLITZ_PRICE_USD = process.env.BLITZ_VALUES_PRICE_USD?.trim() || "$0.01";

function extractJsonObject(text: string): Record<string, unknown> | null {
  const trimmed = text.trim();
  try {
    const parsed = JSON.parse(trimmed) as Record<string, unknown>;
    return parsed;
  } catch {
    // continue to fenced fallback
  }
  const fenced = trimmed.match(/```json\s*([\s\S]*?)```/i) ?? trimmed.match(/```([\s\S]*?)```/);
  if (!fenced?.[1]) return null;
  try {
    return JSON.parse(fenced[1].trim()) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function isWalletAddress(s: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(s);
}

async function fetchDeepSeekDefaults(
  prompt: string,
  compactVariables: Array<{
    name: string;
    type: string;
    options: Array<{ visibleName: string; promptValue: string }>;
  }>,
  variableNames: string[]
): Promise<Record<string, string>> {
  const key = process.env.DEEPSEEK_API_KEY?.trim();
  if (!key) {
    throw new Error("DEEPSEEK_API_KEY missing");
  }

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
            "You fill variable placeholders in visual prompts. Return strict JSON only.",
        },
        {
          role: "user",
          content: [
            "just fill in the variables of the prompt with values that fit the entire composition of the visual prompt, withoud adding more to the prompt",
            "",
            "Return strict JSON only with this shape:",
            '{ "defaults": { "<variableName>": "<replacement value>" } }',
            "",
            "Prompt:",
            prompt,
            "",
            "Variables:",
            JSON.stringify(compactVariables),
          ].join("\n"),
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`DeepSeek request failed: ${text.slice(0, 600)}`);
  }

  const json = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
    const content = json?.choices?.[0]?.message?.content ?? "";
    const parsed = extractJsonObject(content);
    if (!parsed) {
      throw new Error(
        "AI did not return valid JSON. Try again or shorten the prompt."
      );
    }
    const rawObj = extractDefaultsRecord(parsed);
    const defaults = mapAiDefaultsToVariableNames(rawObj, variableNames);
    if (Object.keys(defaults).length === 0) {
      throw new Error(
        "AI returned no matching defaults. Check that each variable name matches a [placeholder] in the prompt."
      );
    }
    return defaults;
}

export async function POST(req: NextRequest) {
  try {
    const requestUrl = new URL(req.url);
    const chain = (requestUrl.searchParams.get("chain") || "base-sepolia") as ChainKey;
    const paymentHeader = req.headers.get("X-Payment");

    const body = (await req.json()) as Body;
    const userId = typeof body?.userId === "string" ? body.userId.trim() : "";
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";
    const variables = Array.isArray(body?.variables) ? body.variables : [];

    if (!userId || !isWalletAddress(userId)) {
      return NextResponse.json(
        { error: "Connect a wallet (userId) to use BLITZ values and daily quota." },
        { status: 400 }
      );
    }

    if (!prompt || variables.length === 0) {
      return NextResponse.json({
        defaults: {},
        blitzRemaining: getBlitzQuota(userId).remaining,
        blitzPaid: false,
      });
    }

    const variableNames = variables
      .map((v) => (typeof v?.name === "string" ? v.name.trim() : ""))
      .filter(Boolean);
    if (variableNames.length === 0) {
      return NextResponse.json({
        defaults: {},
        blitzRemaining: getBlitzQuota(userId).remaining,
        blitzPaid: false,
      });
    }

    const compactVariables = variables.map((v) => ({
      name: typeof v?.name === "string" ? v.name.trim() : "",
      type: typeof v?.type === "string" ? v.type : "text",
      options: Array.isArray(v?.options)
        ? v.options
            .map((o) => ({
              visibleName: String(o?.visibleName ?? "").trim(),
              promptValue: String(o?.promptValue ?? "").trim(),
            }))
            .filter((o) => o.visibleName || o.promptValue)
        : [],
    }));

    let baseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!baseUrl) {
      const protocol = requestUrl.protocol || "http:";
      const host = requestUrl.host || requestUrl.hostname || "localhost:3000";
      baseUrl = `${protocol}//${host}`;
    }
    baseUrl = baseUrl.replace(/\/$/, "");
    const resourceUrl = `${baseUrl}${requestUrl.pathname}${requestUrl.search}`;

    const quota = getBlitzQuota(userId);
    const useFree = quota.remaining > 0;

    if (useFree) {
      try {
        const defaults = await fetchDeepSeekDefaults(prompt, compactVariables, variableNames);
        consumeBlitzFree(userId);
        const next = getBlitzQuota(userId);
        return NextResponse.json({
          defaults,
          blitzRemaining: next.remaining,
          blitzPaid: false,
        });
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        return NextResponse.json({ error: message }, { status: 502 });
      }
    }

    const serverWalletAddress = process.env.SERVER_WALLET_ADDRESS;
    if (!serverWalletAddress) {
      return NextResponse.json(
        { error: "SERVER_WALLET_ADDRESS is not configured (required for paid Values)" },
        { status: 500 }
      );
    }

    // Paid path (quota exhausted or client sent payment header on first try)
    const paymentResult = await paymentEngine.settle({
      resourceUrl,
      method: "POST",
      paymentHeader: paymentHeader || undefined,
      chainKey: chain,
      price: BLITZ_PRICE_USD,
      description: "BLITZ variable defaults (AI)",
      payToAddress: serverWalletAddress,
      category: "variable-defaults",
    });

    if (!paymentResult.success) {
      return NextResponse.json(
        paymentResult.body || { error: "Payment required" },
        { status: paymentResult.status, headers: paymentResult.headers }
      );
    }

    try {
      const defaults = await fetchDeepSeekDefaults(prompt, compactVariables, variableNames);
      return NextResponse.json({
        defaults,
        blitzRemaining: 0,
        blitzPaid: true,
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      return NextResponse.json({ error: message }, { status: 502 });
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
