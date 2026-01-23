"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, Store, AlertCircle, CheckCircle, X } from "lucide-react";
import { useActiveAccount } from "thirdweb/react";
import { useWalletAuth } from "@/hooks/useWalletAuth";
import { useQuery } from "@tanstack/react-query";

interface Category {
  id: string;
  name: string;
  promptCount: number;
}

interface PromptListModalProps {
  promptId: string;
  promptTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function PromptListModal({
  promptId,
  promptTitle,
  isOpen,
  onClose,
  onSuccess,
}: PromptListModalProps) {
  const account = useActiveAccount();
  const { authHeaders, authenticate, isAuthenticated } = useWalletAuth();
  const [priceCents, setPriceCents] = useState<string>("");
  const [licenseType, setLicenseType] = useState<'personal' | 'commercial' | 'exclusive'>('personal');
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [category, setCategory] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch categories
  const { data: categoriesData } = useQuery<{ categories: Category[] }>({
    queryKey: ["/api/marketplace/categories"],
    queryFn: async () => {
      const res = await fetch("/api/marketplace/categories");
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
    enabled: isOpen,
  });

  const categories = categoriesData?.categories || [];

  // Authenticate when modal opens
  useEffect(() => {
    if (isOpen && account && !isAuthenticated) {
      authenticate();
    }
  }, [isOpen, account, isAuthenticated, authenticate]);

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < 10) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async () => {
    if (!account) {
      setError("Please connect your wallet to list prompts");
      return;
    }

    if (!isAuthenticated || !authHeaders) {
      const authResult = await authenticate();
      if (!authResult) {
        setError("Authentication failed. Please try again.");
        return;
      }
    }

    const price = parseFloat(priceCents);
    if (isNaN(price) || price < 0 || price > 9999.99) {
      setError("Price must be between $0.00 and $9,999.99");
      return;
    }

    if (price > 0 && price < 0.05) {
      setError("Price must be at least $0.05 to cover transaction costs");
      return;
    }

    if (price > 100 && licenseType === 'personal') {
      setError("Personal license is limited to $100.00. Use commercial or exclusive license for higher prices.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const priceCentsInt = Math.round(price * 100);
      
      const response = await fetch(`/api/prompts/${promptId}/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders!,
        },
        body: JSON.stringify({
          priceUsdCents: priceCentsInt,
          licenseType,
          description: description.trim() || undefined,
          tags: tags.length > 0 ? tags : undefined,
          category: category || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to list prompt');
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
        onClose();
        resetForm();
      }, 1500);
    } catch (err: any) {
      console.error('Error listing prompt:', err);
      setError(err.message || 'Failed to list prompt. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setPriceCents("");
    setLicenseType('personal');
    setDescription("");
    setTags([]);
    setTagInput("");
    setCategory("");
    setError(null);
    setSuccess(false);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  const priceUsd = priceCents ? parseFloat(priceCents).toFixed(2) : "0.00";
  const isFree = priceCents === "" || parseFloat(priceCents) === 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            List Prompt for Sale
          </DialogTitle>
          <DialogDescription>
            Set pricing and details for "{promptTitle}" to make it available in the marketplace.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Price */}
          <div className="space-y-2">
            <Label htmlFor="price">Price (USD) *</Label>
            <div className="flex items-center gap-2">
              <span className="text-lg font-medium">$</span>
              <Input
                id="price"
                type="number"
                min="0"
                max="9999.99"
                step="0.01"
                placeholder="0.00"
                value={priceCents}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0 && parseFloat(val) <= 9999.99)) {
                    setPriceCents(val);
                    setError(null);
                  }
                }}
                disabled={isSubmitting}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {isFree 
                ? "Free prompts are available to all users without payment"
                : "Minimum $0.05 to cover transaction costs. Personal license limited to $100.00"}
            </p>
          </div>

          {/* License Type */}
          <div className="space-y-2">
            <Label htmlFor="license">License Type *</Label>
            <Select value={licenseType} onValueChange={(v) => setLicenseType(v as any)} disabled={isSubmitting}>
              <SelectTrigger id="license">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal Use License</SelectItem>
                <SelectItem value="commercial">Commercial License</SelectItem>
                <SelectItem value="exclusive">Exclusive Rights License</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {licenseType === 'personal' && "Use for personal projects only"}
              {licenseType === 'commercial' && "Use in commercial projects and products"}
              {licenseType === 'exclusive' && "Full exclusive rights to the prompt"}
            </p>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory} disabled={isSubmitting}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">No category</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name} {cat.promptCount > 0 && `(${cat.promptCount})`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your prompt, its use cases, and what makes it special..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              maxLength={2000}
              rows={4}
            />
            <p className="text-xs text-muted-foreground">
              {description.length}/2000 characters
            </p>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <div className="flex gap-2">
              <Input
                id="tags"
                placeholder="Add a tag (press Enter)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isSubmitting || tags.length >= 10}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddTag}
                disabled={isSubmitting || tags.length >= 10 || !tagInput.trim()}
              >
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => !isSubmitting && handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Add up to 10 tags to help users discover your prompt
            </p>
          </div>

          {/* Revenue Split Info */}
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <h4 className="font-medium text-sm">Revenue Split</h4>
            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Your Earnings:</span>
                <span className="font-medium">80%</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee:</span>
                <span className="font-medium">20%</span>
              </div>
              {!isFree && (
                <div className="pt-2 border-t">
                  <div className="flex justify-between font-medium">
                    <span>You'll receive:</span>
                    <span>${(parseFloat(priceUsd) * 0.8).toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-md">
              <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
              <p className="text-sm text-green-500">Prompt listed successfully!</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !account || !isAuthenticated}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Listing...
                </>
              ) : (
                <>
                  <Store className="h-4 w-4 mr-2" />
                  List for {isFree ? "Free" : `$${priceUsd}`}
                </>
              )}
            </Button>
          </div>

          {!account && (
            <p className="text-xs text-center text-muted-foreground">
              Please connect your wallet to list prompts
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
