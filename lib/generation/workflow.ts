/**
 * Separate a node graph from the image bytes embedded in it.
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
 * The extracted images are uploaded once and recorded in
 * generation_reference_images, where `$ref` is the sequence_index. The graph
 * keeps its shape, so the editor can reload it by putting the URLs back.
 */

/** Marker left in the graph where an image used to be. */
export interface ImageRef {
  $ref: number;
}

export interface StrippedWorkflow {
  /** The graph with image payloads replaced by { $ref } markers. */
  workflow: Record<string, unknown>;
  /** The extracted payloads, in $ref order. Data URLs or bare base64. */
  images: string[];
}

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
  // The same image used by several nodes is stored once and referenced twice.
  const seen = new Map<string, number>();

  const walk = (node: unknown, depth: number): unknown => {
    if (depth > MAX_DEPTH) return null;

    if (isInlineImage(node)) {
      let index = seen.get(node);
      if (index === undefined) {
        index = images.length;
        images.push(node);
        seen.set(node, index);
      }
      return { $ref: index } satisfies ImageRef;
    }

    if (Array.isArray(node)) return node.map((v) => walk(v, depth + 1));

    if (node && typeof node === "object") {
      const out: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(node)) out[k] = walk(v, depth + 1);
      return out;
    }

    return node;
  };

  const walked = walk(input, 0);
  const workflow =
    walked && typeof walked === "object" && !Array.isArray(walked)
      ? (walked as Record<string, unknown>)
      : {};

  // A version key so a reader can tell which shape it is looking at. Written
  // here and never accepted from the client — the editor's own `version` field
  // describes the graph, this one describes the envelope.
  return { workflow: { v: 1, ...workflow }, images };
}

/**
 * Put the URLs back where the bytes were, so the editor can reload a graph.
 * An index with no URL becomes null rather than a dangling marker.
 */
export function restoreWorkflowImages(
  workflow: unknown,
  urls: (string | null)[],
): unknown {
  const walk = (node: unknown, depth: number): unknown => {
    if (depth > MAX_DEPTH) return null;
    if (node && typeof node === "object" && !Array.isArray(node)) {
      const ref = (node as ImageRef).$ref;
      if (typeof ref === "number" && Object.keys(node).length === 1) {
        return urls[ref] ?? null;
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
