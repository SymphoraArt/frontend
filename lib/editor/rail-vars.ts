/**
 * Which text variables get a rail card, and in what order.
 *
 * Pulled out of DocView so it can be tested without a DOM. This is the list
 * that EVERYTHING in the rail keys on — cards, their tops, and the connector
 * lines from chip to card — so a mistake here is not one wrong card, it is the
 * duplicate-key error plus phantom cards plus lines that end in empty space
 * (Kev's screenshot, 2026-08-19: five lines for three chips).
 *
 * Rules, in order:
 *   1. one entry per NAME, first node wins — a draft can carry two nodes with
 *      one name from before addText refused duplicates
 *   2. body order: the position of the token's first occurrence in the prompt
 *   3. the user's manual order overrides body order; names it does not know
 *      keep body order at the end
 */
export interface RailVar {
  name: string;
}

/** `[name]` tokens, same shape NodeCreator's TOKEN_RE matches. */
const TOKEN = /\[[^\]\n]+\]/g;

export function railVars<T extends RailVar>(body: string, texts: T[], manualOrder: string[] | null): T[] {
  const order = new Map<string, number>();
  let m: RegExpExecArray | null;
  const re = new RegExp(TOKEN.source, "g");
  while ((m = re.exec(body)) !== null) if (!order.has(m[0])) order.set(m[0], m.index);

  const seen = new Set<string>();
  const unique = texts.filter((t) => (seen.has(t.name) ? false : (seen.add(t.name), true)));

  const byBody = unique
    .slice()
    .sort((a, b) => (order.get("[" + a.name + "]") ?? 1e9) - (order.get("[" + b.name + "]") ?? 1e9));

  if (!manualOrder) return byBody;
  const idx = new Map(manualOrder.map((n, i) => [n, i]));
  return byBody.slice().sort((a, b) => (idx.get(a.name) ?? 1e9) - (idx.get(b.name) ?? 1e9));
}
