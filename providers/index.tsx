"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useState } from "react";
import { getQueryFn } from "@/lib/queryClient";
import { ThirdwebProvider } from "./ThirdwebProvider";
import { ThemeProvider } from "./ThemeProvider";
import { SolanaWalletProvider } from "./SolanaWalletProvider";

/**
 * Provider hierarchy (outermost first):
 *
 *   ThemeProvider          ← theme must survive wallet re-renders
 *     QueryClientProvider  ← data fetching
 *       ThirdwebProvider   ← wallet + x402
 *         TooltipProvider  ← UI
 *
 * ThemeProvider is outermost so that wallet connect/disconnect
 * never causes a theme flash or reset.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            queryFn: getQueryFn({ on401: "throw" }),
            refetchInterval: false,
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            retry: false,
          },
          mutations: {
            retry: false,
          },
        },
      })
  );

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ThirdwebProvider>
          <SolanaWalletProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </SolanaWalletProvider>
        </ThirdwebProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
