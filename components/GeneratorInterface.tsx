"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Sparkles,
  Image as ImageIcon,
  ArrowLeft,
  Maximize2,
  Send,
  MessageCircle,
  ChevronDown,
  Copy,
  Check,
  Heart,
  Bookmark,
  Plus,
  X,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState, useRef, useMemo, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import ImageLightbox from "./ImageLightbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Variable } from "./PromptEditor";
import { useActiveAccount } from "thirdweb/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Download, Loader2, Star } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useX402PaymentProduction } from "@/hooks/useX402PaymentProduction";
import { usePaymentBalance, useBestPaymentChain } from "@/hooks/useWalletBalance";
import type { ChainKey } from "@/lib/payment-config";
import { formatPricePerGeneration, storedPriceToUsdc } from "@/lib/utils";
import { PROMPT_CATEGORIES } from "@/lib/categories";

/** Reference image key for free-prompt mode (no variable-based ref fields). */
const FREE_PROMPT_REF_KEY = "__free_prompt_ref__";

const ASPECT_RATIOS = [
  { value: "1:1", label: "1:1" },
  { value: "16:9", label: "16:9" },
  { value: "9:16", label: "9:16" },
  { value: "4:3", label: "4:3" },
  { value: "3:4", label: "3:4" },
];

interface VariationSettings {
  aspectRatio: string;
  model: string;
  resolution: string;
}

interface X402Settings {
  model: string;
  aspectRatio: string;
  resolution: string;
}

function X402LinkSection({
  settings,
  promptId,
  pricePerGeneration,
}: {
  settings: X402Settings;
  promptId?: string;
  pricePerGeneration?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const realPriceUsdc =
    pricePerGeneration !== undefined && pricePerGeneration > 0
      ? storedPriceToUsdc(pricePerGeneration)
      : 0.05;
  const x402Config = {
    endpoint: `/api/generate/${promptId || "prompt-id"}`,
    price: String(realPriceUsdc),
    currency: "USDC",
    network: "base",
    description: "AI Image Generation",
    settings: {
      model: settings.model,
      aspectRatio: settings.aspectRatio,
      resolution: settings.resolution,
    },
  };

  const middlewareCode = `paymentMiddleware({
  "POST ${x402Config.endpoint}": {
    price: "${x402Config.price}",
    network: "${x402Config.network}",
    description: "${x402Config.description}",
    config: ${JSON.stringify(x402Config.settings, null, 2)
      .split("\n")
      .map((line, i) => (i === 0 ? line : "    " + line))
      .join("\n")}
  }
})`;

  const curlExample = `curl -X POST "${x402Config.endpoint}" \\
  -H "X-402-Payment: <payment_token>" \\
  -H "Content-Type: application/json" \\
  -d '${JSON.stringify(x402Config.settings)}'`;

  const jsonPayload = JSON.stringify(x402Config.settings, null, 2);

  return (
    <Card className="border-0 bg-card/50 overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="p-3 cursor-pointer hover-elevate rounded-md">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm flex items-center gap-2">
                <span className="text-primary">x402</span> Link
              </CardTitle>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="p-3 pt-0 space-y-3 overflow-hidden">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">
                  Middleware Config
                </Label>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2"
                  onClick={() => copyToClipboard(middlewareCode, "middleware")}
                  data-testid="button-copy-middleware"
                >
                  {copiedField === "middleware" ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <pre className="bg-background/50 border border-border/50 rounded-md p-2 text-xs font-mono max-h-32 text-white whitespace-pre-wrap break-all overflow-y-auto overflow-x-hidden scrollbar-thin w-full max-w-full">
                {middlewareCode}
              </pre>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">
                  JSON Payload
                </Label>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2"
                  onClick={() => copyToClipboard(jsonPayload, "json")}
                  data-testid="button-copy-json"
                >
                  {copiedField === "json" ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <pre className="bg-background/50 border border-border/50 rounded-md p-2 text-xs font-mono max-h-28 text-white whitespace-pre-wrap break-all overflow-y-auto overflow-x-hidden scrollbar-thin w-full max-w-full">
                {jsonPayload}
              </pre>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground">
                  cURL Example
                </Label>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 px-2"
                  onClick={() => copyToClipboard(curlExample, "curl")}
                  data-testid="button-copy-curl"
                >
                  {copiedField === "curl" ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                </Button>
              </div>
              <pre className="bg-background/50 border border-border/50 rounded-md p-2 text-xs font-mono max-h-24 text-white whitespace-pre-wrap break-all overflow-y-auto overflow-x-hidden scrollbar-thin w-full max-w-full">
                {curlExample}
              </pre>
            </div>

            <div className="pt-2">
              <a
                href="https://www.x402.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                Learn more about x402
              </a>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

interface Variation {
  id: string;
  imageUrl: string;
  settings: VariationSettings;
  createdAt: string;
}

interface Comment {
  id: string;
  username: string;
  content: string;
  createdAt: string;
}

interface GeneratorInterfaceProps {
  promptId?: string;
  title?: string;
  artistName?: string;
  artistId?: string;
  imageUrl?: string;
  showcaseImages?: Array<{
    url: string;
    thumbnail?: string;
    isPrimary?: boolean;
  }>;
  isFreeShowcase?: boolean;
  /** Symphora type `free`: full prompt on the left; user can edit text per session (not saved to the prompt record). */
  isFreePromptMode?: boolean;
  /** Decrypted prompt text from API (initial value for free mode). */
  initialFreePromptText?: string;
  publicPromptText?: string;
  /** Price per generation (from prompt); shown above Payment Chain. */
  pricePerGeneration?: number;
  /** Category (value from prompt); shown above title. */
  category?: string;
  /** Average rating (0–5); shown as stars next to title. */
  rating?: number;
  /** Enhancement set by artist (Marketplace); no dropdown, use this value. */
  usePromptEnhancement?: boolean;
}

export default function GeneratorInterface({
  promptId,
  title = "Untitled Prompt",
  artistName = "Unknown Artist",
  artistId,
  imageUrl,
  showcaseImages = [],
  isFreeShowcase = false,
  isFreePromptMode = false,
  initialFreePromptText = "",
  publicPromptText,
  pricePerGeneration,
  category,
  rating,
  usePromptEnhancement = true,
}: GeneratorInterfaceProps) {
  const router = useRouter();
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [resolution, setResolution] = useState("2K");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const commentsSectionRef = useRef<HTMLDivElement>(null);
  const [commentText, setCommentText] = useState("");
  const [selectedVariation, setSelectedVariation] = useState<string | null>(
    null
  );
  const [variableValues, setVariableValues] = useState<Record<string, string>>(
    {}
  );
  const [referenceImages, setReferenceImages] = useState<
    Record<string, string>
  >({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null
  );
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [finalPromptFilled, setFinalPromptFilled] = useState<string | null>(null);
  const [freePromptDraft, setFreePromptDraft] = useState(initialFreePromptText ?? "");
  const [selectedChain, setSelectedChain] = useState<ChainKey>('base-sepolia');
  const [estimateCost, setEstimateCost] = useState<number | null>(null);
  const { toast } = useToast();

  // X402 Payment hooks
  const { generateImage, isPending: isPaymentPending, getPaymentStatus } = useX402PaymentProduction();
  const { chainKey: bestChain, balance: bestBalance } = useBestPaymentChain();
  const selectedChainBalance = usePaymentBalance(selectedChain);
  const account = useActiveAccount();
  const queryClient = useQueryClient();
  const userId = account?.address ?? null;
  
  // Auto-select best chain if available
  useEffect(() => {
    if (bestChain && bestBalance?.hasSufficientBalance) {
      setSelectedChain(bestChain);
    }
  }, [bestChain, bestBalance]);

  useEffect(() => {
    if (isFreePromptMode && typeof initialFreePromptText === "string") {
      setFreePromptDraft(initialFreePromptText);
    }
  }, [isFreePromptMode, initialFreePromptText]);

  // Estimated cost when we have final prompt (keep previous value while refetching to avoid flicker)
  useEffect(() => {
    const promptForEstimate = isFreePromptMode
      ? freePromptDraft?.trim()
      : finalPromptFilled?.trim();
    if (!promptForEstimate) {
      setEstimateCost(null);
      return;
    }
    let cancelled = false;
    fetch("/api/estimate-generation-cost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: promptForEstimate,
        resolution,
        useEnhancement: usePromptEnhancement,
        userId: account?.address ?? undefined,
      }),
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data || data.totalUsd == null) return;
        setEstimateCost(data.totalUsd);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [isFreePromptMode, freePromptDraft, finalPromptFilled, resolution, usePromptEnhancement, account?.address]);

  const { data: promptData } = useQuery<{
    prompt?: {
      promptData?: {
        variables?: Array<Variable>;
      };
    };
  }>({
    queryKey: [`/api/prompts/${promptId}`],
    enabled: !!promptId,
  });

  const { data: likeData } = useQuery<{ likesCount: number; hasLiked: boolean }>({
    queryKey: [`/api/enki/prompts/${promptId}/like`, userId],
    queryFn: async () => {
      if (!promptId || !userId) return { likesCount: 0, hasLiked: false };
      const res = await fetch(
        `/api/enki/prompts/${promptId}/like?userId=${encodeURIComponent(userId)}`,
        { credentials: "include" }
      );
      if (!res.ok) return { likesCount: 0, hasLiked: false };
      return res.json();
    },
    enabled: !!promptId,
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!promptId || !userId) throw new Error("Wallet required");

      const isUnlike = hasLiked;

      const url = isUnlike
        ? `/api/enki/prompts/${promptId}/like?userId=${encodeURIComponent(userId)}`
        : `/api/enki/prompts/${promptId}/like`;

      const res = await fetch(url, {
        method: isUnlike ? "DELETE" : "POST",
        headers: isUnlike ? undefined : { "Content-Type": "application/json" },
        body: isUnlike ? undefined : JSON.stringify({ userId }),
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error ?? "Failed to update like");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`/api/enki/prompts/${promptId}/like`],
      });
    },
  });

  const promptVariables = useMemo(() => {
    return promptData?.prompt?.promptData?.variables || [];
  }, [promptData]);

  const likesCount = likeData?.likesCount ?? 0;
  const hasLiked = likeData?.hasLiked ?? false;

  type GenerationRow = {
    id: string;
    prompt_id: string;
    user_key: string;
    variable_values?: Array<{ variableName: string; value: string | number | boolean | string[] }> | null;
    image_urls?: string[] | null;
    status?: string;
    created_at?: string;
  };

  const { data: creationsData } = useQuery<{ generations: GenerationRow[]; total: number }>({
    queryKey: ["/api/generations", userId, promptId],
    queryFn: async () => {
      if (!userId || !promptId) return { generations: [], total: 0 };
      const res = await fetch(
        `/api/generations?userId=${encodeURIComponent(userId)}&promptId=${encodeURIComponent(promptId)}&limit=100`,
        { credentials: "include" }
      );
      if (!res.ok) return { generations: [], total: 0 };
      const json = await res.json();
      return {
        generations: Array.isArray(json.generations) ? json.generations : [],
        total: typeof json.total === "number" ? json.total : 0,
      };
    },
    enabled: !!userId && !!promptId,
  });

  const myCreations = useMemo(
    () => (creationsData?.generations ?? []).filter((g) => g.status === "completed" && (g.image_urls?.length ?? 0) > 0),
    [creationsData]
  );

  const [selectedCreationId, setSelectedCreationId] = useState<string | null>(null);
  const selectedCreation = useMemo(
    () => (selectedCreationId ? myCreations.find((c) => c.id === selectedCreationId) : null),
    [selectedCreationId, myCreations]
  );

  useEffect(() => {
    if (promptVariables.length > 0) {
      const defaults: Record<string, string> = {};
      promptVariables.forEach((v) => {
        const name = v.name || v.id;
        const val = v.defaultValue;
        defaults[name] =
          val === undefined || val === null
            ? ""
            : typeof val === "object"
              ? JSON.stringify(val)
              : String(val);
      });
      setVariableValues(defaults);
    }
  }, [promptVariables]);

  const handleReferenceImageUpload = (variableId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setReferenceImages((prev) => ({
        ...prev,
        [variableId]: e.target?.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeReferenceImage = (variableId: string) => {
    setReferenceImages((prev) => {
      const newImages = { ...prev };
      delete newImages[variableId];
      return newImages;
    });
  };

  const handleCreateNow = async () => {
    console.log('🚀 Generate button clicked');

    if (!promptId) {
      toast({
        title: "Error",
        description: "Prompt ID is required",
        variant: "destructive",
      });
      return;
    }

    const userIdToUse = account?.address;
    if (!userIdToUse) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to generate images.",
        variant: "destructive",
      });
      setIsGenerating(false);
      return;
    }

    setIsGenerating(true);
    setGeneratedImageUrl(null);
    setShowSuccessModal(false);
    setGenerationId(null);

    // Check payment readiness
    const paymentStatus = getPaymentStatus();
    console.log('💳 Payment status:', paymentStatus);

    if (!paymentStatus.isReady) {
      console.error('❌ Payment not ready:', paymentStatus);
      
      // More detailed error message
      let errorMessage = "Please connect your wallet to generate images";
      if (!paymentStatus.isConnected) {
        errorMessage = "Wallet not connected. Please connect your wallet using the wallet button in the navbar.";
      } else if (paymentStatus.isPending) {
        errorMessage = "Payment is being processed. Please wait...";
      }
      
      toast({
        title: "Wallet Required",
        description: errorMessage,
        variant: "destructive",
        duration: 5000, // Show for 5 seconds
      });
      setIsGenerating(false);
      return;
    }

    console.log('✅ Payment ready, proceeding with generation');

    const userIdForApi = String(
      paymentStatus.walletAddress ?? userIdToUse ?? account?.address ?? ""
    ).trim();
    if (!userIdForApi) {
      toast({
        title: "Wallet address missing",
        description: "Could not read wallet address. Please reconnect your wallet and try again.",
        variant: "destructive",
      });
      setIsGenerating(false);
      return;
    }

    try {
      if (isFreePromptMode) {
        const t = freePromptDraft.trim();
        if (!t) {
          toast({
            title: "Prompt required",
            description: "Enter a prompt to generate.",
            variant: "destructive",
          });
          setIsGenerating(false);
          return;
        }
      }

      const variableValuesArray = isFreePromptMode
        ? []
        : promptVariables
            .map((variable) => {
              const varName = variable.name || variable.id;
              const value = variableValues[varName] ?? variable.defaultValue;
              const varType = variable.type || "text";
              if (varType === "checkbox") {
                const checked = value === true || value === "true" || value === "1";
                return { variableName: varName, value: checked };
              }
              if (value === undefined || value === null || value === "") return null;
              return { variableName: varName, value };
            })
            .filter(
              (v): v is { variableName: string; value: string | number | boolean | string[] } =>
                v !== null
            );

      const generationRequest: Record<string, unknown> = {
        userId: userIdForApi,
        userKey: userIdForApi,
        promptId: String(promptId ?? ""),
        variableValues: variableValuesArray,
        settings: {
          ...(aspectRatio != null && { aspectRatio }),
          ...(resolution != null && { resolution }),
        },
      };
      if (isFreePromptMode) {
        generationRequest.finalPromptOverride = freePromptDraft.trim();
      }

      const url = `/api/generations?userId=${encodeURIComponent(userIdForApi)}&promptId=${encodeURIComponent(String(generationRequest.promptId))}`;
      const generationResponse = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-User-Id": userIdForApi,
        },
        body: JSON.stringify(generationRequest),
      });

      if (!generationResponse.ok) {
        const errorData = await generationResponse.json().catch(() => ({}));
        console.error("POST /api/generations", generationResponse.status, errorData);
        const details = Array.isArray(errorData.details) ? errorData.details.join("; ") : errorData.details;
        const message = errorData.error || "Failed to create generation";
        throw new Error(details ? `${message}: ${details}` : message);
      }

      const generationData = await generationResponse.json();
      const newGenerationId = generationData.generationId ?? generationData.id;
      if (!newGenerationId) {
        throw new Error("Invalid response: no generation ID returned");
      }
      setGenerationId(newGenerationId);

      const decryptResponse = await fetch(
        `/api/generations/${newGenerationId}?decrypt=true`
      );

      if (!decryptResponse.ok) {
        throw new Error("Failed to decrypt final prompt");
      }

      const decryptData = await decryptResponse.json();
      const finalPrompt = decryptData.finalPrompt ?? decryptData.generation?.finalPrompt;

      if (!finalPrompt) {
        throw new Error("Final prompt not found");
      }

      setFinalPromptFilled(finalPrompt);

      // Generate image with X402 payment
      console.log('💸 Calling generateImage with payment modal...');
      console.log('Chain:', selectedChain);
      console.log('Final prompt:', finalPrompt);

      let imageData;
      try {
        imageData = await generateImage(
          {
            prompt: finalPrompt,
            aspectRatio: aspectRatio,
            resolution: resolution as '1K' | '2K' | '4K',
            useEnhancement: usePromptEnhancement,
            userId: account?.address ?? undefined,
            ...(isFreePromptMode && referenceImages[FREE_PROMPT_REF_KEY]
              ? { referenceImage: referenceImages[FREE_PROMPT_REF_KEY] }
              : {}),
          },
          selectedChain
        ) as { imageUrl: string; prompt?: string; provider?: string; usedGemini?: boolean; metadata?: unknown };

        console.log('✅ Image generation completed:', imageData);
      } catch (paymentError: any) {
        console.error('❌ Payment/generation error:', paymentError);
        
        // Check if it's a wallet connection error
        if (paymentError?.message?.includes('Wallet not connected') || 
            paymentError?.message?.includes('wallet')) {
          toast({
            title: "Wallet Connection Required",
            description: "Please connect your wallet to proceed with payment. Click the wallet icon in the navbar.",
            variant: "destructive",
            duration: 5000,
          });
        } else {
          // Other payment errors
          toast({
            title: "Payment Failed",
            description: paymentError?.message || "Failed to process payment. Please try again.",
            variant: "destructive",
            duration: 5000,
          });
      }
        throw paymentError; // Re-throw to be caught by outer catch
      }

      if (!imageData?.imageUrl) {
        throw new Error("Failed to generate image - no image URL returned");
      }

      setGeneratedImageUrl(imageData.imageUrl);

      const updateResponse = await fetch(
        `/api/generations/${newGenerationId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "completed",
            imageUrls: [imageData.imageUrl],
            completedAt: new Date().toISOString(),
          }),
        }
      );

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        console.warn("Generation status update failed:", errorData);
      }

      queryClient.invalidateQueries({ queryKey: ["/api/generations"] });
      setShowSuccessModal(true);
    } catch (error: any) {
      // Handle payment-specific errors
      let errorTitle = "Generation Failed";
      let errorDescription = error.message || "An error occurred while generating the image";
      
      if (error.message?.includes("Wallet not connected") || error.message?.includes("wallet")) {
        errorTitle = "Wallet Required";
        errorDescription = "Please connect your wallet to generate images";
      } else if (error.message?.includes("Payment") || error.message?.includes("payment")) {
        errorTitle = "Payment Failed";
        errorDescription = error.message || "Payment could not be processed. Please try again.";
      } else if (error.message?.includes("insufficient") || error.message?.includes("balance")) {
        errorTitle = "Insufficient Balance";
        errorDescription = "You don't have enough USDC to complete this transaction. Please add funds to your wallet.";
      }
      
      toast({
        title: errorTitle,
        description: errorDescription,
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadImage = async () => {
    if (!generatedImageUrl) return;

    try {
      if (generatedImageUrl.startsWith("data:")) {
        const a = document.createElement("a");
        a.href = generatedImageUrl;
        a.download = `generated-image-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
      }

      const response = await fetch(generatedImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `generated-image-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download the image",
        variant: "destructive",
      });
    }
  };

  const [variations] = useState<Variation[]>([
    {
      id: "v1",
      imageUrl: `${imageUrl}&v=1`,
      settings: {
        aspectRatio: "16:9",
        model: "Nano Banana Pro",
        resolution: "2K",
      },
      createdAt: "2 min ago",
    },
    {
      id: "v2",
      imageUrl: `${imageUrl}&v=2`,
      settings: {
        aspectRatio: "1:1",
        model: "Nano Banana Pro",
        resolution: "4K",
      },
      createdAt: "5 min ago",
    },
    {
      id: "v3",
      imageUrl: `${imageUrl}&v=3`,
      settings: {
        aspectRatio: "9:16",
        model: "Nano Banana Pro",
        resolution: "1K",
      },
      createdAt: "10 min ago",
    },
    {
      id: "v4",
      imageUrl: `${imageUrl}&v=4`,
      settings: {
        aspectRatio: "4:3",
        model: "Nano Banana Pro",
        resolution: "4K",
      },
      createdAt: "15 min ago",
    },
    {
      id: "v5",
      imageUrl: `${imageUrl}&v=5`,
      settings: {
        aspectRatio: "16:9",
        model: "Nano Banana Pro",
        resolution: "2K",
      },
      createdAt: "20 min ago",
    },
  ]);

  const [comments] = useState<Comment[]>([]);

  const hasGeneratedFromThisArtwork = myCreations.length > 0;

  const baseCost = 15;
  const resolutionCost = resolution === "4K" ? 10 : resolution === "2K" ? 5 : 0;
  const imageUploadCost = 20;
  const premiumCost = 50;
  const totalCost = baseCost + resolutionCost + imageUploadCost + premiumCost;

  const handleVariationSelect = (variation: Variation) => {
    setSelectedVariation(variation.id);
    setAspectRatio(variation.settings.aspectRatio);
    setResolution(variation.settings.resolution);
  };

  return (
    <div className="h-screen flex flex-col min-h-0" style={{ height: "100vh", minHeight: "100vh" }}>
      <div className="flex items-center gap-3 p-3 border-b border-border/50 shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/")}
          data-testid="button-back"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div>
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
          <p
            className="text-xs text-muted-foreground hover:text-primary cursor-pointer hover:underline"
            onClick={() => artistId && router.push(`/profile/${encodeURIComponent(artistId)}`)}
            data-testid="text-artist-link"
          >
            by {artistName}
          </p>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0 items-stretch relative" style={{ flex: "1 1 0%" }}>
        {/* Full-height vertical dividers – always from top to bottom of content area */}
        <div aria-hidden className="absolute inset-0 pointer-events-none flex items-stretch">
          <div className="w-[22rem] shrink-0 border-r border-border/50 min-h-full" />
          <div className="flex-1 min-w-0 min-h-full" />
          <div className="w-[16.8rem] shrink-0 border-l border-border/50 min-h-full" />
        </div>
        <div className="w-[22rem] shrink-0 self-stretch flex flex-col min-h-0 overflow-hidden relative z-0">
        <ScrollArea className="flex-1 min-h-0">
          <div className="p-3 space-y-3" style={{ contain: "layout" }}>
            {/* Meta block: category, title, artist, rating & like – first thing above variables */}
            <div className="space-y-1 pb-2 border-b border-border/50 pl-3 text-left">
              {/* Top row: category on the left, rating & like on the right */}
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  {category && (
                    <p className="text-[6px] uppercase tracking-wider text-muted-foreground">
                      {PROMPT_CATEGORIES.find((c) => c.value === category)?.label ?? category}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {typeof rating === "number" && (
                    <button
                      type="button"
                      onClick={() => commentsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                      className="flex items-center gap-0.5 text-foreground hover:opacity-80 transition-opacity cursor-pointer rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
                      title="Scroll to comments"
                    >
                      <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                      <span className="text-xs font-medium text-foreground">{rating.toFixed(1)}</span>
                    </button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto py-1 px-1.5 gap-1 text-muted-foreground hover:text-foreground"
                    onClick={() => likeMutation.mutate()}
                    disabled={!userId || likeMutation.isPending}
                    title="Like"
                    data-testid="button-like-meta"
                  >
                    <Heart className={`h-3.5 w-3.5 ${hasLiked ? "fill-red-500 text-red-500" : ""}`} />
                    <span className="text-xs font-medium text-foreground">{likesCount}</span>
                  </Button>
                </div>
              </div>
              {/* Below: title and artist */}
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-bold text-foreground whitespace-nowrap" title={title}>
                  {title.slice(0, 18)}
                </h2>
                <p
                  className="text-sm text-muted-foreground hover:text-primary cursor-pointer hover:underline break-words"
                  onClick={() => artistId && router.push(`/profile/${encodeURIComponent(artistId)}`)}
                  data-testid="text-artist-link"
                >
                  by {artistName}
                </p>
              </div>
            </div>

            {isFreeShowcase && publicPromptText ? (
              <Card className="border-0 bg-card/50">
                <CardHeader className="p-3 pb-2">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-[10px] px-1.5 py-0.5">
                      FREE
                    </Badge>
                    <CardTitle className="text-sm">Prompt</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-3">
                  <div className="relative">
                    <textarea
                      readOnly
                      value={publicPromptText}
                      className="w-full h-48 p-3 text-xs font-mono bg-background/50 border border-border/50 rounded-md text-muted-foreground resize-none scrollbar-thin"
                      data-testid="textarea-free-prompt"
                    />
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 h-6 px-2"
                      onClick={() => {
                        navigator.clipboard.writeText(publicPromptText);
                      }}
                      data-testid="button-copy-prompt"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    This is a free showcase prompt. Copy and use it in your
                    favorite AI image generator.
                  </p>
                </CardContent>
              </Card>
            ) : isFreePromptMode ? (
              <Card className="border-0 bg-card/50">
                <CardHeader className="p-3 pb-2">
                  <CardTitle className="text-lg font-serif">Prompt</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-3">
                  <Textarea
                    value={freePromptDraft}
                    onChange={(e) => setFreePromptDraft(e.target.value)}
                    className="min-h-[12rem] text-xs font-mono bg-background/50 border border-border/50"
                    placeholder="Your prompt for this generation..."
                    data-testid="textarea-free-prompt-editable"
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Changes here apply only to your session. The published prompt in the marketplace is not updated.
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={(el) => {
                        fileInputRefs.current[FREE_PROMPT_REF_KEY] = el;
                      }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleReferenceImageUpload(FREE_PROMPT_REF_KEY, file);
                      }}
                      data-testid="input-file-free-ref"
                    />
                    {referenceImages[FREE_PROMPT_REF_KEY] ? (
                      <div className="relative w-10 h-10 rounded-md overflow-hidden border border-border group shrink-0">
                        <img
                          src={referenceImages[FREE_PROMPT_REF_KEY]}
                          alt="Reference"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeReferenceImage(FREE_PROMPT_REF_KEY)}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          data-testid="button-remove-free-ref"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[FREE_PROMPT_REF_KEY]?.click()}
                        className="w-10 h-10 rounded-md border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center shrink-0 transition-colors"
                        data-testid="button-add-free-ref"
                      >
                        <Plus className="h-4 w-4 text-muted-foreground" />
                      </button>
                    )}
                    <span className="text-xs text-muted-foreground">Add reference image (optional)</span>
                  </div>

                  <Separator className="my-2" />

                  <div className="space-y-1.5">
                    <Label className="text-xs">Aspect ratio</Label>
                    <div className="grid grid-cols-5 gap-1">
                      {ASPECT_RATIOS.map((ratio) => (
                        <Button
                          key={ratio.value}
                          variant={
                            aspectRatio === ratio.value ? "default" : "outline"
                          }
                          size="sm"
                          className="h-7 text-xs px-1"
                          onClick={() => setAspectRatio(ratio.value)}
                          data-testid={`button-ratio-${ratio.value}`}
                        >
                          {ratio.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 min-h-[3.25rem] flex flex-col justify-center">
                    <Label className="text-xs">Resolution</Label>
                    <div className="grid grid-cols-3 gap-1">
                      {["1K", "2K", "4K"].map((res) => (
                        <Button
                          key={res}
                          variant={resolution === res ? "default" : "outline"}
                          size="sm"
                          className="h-7 text-xs min-w-0 w-full"
                          onClick={() => setResolution(res)}
                          data-testid={`button-resolution-${res}`}
                        >
                          {res}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 bg-card/50">
                <CardHeader className="p-3 pb-2">
                  <CardTitle className="text-lg font-serif">Variables</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-3">
                  {promptVariables.length > 0 &&
                    promptVariables.map((variable, index) => {
                      const varName = variable.name || variable.id;
                      const varType = variable.type || "text";
                      const currentValue = variableValues[varName];
                      
                      return (
                        <div
                          key={
                            variable.id || variable.name || `variable-${index}`
                          }
                          className="space-y-1.5"
                        >
                          <Label className="text-sm font-medium text-foreground">
                            {variable.name}
                            {variable.required && <span className="text-destructive ml-1">*</span>}
                          </Label>
                          {variable.description && (
                            <p className="text-xs text-muted-foreground">
                              {variable.description}
                            </p>
                          )}
                          
                          {/* TEXT input */}
                          {varType === "text" && (
                            <Input
                              value={currentValue || ""}
                              onChange={(e) =>
                                setVariableValues((prev) => ({
                                  ...prev,
                                  [varName]: e.target.value,
                                }))
                              }
                              placeholder={
                                variable.defaultValue
                                  ? String(variable.defaultValue)
                                  : `Enter ${(variable.name || variable.id || "").toLowerCase()}...`
                              }
                              className="h-8 text-xs"
                              data-testid={`input-variable-${variable.id}`}
                            />
                          )}
                          
                          {/* SLIDER input */}
                          {varType === "slider" && (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {variable.min ?? 0}
                                </span>
                                <span className="text-sm font-mono text-foreground">
                                  {currentValue || variable.defaultValue || variable.min || 0}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {variable.max ?? 100}
                                </span>
                              </div>
                              <Slider
                                value={[Number(currentValue || variable.defaultValue || variable.min || 0)]}
                                onValueChange={([val]) =>
                                  setVariableValues((prev) => ({
                                    ...prev,
                                    [varName]: String(val),
                                  }))
                                }
                                min={variable.min ?? 0}
                                max={variable.max ?? 100}
                                step={1}
                                className="w-full"
                                data-testid={`slider-variable-${variable.id}`}
                              />
                            </div>
                          )}
                          
                          {/* SINGLE-SELECT dropdown */}
                          {varType === "single-select" && variable.options && (
                            <Select
                              value={currentValue || String(variable.defaultValue || "")}
                              onValueChange={(val) =>
                                setVariableValues((prev) => ({
                                  ...prev,
                                  [varName]: val,
                                }))
                              }
                            >
                              <SelectTrigger className="h-8 text-xs" data-testid={`select-variable-${variable.id}`}>
                                <SelectValue placeholder={`Select ${(variable.name || variable.id || "").toLowerCase()}...`} />
                              </SelectTrigger>
                              <SelectContent>
                                {variable.options.map((opt, optIdx) => (
                                  <SelectItem 
                                    key={optIdx} 
                                    value={opt.promptValue}
                                    className="text-xs"
                                  >
                                    {opt.visibleName || opt.promptValue}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                          
                          {/* MULTI-SELECT checkboxes */}
                          {varType === "multi-select" && variable.options && (
                            <div className="space-y-2 pl-1">
                              {variable.options.map((opt, optIdx) => {
                                const optValue = opt.promptValue;
                                const selectedValues = (currentValue || "").split(",").filter(Boolean);
                                const isChecked = selectedValues.includes(optValue);
                                
                                return (
                                  <div key={optIdx} className="flex items-center gap-2">
                                    <Checkbox
                                      id={`${varName}-${optIdx}`}
                                      checked={isChecked}
                                      onCheckedChange={(checked) => {
                                        const newValues = checked
                                          ? [...selectedValues, optValue]
                                          : selectedValues.filter((v) => v !== optValue);
                                        setVariableValues((prev) => ({
                                          ...prev,
                                          [varName]: newValues.join(","),
                                        }));
                                      }}
                                      data-testid={`checkbox-${variable.id}-${optIdx}`}
                                    />
                                    <label
                                      htmlFor={`${varName}-${optIdx}`}
                                      className="text-xs text-foreground cursor-pointer"
                                    >
                                      {opt.visibleName || opt.promptValue}
                                    </label>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          
                          {/* CHECKBOX toggle: sent as boolean for substitution (checkedValue/uncheckedValue) */}
                          {varType === "checkbox" && (
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={varName}
                                checked={currentValue === true || currentValue === "true" || currentValue === "1"}
                                onCheckedChange={(checked) =>
                                  setVariableValues((prev) => ({
                                    ...prev,
                                    [varName]: checked ? "true" : "false",
                                  }))
                                }
                                data-testid={`checkbox-variable-${variable.id}`}
                              />
                              <label
                                htmlFor={varName}
                                className="text-xs text-foreground cursor-pointer"
                              >
                                {variable.defaultValue ? "Enabled" : "Enable this option"}
                              </label>
                            </div>
                          )}
                          
                          {/* RADIO buttons */}
                          {varType === "radio" && variable.options && (
                            <RadioGroup
                              value={currentValue || String(variable.defaultValue || "")}
                              onValueChange={(val) =>
                                setVariableValues((prev) => ({
                                  ...prev,
                                  [varName]: val,
                                }))
                              }
                              className="space-y-2"
                              data-testid={`radio-variable-${variable.id}`}
                            >
                              {variable.options.map((opt, optIdx) => (
                                <div key={optIdx} className="flex items-center gap-2">
                                  <RadioGroupItem
                                    value={opt.promptValue}
                                    id={`${varName}-${optIdx}`}
                                  />
                                  <label
                                    htmlFor={`${varName}-${optIdx}`}
                                    className="text-xs text-foreground cursor-pointer"
                                  >
                                    {opt.visibleName || opt.promptValue}
                                  </label>
                                </div>
                              ))}
                            </RadioGroup>
                          )}
                          
                          {/* Reference image upload (for any type) */}
                          {variable.allowReferenceImage && (
                            <div className="flex items-center gap-2 mt-2">
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={(el) => {
                                  fileInputRefs.current[varName] = el;
                                }}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file)
                                    handleReferenceImageUpload(varName, file);
                                }}
                                data-testid={`input-file-${variable.id}`}
                              />
                              {referenceImages[varName] ? (
                                <div className="relative w-8 h-8 rounded-md overflow-hidden border border-border group shrink-0">
                                  <img
                                    src={referenceImages[varName]}
                                    alt="Reference"
                                    className="w-full h-full object-cover"
                                  />
                                  <button
                                    onClick={() =>
                                      removeReferenceImage(varName)
                                    }
                                    className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                                    data-testid={`button-remove-ref-${variable.id}`}
                                  >
                                    <X className="h-3 w-3 text-white" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() =>
                                    fileInputRefs.current[varName]?.click()
                                  }
                                  className="w-8 h-8 rounded-md border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center shrink-0 transition-colors"
                                  data-testid={`button-add-ref-${variable.id}`}
                                >
                                  <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                                </button>
                              )}
                              <span className="text-xs text-muted-foreground">Add reference</span>
                            </div>
                          )}
                        </div>
                      );
                    })}

                  <Separator className="my-2" />

                  <div className="space-y-1.5">
                    <Label className="text-xs">Aspect ratio</Label>
                    <div className="grid grid-cols-5 gap-1">
                      {ASPECT_RATIOS.map((ratio) => (
                        <Button
                          key={ratio.value}
                          variant={
                            aspectRatio === ratio.value ? "default" : "outline"
                          }
                          size="sm"
                          className="h-7 text-xs px-1"
                          onClick={() => setAspectRatio(ratio.value)}
                          data-testid={`button-ratio-${ratio.value}`}
                        >
                          {ratio.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 min-h-[3.25rem] flex flex-col justify-center">
                    <Label className="text-xs">Resolution</Label>
                    <div className="grid grid-cols-3 gap-1">
                      {["1K", "2K", "4K"].map((res) => (
                        <Button
                          key={res}
                          variant={resolution === res ? "default" : "outline"}
                          size="sm"
                          className="h-7 text-xs min-w-0 w-full"
                          onClick={() => setResolution(res)}
                          data-testid={`button-resolution-${res}`}
                        >
                          {res}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {isFreeShowcase && publicPromptText ? (
              <Card className="border-0 bg-card/50">
                <CardContent className="p-3 space-y-3">
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      data-testid="button-save"
                    >
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card className="border-0 bg-card/50 min-h-[12rem] flex flex-col">
                  <CardHeader className="p-3 pb-2 shrink-0">
                    <CardTitle className="text-sm">Current Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 space-y-2 flex-1 min-h-0">
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Model</span>
                        <span className="font-mono text-foreground">
                          Nano Banana Pro
                        </span>
                      </div>
                    </div>

                    {/* Chain Selection */}
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Payment Chain
                      </Label>
                      <Select
                        value={selectedChain}
                        onValueChange={(value) => setSelectedChain(value as ChainKey)}
                        disabled={isGenerating || isPaymentPending}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="base-sepolia">Base Sepolia</SelectItem>
                          <SelectItem value="base">Base Mainnet</SelectItem>
                          <SelectItem value="ethereum-sepolia">Ethereum Sepolia</SelectItem>
                          <SelectItem value="ethereum">Ethereum Mainnet</SelectItem>
                        </SelectContent>
                      </Select>
                      {selectedChainBalance && (
                        <div className="text-xs text-muted-foreground">
                          Balance: {selectedChainBalance.displayBalance} {selectedChainBalance.symbol}
                          {!selectedChainBalance.hasSufficientBalance && (
                            <span className="text-destructive ml-2">(Insufficient)</span>
                          )}
                        </div>
                      )}
                    </div>

                    <Button
                      className="w-full h-9"
                      data-testid="button-create"
                      onClick={handleCreateNow}
                      disabled={
                        isGenerating ||
                        isPaymentPending ||
                        (selectedChainBalance && !selectedChainBalance.hasSufficientBalance) ||
                        (isFreePromptMode && !freePromptDraft.trim())
                      }
                    >
                      {isGenerating || isPaymentPending ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                          {isPaymentPending ? "Processing Payment..." : "Generating..."}
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3.5 w-3.5 mr-2" />
                          Create Now
                        </>
                      )}
                    </Button>
                    <div className="pt-1 h-6 flex items-center justify-center gap-1 shrink-0 w-full overflow-hidden" aria-live="polite">
                      <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1 min-w-0 max-w-full">
                        {estimateCost != null ? (
                          <>
                            <span className="tabular-nums whitespace-nowrap shrink-0">
                              Estimated cost: <span className="min-w-[5rem] inline-block text-left">${estimateCost.toFixed(4)}</span>
                            </span>
                            <TooltipProvider>
                              <Tooltip delayDuration={200}>
                                <TooltipTrigger asChild>
                                  <span className="text-[10px] text-muted-foreground/70 cursor-help border-b border-dotted border-muted-foreground/50 shrink-0">
                                    Live API
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-[240px] text-xs">
                                  <p>Includes image generation + prompt enhancement (AI improves your text before generating).</p>
                                  <p className="mt-1 text-muted-foreground">Price from current API rates; updates in real time when you change resolution or enhancement.</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </>
                        ) : (
                          <span className="invisible tabular-nums">$0.0000</span>
                        )}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <X402LinkSection
                  settings={{
                    model: "nano-banana-pro",
                    aspectRatio,
                    resolution,
                  }}
                  promptId={promptId}
                  pricePerGeneration={pricePerGeneration}
                />
              </>
            )}
          </div>
        </ScrollArea>
        </div>

        {/* Right side: [ Image + Comments ] | [ Your creations ]; Comments only under image, Your creations own scroll */}
        <div className="flex flex-1 min-h-0 min-w-0">
          {/* Column A: Image on top, Comments below (right edge = divider to Your creations) */}
          <div className="flex-1 flex flex-col min-h-0 min-w-0 overflow-y-auto">
        <div className="flex-1 flex flex-col min-h-0 min-w-0 self-stretch overflow-hidden" style={{ minHeight: "100%" }}>
        {(() => {
          const hasGen = !!generatedImageUrl;
          const scCount = hasGen ? 2 : 4;
          const scLen = showcaseImages?.length ? Math.min(showcaseImages.length, scCount) : scCount;
          const totalImageCount = hasGen ? 1 + scLen : scLen;
          const isSingleImage = totalImageCount === 1;
          const imageContent = (() => {
              const yourGeneratedNode = generatedImageUrl ? (
                <div
                  key="your-generated"
                  className="aspect-video bg-muted rounded-sm overflow-hidden border-2 border-primary/50 relative group min-w-0"
                  onClick={() => setLightboxImage(generatedImageUrl)}
                  data-testid="your-generated-image"
                >
                  <img
                    src={generatedImageUrl}
                    alt="Your generated image"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5">
                    <p className="text-xs font-medium text-white">Your generated image</p>
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="h-6 w-6 text-white" />
                  </div>
                </div>
              ) : null;

              const showcaseCount = generatedImageUrl ? 2 : 4;
              const showcaseNodes = showcaseImages && showcaseImages.length > 0
                ? showcaseImages.slice(0, showcaseCount).map((img, idx) => {
                    const displayUrl = img.thumbnail || img.url;
                    const fullUrl = img.url;
                    return (
                      <div
                        key={idx}
                        className="aspect-square bg-muted rounded-sm overflow-hidden border-[0.5px] border-border hover-elevate cursor-zoom-in relative group min-w-0"
                        onClick={() => fullUrl && setLightboxImage(fullUrl)}
                        data-testid={`generated-image-${idx}`}
                      >
                        {displayUrl && (
                          <img
                            src={displayUrl}
                            alt={`Showcase image ${idx + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextElementSibling?.classList.remove("hidden");
                            }}
                          />
                        )}
                        <div className="hidden absolute inset-0 flex items-center justify-center bg-muted">
                          <div className="text-center">
                            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                            <p className="text-xs text-muted-foreground">Image {idx + 1}</p>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    );
                  })
                : [1, 2, 3, 4].slice(0, showcaseCount).map((idx) => {
                    const variationUrl = imageUrl
                      ? `${imageUrl.replace("w=800", "w=400").replace("h=800", "h=400")}&variant=${idx}`
                      : undefined;
                    return (
                      <div
                        key={idx}
                        className="aspect-square bg-muted rounded-sm overflow-hidden border-[0.5px] border-border hover-elevate cursor-zoom-in relative group min-w-0"
                        onClick={() => imageUrl && setLightboxImage(imageUrl)}
                        data-testid={`generated-image-${idx}`}
                      >
                        <img
                          src={variationUrl}
                          alt={`Variation ${idx}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling?.classList.remove("hidden");
                          }}
                        />
                        <div className="hidden absolute inset-0 flex items-center justify-center bg-muted">
                          <div className="text-center">
                            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                            <p className="text-xs text-muted-foreground">Image {idx}</p>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    );
                  });

              const allNodes = yourGeneratedNode ? [yourGeneratedNode, ...showcaseNodes] : showcaseNodes;
              const n = allNodes.length;
              if (n === 0) return null;

              if (n === 1) {
                return (
                  <div className="flex items-center justify-center w-full h-full min-h-0 overflow-hidden">
                    <div className="flex items-center justify-center w-full h-full max-w-full max-h-full [&>*]:max-w-full [&>*]:max-h-full [&>*]:min-w-0 [&>*]:min-h-0 [&_img]:object-contain [&_img]:max-w-full [&_img]:max-h-full [&_img]:w-auto [&_img]:h-auto">
                      {allNodes[0]}
                    </div>
                  </div>
                );
              }
              if (n === 2) {
                return (
                  <div className="flex items-center justify-center w-full">
                    <div className="grid grid-cols-2 gap-1 w-fit mx-auto">
                      {allNodes.map((node, i) => (
                        <div key={i} className="min-w-0">{node}</div>
                      ))}
                    </div>
                  </div>
                );
              }
              if (n === 3) {
                return (
                  <div className="flex items-center justify-center w-full">
                    <div className="grid grid-cols-2 gap-1 w-fit mx-auto">
                      {allNodes.slice(0, 2).map((node, i) => (
                        <div key={i} className="min-w-0">{node}</div>
                      ))}
                      <div key={2} className="col-span-2 flex justify-center min-w-0">{allNodes[2]}</div>
                    </div>
                  </div>
                );
              }
              if (n === 4) {
                return (
                  <div className="flex items-center justify-center w-full">
                    <div className="grid grid-cols-2 gap-1 w-fit mx-auto">
                      {allNodes.map((node, i) => (
                        <div key={i} className="min-w-0">{node}</div>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <div className="flex items-center justify-center w-full">
                  <div className="grid grid-cols-2 gap-1 w-fit max-w-full mx-auto">
                    {allNodes.map((node, i) => (
                      <div key={i} className="min-w-0">{node}</div>
                    ))}
                  </div>
                </div>
              );
          })();
          return isSingleImage ? (
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="p-3 flex flex-col flex-1 min-h-0 overflow-hidden h-full">
                <div className="flex-1 flex items-center justify-center min-h-0 overflow-hidden w-full">
                  {imageContent}
                </div>
              </div>
            </div>
          ) : (
            <ScrollArea className="flex-1 min-h-0 overflow-y-auto">
              <div className="p-3 flex flex-col flex-1 min-h-0">
                <div className="flex-1 flex items-center justify-center min-h-0 w-full">
                  {imageContent}
                </div>
              </div>
            </ScrollArea>
          );
        })()}
        </div>

        {/* Comments: only under image; right border aligns with Your creations divider */}
        <div ref={commentsSectionRef} className="shrink-0 border-t border-border/50 relative z-0">
            <div className="p-3">
              <Card className="border-0 bg-card/50">
                <CardHeader className="p-3 pb-2 shrink-0">
                  <CardTitle className="text-lg font-serif">Comments</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 flex flex-col">
                  <div className="space-y-3 pr-2">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex gap-2"
                        data-testid={`comment-${comment.id}`}
                      >
                        <Avatar className="h-6 w-6 shrink-0">
                          <AvatarFallback className="text-[10px] bg-primary/20 text-primary">
                            {comment.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-foreground">
                              {comment.username}
                            </span>
                            <span className="text-[10px] text-muted-foreground">
                              {comment.createdAt}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {hasGeneratedFromThisArtwork ? (
                    <div className="flex gap-2 mt-3 shrink-0">
                      <Textarea
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="min-h-[36px] h-9 text-xs resize-none py-2"
                        data-testid="input-comment"
                      />
                      <Button
                        size="sm"
                        className="h-9 px-3"
                        data-testid="button-send-comment"
                      >
                        <Send className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground italic mt-3 shrink-0">
                      Generate an image from this artwork to comment
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
        </div>
          </div>

        {/* Your creations – own column, infinite scroll, spacing from divider */}
        <div className="w-[16.8rem] shrink-0 flex flex-col min-h-0 overflow-y-auto relative z-0">
        <ScrollArea className="flex-1 min-h-0 flex flex-col">
          <div className="p-3 pl-5 flex flex-col h-full min-h-0">
            <h3 className="text-lg font-semibold font-serif text-foreground mb-3 shrink-0">Your creations</h3>
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
              {myCreations.length === 0 ? (
                <p className="text-xs text-muted-foreground italic text-center py-8" data-testid="creations-empty-state">
                  Ready for some prompt magic!
                </p>
              ) : (
                <>
                  <ScrollArea className="flex-1 min-h-0 pr-2">
                    <div className="space-y-2">
                      {myCreations.map((gen) => {
                        const imgUrl = Array.isArray(gen.image_urls) && gen.image_urls.length > 0 ? gen.image_urls[0] : null;
                        const isSelected = selectedCreationId === gen.id;
                        return (
                          <div
                            key={gen.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedCreationId(isSelected ? null : gen.id)}
                            onKeyDown={(e) => e.key === "Enter" && setSelectedCreationId(isSelected ? null : gen.id)}
                            className={`rounded-sm overflow-hidden border-2 transition-colors cursor-pointer ${
                              isSelected ? "border-primary ring-1 ring-primary/30" : "border-border hover:border-primary/50"
                            }`}
                            data-testid={`creation-${gen.id}`}
                          >
                            <div className="aspect-square bg-muted relative">
                              {imgUrl ? (
                                <img
                                  src={imgUrl}
                                  alt="Creation"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                  {selectedCreation && (
                    <div className="mt-3 pt-3 border-t border-border/50 shrink-0 space-y-1.5">
                      <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Variables used</p>
                      <div className="space-y-1 text-sm text-foreground">
                        {Array.isArray(selectedCreation.variable_values) && selectedCreation.variable_values.length > 0
                          ? selectedCreation.variable_values.map((v: { variableName: string; value: string | number | boolean | string[] }) => (
                              <div key={String(v.variableName)} className="flex gap-2">
                                <span className="text-muted-foreground shrink-0 text-sm">{v.variableName}:</span>
                                <span className="truncate">
                                  {Array.isArray(v.value) ? v.value.join(", ") : String(v.value)}
                                </span>
                              </div>
                            ))
                          : (
                            <p className="text-muted-foreground italic">No variables</p>
                          )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </ScrollArea>
        </div>
      </div>
      </div>

      <ImageLightbox
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        imageUrl={lightboxImage || ""}
      />

      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Generation Complete!</DialogTitle>
            <DialogDescription>
              Your image has been generated and saved to your gallery.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {generatedImageUrl ? (
              <div className="relative w-full flex items-center justify-center min-h-[300px] max-h-[80vh] bg-muted rounded-lg overflow-hidden">
                <img
                  src={generatedImageUrl}
                  alt="Generated image"
                  className="w-auto h-auto max-w-full max-h-full object-contain"
                />
              </div>
            ) : (
              <div className="relative w-full flex items-center justify-center min-h-[300px] max-h-[80vh] bg-muted rounded-lg overflow-hidden">
                <Loader2 className="h-12 w-12 text-muted-foreground animate-spin" />
              </div>
            )}
            {finalPromptFilled && (
              <div className="rounded-md bg-muted/50 p-3">
                <p className="text-xs font-medium text-muted-foreground mb-1">Prompt (with your variables):</p>
                <p className="text-sm text-foreground font-mono whitespace-pre-wrap break-words">{finalPromptFilled}</p>
              </div>
            )}
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => setShowSuccessModal(false)}
              >
                Close
              </Button>
              <Button
                onClick={handleDownloadImage}
                disabled={!generatedImageUrl}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
