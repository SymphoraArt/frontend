"use client";

import Navbar from "@/components/Navbar";
import GeneratorInterface from "@/components/GeneratorInterface";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Generator() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const promptId = params.id;

  const {
    data: promptData,
    isLoading: promptLoading,
    error: promptError,
  } = useQuery<{ prompt: any }>({
    queryKey: [`/api/prompts/${promptId}`],
    enabled: !!promptId,
  });

  const prompt = promptData?.prompt;
  const creatorId = prompt?.creator?.toString?.() || prompt?.creator;

  const { data: creatorData } = useQuery<{ user: any }>({
    queryKey: [`/api/users/${creatorId}`],
    enabled: !!creatorId,
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
            onClick={() => router.push("/showcase")}
            data-testid="button-back-gallery"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>
        </main>
      </div>
    );
  }

  const promptIdString = prompt._id?.toString() || prompt.id;
  const artistName =
    creatorData?.user?.profile?.displayName ||
    creatorData?.user?.profile?.username ||
    "Unknown Artist";
  const artistId = creatorId;

  const primaryImage = prompt.showcaseImages?.find(
    (img: any) => img.isPrimary === true
  );
  const thumbnailImage = primaryImage || prompt.showcaseImages?.[0];
  const imageUrl = thumbnailImage?.thumbnail || thumbnailImage?.url || "";

  const allShowcaseImages = prompt.showcaseImages || [];

  const isFreeShowcase = prompt.type === "showcase";

  return (
    <div className="h-screen bg-background overflow-hidden flex flex-col">
      <main className="flex-1 overflow-hidden">
        <GeneratorInterface
          promptId={promptIdString}
          title={prompt.title}
          artistName={artistName}
          artistId={artistId}
          imageUrl={imageUrl}
          showcaseImages={allShowcaseImages}
          isFreeShowcase={isFreeShowcase}
          publicPromptText={undefined}
        />
      </main>
    </div>
  );
}
