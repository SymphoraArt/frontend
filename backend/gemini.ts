// Gemini AI Integration - using Replit AI Integrations (blueprint:javascript_gemini_ai_integrations)
import { GoogleGenAI, Modality } from "@google/genai";

let ai: GoogleGenAI | null = null;

function getGeminiClient() {
  if (ai) return ai;

  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.AI_INTEGRATIONS_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing Gemini API key. Set GEMINI_API_KEY (or GOOGLE_API_KEY) to enable image generation.",
    );
  }

  const replitBaseUrl = process.env.AI_INTEGRATIONS_GEMINI_BASE_URL;

  ai = replitBaseUrl
    ? new GoogleGenAI({
        apiKey,
        httpOptions: {
          apiVersion: "",
          baseUrl: replitBaseUrl,
        },
      })
    : new GoogleGenAI({ apiKey });

  return ai;
}

export async function generateImage(prompt: string): Promise<string> {
  const ai = getGeminiClient();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-image",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: {
      responseModalities: [Modality.TEXT, Modality.IMAGE],
    },
  });

  const candidate = response.candidates?.[0];
  const imagePart = candidate?.content?.parts?.find((part: any) => part.inlineData);
  
  if (!imagePart?.inlineData?.data) {
    throw new Error("No image data in response");
  }

  const mimeType = imagePart.inlineData.mimeType || "image/png";
  return `data:${mimeType};base64,${imagePart.inlineData.data}`;
}
