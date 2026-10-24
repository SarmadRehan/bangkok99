import type { Metadata, Viewport } from "next";
import { Baloo_2, Figtree, Mitr } from "next/font/google";

import { truckInfo } from "@/data/bangkok99";

import "./globals.css";

// Bold, rounded street-food type (brief).
const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

// For the small Thai-script labels on the menu groups.
const mitr = Mitr({
  variable: "--font-mitr",
  subsets: ["thai"],
  weight: "500",
});

const title = `${truckInfo.fullName} | Thai street food in Lake City, Seattle`;

export const metadata: Metadata = {
  title,
  description: truckInfo.description,
  // Demo build, shared only with Bangkok99: keep it out of search results.
  robots: { index: false, follow: false },
  openGraph: {
    title,
    description: truckInfo.description,
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  themeColor: "#b8321f",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${baloo.variable} ${figtree.variable} ${mitr.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
