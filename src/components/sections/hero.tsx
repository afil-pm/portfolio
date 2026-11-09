// src/components/sections/hero.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Play } from "lucide-react";

const ROLES = [
  "Full-Stack Web Developer.",
  "Motion Graphics Designer.",
  "UI/UX Designer.",
  "Cybersecurity-focused Engineer.",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background mesh */}
      <div className="absolute inset-0 z-0 bg-gradient-mesh" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-brand/10 blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/10 blur-[100px] -z-10" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-surface/40 px-4 py-1.5 text-xs font-medium text-muted uppercase tracking-wider"
        >
          Available for freelance &bull; Open to collaboration
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 h-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-text leading-tight"
        >
          AFIL{" "}
          <span className="bg-gradient-brand bg-clip-text text-transparent">PM</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-3 text-xl md:text-2xl text-muted font-medium tracking-tight"
        >
          Full-Stack Web Developer &amp; Motion Graphics Designer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 max-w-xl mx-auto text-muted text-base md:text-lg leading-relaxed"
        >
          I build secure, performant web applications and craft compelling motion
          graphics that bring brands to life. Blending technical depth with
          creative storytelling.
        </motion.p>

        {/* Typing animation roles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex flex-col items-center gap-4"
        >
          <div className="relative flex items-center justify-center min-w-[320px]">
            <span className="relative text-xl md:text-2xl font-semibold text-text">
              <motion.span
                className="relative inline-block text-text"
                animate={{
                  width: ["0%", "100%", "100%", "0%"],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {ROLES.map((role, i) => (
                  <span key={i} className="absolute left-0 text-text">
                    {role}
                  </span>
                ))}
              </motion.span>
              <span className="ml-1 animate-pulse text-brand">█</span>
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/projects"
            className="group relative px-8 py-4 rounded-2xl bg-gradient-brand text-white font-semibold text-sm shadow-lg shadow-brand/30 hover:shadow-brand/50 hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            Explore My Work <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/api/download-resume"
            className="px-8 py-4 rounded-2xl border border-border bg-surface/60 text-text font-semibold text-sm hover:bg-surface hover:border-brand/50 transition-all flex items-center gap-2"
          >
            <Download className="h-4 w-4" /> Download Resume
          </Link>
          <a
            href="/contact"
            className="px-8 py-4 rounded-2xl border border-border bg-surface/60 text-text font-semibold text-sm hover:bg-surface hover:border-brand/50 transition-all flex items-center gap-2"
          >
            <Play className="h-4 w-4" /> Contact Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-16 flex justify-center gap-6 opacity-60"
        >
          <a href="#" className="text-muted hover:text-brand transition-colors" aria-label="GitHub">
            <span className="sr-only">GitHub</span>
          </a>
          <a href="#" className="text-muted hover:text-brand transition-colors" aria-label="LinkedIn">
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="#" className="text-muted hover:text-brand transition-colors" aria-label="Behance">
            <span className="sr-only">Behance</span>
          </a>
        </motion.div>
      </div>

      {/* Subtle indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-[bounce_2s_infinite] text-muted text-xs uppercase tracking-widest"
      >
        Scroll
      </motion.div>
    </section>
  );
}
