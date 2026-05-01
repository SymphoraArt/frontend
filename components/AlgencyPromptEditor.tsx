"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useActiveAccount } from "thirdweb/react";
import { addCreation, getUserKeyFromAccount } from "@/lib/creations";
import { useX402PaymentProduction } from "@/hooks/useX402PaymentProduction";
import { useBestPaymentChain } from "@/hooks/useWalletBalance";
import type { ChainKey } from "@/shared/payment-config";
import {
  Search,
  Settings,
  Plus,
  Sparkles,
  AlertTriangle,
  Bell,
  Check,
  Zap
} from "lucide-react";
import nlp from "compromise";

/* ─── Types ─── */
type VariableType = "text" | "checkbox";
type PromptType = "free-prompt" | "premium-prompt";

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
}

interface VersionCard {
  id: number;
  variableSnapshot: Record<string, string>;
  imageUrl: string | null;
  status: "idle" | "queued" | "generating" | "complete" | "failed";
  queuePosition?: number; // assigned when batch-queued
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
  const account = useActiveAccount();
  const { generateImage: generateImageWithPayment, isPending: isPaymentPending } = useX402PaymentProduction();
  const { chainKey: bestChain } = useBestPaymentChain();
  const [selectedChain] = useState<ChainKey>(bestChain || "base-sepolia");
  const { toast } = useToast();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

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
    title: "Quiet Window, Late Afternoon",
    body: "A photograph of [subject], [mood], lit by [lighting]. [grain]\nEditorial. Restrained.",
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

  const [variables, setVariables] = useState<PromptVariable[]>([
    { id: "subject", name: "subject", label: "Subject", description: "", type: "text", defaultValue: "a young woman, dark hair", values: ["a young woman, dark hair"], required: true, position: 0 },
    { id: "mood", name: "mood", label: "Mood", description: "", type: "text", defaultValue: "contemplative, soft", values: ["contemplative, soft"], required: true, position: 1 },
    { id: "lighting", name: "lighting", label: "Lighting", description: "", type: "text", defaultValue: "e.g a young woman, dark hair...", values: [], required: true, position: 2 },
    { id: "grain", name: "grain", label: "Add film grain", description: "Add a soft, grainy film texture — like an old 35mm", type: "checkbox", defaultValue: true, values: [], required: false, position: 3 },
  ]);

  const [versions, setVersions] = useState<VersionCard[]>([]);

  const [ui, setUi] = useState({
    selectedCards: [] as number[],
    cursorPos: 0,
    selectedVariableId: "lighting" as string | null,
    maxImages: 2,
    currentPromptId: null as string | null,
    showAvatarDropdown: false,
    tooltip: null as { x: number, y: number, text: string } | null,
    tagInput: "",
    isGrokFilling: false,
    showVerificationCard: false,
    queueTotal: 0,
  });

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
      const allowedArray = Array.from(allowed);
      setRatios(prev => ({
        ...prev,
        available: allowedArray,
        selected: allowedArray.includes(prev.selected) ? prev.selected : allowedArray[0] || "Any ratio"
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

  /* ─── Real-time Variable Sync — detects [], {}, and <> brackets ─── */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Universal bracket regex: [name], {name}, <name>
      const regex = /(?:\[([a-z_0-9]+)\]|\{([a-z_0-9]+)\}|<([a-z_0-9]+)>)/gi;
      const uniqueVarNames = new Set<string>();
      let match;
      while ((match = regex.exec(promptData.body)) !== null) {
        const varName = match[1] || match[2] || match[3];
        if (varName) uniqueVarNames.add(varName);
      }

      setVariables((prev) => {
        const existingVars = prev.filter((v) => uniqueVarNames.has(v.name));
        const existingNames = new Set(existingVars.map((v) => v.name));
        const newVars: PromptVariable[] = [];
        uniqueVarNames.forEach((varName) => {
          if (!existingNames.has(varName)) {
            newVars.push({
              id: varName, name: varName, label: varName, description: "",
              type: "text", defaultValue: "", values: [], required: true, position: existingVars.length + newVars.length,
            });
          }
        });
        return [...existingVars, ...newVars];
      });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [promptData.body]);

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

  /* ─── Bracket Deletion ─── */
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Backspace' && e.key !== 'Delete') return;
    const el = e.currentTarget;
    const pos = el.selectionStart;
    const text = promptData.body;

    const before = text.substring(0, pos);
    const match = before.match(/\[([a-z_0-9]+)\]$/i);

    if (match) {
      e.preventDefault();
      const varName = match[1];
      const variable = variables.find(v => v.name === varName);
      const defaultText = (variable?.type === "text" ? variable.defaultValue as string : varName) || varName;

      const newText = text.substring(0, pos - match[0].length) + defaultText + text.substring(pos);
      const newPos = pos - match[0].length + defaultText.length;

      setPromptData(prev => ({ ...prev, body: newText }));

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = newPos;
          textareaRef.current.focus();
        }
      });
    }
  };

  /* ─── AI Variable Naming ─── */
  const handleTextareaSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    setUi(prev => ({ ...prev, cursorPos: el.selectionStart }));

    const start = el.selectionStart;
    const end = el.selectionEnd;
    if (end > start) {
      const selectedText = promptData.body.substring(start, end);
      const rect = el.getBoundingClientRect();
      // Approximate tooltip position near cursor
      const x = rect.left + 50;
      const y = rect.top;

      setUi(prev => ({ ...prev, tooltip: { x, y, text: selectedText } }));
    } else {
      setUi(prev => ({ ...prev, tooltip: null }));
    }
  };

  const createVariableFromSelection = () => {
    if (!ui.tooltip) return;
    const { text } = ui.tooltip;

    // NLP name generation
    const doc = nlp(text);
    const nouns = doc.nouns().out('array');
    const base = nouns[0] || doc.terms().out('array')[0] || 'variable';
    let varName = base.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');

    // Duplicate handling
    const existingNames = variables.map(v => v.name);
    if (existingNames.includes(varName)) {
      let i = 1;
      while (existingNames.includes(`${varName}_${i}`)) i++;
      varName = `${varName}_${i}`;
    }

    const el = textareaRef.current;
    if (el) {
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const val = promptData.body;
      const newVal = val.substring(0, start) + `[${varName}]` + val.substring(end);

      setPromptData(prev => ({ ...prev, body: newVal }));
      setVariables(prev => [...prev, {
        id: varName, name: varName, label: varName, description: "",
        type: "text", defaultValue: text, values: [text], required: true, position: prev.length
      }]);
      setUi(prev => ({ ...prev, tooltip: null, selectedVariableId: varName }));

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + `[${varName}]`.length;
          textareaRef.current.focus();
        }
      });
    }
  };

  /* ─── Sync textarea scroll with overlay ─── */
  const handleTextareaScroll = useCallback(() => {
    if (textareaRef.current && overlayRef.current) {
      overlayRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  }, []);

  /* ─── Preview with defaults ─── */
  const renderPreviewWithDefaults = () => {
    let previewText = promptData.body;
    variables.forEach((variable) => {
      const placeholder = `[${variable.name}]`;
      const display = variable.type === "text"
        ? (variable.defaultValue as string) || ""
        : (variable.defaultValue as boolean) ? variable.description : "";
      previewText = previewText.split(placeholder).join(display);
    });
    return previewText;
  };

  /* ─── Update variable ─── */
  const updateVariable = (varId: string, updates: Partial<PromptVariable>) => {
    if (updates.name !== undefined) {
      const currentVar = variables.find((v) => v.id === varId);
      if (currentVar && currentVar.name !== updates.name) {
        const oldPlaceholder = `[${currentVar.name}]`;
        const newPlaceholder = `[${updates.name}]`;
        setPromptData(prev => ({ ...prev, body: prev.body.split(oldPlaceholder).join(newPlaceholder) }));
        setVariables(variables.map((v) =>
          v.id === varId ? { ...v, ...updates, id: updates.name! } : v
        ));
        return;
      }
    }
    setVariables(variables.map((v) => (v.id === varId ? { ...v, ...updates } : v)));
  };

  /* ─── Render prompt text with colored variable tags ─── */
  const getVarStyle = (varName: string) => {
    const isSelected = ui.selectedVariableId === varName;
    const variable = variables.find(v => v.name === varName);
    if (isSelected) return { background: "#C7663A", color: "#1C1A18" };
    if (variable?.type === "checkbox") return { background: "#E8E6F0", color: "#1C1A18" };
    return { background: "#FCECDD", color: "#1C1A18" };
  };

  const renderPromptWithTags = () => {
    // Split on [], {}, and <> bracket groups
    const parts = promptData.body.split(/((?:\[[a-z_0-9]+\]|\{[a-z_0-9]+\}|<[a-z_0-9]+>))/i);
    return parts.map((part, index) => {
      const match = part.match(/(?:\[([a-z_0-9]+)\]|\{([a-z_0-9]+)\}|<([a-z_0-9]+)>)/i);
      if (match) {
        const varName = match[1] || match[2] || match[3];
        const style = getVarStyle(varName);
        return (
          <span
            key={index}
            className="alg-var-tag"
            style={style}
            onClick={() => setUi(prev => ({ ...prev, selectedVariableId: varName }))}
          >
            {part}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  /* ─── Generate Image — uses per-card snapshot for interpolation ─── */
  const handleGenerateVersion = async (versionId: number) => {
    // Get this card's snapshot to build the prompt
    const card = versions.find(v => v.id === versionId) ??
      { variableSnapshot: {} as Record<string, string> };
    const snapshot = card.variableSnapshot;

    let previewText = promptData.body;
    variables.forEach((variable) => {
      const placeholder = `[${variable.name}]`;
      const val = snapshot[variable.name] ??
        (variable.type === "text" ? (variable.defaultValue as string) : (variable.defaultValue ? variable.description : ""));
      previewText = previewText.split(placeholder).join(val);
    });

    if (!previewText.trim()) {
      toast({ title: "Error", description: "Please enter a prompt.", variant: "destructive" });
      return;
    }
    setVersions(prev => prev.map(v => v.id === versionId ? { ...v, status: "generating" } : v));
    try {
      const data = await generateImageWithPayment(
        { prompt: previewText, resolution: "2K", modelIds: models.selected, ratio: ratios.selected },
        selectedChain
      ) as { imageUrl: string; provider?: string; usedGemini?: boolean };
      setVersions(prev => prev.map(v => v.id === versionId ? { ...v, status: "complete", imageUrl: data.imageUrl } : v));
      const userKey = getUserKeyFromAccount(account);
      if (userKey && data?.imageUrl) {
        try {
          await apiRequest("POST", "/api/generations", {
            userKey, prompt: previewText, imageUrl: String(data.imageUrl),
            provider: typeof data.provider === "string" ? data.provider : "unknown",
            meta: { usedGemini: Boolean(data.usedGemini ?? false) },
          });
        } catch { /* ignore */ }
        addCreation(userKey, {
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          imageUrl: data.imageUrl, prompt: previewText, createdAt: new Date().toISOString(),
        });
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
    return (v.defaultValue as string) || name;
  };

  /* ─── Stack Variables — bridge button pushes N cards into Verify ─── */
  const handleStackVariables = () => {
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
        } else {
          const pool = v.values.length > 0 ? v.values : [(v.defaultValue as string) || v.name];
          snapshot[v.name] = pool[i % pool.length];
        }
      });
      newCards.push({ id: baseId + i + 1, variableSnapshot: snapshot, imageUrl: null, status: "idle" });
    }
    return [...activeVersions, ...newCards];
    });
    setUi(prev => ({ ...prev, showVerificationCard: true }));
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

  const getRefillCost = (slotCount: number): string =>
    formatCost(getPricePerSlot() * slotCount * 0.8);

  /* ─── Pay & Generate — UX shows total cost, fires sequential per-slot x402 ─── */
  const handlePayAndGenerate = () => {
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

  /* ─── Refill & Generate — delete selected + pay 80% price for those slots ─── */
  const handleRefillAndGenerate = () => {
    if (ui.selectedCards.length === 0) return;
    const refillCount = ui.selectedCards.length;
    const cost = getRefillCost(refillCount);
    // Delete selected cards
    setVersions(prev => prev.filter(v => !ui.selectedCards.includes(v.id)));
    setUi(prev => ({ ...prev, selectedCards: [] }));
    // Create fresh idle snapshots for refill slots (use current variable defaults)
    const baseSnapshot: Record<string, string> = {};
    variables.forEach(v => { baseSnapshot[v.name] = (v.defaultValue as string) || v.name; });
    const baseId = versions.filter(v => !ui.selectedCards.includes(v.id)).length > 0
      ? Math.max(...versions.filter(v => !ui.selectedCards.includes(v.id)).map(v => v.id))
      : 0;
    const refillCards: VersionCard[] = Array.from({ length: refillCount }, (_, i) => ({
      id: baseId + i + 1,
      variableSnapshot: { ...baseSnapshot },
      imageUrl: null,
      status: "queued" as const,
      queuePosition: i + 1,
    }));
    setVersions(prev => [...prev, ...refillCards]);
    setUi(prev => ({ ...prev, queueTotal: refillCount }));
    toast({
      title: `Refill pack · ${cost}`,
      description: `${refillCount} slot${refillCount > 1 ? "s" : ""} queued at 20% refill discount.`,
    });
    refillCards.forEach((card, i) => {
      setTimeout(() => {
        setVersions(prev => prev.map(v =>
          v.id === card.id ? { ...v, status: "generating", queuePosition: undefined } : v
        ));
        handleGenerateVersion(card.id);
      }, i * 400);
    });
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
      toast({ title: "Grok filled variables", description: `Filled ${Object.keys(filled).length} variable(s).` });
    } catch {
      toast({ title: "Grok fill failed", description: "Could not auto-fill. Try again.", variant: "destructive" });
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

  const deleteSelectedVersions = () => {
    setVersions(prev => prev.filter(v => !ui.selectedCards.includes(v.id)));
    setUi(prev => ({ ...prev, selectedCards: [] }));
  };

  const savePromptMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        id: ui.currentPromptId,
        title: promptData.title,
        content: promptData.body,
        userId: null,
        promptType: promptData.type,
        aiModel: models.selected[0],
        tags: promptData.tags,
        variables: variables.map((v) => ({
          name: v.name, label: v.label, description: v.description,
          type: v.type, defaultValue: v.defaultValue, required: v.required, position: v.position,
        })),
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

  const verifiedCount = versions.filter((s) => s.imageUrl && s.status === "complete").length;
  const isPublishDisabled = verifiedCount === 0;

  return (
    <div className="alg-page" onClick={() => { setUi(prev => ({ ...prev, showAvatarDropdown: false, tooltip: null })) }}>
      {/* ═══ NAVBAR ═══ */}
      <nav className="alg-navbar">
        <div className="alg-navbar__left">
          <div className="alg-navbar__logo" onClick={() => router.push("/")}>
            <span className="alg-navbar__logo-icon">A</span>
            Algency
          </div>
          <div className="alg-navbar__links">
            <button className="alg-navbar__link" onClick={() => router.push("/showcase")}>DISCOVER</button>
            <button className="alg-navbar__link">IMAGES</button>
            <button className="alg-navbar__link">VIDEOS</button>
            <button className="alg-navbar__link">FAVORITES</button>
          </div>
        </div>
        <div className="alg-navbar__center" style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1, paddingRight: '20px' }}>
          <div className="alg-navbar__search">
            <Search className="alg-navbar__search-icon" />
            <input type="text" placeholder="Search prompts, tags, artists..." />
          </div>
          <button
            className="alg-btn alg-btn--primary alg-btn--sm"
            onClick={() => savePromptMutation.mutate()}
            disabled={savePromptMutation.isPending}
            style={{ marginLeft: 'auto' }}
          >
            {savePromptMutation.isPending ? "Saving..." : "Release prompt"}
          </button>
        </div>
        <div className="alg-navbar__right" style={{ position: 'relative' }}>
          <button className="alg-navbar__icon-btn">
            <Bell size={16} />
          </button>
          <div
            className="alg-navbar__avatar"
            onClick={(e) => { e.stopPropagation(); setUi(prev => ({ ...prev, showAvatarDropdown: !prev.showAvatarDropdown })) }}
          >
            {account?.address ? account.address.slice(2, 4).toUpperCase() : "SM"}
          </div>
          {ui.showAvatarDropdown && (
            <div className="alg-avatar-dropdown" onClick={(e) => e.stopPropagation()}>
              <button className="alg-avatar-dropdown__item" onClick={() => { alert('Connect Wallet placeholder') }}>Connect Wallet</button>
              <button className="alg-avatar-dropdown__item">Profile Settings</button>
              <button className="alg-avatar-dropdown__item">Sign Out</button>
            </div>
          )}
        </div>
      </nav>

      {/* ═══ TITLE BAR ═══ */}
      <div className="alg-titlebar">
        <div className="alg-titlebar__left">
          <span className="alg-titlebar__label">PROMPT TITLE</span>
          <input
            className="alg-titlebar__title"
            value={promptData.title}
            onChange={(e) => setPromptData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Untitled Prompt"
          />
        </div>
        <div className="alg-titlebar__right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontFamily: 'var(--font-jetbrains-mono), monospace', color: '#5A5550', fontWeight: 500 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#E07045' }} />
            {verifiedCount}/1+ verified
          </div>
        </div>
      </div>

      {/* ═══ 4-COLUMN GRID ═══ */}
      <div className="alg-grid">

        {/* ═══ PANEL 01 — Settings ═══ */}
        <section className="alg-panel" style={{ background: "var(--alg-bg)" }}>
          <div className="alg-panel__header">
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="alg-panel__number" style={{ color: "#E07045" }}>01</span>
              <span className="alg-panel__title">Settings</span>
            </div>
          </div>
          <div className="alg-panel__body">
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
              onClick={() => setPromptData(prev => ({ ...prev, type: "premium-prompt" }))}
            >
              <div className="alg-mode-card__title">Premium prompt</div>
              <div className="alg-mode-card__desc">Body locked · buyer fills variables and pays per render</div>
            </div>

            <div className="alg-divider" />

            {/* Tags */}
            <div className="alg-label">TAGS</div>
            <div className="alg-tag-input-wrap">
              <div className="alg-tag-chips">
                {promptData.tags.map(tag => (
                  <span key={tag} className="alg-tag-chip">
                    {tag}
                    <button className="alg-tag-chip__remove" onClick={() => removeTag(tag)}>×</button>
                  </span>
                ))}
              </div>
              <input
                className="alg-tag-input"
                placeholder="Add tag, press Enter"
                value={ui.tagInput}
                onChange={(e) => setUi(prev => ({ ...prev, tagInput: e.target.value }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    addTag(ui.tagInput);
                    setUi(prev => ({ ...prev, tagInput: '' }));
                  }
                }}
              />
            </div>

            <div className="alg-divider" />

            {/* Preferred Models */}
            <div className="alg-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>PREFERRED MODELS</span>
              <span style={{ fontSize: 10, fontFamily: "var(--font-jetbrains-mono), monospace", color: "#7A7570", textTransform: 'lowercase', letterSpacing: 0, fontWeight: 500 }}>multi-select</span>
            </div>
            {models.available.length === 0 ? (
              <div style={{ fontSize: 13, color: "var(--alg-muted)" }}>No models available</div>
            ) : (
              models.available.map((model) => {
                const isActive = models.selected.includes(model.id);
                return (
                  <div
                    key={model.id}
                    className={`alg-model-row ${isActive ? "alg-model-row--active" : ""}`}
                    onClick={() => toggleModel(model.id)}
                  >
                    <span className="alg-model-row__name" style={{ display: 'flex', alignItems: 'center' }}>
                      {model.name}
                    </span>
                    <span className="alg-model-row__price">${model.price.toFixed(2)}</span>
                  </div>
                );
              })
            )}

            <div className="alg-divider" />

            {/* Preferred Ratio */}
            <div className="alg-label">PREFERRED RATIO</div>
            <div className="alg-ratio-group">
              {allPossibleRatios.map((ratio) => {
                const isAllowed = ratios.available.includes(ratio) || ratio === "Any ratio";
                return (
                  <button
                    key={ratio}
                    className={`alg-ratio-pill ${ratios.selected === ratio ? "alg-ratio-pill--active" : ""} ${!isAllowed ? "alg-ratio-pill--disabled" : ""}`}
                    onClick={() => isAllowed && setRatios(prev => ({ ...prev, selected: ratio }))}
                  >
                    {ratio}
                  </button>
                );
              })}
            </div>
            <p className="alg-hint-text">Buyer picks the ratio at render time.</p>

            <div className="alg-divider" />

            {/* Reference Images */}
            <div className="alg-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>REFERENCE IMAGES</span>
              <span className="alg-label__badge" style={{ background: "#C7663A", color: "white", borderRadius: 0, padding: "2px 6px" }}>ALLOWED</span>
            </div>
            <div style={{ border: "1px solid var(--alg-border)", borderRadius: "3px", padding: "16px", background: "#FFFFFF", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <span style={{ fontSize: 11, fontFamily: "var(--font-jetbrains-mono), monospace", color: "#7A7570" }}>Max images</span>
                <div className="alg-stepper">
                  <button className="alg-stepper__btn" onClick={() => setUi(prev => ({ ...prev, maxImages: Math.max(1, prev.maxImages - 1) }))}>−</button>
                  <span className="alg-stepper__value" style={{ width: 32, textAlign: 'center', fontFamily: "var(--font-serif)", fontSize: 16, color: "#1C1A18", background: "#FFFFFF" }}>{ui.maxImages}</span>
                  <button className="alg-stepper__btn" onClick={() => setUi(prev => ({ ...prev, maxImages: Math.min(10, prev.maxImages + 1) }))}>+</button>
                </div>
              </div>
              <p className="alg-hint-text" style={{ fontStyle: "italic", fontFamily: "var(--font-jetbrains-mono), monospace", color: "#9A9590", margin: 0, lineHeight: 1.6 }}>
                Buyers can upload an image — or pick an NFT from their wallet — up to {ui.maxImages} per render.
              </p>
            </div>

            <div className="alg-divider" style={{ marginTop: 24, marginBottom: 24 }} />

            {/* Pricing */}
            <div className="alg-label">PRICING</div>
            <div style={{ border: "1px solid var(--alg-border)", borderRadius: "3px", padding: "16px", background: "#FFFFFF" }}>
              <p style={{ fontFamily: "var(--font-serif)", fontSize: 15, fontStyle: "italic", color: "#1C1A18", margin: 0, lineHeight: 1.5 }}>
                Free prompts cost nothing to use.<br />Buyers run the prompt with their own API credits.
              </p>
            </div>
            <div style={{ height: 24, flexShrink: 0 }} />
          </div>
        </section>

        {/* ═══ PANEL 02 — Prompt ═══ */}
        <section className="alg-panel">
          <div className="alg-panel__header">
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="alg-panel__number" style={{ color: "#E07045" }}>02</span>
              <span className="alg-panel__title">Prompt</span>
            </div>
            <button className="alg-btn alg-btn--ghost alg-btn--sm" onClick={() => insertAtCursor("[NewVariable]")}>
              <Plus size={14} /> Variable
            </button>
          </div>
          <div className="alg-panel__body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Tooltip */}
            {ui.tooltip && (
              <div
                className="alg-tooltip"
                style={{ left: ui.tooltip.x, top: ui.tooltip.y }}
                onClick={(e) => { e.stopPropagation(); createVariableFromSelection(); }}
              >
                <Plus size={12} style={{ display: 'inline', marginRight: 4, verticalAlign: 'middle' }} /> Create Variable
              </div>
            )}

            {/* Textarea with overlay */}
            <div style={{ position: "relative", flex: 1, minHeight: 200 }}>
              {promptData.body.length > 0 && (
                <div ref={overlayRef} className="alg-prompt-overlay">
                  {renderPromptWithTags()}
                </div>
              )}
              <textarea
                ref={textareaRef}
                className="alg-textarea"
                style={{
                  position: "relative",
                  background: promptData.body.length > 0 ? "transparent" : undefined,
                  color: promptData.body.length > 0 ? "transparent" : "transparent",
                  caretColor: "#1C1A18",
                  zIndex: 1,
                  minHeight: 200,
                }}
                value={promptData.body}
                onChange={(e) => setPromptData(prev => ({ ...prev, body: e.target.value }))}
                onScroll={handleTextareaScroll}
                onSelect={handleTextareaSelect}
                onKeyDown={handleTextareaKeyDown}
                placeholder="Write your prompt here... Select text to extract a variable."
              />
            </div>

            <div style={{ height: 24, flexShrink: 0 }} />
          </div>
        </section>

        {/* ═══ PANEL 03 — Variables ═══ */}
        <section className="alg-panel">
          <div className="alg-panel__header">
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="alg-panel__number" style={{ color: "#E07045" }}>03</span>
              <span className="alg-panel__title">Variables</span>
            </div>
            <span className="alg-panel__subtitle">defaults & types</span>
          </div>
          <div className="alg-panel__body">
            {variables.length === 0 ? (
              <div className="alg-empty">
                <div className="alg-empty__icon"><EmptyVarIcon /></div>
                <div className="alg-empty__title">No variables yet.</div>
                <div className="alg-empty__sub">Select text or use [Name]</div>
              </div>
            ) : (
              variables.map((variable) => (
                <div
                  key={variable.id}
                  className={`alg-var-card alg-var-card--entering ${ui.selectedVariableId === variable.id ? "alg-var-card--active" : ""}`}
                  onClick={() => setUi(prev => ({ ...prev, selectedVariableId: variable.id }))}
                >
                  <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 4 }}>
                    <div className="alg-var-card__name">{variable.label}</div>
                    <div className="alg-var-card__label" style={{ marginBottom: 0 }}>VARIABLE NAME</div>
                  </div>

                  {/* Type toggle */}
                  <div className="alg-type-toggle">
                    <button
                      className={`alg-type-toggle__btn ${variable.type === "text" ? "alg-type-toggle__btn--active" : ""}`}
                      onClick={(e) => { e.stopPropagation(); updateVariable(variable.id, { type: "text" }); }}
                    >
                      Text input
                    </button>
                    <button
                      className={`alg-type-toggle__btn ${variable.type === "checkbox" ? "alg-type-toggle__btn--active" : ""}`}
                      onClick={(e) => { e.stopPropagation(); updateVariable(variable.id, { type: "checkbox" }); }}
                    >
                      Yes / No checkbox
                    </button>
                  </div>

                  {/* Default value + stacked values */}
                  {variable.type === "text" ? (
                    <>
                      <div className="alg-var-card__label" style={{ marginTop: 12, marginBottom: 6 }}>DEFAULT VALUE</div>
                      <div className={`alg-var-card__default-val ${ui.selectedVariableId === variable.id && !variable.defaultValue ? "alg-var-card__default-val--italic" : ""}`}>
                        {(variable.defaultValue as string) || (ui.selectedVariableId === variable.id ? "e.g. a young woman, dark hair..." : "")}
                      </div>
                      <div className="alg-var-card__hint">Used until the buyer changes it.</div>

                      {/* Stacked values */}
                      <div className="alg-var-card__label" style={{ marginTop: 14, marginBottom: 6 }}>STACK VALUES <span style={{ color: "#B0AAA2", fontWeight: 400, textTransform: "lowercase", letterSpacing: 0 }}>({variable.values.length})</span></div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 6 }}>
                        {variable.values.map((val, idx) => (
                          <span key={idx} className="alg-val-chip">
                            {val}
                            <button className="alg-val-chip__remove" onClick={(e) => {
                              e.stopPropagation();
                              updateVariable(variable.id, { values: variable.values.filter((_, i) => i !== idx) });
                            }}>×</button>
                          </span>
                        ))}
                      </div>
                      <input
                        className="alg-val-add-input"
                        placeholder="+ Add value, press Enter"
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const val = (e.target as HTMLInputElement).value.trim();
                            if (val && !variable.values.includes(val)) {
                              updateVariable(variable.id, { values: [...variable.values, val] });
                            }
                            (e.target as HTMLInputElement).value = "";
                          }
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <div className="alg-toggle-inserts-row">
                        <span className="alg-toggle-inserts-label">TOGGLE INSERTS</span>
                        <label className="alg-checkbox" onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#B0AAA2' }}>
                          <input
                            type="checkbox"
                            checked={variable.defaultValue as boolean}
                            onChange={(e) => updateVariable(variable.id, { defaultValue: e.target.checked })}
                            style={{ accentColor: '#E07045', width: 14, height: 14, borderRadius: 3 }}
                          />
                          <span>Default: <span style={{ fontWeight: 600, color: '#1C1A18' }}>{variable.defaultValue ? "on" : "off"}</span></span>
                        </label>
                      </div>
                      <div className="alg-toggle-inserts-block">
                        {variable.description || "Add a soft, grainy film texture — like an old 35mm…"}
                      </div>
                      <div className="alg-toggle-inserts-footer">
                        The prompt text wrapping <span className="alg-mono-span">[{variable.name}]</span> in column 02.
                      </div>
                    </>
                  )}
                </div>
              ))
            )}

            {/* ─── Stack Variables Bridge Button — flush to bottom divider ─── */}
            {variables.length > 0 && (
              <button
                className="alg-stack-btn"
                style={{ marginTop: "auto" }}
                onClick={handleStackVariables}
              >
                <span className="alg-stack-btn__label">Stack variables</span>
                <span className="alg-stack-btn__arrow">→ Verify</span>
                <span className="alg-stack-btn__count">{variables.length} var{variables.length !== 1 ? 's' : ''}</span>
              </button>
            )}
          </div>
        </section>

        {/* ═══ BRIDGE COLUMN — Stack Variables ═══ */}
        <div className="alg-bridge-col">
          {variables.length > 0 && (
            <button
              className="alg-bridge-btn"
              onClick={handleStackVariables}
              title="Stack variables and verify"
              disabled={versions.length > 0 && !versions.some(v => v.status === "idle" || v.status === "failed")}
            >
              <Zap size={10} color={versions.length > 0 && !versions.some(v => v.status === "idle" || v.status === "failed") ? "#A09A95" : "#FFFFFF"} fill="currentColor" />
              Stack &amp; Verify
            </button>
          )}
        </div>

        {/* ═══ PANEL 04 — Verify ═══ */}
        <section className="alg-panel alg-panel--verify" style={{ background: "var(--alg-bg)" }}>
          <div className="alg-panel__header" style={{ paddingBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span className="alg-panel__number" style={{ color: "#E07045" }}>04</span>
              <span className="alg-panel__title">Verify</span>
            </div>
            <span style={{ marginLeft: "auto", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, color: "#7A7570", letterSpacing: 1, whiteSpace: "nowrap", flexShrink: 0 }}>
              3 of 1 required, 4 recommended
            </span>
          </div>
          <div className="alg-panel__body" style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, color: "#7A7570", marginBottom: 16, lineHeight: 1.6 }}>
              Free prompts need at least one reference render. Four is recommended — buyers trust prompts that prove they generalize.
            </p>

            {/* ─── Verification Card ─── */}
            {ui.showVerificationCard && variables.length > 0 && (
              <div style={{ border: "1px solid var(--alg-border)", background: "#FDFBF8", padding: "16px", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, fontWeight: 600, color: "#5A5550", letterSpacing: 1.5, textTransform: "uppercase" }}>Before you generate</span>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 9, color: "#B0AAA2" }}>{variables.filter(v => v.type === "text" && !v.defaultValue).length} empty</span>
                </div>
                {variables.map(v => (
                  <div key={v.id} style={{ display: "flex", alignItems: "baseline", gap: 8, padding: "6px 0", borderBottom: "1px solid #EDE8E0" }}>
                    <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 9, color: "var(--alg-hint)", letterSpacing: 1, textTransform: "uppercase", width: 72, flexShrink: 0 }}>{v.name}</span>
                    {v.type === "checkbox" ? (
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: 12, color: "#1C1A18" }}>{v.defaultValue ? "on" : "off"}</span>
                    ) : (
                      <span style={{ fontFamily: "var(--font-serif)", fontSize: 12, color: v.defaultValue ? "#1C1A18" : "#B0AAA2", fontStyle: v.defaultValue ? "normal" : "italic" }}>
                        {v.defaultValue ? String(v.defaultValue) : "Not specified"}
                      </span>
                    )}
                  </div>
                ))}
                {/* Pay & Generate CTA */}
                <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
                  {/* Cost summary */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: "#F5F2EE", border: "1px solid var(--alg-border)" }}>
                    <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 9, color: "#5A5550", letterSpacing: 1, textTransform: "uppercase" }}>Batch cost</span>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                      <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 13, fontWeight: 700, color: "#1C1A18" }}>
                        {getBatchCost(Math.max(versions.filter(v => v.status === "idle" || v.status === "failed").length, variables.filter(v => v.type === "text").length > 0 ? Math.max(...variables.filter(v => v.type === "text").map(v => v.values.length || 1)) : 1))}
                      </span>
                      <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 9, color: "#B0AAA2" }}>via Thirdweb x402</span>
                    </div>
                  </div>
                  <button
                    className="alg-pay-btn"
                    onClick={handlePayAndGenerate}
                    disabled={isPaymentPending}
                  >
                    {isPaymentPending ? (
                      <>● Processing payment...</>
                    ) : (
                      <>
                        <Zap size={11} />
                        Pay &amp; Generate
                        <span style={{ marginLeft: 4, opacity: 0.6, fontWeight: 400, fontSize: 9 }}>
                          {versions.filter(v => v.status === "idle" || v.status === "failed").length > 0
                            ? `${versions.filter(v => v.status === "idle" || v.status === "failed").length} slots`
                            : "stack first"}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            <div style={{ flex: 1, overflowY: "auto" }}>
              {versions.map((slot) => {
                const isSelected = ui.selectedCards.includes(slot.id);
                return (
                  <div
                    key={slot.id}
                    className={`alg-version-card ${slot.status === "generating" ? "alg-version-card--loading" : ""} ${slot.status === "failed" ? "alg-version-card--failed" : ""} ${isSelected ? "alg-version-card--selected" : ""}`}
                    onClick={() => toggleVersionCheckbox(slot.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="alg-version-card__thumb">
                      {slot.status === "complete" && slot.imageUrl ? (
                        <img src={slot.imageUrl} alt={`Version ${String(slot.id).padStart(2, "00")}`} />
                      ) : slot.status === "generating" ? (
                        <div className="alg-spinner" />
                      ) : slot.status === "queued" ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                          <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 18, fontWeight: 700, color: "#E07045" }}>#{slot.queuePosition}</span>
                          <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 9, color: "#9A9590", letterSpacing: 1 }}>IN QUEUE</span>
                        </div>
                      ) : slot.status === "failed" ? (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "0 10px", textAlign: "center" }}>
                          <AlertTriangle color="#E07045" size={20} />
                          <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 9, color: "#E07045", letterSpacing: 0.5 }}>RESTRICTED CONTENT</span>
                          <span style={{ fontSize: 9, color: "#9A9590", lineHeight: 1.3 }}>NSFW or policy violation detected. Adjust variables and try again.</span>
                        </div>
                      ) : (
                        <button style={{ background: "#5A5550", color: "white", padding: "6px 12px", border: "none", borderRadius: "3px", fontSize: 10, display: "flex", alignItems: "center", gap: 4, cursor: "pointer", fontFamily: "var(--font-outfit), 'Outfit', sans-serif", fontWeight: 500 }}
                          onClick={(e) => { e.stopPropagation(); handleGenerateVersion(slot.id); }}
                        >
                          <Zap size={10} color="white" fill="white" /> Generate
                        </button>
                      )}
                    </div>
                    <div className="alg-version-card__info">
                      <div className="alg-version-card__header">
                        <span className="alg-version-card__label">Version {String(slot.id).padStart(2, "0")}</span>
                        <span className="alg-version-card__status" style={
                          slot.status === "queued" ? { color: "#E07045", fontWeight: 600 } :
                          slot.status === "failed" ? { color: "#E07045", fontWeight: 600 } :
                          slot.status === "idle" ? { color: "#B0AAA2", fontStyle: "italic", fontWeight: 400 } : {}
                        }>
                          {slot.status === "complete" ? "● ready" :
                           slot.status === "generating" ? "● generating" :
                           slot.status === "queued" ? `● queue ${slot.queuePosition}/${ui.queueTotal}` :
                           slot.status === "failed" ? "● failed" :
                           "idle"}
                        </span>
                      </div>
                      {isSelected && (
                        <div style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 9, color: "#E07045", letterSpacing: 1, marginBottom: 4 }}>✓ SELECTED</div>
                      )}
                      {Object.entries(slot.variableSnapshot).map(([key, val]) => (
                        <div key={key} className="alg-version-card__row">
                          <span className="alg-version-card__key">{key.toUpperCase()}</span>
                          <span className="alg-version-card__val">{val || <span style={{ color: "var(--alg-hint)", fontStyle: "italic" }}>—</span>}</span>
                        </div>
                      ))}
                  </div>
                  </div>
                );
              })}
              <div style={{ height: 24, flexShrink: 0 }} />
            </div>

            {/* Multi-select action bar — Delete only OR Delete & Refill */}
            {ui.selectedCards.length > 0 && (
              <div className="alg-refill-bar">
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, color: "#1C1A18", fontWeight: 600 }}>{ui.selectedCards.length} selected</span>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 9, color: "#9A9590" }}>refill discount applies</span>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <button
                    className="alg-refill-bar__delete"
                    onClick={deleteSelectedVersions}
                  >
                    Delete only
                  </button>
                  <button
                    className="alg-refill-bar__refill"
                    onClick={handleRefillAndGenerate}
                  >
                    Delete &amp; Refill
                    <span className="alg-refill-bar__cost">{getRefillCost(ui.selectedCards.length)}</span>
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
        </section>
      </div>

      {/* ═══ STICKY FOOTER ═══ */}
      <div className="alg-workspace-footer">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Pay & Generate Batch */}
          <button
            className="alg-pay-btn alg-pay-btn--footer"
            onClick={handlePayAndGenerate}
            disabled={isPaymentPending || versions.filter(v => v.status === "idle" || v.status === "failed").length === 0}
          >
            <Zap size={12} color="white" fill="white" />
            {isPaymentPending ? "Processing..." : "Pay & Generate"}
            {versions.filter(v => v.status === "idle" || v.status === "failed").length > 0 && (
              <span className="alg-pay-btn__badge">
                {getBatchCost(versions.filter(v => v.status === "idle" || v.status === "failed").length)}
                &nbsp;&middot;&nbsp;
                {versions.filter(v => v.status === "idle" || v.status === "failed").length} image{versions.filter(v => v.status === "idle" || v.status === "failed").length > 1 ? "s" : ""}
              </span>
            )}
          </button>
          {/* Grok fill stays as a ghost secondary */}
          <button
            className="alg-btn alg-btn--ghost alg-btn--sm"
            style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", color: "#5A5550", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10 }}
            onClick={handleGrokFill}
            disabled={ui.isGrokFilling}
          >
            <Sparkles size={10} />
            {ui.isGrokFilling ? "Filling..." : "Grok fill"}
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, color: "#9A9590" }}>
            {verifiedCount}/1+ verified
          </span>
          <button
            className="alg-btn alg-btn--ghost alg-btn--sm"
            style={{ padding: "7px 16px", color: "#1C1A18" }}
            onClick={() => savePromptMutation.mutate()}
            disabled={savePromptMutation.isPending}
          >
            {savePromptMutation.isPending ? "Saving..." : "Release prompt"}
          </button>
          <button
            className="alg-btn alg-btn--primary alg-btn--sm"
            style={{ padding: "7px 20px", background: isPublishDisabled ? "#D5D1CB" : "#1C1A18", borderColor: isPublishDisabled ? "#D5D1CB" : "#1C1A18", color: "white", opacity: 1, cursor: isPublishDisabled ? "not-allowed" : "pointer" }}
            disabled={isPublishDisabled}
          >
            Publish prompt
          </button>
        </div>
      </div>
    </div>
  );
}
