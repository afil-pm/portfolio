// src/app/services/page.tsx
"use client";

import { motion } from "framer-motion";
import { useFetch } from "@/hooks/use-fetch";

const SERVICE_DESC: Record<string, string> = {
  "Website Development": "Clean, responsive websites built with modern frontend technologies.",
  "Full-Stack Web Application Development": "Complete web applications with frontend, backend, and database.",
  "Responsive Website Design": "Mobile-first designs that look great on every device.",
  "E-commerce Website Development": "Online stores with secure payments and inventory management.",
  "UI/UX Implementation": "User-centered interfaces with a focus on accessibility and usability.",
  "Motion Graphics Design": "Animated visuals and motion design for brands and media.",
  "Video Editing": "Professional video editing and post-production.",
  "Logo Animation": "Animated logos that bring brand identity to life.",
  "Social Media Creative Design": "Eye-catching creative assets for social platforms.",
};

function getIconEmoji(name: string): string {
  const map: Record<string, string> = {
    Code: "💻",
    Layout: "📐",
    Store: "🛒",
    Palette: "🎨",
    Film: "🎬",
    PlayCircle: "▶️",
    Layers: "🗐",
    Image: "🖼️",
    Globe: "🌐",
  };
  return map[name] || "★";
}

export default async function ServicesPage() {
  const { data: services, loading, error } = useFetch<any>("/api/services");

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <p className="text-muted">Loading services...</p>
      </div>
    );
  }
  if (error || !services) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center text-muted">
        Unable to load services.
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-16">
        <h2 className="h-section text-3xl md:text-4xl font-bold text-text mb-4">Services</h2>
        <p className="text-muted text-lg">What I can build for you.</p>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card flex flex-col group"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand mb-4 group-hover:bg-brand group-hover:text-white transition-colors">
              <span className="text-lg">{getIconEmoji(service.icon)}</span>
            </div>
            <h3 className="font-semibold text-text mb-2">{service.title}</h3>
            <p className="text-sm text-muted leading-relaxed mb-6 flex-grow">
              {SERVICE_DESC[service.title] || service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
