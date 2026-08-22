/**
 * Move a [bracketed] token inside prompt text.
 *
 * Extracted from the chip drag in NodeCreator because this is the part that
 * can quietly corrupt a prompt: every offset is an index into a string whose
 * length changes as the token is lifted out, and an off-by-one here cuts a
 * bracket off a NEIGHBOURING token, which then stops parsing and falls apart
 * on screen. Pure, so it can be tested without a layout engine.
 */
export type TokenMove = { body: string; caret: number };

/**
 * @param body   the prompt text
 * @param start  index where the token begins (its "[")
 * @param end    index just past its "]"
 * @param target where to drop it — an offset in the ORIGINAL `body`
 * @returns the new body and where the caret belongs, or null when the move is
 *          a no-op (dropped on itself) or the indices do not describe a token.
 */
export function moveToken(body: string, start: number, end: number, target: number): TokenMove | null {
  /* The only guard the splice needs: whatever [start,end) points at has to
     BE a token. Bad or stale indices slice out something that is not one —
     an empty string, half a token, a whole sentence — and every such case
     lands here. (A separate bounds check was redundant: no out-of-range pair
     survives this one.) */
  const part = body.slice(start, end);
  if (!/^\[[^\]\n]+\]$/.test(part)) return null;
  if (target < 0 || target > body.length) return null;

  /* A drop must never land INSIDE another token — snap to the nearer edge.
     The drag snaps too, because the marker has to promise the position it
     will actually use, but the guard belongs here as well: a splice that
     lands mid-token writes "[va[var_1]r_2]", which the bracket scan then
     reads as ONE token, and two chips are gone. Snapping is idempotent, so
     doing it in both places costs nothing. */
  let t = target;
  const re = /\[[^\]\n]+\]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    const s = m.index, e = s + m[0].length;
    if (t > s && t < e) { t = t - s < e - t ? s : e; break; }
  }
  if (t >= start && t <= end) return null; // dropped onto itself

  // The token is lifted out first, so a target that sat AFTER it shifts left.
  const adjusted = t > end ? t - (end - start) : t;
  const without = body.slice(0, start) + body.slice(end);
  const before = without.slice(0, adjusted);
  const after = without.slice(adjusted);

  /* Keep the token from fusing with its new neighbours: dropped at the very
     end it used to land as "…Image 6][var_1]", one unbroken run of text.
     Spacing is only ADDED — the seam left behind is not touched, because
     collapsing it means recomputing every index that follows it. */
  const lead = before && !/\s$/.test(before) ? " " : "";
  const trail = after && !/^\s/.test(after) ? " " : "";

  return { body: before + lead + part + trail + after, caret: adjusted + lead.length + part.length };
}
