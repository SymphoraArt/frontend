'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  Copy,
  ExternalLink,
  CreditCard,
  Calculator,
  Clock
} from 'lucide-react';
import { useToast } from './hooks/use-toast';
import { useUniversalProfile } from '../hooks/useUniversalProfile';
import { UniversalProfileCard } from './UniversalProfileCard';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  promptTitle: string;
  promptPrice: string; // LYX amount
  creatorAddress: string;
  onPaymentComplete: (transactionHash: string) => void;
}

interface PaymentCalculation {
  lyxAmount: string;
  platformFee: string;
  totalLYX: string;
  usdEquivalent: number;
}

interface PaymentVerification {
  verified: boolean;
  error?: string;
  amountPaid?: string;
  from?: string;
  to?: string;
  blockNumber?: number;
  timestamp?: number;
}

export function PaymentModal({
  isOpen,
  onClose,
  promptTitle,
  promptPrice,
  creatorAddress,
  onPaymentComplete
}: PaymentModalProps) {
  const { toast } = useToast();
  const { profile, isConnected } = useUniversalProfile();

  // Payment state
  const [calculation, setCalculation] = useState<PaymentCalculation | null>(null);
  const [transactionHash, setTransactionHash] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<PaymentVerification | null>(null);
  const [isCalculating, setIsCalculating] = useState(true);

  // Calculate payment amounts on mount
  useEffect(() => {
    if (isOpen && promptPrice) {
      calculatePayment();
    }
  }, [isOpen, promptPrice]);

  const calculatePayment = async () => {
    try {
      setIsCalculating(true);
      const response = await fetch(`/api/payments/calculate?amount=${promptPrice}&includeFee=true`);
      if (!response.ok) {
        throw new Error('Failed to calculate payment');
      }

      const data = await response.json();
      setCalculation(data);
    } catch (error: any) {
      console.error('Payment calculation error:', error);
      toast({
        title: 'Calculation Error',
        description: 'Failed to calculate payment amounts. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Address copied to clipboard',
    });
  };

  const verifyPayment = async () => {
    if (!transactionHash.trim()) {
      toast({
        title: 'Transaction Hash Required',
        description: 'Please enter the transaction hash from your LUKSO wallet.',
        variant: 'destructive',
      });
      return;
    }

    setIsVerifying(true);
    setVerificationResult(null);

    try {
      const response = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionHash: transactionHash.trim(),
          expectedAmount: calculation?.totalLYX,
          recipientAddress: creatorAddress,
          useTestnet: process.env.NODE_ENV !== 'production'
        }),
      });

      const result: PaymentVerification = await response.json();
      setVerificationResult(result);

      if (result.verified) {
        toast({
          title: 'Payment Verified! 🎉',
          description: `Successfully verified payment of ${result.amountPaid} LYX`,
        });

        // Wait a moment for user to see success, then close
        setTimeout(() => {
          onPaymentComplete(transactionHash.trim());
          onClose();
        }, 2000);
      } else {
        toast({
          title: 'Payment Verification Failed',
          description: result.error || 'Payment could not be verified.',
          variant: 'destructive',
        });
      }
    } catch (error: any) {
      console.error('Payment verification error:', error);
      setVerificationResult({
        verified: false,
        error: 'Network error during verification. Please try again.'
      });
      toast({
        title: 'Verification Error',
        description: 'Failed to verify payment. Please check your connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const resetModal = () => {
    setTransactionHash('');
    setVerificationResult(null);
    setIsVerifying(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5" />
            <span>Complete Payment</span>
          </DialogTitle>
          <DialogDescription>
            Pay for "{promptTitle}" using LUKSO blockchain
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Connected Universal Profile */}
          {isConnected && profile && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Connected Universal Profile
              </h3>
              <UniversalProfileCard profile={profile} compact showActions={false} />
              <p className="text-xs text-blue-700 mt-2">
                Payments will be made from your connected Universal Profile
              </p>
            </div>
          )}

          {/* Payment Summary */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span>Payment Summary</span>
            </h3>

            {isCalculating ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Calculating...</span>
              </div>
            ) : calculation ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Creator Amount:</span>
                  <span>{calculation.lyxAmount} LYX</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Platform Fee (3%):</span>
                  <span>{calculation.platformFee} LYX</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{calculation.totalLYX} LYX</span>
                </div>
                <div className="text-xs text-gray-500">
                  ≈ ${calculation.usdEquivalent.toFixed(2)} USD
                </div>
              </div>
            ) : (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Failed to calculate payment amounts
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Payment Instructions */}
          <div className="space-y-4">
            <h3 className="font-semibold">Payment Instructions</h3>

            <div className="space-y-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Send exactly {calculation?.totalLYX} LYX</p>
                    <p className="text-xs text-gray-600">Include platform fee in your payment</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Send to creator address:</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono break-all">
                        {creatorAddress}
                      </code>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(creatorAddress)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="flex items-start space-x-2">
                  <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Copy transaction hash</p>
                    <p className="text-xs text-gray-600">After payment is confirmed on blockchain</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`https://universalprofiles.cloud/${process.env.NODE_ENV === 'production' ? '' : 'testnet'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  <span>Open LUKSO Wallet</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Transaction Hash Input */}
          <div className="space-y-2">
            <Label htmlFor="transactionHash">Transaction Hash</Label>
            <Input
              id="transactionHash"
              value={transactionHash}
              onChange={(e) => setTransactionHash(e.target.value)}
              placeholder="0x..."
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-600">
              Paste the transaction hash from your LUKSO wallet after sending the payment
            </p>
          </div>

          {/* Verification Result */}
          {verificationResult && (
            <Alert variant={verificationResult.verified ? "default" : "destructive"}>
              {verificationResult.verified ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>
                {verificationResult.verified
                  ? `Payment verified! ${verificationResult.amountPaid} LYX received.`
                  : verificationResult.error
                }
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={verifyPayment}
              disabled={isVerifying || !calculation}
              className="flex-1"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Verify Payment
                </>
              )}
            </Button>
          </div>

          {/* Testnet Notice */}
          {process.env.NODE_ENV !== 'production' && (
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="flex items-center space-x-2 text-yellow-800">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Testnet Mode</span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">
                Using LUKSO testnet for development. Use test LYX for payments.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
