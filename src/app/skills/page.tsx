// src/app/skills/page.tsx

import { db } from "@/lib/db";
import { lucideIcons } from "@/components/sections/skills-icons";

const SAMPLE_SKILLS = [
  { name: "HTML5", category: "Frontend Development", icon: "Code", order: 1 },
  { name: "CSS3", category: "Frontend Development", icon: "Code", order: 2 },
  { name: "JavaScript", category: "Frontend Development", icon: "Code", order: 3 },
  { name: "TypeScript", category: "Frontend Development", icon: "Code", order: 4 },
  { name: "React.js", category: "Frontend Development", icon: "Code", order: 5 },
  { name: "Next.js", category: "Frontend Development", icon: "Code", order: 6 },
  { name: "Tailwind CSS", category: "Frontend Development", icon: "Code", order: 7 },
  { name: "Bootstrap", category: "Frontend Development", icon: "Code", order: 8 },
  { name: "Node.js", category: "Backend Development", icon: "Code", order: 1 },
  { name: "PHP", category: "Backend Development", icon: "Code", order: 2 },
  { name: "Python", category: "Backend Development", icon: "Code", order: 3 },
  { name: "REST APIs", category: "Backend Development", icon: "Code", order: 4 },
  { name: "MySQL", category: "Backend Development", icon: "Code", order: 5 },
  { name: "MongoDB", category: "Backend Development", icon: "Code", order: 6 },
  { name: "Git", category: "Development Tools", icon: "Code", order: 1 },
  { name: "GitHub", category: "Development Tools", icon: "Code", order: 2 },
  { name: "VS Code", category: "Development Tools", icon: "Code", order: 3 },
  { name: "Linux", category: "Development Tools", icon: "Code", order: 4 },
  { name: "Postman", category: "Development Tools", icon: "Code", order: 5 },
  { name: "Vercel", category: "Development Tools", icon: "Code", order: 6 },
  { name: "Alight Motion", category: "Motion Graphics & Video Editing", icon: "Play", order: 1 },
  { name: "Adobe After Effects", category: "Motion Graphics & Video Editing", icon: "Play", order: 2 },
  { name: "Adobe Premiere Pro", category: "Motion Graphics & Video Editing", icon: "Play", order: 3 },
  { name: "Adobe Photoshop", category: "Motion Graphics & Video Editing", icon: "Play", order: 4 },
  { name: "Adobe Illustrator", category: "Motion Graphics & Video Editing", icon: "Play", order: 5 },
  { name: "DaVinci Resolve", category: "Motion Graphics & Video Editing", icon: "Play", order: 6 },
];

export default async function SkillsPage() {
  let skills;
  try {
    skills = await db.skill.findMany({
      where: { isPublished: true },
      orderBy: [{ category: "asc" }, { order: "asc" }],
    });
  } catch {
    skills = SAMPLE_SKILLS;
  }

  const grouped = Object.groupBy(skills, (s) => s.category);

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
        {Object.entries(grouped).map(([category, categoryItems]) => {
          const sorted = (categoryItems || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
          return (
            <div
              key={category}
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
                    <div
                      key={skill.id}
                      className="flex items-center gap-3 p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all group cursor-default"
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-500 bg-blue-500/10 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-slate-200">{skill.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
