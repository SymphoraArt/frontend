"use client";

import { createContext, useContext, useMemo } from "react";
import { Turnkey } from "@turnkey/sdk-browser";

interface TurnkeyContextValue {
  turnkey: Turnkey;
}

const TurnkeyContext = createContext<TurnkeyContextValue | null>(null);

export function TurnkeyProvider({ children }: { children: React.ReactNode }) {
  const turnkey = useMemo(
    () =>
      new Turnkey({
        apiBaseUrl: "https://api.turnkey.com",
        defaultOrganizationId: process.env.NEXT_PUBLIC_TURNKEY_ORGANIZATION_ID ?? "",
      }),
    []
  );

  return (
    <TurnkeyContext.Provider value={{ turnkey }}>
      {children}
    </TurnkeyContext.Provider>
  );
}

export function useTurnkey(): TurnkeyContextValue {
  const ctx = useContext(TurnkeyContext);
  if (!ctx) throw new Error("useTurnkey must be used within TurnkeyProvider");
  return ctx;
}
