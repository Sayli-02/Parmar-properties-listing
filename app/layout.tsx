import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parmar Properties | Luxury Real Estate Mumbai",
  description: "Curated portfolio of prime waterfront residences, penthouses, and sky villas across Worli, Bandra, Juhu, and South Mumbai.",
  keywords: ["Mumbai Luxury Real Estate", "Worli Sea Face Penthouses", "Bandra West Luxury Apartments", "Parmar Properties", "MahaRERA"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-mineral text-ink">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
