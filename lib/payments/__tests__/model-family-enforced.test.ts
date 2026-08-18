import { describe, it, expect } from "vitest";
import { readSource } from "@/lib/__tests__/_read-source";
import { join } from "node:path";
import { toModelFamily } from "@/lib/generation-checkout";

/**
 * The buyer must receive the model they paid for.
 *
 * model_family is written onto the intent when the quote is taken, and the
 * price comes from it: nano-banana-pro and gpt-image-2 are $0.134 and $0.167
 * at 2K, $0.24 and $0.25 at 4K. Which model actually RUNS came from
 * body.modelIds — a separate input nothing compared to the intent.
 * "modelFamily" appeared exactly once in the whole route, as a field on a
 * metadata literal, and was never read again.
 */

const ROOT = join(__dirname, "..", "..", "..");
const ROUTE = readSource(join(ROOT, "app", "api", "generate-image", "route.ts"));

describe("the paid model family is enforced before generating", () => {
  it("compares what was paid for against what would run", () => {
    expect(ROUTE).toMatch(/runningFamily !== redemption\.modelFamily/);
  });

  it("derives the running family from the resolved model, not from the request body", () => {
    // body.modelIds is the attacker-controlled half; preflightModel is what
    // resolveModel actually settled on.
    expect(ROUTE).toMatch(/toModelFamily\(preflightModel\.name\)/);
  });

  it("refuses before anything is generated, and undoes the claim", () => {
    const block = ROUTE.slice(ROUTE.indexOf("runningFamily !== redemption.modelFamily"));
    const decision = block.slice(0, block.indexOf("status: 400"));
    // releaseIfConsumed knows an AUTHORIZED intent must be voided rather than
    // released — returning the claim would leave a live signature behind.
    expect(decision).toMatch(/releaseIfConsumed\("rejected"\)/);
    expect(decision).not.toMatch(/releaseGenerationIntent\(/);
  });

  it("says which family was paid for and which would have run", () => {
    expect(ROUTE).toMatch(/This payment is for \$\{redemption\.modelFamily\}/);
  });
});

describe("toModelFamily is a stable key on both sides of the comparison", () => {
  it("normalises the display names the quote and the catalogue use", () => {
    expect(toModelFamily("Nano Banana Pro")).toBe("nano-banana-pro");
    expect(toModelFamily("GPT-Image-2")).toBe("gpt-image-2");
  });

  it("strips the parenthetical the picker adds, so a label change is not a price change", () => {
    expect(toModelFamily("GPT-Image-2 (coming soon)")).toBe(toModelFamily("GPT-Image-2"));
  });

  it("keeps the two paid families distinct — the whole comparison rests on it", () => {
    expect(toModelFamily("Nano Banana Pro")).not.toBe(toModelFamily("GPT-Image-2"));
    // and "Nano Banana" is a THIRD model, priced differently again
    expect(toModelFamily("Nano Banana")).not.toBe(toModelFamily("Nano Banana Pro"));
  });
});
