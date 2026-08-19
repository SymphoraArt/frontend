import { describe, it, expect } from "vitest";
import { railVars } from "@/lib/editor/rail-vars";

/**
 * The rail keys cards, tops and connector lines by "[name]". Whatever this
 * function returns is exactly how many of each get drawn — so the one thing
 * it must never do is return two entries for one name.
 */
const node = (name: string, id = name) => ({ id, name });

describe("railVars", () => {
  it("Kev's screenshot: five nodes, three names → three cards, three lines", () => {
    // Two duplicates minted before addText refused them. Each duplicate used
    // to become a card with no chip to anchor to, parked at the bottom of the
    // rail, plus a line from the chip down to that empty space.
    const body = "[dddd] [ssss] [ffff]";
    const texts = [node("dddd", "t1"), node("ssss", "t2"), node("ffff", "t3"), node("dddd", "t4"), node("ffff", "t5")];
    const out = railVars(body, texts, null);
    expect(out.map((t) => t.name)).toEqual(["dddd", "ssss", "ffff"]);
    expect(new Set(out.map((t) => t.name)).size).toBe(out.length);
  });

  it("the FIRST node for a name survives, so its id, value and settings are the ones shown", () => {
    const out = railVars("[a]", [node("a", "first"), node("a", "second")], null);
    expect(out).toHaveLength(1);
    expect(out[0].id).toBe("first");
  });

  it("orders by the token's first appearance in the prompt", () => {
    const out = railVars("x [b] y [a] z [c] and [a] again", [node("a"), node("b"), node("c")], null);
    expect(out.map((t) => t.name)).toEqual(["b", "a", "c"]);
  });

  it("nodes with no token in the body go last, in their own order", () => {
    const out = railVars("[b]", [node("orphan1"), node("b"), node("orphan2")], null);
    expect(out.map((t) => t.name)).toEqual(["b", "orphan1", "orphan2"]);
  });

  it("a manual order wins over body order, unknown names trail", () => {
    const out = railVars("[a] [b] [c]", [node("a"), node("b"), node("c"), node("new")], ["c", "a"]);
    expect(out.map((t) => t.name)).toEqual(["c", "a", "b", "new"]);
  });

  it("does not let a manual order resurrect a duplicate", () => {
    // The manual order mentions the name once; two nodes still yield one card.
    const out = railVars("[a]", [node("a", "1"), node("a", "2")], ["a"]);
    expect(out).toHaveLength(1);
  });
});
