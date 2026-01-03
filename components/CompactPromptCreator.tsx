import { useState, useRef, useEffect, useCallback } from "react";
import { Zap, Plus, Search, X, Star, Heart, ImageIcon } from "lucide-react";
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

interface Variable {
  id: string;
  name: string;
  defaultValue: string;
  currentValue: string;
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Extract variables from [variable] syntax
  useEffect(() => {
    const regex = /\[([^\]]+)\]/g;
    const foundNames: string[] = [];
    let match;
    while ((match = regex.exec(promptText)) !== null) {
      foundNames.push(match[1]);
    }

    setVariables((prev) => {
      const existingNames = prev.map((v) => v.name);
      const newVars = foundNames
        .filter((name) => !existingNames.includes(name))
        .map((name) => ({
          id: crypto.randomUUID(),
          name,
          defaultValue: "",
          currentValue: "",
        }));

      const filtered = prev.filter((v) => foundNames.includes(v.name));
      return [...filtered, ...newVars];
    });
  }, [promptText]);

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
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-3xl">
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-2xl overflow-hidden">
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

          <div className="flex">
            {/* Text Input Area */}
            <div className="flex-1 p-3">
              <Textarea
                ref={textareaRef}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                onMouseUp={handleTextSelect}
                onKeyUp={handleTextSelect}
                placeholder="Describe your image... Use [variable] syntax to create variables"
                className="min-h-[80px] max-h-[120px] resize-none border-0 bg-transparent focus-visible:ring-0 text-sm"
                data-testid="input-compact-prompt"
              />
            </div>

            {/* Variables Panel */}
            {variables.length > 0 && (
              <div className="w-48 border-l border-border p-2 flex flex-col gap-1.5">
                {variables.map((variable) => (
                  <div
                    key={variable.id}
                    className="px-2 py-1.5 rounded border-2 border-destructive/60 bg-destructive/10 text-xs"
                    data-testid={`variable-pill-${variable.name}`}
                  >
                    <span className="font-medium text-foreground">
                      {variable.name}
                    </span>
                    {variable.currentValue && (
                      <span className="text-muted-foreground ml-1">
                        : {variable.currentValue}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between px-3 py-2 border-t border-border bg-muted/30">
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
    </>
  );
}
