/** Map (clientX, clientY) → caret index in a textarea (for hover cursor on tokens). */
export function getTextareaIndexAtPoint(
  textarea: HTMLTextAreaElement,
  clientX: number,
  clientY: number
): number {
  const text = textarea.value;
  if (!text.length) return 0;

  const rect = textarea.getBoundingClientRect();
  const localX = clientX - rect.left;
  const localY = clientY - rect.top + textarea.scrollTop;

  const mirror = document.createElement("div");
  const cs = window.getComputedStyle(textarea);
  mirror.style.position = "absolute";
  mirror.style.visibility = "hidden";
  mirror.style.pointerEvents = "none";
  mirror.style.top = "0";
  mirror.style.left = "-9999px";
  mirror.style.whiteSpace = "pre-wrap";
  mirror.style.wordBreak = "break-word";
  mirror.style.overflowWrap = "break-word";
  mirror.style.width = cs.width;
  mirror.style.font = cs.font;
  mirror.style.fontSize = cs.fontSize;
  mirror.style.fontWeight = cs.fontWeight;
  mirror.style.fontStyle = cs.fontStyle;
  mirror.style.lineHeight = cs.lineHeight;
  mirror.style.letterSpacing = cs.letterSpacing;
  mirror.style.padding = cs.padding;
  mirror.style.border = "0";
  mirror.style.boxSizing = cs.boxSizing;

  document.body.appendChild(mirror);

  const isBefore = (index: number) => {
    mirror.textContent = "";
    mirror.append(document.createTextNode(text.slice(0, index)));
    const marker = document.createElement("span");
    marker.textContent = "\u200b";
    mirror.append(marker);
    const m = marker.getBoundingClientRect();
    const top = m.top - rect.top + textarea.scrollTop;
    const left = m.left - rect.left;
    return top < localY - 1 || (Math.abs(top - localY) <= 2 && left <= localX + 1);
  };

  try {
    let lo = 0;
    let hi = text.length;
    while (lo < hi) {
      const mid = Math.ceil((lo + hi) / 2);
      if (isBefore(mid)) lo = mid;
      else hi = mid - 1;
    }
    return lo;
  } finally {
    mirror.remove();
  }
}

export function isIndexInsideBracketToken(text: string, index: number): boolean {
  if (index < 0 || index > text.length) return false;
  const regex = /\[([^\]]*)\]/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (index >= match.index && index < match.index + match[0].length) return true;
  }
  return false;
}
