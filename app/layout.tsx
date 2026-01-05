import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Techtonic Shop by Leslie | Curated Tech Systems",
  description: "Explore Techtonic Shop by Leslie for the best curated tech systems, computer components, and exclusive deals.",
  keywords: "Techtonic Shop, Leslie, Tech Systems, Computer Shop, Philippines Tech",
  openGraph: {
    title: "Techtonic Shop by Leslie",
    description: "Curated Systems for the Modern User",
    type: "website",
    // Optional: Add your Vercel URL here if you want social media previews to link back correctly
    // url: "https://techtonic-shop.vercel.app", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="PDqrmbK8H-5mSJ4z0cUcgDD0RewPMbVRksAeps9t_g8" />
      </head> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}