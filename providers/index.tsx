"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useState } from "react";
import { getQueryFn } from "@/lib/queryClient";
import PrivyWalletProvider from "./PrivyProvider";
import { ThirdwebProvider } from "./ThirdwebProvider";

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
    <PrivyWalletProvider>
      <QueryClientProvider client={queryClient}>
        <ThirdwebProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThirdwebProvider>
      </QueryClientProvider>
    </PrivyWalletProvider>
  );
}
