import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIgency - AI-Powered Content Generation on LUKSO",
  description: "Create stunning AI-generated content powered by Google Gemini on the LUKSO blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
