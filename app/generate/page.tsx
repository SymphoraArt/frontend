"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Download, Loader2, ArrowLeft, Image as ImageIcon, Wallet, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useSolanaX402Payment } from "@/hooks/useSolanaX402Payment";

const ASPECT_RATIOS = [
  { value: "1:1", label: "1:1" },
  { value: "16:9", label: "16:9" },
  { value: "9:16", label: "9:16" },
  { value: "4:3", label: "4:3" },
  { value: "3:4", label: "3:4" },
];

const PRICE_BY_RESOLUTION: Record<string, string> = {
  "1K": "$0.05",
  "2K": "$0.10",
  "4K": "$0.25",
};

export default function GeneratePage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("1:1");
  const [resolution, setResolution] = useState("2K");
  const [paymentMode, setPaymentMode] = useState<"free" | "solana">("free");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [generationTime, setGenerationTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { connected } = useWallet();
  const { generateImage: generateWithSolana, isPending: isSolanaPending } = useSolanaX402Payment();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setError(null);
    setGeneratedImageUrl(null);
    setGenerationTime(null);

    try {
      if (paymentMode === "solana") {
        const data = await generateWithSolana({
          prompt: prompt.trim(),
          aspectRatio,
          resolution,
          chain: "solana-devnet",
        });

        if (!data.imageUrl) {
          throw new Error("No image returned");
        }

        setGeneratedImageUrl(data.imageUrl);
        return;
      }

      const response = await fetch("/api/generate-free", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          aspectRatio,
          resolution,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Generation failed");
      }

      const data = await response.json();

      if (!data.imageUrl) {
        throw new Error("No image returned");
      }

      setGeneratedImageUrl(data.imageUrl);
      setGenerationTime(data.generationTime);
    } catch (err: any) {
      console.error("Generation error:", err);
      setError(err.message || "Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImageUrl) return;
    const a = document.createElement("a");
    a.href = generatedImageUrl;
    a.download = `generated-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 pb-10 px-4 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Free Image Generator
            </h1>
            <p className="text-sm text-muted-foreground">
              Powered by Pollinations.ai · No wallet or payment required
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant={paymentMode === "free" ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs"
              onClick={() => setPaymentMode("free")}
            >
              Free
            </Button>
            <Button
              variant={paymentMode === "solana" ? "default" : "outline"}
              size="sm"
              className="h-7 text-xs gap-1"
              onClick={() => setPaymentMode("solana")}
            >
              <Zap className="h-3 w-3" />
              Solana
            </Button>
            {paymentMode === "solana" && (
              <WalletMultiButton style={{ height: "28px", fontSize: "12px", padding: "0 10px" }} />
            )}
          </div>
        </div>

        {paymentMode === "solana" && (
          <div className="mb-4 p-3 rounded-lg border border-border/50 bg-card/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {connected
                  ? "Wallet connected - pay with USDC on Solana devnet"
                  : "Connect a Solana wallet to generate with AI"}
              </span>
              <Badge variant="outline" className="text-xs">
                {PRICE_BY_RESOLUTION[resolution]} USDC
              </Badge>
            </div>
            <WalletMultiButton style={{ height: "32px", fontSize: "12px", padding: "0 12px" }} />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Controls */}
          <div className="space-y-4">
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Prompt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe the image you want to create...&#10;&#10;Example: A mystical forest with glowing mushrooms, ethereal lighting, fantasy art style"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[140px] text-sm resize-none"
                  data-testid="textarea-prompt"
                />

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    Aspect Ratio
                  </Label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {ASPECT_RATIOS.map((ratio) => (
                      <Button
                        key={ratio.value}
                        variant={aspectRatio === ratio.value ? "default" : "outline"}
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => setAspectRatio(ratio.value)}
                      >
                        {ratio.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">
                    Resolution
                  </Label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {["1K", "2K", "4K"].map((res) => (
                      <Button
                        key={res}
                        variant={resolution === res ? "default" : "outline"}
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => setResolution(res)}
                      >
                        {res}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  className="w-full h-10"
                  onClick={handleGenerate}
                  disabled={
                    isGenerating ||
                    isSolanaPending ||
                    !prompt.trim() ||
                    (paymentMode === "solana" && !connected)
                  }
                  data-testid="button-generate"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Image
                    </>
                  )}
                </Button>

                {error && (
                  <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                    {error}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: Generated Image */}
          <div className="space-y-4">
            <Card className="border-border/50 min-h-[400px] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Result</CardTitle>
                  {generationTime && (
                    <span className="text-xs text-muted-foreground">
                      {(generationTime / 1000).toFixed(1)}s
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center">
                {isGenerating ? (
                  <div className="text-center space-y-3">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      Generating your image...
                    </p>
                    <p className="text-xs text-muted-foreground/60">
                      This may take 10-30 seconds
                    </p>
                  </div>
                ) : generatedImageUrl ? (
                  <div className="w-full space-y-3">
                    <div className="rounded-lg overflow-hidden border border-border/50">
                      <img
                        src={generatedImageUrl}
                        alt="Generated image"
                        className="w-full h-auto"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={handleDownload}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Image
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <ImageIcon className="h-12 w-12 text-muted-foreground/30 mx-auto" />
                    <p className="text-sm text-muted-foreground">
                      Your generated image will appear here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
