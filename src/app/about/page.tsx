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
  { icon: Code, label: "Web Applications", color: "text-blue-400" },
  { icon: Layers, label: "UI/UX Design", color: "text-purple-400" },
  { icon: Play, label: "Motion Graphics", color: "text-emerald-400" },
  { icon: ShieldCheck, label: "Cybersecurity", color: "text-rose-400" },
  { icon: Globe, label: "Performance", color: "text-amber-400" },
  { icon: Film, label: "Video Editing", color: "text-violet-400" },
];

export default function AboutPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-16">
        <h2 className="h-section text-3xl md:text-4xl font-bold text-text mb-4">About Me</h2>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          I'm AFIL PM, a Full-Stack Web Developer & Motion Graphics Designer
          passionate about building secure, accessible, and visually engaging
          digital experiences.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="h-section text-2xl font-bold text-text">My Journey</h3>
          <div className="space-y-8">
            {journey.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold">
                  {item.year}
                </div>
                <div>
                  <h4 className="font-semibold text-text">{item.title}</h4>
                  <p className="text-muted text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="h-section text-2xl font-bold text-text">Technical Interests</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {interests.map((item, i) => (
              <div
                key={i}
                className="glass-card flex items-center gap-4 p-4 hover:border-brand/40 transition-colors cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-surface/50 flex items-center justify-center text-brand">
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-medium text-text">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card title="Creative Background" body="Motion graphics and video editing using After Effects, Premiere Pro, Photoshop, Illustrator, and DaVinci Resolve." />
        <Card title="Career Goals" body="Deliver secure, high-performance web applications and compelling visual stories for clients and brands." />
        <Card title="Freelance Experience" body="Working with clients across industries to build websites, web apps, and creative media." />
      </div>
    </section>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="glass-card">
      <h4 className="font-semibold text-text mb-2">{title}</h4>
      <p className="text-sm text-muted leading-relaxed">{body}</p>
    </div>
  );
}
