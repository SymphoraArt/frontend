/**
 * The shape of an aspect ratio, drawn as a tiny outlined rectangle — "9:16"
 * says a number, the rect shows the picture (Kev, 2026-08-22, wants it on
 * every ratio picker). Non-numeric values ("Any", "Auto") draw a dashed
 * square: no fixed shape promised. Strokes in currentColor, so it follows
 * whatever text colour the host control uses.
 */
export default function RatioRect({ ratio, size = 16 }: { ratio: string; size?: number }) {
  const m = /^(\d+):(\d+)$/.exec(ratio.trim());
  const box = size - 4; // breathing room inside the viewBox
  let w = box, h = box, dashed = true;
  if (m) {
    dashed = false;
    const a = Number(m[1]) / Number(m[2]);
    if (a >= 1) { w = box; h = Math.max(4, box / a); }
    else { h = box; w = Math.max(4, box * a); }
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden style={{ flexShrink: 0, display: "block" }}>
      <rect
        x={(size - w) / 2} y={(size - h) / 2} width={w} height={h} rx={1.5}
        fill="none" stroke="currentColor" strokeWidth={1.4}
        strokeDasharray={dashed ? "2.5 2" : undefined}
      />
    </svg>
  );
}
