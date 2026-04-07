"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** My Prompts was merged into My Gallery. Redirect old links. */
export default function MyPromptsPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/my-gallery");
  }, [router]);
  return null;
}
