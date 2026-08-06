import type { SupabaseClient } from "@supabase/supabase-js";
import { encryptString } from "@/lib/crypto";
import type { ResolvedModel, Route } from "@/lib/generation/models";

/**
 * Write down what produced an image, in enough detail to run it again.
 *
 * Nothing recorded a generation before this. `POST /api/generations` inserted
 * columns that do not exist (final_prompt, status, image_urls, payment_verified)
 * and its six callers wrapped the failure in `catch { /* ignore *\/ }`, so the
 * table stayed empty and every generation vanished the moment the tab closed.
 *
 * ── The two honest limits ───────────────────────────────────────────────
 * A faithful record is not byte-identical replay, and the gap is stated rather
 * than papered over:
 *
 *   1. No provider we use exposes a seed except Pollinations, which generates
 *      one and discards it. `seed` is NULL for Gemini and WaveSpeed, and NULL
 *      here means "not reproducible", not "not recorded".
 *   2. The route rewrites every prompt through gemini-1.5-flash at temperature
 *      0.7. Replaying the user's prompt re-runs that rewrite and produces a
 *      different request each time — which is why effectivePrompt (the text
 *      that actually reached the model) is stored separately and is what a
 *      replay must send.
 *
 * So the button this feeds should say "Re-run", not "Reproduce".
 */

export interface GenerationRecord {
  userId: string;
  /** The marketplace prompt used, or null for a free-form editor generation. */
  promptId: string | null;
  /** After variable substitution, before the rewrite. */
  finalPrompt: string;
  /** What actually reached the image model. */
  effectivePrompt: string;
  variableValues: unknown;
  model: ResolvedModel;
  route: Route;
  boost: boolean;
  aspectRatio: string | null;
  resolution: string | null;
  seed: number | null;
  /** Measured from the returned bytes — never echoed from the request. */
  output: { width: number; height: number; bytes: number; format: string } | null;
  generationMs: number | null;
  /** The editor's node graph, WITHOUT image bytes. */
  workflow: Record<string, unknown> | null;
  /** Blob URLs of the images fed in, in prompt order. */
  referenceImageUrls?: string[];
  transactionHash?: string | null;
  chainKey?: string | null;
  amountPaidCents?: number | null;
}

/** Encrypt into the four columns this schema uses everywhere. */
function envelope(prefix: string, plaintext: string): Record<string, string> {
  const p = encryptString(plaintext);
  return {
    [`${prefix}_ct`]: p.encrypted,
    [`${prefix}_iv`]: p.iv,
    [`${prefix}_tag`]: p.authTag,
    [`${prefix}_kid`]: p.kid ?? "field-v1",
  };
}

/**
 * A free-form generation still needs a prompt row, because generations.prompt_id
 * is NOT NULL — and that constraint is right: it is what keeps every image
 * traceable to an author, which is what artist payouts rest on.
 *
 * The user wrote the prompt, so they get a prompt row of their own, private.
 * Publishing later is then a visibility change on something that already
 * exists, rather than a second code path that has to reconstruct it.
 */
async function ensurePromptRow(
  supabase: SupabaseClient,
  userId: string,
  prompt: string,
  model: ResolvedModel,
): Promise<string | null> {
  const { data, error } = await supabase
    .from("prompts")
    .insert({
      creator_id: userId,
      title: prompt.slice(0, 60).trim() || "Untitled",
      tags: [],
      ...envelope("encrypted_content", prompt),
      ai_model: model.name,
      ai_settings: {},
      // Private until the author releases it. Generating is not publishing.
      is_listed: false,
      listing_status: "draft",
      price_usd_cents: 0,
    })
    .select("id")
    .single();
  if (error) {
    console.warn("[generation] could not create the prompt row:", error.message);
    return null;
  }
  return data?.id ?? null;
}

/**
 * Best-effort by design: losing the record must never lose the user their
 * image. Returns the generation id, or null if nothing could be written.
 */
export async function recordGeneration(
  supabase: SupabaseClient,
  rec: GenerationRecord,
): Promise<string | null> {
  try {
    const promptId =
      rec.promptId ?? (await ensurePromptRow(supabase, rec.userId, rec.finalPrompt, rec.model));
    if (!promptId) return null;

    const { data, error } = await supabase
      .from("generations")
      .insert({
        user_id: rec.userId,
        prompt_id: promptId,
        ...envelope("final_prompt", rec.finalPrompt),
        ...envelope("effective_prompt", rec.effectivePrompt),
        ...envelope("variable_values", JSON.stringify(rec.variableValues ?? {})),
        model_id: rec.model.id,
        provider: rec.route.provider,
        provider_model: rec.route.providerModel,
        boost: rec.boost,
        aspect_ratio: rec.aspectRatio,
        resolution: rec.resolution,
        seed: rec.seed,
        output_width: rec.output?.width ?? null,
        output_height: rec.output?.height ?? null,
        output_bytes: rec.output?.bytes ?? null,
        output_format: rec.output?.format ?? null,
        generation_ms: rec.generationMs,
        workflow: rec.workflow,
        transaction_hash: rec.transactionHash ?? null,
        chain_key: rec.chainKey ?? null,
        amount_paid_cents: rec.amountPaidCents ?? null,
      })
      .select("id")
      .single();

    if (error) {
      console.warn("[generation] could not record:", error.message);
      return null;
    }
    const generationId = data.id as string;

    // The inputs, in prompt order — "@Image 2" refers to sequence_index 1.
    const refs = (rec.referenceImageUrls ?? []).filter(Boolean);
    if (refs.length) {
      const { error: refErr } = await supabase.from("generation_reference_images").insert(
        refs.map((url, i) => ({ generation_id: generationId, sequence_index: i, storage_url: url })),
      );
      if (refErr) console.warn("[generation] could not record references:", refErr.message);
    }

    return generationId;
  } catch (e) {
    console.warn("[generation] record failed:", e instanceof Error ? e.message : e);
    return null;
  }
}

/**
 * Whose generation this is, resolved server-side.
 *
 * From the session token, never from a body field: PR #54 keyed enforcement on
 * a client-supplied wallet, which let anyone write rows under someone else's
 * name. A generation with no session is simply not recorded — an unattributed
 * row would be worse than none, because it cannot be shown back to anyone.
 */
export async function resolveRecordingUserId(
  supabase: SupabaseClient | null,
  request: { headers: { get(name: string): string | null } },
): Promise<string | null> {
  if (!supabase) return null;
  const token = request.headers.get("X-Session-Token");
  if (!token) return null;
  const { resolveSessionUserId } = await import("@/lib/session-user");
  return resolveSessionUserId(supabase, token).catch(() => null);
}
