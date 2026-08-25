"use client";

/**
 * Deep-link door only. A creator page renders INSIDE the shell — right
 * panel, left menu always on screen (Kev, 2026-08-24) — so this route
 * immediately forwards into /home, which reads ?creator and opens the
 * profile panel. The shadcn Card/Tabs page that lived here was a layout
 * nobody agreed to.
 */
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreatorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  useEffect(() => {
    router.replace(`/home?creator=${encodeURIComponent(id)}`);
  }, [id, router]);
  return null;
}
