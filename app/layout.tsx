import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Providers } from "../providers";
import Navbar from "@/components/Navbar";
import ThemeSync from "@/components/ThemeSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "AIgency",
    template: "%s | AIgency",
  },
  description:
    "AIgency — discover, create, and generate stunning AI art with customizable prompt templates. A creative marketplace powered by Gemini AI.",
  keywords: ["AI art", "image generation", "prompt templates", "Gemini AI", "creative marketplace"],
  authors: [{ name: "AIgency Team" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "AIgency",
    description: "Discover, create, and generate stunning AI art with customizable prompt templates.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIgency",
    description: "Discover, create, and generate stunning AI art with customizable prompt templates.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              // Theme initialization
              try{var t=localStorage.getItem('theme');var d=document.documentElement;if(t==='dark'){d.classList.add('dark');}else{d.classList.remove('dark');}}catch(e){}
              
              // Suppress Ambire wallet extension errors (non-critical)
              if(typeof window!=='undefined'){
                const originalError=console.error;
                console.error=function(...args){
                  const msg=args.join(' ');
                  if(msg.includes('resource.clone is not a function')||
                     msg.includes('ambire-inpage.js')||
                     msg.includes('Unexpected end of input')){
                    // Suppress Ambire errors - they don't affect functionality
                    return;
                  }
                  originalError.apply(console,args);
                };
              }
            })();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable} antialiased`}
      >
        <Providers>
          <ThemeSync>
            <Navbar />
            {children}
          </ThemeSync>
        </Providers>
      </body>
    </html>
  );
}
