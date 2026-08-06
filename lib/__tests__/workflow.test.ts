import { describe, it, expect } from "vitest";
import { stripWorkflowImages, restoreWorkflowImages } from "@/lib/generation/workflow";

/**
 * The editor's buildExportJSON() embeds reference images as base64 data URLs.
 * If any survive into the stored graph, every generation writes megabytes of
 * base64 into Postgres and stores the same image once per generation — so the
 * tests assert that NO image payload is left behind, not merely that something
 * came back.
 */

const bigPng = "data:image/png;base64," + "A".repeat(4000);
const bigJpg = "data:image/jpeg;base64," + "B".repeat(4000);

/** A graph shaped like the real export. */
const graph = () => ({
  format: "enki-prompt-graph",
  version: 1,
  title: "Astrolabe",
  settings: { models: ["nano-banana-pro"], ratio: "16:9", quality: "2K" },
  prompt: "a brass astrolabe",
  nodes: [
    { id: "n1", type: "EnkiPrompt", pos: [0, 0] },
    { id: "n2", type: "EnkiReferenceImage", pos: [10, 20], image: bigPng },
    { id: "n3", type: "EnkiReferenceImage", pos: [10, 60], image: bigJpg },
  ],
  view: { pan: [0, 0], zoom: 1 },
});

describe("stripWorkflowImages", () => {
  it("leaves no image payload anywhere in the stored graph", () => {
    const { workflow, images } = stripWorkflowImages(graph());
    const serialised = JSON.stringify(workflow);

    expect(serialised).not.toContain("data:image");
    expect(serialised).not.toContain("AAAA");
    expect(serialised).not.toContain("BBBB");
    expect(images).toEqual([bigPng, bigJpg]);
    // A few KB of graph instead of the megabytes the editor's own draft save
    // already chokes on.
    expect(serialised.length).toBeLessThan(2000);
  });

  it("replaces each image with a positional marker, preserving order", () => {
    const { workflow } = stripWorkflowImages(graph());
    const nodes = (workflow as { nodes: { image?: unknown }[] }).nodes;
    expect(nodes[1].image).toEqual({ $ref: 0 });
    expect(nodes[2].image).toEqual({ $ref: 1 });
  });

  it("stores a repeated image once and points both uses at it", () => {
    const { workflow, images } = stripWorkflowImages({
      nodes: [{ image: bigPng }, { image: bigPng }, { image: bigJpg }],
    });
    expect(images).toHaveLength(2);
    const nodes = (workflow as { nodes: { image?: unknown }[] }).nodes;
    expect(nodes[0].image).toEqual({ $ref: 0 });
    expect(nodes[1].image).toEqual({ $ref: 0 });
    expect(nodes[2].image).toEqual({ $ref: 1 });
  });

  it("keeps the STRUCTURE intact while the authored text leaves", () => {
    const { workflow, texts } = stripWorkflowImages(graph());
    const w = workflow as Record<string, any>;
    expect(w.format).toBe("enki-prompt-graph");
    expect(w.settings).toEqual({ models: ["nano-banana-pro"], ratio: "16:9", quality: "2K" });
    expect(w.nodes[0]).toEqual({ id: "n1", type: "EnkiPrompt", pos: [0, 0] });
    expect(w.v).toBe(1);
    // The prompt is a marker here and the text lives encrypted elsewhere.
    expect(w.prompt).toEqual({ $text: expect.any(Number) });
    expect(texts).toContain("a brass astrolabe");
  });

  it("does not mistake ordinary text for an image", () => {
    const prose = "a weathered brass astrolabe on linen, ".repeat(20);
    const { images } = stripWorkflowImages({ prompt: prose, title: "short" });
    expect(images).toHaveLength(0);
  });

  it("refuses to walk a graph deep enough to be an attack", () => {
    let deep: Record<string, unknown> = { image: bigPng };
    for (let i = 0; i < 40; i++) deep = { nested: deep };
    // Must return rather than recurse to exhaustion.
    expect(() => stripWorkflowImages(deep)).not.toThrow();
  });

  it("round-trips: restore puts URLs back where the bytes were", () => {
    const { workflow, images } = stripWorkflowImages(graph());
    expect(images).toHaveLength(2);

    const restored = restoreWorkflowImages(workflow, [
      "https://blob/ref0.png",
      "https://blob/ref1.jpg",
    ]) as { nodes: { image?: unknown }[] };

    expect(restored.nodes[1].image).toBe("https://blob/ref0.png");
    expect(restored.nodes[2].image).toBe("https://blob/ref1.jpg");
  });

  it("restores a missing image as null rather than a dangling marker", () => {
    const { workflow } = stripWorkflowImages(graph());
    const restored = restoreWorkflowImages(workflow, ["https://blob/ref0.png"]) as {
      nodes: { image?: unknown }[];
    };
    expect(restored.nodes[2].image).toBeNull();
  });
});

/**
 * The graph must never hand a database dump what final_prompt_ct is encrypted
 * to protect. These check the SERIALISED blob for the actual strings — a
 * shape-only check would pass while the prompt sat in clear.
 */
describe("no authored text survives in the stored graph", () => {
  const SECRET = "a weathered brass astrolabe, cinematic, my secret style recipe";

  it("pulls the prompt out of the graph entirely", () => {
    const { workflow, texts } = stripWorkflowImages({
      format: "enki-prompt-graph",
      title: "My private title",
      prompt: SECRET,
      nodes: [{ id: "n1", type: "EnkiPrompt", userInput: "hidden user text" }],
    });
    const blob = JSON.stringify(workflow);

    expect(blob).not.toContain(SECRET);
    expect(blob).not.toContain("astrolabe");
    expect(blob).not.toContain("My private title");
    expect(blob).not.toContain("hidden user text");

    expect(texts).toContain(SECRET);
    expect(texts).toContain("My private title");
    expect(texts).toContain("hidden user text");
  });

  it("keeps structure readable, so the row stays queryable", () => {
    const { workflow } = stripWorkflowImages({
      format: "enki-prompt-graph",
      prompt: SECRET,
      settings: { ratio: "16:9", quality: "2K", mode: "doc" },
      nodes: [{ id: "n1", type: "EnkiReferenceImage", pos: [10, 20], index: 3 }],
    });
    const w = workflow as Record<string, any>;

    expect(w.format).toBe("enki-prompt-graph");
    expect(w.settings.ratio).toBe("16:9");
    expect(w.settings.quality).toBe("2K");
    expect(w.nodes[0].id).toBe("n1");
    expect(w.nodes[0].type).toBe("EnkiReferenceImage");
    expect(w.nodes[0].pos).toEqual([10, 20]);
    expect(w.nodes[0].index).toBe(3);
  });

  it("fails closed: a field nobody allowlisted is encrypted, not leaked", () => {
    // The day the editor adds a new text field, it must not appear in clear.
    const { workflow, texts } = stripWorkflowImages({
      nodes: [{ id: "n1", type: "X", someNewCaptionField: "leaked?" }],
    });
    expect(JSON.stringify(workflow)).not.toContain("leaked?");
    expect(texts).toContain("leaked?");
  });

  it("round-trips text back into place", () => {
    const { workflow, texts } = stripWorkflowImages({ prompt: SECRET, nodes: [] });
    const restored = restoreWorkflowImages(workflow, [], texts) as { prompt: string };
    expect(restored.prompt).toBe(SECRET);
  });

  it("stores a repeated string once", () => {
    const { texts } = stripWorkflowImages({
      nodes: [{ str: "same" }, { str: "same" }, { str: "other" }],
    });
    expect(texts).toEqual(["same", "other"]);
  });
});
