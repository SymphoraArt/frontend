/**
 * Separate a node graph from everything private inside it — image bytes AND
 * authored text.
 *
 * The editor's buildExportJSON() puts reference images straight into the nodes
 * as base64 data URLs. Its own draft save already breaks on that — "Draft too
 * big to save (images count against a ~5MB cap)" — so storing the graph
 * verbatim would write megabytes of base64 into Postgres on every generation,
 * and store the same image again for every generation that used it.
 *
 * So the bytes come out and a reference goes in:
 *
 *   { "type": "EnkiReferenceImage", "image": "data:image/png;base64,iVBO…" }
 *   → { "type": "EnkiReferenceImage", "image": { "$ref": 0 } }
 *
 * The same happens to text, and that one is a security matter rather than a
 * size one. The export carries the prompt — "prompt: s.body", plus userInput,
 * value and str on the nodes — and generations.workflow is a plain jsonb
 * column. Stored verbatim, the prompt would sit in cleartext two columns from
 * final_prompt_ct, so a database dump would hand over precisely what that
 * encryption exists to prevent and the encryption would be decoration.
 *
 *   { "prompt": "a brass astrolabe, my style recipe" }
 *   → { "prompt": { "$text": 0 } }, with the string encrypted separately
 *
 * Images are uploaded once and recorded in generation_reference_images (the
 * marker index is the sequence_index); text goes into
 * generations.workflow_text_*. The graph keeps its shape either way, so the
 * editor can reload it by putting both back.
 *
 * Nothing here is public by default. What IS public is a separate, deliberate
 * decision: prompts.public_prompt_text.
 */

/** Marker left in the graph where an image used to be. */
export interface ImageRef {
  $ref: number;
}

/** Marker left in the graph where authored text used to be. */
export interface TextRef {
  $text: number;
}

export interface StrippedWorkflow {
  /**
   * Structure only — node ids, types, positions, links, enum-ish settings.
   * Safe to store in a plain jsonb column and to query.
   */
  workflow: Record<string, unknown>;
  /** The extracted payloads, in $ref order. Data URLs or bare base64. */
  images: string[];
  /**
   * Every authored string, in $text order. The CALLER MUST ENCRYPT THIS before
   * it is stored — it holds the prompt.
   */
  texts: string[];
}

/**
 * Keys whose string values describe the machine, not the author: ids, node
 * types, enum settings. Everything else that is a string is treated as
 * authored content and pulled out.
 *
 * An allowlist and not a denylist, deliberately. A denylist fails open — the
 * day the editor adds a `caption` field, a denylist stores it in clear and
 * nobody notices until a dump leaks. This fails closed: a new field is
 * encrypted until someone decides otherwise.
 */
const STRUCTURAL_KEYS = new Set([
  "id", "type", "kind", "format", "status", "sig", "mode",
  "category", "ratio", "quality", "version", "v", "comfy_version",
  // Machine identifiers, already recorded in model_id / provider_model.
  "models", "model",
]);

/** Anything that looks like image bytes rather than a URL we can keep. */
function isInlineImage(value: unknown): value is string {
  if (typeof value !== "string" || value.length < 64) return false;
  if (value.startsWith("data:image/")) return true;
  // A bare base64 payload: long, and made only of base64 characters. The
  // length floor keeps ordinary prompt text out.
  return value.length > 256 && /^[A-Za-z0-9+/=\s]+$/.test(value);
}

/**
 * Depth-limited on purpose: a graph is a few levels deep, and an unbounded
 * walk over client-supplied JSON is a denial-of-service waiting to happen.
 */
const MAX_DEPTH = 8;

export function stripWorkflowImages(input: unknown): StrippedWorkflow {
  const images: string[] = [];
  const texts: string[] = [];
  // The same image used by several nodes is stored once and referenced twice.
  const seenImage = new Map<string, number>();
  const seenText = new Map<string, number>();

  const walk = (node: unknown, depth: number, key: string | null): unknown => {
    if (depth > MAX_DEPTH) return null;

    if (isInlineImage(node)) {
      let index = seenImage.get(node);
      if (index === undefined) {
        index = images.length;
        images.push(node);
        seenImage.set(node, index);
      }
      return { $ref: index } satisfies ImageRef;
    }

    // Authored text — the prompt and everything the user typed. It leaves the
    // graph so the stored blob cannot hand a database dump the very thing
    // final_prompt_ct is encrypted to protect.
    if (typeof node === "string" && node.length > 0 && !(key && STRUCTURAL_KEYS.has(key))) {
      let index = seenText.get(node);
      if (index === undefined) {
        index = texts.length;
        texts.push(node);
        seenText.set(node, index);
      }
      return { $text: index } satisfies TextRef;
    }

    if (Array.isArray(node)) return node.map((v) => walk(v, depth + 1, key));

    if (node && typeof node === "object") {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(node)) out[k] = walk(v, depth + 1, k);
      return out;
    }

    return node;
  };

  const walked = walk(input, 0, null);
  const workflow =
    walked && typeof walked === "object" && !Array.isArray(walked)
      ? (walked as Record<string, unknown>)
      : {};

  // A version key so a reader can tell which shape it is looking at. Written
  // here and never accepted from the client — the editor's own `version` field
  // describes the graph, this one describes the envelope.
  return { workflow: { v: 1, ...workflow }, images, texts };
}

/**
 * Put the URLs back where the bytes were, so the editor can reload a graph.
 * An index with no URL becomes null rather than a dangling marker.
 */
export function restoreWorkflowImages(
  workflow: unknown,
  urls: (string | null)[],
  texts: string[] = [],
): unknown {
  const walk = (node: unknown, depth: number): unknown => {
    if (depth > MAX_DEPTH) return null;
    if (node && typeof node === "object" && !Array.isArray(node)) {
      const ref = (node as ImageRef).$ref;
      if (typeof ref === "number" && Object.keys(node).length === 1) {
        return urls[ref] ?? null;
      }
      const t = (node as TextRef).$text;
      if (typeof t === "number" && Object.keys(node).length === 1) {
        return texts[t] ?? null;
      }
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(node)) out[k] = walk(v, depth + 1);
      return out;
    }
    if (Array.isArray(node)) return node.map((v) => walk(v, depth + 1));
    return node;
  };
  return walk(workflow, 0);
}
