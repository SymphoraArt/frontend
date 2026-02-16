"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const CompactPromptCreator = dynamic(
  () => import("@/components/CompactPromptCreator"),
  { ssr: false }
);

/** Paths where Quick Create is shown: marketplace (/) and showroom (/showcase). */
const QUICK_CREATE_PATHS = ["/", "/showcase"];

export default function CompactPromptCreatorWrapper() {
  const pathname = usePathname();
  const showQuickCreate = pathname !== null && QUICK_CREATE_PATHS.includes(pathname);

  if (!showQuickCreate) return null;
  return <CompactPromptCreator />;
}
