"use client";

/**
 * Thirdweb Provider for Next.js
 *
 * Wraps the application with Thirdweb's provider to enable authentication,
 * wallet connection, and x402 payment hooks.
 * 
 * Also performs auto-repair of wallet state on startup to prevent
 * "Wallet with id privy not found" errors.
 */

import { ThirdwebProvider as TWProvider } from "thirdweb/react";
import { ReactNode, useEffect } from "react";
import { autoRepairWalletState } from "@/lib/wallet-cleanup-enhanced";

export function ThirdwebProvider({ children }: { children: ReactNode }) {
  // Auto-repair wallet state on mount (validates and fixes corrupted state)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const result = autoRepairWalletState();
      
      if (!result.repaired && result.remainingIssues.length > 0) {
        console.warn("⚠️ Wallet state has issues:", result.remainingIssues);
      } else if (result.actionsTaken.length > 0) {
        console.log("✅ Wallet state repaired:", result.actionsTaken);
      }
    }
  }, []);

  return <TWProvider>{children}</TWProvider>;
}
