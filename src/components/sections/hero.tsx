// src/components/sections/hero.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Download,
  Play,
  Mail,
  Phone,
  Link as LinkIcon,
  Github,
  Instagram,
  Linkedin,
} from "lucide-react";

const ROLES = [
  "Full-Stack Developer",
  "Motion Graphics Designer",
  "UI/UX Designer",
  "Cybersecurity Enthusiast",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-16 sm:pb-20">
      {/* Background layers */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Ambient glow blobs - fluid scaling to avoid overflow */}
      <div className="absolute top-[-5%] left-[-10%] w-[320px] sm:w-[500px] lg:w-[600px] h-[320px] sm:h-[500px] lg:h-[600px] max-w-[85vw] max-h-[85vw] bg-blue-600/10 blur-[90px] sm:blur-[120px] rounded-full -z-10 animate-pulse pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-10%] w-[280px] sm:w-[450px] lg:w-[500px] h-[280px] sm:h-[450px] lg:h-[500px] max-w-[80vw] max-h-[80vw] bg-emerald-500/10 blur-[80px] sm:blur-[100px] rounded-full -z-10 animate-pulse pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[20%] right-[10%] w-[220px] sm:w-[350px] lg:w-[400px] h-[220px] sm:h-[350px] lg:h-[400px] max-w-[70vw] max-h-[70vw] bg-purple-600/8 blur-[70px] sm:blur-[90px] rounded-full -z-10 pointer-events-none" style={{ animationDelay: "4s" }} />

      {/* Grid pattern subtle */}
      <div className="absolute inset-0 z-0 [background-image:linear-gradient(to_right,#1e293b1a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b1a_1px,transparent_1px)] [background-size:32px_32px] sm:[background-size:48px_48px] opacity-30 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 sm:px-5 py-1.5 text-[10px] sm:text-[11px] font-medium text-blue-400/90 uppercase tracking-widest backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.15)] max-w-[90vw] truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shrink-0"></span>
          <span className="truncate">Available for freelance &bull; Open to collaboration</span>
        </div>

        {/* Name with Fluid Typography */}
        <h1 className="mt-6 sm:mt-8 mb-2 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-tight">
          AFIL<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500">PM</span>
        </h1>

        {/* Role */}
        <h2 className="mt-2 sm:mt-3 text-lg sm:text-xl md:text-2xl text-slate-400 font-medium tracking-tight px-2">
          Full-Stack Web Developer &amp; Motion Graphics Designer
        </h2>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed px-2">
          I build secure, performant web applications and craft compelling motion
          graphics that bring brands to life — blending technical depth with
          creative storytelling.
        </p>

        {/* Animated dynamic cycling roles with fluid typography and reserved height */}
        <div className="mt-6 sm:mt-10 h-10 sm:h-12 flex items-center justify-center overflow-hidden w-full px-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-base sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 text-center"
            >
              {ROLES[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* CTA Buttons - adaptive stack on mobile, inline on desktop */}
        <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-5 w-full max-w-xs sm:max-w-none">
          <Link
            href="/projects"
            className="group relative px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:-translate-y-1.5 hover:shadow-blue-600/50 active:translate-y-0 transition-all duration-300 ease-out flex items-center justify-center gap-2.5 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore My Work
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 group-hover:scale-125 transition-all duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>
          <Link
            href="/api/download-resume"
            className="group relative px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-semibold text-sm shadow-sm hover:-translate-y-1.5 hover:shadow-lg hover:shadow-white/10 hover:border-white/25 active:translate-y-0 transition-all duration-300 ease-out flex items-center justify-center gap-2.5 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Download className="h-4 w-4 group-hover:-translate-y-1 group-hover:scale-125 group-hover:text-blue-400 transition-all duration-300" />
              Download Resume
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Link>
          <a
            href="/contact"
            className="group relative px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-semibold text-sm shadow-sm hover:-translate-y-1.5 hover:shadow-lg hover:shadow-white/10 hover:border-white/25 active:translate-y-0 transition-all duration-300 ease-out flex items-center justify-center gap-2.5 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="h-4 w-4 group-hover:rotate-12 group-hover:scale-125 group-hover:text-indigo-400 transition-all duration-300 fill-current" />
              Contact Me
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </a>
        </div>

        {/* Social links with responsive spacing */}
        <div className="mt-10 sm:mt-14 flex justify-center gap-3 sm:gap-5 md:gap-6 opacity-90 hover:opacity-100 transition-opacity">
          <a
            href="https://github.com/afil-pm"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-11 w-11 sm:h-12 sm:w-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/50 hover:bg-white/10 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] hover:-translate-y-1.5 transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none text-[10px] font-mono bg-slate-900 border border-white/20 text-white px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
              GitHub
            </span>
          </a>
          <a
            href="https://instagram.com/afil_pm"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-11 w-11 sm:h-12 sm:w-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-pink-300 hover:border-pink-500/50 hover:bg-pink-500/15 hover:shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:-translate-y-1.5 transition-all duration-300"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5 group-hover:scale-125 group-hover:-rotate-6 transition-all duration-300" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none text-[10px] font-mono bg-slate-900 border border-pink-500/30 text-white px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
              Instagram
            </span>
          </a>
          <a
            href="https://linkedin.com/in/afil-pm"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-11 w-11 sm:h-12 sm:w-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-blue-300 hover:border-blue-500/50 hover:bg-blue-500/15 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:-translate-y-1.5 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none text-[10px] font-mono bg-slate-900 border border-blue-500/30 text-white px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
              LinkedIn
            </span>
          </a>
          <a
            href="https://wa.me/917561820814"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-11 w-11 sm:h-12 sm:w-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-emerald-300 hover:border-emerald-500/50 hover:bg-emerald-500/15 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:-translate-y-1.5 transition-all duration-300"
            aria-label="WhatsApp"
          >
            <Phone className="h-5 w-5 group-hover:scale-125 group-hover:-rotate-6 transition-all duration-300" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none text-[10px] font-mono bg-slate-900 border border-emerald-500/30 text-white px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
              WhatsApp
            </span>
          </a>
        </div>

      </div>

      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "AFIL PM",
            jobTitle: "Full-Stack Web Developer & Motion Graphics Designer",
            url: "https://afilpm.example.com",
            sameAs: [
              "https://github.com/afil-pm",
              "https://instagram.com/afil_pm",
              "https://linkedin.com/in/afil-pm",
              "https://wa.me/917561820814",
            ],
            knowsAbout: [
              "Web Development",
              "Full-Stack Applications",
              "UI/UX Design",
              "Motion Graphics",
              "Video Editing",
              "Cybersecurity",
              "React",
              "Next.js",
              "Node.js",
              "After Effects",
              "Premiere Pro",
            ],
          }),
        }}
      />

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "AFIL PM",
            url: "https://afilpm.example.com",
            logo: "/icon.png",
            sameAs: [
              "https://github.com/afil-pm",
              "https://instagram.com/afil_pm",
              "https://linkedin.com/in/afil-pm",
              "https://wa.me/917561820814",
            ],
          }),
        }}
      />
    </section>
  );
}
