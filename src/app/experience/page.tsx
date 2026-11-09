// src/app/experience/page.tsx

import { db } from "@/lib/db";
import { Mail, Clock, Award, GraduationCap } from "lucide-react";

const TYPE_ICON: Record<string, any> = {
  Freelance: Mail,
  Development: Clock,
  Creative: Award,
  Certification: GraduationCap,
  Learning: GraduationCap,
  Achievement: Award,
};

const SAMPLE_EXPERIENCE = [
  {
    id: "exp-1",
    title: "Freelance Web Developer",
    company: "Self-Employed",
    type: "Freelance",
    startDate: "2024-01-01",
    endDate: null,
    present: true,
    description: "Building secure, performant web applications for clients worldwide using Next.js, React, and Node.js.",
    order: 1,
    isPublished: true,
  },
  {
    id: "exp-2",
    title: "Motion Graphics Designer",
    company: "Freelance",
    type: "Creative",
    startDate: "2023-01-01",
    endDate: null,
    present: true,
    description: "Creating motion graphics and video edits using After Effects, Premiere Pro, and DaVinci Resolve.",
    order: 2,
    isPublished: true,
  },
  {
    id: "exp-3",
    title: "Full-Stack Development",
    company: "Personal Projects",
    type: "Development",
    startDate: "2022-01-01",
    endDate: null,
    present: true,
    description: "Developing full-stack applications with React, Node.js, databases, and REST APIs.",
    order: 3,
    isPublished: true,
  },
];

export default async function ExperiencePage() {
  let experience;
  try {
    experience = await db.experience.findMany({
      where: { isPublished: true },
      orderBy: { startDate: "desc" },
    });
  } catch {
    experience = SAMPLE_EXPERIENCE;
  }

  const items = experience.sort(
    (a: any, b: any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

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

  return (
    <section className="max-w-4xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-1.5 text-[11px] font-medium text-blue-400/90 uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          Experience
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
          Journey & milestones
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Freelance, development, and creative milestones throughout my career.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/5" />
        {items.map((item: any, i: number) => (
          <div
            key={item.id}
            className="relative mb-16 pl-8"
          >
            <div className="absolute left-0 top-3 w-3 h-3 rounded-full bg-blue-500 border-2 border-slate-950 shadow-[0_0_0_4px_rgba(59,130,246,0.2)]" />
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="lg:w-48 text-right lg:pr-6">
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
                  {item.present ? "Present" : formatRange(item.startDate, item.endDate)}
                </span>
                <span className="text-sm text-slate-400">{formatDate(item.startDate)}</span>
              </div>
              <div className="flex-grow rounded-3xl border border-white/5 bg-white/5 p-6 hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-6 h-6 rounded-full border border-blue-500/30 flex items-center justify-center text-[10px] font-bold text-blue-400 bg-blue-500/10">
                    {renderTypeIcon(item.type)}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{item.type}</span>
                </div>
                <h4 className="font-semibold text-white">{item.title}</h4>
                <p className="text-sm text-slate-400 mb-3">{item.company}</p>
                <p className="text-sm text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
