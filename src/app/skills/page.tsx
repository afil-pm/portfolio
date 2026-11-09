// src/app/skills/page.tsx
"use client";

import { motion } from "framer-motion";
import { createElement } from "react";
import { useFetch } from "@/hooks/use-fetch";
import { lucideIcons } from "@/components/sections/skills-icons";

const CATEGORY_ORDER: Record<string, number> = {
  "Frontend Development": 1,
  "Backend Development": 2,
  "Development Tools": 3,
  "Motion Graphics & Video Editing": 4,
};

export default function SkillsPage() {
  const { data: skills, loading, error } = useFetch<any>("/api/skills");

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <p className="text-muted">Loading skills...</p>
      </div>
    );
  }
  if (error || !skills) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center text-muted">
        Unable to load skills.
      </div>
    );
  }

  const grouped = Object.groupBy(skills, (s) => s.category);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-16">
        <h2 className="h-section text-3xl md:text-4xl font-bold text-text mb-4">Technical Skills</h2>
        <p className="text-muted text-lg">Tools and technologies I work with.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {Object.entries(grouped).map(([category, items]) => {
          const sorted = (items || []).sort((a, b) => (a.order || 0) - (b.order || 0));
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-brand"></span>
                <h3 className="font-semibold text-text tracking-tight">{category}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {sorted.map((skill) => {
                  const Icon = lucideIcons[skill.icon] || lucideIcons.Code;
                  return (
                    <div
                      key={skill.id}
                      className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-surface/40 hover:bg-brand/5 hover:border-brand/30 transition-colors"
                    >
                      <div className="w-9 h-9 rounded-lg bg-surface flex items-center justify-center text-brand">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-text">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
