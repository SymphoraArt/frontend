"use client";

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

import "./algency-editor.css";
import AlgencyPromptEditor from "@/components/AlgencyPromptEditor";

export default function Editor() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
      <AlgencyPromptEditor />
    </div>
  );
}
