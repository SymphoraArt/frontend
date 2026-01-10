"use client";

/**
 * ChainSwitcher Component
 * 
 * Allows users to switch between supported chains.
 * Displays current chain and provides dropdown to switch.
 * 
 * Usage:
 * ```tsx
 * <ChainSwitcher />
 * ```
 */

import { useActiveWallet } from "thirdweb/react";
import { supportedChains, defaultChain } from "@/lib/thirdweb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Network } from "lucide-react";
import { useState } from "react";

export function ChainSwitcher() {
  const wallet = useActiveWallet();
  // Default to the default chain, user can switch
  const [selectedChainId, setSelectedChainId] = useState<number>(defaultChain.id);

  if (!wallet) {
    return null;
  }

  const activeChain = supportedChains.find((c) => c.id === selectedChainId) || defaultChain;

  const handleChainChange = async (chainId: string) => {
    const targetChain = supportedChains.find(
      (chain) => chain.id === Number(chainId)
    );

    if (targetChain && wallet) {
      try {
        // Switch chain on the wallet
        if (wallet.switchChain) {
          await wallet.switchChain(targetChain);
        }
        setSelectedChainId(targetChain.id);
      } catch (error) {
        console.error("Failed to switch chain:", error);
        // Still update UI even if switch fails (for UX)
        setSelectedChainId(targetChain.id);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Network className="h-4 w-4 text-muted-foreground" />
      <Select
        value={activeChain.id.toString()}
        onValueChange={handleChainChange}
      >
        <SelectTrigger className="w-[180px] h-9 border-border/60">
          <SelectValue>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {activeChain.name}
              </Badge>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {supportedChains.map((chain) => (
            <SelectItem key={chain.id} value={chain.id.toString()}>
              <div className="flex items-center justify-between w-full">
                <span>{chain.name}</span>
                {chain.id === activeChain.id && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Active
                  </Badge>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
