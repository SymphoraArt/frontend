/**
 * POST /api/onramp/session → { url }
 *
 * Mints a Coinbase Onramp/Offramp session token (server-side, CDP API keys)
 * bound to the signed-in user's OWN wallet address, and returns the hosted
 * Coinbase URL to open. KYC is handled entirely by Coinbase; USDC-on-Solana
 * is delivered straight to the user's wallet — we never custody funds.
 *
 * Body: { side: "buy" | "sell", address: string }
 * The address must belong to the session user (no minting for foreign wallets).
 */
import { NextRequest, NextResponse } from "next/server";
import { PublicKey } from "@solana/web3.js";
import { generateJwt } from "@coinbase/cdp-sdk/auth";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const HOST = "api.developer.coinbase.com";
const PATH = "/onramp/v1/token";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: NextRequest) {
  const token = req.headers.get("X-Session-Token");
  if (!token) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  let side: string, address: string;
  try {
    ({ side, address } = (await req.json()) as { side: string; address: string });
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  if (side !== "buy" && side !== "sell") {
    return NextResponse.json({ error: "side must be buy or sell" }, { status: 400 });
  }
  try {
    new PublicKey(address); // Solana-only for now
  } catch {
    return NextResponse.json({ error: "Not a valid Solana address" }, { status: 400 });
  }

  const supabase = getSupabaseServerClient();
  const { data: session } = await supabase
    .from("auth_sessions")
    .select("wallet_address")
    .eq("token", token)
    .gt("expires_at", new Date().toISOString())
    .maybeSingle();
  if (!session) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  // The requested address must be the session wallet or one of the user's
  // wallets. Compare case-insensitively: the DB stores addresses LOWERCASED
  // while the client sends the real base58 casing — a strict compare 403'd
  // every legitimate request. (Coinbase below always gets the client's
  // real-case address; Solana addresses are case-sensitive.)
  if (session.wallet_address !== address.toLowerCase()) {
    let userId: string | null = UUID.test(session.wallet_address) ? session.wallet_address : null;
    if (!userId) {
      const { data: row } = await supabase
        .from("user_wallets")
        .select("user_id")
        .eq("address", session.wallet_address)
        .is("removed_at", null)
        .maybeSingle();
      userId = row?.user_id ?? null;
    }
    const { data: owned } = userId
      ? await supabase
          .from("user_wallets")
          .select("address")
          .eq("user_id", userId)
          .eq("address", address.toLowerCase())
          .is("removed_at", null)
          .maybeSingle()
      : { data: null };
    if (!owned) return NextResponse.json({ error: "That wallet isn't linked to your account" }, { status: 403 });
  }

  const apiKeyId = process.env.CDP_API_KEY_ID;
  const apiKeySecret = process.env.CDP_SECRET_KEY;
  if (!apiKeyId || !apiKeySecret) {
    return NextResponse.json({ error: "Coinbase isn't configured on the server yet" }, { status: 501 });
  }

  try {
    const jwt = await generateJwt({ apiKeyId, apiKeySecret, requestMethod: "POST", requestHost: HOST, requestPath: PATH });
    const res = await fetch(`https://${HOST}${PATH}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${jwt}`, "Content-Type": "application/json" },
      body: JSON.stringify({ addresses: [{ address, blockchains: ["solana"] }], assets: ["USDC"] }),
    });
    const data = (await res.json().catch(() => null)) as { token?: string; message?: string } | null;
    if (!res.ok || !data?.token) {
      console.error("[onramp] token mint failed", res.status, data);
      return NextResponse.json({ error: data?.message || "Coinbase rejected the request" }, { status: 502 });
    }
    // Offramp REQUIRES partnerUserRef + redirectUrl (Coinbase rejects the
    // session without them); we send both on buy too for a clean return trip.
    const origin = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://enki.gallery";
    const common =
      `sessionToken=${encodeURIComponent(data.token)}` +
      `&defaultAsset=USDC&defaultNetwork=solana&fiatCurrency=EUR` +
      `&partnerUserRef=${encodeURIComponent(session.wallet_address)}` +
      `&redirectUrl=${encodeURIComponent(`${origin}/settings?tab=payment`)}`;
    const url =
      side === "buy"
        ? `https://pay.coinbase.com/buy/select-asset?${common}&presetFiatAmount=5`
        : `https://pay.coinbase.com/v3/sell/input?${common}`;
    return NextResponse.json({ url });
  } catch (e) {
    console.error("[onramp] error", e);
    return NextResponse.json({ error: "Could not reach Coinbase" }, { status: 502 });
  }
}
