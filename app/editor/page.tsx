"use client";

import PromptEditor from "@/components/PromptEditor";
import { useRouter } from "next/navigation";

export default function Editor() {
  const router = useRouter();

  return (
    <div className="h-screen bg-background overflow-hidden">
      <main className="w-full h-full pt-16 px-3 lg:px-8 py-3 overflow-hidden">
        <PromptEditor onBack={() => router.push("/")} />
      </main>
    </div>
  );
}
