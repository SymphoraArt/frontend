/**
 * The key that says WHICH model a payment is for.
 *
 * Its own module, with no directive and no imports, because both sides of the
 * comparison need it and they live on opposite sides of the client boundary:
 * the checkout builds it in the browser when it takes a quote, and
 * app/api/generate-image enforces it on the server before generating.
 *
 * It used to live only in lib/generation-checkout.ts, which begins with
 * "use client" and imports lib/cdp-bridge. Importing it from a route handler
 * therefore pulled a client module into the React Server Components layer,
 * where Next replaces it with a client-reference proxy — so the call would have
 * thrown on every paid generation, AFTER the intent was claimed. A pure string
 * function has no business being behind that boundary.
 */
export function toModelFamily(displayName: string): string {
  return displayName
    .toLowerCase()
    .replace(/\(.*?\)/g, "") // "GPT-Image-2 (coming soon)" → "gpt-image-2"
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
