import { NextResponse } from "next/server";

export async function GET() {
  // Mock data for now, ready to be replaced with DB query
  const models = [
    {
      id: "nano-banana-pro",
      name: "Nano Banana Pro",
      price: 0.04,
      allowed_ratios: ["1:1", "4:5", "3:2", "16:9", "9:16", "21:9"],
    },
    {
      id: "gpt-image-2",
      name: "GPT-Image-2",
      price: 0.06,
      allowed_ratios: ["1:1", "16:9", "9:16"],
    },
    {
      id: "midjourney-v7",
      name: "Midjourney v7",
      price: 0.08,
      allowed_ratios: ["1:1", "4:5", "3:2", "16:9", "9:16"],
    },
  ];

  return NextResponse.json(models);
}
