import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NusaSiaga AI — Disaster Intelligence Platform",
  description:
    "Dashboard prediksi, simulasi, dan peringatan dini bencana tropis berbasis Geospatial AI dan Digital Twin untuk Indonesia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${spaceGrotesk.variable} ${inter.variable} h-full`}>
      <body className="min-h-full bg-[#060f1c] text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
