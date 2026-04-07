"use client";

import FilterBar from "@/components/FilterBar";
import CategoriesBar from "@/components/CategoriesBar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useActiveAccount } from "thirdweb/react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getUserKeyFromAccount,
  listCreations,
  subscribeCreations,
  addCreation,
  updateCreation,
  removeCreation,
  getCreationLiked,
  toggleCreationLike,
  type StoredCreation,
  type CreationStatus,
} from "@/lib/creations";
import { ConnectWallet } from "@/components/ConnectWallet";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2, X, RefreshCw, Heart, Trash2, Square, CheckSquare, RotateCcw } from "lucide-react";
import { useX402PaymentProduction } from "@/hooks/useX402PaymentProduction";
import { useToast } from "@/hooks/use-toast";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ENHANCEMENT_OPTIONS, getDefaultEnhancement, type EnhancementId } from "@/lib/enhancement-options";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

/** Card that matches PromptCard styling (Showroom/Marketplace) */
function CreationCard({
  creation,
  onClick,
  hasSelection,
  isSelected,
  onToggleSelect,
  onDelete,
  isLiked,
  onToggleLike,
}: {
  creation: StoredCreation;
  onClick?: () => void;
  /** When true, at least one image is selected; card click toggles selection, trash is shown */
  hasSelection?: boolean;
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onDelete?: () => void;
  isLiked?: boolean;
  onToggleLike?: () => void;
}) {
  const [hover, setHover] = useState(false);
  const status: CreationStatus = creation.status ?? (creation.imageUrl ? "completed" : "pending");

  if (status === "completed" && creation.imageUrl) {
    const showOverlays = hover || isSelected || (hasSelection ?? false);
    return (
      <Card
        className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all duration-200 hover:scale-[1.01] border-[0.5px] min-w-0 p-0 select-none caret-transparent"
        data-testid={`card-workspace-${creation.id}`}
        onClick={() => {
          if (hasSelection && onToggleSelect) onToggleSelect();
          else onClick?.();
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="relative bg-muted overflow-hidden">
          <img
            src={creation.imageUrl}
            alt=""
            className="w-full h-auto block align-top"
          />
          {/* Select checkbox: inside image, top-left, shown on hover or when selected */}
          {(hover || isSelected) && (
            <div
              className={`absolute top-1.5 left-1.5 z-20 w-6 h-6 rounded border-2 flex items-center justify-center shadow transition-opacity duration-150 ${
                isSelected
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-white bg-black/50 text-white"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                onToggleSelect?.();
              }}
              role="button"
              aria-label={isSelected ? "Deselect" : "Select"}
            >
              {isSelected ? (
                <CheckSquare className="h-4 w-4 fill-current stroke-current" />
              ) : (
                <Square className="h-4 w-4" />
              )}
            </div>
          )}
          {showOverlays && (
            <>
              {!hasSelection && onToggleLike && (
                <button
                  type="button"
                  className="absolute top-1.5 right-1.5 z-20 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white shadow"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleLike();
                  }}
                  aria-label="Like"
                >
                  <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </button>
              )}
              {hasSelection && onDelete && (
                <button
                  type="button"
                  className="absolute top-1.5 right-1.5 z-20 w-8 h-8 rounded-full bg-destructive/90 hover:bg-destructive flex items-center justify-center text-destructive-foreground shadow transition-transform duration-150 hover:scale-110 active:scale-95"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  aria-label="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </>
          )}
        </div>
      </Card>
    );
  }

  if (status === "pending") {
    return (
      <Card
        className="overflow-hidden border-[0.5px] min-w-0 p-0 opacity-90"
        data-testid={`card-workspace-${creation.id}`}
      >
        <div className="relative w-full aspect-square bg-gradient-to-br from-primary/20 to-chart-2/20 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <Loader2 className="h-10 w-10 animate-spin" />
            <span className="text-sm font-medium">Progressing</span>
          </div>
        </div>
      </Card>
    );
  }

  // failed: "Failed generation" top-left, prompt overlay from 50% to bottom (non-editable, within bounds)
  return (
    <Card
      className="overflow-hidden border-[0.5px] min-w-0 p-0"
      data-testid={`card-workspace-${creation.id}`}
    >
      <div className="relative w-full aspect-square bg-muted overflow-hidden">
        <div className="absolute top-0 left-0 z-10 px-2 py-1.5 bg-destructive/90 text-destructive-foreground text-xs font-semibold rounded-br">
          Failed generation
        </div>
        <div
          className="absolute inset-0 flex flex-col justify-end"
          style={{ top: "50%" }}
        >
          <div
            className="w-full overflow-auto px-2 py-2 bg-black/70 text-white text-xs leading-relaxed break-words max-h-[50%] select-none"
            style={{ maxHeight: "50%" }}
          >
            <p className="whitespace-pre-wrap" style={{ wordBreak: "break-word" }}>
              {creation.prompt || "—"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function WorkspacePage() {
  const account = useActiveAccount();
  const authenticated = !!account;
  const userKey = useMemo(() => getUserKeyFromAccount(account), [account]);
  const [creations, setCreations] = useState<StoredCreation[]>([]);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedCreation, setSelectedCreation] = useState<StoredCreation | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [likeVersion, setLikeVersion] = useState(0);
  const [detailAspectRatio, setDetailAspectRatio] = useState("1:1");
  const [detailResolution, setDetailResolution] = useState<"1K" | "2K" | "4K">("1K");
  const [detailEnhancement, setDetailEnhancement] = useState<EnhancementId>(getDefaultEnhancement());
  const [editedPrompt, setEditedPrompt] = useState("");
  const [estimateCost, setEstimateCost] = useState<{
    totalUsd: number;
    feePercent: number;
    enhancementCostUsd?: number;
    imageCostUsd?: number;
    enhancementInputTokens?: number;
    enhancementOutputTokens?: number;
  } | null>(null);
  const estimateRequestStampRef = useRef(0);
  const { generateImage, isPending: isPaymentPending, getPaymentStatus } = useX402PaymentProduction();
  const { toast } = useToast();

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedIds(new Set());
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!userKey) {
      setCreations([]);
      return;
    }
    setCreations(listCreations(userKey));
    const unsub = subscribeCreations(userKey, setCreations);
    return unsub;
  }, [userKey]);

  useEffect(() => {
    if (selectedCreation) {
      setDetailAspectRatio(selectedCreation.aspectRatio ?? "1:1");
      setDetailResolution((selectedCreation.resolution as "1K" | "2K" | "4K") ?? "1K");
      setEditedPrompt(selectedCreation.prompt ?? "");
    }
  }, [selectedCreation?.id]);

  useEffect(() => {
    if (!selectedCreation?.id || !userKey) {
      setEstimateCost(null);
      return;
    }
    const prompt = (editedPrompt || "").trim() || selectedCreation.prompt;
    if (!prompt) {
      setEstimateCost(null);
      return;
    }
    const stamp = ++estimateRequestStampRef.current;
    const timeoutId = setTimeout(() => {
      fetch("/api/estimate-generation-cost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          resolution: detailResolution,
          useEnhancement: detailEnhancement === "prompt",
          userId: userKey,
        }),
      })
        .then((r) => r.ok ? r.json() : null)
        .then((data) => {
          if (stamp !== estimateRequestStampRef.current || !data || typeof data.totalUsd !== "number") return;
          setEstimateCost({
            totalUsd: data.totalUsd,
            feePercent: data.feePercent ?? 0,
            enhancementCostUsd: data.enhancementCostUsd,
            imageCostUsd: data.imageCostUsd,
            enhancementInputTokens: data.enhancementInputTokens,
            enhancementOutputTokens: data.enhancementOutputTokens,
          });
        })
        .catch(() => {});
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [selectedCreation?.id, selectedCreation?.prompt, editedPrompt, detailResolution, detailEnhancement, userKey]);

  const handleFilterChange = () => {
    // Workspace has no server-side filters; keep for visual consistency
  };

  const handleRegenerate = async () => {
    if (!selectedCreation || !userKey || selectedCreation.status !== "completed") return;
    const paymentStatus = getPaymentStatus();
    if (!paymentStatus.isConnected) {
      toast({
        title: "Wallet required",
        description: "Please connect your wallet to regenerate.",
        variant: "destructive",
      });
      return;
    }
    const promptToUse = editedPrompt.trim() || selectedCreation.prompt;
    if (!promptToUse) {
      toast({ title: "Prompt required", description: "Enter a prompt to regenerate.", variant: "destructive" });
      return;
    }
    const creationId = `${Date.now()}`;
    addCreation(userKey, {
      id: creationId,
      prompt: promptToUse,
      createdAt: new Date().toISOString(),
      status: "pending",
      source: selectedCreation.source ?? "quick_create",
      aspectRatio: detailAspectRatio,
      resolution: detailResolution,
    });
    toast({ title: "Generating…", description: "A new image is being created with the same prompt." });
    try {
      const result = (await generateImage({
        prompt: promptToUse,
        aspectRatio: detailAspectRatio,
        resolution: detailResolution,
        useEnhancement: detailEnhancement === "prompt",
        userId: userKey,
      })) as { imageUrl?: string } | undefined;
      if (result?.imageUrl) {
        updateCreation(userKey, creationId, { status: "completed", imageUrl: result.imageUrl });
        toast({ title: "Done", description: "New image was added to your workspace." });
        setSelectedCreation(null);
      } else {
        updateCreation(userKey, creationId, { status: "failed" });
        throw new Error("No image URL returned");
      }
    } catch (e) {
      updateCreation(userKey, creationId, { status: "failed" });
      toast({
        title: "Regeneration failed",
        description: e instanceof Error ? e.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  const workspaceItems = creations;

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <CategoriesBar selectedCategory={category} onCategoryChange={(v) => { setCategory(v); }} />
        <FilterBar onFilterChange={handleFilterChange} hidePriceFilter showFollowersFilter={false} category={category} onCategoryChange={(v) => { setCategory(v); }} />
        <main className="w-full px-2 py-2 flex items-center justify-center">
          <p className="text-foreground text-lg">Loading...</p>
        </main>
      </div>
    );
  }

  if (!authenticated || !userKey) {
    return (
      <div className="min-h-screen bg-background flex flex-col pt-16">
        <CategoriesBar selectedCategory={category} onCategoryChange={(v) => { setCategory(v); }} />
        <FilterBar onFilterChange={handleFilterChange} hidePriceFilter showFollowersFilter={false} category={category} onCategoryChange={(v) => { setCategory(v); }} />
        <main className="flex-1 min-h-0 w-full px-1 sm:px-2 py-2 overflow-y-auto">
          <div className="max-w-2xl mx-auto py-12 px-4">
            <Card className="border border-border/60 bg-card/60 backdrop-blur">
              <div className="p-6 space-y-4">
                <h2 className="text-lg font-semibold text-foreground">My Workspace</h2>
                <p className="text-sm text-muted-foreground">
                  Connect your wallet to view your private creations from Quick Create and the Prompt Editor.
                </p>
                <ConnectWallet />
              </div>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  if (workspaceItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col pt-16">
        <CategoriesBar selectedCategory={category} onCategoryChange={(v) => { setCategory(v); }} />
        <FilterBar onFilterChange={handleFilterChange} hidePriceFilter showFollowersFilter={false} category={category} onCategoryChange={(v) => { setCategory(v); }} />
        <main className="flex-1 min-h-0 w-full px-2 py-8 flex flex-col items-center justify-center">
          <p className="text-foreground text-lg mb-4">No private creations yet</p>
          <p className="text-foreground/60 text-sm">
            Use Quick Create or the Prompt Editor to generate images; they will appear here.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <CategoriesBar selectedCategory={category} onCategoryChange={(v) => { setCategory(v); }} />
      <FilterBar onFilterChange={handleFilterChange} hidePriceFilter showFollowersFilter={false} category={category} onCategoryChange={(v) => { setCategory(v); }} />
      <main className="flex-1 min-h-0 w-full px-1 sm:px-2 py-2 overflow-y-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[3px]">
          {workspaceItems.map((c) => (
            <div key={c.id} className="min-w-0">
              <CreationCard
                creation={c}
                onClick={
                  selectedIds.size === 0 && (c.status ?? (c.imageUrl ? "completed" : "pending")) === "completed" && c.imageUrl
                    ? () => setSelectedCreation(c)
                    : undefined
                }
                hasSelection={selectedIds.size > 0}
                isSelected={selectedIds.has(c.id)}
                onToggleSelect={() => toggleSelect(c.id)}
                onDelete={userKey ? () => { removeCreation(userKey, c.id); setSelectedIds((prev) => { const n = new Set(prev); n.delete(c.id); return n; }); } : undefined}
                isLiked={!!userKey && getCreationLiked(userKey, c.id)}
                onToggleLike={
                  userKey
                    ? () => {
                        toggleCreationLike(userKey, c.id);
                        setLikeVersion((v) => v + 1);
                      }
                    : undefined
                }
              />
            </div>
          ))}
        </div>
        <div className="w-full py-4 flex items-center justify-center text-sm text-muted-foreground">
          You&apos;re all caught up.
        </div>
      </main>

      <Dialog open={!!selectedCreation} onOpenChange={(open) => !open && setSelectedCreation(null)}>
        <DialogContent
          className="!max-w-[95vw] !w-[95vw] max-h-[90vh] h-[90vh] p-0 gap-0 overflow-hidden flex flex-col sm:flex-row [&>button]:hidden"
          aria-describedby={undefined}
          data-testid="workspace-detail-dialog"
        >
          <VisuallyHidden>
            <DialogTitle>Image and prompt</DialogTitle>
          </VisuallyHidden>
          <button
            type="button"
            className="absolute top-2 right-2 z-50 rounded-full p-1.5 bg-black/50 text-white hover:bg-black/70 transition-colors"
            onClick={() => setSelectedCreation(null)}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          {selectedCreation && (
            <>
              <div className="flex flex-col w-full sm:w-[380px] sm:min-w-[320px] border-r border-border bg-muted/30 min-h-0 overflow-y-auto [&_*]:cursor-default [&_button]:cursor-pointer">
                <div className="p-4 pb-1 flex flex-col flex-shrink-0 relative">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-foreground select-none outline-none cursor-default" tabIndex={-1}>Prompt</h3>
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            className="rounded p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                            onClick={() => setEditedPrompt(selectedCreation.prompt ?? "")}
                            aria-label="Restore prompt"
                          >
                            <RotateCcw className="h-4 w-4" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="max-w-[200px] text-[11px]">
                          Restore the last prompt used for this generated image.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Textarea
                    id="workspace-detail-prompt"
                    value={editedPrompt}
                    onChange={(e) => setEditedPrompt(e.target.value)}
                    placeholder="—"
                    className="text-sm text-foreground min-h-[50vh] max-h-[85vh] resize-y bg-background/80 border-border/60"
                  />
                  <div className="flex justify-end mt-0 min-h-[1.75rem] items-center">
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <label className="flex items-center gap-1.5 cursor-default select-none outline-none">
                            <Checkbox
                              checked={detailEnhancement === "prompt"}
                              onCheckedChange={(checked) => setDetailEnhancement(checked ? "prompt" : "none")}
                              data-testid="checkbox-detail-enhancement"
                              className="cursor-default select-none"
                            />
                            <span className="text-[11px] text-muted-foreground pointer-events-none">Enhance prompt</span>
                          </label>
                        </TooltipTrigger>
                        <TooltipContent side="left" className="max-w-[200px] text-[11px] leading-snug">
                          {ENHANCEMENT_OPTIONS.find((o) => o.value === "prompt")?.outputDescription}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <div className="px-4 -mt-0.5 pt-0 pb-2 space-y-2 flex-shrink-0 min-h-[11rem]">
                  <div className="space-y-1">
                    <Label className="text-xs cursor-default select-none" tabIndex={-1}>Model</Label>
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className="flex items-center h-8 px-3 rounded-md border border-input bg-muted/50 text-muted-foreground text-xs font-mono cursor-default select-none outline-none"
                            tabIndex={-1}
                          >
                            Nano Banana Pro
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-[160px] text-[11px] leading-snug">
                          More models soon.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs cursor-default select-none" tabIndex={-1}>Aspect ratio</Label>
                    <div className="grid grid-cols-5 gap-1">
                      {[
                        { value: "1:1", label: "1:1" },
                        { value: "16:9", label: "16:9" },
                        { value: "9:16", label: "9:16" },
                        { value: "4:3", label: "4:3" },
                        { value: "3:4", label: "3:4" },
                      ].map((ratio) => (
                        <Button
                          key={ratio.value}
                          variant={detailAspectRatio === ratio.value ? "default" : "outline"}
                          size="sm"
                          className="h-7 text-xs px-1"
                          onClick={() => setDetailAspectRatio(ratio.value)}
                          data-testid={`button-detail-ratio-${ratio.value}`}
                        >
                          {ratio.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs cursor-default select-none" tabIndex={-1}>Resolution</Label>
                    <div className="grid grid-cols-3 gap-1">
                      {(["1K", "2K", "4K"] as const).map((res) => (
                        <Button
                          key={res}
                          variant={detailResolution === res ? "default" : "outline"}
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => setDetailResolution(res)}
                          data-testid={`button-detail-resolution-${res}`}
                        >
                          {res}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-2 space-y-2 min-h-[5rem]">
                  <Button
                    className="w-full"
                    onClick={handleRegenerate}
                    disabled={isPaymentPending}
                    data-testid="button-regenerate"
                  >
                    {isPaymentPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Neu generieren
                      </>
                    )}
                  </Button>
                  <div className="h-5 flex items-center justify-center">
                    {estimateCost != null ? (
                      <TooltipProvider delayDuration={200}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="text-xs text-muted-foreground text-center cursor-default select-none outline-none border-b border-dotted border-transparent hover:border-muted-foreground/50">
                              Estimated cost: $
                              {detailEnhancement === "prompt" && typeof estimateCost.enhancementCostUsd === "number"
                                ? estimateCost.totalUsd.toFixed(5)
                                : estimateCost.totalUsd.toFixed(4)}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-[220px] text-[11px] leading-snug">
                            {typeof estimateCost.imageCostUsd === "number" && (
                              <>
                                Image ~${estimateCost.imageCostUsd.toFixed(4)}
                                {typeof estimateCost.enhancementCostUsd === "number" && estimateCost.enhancementCostUsd > 0 && (
                                  <> + enhancement ~${estimateCost.enhancementCostUsd.toFixed(5)} ({estimateCost.enhancementInputTokens ?? "?"} in / {estimateCost.enhancementOutputTokens ?? "?"} out tokens)</>
                                )}
                                .
                              </>
                            )}
                            {(!estimateCost.imageCostUsd || (estimateCost.enhancementCostUsd ?? 0) === 0) && "Updates with prompt, resolution & enhancement."}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <span className="invisible text-xs">$0.0000</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex-1 min-h-0 flex items-center justify-center bg-black/5 p-4 cursor-default [&_*]:cursor-default">
                {selectedCreation.imageUrl && (
                  <img
                    src={selectedCreation.imageUrl}
                    alt=""
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded select-none cursor-default"
                  />
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
