// src/app/about/page.tsx
"use client";

import { motion } from "framer-motion";
import { Code, Layers, Play, ShieldCheck, Globe, Film } from "lucide-react";

const journey = [
  {
    year: "2020",
    title: "Started coding",
    desc: "Began learning HTML, CSS, and JavaScript, building first static websites.",
  },
  {
    year: "2022",
    title: "Full-stack development",
    desc: "Expanded into React, Node.js, databases, and REST API development.",
  },
  {
    year: "2023",
    title: "Motion graphics",
    desc: "Discovered motion design with After Effects and Premiere Pro.",
  },
  {
    year: "2024",
    title: "Professional freelancing",
    desc: "Delivered web applications and creative projects for clients worldwide.",
  },
  {
    year: "2025",
    title: "Security focus",
    desc: "Deepened knowledge in application security, OWASP, and secure auth.",
  },
];

const interests = [
  { icon: Code, label: "Web Applications", color: "text-blue-400", bg: "bg-blue-500/10" },
  { icon: Layers, label: "UI/UX Design", color: "text-purple-400", bg: "bg-purple-500/10" },
  { icon: Play, label: "Motion Graphics", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: ShieldCheck, label: "Cybersecurity", color: "text-rose-400", bg: "bg-rose-500/10" },
  { icon: Globe, label: "Performance", color: "text-amber-400", bg: "bg-amber-500/10" },
  { icon: Film, label: "Video Editing", color: "text-violet-400", bg: "bg-violet-500/10" },
];

export default function AboutPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-1.5 text-[11px] font-medium text-blue-400/90 uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          About Me
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
          Behind the code &amp; creativity
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          I'm AFIL PM, a Full-Stack Web Developer & Motion Graphics Designer
          passionate about building secure, accessible, and visually engaging
          digital experiences.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <h3 className="text-2xl font-bold text-white mb-2">My Journey</h3>
          <div className="space-y-8">
            {journey.map((item, i) => (
              <div key={i} className="relative flex gap-4 pl-8">
                <div className="relative flex-shrink-0 w-[55px] h-[55px] rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                  {item.year}
                </div>
                <div className="relative z-10">
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Technical Interests</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {interests.map((item, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/5 bg-white/5 p-5 flex items-center gap-4 hover:bg-white/10 hover:border-blue-500/30 transition-all cursor-default group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-500 bg-blue-500/10 group-hover:scale-110 transition-transform">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-slate-200">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            title: "Creative Background",
            body: "Motion graphics and video editing using After Effects, Premiere Pro, Photoshop, Illustrator, and DaVinci Resolve.",
          },
          {
            title: "Career Goals",
            body: "Deliver secure, high-performance web applications and compelling visual stories for clients and brands worldwide.",
          },
          {
            title: "Freelance Experience",
            body: "Working with clients across industries to build websites, web apps, and creative media from concept to launch.",
          },
        ].map((card) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/5 bg-white/5 p-8 hover:bg-white/10 hover:border-white/10 transition-all"
          >
            <h4 className="font-semibold text-white mb-3">{card.title}</h4>
            <p className="text-sm text-slate-400 leading-relaxed">{card.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
