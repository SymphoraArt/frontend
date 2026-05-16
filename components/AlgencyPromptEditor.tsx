"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  Upload,
} from "lucide-react";
import nlp from "compromise";


/* ─── Types ─── */
type VariableType = "text" | "checkbox" | "image";
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
  fullToken: string; // The literal string in the prompt (e.g. "[red car]")
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

  const [versions, setVersions] = useState<VersionCard[]>([]);

  const [ui, setUi] = useState({
    selectedCards: [] as number[],
    cursorPos: 0,
    selectedVariableId: "lighting" as string | null,
    maxImages: 10,
    currentPromptId: null as string | null,
    showAvatarDropdown: false,
    tooltip: null as { x: number, y: number, text: string } | null,
    tagInput: "",
    isGrokFilling: false,
    queueTotal: 0,
    isEditingVersion: false,
    editingVersionId: null as number | null,
    editingNameVarId: null as string | null,
  });

  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
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
        const newVars: PromptVariable[] = [];
        const seenTokens = new Set<string>();

        detections.forEach((det) => {
          if (seenTokens.has(det.full)) return;
          seenTokens.add(det.full);

          // 1. Try to find an existing variable that exactly matches this token
          const existingByToken = prev.find(v => v.fullToken === det.full);
          if (existingByToken) {
            newVars.push(existingByToken);
            return;
          }

          // 2. Otherwise, create a brand new variable with a STABLE ID
          const stableId = `var-${Math.random().toString(36).substring(2, 9)}`;
          newVars.push({
            id: stableId,
            name: det.content,
            label: det.content,
            description: det.content,
            type: "text",
            defaultValue: det.content,
            values: [det.content],
            required: true,
            position: newVars.length,
            fullToken: det.full,
          });
        });
        return newVars;
      });
    }, 400);

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

  /* ─── Bracket Deletion — restores default value ─── */
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
        const variable = variables.find(v => v.fullToken === fullToken);
        
        if (variable) {
          e.preventDefault();
          const restoredText = String(variable.defaultValue || variable.label);
          const newBody = text.substring(0, startPos) + restoredText + text.substring(pos);
          setPromptData(prev => ({ ...prev, body: newBody }));
          
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

  /* ─── AI Variable Naming ─── */
  const handleTextareaSelect = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    setUi(prev => ({ ...prev, cursorPos: start }));

    // Auto-select variable if cursor is inside one
    const text = promptData.body;
    const regex = /\[([^\]]+)\]/g;
    let match;
    let foundVarId = null;
    while ((match = regex.exec(text)) !== null) {
      if (start >= match.index && start <= match.index + match[0].length) {
        const variable = variables.find(v => v.fullToken === match![0]);
        if (variable) foundVarId = variable.id;
        break;
      }
    }
    if (foundVarId) {
      setUi(prev => ({ ...prev, selectedVariableId: foundVarId }));
    }

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

  const handleCreateVariable = useCallback((text: string) => {
    const el = textareaRef.current;
    if (!el) return;
    
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const val = promptData.body;
    const bracketed = `[${text}]`;
    const newVal = val.substring(0, start) + bracketed + val.substring(end);

    const stableId = `var-${Math.random().toString(36).substring(2, 9)}`;
    
    setPromptData(prev => ({ ...prev, body: newVal }));
    setVariables(prev => [...prev, {
      id: stableId,
      name: text,
      label: text,
      description: text,
      type: "text",
      defaultValue: text,
      values: [text],
      required: true,
      position: prev.length,
      fullToken: bracketed
    }]);
    setUi(prev => ({ ...prev, tooltip: null, selectedVariableId: stableId }));

    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + bracketed.length;
        textareaRef.current.focus();
      }
    });
  }, [promptData.body]);

  const handleVariableButtonClick = () => {
    const el = textareaRef.current;
    if (!el) return;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selectedText = promptData.body.substring(start, end);
    
    if (selectedText.trim()) {
      handleCreateVariable(selectedText);
    } else {
      insertAtCursor("[Variable]");
    }
  };

  const createVariableFromSelection = () => {
    if (!ui.tooltip) return;
    handleCreateVariable(ui.tooltip.text);
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

  /* ─── Update variable — Syncs Name with Prompt ─── */
  const updateVariable = (varId: string, updates: Partial<PromptVariable>) => {
    const currentVar = variables.find((v) => v.id === varId);
    if (!currentVar) return;

    // If we are currently editing the name of THIS variable, the prompt should show the name.
    // Otherwise, it should show the default value.
    const isEditingThisName = ui.editingNameVarId === varId;
    
    let newDisplayContent = "";
    if (isEditingThisName) {
      newDisplayContent = (updates.name !== undefined ? updates.name : currentVar.name) || currentVar.label;
    } else {
      newDisplayContent = (updates.defaultValue !== undefined ? String(updates.defaultValue) : String(currentVar.defaultValue)) || currentVar.label;
    }

    const open = currentVar.fullToken[0];
    const close = currentVar.fullToken[currentVar.fullToken.length - 1];
    const newFullToken = `${open}${newDisplayContent}${close}`;
    
    if (newFullToken !== currentVar.fullToken) {
      setPromptData(prev => ({ 
        ...prev, 
        body: prev.body.split(currentVar.fullToken).join(newFullToken) 
      }));
      
      setVariables(prev => prev.map(v => 
        v.id === varId ? { ...v, ...updates, fullToken: newFullToken } : v
      ));
    } else {
      setVariables(prev => prev.map(v => (v.id === varId ? { ...v, ...updates } : v)));
    }
  };

  const handleVariableNameFocus = (varId: string) => {
    setUi(prev => ({ ...prev, editingNameVarId: varId }));
    const variable = variables.find(v => v.id === varId);
    if (variable) {
      const open = variable.fullToken[0];
      const close = variable.fullToken[variable.fullToken.length - 1];
      const newFullToken = `${open}${variable.name || variable.label}${close}`;
      setPromptData(prev => ({ ...prev, body: prev.body.split(variable.fullToken).join(newFullToken) }));
      setVariables(prev => prev.map(v => v.id === varId ? { ...v, fullToken: newFullToken } : v));
    }
  };

  const handleVariableNameBlur = (varId: string) => {
    setUi(prev => ({ ...prev, editingNameVarId: null }));
    const variable = variables.find(v => v.id === varId);
    if (variable) {
      const open = variable.fullToken[0];
      const close = variable.fullToken[variable.fullToken.length - 1];
      const newFullToken = `${open}${variable.defaultValue || variable.label}${close}`;
      setPromptData(prev => ({ ...prev, body: prev.body.split(variable.fullToken).join(newFullToken) }));
      setVariables(prev => prev.map(v => v.id === varId ? { ...v, fullToken: newFullToken } : v));
    }
  };

  /* ─── Render prompt text with colored variable tags ─── */
  const getVarStyle = (fullToken: string): React.CSSProperties => {
    const variable = variables.find(v => v.fullToken === fullToken);
    const isSelected = ui.selectedVariableId === variable?.id;
    if (isSelected) return { background: "var(--alg-accent)", color: "white", borderBottomStyle: "solid" };
    if (variable?.type === "checkbox") return { background: "var(--alg-hover-bg)", color: "var(--alg-dark)" };
    return { background: "var(--alg-accent-light)", color: "var(--alg-accent)" };
  };

  const renderPromptWithTags = () => {
    // Split on [] bracket groups only
    const parts = promptData.body.split(/(\[[^\]]+\])/g);
    return parts.map((part, index) => {
      const match = part.match(/\[([^\]]+)\]/);
      if (match) {
        const variable = variables.find(v => v.fullToken === part);
        const isSelected = ui.selectedVariableId === variable?.id;
        const style = getVarStyle(part);
        return (
          <span
            key={index}
            className={`alg-var-tag ${isSelected ? "alg-var-tag--active" : ""}`}
            style={style}
            onClick={() => setUi(prev => ({ ...prev, selectedVariableId: variable?.id || null }))}
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
            aspectRatio: ratios.selected,
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
              { prompt: previewText, resolution: "2K", modelIds: models.selected, ratio: ratios.selected },
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

  /* ─── Upload image directly into a Verify slot ─── */
  const handleUploadToSlot = (slotId: number) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (ev) => {
      const file = (ev.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (le) => {
        const dataUrl = String(le.target?.result || "");
        // Convert data URL to blob URL for performance
        try {
          const [header, base64] = dataUrl.split(",");
          const mime = header.split(":")[1].split(";")[0];
          const byteChars = atob(base64);
          const bytes = new Uint8Array(byteChars.length);
          for (let i = 0; i < byteChars.length; i++) bytes[i] = byteChars.charCodeAt(i);
          const blobUrl = URL.createObjectURL(new Blob([bytes], { type: mime }));
          setVersions(prev => prev.map(v =>
            v.id === slotId ? { ...v, status: "complete", imageUrl: blobUrl } : v
          ));
        } catch {
          setVersions(prev => prev.map(v =>
            v.id === slotId ? { ...v, status: "complete", imageUrl: dataUrl } : v
          ));
        }
        toast({ title: "Uploaded", description: `Image added to slot ${slotId}.` });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  /* ─── Create a new slot and immediately open file picker ─── */
  const handleUploadNewSlot = () => {
    const snapshot: Record<string, string> = {};
    variables.forEach(v => { snapshot[v.name] = (v.defaultValue as string) || v.name; });
    const newId = versions.length > 0 ? Math.max(...versions.map(v => v.id)) + 1 : 1;
    setVersions(prev => [...prev, { id: newId, variableSnapshot: snapshot, imageUrl: null, status: "idle" }]);
    // Defer so React renders the slot first, then open file picker
    setTimeout(() => handleUploadToSlot(newId), 50);
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
  const isPublishDisabled = promptData.type === "free-prompt"
    ? verifiedCount < 1 || publishPromptMutation.isPending
    : verifiedCount < 4 || publishPromptMutation.isPending;

  return (
    <div className="alg-page" onClick={() => { setUi(prev => ({ ...prev, showAvatarDropdown: false, tooltip: null })) }}>
      <WalletPickerModal open={showWalletPicker} onClose={() => setShowWalletPicker(false)} />


      {/* ═══ 4-COLUMN GRID ═══ */}
      <div className="alg-grid desktop-only">

        {/* ═══ PANEL 01 — Settings ═══ */}
        <section className="alg-panel" style={{ background: "var(--alg-bg)" }}>
          <div className="alg-panel__header">
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span className="alg-panel__number">01</span>
              <span className="alg-panel__title">Settings</span>
            </div>
          </div>
          <div className="alg-panel__body">
            {/* Prompt Title */}
            <div className="alg-label">PROMPT TITLE</div>
            <input
              className="alg-input alg-input--title"
              value={promptData.title}
              onChange={(e) => setPromptData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Untitled Prompt"
            />

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

            {/* Category */}
            <div className="alg-label">CATEGORY</div>
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
                placeholder="category, that's derived from the main categories"
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
            <div className="alg-label">
              <span>PREFERRED MODELS</span>
              <span style={{ fontSize: 10, color: "var(--alg-hint)", textTransform: 'lowercase', letterSpacing: 0, fontWeight: 500 }}>multi-select</span>
            </div>
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
            <div className="alg-label">
              <span>REFERENCE IMAGES</span>
              <span className="alg-label__badge">ALLOWED</span>
            </div>
            <div style={{ border: "1px solid var(--alg-border)", borderRadius: "3px", padding: "12px", background: "var(--alg-white)", marginBottom: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ fontSize: 9, fontFamily: "var(--alg-font-mono)", color: "var(--alg-hint)", letterSpacing: "0.05em" }}>MAX IMAGES</span>
                <div className="alg-stepper">
                  <button className="alg-stepper__btn" style={{ width: 24, height: 24, fontSize: 14 }} onClick={() => setUi(prev => ({ ...prev, maxImages: Math.max(1, prev.maxImages - 1) }))}>−</button>
                  <span className="alg-stepper__value" style={{ width: 24, textAlign: 'center', fontFamily: "var(--alg-font-serif)", fontSize: 13, color: "var(--alg-dark)", background: "var(--alg-white)", border: 'none', padding: 0 }}>{ui.maxImages}</span>
                  <button className="alg-stepper__btn" style={{ width: 24, height: 24, fontSize: 14 }} onClick={() => setUi(prev => ({ ...prev, maxImages: Math.min(10, prev.maxImages + 1) }))}>+</button>
                </div>
              </div>
              <p className="alg-hint-text" style={{ margin: 0 }}>
                Buyers can upload an image — or pick an NFT from their wallet — up to {ui.maxImages} per render.
              </p>
            </div>

            <div className="alg-divider" style={{ marginTop: 24, marginBottom: 24 }} />

            {/* Pricing */}
            <div className="alg-label">PRICING</div>
            <div style={{ border: "1px solid var(--alg-border)", borderRadius: "3px", padding: "12px", background: "var(--alg-white)" }}>
              <p className="alg-hint-text" style={{ margin: 0, fontSize: 11, color: 'var(--alg-dark)' }}>
                Free prompts cost nothing to use.<br />Buyers run the prompt with their own API credits.
              </p>
            </div>
            <div style={{ height: 24, flexShrink: 0 }} />
          </div>
        </section>

        {/* ═══ PANEL 02 — Prompt ═══ */}
        <section className="alg-panel">
          <div className="alg-panel__header">
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span className="alg-panel__number">02</span>
              <span className="alg-panel__title">Prompt</span>
            </div>
            <button className="alg-btn alg-btn--ghost alg-btn--sm" onClick={handleVariableButtonClick}>
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
            {/* Textarea with overlay box */}
            <div className="alg-textarea-box">
              {promptData.body.length > 0 && (
                <div ref={overlayRef} className="alg-prompt-overlay">
                  {renderPromptWithTags()}
                </div>
              )}
              <textarea
                ref={textareaRef}
                className="alg-textarea"
                style={{
                  background: promptData.body.length > 0 ? "transparent" : undefined,
                  color: promptData.body.length > 0 ? "transparent" : undefined,
                  caretColor: "var(--alg-dark)",
                  zIndex: 1,
                }}
                value={promptData.body}
                onChange={(e) => setPromptData(prev => ({ ...prev, body: e.target.value }))}
                onScroll={handleTextareaScroll}
                onSelect={handleTextareaSelect}
                onKeyDown={handleTextareaKeyDown}
                spellCheck={false}
                placeholder="Write your prompt here... Select text to extract a variable."
              />
            </div>

            {/* Variable Tabs Row */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
              {variables.map(v => (
                <button
                  key={v.id}
                  onClick={() => setUi(prev => ({ ...prev, selectedVariableId: v.id }))}
                  style={{
                    background: "none", border: "none", padding: "4px 8px",
                    fontFamily: "var(--alg-font-mono)", fontSize: 11,
                    color: ui.selectedVariableId === v.id ? "var(--alg-dark)" : "var(--alg-hint)",
                    borderBottom: ui.selectedVariableId === v.id ? "1.5px solid var(--alg-dark)" : "1.5px solid transparent",
                    cursor: "pointer", transition: "all 0.2s"
                  }}
                >
                  [{v.name || "..."}]
                </button>
              ))}
            </div>

            {/* Prompt Stats Row */}
            <div style={{ display: "flex", gap: 32, marginTop: 12, paddingBottom: 12 }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "var(--alg-font-mono)", fontSize: 11, fontWeight: 600, color: "var(--alg-dark)" }}>{variables.length}</span>
                <span style={{ fontFamily: "var(--alg-font-mono)", fontSize: 9, color: "var(--alg-hint)", textTransform: "uppercase" }}>variables</span>
              </div>
              <div style={{ width: 1, height: 24, background: "var(--alg-border)", alignSelf: "center", opacity: 0.5 }} />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "var(--alg-font-mono)", fontSize: 9, color: "var(--alg-hint)", textTransform: "uppercase", marginTop: "auto" }}>autosaves every</span>
                <span style={{ fontFamily: "var(--alg-font-mono)", fontSize: 9, color: "var(--alg-hint)", textTransform: "uppercase" }}>keystroke</span>
              </div>
            </div>

            <div style={{ height: 12, flexShrink: 0 }} />
          </div>
        </section>

        {/* ═══ PANEL 03 — Variables ═══ */}
        <section className="alg-panel">
          <div className="alg-panel__header">
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span className="alg-panel__number">03</span>
              <span className="alg-panel__title">Variables</span>
            </div>
            <span className="alg-panel__meta">defaults & types</span>
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
                  {/* Variable Name Section */}
                  <div className="alg-var-card__label">VARIABLE NAME</div>
                  <input 
                    className={`alg-var-card__name-input ${!variable.name ? "alg-var-card__name-input--error" : ""}`}
                    value={variable.name}
                    onChange={(e) => updateVariable(variable.id, { name: e.target.value })}
                    onFocus={() => handleVariableNameFocus(variable.id)}
                    onBlur={() => handleVariableNameBlur(variable.id)}
                    placeholder="e.g. Subject"
                    title={!variable.name ? "Fill in the variables." : "Variable name used in prompt logic."}
                  />

                  {/* Type toggle */}
                  <div className="alg-type-toggle" style={{ margin: "16px 0" }}>
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
                    <button
                      className={`alg-type-toggle__btn ${variable.type === "image" ? "alg-type-toggle__btn--active" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateVariable(variable.id, {
                          type: "image",
                          defaultValue: "",
                          description: String(variable.description || variable.label),
                        });
                      }}
                    >
                      Image upload
                    </button>
                  </div>

                  {/* Default value section */}
                  <div className="alg-var-card__label">DEFAULT VALUE</div>
                  {variable.type === "text" ? (
                    <>
                      <input
                        className="alg-var-card__default-input"
                        value={String(variable.defaultValue || "")}
                        onChange={(e) => updateVariable(variable.id, { defaultValue: e.target.value })}
                        placeholder="e.g. a young woman..."
                      />
                      <div className="alg-var-card__hint">Used until the buyer changes it.</div>
                    </>
                  ) : variable.type === "image" ? (
                    <>
                      <div
                        style={{
                          border: "1px dashed var(--alg-border)",
                          borderRadius: 8,
                          padding: 12,
                          textAlign: "center",
                          cursor: "pointer",
                          position: "relative",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          const input = document.createElement("input");
                          input.type = "file";
                          input.accept = "image/*";
                          input.onchange = (ev) => {
                            const file = (ev.target as HTMLInputElement).files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (le) => {
                              const dataUrl = String(le.target?.result || "");
                              updateVariable(variable.id, { defaultValue: dataUrl });
                            };
                            reader.readAsDataURL(file);
                          };
                          input.click();
                        }}
                      >
                        {variable.defaultValue ? (
                          <img
                            src={String(variable.defaultValue)}
                            alt="Preview"
                            style={{ maxHeight: 120, maxWidth: "100%", borderRadius: 4, objectFit: "cover" }}
                          />
                        ) : (
                          <div style={{ fontSize: 12, color: "var(--alg-hint)" }}>
                            Click to upload a reference image
                          </div>
                        )}
                      </div>
                      {variable.defaultValue && (
                        <button
                          style={{
                            marginTop: 8,
                            fontSize: 11,
                            color: "var(--alg-accent)",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            updateVariable(variable.id, { defaultValue: "" });
                          }}
                        >
                          Remove image
                        </button>
                      )}
                      <div className="alg-var-card__hint">Buyers can upload their own reference image.</div>
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
              ))
            )}


          </div>
        </section>

        {/* ═══ PANEL 04 — Verify ═══ */}
        <section className="alg-panel alg-panel--verify">
          {/* Dual-Arrow Bridge — Circuit Track Design */}
          <div className="alg-bridge-overlay">
            <button
              className={`alg-arrow-btn alg-arrow-btn--back ${ui.selectedCards.length === 1 ? "alg-arrow-btn--active" : ""}`}
              disabled={ui.selectedCards.length !== 1}
              onClick={() => {
                const card = versions.find(v => v.id === ui.selectedCards[0]);
                if (card) {
                  const hasExistingDefaults = variables.some(v => v.defaultValue);
                  if (hasExistingDefaults) {
                    if (!window.confirm("This will overwrite your current variable defaults. Continue?")) return;
                  }
                  const newVariables = variables.map(v => {
                    if (card.variableSnapshot[v.name]) {
                      return { ...v, defaultValue: card.variableSnapshot[v.name] };
                    }
                    return v;
                  });
                  setVariables(newVariables);
                  setVersions(prev => prev.filter(v => v.id !== card.id));
                  setUi(prev => ({ ...prev, selectedCards: [] }));
                }
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
              className={`alg-arrow-btn alg-arrow-btn--forward ${(variables.length === 0 || variables.every(v => v.type === "checkbox" || v.defaultValue)) ? "alg-arrow-btn--active alg-arrow-btn--glow" : ""}`}
              disabled={variables.length > 0 && !variables.every(v => v.type === "checkbox" || v.defaultValue)}
              onClick={() => handleStackVariables()}
              title={variables.length === 0 ? "Push prompt to Verify" : "Push variables to Verify"}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          <div className="alg-panel__header">
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <span className="alg-panel__number">04</span>
              <span className="alg-panel__title">Verify</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="alg-panel__meta">
                {promptData.type === "free-prompt" ? `${verifiedCount}/1 req · 4 rec` : `${verifiedCount}/4 required`}
              </span>
              <button
                className="alg-btn alg-btn--ghost alg-btn--sm"
                style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 8px" }}
                onClick={handleUploadNewSlot}
                title="Upload a reference image"
              >
                <Upload size={12} /> Upload
              </button>
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
                        {slot.status === "idle" && (
                          <div
                            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 2, cursor: "pointer" }}
                            onClick={(e) => { e.stopPropagation(); handleUploadToSlot(slot.id); }}
                            title="Click to upload an image"
                          >
                            <Upload size={16} color="#8a7f72" />
                            <span style={{ fontFamily: "monospace", fontSize: 8, color: "#8a7f72", letterSpacing: "0.05em" }}>UPLOAD</span>
                          </div>
                        )}
                        {slot.status === "failed" && (
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "0 10px", textAlign: "center", zIndex: 2 }}>
                            <AlertTriangle color="#c0542a" size={20} />
                            <span style={{ fontFamily: "monospace", fontSize: 9, color: "#c0542a", letterSpacing: "0.05em" }}>FAILED</span>
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
                        {/* Overlay: version label */}
                        <span className="alg-version-card__overlay-label">
                          Version {String(slot.id).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Metadata panel */}
                      <div className="alg-version-card__info">
                        {Object.entries(slot.variableSnapshot).map(([key, val]) => {
                          const valAny = val as unknown;
                          const isCheckbox = valAny === "true" || valAny === "false" || valAny === true || valAny === false;
                          const isChecked = valAny === "true" || valAny === true;

                          if (isCheckbox) {
                            return (
                              <div key={key} className="alg-version-card__checkbox-row">
                                <div className={`alg-version-card__checkbox ${isChecked ? "alg-version-card__checkbox--checked" : "alg-version-card__checkbox--unchecked"}`}>
                                  {isChecked && (
                                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                                  )}
                                </div>
                                <span className="alg-version-card__checkbox-label">
                                  {key === "grain" ? "Add film grain" : key.charAt(0).toUpperCase() + key.slice(1)}
                                </span>
                              </div>
                            );
                          }

                          return (
                            <div key={key} className="alg-version-card__row">
                              <span className="alg-version-card__key">{key.toUpperCase()}</span>
                              <span className="alg-version-card__val">{val || <span style={{ color: "#8a7f72", fontStyle: "italic" }}>—</span>}</span>
                            </div>
                          );
                        })}

                        {/* Download link for complete cards */}
                        {slot.status === "complete" && slot.imageUrl && (
                          <div className="alg-version-card__row" style={{ paddingTop: 3, borderTop: "1px solid #d8d0c6" }}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const a = document.createElement("a");
                                a.href = slot.imageUrl!;
                                a.download = `version-${slot.id}.png`;
                                a.click();
                              }}
                              style={{
                                background: "none", border: "none", padding: 0, cursor: "pointer",
                                fontFamily: "monospace", fontSize: 8, color: "#c0542a",
                                letterSpacing: "0.05em", textDecoration: "underline",
                              }}
                            >
                              ↓ save
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
                    Refill
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

          {/* Prompt Ownership Notice */}
          <div style={{ padding: "8px 12px", background: "#fffaf0", borderTop: "1px solid #f5e6cc", borderBottom: "1px solid #f5e6cc" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <AlertTriangle size={14} style={{ color: "#b8860b", marginTop: "1px", flexShrink: 0 }} />
              <p style={{ fontSize: 11, color: "#8a6d3b", lineHeight: 1.4, margin: 0 }}>
                <strong>Ownership Notice:</strong> Only mark prompts as your own property if you genuinely created them. Falsely claiming authorship will result in account strikes. See Terms.
              </p>
            </div>
          </div>

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
                    <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "clamp(9px, 0.5vw + 6px, 11px)", color: "var(--alg-hint)" }}>
                      via {solanaConnected ? "Solana" : "Thirdweb"} x402
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
                    onClick={() => publishPromptMutation.mutate()}
                  >
                    {publishPromptMutation.isPending ? "Publishing…" : "Publish"}
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
        ratios={ratios}
        setRatio={(r) => setRatios(prev => ({ ...prev, selected: r }))}
        pricePerSlot={getPricePerSlot()}
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
    </div>
  );
}
