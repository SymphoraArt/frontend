"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, Loader2, AlertCircle, X } from "lucide-react";
import { useWalletAuth } from "@/hooks/useWalletAuth";
import { useActiveAccount } from "thirdweb/react";

interface ReviewFormProps {
  promptId: string;
  promptTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ReviewForm({
  promptId,
  promptTitle,
  isOpen,
  onClose,
  onSuccess,
}: ReviewFormProps) {
  const account = useActiveAccount();
  const { authHeaders, authenticate, isAuthenticated } = useWalletAuth();
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pros, setPros] = useState<string[]>([]);
  const [cons, setCons] = useState<string[]>([]);
  const [proInput, setProInput] = useState("");
  const [conInput, setConInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddPro = () => {
    const trimmed = proInput.trim();
    if (trimmed && !pros.includes(trimmed) && pros.length < 5) {
      setPros([...pros, trimmed]);
      setProInput("");
    }
  };

  const handleRemovePro = (pro: string) => {
    setPros(pros.filter(p => p !== pro));
  };

  const handleAddCon = () => {
    const trimmed = conInput.trim();
    if (trimmed && !cons.includes(trimmed) && cons.length < 5) {
      setCons([...cons, trimmed]);
      setConInput("");
    }
  };

  const handleRemoveCon = (con: string) => {
    setCons(cons.filter(c => c !== con));
  };

  const handleSubmit = async () => {
    if (!account) {
      setError("Please connect your wallet to submit a review");
      return;
    }

    if (!isAuthenticated || !authHeaders) {
      const authResult = await authenticate();
      if (!authResult) {
        setError("Authentication failed. Please try again.");
        return;
      }
    }

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (content.trim().length < 10) {
      setError("Review content must be at least 10 characters");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/prompts/${promptId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders!,
        },
        body: JSON.stringify({
          rating,
          title: title.trim() || undefined,
          content: content.trim(),
          pros: pros.length > 0 ? pros : undefined,
          cons: cons.length > 0 ? cons : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      onSuccess();
      resetForm();
    } catch (err: any) {
      console.error('Error submitting review:', err);
      setError(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setRating(0);
    setHoveredRating(0);
    setTitle("");
    setContent("");
    setPros([]);
    setCons([]);
    setProInput("");
    setConInput("");
    setError(null);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      resetForm();
      onClose();
    }
  };

  const displayRating = hoveredRating || rating;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>
            Share your experience with "{promptTitle}"
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Rating */}
          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= displayRating
                        ? 'fill-primary text-primary'
                        : 'fill-muted text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="text-sm text-muted-foreground ml-2">
                  {rating} {rating === 1 ? 'star' : 'stars'}
                </span>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="review-title">Title (optional)</Label>
            <Input
              id="review-title"
              placeholder="Summarize your review in a few words"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              maxLength={200}
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="review-content">Review *</Label>
            <Textarea
              id="review-content"
              placeholder="Share your detailed experience with this prompt..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setError(null);
              }}
              disabled={isSubmitting}
              maxLength={2000}
              rows={6}
            />
            <p className="text-xs text-muted-foreground">
              {content.length}/2000 characters (minimum 10)
            </p>
          </div>

          {/* Pros */}
          <div className="space-y-2">
            <Label>Pros (optional)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a positive point"
                value={proInput}
                onChange={(e) => setProInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddPro();
                  }
                }}
                disabled={isSubmitting || pros.length >= 5}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddPro}
                disabled={isSubmitting || pros.length >= 5 || !proInput.trim()}
              >
                Add
              </Button>
            </div>
            {pros.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {pros.map((pro, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-700 rounded-md text-sm"
                  >
                    {pro}
                    <button
                      type="button"
                      onClick={() => handleRemovePro(pro)}
                      disabled={isSubmitting}
                      className="ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Add up to 5 positive aspects
            </p>
          </div>

          {/* Cons */}
          <div className="space-y-2">
            <Label>Cons (optional)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add an area for improvement"
                value={conInput}
                onChange={(e) => setConInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddCon();
                  }
                }}
                disabled={isSubmitting || cons.length >= 5}
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleAddCon}
                disabled={isSubmitting || cons.length >= 5 || !conInput.trim()}
              >
                Add
              </Button>
            </div>
            {cons.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {cons.map((con, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 px-2 py-1 bg-red-500/10 text-red-700 rounded-md text-sm"
                  >
                    {con}
                    <button
                      type="button"
                      onClick={() => handleRemoveCon(con)}
                      disabled={isSubmitting}
                      className="ml-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              Add up to 5 areas for improvement
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <AlertCircle className="h-4 w-4 text-destructive shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
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
              disabled={isSubmitting || !account || !isAuthenticated || rating === 0 || content.trim().length < 10}
              className="flex-1"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Review'
              )}
            </Button>
          </div>

          {!account && (
            <p className="text-xs text-center text-muted-foreground">
              Please connect your wallet to submit a review
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
