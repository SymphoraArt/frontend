"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useState } from "react";
import { getQueryFn } from "@/lib/queryClient";
import { ThirdwebProvider } from "./ThirdwebProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  // Initialize QueryClient with lazy initialization to prevent SSR issues
  // Using useState with function initializer ensures it only runs on client
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

  // Always render providers - they handle SSR gracefully
  // The issue was with static generation, not SSR
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </ThirdwebProvider>
    </QueryClientProvider>
  );
}
