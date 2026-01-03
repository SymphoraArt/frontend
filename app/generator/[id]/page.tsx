"use client";

import Navbar from "@/components/Navbar";
import GeneratorInterface from "@/components/GeneratorInterface";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import type { Prompt, Artist } from "../../../shared/schema";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const isUUID = (str: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(str);

export default function Generator() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const promptIdOrSlug = params.id;
  const isSlug = promptIdOrSlug && !isUUID(promptIdOrSlug);

  const {
    data: prompt,
    isLoading: promptLoading,
    error: promptError,
  } = useQuery<Prompt>({
    queryKey: [
      isSlug
        ? `/api/prompts/by-slug/${promptIdOrSlug}`
        : `/api/prompts/${promptIdOrSlug}`,
    ],
    enabled: !!promptIdOrSlug,
  });

  const { data: artist } = useQuery<Artist>({
    queryKey: [`/api/artists/${prompt?.artistId}`],
    enabled: !!prompt?.artistId,
  });

  if (promptLoading) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <Navbar />
        <main className="w-full px-6 lg:px-8 py-4 flex items-center justify-center">
          <p className="text-foreground text-lg" data-testid="text-loading">
            Loading prompt...
          </p>
        </main>
      </div>
    );
  }

  if (promptError || !prompt) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <Navbar />
        <main className="w-full px-6 lg:px-8 py-4 flex flex-col items-center justify-center gap-4">
          <p className="text-foreground text-lg" data-testid="text-error">
            Prompt not found
          </p>
          <Button
            onClick={() => router.push("/gallery")}
            data-testid="button-back-gallery"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <main className="w-full px-6 lg:px-8 py-4">
        <GeneratorInterface
          promptId={prompt.id}
          title={prompt.title}
          artistName={artist?.displayName || "Unknown Artist"}
          artistId={prompt.artistId || undefined}
          imageUrl={prompt.previewImageUrl || ""}
          isFreeShowcase={prompt.isFreeShowcase || false}
          publicPromptText={prompt.publicPromptText || undefined}
        />
      </main>
    </div>
  );
}
