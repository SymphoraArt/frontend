/**
 * On/offramp sessions — Coinbase (primary) + MoonPay (alternative).
 *
 *   GET  → { providers: { coinbase, moonpay } }  which ones are configured
 *   POST { side: "buy"|"sell", address, provider? } → { url }
 *
 * Coinbase: server-minted session token (CDP keys). MoonPay: signed widget
 * URL (HMAC-SHA256 over the query, required when walletAddress is passed) —
 * envs MOONPAY_API_KEY (pk_...) + MOONPAY_SECRET_KEY. Either way KYC is the
 * provider's job and USDC-on-Solana lands in the user's OWN wallet — we
 * never custody funds. The address must belong to the session user.
 */
import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { PublicKey } from "@solana/web3.js";
import { generateJwt } from "@coinbase/cdp-sdk/auth";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

const HOST = "api.developer.coinbase.com";
const PATH = "/onramp/v1/token";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

// Accept both env spellings — MoonPay's dashboard calls the pk_ key
// "publishable key", their widget docs call it "API key".
const moonpayPk = () => process.env.MOONPAY_API_KEY || process.env.MOONPAY_PUBLISHABLE_KEY;
const moonpayConfigured = () => !!(moonpayPk() && process.env.MOONPAY_SECRET_KEY);

/** MoonPay hosted widget URL, signed the way their docs require. */
function moonpayUrl(side: "buy" | "sell", address: string, redirect: string): string {
  const pk = moonpayPk() as string;
  const sk = process.env.MOONPAY_SECRET_KEY as string;
  // Test keys only work against MoonPay's sandbox widget hosts.
  const sandbox = pk.startsWith("pk_test");
  const base =
    side === "buy"
      ? `https://buy${sandbox ? "-sandbox" : ""}.moonpay.com`
      : `https://sell${sandbox ? "-sandbox" : ""}.moonpay.com`;
  const params = new URLSearchParams(
    side === "buy"
      ? { apiKey: pk, currencyCode: "usdc_sol", walletAddress: address, baseCurrencyCode: "eur", redirectURL: redirect }
      : { apiKey: pk, baseCurrencyCode: "usdc_sol", quoteCurrencyCode: "eur", refundWalletAddress: address, redirectURL: redirect },
  );
  const query = "?" + params.toString();
  const signature = createHmac("sha256", sk).update(query).digest("base64");
  return `${base}/${query}&signature=${encodeURIComponent(signature)}`;
}

/** Which ramps the client may offer — drives the provider chooser. */
export async function GET() {
  return NextResponse.json({
    providers: {
      coinbase: !!(process.env.CDP_API_KEY_ID && process.env.CDP_SECRET_KEY),
      moonpay: moonpayConfigured(),
    },
  });
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("X-Session-Token");
  if (!token) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  let side: string, address: string, provider: string;
  try {
    const body = (await req.json()) as { side: string; address: string; provider?: string };
    side = body.side; address = body.address;
    provider = body.provider === "moonpay" ? "moonpay" : "coinbase";
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

  const origin0 = process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://enki.gallery";
  const redirect = `${origin0}/settings?tab=payment`;

  // ── MoonPay: a signed hosted-widget URL, no session mint needed ──
  if (provider === "moonpay") {
    if (!moonpayConfigured()) {
      return NextResponse.json({ error: "MoonPay isn't configured on the server yet" }, { status: 501 });
    }
    return NextResponse.json({ url: moonpayUrl(side as "buy" | "sell", address, redirect) });
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
