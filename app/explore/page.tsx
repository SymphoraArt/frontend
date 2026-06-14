"use client";

import EnkiFeedPage from "@/components/enki/EnkiFeedPage";

// The browse/feed experience (formerly at "/") now lives at /explore so the
// marketing landing can own the root route.
export default function ExplorePage() {
  return <EnkiFeedPage />;
}
