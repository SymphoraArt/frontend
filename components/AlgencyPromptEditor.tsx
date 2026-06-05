"use client";

import { Fragment, useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useActiveAccount } from "thirdweb/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { addCreation, getUserKeyFromAccount } from "@/lib/creations";
import { useX402PaymentProduction } from "@/hooks/useX402PaymentProduction";
import { useSolanaX402Payment } from "@/hooks/useSolanaX402Payment";
import { useTurnkeyEmailAuth } from "@/hooks/useTurnkeyAuth";
import { useBestPaymentChain } from "@/hooks/useWalletBalance";
import type { ChainKey } from "@/shared/payment-config";
import AlgencyMobileGenerateModal from "./AlgencyMobileGenerateModal";
import { WalletPickerModal } from "./WalletPickerModal";
import {
  Settings,
  Plus,
  Sparkles,
  AlertTriangle,
  Zap,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Type,
  Tags,
  Cpu,
  Ratio,
  ImageIcon,
  DollarSign,
  Trash2,
  X,
  Lock,
  LockOpen,
  Undo2,
  Redo2,
  Check,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ENKI_CATEGORIES } from "@/components/enki/EnkiFilters";
import nlp from "compromise";
import { getVariableColors, pickVariableColorIndex } from "@/lib/variableColors";


const EDITOR_DRAFT_KEY = "symphora-editor-draft-v1";
const OWNERSHIP_NOTICE_DISMISS_KEY = "symphora-ownership-notice-dismissed-v1";

// Horizontal padding (px) inside the prompt textarea / overlay box.
// MUST equal `--alg-prompt-pad-x` in `app/editor/algency-editor.css`.
// Used by `syncPromptOverlayMetrics` to compute the overlay's right
// padding so its text wraps at the same column as the textarea.
const PROMPT_PAD_X = 18;

/**
 * True iff the prompt textarea contains real, user-typed content.
 * Empty string, pure whitespace, and `[brackets]`-only bodies all return
 * false so the "Push prompt to Verify" arrow can be greyed out and
 * blocked correctly.
 */
function hasSubstantivePromptBody(body: string): boolean {
  return body.replace(/\[[^\]]*\]/g, "").trim().length > 0;
}

/**
 * Inline-tag pattern recognised inside the prompt body. Two forms
 * are supported:
 *   - `[varName]`         → user-defined variables (variable column)
 *   - `@Image{N}`         → reference-image mentions (Settings list)
 *
 * Both are split out by the overlay renderer so they can be styled
 * as colored / grey chips while remaining character-aligned with
 * the underlying textarea text. The capturing group keeps the
 * delimiters in the result so we can re-classify each part.
 */
const PROMPT_INLINE_TOKEN_RE = /(\[[^\]]*\]|@Image\d+)/g;
const REF_IMAGE_MENTION_RE = /^@Image(\d+)$/;
const REF_IMAGE_MENTION_GLOBAL_RE = /@Image(\d+)/g;

/**
 * Replaces every `@ImageN` inline token in the prompt body with the
 * canonical "Reference image N" wording before the body crosses any
 * boundary the user can't undo from (DB save, generate request).
 *
 * The `@ImageN` form is purely an in-editor convenience — it lets
 * the prompt author point at one of the stored reference images
 * without polluting the variables column. By the time the body is
 * persisted or sent to an AI provider it must read like normal
 * prose, so we expand it server-bound.
 */
function expandReferenceImageMentions(body: string): string {
  return body.replace(REF_IMAGE_MENTION_GLOBAL_RE, "Reference image $1");
}

/**
 * Walks backwards from `caret` looking for an active `@`-mention
 * being typed. Returns null unless the caret is sitting inside a
 * fresh `@…` token (no whitespace, no `[`/`]`, no second `@`)
 * whose `@` is at the start of the body or directly after
 * whitespace. Used to drive the reference-image dropdown.
 */
function detectMentionAtCaret(
  body: string,
  caret: number
): { startPos: number; query: string } | null {
  let i = caret - 1;
  while (i >= 0) {
    const ch = body[i];
    if (ch === "@") {
      const prev = i === 0 ? null : body[i - 1];
      if (prev === null || /\s/.test(prev)) {
        const query = body.substring(i + 1, caret);
        if (!/[\s@\[\]]/.test(query)) {
          return { startPos: i, query };
        }
      }
      return null;
    }
    if (/[\s\[\]]/.test(ch)) return null;
    i--;
  }
  return null;
}

/**
 * Returns the viewport-relative pixel coordinates of the character
 * at `position` inside `textarea`. Uses the well-known "mirror div"
 * technique: render an off-screen `<div>` that copies every text-
 * affecting computed style of the textarea, drop the substring
 * up to `position` into it, mark `position` with a 1-char `<span>`,
 * and read back the span's offset.
 *
 * The mirror only needs to be on-screen for one synchronous read,
 * so we append/remove it inside the same call. textarea.scrollTop /
 * scrollLeft are subtracted so the result tracks the visible caret
 * even when the textarea has been scrolled internally.
 *
 * Used by the @-mention dropdown to anchor itself directly under
 * the `@` glyph instead of the textarea's bottom edge.
 */
function getCaretCoordinates(
  textarea: HTMLTextAreaElement,
  position: number
): { top: number; left: number; height: number } {
  const computed = window.getComputedStyle(textarea);
  const div = document.createElement("div");
  const style = div.style;

  /* Properties that influence text wrapping/measurement and must
     match the source textarea exactly for the mirror to render
     identical line breaks. Any deviation (e.g. font-size, padding,
     letter-spacing) puts the caret in the wrong place. */
  const propsToCopy: ReadonlyArray<string> = [
    "direction", "boxSizing", "width", "height",
    "overflowX", "overflowY",
    "borderTopWidth", "borderRightWidth",
    "borderBottomWidth", "borderLeftWidth",
    "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
    "fontStyle", "fontVariant", "fontWeight", "fontStretch",
    "fontSize", "fontSizeAdjust", "lineHeight", "fontFamily",
    "textAlign", "textTransform", "textIndent",
    "letterSpacing", "wordSpacing", "tabSize",
    "whiteSpace", "wordBreak", "wordWrap",
  ];

  style.position = "absolute";
  style.visibility = "hidden";
  style.top = "0";
  style.left = "0";
  style.whiteSpace = "pre-wrap";
  style.wordWrap = "break-word";
  style.overflow = "hidden";

  const styleRec = style as unknown as Record<string, string>;
  const computedRec = computed as unknown as Record<string, string>;
  for (const prop of propsToCopy) {
    const v = computedRec[prop];
    if (typeof v === "string") styleRec[prop] = v;
  }

  div.textContent = textarea.value.substring(0, position);

  /* Single-char span at the position. We use a non-empty marker
     (".") if `position` sits at end-of-input; otherwise the span
     would have zero height and offsetTop would lie. */
  const span = document.createElement("span");
  span.textContent = textarea.value.substring(position) || ".";
  div.appendChild(span);

  document.body.appendChild(div);
  const spanTop = span.offsetTop;
  const spanLeft = span.offsetLeft;
  const lineHeight =
    parseFloat(computed.lineHeight) ||
    parseFloat(computed.fontSize) * 1.2 ||
    20;
  document.body.removeChild(div);

  const taRect = textarea.getBoundingClientRect();
  return {
    top: taRect.top + spanTop - textarea.scrollTop,
    left: taRect.left + spanLeft - textarea.scrollLeft,
    height: lineHeight,
  };
}

/* ─── Types ─── */
type VariableType = "text" | "checkbox" | "image";
type PromptType = "free-prompt" | "premium-prompt";
type SettingsSectionId = "title" | "category" | "models" | "ratio" | "references" | "price";

interface EditorDraft {
  promptData: { title: string; body: string; type: PromptType; tags: string[] };
  variables: PromptVariable[];
  modelsSelected: string[];
  ratioSelected: string;
  maxImages: number;
  referenceImages: string[];
  promptPrice: number;
  settingsCollapsed: boolean;
  savedAt: number;
}

function buildFullToken(inner: string): string {
  return `[${inner}]`;
}

function collectVariableLabels(
  variables: PromptVariable[],
  excludeVarId?: string
): Set<string> {
  const labels = new Set<string>();
  for (const v of variables) {
    if (excludeVarId && v.id === excludeVarId) continue;
    const name = v.name?.trim();
    if (name) labels.add(name.toLowerCase());
    const inner = v.fullToken.match(/^\[([^\]]*)\]$/)?.[1]?.trim();
    if (inner) labels.add(inner.toLowerCase());
  }
  return labels;
}

function buildLabelRegistry(
  variables: PromptVariable[],
  body: string,
  excludeVarId?: string
): Set<string> {
  const labels = collectVariableLabels(variables, excludeVarId);
  const regex = /\[([^\]]*)\]/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(body)) !== null) {
    const inner = match[1].trim();
    if (inner) labels.add(inner.toLowerCase());
  }
  return labels;
}

/** Mutates `labels` and reserves the chosen label (safe for rapid successive calls). */
function allocateUniqueVariableLabel(labels: Set<string>, base: string): string {
  const seed = base.trim() || "Variable";
  const seedKey = seed.toLowerCase();
  if (!labels.has(seedKey)) {
    labels.add(seedKey);
    return seed;
  }
  let n = 2;
  let candidate = `${seed}${n}`;
  while (labels.has(candidate.toLowerCase())) {
    n += 1;
    candidate = `${seed}${n}`;
  }
  labels.add(candidate.toLowerCase());
  return candidate;
}

function takeUniqueVariableLabel(
  registryRef: { current: Set<string> },
  base: string,
  variables: PromptVariable[],
  body: string,
  excludeVarId?: string
): string {
  const labels = buildLabelRegistry(variables, body, excludeVarId);
  registryRef.current.forEach((label) => labels.add(label));
  const result = allocateUniqueVariableLabel(labels, base);
  registryRef.current = labels;
  return result;
}

function findVariableByName(
  name: string,
  variables: PromptVariable[],
  excludeVarId: string
): PromptVariable | undefined {
  const lower = name.trim().toLowerCase();
  if (!lower) return undefined;
  return variables.find(
    (v) =>
      v.id !== excludeVarId &&
      Boolean(v.name?.trim()) &&
      v.name.trim().toLowerCase() === lower
  );
}

/** Resolved inner text for [brackets] when not editing (never empty if default exists) */
function getTokenInner(
  variable: PromptVariable,
  editingNameVarId: string | null
): string {
  if (editingNameVarId === variable.id) {
    return variable.name ?? "";
  }
  const named = variable.name?.trim();
  if (named) return named;
  if (variable.type === "checkbox") {
    return variable.defaultValue
      ? String(variable.description || variable.label || "")
      : "";
  }
  return String(variable.defaultValue ?? variable.label ?? "");
}

/** Prompt body token — empty name never becomes []; keeps default in editor */
function getPromptTokenInner(
  variable: PromptVariable,
  editingNameVarId: string | null
): string {
  if (editingNameVarId === variable.id) {
    const named = variable.name?.trim();
    if (named) return named;
  }
  return getTokenInner(variable, null);
}

function replaceTokenInBody(body: string, oldToken: string, newToken: string): string {
  if (!oldToken || oldToken === newToken) return body;
  return body.split(oldToken).join(newToken);
}

/* Position-aware variant of `replaceTokenInBody`. Replaces ONLY the
   `n`-th (0-indexed) occurrence of `oldToken` in `body` with
   `newToken`. Returns `body` unchanged if there are fewer than n+1
   occurrences. This is the safe replacement to use whenever a
   variable's body token might collide textually with another
   variable's token (e.g. mid-edit when the user has just typed a
   duplicate name) — the global `split/join` form would rewrite
   every occurrence and silently merge the variables. */
function replaceNthTokenInBody(
  body: string,
  oldToken: string,
  newToken: string,
  n: number
): string {
  if (!oldToken) return body;
  let cursor = 0;
  for (let i = 0; i < n; i++) {
    const idx = body.indexOf(oldToken, cursor);
    if (idx < 0) return body;
    cursor = idx + oldToken.length;
  }
  const idx = body.indexOf(oldToken, cursor);
  if (idx < 0) return body;
  return body.slice(0, idx) + newToken + body.slice(idx + oldToken.length);
}

/* Returns the 0-indexed position of `varId` among variables that
   share its `fullToken`, walking the array in declared order. Used
   together with `replaceNthTokenInBody` to pick the correct body
   occurrence to rewrite when multiple variables (transiently) share
   a token. Returns 0 for unique tokens; returns -1 if `varId` isn't
   in the array. */
function getVariableOccurrenceIndex(
  variables: PromptVariable[],
  varId: string,
  fullToken: string
): number {
  let k = 0;
  for (const v of variables) {
    if (v.id === varId) return k;
    if (v.fullToken === fullToken) k += 1;
  }
  return -1;
}

function getVariableReplacementText(variable: PromptVariable): string {
  if (variable.type === "checkbox") {
    return String(variable.defaultValue ? variable.description : "");
  }
  return String(variable.defaultValue ?? variable.label ?? "");
}

function getVariableDeleteLabel(variable: PromptVariable): string {
  /* Returns the user-facing label for a variable in destructive
     prompts ("Are you sure you want to delete the variable
     'X'?"). For named variables we render the bare name without
     surrounding brackets — `'colorScheme'` is friendlier than
     `'[colorScheme]'` in a confirmation dialog where the quotes
     already delimit the token. We fall back to the full token
     (e.g. `[var:9af2]`) for unnamed variables, since they have
     no human-readable identifier to show on its own. */
  const named = variable.name?.trim();
  if (named) return named;
  return variable.fullToken;
}

function formatVerifySnapshotValue(
  val: string,
  variable?: PromptVariable
): string {
  if (!variable) return val?.trim() || "—";
  if (variable.type === "checkbox") {
    const on = val === "on" || val === "true";
    return on ? variable.description || "Yes" : "Off";
  }
  return val?.trim() || "—";
}

function normalizeVariable(v: PromptVariable, colorContext: PromptVariable[] = []): PromptVariable {
  let next: PromptVariable =
    v.type !== "image"
      ? v
      : {
          ...v,
          type: "text",
          defaultValue:
            v.description ||
            (typeof v.defaultValue === "string" && !v.defaultValue.startsWith("data:")
              ? v.defaultValue
              : v.label),
        };
  if (next.colorIndex === undefined) {
    next = { ...next, colorIndex: pickVariableColorIndex(colorContext) };
  }
  return next;
}

interface PromptVariable {
  id: string;
  name: string;
  label: string;
  description: string;
  type: VariableType;
  defaultValue: string | boolean;
  values: string[]; // stack of multiple values for batch generation
  required: boolean;
  position: number;
  fullToken: string; // The literal string in the prompt (e.g. "[red car]")
  colorIndex?: number;
  nameBlurEmpty?: boolean;
  /* True iff the user tried to "Push to Verify" while this variable
     had an empty/whitespace name AND then dismissed the alert. The
     flag draws a red border around the variable card and its
     in-prompt tag until the user actually types a name. Cleared
     automatically the moment `name.trim()` becomes non-empty. */
  nameMissingHighlighted?: boolean;
  /* True iff the user has typed a name that already belongs to
     ANOTHER variable in the same prompt. Set live by the variable-
     name input's onChange handler — the moment the typed string
     matches another variable's name (case-insensitive), this flag
     flips on and the card / input get the same red border
     treatment as the empty-name state. Cleared automatically when
     the user changes the name to something unique OR when the
     duplicate-name dialog resolves the conflict (apply existing
     OR auto-rename). Combined with the modal conflict dialog,
     this makes the duplicate state impossible to ignore. */
  nameDuplicateHighlighted?: boolean;
}

interface VersionCard {
  id: number;
  variableSnapshot: Record<string, string>;
  imageUrl: string | null;
  status: "idle" | "queued" | "generating" | "complete" | "failed";
  queuePosition?: number; // assigned when batch-queued
  /** Per-card reference images (data URLs) fed to this card's render. */
  referenceImages?: string[];
}

/* ─── Color map for known variables ─── */
function EmptyVarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <line x1="4" y1="6" x2="16" y2="6" stroke="#C4BDB5" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="10" x2="13" y2="10" stroke="#C4BDB5" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="14" x2="10" y2="14" stroke="#C4BDB5" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ─── Component ─── */
export default function AlgencyPromptEditor() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const account = useActiveAccount();
  const { connected: solanaAdapterConnected } = useWallet();
  const { address: turnkeyAddress } = useTurnkeyEmailAuth();
  // Treat Turnkey email users as Solana-paying users — useSolanaX402Payment routes their
  // signing through `/api/turnkey/sign-transaction` instead of the wallet adapter.
  const solanaConnected = solanaAdapterConnected || !!turnkeyAddress;
  const { generateImage: generateImageWithPayment, isPending: isPaymentPending } = useX402PaymentProduction();
  const { generateImage: generateImageWithSolana, isPending: isSolanaPaymentPending } = useSolanaX402Payment();
  const { chainKey: bestChain } = useBestPaymentChain();
  const [selectedChain] = useState<ChainKey>(bestChain || "base-sepolia");
  const { toast } = useToast();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hitOverlayRef = useRef<HTMLDivElement>(null);
  /* Wrapping box around the textarea — used as the positioning
     anchor for the @-mention dropdown. We compute the dropdown's
     fixed-position coordinates off this ref so the popup can float
     above panels with `overflow: hidden` (which would otherwise
     clip an absolutely positioned child). */
  const textareaBoxRef = useRef<HTMLDivElement>(null);
  const [mentionAnchor, setMentionAnchor] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const settingsBodyRef = useRef<HTMLDivElement>(null);
  const settingsSectionRefs = useRef<Partial<Record<SettingsSectionId, HTMLDivElement>>>({});
  const settingsHighlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settingsExpandDelayRef = useRef(0);
  const variablesScrollRef = useRef<HTMLDivElement>(null);
  const variableCardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const variablePulseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingVarScrollRef = useRef<string | null>(null);
  const variableLabelRegistryRef = useRef<Set<string>>(new Set());
  const [promptPrice, setPromptPrice] = useState(0);
  /* Raw text backing the price <input>. A number-only state can't hold
     intermediate states like "0" or "0." (both coerce to 0, which the
     controlled value renders as ""), so the user could never type a
     decimal that starts with zero. We keep the raw string here and
     derive `promptPrice` from it. */
  const [priceText, setPriceText] = useState("");
  /* Controls the single-select Category dropdown so it closes on pick. */
  const [catOpen, setCatOpen] = useState(false);
  useEffect(() => {
    // Keep the text field in sync when the price changes from OUTSIDE the
    // input (stepper buttons, draft restore, model min-price). We avoid
    // clobbering while the user is mid-typing an equivalent value — e.g.
    // "0." parses to 0, which already equals the stored price.
    const typed = parseFloat(priceText);
    if (!Number.isFinite(typed) || typed !== promptPrice) {
      setPriceText(promptPrice ? String(promptPrice) : "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [promptPrice]);
  /* Direction of the most recent stepper-button press on the price
     input. Drives a brief slide-in animation on the number text so
     a tap on ▲/▼ is reflected visually (a "roll" up or down) even
     though the value change is tiny. Null when idle. */
  const [priceRollDir, setPriceRollDir] = useState<"up" | "down" | null>(null);
  const priceRollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /* Snapshot of the price value AT THE START of the last roll.
     Used by the visual-layer renderer to diff prev vs current and
     animate ONLY the digits that actually changed (slot-machine
     style — the user explicitly does not want the whole number to
     move). Updated synchronously inside handlePriceStep and reset
     by the timeout that ends the animation. */
  const prevPriceRollSnapshotRef = useRef<number>(0);
  const priceRollKeyRef = useRef(0);

  /* Same pair of refs for the integer Max-User-Images stepper so it
     gets identical "only the changing digit moves" behaviour. */
  const [maxImagesRollDir, setMaxImagesRollDir] = useState<"up" | "down" | null>(null);
  const maxImagesRollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevMaxImagesRollSnapshotRef = useRef<number>(10);
  const maxImagesRollKeyRef = useRef(0);

  /* ─── State: DB Models ─── */
  const { data: fetchedModels = [] } = useQuery({
    queryKey: ["/api/models"],
    queryFn: async () => {
      const res = await fetch("/api/models");
      if (!res.ok) throw new Error("Failed to fetch models");
      return res.json();
    }
  });

  /* ─── Structured State ─── */
  const [promptData, setPromptData] = useState({
    title: "",
    body: "",
    type: "free-prompt" as PromptType,
    tags: [] as string[],
  });

  const [models, setModels] = useState<{ available: any[], selected: string[] }>({
    available: [],
    selected: []
  });

  const [ratios, setRatios] = useState<{ available: string[], selected: string }>({
    available: [],
    selected: "Any ratio"
  });

  const [variables, setVariables] = useState<PromptVariable[]>([]);
  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [refImageDrag, setRefImageDrag] = useState<{
    from: number | null;
    over: number | null;
  }>({ from: null, over: null });
  /* True iff the user is currently dragging one or more files from
     OUTSIDE the app (e.g. desktop) over the reference-images zone.
     Used to highlight the dashed border AND to show the live
     "Drop here as image #N" hint at the bottom of the zone. We track
     it via a counter ref because dragenter/dragleave fire many times
     as the cursor crosses child elements, and naive boolean state
     would flicker. */
  const [externalDragActive, setExternalDragActive] = useState(false);
  const externalDragCounterRef = useRef(0);
  /* Index of the reference image currently shown in the fullscreen
     lightbox. `null` = lightbox closed. Opening is triggered by a
     plain CLICK on a slot — drag-and-drop reorders are mutually
     exclusive because the browser suppresses the trailing `click`
     event when a drag has actually started. */
  const [refPreviewIndex, setRefPreviewIndex] = useState<number | null>(null);
  /* Direction of the LAST navigation, used to pick the slide-in
     keyframe so each new image enters from the correct side
     instead of fading from a corner. "init" = first open (spring
     pop), "next" = arrow right (slide from right), "prev" = arrow
     left (slide from left). */
  const [refPreviewDirection, setRefPreviewDirection] = useState<"init" | "next" | "prev">("init");
  /* Hover-tooltip ("Sprechblase") for `@Image{N}` chips inside the
     prompt body. When the user hovers a chip in the hit-overlay we
     snapshot the chip's viewport rect + the 1-based image index and
     render a portalled bubble pointing back at the chip with a
     larger preview of the actual reference image. Cleared on mouse
     leave. Anchor rect is captured at hover-time only — if the user
     scrolls while hovering, mouseleave fires anyway and the bubble
     unmounts, so we don't need a follow-the-element loop. */
  const [refTooltip, setRefTooltip] = useState<{
    imageIndex: number; // 1-based, matches `@Image{N}`
    anchor: { top: number; bottom: number; centerX: number };
  } | null>(null);
  /* Reference-image @-mention dropdown state. Triggered when the
     user types `@` directly after whitespace inside the prompt
     textarea — the dropdown lists every uploaded reference image
     and inserts an `@Image{N}` token at the caret on selection.
       open       — visible iff caret is inside a fresh @-mention
       query      — text typed AFTER the @, used to filter results
       startPos   — body offset of the leading @ (replacement anchor)
       highlighted — index into the (filtered) match list */
  const [mention, setMention] = useState<{
    open: boolean;
    query: string;
    startPos: number;
    highlighted: number;
  }>({ open: false, query: "", startPos: -1, highlighted: 0 });
  const [, setDraftSavedAt] = useState<number | null>(null);
  const draftReadyRef = useRef(false);

  /* ─── Undo / Redo history ─────────────────────────────────────────
     A debounced snapshot stack of the editor's structural state.
     Captures `promptData`, `variables`, `models.selected`,
     `ratios.selected`, and `referenceImages` — everything the user
     would expect Ctrl+Z to roll back. UI-only state (selected card,
     tooltip, dialog flags) is intentionally excluded so undo
     doesn't reopen popups or jump the cursor.

     Storage strategy:
       • `historyPastRef` / `historyFutureRef` — the actual stacks.
         Refs (not state) so pushes are O(1) and don't trigger
         re-renders by themselves.
       • `historySnapshotRef` — the LAST committed snapshot, used as
         the baseline for diffing future edits.
       • `historyVersion` — a small re-render trigger so the
         toolbar's disabled/enabled buttons update when the stacks
         change.
       • `isApplyingHistoryRef` — guards against the snapshot effect
         re-capturing the state we just rewrote during undo/redo.
       • `historyDebounceRef` — coalesces flurries of setState
         calls (typing, drag-resort) into a single undo step. The
         350 ms window matches user expectations for "one
         keystroke burst = one undo".

     History only starts tracking after `draftReadyRef.current`
     flips to true so the initial localStorage hydration doesn't
     pollute the past stack with the empty-defaults snapshot. */
  /* "Where the user was when they made the change" — captured at
     the FIRST state change after each snapshot push, then attached
     to the snapshot entry. On undo, we restore both the state AND
     this focus so the user lands at the BEGINNING of the gesture
     they just reversed (e.g. inside the same variable name input
     they were typing into). */
  type FocusContext =
    | { type: "textarea"; cursorPos: number }
    | { type: "varName"; varId: string; cursorPos: number }
    | { type: "varDesc"; varId: string; cursorPos: number }
    | null;
  type EditorSnapshot = {
    promptData: { title: string; body: string; type: PromptType; tags: string[] };
    variables: PromptVariable[];
    modelsSelected: string[];
    ratiosSelected: string;
    referenceImages: string[];
    /* Focus that was active when the user STARTED the gesture
       which transitioned the editor from this snapshot's state to
       the next one. Only meaningful for entries on the past stack
       and only consumed by undo/redo; the snapshot effect itself
       ignores it (and `snapshotsEqual` strips it before comparing
       so a focus jump alone never gets recorded as an undo step). */
    focus?: FocusContext;
  };
  const HISTORY_LIMIT = 100;
  const historyPastRef = useRef<EditorSnapshot[]>([]);
  const historyFutureRef = useRef<EditorSnapshot[]>([]);
  const historySnapshotRef = useRef<EditorSnapshot | null>(null);
  const historyDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isApplyingHistoryRef = useRef(false);
  /* Captured on the FIRST state change after the most recent
     snapshot push. Reset to `undefined` (sentinel for "not yet
     captured this gesture") whenever a snapshot is pushed so the
     next gesture grabs its own start-focus. */
  const gestureFocusRef = useRef<FocusContext | undefined>(undefined);
  const [historyVersion, setHistoryVersion] = useState(0);

  const [versions, setVersions] = useState<VersionCard[]>([]);

  const [ui, setUi] = useState({
    selectedCards: [] as number[],
    cursorPos: 0,
    selectedVariableId: "lighting" as string | null,
    maxImages: 10,
    settingsCollapsed: false,
    settingsReleaseAttempted: false,
    settingsPendingSection: null as SettingsSectionId | null,
    settingsHighlightSection: null as SettingsSectionId | null,
    settingsPulseOnNavigate: true,
    pricePerRenderReviewed: false,
    variablePulsingId: null as string | null,
    variableDeleteId: null as string | null,
    variableNameConflict: null as {
      editingVarId: string;
      conflictName: string;
      existingVarId: string;
    } | null,
    currentPromptId: null as string | null,
    showAvatarDropdown: false,
    tooltip: null as { x: number, y: number, text: string } | null,
    tagInput: "",
    isGrokFilling: false,
    /* True while the Re-roll-values action is in flight. Disables
       the Re-roll button + dialog so the user can't fire a second
       round before the first batch of Grok responses comes back.
       Re-rolling is purely a variable-update step (NOT a render
       step) — image generation only ever happens via Pay &
       Generate. See `handleRefillAndGenerate` below. */
    isRerolling: false,
    queueTotal: 0,
    isEditingVersion: false,
    editingVersionId: null as number | null,
    editingNameVarId: null as string | null,
    ownershipNoticeDismissed: false,
    /* Drives the "Please set up variable names first!" alert that
       blocks the forward arrow when one or more variables still
       have an empty name. Toggled by the arrow's onClick and
       cleared by the alert's OK button. */
    variableNameMissingAlertOpen: false,
    /* Holds the verify-card id whose snapshot is about to overwrite
       the current variable defaults. Non-null = the "Are you sure?"
       confirmation dialog is open. The dialog's "Yes" button reads
       this id, performs the overwrite, and clears the field. */
    editOverwriteConfirmCardId: null as number | null,
    /* Confirmation flags for the Verify-panel multi-select action
       bar. The trash-can and "Re-roll values" buttons are both
       destructive (the first drops the slots outright; the second
       drops them and re-queues fresh ones), so they can't fire
       on a single click anymore. Each non-null value pops the
       matching `<AlertDialog>` and only commits the action if
       the user confirms. We snapshot the selected ids at open
       time so the action stays correct even if the selection
       changes between opening the dialog and confirming. */
    selectedDeleteConfirm: null as { ids: number[] } | null,
    selectedRerollConfirm: null as { ids: number[] } | null,
    /* Prompt-structure lock. When true, the prompt body is read-
       only and the variable structure (add / delete / rename)
       is frozen. ONLY the variable defaults can still be edited
       — which is the whole point of locking: tweak example
       values for the parked verify cards without accidentally
       changing the prompt itself.

       Auto-set to `true` the first moment a verify card appears
       (see the `versions.length` effect below) and toggled
       manually via the lock button in the prompt panel header.

       Verify cards are essentially "products" of the
       (prompt body + variable structure) tuple at push time.
       Mutating either of those after the cards exist would make
       the cards inconsistent with their own metadata. The lock
       is the single source of truth that prevents that drift —
       and the unlock dialog (`unlockConfirmOpen` below) is the
       single warning the user has to acknowledge. */
    promptLocked: false,
    /* Open state for the "Unlock and discard cards?" confirmation
       dialog. Only fires when the user clicks the lock button to
       UNLOCK while at least one verify card exists. Locking
       itself is non-destructive and never shows a dialog. */
    unlockConfirmOpen: false,
  });

  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  /* Drives the slide-down/fade-out animation on the ownership notice.
     Stays `true` only between the X click and the unmount (~280ms),
     after which `ui.ownershipNoticeDismissed` removes the element. */
  const [noticeLeaving, setNoticeLeaving] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [showWalletPicker, setShowWalletPicker] = useState(false);
  const walletConnected = Boolean(account?.address) || solanaConnected;
  const isGeneratingPaymentPending = isPaymentPending || isSolanaPaymentPending;

  useEffect(() => {
    const handleResize = () => setIsMobileViewport(window.innerWidth <= 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ─── Restore local draft (survives refresh / leaving the page) ─── */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(EDITOR_DRAFT_KEY);
      if (raw) {
        const draft = JSON.parse(raw) as EditorDraft;
        if (draft?.promptData) {
          setPromptData(draft.promptData);
          const restored = (draft.variables || []) as PromptVariable[];
          setVariables(
            restored.map((v, i) => normalizeVariable(v, restored.slice(0, i)))
          );
          setReferenceImages(draft.referenceImages || []);
          setUi((prev) => ({
            ...prev,
            maxImages: draft.maxImages ?? prev.maxImages,
          }));
          if (draft.modelsSelected?.length) {
            setModels((prev) => ({ ...prev, selected: draft.modelsSelected }));
          }
          if (draft.ratioSelected) {
            setRatios((prev) => ({ ...prev, selected: draft.ratioSelected }));
          }
          setDraftSavedAt(draft.savedAt ?? null);
          if (typeof draft.promptPrice === "number") setPromptPrice(draft.promptPrice);
          if (typeof draft.settingsCollapsed === "boolean") {
            setUi((prev) => ({ ...prev, settingsCollapsed: draft.settingsCollapsed }));
          }
          toast({
            title: "Draft restored",
            description: "Your last editor session was loaded from this browser.",
          });
        }
      }
    } catch {
      /* ignore corrupt draft */
    } finally {
      draftReadyRef.current = true;
    }
  }, [toast]);

  /* Restore the "ownership notice dismissed" flag from localStorage so
     the warning stays hidden after the user closes it once. */
  useEffect(() => {
    try {
      if (localStorage.getItem(OWNERSHIP_NOTICE_DISMISS_KEY) === "1") {
        setUi((p) => ({ ...p, ownershipNoticeDismissed: true }));
      }
    } catch {
      /* ignore storage errors */
    }
  }, []);

  const dismissOwnershipNotice = useCallback(() => {
    try {
      localStorage.setItem(OWNERSHIP_NOTICE_DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
    setUi((p) => ({ ...p, ownershipNoticeDismissed: true }));
  }, []);

  /* ─── Autosave draft to localStorage ─── */
  useEffect(() => {
    if (!draftReadyRef.current) return;
    const timeoutId = setTimeout(() => {
      try {
        const draft: EditorDraft = {
          promptData,
          variables: variables.map((v, i) => normalizeVariable(v, variables.slice(0, i))),
          modelsSelected: models.selected,
          ratioSelected: ratios.selected,
          maxImages: ui.maxImages,
          referenceImages,
          promptPrice,
          settingsCollapsed: ui.settingsCollapsed,
          savedAt: Date.now(),
        };
        localStorage.setItem(EDITOR_DRAFT_KEY, JSON.stringify(draft));
        setDraftSavedAt(draft.savedAt);
      } catch {
        /* quota exceeded — skip silently */
      }
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [promptData, variables, models.selected, ratios.selected, ui.maxImages, ui.settingsCollapsed, referenceImages, promptPrice]);

  const addReferenceImage = (file: File) => {
    if (referenceImages.length >= ui.maxImages) {
      toast({
        title: "Limit reached",
        description: `You can add up to ${ui.maxImages} reference image(s).`,
        variant: "destructive",
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = String(e.target?.result || "");
      if (dataUrl) setReferenceImages((prev) => [...prev, dataUrl]);
    };
    reader.readAsDataURL(file);
  };

  const pickReferenceImages = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = (ev) => {
      const files = Array.from((ev.target as HTMLInputElement).files || []);
      files.forEach(addReferenceImage);
    };
    input.click();
  };

  const reorderReferenceImages = useCallback((from: number, to: number) => {
    if (from === to || from < 0 || to < 0) return;
    setReferenceImages((prev) => {
      if (from >= prev.length || to >= prev.length) return prev;
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, []);

  /* ─── External file drag-and-drop into the reference zone ──────
     The HTML5 drag events bubble through every child element of the
     drop zone, so dragenter/dragleave fire many times during a
     single drag. We use a counter ref to track the *net* enter/leave
     state and only flip `externalDragActive` when the cursor truly
     leaves the zone (counter === 0). `Files` in dataTransfer.types
     is the well-known way to detect an external file drag (vs. an
     internal HTML element drag). */
  const handleRefZoneDragEnter = useCallback((e: React.DragEvent) => {
    if (!Array.from(e.dataTransfer.types).includes("Files")) return;
    externalDragCounterRef.current += 1;
    if (!externalDragActive) setExternalDragActive(true);
  }, [externalDragActive]);

  const handleRefZoneDragLeave = useCallback((e: React.DragEvent) => {
    if (!Array.from(e.dataTransfer.types).includes("Files")) return;
    externalDragCounterRef.current = Math.max(0, externalDragCounterRef.current - 1);
    if (externalDragCounterRef.current === 0) setExternalDragActive(false);
  }, []);

  const handleRefZoneDragOver = useCallback((e: React.DragEvent) => {
    if (!Array.from(e.dataTransfer.types).includes("Files")) return;
    // preventDefault is REQUIRED for `drop` to fire on this element.
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const handleRefZoneDrop = useCallback((e: React.DragEvent) => {
    if (!Array.from(e.dataTransfer.types).includes("Files")) return;
    e.preventDefault();
    externalDragCounterRef.current = 0;
    setExternalDragActive(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    files.forEach(addReferenceImage);
  }, [addReferenceImage]);

  /* ─── @-mention dropdown helpers ───
     Filtered matches: all reference images whose 1-based label
     ("Image 1", "Image 2", ...) starts with — or contains —
     whatever the user typed after the leading @. Numeric queries
     match by image index ("@2" → Image 2). Empty query shows all. */
  const mentionMatches = mention.open
    ? referenceImages
        .map((src, idx) => ({ src, idx, label: `Image ${idx + 1}` }))
        .filter(({ label, idx }) => {
          const q = mention.query.toLowerCase();
          if (!q) return true;
          if (label.toLowerCase().includes(q)) return true;
          if (/^\d/.test(q) && String(idx + 1).startsWith(q)) return true;
          return false;
        })
    : [];

  /* Replace the active @<query> at the caret with `@Image{N}` and
     a single trailing space (so the user can keep typing without
     having to manually re-space). Caret is repositioned right
     after the inserted space so subsequent input flows naturally. */
  /* ─── Price stepper ───
     Bumps the price by `delta` USDC, clamps to the allowed minimum,
     rounds to 4-decimal precision (matches the input's `step`),
     snapshots the previous value (for digit-diff animation) and
     triggers the roll-direction class. The class self-clears 240ms
     later — long enough for the keyframe to play, short enough that
     rapid clicks restart cleanly. */
  const handlePriceStep = useCallback(
    (delta: number) => {
      const current = promptPrice || 0;
      const next = Math.max(
        0.0001,
        parseFloat((current + delta).toFixed(4))
      );
      if (next === current) return;
      prevPriceRollSnapshotRef.current = current;
      priceRollKeyRef.current += 1;
      setPriceRollDir(delta > 0 ? "up" : "down");
      setPromptPrice(next);
      setUi((p) => ({ ...p, pricePerRenderReviewed: true }));
      if (priceRollTimerRef.current) clearTimeout(priceRollTimerRef.current);
      priceRollTimerRef.current = setTimeout(() => {
        setPriceRollDir(null);
        priceRollTimerRef.current = null;
      }, 240);
    },
    [promptPrice]
  );

  /* ─── Max-User-Images stepper ─── (mirrors handlePriceStep) */
  const handleMaxImagesStep = useCallback((delta: number) => {
    setUi((p) => {
      const current = p.maxImages;
      const next = Math.min(10, Math.max(1, current + delta));
      if (next === current) return p;
      prevMaxImagesRollSnapshotRef.current = current;
      maxImagesRollKeyRef.current += 1;
      setMaxImagesRollDir(delta > 0 ? "up" : "down");
      if (maxImagesRollTimerRef.current) clearTimeout(maxImagesRollTimerRef.current);
      maxImagesRollTimerRef.current = setTimeout(() => {
        setMaxImagesRollDir(null);
        maxImagesRollTimerRef.current = null;
      }, 240);
      return { ...p, maxImages: next };
    });
  }, []);

  const insertReferenceImageMention = useCallback(
    (imageIndex: number) => {
      const ta = textareaRef.current;
      if (!ta) return;
      const caret = ta.selectionStart;
      const start = mention.startPos;
      if (start < 0 || start > caret) return;
      const token = `@Image${imageIndex + 1}`;
      const before = promptData.body.substring(0, start);
      const after = promptData.body.substring(caret);
      const needsSpace = !after.startsWith(" ");
      const insertion = token + (needsSpace ? " " : "");
      const newBody = before + insertion + after;
      setPromptData((prev) => ({ ...prev, body: newBody }));
      setMention({ open: false, query: "", startPos: -1, highlighted: 0 });
      const newCaret = start + insertion.length;
      requestAnimationFrame(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.focus();
        el.setSelectionRange(newCaret, newCaret);
      });
    },
    [mention.startPos, promptData.body]
  );

  /* Compute the dropdown anchor — viewport-relative pixel coords of
     the `@` glyph itself, NOT the textarea-box's bottom edge. This
     places the dropdown directly under the `@` exactly where the
     user is typing. The position-1 caret coordinate is the position
     RIGHT BEFORE the `@`; we want the line below the `@`'s line, so
     we add the line-height to `top`.
       deps:
         - `mention.open`     — bind/unbind on open/close
         - `mention.startPos` — re-anchor if a paste shifts the @
         - `promptData.body`  — re-measure if textarea wraps differently
       NOT depended on:
         - `mentionAnchor`    — `update()` always returns a fresh
           object, including it would cause an infinite render loop.

     Refreshes on scroll (capture phase) + resize + ResizeObserver
     so the anchor follows the caret if the page reflows. */
  useEffect(() => {
    if (!mention.open) {
      setMentionAnchor((prev) => (prev !== null ? null : prev));
      return;
    }
    const update = () => {
      const ta = textareaRef.current;
      if (!ta) return;
      const pos = mention.startPos >= 0 ? mention.startPos : 0;
      const caret = getCaretCoordinates(ta, pos);
      setMentionAnchor({
        /* `top` = the visual baseline of the @ + one line height +
           a small breathing-room offset, so the dropdown sits just
           UNDER the line containing the @. */
        top: caret.top + caret.height + 4,
        left: caret.left,
        width: 0,                         // unused; CSS sizes via content
      });
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && textareaRef.current) {
      ro = new ResizeObserver(update);
      ro.observe(textareaRef.current);
    }
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
      ro?.disconnect();
    };
  }, [mention.open, mention.startPos, promptData.body]);

  /* ─── Reference-image lightbox keyboard nav ───
     Active only while the preview is open (refPreviewIndex !== null).
       • Escape       → close
       • ArrowLeft    → previous (wraps)
       • ArrowRight   → next     (wraps)
     We also lock document scroll while the lightbox is mounted so
     the page underneath doesn't move when arrowing through images. */
  useEffect(() => {
    if (refPreviewIndex === null) return;
    const total = referenceImages.length;
    if (total === 0) {
      setRefPreviewIndex(null);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setRefPreviewIndex(null);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setRefPreviewDirection("prev");
        setRefPreviewIndex((i) => (i === null ? null : (i - 1 + total) % total));
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setRefPreviewDirection("next");
        setRefPreviewIndex((i) => (i === null ? null : (i + 1) % total));
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    /* Mark the document body so any UI chrome OUTSIDE the lightbox
       (navbar, sticky headers, toasts, etc.) can react via CSS —
       e.g. fade out + grayscale — instead of peeking through the
       backdrop blur. The class is removed on cleanup. */
    document.body.classList.add("alg-ref-preview-open");
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.classList.remove("alg-ref-preview-open");
    };
  }, [refPreviewIndex, referenceImages.length]);

  /* ─── Model Sync ─── */
  useEffect(() => {
    if (fetchedModels.length > 0) {
      setModels(prev => ({
        ...prev,
        available: fetchedModels,
        selected: prev.selected.length === 0 ? [fetchedModels[0].id] : prev.selected
      }));
    }
  }, [fetchedModels]);

  /* ─── Ratio Sync ─── */
  useEffect(() => {
    if (models.selected.length > 0 && models.available.length > 0) {
      const allowed = new Set<string>();
      models.selected.forEach(modelId => {
        const m = models.available.find(x => x.id === modelId);
        if (m && m.allowed_ratios) {
          m.allowed_ratios.forEach((r: string) => allowed.add(r));
        }
      });
      // "Any ratio" is always a valid choice (buyer picks at render time) and is
      // the default. Keep it first so selects/dropdowns that build options from
      // `available` include it — otherwise a native <select value="Any ratio">
      // with no matching option visually snaps to the first allowed ratio.
      const allowedArray = ["Any ratio", ...Array.from(allowed)];
      setRatios(prev => ({
        ...prev,
        available: allowedArray,
        // Default to "Any ratio" — keep it (or an explicit allowed pick the user
        // made) instead of forcing the first allowed ratio.
        selected: allowedArray.includes(prev.selected) ? prev.selected : "Any ratio"
      }));
    }
  }, [models.selected, models.available]);

  const allPossibleRatios = ["Any ratio", "1:1", "4:5", "3:2", "16:9", "9:16", "21:9"];

  const toggleModel = (modelId: string) => {
    setModels(prev => {
      const isSelected = prev.selected.includes(modelId);
      if (isSelected && prev.selected.length === 1) return prev; // min 1 selected
      return {
        ...prev,
        selected: isSelected ? prev.selected.filter(id => id !== modelId) : [...prev.selected, modelId]
      };
    });
  };

  /* ─── Real-time Variable Sync — detects [] brackets only ─── */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Only detect square brackets as variables: [content]
      const regex = /\[([^\]]+)\]/g;
      const detections: { content: string; full: string }[] = [];
      let match;
      while ((match = regex.exec(promptData.body)) !== null) {
        const content = match[1];
        if (content) detections.push({ content, full: match[0] });
      }

      setVariables((prev) => {
        const detectionByToken = new Map(detections.map((d) => [d.full, d]));
        const merged: PromptVariable[] = [];
        const seenTokens = new Set<string>();

        // Keep existing variables in list order; drop tokens removed from prompt
        for (const existing of prev) {
          if (!detectionByToken.has(existing.fullToken)) continue;
          merged.push(normalizeVariable(existing, merged));
          seenTokens.add(existing.fullToken);
        }

        // Append newly detected tokens at the end (never insert at top)
        for (const det of detections) {
          if (seenTokens.has(det.full)) continue;
          seenTokens.add(det.full);
          const stableId = `var-${Math.random().toString(36).substring(2, 9)}`;
          const draft: PromptVariable = {
            id: stableId,
            name: "",
            label: det.content,
            description: det.content,
            type: "text",
            defaultValue: det.content,
            values: [det.content],
            required: true,
            position: merged.length,
            fullToken: det.full,
            colorIndex: pickVariableColorIndex(merged),
          };
          merged.push(normalizeVariable(draft, merged));
        }
        return merged;
      });
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [promptData.body]);

  useEffect(() => {
    variableLabelRegistryRef.current = buildLabelRegistry(variables, promptData.body);
  }, [variables, promptData.body]);

  /* ─── Cursor Fix & Insertion ─── */
  const insertAtCursor = (text: string) => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const val = promptData.body;
    const newVal = val.substring(0, start) + text + val.substring(end);

    setPromptData(prev => ({ ...prev, body: newVal }));

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + text.length;
        textareaRef.current.focus();
      }
    });
  };

  /* ─── Bracket Deletion — restores default value ─── */
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    /* When the prompt is locked the textarea is `readOnly`, but
       this handler can still mutate state independently of the
       browser's read-only enforcement (e.g. the variable-delete-
       on-Backspace branch below calls `setPromptData` /
       `setVariables` directly). Bail out unconditionally so the
       lock fully prevents structural changes from the keyboard
       too. The @-mention dropdown also can't realistically open
       in a read-only textarea (the user can't type @), so we
       skip its navigation branch as well. */
    if (ui.promptLocked) return;
    /* @-mention dropdown navigation. Intercepts ↑/↓/Enter/Tab/Escape
       BEFORE the normal backspace/delete logic so the dropdown can
       commandeer those keys while it's open. Any other key falls
       through (and onChange will close the dropdown if needed). */
    if (mention.open && mentionMatches.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setMention((m) => ({
          ...m,
          highlighted: Math.min(mentionMatches.length - 1, m.highlighted + 1),
        }));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setMention((m) => ({ ...m, highlighted: Math.max(0, m.highlighted - 1) }));
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        const idx = Math.min(mention.highlighted, mentionMatches.length - 1);
        const item = mentionMatches[idx];
        if (item) insertReferenceImageMention(item.idx);
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        setMention((m) => ({ ...m, open: false }));
        return;
      }
    }

    if (e.key !== 'Backspace' && e.key !== 'Delete') return;
    const el = e.currentTarget;
    const pos = el.selectionStart;
    const text = promptData.body;

    // Check if we are deleting the closing bracket of a variable
    const charBefore = text[pos - 1];
    const isClosing = charBefore === ']';
    
    if (isClosing) {
      // Find the start of the bracket group
      const openChar = '[';
      let startPos = pos - 2;
      while (startPos >= 0 && text[startPos] !== openChar) startPos--;
      
      if (startPos >= 0) {
        const fullToken = text.substring(startPos, pos);
        /* Pick the variable whose body slot lives at THIS position.
           Counting how many `fullToken` occurrences appear before
           `startPos` gives us the 0-indexed occurrence number; we
           then walk `variables` and pick the n-th match. Without
           this, two variables sharing a token (transient duplicate
           state) would always resolve to the FIRST one — so
           backspacing the second `[22]` would erase the first
           variable from the editor. */
        let occurrencesBefore = 0;
        let scanFrom = 0;
        while (true) {
          const idx = text.indexOf(fullToken, scanFrom);
          if (idx < 0 || idx >= startPos) break;
          occurrencesBefore += 1;
          scanFrom = idx + fullToken.length;
        }
        let variable: PromptVariable | undefined;
        let seen = 0;
        for (const v of variables) {
          if (v.fullToken !== fullToken) continue;
          if (seen === occurrencesBefore) {
            variable = v;
            break;
          }
          seen += 1;
        }

        if (variable) {
          e.preventDefault();
          const restoredText = getVariableReplacementText(variable);
          const newBody = text.substring(0, startPos) + restoredText + text.substring(pos);
          setPromptData(prev => ({ ...prev, body: newBody }));
          /* Same duplicate-flag recompute as `confirmDeleteVariable`:
             removing a variable here may have resolved a duplicate-
             name conflict that was lighting up another card's red
             border. */
          setVariables((prev) => {
            const remaining = prev.filter((v) => v.id !== variable.id);
            return remaining.map((v) => {
              if (!v.nameDuplicateHighlighted) return v;
              const trimmed = v.name?.trim() ?? "";
              const stillClashes = trimmed
                ? !!findVariableByName(trimmed, remaining, v.id)
                : false;
              return stillClashes ? v : { ...v, nameDuplicateHighlighted: false };
            });
          });
          
          requestAnimationFrame(() => {
            if (textareaRef.current) {
              const newCursor = startPos + restoredText.length;
              textareaRef.current.selectionStart = textareaRef.current.selectionEnd = newCursor;
              textareaRef.current.focus();
            }
          });
        }
      }
    }
  };

  const triggerVariablePulse = useCallback((varId: string) => {
    if (variablePulseTimerRef.current) clearTimeout(variablePulseTimerRef.current);
    setUi((p) => ({ ...p, variablePulsingId: varId }));
    variablePulseTimerRef.current = setTimeout(() => {
      setUi((p) => ({ ...p, variablePulsingId: null }));
    }, 2200);
  }, []);

  const scrollVariableCardIntoView = useCallback((varId: string) => {
    let attempts = 0;
    const tryScroll = () => {
      const el = variableCardRefs.current[varId];
      const scrollRoot = variablesScrollRef.current;
      if (!el || !scrollRoot) {
        if (attempts++ < 20) requestAnimationFrame(tryScroll);
        return;
      }
      const elRect = el.getBoundingClientRect();
      const rootRect = scrollRoot.getBoundingClientRect();
      scrollRoot.scrollTo({
        top: scrollRoot.scrollTop + (elRect.top - rootRect.top) - 12,
        behavior: "auto",
      });
    };
    tryScroll();
  }, []);

  const selectVariable = useCallback(
    (
      id: string,
      options?: { scrollToCard?: boolean; cursorPos?: number; pulse?: boolean }
    ) => {
      setUi((prev) => ({
        ...prev,
        selectedVariableId: id,
        ...(options?.cursorPos != null ? { cursorPos: options.cursorPos } : {}),
      }));
      if (options?.pulse) triggerVariablePulse(id);
      if (options?.scrollToCard) scrollVariableCardIntoView(id);
    },
    [triggerVariablePulse, scrollVariableCardIntoView]
  );

  const selectVariableAtCursor = useCallback(
    (el: HTMLTextAreaElement) => {
      const start = el.selectionStart;
      const text = promptData.body;
      const regex = /\[([^\]]+)\]/g;
      let match: RegExpExecArray | null;
      while ((match = regex.exec(text)) !== null) {
        if (start >= match.index && start <= match.index + match[0].length) {
          const variable = variables.find((v) => v.fullToken === match![0]);
          if (variable) {
            selectVariable(variable.id, { scrollToCard: true, pulse: true });
            return true;
          }
          break;
        }
      }
      return false;
    },
    [promptData.body, variables, selectVariable]
  );

  /* ─── AI Variable Naming ─── */
  const handleTextareaSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const text = promptData.body;
    setUi(prev => ({ ...prev, cursorPos: start }));

    selectVariableAtCursor(el);

    if (end > start) {
      const selectedText = text.substring(start, end);
      const rect = el.getBoundingClientRect();
      // Approximate tooltip position near cursor
      const x = rect.left + 50;
      const y = rect.top;

      setUi(prev => ({ ...prev, tooltip: { x, y, text: selectedText } }));
    } else {
      setUi(prev => ({ ...prev, tooltip: null }));
    }
  };

  const handleCreateVariable = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;

    const selStart = el.selectionStart;
    const selEnd = el.selectionEnd;
    const val = promptData.body;
    const rawSelected = val.substring(selStart, selEnd);
    const innerRaw = rawSelected.trim();
    if (!innerRaw) return;

    const leadingPad = rawSelected.length - rawSelected.trimStart().length;
    const trailingPad = rawSelected.length - rawSelected.trimEnd().length;
    const varStart = selStart + leadingPad;
    const varEnd = selEnd - trailingPad;

    const inner = takeUniqueVariableLabel(
      variableLabelRegistryRef,
      innerRaw,
      variables,
      promptData.body
    );
    const bracketed = buildFullToken(inner);
    const newVal = val.substring(0, varStart) + bracketed + val.substring(varEnd);

    const stableId = `var-${Math.random().toString(36).substring(2, 9)}`;

    setPromptData((prev) => ({ ...prev, body: newVal }));
    setVariables((prev) => {
      const draft: PromptVariable = {
        id: stableId,
        name: "",
        label: inner,
        description: inner,
        type: "text",
        defaultValue: inner,
        values: [inner],
        required: true,
        position: prev.length,
        fullToken: bracketed,
        colorIndex: pickVariableColorIndex(prev),
      };
      return [...prev, normalizeVariable(draft, prev)];
    });
    pendingVarScrollRef.current = stableId;
    setUi((prev) => ({ ...prev, tooltip: null }));
    selectVariable(stableId, { scrollToCard: true, pulse: true });

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        const caret = varStart + bracketed.length;
        textareaRef.current.selectionStart = caret;
        textareaRef.current.selectionEnd = caret;
        textareaRef.current.focus();
      }
    });
  }, [promptData.body, variables, selectVariable]);

  const handleVariableButtonClick = () => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selectedText = promptData.body.substring(start, end);

    if (start !== end && selectedText.trim()) {
      handleCreateVariable();
      return;
    }

    /* Atomically insert the body token AND register the matching
       variable in the same event handler so React batches both
       updates into one re-render. Critical for undo: previously
       this handler ONLY did `setPromptData`, leaving the
       "Real-time Variable Sync" effect (debounced 400ms) to
       backfill the variables array later. The snapshot debounce
       is 350ms — fires BEFORE the variable-sync effect — so undo
       used to land in an incoherent state with `[Variable]` text
       in the body but no corresponding variable card. Doing both
       updates here in one batch makes the click a single
       indivisible undo step. */
    const inner = takeUniqueVariableLabel(
      variableLabelRegistryRef,
      "Variable",
      variables,
      promptData.body
    );
    const token = buildFullToken(inner);
    const insertedLen = token.length;
    const stableId = `var-${Math.random().toString(36).substring(2, 9)}`;

    setPromptData((prev) => ({
      ...prev,
      body: prev.body.substring(0, start) + token + prev.body.substring(end),
    }));
    setVariables((prev) => {
      /* Bail if the variable-sync effect somehow already added
         this token (e.g. fast double-click) — duplicate ids would
         break React's reconciliation and the variable card
         renderer. */
      if (prev.some((v) => v.fullToken === token && v.id === stableId)) {
        return prev;
      }
      const draft: PromptVariable = {
        id: stableId,
        name: "",
        label: inner,
        description: inner,
        type: "text",
        defaultValue: inner,
        values: [inner],
        required: true,
        position: prev.length,
        fullToken: token,
        colorIndex: pickVariableColorIndex(prev),
      };
      return [...prev, normalizeVariable(draft, prev)];
    });
    pendingVarScrollRef.current = stableId;
    selectVariable(stableId, { scrollToCard: true, pulse: true });

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        const caret = start + insertedLen;
        textareaRef.current.selectionStart = caret;
        textareaRef.current.selectionEnd = caret;
        textareaRef.current.focus();
      }
    });
  };

  const createVariableFromSelection = () => {
    if (!ui.tooltip) return;
    handleCreateVariable();
  };

  // Keep the overlay's right padding == textarea's right padding + scrollbar
  // gutter. The textarea uses `scrollbar-gutter: stable`, which reserves
  // ~8px inside the textarea's content area. The overlay has no scrollbar,
  // so we add that same gutter to its padding-right at runtime. Without
  // this, both layers would technically have the same box width but the
  // textarea would wrap text earlier (gutter eats space), making the
  // cursor drift by one column → eventually one full line.
  // PROMPT_PAD_X must equal `--alg-prompt-pad-x` in algency-editor.css.
  const syncPromptOverlayMetrics = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const scrollbar = Math.max(0, ta.offsetWidth - ta.clientWidth);
    const padRight = `${PROMPT_PAD_X + scrollbar}px`;
    for (const el of [overlayRef.current, hitOverlayRef.current]) {
      if (!el) continue;
      el.style.paddingRight = padRight;
    }
  }, []);

  // Copy the textarea's scroll position to both overlay layers. Cheap
  // (a couple of property writes) and guarded so it's a no-op when the
  // values already match. Used both by the `scroll` event handler and
  // by the continuous rAF sync loop below.
  const syncOverlayScroll = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const top = ta.scrollTop;
    const left = ta.scrollLeft;
    const overlay = overlayRef.current;
    if (overlay) {
      if (overlay.scrollTop !== top) overlay.scrollTop = top;
      if (overlay.scrollLeft !== left) overlay.scrollLeft = left;
    }
    const hit = hitOverlayRef.current;
    if (hit) {
      if (hit.scrollTop !== top) hit.scrollTop = top;
      if (hit.scrollLeft !== left) hit.scrollLeft = left;
    }
  }, []);

  const handleTextareaScroll = useCallback(() => {
    syncOverlayScroll();
    syncPromptOverlayMetrics();
  }, [syncOverlayScroll, syncPromptOverlayMetrics]);

  // ─── Bulletproof scroll sync ──────────────────────────────────────
  // The textarea's `scroll` event alone is NOT sufficient: when the
  // browser auto-scrolls the textarea to bring the caret into view
  // (e.g. after a paste, after clicking past the visible area, or
  // after an arrow-key/Page-Down navigation), it sometimes fires the
  // `scroll` event AFTER the next paint — so for at least one frame
  // the caret blinks at the new (post-scroll) position while the
  // overlay still shows the OLD content. Result: the user sees the
  // cursor in the middle of the wrong line until they manually scroll
  // (which finally fires `scroll` and resyncs).
  //
  // To make this impossible, we run a continuous requestAnimationFrame
  // loop while the textarea is focused. It does nothing more than
  // mirror scrollTop/scrollLeft, and bails immediately when values
  // already match, so the cost is negligible (a few number reads per
  // frame) but it's guaranteed to catch every browser-driven scroll.
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    let rafId: number | null = null;
    const tick = () => {
      syncOverlayScroll();
      rafId = requestAnimationFrame(tick);
    };
    const start = () => {
      if (rafId !== null) return;
      // Immediate sync covers the moment between focus and the first
      // rAF tick (~16ms later) where the browser may already have
      // auto-scrolled.
      syncOverlayScroll();
      rafId = requestAnimationFrame(tick);
    };
    const stop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      // One last sync after blur in case a final scroll happened.
      syncOverlayScroll();
    };
    ta.addEventListener("focus", start);
    ta.addEventListener("blur", stop);
    if (typeof document !== "undefined" && document.activeElement === ta) {
      start();
    }
    return () => {
      stop();
      ta.removeEventListener("focus", start);
      ta.removeEventListener("blur", stop);
    };
  }, [syncOverlayScroll]);

  useEffect(() => {
    const run = () => syncPromptOverlayMetrics();
    run();
    const raf = requestAnimationFrame(run);
    const ta = textareaRef.current;
    if (!ta) return () => cancelAnimationFrame(raf);
    const ro = new ResizeObserver(run);
    ro.observe(ta);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [promptData.body, syncPromptOverlayMetrics]);

  /** Colored variable marks in the prompt — plain text stays unwrapped for cursor alignment */
  const renderPromptWithTags = (layer: "display" | "hit" = "display") => {
    const parts = promptData.body.split(PROMPT_INLINE_TOKEN_RE);
    /* Per-token occurrence counter for positional variable matching.
       When two variables transiently share a `fullToken` (e.g.
       mid-edit duplicate-name state), counting how many times we've
       seen each token in `parts` so far — and picking the n-th
       variable in `variables` array order with that token — gives
       each chip its OWN variable instead of all chips collapsing
       onto the first match. Without this, both `[22]`s would render
       with variable A's color and clicking either would focus A. */
    const tokenOccurrenceCounters: Record<string, number> = {};
    return parts.map((part, index) => {
      if (!part) return null;

      /* `@Image{N}` reference-image mention. Rendered as a chip
         with grey bg + dark grey text PLUS a tiny thumbnail of the
         actual reference image at the left edge.

         CRITICAL: padding/margin must stay 0 so the chip's painted
         box matches the textarea text glyphs char-for-char,
         otherwise the cursor desyncs. The thumbnail is therefore
         rendered via a `::before` pseudo element with
         `position: absolute` — it has zero layout impact and just
         visually occludes the `@` glyph at the left of the chip,
         leaving "Image{N}" text legible to the right. The image URL
         flows in via the `--alg-ref-thumb-url` custom property. */
      const refMatch = REF_IMAGE_MENTION_RE.exec(part);
      if (refMatch) {
        const n = parseInt(refMatch[1], 10);
        const exists = n >= 1 && n <= referenceImages.length;
        const imgSrc = exists ? referenceImages[n - 1] : null;
        const refStyle = imgSrc
          ? ({
              ["--alg-ref-thumb-url" as string]: `url("${imgSrc.replace(
                /"/g,
                '\\"'
              )}")`,
            } as React.CSSProperties)
          : undefined;
        /* Bind hover only on the hit layer — that's the layer that
           already has `pointer-events: auto` on chips, and it sits
           above the visible display layer so mouse events register
           there. The display layer keeps `pointer-events: none` so
           selection / typing in the textarea below isn't blocked. */
        const refHoverHandlers =
          layer === "hit" && exists
            ? {
                onMouseEnter: (e: React.MouseEvent<HTMLSpanElement>) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setRefTooltip({
                    imageIndex: n,
                    anchor: {
                      top: rect.top,
                      bottom: rect.bottom,
                      centerX: rect.left + rect.width / 2,
                    },
                  });
                },
                onMouseLeave: () => setRefTooltip(null),
              }
            : {};
        return (
          <span
            key={`${index}-${part}-${layer}`}
            className={`alg-var-tag alg-var-tag--ref-image${
              exists ? "" : " alg-var-tag--ref-image-missing"
            }${layer === "hit" ? " alg-var-tag--hit" : ""}`}
            style={refStyle}
            {...refHoverHandlers}
          >
            {part}
          </span>
        );
      }

      if (!/^\[[^\]]*\]$/.test(part)) {
        return <Fragment key={`${index}-plain-${layer}`}>{part}</Fragment>;
      }
      /* Resolve THIS chip to the variable that owns its body slot,
         not just the first variable with a matching token. The
         occurrence counter is incremented even when no variable
         matches so duplicate-token chips that appear after an
         orphaned one still resolve correctly. */
      const occurrenceIdx = tokenOccurrenceCounters[part] ?? 0;
      tokenOccurrenceCounters[part] = occurrenceIdx + 1;
      let variable: PromptVariable | undefined;
      let seen = 0;
      for (const v of variables) {
        if (v.fullToken !== part) continue;
        if (seen === occurrenceIdx) {
          variable = v;
          break;
        }
        seen += 1;
      }
      const isSelected = ui.selectedVariableId === variable?.id;
      const colors = variable ? getVariableColors(variable.colorIndex) : null;

      /* Body offset of THIS chip — used by the click handler to
         drop the caret right after the n-th occurrence of `part`
         (instead of the first), so clicking the second `[22]`
         puts the cursor at the second `[22]`. */
      let chipBodyOffset = -1;
      let cursor = 0;
      for (let i = 0; i <= occurrenceIdx; i++) {
        const idx = promptData.body.indexOf(part, cursor);
        if (idx < 0) {
          chipBodyOffset = -1;
          break;
        }
        if (i === occurrenceIdx) {
          chipBodyOffset = idx;
          break;
        }
        cursor = idx + part.length;
      }

      const focusVariableInPrompt = () => {
        if (!variable) return;
        const textarea = textareaRef.current;
        if (!textarea) return;
        if (chipBodyOffset < 0) return;
        textarea.focus();
        const caret = chipBodyOffset + part.length;
        textarea.setSelectionRange(caret, caret);
        selectVariable(variable.id, { scrollToCard: true, cursorPos: caret, pulse: true });
      };

      const tagHandlers =
        layer === "hit"
          ? {
              role: "button" as const,
              tabIndex: -1,
              onMouseDown: (e: React.MouseEvent) => {
                e.preventDefault();
                focusVariableInPrompt();
              },
            }
          : {};

      const nameMissing = !!variable?.nameMissingHighlighted;

      return (
        <span
          key={`${index}-${part}-${layer}`}
          className={`alg-var-tag${isSelected ? " alg-var-tag--selected" : ""}${nameMissing ? " alg-var-tag--name-missing" : ""}${layer === "hit" ? " alg-var-tag--hit" : ""}`}
          {...tagHandlers}
          style={
            layer === "hit"
              ? undefined
              : colors
                ? ({
                    backgroundColor: colors.bg,
                    color: colors.text,
                    ...(isSelected ? { ["--var-tag-accent" as string]: colors.text } : {}),
                  } as React.CSSProperties)
                : undefined
          }
        >
          {part}
        </span>
      );
    });
  };

  /* ─── Preview with defaults ─── */
  const renderPreviewWithDefaults = () => {
    let previewText = promptData.body;
    variables.forEach((variable) => {
      const placeholder = `[${variable.name}]`;
      let display = "";
      if (variable.type === "text") {
        display = (variable.defaultValue as string) || "";
      } else if (variable.type === "image") {
        display = variable.description || "";
      } else if (variable.type === "checkbox") {
        display = variable.defaultValue ? variable.description : "";
      }
      previewText = previewText.split(placeholder).join(display);
    });
    return previewText;
  };

  /* ─── Update variable — syncs prompt brackets (v2: defaults vs name) ─── */
  const updateVariable = (varId: string, updates: Partial<PromptVariable>) => {
    const currentVar = variables.find((v) => v.id === varId);
    if (!currentVar) return;

    const merged: PromptVariable = { ...currentVar, ...updates };
    const isEditingName = ui.editingNameVarId === varId;
    const nextInner = getPromptTokenInner(
      { ...merged, name: isEditingName && updates.name !== undefined ? updates.name : merged.name },
      isEditingName ? varId : null
    );
    const newFullToken = buildFullToken(nextInner);

    if (newFullToken === currentVar.fullToken) {
      setVariables((prev) => prev.map((v) => (v.id === varId ? { ...v, ...updates } : v)));
      return;
    }

    /* Positional body update.

       `replaceNthTokenInBody` rewrites ONLY this variable's slot in
       the body — the n-th `currentVar.fullToken` occurrence, where
       `n` is THIS variable's index among same-token variables in
       declared order. We deliberately do NOT use the global
       `replaceTokenInBody`: if the user just typed a duplicate name
       (e.g. they renamed B to "22" while A is also "22"), the new
       token would collide textually with A's, and a global replace
       would rewrite BOTH `[22]` occurrences — orphaning A and
       silently merging the variables.

       Pre-update, `currentVar.fullToken` is always unique in the
       body (we maintain that invariant by always using positional
       replaces here), so `n` is 0 in 99% of cases. The general
       `getVariableOccurrenceIndex` form keeps things correct for
       the rare path where a previous edit left two variables
       sharing a token. */
    const occurrenceIndex = Math.max(
      0,
      getVariableOccurrenceIndex(variables, varId, currentVar.fullToken)
    );
    setPromptData((prev) => ({
      ...prev,
      body: replaceNthTokenInBody(
        prev.body,
        currentVar.fullToken,
        newFullToken,
        occurrenceIndex
      ),
    }));
    setVariables((prev) =>
      prev.map((v) => (v.id === varId ? { ...merged, fullToken: newFullToken } : v))
    );
  };

  const handleVariableNameFocus = (varId: string) => {
    setUi((prev) => ({ ...prev, editingNameVarId: varId }));
  };

  const adoptExistingVariableName = useCallback(
    (editingVarId: string, existingVarId: string) => {
      const variable = variables.find((v) => v.id === editingVarId);
      const existing = variables.find((v) => v.id === existingVarId);
      if (!variable || !existing) return;
      const adoptToken = existing.fullToken;
      /* Positional rewrite — only the editing variable's slot in
         the body should adopt the existing token. After this, the
         body has two adjacent references to the same `existing`
         variable (the original + the just-adopted slot), and we
         drop the duplicate variable below. Using the global
         `replaceTokenInBody` here would be safe (oldToken == new
         intent), but the positional form keeps the code path
         consistent with the other resolution branches. */
      const occurrenceIndex = Math.max(
        0,
        getVariableOccurrenceIndex(variables, editingVarId, variable.fullToken)
      );
      setPromptData((prev) => ({
        ...prev,
        body: replaceNthTokenInBody(
          prev.body,
          variable.fullToken,
          adoptToken,
          occurrenceIndex
        ),
      }));
      /* Drop the duplicate variable AND clear any duplicate-
         highlight on the variable that just got adopted. (The
         existing variable's flag would only be set in odd edge
         cases, but we clear it for safety so the red border
         doesn't linger after resolution.) */
      setVariables((prev) =>
        prev
          .filter((v) => v.id !== editingVarId)
          .map((v) =>
            v.id === existingVarId
              ? { ...v, nameDuplicateHighlighted: false }
              : v
          )
      );
      setUi((p) => ({
        ...p,
        variableNameConflict: null,
        selectedVariableId: existingVarId,
      }));
    },
    [variables]
  );

  const createNewVariableNameFromConflict = useCallback(
    (editingVarId: string, conflictName: string) => {
      const variable = variables.find((v) => v.id === editingVarId);
      if (!variable) return;
      const newName = takeUniqueVariableLabel(
        variableLabelRegistryRef,
        conflictName,
        variables,
        promptData.body,
        editingVarId
      );
      const newToken = buildFullToken(newName);
      /* Positional rewrite — ONLY this variable's slot in the body
         is renamed. Critical for the duplicate-name case: if the
         user typed a name that already exists (so `variable.fullToken`
         textually matches another variable's), a global
         `replaceTokenInBody` would rewrite EVERY matching slot in
         the body, silently merging both variables under the new
         name. Using the n-th-occurrence form keeps the OTHER
         variable's slot untouched. */
      const occurrenceIndex = Math.max(
        0,
        getVariableOccurrenceIndex(variables, editingVarId, variable.fullToken)
      );
      setPromptData((prev) => ({
        ...prev,
        body: replaceNthTokenInBody(
          prev.body,
          variable.fullToken,
          newToken,
          occurrenceIndex
        ),
      }));
      setVariables((prev) =>
        prev.map((v) =>
          v.id === editingVarId
            ? {
                ...v,
                name: newName,
                fullToken: newToken,
                nameBlurEmpty: false,
                nameDuplicateHighlighted: false,
              }
            : v
        )
      );
      setUi((p) => ({ ...p, variableNameConflict: null }));
    },
    [variables, promptData.body]
  );

  /* Lazy verify-card cleanup. Called from every structural-
     mutation entry point (prompt body change, variable add /
     rename / delete) to drop any parked verify cards the moment
     the prompt deviates from what they were captured against.

     We don't show a separate popup here because the user already
     accepted the trade-off in the unlock confirmation dialog
     ("if you change anything structural, they'll be discarded
     automatically"). A small one-shot toast is the minimum
     required signal that the cards just disappeared, so the
     user isn't surprised when they look at the Verify panel.

     Returns nothing; safe to call unconditionally — bails out
     when the editor is locked (mutation paths are gated anyway)
     or when there's nothing to clean up.

     POSITION: this declaration MUST live above
     `confirmDeleteVariable` and the auto-lock effect below,
     because both reference it (directly in `confirmDeleteVariable`'s
     dep array, indirectly through the toast-shown ref in the
     auto-lock effect). Moving it later triggers a TDZ
     `Cannot access 'clearVersionsIfStructuralEdit' before
     initialization` error at the dep array's evaluation. */
  const versionsClearedToastShownRef = useRef(false);
  const clearVersionsIfStructuralEdit = useCallback(() => {
    if (ui.promptLocked) return;
    if (versions.length === 0) return;
    setVersions([]);
    setUi((p) => ({ ...p, selectedCards: [] }));
    /* One toast per "edit session" to avoid spamming the user
       on every keystroke after the cards already vanished. The
       flag resets when a new card is parked (handled in the
       auto-lock effect). */
    if (!versionsClearedToastShownRef.current) {
      versionsClearedToastShownRef.current = true;
      toast({
        title: "Verify cards cleared",
        description:
          "The prompt changed, so parked verify cards no longer match. Push to verify again once you're done editing.",
      });
    }
  }, [ui.promptLocked, versions.length, toast]);

  /* ─── Undo/Redo machinery ────────────────────────────────────────
     `applySnapshot` is the single point that rewrites every
     tracked piece of state at once. It sets `isApplyingHistoryRef`
     so the snapshot effect below knows the upcoming render isn't
     a fresh user edit and doesn't re-push it onto the past stack. */
  const applySnapshot = useCallback((snap: EditorSnapshot) => {
    isApplyingHistoryRef.current = true;
    setPromptData(snap.promptData);
    setVariables(snap.variables);
    setModels((prev) => ({ ...prev, selected: snap.modelsSelected }));
    setRatios((prev) => ({ ...prev, selected: snap.ratiosSelected }));
    setReferenceImages(snap.referenceImages);
  }, []);

  /* Capture the user's current focus context — the prompt textarea
     (with caret position) or one of the per-variable inputs (name
     / description) keyed by variable id. Returns null if focus is
     somewhere we don't track (a button, the body, a modal, etc.).
     The variable card lookup walks `variableCardRefs` rather than
     a `data-*` attribute to avoid teaching every card-rendering
     branch about an extra prop. */
  const captureFocusContext = useCallback((): FocusContext => {
    if (typeof document === "undefined") return null;
    const el = document.activeElement as HTMLElement | null;
    if (!el) return null;
    if (el === textareaRef.current) {
      const ta = el as HTMLTextAreaElement;
      return { type: "textarea", cursorPos: ta.selectionStart ?? 0 };
    }
    const isName = el.classList.contains("alg-var-card__name-input");
    const isDesc = el.classList.contains("alg-var-card__desc-input");
    if (!isName && !isDesc) return null;
    for (const [varId, card] of Object.entries(variableCardRefs.current)) {
      if (card && card.contains(el)) {
        const inputEl = el as HTMLInputElement | HTMLTextAreaElement;
        const cursorPos = inputEl.selectionStart ?? 0;
        return { type: isName ? "varName" : "varDesc", varId, cursorPos };
      }
    }
    return null;
  }, []);

  /* Imperatively restore a previously-captured focus context.
     Wrapped in rAF inside the callers because the snapshot apply
     above triggers a re-render that has to commit before the
     queried elements are reachable. Silently bails on stale refs
     (e.g. the variable was deleted between the gesture and the
     undo) so undo never blows up — the focus just stays put.

     The selectionRange call is in a try/catch because some browsers
     throw when the requested range is past the element's current
     value length, which can happen if the snapshot was captured
     mid-edit at a cursor position that no longer exists in the
     restored input. */
  const restoreFocusContext = useCallback((ctx: FocusContext) => {
    if (!ctx) return;
    if (ctx.type === "textarea") {
      const ta = textareaRef.current;
      if (!ta) return;
      ta.focus();
      const safe = Math.min(ctx.cursorPos, ta.value.length);
      try {
        ta.setSelectionRange(safe, safe);
      } catch {
        /* ignored — focus still applied */
      }
      return;
    }
    const card = variableCardRefs.current[ctx.varId];
    if (!card) return;
    const selector =
      ctx.type === "varName"
        ? ".alg-var-card__name-input"
        : ".alg-var-card__desc-input";
    const input = card.querySelector(selector) as
      | HTMLInputElement
      | HTMLTextAreaElement
      | null;
    if (!input) return;
    input.focus();
    const safe = Math.min(ctx.cursorPos, input.value.length);
    try {
      input.setSelectionRange(safe, safe);
    } catch {
      /* ignored */
    }
  }, []);

  const captureSnapshot = useCallback(
    (): EditorSnapshot => ({
      promptData,
      variables,
      modelsSelected: models.selected,
      ratiosSelected: ratios.selected,
      referenceImages,
    }),
    [promptData, variables, models.selected, ratios.selected, referenceImages]
  );

  /* Cheap structural compare — `JSON.stringify` is fine here
     because snapshots are bounded (at most a few KB) and run only
     after the debounce fires, not on every keystroke. The `focus`
     field is intentionally stripped before comparing so a pure
     focus change (no actual data edit) never gets recorded as an
     undo step. */
  const snapshotsEqual = useCallback(
    (a: EditorSnapshot, b: EditorSnapshot): boolean => {
      if (a === b) return true;
      const stripFocus = ({ focus: _focus, ...rest }: EditorSnapshot) => rest;
      return JSON.stringify(stripFocus(a)) === JSON.stringify(stripFocus(b));
    },
    []
  );

  /* A snapshot is "coherent" iff every `[token]` in the body has a
     matching variable AND every variable's `fullToken` actually
     appears in the body — counts must match per token. We REFUSE
     to commit snapshots of incoherent states because they appear
     transiently between two debounced effects:

       1. The user does a structural action (clicks "+ Variable",
          types `[abc]` directly into the textarea, deletes a
          token, …) that mutates `promptData.body`.
       2. The "Real-time Variable Sync" effect runs 400 ms later
          to backfill / prune the `variables` array so it matches
          the new body.

     Our snapshot debounce is 350 ms — strictly shorter — so
     without this gate the past stack would routinely capture the
     50 ms window after step 1 but before step 2, giving the user
     an "undo lands on a half-built state" experience (e.g.
     orphaned `[Variable]` brackets with no matching card).
     Skipping incoherent snapshots makes the next coherent state
     the single undo-able boundary, which is the gesture the user
     actually performed. */
  const isSnapshotCoherent = useCallback((snap: EditorSnapshot): boolean => {
    const bodyTokenCounts = new Map<string, number>();
    const tokenRe = /\[[^\]]*\]/g;
    let m: RegExpExecArray | null;
    while ((m = tokenRe.exec(snap.promptData.body)) !== null) {
      bodyTokenCounts.set(m[0], (bodyTokenCounts.get(m[0]) ?? 0) + 1);
    }
    const varTokenCounts = new Map<string, number>();
    for (const v of snap.variables) {
      varTokenCounts.set(v.fullToken, (varTokenCounts.get(v.fullToken) ?? 0) + 1);
    }
    if (bodyTokenCounts.size !== varTokenCounts.size) return false;
    for (const [token, count] of bodyTokenCounts) {
      if (varTokenCounts.get(token) !== count) return false;
    }
    return true;
  }, []);

  /* Force-commit any pending debounced snapshot RIGHT NOW. Used
     before undo/redo so a half-typed change becomes its own undo
     step instead of being swallowed by the pending edit. Also
     respects the coherence check — refusing to flush an
     incoherent state means the user pressing Ctrl+Z mid-creation
     gracefully waits for the next coherent boundary instead of
     yanking them into a half-built editor. */
  const flushPendingSnapshot = useCallback(() => {
    if (!historyDebounceRef.current) return;
    clearTimeout(historyDebounceRef.current);
    historyDebounceRef.current = null;
    const baseline = historySnapshotRef.current;
    if (!baseline) return;
    const current = captureSnapshot();
    if (snapshotsEqual(baseline, current)) return;
    if (!isSnapshotCoherent(current)) return;
    const baselineWithFocus: EditorSnapshot = {
      ...baseline,
      focus: gestureFocusRef.current ?? null,
    };
    historyPastRef.current.push(baselineWithFocus);
    if (historyPastRef.current.length > HISTORY_LIMIT) {
      historyPastRef.current.shift();
    }
    historyFutureRef.current = [];
    historySnapshotRef.current = current;
    gestureFocusRef.current = undefined;
  }, [captureSnapshot, snapshotsEqual, isSnapshotCoherent]);

  /* Snapshot effect — debounces edits into the past stack.
     Runs whenever any tracked slice changes. */
  useEffect(() => {
    if (!draftReadyRef.current) return;

    /* If this render is the result of an applySnapshot() call, do
       NOT push another entry onto the past stack — just adopt the
       freshly-applied snapshot as the new baseline and reset the
       guard. */
    if (isApplyingHistoryRef.current) {
      isApplyingHistoryRef.current = false;
      historySnapshotRef.current = captureSnapshot();
      return;
    }

    /* First commit after draft hydration — establish baseline only,
       don't push anything yet. */
    if (historySnapshotRef.current === null) {
      historySnapshotRef.current = captureSnapshot();
      return;
    }

    /* First state change after the most recent snapshot push —
       capture where the user was focused right now, so undo can
       drop them back into the same input/textarea. The `undefined`
       sentinel distinguishes "not yet captured this gesture" from
       "captured but legitimately null because focus was on
       something we don't track" — that null still gets stored so
       undo just doesn't move focus instead of falling back to
       stale data. */
    if (gestureFocusRef.current === undefined) {
      gestureFocusRef.current = captureFocusContext();
    }

    if (historyDebounceRef.current) clearTimeout(historyDebounceRef.current);
    historyDebounceRef.current = setTimeout(() => {
      historyDebounceRef.current = null;
      const baseline = historySnapshotRef.current;
      if (!baseline) {
        historySnapshotRef.current = captureSnapshot();
        return;
      }
      const next = captureSnapshot();
      if (snapshotsEqual(baseline, next)) return;
      /* Coherence gate: skip the snapshot push if `next` represents
         a transient state where the body and variables are out of
         sync (e.g. the variable-sync effect hasn't fired yet to
         backfill a freshly-typed `[token]`). The next state change
         will reschedule this debounce, and we'll commit on the
         first coherent state — which is the user-perceptible
         "result" of their gesture. */
      if (!isSnapshotCoherent(next)) return;
      /* Stamp the gesture's start-focus onto the snapshot we're
         about to retire to the past stack. That entry is what undo
         will pop, and the focus stamped here is where the user
         was when they BEGAN the action that's about to be
         reversed. */
      const baselineWithFocus: EditorSnapshot = {
        ...baseline,
        focus: gestureFocusRef.current ?? null,
      };
      historyPastRef.current.push(baselineWithFocus);
      if (historyPastRef.current.length > HISTORY_LIMIT) {
        historyPastRef.current.shift();
      }
      historyFutureRef.current = [];
      historySnapshotRef.current = next;
      /* Reset the gesture-focus capture so the NEXT first state
         change grabs its own start-focus. */
      gestureFocusRef.current = undefined;
      setHistoryVersion((v) => v + 1);
    }, 350);
  }, [
    promptData,
    variables,
    models.selected,
    ratios.selected,
    referenceImages,
    captureSnapshot,
    captureFocusContext,
    snapshotsEqual,
    isSnapshotCoherent,
  ]);

  /* Focus dispatcher used by undo/redo. Priority order:
       1. If the restored snapshot has a duplicate-name conflict
          (the user had typed a name that collides with another
          variable), focus the offending variable's name input so
          they can immediately fix it. This wins over the captured
          gesture focus because resolving the duplicate is
          higher-stakes than recreating the click context.
       2. Otherwise, restore the focus context that was captured
          at the START of the gesture being reversed/replayed —
          puts the user back inside the input/textarea they were
          driving the change from.
     Wrapped in `requestAnimationFrame` so the snapshot apply has
     a chance to commit and the targeted DOM nodes exist by the
     time we call `.focus()`. */
  const restoreFocusForHistoryStep = useCallback(
    (snap: EditorSnapshot) => {
      const hasClash = (v: PromptVariable): boolean => {
        const trimmed = v.name?.trim();
        if (!trimmed) return false;
        const lower = trimmed.toLowerCase();
        return snap.variables.some(
          (other) =>
            other.id !== v.id &&
            other.name?.trim().toLowerCase() === lower
        );
      };
      /* Prefer variables flagged as the typed-duplicate (more
         likely the one the user wanted to keep editing). Fall
         back to the last clashing entry in array order — variables
         are appended in creation order, so the most recently
         added one is the most likely target. */
      const flagged = snap.variables.find(
        (v) => v.nameDuplicateHighlighted && hasClash(v)
      );
      let dup: PromptVariable | undefined = flagged;
      if (!dup) {
        for (let i = snap.variables.length - 1; i >= 0; i--) {
          if (hasClash(snap.variables[i])) {
            dup = snap.variables[i];
            break;
          }
        }
      }

      requestAnimationFrame(() => {
        if (dup) {
          const card = variableCardRefs.current[dup.id];
          const input = card?.querySelector<HTMLInputElement>(
            ".alg-var-card__name-input"
          );
          if (input) {
            input.focus();
            const end = input.value.length;
            input.setSelectionRange(end, end);
            return;
          }
        }
        restoreFocusContext(snap.focus ?? null);
      });
    },
    [restoreFocusContext]
  );

  const handleUndo = useCallback(() => {
    flushPendingSnapshot();
    if (historyPastRef.current.length === 0) return;
    const target = historyPastRef.current.pop()!;
    /* Save the CURRENT state into future BEFORE applying so redo
       can roll us forward again. The future entry inherits the
       gesture-focus from the action being undone — when the user
       redoes, we put them back at the same focus they were using
       when they originally performed the gesture. */
    const currentForFuture: EditorSnapshot = {
      ...(historySnapshotRef.current ?? captureSnapshot()),
      focus: target.focus ?? null,
    };
    historyFutureRef.current.push(currentForFuture);
    applySnapshot(target);
    historySnapshotRef.current = target;
    setHistoryVersion((v) => v + 1);
    restoreFocusForHistoryStep(target);
  }, [
    applySnapshot,
    captureSnapshot,
    flushPendingSnapshot,
    restoreFocusForHistoryStep,
  ]);

  const handleRedo = useCallback(() => {
    flushPendingSnapshot();
    if (historyFutureRef.current.length === 0) return;
    const target = historyFutureRef.current.pop()!;
    /* Mirror of `handleUndo`: stamp the gesture-focus on the past
       entry we're about to push so a follow-up undo lands at the
       same focus the user just left. */
    const currentForPast: EditorSnapshot = {
      ...(historySnapshotRef.current ?? captureSnapshot()),
      focus: target.focus ?? null,
    };
    historyPastRef.current.push(currentForPast);
    applySnapshot(target);
    historySnapshotRef.current = target;
    setHistoryVersion((v) => v + 1);
    restoreFocusForHistoryStep(target);
  }, [
    applySnapshot,
    captureSnapshot,
    flushPendingSnapshot,
    restoreFocusForHistoryStep,
  ]);

  /* Keyboard shortcuts: Ctrl+Z (undo), Ctrl+Y / Ctrl+Shift+Z (redo).
     Mac users get Cmd-equivalents via `metaKey`. We DELIBERATELY
     intercept the shortcut even when focus is inside the prompt
     textarea — mixing native textarea undo with a custom snapshot
     stack leads to surprising desyncs (browser rolls back caret
     state but our snapshot says otherwise, etc.). Our debounced
     snapshot covers textarea bursts at the "edit session"
     granularity, which is what people actually want when they
     press Ctrl+Z after a structural change like deleting a
     variable. */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (!mod) return;
      const key = e.key.toLowerCase();
      if (key === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      } else if (key === "y" || (key === "z" && e.shiftKey)) {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleUndo, handleRedo]);

  /* Re-render-driven flags for the toolbar buttons. Reading the
     refs directly works because we bumped `historyVersion` on
     every push/pop. */
  const canUndo = historyVersion >= 0 && historyPastRef.current.length > 0;
  const canRedo = historyVersion >= 0 && historyFutureRef.current.length > 0;

  const confirmDeleteVariable = useCallback(
    (varId: string) => {
      const variable = variables.find((v) => v.id === varId);
      if (!variable) return;
      const replacement = getVariableReplacementText(variable);
      /* Positional remove — strip ONLY this variable's body slot.
         If two variables share a token (transient duplicate state),
         a global replace would erase both slots and effectively
         delete the OTHER variable's appearance from the prompt. */
      const occurrenceIndex = Math.max(
        0,
        getVariableOccurrenceIndex(variables, varId, variable.fullToken)
      );
      setPromptData((prev) => ({
        ...prev,
        body: replaceNthTokenInBody(
          prev.body,
          variable.fullToken,
          replacement,
          occurrenceIndex
        ),
      }));
      /* After deleting one variable, re-evaluate the duplicate flag
         for the survivors. Removing a clashing variable may have
         resolved a conflict that was lighting up another card's red
         border — keeping the flag stuck on a now-unique name would
         wrongly trap the user in the input. */
      setVariables((prev) => {
        const remaining = prev.filter((v) => v.id !== varId);
        return remaining.map((v) => {
          if (!v.nameDuplicateHighlighted) return v;
          const trimmed = v.name?.trim() ?? "";
          const stillClashes = trimmed
            ? !!findVariableByName(trimmed, remaining, v.id)
            : false;
          return stillClashes ? v : { ...v, nameDuplicateHighlighted: false };
        });
      });
      setUi((p) => ({
        ...p,
        variableDeleteId: null,
        selectedVariableId: p.selectedVariableId === varId ? null : p.selectedVariableId,
        variablePulsingId: p.variablePulsingId === varId ? null : p.variablePulsingId,
      }));
      /* Deleting a variable changes the prompt's variable
         structure — drop any parked verify cards because their
         snapshots include a key that no longer exists. */
      clearVersionsIfStructuralEdit();
    },
    [variables, clearVersionsIfStructuralEdit]
  );

  const handleVariableNameBlur = (varId: string) => {
    setUi((prev) => ({ ...prev, editingNameVarId: null }));
    const variable = variables.find((v) => v.id === varId);
    if (!variable) return;

    const name = variable.name?.trim() ?? "";
    if (name) {
      const existing = findVariableByName(name, variables, varId);
      if (existing) {
        setUi((p) => ({
          ...p,
          variableNameConflict: {
            editingVarId: varId,
            conflictName: name,
            existingVarId: existing.id,
          },
        }));
        return;
      }
    }

    const nameEmpty = !name;
    setVariables((prev) =>
      prev.map((v) => (v.id === varId ? { ...v, nameBlurEmpty: nameEmpty } : v))
    );

    const inner = getPromptTokenInner(variable, null);
    const newFullToken = buildFullToken(inner);
    if (newFullToken !== variable.fullToken) {
      const occurrenceIndex = Math.max(
        0,
        getVariableOccurrenceIndex(variables, varId, variable.fullToken)
      );
      setPromptData((prev) => ({
        ...prev,
        body: replaceNthTokenInBody(
          prev.body,
          variable.fullToken,
          newFullToken,
          occurrenceIndex
        ),
      }));
      setVariables((prev) =>
        prev.map((v) =>
          v.id === varId ? { ...v, fullToken: newFullToken, nameBlurEmpty: nameEmpty } : v
        )
      );
    }
  };

  /* ─── Generate Image — uses per-card snapshot for interpolation ─── */
  const handleGenerateVersion = async (versionId: number) => {
    // Get this card's snapshot to build the prompt
    const card = versions.find(v => v.id === versionId) ??
      { variableSnapshot: {} as Record<string, string> };
    const snapshot = card.variableSnapshot;
    // Per-card reference images (data URLs). When present they are fed
    // to this card's render so the verify image reflects the references.
    const cardRefs = (card as VersionCard).referenceImages ?? [];

    /* Body for the AI provider:
       1. Expand `@ImageN` mentions → "Reference image N"  (must run
          BEFORE variable substitution so the expansion isn't broken
          if a variable's value happens to contain literal "@Image").
       2. Substitute `[varName]` placeholders with their resolved
          values from the verify-card snapshot or variable defaults. */
    let previewText = expandReferenceImageMentions(promptData.body);
    variables.forEach((variable) => {
      const placeholder = `[${variable.name}]`;
      let val: string;
      if (snapshot[variable.name] !== undefined) {
        val = snapshot[variable.name];
      } else if (variable.type === "text") {
        val = (variable.defaultValue as string) || "";
      } else if (variable.type === "image") {
        val = variable.description || "";
      } else {
        val = variable.defaultValue ? variable.description : "";
      }
      previewText = previewText.split(placeholder).join(val);
    });

    if (!previewText.trim()) {
      toast({ title: "Error", description: "Please enter a prompt.", variant: "destructive" });
      return;
    }
    const isFreePrompt = promptData.type === "free-prompt";
    if (!isFreePrompt && !walletConnected) {
      setShowWalletPicker(true);
      toast({ title: "Wallet required", description: "Connect a wallet to generate with x402.", variant: "destructive" });
      return;
    }
    setVersions(prev => prev.map(v => v.id === versionId ? { ...v, status: "generating" } : v));
    try {
      let data: { imageUrl: string; provider?: string; usedGemini?: boolean };
      if (isFreePrompt) {
        const res = await fetch("/api/generate-free", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: previewText,
            resolution: "2K",
            // "Any ratio" is a prompt setting (buyer chooses) — pick a concrete
            // ratio for the author's own preview render.
            aspectRatio: ratios.selected === "Any ratio" ? "1:1" : ratios.selected,
            referenceImages: cardRefs.length ? cardRefs : undefined,
          }),
        });
        if (!res.ok) {
          const err = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(err.error || "Free generation failed");
        }
        data = await res.json() as { imageUrl: string; provider?: string; usedGemini?: boolean };
      } else {
        data = solanaConnected
          ? await generateImageWithSolana({
              prompt: previewText,
              resolution: "2K",
              chain: "solana-devnet",
            }) as { imageUrl: string; provider?: string; usedGemini?: boolean }
          : await generateImageWithPayment(
              { prompt: previewText, resolution: "2K", modelIds: models.selected, ratio: ratios.selected === "Any ratio" ? "1:1" : ratios.selected, referenceImages: cardRefs.length ? cardRefs : undefined },
              selectedChain
            ) as { imageUrl: string; provider?: string; usedGemini?: boolean };
      }
      if (!data?.imageUrl) {
        throw new Error("Image generated, but no image URL was returned.");
      }
      // Convert data URL to blob URL so browser can render large images inline
      let displayUrl = data.imageUrl;
      if (data.imageUrl.startsWith("data:")) {
        try {
          const [header, base64] = data.imageUrl.split(",");
          const mime = header.split(":")[1].split(";")[0];
          const byteChars = atob(base64);
          const bytes = new Uint8Array(byteChars.length);
          for (let i = 0; i < byteChars.length; i++) bytes[i] = byteChars.charCodeAt(i);
          displayUrl = URL.createObjectURL(new Blob([bytes], { type: mime }));
        } catch {
          displayUrl = data.imageUrl;
        }
      }
      setVersions(prev => prev.map(v => v.id === versionId ? { ...v, status: "complete", imageUrl: displayUrl } : v));
      const userKey = getUserKeyFromAccount(account);
      if (userKey && data?.imageUrl) {
        try {
          await apiRequest("POST", "/api/generations", {
            userKey, prompt: previewText, imageUrl: String(data.imageUrl),
            provider: typeof data.provider === "string" ? data.provider : "unknown",
            meta: { usedGemini: Boolean(data.usedGemini ?? false) },
          });
        } catch { /* ignore */ }
        try {
          addCreation(userKey, {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            imageUrl: data.imageUrl, prompt: previewText, createdAt: new Date().toISOString(),
          });
        } catch (storageError) {
          console.warn("Creation generated but could not be saved locally:", storageError);
        }
      }
      toast({ title: "Done", description: `Slot ${versionId} complete.` });
    } catch (error: unknown) {
      setVersions(prev => prev.map(v => v.id === versionId ? { ...v, status: "failed" } : v));
      const msg = error instanceof Error ? error.message : String(error);
      toast({ title: "Failed", description: msg || "Error generating.", variant: "destructive" });
    }
  };

  /* ─── Resolve variable default value by name ─── */
  const getVarDefault = (name: string): string => {
    const v = variables.find(x => x.name === name);
    if (!v) return name;
    if (v.type === "checkbox") return v.defaultValue ? "on" : "off";
    if (v.type === "image") return v.description || name;
    return (v.defaultValue as string) || name;
  };

  /* ─── Edit (back-arrow) — copy a verify card's snapshot into the
     variable defaults, then drop the card. Pulled out into a named
     helper so both call sites (clean overwrite path AND the
     "Yes, overwrite" branch of the confirm dialog) run exactly the
     same logic. */
  const applyVerifyCardToVariableDefaults = useCallback(
    (cardId: number) => {
      const card = versions.find((v) => v.id === cardId);
      if (!card) return;
      setVariables((prev) =>
        prev.map((v) =>
          card.variableSnapshot[v.name]
            ? { ...v, defaultValue: card.variableSnapshot[v.name] }
            : v
        )
      );
      setVersions((prev) => prev.filter((v) => v.id !== cardId));
      setUi((prev) => ({ ...prev, selectedCards: [] }));
    },
    [versions]
  );

  /* ─── Auto-lock the prompt the moment the first verify card
     appears. Verify cards are frozen products of the (prompt body
     + variable structure) tuple at push time, so any structural
     mutation afterwards would make them inconsistent. By auto-
     locking we collapse the entire "warn on every keystroke /
     warn on every variable change" requirement into a single
     gate: the user has to consciously hit Unlock (which fires a
     single confirmation dialog) before they can change anything
     structural. The defaults-edit path is unaffected — only the
     prompt body and variable add/delete/rename are frozen. ─── */
  const lastVersionsCountRef = useRef(versions.length);
  useEffect(() => {
    const wasZero = lastVersionsCountRef.current === 0;
    const nowSome = versions.length > 0;
    if (wasZero && nowSome && !ui.promptLocked) {
      setUi((p) => ({ ...p, promptLocked: true }));
      toast({
        title: "Prompt locked",
        description:
          "Variable values are still editable. Use the lock button in the Prompt header to unlock.",
      });
    }
    /* Reset the "cards cleared" toast so the user gets a fresh
       notification on the next round of structural edits. */
    if (wasZero && nowSome) {
      versionsClearedToastShownRef.current = false;
    }
    lastVersionsCountRef.current = versions.length;
    /* Only re-run when the count crosses meaningful thresholds.
       Including `ui.promptLocked` would re-fire the effect when
       the user manually unlocks even though no card was added. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [versions.length]);

  /* Lock-button click handler. Locking is non-destructive and
     immediate. Unlocking opens a confirmation dialog ONLY if
     verify cards are currently parked — otherwise it just
     unlocks. Confirmed unlock just flips the lock off; cards
     are NOT cleared at unlock time. They only get cleared if
     the user actually mutates the prompt structure afterwards
     (see `clearVersionsIfStructuralEdit` below). */
  const handleToggleLock = useCallback(() => {
    if (!ui.promptLocked) {
      setUi((p) => ({ ...p, promptLocked: true }));
      return;
    }
    if (versions.length > 0) {
      setUi((p) => ({ ...p, unlockConfirmOpen: true }));
      return;
    }
    setUi((p) => ({ ...p, promptLocked: false }));
  }, [ui.promptLocked, versions.length]);

  /* ─── Stack Variables — bridge button pushes N cards into Verify ─── */
  const handleStackVariables = () => {
    // Hard guard: never create Verify cards from an empty / whitespace-only
    // prompt. Mirrors the disabled state on the forward arrow button so
    // that no other code path (keyboard, programmatic) can sneak past.
    if (!hasSubstantivePromptBody(promptData.body)) return;
    const textVars = variables.filter(v => v.type === "text");
    const stackSize = Math.max(1, ...textVars.map(v => (v.values.length > 0 ? v.values.length : 1)));
    
    setVersions(prev => {
      // Remove failed cards to allow re-submission
      const activeVersions = prev.filter(v => v.status !== "failed");
      const baseId = activeVersions.length > 0 ? Math.max(...activeVersions.map(v => v.id)) : 0;
      const newCards: VersionCard[] = [];
      for (let i = 0; i < stackSize; i++) {
        const snapshot: Record<string, string> = {};
        variables.forEach(v => {
        if (v.type === "checkbox") {
          snapshot[v.name] = v.defaultValue ? v.description || "on" : "off";
        } else if (v.type === "image") {
          snapshot[v.name] = v.description || "";
        } else {
          const pool = v.values.length > 0 ? v.values : [(v.defaultValue as string) || v.name];
          snapshot[v.name] = pool[i % pool.length];
        }
      });
      newCards.push({ id: baseId + i + 1, variableSnapshot: snapshot, imageUrl: null, status: "idle" });
    }
    return [...activeVersions, ...newCards];
    });
  };

  /* ─── Batch Generate — assigns queue positions, fires sequentially ─── */
  const handleBatchGenerate = () => {
    const idleCards = versions.filter(v => v.status === "idle");
    if (idleCards.length === 0) {
      toast({ title: "No idle slots", description: "Stack variables first, then generate." });
      return;
    }
    const total = idleCards.length;
    // Mark all idle cards as queued with their position
    setVersions(prev => prev.map(v => {
      const pos = idleCards.findIndex(c => c.id === v.id);
      if (pos === -1) return v;
      return { ...v, status: "queued", queuePosition: pos + 1 };
    }));
    setUi(prev => ({ ...prev, queueTotal: total }));
    toast({ title: `Batch queued`, description: `${total} slot${total > 1 ? 's' : ''} queued for generation.` });
    // Fire each with stagger, clearing queue position on start
    idleCards.forEach((card, i) => {
      setTimeout(() => {
        setVersions(prev => prev.map(v => v.id === card.id ? { ...v, status: "generating", queuePosition: undefined } : v));
        handleGenerateVersion(card.id);
      }, i * 400);
    });
  };

  const handleCreateEmptySlots = () => {
    const snapshot: Record<string, string> = {};
    variables.forEach(v => { snapshot[v.name] = (v.defaultValue as string) || v.name; });
    const newId = versions.length > 0 ? Math.max(...versions.map(v => v.id)) + 1 : 1;
    setVersions(prev => [...prev, { id: newId, variableSnapshot: snapshot, imageUrl: null, status: "idle" }]);
  };

  /* ─── Pricing helpers ─── */
  const getPricePerSlot = (): number => {
    if (models.selected.length > 0 && models.available.length > 0) {
      const m = models.available.find(x => models.selected.includes(x.id));
      if (m?.price) return parseFloat(String(m.price));
    }
    return 0.10; // fallback $0.10 per image
  };

  const formatCost = (n: number): string => `$${n.toFixed(2)} USDC`;

  const getBatchCost = (slotCount: number): string =>
    formatCost(getPricePerSlot() * slotCount);

  /* `getRefillCost` was removed when re-rolling stopped being a
     paid action. The previous implementation charged 80% of the
     batch price; we now let people re-roll for free, so there's
     no cost to compute or display in the dialog / button / toast. */

  /* ─── Pay & Generate — UX shows total cost, fires sequential per-slot x402 ─── */
  const handlePayAndGenerate = () => {
    if (!walletConnected) {
      setShowWalletPicker(true);
      toast({ title: "Wallet required", description: "Connect a wallet to generate with x402.", variant: "destructive" });
      return;
    }
    const processableCards = versions.filter(v => v.status === "idle" || v.status === "failed");
    if (processableCards.length === 0) {
      toast({ title: "No slots ready", description: "Stack variables first." });
      return;
    }
    const cost = getBatchCost(processableCards.length);
    const total = processableCards.length;
    // Mark all as queued immediately
    setVersions(prev => prev.map(v => {
      const pos = processableCards.findIndex(c => c.id === v.id);
      if (pos === -1) return v;
      return { ...v, status: "queued", queuePosition: pos + 1 };
    }));
    setUi(prev => ({ ...prev, queueTotal: total }));
    toast({
      title: `Paying ${cost} for ${total} image${total > 1 ? "s" : ""}`,
      description: "Each slot will process a micro-payment via Thirdweb.",
    });
    // Fire each with 400ms stagger — each triggers its own x402 payment
    processableCards.forEach((card, i) => {
      setTimeout(() => {
        setVersions(prev => prev.map(v =>
          v.id === card.id ? { ...v, status: "generating", queuePosition: undefined } : v
        ));
        handleGenerateVersion(card.id);
      }, i * 400);
    });
  };

  /* ─── Re-roll Selected — fire Grok N times in parallel to pick a
     unique set of variable values per selected slot, then update
     each slot's `variableSnapshot` in place. The slots are reset
     to `idle` (so any prior render/queue/failure state is
     cleared), but NO image generation is kicked off — that only
     happens via Pay & Generate. Re-rolling is also free
     (previously charged 80% of batch price). ─── */
  const handleRefillAndGenerate = async (ids?: number[]) => {
    /* The action used to read directly from `ui.selectedCards`, but
       since we now route the click through a confirmation dialog
       (`selectedRerollConfirm`) the selection state may have
       drifted between "user clicked Re-roll" and "user clicked
       Yes". Accept an explicit id snapshot taken at confirm-time
       and fall back to the live selection only when called
       directly. */
    const targetIds = Array.isArray(ids) && ids.length > 0 ? ids : ui.selectedCards;
    if (targetIds.length === 0) return;

    /* Re-rolling needs at least one named text variable to ask
       Grok about. If the prompt has none, there's literally
       nothing to vary — surface a clear toast and bail. */
    const namedVars = variables.filter(
      (v) => v.type === "text" && v.name?.trim()
    );
    if (namedVars.length === 0) {
      toast({
        title: "Nothing to re-roll",
        description: "Add at least one named text variable first.",
      });
      return;
    }

    setUi((prev) => ({
      ...prev,
      isRerolling: true,
      selectedCards: [],
    }));

    try {
      /* One Grok call per slot, fired in parallel. The xAI API
         endpoint `/api/grok-fill` (model `grok-3-mini`,
         temperature 0.8) returns a JSON object of
         `{ varName: creativeValue }` per call; calling it N times
         with the same input gives us N independent answers, so
         each slot ends up with its own distinct set. */
      const promptBody = promptData.body;
      const variableNames = namedVars.map((v) => v.name);
      const responses = await Promise.all(
        targetIds.map(async () => {
          const res = await fetch("/api/grok-fill", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              prompt: promptBody,
              variables: variableNames,
            }),
          });
          if (!res.ok) throw new Error(`Grok request failed (${res.status})`);
          return (await res.json()) as Record<string, string>;
        })
      );

      setVersions((prev) =>
        prev.map((slot) => {
          const idx = targetIds.indexOf(slot.id);
          if (idx === -1) return slot;
          const fresh = responses[idx] ?? {};
          /* Build a snapshot containing only the currently-named
             variables. Anything Grok hallucinated outside that
             list is dropped; anything missing falls back to the
             variable's existing default so the snapshot is never
             partial. */
          const merged: Record<string, string> = {};
          namedVars.forEach((v) => {
            const val = fresh[v.name];
            merged[v.name] =
              typeof val === "string" && val.trim()
                ? val
                : (v.defaultValue as string) || v.name;
          });
          return {
            ...slot,
            variableSnapshot: merged,
            /* Drop any prior render artefacts. The slot is now a
               fresh idle target waiting for Pay & Generate. */
            imageUrl: null,
            status: "idle" as const,
            queuePosition: undefined,
          };
        })
      );

      toast({
        title: "Re-rolled values",
        description: `Grok picked fresh variable values for ${targetIds.length} slot${
          targetIds.length === 1 ? "" : "s"
        }. Pay & Generate to render them.`,
      });
    } catch (err) {
      console.error("Re-roll failed:", err);
      toast({
        title: "Re-roll failed",
        description: "Could not reach Grok. Try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setUi((prev) => ({ ...prev, isRerolling: false }));
    }
  };


  const toggleVersionCheckbox = (id: number) => {
    setUi(prev => ({
      ...prev,
      selectedCards: prev.selectedCards.includes(id)
        ? prev.selectedCards.filter(cid => cid !== id)
        : [...prev.selectedCards, id]
    }));
  };

  /* ─── Grok auto-fill empty variables ─── */
  const handleGrokFill = async () => {
    const emptyVars = variables.filter(v => v.type === "text" && !v.defaultValue);
    if (emptyVars.length === 0) {
      // No empty vars — just create an empty slot
      handleCreateEmptySlots();
      return;
    }
    setUi(prev => ({ ...prev, isGrokFilling: true }));
    try {
      const res = await fetch("/api/grok-fill", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: promptData.body, variables: emptyVars.map(v => v.name) }),
      });
      const filled = await res.json() as Record<string, string>;
      setVariables(prev => prev.map(v =>
        filled[v.name] ? { ...v, defaultValue: filled[v.name] } : v
      ));
      toast({ title: "Auto filled variables", description: `Filled ${Object.keys(filled).length} variable(s).` });
    } catch {
      toast({ title: "Auto fill failed", description: "Could not auto-fill. Try again.", variant: "destructive" });
    } finally {
      setUi(prev => ({ ...prev, isGrokFilling: false }));
      handleCreateEmptySlots();
    }
  };

  /* ─── Tags ─── */
  const addTag = (raw: string) => {
    const tag = raw.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
    if (!tag || promptData.tags.includes(tag)) return;
    setPromptData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
  };
  const removeTag = (tag: string) => {
    setPromptData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }));
  };

  const deleteSelectedVersions = (ids?: number[]) => {
    /* Same reasoning as `handleRefillAndGenerate` above — the
       confirmation dialog passes its snapshot of selected ids
       so the action stays correct if the live selection changed
       between dialog-open and Yes-click. */
    const targetIds = Array.isArray(ids) && ids.length > 0 ? ids : ui.selectedCards;
    if (targetIds.length === 0) return;
    setVersions(prev => prev.filter(v => !targetIds.includes(v.id)));
    setUi(prev => ({ ...prev, selectedCards: [] }));
  };

  const savePromptMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        id: ui.currentPromptId,
        title: promptData.title,
        /* Persist the canonical wording, not the editor shortcut.
           `@ImageN` is a UI affordance only; once the prompt
           leaves the editor (DB, marketplace, AI providers) it
           should always read as "Reference image N". */
        content: expandReferenceImageMentions(promptData.body),
        userId: null,
        promptType: promptData.type,
        aiModel: models.selected[0],
        tags: promptData.tags,
        variables: variables.map((v) => {
          const n = normalizeVariable(v);
          return {
            name: n.name, label: n.label, description: n.description,
            type: n.type, defaultValue: n.defaultValue, required: n.required, position: n.position,
          };
        }),
        referenceImages,
        price: promptData.type === "premium-prompt" ? promptPrice : 0,
      };
      const response = await apiRequest("POST", "/api/prompt", payload);
      const savedPrompt: unknown = await response.json();
      if (!response.ok) throw new Error("Failed to save prompt");
      if (typeof savedPrompt === "object" && savedPrompt !== null && "id" in savedPrompt) {
        setUi(prev => ({ ...prev, currentPromptId: String((savedPrompt as { id?: unknown }).id ?? "") }));
      }
      return savedPrompt;
    },
    onSuccess: () => toast({ title: "Saved", description: "Prompt saved." }),
    onError: (error: unknown) => {
      toast({ title: "Error", description: error instanceof Error ? error.message : "Save failed.", variant: "destructive" });
    },
  });

  const publishPromptMutation = useMutation({
    mutationFn: async () => {
      let id = ui.currentPromptId;
      if (!id) {
        const saved = await savePromptMutation.mutateAsync();
        if (typeof saved === "object" && saved !== null && "id" in saved) {
          id = String((saved as { id?: unknown }).id ?? "");
        }
      }
      if (!id) throw new Error("Could not save prompt before publishing");
      // Best-effort: try to mark published in DB. Don't fail the whole publish
      // action if the column/route is missing — the prompt is already saved
      // and shows on /showcase regardless.
      try {
        await apiRequest("PATCH", `/api/prompts/${id}`, { published: true });
      } catch (e) {
        console.warn("Publish PATCH failed (non-fatal):", e);
      }
      return { id };
    },
    onSuccess: ({ id }) => {
      toast({
        title: "Published",
        description: "Prompt is now live on the marketplace.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/prompts"] });
      router.push("/showcase");
    },
    onError: (error: unknown) => {
      console.error("Publish failed:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Publish failed.",
        variant: "destructive",
      });
    },
  });

  const verifiedCount = versions.filter((s) => s.imageUrl && s.status === "complete").length;
  const isPublishDisabled = verifiedCount === 0 || publishPromptMutation.isPending;
  /* Forward-arrow gate: prompt body must contain at least one real
     non-whitespace character (and not be just an empty `[bracket]`)
     before the user can push to Verify. */
  const hasPromptBody = hasSubstantivePromptBody(promptData.body);
  const allVariablesFilled =
    variables.length === 0 ||
    variables.every((v) => v.type === "checkbox" || v.defaultValue);
  const canPushToVerify = hasPromptBody && allVariablesFilled;

  const settingsPristine =
    !promptData.title.trim() &&
    promptData.tags.length === 0 &&
    models.selected.length === 0;

  const settingsMissing = {
    title: !promptData.title.trim(),
    category: promptData.tags.length === 0,
    models: models.selected.length === 0,
    price:
      promptData.type === "premium-prompt" &&
      (!promptPrice || promptPrice <= 0 || (settingsPristine && !ui.pricePerRenderReviewed)),
  };

  const hasSettingsErrors = Object.values(settingsMissing).some(Boolean);

  /** Red on rail icons only while collapsed */
  const railFieldError = (key: keyof typeof settingsMissing) =>
    ui.settingsCollapsed && settingsMissing[key];

  /** Red on inputs only after Release click while expanded */
  const fieldError = (key: keyof typeof settingsMissing) =>
    !ui.settingsCollapsed && ui.settingsReleaseAttempted && settingsMissing[key];

  const handleReleaseClick = () => {
    if (hasSettingsErrors) {
      setUi((prev) => ({ ...prev, settingsReleaseAttempted: true }));
      toast({
        title: "Settings incomplete",
        description: ui.settingsCollapsed
          ? "Open settings (gear) and fill the highlighted fields."
          : "Fill all highlighted fields before releasing.",
        variant: "destructive",
      });
      return;
    }
    publishPromptMutation.mutate();
  };

  const setSettingsSectionRef = useCallback(
    (section: SettingsSectionId) => (el: HTMLDivElement | null) => {
      if (el) settingsSectionRefs.current[section] = el;
      else delete settingsSectionRefs.current[section];
    },
    []
  );

  const handleRailSectionClick = useCallback(
    (e: React.MouseEvent, section: SettingsSectionId, options?: { pulse?: boolean }) => {
      e.stopPropagation();
      e.preventDefault();
      setUi((p) => {
        settingsExpandDelayRef.current = p.settingsCollapsed ? 300 : 0;
        return {
          ...p,
          settingsCollapsed: false,
          settingsPendingSection: section,
          settingsPulseOnNavigate: options?.pulse !== false,
        };
      });
    },
    []
  );

  const expandSettings = useCallback(() => {
    setUi((p) => ({
      ...p,
      settingsCollapsed: false,
      settingsPendingSection: null,
      settingsHighlightSection: null,
    }));
  }, []);

  const settingsSectionClass = useCallback(
    (section: SettingsSectionId, needsInput?: boolean) => {
      const base = "alg-settings-section";
      if (ui.settingsHighlightSection !== section) return base;
      return `${base} ${needsInput ? "alg-settings-section--pulse-missing" : "alg-settings-section--pulse"}`;
    },
    [ui.settingsHighlightSection]
  );

  useEffect(() => {
    if (ui.settingsCollapsed || !ui.settingsPendingSection) return;

    const section = ui.settingsPendingSection;
    const shouldPulse = ui.settingsPulseOnNavigate;
    const expandDelay = settingsExpandDelayRef.current;
    settingsExpandDelayRef.current = 0;
    let cancelled = false;
    let attempts = 0;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    let startTimer: ReturnType<typeof setTimeout> | null = null;

    const finishScroll = (el: HTMLElement, body: HTMLDivElement) => {
      body.scrollTo({ top: Math.max(0, el.offsetTop - 12), behavior: "auto" });
      setUi((p) => {
        if (p.settingsPendingSection !== section) return p;
        return {
          ...p,
          settingsPendingSection: null,
          settingsHighlightSection: shouldPulse ? section : null,
        };
      });
      if (settingsHighlightTimerRef.current) clearTimeout(settingsHighlightTimerRef.current);
      if (shouldPulse) {
        settingsHighlightTimerRef.current = setTimeout(() => {
          setUi((p) => ({ ...p, settingsHighlightSection: null }));
        }, 2000);
      }
    };

    const tryScroll = () => {
      if (cancelled) return;
      const body = settingsBodyRef.current;
      const el = settingsSectionRefs.current[section];

      if (!body || body.clientWidth < 40) {
        attempts += 1;
        if (attempts < 30) retryTimer = setTimeout(tryScroll, 50);
        return;
      }

      if (el) {
        finishScroll(el, body);
        return;
      }

      attempts += 1;
      if (attempts < 30) retryTimer = setTimeout(tryScroll, 50);
    };

    startTimer = setTimeout(tryScroll, expandDelay);

    return () => {
      cancelled = true;
      if (startTimer) clearTimeout(startTimer);
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [ui.settingsCollapsed, ui.settingsPendingSection, ui.settingsPulseOnNavigate]);

  useEffect(() => {
    return () => {
      if (settingsHighlightTimerRef.current) clearTimeout(settingsHighlightTimerRef.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (variablePulseTimerRef.current) clearTimeout(variablePulseTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const varId = pendingVarScrollRef.current;
    if (!varId) return;
    scrollVariableCardIntoView(varId);
    pendingVarScrollRef.current = null;
  }, [variables, scrollVariableCardIntoView]);

  return (
    <>
      <AlertDialog
        open={ui.variableDeleteId !== null}
        onOpenChange={(open) => {
          if (!open) setUi((p) => ({ ...p, variableDeleteId: null }));
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete variable</AlertDialogTitle>
            <AlertDialogDescription>
              {(() => {
                const target = variables.find((v) => v.id === ui.variableDeleteId);
                const label = target ? getVariableDeleteLabel(target) : "this variable";
                return `Are you sure you want to delete the variable '${label}'?`;
              })()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (ui.variableDeleteId) confirmDeleteVariable(ui.variableDeleteId);
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* "Review parked verify card?" — fires whenever the user
          clicks the back-arrow to send a parked verify card's
          snapshot back into the variable defaults. The action is
          always destructive in two ways:
            1. It overwrites the user's current variable values
               with the snapshot from the card (which IS the
               point — the user wants to review/adjust those
               specific values).
            2. It deletes the card from the Verify panel, since
               the card has been "consumed" back into the
               editable column.
          The dialog spells both out so the user can't be
          surprised by either side-effect. */}
      <AlertDialog
        open={ui.editOverwriteConfirmCardId !== null}
        onOpenChange={(open) => {
          if (!open)
            setUi((p) => ({ ...p, editOverwriteConfirmCardId: null }));
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Review parked verify card?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                <p style={{ margin: 0 }}>
                  This will overwrite your current variable values with the
                  values from the selected verify card so you can review
                  and adjust them.
                </p>
                <p style={{ margin: "6px 0 0 0" }}>
                  The card will be removed from the Verify panel.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const cardId = ui.editOverwriteConfirmCardId;
                setUi((p) => ({ ...p, editOverwriteConfirmCardId: null }));
                if (cardId !== null) {
                  applyVerifyCardToVariableDefaults(cardId);
                }
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Unlock confirmation. Fired only when the user clicks the
          lock button to UNLOCK while at least one verify card
          exists. Locking itself is non-destructive and never
          shows a dialog.

          KEY DESIGN DECISION (per user spec):
            Unlocking does NOT immediately discard the parked
            verify cards. The user can unlock just to look around
            or to verify what the prompt is and re-lock without
            losing anything. Cards only get cleared if the user
            ACTUALLY mutates the prompt structure afterwards —
            see `clearVersionsIfStructuralEdit` calls inside the
            mutation entry points (textarea onChange, variable
            add / rename / delete). The single popup at unlock
            time covers the trade-off, so we don't need a second
            confirmation on first mutation. */}
      <AlertDialog
        open={ui.unlockConfirmOpen}
        onOpenChange={(open) => {
          if (!open) setUi((p) => ({ ...p, unlockConfirmOpen: false }));
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unlock prompt?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              {(() => {
                const n = versions.length;
                return (
                  <div>
                    <p style={{ margin: 0 }}>
                      Unlocking lets you edit the prompt body and the
                      variable structure (add, rename, or delete variables).
                    </p>
                    <p style={{ margin: "6px 0 0 0" }}>
                      You currently have {n} parked verify card{n === 1 ? "" : "s"}.
                      If you change anything structural, they&apos;ll be
                      discarded automatically because they wouldn&apos;t match
                      the new prompt anymore. If you just look around and
                      re-lock without changing anything, the cards stay.
                    </p>
                  </div>
                );
              })()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setUi((p) => ({
                  ...p,
                  promptLocked: false,
                  unlockConfirmOpen: false,
                }));
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm "Delete selected slots" — fired by the trash-can
          button in the multi-select action bar. Shape matches the
          other Yes/No destructive dialogs in this component
          (Delete variable, Overwrite defaults) so the user gets a
          consistent confirmation pattern across the editor. We
          render the count in the description so the user can see
          exactly how many slots they're about to discard. */}
      <AlertDialog
        open={ui.selectedDeleteConfirm !== null}
        onOpenChange={(open) => {
          if (!open) setUi((p) => ({ ...p, selectedDeleteConfirm: null }));
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete selected slots?</AlertDialogTitle>
            <AlertDialogDescription>
              {(() => {
                const n = ui.selectedDeleteConfirm?.ids.length ?? 0;
                return `This will permanently remove ${n} render slot${
                  n === 1 ? "" : "s"
                } from this prompt.`;
              })()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const snap = ui.selectedDeleteConfirm;
                setUi((p) => ({ ...p, selectedDeleteConfirm: null }));
                if (snap) deleteSelectedVersions(snap.ids);
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Confirm "Re-roll values" — fired by the re-roll button in
          the multi-select action bar. Re-rolling is a free action
          (no micro-payment) AND a NON-generating action: it only
          shuffles the variable values per slot via Grok. Image
          generation still has to be triggered explicitly through
          Pay & Generate. The dialog body spells both points out
          on separate lines so the user understands exactly what
          the action does (and what it doesn't). */}
      <AlertDialog
        open={ui.selectedRerollConfirm !== null}
        onOpenChange={(open) => {
          if (!open) setUi((p) => ({ ...p, selectedRerollConfirm: null }));
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Re-roll values for selected slots?</AlertDialogTitle>
            <AlertDialogDescription asChild>
              {(() => {
                const n = ui.selectedRerollConfirm?.ids.length ?? 0;
                return (
                  <div>
                    <p style={{ margin: 0 }}>
                      Grok will pick a fresh set of variable values for {n} slot
                      {n === 1 ? "" : "s"} so each one is unique.
                    </p>
                    <p style={{ margin: "6px 0 0 0" }}>
                      No images are generated — the slots just get new values
                      and reset to idle. Use Pay &amp; Generate to render them.
                    </p>
                  </div>
                );
              })()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const snap = ui.selectedRerollConfirm;
                setUi((p) => ({ ...p, selectedRerollConfirm: null }));
                if (snap) handleRefillAndGenerate(snap.ids);
              }}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={ui.variableNameConflict !== null}
        onOpenChange={(open) => {
          /* Do NOT clear the conflict on auto-close. The user MUST
             pick one of the two action buttons, both of which call
             setUi(...variableNameConflict: null) themselves. We
             also block ESC + outside-click below so this branch is
             effectively unreachable, but keeping the guard here
             makes the trap robust against any future Radix changes
             that might trigger onOpenChange spuriously. */
          if (open) return;
          if (ui.variableNameConflict !== null) return;
        }}
      >
        <AlertDialogContent
          /* Hard-modal: blocks ESC dismissal so the user can't
             bypass the conflict resolution. Radix AlertDialog
             already ignores outside-clicks by design, so blocking
             ESC is the only escape hatch we need to close. Either
             "Apply" (adopt the existing variable's token) or
             "Create new name" (auto-rename to a unique label) MUST
             be clicked — both routes guarantee all variables end
             up with distinct names before the input is allowed to
             lose focus. */
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Variable name already exists</AlertDialogTitle>
            <AlertDialogDescription asChild>
              {(() => {
                const name = ui.variableNameConflict?.conflictName ?? "";
                return (
                  <div>
                    <p style={{ margin: 0 }}>
                      Variable &quot;{name}&quot; already exists.
                    </p>
                    <p style={{ margin: "6px 0 0 0" }}>
                      Apply the existing variable&apos;s value or create a
                      new unique name.
                    </p>
                  </div>
                );
              })()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:flex-row sm:justify-end sm:gap-2">
            <AlertDialogCancel
              onClick={() => {
                const c = ui.variableNameConflict;
                if (c) createNewVariableNameFromConflict(c.editingVarId, c.conflictName);
              }}
            >
              Create new name
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const c = ui.variableNameConflict;
                if (c) adoptExistingVariableName(c.editingVarId, c.existingVarId);
              }}
            >
              {ui.variableNameConflict
                ? `Apply "${ui.variableNameConflict.conflictName}"`
                : "Apply variable"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* "Variable names required" alert — fired by the forward-arrow
          click handler when at least one variable still has an empty
          name. The dialog deliberately has a different shape than the
          other (Yes/No) confirmation dialogs in this file:
            • Single visual focus point: a soft-orange warning badge
              with an alert glyph at the top, centered.
            • Title is the only on-screen prose (verbatim per design
              request) — centered to read like a clean callout.
            • One full-width primary action ("Ok") centered in the
              footer, no Cancel because there's nothing to cancel.
          Description is rendered as `sr-only` so screen readers still
          get a sentence (Radix would warn otherwise). */}
      <AlertDialog
        open={ui.variableNameMissingAlertOpen}
        onOpenChange={(open) => {
          if (!open)
            setUi((p) => ({ ...p, variableNameMissingAlertOpen: false }));
        }}
      >
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader className="items-center sm:text-center">
            <div
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
              style={{
                background: "rgba(199, 102, 58, 0.14)",
              }}
            >
              <AlertTriangle size={26} color="#c7663a" strokeWidth={2.25} />
            </div>
            <AlertDialogTitle className="text-center text-xl font-semibold leading-snug">
              Please set up all variable names first!
            </AlertDialogTitle>
            <AlertDialogDescription className="sr-only">
              One or more variables have no name yet. Press Ok to highlight them.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction
              className="min-w-[140px]"
              onClick={() => {
                setVariables((prev) =>
                  prev.map((v) =>
                    !v.name.trim()
                      ? { ...v, nameMissingHighlighted: true }
                      : v
                  )
                );
                setUi((p) => ({
                  ...p,
                  variableNameMissingAlertOpen: false,
                }));
              }}
            >
              Ok
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    <div className="alg-page" onClick={() => { setUi(prev => ({ ...prev, showAvatarDropdown: false, tooltip: null })) }}>
      <WalletPickerModal open={showWalletPicker} onClose={() => setShowWalletPicker(false)} />

      {/* ═══ 4-COLUMN GRID ═══ */}
      <div className={`alg-grid desktop-only ${ui.settingsCollapsed ? "alg-grid--settings-collapsed" : ""}`}>

        {/* ═══ PANEL 01 — Settings ═══ */}
        <section className={`alg-panel alg-panel--settings ${ui.settingsCollapsed ? "alg-panel--settings-collapsed" : ""}`}>
          <div className={`alg-panel__header alg-panel__header--settings ${ui.settingsCollapsed ? "alg-panel__header--settings-collapsed" : ""}`}>
            <div className="alg-settings-header__left">
              <span className="alg-panel__number">01</span>
              {ui.settingsCollapsed ? (
                <button
                  type="button"
                  className={`alg-settings-gear-btn ${hasSettingsErrors ? "alg-settings-gear-btn--alert" : ""}`}
                  aria-label="Open settings"
                  onClick={(e) => {
                    e.stopPropagation();
                    expandSettings();
                  }}
                >
                  <Settings size={16} />
                </button>
              ) : (
                <span className="alg-panel__title">Settings</span>
              )}
            </div>
            {!ui.settingsCollapsed && (
              <button
                type="button"
                className="alg-settings-collapse-btn"
                aria-label="Collapse settings"
                onClick={(e) => {
                  e.stopPropagation();
                  setUi((p) => ({ ...p, settingsCollapsed: true }));
                }}
              >
                <ChevronLeft size={16} />
              </button>
            )}
          </div>
          <div className="alg-settings-rail">
              <button type="button" className={`alg-settings-rail__btn ${railFieldError("title") ? "alg-field--missing" : ""}`} title="Prompt title" onClick={(e) => handleRailSectionClick(e, "title")}><Type size={16} /></button>
              <button type="button" className={`alg-settings-rail__btn ${railFieldError("category") ? "alg-field--missing" : ""}`} title="Category" onClick={(e) => handleRailSectionClick(e, "category")}><Tags size={16} /></button>
              <button type="button" className={`alg-settings-rail__btn ${railFieldError("models") ? "alg-field--missing" : ""}`} title="Models" onClick={(e) => handleRailSectionClick(e, "models")}><Cpu size={16} /></button>
              <button type="button" className="alg-settings-rail__btn" title="Ratio" onClick={(e) => handleRailSectionClick(e, "ratio", { pulse: false })}><Ratio size={16} /></button>
              <button type="button" className="alg-settings-rail__btn" title="Reference images" onClick={(e) => handleRailSectionClick(e, "references", { pulse: false })}><ImageIcon size={16} /></button>
              <button type="button" className={`alg-settings-rail__btn ${railFieldError("price") ? "alg-field--missing" : ""}`} title="Price per render" onClick={(e) => handleRailSectionClick(e, "price")}><DollarSign size={16} /></button>
          </div>
          <div
            ref={settingsBodyRef}
            className="alg-panel__body"
            aria-hidden={ui.settingsCollapsed}
          >
            <div ref={setSettingsSectionRef("title")} className={settingsSectionClass("title", settingsMissing.title)}>
            <div className="alg-label" style={{ marginTop: 0 }}>PROMPT TITLE</div>
            <input
              className={`alg-input alg-input--title ${fieldError("title") ? "alg-field--missing" : ""}`}
              value={promptData.title}
              onChange={(e) => setPromptData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Untitled Prompt"
            />
            </div>

            {/* Display Mode */}
            <div className="alg-label">DISPLAY MODE</div>
            <div
              className={`alg-mode-card ${promptData.type === "free-prompt" ? "alg-mode-card--active" : ""}`}
              onClick={() => setPromptData(prev => ({ ...prev, type: "free-prompt" }))}
            >
              <div className="alg-mode-card__title">Free prompt</div>
              <div className="alg-mode-card__desc">Open the full prompt · anyone can copy & remix it</div>
            </div>
            <div
              className={`alg-mode-card ${promptData.type === "premium-prompt" ? "alg-mode-card--active" : ""}`}
              onClick={() => {
                setPromptData((prev) => ({ ...prev, type: "premium-prompt" }));
                setUi((p) => ({ ...p, pricePerRenderReviewed: false }));
              }}
            >
              <div className="alg-mode-card__title">Premium prompt</div>
              <div className="alg-mode-card__desc">Body locked · buyer fills variables and pays per render</div>
            </div>

            <div className="alg-divider" />

            <div ref={setSettingsSectionRef("category")} className={settingsSectionClass("category", settingsMissing.category)}>
            <div className="alg-label">CATEGORY</div>
            <div className={`alg-tag-input-wrap ${fieldError("category") ? "alg-field--missing" : ""}`}>
              <div className="alg-tag-chips">
                {promptData.tags.map(tag => (
                  <span key={tag} className="alg-tag-chip">
                    {tag}
                    <button className="alg-tag-chip__remove" onClick={() => removeTag(tag)}>×</button>
                  </span>
                ))}
              </div>
              {/* Category is picked from the same set of categories shown
                  as filters on the main feed page (see ENKI_CATEGORIES).
                  Single-select: picking a category replaces the current
                  one; picking the active one clears it. */}
              <Popover open={catOpen} onOpenChange={setCatOpen}>
                <PopoverTrigger asChild>
                  <button type="button" className="alg-category-select">
                    <span className="alg-category-select__label">
                      {promptData.tags.length ? "Change category" : "Select a category"}
                    </span>
                    <ChevronDown size={14} strokeWidth={2} />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  side="bottom"
                  className="alg-category-popover z-[120] w-[var(--radix-popover-trigger-width)] min-w-[180px] border-[var(--alg-border)] bg-[var(--alg-panel)] p-1 text-[var(--alg-text)] shadow-lg"
                >
                  {ENKI_CATEGORIES.map((label) => {
                    const selected = promptData.tags.includes(label.toLowerCase());
                    return (
                      <button
                        key={label}
                        type="button"
                        className={`alg-category-option ${selected ? "alg-category-option--active" : ""}`}
                        onClick={() => {
                          // Single-select: replace any existing category with
                          // this one (or clear it if it's already active).
                          setPromptData((prev) => ({
                            ...prev,
                            tags: selected ? [] : [label.toLowerCase()],
                          }));
                          setCatOpen(false);
                        }}
                      >
                        <span>{label}</span>
                        {selected && <Check size={14} strokeWidth={2.5} />}
                      </button>
                    );
                  })}
                </PopoverContent>
              </Popover>
            </div>
            </div>

            <div className="alg-divider" />

            <div ref={setSettingsSectionRef("models")} className={settingsSectionClass("models", settingsMissing.models)}>
            <div className="alg-label">
              <span>PREFERRED MODELS</span>
              <span style={{ fontSize: 10, color: "var(--alg-hint)", textTransform: 'lowercase', letterSpacing: 0, fontWeight: 500 }}>multi-select</span>
            </div>
            <div className={fieldError("models") ? "alg-field--missing-block" : undefined}>
            {models.available.length === 0 ? (
              <div style={{ fontSize: 13, color: "var(--alg-muted)" }}>No models available</div>
            ) : (
              models.available.map((model) => {
                const isActive = models.selected.includes(model.id);
                return (
                  <div
                    key={model.id}
                    className={`alg-model-card ${isActive ? "alg-model-card--active" : ""}`}
                    onClick={() => toggleModel(model.id)}
                  >
                    <span className="alg-model-card__name">
                      {model.name}
                    </span>
                    <span className="alg-model-card__price">${model.price.toFixed(2)}</span>
                  </div>
                );
              })
            )}
            </div>
            </div>

            <div className="alg-divider" />

            <div ref={setSettingsSectionRef("ratio")} className={settingsSectionClass("ratio", false)}>
            <div className="alg-label">PREFERRED RATIO</div>
            <div className="alg-ratio-group">
              {allPossibleRatios.map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    className={`alg-ratio-pill ${ratios.selected === ratio ? "alg-ratio-pill--active" : ""}`}
                    onClick={() => setRatios(prev => ({ ...prev, selected: ratio }))}
                  >
                    {ratio}
                  </button>
              ))}
            </div>
            <p className="alg-hint-text">Buyer picks the ratio at render time.</p>
            </div>

            <div className="alg-divider" />

            <div ref={setSettingsSectionRef("references")} className={settingsSectionClass("references", false)}>
            <div className="alg-label">
              <span>REFERENCE IMAGES</span>
            </div>

            {/* Prompt-relevant reference images — the prompt author's
                own example images, attached to the prompt itself.
                Lives here in Settings (not in the Variables panel)
                because the data is part of the prompt definition,
                not a per-render input the buyer chooses. */}
            <div className="alg-settings-box">
              <div className="alg-label" style={{ marginTop: 0 }}>PROMPT RELEVANT REFERENCE IMAGES</div>
              <div
                className={`alg-ref-zone${externalDragActive ? " alg-ref-zone--drop-active" : ""}`}
                onDragEnter={handleRefZoneDragEnter}
                onDragLeave={handleRefZoneDragLeave}
                onDragOver={handleRefZoneDragOver}
                onDrop={handleRefZoneDrop}
              >
                <div className="alg-ref-row">
                  <button
                    type="button"
                    className="alg-ref-add"
                    aria-label="Add reference images"
                    title="Click or drag images here for reference"
                    disabled={referenceImages.length >= ui.maxImages}
                    onClick={(e) => {
                      e.stopPropagation();
                      pickReferenceImages();
                    }}
                  >
                    <Plus size={16} />
                  </button>
                  {referenceImages.length === 0 && (
                    <span
                      className={`alg-ref-hint${externalDragActive ? " alg-ref-hint--drop" : ""}`}
                    >
                      {externalDragActive
                        ? "Drop here to add as image #1"
                        : "Click or drag images here for reference"}
                    </span>
                  )}
                  {referenceImages.length > 0 && (
                    /* Cascading card-stack — each slot overlaps the
                       previous one by a fixed offset (see CSS for the
                       `--alg-ref-overlap` math). Hovering or focusing a
                       slot lifts it via z-index so its remove button
                       stays reachable even when buried under others. */
                    <div className="alg-ref-stack">
                      {referenceImages.map((src, idx) => {
                        const isDragging = refImageDrag.from === idx;
                        const isDropTarget =
                          refImageDrag.from !== null &&
                          refImageDrag.over === idx &&
                          refImageDrag.from !== idx;
                        return (
                          <div
                            key={`${idx}-${src.slice(0, 32)}`}
                            className={`alg-ref-slot${isDragging ? " alg-ref-slot--dragging" : ""}${isDropTarget ? " alg-ref-slot--drop-target" : ""}`}
                            draggable
                            role="button"
                            tabIndex={0}
                            aria-label={`Open reference image ${idx + 1}`}
                            onClick={(e) => {
                              /* HTML5 DnD suppresses the trailing
                                 click after a real drag, so this
                                 only fires for plain mouse-clicks
                                 (and keyboard activation below). */
                              e.stopPropagation();
                              setRefPreviewDirection("init");
                              setRefPreviewIndex(idx);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setRefPreviewDirection("init");
                                setRefPreviewIndex(idx);
                              }
                            }}
                            onDragStart={(e) => {
                              setRefImageDrag({ from: idx, over: idx });
                              e.dataTransfer.effectAllowed = "move";
                              e.dataTransfer.setData("text/plain", String(idx));
                            }}
                            onDragEnd={() => setRefImageDrag({ from: null, over: null })}
                            onDragOver={(e) => {
                              if (refImageDrag.from === null) return;
                              e.preventDefault();
                              e.stopPropagation();
                              e.dataTransfer.dropEffect = "move";
                              setRefImageDrag((d) =>
                                d.from !== null && d.over !== idx ? { ...d, over: idx } : d
                              );
                            }}
                            onDrop={(e) => {
                              if (refImageDrag.from === null) return;
                              e.preventDefault();
                              e.stopPropagation();
                              const from = Number.parseInt(e.dataTransfer.getData("text/plain"), 10);
                              if (!Number.isNaN(from)) reorderReferenceImages(from, idx);
                              setRefImageDrag({ from: null, over: null });
                            }}
                          >
                            <img src={src} alt={`Reference ${idx + 1}`} draggable={false} />
                            <button
                              type="button"
                              className="alg-ref-slot__remove"
                              aria-label="Remove reference image"
                              onMouseDown={(e) => e.stopPropagation()}
                              onClick={(e) => {
                                e.stopPropagation();
                                setReferenceImages((prev) => prev.filter((_, i) => i !== idx));
                              }}
                            >
                              ×
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                {/* Drop-position enumeration — only rendered while a
                    drag is actually happening (external file drag OR
                    internal reorder). Sits at the bottom of the zone
                    so it never affects the row's resting height. */}
                {(externalDragActive || refImageDrag.from !== null) && (
                  <div className="alg-ref-zone__meta">
                    {externalDragActive
                      ? `Drop here to add as image #${referenceImages.length + 1}`
                      : refImageDrag.over !== null
                        ? `Move to position #${refImageDrag.over + 1}`
                        : ""}
                  </div>
                )}
              </div>
            </div>

            {/* MAX USER IMAGES — separate concern from the author's
                reference images above. Controls how many images each
                BUYER may upload at render time, hence the rename. */}
            <div className="alg-settings-box" style={{ marginTop: 12 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontSize: 9, fontFamily: "var(--alg-font-mono)", color: "var(--alg-hint)", letterSpacing: "0.05em" }}>MAX USER IMAGES</span>
                {/* Same molded-stepper + per-digit roll animation
                    pattern as the price input, scaled down for the
                    integer 1..10 range. The − and + buttons share a
                    single rounded container with one shared
                    horizontal divider; the value rolls via a keyed
                    span only on button-driven changes. */}
                {(() => {
                  const valueStr = String(ui.maxImages);
                  const prevStr = maxImagesRollDir
                    ? String(prevMaxImagesRollSnapshotRef.current)
                    : valueStr;
                  let diffIdx = valueStr.length;
                  const minLen = Math.min(valueStr.length, prevStr.length);
                  for (let i = 0; i < minLen; i++) {
                    if (valueStr[i] !== prevStr[i]) {
                      diffIdx = i;
                      break;
                    }
                  }
                  if (
                    valueStr.length !== prevStr.length &&
                    diffIdx === valueStr.length
                  ) {
                    diffIdx = minLen;
                  }
                  const stable = valueStr.substring(0, diffIdx);
                  const changing = valueStr.substring(diffIdx);
                  return (
                    <div className="alg-int-stepper">
                      <button
                        type="button"
                        className="alg-int-stepper__btn"
                        aria-label="Decrease max user images"
                        onClick={() => handleMaxImagesStep(-1)}
                      >
                        −
                      </button>
                      <span
                        className="alg-int-stepper__value"
                        aria-live="polite"
                      >
                        {stable && (
                          <span className="alg-int-stepper__digits-stable">
                            {stable}
                          </span>
                        )}
                        {changing && (
                          <span
                            key={
                              maxImagesRollDir
                                ? `roll-${maxImagesRollKeyRef.current}`
                                : `stable-${changing}`
                            }
                            className={`alg-int-stepper__digits-changing${
                              maxImagesRollDir
                                ? ` alg-int-stepper__digits-changing--${maxImagesRollDir}`
                                : ""
                            }`}
                          >
                            {changing}
                          </span>
                        )}
                      </span>
                      <button
                        type="button"
                        className="alg-int-stepper__btn"
                        aria-label="Increase max user images"
                        onClick={() => handleMaxImagesStep(1)}
                      >
                        +
                      </button>
                    </div>
                  );
                })()}
              </div>
              <p className="alg-hint-text" style={{ margin: 0 }}>
                Buyers can upload an image — or pick an NFT from their wallet — up to {ui.maxImages} per render.
              </p>
            </div>
            </div>

            <div className="alg-divider" style={{ marginTop: 24, marginBottom: 24 }} />

            <div ref={setSettingsSectionRef("price")} className={settingsSectionClass("price", settingsMissing.price)}>
            <div className="alg-label">PRICING</div>
            {promptData.type === "premium-prompt" ? (
              <div className={`alg-settings-box ${fieldError("price") ? "alg-field--missing" : ""}`}>
                <div className="alg-label" style={{ marginTop: 0 }}>PRICE PER RENDER (USD)</div>
                {/* Custom number input.
                    Architecture:
                      - The wrapping `__field-wrap` carries the
                        bottom-border underline, NOT the <input>.
                        That way the underline never moves when the
                        roll animation plays — only the digits do.
                      - The real <input> is rendered with TRANSPARENT
                        text + a visible caret; it receives clicks
                        and keyboard input, but doesn't draw glyphs.
                      - The visual layer ABOVE the input renders the
                        formatted value as two spans: a stable
                        prefix (digits that didn't change) and an
                        animated suffix (digits that did). Only the
                        suffix gets the slide-in keyframe — exactly
                        the slot-machine effect the user requested.
                      - When the user FOCUSES the field to type, the
                        visual layer hides and the input's text
                        becomes opaque so they can see what they're
                        editing.
                    Buttons are stacked vertically inside a single
                    rounded container with one shared inner divider
                    so the seam between ▲ and ▼ reads as molded. */}
                {(() => {
                  const formatPrice = (n: number) =>
                    !n
                      ? ""
                      : n.toLocaleString(undefined, {
                          minimumFractionDigits: 4,
                          maximumFractionDigits: 4,
                        });
                  const valueStr = formatPrice(promptPrice || 0);
                  const prevStr = priceRollDir
                    ? formatPrice(prevPriceRollSnapshotRef.current || 0)
                    : valueStr;
                  let diffIdx = valueStr.length;
                  const minLen = Math.min(valueStr.length, prevStr.length);
                  for (let i = 0; i < minLen; i++) {
                    if (valueStr[i] !== prevStr[i]) {
                      diffIdx = i;
                      break;
                    }
                  }
                  if (
                    valueStr.length !== prevStr.length &&
                    diffIdx === valueStr.length
                  ) {
                    diffIdx = minLen;
                  }
                  const stable = valueStr.substring(0, diffIdx);
                  const changing = valueStr.substring(diffIdx);
                  return (
                    <div
                      className="alg-num-input"
                      style={{ marginTop: 8 }}
                    >
                      <div className="alg-num-input__field-wrap">
                        <input
                          type="text"
                          inputMode="decimal"
                          className="alg-input alg-num-input__field"
                          style={{ fontSize: 14 }}
                          value={priceText}
                          onChange={(e) => {
                            // Allow only digits and a single decimal point so
                            // "0", "0.", and "0.05" can all be typed freely.
                            let raw = e.target.value.replace(/[^0-9.]/g, "");
                            const firstDot = raw.indexOf(".");
                            if (firstDot !== -1) {
                              raw =
                                raw.slice(0, firstDot + 1) +
                                raw.slice(firstDot + 1).replace(/\./g, "");
                            }
                            setPriceText(raw);
                            const n = parseFloat(raw);
                            setPromptPrice(Number.isFinite(n) ? n : 0);
                            setUi((p) => ({ ...p, pricePerRenderReviewed: true }));
                          }}
                          onFocus={() =>
                            setUi((p) => ({ ...p, pricePerRenderReviewed: true }))
                          }
                        />
                        <div
                          className="alg-num-input__visual"
                          aria-hidden="true"
                        >
                          {valueStr === "" ? (
                            <span className="alg-num-input__placeholder">
                              0.0000
                            </span>
                          ) : (
                            <>
                              {stable && (
                                <span className="alg-num-input__digits-stable">
                                  {stable}
                                </span>
                              )}
                              {changing && (
                                <span
                                  key={
                                    priceRollDir
                                      ? `roll-${priceRollKeyRef.current}`
                                      : `stable-${changing}`
                                  }
                                  className={`alg-num-input__digits-changing${
                                    priceRollDir
                                      ? ` alg-num-input__digits-changing--${priceRollDir}`
                                      : ""
                                  }`}
                                >
                                  {changing}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div className="alg-num-input__buttons" aria-hidden="true">
                        <button
                          type="button"
                          className="alg-num-input__btn"
                          aria-label="Increase price"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handlePriceStep(0.0001)}
                        >
                          <ChevronUp size={12} strokeWidth={2.5} />
                        </button>
                        <button
                          type="button"
                          className="alg-num-input__btn"
                          aria-label="Decrease price"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handlePriceStep(-0.0001)}
                        >
                          <ChevronDown size={12} strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>
                  );
                })()}
                <p className="alg-hint-text" style={{ margin: "8px 0 0" }}>
                  Buyers pay this amount each time they run your premium prompt.
                </p>
              </div>
            ) : (
              <div className="alg-settings-box">
                <p className="alg-hint-text" style={{ margin: 0, fontSize: 11, color: "var(--alg-muted)" }}>
                  Free prompts cost nothing to use.<br />Buyers run the prompt with their own API credits.
                </p>
              </div>
            )}
            </div>
            <div style={{ height: 24, flexShrink: 0 }} />
          </div>
        </section>

        {/* ═══ PANEL 02 — Prompt ═══ */}
        <section className="alg-panel alg-panel--prompt">
          <div className="alg-panel__header">
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span className="alg-panel__number">02</span>
              <span className="alg-panel__title">Prompt</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Undo / Redo — minimal icon-only buttons that share
                  the lock button's chrome but compress to square
                  so the toolbar stays tight. Disabled state mirrors
                  the underlying stack lengths. Tooltips spell out
                  the keyboard shortcuts so power users don't have
                  to discover Ctrl+Z / Ctrl+Y by accident. */}
              <button
                type="button"
                className="alg-prompt-history-btn"
                onClick={handleUndo}
                disabled={!canUndo}
                aria-label="Undo"
                title={
                  canUndo
                    ? "Undo (Ctrl+Z)"
                    : "Nothing to undo"
                }
              >
                <Undo2 size={13} />
              </button>
              <button
                type="button"
                className="alg-prompt-history-btn"
                onClick={handleRedo}
                disabled={!canRedo}
                aria-label="Redo"
                title={
                  canRedo
                    ? "Redo (Ctrl+Y)"
                    : "Nothing to redo"
                }
              >
                <Redo2 size={13} />
              </button>
              {/* Lock toggle.
                  - Closed lock = locked, prompt body is read-only
                    and variable structure is frozen.
                  - Open lock   = unlocked, full edit access.
                  Click semantics:
                    locked -> click -> unlock dialog (if cards
                                       exist) OR instant unlock.
                    unlocked -> click -> instant lock.
                  See `handleToggleLock` for the full flow. */}
              <button
                type="button"
                className={`alg-prompt-lock-btn${
                  ui.promptLocked ? " alg-prompt-lock-btn--locked" : ""
                }`}
                onClick={handleToggleLock}
                aria-pressed={ui.promptLocked}
                aria-label={
                  ui.promptLocked ? "Unlock prompt" : "Lock prompt"
                }
                title={
                  ui.promptLocked
                    ? "Prompt is locked. Click to unlock — your parked verify cards will be discarded so you can edit the prompt structure."
                    : "Lock the prompt. The body and variable structure freeze; only variable values stay editable."
                }
              >
                {ui.promptLocked ? <Lock size={13} /> : <LockOpen size={13} />}
                <span>{ui.promptLocked ? "Locked" : "Lock"}</span>
              </button>
              <button
                className="alg-btn alg-btn--ghost alg-btn--sm"
                onClick={handleVariableButtonClick}
                disabled={ui.promptLocked}
                title={
                  ui.promptLocked
                    ? "Unlock the prompt to add variables."
                    : undefined
                }
              >
                <Plus size={14} /> Variable
              </button>
            </div>
          </div>
          <div className="alg-panel__body alg-panel__body--workspace">
            {/* Tooltip — only show "Create Variable" when the prompt
                is unlocked. While locked, selecting text shouldn't
                offer a variable-creation affordance because creating
                one would mutate the variable structure (which is
                frozen). */}
            {ui.tooltip && !ui.promptLocked && (
              <div
                className="alg-tooltip"
                style={{ left: ui.tooltip.x, top: ui.tooltip.y }}
                onClick={(e) => { e.stopPropagation(); createVariableFromSelection(); }}
              >
                <Plus size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} /> Create Variable
              </div>
            )}

            {/* Textarea with overlay */}
            {/* Textarea with overlay box */}
            <div
              className={`alg-textarea-box${
                ui.promptLocked ? " alg-textarea-box--locked" : ""
              }`}
              ref={textareaBoxRef}
            >
              <textarea
                ref={textareaRef}
                className="alg-textarea"
                style={{
                  color: promptData.body.length > 0 ? "transparent" : undefined,
                  // WebKit/iOS does not reliably hide textarea glyphs with
                  // `color: transparent` alone — the real text bleeds through and
                  // overlaps the highlight overlay (the "doubled text" artifact).
                  // Force the text fill transparent too; the caret stays visible
                  // via caretColor.
                  WebkitTextFillColor: promptData.body.length > 0 ? "transparent" : undefined,
                  caretColor: "var(--alg-text)",
                }}
                value={promptData.body}
                readOnly={ui.promptLocked}
                onChange={(e) => {
                  const newBody = e.target.value;
                  setPromptData((prev) => ({ ...prev, body: newBody }));
                  /* The user has unlocked the prompt and is now
                     typing — drop any parked verify cards because
                     they were captured against a different prompt
                     body and would otherwise render under a
                     mismatched tooltip when the user pushes again. */
                  clearVersionsIfStructuralEdit();
                  /* Re-evaluate the @-mention state on every
                     keystroke. The detector returns null whenever
                     the caret leaves the active @<query> token,
                     which is our cue to close the dropdown. */
                  const caret = e.target.selectionStart ?? newBody.length;
                  const m = detectMentionAtCaret(newBody, caret);
                  if (m && referenceImages.length > 0) {
                    /* Anchor the dropdown SYNCHRONOUSLY in the same
                       render that flips `mention.open`. Without this
                       we'd render once with open=true but anchor=null
                       (gated out), then rely on a useEffect to set
                       the anchor on the NEXT frame — a noticeable
                       lag where the very first `@` would seemingly
                       do nothing until you typed another character. */
                    const coords = getCaretCoordinates(e.target, m.startPos);
                    setMentionAnchor({
                      top: coords.top + coords.height + 4,
                      left: coords.left,
                      width: 0,
                    });
                    /* Bug fix: also gate on `prev.open`. Previously
                       this returned `prev` whenever (startPos, query)
                       matched — but if prev.open was false (e.g. the
                       user closed the dropdown via Escape/blur, then
                       deleted back to a bare `@` at the same
                       position with empty query), the early return
                       would keep open=false and the dropdown would
                       silently refuse to reappear until they typed
                       another char that changed the query. */
                    setMention((prev) =>
                      prev.open &&
                      prev.startPos === m.startPos &&
                      prev.query === m.query
                        ? prev
                        : { open: true, ...m, highlighted: 0 }
                    );
                  } else if (mention.open) {
                    setMention((prev) => ({ ...prev, open: false }));
                  }
                }}
                onScroll={handleTextareaScroll}
                onSelect={(e) => {
                  handleTextareaSelect(e);
                  /* Caret movements (arrow keys, mouse clicks)
                     should also close the dropdown if the caret
                     leaves the active mention. */
                  const ta = e.currentTarget;
                  const m = detectMentionAtCaret(promptData.body, ta.selectionStart ?? 0);
                  if (!m && mention.open) {
                    setMention((prev) => ({ ...prev, open: false }));
                  }
                }}
                onClick={(e) => selectVariableAtCursor(e.currentTarget)}
                onKeyDown={handleTextareaKeyDown}
                onBlur={() => {
                  /* Blur via Tab/Click outside should close the
                     dropdown — but with a small delay so a click
                     INSIDE the dropdown still registers before the
                     dropdown unmounts. */
                  setTimeout(() => {
                    setMention((prev) => (prev.open ? { ...prev, open: false } : prev));
                  }, 120);
                }}
                spellCheck={false}
                placeholder="Write your prompt here... Select text or use [brackets] for variables."
              />
              {promptData.body.length > 0 && (
                <>
                  <div ref={overlayRef} className="alg-prompt-overlay" aria-hidden>
                    {renderPromptWithTags("display")}
                  </div>
                  <div ref={hitOverlayRef} className="alg-prompt-hit" aria-hidden>
                    {renderPromptWithTags("hit")}
                  </div>
                </>
              )}
              {/* Locked-prompt hover hint. Mirrors the variable-name
                  hint below — appears on hover anywhere over the
                  prompt box, explains why nothing reacts to typing,
                  and what unlocking will cost. CSS handles the
                  hover transition; the element only renders while
                  the prompt is locked. */}
              {ui.promptLocked && (
                <div
                  className="alg-locked-hint alg-locked-hint--prompt"
                  role="tooltip"
                >
                  Locked. Unlock the prompt to edit — your parked
                  verify cards will be discarded if you change anything.
                </div>
              )}
            </div>

            {/* @-mention dropdown — `position: fixed`, anchored to
                the @ glyph's viewport coords (see useEffect above)
                so it sits directly under the line the user is typing
                in. Visible only while an active `@…` token is being
                typed AND at least one reference image is available.
                Scrollable when the list exceeds `max-height`. */}
            {mention.open && mentionMatches.length > 0 && mentionAnchor && (
              <div
                ref={(node) => {
                  /* Auto-scroll the highlighted row into view when
                     keyboard navigation moves past the visible
                     window of the dropdown. Runs on every render of
                     the container, so arrow-keying past row 5
                     scrolls row 6 into view. */
                  if (!node) return;
                  const active = node.querySelector<HTMLElement>(
                    ".alg-mention-item--active"
                  );
                  if (active && typeof active.scrollIntoView === "function") {
                    active.scrollIntoView({ block: "nearest" });
                  }
                }}
                className="alg-mention-dropdown"
                role="listbox"
                aria-label="Reference image suggestions"
                style={{
                  top: mentionAnchor.top,
                  left: mentionAnchor.left,
                }}
                onMouseDown={(e) => {
                  /* Prevent the textarea from blurring before our
                     click handler fires — the blur-timeout would
                     otherwise unmount the dropdown mid-click. */
                  e.preventDefault();
                }}
              >
                {mentionMatches.map((item, idx) => {
                  const isActive = idx === mention.highlighted;
                  return (
                    <button
                      key={`mention-${item.idx}`}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      className={`alg-mention-item${
                        isActive ? " alg-mention-item--active" : ""
                      }`}
                      onMouseEnter={() =>
                        setMention((m) => ({ ...m, highlighted: idx }))
                      }
                      onClick={() => insertReferenceImageMention(item.idx)}
                    >
                      <img
                        src={item.src}
                        alt=""
                        className="alg-mention-item__thumb"
                        draggable={false}
                      />
                      <span className="alg-mention-item__label">
                        {item.label}
                      </span>
                      {isActive && (
                        <span className="alg-mention-item__check" aria-hidden="true">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {(() => {
              /* Combined chip row — variables + active reference-image
                 mentions (deduped, in order of first appearance in the
                 prompt body). The reference chips show a tiny
                 thumbnail and open the lightbox on click; variables
                 keep their existing color-coded behaviour. */
              const refMentionIndices: number[] = [];
              const seen = new Set<number>();
              for (const m of promptData.body.matchAll(REF_IMAGE_MENTION_GLOBAL_RE)) {
                const n = parseInt(m[1], 10);
                if (!seen.has(n) && n >= 1 && n <= referenceImages.length) {
                  seen.add(n);
                  refMentionIndices.push(n);
                }
              }
              if (variables.length === 0 && refMentionIndices.length === 0) return null;
              return (
                <div className="alg-prompt-var-tabs">
                  {variables.map((v) => {
                    const colors = getVariableColors(v.colorIndex);
                    const isTabActive = ui.selectedVariableId === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        className={`alg-prompt-var-tab ${isTabActive ? "alg-prompt-var-tab--active" : ""}`}
                        style={{
                          backgroundColor: colors.bg,
                          color: colors.text,
                          borderColor: colors.border,
                        }}
                        onClick={() => selectVariable(v.id)}
                      >
                        [{v.name || "..."}]
                      </button>
                    );
                  })}
                  {refMentionIndices.map((n) => {
                    const src = referenceImages[n - 1];
                    return (
                      <button
                        key={`refmention-${n}`}
                        type="button"
                        className="alg-prompt-var-tab alg-prompt-var-tab--ref-image"
                        title={`Open Reference image ${n}`}
                        onClick={() => {
                          setRefPreviewDirection("init");
                          setRefPreviewIndex(n - 1);
                        }}
                      >
                        <img
                          src={src}
                          alt=""
                          className="alg-prompt-var-tab__thumb"
                          draggable={false}
                        />
                        <span>Image {n}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })()}

          </div>
        </section>

        {/* ═══ PANEL 03 — Variables ═══ */}
        <section className="alg-panel alg-panel--variables">
          <div className="alg-panel__header">
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span className="alg-panel__number">03</span>
              <span className="alg-panel__title">Variables</span>
            </div>
            <span className="alg-panel__meta">defaults & types</span>
          </div>
          <div ref={variablesScrollRef} className="alg-panel__body alg-panel__body--scroll">
            {variables.length === 0 ? (
              <div className="alg-empty">
                <div className="alg-empty__icon"><EmptyVarIcon /></div>
                <div className="alg-empty__title">No variables yet.</div>
                <div className="alg-empty__sub">Select text or use [Name]</div>
              </div>
            ) : (
              variables.map((variable) => {
                const colors = getVariableColors(variable.colorIndex);
                const showNameMissingLine =
                  Boolean(variable.nameBlurEmpty) && !variable.name?.trim();
                const showNameDuplicateLine = Boolean(
                  variable.nameDuplicateHighlighted
                );
                /* Both error states (empty name, duplicate name) get the
                   same red treatment so the visual language is
                   consistent. The CSS class also sets `!important` so
                   the inline border-color from React doesn't win. */
                const showRedBorder =
                  Boolean(variable.nameMissingHighlighted) ||
                  showNameDuplicateLine;
                const isPulsing = ui.variablePulsingId === variable.id;
                const isSelected = ui.selectedVariableId === variable.id;
                return (
                <div
                  key={variable.id}
                  ref={(el) => {
                    if (el) variableCardRefs.current[variable.id] = el;
                    else delete variableCardRefs.current[variable.id];
                  }}
                  className={`alg-var-card${isSelected ? " alg-var-card--selected" : ""}${isPulsing ? " alg-var-card--pulse" : ""}${showRedBorder ? " alg-var-card--name-missing" : ""}`}
                  style={{
                    borderColor: showRedBorder ? "#ef4444" : colors.border,
                    borderLeftWidth: 3,
                    borderLeftColor: showRedBorder
                      ? "#ef4444"
                      : colors.border,
                    ...(isPulsing
                      ? ({ ["--var-pulse-border" as string]: colors.border } as React.CSSProperties)
                      : {}),
                    ...(isSelected
                      ? ({ ["--var-card-border" as string]: colors.border } as React.CSSProperties)
                      : {}),
                  }}
                  onMouseDownCapture={(e) => {
                    if ((e.target as HTMLElement).closest(".alg-var-card__delete")) return;
                    selectVariable(variable.id);
                  }}
                >
                  <div className="alg-var-card__top">
                    <div className="alg-var-card__label">VARIABLE NAME</div>
                    <button
                      type="button"
                      className="alg-var-card__delete"
                      aria-label="Delete variable"
                      title={
                        ui.promptLocked
                          ? "Unlock the prompt to delete variables."
                          : "Delete variable"
                      }
                      disabled={ui.promptLocked}
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (ui.promptLocked) return;
                        setUi((p) => ({ ...p, variableDeleteId: variable.id }));
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  {/* Wrapper exists purely to anchor the locked-
                      hint tooltip below the name input. The
                      tooltip is only rendered when the prompt is
                      locked, and CSS makes it visible on hover.
                      Keeps the tooltip styled like the rest of
                      the editor (instead of the slow, ugly
                      browser-native `title` popup). */}
                  <div className="alg-var-card__name-wrap">
                  <input
                    className={`alg-var-card__name-input ${showNameMissingLine || showNameDuplicateLine ? "alg-var-card__name-input--name-missing" : ""}`}
                    value={variable.name}
                    readOnly={ui.promptLocked}
                    aria-invalid={showNameDuplicateLine || showNameMissingLine}
                    title={
                      ui.promptLocked
                        ? undefined
                        : showNameDuplicateLine
                          ? "Another variable already uses this name. Pick a unique name."
                          : !variable.name
                            ? "Fill in the variables."
                            : "Variable name used in prompt logic."
                    }
                    onChange={(e) => {
                      const name = e.target.value;
                      updateVariable(variable.id, { name });
                      /* Renaming a variable changes the prompt's
                         variable structure — drop any parked verify
                         cards because their snapshots were keyed
                         against the OLD name and would no longer
                         resolve correctly. */
                      clearVersionsIfStructuralEdit();
                      /* Live duplicate-name detection. We compute
                         this on EVERY keystroke so the user sees a
                         red border the very moment their typed name
                         collides with another variable. The flag
                         drives the same red treatment as the
                         empty-name state (input bottom-line + card
                         border); `findVariableByName` already does
                         a case-insensitive match and excludes the
                         current variable's own id. */
                      const trimmed = name.trim();
                      const duplicateOf = trimmed
                        ? findVariableByName(trimmed, variables, variable.id)
                        : undefined;
                      const isDuplicate = !!duplicateOf;
                      setVariables((prev) =>
                        prev.map((v) =>
                          v.id === variable.id
                            ? {
                                ...v,
                                nameBlurEmpty: trimmed
                                  ? false
                                  : v.nameBlurEmpty,
                                /* Clear the missing-highlight as soon
                                   as the user types anything; clear
                                   the duplicate-highlight as soon as
                                   the typed name is unique. */
                                nameMissingHighlighted: trimmed
                                  ? false
                                  : v.nameMissingHighlighted,
                                nameDuplicateHighlighted: isDuplicate,
                              }
                            : v
                        )
                      );
                    }}
                    onFocus={() => handleVariableNameFocus(variable.id)}
                    onBlur={() => handleVariableNameBlur(variable.id)}
                    placeholder="e.g. Subject"
                  />
                  {ui.promptLocked && (
                    <div
                      className="alg-locked-hint alg-locked-hint--name"
                      role="tooltip"
                    >
                      Locked. Unlock the prompt to rename — your parked
                      verify cards will need to be re-pushed afterwards.
                    </div>
                  )}
                  </div>

                  {/* Type toggle */}
                  <div className="alg-type-toggle">
                    <button
                      className={`alg-type-toggle__btn ${variable.type === "text" ? "alg-type-toggle__btn--active" : ""}`}
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        updateVariable(variable.id, { 
                          type: "text",
                          defaultValue: variable.description || variable.defaultValue || variable.label
                        }); 
                      }}
                    >
                      Text input
                    </button>
                    <button
                      className={`alg-type-toggle__btn ${variable.type === "checkbox" ? "alg-type-toggle__btn--active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateVariable(variable.id, {
                          type: "checkbox",
                          description: String(variable.defaultValue || variable.description || variable.label),
                          defaultValue: true
                        });
                      }}
                    >
                      Yes / No checkbox
                    </button>
                  </div>

                  {/* Default value section */}
                  <div className="alg-var-card__label">DEFAULT VALUE</div>
                  {variable.type === "text" || variable.type === "image" ? (
                    <>
                      <input
                        className="alg-var-card__default-input"
                        value={String(variable.defaultValue || "")}
                        onChange={(e) => updateVariable(variable.id, { defaultValue: e.target.value, type: "text" })}
                        placeholder="e.g. a young woman..."
                      />
                      <div className="alg-var-card__hint">Used until the buyer changes it.</div>
                    </>
                  ) : (
                    <>
                      <div className="alg-toggle-inserts-row">
                        <label className="alg-checkbox" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--alg-hint)' }}>
                          <input
                            type="checkbox"
                            checked={variable.defaultValue as boolean}
                            onChange={(e) => updateVariable(variable.id, { defaultValue: e.target.checked })}
                            style={{ accentColor: 'var(--alg-accent)', width: 14, height: 14, borderRadius: 3 }}
                          />
                          <span>Default: <span style={{ fontWeight: 600, color: 'var(--alg-dark)' }}>{variable.defaultValue ? "on" : "off"}</span></span>
                        </label>
                      </div>
                      <textarea
                        className="alg-var-card__desc-input"
                        value={variable.description}
                        onChange={(e) => updateVariable(variable.id, { description: e.target.value })}
                        placeholder="Add text to insert when checked..."
                        rows={2}
                      />
                    </>
                  )}
                </div>
                );
              })
            )}
          </div>

          {/* Reference-images upload UI lives in Settings now (under
              "REFERENCE IMAGES" / "PROMPT RELEVANT REFERENCE IMAGES")
              because the data is part of the prompt definition, not a
              per-render artefact attached to variable cards. */}
        </section>

        {/* ═══ PANEL 04 — Verify ═══ */}
        <section className="alg-panel alg-panel--verify">
          {/* Dual-Arrow Bridge — Circuit Track Design */}
          <div
            className={`alg-bridge-overlay${ui.selectedCards.length === 1 ? " alg-bridge-overlay--back-active" : ""}${!hasPromptBody ? " alg-bridge-overlay--forward-blocked" : ""}`}
          >
            <button
              className={`alg-arrow-btn alg-arrow-btn--back ${ui.selectedCards.length === 1 ? "alg-arrow-btn--active" : ""}`}
              disabled={ui.selectedCards.length !== 1}
              onClick={() => {
                const card = versions.find((v) => v.id === ui.selectedCards[0]);
                if (!card) return;
                /* The back-arrow always opens the confirmation
                   dialog now — even when there are no existing
                   variable defaults to "overwrite" — because the
                   action also DELETES the parked verify card as a
                   side-effect (`applyVerifyCardToVariableDefaults`
                   filters it out of `versions`). The user needs
                   to know they're consuming the card, not just
                   peeking at it. */
                setUi((p) => ({
                  ...p,
                  editOverwriteConfirmCardId: card.id,
                }));
              }}
              title="Edit — send selected back to Variables"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <div className="alg-bridge-track">
              <div className="alg-bridge-track__dot" />
              <div className="alg-bridge-track__line" />
              <div className="alg-bridge-track__dot" />
            </div>
            <button
              type="button"
              className={`alg-arrow-btn alg-arrow-btn--forward${!hasPromptBody ? " alg-arrow-btn--forward-inactive" : ""}${canPushToVerify ? " alg-arrow-btn--active alg-arrow-btn--glow" : ""}`}
              disabled={!hasPromptBody}
              aria-disabled={!hasPromptBody}
              tabIndex={hasPromptBody ? 0 : -1}
              onMouseDown={
                !hasPromptBody
                  ? (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }
                  : undefined
              }
              onClick={
                hasPromptBody
                  ? (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Defensive re-check at click time — body may have
                      // been cleared between paint and click.
                      if (!hasSubstantivePromptBody(promptData.body)) return;
                      // Block the push when one or more variables still
                      // have an empty name. We open the alert dialog and
                      // stop here; the OK button on the dialog tags the
                      // offending variables with a red border so the user
                      // can spot them in both the prompt and the cards.
                      const hasUnnamedVariable = variables.some(
                        (v) => !v.name.trim()
                      );
                      if (hasUnnamedVariable) {
                        setUi((p) => ({
                          ...p,
                          variableNameMissingAlertOpen: true,
                        }));
                        return;
                      }
                      handleStackVariables();
                    }
                  : undefined
              }
              title={
                !hasPromptBody
                  ? "Write a prompt first"
                  : variables.length === 0
                    ? "Push prompt to Verify"
                    : "Push variables to Verify"
              }
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          <div className="alg-panel__header">
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span className="alg-panel__number">04</span>
              <span className="alg-panel__title">Verify</span>
            </div>
            {/* Meta-counter for the Verify panel header.

                Free prompts have a hard requirement of 1 reference
                render and a soft recommendation of 4 — we now spell
                this out across two right-aligned lines so the
                contracted "0/1 req · 4 rec" no longer reads as
                jargon. Premium prompts only have one count, so
                they stay a single line. The wrapper changes from
                <span> to <div> so the flex column layout works,
                and the existing `.alg-panel__meta` class
                (font-mono / 10px / hint color / margin-left:auto)
                still applies. The flex-baseline parent keeps the
                first line's baseline aligned with the
                `04 Verify` title; the second line simply hangs
                beneath it. */}
            <div
              className="alg-panel__meta"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                lineHeight: 1.35,
              }}
            >
              {promptData.type === "free-prompt" ? (
                <>
                  <span>{verifiedCount}/1 required</span>
                  <span>4 recommended</span>
                </>
              ) : (
                <span>{verifiedCount}/4 required</span>
              )}
            </div>
          </div>
          <div className="alg-panel__body">
            <p className="alg-hint-text" style={{ marginBottom: 16 }}>
              {promptData.type === "free-prompt"
                ? "Free prompts need at least one reference render. Four is recommended — buyers trust prompts that prove they generalize."
                : "Premium prompts require exactly four reference renders to prove they generate consistently high-quality results."}
            </p>

            {versions.map((slot) => {
              const isSelected = ui.selectedCards.includes(slot.id);
              return (
                  <div key={slot.id} className="alg-version-card-wrapper">
                    <div
                      className={`alg-version-card ${isSelected ? "alg-version-card--selected" : ""}`}
                      onClick={() => toggleVersionCheckbox(slot.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Image panel — always visible */}
                      <div className="alg-version-card__thumb">
                        {slot.status === "complete" && slot.imageUrl && (
                          <img
                            src={slot.imageUrl}
                            alt={`Version ${String(slot.id).padStart(2, "0")}`}
                          />
                        )}
                        {slot.status === "generating" && (
                          <div className="alg-spinner" />
                        )}
                        {slot.status === "queued" && (
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, zIndex: 2 }}>
                            <span style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: "#c0542a" }}>#{slot.queuePosition}</span>
                            <span style={{ fontFamily: "monospace", fontSize: 9, color: "#888", letterSpacing: "0.1em" }}>IN QUEUE</span>
                          </div>
                        )}
                        {slot.status === "failed" && (
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "0 10px", textAlign: "center", zIndex: 2 }}>
                            <AlertTriangle color="#c0542a" size={20} />
                            <span style={{ fontFamily: "monospace", fontSize: 9, color: "#c0542a", letterSpacing: "0.05em" }}>FAILED</span>
                          </div>
                        )}
                        {/* Idle placeholder. The thumb is otherwise just
                            a flat dark square — shows nothing, gives no
                            cue that this is where a render will appear.
                            A faint image glyph + tiny caption fixes that
                            without competing with the real states above. */}
                        {slot.status === "idle" && (
                          <div className="alg-version-card__placeholder">
                            <ImageIcon size={22} strokeWidth={1.5} />
                            <span className="alg-version-card__placeholder-text">
                              render appears here
                            </span>
                          </div>
                        )}
                        {/* Overlay: status */}
                        <span className="alg-version-card__overlay-status">
                          {slot.status === "complete" ? "● ready" :
                           slot.status === "generating" ? "● generating" :
                           slot.status === "queued" ? `● queue` :
                           slot.status === "failed" ? "● failed" :
                           ""}
                        </span>
                        {/* Overlay: version enumeration. Just the
                            two-digit slot index (01..NN) anchored
                            to the top-left of the thumb. Replaces
                            the previous "Version 01" centered at
                            the bottom — far less verbose, and the
                            row of cards now reads as 01 / 02 /
                            03 / 04 down the thumbs at a glance.
                            Fades out when the selection checkbox
                            becomes visible (see CSS) so the two
                            elements don't pile up on top of each
                            other in the same corner. */}
                        <span className="alg-version-card__overlay-label">
                          {String(slot.id).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Metadata panel */}
                      <div className="alg-version-card__info">
                        {/* Empty-state for slots whose own snapshot
                            has no variables. We render two pieces:
                              1. A `VARIABLES` section heading
                                 absolutely-positioned to the upper-
                                 left of the info panel (mirrors the
                                 left settings labels).
                              2. A centered, dimmed "None" caption
                                 in the body of the info panel, so
                                 the white area reads "VARIABLES …
                                 None" instead of looking blank.
                            See `.alg-version-card__no-vars*` rules
                            in algency-editor.css for the styling.

                            IMPORTANT: this condition only inspects
                            the SLOT'S OWN snapshot — not the
                            editor's current `variables` list. Each
                            verify card is a frozen "product"
                            captured at the moment it was parked /
                            queued / generated, and should not shift
                            its display when the user later adds or
                            removes variables in the editor. (Adding
                            a new variable in the editor would
                            otherwise make the empty-state vanish
                            from already-parked cards, which is the
                            bug we're fixing here.) */}
                        {Object.entries(slot.variableSnapshot).filter(
                          ([key]) => key?.trim()
                        ).length === 0 && (
                          <>
                            <div className="alg-version-card__no-vars">
                              <span className="alg-version-card__no-vars-label">
                                VARIABLES
                              </span>
                            </div>
                            <span className="alg-version-card__no-vars-value">
                              None
                            </span>
                          </>
                        )}
                        <div className="alg-verify-var-chips">
                          {Object.entries(slot.variableSnapshot)
                            .filter(([key]) => key?.trim())
                            .map(([key, val]) => {
                              const variable = variables.find((v) => v.name === key);
                              const colors = variable
                                ? getVariableColors(variable.colorIndex)
                                : null;
                              const popoverBody = formatVerifySnapshotValue(
                                String(val ?? ""),
                                variable
                              );
                              return (
                                <Popover key={`${slot.id}-${key}`}>
                                  <PopoverTrigger asChild>
                                    <button
                                      type="button"
                                      className="alg-verify-var-chip"
                                      style={
                                        colors
                                          ? ({
                                              backgroundColor: colors.bg,
                                              color: colors.text,
                                              borderColor: colors.border,
                                            } as React.CSSProperties)
                                          : undefined
                                      }
                                      onClick={(e) => e.stopPropagation()}
                                      onPointerDown={(e) => e.stopPropagation()}
                                    >
                                      <span className="alg-verify-var-chip__name">{key}</span>
                                      {popoverBody && (
                                        <span className="alg-verify-var-chip__value">
                                          {popoverBody}
                                        </span>
                                      )}
                                    </button>
                                  </PopoverTrigger>
                                  <PopoverContent
                                    className="alg-verify-var-popover z-[120] w-auto max-w-[min(280px,90vw)] border-[var(--alg-border)] bg-[var(--alg-panel)] p-3 text-[var(--alg-text)] shadow-lg"
                                    side="top"
                                    align="start"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <p className="alg-verify-var-popover__label">{key}</p>
                                    <p className="alg-verify-var-popover__value">{popoverBody}</p>
                                  </PopoverContent>
                                </Popover>
                              );
                            })}
                        </div>

                        {/* Download link for complete cards */}
                        {slot.status === "complete" && slot.imageUrl && (
                          <div className="alg-version-card__row alg-version-card__row--download">
                            <button
                              type="button"
                              className="alg-version-card__download"
                              onClick={(e) => {
                                e.stopPropagation();
                                const a = document.createElement("a");
                                a.href = slot.imageUrl!;
                                a.download = `version-${slot.id}.png`;
                                a.click();
                              }}
                            >
                              save
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div style={{ height: 24, flexShrink: 0 }} />

            {/* Multi-select action bar — Delete only OR Delete & Refill */}
            {ui.selectedCards.length > 0 && (
              <div className="alg-refill-bar">
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, color: "var(--alg-dark)", fontWeight: 600 }}>{ui.selectedCards.length} selected</span>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  {/* Destructive action — drops the selected slots
                      without re-generating. Icon-only button to
                      mirror the icon-driven trash control on the
                      variable cards. Click no longer fires the
                      action directly; instead it opens the
                      `selectedDeleteConfirm` AlertDialog with a
                      snapshot of the currently-selected ids. The
                      action only runs if the user confirms. */}
                  <button
                    type="button"
                    className="alg-refill-bar__delete"
                    onClick={() =>
                      setUi((p) => ({
                        ...p,
                        selectedDeleteConfirm: {
                          ids: [...ui.selectedCards],
                        },
                      }))
                    }
                    aria-label="Delete selected slots"
                    title="Delete selected slots"
                  >
                    <Trash2 size={14} strokeWidth={1.75} />
                  </button>
                  {/* "Re-roll values" replaces the previous "Refill"
                      label. Asks Grok to pick a fresh, unique set
                      of variable values per selected slot. NO
                      image generation runs — that only happens
                      via Pay & Generate. Free action; no cost
                      badge. Click opens `selectedRerollConfirm`
                      with a snapshot of the selection; the
                      dialog's "Yes" button fires the Grok calls. */}
                  <button
                    type="button"
                    className="alg-refill-bar__refill"
                    onClick={() =>
                      setUi((p) => ({
                        ...p,
                        selectedRerollConfirm: {
                          ids: [...ui.selectedCards],
                        },
                      }))
                    }
                    disabled={ui.isRerolling}
                    title="Ask Grok to pick a fresh set of variable values for each selected slot. Generation only runs when you click Pay & Generate."
                  >
                    {ui.isRerolling ? "Re-rolling…" : "Re-roll values"}
                  </button>
                  <button
                    className="alg-refill-bar__cancel"
                    onClick={() => setUi(prev => ({ ...prev, selectedCards: [] }))}
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Prompt Ownership Notice — keeps the original cream look,
              now dismissible via the X in the top-right corner. The
              outer wrapper handles a slide-down + fade-out animation
              when the user clicks dismiss; the inner box keeps the
              existing inline styling so the visual stays identical. */}
          {!ui.ownershipNoticeDismissed && (
            <div
              style={{
                overflow: "hidden",
                maxHeight: noticeLeaving ? 0 : 200,
                opacity: noticeLeaving ? 0 : 1,
                transform: noticeLeaving ? "translateY(8px)" : "translateY(0)",
                transition:
                  "max-height 260ms ease, opacity 200ms ease, transform 260ms ease",
                pointerEvents: noticeLeaving ? "none" : undefined,
              }}
            >
              <div
                style={{
                  padding: "8px 12px",
                  background: "#fffaf0",
                  borderTop: "1px solid #f5e6cc",
                  borderBottom: "1px solid #f5e6cc",
                  position: "relative",
                }}
              >
                <button
                  type="button"
                  aria-label="Dismiss ownership notice"
                  title="Dismiss"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (noticeLeaving) return;
                    setNoticeLeaving(true);
                    window.setTimeout(() => {
                      dismissOwnershipNotice();
                    }, 280);
                  }}
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 6,
                    width: 22,
                    height: 22,
                    padding: 0,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: "#8a6d3b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 3,
                    lineHeight: 1,
                    flexShrink: 0,
                    transition:
                      "background 0.12s ease, color 0.12s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(184, 134, 11, 0.14)";
                    e.currentTarget.style.color = "#5a4a1f";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#8a6d3b";
                  }}
                >
                  <X size={12} />
                </button>
                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    alignItems: "flex-start",
                    paddingRight: 22,
                  }}
                >
                  <AlertTriangle
                    size={14}
                    style={{
                      color: "#b8860b",
                      marginTop: "1px",
                      flexShrink: 0,
                    }}
                  />
                  <p
                    style={{
                      fontSize: 11,
                      color: "#8a6d3b",
                      lineHeight: 1.4,
                      margin: 0,
                    }}
                  >
                    <strong>Ownership Notice:</strong> Only mark prompts as
                    your own property if you genuinely created them. Falsely
                    claiming authorship will result in account strikes. See
                    Terms.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Consolidated Action Bar */}
          <div style={{ background: "var(--alg-warm-white)", borderTop: "1px solid var(--alg-border)", padding: "10px 12px", zIndex: 10, marginTop: "auto" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {/* Cost summary */}
              {versions.some(v => v.status === "idle" || v.status === "failed") && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: "var(--alg-panel)", border: "1px solid var(--alg-border)" }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "clamp(9px, 0.6vw + 6px, 12px)", color: "var(--alg-muted)", letterSpacing: 1, textTransform: "uppercase" }}>Batch cost</span>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                    <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "clamp(12px, 0.8vw + 8px, 16px)", fontWeight: 700, color: "var(--alg-dark)" }}>
                      {getBatchCost(Math.max(versions.filter(v => v.status === "idle" || v.status === "failed").length, variables.filter(v => v.type === "text").length > 0 ? Math.max(...variables.filter(v => v.type === "text").map(v => v.values.length || 1)) : 1))}
                    </span>
                  </div>
                </div>
              )}
              {/* Action Buttons Row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 4 }}>
                <button
                  className="alg-btn alg-btn--ghost alg-btn--sm"
                  style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 6px", color: "var(--alg-muted)", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 9, whiteSpace: "nowrap" }}
                  onClick={handleGrokFill}
                  disabled={ui.isGrokFilling}
                >
                  <Sparkles size={10} />
                  {ui.isGrokFilling ? "Filling..." : "Auto Fill"}
                </button>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <button
                    className="alg-pay-btn"
                    onClick={handlePayAndGenerate}
                    disabled={
                      isGeneratingPaymentPending || 
                      versions.filter(v => v.status === "idle" || v.status === "failed").length === 0 ||
                      (promptData.type === "premium-prompt" && variables.some(v => !v.name))
                    }
                    style={{ padding: "6px 8px", height: "auto", whiteSpace: "nowrap", fontSize: 9 }}
                  >
                    {isGeneratingPaymentPending ? (
                      <>● Processing...</>
                    ) : (
                      <>
                        <Zap size={10} />
                        Pay &amp; Gen
                        {versions.filter(v => v.status === "idle" || v.status === "failed").length > 0 && (
                          <span style={{ marginLeft: 4, opacity: 0.6, fontWeight: 400, fontSize: 8 }}>
                            ({versions.filter(v => v.status === "idle" || v.status === "failed").length})
                          </span>
                        )}
                      </>
                    )}
                  </button>
                  <button
                    className="alg-btn alg-btn--primary alg-btn--sm"
                    style={{ padding: "6px 8px", background: isPublishDisabled ? "#D5D1CB" : "var(--alg-dark)", borderColor: isPublishDisabled ? "#D5D1CB" : "var(--alg-dark)", color: "white", opacity: 1, cursor: isPublishDisabled ? "not-allowed" : "pointer", whiteSpace: "nowrap" }}
                    disabled={isPublishDisabled}
                    onClick={handleReleaseClick}
                  >
                    {publishPromptMutation.isPending ? "Releasing…" : "Release"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Mobile Base View (Background for Modal) */}
      {isMobileViewport && (
        <div style={{ position: "fixed", inset: 0, background: "#f2efe8", zIndex: 100 }}>
          <div style={{ padding: "40px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "var(--font-serif), 'Playfair Display', serif", fontSize: 28, fontStyle: "italic", fontWeight: 700, color: "#9A938A", letterSpacing: "-1px" }}>Enki.</span>
            <div style={{ width: 16, height: 4, background: "#C4BDB5", borderRadius: 2 }}></div>
          </div>
          <div style={{ display: "flex", gap: 16, padding: "0 20px" }}>
            <div style={{ width: 160, height: 160, borderRadius: 12, background: "#C4BDB5", opacity: 0.5 }}></div>
            <div style={{ width: 160, height: 160, borderRadius: 12, background: "#C4BDB5", opacity: 0.5 }}></div>
          </div>
        </div>
      )}

      {/* Mobile Floating Button */}
      {isMobileViewport && !isMobileModalOpen && (
        <div style={{ position: "fixed", bottom: 24, left: 24, right: 24, zIndex: 150 }}>
          <button 
            style={{ width: "100%", background: "var(--alg-dark)", color: "white", padding: "16px 24px", borderRadius: 32, display: "flex", justifyContent: "space-between", alignItems: "center", border: "none", boxShadow: "0 12px 32px rgba(0,0,0,0.2)", cursor: "pointer" }}
            onClick={() => setIsMobileModalOpen(true)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Sparkles size={18} style={{ fill: "white" }} />
              <span style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif", fontSize: 16, fontWeight: 500 }}>Generate</span>
            </div>
            <span style={{ fontFamily: "var(--font-serif), 'Playfair Display', serif", fontStyle: "italic", fontSize: 15, color: "#9A938A" }}>new image</span>
          </button>
        </div>
      )}

      {/* Render Mobile Modal */}
      <AlgencyMobileGenerateModal
        isOpen={isMobileModalOpen}
        onClose={() => setIsMobileModalOpen(false)}
        promptBody={promptData.body}
        setPromptBody={(val) => setPromptData(prev => ({ ...prev, body: val }))}
        variables={variables}
        onVariableChange={(id, val) => {
          setVariables(prev => prev.map(v => 
            v.id === id ? { ...v, defaultValue: val, values: [val] } : v
          ));
        }}
        onAddVariable={() => {
          const newVarName = `var_${variables.length + 1}`;
          setPromptData(prev => ({ ...prev, body: prev.body + ` [${newVarName}]` }));
        }}
        onRemoveVariable={(name) => {
          setPromptData(prev => ({ ...prev, body: prev.body.split(`[${name}]`).join('') }));
        }}
        models={models}
        setModel={(id) => setModels(prev => ({ ...prev, selected: [id] }))}
        onToggleModel={(id) => toggleModel(id)}
        ratios={ratios}
        setRatio={(r) => setRatios(prev => ({ ...prev, selected: r }))}
        pricePerSlot={getPricePerSlot()}
        title={promptData.title}
        setTitle={(v) => setPromptData(prev => ({ ...prev, title: v }))}
        promptType={promptData.type}
        setPromptType={(v) => setPromptData(prev => ({ ...prev, type: v as typeof prev.type }))}
        tags={promptData.tags}
        onAddTag={(t) => addTag(t)}
        onRemoveTag={(t) => removeTag(t)}
        price={promptPrice}
        setPrice={(v) => setPromptPrice(v)}
        onAutoFill={handleGrokFill}
        isAutoFilling={ui.isGrokFilling}
        onGenerate={() => {
          if (!walletConnected) {
            setShowWalletPicker(true);
            toast({ title: "Wallet required", description: "Connect a wallet to generate with x402.", variant: "destructive" });
            return;
          }
          const snapshot: Record<string, string> = {};
          variables.forEach(v => { snapshot[v.name] = (v.defaultValue as string) || v.name; });
          const newId = versions.length > 0 ? Math.max(...versions.map(v => v.id)) + 1 : 1;
          setVersions(prev => [...prev, { id: newId, variableSnapshot: snapshot, imageUrl: null, status: "idle" }]);
          toast({ title: `Paying ${formatCost(getPricePerSlot())}`, description: "Processing micro-payment for generation..." });
          setTimeout(() => { handleGenerateVersion(newId); }, 100);
        }}
      />

      {/* ═══ Reference-image Lightbox ═══
          Fullscreen viewer for the prompt's reference images.

          Rendered through `createPortal` straight onto `document.body`
          so it ESCAPES the editor wrapper's stacking context (the
          page wraps everything in `position: fixed; zIndex: 100`,
          which would otherwise trap the lightbox below the global
          Navbar at zIndex: 200). With the portal the lightbox is a
          sibling of the navbar in the DOM, and its z-index 9999
          comparison happens at the document root — image always
          wins, navbar disappears underneath.

          Triggers: plain click on a slot tile (no drag-overlap).
          Dismissals: Escape, "×" button, click on backdrop.
          Navigation: ←/→ keys, on-screen prev/next buttons.
          The top-center counter is ALWAYS visible while open;
          close/prev/next chrome fades in on hover. */}
      {typeof document !== "undefined" &&
        refPreviewIndex !== null &&
        referenceImages[refPreviewIndex] &&
        createPortal(
          <div
            className="alg-ref-preview"
            role="dialog"
            aria-modal="true"
            aria-label={`Reference image ${refPreviewIndex + 1} of ${referenceImages.length}`}
            onClick={() => setRefPreviewIndex(null)}
          >
            <div className="alg-ref-preview__counter">
              Reference image {refPreviewIndex + 1}
              {referenceImages.length > 1 ? ` / ${referenceImages.length}` : ""}
            </div>

            <button
              type="button"
              className="alg-ref-preview__close"
              aria-label="Close preview"
              onClick={(e) => {
                e.stopPropagation();
                setRefPreviewIndex(null);
              }}
            >
              <X size={18} />
            </button>

            {referenceImages.length > 1 && (
              <>
                <button
                  type="button"
                  className="alg-ref-preview__nav alg-ref-preview__nav--prev"
                  aria-label="Previous reference image"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRefPreviewDirection("prev");
                    setRefPreviewIndex((i) =>
                      i === null
                        ? null
                        : (i - 1 + referenceImages.length) % referenceImages.length
                    );
                  }}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  className="alg-ref-preview__nav alg-ref-preview__nav--next"
                  aria-label="Next reference image"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRefPreviewDirection("next");
                    setRefPreviewIndex((i) =>
                      i === null ? null : (i + 1) % referenceImages.length
                    );
                  }}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <img
              key={refPreviewIndex}
              src={referenceImages[refPreviewIndex]}
              alt={`Reference ${refPreviewIndex + 1}`}
              className={`alg-ref-preview__img alg-ref-preview__img--${refPreviewDirection}`}
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            />
          </div>,
          document.body
        )}

      {/* ═══ Reference-image hover tooltip ("Sprechblase") ═══
          Rendered when the user hovers an `@Image{N}` chip in the
          prompt body. Portalled to `document.body` for the same
          reason as the lightbox — escapes the editor wrapper's
          stacking context so it can float above ANY ancestor with
          its own `overflow: hidden` / `transform` boundary.
          Position is computed from the chip's snapshotted bounding
          rect: bubble sits ABOVE the chip when there's room (the
          common case, since chips appear inside the textarea which
          sits well below the navbar), otherwise flips to BELOW.
          The CSS `::after` pseudo draws the speech-bubble tip
          pointing back at the chip's horizontal center. */}
      {typeof document !== "undefined" &&
        refTooltip &&
        referenceImages[refTooltip.imageIndex - 1] &&
        createPortal(
          (() => {
            /* Flip below the chip if hovering near the top of the
               viewport leaves no room for the bubble above. The
               bubble plus arrow plus a little breathing room is
               about 220px; under that, point it down. */
            const flipBelow = refTooltip.anchor.top < 220;
            const top = flipBelow
              ? refTooltip.anchor.bottom + 10
              : refTooltip.anchor.top - 10;
            return (
              <div
                className={`alg-ref-tooltip alg-ref-tooltip--${
                  flipBelow ? "below" : "above"
                }`}
                style={{
                  position: "fixed",
                  top,
                  left: refTooltip.anchor.centerX,
                  zIndex: 9000,
                  pointerEvents: "none",
                }}
                aria-hidden="true"
              >
                <img
                  src={referenceImages[refTooltip.imageIndex - 1]}
                  alt=""
                  className="alg-ref-tooltip__img"
                  draggable={false}
                />
                <div className="alg-ref-tooltip__label">
                  Reference image {refTooltip.imageIndex}
                </div>
              </div>
            );
          })(),
          document.body
        )}
    </div>
    </>
  );
}
