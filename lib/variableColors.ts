/** Pastel pairs tuned for readable text on light + dark editor backgrounds */
export const VARIABLE_PASTEL_PALETTE = [
  { bg: "#FDE8E8", text: "#8B2E2E", border: "#E8A0A0" },
  { bg: "#E8F4FD", text: "#1E4A6E", border: "#9CCAE8" },
  { bg: "#E8F8EE", text: "#1F5C38", border: "#9AD4B0" },
  { bg: "#F3E8FD", text: "#4A2E6E", border: "#C4A0E8" },
  { bg: "#FDF6E8", text: "#6E4A1E", border: "#E8C89A" },
  { bg: "#E8F8F8", text: "#1E5C5C", border: "#9AD4D4" },
  { bg: "#FDE8F4", text: "#6E2E5A", border: "#E8A0C8" },
  { bg: "#F0F0E8", text: "#4A4A2E", border: "#C8C8A0" },
  { bg: "#E8EEFD", text: "#2E3A6E", border: "#A0B0E8" },
  { bg: "#F5E8FD", text: "#5A2E6E", border: "#D4A0E8" },
] as const;

export type VariableColorSet = (typeof VARIABLE_PASTEL_PALETTE)[number];

export function pickVariableColorIndex(existing: { colorIndex?: number }[]): number {
  const len = VARIABLE_PASTEL_PALETTE.length;
  const used = new Set(
    existing.map((v) => v.colorIndex).filter((i): i is number => i !== undefined)
  );
  const available: number[] = [];
  for (let i = 0; i < len; i++) {
    if (!used.has(i)) available.push(i);
  }
  if (available.length > 0) {
    return available[Math.floor(Math.random() * available.length)]!;
  }
  return Math.floor(Math.random() * len);
}

export function getVariableColors(colorIndex?: number): VariableColorSet {
  const idx =
    colorIndex !== undefined
      ? ((colorIndex % VARIABLE_PASTEL_PALETTE.length) + VARIABLE_PASTEL_PALETTE.length) %
        VARIABLE_PASTEL_PALETTE.length
      : 0;
  return VARIABLE_PASTEL_PALETTE[idx]!;
}
