"use client";

/**
 * Enhanced WalletInfo Component
 *
 * Comprehensive wallet information display with:
 * - Wallet type detection (in-app vs external)
 * - Authentication method display (email, Google, phone, passkey, MetaMask, etc.)
 * - Security validation and warnings
 * - Chain information
 * - Quick actions (copy, view on explorer, disconnect)
 *
 * Features:
 * - Visual security indicators (green shield for secure, red alert for issues)
 * - Detailed authentication method badges
 * - Smart account detection
 * - Security warnings display
 * - Responsive design
 */

import { useActiveWallet } from "thirdweb/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Copy,
  ExternalLink,
  LogOut,
  Wallet,
  ShieldAlert,
  ShieldCheck,
  Info,
  AlertTriangle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getChainExplorerUrl } from "@/lib/thirdweb";
import { useWalletInfo, useWalletAuthentication } from "@/hooks/useWalletInfo";
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
import { useState } from "react";

export function WalletInfoEnhanced() {
  const wallet = useActiveWallet();
  const walletInfo = useWalletInfo();
  const auth = useWalletAuthentication();
  const { toast } = useToast();
  const [showSecurityWarnings, setShowSecurityWarnings] = useState(false);

  if (!walletInfo.isConnected || !walletInfo.address) {
    return null;
  }

  const { address, shortAddress, chain, security, displayName, icon, description, authMethod, type } = walletInfo;
  const hasWarnings = security.warnings.length > 0;
  const isSecure = security.isValidWallet && security.isSecureConnection;

  // Copy address to clipboard
  const handleCopyAddress = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Failed to copy address to clipboard",
        variant: "destructive",
      });
    }
  };

  // View on explorer
  const handleViewOnExplorer = () => {
    if (chain.id && address) {
      const explorerUrl = getChainExplorerUrl(chain.id, address);
      window.open(explorerUrl, "_blank");
    }
  };

  // Disconnect wallet
  const handleDisconnect = async () => {
    try {
      if (wallet) {
        await wallet.disconnect();
      } else {
        // Fallback: reload page to clear state
        window.location.reload();
      }
      toast({
        title: "Wallet disconnected",
        description: "You have been disconnected from your wallet",
      });
    } catch (error) {
      toast({
        title: "Disconnect failed",
        description: "Failed to disconnect wallet",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={isSecure ? "outline" : "destructive"}
            className="gap-2 h-9 px-3 border-border/60 hover:bg-accent/50"
          >
            <span className="text-base">{icon}</span>
            <span className="hidden sm:inline text-sm font-medium">
              {displayName}
            </span>
            <Badge
              variant="secondary"
              className="text-xs font-mono bg-muted/50 text-foreground/80"
            >
              {shortAddress}
            </Badge>
            {!isSecure && (
              <ShieldAlert className="h-3 w-3 text-destructive" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72">
          <DropdownMenuLabel className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-semibold">Wallet Connected</span>
              </div>
              {isSecure ? (
                <ShieldCheck className="h-4 w-4 text-green-500" />
              ) : (
                <ShieldAlert className="h-4 w-4 text-yellow-500" />
              )}
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground font-normal">
                {description}
              </div>
              {type === "in-app" && (
                <Badge variant="outline" className="text-xs">
                  {authMethod}
                </Badge>
              )}
              {security.isSmartAccount && (
                <Badge variant="secondary" className="text-xs">
                  Smart Account (ERC-4337)
                </Badge>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          {/* Wallet Address */}
          <div className="px-2 py-1.5">
            <div className="text-xs text-muted-foreground mb-1">Address</div>
            <div className="flex items-center gap-2">
              <code className="text-xs font-mono text-foreground break-all flex-1">
                {address}
              </code>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyAddress();
                }}
                title="Copy address"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* Wallet Type */}
          <div className="px-2 py-1.5">
            <div className="text-xs text-muted-foreground mb-1">Type</div>
            <Badge variant="outline" className="text-xs">
              {type === "in-app" ? "In-App Wallet" : "External Wallet"}
            </Badge>
          </div>

          {/* Chain Info */}
          {chain.name && (
            <div className="px-2 py-1.5">
              <div className="text-xs text-muted-foreground mb-1">Network</div>
              <Badge variant="outline" className="text-xs">
                {chain.name}
              </Badge>
            </div>
          )}

          {/* Security Status */}
          <div className="px-2 py-1.5">
            <div className="text-xs text-muted-foreground mb-1">Security</div>
            <div className="flex items-center gap-2">
              {isSecure ? (
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <ShieldCheck className="h-3 w-3" />
                  <span>Secure & Validated</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 text-xs text-yellow-600">
                  <ShieldAlert className="h-3 w-3" />
                  <span>Warnings Detected</span>
                </div>
              )}
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Actions */}
          <DropdownMenuItem onClick={handleCopyAddress} className="cursor-pointer">
            <Copy className="h-4 w-4 mr-2" />
            Copy Address
          </DropdownMenuItem>
          {chain.id && (
            <DropdownMenuItem
              onClick={handleViewOnExplorer}
              className="cursor-pointer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Explorer
            </DropdownMenuItem>
          )}
          {hasWarnings && (
            <DropdownMenuItem
              onClick={() => setShowSecurityWarnings(true)}
              className="cursor-pointer text-yellow-600"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              View Security Warnings
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleDisconnect}
            className="cursor-pointer text-destructive focus:text-destructive"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Security Warnings Dialog */}
      <AlertDialog open={showSecurityWarnings} onOpenChange={setShowSecurityWarnings}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-yellow-500" />
              Security Warnings
            </AlertDialogTitle>
            <AlertDialogDescription>
              The following security issues were detected with your wallet:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-2 py-4">
            {security.warnings.map((warning, index) => (
              <div
                key={index}
                className="flex items-start gap-2 p-2 rounded-md bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
              >
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  {warning}
                </p>
              </div>
            ))}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction onClick={() => setShowSecurityWarnings(false)}>
              Understood
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
