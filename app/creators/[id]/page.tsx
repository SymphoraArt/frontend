"use client";

/**
 * A creator's public page — the SAME profile layout the owner sees, in
 * foreign mode (Kev, 2026-08-24: "so ähnlich müssen auch andere profile
 * angezeigt werden nur ohne deren likes"). ProfileView hides the private
 * tabs (Likes, History) and the edit affordances when given a handle; the
 * shadcn Card/Tabs page that lived here was a layout nobody agreed to.
 */
import { use } from "react";
import ProfileView from "@/components/profile/ProfileView";

export default function CreatorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <ProfileView handle={decodeURIComponent(id)} isOwnProfile={false} />;
}
