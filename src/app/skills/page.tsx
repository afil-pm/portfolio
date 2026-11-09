// src/app/skills/page.tsx
"use client";

import { motion } from "framer-motion";
import { useFetch } from "@/hooks/use-fetch";
import { lucideIcons } from "@/components/sections/skills-icons";

export default function SkillsPage() {
  const { data: skills, loading } = useFetch<any>("/api/skills");

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <motion.div
          className="inline-block w-10 h-10 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
        />
      </div>
    );
  }

  const items = (skills || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  const grouped = Object.groupBy(items, (s: any) => s.category);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-1.5 text-[11px] font-medium text-blue-400/90 uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          Technical Skills
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
          Tools I craft with
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          A curated selection of frontend, backend, tools, and creative technologies I work with.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {Object.entries(grouped).map(([category, categoryItems], idx) => {
          const sorted = (categoryItems || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-3xl border border-white/5 bg-white/5 p-8 hover:bg-white/10 hover:border-white/10 transition-all"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <h3 className="font-bold text-slate-200 tracking-tight">{category}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {sorted.map((skill: any) => {
                  const Icon = lucideIcons[skill.icon] || lucideIcons.Code;
                  return (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group cursor-default"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-500 bg-blue-500/10 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-slate-200">{skill.name}</span>
                    </motion.div>
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
