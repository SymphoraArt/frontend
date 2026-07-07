"use client";

// Force dynamic rendering to prevent static generation issues
export const dynamic = 'force-dynamic';

import "./enki-editor.css";
import EnkiPromptEditor from "@/components/EnkiPromptEditor";

export default function Editor() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100 }}>
      <EnkiPromptEditor />
    </div>
  );
}
