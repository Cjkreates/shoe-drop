import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Marquee } from "./components/Marquee";
import { Toaster } from "sonner";
import { CartSheet } from "@/components/cart-sheet";
import { Footer } from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | AERO",
    default: "AERO | Future Streetwear",
  },
  description:
    "Premium streetwear designed in Nakuru, Kenya. Worldwide shipping. M-Pesa accepted.",
  keywords: [
    "Streetwear Kenya",
    "Sneakers Nairobi",
    "Aero Drop",
    "Fashion",
  ],
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: "AERO",
    images: [
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/opengraph-image`,
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aero_ke",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="bottom-right" theme="dark" />
        <CartSheet />
        <Marquee />
        <Navbar />
        <div className="relative z-10 bg-zinc-950 min-h-screen pb-20">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
