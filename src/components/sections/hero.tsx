// src/components/sections/hero.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
  Code,
  Layers,
  Video,
  Briefcase,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background layers */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Ambient glow blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full -z-10 animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] bg-purple-600/8 blur-[90px] rounded-full -z-10" style={{ animationDelay: "4s" }} />

      {/* Grid pattern subtle */}
      <div className="absolute inset-0 z-0 [background-image:linear-gradient(to_right,#1e293b1a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b1a_1px,transparent_1px)] [background-size:48px_48px] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-1.5 text-[11px] font-medium text-blue-400/90 uppercase tracking-widest backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          Available for freelance &bull; Open to collaboration
        </div>

        {/* Name */}
        <h1 className="mt-8 mb-2 text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-tight">
          AFIL<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500">PM</span>
        </h1>

        {/* Role */}
        <h2 className="mt-3 text-xl md:text-2xl text-slate-400 font-medium tracking-tight">
          Full-Stack Web Developer &amp; Motion Graphics Designer
        </h2>

        {/* Subtitle */}
        <p className="mt-6 max-w-2xl mx-auto text-slate-300 text-base md:text-lg leading-relaxed">
          I build secure, performant web applications and craft compelling motion
          graphics that bring brands to life — blending technical depth with
          creative storytelling.
        </p>

        {/* Animated roles (typing effect - deliberate, starts immediately) */}
        <div className="mt-10 inline-block">
          <span className="relative text-2xl md:text-3xl font-semibold text-white">
            <motion.span
              className="relative inline-block text-white"
              animate={{
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {[
                "Full-Stack Developer.",
                "Motion Graphics Designer.",
                "UI/UX Designer.",
                "Security-Focused Engineer.",
              ].map((role, i) => (
                <span
                  key={i}
                  className="absolute left-0 top-0 text-white"
                  style={{ opacity: 0 }}
                >
                  {role}
                </span>
              ))}
            </motion.span>
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5">
          <Link
            href="/projects"
            className="group relative px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:-translate-y-2 hover:shadow-blue-600/50 active:-translate-y-0.5 active:shadow-blue-600/20 transition-all duration-300 ease-out flex items-center gap-2 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore My Work <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </Link>
          <Link
            href="/api/download-resume"
            className="group relative px-6 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-semibold text-sm shadow-sm hover:-translate-y-2 hover:shadow-lg hover:shadow-white/10 hover:border-white/20 active:-translate-y-0.5 active:shadow-none transition-all duration-300 ease-out flex items-center gap-2 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Download className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" /> Download Resume
            </span>
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </Link>
          <a
            href="/contact"
            className="group relative px-6 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-semibold text-sm shadow-sm hover:-translate-y-2 hover:shadow-lg hover:shadow-white/10 hover:border-white/20 active:-translate-y-0.5 active:shadow-none transition-all duration-300 ease-out flex items-center gap-2 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Play className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" /> Contact Me
            </span>
            <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
          </a>
        </div>

        {/* Social links */}
        <div className="mt-20 flex justify-center gap-6 opacity-50">
          <a href="https://github.com/afil-pm" target="_blank" rel="noopener noreferrer" className="group relative h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-400/50 hover:bg-blue-500/10 transition-all" aria-label="GitHub">
            <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-[10px] bg-white/90 text-slate-900 px-2 py-1 rounded whitespace-nowrap">
              GitHub
            </span>
          </a>
          <a href="https://instagram.com/afil_pm" target="_blank" rel="noopener noreferrer" className="group relative h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-400/50 hover:bg-purple-500/10 transition-all" aria-label="Instagram">
            <Instagram className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-[10px] bg-white/90 text-slate-900 px-2 py-1 rounded whitespace-nowrap">
              Instagram
            </span>
          </a>
          <a href="https://linkedin.com/in/afil-pm" target="_blank" rel="noopener noreferrer" className="group relative h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-400/50 hover:bg-blue-500/10 transition-all" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-[10px] bg-white/90 text-slate-900 px-2 py-1 rounded whitespace-nowrap">
              LinkedIn
            </span>
          </a>
          <a href="https://wa.me/917561820814" target="_blank" rel="noopener noreferrer" className="group relative h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-emerald-400/50 hover:bg-emerald-500/10 transition-all" aria-label="WhatsApp">
            <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-[10px] bg-white/90 text-slate-900 px-2 py-1 rounded whitespace-nowrap">
              WhatsApp
            </span>
          </a>
        </div>

        {/* Scroll hint */}
        <div className="mt-24 flex items-center justify-center">
          <div className="w-1 h-10 rounded-full bg-white/20 mx-auto animate-[bounce_2s_infinite]"></div>
        </div>
      </div>

      {/* ===== FEATURED PROJECT CARDS SECTION ===== */}
      <section className="relative py-24 border-y border-white/5">
        <div className="absolute inset-x-0 top-0 -bottom-px bg-gradient-to-t from-black/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-tight">
                Featured Work
              </h2>
              <p className="text-slate-400 text-sm">Selected projects across development and motion design.</p>
            </div>
            <Link
              href="/projects"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/10 hover:border-white/20 transition-colors group"
            >
              View all <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "E-Commerce Platform",
                cat: "Full-Stack",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=600&q=80",
                tech: ["Next.js", "Node.js", "Stripe"],
              },
              {
                title: "Brand Identity Animation",
                cat: "Motion Graphics",
                image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
                tech: ["After Effects", "Illustrator"],
              },
              {
                title: "SaaS Dashboard",
                cat: "Web Development",
                image: "https://images.unsplash.com/photo-1460925895917-afbe65ae8364?w=600&q=80",
                tech: ["React", "TypeScript", "Tailwind"],
              },
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative rounded-2xl border border-white/5 bg-white/5 overflow-hidden hover:border-white/20 hover:bg-white/10 transition-all duration-400"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
                    <span className="text-sm font-semibold text-white">
                      View project &rarr;
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-wider text-blue-400 font-bold px-2 py-1 rounded border border-blue-500/20 bg-blue-500/5">
                      {project.cat}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[9px] uppercase tracking-wider text-slate-500 font-medium px-1.5 py-0.5 rounded border border-white/5 bg-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES CARDS SECTION ===== */}
      <section className="relative py-24 bg-slate-950/30">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 tracking-tight">
              Services
            </h2>
            <p className="text-slate-400 text-sm">
              From secure web applications to compelling motion graphics — I deliver end-to-end digital solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-5">
            {[
              {
                title: "Web Development",
                desc: "Responsive websites",
                icon: Code,
                color: "text-blue-400",
                bg: "bg-blue-500/10",
              },
              {
                title: "Full-Stack Apps",
                desc: "Complete web apps",
                icon: Layers,
                color: "text-purple-400",
                bg: "bg-purple-500/10",
              },
              {
                title: "Motion Graphics",
                desc: "Animated visuals",
                icon: Video,
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
              },
              {
                title: "Video Editing",
                desc: "Professional post-production",
                icon: Briefcase,
                color: "text-rose-400",
                bg: "bg-rose-500/10",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-2xl border border-white/5 bg-white/5 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 {service.bg} {service.color}">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
