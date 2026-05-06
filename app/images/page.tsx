"use client";

import EnkiFeed from "@/components/enki/EnkiFeed";

export default function ImagesPage() {
  return (
    <EnkiFeed
      mode="images"
      eyebrow="Image prompts / live marketplace"
      title={<><em>Still image</em> prompts<br />for exacting runs.</>}
    />
  );
}
