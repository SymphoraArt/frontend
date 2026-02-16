"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ShoppingCart, CheckCircle, AlertCircle } from "lucide-react";
import { useX402PaymentProduction } from "@/hooks/useX402PaymentProduction";

interface PromptUnlockModalProps {
  promptId: string;
  title: string;
  artistName: string;
  priceCents: number;
  licenseType?: 'personal' | 'commercial' | 'exclusive';
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function PromptUnlockModal({
  promptId,
  title,
  artistName,
  priceCents,
  licenseType = 'personal',
  description,
  isOpen,
  onClose,
  onSuccess,
}: PromptUnlockModalProps) {
  const { unlockPrompt, isPending, getPaymentStatus } = useX402PaymentProduction();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const priceUsd = (priceCents / 100).toFixed(2);

  const licenseDisplay = {
    personal: "Personal Use License",
    commercial: "Commercial License",
    exclusive: "Exclusive Rights License"
  };

  const licenseDescriptions = {
    personal: "Use for personal projects only",
    commercial: "Use in commercial projects and products",
    exclusive: "Full exclusive rights to the prompt"
  };

  const handleUnlock = async () => {
    const status = getPaymentStatus();
    if (!status.isReady) {
      setError("Please connect your wallet to proceed with payment.");
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await unlockPrompt(promptId, 'base-sepolia') as { success: boolean; error?: string };

      if (result.success) {
        onSuccess();
        onClose();
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (error: any) {
      console.error('Unlock error:', error);
      setError(error.message || "Failed to unlock prompt. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetModal = () => {
    setError(null);
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Unlock Prompt
          </DialogTitle>
          <DialogDescription>
            Purchase access to this premium prompt and unlock its full potential.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Prompt Info */}
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-muted-foreground">by {artistName}</p>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>

          {/* Price and License */}
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Price</span>
              <span className="text-xl font-bold text-primary">${priceUsd}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-medium">License</span>
              <Badge variant="secondary">{licenseDisplay[licenseType]}</Badge>
            </div>

            <p className="text-xs text-muted-foreground">
              {licenseDescriptions[licenseType]}
            </p>
          </div>

          {/* What's Included */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">What's Included:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                Decrypted prompt template
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                Variable settings and configurations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                Generation parameters and presets
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                {licenseDisplay[licenseType]}
              </li>
            </ul>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isProcessing || isPending}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUnlock}
              disabled={isProcessing || isPending}
              className="flex-1"
            >
              {isProcessing || isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Unlock for ${priceUsd}
                </>
              )}
            </Button>
          </div>

          {/* Footer Note */}
          <p className="text-xs text-center text-muted-foreground">
            Payment processed securely via X402 protocol on Base Sepolia
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}