import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Trash2,
  X,
  Settings,
  FileText,
  Sparkles,
  List,
  ArrowLeft,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import PromptSettingsPanel from "./PromptSettingsPanel";

type VariableType =
  | "text"
  | "checkbox"
  | "multi-select"
  | "single-select"
  | "slider";
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

interface SelectOption {
  visibleName: string;
  promptValue: string;
}

export interface Variable {
  id: string;
  name: string;
  label: string;
  description: string;
  type: VariableType;
  defaultValue: string | number | boolean | string[];
  options?: SelectOption[];
  min?: number;
  max?: number;
  required: boolean;
  allowReferenceImage?: boolean;
  position: number;
  defaultOptionIndex?: number;
}

interface PromptEditorProps {
  onBack?: () => void;
}

export default function PromptEditor({ onBack }: PromptEditorProps = {}) {
  const [currentPromptId, setCurrentPromptId] = useState<string | null>(null);
  const [promptTitle, setPromptTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [variables, setVariables] = useState<Variable[]>([]);
  const [selectedVariableId, setSelectedVariableId] = useState<string | null>(
    null
  );
  const [caretPosition, setCaretPosition] = useState(0);
  const [selectedText, setSelectedText] = useState("");
  const [selectionRange, setSelectionRange] = useState<{
    start: number;
    end: number;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [unsavedVariableDialog, setUnsavedVariableDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [variableToDelete, setVariableToDelete] = useState<string | null>(null);
  const [openVariables, setOpenVariables] = useState<string[]>([]);
  const [newOptionInput, setNewOptionInput] = useState<Record<string, string>>(
    {}
  );
  const [showLoadDialog, setShowLoadDialog] = useState(false);

  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [aiModel, setAiModel] = useState("gemini");
  const [price, setPrice] = useState(0.0001);
  const [aspectRatio, setAspectRatio] = useState<string | null>(null);
  const [photoCount, setPhotoCount] = useState(1);
  const [promptType, setPromptType] = useState<PromptType>("paid-prompt");
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [resolution, setResolution] = useState<string | null>(null);
  const [isFreeShowcase, setIsFreeShowcase] = useState(false);
  const [showValidationDialog, setShowValidationDialog] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [linkOrCreateDialog, setLinkOrCreateDialog] = useState<{
    open: boolean;
    varName: string;
    selectedText: string;
    selectionRange: { start: number; end: number } | null;
  }>({ open: false, varName: "", selectedText: "", selectionRange: null });

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const isShowcase = promptType === "showcase";

  const { data: savedPrompts = [] } = useQuery<any[]>({
    queryKey: ["/api/prompts"],
    enabled: showLoadDialog,
  });

  const getCaretCoordinates = (
    element: HTMLTextAreaElement,
    position: number
  ) => {
    // Create mirror div
    const div = document.createElement("div");
    const style = window.getComputedStyle(element);
    const properties = [
      "fontFamily",
      "fontSize",
      "fontWeight",
      "letterSpacing",
      "lineHeight",
      "padding",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "borderWidth",
      "borderStyle",
      "borderLeftWidth",
      "borderRightWidth",
      "borderTopWidth",
      "borderBottomWidth",
      "boxSizing",
      "wordWrap",
      "whiteSpace",
      "width",
      "height",
    ];

    properties.forEach((prop) => {
      div.style[prop as any] = style[prop as any];
    });

    div.style.position = "absolute";
    div.style.visibility = "hidden";
    div.style.top = "0";
    div.style.left = "0";
    div.style.whiteSpace = "pre-wrap";
    div.style.wordWrap = "break-word";
    div.style.overflowWrap = "break-word";
    div.style.overflow = "hidden";

    document.body.appendChild(div);

    // Set text up to caret position
    const textBeforeCaret = element.value.substring(0, position);
    div.textContent = textBeforeCaret;

    // Add a span to measure caret position
    const span = document.createElement("span");
    span.textContent = "|";
    div.appendChild(span);

    const coordinates = {
      top: span.offsetTop,
      left: span.offsetLeft,
      height: span.offsetHeight,
    };

    document.body.removeChild(div);

    return coordinates;
  };

  const updateButtonPosition = useCallback(() => {
    if (!textareaRef.current || !selectionRange) {
      setButtonPosition(null);
      return;
    }

    // Get accurate caret position within textarea
    const coords = getCaretCoordinates(textareaRef.current, selectionRange.end);
    const textarea = textareaRef.current;

    // Position RELATIVE to textarea (for absolute positioning within parent)
    // Add padding offset (px-3 py-[11px] on textarea = 12px left, 11px top)
    let top = coords.top + coords.height + 11 + 8; // +8 for spacing below text
    let left = coords.left + 12; // Account for px-3 padding

    // Make sure button doesn't overflow the container
    const containerWidth = textarea.clientWidth;
    const buttonWidth = 120; // Increased for "+ Variable" text

    // Keep button within bounds with padding
    if (left + buttonWidth > containerWidth - 12) {
      left = Math.max(12, containerWidth - buttonWidth - 12);
    }

    // Also check if it goes off left edge
    if (left < 12) {
      left = 12;
    }

    setButtonPosition({ top, left });
  }, [selectionRange]);

  const handleTextSelection = () => {
    // Use requestAnimationFrame to get the final selection after browser updates
    requestAnimationFrame(() => {
      if (!textareaRef.current) return;

      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const selected = prompt.substring(start, end);

      if (selected && selected.trim().length > 0 && start !== end) {
        const isInsideVariable = checkIfInsideVariable(start, end);
        if (!isInsideVariable) {
          setSelectedText(selected);
          setSelectionRange({ start, end });
        } else {
          clearSelection();
        }
      } else {
        clearSelection();
      }
    });
  };

  const clearSelection = () => {
    setSelectedText("");
    setSelectionRange(null);
    setButtonPosition(null);
  };

  // Ref for the button to detect outside clicks
  const buttonRef = useRef<HTMLButtonElement>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Global mousedown listener to clear selection when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      // Don't clear if clicking on the button
      if (buttonRef.current?.contains(e.target as Node)) {
        return;
      }
      // Don't clear if clicking inside the editor container
      if (editorContainerRef.current?.contains(e.target as Node)) {
        return;
      }
      // Clear selection for clicks outside
      clearSelection();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const checkIfInsideVariable = (start: number, end: number): boolean => {
    const regex = /\[([^\]]+)\]/g;
    let match;

    while ((match = regex.exec(prompt)) !== null) {
      const varStart = match.index;
      const varEnd = match.index + match[0].length;

      if (
        (start >= varStart && start < varEnd) ||
        (end > varStart && end <= varEnd)
      ) {
        return true;
      }
    }
    return false;
  };

  const createNewEmptyVariable = (insertPosition?: number) => {
    const baseVarName = "NewVariable";
    let counter = 1;
    let varName = baseVarName;

    // Find a unique name
    while (variables.some((v) => v.name === varName)) {
      varName = `${baseVarName}${counter}`;
      counter++;
    }

    const newVariable: Variable = {
      id: varName,
      name: varName,
      label: varName,
      description: "",
      type: "text",
      defaultValue: "",
      required: false,
      position: variables.length,
    };

    setVariables([...variables, newVariable]);
    setOpenVariables([varName]);

    // Add the variable placeholder to the prompt
    const varPlaceholder = `[${varName}]`;
    const currentPos =
      insertPosition ??
      textareaRef.current?.selectionStart ??
      caretPosition ??
      prompt.length;
    const newPrompt =
      prompt.substring(0, currentPos) +
      (prompt.length > 0 && currentPos > 0 && prompt[currentPos - 1] !== " "
        ? " "
        : "") +
      varPlaceholder +
      " " +
      prompt.substring(currentPos);
    setPrompt(newPrompt);
    setCaretPosition(currentPos + varPlaceholder.length + 1);

    // Focus and move cursor after the variable
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos =
          currentPos +
          varPlaceholder.length +
          (prompt.length > 0 && currentPos > 0 && prompt[currentPos - 1] !== " "
            ? 2
            : 1);
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 100);

    // Open variable editor overlay on mobile
    setEditingVariableId(varName);
    setShowVariableEditor(true);

    toast({
      title: "Variable Created",
      description: `Variable "${varName}" was added to the prompt.`,
    });

    return varName;
  };

  const createVariableFromSelection = () => {
    if (!selectedText || !selectionRange) return;

    const varName = selectedText.replace(/\s+/g, "_").replace(/[^\w-]/g, "");
    const existingVariable = variables.find((v) => v.name === varName);

    if (existingVariable) {
      // Variable exists - show dialog asking what to do
      setLinkOrCreateDialog({
        open: true,
        varName,
        selectedText,
        selectionRange,
      });
    } else {
      // No existing variable - create new one directly
      performVariableCreation(varName, selectedText, selectionRange, false);
    }
  };

  const performVariableCreation = (
    varName: string,
    originalText: string,
    range: { start: number; end: number },
    createNew: boolean
  ) => {
    const varPlaceholder = `[${varName}]`;
    const existingVariable = variables.find((v) => v.name === varName);

    // Replace selected text with the variable placeholder
    const newPrompt =
      prompt.substring(0, range.start) +
      varPlaceholder +
      prompt.substring(range.end);
    setPrompt(newPrompt);

    // Move cursor to after the variable
    const newCursorPos = range.start + varPlaceholder.length;
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 100);

    setSelectedText("");
    setSelectionRange(null);

    if (existingVariable && !createNew) {
      // Link to existing variable
      toast({
        title: "Variable Linked",
        description: `Existing variable "${varName}" was inserted.`,
      });
      setOpenVariables([existingVariable.id]);
      setEditingVariableId(existingVariable.id);
      setShowVariableEditor(true);
    } else {
      // Create new variable (with unique name if needed)
      let finalVarName = varName;
      if (createNew && existingVariable) {
        // Generate unique name by adding number suffix
        let counter = 2;
        while (variables.some((v) => v.name === `${varName}_${counter}`)) {
          counter++;
        }
        finalVarName = `${varName}_${counter}`;

        // Update the prompt with the new unique name
        const uniquePlaceholder = `[${finalVarName}]`;
        const updatedPrompt =
          prompt.substring(0, range.start) +
          uniquePlaceholder +
          prompt.substring(range.end);
        setPrompt(updatedPrompt);
      }

      const newVariable: Variable = {
        id: finalVarName,
        name: finalVarName,
        label: originalText,
        description: "",
        type: "text",
        defaultValue: originalText,
        required: false,
        position: variables.length,
      };

      setVariables((prev) => [...prev, newVariable]);
      setOpenVariables([finalVarName]);
      setEditingVariableId(finalVarName);
      setShowVariableEditor(true);

      toast({
        title: "Variable Created",
        description: `New variable "${finalVarName}" was created.`,
      });
    }
  };

  const handleLinkVariable = () => {
    const {
      varName,
      selectedText: origText,
      selectionRange: range,
    } = linkOrCreateDialog;
    if (range) {
      performVariableCreation(varName, origText, range, false);
    }
    setLinkOrCreateDialog({
      open: false,
      varName: "",
      selectedText: "",
      selectionRange: null,
    });
  };

  const handleCreateNewVariable = () => {
    const {
      varName,
      selectedText: origText,
      selectionRange: range,
    } = linkOrCreateDialog;
    if (range) {
      performVariableCreation(varName, origText, range, true);
    }
    setLinkOrCreateDialog({
      open: false,
      varName: "",
      selectedText: "",
      selectionRange: null,
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Get all unique variable names from the prompt
      const regex = /\[([^\]]+)\]/g;
      const uniqueVarNames = new Set<string>();
      let match;
      while ((match = regex.exec(prompt)) !== null) {
        uniqueVarNames.add(match[1]);
      }

      setVariables((prev) => {
        // Keep existing variables that are still in the prompt
        const existingVars = prev.filter((v) => uniqueVarNames.has(v.name));
        const existingNames = new Set(existingVars.map((v) => v.name));

        // Create new variables for names that don't exist yet
        const newVars: Variable[] = [];
        uniqueVarNames.forEach((varName) => {
          if (!existingNames.has(varName)) {
            newVars.push({
              id: varName,
              name: varName,
              label: varName,
              description: "",
              type: "text",
              defaultValue: "",
              required: true,
              position: existingVars.length + newVars.length,
            });
          }
        });

        // Open newly created variables
        if (newVars.length > 0) {
          setOpenVariables((prev) => [...prev, ...newVars.map((v) => v.id)]);
        }

        return [...existingVars, ...newVars];
      });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [prompt]);

  // Update button position when selection changes
  useEffect(() => {
    if (selectionRange && textareaRef.current) {
      updateButtonPosition();
    }
  }, [selectionRange, updateButtonPosition]);

  // Update button position on scroll
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const handleScroll = () => {
      if (selectionRange) {
        updateButtonPosition();
      }
    };

    textarea.addEventListener("scroll", handleScroll);
    return () => textarea.removeEventListener("scroll", handleScroll);
  }, [selectionRange, updateButtonPosition]);

  const deleteVariable = (varId: string) => {
    setVariableToDelete(varId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteVariable = () => {
    if (!variableToDelete) return;

    const variable = variables.find((v) => v.id === variableToDelete);
    if (!variable) return;

    const placeholderRegex = new RegExp(
      `\\[${variable.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\]`,
      "g"
    );
    const newPrompt = prompt.replace(placeholderRegex, "");
    setPrompt(newPrompt);

    setVariables(variables.filter((v) => v.id !== variableToDelete));
    setDeleteDialogOpen(false);
    setVariableToDelete(null);
  };

  const updateVariable = (varId: string, updates: Partial<Variable>) => {
    // Check for duplicate name if name is being updated
    if (updates.name !== undefined) {
      const newName = updates.name;
      const currentVar = variables.find((v) => v.id === varId);

      // Check if this name already exists (excluding the current variable)
      const duplicateExists = variables.some(
        (v) => v.id !== varId && v.name === newName
      );

      if (duplicateExists && currentVar && currentVar.name !== newName) {
        toast({
          title: "Error",
          description: `A variable with the name "${newName}" already exists. Please choose a different name.`,
          variant: "destructive",
        });
        return; // Don't update
      }

      // Also update the prompt to reflect the name change
      if (currentVar && currentVar.name !== newName) {
        const oldPlaceholder = `[${currentVar.name}]`;
        const newPlaceholder = `[${newName}]`;
        const newPrompt = prompt.split(oldPlaceholder).join(newPlaceholder);
        setPrompt(newPrompt);

        // Update the variable ID as well since it's based on name
        setVariables(
          variables.map((v) =>
            v.id === varId ? { ...v, ...updates, id: newName } : v
          )
        );
        return;
      }
    }

    setVariables(
      variables.map((v) => (v.id === varId ? { ...v, ...updates } : v))
    );
  };

  const handleVariableLinkClick = (varName: string) => {
    const variable = variables.find(
      (v) => v.name === varName || v.label === varName
    );
    if (variable) {
      setOpenVariables([variable.id]);

      setTimeout(() => {
        const element = document.getElementById(`variable-${variable.id}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 100);
    }
  };

  const renderPromptWithLinks = () => {
    const regex = /\[([^\]]+)\]/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(prompt)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {prompt.substring(lastIndex, match.index)}
          </span>
        );
      }

      const varName = match[1];
      const variable = variables.find((v) => v.name === varName);
      const displayText = variable ? variable.label : varName;

      parts.push(
        <button
          key={`var-${match.index}`}
          type="button"
          onClick={() => handleVariableLinkClick(varName)}
          className="text-primary hover-elevate px-1 rounded"
          data-testid={`link-variable-${varName}`}
        >
          [{displayText}]
        </button>
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < prompt.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>{prompt.substring(lastIndex)}</span>
      );
    }

    return parts.length > 0 ? parts : prompt;
  };

  const addOption = (varId: string) => {
    const input = newOptionInput[varId] || "";
    if (!input.trim()) return;

    const parts = input.split("|||");
    const visibleName = parts[0]?.trim() || "";
    const promptValue = parts[1]?.trim() || "";

    if (!visibleName || !promptValue) return;

    const variable = variables.find((v) => v.id === varId);
    if (!variable) return;

    const newOption: SelectOption = {
      visibleName,
      promptValue,
    };

    updateVariable(varId, {
      options: [...(variable.options || []), newOption],
    });

    setNewOptionInput({ ...newOptionInput, [varId]: "" });
  };

  const removeOption = (varId: string, index: number) => {
    const variable = variables.find((v) => v.id === varId);
    if (!variable || !variable.options) return;

    const newOptions = variable.options.filter((_, i) => i !== index);
    updateVariable(varId, { options: newOptions });
  };

  const updateOption = (
    varId: string,
    index: number,
    field: "visibleName" | "promptValue",
    value: string
  ) => {
    const variable = variables.find((v) => v.id === varId);
    if (!variable || !variable.options) return;

    const newOptions = [...variable.options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    updateVariable(varId, { options: newOptions });
  };

  const handleGenerate = async () => {
    if (openVariables.length > 0) {
      setUnsavedVariableDialog(true);
      return;
    }

    const previewText = renderPreviewWithDefaults();
    if (!previewText.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const response = await apiRequest("POST", "/api/generate-image", {
        prompt: previewText,
      });
      const data = await response.json();
      setGeneratedImage(data.imageUrl);
      toast({
        title: "Generation Complete",
        description: "Your image was generated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Generation Failed",
        description: error.message || "Error generating image.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const proceedWithGenerate = async () => {
    setUnsavedVariableDialog(false);
    setOpenVariables([]);
    const previewText = renderPreviewWithDefaults();
    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const response = await apiRequest("POST", "/api/generate-image", {
        prompt: previewText,
      });
      const data = await response.json();
      setGeneratedImage(data.imageUrl);
      toast({
        title: "Generation Complete",
        description: "Your image was generated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Generation Failed",
        description: error.message || "Error generating image.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const savePromptMutation = useMutation({
    mutationFn: async () => {
      let savedPrompt;

      const promptData = {
        title: promptTitle,
        content: prompt,
        userId: null,
        category,
        tags,
        aiModel,
        price: Math.round(price * 10000),
        aspectRatio,
        photoCount,
        promptType,
        uploadedPhotos,
        resolution,
      };

      if (currentPromptId) {
        const response = await apiRequest(
          "PATCH",
          `/api/prompts/${currentPromptId}`,
          promptData
        );
        savedPrompt = await response.json();

        const existingVarsResponse = await fetch(
          `/api/prompts/${currentPromptId}/variables`
        );
        const existingVars = await existingVarsResponse.json();

        for (const existingVar of existingVars) {
          await apiRequest("DELETE", `/api/variables/${existingVar.id}`, {});
        }
      } else {
        const response = await apiRequest("POST", "/api/prompts", promptData);
        savedPrompt = await response.json();
      }

      for (const variable of variables) {
        const variableData: Record<string, any> = {
          promptId: savedPrompt.id,
          name: variable.name,
          label: variable.label,
          description: variable.description || null,
          type: variable.type,
          defaultValue: variable.defaultValue,
          required: variable.required,
          position: variable.position,
          min: variable.min ?? null,
          max: variable.max ?? null,
          options: variable.options ?? null,
        };

        await apiRequest("POST", "/api/variables", variableData);
      }

      setCurrentPromptId(savedPrompt.id);
      return savedPrompt;
    },
    onSuccess: () => {
      toast({
        title: "Saved",
        description: "Your prompt was saved successfully.",
      });
    },
    onError: (error) => {
      console.error("Save error:", error);
      toast({
        title: "Error",
        description: "An error occurred while saving.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    // Validate required fields
    if (!promptTitle.trim() || !category.trim() || tags.length === 0) {
      setShowValidationDialog(true);
      return;
    }
    savePromptMutation.mutate();
  };

  const loadPrompt = async (promptId: string) => {
    try {
      const promptResponse = await fetch(`/api/prompts/${promptId}`);
      const promptData = await promptResponse.json();

      const variablesResponse = await fetch(
        `/api/prompts/${promptId}/variables`
      );
      const variablesData = await variablesResponse.json();

      setCurrentPromptId(promptId);
      setPromptTitle(promptData.title);
      setPrompt(promptData.content);
      setCategory(promptData.category || "");
      setTags(promptData.tags || []);
      setAiModel(promptData.aiModel || "gemini");
      setPrice((promptData.price || 1) / 10000);
      setAspectRatio(promptData.aspectRatio || null);
      setPhotoCount(promptData.photoCount || 1);
      setResolution(promptData.resolution || null);
      setPromptType(promptData.promptType || "create-now");
      setUploadedPhotos(promptData.uploadedPhotos || []);

      setVariables(
        variablesData.map((v: any) => ({
          id: v.id,
          name: v.name,
          label: v.label,
          description: v.description || "",
          type: v.type,
          defaultValue: v.defaultValue,
          required: v.required,
          position: v.position,
          min: v.min,
          max: v.max,
          options: v.options,
        }))
      );
      setOpenVariables([]);
      setShowLoadDialog(false);

      toast({
        title: "Loaded",
        description: "Prompt was loaded successfully.",
      });
    } catch (error) {
      console.error("Load error:", error);
      toast({
        title: "Error",
        description: "An error occurred while loading.",
        variant: "destructive",
      });
    }
  };

  const newPrompt = () => {
    setCurrentPromptId(null);
    setPromptTitle("");
    setPrompt("");
    setVariables([]);
    setOpenVariables([]);
  };

  const settingsData: PromptSettings = {
    title: promptTitle,
    category,
    tags,
    aiModel,
    price,
    aspectRatio,
    photoCount,
    promptType,
    uploadedPhotos,
    resolution,
    isFreeShowcase,
  };

  const handleSettingsUpdate = (updates: Partial<PromptSettings>) => {
    if (updates.title !== undefined) setPromptTitle(updates.title);
    if (updates.category !== undefined) setCategory(updates.category);
    if (updates.tags !== undefined) setTags(updates.tags);
    if (updates.aiModel !== undefined) setAiModel(updates.aiModel);
    if (updates.price !== undefined) setPrice(updates.price);
    if (updates.aspectRatio !== undefined) setAspectRatio(updates.aspectRatio);
    if (updates.photoCount !== undefined) setPhotoCount(updates.photoCount);
    if (updates.promptType !== undefined) setPromptType(updates.promptType);
    if (updates.uploadedPhotos !== undefined)
      setUploadedPhotos(updates.uploadedPhotos);
    if (updates.resolution !== undefined) setResolution(updates.resolution);
    if (updates.isFreeShowcase !== undefined)
      setIsFreeShowcase(updates.isFreeShowcase);
  };

  const renderPreviewWithDefaults = () => {
    let previewText = prompt;

    variables.forEach((variable) => {
      const placeholder = `[${variable.name}]`;
      let defaultDisplay = "";

      if (variable.type === "text") {
        defaultDisplay = (variable.defaultValue as string) || "";
      } else if (variable.type === "checkbox") {
        defaultDisplay = (variable.defaultValue as boolean)
          ? variable.label
          : "";
      } else if (
        variable.type === "multi-select" ||
        variable.type === "single-select"
      ) {
        const defaultIndex = variable.defaultOptionIndex ?? 0;
        const defaultOption = variable.options?.[defaultIndex];
        defaultDisplay = defaultOption?.promptValue || "";
      } else if (variable.type === "slider") {
        defaultDisplay = String(variable.defaultValue || variable.min || 0);
      }

      // Use split/join instead of RegExp to avoid issues with special characters in variable names
      previewText = previewText.split(placeholder).join(defaultDisplay);
    });

    return previewText;
  };

  const [mobileTab, setMobileTab] = useState<
    "settings" | "editor" | "generation"
  >("settings");
  const [showVariableEditor, setShowVariableEditor] = useState(false);
  const [editingVariableId, setEditingVariableId] = useState<string | null>(
    null
  );
  const scrollYRef = useRef(0);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  // Lock mobile container scroll when variable editor overlay is open
  useEffect(() => {
    const mobileContainer = mobileContainerRef.current;
    if (!mobileContainer) return;

    if (showVariableEditor) {
      // Save current scroll position of the mobile container
      const scrollY = mobileContainer.scrollTop;
      scrollYRef.current = scrollY;
      // Lock the mobile container's vertical scroll
      mobileContainer.style.overflowY = "hidden";
    } else {
      // Restore mobile container scroll
      const savedScroll = scrollYRef.current;
      mobileContainer.style.overflowY = "auto";
      // Use requestAnimationFrame to ensure DOM has updated before setting scroll
      requestAnimationFrame(() => {
        if (mobileContainer) {
          mobileContainer.scrollTop = savedScroll;
        }
      });
      scrollYRef.current = 0;
    }

    // Cleanup on unmount - always restore overflow
    return () => {
      if (mobileContainer) {
        mobileContainer.style.overflowY = "auto";
      }
    };
  }, [showVariableEditor]);

  return (
    <TooltipProvider>
      {/* Desktop View */}
      <div className="hidden md:flex lg:grid h-full w-full overflow-y-hidden md:overflow-x-auto lg:overflow-x-hidden md:snap-x md:snap-mandatory md:gap-4 lg:gap-4 grid-cols-1 lg:grid-cols-[clamp(220px,18vw,280px)_minmax(0,1fr)_clamp(260px,22vw,340px)_clamp(260px,24vw,360px)]">
        <div className="min-w-0 h-full overflow-hidden md:snap-start md:shrink-0 md:w-[88vw] md:max-w-[520px] lg:w-auto lg:max-w-none lg:shrink">
          <PromptSettingsPanel
            settings={settingsData}
            onUpdate={handleSettingsUpdate}
          />
        </div>

        <Card className="flex flex-col overflow-hidden min-h-0 min-w-0 md:snap-start md:shrink-0 md:w-[88vw] md:max-w-[760px] lg:w-auto lg:max-w-none lg:shrink">
          <CardHeader className="pb-2 px-4 shrink-0 flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle className="text-base">Prompt Editor</CardTitle>
            <div className="flex items-center gap-2">
              {promptType === "paid-prompt" && (
                <Button
                  onClick={() => {
                    const createdId = createNewEmptyVariable(caretPosition);
                    if (createdId) {
                      setSelectedVariableId(createdId);
                      setOpenVariables([createdId]);
                      const element = document.getElementById(
                        `variable-${createdId}`
                      );
                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }
                    }
                  }}
                  size="sm"
                  variant="default"
                  data-testid="button-add-variable-desktop"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="flex-1 min-h-0 flex flex-col gap-2 px-4 pb-4">
            <div
              ref={editorContainerRef}
              className="relative flex-1 rounded-lg min-h-[240px] border bg-background"
              onClick={() => textareaRef.current?.focus()}
              style={{ resize: "vertical", overflow: "hidden" }}
            >
              <div
                className="absolute inset-0 font-mono text-sm whitespace-pre-wrap pointer-events-none overflow-hidden select-none text-foreground"
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  padding: "8px 12px",
                  lineHeight: "1.625",
                  boxSizing: "border-box",
                }}
              >
                {prompt.split(/(\[[^\]]+\])/).map((part, index) => {
                  const match = part.match(/\[([^\]]+)\]/);
                  if (match) {
                    const varName = match[1];
                    const variable = variables.find((v) => v.name === varName);
                    if (variable) {
                      const isOpen = openVariables.includes(variable.id);
                      return (
                        <span
                          key={index}
                          className={`select-none cursor-pointer pointer-events-auto ${isOpen ? "text-primary" : "text-primary/80"}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedVariableId(variable.id);
                            setOpenVariables([variable.id]);
                            const element = document.getElementById(
                              `variable-${variable.id}`
                            );
                            if (element) {
                              element.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                              });
                            }
                          }}
                          onMouseDown={(e) => e.preventDefault()}
                          data-testid={`badge-inline-variable-${variable.id}`}
                        >
                          [{varName}]
                        </span>
                      );
                    }
                  }

                  return (
                    <span key={index} className="select-none">
                      {part}
                    </span>
                  );
                })}
              </div>

              <Textarea
                ref={textareaRef}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onSelect={(e) => {
                  setCaretPosition(e.currentTarget.selectionStart);
                  handleTextSelection();
                }}
                onKeyDown={(e) => {
                  if (!textareaRef.current) return;
                  const pos = textareaRef.current.selectionStart;

                  const beforeCursor = prompt.substring(0, pos);
                  const afterCursor = prompt.substring(pos);

                  const openBracketBefore = beforeCursor.lastIndexOf("[");
                  const closeBracketBefore = beforeCursor.lastIndexOf("]");
                  const closeBracketAfter = afterCursor.indexOf("]");

                  if (
                    openBracketBefore > closeBracketBefore &&
                    closeBracketAfter !== -1
                  ) {
                    const newPos = pos + closeBracketAfter + 1;
                    e.preventDefault();
                    textareaRef.current.setSelectionRange(newPos, newPos);
                  }
                }}
                onClick={() => {
                  if (!textareaRef.current) return;

                  const start = textareaRef.current.selectionStart;
                  const end = textareaRef.current.selectionEnd;
                  if (start === end) {
                    clearSelection();
                  }

                  setCaretPosition(start);

                  setTimeout(() => {
                    if (!textareaRef.current) return;
                    const pos = textareaRef.current.selectionStart;

                    const beforeCursor = prompt.substring(0, pos);
                    const afterCursor = prompt.substring(pos);

                    const openBracketBefore = beforeCursor.lastIndexOf("[");
                    const closeBracketBefore = beforeCursor.lastIndexOf("]");
                    const closeBracketAfter = afterCursor.indexOf("]");

                    if (
                      openBracketBefore > closeBracketBefore &&
                      closeBracketAfter !== -1
                    ) {
                      const newPos = pos + closeBracketAfter + 1;
                      textareaRef.current.setSelectionRange(newPos, newPos);
                    }
                  }, 0);
                }}
                className="absolute inset-0 font-mono text-sm bg-transparent text-transparent caret-foreground z-[1] selection:bg-primary/30 whitespace-pre-wrap overflow-hidden border-0 shadow-none ring-0 focus:ring-0 focus:outline-none focus-visible:ring-0 rounded-none"
                style={{
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                  resize: "none",
                  padding: "8px 12px",
                  lineHeight: "1.625",
                  boxSizing: "border-box",
                }}
                onMouseUp={handleTextSelection}
                onKeyUp={() => {
                  if (textareaRef.current) {
                    setCaretPosition(textareaRef.current.selectionStart);
                  }
                  handleTextSelection();
                }}
                placeholder="Write your prompt here... Use [VariableName] for variables"
                data-testid="textarea-prompt"
              />

              {promptType === "paid-prompt" &&
                selectedText &&
                selectionRange &&
                buttonPosition && (
                  <Button
                    ref={buttonRef}
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      createVariableFromSelection();
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="absolute shadow-xl cursor-pointer bg-primary text-primary-foreground border-2 border-background pointer-events-auto"
                    style={{
                      top: `${buttonPosition.top}px`,
                      left: `${buttonPosition.left}px`,
                      zIndex: 50,
                    }}
                    data-testid="button-create-variable"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Variable
                  </Button>
                )}
            </div>

            <div className="border-t border-border/50 pt-3">
              <div className="text-xs font-medium text-muted-foreground">
                Preview
              </div>
              <div className="mt-2 rounded-md bg-background/40 p-3 font-mono text-xs whitespace-pre-wrap break-words max-h-[150px] overflow-y-auto">
                {renderPreviewWithDefaults()}
              </div>
            </div>
          </CardContent>
        </Card>

        {promptType === "paid-prompt" && (
          <Card className="flex flex-col overflow-hidden min-h-0 min-w-0 md:snap-start md:shrink-0 md:w-[88vw] md:max-w-[520px] lg:w-auto lg:max-w-none lg:shrink">
            <CardHeader className="pb-2 px-4 shrink-0">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-sm">Variables</CardTitle>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const createdId = createNewEmptyVariable(caretPosition);
                    if (createdId) {
                      setSelectedVariableId(createdId);
                      setOpenVariables([createdId]);
                      const element = document.getElementById(
                        `variable-${createdId}`
                      );
                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                      }
                    }
                  }}
                  disabled={isShowcase}
                  data-testid="button-add-variable-inspector"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 min-h-0 px-4 pb-4">
              <ScrollArea className="h-full pr-2">
                {variables.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-10">
                    No variables yet.
                    <br />
                    Select text or use [Name]
                  </p>
                ) : (
                  <Accordion
                    type="multiple"
                    value={openVariables}
                    onValueChange={setOpenVariables}
                  >
                    {variables.map((variable) => (
                      <AccordionItem
                        key={variable.id}
                        value={variable.id}
                        id={`variable-${variable.id}`}
                      >
                        <AccordionTrigger
                          className={
                            selectedVariableId === variable.id
                              ? "text-primary"
                              : undefined
                          }
                          data-testid={`accordion-trigger-${variable.id}`}
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-sm font-medium">
                              {variable.label}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {variable.type}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="flex-1">
                              <Label className="text-xs">Label</Label>
                              <Input
                                value={variable.label}
                                onChange={(e) =>
                                  updateVariable(variable.id, {
                                    label: e.target.value,
                                  })
                                }
                                className="h-8 text-sm mt-1"
                                placeholder="Label"
                                disabled={isShowcase}
                                data-testid={`input-label-${variable.id}`}
                              />
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 mt-6"
                              onClick={() => deleteVariable(variable.id)}
                              disabled={isShowcase}
                              data-testid={`button-delete-${variable.id}`}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs">Internal Name</Label>
                            <Badge
                              variant="secondary"
                              className="text-xs font-mono"
                            >
                              [{variable.name}]
                            </Badge>
                          </div>

                          <div className="space-y-1">
                            <Label className="text-xs">Type</Label>
                            <Select
                              value={variable.type}
                              onValueChange={(value) =>
                                updateVariable(variable.id, {
                                  type: value as VariableType,
                                })
                              }
                              disabled={isShowcase}
                            >
                              <SelectTrigger
                                className="h-8 text-sm"
                                data-testid={`select-type-${variable.id}`}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="checkbox">
                                  Checkbox
                                </SelectItem>
                                <SelectItem value="multi-select">
                                  Multi-Select
                                </SelectItem>
                                <SelectItem value="single-select">
                                  Single-Select
                                </SelectItem>
                                <SelectItem value="slider">Slider</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-center gap-4 pt-1 flex-wrap">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`required-${variable.id}`}
                                checked={variable.required}
                                onCheckedChange={(checked) =>
                                  updateVariable(variable.id, {
                                    required: checked as boolean,
                                  })
                                }
                                data-testid={`checkbox-required-${variable.id}`}
                              />
                              <Label
                                htmlFor={`required-${variable.id}`}
                                className="text-sm"
                              >
                                Required
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`allow-ref-image-${variable.id}`}
                                checked={variable.allowReferenceImage || false}
                                onCheckedChange={(checked) =>
                                  updateVariable(variable.id, {
                                    allowReferenceImage: checked as boolean,
                                  })
                                }
                                data-testid={`checkbox-allow-ref-image-${variable.id}`}
                              />
                              <Label
                                htmlFor={`allow-ref-image-${variable.id}`}
                                className="text-sm"
                              >
                                allow reference image
                              </Label>
                            </div>
                          </div>

                          {variable.type === "text" && (
                            <div className="space-y-1">
                              <Label className="text-xs">Default Value</Label>
                              <Textarea
                                value={(variable.defaultValue as string) || ""}
                                onChange={(e) =>
                                  updateVariable(variable.id, {
                                    defaultValue: e.target.value,
                                  })
                                }
                                placeholder="Default Value"
                                className="min-h-10 text-sm resize-y"
                                disabled={isShowcase}
                                data-testid={`input-default-${variable.id}`}
                              />
                            </div>
                          )}

                          {variable.type === "checkbox" && (
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`checkbox-${variable.id}`}
                                checked={Boolean(variable.defaultValue)}
                                onCheckedChange={(checked) =>
                                  updateVariable(variable.id, {
                                    defaultValue: checked,
                                  })
                                }
                                disabled={isShowcase}
                                data-testid={`checkbox-default-${variable.id}`}
                              />
                              <Label
                                htmlFor={`checkbox-${variable.id}`}
                                className="text-sm"
                              >
                                Active by default
                              </Label>
                            </div>
                          )}

                          {(variable.type === "multi-select" ||
                            variable.type === "single-select") && (
                            <div className="space-y-2">
                              <Label className="text-xs">Options</Label>
                              <div className="space-y-2">
                                {variable.options?.map((option, index) => {
                                  const isDefault =
                                    (variable.defaultOptionIndex ?? 0) ===
                                    index;
                                  return (
                                    <Card
                                      key={index}
                                      className={
                                        isDefault
                                          ? "border-primary/50"
                                          : undefined
                                      }
                                    >
                                      <CardContent className="p-3 space-y-2">
                                        <div className="flex items-center gap-2">
                                          <Checkbox
                                            checked={isDefault}
                                            onCheckedChange={(checked) => {
                                              if (checked)
                                                updateVariable(variable.id, {
                                                  defaultOptionIndex: index,
                                                });
                                            }}
                                            disabled={isShowcase}
                                            data-testid={`checkbox-default-option-${variable.id}-${index}`}
                                          />
                                          <Input
                                            value={option.visibleName}
                                            onChange={(e) =>
                                              updateOption(
                                                variable.id,
                                                index,
                                                "visibleName",
                                                e.target.value
                                              )
                                            }
                                            className="h-8 text-sm"
                                            placeholder="Visible Name"
                                            disabled={isShowcase}
                                            data-testid={`input-option-visible-${variable.id}-${index}`}
                                          />
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() =>
                                              removeOption(variable.id, index)
                                            }
                                            disabled={isShowcase}
                                            data-testid={`button-remove-option-${variable.id}-${index}`}
                                          >
                                            <X className="h-4 w-4" />
                                          </Button>
                                        </div>
                                        <Textarea
                                          value={option.promptValue}
                                          onChange={(e) =>
                                            updateOption(
                                              variable.id,
                                              index,
                                              "promptValue",
                                              e.target.value
                                            )
                                          }
                                          className="min-h-[60px] text-sm resize-y"
                                          placeholder="Prompt Value"
                                          disabled={isShowcase}
                                          data-testid={`input-option-prompt-${variable.id}-${index}`}
                                        />
                                      </CardContent>
                                    </Card>
                                  );
                                })}

                                <Card>
                                  <CardContent className="p-3 space-y-2">
                                    <Input
                                      value={
                                        newOptionInput[variable.id]?.split(
                                          "|||"
                                        )[0] || ""
                                      }
                                      onChange={(e) => {
                                        const currentValue =
                                          newOptionInput[variable.id] || "|||";
                                        const parts = currentValue.split("|||");
                                        setNewOptionInput({
                                          ...newOptionInput,
                                          [variable.id]: `${e.target.value}|||${parts[1] || ""}`,
                                        });
                                      }}
                                      placeholder="Visible Name"
                                      className="h-8 text-sm"
                                      disabled={isShowcase}
                                      data-testid={`input-new-option-visible-${variable.id}`}
                                    />
                                    <Textarea
                                      value={
                                        newOptionInput[variable.id]?.split(
                                          "|||"
                                        )[1] || ""
                                      }
                                      onChange={(e) => {
                                        const currentValue =
                                          newOptionInput[variable.id] || "|||";
                                        const parts = currentValue.split("|||");
                                        setNewOptionInput({
                                          ...newOptionInput,
                                          [variable.id]: `${parts[0] || ""}|||${e.target.value}`,
                                        });
                                      }}
                                      placeholder="Prompt Value"
                                      className="min-h-[60px] text-sm resize-y"
                                      disabled={isShowcase}
                                      data-testid={`input-new-option-prompt-${variable.id}`}
                                    />
                                    <Button
                                      size="sm"
                                      onClick={() => addOption(variable.id)}
                                      className="w-full"
                                      disabled={
                                        isShowcase ||
                                        !newOptionInput[variable.id]
                                          ?.split("|||")
                                          .every((p) => p.trim())
                                      }
                                      data-testid={`button-add-option-${variable.id}`}
                                    >
                                      <Plus className="h-4 w-4 mr-1" />
                                      Add option
                                    </Button>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                          )}

                          {variable.type === "slider" && (
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <Label className="text-xs">Min</Label>
                                  <Input
                                    type="number"
                                    value={variable.min || 0}
                                    onChange={(e) =>
                                      updateVariable(variable.id, {
                                        min: parseInt(e.target.value),
                                      })
                                    }
                                    className="h-8 text-sm"
                                    disabled={isShowcase}
                                    data-testid={`input-min-${variable.id}`}
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Max</Label>
                                  <Input
                                    type="number"
                                    value={variable.max || 100}
                                    onChange={(e) =>
                                      updateVariable(variable.id, {
                                        max: parseInt(e.target.value),
                                      })
                                    }
                                    className="h-8 text-sm"
                                    disabled={isShowcase}
                                    data-testid={`input-max-${variable.id}`}
                                  />
                                </div>
                              </div>
                              <div>
                                <Label className="text-xs">
                                  Default: {variable.defaultValue as number}
                                </Label>
                                <Slider
                                  value={[Number(variable.defaultValue) || 0]}
                                  onValueChange={([value]) =>
                                    updateVariable(variable.id, {
                                      defaultValue: value,
                                    })
                                  }
                                  min={variable.min || 0}
                                  max={variable.max || 100}
                                  step={1}
                                  disabled={isShowcase}
                                  data-testid={`slider-default-${variable.id}`}
                                />
                              </div>
                            </div>
                          )}

                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => {
                              setOpenVariables(
                                openVariables.filter((id) => id !== variable.id)
                              );
                            }}
                            className="w-full"
                            data-testid={`button-save-variable-${variable.id}`}
                          >
                            Done
                          </Button>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        )}

        <Card className="flex flex-col overflow-hidden min-h-0 min-w-0 md:snap-start md:shrink-0 md:w-[88vw] md:max-w-[520px] lg:w-auto lg:max-w-none lg:shrink">
          <CardHeader className="pb-2 px-4 shrink-0">
            <CardTitle className="text-sm">Generation</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 min-h-0 flex flex-col gap-3 px-4 pb-4">
            {generatedImage ? (
              <div className="flex-1 flex flex-col">
                <img
                  src={generatedImage}
                  alt="Generated by Gemini"
                  className="w-full h-auto rounded-md border"
                  data-testid="generated-image"
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center text-muted-foreground text-sm">
                No generated image yet.
                <br />
                Click Generate to create one.
              </div>
            )}

            <div className="sticky bottom-0 pt-3 bg-background/80 backdrop-blur border-t border-border/50">
              <div className="space-y-2">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full"
                  data-testid="button-generate"
                >
                  {isGenerating ? "Generating..." : "Generate"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSubmit}
                  disabled={isGenerating || savePromptMutation.isPending}
                  className="w-full"
                  data-testid="button-submit"
                >
                  {savePromptMutation.isPending ? "Releasing..." : "Release"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mobile View */}
      <div
        ref={mobileContainerRef}
        className="lg:hidden flex flex-col h-[calc(100vh-8rem)] overflow-y-auto overflow-x-hidden w-full max-w-full"
      >
        {/* Header - inside scrollable area */}
        <div className="shrink-0 flex items-center gap-4 px-6 py-4 border-b w-full max-w-full overflow-x-hidden">
          {onBack && (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              data-testid="button-back"
              className="text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          )}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-semibold text-white truncate">
              Create Prompt Template
            </h1>
            <p className="text-xs text-white truncate">
              Design reusable prompt templates with customizable variables
            </p>
          </div>
        </div>

        {mobileTab === "settings" && (
          <div className="w-full max-w-full overflow-x-hidden">
            <PromptSettingsPanel
              settings={settingsData}
              onUpdate={handleSettingsUpdate}
              useScrollArea={false}
            />
          </div>
        )}

        {mobileTab === "editor" && (
          <div className="flex flex-col w-full max-w-full overflow-x-hidden">
            {/* Sticky Toolbar with Variables Button */}
            <div className="sticky top-0 z-10 bg-background border-b px-3 py-2 flex items-center justify-end w-full max-w-full shrink-0">
              <Button
                onClick={() => {
                  setEditingVariableId(null);
                  setShowVariableEditor(true);
                }}
                size="sm"
                variant="outline"
                className="bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20 hover:bg-teal-500/20"
                data-testid="button-show-variables"
              >
                <List className="h-4 w-4 mr-1" />
                Variables
              </Button>
            </div>

            {/* Scrollable Content */}
            <div className="px-3 pt-3 pb-3 w-full max-w-full overflow-x-hidden">
              <div
                className="relative min-h-[500px] w-full max-w-full overflow-visible border border-border rounded-md"
                onClick={() => textareaRef.current?.focus()}
              >
                <div
                  className="absolute inset-0 font-mono text-sm whitespace-pre-wrap pointer-events-none overflow-hidden select-none text-white"
                  style={{
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                    padding: "8px 12px",
                    lineHeight: "1.625",
                    boxSizing: "border-box",
                  }}
                >
                  {prompt.split(/(\[[^\]]+\])/).map((part, index) => {
                    const match = part.match(/\[([^\]]+)\]/);
                    if (match) {
                      const varName = match[1];
                      const variable = variables.find(
                        (v) => v.name === varName
                      );
                      if (variable) {
                        const isOpen =
                          editingVariableId === variable.id ||
                          openVariables.includes(variable.id);
                        return (
                          <span
                            key={index}
                            className={`select-none cursor-pointer pointer-events-auto ${isOpen ? "text-orange-400 dark:text-orange-300" : "text-teal-400 dark:text-teal-300"}`}
                            onClick={(e) => {
                              e.preventDefault();
                              setEditingVariableId(variable.id);
                              setShowVariableEditor(true);
                            }}
                            onMouseDown={(e) => e.preventDefault()}
                            data-testid={`badge-inline-variable-${variable.id}`}
                          >
                            [{varName}]
                          </span>
                        );
                      }
                    }
                    return (
                      <span key={index} className="select-none">
                        {part}
                      </span>
                    );
                  })}
                </div>

                <textarea
                  ref={textareaRef}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onSelect={handleTextSelection}
                  onClick={(e) => {
                    handleTextSelection();
                    setTimeout(() => {
                      const pos = textareaRef.current?.selectionStart ?? 0;
                      const regex = /\[([^\]]+)\]/g;
                      let match;
                      while ((match = regex.exec(prompt)) !== null) {
                        if (
                          pos > match.index &&
                          pos < match.index + match[0].length
                        ) {
                          const newPos = match.index + match[0].length;
                          if (textareaRef.current) {
                            textareaRef.current.setSelectionRange(
                              newPos,
                              newPos
                            );
                          }
                          break;
                        }
                      }
                    }, 0);
                  }}
                  onKeyUp={(e) => {
                    if (
                      e.key === "ArrowLeft" ||
                      e.key === "ArrowRight" ||
                      e.key === "ArrowUp" ||
                      e.key === "ArrowDown"
                    ) {
                      const pos = textareaRef.current?.selectionStart ?? 0;
                      const regex = /\[([^\]]+)\]/g;
                      let match;
                      while ((match = regex.exec(prompt)) !== null) {
                        if (
                          pos > match.index &&
                          pos < match.index + match[0].length
                        ) {
                          const newPos =
                            e.key === "ArrowLeft" || e.key === "ArrowUp"
                              ? match.index
                              : match.index + match[0].length;
                          setTimeout(() => {
                            if (textareaRef.current) {
                              textareaRef.current.setSelectionRange(
                                newPos,
                                newPos
                              );
                            }
                          }, 0);
                          break;
                        }
                      }
                    }
                  }}
                  placeholder="Write your prompt... Select text to create variables or use [VariableName] syntax."
                  className="absolute inset-0 w-full font-mono text-sm resize-none bg-transparent text-transparent caret-white focus:outline-none focus:ring-0 border-0 shadow-none ring-0 focus-visible:ring-0 rounded-none whitespace-pre-wrap overflow-hidden selection:bg-primary/20"
                  style={{
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                    caretColor: "white",
                    padding: "8px 12px",
                    lineHeight: "1.625",
                    boxSizing: "border-box",
                  }}
                  data-testid="textarea-prompt"
                />
                {selectedText && selectionRange && buttonPosition && (
                  <Button
                    onClick={createVariableFromSelection}
                    variant="secondary"
                    size="sm"
                    className="absolute z-20 shadow-lg"
                    style={{
                      top: `${buttonPosition.top}px`,
                      left: `${buttonPosition.left}px`,
                    }}
                    data-testid="button-create-from-selection"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Variable erstellen: "{selectedText.slice(0, 20)}
                    {selectedText.length > 20 ? "..." : ""}"
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {mobileTab === "generation" && (
          <div className="px-3 pt-3 pb-3 flex flex-col w-full max-w-full overflow-x-hidden">
            {generatedImage ? (
              <div className="flex-1 flex flex-col">
                <img
                  src={generatedImage}
                  alt="Generated"
                  className="w-full h-auto rounded border object-contain"
                  data-testid="img-generated"
                />
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-foreground text-sm">
                Noch kein Bild generiert
              </div>
            )}

            <div className="space-y-2 mt-auto">
              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full"
                data-testid="button-generate"
              >
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
              <Button
                variant="outline"
                onClick={handleSubmit}
                disabled={isGenerating || savePromptMutation.isPending}
                className="w-full"
                data-testid="button-submit"
              >
                {savePromptMutation.isPending ? "Releasing..." : "Release"}
              </Button>
            </div>
          </div>
        )}

        {/* Editor Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background w-full max-w-full">
          <div className="grid grid-cols-3 w-full max-w-full">
            <Button
              variant={mobileTab === "settings" ? "default" : "ghost"}
              onClick={() => setMobileTab("settings")}
              className="flex flex-col h-auto py-3 gap-1 rounded-none no-default-hover-elevate"
              data-testid="button-mobile-tab-settings"
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs font-medium">Settings</span>
            </Button>
            <Button
              variant={mobileTab === "editor" ? "default" : "ghost"}
              onClick={() => setMobileTab("editor")}
              className="flex flex-col h-auto py-3 gap-1 rounded-none no-default-hover-elevate"
              data-testid="button-mobile-tab-editor"
            >
              <FileText className="h-5 w-5" />
              <span className="text-xs font-medium">Prompt</span>
            </Button>
            <Button
              variant={mobileTab === "generation" ? "default" : "ghost"}
              onClick={() => setMobileTab("generation")}
              className="flex flex-col h-auto py-3 gap-1 rounded-none no-default-hover-elevate"
              data-testid="button-mobile-tab-generation"
            >
              <Sparkles className="h-5 w-5" />
              <span className="text-xs font-medium">Generate</span>
            </Button>
          </div>
        </div>

        {/* Variable Editor Overlay (Mobile) */}
        {showVariableEditor && (
          <div className="fixed inset-0 bg-background z-50 flex flex-col overflow-hidden">
            <div className="shrink-0 flex items-center justify-between p-4 border-b w-full max-w-full overflow-x-hidden">
              <h2 className="text-lg font-semibold text-foreground">
                Variables
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  setShowVariableEditor(false);
                  setEditingVariableId(null);
                }}
                className="text-foreground"
                data-testid="button-close-variables"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <ScrollArea className="flex-1 w-full max-w-full overflow-x-hidden">
              <div className="p-4 space-y-2 w-full max-w-full overflow-x-hidden">
                {variables.length === 0 ? (
                  <p className="text-sm text-foreground text-center py-8">
                    No variables yet.
                    <br />
                    Select text or use [Name]
                  </p>
                ) : (
                  <Accordion
                    type="multiple"
                    value={
                      editingVariableId ? [editingVariableId] : openVariables
                    }
                    onValueChange={setOpenVariables}
                  >
                    {variables.map((variable) => (
                      <AccordionItem
                        key={variable.id}
                        value={variable.id}
                        id={`variable-${variable.id}`}
                      >
                        <AccordionTrigger
                          className="hover-elevate px-2 rounded"
                          data-testid={`accordion-trigger-${variable.id}`}
                        >
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-sm font-medium text-white">
                              {variable.label}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {variable.type}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-1.5 pt-1 space-y-2 w-full max-w-full overflow-x-hidden">
                          <div className="space-y-2">
                            <Label className="text-xs text-white">Label</Label>
                            <Input
                              value={variable.label}
                              onChange={(e) =>
                                updateVariable(variable.id, {
                                  label: e.target.value,
                                })
                              }
                              className="h-8 text-sm text-foreground"
                              placeholder="Label"
                              disabled={promptType === "showcase"}
                              data-testid={`input-label-${variable.id}`}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-xs text-white">
                              Beschreibung
                            </Label>
                            <Textarea
                              value={variable.description}
                              onChange={(e) =>
                                updateVariable(variable.id, {
                                  description: e.target.value,
                                })
                              }
                              placeholder="Add description..."
                              className="min-h-[60px] text-sm text-foreground"
                              disabled={promptType === "showcase"}
                              data-testid={`input-description-${variable.id}`}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-xs text-white">
                              Interner Name
                            </Label>
                            <Badge
                              variant="secondary"
                              className="text-xs font-mono"
                            >
                              {variable.name}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-xs text-white">Typ</Label>
                            <Select
                              value={variable.type}
                              onValueChange={(value) =>
                                updateVariable(variable.id, {
                                  type: value as VariableType,
                                })
                              }
                              disabled={promptType === "showcase"}
                            >
                              <SelectTrigger
                                className="h-9 text-sm"
                                data-testid={`select-type-${variable.id}`}
                              >
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="text">Text</SelectItem>
                                <SelectItem value="checkbox">
                                  Checkbox
                                </SelectItem>
                                <SelectItem value="multi-select">
                                  Multi-Select
                                </SelectItem>
                                <SelectItem value="single-select">
                                  Single-Select
                                </SelectItem>
                                <SelectItem value="slider">Slider</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {variable.type === "text" && (
                            <div className="space-y-2">
                              <Label className="text-xs text-white">
                                Default Value
                              </Label>
                              <Textarea
                                value={variable.defaultValue as string}
                                onChange={(e) =>
                                  updateVariable(variable.id, {
                                    defaultValue: e.target.value,
                                  })
                                }
                                placeholder="Default Value"
                                className="min-h-[80px] text-sm"
                                disabled={promptType === "showcase"}
                                data-testid={`input-default-${variable.id}`}
                              />
                            </div>
                          )}

                          {variable.type === "checkbox" && (
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`checkbox-mobile-${variable.id}`}
                                checked={variable.defaultValue as boolean}
                                onCheckedChange={(checked) =>
                                  updateVariable(variable.id, {
                                    defaultValue: checked,
                                  })
                                }
                                disabled={promptType === "showcase"}
                                data-testid={`checkbox-default-${variable.id}`}
                              />
                              <Label
                                htmlFor={`checkbox-mobile-${variable.id}`}
                                className="text-sm text-white"
                              >
                                Active by default
                              </Label>
                            </div>
                          )}

                          {(variable.type === "multi-select" ||
                            variable.type === "single-select") && (
                            <div className="space-y-2">
                              <Label className="text-xs text-white">
                                Options & Default
                              </Label>
                              <div className="space-y-2">
                                {variable.options?.map((option, index) => {
                                  const isDefault =
                                    (variable.defaultOptionIndex ?? 0) ===
                                    index;
                                  return (
                                    <Card
                                      key={index}
                                      className={`p-2 w-full max-w-full overflow-x-hidden ${isDefault ? "border-teal-500/50 bg-teal-500/5" : ""}`}
                                    >
                                      <div className="space-y-2 w-full max-w-full overflow-x-hidden">
                                        <div className="flex items-center gap-2">
                                          <Checkbox
                                            checked={isDefault}
                                            onCheckedChange={(checked) => {
                                              if (checked) {
                                                updateVariable(variable.id, {
                                                  defaultOptionIndex: index,
                                                });
                                              }
                                            }}
                                            disabled={promptType === "showcase"}
                                            data-testid={`checkbox-default-option-${variable.id}-${index}`}
                                          />
                                          <Label className="text-xs text-white font-medium">
                                            Default
                                          </Label>
                                        </div>
                                        <div className="space-y-1">
                                          <Label className="text-xs text-white">
                                            Anzeigename
                                          </Label>
                                          <Input
                                            value={option.visibleName}
                                            onChange={(e) => {
                                              const newOptions = [
                                                ...(variable.options || []),
                                              ];
                                              newOptions[index] = {
                                                ...option,
                                                visibleName: e.target.value,
                                              };
                                              updateVariable(variable.id, {
                                                options: newOptions,
                                              });
                                            }}
                                            placeholder="Anzeigename"
                                            className="h-8 text-sm"
                                            disabled={promptType === "showcase"}
                                            data-testid={`input-visible-name-${variable.id}-${index}`}
                                          />
                                        </div>
                                        <div className="space-y-1">
                                          <Label className="text-xs text-white">
                                            Prompt Value
                                          </Label>
                                          <Input
                                            value={option.promptValue}
                                            onChange={(e) => {
                                              const newOptions = [
                                                ...(variable.options || []),
                                              ];
                                              newOptions[index] = {
                                                ...option,
                                                promptValue: e.target.value,
                                              };
                                              updateVariable(variable.id, {
                                                options: newOptions,
                                              });
                                            }}
                                            placeholder="Prompt Value"
                                            className="h-8 text-sm"
                                            disabled={promptType === "showcase"}
                                            data-testid={`input-prompt-value-${variable.id}-${index}`}
                                          />
                                        </div>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => {
                                            const newOptions =
                                              variable.options?.filter(
                                                (_, i) => i !== index
                                              ) || [];
                                            updateVariable(variable.id, {
                                              options: newOptions,
                                            });
                                          }}
                                          className="w-full text-destructive"
                                          disabled={promptType === "showcase"}
                                          data-testid={`button-remove-option-${variable.id}-${index}`}
                                        >
                                          <Trash2 className="h-3 w-3 mr-1" />
                                          Option entfernen
                                        </Button>
                                      </div>
                                    </Card>
                                  );
                                })}
                              </div>
                              <div className="flex gap-2">
                                <Input
                                  value={newOptionInput[variable.id] || ""}
                                  onChange={(e) =>
                                    setNewOptionInput({
                                      ...newOptionInput,
                                      [variable.id]: e.target.value,
                                    })
                                  }
                                  placeholder="New option"
                                  className="h-8 text-sm"
                                  disabled={promptType === "showcase"}
                                  data-testid={`input-new-option-${variable.id}`}
                                />
                                <Button
                                  size="sm"
                                  onClick={() => {
                                    const optionText =
                                      newOptionInput[variable.id];
                                    if (!optionText) return;
                                    const newOptions = [
                                      ...(variable.options || []),
                                      {
                                        visibleName: optionText,
                                        promptValue: optionText,
                                      },
                                    ];
                                    updateVariable(variable.id, {
                                      options: newOptions,
                                    });
                                    setNewOptionInput({
                                      ...newOptionInput,
                                      [variable.id]: "",
                                    });
                                  }}
                                  disabled={promptType === "showcase"}
                                  data-testid={`button-add-option-${variable.id}`}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          )}

                          {variable.type === "slider" && (
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <Label className="text-xs text-white">
                                    Min
                                  </Label>
                                  <Input
                                    type="number"
                                    value={variable.min || 0}
                                    onChange={(e) =>
                                      updateVariable(variable.id, {
                                        min: parseInt(e.target.value) || 0,
                                      })
                                    }
                                    className="h-8 text-sm"
                                    disabled={promptType === "showcase"}
                                    data-testid={`input-min-${variable.id}`}
                                  />
                                </div>
                                <div className="space-y-1">
                                  <Label className="text-xs text-white">
                                    Max
                                  </Label>
                                  <Input
                                    type="number"
                                    value={variable.max || 100}
                                    onChange={(e) =>
                                      updateVariable(variable.id, {
                                        max: parseInt(e.target.value) || 100,
                                      })
                                    }
                                    className="h-8 text-sm"
                                    disabled={promptType === "showcase"}
                                    data-testid={`input-max-${variable.id}`}
                                  />
                                </div>
                              </div>
                              <div className="space-y-1">
                                <Label className="text-xs text-white">
                                  Default Value
                                </Label>
                                <Input
                                  type="number"
                                  value={variable.defaultValue as number}
                                  onChange={(e) =>
                                    updateVariable(variable.id, {
                                      defaultValue:
                                        parseInt(e.target.value) || 0,
                                    })
                                  }
                                  className="h-8 text-sm"
                                  disabled={promptType === "showcase"}
                                  data-testid={`input-default-${variable.id}`}
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-4 flex-wrap">
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`required-mobile-${variable.id}`}
                                checked={variable.required}
                                onCheckedChange={(checked) =>
                                  updateVariable(variable.id, {
                                    required: checked as boolean,
                                  })
                                }
                                disabled={promptType === "showcase"}
                                data-testid={`checkbox-required-${variable.id}`}
                              />
                              <Label
                                htmlFor={`required-mobile-${variable.id}`}
                                className="text-sm text-white"
                              >
                                Pflichtfeld
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`allow-ref-image-mobile-${variable.id}`}
                                checked={variable.allowReferenceImage || false}
                                onCheckedChange={(checked) =>
                                  updateVariable(variable.id, {
                                    allowReferenceImage: checked as boolean,
                                  })
                                }
                                disabled={promptType === "showcase"}
                                data-testid={`checkbox-allow-ref-image-mobile-${variable.id}`}
                              />
                              <Label
                                htmlFor={`allow-ref-image-mobile-${variable.id}`}
                                className="text-sm text-white"
                              >
                                allow reference image
                              </Label>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4 pt-4 border-t">
                            <Button
                              onClick={() => {
                                setShowVariableEditor(false);
                              }}
                              className="flex-1"
                              data-testid={`button-save-variable-${variable.id}`}
                            >
                              Fertig
                            </Button>
                            <Button
                              variant="destructive"
                              onClick={() => {
                                setVariableToDelete(variable.id);
                                setDeleteDialogOpen(true);
                              }}
                              data-testid={`button-delete-${variable.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Variable?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this variable? The text will
              remain as normal text in the prompt.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">
              No
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteVariable}
              data-testid="button-confirm-delete"
            >
              Yes, delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={unsavedVariableDialog}
        onOpenChange={setUnsavedVariableDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Variables</AlertDialogTitle>
            <AlertDialogDescription>
              You have open variables with potentially unsaved changes. Do you
              want to generate anyway?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-generate">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={proceedWithGenerate}
              data-testid="button-proceed-generate"
            >
              Generate
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showValidationDialog}
        onOpenChange={setShowValidationDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Missing Information</AlertDialogTitle>
            <AlertDialogDescription>
              Please fill in all required fields: Title, Category, and Tags.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowValidationDialog(false)}
              data-testid="button-validation-ok"
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showLoadDialog} onOpenChange={setShowLoadDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Load Prompt</AlertDialogTitle>
            <AlertDialogDescription>
              Select a saved prompt to load and edit.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <ScrollArea className="max-h-[400px]">
            <div className="space-y-2 p-1">
              {savedPrompts && savedPrompts.length > 0 ? (
                savedPrompts.map((p: any) => (
                  <Button
                    key={p.id}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => loadPrompt(p.id)}
                    data-testid={`button-load-prompt-${p.id}`}
                  >
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{p.title}</span>
                      <span className="text-xs text-foreground">
                        {p.createdAt
                          ? new Date(p.createdAt).toLocaleDateString()
                          : "Recent"}
                      </span>
                    </div>
                  </Button>
                ))
              ) : (
                <p className="text-sm text-foreground text-center py-4">
                  No saved prompts found.
                </p>
              )}
            </div>
          </ScrollArea>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-load">
              Cancel
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={linkOrCreateDialog.open}
        onOpenChange={(open) => {
          if (!open) {
            setLinkOrCreateDialog({
              open: false,
              varName: "",
              selectedText: "",
              selectionRange: null,
            });
          }
        }}
      >
        <AlertDialogContent className="max-w-md">
          <div className="flex justify-end -mt-2 -mr-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-sm opacity-70 hover:opacity-100"
              onClick={() =>
                setLinkOrCreateDialog({
                  open: false,
                  varName: "",
                  selectedText: "",
                  selectionRange: null,
                })
              }
              data-testid="button-close-link-dialog"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <AlertDialogHeader className="-mt-4">
            <AlertDialogTitle>Variable Already Exists</AlertDialogTitle>
            <AlertDialogDescription>
              A variable with the name "
              <span className="font-medium">{linkOrCreateDialog.varName}</span>"
              already exists. What would you like to do?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              onClick={handleLinkVariable}
              className="w-full"
              data-testid="button-link-variable"
            >
              Link to existing variable
            </Button>
            <Button
              onClick={handleCreateNewVariable}
              className="w-full"
              data-testid="button-create-new-variable"
            >
              Create new variable
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
}
