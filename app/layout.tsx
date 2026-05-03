import type { Metadata } from "next";
import {
  Fraunces,
  Geist,
  Geist_Mono,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import "./enki-redesign.css";
import { Providers } from "../providers";
import ThemeSync from "@/components/ThemeSync";
import EnkiHeader from "@/components/enki/EnkiHeader";
import EnkiQuickCreate from "@/components/enki/EnkiQuickCreate";

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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Enki Art",
    template: "%s | Enki Art",
  },
  description: "Enki Art - discover, release, and generate AI art prompt templates.",
  keywords: ["AI art", "image generation", "prompt templates", "Gemini AI", "creative marketplace"],
  authors: [{ name: "Enki Art Team" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Enki Art",
    description: "Discover, release, and generate AI art prompt templates.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enki Art",
    description: "Discover, release, and generate AI art prompt templates.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const dynamic = "force-dynamic";

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
              try{var t=localStorage.getItem('theme');var d=document.documentElement;if(t==='dark'){d.classList.add('dark');}else{d.classList.remove('dark');}}catch(e){}
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
              }catch(e){}
              if(typeof window!=='undefined'){
                const originalError=console.error;
                console.error=function(...args){
                  const msg=args.join(' ');
                  if(msg.includes('resource.clone is not a function')||
                     msg.includes('ambire-inpage.js')||
                     msg.includes('Unexpected end of input')||
                     msg.includes('Wallet with id privy not found')||
                     msg.includes('Error auto connecting wallet')){
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
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} antialiased`}
      >
        <Providers>
          <ThemeSync>
            <div className="enki">
              <EnkiHeader />
              {children}
              <EnkiQuickCreate />
            </div>
          </ThemeSync>
        </Providers>
      </body>
    </html>
  );
}
