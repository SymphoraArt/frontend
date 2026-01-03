"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import ImageLightbox from "./ImageLightbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import type { Variable } from "./PromptEditor";

const ASPECT_RATIOS = [
  { value: "1:1", label: "1:1" },
  { value: "16:9", label: "16:9" },
  { value: "9:16", label: "9:16" },
  { value: "4:3", label: "4:3" },
  { value: "3:4", label: "3:4" },
];

interface VariationSettings {
  evil: number;
  cameraEffects: string[];
  aspectRatio: string;
  model: string;
  resolution: string;
}

interface X402Settings {
  evil: number;
  middleFinger: boolean;
  cameraEffects: string[];
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
      evil: settings.evil,
      middleFinger: settings.middleFinger,
      cameraEffects: settings.cameraEffects,
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
  isFreeShowcase?: boolean;
  publicPromptText?: string;
}

export default function GeneratorInterface({
  promptId,
  title = "Untitled Prompt",
  artistName = "Unknown Artist",
  artistId,
  imageUrl,
  isFreeShowcase = false,
  publicPromptText,
}: GeneratorInterfaceProps) {
  const router = useRouter();
  const [evilSlider, setEvilSlider] = useState([75]);
  const [cameraEffects, setCameraEffects] = useState<string[]>([]);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [resolution, setResolution] = useState("2K");
  const [middleFinger, setMiddleFinger] = useState(false);
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

  const { data: promptVariables = [] } = useQuery<Variable[]>({
    queryKey: [`/api/prompts/${promptId}/variables`],
    enabled: !!promptId,
  });

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

  const CAMERA_EFFECTS = [
    { value: "cinematic", label: "Cinematic lighting" },
    { value: "warm", label: "Warm lighting" },
    { value: "dystopian", label: "Dystopian grey" },
  ];

  const toggleCameraEffect = (effect: string) => {
    setCameraEffects((prev) =>
      prev.includes(effect)
        ? prev.filter((e) => e !== effect)
        : [...prev, effect]
    );
  };

  const [variations] = useState<Variation[]>([
    {
      id: "v1",
      imageUrl: `${imageUrl}&v=1`,
      settings: {
        evil: 80,
        cameraEffects: ["cinematic"],
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
        evil: 65,
        cameraEffects: ["warm"],
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
        evil: 90,
        cameraEffects: ["dystopian"],
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
        evil: 55,
        cameraEffects: ["cinematic", "warm"],
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
        evil: 70,
        cameraEffects: [],
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
  const effectsCost = cameraEffects.length * 5;
  const imageUploadCost = 20;
  const premiumCost = 50;
  const totalCost =
    baseCost + resolutionCost + effectsCost + imageUploadCost + premiumCost;

  const handleVariationSelect = (variation: Variation) => {
    setSelectedVariation(variation.id);
    setEvilSlider([variation.settings.evil]);
    setCameraEffects(variation.settings.cameraEffects);
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
                  <CardTitle className="text-sm">Settings</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs">Evil</Label>
                      <span className="text-xs font-mono text-muted-foreground">
                        {evilSlider[0]}%
                      </span>
                    </div>
                    <Slider
                      value={evilSlider}
                      onValueChange={setEvilSlider}
                      max={100}
                      step={1}
                      className="h-1"
                      data-testid="slider-evil"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="finger"
                      checked={middleFinger}
                      onCheckedChange={(checked) =>
                        setMiddleFinger(checked as boolean)
                      }
                      className="h-3.5 w-3.5"
                      data-testid="checkbox-finger"
                    />
                    <Label
                      htmlFor="finger"
                      className="text-xs font-normal cursor-pointer"
                    >
                      Middle finger
                    </Label>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">Camera Effects</Label>
                    <div className="space-y-1.5">
                      {CAMERA_EFFECTS.map((effect) => (
                        <div
                          key={effect.value}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`effect-${effect.value}`}
                            checked={cameraEffects.includes(effect.value)}
                            onCheckedChange={() =>
                              toggleCameraEffect(effect.value)
                            }
                            className="h-3.5 w-3.5"
                            data-testid={`checkbox-effect-${effect.value}`}
                          />
                          <Label
                            htmlFor={`effect-${effect.value}`}
                            className="text-xs font-normal cursor-pointer"
                          >
                            {effect.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Variables (Everyday object etc.) - directly under Camera Effects */}
                  {promptVariables.length > 0 &&
                    promptVariables.map((variable) => (
                      <div key={variable.id} className="space-y-1.5">
                        <Label className="text-xs text-foreground">
                          {variable.label}
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            value={
                              variableValues[variable.id] ||
                              (variable.defaultValue as string) ||
                              ""
                            }
                            onChange={(e) =>
                              setVariableValues((prev) => ({
                                ...prev,
                                [variable.id]: e.target.value,
                              }))
                            }
                            placeholder={`Enter ${variable.label.toLowerCase()}...`}
                            className="h-8 text-xs flex-1"
                            data-testid={`input-variable-${variable.id}`}
                          />
                          {variable.allowReferenceImage && (
                            <>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={(el) => {
                                  fileInputRefs.current[variable.id] = el;
                                }}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file)
                                    handleReferenceImageUpload(
                                      variable.id,
                                      file
                                    );
                                }}
                                data-testid={`input-file-${variable.id}`}
                              />
                              {referenceImages[variable.id] ? (
                                <div className="relative w-8 h-8 rounded-md overflow-hidden border border-border group shrink-0">
                                  <img
                                    src={referenceImages[variable.id]}
                                    alt="Reference"
                                    className="w-full h-full object-cover"
                                  />
                                  <button
                                    onClick={() =>
                                      removeReferenceImage(variable.id)
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
                                    fileInputRefs.current[variable.id]?.click()
                                  }
                                  className="w-8 h-8 rounded-md border-2 border-dashed border-border hover:border-primary/50 flex items-center justify-center shrink-0 transition-colors"
                                  data-testid={`button-add-ref-${variable.id}`}
                                >
                                  <Plus className="h-3.5 w-3.5 text-muted-foreground" />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                        {variable.description && (
                          <p className="text-[10px] text-muted-foreground">
                            {variable.description}
                          </p>
                        )}
                      </div>
                    ))}

                  <Separator className="my-2" />

                  <div className="space-y-1.5">
                    <Label className="text-xs">Model</Label>
                    <Select value="nano-banana-pro" disabled>
                      <SelectTrigger
                        className="h-8 text-xs opacity-50 cursor-not-allowed"
                        data-testid="select-model"
                      >
                        <SelectValue placeholder="Nano Banana Pro" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nano-banana-pro">
                          Nano Banana Pro
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

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
                        <span className="text-muted-foreground">Evil</span>
                        <span className="font-mono text-foreground">
                          {evilSlider[0]}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Middle Finger
                        </span>
                        <span className="font-mono text-foreground">
                          {middleFinger ? "Yes" : "No"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Camera Effects
                        </span>
                        <span className="font-mono text-foreground">
                          {cameraEffects.length > 0
                            ? cameraEffects.join(", ")
                            : "None"}
                        </span>
                      </div>
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

                    <Button className="w-full h-9" data-testid="button-create">
                      <Sparkles className="h-3.5 w-3.5 mr-2" />
                      Create Now
                    </Button>
                  </CardContent>
                </Card>

                <X402LinkSection
                  settings={{
                    evil: evilSlider[0],
                    middleFinger,
                    cameraEffects,
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

        <ScrollArea className="flex-1">
          <div className="p-3">
            <div className="grid grid-cols-2 gap-1 max-w-2xl mx-auto">
              {[1, 2, 3, 4].map((idx) => {
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

            <div className="border-t border-border/50 mt-4 pt-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Comments
                </span>
                <Badge variant="secondary" className="text-xs">
                  {comments.length}
                </Badge>
              </div>

              <div className="space-y-3 mb-3">
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
                <div className="flex gap-2">
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
                <p className="text-xs text-muted-foreground italic">
                  Generate an image from this artwork to comment
                </p>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="w-20 lg:w-24 border-l border-border/50 bg-card/30 shrink-0 flex flex-col overflow-hidden">
          <div className="p-2 border-b border-border/50 shrink-0">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              History
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-1.5 space-y-1.5">
            {variations.map((variation) => (
              <div
                key={variation.id}
                className={`relative aspect-square rounded-sm overflow-hidden cursor-pointer transition-all ${
                  selectedVariation === variation.id
                    ? "ring-2 ring-primary ring-offset-1 ring-offset-background"
                    : "hover:opacity-80"
                }`}
                onClick={() => handleVariationSelect(variation)}
                data-testid={`variation-${variation.id}`}
              >
                <img
                  src={variation.imageUrl}
                  alt={`Variation ${variation.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1">
                  <p className="text-[8px] text-white/80 text-center">
                    {variation.createdAt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ImageLightbox
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        imageUrl={lightboxImage || ""}
      />
    </div>
  );
}
