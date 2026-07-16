/**
 * GET /api/auth/wallet/jwks → public JWKS for the embedded-wallet vendor's
 * external-JWT auth (Privy).
 *
 * The vendor's servers fetch this to validate the JWTs our login mints, so the
 * route is whitelisted in proxy.ts (no team access code, public by design — it
 * only exposes the PUBLIC key). Privy can alternatively take a pasted static
 * key, which lets localhost dev skip a public URL entirely.
 */
import { NextResponse } from "next/server";
import { publicJwks } from "@/lib/wallet-jwt";

export async function GET() {
  try {
    return NextResponse.json(await publicJwks(), {
      headers: { "cache-control": "public, max-age=3600" },
    });
  } catch {
    return NextResponse.json({ error: "JWKS not configured" }, { status: 503 });
  }
}
