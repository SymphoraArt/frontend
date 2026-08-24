/**
 * x402 entrance for AGENTS — image generation as a payable HTTP resource
 * (Kev, 2026-08-23: "wir bauen das alles erst auf solana aus, damit agents
 * auch zugriff auf unsere prompts haben können").
 *
 * The protocol (x402): a request without payment answers HTTP 402 carrying
 * EXACT payment requirements; the agent signs a payment authorization
 * locally (only USDC needed — never SOL, our fee payer carries gas, the
 * same property EIP-3009 gives Base) and resends with the X-PAYMENT header.
 *
 *   GET  /api/x402/generate                    → 402 requirements (probe)
 *   POST /api/x402/generate                    → 402 without X-PAYMENT
 *        { prompt } or { promptId, variableValues? }, plus optional
 *        { modelFamily, resolution, aspectRatio, quality }
 *
 * Prices are THE SAME ladders humans pay — promptId requests go through
 * computeQuote (artist split included: agents buying an artist's prompt pay
 * the artist exactly like a human buyer), plain prompts pay model cost +
 * platform fee via the shared pricing policy. No second price system.
 *
 * ── Staged on purpose ────────────────────────────────────────────────────
 * The requirements side is LIVE. Settlement (verifying the agent's signed
 * authorization and capturing on Solana) is the money path and lands as its
 * own reviewed step: until then a request WITH X-PAYMENT answers 501 BEFORE
 * anything touches the chain — the agent's authorization is never used, no
 * funds can move, and the response says so in plain words. An endpoint that
 * pretended to settle would be worse than one that says "not yet".
 */
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabaseServer";
import { computeQuote } from "@/lib/payments/generation-quote";
import {
  getModelCostMicro, computeGenerationSplit, UnknownModelError,
} from "@/lib/payments/generation-pricing";
import { usdcMint } from "@/lib/payments/solana";

const bodySchema = z.object({
  prompt: z.string().trim().min(1).max(4000).optional(),
  promptId: z.string().uuid().optional(),
  variableValues: z.record(z.string(), z.string().max(2000)).optional(),
  modelFamily: z.string().trim().max(64).default("nano-banana-pro"),
  resolution: z.enum(["1K", "2K", "4K"]).default("2K"),
  aspectRatio: z.string().trim().max(8).default("1:1"),
  quality: z.enum(["low", "medium", "high"]).optional(),
}).refine((v) => v.prompt || v.promptId, { message: "Send prompt or promptId" });

function platformWallet(): string | null {
  return process.env.SOLANA_PLATFORM_WALLET || process.env.NEXT_PUBLIC_SOLANA_PLATFORM_WALLET || null;
}

/** The 402 body, in the x402 ecosystem's shape — Solana-first by decree. */
async function requirementsFor(input: z.infer<typeof bodySchema>) {
  const payTo = platformWallet();
  if (!payTo) return { status: 503 as const, body: { error: "Payments are not configured on this deployment" } };

  let amountMicro: number;
  let description: string;
  if (input.promptId) {
    const supabase = getSupabaseServerClient();
    const quote = await computeQuote(supabase, {
      promptId: input.promptId,
      modelFamily: input.modelFamily,
      resolution: input.resolution,
    });
    if (!quote.ok) return { status: quote.status, body: { error: quote.error } };
    amountMicro = quote.split.totalMicro;
    description = `Generate 1 image from prompt ${input.promptId} (${input.modelFamily}, ${input.resolution}) — artist share included`;
  } else {
    try {
      const modelCostMicro = getModelCostMicro(input.modelFamily, input.resolution);
      amountMicro = computeGenerationSplit(0, modelCostMicro).totalMicro;
      description = `Generate 1 image (${input.modelFamily}, ${input.resolution})`;
    } catch (e) {
      if (e instanceof UnknownModelError) return { status: 422 as const, body: { error: e.message } };
      throw e;
    }
  }

  return {
    status: 402 as const,
    body: {
      x402Version: 1,
      error: "X-PAYMENT header is required",
      accepts: [
        {
          scheme: "exact",
          network: "solana",
          asset: usdcMint().toBase58(),
          payTo,
          maxAmountRequired: String(amountMicro),
          resource: "/api/x402/generate",
          description,
          mimeType: "application/json",
          maxTimeoutSeconds: 120,
          extra: {
            modelFamily: input.modelFamily,
            resolution: input.resolution,
            aspectRatio: input.aspectRatio,
            ...(input.quality ? { quality: input.quality } : {}),
            note: "Only USDC is needed — the platform fee payer carries Solana gas.",
          },
        },
      ],
    },
  };
}

export async function GET(req: NextRequest) {
  const parsed = bodySchema.safeParse({
    prompt: req.nextUrl.searchParams.get("prompt") ?? "probe",
    promptId: req.nextUrl.searchParams.get("promptId") ?? undefined,
    modelFamily: req.nextUrl.searchParams.get("modelFamily") ?? undefined,
    resolution: req.nextUrl.searchParams.get("resolution") ?? undefined,
  });
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  const r = await requirementsFor(parsed.data);
  return NextResponse.json(r.body, { status: r.status });
}

export async function POST(req: NextRequest) {
  const parsed = bodySchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid request" }, { status: 400 });
  }

  if (req.headers.get("X-PAYMENT")) {
    // Settlement is the money path and ships as its own reviewed step. The
    // authorization in the header is NOT read, NOT stored and NOT settled —
    // it expires unused, so no funds can have moved.
    return NextResponse.json(
      {
        error:
          "x402 settlement on this endpoint is not live yet. Your payment authorization was not used and no funds moved. " +
          "The requirements answered by the 402 response are final — retry once settlement is announced in /.well-known/x402.",
      },
      { status: 501 },
    );
  }

  const r = await requirementsFor(parsed.data);
  return NextResponse.json(r.body, { status: r.status });
}
