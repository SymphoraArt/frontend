import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
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

// Force dynamic rendering to prevent static generation issues with client components
export const dynamic = 'force-dynamic';

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
              
              // Clear old Privy wallet state to prevent "Wallet with id privy not found" errors
              try{
                var keysToRemove=[];
                for(var i=0;i<localStorage.length;i++){
                  var key=localStorage.key(i);
                  if(key&&(key.includes('thirdweb')||key.includes('wallet')||key.includes('privy')||key.includes('activeWallet')||key.includes('connectedWallet'))){
                    try{
                      var value=localStorage.getItem(key);
                      if(value&&(value.includes('privy')||value.includes('"id":"privy"'))){
                        keysToRemove.push(key);
                      }
                    }catch(e){keysToRemove.push(key);}
                  }
                }
                keysToRemove.forEach(function(k){try{localStorage.removeItem(k);}catch(e){}});
                if(keysToRemove.length>0){console.log('🧹 Cleared '+keysToRemove.length+' old Privy wallet state entries');}
              }catch(e){}
              
              // Suppress Ambire wallet extension errors (non-critical)
              if(typeof window!=='undefined'){
                const originalError=console.error;
                console.error=function(...args){
                  const msg=args.join(' ');
                  if(msg.includes('resource.clone is not a function')||
                     msg.includes('ambire-inpage.js')||
                     msg.includes('Unexpected end of input')||
                     msg.includes('Wallet with id privy not found')||
                     msg.includes('Error auto connecting wallet')){
                    // Suppress non-critical errors - they don't affect functionality
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
