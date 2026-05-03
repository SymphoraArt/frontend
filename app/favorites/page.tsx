"use client";

import EnkiFeed from "@/components/enki/EnkiFeed";

export default function FavoritesPage() {
  return (
    <EnkiFeed
      mode="favorites"
      eyebrow="Saved / your collection"
      title={<><em>Favorites</em><br />worth returning to.</>}
    />
  );
}
