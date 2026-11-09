// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
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

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const APP_NAME = "AFIL PM — Full-Stack Web Developer & Motion Graphics Designer";

const ROUTE_METADATA: Record<string, { title: string; description: string }> = {
  "/": {
    title: "AFIL PM — Full-Stack Web Developer & Motion Graphics Designer",
    description:
      "Premium portfolio of AFIL PM — Full-Stack Web Developer & Motion Graphics Designer. Building secure, performant web applications and creative motion graphics.",
  },
  "/about": {
    title: "About Me — AFIL PM",
    description:
      "Learn about AFIL PM's development journey, creative background, technical interests, and freelance experience.",
  },
  "/skills": {
    title: "Skills — AFIL PM",
    description:
      "Technical skills and creative tools mastered by AFIL PM — Frontend, Backend, Development Tools, Motion Graphics & Video Editing.",
  },
  "/services": {
    title: "Services — AFIL PM",
    description:
      "Professional web development and motion graphics services offered by AFIL PM.",
  },
  "/projects": {
    title: "Projects — AFIL PM",
    description:
      "Selected web development, full-stack, UI/UX, motion graphics, and video editing projects by AFIL PM.",
  },
  "/creative-works": {
    title: "Creative Works — AFIL PM",
    description:
      "Motion graphics and video editing gallery by AFIL PM — After Effects, Premiere Pro, and more.",
  },
  "/experience": {
    title: "Experience — AFIL PM",
    description:
      "Freelance, development, and creative experience milestones of AFIL PM.",
  },
  "/contact": {
    title: "Contact AFIL PM",
    description:
      "Get in touch with AFIL PM for web development and motion graphics projects.",
  },
};

export function generateMetadata(): Metadata {
  return {
    title: {
      template: "%s | AFIL PM Portfolio",
      default: "AFIL PM — Full-Stack Web Developer & Motion Graphics Designer",
    },
    description:
      "Premium portfolio of AFIL PM — Full-Stack Web Developer & Motion Graphics Designer. Building secure, performant web applications and creative motion graphics.",
    metadataBase: new URL(APP_URL),
    authors: [{ name: "AFIL PM", url: APP_URL }],
    creator: "AFIL PM",
    publisher: "AFIL PM",
    openGraph: {
      title: "AFIL PM — Full-Stack Web Developer & Motion Graphics Designer",
      description:
        "Premium portfolio showcasing web development, motion graphics, video editing, and creative design.",
      url: APP_URL,
      siteName: "AFIL PM Portfolio",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/og-image.svg",
          width: 1200,
          height: 630,
          alt: "AFIL PM Portfolio",
        },
      ],
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: APP_URL,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="antialiased selection:bg-blue-500/30 selection:text-white"
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="color-scheme" content="dark light" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.variable} ${display.variable} ${mono.variable} bg-slate-950 text-slate-100`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
