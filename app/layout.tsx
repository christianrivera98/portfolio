import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { MainLayout } from "@/components/templates/main-layout";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://christianlamadrid.dev"),
  title: "Christian Lamadrid | Frontend Engineer",
  description:
    "Frontend Engineer specializing in React, Next.js, and TypeScript. Building production interfaces for fintech and scalable systems.",
  keywords: [
    "Frontend Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "GSAP",
    "Three.js",
    "Portfolio",
    "Christian Lamadrid",
  ],
  authors: [{ name: "Christian Lamadrid" }],
  creator: "Christian Lamadrid",
  openGraph: {
    title: "Christian Lamadrid | Frontend Engineer",
    description:
      "Frontend Engineer specializing in React, Next.js, and TypeScript.",
    type: "website",
    locale: "en_US",
    url: "https://christianlamadrid.dev",
    siteName: "Christian Lamadrid",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Christian Lamadrid - Frontend Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Christian Lamadrid | Frontend Engineer",
    description:
      "Frontend Engineer specializing in React, Next.js, and TypeScript.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} antialiased`}
      >
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
