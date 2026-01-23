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
 * - Balance display (optional)
 *
 * Used in navigation bars and wallet status displays.
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
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getChainExplorerUrl } from "@/lib/thirdweb";
import { useWalletInfo, useWalletAuthentication } from "@/hooks/useWalletInfo";

export function WalletInfo() {
  const wallet = useActiveWallet();
  const walletInfo = useWalletInfo();
  const auth = useWalletAuthentication();
  const { toast } = useToast();

  // #region agent log
  if (typeof window !== 'undefined' && wallet && walletInfo.isConnected) {
    (async () => {
      try {
        let eoaAddress = null;
        try {
          const walletAccount = await wallet.getAccount();
          eoaAddress = walletAccount?.address || null;
        } catch (e) {}
        fetch('http://127.0.0.1:7245/ingest/09072fc2-e9a8-4b0b-9748-5e9d2e8abc2b',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'WalletInfo.tsx:render',message:'WalletInfo displaying address',data:{displayedAddress:walletInfo.address,walletEOA:eoaAddress,walletId:wallet.id,addressesMatch:walletInfo.address===eoaAddress,isSmartAccount:walletInfo.address!==eoaAddress},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      } catch (e) {}
    })();
  }
  // #endregion

  if (!walletInfo.isConnected || !walletInfo.address) {
    return null;
  }

  const { address, shortAddress, chain, displayName, icon, description } = walletInfo;

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
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
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel className="space-y-1">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold">Wallet Connected</span>
            {auth.isSecure ? (
              <ShieldCheck className="h-3 w-3 text-green-500" />
            ) : (
              <ShieldAlert className="h-3 w-3 text-yellow-500" />
            )}
          </div>
          <div className="text-xs text-muted-foreground font-normal">
            {description}
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

        {/* Chain Info */}
        {chain.name && (
          <div className="px-2 py-1.5">
            <div className="text-xs text-muted-foreground mb-1">Network</div>
            <Badge variant="outline" className="text-xs">
              {chain.name}
            </Badge>
          </div>
        )}

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
  );
}
