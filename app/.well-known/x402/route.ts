/**
 * x402 discovery manifest — how an agent FINDS the payable resources
 * (the Apify moment: the agent in Kev's reference discovered the paid API
 * on its own; this file is what makes Enki discoverable the same way).
 * Public by design; the proxy allowlists /.well-known/.
 */
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    x402Version: 1,
    name: "Enki Art",
    description:
      "AI image marketplace. Generate images from curated artist prompts or plain text — priced per image, paid in USDC on Solana via x402. Artists earn their share on every prompt-backed generation.",
    network: "solana",
    resources: [
      {
        resource: "/api/x402/generate",
        method: "POST",
        description:
          "Generate one image. Body: { prompt } for plain text, or { promptId, variableValues } to use an artist's prompt (artist share included in the price). Optional: modelFamily (nano-banana-pro | gpt-image-2), resolution (1K|2K|4K), aspectRatio, quality. A request without X-PAYMENT answers 402 with exact requirements.",
        status: "requirements-live; settlement launching",
      },
    ],
  });
}
