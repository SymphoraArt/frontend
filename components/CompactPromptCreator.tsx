"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Zap,
  Plus,
  Search,
  Star,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import QuickVariableCreator from "./QuickVariableCreator";
import { useX402PaymentProduction } from "@/hooks/useX402PaymentProduction";
import { useToast } from "@/hooks/use-toast";
import { useActiveAccount } from "thirdweb/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletPickerModal } from "@/components/WalletPickerModal";

type VariableType = "text" | "checkbox" | "slider" | "single-select" | "multi-select";

interface Variable {
  id: string;
  name: string;
  type: VariableType;
  defaultValue: string;
  currentValue: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseNumber(value: string | undefined) {
  if (!value) return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
}

function parseBracketToken(raw: string) {
  // Token grammar (compact, human-friendly):
  // [name]
  // [name=value]
  // [name:type=value|opts=a,b,c|min=0|max=10|step=1]
  // Supported types: text, checkbox, slider, single, multi
  const parts = raw.split("|").map((p) => p.trim()).filter(Boolean);
  const head = parts[0] || "";
  const headEq = head.indexOf("=");
  const headLeft = (headEq === -1 ? head : head.slice(0, headEq)).trim();
  const value = (headEq === -1 ? "" : head.slice(headEq + 1)).trim();
  const headColon = headLeft.indexOf(":");
  const name = (headColon === -1 ? headLeft : headLeft.slice(0, headColon)).trim();
  const rawType = (headColon === -1 ? "" : headLeft.slice(headColon + 1)).trim();

  let type: VariableType = "text";
  if (rawType) {
    const t = rawType.toLowerCase();
    if (t === "checkbox" || t === "binary") type = "checkbox";
    else if (t === "slider") type = "slider";
    else if (t === "single" || t === "single-select" || t === "select")
      type = "single-select";
    else if (t === "multi" || t === "multi-select") type = "multi-select";
    else type = "text";
  }

  const params: Record<string, string> = {};
  for (const p of parts.slice(1)) {
    const idx = p.indexOf("=");
    if (idx === -1) continue;
    const k = p.slice(0, idx).trim();
    const v = p.slice(idx + 1).trim();
    if (!k) continue;
    params[k] = v;
  }

  const options = params.opts
    ? params.opts
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean)
    : undefined;

  return {
    name,
    type,
    value,
    options,
    min: parseNumber(params.min),
    max: parseNumber(params.max),
    step: parseNumber(params.step),
  };
}

function serializeBracketToken(variable: Variable) {
  const valuePart = variable.type === "checkbox"
    ? String(variable.currentValue === "true" || variable.currentValue === "1")
    : variable.currentValue;

  const typePart = variable.type === "text" ? "" : `:${variable.type}`;
  const head = `${variable.name}${typePart}=${valuePart}`;
  const extras: string[] = [];
  if (variable.type === "slider") {
    if (variable.min !== undefined) extras.push(`min=${variable.min}`);
    if (variable.max !== undefined) extras.push(`max=${variable.max}`);
    if (variable.step !== undefined) extras.push(`step=${variable.step}`);
  }
  if (variable.type === "single-select" || variable.type === "multi-select") {
    if (variable.options?.length) extras.push(`opts=${variable.options.join(",")}`);
  }
  return `[${[head, ...extras].join("|")}]`;
}

interface Template {
  id: string;
  name: string;
  description: string;
  image: string;
  isFavorite?: boolean;
  isPaid?: boolean;
  price?: number;
}

const SAMPLE_TEMPLATES: Template[] = [
  {
    id: "1",
    name: "Cherry Blossoms",
    description:
      "Delicate pink cherry blossom petals floating gently in the spring breeze, with soft diffused sunlight filtering through the branches, creating a dreamy pastel atmosphere with hints of white and pale pink",
    image: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=200",
    isFavorite: true,
  },
  {
    id: "2",
    name: "Cyberpunk City",
    description:
      "Neon-lit futuristic metropolis with towering skyscrapers, holographic advertisements, rain-slicked streets reflecting vibrant purple and cyan lights, flying vehicles traversing between buildings",
    image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=200",
    isPaid: true,
    price: 5,
  },
  {
    id: "3",
    name: "Enchanted Forest",
    description:
      "Mystical woodland bathed in ethereal golden light, ancient twisted trees with glowing moss, magical fireflies dancing between ferns, mist rolling across the forest floor",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=200",
    isFavorite: true,
  },
  {
    id: "4",
    name: "Ocean Sunset",
    description:
      "Breathtaking sunset over calm ocean waters, sky painted in gradients of orange, pink and purple, golden sun reflecting on gentle waves, silhouetted clouds on the horizon",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200",
  },
  {
    id: "5",
    name: "Mountain Peak",
    description:
      "Majestic snow-capped mountain peak piercing through clouds, dramatic alpine landscape, crisp morning light casting long shadows, pristine wilderness stretching to the horizon",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200",
  },
  {
    id: "6",
    name: "Abstract Art",
    description:
      "Vibrant abstract composition with fluid organic shapes, bold contrasting colors, dynamic movement and energy, contemporary artistic expression with texture and depth",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=200",
    isPaid: true,
    price: 3,
  },
];

const EXAMPLE_VARIABLES: Record<string, string> = {
  Object: "vintage camera",
  "Camera lightings": "soft natural window light with subtle rim lighting",
  "Camera settings": "f/2.8, 85mm lens, shallow depth of field",
  Style: "photorealistic, cinematic",
  Background: "minimalist white studio",
  Mood: "elegant and sophisticated",
};

export default function CompactPromptCreator() {
  const [promptText, setPromptText] = useState("");
  const [variables, setVariables] = useState<Variable[]>([]);
  const [open, setOpen] = useState(true);
  const [variablesOpen, setVariablesOpen] = useState(true);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const [selectionPosition, setSelectionPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [dimension, setDimension] = useState("1:1");
  const [resolution, setResolution] = useState("2K");
  const [imageCount, setImageCount] = useState(1);
  const [templateSearch, setTemplateSearch] = useState("");
  const [showPaidOnly, setShowPaidOnly] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [quickVarCreatorOpen, setQuickVarCreatorOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { generateImage, isPending, getPaymentStatus } = useX402PaymentProduction();
  const account = useActiveAccount();
  const { connected: solanaConnected } = useWallet();
  const authenticated = !!account || solanaConnected;
  const [showWalletPicker, setShowWalletPicker] = useState(false);
  const { toast } = useToast();

  // Extract variables from [name] / [name=value] / [name:type=value|...] syntax
  useEffect(() => {
    const regex = /\[([^\]]+)\]/g;
    const order: string[] = [];
    const tokenByName = new Map<string, ReturnType<typeof parseBracketToken>>();
    let match: RegExpExecArray | null;
    while ((match = regex.exec(promptText)) !== null) {
      const raw = (match[1] || "").trim();
      if (!raw) continue;
      const token = parseBracketToken(raw);
      if (!token.name) continue;

      if (!tokenByName.has(token.name)) {
        order.push(token.name);
        tokenByName.set(token.name, token);
      } else if (token.value) {
        // Prefer explicit token values if duplicates exist
        tokenByName.set(token.name, token);
      }
    }

    setVariables((prev) => {
      const byName = new Map(prev.map((v) => [v.name, v] as const));

      const next: Variable[] = [];
      for (const name of order) {
        const token = tokenByName.get(name);
        const tokenValue = token?.value || "";
        const existing = byName.get(name);
        next.push({
          id: existing?.id || crypto.randomUUID(),
          name,
          type: (token?.type || existing?.type || "text") as VariableType,
          defaultValue:
            existing?.defaultValue ||
            tokenValue ||
            EXAMPLE_VARIABLES[name] ||
            `example ${name.toLowerCase()}`,
          currentValue: tokenValue || existing?.currentValue || "",
          options: token?.options || existing?.options,
          min: token?.min ?? existing?.min,
          max: token?.max ?? existing?.max,
          step: token?.step ?? existing?.step,
        });
      }

      return next;
    });
  }, [promptText]);

  const updateVariable = useCallback(
    (name: string, updater: (prevVar: Variable) => Variable) => {
      let nextVar: Variable | null = null;
      setVariables((prev) =>
        prev.map((v) => {
          if (v.name !== name) return v;
          nextVar = updater(v);
          return nextVar;
        })
      );

      setPromptText((prevText) => {
        if (!nextVar) return prevText;
        const tokenRegex = new RegExp(
          `\\[\\s*${escapeRegExp(name)}(?:[^\\]]*)\\]`,
          "g"
        );
        return prevText.replace(tokenRegex, serializeBracketToken(nextVar));
      });
    },
    []
  );

  // Handle text selection
  const handleTextSelect = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = promptText.substring(start, end);

    if (selected.trim().length > 0) {
      setSelectedText(selected);
      const rect = textarea.getBoundingClientRect();
      setSelectionPosition({
        top: rect.top - 40,
        left: rect.left + (end - start) * 4,
      });
    } else {
      setSelectedText("");
      setSelectionPosition(null);
    }
  }, [promptText]);

  // Fill example values
  const fillExampleValues = () => {
    setVariables((prev) =>
      prev.map((v) => ({
        ...v,
        defaultValue:
          EXAMPLE_VARIABLES[v.name] || `example ${v.name.toLowerCase()}`,
        currentValue:
          EXAMPLE_VARIABLES[v.name] || `example ${v.name.toLowerCase()}`,
      }))
    );
  };

  // Create variable from selected text
  const createVariableFromSelection = () => {
    if (!selectedText) return;

    const variableName = selectedText.trim();
    const newPrompt = promptText.replace(selectedText, `[${variableName}]`);
    setPromptText(newPrompt);
    setSelectedText("");
    setSelectionPosition(null);
  };

  // Create variable from QuickVariableCreator
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
    // Check if variable already exists in prompt
    if (promptText.includes(`[${name}]`)) {
      return; // Variable already exists
    }

    // Build bracket token based on type
    let bracketToken = `[${name}`;
    
    if (type === "select" && options && options.length > 0) {
      // Format: [name:single=value|opts=a,b,c]
      bracketToken = `[${name}:single=${defaultValue}|opts=${options.join(",")}]`;
    } else if (type === "number") {
      // Format: [name:slider=value|min=0|max=100]
      bracketToken = `[${name}:slider=${defaultValue}|min=0|max=100]`;
    } else if (defaultValue) {
      // Format: [name=value]
      bracketToken = `[${name}=${defaultValue}]`;
    } else {
      // Format: [name]
      bracketToken = `[${name}]`;
    }

    // Insert at cursor position or end
    const currentPos =
      textareaRef.current?.selectionStart ?? promptText.length;
    const newPrompt =
      promptText.substring(0, currentPos) +
      (promptText.length > 0 && currentPos > 0 && promptText[currentPos - 1] !== " "
        ? " "
        : "") +
      bracketToken +
      " " +
      promptText.substring(currentPos);
    setPromptText(newPrompt);

    // Focus and move cursor after the variable
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos =
          currentPos +
          bracketToken.length +
          (promptText.length > 0 && currentPos > 0 && promptText[currentPos - 1] !== " "
            ? 2
            : 1);
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 100);
  };

  // Add template description to prompt
  const addTemplateToPrompt = (template: Template) => {
    setPromptText((prev) => prev + (prev ? ", " : "") + template.description);
    setShowTemplateModal(false);
  };

  // Filter templates
  const filteredTemplates = SAMPLE_TEMPLATES.filter((t) => {
    const matchesSearch = t.name
      .toLowerCase()
      .includes(templateSearch.toLowerCase());
    const matchesPaid = !showPaidOnly || t.isPaid;
    return matchesSearch && matchesPaid;
  });

  const adjustImageCount = (delta: number) => {
    setImageCount((prev) => Math.max(1, Math.min(4, prev + delta)));
  };

  // Handle image generation
  const handleGenerateImage = async () => {
    if (!promptText.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a prompt to generate an image.",
        variant: "destructive",
      });
      return;
    }

    // Check authentication and wallet connection
    if (!authenticated) {
      toast({
        title: "Wallet required",
        description: "Please connect your wallet to generate images.",
        variant: "destructive",
      });
      return;
    }

    const paymentStatus = getPaymentStatus();
    if (!paymentStatus.isConnected) {
      toast({
        title: "Wallet connection issue",
        description: "Your wallet is connected but not ready for payments. Please wait a moment or try refreshing the page.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Prepare the prompt by replacing variables with their current values
      let processedPrompt = promptText;
      variables.forEach(variable => {
        if (variable.currentValue) {
          const regex = new RegExp(`\\[${variable.name}(?:[^\\]]*)\\]`, 'g');
          processedPrompt = processedPrompt.replace(regex, variable.currentValue);
        }
      });

      const result = await generateImage({
        prompt: processedPrompt,
        aspectRatio: dimension,
        resolution: resolution as '1K' | '2K' | '4K',
      }) as any;

      if (result?.imageUrl) {
        setGeneratedImage(result.imageUrl);
        toast({
          title: "Image generated successfully!",
          description: `Generated with Gemini (${result.generationTime || 'unknown'}ms)`,
        });
      } else {
        throw new Error("No image URL returned");
      }
    } catch (error) {
      console.error('Generation error:', error);
      
      // Check for wallet timeout errors
      const errorMessage = error instanceof Error ? error.message : String(error);
      const isWalletTimeout = errorMessage.includes('Wallet timeout') || 
                              errorMessage.includes('walletTimeout') ||
                              errorMessage.includes('timeout');
      
      if (isWalletTimeout) {
        toast({
          title: "MetaMask Signature Required",
          description: "Please check your MetaMask extension and approve the signature request. Make sure MetaMask is unlocked and the popup is visible.",
          variant: "destructive",
          duration: 8000, // Longer duration for important message
        });
      } else {
        toast({
          title: "Generation failed",
          description: errorMessage || "Failed to generate image. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      {/* ── Quick Create Panel ── */}
      <div
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(92vw, 480px)",
          zIndex: 60,
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        {/* Collapsed pill */}
        {!open ? (
          <div
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 14,
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 16px",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: "#111" }}>Quick Create</div>
              <div style={{ fontSize: 11, color: "#888", marginTop: 1 }}>Paste a prompt with [variables] to adjust quickly</div>
            </div>
            <button
              onClick={() => setOpen(true)}
              style={{ background: "#111", color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}
              data-testid="button-open-quick-create"
            >
              Open ↑
            </button>
          </div>
        ) : (
          /* Expanded card */
          <div
            style={{
              background: "rgba(255,255,255,0.96)",
              backdropFilter: "blur(28px)",
              border: "1px solid rgba(0,0,0,0.1)",
              borderRadius: 16,
              boxShadow: "0 16px 48px rgba(0,0,0,0.16)",
              overflow: "hidden",
            }}
          >
            {/* ── Top Bar ── */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid #f0ede8" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 22, height: 22, borderRadius: 6, background: "#e05a2b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap size={12} color="#fff" />
                </div>
                <span style={{ fontWeight: 700, fontSize: 13, color: "#111" }}>Quick Create</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  onClick={() => setOpen(false)}
                  style={{ background: "none", border: "1px solid #e0ddd8", borderRadius: 7, padding: "4px 10px", fontSize: 11, color: "#666", cursor: "pointer", fontFamily: "inherit" }}
                  data-testid="button-close-quick-create"
                >
                  Collapse ↓
                </button>
              </div>
            </div>

            {/* ── Two-column body ── */}
            <div style={{ display: "flex", minHeight: 0 }}>

              {/* LEFT — 70%: Prompt + Settings */}
              <div style={{ flex: "1 1 0%", minWidth: 0, borderRight: "1px solid #f0ede8", display: "flex", flexDirection: "column" }}>

                {/* Textarea */}
                <div style={{ padding: "12px 14px 8px" }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: "#aaa", textTransform: "uppercase", marginBottom: 6 }}>Prompt</div>
                  <Textarea
                    ref={textareaRef}
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    onMouseUp={() => {
                      const ta = textareaRef.current;
                      if (!ta) return;
                      const sel = promptText.substring(ta.selectionStart, ta.selectionEnd);
                      setSelectedText(sel);
                    }}
                    placeholder="Describe your image… use [variable] for dynamic fields"
                    className="resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-mono leading-relaxed !px-0 !py-0"
                    style={{
                      width: "100%",
                      minHeight: "clamp(60px, 12vh, 100px)",
                      maxHeight: "clamp(80px, 14vh, 120px)",
                      fontSize: 12,
                      color: "#111",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      resize: "none",
                    }}
                    data-testid="input-compact-prompt"
                  />
                </div>

                {/* Settings row */}
                <div style={{ padding: "8px 14px", borderTop: "1px solid #f0ede8", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: "#aaa", textTransform: "uppercase", flexShrink: 0 }}>Settings</div>

                  {/* Ratio */}
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
                    <ImageIcon size={11} color="#888" />
                    <select
                      value={dimension}
                      onChange={(e) => setDimension(e.target.value)}
                      style={{ fontSize: 11, border: "1px solid #e0ddd8", borderRadius: 5, padding: "2px 6px", background: "#faf9f7", color: "#333", cursor: "pointer", fontFamily: "inherit" }}
                      data-testid="select-dimension"
                    >
                      <option value="1:1">1:1</option>
                      <option value="16:9">16:9</option>
                      <option value="9:16">9:16</option>
                      <option value="4:3">4:3</option>
                      <option value="3:4">3:4</option>
                    </select>
                  </div>

                  {/* Resolution */}
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
                    <span style={{ fontSize: 10, color: "#888" }}>RES</span>
                    <select
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value)}
                      style={{ fontSize: 11, border: "1px solid #e0ddd8", borderRadius: 5, padding: "2px 6px", background: "#faf9f7", color: "#333", cursor: "pointer", fontFamily: "inherit" }}
                      data-testid="select-resolution"
                    >
                      <option value="1K">1K</option>
                      <option value="2K">2K</option>
                      <option value="4K">4K</option>
                    </select>
                  </div>

                  {/* Count */}
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
                    <span style={{ color: "#888", fontSize: 10 }}>QTY</span>
                    <button onClick={() => adjustImageCount(-1)} disabled={imageCount <= 1} style={{ width: 20, height: 20, border: "1px solid #e0ddd8", borderRadius: 4, background: "#faf9f7", cursor: "pointer", fontSize: 13, lineHeight: 1 }}>−</button>
                    <span style={{ fontWeight: 600, fontSize: 12, minWidth: 16, textAlign: "center" }}>{imageCount}</span>
                    <button onClick={() => adjustImageCount(1)} disabled={imageCount >= 4} style={{ width: 20, height: 20, border: "1px solid #e0ddd8", borderRadius: 4, background: "#faf9f7", cursor: "pointer", fontSize: 13, lineHeight: 1 }}>+</button>
                  </div>
                </div>

                {/* Generate button */}
                <div style={{ padding: "10px 14px", borderTop: "1px solid #f0ede8" }}>
                  <button
                    onClick={authenticated ? handleGenerateImage : () => setShowWalletPicker(true)}
                    disabled={isGenerating || isPending}
                    style={{
                      width: "100%", padding: "10px", background: isGenerating || isPending ? "#ccc" : "#111",
                      color: "#fff", border: "none", borderRadius: 9, fontSize: 13, fontWeight: 700,
                      cursor: isGenerating || isPending ? "not-allowed" : "pointer", fontFamily: "inherit",
                      letterSpacing: 0.3,
                    }}
                    data-testid="button-generate"
                  >
                    {isGenerating || isPending ? "Generating…" : !authenticated ? "Connect Wallet to Generate" : "Generate →"}
                  </button>
                </div>
              </div>

              {/* RIGHT — 30%: Variables */}
              <div style={{ width: 160, flexShrink: 0, display: "flex", flexDirection: "column", background: "#faf9f7" }}>
                <div style={{ padding: "12px 14px 6px", borderBottom: "1px solid #f0ede8", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, color: "#aaa", textTransform: "uppercase" }}>
                    Variables {variables.length > 0 && `(${variables.length})`}
                  </span>
                  <button
                    onClick={() => setQuickVarCreatorOpen(true)}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "#888", display: "flex", alignItems: "center", gap: 2, fontSize: 10 }}
                    data-testid="button-quick-add-variable-compact"
                  >
                    <Plus size={10} /> Add
                  </button>
                </div>

                <div style={{ flex: 1, overflowY: "auto", padding: "8px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
                  {variables.length === 0 ? (
                    <div style={{ color: "#bbb", fontSize: 11, textAlign: "center", marginTop: 24, lineHeight: 1.5 }}>
                      Add <code style={{ background: "#eee", padding: "0 3px", borderRadius: 3 }}>[variable]</code> to your prompt
                    </div>
                  ) : (
                    variables.map((variable) => (
                      <div key={variable.id} style={{ background: "#fff", border: "1px solid #ede9e3", borderRadius: 7, padding: "7px 9px" }} data-testid={`variable-adjuster-${variable.name}`}>
                        <div style={{ fontSize: 10, fontWeight: 600, color: "#e05a2b", marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{variable.name}</div>

                        {variable.type === "text" && (
                          <input
                            value={variable.currentValue}
                            onChange={(e) => updateVariable(variable.name, (v) => ({ ...v, currentValue: e.target.value }))}
                            placeholder={variable.defaultValue}
                            style={{ width: "100%", fontSize: 11, border: "1px solid #e8e5de", borderRadius: 5, padding: "4px 7px", background: "#faf9f7", color: "#111", fontFamily: "inherit", boxSizing: "border-box" }}
                            data-testid={`input-variable-${variable.name}`}
                          />
                        )}

                        {variable.type === "checkbox" && (
                          <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 11 }}>
                            <input
                              type="checkbox"
                              checked={variable.currentValue === "true" || variable.currentValue === "1"}
                              onChange={(e) => updateVariable(variable.name, (v) => ({ ...v, currentValue: e.target.checked ? "true" : "false" }))}
                              data-testid={`checkbox-variable-${variable.name}`}
                            />
                            <span style={{ color: "#555" }}>Enabled</span>
                          </label>
                        )}

                        {variable.type === "slider" && (
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#888", marginBottom: 4 }}>
                              <span>Value</span><span style={{ fontWeight: 600, color: "#111" }}>{variable.currentValue || 0}</span>
                            </div>
                            <input
                              type="range"
                              min={variable.min ?? 0}
                              max={variable.max ?? 100}
                              step={variable.step ?? 1}
                              value={Number(variable.currentValue || variable.min || 0)}
                              onChange={(e) => updateVariable(variable.name, (v) => ({ ...v, currentValue: e.target.value }))}
                              style={{ width: "100%" }}
                              data-testid={`slider-variable-${variable.name}`}
                            />
                          </div>
                        )}

                        {(variable.type === "single-select" || variable.type === "multi-select") && (
                          <select
                            value={variable.currentValue}
                            onChange={(e) => updateVariable(variable.name, (v) => ({ ...v, currentValue: e.target.value }))}
                            style={{ width: "100%", fontSize: 11, border: "1px solid #e8e5de", borderRadius: 5, padding: "4px 7px", background: "#faf9f7", color: "#111", fontFamily: "inherit" }}
                          >
                            {(variable.options || []).map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                          </select>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Generated image */}
            {generatedImage && (
              <div style={{ padding: "12px 14px", borderTop: "1px solid #f0ede8" }}>
                <img src={generatedImage} alt="Generated" style={{ width: "100%", maxHeight: 280, objectFit: "contain", borderRadius: 10 }} />
                <button onClick={() => setGeneratedImage(null)} style={{ marginTop: 8, fontSize: 11, color: "#888", background: "none", border: "none", cursor: "pointer" }}>Clear</button>
              </div>
            )}
          </div>
        )}
      </div>

      <WalletPickerModal open={showWalletPicker} onClose={() => setShowWalletPicker(false)} />

      {/* Template Modal */}
      <Dialog open={showTemplateModal} onOpenChange={setShowTemplateModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader><DialogTitle>Search Templates</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input value={templateSearch} onChange={(e) => setTemplateSearch(e.target.value)} placeholder="Search templates..." className="pl-9" data-testid="input-template-search" />
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="paid-toggle" className="text-sm text-muted-foreground">Free/Paid</Label>
                <Switch id="paid-toggle" checked={showPaidOnly} onCheckedChange={setShowPaidOnly} data-testid="toggle-paid-only" />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Nature","Portrait","Abstract","Sci-Fi","Fantasy","Architecture"].map((filter) => (
                <Badge key={filter} variant={selectedFilters.includes(filter) ? "default" : "outline"} className="cursor-pointer"
                  onClick={() => setSelectedFilters((prev) => prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter])}
                  data-testid={`filter-${filter.toLowerCase()}`}>{filter}</Badge>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto mt-4">
            <div className="grid grid-cols-3 gap-3">
              {filteredTemplates.map((template) => (
                <div key={template.id} className="relative group cursor-pointer rounded-lg overflow-hidden border border-border" onClick={() => { setPromptText((p) => p + (p ? ", " : "") + template.description); setShowTemplateModal(false); }} data-testid={`template-${template.id}`}>
                  <div className="aspect-square bg-muted"><img src={template.image} alt={template.name} className="w-full h-full object-cover" /></div>
                  {template.isFavorite && <Star className="absolute top-2 left-2 h-4 w-4 text-yellow-500 fill-yellow-500" />}
                  {template.isPaid && <Badge className="absolute top-2 right-2 bg-primary text-xs">{template.price}cr</Badge>}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2"><span className="text-white text-sm font-medium">{template.name}</span></div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <QuickVariableCreator open={quickVarCreatorOpen} onOpenChange={setQuickVarCreatorOpen} onCreate={createQuickVariable} insertPosition={textareaRef.current?.selectionStart} />
    </>
  );
}
