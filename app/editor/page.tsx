"use client";

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

import PromptEditor from "@/components/PromptEditor";
import { useRouter, useSearchParams } from "next/navigation";

export default function Editor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("promptId") ?? undefined;

  return (
    <div className="h-screen bg-background overflow-hidden">
      <main className="w-full h-full pt-16 px-3 lg:px-8 py-3 overflow-hidden">
        <PromptEditor onBack={() => router.push("/")} initialPromptId={promptId} />
      </main>
    </div>
  );
}
