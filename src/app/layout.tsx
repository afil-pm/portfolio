// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geo",
  display: "swap",
});

export function generateMetadata(): Metadata {
  return {
    title: {
      template: "%s | AFIL PM Portfolio",
      default: "AFIL PM — Full-Stack Web Developer & Motion Graphics Designer",
    },
    description:
      "Premium portfolio of AFIL PM — Full-Stack Web Developer & Motion Graphics Designer. Building modern web applications and creative motion graphics.",
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
    authors: [{ name: "AFIL PM" }],
    openGraph: {
      title: "AFIL PM — Full-Stack Web Developer & Motion Graphics Designer",
      description:
        "Premium portfolio showcasing web development, motion graphics, video editing, and creative design.",
      type: "website",
      locale: "en_US",
      siteName: "AFIL PM Portfolio",
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="antialiased selection:bg-brand/20 selection:text-dark-text">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="dark light" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} ${display.variable} ${mono.variable} bg-dark-bg text-dark-text`}>
        {children}
      </body>
    </html>
  );
}
