import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Plus } from "lucide-react";
import { useState, useCallback, useRef } from "react";

type PromptType = "showcase" | "free-prompt" | "paid-prompt";

interface PromptSettings {
  title: string;
  category: string;
  aiModel: string;
  price: number;
  aspectRatio: string | null;
  photoCount: number;
  promptType: PromptType;
  uploadedPhotos: string[];
  resolution: string | null;
  isFreeShowcase?: boolean;
}

interface PromptSettingsPanelProps {
  settings: PromptSettings;
  onUpdate: (updates: Partial<PromptSettings>) => void;
  useScrollArea?: boolean;
}

export default function PromptSettingsPanel({
  settings,
  onUpdate,
  useScrollArea = true,
}: PromptSettingsPanelProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dropTargetIndex, setDropTargetIndex] = useState<number | null>(null);
  const dragImageRef = useRef<HTMLDivElement | null>(null);

  const maxPhotos = Math.min(settings.photoCount, 20);
  const canAddMore = settings.uploadedPhotos.length < maxPhotos;

  const handlePhotoUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files) return;
      const remainingSlots = maxPhotos - settings.uploadedPhotos.length;
      if (remainingSlots <= 0) return;

      const filesToProcess = Array.from(files).slice(0, remainingSlots);
      const readAsDataURL = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

      Promise.all(filesToProcess.map(readAsDataURL)).then((newBase64) => {
        const combined = [...settings.uploadedPhotos, ...newBase64].slice(
          0,
          maxPhotos
        );
        onUpdate({ uploadedPhotos: combined });
      });
      e.target.value = "";
    },
    [
      maxPhotos,
      settings.uploadedPhotos,
      onUpdate,
    ]
  );

  const removePhoto = (index: number) => {
    onUpdate({
      uploadedPhotos: settings.uploadedPhotos.filter((_, i) => i !== index),
    });
  };

  const movePhoto = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    const list = [...settings.uploadedPhotos];
    const [removed] = list.splice(fromIndex, 1);
    list.splice(toIndex, 0, removed);
    onUpdate({ uploadedPhotos: list });
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    const photo = settings.uploadedPhotos[index];
    if (photo && e.dataTransfer) {
      const div = document.createElement("div");
      const size = 140;
      const h = Math.round(size * (4 / 3));
      div.style.cssText = `position:fixed;left:-9999px;width:${size}px;height:${h}px;border-radius:8px;overflow:hidden;border:2px solid hsl(var(--primary));box-shadow:0 12px 32px rgba(0,0,0,0.25);background:url(${photo}) center/cover;pointer-events:none;`;
      document.body.appendChild(div);
      e.dataTransfer.setDragImage(div, size / 2, Math.round(h * 0.88));
      dragImageRef.current = div;
    }
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDropTargetIndex(index);
  };

  const handleDragLeave = () => {
    setDropTargetIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    setDropTargetIndex(null);
    if (draggedIndex === null) return;
    movePhoto(draggedIndex, dropIndex);
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    if (dragImageRef.current?.parentNode) {
      document.body.removeChild(dragImageRef.current);
      dragImageRef.current = null;
    }
    setDraggedIndex(null);
    setDropTargetIndex(null);
  };

  const content = (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2 px-4">
          <CardTitle className="text-sm">PROMPT META</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-4 pb-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-xs">
              Title
            </Label>
            <Input
              id="title"
              value={settings.title}
              onChange={(e) => onUpdate({ title: e.target.value })}
              placeholder="Give title for your prompt"
              className="h-8 text-sm"
              data-testid="input-settings-title"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs">Prompt Type</Label>
            <RadioGroup
              value={settings.promptType}
              onValueChange={(value) =>
                onUpdate({ promptType: value as PromptType })
              }
              className="space-y-2"
              data-testid="radio-prompt-type"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="showcase"
                  id="showcase"
                  data-testid="radio-showcase"
                />
                <Label
                  htmlFor="showcase"
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  Showcase
                </Label>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-[240px]">
                      <p className="text-xs">
                        Display the prompt for viewing only. Others cannot use it. All variable editing fields are disabled.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="free-prompt"
                  id="free-prompt"
                  data-testid="radio-free-prompt"
                />
                <Label
                  htmlFor="free-prompt"
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  Free prompt
                </Label>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-[240px]">
                      <p className="text-xs">
                        This prompt is free to use. The full text is publicly visible.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="paid-prompt"
                  id="paid-prompt"
                  data-testid="radio-paid-prompt"
                />
                <Label
                  htmlFor="paid-prompt"
                  className="text-sm font-normal cursor-pointer flex-1"
                >
                  Paid prompt
                </Label>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-[240px]">
                      <p className="text-xs">
                        Enables instant generation. Users can adjust variables and create images directly.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-xs">
              Category
            </Label>
            <Select
              value={settings.category}
              onValueChange={(value) => onUpdate({ category: value })}
            >
              <SelectTrigger
                className="h-8 text-sm"
                data-testid="select-category"
              >
                <SelectValue placeholder="select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="art">Art</SelectItem>
                <SelectItem value="photography">Photography</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="illustration">Illustration</SelectItem>
                <SelectItem value="anime">Anime</SelectItem>
                <SelectItem value="3d">3D</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {settings.promptType === "paid-prompt" && (
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="price" className="text-xs">
                  Price (USD per creation)
                </Label>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-[240px]">
                      <p className="text-xs">
                        Due to settings, minimum-price per creation is{" "}
                        {settings.price.toFixed(4)} USD.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Input
                id="price"
                type="number"
                step="0.0001"
                min="0.0001"
                value={settings.price}
                onChange={(e) =>
                  onUpdate({
                    price: Math.max(
                      0.0001,
                      parseFloat(e.target.value) || 0.0001
                    ),
                  })
                }
                className="h-8 text-sm"
                data-testid="input-price"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2 px-4">
          <CardTitle className="text-sm">AI MODEL & PRICING</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 px-4 pb-4">
          <div className="space-y-2">
            <Label htmlFor="ai-model" className="text-xs">
              AI Model
            </Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-block w-full">
                  <Select value="nano-banana-pro" disabled>
                    <SelectTrigger
                      className="h-8 text-sm opacity-50 cursor-not-allowed"
                      data-testid="select-ai-model"
                    >
                      <SelectValue placeholder="Nano Banana Pro" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nano-banana-pro">Nano Banana Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                Nano Banana Pro is currently the only available model. Others will be released soon.
              </TooltipContent>
            </Tooltip>
          </div>
        </CardContent>
      </Card>

      {settings.aiModel === "gemini" &&
        settings.promptType === "paid-prompt" && (
          <Card>
            <CardHeader className="pb-2 px-4">
              <CardTitle className="text-sm">Gemini Assets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 px-4 pb-4">
              <div className="space-y-2">
                <Label htmlFor="photo-count" className="text-xs">
                  Photo Count
                </Label>
                <Select
                  value={settings.photoCount.toString()}
                  onValueChange={(value) => {
                    const newCount = Math.min(parseInt(value), 20);
                    onUpdate({ photoCount: newCount });
                    if (settings.uploadedPhotos.length > newCount) {
                      onUpdate({
                        uploadedPhotos: settings.uploadedPhotos.slice(
                          0,
                          newCount
                        ),
                      });
                    }
                  }}
                >
                  <SelectTrigger
                    className="h-8 text-sm"
                    data-testid="select-photo-count"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Photo" : "Photos"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

<div className="space-y-2">
                <Label className="text-xs">
                  Upload Photos ({settings.uploadedPhotos.length}/
                  {settings.photoCount})
                </Label>

                {/* Feste Höhe; "+" klein; Fotos wie Karten in der Hand – eine Reihe, dynamisch enger bei mehr */}
                <div className="flex flex-row items-center h-20 w-full overflow-hidden gap-0 min-h-20">
                  {/* "+" deutlich kleiner */}
                  <label
                    className={`flex-shrink-0 flex items-center justify-center rounded-lg border border-dashed transition-colors w-8 h-8 cursor-pointer select-none ${
                      canAddMore
                        ? "border-primary/50 bg-muted/50 hover:bg-muted hover:border-primary text-muted-foreground hover:text-primary"
                        : "border-muted bg-muted/30 text-muted-foreground cursor-not-allowed opacity-70"
                    }`}
                    data-testid="button-upload-photo"
                  >
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handlePhotoUpload}
                      disabled={!canAddMore}
                      aria-label="Upload photo"
                    />
                    <Plus className="h-4 w-4" />
                  </label>

                  {/* Fotos in einer Reihe; Drop-Indikator absolut → kein Wackeln */}
                  <div className="flex-1 flex flex-row items-center min-w-0 h-20 overflow-hidden pl-2">
                    {settings.uploadedPhotos.map((photo, index) => (
                      <div
                        key={index}
                        className="relative flex-1 min-w-0 h-full -mr-3 last:mr-0 flex items-stretch"
                      >
                        {/* Indikator als Overlay, nimmt kein Platz im Layout */}
                        {draggedIndex !== null && dropTargetIndex === index && (
                          <div
                            className="absolute left-0 top-0 bottom-0 w-2.5 rounded-md border-2 border-dashed border-primary bg-primary/25 shadow-[0_0_0_3px_hsl(var(--primary)/0.4)] animate-pulse z-[40] pointer-events-none"
                            aria-hidden
                          />
                        )}
                        <div
                          draggable
                          onDragStart={(ev) => handleDragStart(ev, index)}
                          onDragOver={(ev) => handleDragOver(ev, index)}
                          onDragLeave={handleDragLeave}
                          onDrop={(ev) => handleDrop(ev, index)}
                          onDragEnd={handleDragEnd}
                          className={`w-full h-full rounded-lg border-2 overflow-hidden bg-card transition-all duration-200 cursor-grab active:cursor-grabbing ${
                            dropTargetIndex === index && draggedIndex !== index
                              ? "border-primary ring-2 ring-primary/30 scale-[1.02] z-20"
                              : "border-border hover:border-primary/50"
                          } ${draggedIndex === index ? "opacity-60 scale-95 z-30" : ""} hover:-translate-y-1 hover:shadow-md hover:z-[25] hover:scale-[1.02]`}
                          style={{ zIndex: 10 + index }}
                          data-testid={`photo-preview-${index}`}
                        >
                          <div className="relative w-full h-full group">
                            <img
                              src={photo}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-full object-cover pointer-events-none"
                              draggable={false}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                            <button
                              type="button"
                              onClick={(ev) => {
                                ev.stopPropagation();
                                removePhoto(index);
                              }}
                              className="absolute top-0.5 right-0.5 rounded-full bg-destructive text-destructive-foreground p-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:opacity-100"
                              data-testid={`button-delete-photo-${index}`}
                              aria-label={`Remove photo ${index + 1}`}
                            >
                              <X className="h-2.5 w-2.5" />
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[9px] py-px text-center leading-tight">
                              {index + 1}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
    </div>
  );

  return useScrollArea ? (
    <ScrollArea className="h-full bg-transparent">{content}</ScrollArea>
  ) : (
    content
  );
}
