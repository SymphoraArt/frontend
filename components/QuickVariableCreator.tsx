"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";

type VariableType = "text" | "number" | "select";

interface QuickVariableCreatorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (variable: {
    name: string;
    type: VariableType;
    defaultValue: string;
    options?: string[];
  }) => void;
  initialName?: string;
  insertPosition?: number;
}

export default function QuickVariableCreator({
  open,
  onOpenChange,
  onCreate,
  initialName = "",
  insertPosition,
}: QuickVariableCreatorProps) {
  const [name, setName] = useState(initialName);
  const [type, setType] = useState<VariableType>("text");
  const [defaultValue, setDefaultValue] = useState("");
  const [options, setOptions] = useState("");
  const [error, setError] = useState("");

  const handleCreate = () => {
    // Validate name
    const sanitizedName = name.trim().replace(/[^a-zA-Z0-9_]/g, "");
    if (!sanitizedName) {
      setError("Variable name is required");
      return;
    }

    // Validate name format (must start with letter or underscore)
    if (!/^[a-zA-Z_]/.test(sanitizedName)) {
      setError("Variable name must start with a letter or underscore");
      return;
    }

    // Validate select options
    if (type === "select") {
      const optionList = options
        .split(",")
        .map((o) => o.trim())
        .filter(Boolean);
      if (optionList.length === 0) {
        setError("Please provide at least one option for select type");
        return;
      }
      if (!defaultValue || !optionList.includes(defaultValue.trim())) {
        setError("Default value must be one of the provided options");
        return;
      }
    }

    // Validate number default value
    if (type === "number") {
      const numValue = Number(defaultValue);
      if (defaultValue && isNaN(numValue)) {
        setError("Default value must be a valid number");
        return;
      }
    }

    setError("");

    // Create variable
    onCreate({
      name: sanitizedName,
      type,
      defaultValue: defaultValue.trim(),
      options:
        type === "select"
          ? options
              .split(",")
              .map((o) => o.trim())
              .filter(Boolean)
          : undefined,
    });

    // Reset form
    setName("");
    setType("text");
    setDefaultValue("");
    setOptions("");
    onOpenChange(false);
  };

  const handleCancel = () => {
    setName(initialName);
    setType("text");
    setDefaultValue("");
    setOptions("");
    setError("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Variable</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Variable Name */}
          <div className="space-y-2">
            <Label htmlFor="var-name">Variable Name</Label>
            <Input
              id="var-name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="e.g., Color, Style, Object"
              className={error && !name.trim() ? "border-destructive" : ""}
              data-testid="input-quick-var-name"
            />
            <p className="text-xs text-muted-foreground">
              Only letters, numbers, and underscores. Will be inserted as [name]
            </p>
          </div>

          {/* Variable Type */}
          <div className="space-y-2">
            <Label htmlFor="var-type">Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as VariableType)}>
              <SelectTrigger id="var-type" data-testid="select-quick-var-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text</SelectItem>
                <SelectItem value="number">Number</SelectItem>
                <SelectItem value="select">Select (Dropdown)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Default Value */}
          <div className="space-y-2">
            <Label htmlFor="var-default">
              Default Value {type === "select" && "(must match an option)"}
            </Label>
            {type === "select" ? (
              <Select
                value={defaultValue}
                onValueChange={setDefaultValue}
                disabled={!options.trim()}
              >
                <SelectTrigger
                  id="var-default"
                  data-testid="select-quick-var-default"
                >
                  <SelectValue placeholder="Select an option..." />
                </SelectTrigger>
                <SelectContent>
                  {options
                    .split(",")
                    .map((o) => o.trim())
                    .filter(Boolean)
                    .map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id="var-default"
                type={type === "number" ? "number" : "text"}
                value={defaultValue}
                onChange={(e) => {
                  setDefaultValue(e.target.value);
                  setError("");
                }}
                placeholder={
                  type === "number"
                    ? "e.g., 10"
                    : "e.g., red, modern, camera"
                }
                data-testid="input-quick-var-default"
              />
            )}
          </div>

          {/* Options (for select type) */}
          {type === "select" && (
            <div className="space-y-2">
              <Label htmlFor="var-options">Options (comma-separated)</Label>
              <Textarea
                id="var-options"
                value={options}
                onChange={(e) => {
                  setOptions(e.target.value);
                  setError("");
                }}
                placeholder="e.g., red, blue, green, yellow"
                className="min-h-[80px] resize-none"
                data-testid="textarea-quick-var-options"
              />
              <p className="text-xs text-muted-foreground">
                Enter options separated by commas
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <Button variant="outline" onClick={handleCancel} data-testid="button-cancel-quick-var">
              Cancel
            </Button>
            <Button onClick={handleCreate} data-testid="button-create-quick-var">
              Edit in Prompt Editor
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

