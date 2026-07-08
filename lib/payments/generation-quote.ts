/**
 * Shared quote computation for generation payments (backlog #2).
 *
 * Loads everything the split needs from the server side ONLY — prompt price
 * and artist wallet from the DB, model cost from server pricing. Used by the
 * intent endpoint; the read-only quote endpoint can adopt it in a follow-up
 * so the two paths can never drift apart.
 *
 * Returns a discriminated result instead of throwing on expected states so
 * routes map each case to the right HTTP status without string matching.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  UnknownModelError,
  computeGenerationSplit,
  getModelCostMicro,
  usdToMicro,
  type GenerationSplit,
} from "@/lib/payments/generation-pricing";

export interface QuoteInput {
  promptId: string;
  modelFamily: string;
  resolution?: "2K" | "4K";
}

export type QuoteResult =
  | {
      ok: true;
      /** null for free prompts — the split then has no artist leg. */
      artistWallet: string | null;
      split: GenerationSplit;
    }
  | { ok: false; status: 400 | 404 | 422 | 500; error: string };

export async function computeQuote(
  supabase: SupabaseClient,
  { promptId, modelFamily, resolution }: QuoteInput,
): Promise<QuoteResult> {
  // 1. Prompt price comes from the DB — never from the client.
  const { data: prompt, error: promptError } = await supabase
    .from("prompts")
    .select("id, price, user_id, prompt_type, is_free_showcase")
    .eq("id", promptId)
    .maybeSingle();
  if (promptError) {
    console.error("[payments/quote] prompt lookup failed:", promptError.message);
    return { ok: false, status: 500, error: "Failed to load prompt" };
  }
  if (!prompt) {
    return { ok: false, status: 404, error: "Prompt not found" };
  }

  const isFree =
    prompt.prompt_type === "showcase" ||
    prompt.prompt_type === "free-prompt" ||
    prompt.is_free_showcase === true;
  const artistPriceMicro = isFree
    ? 0
    : usdToMicro(typeof prompt.price === "number" ? prompt.price : 0);

  // 2. Model cost comes from server-side pricing — never from the client.
  let modelCostMicro: number;
  try {
    modelCostMicro = getModelCostMicro(modelFamily, resolution);
  } catch (error) {
    if (error instanceof UnknownModelError) {
      return { ok: false, status: 400, error: error.message };
    }
    throw error;
  }

  // 3. Artist payout wallet comes from the DB — never from the client.
  //    Paid prompts without a configured artist wallet cannot be quoted:
  //    the split has nowhere to send the artist share.
  let artistWallet: string | null = null;
  if (artistPriceMicro > 0) {
    if (!prompt.user_id) {
      return { ok: false, status: 422, error: "Prompt has no associated creator" };
    }
    const { data: creator, error: creatorError } = await supabase
      .from("users")
      .select("wallet_address")
      .eq("id", prompt.user_id)
      .maybeSingle();
    if (creatorError) {
      console.error("[payments/quote] creator lookup failed:", creatorError.message);
      return { ok: false, status: 500, error: "Failed to load creator" };
    }
    artistWallet = creator?.wallet_address ?? null;
    if (!artistWallet || artistWallet === "legacy-unbound") {
      return {
        ok: false,
        status: 422,
        error: "Artist payout wallet not configured for this prompt",
      };
    }
    // A real base58 Solana pubkey always contains uppercase chars; a non-0x
    // all-lowercase address is a corrupted legacy row (an earlier bug
    // lowercased Solana wallets) that base58-decodes to the WRONG key. Refuse
    // to build a payable intent against it rather than pay a wallet nobody
    // controls. (This guard existed only on the read-only /quote route; the
    // /intent route persists money and reaches computeQuote, so it belongs
    // here.)
    if (!artistWallet.startsWith("0x") && artistWallet === artistWallet.toLowerCase()) {
      return {
        ok: false,
        status: 422,
        error: "Artist payout wallet must be re-linked before this prompt can sell",
      };
    }
  }

  return {
    ok: true,
    artistWallet,
    split: computeGenerationSplit(artistPriceMicro, modelCostMicro),
  };
}
