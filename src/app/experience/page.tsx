// src/app/experience/page.tsx
"use client";

import { motion } from "framer-motion";
import { useFetch } from "@/hooks/use-fetch";
import { Mail, Clock, Award, GraduationCap } from "lucide-react";

const TYPE_ICON: Record<string, any> = {
  Freelance: Mail,
  Development: Clock,
  Creative: Award,
  Certification: GraduationCap,
  Learning: GraduationCap,
  Achievement: Award,
};

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatRange(start: Date | string, end?: Date | null) {
  if (!end) return "Present";
  return `${formatDate(start)} – ${formatDate(end)}`;
}

function renderTypeIcon(type: string) {
  const Comp: any = TYPE_ICON[type];
  return Comp ? <Comp className="h-3 w-3" /> : "•";
}

export default function ExperiencePage() {
  const { data: experience, loading, error } = useFetch<any>("/api/experience");

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <p className="text-muted">Loading experience...</p>
      </div>
    );
  }
  if (error || !experience) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center text-muted">
        Unable to load experience.
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-16">
        <h2 className="h-section text-3xl md:text-4xl font-bold text-text mb-4">Experience</h2>
        <p className="text-muted text-lg">Freelance, development, and creative milestones.</p>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border/40" />
        {experience.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mb-14 pl-8"
          >
            <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-brand border-2 border-surface" />
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="lg:w-48 text-right lg:pr-4">
                <span className="text-xs font-bold text-brand uppercase tracking-wider block mb-1">
                  {item.present ? "Present" : formatRange(item.startDate, item.endDate)}
                </span>
                <span className="text-sm text-muted">{formatDate(item.startDate)}</span>
              </div>
              <div className="flex-grow glass-card">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-6 h-6 rounded-full border border-brand/40 flex items-center justify-center text-[10px] font-bold text-brand">
                    {renderTypeIcon(item.type)}
                  </span>
                  <span className="text-xs font-semibold text-muted uppercase tracking-wider">{item.type}</span>
                </div>
                <h4 className="font-semibold text-text">{item.title}</h4>
                <p className="text-sm text-muted mb-3">{item.company}</p>
                <p className="text-muted text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
