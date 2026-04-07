"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const CompactPromptCreator = dynamic(
  () => import("@/components/CompactPromptCreator"),
  { ssr: false }
);

/** Paths where Quick Create is shown: marketplace (/), showroom (/showcase), and workspace (/workspace). */
const QUICK_CREATE_PATHS = ["/", "/showcase", "/workspace"];
const QUICK_CREATE_OPEN_KEY = "quickCreateOpen";

export default function CompactPromptCreatorWrapper() {
  const pathname = usePathname();
  const showQuickCreate = pathname !== null && QUICK_CREATE_PATHS.includes(pathname);

  useEffect(() => {
    if (pathname && !QUICK_CREATE_PATHS.includes(pathname)) {
      try {
        sessionStorage.removeItem(QUICK_CREATE_OPEN_KEY);
      } catch {}
    }
  }, [pathname]);

  if (!showQuickCreate) return null;
  return <CompactPromptCreator />;
}
