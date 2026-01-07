import { useState, useRef, useEffect, useCallback } from "react";
import {
  Zap,
  Plus,
  Search,
  Star,
  Heart,
  ImageIcon,
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  return (
    <>
      {/* Compact Prompt Creator UI */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[84%] max-w-4xl">
        {!open ? (
          <div className="bg-card/85 backdrop-blur-lg border border-border rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="min-w-0">
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
          <div className="bg-card/85 backdrop-blur-lg border border-border rounded-xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20">
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
            {/* Text Input Area */}
            <div className="flex-1 p-4 min-w-0 flex flex-col">
              <div className="flex-1 rounded-xl border border-border bg-background overflow-hidden">
                <Textarea
                  ref={textareaRef}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  onMouseUp={handleTextSelect}
                  onKeyUp={handleTextSelect}
                  placeholder="Describe your image... Use [variable] to create adjustable variables"
                  className="h-full min-h-[170px] max-h-[260px] resize-none bg-transparent border-0 text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 font-mono leading-relaxed !px-4 !py-3"
                  style={{ WebkitTextFillColor: "currentColor", caretColor: "currentColor", opacity: 1 }}
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
          <div className="flex items-center justify-between px-3 py-2 border-t border-border bg-muted/20 backdrop-blur-sm">
            {/* Left: Settings */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <ImageIcon className="h-3.5 w-3.5" />
                <Select value={dimension} onValueChange={setDimension}>
                  <SelectTrigger
                    className="h-6 w-14 text-xs border-0 bg-transparent p-0"
                    data-testid="select-dimension"
                  >
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
                <Heart className="h-3.5 w-3.5" />
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger
                    className="h-6 w-12 text-xs border-0 bg-transparent p-0"
                    data-testid="select-resolution"
                  >
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

            {/* Right: Example & Generate */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs gap-1 text-muted-foreground"
                onClick={() => setQuickVarCreatorOpen(true)}
                data-testid="button-quick-add-variable-compact"
              >
                <Plus className="h-3 w-3" />
                Variable
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs gap-1 text-muted-foreground"
                onClick={fillExampleValues}
                data-testid="button-fill-example"
              >
                <Zap className="h-3 w-3" />
                example
              </Button>

              <Button
                size="sm"
                className="h-8 px-6 bg-green-600 hover:bg-green-700 text-white"
                data-testid="button-generate"
              >
                Generate
              </Button>
            </div>
          </div>
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
