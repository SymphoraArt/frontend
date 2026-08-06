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

  it("keeps the rest of the graph byte-for-byte", () => {
    const { workflow } = stripWorkflowImages(graph());
    const w = workflow as Record<string, any>;
    expect(w.format).toBe("enki-prompt-graph");
    expect(w.settings).toEqual({ models: ["nano-banana-pro"], ratio: "16:9", quality: "2K" });
    expect(w.prompt).toBe("a brass astrolabe");
    expect(w.nodes[0]).toEqual({ id: "n1", type: "EnkiPrompt", pos: [0, 0] });
    expect(w.v).toBe(1);
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
