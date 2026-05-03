"use client";

import EnkiFeed from "@/components/enki/EnkiFeed";

export default function VideosPage() {
  return (
    <EnkiFeed
      mode="videos"
      eyebrow="Video prompts / live marketplace"
      title={<><em>Motion</em> prompts<br />ready for release.</>}
    />
  );
}
