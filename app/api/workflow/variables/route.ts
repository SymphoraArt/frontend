/**
 * POST /api/workflow/variables — the dice behind the 🎲 button.
 *
 * Takes a prompt's variable declarations, asks xAI for ONE coherent set of
 * values, validates every value against its declaration, and returns only
 * what survived. Kev, 2026-08-07: analyse the workflow, invent random inputs
 * that make sense — together, not independently.
 *
 * Costs Enki a fraction of a cent per roll and sells nothing, so it is the
 * kind of endpoint that gets hammered for fun. Three things keep it cheap:
 * tight rate limits, hard caps on what reaches the model (DICE_LIMITS), and a
 * forced-JSON reply with a small token budget — which together also make it
 * worthless as a free LLM proxy.
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth, checkRateLimit } from "@/lib/auth";
import { checkRequestRateLimit, rateLimitKey, rateLimitResponse } from "@/lib/rate-limit";
import {
  buildDiceMessages,
  diceableVariables,
  validateDiceValues,
  DICE_LIMITS,
  type DiceVariable,
} from "@/lib/generation/variable-dice";

export const runtime = "nodejs";
export const maxDuration = 30;

const variableSchema = z.object({
  id: z.union([z.string(), z.number()]).transform(String),
  name: z.string().min(1),
  label: z.string().optional(),
  description: z.string().optional(),
  type: z.enum(["text", "checkbox", "slider", "single-select", "multi-select", "image"]),
  options: z
    .array(
      z.object({
        promptValue: z.string(),
        label: z.string().optional(),
        visibleName: z.string().optional(),
      }),
    )
    .optional(),
  min: z.number().optional(),
  max: z.number().optional(),
});

const bodySchema = z.object({
  variables: z.array(variableSchema).min(1).max(DICE_LIMITS.maxVariables),
  /**
   * The PUBLIC prompt text or the artist's own draft. The client decides what
   * it may show here — a buyer's client only ever holds the public excerpt,
   * so a decrypted marketplace prompt cannot leak through this field by
   * construction.
   */
  context: z.string().max(DICE_LIMITS.maxContextLen).optional(),
});

export async function POST(req: NextRequest) {
  const ipLimit = checkRequestRateLimit(rateLimitKey(req, "dice:ip"), 30, 60_000);
  if (!ipLimit.allowed) return rateLimitResponse(ipLimit.retryAfterSeconds);

  let authUser;
  try {
    authUser = await requireAuth(req);
  } catch {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }
  // A dice button invites mashing; 10/min is more rolls than anyone reads.
  if (!checkRateLimit(authUser.userId, "dice", 10, 60_000)) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }

  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) {
    // Absent on purpose until Kev provisions it — the button should degrade
    // into "not available", not into a broken-looking error.
    return NextResponse.json({ error: "Dice is not configured" }, { status: 501 });
  }

  const vars = diceableVariables(parsed.data.variables as DiceVariable[]);
  if (vars.length === 0) {
    return NextResponse.json({ values: {} });
  }

  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.XAI_DICE_MODEL || "grok-4-fast",
        messages: buildDiceMessages(vars, parsed.data.context),
        response_format: { type: "json_object" },
        // High on purpose: the dice exists to surprise. Coherence comes from
        // the single call, not from a timid temperature.
        temperature: 1.0,
        max_tokens: DICE_LIMITS.maxTokens,
      }),
      signal: AbortSignal.timeout(25_000),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[dice] xAI refused (${res.status}):`, body.slice(0, 200));
      return NextResponse.json({ error: "Could not roll the dice" }, { status: 502 });
    }

    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    let raw: unknown = null;
    try {
      raw = JSON.parse(json.choices?.[0]?.message?.content ?? "");
    } catch {
      raw = null;
    }

    // Everything the model said passes through the validator; unknown ids,
    // invented options and out-of-range numbers are dropped, never surfaced.
    return NextResponse.json({ values: validateDiceValues(vars, raw) });
  } catch (e) {
    console.error("[dice] failed:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "Could not roll the dice" }, { status: 502 });
  }
}
