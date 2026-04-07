"use client";

/**
 * ChainSwitcher Component
 *
 * Icon-only trigger: shows current chain logo. Dropdown shows [logo] [name] [check] per row.
 */

import { useActiveWallet, useActiveWalletChain } from "thirdweb/react";
import { supportedChains, defaultChain, getChainLogoUrl } from "@/lib/thirdweb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function ChainSwitcher() {
  const wallet = useActiveWallet();
  const chain = useActiveWalletChain();
  const activeChain =
    supportedChains.find((c) => c.id === (chain?.id ?? defaultChain.id)) ?? defaultChain;

  if (!wallet) {
    return null;
  }

  const handleChainChange = async (chainId: string) => {
    const targetChain = supportedChains.find((c) => c.id === Number(chainId));
    if (!targetChain || !wallet) return;
    try {
      if (wallet.switchChain) {
        await wallet.switchChain(targetChain);
      }
    } catch (error) {
      console.error("Failed to switch chain:", error);
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 border-border/60"
          aria-label="Switch network"
        >
          <img
            src={getChainLogoUrl(activeChain.id)}
            alt=""
            width={20}
            height={20}
            className="h-4 w-4 sm:h-5 sm:w-5 rounded-full object-contain"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]" sideOffset={4}>
        {supportedChains.map((c) => (
          <DropdownMenuItem
            key={c.id}
            onClick={() => handleChainChange(c.id.toString())}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src={getChainLogoUrl(c.id)}
              alt=""
              width={20}
              height={20}
              className="h-5 w-5 rounded-full object-contain shrink-0"
            />
            <span className="flex-1 truncate">{c.name}</span>
            {c.id === activeChain.id && (
              <Check className="h-4 w-4 shrink-0 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
