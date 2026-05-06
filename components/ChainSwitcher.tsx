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
    <Select
      value={activeChain.id.toString()}
      onValueChange={handleChainChange}
    >
      <SelectTrigger className="w-auto h-[38px] px-3 border-none bg-transparent hover:bg-black/5 rounded-full text-[13px] font-medium text-[#555] transition-colors shadow-none focus:ring-0 gap-2">
        <SelectValue>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#d94f3d]" />
            {activeChain.name}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="rounded-[20px] border border-white/60 bg-white/70 backdrop-blur-2xl shadow-xl p-1">
        {supportedChains.map((chain) => (
          <SelectItem key={chain.id} value={chain.id.toString()} className="rounded-xl cursor-pointer">
            <div className="flex items-center justify-between w-full">
              <span>{chain.name}</span>
              {chain.id === activeChain.id && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#d94f3d] ml-2" />
              )}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
