"use client";

export const dynamic = "force-dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TestClient from "./TestClient";

export default function TestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [allowed, setAllowed] = useState(false);
  
  useEffect(() => {
    // Isolate test page - only accessible with explicit query parameter
    // Prevents accidental access during normal testing
    const enableParam = searchParams?.get("enable");
    
    if (enableParam === "true") {
      setAllowed(true);
    } else {
      // Redirect to home if not explicitly enabled
      router.replace("/");
    }
  }, [router, searchParams]);
  
  // Don't render until we've checked access
  if (!allowed) {
    return null;
  }

  return <TestClient />;
}
