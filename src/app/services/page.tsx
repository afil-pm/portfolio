// src/app/services/page.tsx
"use client";

import { motion } from "framer-motion";
import { useFetch } from "@/hooks/use-fetch";

const SERVICE_DESC: Record<string, string> = {
  "Website Development": "Clean, responsive websites built with modern frontend technologies.",
  "Full-Stack Web Application Development": "Complete web applications with frontend, backend, and database integration.",
  "Responsive Website Design": "Mobile-first designs that look great on every device and screen size.",
  "E-commerce Website Development": "Online stores with secure payments and inventory management.",
  "UI/UX Implementation": "User-centered interfaces with a focus on accessibility and usability.",
  "Motion Graphics Design": "Animated visuals and motion design for brands and media.",
  "Video Editing": "Professional video editing and post-production.",
  "Logo Animation": "Animated logos that bring brand identity to life.",
  "Social Media Creative Design": "Eye-catching creative assets for social platforms.",
};

const SERVICE_ICONS: Record<string, string> = {
  "Website Development": "💻",
  "Full-Stack Web Application Development": "🚀",
  "Responsive Website Design": "📱",
  "E-commerce Website Development": "🛒",
  "UI/UX Implementation": "🎨",
  "Motion Graphics Design": "🎬",
  "Video Editing": "✂️",
  "Logo Animation": "✨",
  "Social Media Creative Design": "📱",
};

export default function ServicesPage() {
  const { data: services, loading } = useFetch<any>("/api/services");

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <motion.div
          className="inline-block w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
        />
      </div>
    );
  }

  const items = (services || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-1.5 text-[11px] font-medium text-blue-400/90 uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          Services
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
          What I build for you
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Professional web development and creative services tailored to your needs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((service: any) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative rounded-3xl border border-white/5 bg-white/5 p-8 hover:bg-white/10 hover:border-white/20 hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <span className="text-xl">{SERVICE_ICONS[service.title] || "★"}</span>
            </div>
            <h3 className="font-semibold text-white mb-3">{service.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-grow">
              {SERVICE_DESC[service.title] || service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
