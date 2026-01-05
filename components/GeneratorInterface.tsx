"use client";

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
import { useQuery } from "@tanstack/react-query";
import type { Variable } from "./PromptEditor";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Download, Loader2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
}: {
  settings: X402Settings;
  promptId?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const x402Config = {
    endpoint: `/api/generate/${promptId || "prompt-id"}`,
    price: "0.05",
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
  publicPromptText?: string;
}

export default function GeneratorInterface({
  promptId,
  title = "Untitled Prompt",
  artistName = "Unknown Artist",
  artistId,
  imageUrl,
  showcaseImages = [],
  isFreeShowcase = false,
  publicPromptText,
}: GeneratorInterfaceProps) {
  const router = useRouter();
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [resolution, setResolution] = useState("2K");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
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
  const { toast } = useToast();

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

  const promptVariables = useMemo(() => {
    return promptData?.prompt?.promptData?.variables || [];
  }, [promptData]);

  useEffect(() => {
    if (promptVariables.length > 0) {
      setVariableValues({});
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
    if (!promptId) {
      toast({
        title: "Error",
        description: "Prompt ID is required",
        variant: "destructive",
      });
      return;
    }

    const userIdToUse = "695a2e2b0cbd6b395af5d725";

    setIsGenerating(true);
    setGeneratedImageUrl(null);
    setShowSuccessModal(false);
    setGenerationId(null);

    try {
      const variableValuesArray = promptVariables
        .map((variable) => {
          const varName = variable.name || variable.id;
          const value = variableValues[varName] || variable.defaultValue || "";
          return value ? { variableName: varName, value } : null;
        })
        .filter(
          (v): v is { variableName: string; value: string } => v !== null
        );

      const generationRequest = {
        userId: userIdToUse,
        promptId: promptId,
        variableValues: variableValuesArray,
        usedSettings: {
          aspectRatio: aspectRatio,
          resolution: resolution,
        },
      };

      const generationResponse = await fetch("/api/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(generationRequest),
      });

      if (!generationResponse.ok) {
        const errorData = await generationResponse.json();
        throw new Error(errorData.error || "Failed to create generation");
      }

      const generationData = await generationResponse.json();
      const newGenerationId = generationData.id;
      setGenerationId(newGenerationId);

      const decryptResponse = await fetch(
        `/api/generations/${newGenerationId}?decrypt=true`
      );

      if (!decryptResponse.ok) {
        throw new Error("Failed to decrypt final prompt");
      }

      const decryptData = await decryptResponse.json();
      const finalPrompt = decryptData.generation?.finalPrompt;

      if (!finalPrompt) {
        throw new Error("Final prompt not found");
      }

      const imageRequest = {
        prompt: finalPrompt,
        aspectRatio: aspectRatio,
        resolution: resolution,
      };

      const imageResponse = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageRequest),
      });

      if (!imageResponse.ok) {
        const errorData = await imageResponse.json();
        throw new Error(errorData.error || "Failed to generate image");
      }

      const imageData = await imageResponse.json();
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
            generatedImage: {
              url: imageData.imageUrl,
              createdAt: new Date().toISOString(),
            },
          }),
        }
      );

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        console.warn("Generation status update failed:", errorData);
      }

      setShowSuccessModal(true);
    } catch (error: any) {
      toast({
        title: "Generation Failed",
        description:
          error.message || "An error occurred while generating the image",
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

  const [comments] = useState<Comment[]>([
    {
      id: "c1",
      username: "ArtLover42",
      content: "Love the color scheme on this one!",
      createdAt: "1h ago",
    },
    {
      id: "c2",
      username: "PixelMaster",
      content: "The lighting effects are incredible",
      createdAt: "3h ago",
    },
  ]);

  const [hasGeneratedFromThisArtwork] = useState(true);

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
    <div className="h-[calc(100vh-4rem)] flex flex-col">
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
            onClick={() => router.push(`/artist/${artistId}`)}
            data-testid="text-artist-link"
          >
            by {artistName}
          </p>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <ScrollArea className="w-[22rem] shrink-0 border-r border-border/50">
          <div className="p-3 space-y-3">
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
            ) : (
              <Card className="border-0 bg-card/50">
                <CardHeader className="p-3 pb-2">
                  <CardTitle className="text-sm">Variables</CardTitle>
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
                          <Label className="text-md text-foreground">
                            {variable.label}
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
                                  : `Enter ${variable.label.toLowerCase()}...`
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
                                <SelectValue placeholder={`Select ${variable.label.toLowerCase()}...`} />
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
                          
                          {/* CHECKBOX toggle */}
                          {varType === "checkbox" && (
                            <div className="flex items-center gap-2">
                              <Checkbox
                                id={varName}
                                checked={currentValue === "true" || currentValue === "1"}
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

                  <div className="space-y-1.5">
                    <Label className="text-xs">Resolution</Label>
                    <div className="grid grid-cols-3 gap-1">
                      {["1K", "2K", "4K"].map((res) => (
                        <Button
                          key={res}
                          variant={resolution === res ? "default" : "outline"}
                          size="sm"
                          className="h-7 text-xs"
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
                      data-testid="button-like"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Like
                    </Button>
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
                <Card className="border-0 bg-card/50">
                  <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm">Current Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 space-y-2">
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Model</span>
                        <span className="font-mono text-foreground">
                          Nano Banana Pro
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Aspect Ratio
                        </span>
                        <span className="font-mono text-foreground">
                          {aspectRatio}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Resolution
                        </span>
                        <span className="font-mono text-foreground">
                          {resolution}
                        </span>
                      </div>
                    </div>

                    <Button
                      className="w-full h-9"
                      data-testid="button-create"
                      onClick={handleCreateNow}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3.5 w-3.5 mr-2" />
                          Create Now
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>

                <X402LinkSection
                  settings={{
                    model: "nano-banana-pro",
                    aspectRatio,
                    resolution,
                  }}
                  promptId={promptId}
                />
              </>
            )}
          </div>
        </ScrollArea>

        <ScrollArea className="flex-1 overflow-y-auto min-h-0">
          <div className="p-3">
            <div className="grid grid-cols-2 gap-1 max-w-2xl mx-auto">
              {showcaseImages && showcaseImages.length > 0
                ? showcaseImages.slice(0, 4).map((img, idx) => {
                    const displayUrl = img.thumbnail || img.url;
                    const fullUrl = img.url;
                    return (
                      <div
                        key={idx}
                        className="aspect-square bg-muted rounded-sm overflow-hidden border-[0.5px] border-border hover-elevate cursor-zoom-in relative group"
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
                              e.currentTarget.nextElementSibling?.classList.remove(
                                "hidden"
                              );
                            }}
                          />
                        )}
                        <div className="hidden absolute inset-0 flex items-center justify-center bg-muted">
                          <div className="text-center">
                            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                            <p className="text-xs text-muted-foreground">
                              Image {idx + 1}
                            </p>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    );
                  })
                : [1, 2, 3, 4].map((idx) => {
                    const variationUrl = imageUrl
                      ? `${imageUrl.replace("w=800", `w=400`).replace("h=800", "h=400")}&variant=${idx}`
                      : undefined;
                    return (
                      <div
                        key={idx}
                        className="aspect-square bg-muted rounded-sm overflow-hidden border-[0.5px] border-border hover-elevate cursor-zoom-in relative group"
                        onClick={() => imageUrl && setLightboxImage(imageUrl)}
                        data-testid={`generated-image-${idx}`}
                      >
                        <img
                          src={variationUrl}
                          alt={`Variation ${idx}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextElementSibling?.classList.remove(
                              "hidden"
                            );
                          }}
                        />
                        <div className="hidden absolute inset-0 flex items-center justify-center bg-muted">
                          <div className="text-center">
                            <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                            <p className="text-xs text-muted-foreground">
                              Image {idx}
                            </p>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </ScrollArea>

        <ScrollArea className="w-[22rem] shrink-0 border-l border-border/50">
          <div className="p-3">
            <Card className="border-0 bg-card/50 h-full flex flex-col">
              <CardHeader className="p-3 pb-2 shrink-0">
                <CardTitle className="text-sm">Comments</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 flex-1 flex flex-col min-h-0">
                <ScrollArea className="flex-1">
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
                </ScrollArea>
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
        </ScrollArea>
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
              Your image has been generated successfully.
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
