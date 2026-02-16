"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Zap,
  Plus,
  Search,
  Star,
  Gem,
  Heart,
  RectangleHorizontal,
  ChevronUp,
  ChevronDown,
  PanelRightClose,
  PanelRightOpen,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import QuickVariableCreator from "./QuickVariableCreator";
import { useX402PaymentProduction } from "@/hooks/useX402PaymentProduction";
import { useToast } from "@/hooks/use-toast";
import { useActiveAccount } from "thirdweb/react";
import { ConnectWallet } from "@/components/ConnectWallet";
import { addCreation, getUserKeyFromAccount } from "@/lib/creations";
import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";

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
  const highlightOverlayRef = useRef<HTMLDivElement>(null);

  const { generateImage, isPending, getPaymentStatus } = useX402PaymentProduction();
  const account = useActiveAccount();
  const authenticated = !!account;
  const { toast } = useToast();
  const router = useRouter();

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
    if (!authenticated || !account) {
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
        
        // Save to user gallery
        if (account) {
          try {
            const userKey = getUserKeyFromAccount(account);
            if (!userKey) {
              throw new Error("Missing userKey for account");
            }
            addCreation(userKey, {
              id: `${Date.now()}`,
              imageUrl: result.imageUrl,
              prompt: processedPrompt,
              createdAt: new Date().toISOString(),
            });
          } catch (error) {
            console.error('Failed to save image to gallery:', error);
            // Don't show error to user as image was generated successfully
          }
        }
        
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
      {/* Compact Prompt Creator UI */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[84%] max-w-4xl select-none">
        {!open ? (
          <div className="bg-card/85 backdrop-blur-lg border border-border rounded-xl shadow-2xl overflow-hidden select-none">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="min-w-0 select-none">
                <div className="text-sm font-semibold text-foreground">
                  Quick Create
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  Paste a prompt with [variables] to adjust quickly
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setOpen(true)}
                data-testid="button-open-quick-create"
              >
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-card/85 backdrop-blur-lg border border-border rounded-xl shadow-2xl overflow-hidden select-none">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20 select-none">
              <div className="text-sm font-semibold text-foreground">Quick Create</div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setOpen(false)}
                data-testid="button-close-quick-create"
              >
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              </Button>
            </div>
          {/* Selection popup */}
          {selectionPosition && selectedText && (
            <div
              className="absolute bg-popover border border-border rounded-lg shadow-lg p-1 flex gap-1 z-50"
              style={{ top: -45, left: 10 }}
            >
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs gap-1"
                onClick={createVariableFromSelection}
                data-testid="button-add-variable-selection"
              >
                <Plus className="h-3 w-3" />
                Variable
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs gap-1"
                onClick={() => {
                  setShowTemplateModal(true);
                  setTemplateSearch(selectedText);
                }}
                data-testid="button-search-templates"
              >
                <Search className="h-3 w-3" />
                Search Templates
              </Button>
            </div>
          )}

          <div className="flex min-w-0 overflow-hidden">
            {/* Text Input Area with variable highlighting (same as Prompt Editor) */}
            <div className="flex-1 p-4 min-w-0 flex flex-col">
              <div className="flex-1 rounded-xl border border-border bg-background overflow-hidden relative min-h-[170px] max-h-[260px]">
                {/* Highlight layer: variables like in Prompt Editor (bg-primary/20 text-primary) */}
                <div
                  ref={highlightOverlayRef}
                  aria-hidden
                  className="absolute inset-0 overflow-auto pointer-events-none z-0 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words px-4 py-3 text-foreground"
                  style={{ padding: "12px 16px" }}
                >
                  {promptText.split(/(\[[^\]]+\])/).map((part, index) => {
                    const match = part.match(/^\[([^\]]+)\]$/);
                    if (match) {
                      const varName = match[1];
                      return (
                        <span
                          key={index}
                          className="inline font-mono font-medium bg-primary/20 text-primary hover:bg-primary/25"
                        >
                          [{varName}]
                        </span>
                      );
                    }
                    return <span key={index}>{part}</span>;
                  })}
                </div>
                <Textarea
                  ref={textareaRef}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  onScroll={(e) => {
                    const el = e.target as HTMLTextAreaElement;
                    if (highlightOverlayRef.current) {
                      highlightOverlayRef.current.scrollTop = el.scrollTop;
                      highlightOverlayRef.current.scrollLeft = el.scrollLeft;
                    }
                  }}
                  onMouseUp={handleTextSelect}
                  onKeyUp={handleTextSelect}
                  placeholder="Describe your image... Use [variable] to create adjustable variables"
                  className="relative z-10 h-full min-h-[170px] max-h-[260px] resize-none border-0 bg-transparent placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words !px-4 !py-3 caret-foreground"
                  style={{ color: "transparent", WebkitTextFillColor: "transparent", caretColor: "hsl(var(--foreground))" }}
                  data-testid="input-compact-prompt"
                />
              </div>
            </div>

            {/* Mini Variable Adjuster */}
            {variables.length > 0 && (
              <div
                className={
                  variablesOpen
                    ? "w-72 border-l border-border p-3 bg-muted/20 backdrop-blur-sm shrink-0"
                    : "w-12 border-l border-border p-2.5 bg-muted/20 backdrop-blur-sm shrink-0"
                }
              >
                <div className="flex items-center justify-between gap-2 px-1 pb-2">
                  {variablesOpen && (
                    <div className="text-[11px] font-semibold text-muted-foreground">
                      Variables
                    </div>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-7 w-7 p-0"
                    onClick={() => setVariablesOpen((v) => !v)}
                    data-testid="button-toggle-variables"
                  >
                    {variablesOpen ? (
                      <PanelRightClose className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <PanelRightOpen className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>

                {variablesOpen && (
                  <div className="flex flex-col gap-2 max-h-[200px] overflow-y-auto pr-1 scrollbar-thin">
                    {variables.map((variable) => (
                      <div
                        key={variable.id}
                        className="rounded-md border border-border bg-background px-2 py-1.5"
                        data-testid={`variable-adjuster-${variable.name}`}
                      >
                        <Label className="text-[11px] text-muted-foreground">
                          {variable.name}
                        </Label>

                      {variable.type === "text" && (
                        <Input
                          value={variable.currentValue}
                          onChange={(e) =>
                            updateVariable(variable.name, (prevVar) => ({
                              ...prevVar,
                              currentValue: e.target.value,
                            }))
                          }
                          placeholder={variable.defaultValue}
                          className="h-7 mt-1 text-xs text-foreground placeholder:text-muted-foreground bg-background/60 border-border/70"
                          style={{ WebkitTextFillColor: "currentColor" }}
                          data-testid={`input-variable-${variable.name}`}
                        />
                      )}

                      {variable.type === "checkbox" && (
                        <div className="flex items-center gap-2 mt-2">
                          <Checkbox
                            checked={
                              variable.currentValue === "true" ||
                              variable.currentValue === "1"
                            }
                            onCheckedChange={(checked) =>
                              updateVariable(variable.name, (prevVar) => ({
                                ...prevVar,
                                currentValue: checked ? "true" : "false",
                              }))
                            }
                            data-testid={`checkbox-variable-${variable.name}`}
                          />
                          <span className="text-xs text-muted-foreground">
                            Enabled
                          </span>
                        </div>
                      )}

                      {variable.type === "slider" && (
                        <div className="mt-2 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] text-muted-foreground dark:text-white/70">
                              Value
                            </span>
                            <span className="text-[11px] text-foreground dark:text-white font-mono">
                              {variable.currentValue || "0"}
                            </span>
                          </div>
                          <Slider
                            min={variable.min ?? 0}
                            max={variable.max ?? 100}
                            step={variable.step ?? 1}
                            value={[Number(variable.currentValue || variable.min || 0)]}
                            onValueChange={(v) =>
                              updateVariable(variable.name, (prevVar) => ({
                                ...prevVar,
                                currentValue: String(v[0]),
                              }))
                            }
                            data-testid={`slider-variable-${variable.name}`}
                          />
                        </div>
                      )}

                      {variable.type === "single-select" && (
                        <div className="mt-2">
                          <Select
                            value={variable.currentValue}
                            onValueChange={(value) =>
                              updateVariable(variable.name, (prevVar) => ({
                                ...prevVar,
                                currentValue: value,
                              }))
                            }
                          >
                            <SelectTrigger className="h-7 text-xs bg-background/60 border-border/70 text-foreground">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {(variable.options || [])
                                .slice(0, 25)
                                .map((opt) => (
                                  <SelectItem key={opt} value={opt}>
                                    {opt}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {variable.type === "multi-select" && (
                        <div className="mt-2 space-y-1">
                          {(variable.options || []).slice(0, 8).map((opt) => {
                            const selected = (variable.currentValue || "")
                              .split(",")
                              .map((s) => s.trim())
                              .filter(Boolean)
                              .includes(opt);
                            return (
                              <div key={opt} className="flex items-center gap-2">
                                <Checkbox
                                  checked={selected}
                                  onCheckedChange={(checked) =>
                                    updateVariable(variable.name, (prevVar) => {
                                      const set = new Set(
                                        (prevVar.currentValue || "")
                                          .split(",")
                                          .map((s) => s.trim())
                                          .filter(Boolean)
                                      );
                                      if (checked) set.add(opt);
                                      else set.delete(opt);
                                      return {
                                        ...prevVar,
                                        currentValue: Array.from(set).join(","),
                                      };
                                    })
                                  }
                                  data-testid={`checkbox-multi-${variable.name}-${opt}`}
                                />
                                <span className="text-xs text-muted-foreground">
                                  {opt}
                                </span>
                              </div>
                            );
                          })}

                          {(!variable.options || variable.options.length === 0) && (
                            <div className="text-[11px] text-muted-foreground">
                              Add options via token: [name:multi=value|opts=a,b,c]
                            </div>
                          )}
                        </div>
                      )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between px-3 py-2 border-t border-border bg-muted/20 backdrop-blur-sm select-none">
            {/* Left: Settings */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Select value={dimension} onValueChange={setDimension}>
                  <SelectTrigger
                    className="h-7 min-w-[4.5rem] gap-1.5 text-xs border-0 bg-transparent p-0 hover:bg-muted/50 rounded"
                    data-testid="select-dimension"
                  >
                    <RectangleHorizontal className="h-3.5 w-3.5 shrink-0" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1:1">1:1</SelectItem>
                    <SelectItem value="16:9">16:9</SelectItem>
                    <SelectItem value="9:16">9:16</SelectItem>
                    <SelectItem value="4:3">4:3</SelectItem>
                    <SelectItem value="3:4">3:4</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-1.5">
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger
                    className="h-7 min-w-[3.5rem] gap-1.5 text-xs border-0 bg-transparent p-0 hover:bg-muted/50 rounded"
                    data-testid="select-resolution"
                  >
                    <Gem className="h-3.5 w-3.5 shrink-0" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1K">1K</SelectItem>
                    <SelectItem value="2K">2K</SelectItem>
                    <SelectItem value="4K">4K</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => adjustImageCount(-1)}
                  disabled={imageCount <= 1}
                  data-testid="button-decrease-count"
                >
                  <span className="text-xs">-</span>
                </Button>
                <span className="w-6 text-center">{imageCount}/4</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={() => adjustImageCount(1)}
                  disabled={imageCount >= 4}
                  data-testid="button-increase-count"
                >
                  <span className="text-xs">+</span>
                </Button>
              </div>
            </div>

            {/* Right: Edit in Prompt Editor & single Connect/Generate button */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-8 px-4 text-xs gap-1"
                onClick={() => {
                  // Sync prompt text and variables to localStorage
                  localStorage.setItem('syncedPromptText', promptText);
                  localStorage.setItem('syncedPromptVariables', JSON.stringify(variables));
                  router.push('/editor');
                }}
                data-testid="button-edit-in-prompt-editor"
              >
                <FileText className="h-3 w-3" />
                Edit in Prompt Editor
              </Button>

              {authenticated ? (
                <Button
                  size="sm"
                  className="h-8 px-6 bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleGenerateImage}
                  disabled={isGenerating || isPending || !account}
                  data-testid="button-generate"
                >
                  {isGenerating || isPending ? "Generating..." : "Generate"}
                </Button>
              ) : (
                <div className="[&_.connect-wallet-button]:h-8 [&_.connect-wallet-button]:px-6 [&_.connect-wallet-button]:bg-green-600 [&_.connect-wallet-button]:hover:bg-green-700 [&_.connect-wallet-button]:text-white">
                  <ConnectWallet buttonClassName="h-8 px-6 bg-green-600 hover:bg-green-700 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Generated Image Display */}
          {generatedImage && (
            <div className="px-4 pb-4">
              <div className="rounded-xl border border-border bg-background p-4">
                <div className="text-sm font-semibold text-foreground mb-3">Generated Image</div>
                <div className="flex justify-center">
                  <img
                    src={generatedImage}
                    alt="Generated image"
                    className="max-w-full max-h-96 rounded-lg shadow-lg"
                    onError={(e) => {
                      console.error('Failed to load generated image:', generatedImage);
                      toast({
                        title: "Image load failed",
                        description: "The generated image could not be displayed.",
                        variant: "destructive",
                      });
                    }}
                  />
                </div>
                <div className="flex justify-center gap-2 mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push("/my-gallery")}
                  >
                    View in Gallery
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGeneratedImage(null)}
                  >
                    Clear Image
                  </Button>
                </div>
              </div>
            </div>
          )}
          </div>
        )}
      </div>

      {/* Template Search Modal */}
      <Dialog open={showTemplateModal} onOpenChange={setShowTemplateModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Search Templates</DialogTitle>
          </DialogHeader>

          {/* Search & Filters */}
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                  placeholder="Search templates..."
                  className="pl-9"
                  data-testid="input-template-search"
                />
              </div>
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="paid-toggle"
                  className="text-sm text-muted-foreground"
                >
                  Free/Paid
                </Label>
                <Switch
                  id="paid-toggle"
                  checked={showPaidOnly}
                  onCheckedChange={setShowPaidOnly}
                  data-testid="toggle-paid-only"
                />
              </div>
            </div>

            {/* Filter Tags */}
            <div className="flex flex-wrap gap-2">
              {[
                "Nature",
                "Portrait",
                "Abstract",
                "Sci-Fi",
                "Fantasy",
                "Architecture",
              ].map((filter) => (
                <Badge
                  key={filter}
                  variant={
                    selectedFilters.includes(filter) ? "default" : "outline"
                  }
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedFilters((prev) =>
                      prev.includes(filter)
                        ? prev.filter((f) => f !== filter)
                        : [...prev, filter]
                    );
                  }}
                  data-testid={`filter-${filter.toLowerCase()}`}
                >
                  {filter}
                </Badge>
              ))}
            </div>
          </div>

          {/* Template Grid */}
          <div className="flex-1 overflow-y-auto mt-4">
            <div className="grid grid-cols-3 gap-3">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="relative group cursor-pointer rounded-lg overflow-hidden border border-border hover-elevate"
                  onClick={() => addTemplateToPrompt(template)}
                  data-testid={`template-${template.id}`}
                >
                  <div className="aspect-square bg-muted">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Favorite Star */}
                  {template.isFavorite && (
                    <Star className="absolute top-2 left-2 h-4 w-4 text-yellow-500 fill-yellow-500" />
                  )}

                  {/* Price Badge */}
                  {template.isPaid && (
                    <Badge className="absolute top-2 right-2 bg-primary text-xs">
                      {template.price}cr
                    </Badge>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                    <span className="text-white text-sm font-medium">
                      {template.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <QuickVariableCreator
        open={quickVarCreatorOpen}
        onOpenChange={setQuickVarCreatorOpen}
        onCreate={createQuickVariable}
        insertPosition={textareaRef.current?.selectionStart}
      />
    </>
  );
}
