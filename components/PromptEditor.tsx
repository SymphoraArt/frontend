import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Trash2,
  X,
  Settings,
  FileText,
  Sparkles,
  List,
  ArrowLeft,
  ChevronDown,
  HelpCircle,
  Pencil,
  Loader2,
  AlertTriangle,
  SlidersHorizontal,
} from "lucide-react";
import ImageLightbox from "./ImageLightbox";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { PRICE_PER_GENERATION_SCALE } from "@/lib/utils";
import PromptSettingsPanel from "./PromptSettingsPanel";
import QuickVariableCreator from "./QuickVariableCreator";
import { useActiveAccount, useConnectModal } from "thirdweb/react";
import { inAppWallet, createWallet } from "thirdweb/wallets";
import { thirdwebClient, defaultChain } from "@/lib/thirdweb";
import { addCreation, getUserKeyFromAccount } from "@/lib/creations";
import { pickDefaultForVariable } from "@/lib/ai-defaults-map";
import { useX402PaymentProduction } from "@/hooks/useX402PaymentProduction";
import { useBestPaymentChain } from "@/hooks/useWalletBalance";
import type { ChainKey } from "@/shared/payment-config";


type VariableType =
  | "text"
  | "checkbox"
  | "multi-select"
  | "single-select"
  | "slider"
  | "radio";
type PromptType = "showcase" | "free-prompt" | "paid-prompt";

interface PromptSettings {
  title: string;
  category: string;
  aiModel: string;
  price: number;
  aspectRatio: string | null;
  photoCount: number;
  promptType: PromptType;
  uploadedPhotos: string[];
  resolution: string | null;
  isFreeShowcase?: boolean;
  enhancement?: "none" | "prompt";
}

interface SelectOption {
  visibleName: string;
  promptValue: string;
}

export interface Variable {
  id: string;
  name: string;
  description: string;
  type: VariableType;
  defaultValue: string | number | boolean | string[];
  options?: SelectOption[];
  min?: number;
  max?: number;
  required: boolean;
  allowReferenceImage?: boolean;
  position: number;
  defaultOptionIndex?: number;
  /** For checkbox: text inserted at variable position when checked. Not shown publicly. */
  promptValue?: string;
  /** Placeholder variable name from plain [text] — user should rename; shown with red outline */
  needsNameAttention?: boolean;
}

function generateUniqueFieldName(used: Set<string>): string {
  for (let i = 1; i < 100000; i++) {
    const n = `Field${i}`;
    if (!used.has(n)) {
      used.add(n);
      return n;
    }
  }
  const fallback = `Field_${Math.random().toString(36).slice(2, 10)}`;
  used.add(fallback);
  return fallback;
}

function variableHasNonEmptyDefault(v: Variable): boolean {
  switch (v.type) {
    case "text":
      return String(v.defaultValue ?? "").trim() !== "";
    case "checkbox":
      return v.defaultValue === true || v.defaultValue === "true";
    case "multi-select":
      return Array.isArray(v.defaultValue) && v.defaultValue.length > 0;
    case "single-select": {
      // Only count as "has default" if user picked a non-first option (index 0 is the implicit default).
      return typeof v.defaultOptionIndex === "number" && v.defaultOptionIndex > 0;
    }
    case "slider": {
      const n = Number(v.defaultValue);
      const lo = v.min ?? 0;
      return !Number.isNaN(n) && n !== lo;
    }
    default:
      return false;
  }
}

interface PromptEditorProps {
  onBack?: () => void;
  /** When set, load this prompt on mount (e.g. from /editor?promptId=...) */
  initialPromptId?: string | null;
}

const connectModalWallets = [
  inAppWallet({
    auth: {
      options: ["email", "google", "phone", "passkey"],
    },
  }),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("walletConnect"),
  createWallet("me.rainbow"),
  createWallet("io.zerion.wallet"),
  createWallet("com.trustwallet.app"),
  createWallet("com.okex.wallet"),
];

/** Tiny … animation over each default field while Values / DeepSeek runs */
function BlitzDefaultFieldShell({
  loading,
  children,
}: {
  loading: boolean;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      {loading && (
        <div
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-md bg-background/35"
          aria-hidden
        >
          <span className="inline-flex items-center gap-0.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1 w-1 rounded-full bg-primary/75 animate-bounce"
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}

export default function PromptEditor({ onBack, initialPromptId }: PromptEditorProps = {}) {
  const router = useRouter();
  const account = useActiveAccount();
  const userKey = useMemo(() => getUserKeyFromAccount(account), [account]);
  const { connect } = useConnectModal();
  const { data: userSettings } = useQuery<{ settings: { minimumPrice?: string } }>({
    queryKey: [userKey ? `/api/users/${encodeURIComponent(userKey)}/settings` : ""],
    enabled: !!userKey,
  });
  const hasAppliedDefaultPriceRef = useRef(false);
  const {
    generateImage: generateImageWithPayment,
    fetchWithPayment,
    isPending: isPaymentPending,
  } = useX402PaymentProduction();
  const { chainKey: bestChain } = useBestPaymentChain();
  const [selectedChain, setSelectedChain] = useState<ChainKey>(bestChain || 'base-sepolia');
  
  const [currentPromptId, setCurrentPromptId] = useState<string | null>(null);
  const [promptTitle, setPromptTitle] = useState("");
  
  // Auto-sync prompt text from localStorage (set by CompactPromptCreator)
  const [prompt, setPrompt] = useState(() => {
    if (typeof window !== 'undefined') {
      const syncedPrompt = localStorage.getItem('syncedPromptText');
      if (syncedPrompt) {
        localStorage.removeItem('syncedPromptText');
        return syncedPrompt;
      }
    }
    return "";
  });
  
  const [variables, setVariables] = useState<Variable[]>(() => {
    if (typeof window !== 'undefined') {
      const syncedVars = localStorage.getItem('syncedPromptVariables');
      if (syncedVars) {
        try {
          const parsed = JSON.parse(syncedVars);
          localStorage.removeItem('syncedPromptVariables');
          return parsed;
        } catch {
          return [];
        }
      }
    }
    return [];
  });
  const [selectedVariableId, setSelectedVariableId] = useState<string | null>(
    null
  );
  const [caretPosition, setCaretPosition] = useState(0);
  const [selectedText, setSelectedText] = useState("");
  const [selectionRange, setSelectionRange] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [estimateCost, setEstimateCost] = useState<number | null>(null);

  type GenerationItem = {
    id: string;
    imageUrl: string | null;
    variableValues: Record<string, string | number | boolean | string[]>;
    aspectRatio: string;
    status: "pending" | "completed" | "failed";
  };
  const [generations, setGenerations] = useState<GenerationItem[]>([]);
  const [selectedGenerationIds, setSelectedGenerationIds] = useState<Set<string>>(new Set());
  const [lightboxImageUrl, setLightboxImageUrl] = useState<string | null>(null);
  const [promptChangeDialog, setPromptChangeDialog] = useState<{
    open: boolean;
    revertValue?: string;
    invalidGenerationIds?: string[];
    onConfirm: () => void;
    onRevert?: () => void;
  }>({ open: false, onConfirm: () => {} });

  const [unsavedVariableDialog, setUnsavedVariableDialog] = useState(false);
  const [showLoginRequiredDialog, setShowLoginRequiredDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [variableToDelete, setVariableToDelete] = useState<string | null>(null);
  const [openVariables, setOpenVariables] = useState<string[]>([]);
  const [variablesMode, setVariablesMode] = useState<"simple" | "complex">("simple");
  const [blitzLoading, setBlitzLoading] = useState(false);
  const [blitzOverwriteOpen, setBlitzOverwriteOpen] = useState(false);
  const [newOptionInput, setNewOptionInput] = useState<Record<string, string>>(
    {}
  );
  const [editingVariableName, setEditingVariableName] = useState<{ id: string; value: string } | null>(null);
  const [showLoadDialog, setShowLoadDialog] = useState(false);

  const [category, setCategory] = useState("");
  const [aiModel, setAiModel] = useState("gemini");
  const [price, setPrice] = useState(0.0001);
  const [aspectRatio, setAspectRatio] = useState<string | null>(null);
  const [photoCount, setPhotoCount] = useState(1);
  const [promptType, setPromptType] = useState<PromptType>("paid-prompt");
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [resolution, setResolution] = useState<string | null>(null);
  const [isFreeShowcase, setIsFreeShowcase] = useState(false);
  const [enhancement, setEnhancement] = useState<"none" | "prompt">("prompt");
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [linkOrCreateDialog, setLinkOrCreateDialog] = useState<{
    open: boolean;
    varName: string;
    selectedText: string;
    selectionRange: { start: number; end: number } | null;
  }>({ open: false, varName: "", selectedText: "", selectionRange: null });
  const [quickVarCreatorOpen, setQuickVarCreatorOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const desktopPromptOverlayRef = useRef<HTMLDivElement>(null);
  const mobilePromptOverlayRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const isShowcase = promptType === "showcase";

  const { data: savedPrompts = [] } = useQuery<
    Array<{ id: string; title: string; createdAt?: string }>
  >({
    queryKey: ["/api/prompts"],
    enabled: showLoadDialog,
  });

  const getErrorMessage = (e: unknown) => {
    if (e instanceof Error) return e.message;
    return String(e);
  };

  const coerceVariableDefaultValue = (
    value: unknown
  ): string | number | boolean | string[] => {
    if (typeof value === "string") return value;
    if (typeof value === "number") return value;
    if (typeof value === "boolean") return value;
    if (Array.isArray(value)) {
      return value.map((v) => String(v));
    }
    if (value === null || value === undefined) return "";
    return String(value);
  };

  const getCaretCoordinates = (
    element: HTMLTextAreaElement,
    position: number
  ) => {
    // Create mirror div
    const div = document.createElement("div");
    const style = window.getComputedStyle(element);
    const properties = [
      "fontFamily",
      "fontSize",
      "fontWeight",
      "letterSpacing",
      "lineHeight",
      "padding",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "borderWidth",
      "borderStyle",
      "borderLeftWidth",
      "borderRightWidth",
      "borderTopWidth",
      "borderBottomWidth",
      "boxSizing",
      "wordWrap",
      "whiteSpace",
      "width",
      "height",
    ];

    properties.forEach((prop) => {
      const key = prop as unknown as keyof CSSStyleDeclaration;
      (div.style as unknown as Record<string, string>)[prop] = String(
        (style as unknown as Record<string, string>)[key as unknown as string]
      );
    });

    div.style.position = "absolute";
    div.style.visibility = "hidden";
    div.style.top = "0";
    div.style.left = "0";
    div.style.whiteSpace = "pre-wrap";
    div.style.wordWrap = "break-word";
    div.style.overflowWrap = "break-word";
    div.style.overflow = "hidden";

    document.body.appendChild(div);

    // Set text up to caret position
    const textBeforeCaret = element.value.substring(0, position);
    div.textContent = textBeforeCaret;

    // Add a span to measure caret position
    const span = document.createElement("span");
    span.textContent = "|";
    div.appendChild(span);

    const coordinates = {
      top: span.offsetTop,
      left: span.offsetLeft,
      height: span.offsetHeight,
    };

    document.body.removeChild(div);

    return coordinates;
  };

  const updateButtonPosition = useCallback(() => {
    if (!textareaRef.current || !selectionRange) {
      setButtonPosition(null);
      return;
    }

    // Get accurate caret position within textarea
    const coords = getCaretCoordinates(textareaRef.current, selectionRange.end);
    const textarea = textareaRef.current;

    // Position RELATIVE to textarea (for absolute positioning within parent)
    // Add padding offset (px-3 py-[11px] on textarea = 12px left, 11px top)
    const top = coords.top + coords.height + 11 + 8; // +8 for spacing below text
    let left = coords.left + 12; // Account for px-3 padding

    // Make sure button doesn't overflow the container
    const containerWidth = textarea.clientWidth;
    const buttonWidth = 120; // Increased for "+ Variable" text

    // Keep button within bounds with padding
    if (left + buttonWidth > containerWidth - 12) {
      left = Math.max(12, containerWidth - buttonWidth - 12);
    }

    // Also check if it goes off left edge
    if (left < 12) {
      left = 12;
    }

    setButtonPosition({ top, left });
  }, [selectionRange]);

  const handleTextSelection = () => {
    // Use requestAnimationFrame to get the final selection after browser updates
    requestAnimationFrame(() => {
      if (!textareaRef.current) return;

      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const selected = prompt.substring(start, end);

      if (selected && selected.trim().length > 0 && start !== end) {
        const isInsideVariable = checkIfInsideVariable(start, end);
        if (!isInsideVariable) {
          setSelectedText(selected);
          setSelectionRange({ start, end });
        } else {
          clearSelection();
        }
      } else {
        clearSelection();
      }
    });
  };

  const clearSelection = () => {
    setSelectedText("");
    setSelectionRange(null);
    setButtonPosition(null);
  };

  // Ref for the button to detect outside clicks
  const buttonRef = useRef<HTMLButtonElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const nameInputRefDesktop = useRef<HTMLInputElement>(null);
  const nameInputRefMobile = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editingVariableName?.id) return;
    const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
    (isDesktop ? nameInputRefDesktop : nameInputRefMobile).current?.focus();
  }, [editingVariableName?.id]);

  // Global mousedown listener to clear selection when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      // Don't clear if clicking on the button
      if (buttonRef.current?.contains(e.target as Node)) {
        return;
      }
      // Don't clear if clicking inside the editor container
      if (editorContainerRef.current?.contains(e.target as Node)) {
        return;
      }
      // Clear selection for clicks outside
      clearSelection();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const checkIfInsideVariable = (start: number, end: number): boolean => {
    const regex = /\[([^\]]+)\]/g;
    let match;

    while ((match = regex.exec(prompt)) !== null) {
      const varStart = match.index;
      const varEnd = match.index + match[0].length;

      if (
        (start >= varStart && start < varEnd) ||
        (end > varStart && end <= varEnd)
      ) {
        return true;
      }
    }
    return false;
  };

  const createNewEmptyVariable = (insertPosition?: number) => {
    const baseVarName = "NewVariable";
    let counter = 1;
    let varName = baseVarName;

    // Find a unique name
    while (variables.some((v) => v.name === varName)) {
      varName = `${baseVarName}${counter}`;
      counter++;
    }

    const newVariable: Variable = {
      id: varName,
      name: varName,
      description: "",
      type: "text",
      defaultValue: "",
      required: false,
      position: variables.length,
    };

    setVariables([...variables, newVariable]);
    setOpenVariables([varName]);

    // Add the variable placeholder to the prompt
    const varPlaceholder = `[${varName}]`;
    const currentPos =
      insertPosition ??
      textareaRef.current?.selectionStart ??
      caretPosition ??
      prompt.length;
    const newPrompt =
      prompt.substring(0, currentPos) +
      (prompt.length > 0 && currentPos > 0 && prompt[currentPos - 1] !== " "
        ? " "
        : "") +
      varPlaceholder +
      " " +
      prompt.substring(currentPos);
    setPrompt(newPrompt);
    setCaretPosition(currentPos + varPlaceholder.length + 1);

    // Focus and move cursor after the variable
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos =
          currentPos +
          varPlaceholder.length +
          (prompt.length > 0 && currentPos > 0 && prompt[currentPos - 1] !== " "
            ? 2
            : 1);
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 100);

    // Open variable editor overlay on mobile
    setEditingVariableId(varName);
    setShowVariableEditor(true);

    toast({
      title: "Variable Created",
      description: `Variable "${varName}" was added to the prompt.`,
    });

    return varName;
  };

  const createVariableFromSelection = () => {
    if (!selectedText || !selectionRange) return;

    const varName = selectedText.trim().replace(/[\[\]]/g, "");
    const existingVariable = variables.find((v) => v.name === varName);

    if (existingVariable) {
      // Variable exists - show dialog asking what to do
      setLinkOrCreateDialog({
        open: true,
        varName,
        selectedText,
        selectionRange,
      });
    } else {
      // No existing variable - create new one directly
      performVariableCreation(varName, selectedText, selectionRange, false);
    }
  };

  const createQuickVariable = ({
    name,
    type,
    defaultValue,
    options,
  }: {
    name: string;
    type: "text" | "number" | "select";
    defaultValue: string;
    options?: string[];
  }) => {
    // Check if variable name already exists
    if (variables.some((v) => v.name === name)) {
      toast({
        title: "Variable already exists",
        description: `A variable named "${name}" already exists. Please choose a different name.`,
        variant: "destructive",
      });
      return;
    }

    // Convert QuickVariableCreator type to PromptEditor VariableType
    let variableType: VariableType = "text";
    if (type === "number") {
      variableType = "slider"; // Use slider for numbers
    } else if (type === "select") {
      variableType = "single-select";
    }

    // Convert options array to SelectOption format
    const selectOptions: SelectOption[] | undefined =
      type === "select" && options
        ? options.map((opt) => ({
            visibleName: opt,
            promptValue: opt,
          }))
        : undefined;

    // Create variable in PromptEditor format
      const newVariable: Variable = {
        id: name,
        name: name,
      description: "",
      type: variableType,
      defaultValue:
        type === "number" ? Number(defaultValue) || 0 : defaultValue,
      options: selectOptions,
      required: false,
      position: variables.length,
      min: type === "number" ? 0 : undefined,
      max: type === "number" ? 100 : undefined,
    };

    setVariables([...variables, newVariable]);
    setOpenVariables([name]);

    // Add variable placeholder to prompt
    const varPlaceholder = `[${name}]`;
    const currentPos =
      textareaRef.current?.selectionStart ??
      caretPosition ??
      prompt.length;
    const newPrompt =
      prompt.substring(0, currentPos) +
      (prompt.length > 0 && currentPos > 0 && prompt[currentPos - 1] !== " "
        ? " "
        : "") +
      varPlaceholder +
      " " +
      prompt.substring(currentPos);
    setPrompt(newPrompt);
    setCaretPosition(currentPos + varPlaceholder.length + 1);

    // Focus and move cursor after the variable
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos =
          currentPos +
          varPlaceholder.length +
          (prompt.length > 0 && currentPos > 0 && prompt[currentPos - 1] !== " "
            ? 2
            : 1);
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 100);

    toast({
      title: "Variable Created",
      description: `Variable "${name}" was added to the prompt.`,
    });
  };

  const downloadGeneratedImage = async () => {
    if (!generatedImage) return;
    try {
      const res = await fetch(generatedImage);
      if (!res.ok) throw new Error(String(res.status));
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `generation-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e: unknown) {
      toast({
        title: "Download Failed",
        description: getErrorMessage(e) || "Could not download image.",
        variant: "destructive",
      });
    }
  };

  const performVariableCreation = (
    varName: string,
    originalText: string,
    range: { start: number; end: number },
    createNew: boolean
  ) => {
    const varPlaceholder = `[${varName}]`;
    const existingVariable = variables.find((v) => v.name === varName);

    // Replace selected text with the variable placeholder
    const newPrompt =
      prompt.substring(0, range.start) +
      varPlaceholder +
      prompt.substring(range.end);
    setPrompt(newPrompt);

    // Move cursor to after the variable
    const newCursorPos = range.start + varPlaceholder.length;
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 100);

    setSelectedText("");
    setSelectionRange(null);

    if (existingVariable && !createNew) {
      const trimmedOriginal = originalText.trim();
      if (trimmedOriginal) {
        setVariables((prev) =>
          prev.map((v) =>
            v.id === existingVariable.id
              ? { ...v, defaultValue: trimmedOriginal }
              : v
          )
        );
      }
      toast({
        title: "Variable Linked",
        description: `Existing variable "${varName}" was inserted.`,
      });
      setOpenVariables([existingVariable.id]);
      setEditingVariableId(existingVariable.id);
      setShowVariableEditor(true);
    } else {
      // Create new variable (with unique name if needed)
      let finalVarName = varName;
      if (createNew && existingVariable) {
        // Generate unique name by adding number suffix
        let counter = 2;
        while (variables.some((v) => v.name === `${varName}_${counter}`)) {
          counter++;
        }
        finalVarName = `${varName}_${counter}`;

        // Update the prompt with the new unique name
        const uniquePlaceholder = `[${finalVarName}]`;
        const updatedPrompt =
          prompt.substring(0, range.start) +
          uniquePlaceholder +
          prompt.substring(range.end);
        setPrompt(updatedPrompt);
      }

      const newVariable: Variable = {
        id: finalVarName,
        name: finalVarName,
        description: "",
        type: "text",
        defaultValue: originalText,
        required: false,
        position: variables.length,
      };

      setVariables((prev) => [...prev, newVariable]);
      setOpenVariables([finalVarName]);
      setEditingVariableId(finalVarName);
      setShowVariableEditor(true);

      toast({
        title: "Variable Created",
        description: `New variable "${finalVarName}" was created.`,
      });
    }
  };

  const handleLinkVariable = () => {
    const {
      varName,
      selectedText: origText,
      selectionRange: range,
    } = linkOrCreateDialog;
    if (range) {
      performVariableCreation(varName, origText, range, false);
    }
    setLinkOrCreateDialog({
      open: false,
      varName: "",
      selectedText: "",
      selectionRange: null,
    });
  };

  const handleCreateNewVariable = () => {
    const {
      varName,
      selectedText: origText,
      selectionRange: range,
    } = linkOrCreateDialog;
    if (range) {
      performVariableCreation(varName, origText, range, true);
    }
    setLinkOrCreateDialog({
      open: false,
      varName: "",
      selectedText: "",
      selectionRange: null,
    });
  };

  useEffect(() => {
    if (promptType === "free-prompt") return;
    const timeoutId = setTimeout(() => {
      // Get all unique variable candidates from [], {} and ()
      const tokenRegex = /\[([^\]]+)\]|\{([^}]+)\}|\(([^)]+)\)/g;
      const uniqueVarNames = new Set<string>();
      const rawTokenMap = new Map<string, string>();
      let match;
      while ((match = tokenRegex.exec(prompt)) !== null) {
        const rawInner = (match[1] ?? match[2] ?? match[3] ?? "").trim();
        if (!rawInner) continue;
        uniqueVarNames.add(rawInner);
        if (!rawTokenMap.has(rawInner)) rawTokenMap.set(rawInner, match[0]);
      }

      setVariables((prev) => {
        const existingVars = prev.filter((v) => uniqueVarNames.has(v.name));
        const existingNames = new Set(existingVars.map((v) => v.name));

        const newVars: Variable[] = [];
        const replacements: { raw: string; trimmed: string }[] = [];
        uniqueVarNames.forEach((varName) => {
          const raw = varName.trim();
          const normalizeVariableName = (value: string) =>
            value
              .replace(/[\[\]()]/g, "")
              .replace(/\s+/g, " ")
              // Remove trailing separators used between name and examples
              // while keeping valid internal separators like MACRO_NAME / MACRO-NAME.
              .replace(/[\s\-–—:;,.\/|]+$/, "")
              .trim();

          // 1) Detect quoted choice lists: ["A", "B", ...] → multi-select
          const quotedOptions = Array.from(
            raw.matchAll(/"([^"]+)"/g),
            (m) => (m[1] ?? "").trim()
          ).filter(Boolean);
          const hasQuotedChoiceList = quotedOptions.length >= 2;
          const normalizedOptions = Array.from(new Set(quotedOptions)).map((opt) => ({
            visibleName: opt,
            promptValue: opt,
          }));

          // Plain [free text] without structured patterns: full text → default, auto FieldN name
          const nestedEarly = raw.match(/^(.*?)\s*[\(\[\{]\s*(.*?)\s*[\)\]\}]\s*$/);
          const egEarly = raw.match(/^(.*?)(?:[-–—]*\s*)?\b(e\.g\.)\b(.*)$/i);
          const capsEarly = raw.match(/^([A-Z0-9][A-Z0-9\s_\-\/]*)/);
          const isPlainBracket =
            !hasQuotedChoiceList &&
            !nestedEarly &&
            !egEarly &&
            !capsEarly;

          if (isPlainBracket) {
            if (existingNames.has(varName)) return;
            const finalName = generateUniqueFieldName(existingNames);
            newVars.push({
              id: finalName,
              name: finalName,
              description: "",
              type: "text",
              defaultValue: raw,
              required: true,
              position: existingVars.length + newVars.length,
              needsNameAttention: true,
            });
            const rawToken = rawTokenMap.get(varName) ?? `[${varName}]`;
            if (rawToken !== `[${finalName}]`) {
              replacements.push({ raw: varName, trimmed: finalName });
            }
            return;
          }

          // 2) Extract base variable name for patterns like:
          // [MACRO MEDIUM - e.g., stream of liquid gold, plume of smoke, silk ribbon]
          // "e.g." and any text outside the name → description (optional). Default value stays empty.
          let suggestedName = "";
          let extractedDescription = "";

          if (!hasQuotedChoiceList) {
            // Nested bracket pattern: OUTER_TEXT (inner), OUTER_TEXT [inner], OUTER_TEXT {inner}
            const nestedMatch = raw.match(/^(.*?)\s*[\(\[\{]\s*(.*?)\s*[\)\]\}]\s*$/);
            if (nestedMatch) {
              const namePart = nestedMatch[1] ?? "";
              suggestedName = normalizeVariableName(namePart);
              extractedDescription = (nestedMatch[2] ?? "").trim();
            } else {
              const egMatch = raw.match(/^(.*?)(?:[-–—]*\s*)?\b(e\.g\.)\b(.*)$/i);
              if (egMatch) {
                const namePart = egMatch[1] ?? "";
                suggestedName = normalizeVariableName(namePart);
                extractedDescription = raw.slice(namePart.length).trim();
              } else {
                // Fallback: leading ALL CAPS words form the name, rest is description (not default)
                const nameMatch = raw.match(/^([A-Z0-9][A-Z0-9\s_\-\/]*)/);
                if (nameMatch) {
                  const namePart = nameMatch[1] ?? "";
                  suggestedName = normalizeVariableName(namePart);
                  const rest = raw.slice(nameMatch[0].length).trim();
                  if (rest) {
                    extractedDescription = rest.replace(/^[-–—:\s]+/, "").trim();
                  }
                }
              }
            }
          }

          const baseNameFromLabel = hasQuotedChoiceList
            ? raw
                .replace(/"[^"]*"/g, "")
                .replace(/[\[\]]/g, "")
                .replace(/[,;:]+/g, " ")
                .replace(/\s+/g, " ")
                .trim()
            : suggestedName;

          const trimmedName = (baseNameFromLabel || raw)
            .trim()
            .replace(/[\[\]]/g, "");
          const normalizedName = normalizeVariableName(trimmedName);

          const fallbackName = normalizedOptions[0]?.visibleName ?? "";
          const finalName = normalizedName || fallbackName;

          if (!finalName || existingNames.has(finalName) || existingNames.has(varName)) return;
          existingNames.add(finalName);

          const initialDefault: string | string[] = hasQuotedChoiceList ? [] : "";

          newVars.push({
            id: finalName,
            name: finalName,
            description: extractedDescription,
            type: hasQuotedChoiceList ? "multi-select" : "text",
            defaultValue: initialDefault,
            options: hasQuotedChoiceList ? normalizedOptions : undefined,
            required: true,
            position: existingVars.length + newVars.length,
          });

          const rawToken = rawTokenMap.get(varName) ?? `[${varName}]`;
          if (rawToken !== `[${finalName}]`) {
            replacements.push({ raw: varName, trimmed: finalName });
          }
        });

        if (newVars.length > 0) {
          setOpenVariables((prevOpen) => [...prevOpen, ...newVars.map((v) => v.id)]);
          if (replacements.length > 0) {
            let newPrompt = prompt;
            replacements.forEach(({ raw, trimmed }) => {
              const escapedRaw = raw.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
              const rawSquare = `\\[${escapedRaw}\\]`;
              const rawCurly = `\\{${escapedRaw}\\}`;
              const rawRound = `\\(${escapedRaw}\\)`;
              const rx = new RegExp(`${rawSquare}|${rawCurly}|${rawRound}`, "g");
              newPrompt = newPrompt.replace(rx, `[${trimmed}]`);
            });
            setPrompt(newPrompt);
          }
        }

        return [...existingVars, ...newVars];
      });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [prompt, promptType]);

  // Update button position when selection changes
  useEffect(() => {
    if (selectionRange && textareaRef.current) {
      updateButtonPosition();
    }
  }, [selectionRange, updateButtonPosition]);

  // Update button position on scroll
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleScroll = () => {
      // Keep highlighted overlay in sync with the real textarea scroll position.
      if (desktopPromptOverlayRef.current) {
        desktopPromptOverlayRef.current.scrollTop = textarea.scrollTop;
        desktopPromptOverlayRef.current.scrollLeft = textarea.scrollLeft;
      }
      if (mobilePromptOverlayRef.current) {
        mobilePromptOverlayRef.current.scrollTop = textarea.scrollTop;
        mobilePromptOverlayRef.current.scrollLeft = textarea.scrollLeft;
      }
      if (selectionRange) {
        updateButtonPosition();
      }
    };

    textarea.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => textarea.removeEventListener("scroll", handleScroll);
  }, [selectionRange, updateButtonPosition]);

  const deleteVariable = (varId: string) => {
    setVariableToDelete(varId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteVariable = () => {
    if (!variableToDelete) return;

    const variable = variables.find((v) => v.id === variableToDelete);
    if (!variable) return;

    const placeholderRegex = new RegExp(
      `\\[${variable.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\]`,
      "g"
    );
    const newPrompt = prompt.replace(placeholderRegex, "");
    setPrompt(newPrompt);

    setVariables(variables.filter((v) => v.id !== variableToDelete));
    setDeleteDialogOpen(false);
    setVariableToDelete(null);
  };

  const commitVariableName = (varId: string, rawValue: string) => {
    const sanitized = rawValue.trim().replace(/[\[\]]/g, "");
    const currentVar = variables.find((v) => v.id === varId);
    setEditingVariableName(null);
    if (!currentVar) return;
    if (!sanitized) {
      toast({ title: "Name cannot be empty", variant: "destructive" });
      return;
    }
    if (sanitized === currentVar.name) return;
    updateVariable(varId, { name: sanitized });
  };

  const updateVariable = (varId: string, updates: Partial<Variable>) => {
    // Check for duplicate name if name is being updated
    if (updates.name !== undefined) {
      const newName = updates.name;
      const currentVar = variables.find((v) => v.id === varId);

      // Check if this name already exists (excluding the current variable)
      const duplicateExists = variables.some(
        (v) => v.id !== varId && v.name === newName
      );

      if (duplicateExists && currentVar && currentVar.name !== newName) {
        toast({
          title: "Error",
          description: `A variable with the name "${newName}" already exists. Please choose a different name.`,
          variant: "destructive",
        });
        return; // Don't update
      }

      // Also update the prompt to reflect the name change
      if (currentVar && currentVar.name !== newName) {
        const oldPlaceholder = `[${currentVar.name}]`;
        const newPlaceholder = `[${newName}]`;
        const newPrompt = prompt.split(oldPlaceholder).join(newPlaceholder);
        setPrompt(newPrompt);

        // Update the variable ID as well since it's based on name
        setVariables(
          variables.map((v) =>
            v.id === varId
              ? { ...v, ...updates, id: newName, needsNameAttention: false }
              : v
          )
        );
        // Keep the variable accordion open after rename (openVariables uses variable id)
        setOpenVariables((prev) => prev.map((id) => (id === varId ? newName : id)));
        return;
      }
    }

    setVariables(
      variables.map((v) => {
        if (v.id !== varId) return v;
        const next = { ...v, ...updates } as Variable;
        if (updates.name !== undefined) next.needsNameAttention = false;
        return next;
      })
    );
  };

  const addOption = (varId: string) => {
    const input = newOptionInput[varId] || "";
    if (!input.trim()) return;

    const parts = input.split("|||");
    const visibleName = parts[0]?.trim() || "";
    const promptValue = parts[1]?.trim() || "";

    if (!visibleName || !promptValue) return;

    const variable = variables.find((v) => v.id === varId);
    if (!variable) return;

    const newOption: SelectOption = {
      visibleName,
      promptValue,
    };

    updateVariable(varId, {
      options: [...(variable.options || []), newOption],
    });

    setNewOptionInput({ ...newOptionInput, [varId]: "" });
  };

  const removeOption = (varId: string, index: number) => {
    const variable = variables.find((v) => v.id === varId);
    if (!variable || !variable.options) return;

    const newOptions = variable.options.filter((_, i) => i !== index);
    updateVariable(varId, { options: newOptions });
  };

  const updateOption = (
    varId: string,
    index: number,
    field: "visibleName" | "promptValue",
    value: string
  ) => {
    const variable = variables.find((v) => v.id === varId);
    if (!variable || !variable.options) return;

    const newOptions = [...variable.options];
    if (field === "promptValue") {
      const prev = newOptions[index];
      const pv = value;
      const visEmpty = !prev.visibleName?.trim();
      newOptions[index] = {
        ...prev,
        promptValue: pv,
        ...(visEmpty && pv.trim() ? { visibleName: pv.trim() } : {}),
      };
    } else {
      newOptions[index] = { ...newOptions[index], [field]: value };
    }
    updateVariable(varId, { options: newOptions });
  };

  const handleGenerate = async () => {
    if (!account) {
      setShowLoginRequiredDialog(true);
      return;
    }

    const previewText = renderPreviewWithDefaults();
    if (!previewText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt.",
        variant: "destructive",
      });
      return;
    }

    const variableValues = getCurrentVariableValues();
    const aspectRatioVal = aspectRatio || "16:9";
    const newId = `gen-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const newItem: GenerationItem = {
      id: newId,
      imageUrl: null,
      variableValues: { ...variableValues },
      aspectRatio: aspectRatioVal,
      status: "pending",
    };
    setGenerations((prev) => [newItem, ...prev]);
    setIsGenerating(true);

    try {
      const data = await generateImageWithPayment(
        {
          prompt: previewText,
          resolution: "2K",
          aspectRatio: aspectRatioVal,
          useEnhancement: enhancement === "prompt",
        },
        selectedChain
      ) as { imageUrl: string; prompt?: string; provider?: string; usedGemini?: boolean; metadata?: unknown };

      setGenerations((prev) =>
        prev.map((g) =>
          g.id === newId ? { ...g, imageUrl: data.imageUrl, status: "completed" as const } : g
        )
      );
      setGeneratedImage(data.imageUrl);
      const userKey = getUserKeyFromAccount(account);
      if (userKey && data?.imageUrl) {
        try {
          await apiRequest("POST", "/api/generations", {
            userKey,
            prompt: previewText,
            imageUrl: String(data.imageUrl),
            provider: typeof data.provider === "string" ? data.provider : "unknown",
            meta: { usedGemini: Boolean(data.usedGemini ?? false) },
          });
        } catch {
          // ignore
        }
        addCreation(userKey, {
          id: newId,
          imageUrl: data.imageUrl,
          prompt: previewText,
          createdAt: new Date().toISOString(),
          status: "completed",
          source: "prompt_editor",
        });
      }
      toast({ title: "Generation Complete", description: "Your image was generated successfully." });
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      setGenerations((prev) =>
        prev.map((g) => (g.id === newId ? { ...g, status: "failed" as const } : g))
      );
      if (errorMessage?.includes("Wallet not connected") || errorMessage?.includes("wallet")) {
        setShowLoginRequiredDialog(true);
      } else {
        toast({
          title: "Generation Failed",
          description: errorMessage || "Error generating image.",
          variant: "destructive",
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const proceedWithGenerate = async () => {
    setUnsavedVariableDialog(false);
    setOpenVariables([]);
    if (!account) {
      setShowLoginRequiredDialog(true);
      return;
    }
    const previewText = renderPreviewWithDefaults();
    const variableValues = getCurrentVariableValues();
    const aspectRatioVal = aspectRatio || "16:9";
    const newId = `gen-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const newItem: GenerationItem = {
      id: newId,
      imageUrl: null,
      variableValues: { ...variableValues },
      aspectRatio: aspectRatioVal,
      status: "pending",
    };
    setGenerations((prev) => [newItem, ...prev]);
    setIsGenerating(true);

    try {
      const data = await generateImageWithPayment(
        {
          prompt: previewText,
          resolution: "2K",
          aspectRatio: aspectRatioVal,
          useEnhancement: enhancement === "prompt",
        },
        selectedChain
      ) as { imageUrl: string; prompt?: string; provider?: string; usedGemini?: boolean; metadata?: unknown };
      setGenerations((prev) =>
        prev.map((g) =>
          g.id === newId ? { ...g, imageUrl: data.imageUrl, status: "completed" as const } : g
        )
      );
      setGeneratedImage(data.imageUrl);
      const userKey = getUserKeyFromAccount(account);
      if (userKey && data?.imageUrl) {
        try {
          await apiRequest("POST", "/api/generations", {
            userKey,
            prompt: previewText,
            imageUrl: String(data.imageUrl),
            provider: typeof data.provider === "string" ? data.provider : "unknown",
            meta: { usedGemini: Boolean(data.usedGemini ?? false) },
          });
        } catch {
          // ignore
        }
        addCreation(userKey, {
          id: newId,
          imageUrl: data.imageUrl,
          prompt: previewText,
          createdAt: new Date().toISOString(),
          status: "completed",
          source: "prompt_editor",
        });
      }
      toast({ title: "Generation Complete", description: "Your image was generated successfully." });
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      setGenerations((prev) =>
        prev.map((g) => (g.id === newId ? { ...g, status: "failed" as const } : g))
      );
      if (errorMessage?.includes("Wallet not connected") || errorMessage?.includes("wallet")) {
        setShowLoginRequiredDialog(true);
      } else {
        toast({
          title: "Generation Failed",
          description: errorMessage || "Error generating image.",
          variant: "destructive",
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const savePromptMutation = useMutation({
    mutationFn: async () => {
      if (!account?.address) {
        throw new Error("Connect your wallet to release.");
      }
      const payload = {
        creator: account.address,
        title: promptTitle,
        ...(currentPromptId ? { promptId: currentPromptId } : {}),
        content: prompt,
        category,
        aiModel,
        price: Math.round(price * PRICE_PER_GENERATION_SCALE),
        aspectRatio,
        photoCount,
        promptType,
        uploadedPhotos,
        resolution,
        isFreeShowcase,
        usePromptEnhancement: enhancement === "prompt",
        generatedImageUrl: (() => {
          const completed = generations.filter((g) => g.status === "completed" && g.imageUrl);
          const selected = completed.filter((g) => selectedGenerationIds.has(g.id));
          const forRelease = selected.length > 0 ? selected : completed;
          return forRelease[0]?.imageUrl ?? generatedImage ?? null;
        })(),
        variables:
          promptType === "free-prompt"
            ? []
            : variables
                .filter((variable) => {
                  if (variable.type !== "multi-select" && variable.type !== "single-select") return true;
                  const opts = variable.options ?? [];
                  const draft = newOptionInput[variable.id]?.trim();
                  const draftParts = draft ? draft.split("|||").map((p) => p.trim()) : [];
                  const hasDraft =
                    draftParts.length >= 2 &&
                    (draftParts[0] !== "" || draftParts[1] !== "");
                  const nonEmpty = opts.filter(
                    (opt) =>
                      (opt.visibleName?.trim() ?? "") !== "" ||
                      (opt.promptValue?.trim() ?? "") !== ""
                  );
                  return nonEmpty.length > 0 || hasDraft;
                })
                .map((variable) => {
                  const isSelect =
                    variable.type === "multi-select" || variable.type === "single-select";
                  let options: { visibleName: string; promptValue: string }[] | null =
                    isSelect && variable.options
                      ? variable.options.filter(
                          (opt) =>
                            (opt.visibleName?.trim() ?? "") !== "" ||
                            (opt.promptValue?.trim() ?? "") !== ""
                        )
                      : variable.options ?? null;
                  // Include the current "Add option" draft so the last option is saved when clicking Save
                  if (isSelect) {
                    const draft = newOptionInput[variable.id]?.trim();
                    if (draft) {
                      const parts = draft.split("|||");
                      const visibleName = parts[0]?.trim() ?? "";
                      const promptValue = parts[1]?.trim() ?? "";
                      if (visibleName !== "" || promptValue !== "") {
                        options = [...(options ?? []), { visibleName, promptValue }];
                      }
                    }
                  }
                  return {
                    name: variable.name,
                    description: variable.description ?? "",
                    type: variable.type,
                    defaultValue: variable.defaultValue,
                    required: variable.required,
                    position: variable.position,
                    min: variable.min ?? null,
                    max: variable.max ?? null,
                    options,
                    promptValue:
                      variable.type === "checkbox"
                        ? (variable.promptValue ?? "")
                        : undefined,
                  };
                }),
      };

      const response = await apiRequest("POST", "/api/enki/prompts", payload);
      const savedPrompt: unknown = await response.json();

      if (!response.ok) {
        const errorMessage =
          typeof savedPrompt === "object" &&
          savedPrompt !== null &&
          "error" in savedPrompt
            ? String((savedPrompt as { error?: unknown }).error)
            : "Failed to save prompt";
        throw new Error(errorMessage);
      }

      if (
        typeof savedPrompt !== "object" ||
        savedPrompt === null ||
        !("id" in savedPrompt)
      ) {
        throw new Error("Invalid response from server");
      }

      const savedId = String((savedPrompt as { id?: unknown }).id ?? "");
      if (!savedId) {
        throw new Error("Invalid response from server");
      }

      setCurrentPromptId(savedId);
      // Flush draft options into state and remove empty options so UI matches saved data
      const varsToClearDraft: string[] = [];
      setVariables((prev) =>
        prev.map((v) => {
          if (v.type !== "multi-select" && v.type !== "single-select")
            return v;
          const opts = [...(v.options ?? [])];
          const draft = newOptionInput[v.id]?.trim();
          if (draft) {
            const parts = draft.split("|||");
            const visibleName = parts[0]?.trim() ?? "";
            const promptValue = parts[1]?.trim() ?? "";
            if (visibleName !== "" || promptValue !== "") {
              opts.push({ visibleName, promptValue });
              varsToClearDraft.push(v.id);
            }
          }
          const filtered = opts.filter(
            (opt) =>
              (opt.visibleName?.trim() ?? "") !== "" ||
              (opt.promptValue?.trim() ?? "") !== ""
          );
          return { ...v, options: filtered };
        })
      );
      if (varsToClearDraft.length > 0) {
        setNewOptionInput((prev) => {
          const next = { ...prev };
          varsToClearDraft.forEach((id) => {
            next[id] = "";
          });
          return next;
        });
      }
      return savedPrompt;
    },
    onSuccess: (savedPrompt: unknown) => {
      const type =
        typeof savedPrompt === "object" &&
        savedPrompt !== null &&
        "type" in savedPrompt
          ? String((savedPrompt as { type?: string }).type)
          : "";
      const isShowcase = type === "showcase";
      toast({
        title: "Prompt released",
        description: isShowcase
          ? "Your prompt was released to the Showroom."
          : "Your prompt was released to the Marketplace.",
      });
      router.push(isShowcase ? "/showcase" : "/");
    },
    onError: (error: unknown) => {
      console.error("Save error:", error);
      toast({
        title: "Error",
        description: getErrorMessage(error) || "An error occurred while saving.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (savePromptMutation.isPending) return;
    // Validate required fields
    if (!promptTitle.trim() || !category.trim()) {
      setShowValidationDialog(true);
      return;
    }
    savePromptMutation.mutate();
  };

  const loadPrompt = async (promptId: string) => {
    try {
      const promptResponse = await fetch(`/api/prompt?id=${promptId}`);
      const promptData: unknown = await promptResponse.json();

      if (!promptResponse.ok) {
        const errorMessage =
          typeof promptData === "object" &&
          promptData !== null &&
          "error" in promptData
            ? String((promptData as { error?: unknown }).error)
            : "Failed to load prompt";
        throw new Error(errorMessage);
      }

      if (typeof promptData !== "object" || promptData === null) {
        throw new Error("Invalid response from server");
      }

      const data = promptData as Record<string, unknown>;

      const variablesData: unknown[] = Array.isArray(data.variables)
        ? (data.variables as unknown[])
        : [];

      setCurrentPromptId(promptId);
      setPromptTitle(String(data.title ?? "").slice(0, 18));
      setPrompt(String(data.content ?? ""));
      setCategory(typeof data.category === "string" ? data.category : "");
      setAiModel(typeof data.aiModel === "string" ? data.aiModel : "gemini");
      setPrice(
        (() => {
          const stored =
            typeof (data as { pricing?: { pricePerGeneration?: number } }).pricing?.pricePerGeneration === "number"
              ? (data as { pricing: { pricePerGeneration: number } }).pricing.pricePerGeneration
              : typeof data.price === "number"
                ? data.price
                : 1;
          return stored / PRICE_PER_GENERATION_SCALE;
        })()
      );
      setAspectRatio(typeof data.aspectRatio === "string" ? data.aspectRatio : null);
      setPhotoCount(typeof data.photoCount === "number" ? data.photoCount : 1);
      setResolution(typeof data.resolution === "string" ? data.resolution : null);
      setPromptType(
        (typeof data.promptType === "string"
          ? data.promptType
          : "create-now") as PromptType
      );
      setIsFreeShowcase(Boolean(data.isFreeShowcase ?? false));
      setUploadedPhotos(
        Array.isArray(data.uploadedPhotos)
          ? (data.uploadedPhotos as string[])
          : []
      );

      const isSelectType = (t: string) =>
        t === "multi-select" || t === "single-select";
      const nonEmptyOption = (opt: { visibleName?: string; promptValue?: string; title?: string; value?: string }) =>
        (String(opt?.visibleName ?? opt?.title ?? "").trim() !== "" ||
          String(opt?.promptValue ?? opt?.value ?? "").trim() !== "");

      setVariables(
        variablesData
          .filter((v: unknown): v is Record<string, unknown> =>
            typeof v === "object" && v !== null
          )
          .map((v) => {
            const type = (v.type as VariableType) ?? "text";
            const rawOptions = Array.isArray(v.options)
              ? (v.options as unknown as SelectOption[])
              : undefined;
            const options =
              rawOptions && isSelectType(type)
                ? rawOptions
                    .filter(nonEmptyOption)
                    .map((o) => ({
                      visibleName: String(o?.visibleName ?? (o as { title?: string }).title ?? ""),
                      promptValue: String(o?.promptValue ?? (o as { value?: string }).value ?? ""),
                    }))
                : rawOptions;
            return {
              id: String(v.id ?? v.name ?? ""),
              name: String(v.name ?? ""),
              description: String(v.description ?? ""),
              type,
              defaultValue: coerceVariableDefaultValue(v.defaultValue),
              required: Boolean(v.required ?? false),
              position: Number(v.position ?? 0),
              min: typeof v.min === "number" ? v.min : undefined,
              max: typeof v.max === "number" ? v.max : undefined,
              options,
            };
          })
      );
      setOpenVariables([]);
      setShowLoadDialog(false);

      toast({
        title: "Loaded",
        description: "Prompt was loaded successfully.",
      });
    } catch (error: unknown) {
      console.error("Load error:", error);
      toast({
        title: "Error",
        description: getErrorMessage(error) || "An error occurred while loading.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (initialPromptId?.trim()) {
      loadPrompt(initialPromptId.trim());
    }
  }, [initialPromptId]);

  // Default USD price for new prompts: Minimum Price from DB (user settings) or localStorage fallback
  useEffect(() => {
    if (initialPromptId?.trim() || hasAppliedDefaultPriceRef.current) return;

    const fromApi = userSettings?.settings?.minimumPrice;
    const fromStorage = typeof window !== "undefined" ? localStorage.getItem("minimumPrice") : null;
    const minPriceStr = fromApi ?? fromStorage ?? null;
    if (minPriceStr == null) return;

    const minPrice = parseFloat(minPriceStr);
    if (!Number.isNaN(minPrice) && minPrice >= 0) {
      setPrice(minPrice);
      hasAppliedDefaultPriceRef.current = true;
    }
  }, [initialPromptId, userSettings?.settings?.minimumPrice]);

  const settingsData: PromptSettings = {
    title: promptTitle,
    category,
    aiModel,
    price,
    aspectRatio,
    photoCount,
    promptType,
    uploadedPhotos,
    resolution,
    isFreeShowcase,
    enhancement: enhancement as "none" | "prompt",
  };

  const handleSettingsUpdate = (updates: Partial<PromptSettings>) => {
    if (updates.title !== undefined) setPromptTitle(updates.title.slice(0, 18));
    if (updates.category !== undefined) setCategory(updates.category);
    if (updates.aiModel !== undefined) setAiModel(updates.aiModel);
    if (updates.price !== undefined) setPrice(updates.price);
    if (updates.aspectRatio !== undefined) setAspectRatio(updates.aspectRatio);
    if (updates.photoCount !== undefined) setPhotoCount(updates.photoCount);
    if (updates.promptType !== undefined) {
      setPromptType(updates.promptType);
      if (updates.promptType === "free-prompt") {
        setVariables([]);
        setOpenVariables([]);
        setShowVariableEditor(false);
      }
    }
    if (updates.uploadedPhotos !== undefined)
      setUploadedPhotos(updates.uploadedPhotos);
    if (updates.resolution !== undefined) setResolution(updates.resolution);
    if (updates.isFreeShowcase !== undefined)
      setIsFreeShowcase(updates.isFreeShowcase);
    if (updates.enhancement !== undefined) setEnhancement(updates.enhancement as "none" | "prompt");
  };

  const renderPreviewWithDefaults = () => {
    let previewText = prompt;

    variables.forEach((variable) => {
      const placeholder = `[${variable.name}]`;
      let defaultDisplay = "";

      if (variable.type === "text") {
        defaultDisplay = (variable.defaultValue as string) || "";
      } else if (variable.type === "checkbox") {
        defaultDisplay = (variable.defaultValue as boolean)
          ? (variable.promptValue ?? "")
          : "";
      } else if (
        variable.type === "multi-select" ||
        variable.type === "single-select"
      ) {
        const defaultIndex = variable.defaultOptionIndex ?? 0;
        const defaultOption = variable.options?.[defaultIndex];
        defaultDisplay = defaultOption?.promptValue || "";
      } else if (variable.type === "slider") {
        defaultDisplay = String(variable.defaultValue || variable.min || 0);
      }

      // Use split/join instead of RegExp to avoid issues with special characters in variable names
      previewText = previewText.split(placeholder).join(defaultDisplay);
    });

    return previewText;
  };

  useEffect(() => {
    const previewText = renderPreviewWithDefaults();
    if (!previewText?.trim()) {
      setEstimateCost(null);
      return;
    }
    let cancelled = false;
    fetch("/api/estimate-generation-cost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: previewText,
        resolution: "2K",
        useEnhancement: enhancement === "prompt",
        userId: userKey ?? undefined,
      }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data || data.totalUsd == null) return;
        setEstimateCost(data.totalUsd);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [prompt, variables, enhancement, userKey]);

  // Normalize variables that look like a quoted list into multi-select options:
  // e.g. Variable Name: `"Istanbul", "Paris", "Rome"` →
  // type = multi-select, options = [{visibleName:"Istanbul",promptValue:"Istanbul"}, ...]
  useEffect(() => {
    setVariables((prev) => {
      let changed = false;
      const next = prev.map((v) => {
        const hasOptions = Array.isArray(v.options) && v.options.length > 0;
        if (
          hasOptions ||
          v.type === "slider" ||
          v.type === "radio" ||
          v.type === "checkbox"
        ) {
          return v;
        }

        const name = v.name ?? "";
        const quoted = Array.from(name.matchAll(/"([^"]+)"/g))
          .map((m) => (m[1] ?? "").trim())
          .filter(Boolean);
        if (quoted.length < 2) return v;

        const uniqueOptions = Array.from(new Set(quoted)).map((opt) => ({
          visibleName: opt,
          promptValue: opt,
        }));
        if (uniqueOptions.length === 0) return v;

        changed = true;
        return {
          ...v,
          type: "multi-select" as VariableType,
          defaultValue: [],
          options: uniqueOptions,
        };
      });
      return changed ? next : prev;
    });
  }, [variables.length]);

  const applyBlitzDefaults = useCallback(
    (defaults: Record<string, string>) => {
      setVariables((prev) =>
        prev.map((v) => {
            const inferred = pickDefaultForVariable(defaults, v);
            if (typeof inferred !== "string") return v;
          const value = inferred.trim();
          if (!value) return v;

          if (v.type === "multi-select" && Array.isArray(v.options) && v.options.length > 0) {
            const tokens = value
              .split(/[;,/|]/)
              .map((t) => t.trim())
              .filter(Boolean);
            const picked = v.options
              .map((o) => o.promptValue)
              .filter((opt) =>
                tokens.some((t) => t.toLowerCase() === opt.toLowerCase())
              );
            if (picked.length === 0) return v;
            return { ...v, defaultValue: Array.from(new Set(picked)) };
          }

          if (v.type === "single-select" && Array.isArray(v.options) && v.options.length > 0) {
            const idx = v.options.findIndex(
              (o) => o.promptValue.toLowerCase() === value.toLowerCase()
            );
            if (idx < 0) return v;
            return { ...v, defaultOptionIndex: idx };
          }

          return { ...v, defaultValue: value };
        })
      );
    },
    []
  );

  const executeBlitzDefaults = useCallback(async () => {
    if (!userKey) {
      toast({
        title: "Wallet required",
        description: "Connect your wallet to use Values.",
        variant: "destructive",
      });
      return;
    }
    const baseUrl =
      typeof window !== "undefined" ? window.location.origin : "";
    const url = `${baseUrl}/api/variable-defaults?chain=${encodeURIComponent(selectedChain)}`;
    const body = JSON.stringify({
      userId: userKey,
      prompt,
      variables: variables.map((v) => ({
        name: v.name,
        type: v.type,
        options: v.options ?? [],
      })),
    });

    setBlitzLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        credentials: "include",
      });

      let data: {
        defaults?: Record<string, string>;
        blitzRemaining?: number;
        blitzPaid?: boolean;
        error?: string;
      };

      if (res.ok) {
        data = await res.json();
      } else if (res.status === 402) {
        data = (await fetchWithPayment(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        })) as typeof data;
      } else {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(err.error || `Request failed (${res.status})`);
      }

      const defaults = (data?.defaults ?? {}) as Record<string, string>;
      if (data.error && !Object.keys(defaults).length) {
        throw new Error(data.error);
      }

      applyBlitzDefaults(defaults);

      const remaining =
        typeof data.blitzRemaining === "number" ? data.blitzRemaining : undefined;
      const paid = data.blitzPaid === true;
      toast({
        title: paid ? "Values (paid)" : "Values",
        description:
          remaining !== undefined
            ? paid
              ? "Defaults applied. Free uses reset tomorrow at UTC midnight."
              : `${remaining} free run${remaining === 1 ? "" : "s"} left today.`
            : "Defaults applied.",
      });
    } catch (e) {
      toast({
        title: "Values failed",
        description: getErrorMessage(e),
        variant: "destructive",
      });
    } finally {
      setBlitzLoading(false);
    }
  }, [
    prompt,
    variables,
    userKey,
    selectedChain,
    fetchWithPayment,
    toast,
    applyBlitzDefaults,
  ]);

  const requestBlitzDefaults = useCallback(() => {
    if (!prompt.trim() || variables.length === 0) {
      toast({
        title: "Nothing to fill",
        description: "Add a prompt and at least one variable first.",
        variant: "destructive",
      });
      return;
    }
    if (!/\[[^\]]+\]/.test(prompt)) {
      toast({
        title: "No placeholders",
        description: "Use [VariableName] in the prompt first.",
        variant: "destructive",
      });
      return;
    }
    if (!userKey) {
      setShowLoginRequiredDialog(true);
      toast({
        title: "Wallet required",
        description: "Connect your wallet for the free daily quota (7 runs) and optional paid runs with USDC.",
        variant: "destructive",
      });
      return;
    }
    if (variables.some(variableHasNonEmptyDefault)) {
      setBlitzOverwriteOpen(true);
      return;
    }
    void executeBlitzDefaults();
  }, [prompt, variables, userKey, toast, executeBlitzDefaults]);

  const getCurrentVariableValues = useCallback((): Record<string, string | number | boolean | string[]> => {
    const out: Record<string, string | number | boolean | string[]> = {};
    variables.forEach((v) => {
      const name = v.name || v.id;
      if (v.type === "checkbox") {
        out[name] = v.defaultValue === true || v.defaultValue === "true" || v.defaultValue === "1";
      } else if (v.type === "multi-select" && Array.isArray(v.defaultValue)) {
        out[name] = v.defaultValue;
      } else if (v.type === "single-select" && v.options?.length) {
        const idx = v.defaultOptionIndex ?? 0;
        const opt = v.options[idx];
        out[name] = opt?.promptValue ?? "";
      } else {
        out[name] = (v.defaultValue as string | number) ?? "";
      }
    });
    return out;
  }, [variables]);

  const generationIsValid = useCallback(
    (gen: GenerationItem): boolean => {
      for (const v of variables) {
        const name = v.name || v.id;
        const val = gen.variableValues[name];
        if (val === undefined) continue;
        if (v.type === "multi-select" || v.type === "single-select") {
          const opts = v.options ?? [];
          const validValues = new Set(opts.map((o) => o.promptValue));
          if (v.type === "single-select") {
            if (!validValues.has(String(val))) return false;
          } else {
            const arr = Array.isArray(val) ? val : [val];
            if (arr.some((x) => !validValues.has(String(x)))) return false;
          }
        } else if (v.type === "slider") {
          const n = Number(val);
          const min = v.min ?? 0;
          const max = v.max ?? 100;
          if (Number.isNaN(n) || n < min || n > max) return false;
        }
      }
      return true;
    },
    [variables]
  );

  const invalidGenerationIdsList = useCallback(() => {
    return generations.filter((g) => !generationIsValid(g)).map((g) => g.id);
  }, [generations, generationIsValid]);

  useEffect(() => {
    const inv = invalidGenerationIdsList();
    if (inv.length === 0) return;
    setPromptChangeDialog((prev) => {
      if (prev.revertValue !== undefined) return prev;
      return {
        ...prev,
        open: true,
        invalidGenerationIds: inv,
        onConfirm: () => {
          setGenerations((p) => p.filter((g) => !inv.includes(g.id)));
          setSelectedGenerationIds((p) => {
            const next = new Set(p);
            inv.forEach((id) => next.delete(id));
            return next;
          });
          setPromptChangeDialog((p) => ({ ...p, open: false }));
        },
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps -- only run when variable definitions change
  }, [variables]);

  const [mobileTab, setMobileTab] = useState<
    "settings" | "editor" | "generation"
  >("settings");
  const [showVariableEditor, setShowVariableEditor] = useState(false);
  const [editingVariableId, setEditingVariableId] = useState<string | null>(
    null
  );
  const scrollYRef = useRef(0);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  // Lock mobile container scroll when variable editor overlay is open
  useEffect(() => {
    const mobileContainer = mobileContainerRef.current;
    if (!mobileContainer) return;

    if (showVariableEditor) {
      // Save current scroll position of the mobile container
      const scrollY = mobileContainer.scrollTop;
      scrollYRef.current = scrollY;
      // Lock the mobile container's vertical scroll
      mobileContainer.style.overflowY = "hidden";
    } else {
      // Restore mobile container scroll
      const savedScroll = scrollYRef.current;
      mobileContainer.style.overflowY = "auto";
      // Use requestAnimationFrame to ensure DOM has updated before setting scroll
      requestAnimationFrame(() => {
        if (mobileContainer) {
          mobileContainer.scrollTop = savedScroll;
        }
      });
      scrollYRef.current = 0;
    }

    // Cleanup on unmount - always restore overflow
    return () => {
      if (mobileContainer) {
        mobileContainer.style.overflowY = "auto";
      }
    };
  }, [showVariableEditor]);

  return (
    <TooltipProvider>
      {/* Desktop View: left = Prompt Settings (30%) + Prompt Editor (70%), right = Variables + Generation (equal) */}
      <div className="hidden md:grid h-full w-full overflow-hidden grid-cols-[1fr_1fr] gap-4 p-4">
        <div className="grid grid-cols-[3fr_7fr] gap-4 min-h-0 overflow-hidden min-w-0">
          <div className="min-h-0 min-w-0 overflow-hidden">
            <PromptSettingsPanel
              settings={settingsData}
              onUpdate={handleSettingsUpdate}
            />
          </div>
          <Card className="flex flex-col overflow-hidden min-h-0 min-w-0">
          <CardHeader className="pb-2 px-4 shrink-0">
            <CardTitle className="text-lg font-semibold font-serif">Prompt Editor</CardTitle>
          </CardHeader>

          <CardContent className="flex-1 min-h-0 flex flex-col gap-2 px-4 pb-4">
            <div
              ref={editorContainerRef}
              className="relative flex-1 rounded-lg min-h-[240px] bg-background"
              onClick={() => textareaRef.current?.focus()}
              style={{ resize: "vertical", overflow: "hidden" }}
            >
              <div
                ref={desktopPromptOverlayRef}
                className="absolute inset-0 font-mono text-sm whitespace-pre-wrap pointer-events-none overflow-hidden select-none text-foreground"
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  padding: "8px 12px",
                  lineHeight: "1.625",
                  boxSizing: "border-box",
                  overflow: "auto",
                }}
              >
                {prompt.split(/(\[[^\]]+\])/).map((part, index) => {
                  const match = part.match(/\[([^\]]+)\]/);
                  if (match) {
                    const varName = match[1];
                    const variable = variables.find((v) => v.name === varName);
                    if (variable) {
                      const isOpen = openVariables.includes(variable.id);
                      return (
                        <TooltipProvider key={index}>
                          <Tooltip delayDuration={200}>
                            <TooltipTrigger asChild>
                              <span
                                className={
                                  variable.needsNameAttention
                                    ? "select-none cursor-pointer pointer-events-auto inline font-mono font-medium bg-primary/20 text-primary hover:bg-primary/25 rounded-sm ring-2 ring-destructive ring-offset-1 ring-offset-background"
                                    : "select-none cursor-pointer pointer-events-auto inline font-mono font-medium bg-primary/20 text-primary hover:bg-primary/25"
                                }
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedVariableId(variable.id);
                                  setOpenVariables([variable.id]);
                                  const element = document.getElementById(
                                    `variable-${variable.id}`
                                  );
                                  if (element) {
                                    element.scrollIntoView({
                                      behavior: "smooth",
                                      block: "center",
                                    });
                                  }
                                }}
                                onMouseDown={(e) => e.preventDefault()}
                                data-testid={`badge-inline-variable-${variable.id}`}
                              >
                                [{varName}]
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">
                                {variable.needsNameAttention && (
                                  <span className="block text-destructive font-medium mb-1">
                                    Rename this placeholder variable.
                                  </span>
                                )}
                                Default Value: {String(variable.defaultValue || "Not set")}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      );
                    }
                  }

                  return (
                    <span key={index} className="select-none">
                      {part}
                    </span>
                  );
                })}
              </div>

              <Textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => {
                  const next = e.target.value;
                  if (generations.length > 0 && !promptChangeDialog.open) {
                    setPromptChangeDialog({
                      open: true,
                      revertValue: prompt,
                      onConfirm: () => {
                        setGenerations([]);
                        setSelectedGenerationIds(new Set());
                        setPromptChangeDialog((p) => ({ ...p, open: false }));
                      },
                      onRevert: () => {
                        setPrompt(prompt);
                        setPromptChangeDialog((p) => ({ ...p, open: false }));
                      },
                    });
                  }
                  setPrompt(next);
                }}
                onSelect={(e) => {
                  setCaretPosition(e.currentTarget.selectionStart);
                  handleTextSelection();
                }}
                onKeyDown={(e) => {
                  if (!textareaRef.current) return;
                  const pos = textareaRef.current.selectionStart;

                  const beforeCursor = prompt.substring(0, pos);
                  const afterCursor = prompt.substring(pos);

                  const openBracketBefore = beforeCursor.lastIndexOf("[");
                  const closeBracketBefore = beforeCursor.lastIndexOf("]");
                  const closeBracketAfter = afterCursor.indexOf("]");

                  if (
                    openBracketBefore > closeBracketBefore &&
                    closeBracketAfter !== -1
                  ) {
                    const newPos = pos + closeBracketAfter + 1;
                    e.preventDefault();
                    textareaRef.current.setSelectionRange(newPos, newPos);
                  }
                }}
                onClick={() => {
                  if (!textareaRef.current) return;

                  const start = textareaRef.current.selectionStart;
                  const end = textareaRef.current.selectionEnd;
                  if (start === end) {
                    clearSelection();
                  }

                  setCaretPosition(start);

                  setTimeout(() => {
                    if (!textareaRef.current) return;
                    const pos = textareaRef.current.selectionStart;

                    const beforeCursor = prompt.substring(0, pos);
                    const afterCursor = prompt.substring(pos);

                    const openBracketBefore = beforeCursor.lastIndexOf("[");
                    const closeBracketBefore = beforeCursor.lastIndexOf("]");
                    const closeBracketAfter = afterCursor.indexOf("]");

                    if (
                      openBracketBefore > closeBracketBefore &&
                      closeBracketAfter !== -1
                    ) {
                      const newPos = pos + closeBracketAfter + 1;
                      textareaRef.current.setSelectionRange(newPos, newPos);
                    }
                  }, 0);
                }}
                className="absolute inset-0 font-mono text-sm bg-transparent text-transparent caret-foreground z-[1] selection:bg-primary/30 whitespace-pre-wrap overflow-auto border-0 shadow-none ring-0 focus:ring-0 focus:outline-none focus-visible:ring-0 rounded-none"
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  resize: "none",
                  padding: "8px 12px",
                  lineHeight: "1.625",
                  boxSizing: "border-box",
                }}
                onMouseUp={handleTextSelection}
                onKeyUp={() => {
                  if (textareaRef.current) {
                    setCaretPosition(textareaRef.current.selectionStart);
                  }
                  handleTextSelection();
                }}
                placeholder={
                  promptType === "paid-prompt"
                    ? "Write your prompt here... Use [VariableName] for variables"
                    : "Write your full prompt here..."
                }
                data-testid="textarea-prompt"
              />

              {promptType === "paid-prompt" &&
                selectedText &&
                selectionRange &&
                buttonPosition && (
                  <Button
                    ref={buttonRef}
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      createVariableFromSelection();
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="absolute shadow-xl cursor-pointer bg-primary text-primary-foreground border-2 border-background pointer-events-auto"
                    style={{
                      top: `${buttonPosition.top}px`,
                      left: `${buttonPosition.left}px`,
                      zIndex: 50,
                    }}
                    data-testid="button-create-variable"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Variable
                  </Button>
                )}
            </div>

            <div className="border-t border-border/50 pt-3">
              <div className="text-xs font-medium text-muted-foreground">
                Preview
              </div>
              <div className="mt-2 rounded-md bg-background/40 p-3 font-mono text-xs whitespace-pre-wrap break-words max-h-[150px] overflow-y-auto">
                {renderPreviewWithDefaults()}
              </div>
            </div>
          </CardContent>
        </Card>
        </div>

        <div className={`grid gap-4 min-h-0 overflow-hidden min-w-0 ${promptType === "paid-prompt" ? "grid-cols-2" : "grid-cols-1"}`}>
        {promptType === "paid-prompt" && (
          <Card className="flex flex-col overflow-hidden min-h-0 min-w-0" style={{ contain: 'inline-size' }}>
            <CardHeader className="pb-2 px-4 shrink-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 shrink-0 min-w-0">
                  <CardTitle className="text-lg font-semibold font-serif shrink-0">Variables</CardTitle>
                  <div className="flex rounded-md border border-border p-0.5 bg-muted/50 shrink-0">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setVariablesMode("simple")}
                          className={`p-1.5 rounded transition-colors ${variablesMode === "simple" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                          data-testid="variables-mode-simple"
                          aria-label="Simple mode: quick default values"
                        >
                          <List className="h-3.5 w-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-xs">
                        Simple: one default value per variable
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => setVariablesMode("complex")}
                          className={`p-1.5 rounded transition-colors ${variablesMode === "complex" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                          data-testid="variables-mode-complex"
                          aria-label="Complex mode: full variable editor"
                        >
                          <SlidersHorizontal className="h-3.5 w-3.5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-xs">
                        Complex: types, options, and advanced settings
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {promptType === "paid-prompt" &&
                    variables.length > 0 && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="shrink-0 px-2 gap-1 min-w-[5.5rem]"
                            onClick={() => void requestBlitzDefaults()}
                            disabled={isShowcase || blitzLoading}
                            data-testid="button-blitz-defaults"
                            aria-label="Values: AI-filled defaults"
                            aria-busy={blitzLoading}
                          >
                            {blitzLoading ? (
                              <>
                                <Loader2
                                  className="h-3.5 w-3.5 animate-spin shrink-0"
                                  aria-hidden
                                />
                                <span className="text-xs font-medium">…</span>
                              </>
                            ) : (
                              <>
                                <span
                                  className="font-mono text-xs leading-none select-none"
                                  aria-hidden
                                >
                                  {"\u26A1"}
                                </span>
                                <span className="text-xs font-medium">Values</span>
                              </>
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-xs">
                          Fill defaults with AI (7 free per day, paid with USDC)
                        </TooltipContent>
                      </Tooltip>
                    )}
                  {promptType === "paid-prompt" && variablesMode === "complex" && (
                    <Button
                      size="sm"
                      variant="default"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
                      onClick={() => {
                        const createdId = createNewEmptyVariable(caretPosition);
                        if (createdId) {
                          setSelectedVariableId(createdId);
                          setOpenVariables([createdId]);
                          const element = document.getElementById(
                            `variable-${createdId}`
                          );
                          if (element) {
                            element.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            });
                          }
                        }
                      }}
                      disabled={isShowcase}
                      data-testid="button-add-variable-inspector"
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 px-4 pb-4 overflow-hidden">
              <ScrollArea className="h-full pr-2 w-full">
                {variables.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-10">
                    No variables yet.
                    <br />
                    Select text or use [Name]
                  </p>
                ) : variablesMode === "simple" ? (
                  <div className="space-y-3">
                    {variables.map((variable) => {
                      const varName = variable.name || variable.id;
                      const currentVal = variable.defaultValue;
                      const strVal = currentVal === undefined || currentVal === null ? "" : typeof currentVal === "object" ? JSON.stringify(currentVal) : String(currentVal);
                      return (
                        <div
                          key={variable.id}
                          className={`space-y-1.5 rounded-md ${
                            variable.needsNameAttention
                              ? "ring-2 ring-destructive p-2 -m-0.5"
                              : ""
                          }`}
                        >
                          <Label className="text-sm font-medium">{varName}</Label>
                          <BlitzDefaultFieldShell loading={blitzLoading}>
                            <Input
                              value={strVal}
                              onChange={(e) =>
                                updateVariable(variable.id, {
                                  defaultValue: e.target.value,
                                })
                              }
                              placeholder={`Value for ${varName}...`}
                              className="h-8 text-sm"
                              data-testid={`input-free-var-${variable.id}`}
                            />
                          </BlitzDefaultFieldShell>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2" style={{ contain: 'inline-size' }}>
                    {variables.map((variable) => (
                      <div
                        key={variable.id}
                        id={`variable-${variable.id}`}
                        className={`border rounded-lg p-3 overflow-hidden ${
                          variable.needsNameAttention ? "ring-2 ring-destructive" : ""
                        }`}
                      >
                        <div 
                          className="flex items-center justify-between gap-2 cursor-pointer select-none"
                          onClick={() => {
                            if (openVariables.includes(variable.id)) {
                              setOpenVariables(openVariables.filter(id => id !== variable.id));
                            } else {
                              setOpenVariables([...openVariables, variable.id]);
                            }
                          }}
                          onDoubleClick={(e) => e.preventDefault()}
                          data-testid={`accordion-trigger-${variable.id}`}
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1" style={{ overflow: 'hidden' }}>
                            <span 
                              className={`text-sm font-semibold font-sans ${selectedVariableId === variable.id ? 'text-primary' : 'text-foreground'}`}
                              style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                            >
                              {variable.name}
                            </span>
                            <Badge
                              variant="secondary"
                              className="text-xs font-medium font-sans bg-muted text-foreground border border-border shrink-0"
                            >
                              {variable.type}
                            </Badge>
                          </div>
                          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${openVariables.includes(variable.id) ? 'rotate-180' : ''}`} />
                        </div>
                        
                        {openVariables.includes(variable.id) && (
                          <div className="pt-3 space-y-2">
                            <div className="flex items-start gap-2">
                              <div style={{ flex: '1 1 0', width: 0, minWidth: 0 }}>
                                <div className="flex items-center gap-1.5">
                                <Label className="text-xs">Variable Name</Label>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent side="top" className="max-w-xs">
                                    This name will be displayed to users.
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                                {editingVariableName?.id === variable.id ? (
                                  <Input
                                    ref={nameInputRefDesktop}
                                    value={editingVariableName.value}
                                    onChange={(e) =>
                                      setEditingVariableName({ id: variable.id, value: e.target.value })
                                    }
                                    onBlur={() => {
                                      commitVariableName(variable.id, editingVariableName.value);
                                      setEditingVariableName(null);
                                    }}
                                    className="h-8 text-sm mt-1 font-mono"
                                    placeholder="VariableName (used as [Name] in prompt)"
                                    disabled={isShowcase}
                                    data-testid={`input-name-${variable.id}`}
                                  />
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setEditingVariableName({ id: variable.id, value: variable.name })
                                    }
                                    disabled={isShowcase}
                                    className="flex items-center gap-2 h-8 mt-1 px-2 rounded border border-transparent hover:border-input hover:bg-muted/50 text-left w-full min-w-0"
                                    data-testid={`button-edit-name-${variable.id}`}
                                  >
                                    <span className="text-sm font-mono truncate flex-1">
                                      {variable.name || " "}
                                    </span>
                                    <Pencil className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                  </button>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 mt-6 shrink-0"
                                onClick={() => deleteVariable(variable.id)}
                                disabled={isShowcase}
                                data-testid={`button-delete-${variable.id}`}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>

                          <div className="space-y-1">
                            <Label className="text-xs">
                              Description{" "}
                              <span className="text-muted-foreground font-normal">(optional)</span>
                            </Label>
                            <Textarea
                              value={variable.description}
                              onChange={(e) => {
                                updateVariable(variable.id, {
                                  description: e.target.value,
                                });
                              }}
                              placeholder="Optional hint for users (e.g. examples stay here, not in default value)"
                              className="min-h-[52px] text-sm resize-y"
                              disabled={isShowcase}
                              data-testid={`input-description-desktop-${variable.id}`}
                            />
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs">Type</Label>
                            <Select
                              value={variable.type}
                              onValueChange={(value) =>
                                updateVariable(variable.id, {
                                  type: value as VariableType,
                                })
                              }
                              disabled={isShowcase}
                            >
                              <SelectTrigger
                                className="h-8 text-sm"
                                data-testid={`select-type-${variable.id}`}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="checkbox">
                                  Checkbox
                                </SelectItem>
                                <SelectItem value="multi-select">
                                  Multi-Select
                                </SelectItem>
                                <SelectItem value="single-select">
                                  Single-Select
                                </SelectItem>
                                <SelectItem value="slider">Slider</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center gap-4 pt-1 flex-wrap">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`required-${variable.id}`}
                                checked={variable.required}
                                onCheckedChange={(checked) =>
                                  updateVariable(variable.id, {
                                    required: checked as boolean,
                                  })
                                }
                                data-testid={`checkbox-required-${variable.id}`}
                              />
                              <Label
                                htmlFor={`required-${variable.id}`}
                                className="text-sm"
                              >
                                Required
                              </Label>
                            </div>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center space-x-2 opacity-60 cursor-not-allowed">
                                  <Checkbox
                                    id={`allow-ref-image-${variable.id}`}
                                    checked={variable.allowReferenceImage || false}
                                    disabled
                                    data-testid={`checkbox-allow-ref-image-${variable.id}`}
                                  />
                                  <Label
                                    htmlFor={`allow-ref-image-${variable.id}`}
                                    className="text-sm text-muted-foreground cursor-not-allowed pointer-events-none"
                                  >
                                    allow reference image
                                  </Label>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                Next UX update will allow adding images for style references
                              </TooltipContent>
                            </Tooltip>
                          </div>

                          {variable.type === "text" && (
                            <div className="space-y-1">
                              <Label className="text-xs">Default Value</Label>
                              <BlitzDefaultFieldShell loading={blitzLoading}>
                                <Textarea
                                  value={(variable.defaultValue as string) || ""}
                                  onChange={(e) =>
                                    updateVariable(variable.id, {
                                      defaultValue: e.target.value,
                                    })
                                  }
                                  placeholder="Default Value"
                                  className="min-h-10 text-sm resize-y"
                                  disabled={isShowcase}
                                  data-testid={`input-default-${variable.id}`}
                                />
                              </BlitzDefaultFieldShell>
                            </div>
                          )}

                          {variable.type === "checkbox" && (
                            <>
                              <BlitzDefaultFieldShell loading={blitzLoading}>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`checkbox-${variable.id}`}
                                    checked={Boolean(variable.defaultValue)}
                                    onCheckedChange={(checked) =>
                                      updateVariable(variable.id, {
                                        defaultValue: checked,
                                      })
                                    }
                                    disabled={isShowcase}
                                    data-testid={`checkbox-default-${variable.id}`}
                                  />
                                  <Label
                                    htmlFor={`checkbox-${variable.id}`}
                                    className="text-sm"
                                  >
                                    Active by default
                                  </Label>
                                </div>
                              </BlitzDefaultFieldShell>
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5">
                                  <Label className="text-xs">Prompt value</Label>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="max-w-xs">
                                      The content is not shown publicly.
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <Textarea
                                  value={variable.promptValue ?? ""}
                                  onChange={(e) =>
                                    updateVariable(variable.id, {
                                      promptValue: e.target.value,
                                    })
                                  }
                                  placeholder="Text to insert when checkbox is checked"
                                  disabled={isShowcase}
                                  className="min-h-[80px] resize-y text-sm"
                                  data-testid={`textarea-prompt-value-${variable.id}`}
                                />
                              </div>
                            </>
                          )}

                          {(variable.type === "multi-select" ||
                            variable.type === "single-select") && (
                            <BlitzDefaultFieldShell loading={blitzLoading}>
                            <div className="space-y-2">
                              <Label className="text-xs">Default</Label>
                              <div className="space-y-2">
                                {variable.options?.map((option, index) => {
                                  const isDefault =
                                    (variable.defaultOptionIndex ?? 0) ===
                                    index;
                                  return (
                                    <Card
                                      key={index}
                                      className={
                                        isDefault
                                          ? "border-primary/50"
                                          : undefined
                                      }
                                    >
                                      <CardContent className="p-3 space-y-2">
                                        <div className="flex items-center gap-2">
                                          <Checkbox
                                            checked={isDefault}
                                            onCheckedChange={(checked) => {
                                              if (checked)
                                                updateVariable(variable.id, {
                                                  defaultOptionIndex: index,
                                                });
                                            }}
                                            disabled={isShowcase}
                                            data-testid={`checkbox-default-option-${variable.id}-${index}`}
                                          />
                                          <Input
                                            value={option.visibleName}
                                            onChange={(e) =>
                                              updateOption(
                                                variable.id,
                                                index,
                                                "visibleName",
                                                e.target.value
                                              )
                                            }
                                            className="h-8 text-sm"
                                            placeholder="Visible Name"
                                            disabled={isShowcase}
                                            data-testid={`input-option-visible-${variable.id}-${index}`}
                                          />
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() =>
                                              removeOption(variable.id, index)
                                            }
                                            disabled={isShowcase}
                                            data-testid={`button-remove-option-${variable.id}-${index}`}
                                          >
                                            <X className="h-4 w-4" />
                                          </Button>
                                        </div>
                                        <Textarea
                                          value={option.promptValue}
                                          onChange={(e) =>
                                            updateOption(
                                              variable.id,
                                              index,
                                              "promptValue",
                                              e.target.value
                                            )
                                          }
                                          className="min-h-[60px] text-sm resize-y"
                                          placeholder="Prompt Value"
                                          disabled={isShowcase}
                                          data-testid={`input-option-prompt-${variable.id}-${index}`}
                                        />
                                      </CardContent>
                                    </Card>
                                  );
                                })}

                                <Card>
                                  <CardContent className="p-3 space-y-2">
                                    <Input
                                      value={
                                        newOptionInput[variable.id]?.split(
                                          "|||"
                                        )[0] || ""
                                      }
                                      onChange={(e) => {
                                        const currentValue =
                                          newOptionInput[variable.id] || "|||";
                                        const parts = currentValue.split("|||");
                                        setNewOptionInput({
                                          ...newOptionInput,
                                          [variable.id]: `${e.target.value}|||${parts[1] || ""}`,
                                        });
                                      }}
                                      placeholder="Visible Name"
                                      className="h-8 text-sm"
                                      disabled={isShowcase}
                                      data-testid={`input-new-option-visible-${variable.id}`}
                                    />
                                    <Textarea
                                      value={
                                        newOptionInput[variable.id]?.split(
                                          "|||"
                                        )[1] || ""
                                      }
                                      onChange={(e) => {
                                        const currentValue =
                                          newOptionInput[variable.id] || "|||";
                                        const parts = currentValue.split("|||");
                                        setNewOptionInput({
                                          ...newOptionInput,
                                          [variable.id]: `${parts[0] || ""}|||${e.target.value}`,
                                        });
                                      }}
                                      placeholder="Prompt Value"
                                      className="min-h-[60px] text-sm resize-y"
                                      disabled={isShowcase}
                                      data-testid={`input-new-option-prompt-${variable.id}`}
                                    />
                                    <Button
                                      size="sm"
                                      onClick={() => addOption(variable.id)}
                                      className="w-full"
                                      disabled={
                                        isShowcase ||
                                        !newOptionInput[variable.id]
                                          ?.split("|||")
                                          .every((p) => p.trim())
                                      }
                                      data-testid={`button-add-option-${variable.id}`}
                                    >
                                      <Plus className="h-4 w-4 mr-1" />
                                      Add option
                                    </Button>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                            </BlitzDefaultFieldShell>
                          )}

                          {variable.type === "slider" && (
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label className="text-xs">Min</Label>
                                  <Input
                                    type="number"
                                    value={variable.min || 0}
                                    onChange={(e) =>
                                      updateVariable(variable.id, {
                                        min: parseInt(e.target.value),
                                      })
                                    }
                                    className="h-8 text-sm"
                                    disabled={isShowcase}
                                    data-testid={`input-min-${variable.id}`}
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Max</Label>
                                  <Input
                                    type="number"
                                    value={variable.max || 100}
                                    onChange={(e) =>
                                      updateVariable(variable.id, {
                                        max: parseInt(e.target.value),
                                      })
                                    }
                                    className="h-8 text-sm"
                                    disabled={isShowcase}
                                    data-testid={`input-max-${variable.id}`}
                                  />
                                </div>
                              </div>
                              <BlitzDefaultFieldShell loading={blitzLoading}>
                              <div>
                                <Label className="text-xs">
                                  Default: {variable.defaultValue as number}
                                </Label>
                                <Slider
                                  value={[Number(variable.defaultValue) || 0]}
                                  onValueChange={([value]) =>
                                    updateVariable(variable.id, {
                                      defaultValue: value,
                                    })
                                  }
                                  min={variable.min || 0}
                                  max={variable.max || 100}
                                  step={1}
                                  disabled={isShowcase}
                                  data-testid={`slider-default-${variable.id}`}
                                />
                              </div>
                              </BlitzDefaultFieldShell>
                            </div>
                          )}

                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => {
                              setOpenVariables(
                                openVariables.filter((id) => id !== variable.id)
                              );
                            }}
                            className="w-full"
                            disabled={variable.required && !variable.name.trim()}
                            data-testid={`button-save-variable-${variable.id}`}
                          >
                            Save
                          </Button>
                        </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        <Card className="flex flex-col overflow-hidden min-h-0 min-w-0">
          <CardHeader className="pb-2 px-4 shrink-0 flex flex-row items-center justify-between gap-2">
            <CardTitle className="text-lg font-semibold font-serif">Generation</CardTitle>
            {selectedGenerationIds.size > 0 && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => {
                  setGenerations((prev) => prev.filter((g) => !selectedGenerationIds.has(g.id)));
                  setSelectedGenerationIds(new Set());
                }}
                title="Delete selected"
                data-testid="button-delete-selected-generations"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="flex-1 min-h-0 flex flex-col gap-3 px-4 pb-4 overflow-hidden">
            <div className="flex-1 min-h-0 overflow-y-auto">
              <div className="grid grid-cols-3 gap-2">
                {generations.map((gen) => {
                  const ar = gen.aspectRatio || "16:9";
                  const parts = ar.split(":").map(Number);
                  const w = parts[0] || 16;
                  const h = parts[1] || 9;
                  const paddingBottom = `${(h / w) * 100}%`;
                  return (
                    <div
                      key={gen.id}
                      className="relative rounded-md border bg-muted/30 overflow-hidden group"
                      style={{ paddingBottom }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        {gen.status === "pending" ? (
                          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        ) : gen.imageUrl ? (
                          <>
                            <img
                              src={gen.imageUrl}
                              alt="Generated"
                              className="w-full h-full object-contain cursor-pointer"
                              onClick={() => setLightboxImageUrl(gen.imageUrl)}
                              data-testid={`generated-image-${gen.id}`}
                            />
                            <div
                              className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center bg-gradient-to-b from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                variables.forEach((v) => {
                                  const name = v.name || v.id;
                                  const val = gen.variableValues[name];
                                  if (val === undefined) return;
                                  updateVariable(v.id, { defaultValue: val });
                                });
                              }}
                              title="Apply these variable values to Variables"
                              data-testid={`apply-vars-${gen.id}`}
                            >
                              <ArrowLeft className="h-5 w-5 text-white" />
                            </div>
                            <div
                              className="absolute top-1 right-1 z-10"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Checkbox
                                checked={selectedGenerationIds.has(gen.id)}
                                onCheckedChange={(checked) => {
                                  setSelectedGenerationIds((prev) => {
                                    const next = new Set(prev);
                                    if (checked) next.add(gen.id);
                                    else next.delete(gen.id);
                                    return next;
                                  });
                                }}
                                data-testid={`checkbox-generation-${gen.id}`}
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <span className="text-xs text-muted-foreground">Failed</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute top-0 right-0 z-10 h-5 w-5 min-w-5 rounded-full bg-muted/80 text-muted-foreground hover:bg-muted hover:text-foreground border-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                setGenerations((prev) => prev.filter((g) => g.id !== gen.id));
                                setSelectedGenerationIds((prev) => {
                                  const next = new Set(prev);
                                  next.delete(gen.id);
                                  return next;
                                });
                              }}
                              data-testid={`button-remove-failed-${gen.id}`}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="sticky bottom-0 pt-3 bg-background/80 backdrop-blur border-t border-border/50 shrink-0">
              <div className="space-y-2">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || isPaymentPending}
                  className="w-full"
                  data-testid="button-generate"
                >
                  {isGenerating ? (isPaymentPending ? "Processing Payment..." : "Generating...") : "Generate"}
                </Button>
                {estimateCost != null && (
                  <p className="text-xs text-muted-foreground text-center">Estimated cost: ${estimateCost.toFixed(4)}</p>
                )}
                <div className="flex items-center gap-2">
                  {(() => {
                    const completed = generations.filter((g) => g.status === "completed" && g.imageUrl);
                    const selected = completed.filter((g) => selectedGenerationIds.has(g.id));
                    const countForRelease = selected.length > 0 ? selected.length : completed.length;
                    const showWarning = countForRelease > 0 && countForRelease < 4;
                    return showWarning ? (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="shrink-0 rounded border border-amber-500/80 bg-amber-500/10 p-1 flex items-center justify-center">
                            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          At least 4 images are recommended to build trust in the quality of the images, which increases the likelihood of generations.
                        </TooltipContent>
                      </Tooltip>
                    ) : null;
                  })()}
                  <Button
                    variant="outline"
                    onClick={handleSubmit}
                    disabled={
                      isGenerating ||
                      savePromptMutation.isPending ||
                      !generations.some((g) => g.status === "completed")
                    }
                    className="flex-1 min-w-0"
                    data-testid="button-submit"
                  >
                    {savePromptMutation.isPending ? "Releasing..." : "Release"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        </div>
      </div>

      <ImageLightbox
        isOpen={!!lightboxImageUrl}
        onClose={() => setLightboxImageUrl(null)}
        imageUrl={lightboxImageUrl || ""}
      />

      {/* Mobile View */}
      <div
        ref={mobileContainerRef}
        className="lg:hidden flex flex-col h-[calc(100vh-8rem)] overflow-y-auto overflow-x-hidden w-full max-w-full"
      >
        {/* Header - inside scrollable area */}
        <div className="shrink-0 flex items-center gap-4 px-6 py-4 border-b w-full max-w-full overflow-x-hidden">
          {onBack && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              data-testid="button-back"
              className="text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-white truncate">
              Create Prompt Template
            </h1>
            <p className="text-xs text-white truncate">
              Design reusable prompt templates with customizable variables
            </p>
          </div>
        </div>

        {mobileTab === "settings" && (
          <div className="w-full max-w-full overflow-x-hidden">
            <PromptSettingsPanel
              settings={settingsData}
              onUpdate={handleSettingsUpdate}
              useScrollArea={false}
            />
          </div>
        )}

        {mobileTab === "editor" && (
          <div className="flex flex-col w-full max-w-full overflow-x-hidden">
            {/* Sticky Toolbar with Variables Button (paid prompts only) */}
            {promptType === "paid-prompt" && (
            <div className="sticky top-0 z-10 bg-background border-b px-3 py-2 flex items-center justify-end w-full max-w-full shrink-0">
              <Button
                onClick={() => {
                  setEditingVariableId(null);
                  setShowVariableEditor(true);
                }}
                size="sm"
                variant="outline"
                className="bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20 hover:bg-teal-500/20"
                data-testid="button-show-variables"
              >
                <List className="h-4 w-4 mr-1" />
                Variables
              </Button>
            </div>
            )}

            {/* Scrollable Content */}
            <div className="px-3 pt-3 pb-3 w-full max-w-full overflow-x-hidden">
              <div
                className="relative min-h-[500px] w-full max-w-full overflow-visible rounded-md"
                onClick={() => textareaRef.current?.focus()}
              >
                <div
                  ref={mobilePromptOverlayRef}
                  className="absolute inset-0 font-mono text-sm whitespace-pre-wrap pointer-events-none overflow-hidden select-none text-foreground"
                  style={{
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                    padding: "8px 12px",
                    lineHeight: "1.625",
                    boxSizing: "border-box",
                    overflow: "auto",
                  }}
                >
                  {prompt.split(/(\[[^\]]+\])/).map((part, index) => {
                    const match = part.match(/\[([^\]]+)\]/);
                    if (match) {
                      const varName = match[1];
                      const variable = variables.find(
                        (v) => v.name === varName
                      );
                      if (variable) {
                        const isOpen =
                          editingVariableId === variable.id ||
                          openVariables.includes(variable.id);
                        return (
                          <TooltipProvider key={index}>
                            <Tooltip delayDuration={200}>
                              <TooltipTrigger asChild>
                                <span
                                  className={
                                    variable.needsNameAttention
                                      ? "select-none cursor-pointer pointer-events-auto inline font-mono font-medium bg-primary/20 text-primary hover:bg-primary/25 rounded-sm ring-2 ring-destructive ring-offset-1 ring-offset-background"
                                      : "select-none cursor-pointer pointer-events-auto inline font-mono font-medium bg-primary/20 text-primary hover:bg-primary/25"
                                  }
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setEditingVariableId(variable.id);
                                    setShowVariableEditor(true);
                                  }}
                                  onMouseDown={(e) => e.preventDefault()}
                                  data-testid={`badge-inline-variable-${variable.id}`}
                                >
                                  [{varName}]
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs">
                                  {variable.needsNameAttention && (
                                    <span className="block text-destructive font-medium mb-1">
                                      Rename this placeholder variable.
                                    </span>
                                  )}
                                  Default Value: {String(variable.defaultValue || "Not set")}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        );
                      }
                    }
                    return (
                      <span key={index} className="select-none">
                        {part}
                      </span>
                    );
                  })}
                </div>

                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onSelect={handleTextSelection}
                  onClick={() => {
                    handleTextSelection();
                    setTimeout(() => {
                      const pos = textareaRef.current?.selectionStart ?? 0;
                      const regex = /\[([^\]]+)\]/g;
                      let match;
                      while ((match = regex.exec(prompt)) !== null) {
                        if (
                          pos > match.index &&
                          pos < match.index + match[0].length
                        ) {
                          const newPos = match.index + match[0].length;
                          if (textareaRef.current) {
                            textareaRef.current.setSelectionRange(
                              newPos,
                              newPos
                            );
                          }
                          break;
                        }
                      }
                    }, 0);
                  }}
                  onKeyUp={(e) => {
                    if (
                      e.key === "ArrowLeft" ||
                      e.key === "ArrowRight" ||
                      e.key === "ArrowUp" ||
                      e.key === "ArrowDown"
                    ) {
                      const pos = textareaRef.current?.selectionStart ?? 0;
                      const regex = /\[([^\]]+)\]/g;
                      let match;
                      while ((match = regex.exec(prompt)) !== null) {
                        if (
                          pos > match.index &&
                          pos < match.index + match[0].length
                        ) {
                          const newPos =
                            e.key === "ArrowLeft" || e.key === "ArrowUp"
                              ? match.index
                              : match.index + match[0].length;
                          setTimeout(() => {
                            if (textareaRef.current) {
                              textareaRef.current.setSelectionRange(
                                newPos,
                                newPos
                              );
                            }
                          }, 0);
                          break;
                        }
                      }
                    }
                  }}
                  placeholder={
                    promptType === "paid-prompt"
                      ? "Write your prompt... Select text to create variables or use [VariableName] syntax."
                      : "Write your full prompt here..."
                  }
                  className="absolute inset-0 w-full font-mono text-sm resize-none bg-transparent text-transparent caret-white focus:outline-none focus:ring-0 border-0 shadow-none ring-0 focus-visible:ring-0 rounded-none whitespace-pre-wrap overflow-auto selection:bg-primary/20"
                  style={{
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                    caretColor: "white",
                    padding: "8px 12px",
                    lineHeight: "1.625",
                    boxSizing: "border-box",
                  }}
                  data-testid="textarea-prompt"
                />
                {promptType === "paid-prompt" &&
                  selectedText &&
                  selectionRange &&
                  buttonPosition && (
                  <Button
                    onClick={createVariableFromSelection}
                    variant="secondary"
                    size="sm"
                    className="absolute z-20 shadow-lg"
                    style={{
                      top: `${buttonPosition.top}px`,
                      left: `${buttonPosition.left}px`,
                    }}
                    data-testid="button-create-from-selection"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Variable erstellen: &quot;{selectedText.slice(0, 20)}
                    {selectedText.length > 20 ? "..." : ""}&quot;
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {mobileTab === "generation" && (
          <div className="px-3 pt-3 pb-3 flex flex-col w-full max-w-full overflow-x-hidden">
            {generatedImage ? (
              <div className="flex-1 flex flex-col">
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full h-auto rounded border object-contain"
                  data-testid="img-generated"
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-foreground text-sm">
                Noch kein Bild generiert
              </div>
            )}

            <div className="space-y-2 mt-auto">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full"
                data-testid="button-generate"
              >
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
              {estimateCost != null && (
                <p className="text-xs text-muted-foreground text-center w-full">Estimated cost: ${estimateCost.toFixed(4)}</p>
              )}
              <Button
                variant="outline"
                onClick={handleSubmit}
                disabled={
                  isGenerating ||
                  savePromptMutation.isPending ||
                  generatedImage === null
                }
                className="w-full"
                data-testid="button-submit"
              >
                {savePromptMutation.isPending ? "Releasing..." : "Release"}
              </Button>
            </div>
          </div>
        )}

        {/* Editor Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background w-full max-w-full">
          <div className="grid grid-cols-3 w-full max-w-full">
            <Button
              variant={mobileTab === "settings" ? "default" : "ghost"}
              onClick={() => setMobileTab("settings")}
              className="flex flex-col h-auto py-3 gap-1 rounded-none no-default-hover-elevate"
              data-testid="button-mobile-tab-settings"
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs font-medium">Settings</span>
            </Button>
            <Button
              variant={mobileTab === "editor" ? "default" : "ghost"}
              onClick={() => setMobileTab("editor")}
              className="flex flex-col h-auto py-3 gap-1 rounded-none no-default-hover-elevate"
              data-testid="button-mobile-tab-editor"
            >
              <FileText className="h-5 w-5" />
              <span className="text-xs font-medium">Prompt</span>
            </Button>
            <Button
              variant={mobileTab === "generation" ? "default" : "ghost"}
              onClick={() => setMobileTab("generation")}
              className="flex flex-col h-auto py-3 gap-1 rounded-none no-default-hover-elevate"
              data-testid="button-mobile-tab-generation"
            >
              <Sparkles className="h-5 w-5" />
              <span className="text-xs font-medium">Generate</span>
            </Button>
          </div>
        </div>

        {/* Variable Editor Overlay (Mobile) */}
        {showVariableEditor && (
          <div className="fixed inset-0 bg-background z-50 flex flex-col overflow-hidden">
            <div className="shrink-0 flex items-center justify-between gap-2 p-4 border-b w-full max-w-full overflow-x-hidden">
              <h2 className="text-lg font-semibold text-foreground shrink-0">
                Variables
              </h2>
              <div className="flex items-center gap-1.5 shrink-0 ml-auto">
                <div className="flex rounded-md border border-border p-0.5 bg-muted/50">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => setVariablesMode("simple")}
                        className={`p-1.5 rounded transition-colors ${variablesMode === "simple" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                        aria-label="Simple mode: quick default values"
                      >
                        <List className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs">
                      Simple: one default value per variable
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => setVariablesMode("complex")}
                        className={`p-1.5 rounded transition-colors ${variablesMode === "complex" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                        aria-label="Complex mode: full variable editor"
                      >
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="max-w-xs">
                      Complex: types, options, and advanced settings
                    </TooltipContent>
                  </Tooltip>
                </div>
                {promptType === "paid-prompt" &&
                  variables.length > 0 && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="px-2 gap-0.5 h-8 min-w-[5.25rem]"
                      onClick={() => void requestBlitzDefaults()}
                      disabled={isShowcase || blitzLoading}
                      aria-label="Values"
                      aria-busy={blitzLoading}
                    >
                      {blitzLoading ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" aria-hidden />
                          <span className="text-xs font-medium">…</span>
                        </>
                      ) : (
                        <>
                          <span className="font-mono text-xs" aria-hidden>
                            {"\u26A1"}
                          </span>
                          <span className="text-xs font-medium">Values</span>
                        </>
                      )}
                    </Button>
                  )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowVariableEditor(false);
                    setEditingVariableId(null);
                  }}
                  className="text-foreground shrink-0"
                  data-testid="button-close-variables"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 w-full max-w-full overflow-x-hidden">
              <div className="p-4 space-y-2 w-full max-w-full overflow-x-hidden">
                {variables.length === 0 ? (
                  <p className="text-sm text-foreground text-center py-8">
                    No variables yet.
                    <br />
                    Select text or use [Name]
                  </p>
                ) : variablesMode === "simple" ? (
                  <div className="space-y-3">
                    {variables.map((variable) => {
                      const varName = variable.name || variable.id;
                      const currentVal = variable.defaultValue;
                      const strVal = currentVal === undefined || currentVal === null ? "" : typeof currentVal === "object" ? JSON.stringify(currentVal) : String(currentVal);
                      return (
                        <div
                          key={variable.id}
                          className={`space-y-1.5 rounded-md ${
                            variable.needsNameAttention
                              ? "ring-2 ring-destructive p-2 -m-0.5"
                              : ""
                          }`}
                        >
                          <Label className="text-sm font-medium text-foreground">{varName}</Label>
                          <BlitzDefaultFieldShell loading={blitzLoading}>
                            <Input
                              value={strVal}
                              onChange={(e) =>
                                updateVariable(variable.id, {
                                  defaultValue: e.target.value,
                                })
                              }
                              placeholder={`Value for ${varName}...`}
                              className="h-8 text-sm text-foreground"
                              data-testid={`input-free-var-mobile-${variable.id}`}
                            />
                          </BlitzDefaultFieldShell>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <Accordion
                    type="multiple"
                    value={
                      editingVariableId ? [editingVariableId] : openVariables
                    }
                    onValueChange={setOpenVariables}
                  >
                    {variables.map((variable) => (
                      <AccordionItem
                        key={variable.id}
                        value={variable.id}
                        id={`variable-${variable.id}`}
                        className={
                          variable.needsNameAttention
                            ? "rounded-lg ring-2 ring-destructive border-destructive/40 px-1 -mx-0.5"
                            : undefined
                        }
                      >
                        <AccordionTrigger
                          className="hover-elevate px-2 rounded select-none cursor-pointer"
                          onDoubleClick={(e) => e.preventDefault()}
                          data-testid={`accordion-trigger-${variable.id}`}
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-sm font-medium text-white">
                              {variable.name}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {variable.type}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-1.5 pt-1 space-y-2 w-full max-w-full overflow-x-hidden">
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5">
                            <Label className="text-xs text-foreground">Variable Name</Label>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                This name will be displayed to users.
                              </TooltipContent>
                            </Tooltip>
                          </div>
                            {editingVariableName?.id === variable.id ? (
                              <Input
                                ref={nameInputRefMobile}
                                value={editingVariableName.value}
                                onChange={(e) =>
                                  setEditingVariableName({ id: variable.id, value: e.target.value })
                                }
                                onBlur={() => {
                                  commitVariableName(variable.id, editingVariableName.value);
                                  setEditingVariableName(null);
                                }}
                                className="h-8 text-sm text-foreground font-mono"
                                placeholder="VariableName (used as [Name] in prompt)"
                                disabled={promptType === "showcase"}
                                data-testid={`input-name-mobile-${variable.id}`}
                              />
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  setEditingVariableName({ id: variable.id, value: variable.name })
                                }
                                disabled={promptType === "showcase"}
                                className="flex items-center gap-2 h-8 px-2 rounded border border-transparent hover:border-input hover:bg-muted/50 text-left w-full min-w-0 text-foreground"
                                data-testid={`button-edit-name-mobile-${variable.id}`}
                              >
                                <span className="text-sm font-mono truncate flex-1">
                                  {variable.name || " "}
                                </span>
                                <Pencil className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                              </button>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label className="text-xs text-foreground">
                              Description{" "}
                              <span className="text-muted-foreground font-normal">(optional)</span>
                            </Label>
                            <Textarea
                              value={variable.description}
                              onChange={(e) => {
                                updateVariable(variable.id, {
                                  description: e.target.value,
                                });
                              }}
                              placeholder="Optional hint for users (e.g. examples stay here, not in default value)"
                              className="min-h-[60px] text-sm text-foreground"
                              disabled={promptType === "showcase"}
                              data-testid={`input-description-${variable.id}`}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-xs text-foreground">Type</Label>
                            <Select
                              value={variable.type}
                              onValueChange={(value) =>
                                updateVariable(variable.id, {
                                  type: value as VariableType,
                                })
                              }
                              disabled={promptType === "showcase"}
                            >
                              <SelectTrigger
                                className="h-9 text-sm"
                                data-testid={`select-type-${variable.id}`}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="checkbox">
                                  Checkbox
                                </SelectItem>
                                <SelectItem value="multi-select">
                                  Multi-Select
                                </SelectItem>
                                <SelectItem value="single-select">
                                  Single-Select
                                </SelectItem>
                                <SelectItem value="slider">Slider</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {variable.type === "text" && (
                            <div className="space-y-2">
                              <Label className="text-xs text-white">
                                Default Value
                              </Label>
                              <BlitzDefaultFieldShell loading={blitzLoading}>
                                <Textarea
                                  value={variable.defaultValue as string}
                                  onChange={(e) =>
                                    updateVariable(variable.id, {
                                      defaultValue: e.target.value,
                                    })
                                  }
                                  placeholder="Default Value"
                                  className="min-h-[80px] text-sm"
                                  disabled={promptType === "showcase"}
                                  data-testid={`input-default-${variable.id}`}
                                />
                              </BlitzDefaultFieldShell>
                            </div>
                          )}

                          {variable.type === "checkbox" && (
                            <>
                              <BlitzDefaultFieldShell loading={blitzLoading}>
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    id={`checkbox-mobile-${variable.id}`}
                                    checked={variable.defaultValue as boolean}
                                    onCheckedChange={(checked) =>
                                      updateVariable(variable.id, {
                                        defaultValue: checked,
                                      })
                                    }
                                    disabled={promptType === "showcase"}
                                    data-testid={`checkbox-default-${variable.id}`}
                                  />
                                  <Label
                                    htmlFor={`checkbox-mobile-${variable.id}`}
                                    className="text-sm text-white"
                                  >
                                    Active by default
                                  </Label>
                                </div>
                              </BlitzDefaultFieldShell>
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5">
                                  <Label className="text-xs text-white">Prompt value</Label>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="max-w-xs">
                                      The content is not shown publicly.
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                                <Textarea
                                  value={variable.promptValue ?? ""}
                                  onChange={(e) =>
                                    updateVariable(variable.id, {
                                      promptValue: e.target.value,
                                    })
                                  }
                                  placeholder="Text to insert when checkbox is checked"
                                  disabled={promptType === "showcase"}
                                  className="min-h-[80px] resize-y text-sm bg-background"
                                  data-testid={`textarea-prompt-value-mobile-${variable.id}`}
                                />
                              </div>
                            </>
                          )}

                          {(variable.type === "multi-select" ||
                            variable.type === "single-select") && (
                            <BlitzDefaultFieldShell loading={blitzLoading}>
                            <div className="space-y-2">
                              <Label className="text-xs text-white">
                                Default
                              </Label>
                              <div className="space-y-2">
                                {variable.options?.map((option, index) => {
                                  const isDefault =
                                    (variable.defaultOptionIndex ?? 0) ===
                                    index;
                                  return (
                                    <Card
                                      key={index}
                                      className={`p-2 w-full max-w-full overflow-x-hidden ${isDefault ? "border-teal-500/50 bg-teal-500/5" : ""}`}
                                    >
                                      <div className="space-y-2 w-full max-w-full overflow-x-hidden">
                                        <div className="flex items-center gap-2">
                                          <Checkbox
                                            checked={isDefault}
                                            onCheckedChange={(checked) => {
                                              if (checked) {
                                                updateVariable(variable.id, {
                                                  defaultOptionIndex: index,
                                                });
                                              }
                                            }}
                                            disabled={promptType === "showcase"}
                                            data-testid={`checkbox-default-option-${variable.id}-${index}`}
                                          />
                                          <Label className="text-xs text-white font-medium">
                                            Default
                                          </Label>
                                        </div>
                                        <div className="space-y-1">
                                          <Label className="text-xs text-white">
                                            Anzeigename
                                          </Label>
                                          <Input
                                            value={option.visibleName}
                                            onChange={(e) => {
                                              const newOptions = [
                                                ...(variable.options || []),
                                              ];
                                              newOptions[index] = {
                                                ...option,
                                                visibleName: e.target.value,
                                              };
                                              updateVariable(variable.id, {
                                                options: newOptions,
                                              });
                                            }}
                                            placeholder="Anzeigename"
                                            className="h-8 text-sm"
                                            disabled={promptType === "showcase"}
                                            data-testid={`input-visible-name-${variable.id}-${index}`}
                                          />
                                        </div>
                                        <div className="space-y-1">
                                          <Label className="text-xs text-white">
                                            Prompt Value
                                          </Label>
                                          <Input
                                            value={option.promptValue}
                                            onChange={(e) =>
                                              updateOption(
                                                variable.id,
                                                index,
                                                "promptValue",
                                                e.target.value
                                              )
                                            }
                                            placeholder="Prompt Value"
                                            className="h-8 text-sm"
                                            disabled={promptType === "showcase"}
                                            data-testid={`input-prompt-value-${variable.id}-${index}`}
                                          />
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => {
                                            const newOptions =
                                              variable.options?.filter(
                                                (_, i) => i !== index
                                              ) || [];
                                            updateVariable(variable.id, {
                                              options: newOptions,
                                            });
                                          }}
                                          className="w-full text-destructive"
                                          disabled={promptType === "showcase"}
                                          data-testid={`button-remove-option-${variable.id}-${index}`}
                                        >
                                          <Trash2 className="h-3 w-3 mr-1" />
                                          Option entfernen
                                        </Button>
                                      </div>
                                    </Card>
                                  );
                                })}
                              </div>
                              <div className="flex gap-2">
                                <Input
                                  value={newOptionInput[variable.id] || ""}
                                  onChange={(e) =>
                                    setNewOptionInput({
                                      ...newOptionInput,
                                      [variable.id]: e.target.value,
                                    })
                                  }
                                  placeholder="New option"
                                  className="h-8 text-sm"
                                  disabled={promptType === "showcase"}
                                  data-testid={`input-new-option-${variable.id}`}
                                />
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    const optionText =
                                      newOptionInput[variable.id];
                                    if (!optionText) return;
                                    const newOptions = [
                                      ...(variable.options || []),
                                      {
                                        visibleName: optionText,
                                        promptValue: optionText,
                                      },
                                    ];
                                    updateVariable(variable.id, {
                                      options: newOptions,
                                    });
                                    setNewOptionInput({
                                      ...newOptionInput,
                                      [variable.id]: "",
                                    });
                                  }}
                                  disabled={promptType === "showcase"}
                                  data-testid={`button-add-option-${variable.id}`}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            </BlitzDefaultFieldShell>
                          )}

                          {variable.type === "slider" && (
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <Label className="text-xs text-white">
                                    Min
                                  </Label>
                                  <Input
                                    type="number"
                                    value={variable.min || 0}
                                    onChange={(e) =>
                                      updateVariable(variable.id, {
                                        min: parseInt(e.target.value) || 0,
                                      })
                                    }
                                    className="h-8 text-sm"
                                    disabled={promptType === "showcase"}
                                    data-testid={`input-min-${variable.id}`}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs text-white">
                                    Max
                                  </Label>
                                  <Input
                                    type="number"
                                    value={variable.max || 100}
                                    onChange={(e) =>
                                      updateVariable(variable.id, {
                                        max: parseInt(e.target.value) || 100,
                                      })
                                    }
                                    className="h-8 text-sm"
                                    disabled={promptType === "showcase"}
                                    data-testid={`input-max-${variable.id}`}
                                  />
                                </div>
                              </div>
                              <BlitzDefaultFieldShell loading={blitzLoading}>
                              <div className="space-y-1">
                                <Label className="text-xs text-white">
                                  Default Value
                                </Label>
                                <Input
                                  type="number"
                                  value={variable.defaultValue as number}
                                  onChange={(e) =>
                                    updateVariable(variable.id, {
                                      defaultValue:
                                        parseInt(e.target.value) || 0,
                                    })
                                  }
                                  className="h-8 text-sm"
                                  disabled={promptType === "showcase"}
                                  data-testid={`input-default-${variable.id}`}
                                />
                              </div>
                              </BlitzDefaultFieldShell>
                            </div>
                          )}

                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`required-mobile-${variable.id}`}
                                checked={variable.required}
                                onCheckedChange={(checked) =>
                                  updateVariable(variable.id, {
                                    required: checked as boolean,
                                  })
                                }
                                disabled={promptType === "showcase"}
                                data-testid={`checkbox-required-${variable.id}`}
                              />
                              <Label
                                htmlFor={`required-mobile-${variable.id}`}
                                className="text-sm text-white"
                              >
                                Pflichtfeld
                              </Label>
                            </div>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="flex items-center space-x-2 opacity-60 cursor-not-allowed">
                                  <Checkbox
                                    id={`allow-ref-image-mobile-${variable.id}`}
                                    checked={variable.allowReferenceImage || false}
                                    disabled
                                    data-testid={`checkbox-allow-ref-image-mobile-${variable.id}`}
                                  />
                                  <Label
                                    htmlFor={`allow-ref-image-mobile-${variable.id}`}
                                    className="text-sm text-muted-foreground cursor-not-allowed pointer-events-none"
                                  >
                                    allow reference image
                                  </Label>
                                </div>
                              </TooltipTrigger>
                              <TooltipContent side="top" className="max-w-xs">
                                Next UX update will allow adding images for style references
                              </TooltipContent>
                            </Tooltip>
                          </div>

                          <div className="flex gap-2 mt-4 pt-4 border-t">
                            <Button
                              onClick={() => {
                                setShowVariableEditor(false);
                              }}
                              className="flex-1"
                              disabled={variable.required && !variable.name.trim()}
                              data-testid={`button-save-variable-${variable.id}`}
                            >
                              Save
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => {
                                setVariableToDelete(variable.id);
                                setDeleteDialogOpen(true);
                              }}
                              data-testid={`button-delete-${variable.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      <AlertDialog
        open={blitzOverwriteOpen}
        onOpenChange={setBlitzOverwriteOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Overwrite default values?</AlertDialogTitle>
            <AlertDialogDescription>
              Some variables already have default values. Running Values will
              replace them with new AI suggestions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-blitz-overwrite">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              data-testid="button-confirm-blitz-overwrite"
              onClick={() => {
                setBlitzOverwriteOpen(false);
                void executeBlitzDefaults();
              }}
            >
              Yes, overwrite
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Variable?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this variable? The text will
              remain as normal text in the prompt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">
              No
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteVariable}
              data-testid="button-confirm-delete"
            >
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={promptChangeDialog.open}
        onOpenChange={(open) => {
          if (!open) {
            promptChangeDialog.onRevert?.();
            setPromptChangeDialog((p) => ({ ...p, open: false }));
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {promptChangeDialog.revertValue !== undefined
                ? "Change prompt?"
                : "Invalid generations"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {promptChangeDialog.revertValue !== undefined ? (
                <>
                  If you change the prompt, all generations will be lost, as generations reflect the current state of the prompt. Are you sure?
                  {promptChangeDialog.invalidGenerationIds && promptChangeDialog.invalidGenerationIds.length > 0 && (
                    <span className="block mt-2">
                      The following generation(s) will also be removed:{" "}
                      {promptChangeDialog.invalidGenerationIds.slice(0, 5).join(", ")}
                      {promptChangeDialog.invalidGenerationIds.length > 5 && ` and ${promptChangeDialog.invalidGenerationIds.length - 5} more`}.
                    </span>
                  )}
                </>
              ) : (
                <>
                  The following generation(s) will be removed because their variable values are no longer valid:{" "}
                  {promptChangeDialog.invalidGenerationIds?.slice(0, 5).join(", ")}
                  {promptChangeDialog.invalidGenerationIds && promptChangeDialog.invalidGenerationIds.length > 5 && ` and ${promptChangeDialog.invalidGenerationIds.length - 5} more`}.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {promptChangeDialog.revertValue !== undefined ? (
              <>
                <AlertDialogCancel
                  onClick={() => promptChangeDialog.onRevert?.()}
                  data-testid="button-keep-prompt"
                >
                  No, I want to keep the prompt
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => promptChangeDialog.onConfirm()}
                  data-testid="button-confirm-prompt-change"
                >
                  Yes, I want to regenerate
                </AlertDialogAction>
              </>
            ) : (
              <AlertDialogAction
                onClick={() => promptChangeDialog.onConfirm()}
                data-testid="button-remove-invalid-generations"
              >
                OK
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={unsavedVariableDialog}
        onOpenChange={setUnsavedVariableDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Variables</AlertDialogTitle>
            <AlertDialogDescription>
              You have open variables with potentially unsaved changes. Do you
              want to generate anyway?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-generate">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={proceedWithGenerate}
              disabled={isGenerating || isPaymentPending}
              data-testid="button-proceed-generate"
            >
              {isGenerating ? (isPaymentPending ? "Processing Payment..." : "Generating...") : "Generate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showValidationDialog}
        onOpenChange={setShowValidationDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Missing Information</AlertDialogTitle>
            <AlertDialogDescription>
              Please fill in all required fields: Title and Category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowValidationDialog(false)}
              data-testid="button-validation-ok"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showLoginRequiredDialog}
        onOpenChange={setShowLoginRequiredDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login to use image generations.</AlertDialogTitle>
            <AlertDialogDescription>
              Your prompt and all variable settings will remain exactly as they are.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center gap-2 sm:gap-2">
            <AlertDialogAction
              onClick={() => {
                setShowLoginRequiredDialog(false);
                connect({
                  client: thirdwebClient,
                  chain: defaultChain,
                  wallets: connectModalWallets,
                  title: "Sign in to Symphora",
                  titleIcon: "/favicon.svg",
                  size: "wide",
                  showThirdwebBranding: false,
                  termsOfServiceUrl: "https://symphora.com/terms",
                  privacyPolicyUrl: "https://symphora.com/privacy",
                }).catch(() => {});
              }}
              data-testid="button-login-required-login"
            >
              Login
            </AlertDialogAction>
            <AlertDialogCancel data-testid="button-login-required-cancel">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Load Prompt</AlertDialogTitle>
            <AlertDialogDescription>
              Select a saved prompt to load and edit.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <ScrollArea className="max-h-[400px]">
            <div className="space-y-2 p-1">
              {savedPrompts && savedPrompts.length > 0 ? (
                savedPrompts.map((p) => (
                  <Button
                    key={p.id}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => loadPrompt(p.id)}
                    data-testid={`button-load-prompt-${p.id}`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{p.title}</span>
                      <span className="text-xs text-foreground">
                        {p.createdAt
                          ? new Date(p.createdAt).toLocaleDateString()
                          : "Recent"}
                      </span>
                    </div>
                  </Button>
                ))
              ) : (
                <p className="text-sm text-foreground text-center py-4">
                  No saved prompts found.
                </p>
              )}
            </div>
          </ScrollArea>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-load">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={linkOrCreateDialog.open}
        onOpenChange={(open) => {
          if (!open) {
            setLinkOrCreateDialog({
              open: false,
              varName: "",
              selectedText: "",
              selectionRange: null,
            });
          }
        }}
      >
        <AlertDialogContent className="max-w-md">
          <div className="flex justify-end -mt-2 -mr-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-sm opacity-70 hover:opacity-100"
              onClick={() =>
                setLinkOrCreateDialog({
                  open: false,
                  varName: "",
                  selectedText: "",
                  selectionRange: null,
                })
              }
              data-testid="button-close-link-dialog"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <AlertDialogHeader className="-mt-4">
            <AlertDialogTitle>Variable Already Exists</AlertDialogTitle>
            <AlertDialogDescription>
              A variable with the name &quot;
              <span className="font-medium">{linkOrCreateDialog.varName}</span>&quot;
              already exists. What would you like to do?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={handleLinkVariable}
              className="w-full"
              data-testid="button-link-variable"
            >
              Link to existing variable
            </Button>
            <Button
              onClick={handleCreateNewVariable}
              className="w-full"
              data-testid="button-create-new-variable"
            >
              Create new variable
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      <QuickVariableCreator
        open={quickVarCreatorOpen}
        onOpenChange={setQuickVarCreatorOpen}
        onCreate={createQuickVariable}
        insertPosition={caretPosition}
      />
    </TooltipProvider>
  );
}
