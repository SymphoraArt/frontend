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
  required: boolean;
  position: number;
}

interface VersionCard {
  id: number;
  subject: string;
  mood: string;
  lighting: string;
  grain: boolean;
  imageUrl: string | null;
  status: "idle" | "generating" | "complete" | "failed";
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
    { id: "subject", name: "subject", label: "Subject", description: "", type: "text", defaultValue: "a young woman, dark hair", required: true, position: 0 },
    { id: "mood", name: "mood", label: "Mood", description: "", type: "text", defaultValue: "contemplative, soft", required: true, position: 1 },
    { id: "lighting", name: "lighting", label: "Lighting", description: "", type: "text", defaultValue: "e.g a young woman, dark hair...", required: true, position: 2 },
    { id: "grain", name: "grain", label: "Add film grain", description: "Add a soft, grainy film texture — like an old 35mm", type: "checkbox", defaultValue: true, required: false, position: 3 },
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
              type: "text", defaultValue: "", required: true, position: existingVars.length + newVars.length,
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
        type: "text", defaultValue: text, required: true, position: prev.length
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

  /* ─── Generate Image (Version specific) ─── */
  const handleGenerateVersion = async (versionId: number) => {
    const previewText = renderPreviewWithDefaults();
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
        } catch { /* ignore persistence error */ }
        addCreation(userKey, {
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          imageUrl: data.imageUrl, prompt: previewText, createdAt: new Date().toISOString(),
        });
      }
      toast({ title: "Generation Complete", description: "Image generated." });
    } catch (error: unknown) {
      setVersions(prev => prev.map(v => v.id === versionId ? { ...v, status: "failed" } : v));
      const msg = error instanceof Error ? error.message : String(error);
      toast({ title: "Generation Failed", description: msg || "Error generating image.", variant: "destructive" });
    }
  };

  /* ─── Resolve variable default value by name ─── */
  const getVarDefault = (name: string): string => {
    const v = variables.find(x => x.name === name);
    if (!v) return name;
    if (v.type === "checkbox") return v.defaultValue ? "on" : "off";
    return (v.defaultValue as string) || name;
  };

  const handleGenerateClick = () => {
    const newId = versions.length > 0 ? Math.max(...versions.map(v => v.id)) + 1 : 1;
    const newVersion: VersionCard = {
      id: newId,
      subject: getVarDefault("subject"),
      mood: getVarDefault("mood"),
      lighting: getVarDefault("lighting"),
      grain: variables.find(x => x.name === "grain")?.defaultValue === true,
      imageUrl: null, status: "idle"
    };
    setVersions(prev => [...prev, newVersion]);
    handleGenerateVersion(newId);
  };

  const handleCreateEmptySlots = () => {
    const newId = versions.length > 0 ? Math.max(...versions.map(v => v.id)) + 1 : 1;
    setVersions(prev => [...prev, {
      id: newId,
      subject: getVarDefault("subject"),
      mood: getVarDefault("mood"),
      lighting: getVarDefault("lighting"),
      grain: variables.find(x => x.name === "grain")?.defaultValue === true,
      imageUrl: null, status: "idle"
    }]);
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

                  {/* Default value */}
                  {variable.type === "text" ? (
                    <>
                      <div className="alg-var-card__label" style={{ marginTop: 12, marginBottom: 6 }}>DEFAULT VALUE</div>
                      <div className={`alg-var-card__default-val ${ui.selectedVariableId === variable.id && !variable.defaultValue ? "alg-var-card__default-val--italic" : ""}`}>
                        {(variable.defaultValue as string) || (ui.selectedVariableId === variable.id ? "e.g. a young woman, dark hair..." : "")}
                      </div>
                      <div className="alg-var-card__hint">Used until the buyer changes it.</div>
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

            {/* ─── Stack Variables Bridge Button ─── */}
            {variables.length > 0 && (
              <div style={{ marginTop: "auto", paddingTop: 24 }}>
                <button
                  className="alg-stack-btn"
                  onClick={() => setUi(prev => ({ ...prev, showVerificationCard: true }))}
                >
                  <span className="alg-stack-btn__label">Stack variables</span>
                  <span className="alg-stack-btn__arrow">→ Verify</span>
                  <span className="alg-stack-btn__count">{variables.length} var{variables.length !== 1 ? 's' : ''}</span>
                </button>
              </div>
            )}
            <div style={{ height: 24, flexShrink: 0 }} />
          </div>
        </section>

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
                <button
                  style={{ marginTop: 14, width: "100%", background: "#1C1A18", color: "white", border: "none", padding: "8px 0", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, letterSpacing: 1, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
                  onClick={handleGrokFill}
                  disabled={ui.isGrokFilling}
                >
                  <Sparkles size={11} />
                  {ui.isGrokFilling ? "Filling with Grok..." : "Looks good → Generate"}
                </button>
              </div>
            )}

            <div style={{ flex: 1, overflowY: "auto" }}>
              {versions.map((slot) => {
                const isSelected = ui.selectedCards.includes(slot.id);
                return (
                  <div key={slot.id} className={`alg-version-card ${slot.status === "generating" ? "alg-version-card--loading" : ""} ${slot.status === "failed" ? "alg-version-card--failed" : ""}`}>

                    <div
                      className={`alg-version-card__checkbox ${isSelected ? "alg-version-card__checkbox--checked" : ""}`}
                      onClick={() => toggleVersionCheckbox(slot.id)}
                      style={{ display: "none" }} // Hide the floating checkbox in this new layout
                    >
                      {isSelected && <Check />}
                    </div>

                    <div className="alg-version-card__thumb">
                      {slot.status === "complete" && slot.imageUrl ? (
                        <img src={slot.imageUrl} alt={`Version ${String(slot.id).padStart(2, "0")}`} />
                      ) : slot.status === "generating" ? (
                        <div className="alg-spinner"></div>
                      ) : slot.status === "failed" ? (
                        <>
                          <AlertTriangle color="#E07045" size={24} />
                          <button className="alg-retry-btn" onClick={() => handleGenerateVersion(slot.id)}>Retry</button>
                        </>
                      ) : (
                        <button style={{ background: "#5A5550", color: "white", padding: "6px 12px", border: "none", borderRadius: "3px", fontSize: 10, display: "flex", alignItems: "center", gap: 4, cursor: "pointer", fontFamily: "var(--font-outfit), 'Outfit', sans-serif", fontWeight: 500 }} onClick={() => handleGenerateVersion(slot.id)}>
                          <Zap size={10} color="white" fill="white" /> Generate
                        </button>
                      )}
                    </div>
                    <div className="alg-version-card__info">
                      <div className="alg-version-card__header">
                        <span className="alg-version-card__label">Version {String(slot.id).padStart(2, "0")}</span>
                        <span className="alg-version-card__status" style={slot.status === "idle" ? { color: "#B0AAA2", fontStyle: "italic", textTransform: "lowercase", fontWeight: 400 } : {}}>
                          {slot.status === "complete" ? "● ready" : "optional"}
                        </span>
                      </div>
                      <div className="alg-version-card__row">
                        <span className="alg-version-card__key">SUBJECT</span>
                        <span className="alg-version-card__val">{slot.subject}</span>
                      </div>
                      <div className="alg-version-card__row">
                        <span className="alg-version-card__key">MOOD</span>
                        <span className="alg-version-card__val">{slot.mood}</span>
                      </div>
                      <div className="alg-version-card__row">
                        <span className="alg-version-card__key">LIGHTING</span>
                        <span className="alg-version-card__val">{slot.lighting}</span>
                      </div>
                      <label className="alg-checkbox" style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12, whiteSpace: 'nowrap', fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 11, color: "#5A5550", letterSpacing: 0.5 }}>
                        <input
                          type="checkbox"
                          checked={slot.grain}
                          style={{ accentColor: '#E07045', width: 14, height: 14, borderRadius: 3 }}
                          onChange={(e) =>
                            setVersions((prev) =>
                              prev.map((s) => s.id === slot.id ? { ...s, grain: e.target.checked } : s)
                            )
                          }
                        />
                        <span style={{ fontSize: 11, marginLeft: 8 }}>Add film grain</span>
                      </label>
                    </div>
                  </div>
                );
              })}
              <div style={{ height: 24, flexShrink: 0 }} />
            </div>

            {/* Multi-select delete bar */}
            {ui.selectedCards.length > 0 && (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderTop: "1px solid var(--alg-border)", marginTop: 8 }}>
                <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, color: "#5A5550" }}>{ui.selectedCards.length} selected</span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    style={{ background: "#E07045", color: "white", border: "none", padding: "6px 14px", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, cursor: "pointer", letterSpacing: 0.5 }}
                    onClick={deleteSelectedVersions}
                  >
                    Delete
                  </button>
                  <button
                    style={{ background: "transparent", color: "#5A5550", border: "1px solid var(--alg-border)", padding: "6px 14px", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, cursor: "pointer" }}
                    onClick={() => setUi(prev => ({ ...prev, selectedCards: [] }))}
                  >
                    Cancel
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
          <button
            className="alg-btn alg-btn--ghost alg-btn--sm"
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 16px', color: '#1C1A18', fontFamily: "var(--font-jetbrains-mono), monospace" }}
            onClick={handleGrokFill}
            disabled={ui.isGrokFilling}
          >
            <Sparkles size={12} color="#1C1A18" />
            {ui.isGrokFilling ? "Filling..." : "Generate empty slots"}
            <span style={{ fontSize: 9, color: '#B0AAA2', marginLeft: 4, fontWeight: 600 }}>✦ Grok</span>
          </button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, color: "#9A9590" }}>
            {verifiedCount}/1+ verified
          </span>
          <button
            className="alg-btn alg-btn--ghost alg-btn--sm"
            style={{ padding: '7px 16px', color: '#1C1A18' }}
            onClick={() => savePromptMutation.mutate()}
            disabled={savePromptMutation.isPending}
          >
            {savePromptMutation.isPending ? "Saving..." : "Release prompt"}
          </button>
          <button
            className="alg-btn alg-btn--primary alg-btn--sm"
            style={{ padding: '7px 20px', background: isPublishDisabled ? '#D5D1CB' : '#1C1A18', borderColor: isPublishDisabled ? '#D5D1CB' : '#1C1A18', color: 'white', opacity: 1, cursor: isPublishDisabled ? 'not-allowed' : 'pointer' }}
            disabled={isPublishDisabled}
          >
            Publish prompt
          </button>
        </div>
      </div>
    </div>
  );
}
