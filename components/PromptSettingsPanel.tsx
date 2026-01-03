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
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

type PromptType = "showcase" | "free-prompt" | "paid-prompt";

interface PromptSettings {
  title: string;
  category: string;
  tags: string[];
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
  const [newTag, setNewTag] = useState("");
  const [hoveredPhotoIndex, setHoveredPhotoIndex] = useState<number | null>(
    null
  );

  const addTag = () => {
    if (newTag.trim() && !settings.tags.includes(newTag.trim())) {
      onUpdate({ tags: [...settings.tags, newTag.trim()] });
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onUpdate({ tags: settings.tags.filter((t) => t !== tagToRemove) });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const maxPhotos = Math.min(settings.photoCount, 20);
    const remainingSlots = maxPhotos - settings.uploadedPhotos.length;
    if (remainingSlots <= 0) {
      return;
    }

    const filesToProcess = Array.from(files).slice(0, remainingSlots);

    filesToProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const currentPhotos = settings.uploadedPhotos;
        if (currentPhotos.length < maxPhotos) {
          onUpdate({ uploadedPhotos: [...currentPhotos, base64] });
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    onUpdate({
      uploadedPhotos: settings.uploadedPhotos.filter((_, i) => i !== index),
    });
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
                    <TooltipContent>
                      <p className="text-xs max-w-xs">
                        Zeige den Prompt nur zur Ansicht. Andere können ihn
                        nicht nutzen. Alle Variablen-Bearbeitungsfelder sind
                        deaktiviert.
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
                    <TooltipContent>
                      <p className="text-xs max-w-xs">
                        Dieser Prompt ist kostenlos nutzbar. Der vollständige
                        Text ist öffentlich sichtbar.
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
                    <TooltipContent>
                      <p className="text-xs max-w-xs">
                        Ermöglicht sofortige Generierung. Nutzer können Variable
                        anpassen und direkt Bilder erstellen.
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

          <div className="space-y-2">
            <Label className="text-xs">Tags</Label>
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTag()}
                placeholder="select tags..."
                className="h-8 text-sm flex-1"
                data-testid="input-new-tag"
              />
            </div>
            {settings.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {settings.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs gap-1"
                    data-testid={`badge-tag-${index}`}
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover-elevate rounded-full"
                      data-testid={`button-remove-tag-${index}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
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
          </div>

          {settings.promptType === "paid-prompt" && (
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Label htmlFor="price" className="text-xs">
                  Price per generation (USD)
                </Label>
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs max-w-xs">
                        Due to settings, minimum-price per generation is{" "}
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

                {settings.uploadedPhotos.length < settings.photoCount && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() =>
                      document.getElementById("photo-upload")?.click()
                    }
                    data-testid="button-upload-photo"
                  >
                    <Upload className="h-3 w-3 mr-2" />
                    Upload Photo
                  </Button>
                )}

                <input
                  id="photo-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoUpload}
                />

                {settings.uploadedPhotos.length > 0 && (
                  <div className="relative h-32 mt-2">
                    {settings.uploadedPhotos.map((photo, index) => (
                      <div
                        key={index}
                        className="absolute top-0 left-0 w-full transition-all duration-300"
                        style={{
                          transform: `translateY(${index === hoveredPhotoIndex ? index * 8 : index * 4}px)`,
                          zIndex: settings.uploadedPhotos.length - index,
                        }}
                        onMouseEnter={() => setHoveredPhotoIndex(index)}
                        onMouseLeave={() => setHoveredPhotoIndex(null)}
                        data-testid={`photo-preview-${index}`}
                      >
                        <div className="relative bg-card border rounded-md overflow-hidden hover-elevate">
                          <img
                            src={photo}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-24 object-cover"
                          />
                          {hoveredPhotoIndex === index && (
                            <button
                              onClick={() => removePhoto(index)}
                              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 hover-elevate"
                              data-testid={`button-delete-photo-${index}`}
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                            Photo {index + 1}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
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
