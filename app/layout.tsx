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
  title: {
    default: "Life Unfolded — Stories, Life & Moments",
    template: "%s | Life Unfolded",
  },
  description:
    "A heartfelt blog platform where stories meet reality. Explore blogs about animals, plants, arts, technology, travel, and lifestyle.",
  keywords: ["blog", "lifestyle", "travel", "technology", "animals", "plants", "arts"],
  authors: [{ name: "Aqsa Shah" }],
  openGraph: {
    type: "website",
    siteName: "Life Unfolded",
    title: "Life Unfolded — Stories, Life & Moments",
    description:
      "A heartfelt blog platform where stories meet reality. Explore blogs about animals, plants, arts, technology, travel, and lifestyle.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Life Unfolded — Stories, Life & Moments",
    description: "A heartfelt blog platform where stories meet reality.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}
