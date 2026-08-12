/**
 * Which providers can actually carry reference images to the model.
 *
 * ── Why this exists ──────────────────────────────────────────────────────
 * On 2026-08-12 the live routing table sent every Nano Banana Pro and
 * GPT-Image-2 generation to WaveSpeed at priority 10, and neither the
 * WaveSpeed nor the OpenAI adapter read `referenceImages` at all. The route
 * passed them, the adapter ignored them, the provider never saw them. A buyer
 * could attach eighteen images, pay, and receive a picture generated from the
 * prompt text alone — with no error, no warning, and nothing in the record to
 * show it had happened. Only the Gemini path honoured them.
 *
 * That is the worst failure this codebase can produce: the customer is charged
 * for one thing and delivered another, and neither of them can tell. So the
 * capability is declared HERE, once, and three separate layers consult it:
 *
 *   1. routing drops hosts that cannot carry images when images are present,
 *      so a prompt with references goes to a host that can serve it;
 *   2. the route refuses the request outright if no such host exists, before
 *      any money moves;
 *   3. every adapter refuses on its own account if references reach it
 *      anyway.
 *
 * Three layers because one is a guess about the future. Layers 1 and 2 can be
 * bypassed by a new call site that forgets them; layer 3 sits at the point
 * where the money is actually spent and cannot be.
 *
 * ── Adding a provider ────────────────────────────────────────────────────
 * Add its key here ONLY once its adapter demonstrably sends the images and a
 * test covers it. This set is a promise to the buyer, not a wish list. An
 * entry added in advance re-creates exactly the bug it exists to prevent.
 */

/** Provider keys, as stored in providers.key on the live table. */
export const PROVIDERS_WITH_IMAGE_INPUT: ReadonlySet<string> = new Set([
  // Sends each reference as an inlineData part beside the text prompt.
  // Verified in backend/services/gemini-image-generation.ts.
  "gemini",
]);

export function supportsReferenceImages(providerKey: string | null | undefined): boolean {
  return typeof providerKey === "string" && PROVIDERS_WITH_IMAGE_INPUT.has(providerKey.toLowerCase());
}

/**
 * The refusal an adapter returns when reference images reach it and it cannot
 * pass them on.
 *
 * retryable: false on purpose. Retrying changes nothing — the host will ignore
 * them just as thoroughly the second time — and a retryable verdict would feed
 * the circuit breaker a fault the host never committed.
 */
export function referenceImagesUnsupported(providerLabel: string, count: number) {
  return {
    success: false as const,
    error:
      `${count} reference image${count === 1 ? "" : "s"} were attached, but ${providerLabel} ` +
      `cannot use them. Nothing was generated and nothing was charged. ` +
      `Switch to a model that accepts reference images, or remove them.`,
    generationTime: 0,
    retryable: false as const,
  };
}

/** How many reference images a request is actually carrying. */
export function referenceImageCount(refs: readonly unknown[] | null | undefined): number {
  if (!Array.isArray(refs)) return 0;
  return refs.filter((r) => typeof r === "string" && r.trim() !== "").length;
}
