// src/app/projects/page.tsx

import { db } from "@/lib/db";
import { ProjectsList } from "@/components/sections/projects-list";

const SAMPLE_PROJECTS = [
  {
    title: "E-Commerce Platform",
    slug: "ecommerce-platform",
    shortDescription: "Modern full-stack e-commerce solution with secure payments and inventory management.",
    description: "A complete e-commerce platform built with Next.js, Node.js, and MongoDB featuring Stripe integration, admin dashboard, and responsive design.",
    category: "Full-Stack Applications",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&q=80",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    technologies: ["Next.js", "Node.js", "MongoDB", "Stripe", "Tailwind"],
    featured: true,
    order: 0,
    isPublished: true,
  },
  {
    title: "SaaS Dashboard",
    slug: "saas-dashboard",
    shortDescription: "Analytics dashboard with real-time data visualization and user management.",
    description: "A comprehensive SaaS analytics dashboard with interactive charts, user roles, and real-time updates using WebSockets.",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1460925895917-afbe65ae8364?w=800&q=80",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    technologies: ["React", "TypeScript", "Chart.js", "Firebase", "Tailwind"],
    featured: true,
    order: 1,
    isPublished: true,
  },
  {
    title: "Brand Identity Animation",
    slug: "brand-identity",
    shortDescription: "Logo animation and motion graphics for a tech startup brand.",
    description: "Dynamic logo animation and brand identity motion graphics created with After Effects for a modern tech startup.",
    category: "Motion Graphics",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    liveUrl: undefined,
    githubUrl: undefined,
    technologies: ["After Effects", "Illustrator", "Premiere Pro"],
    featured: true,
    order: 2,
    isPublished: true,
  },
  {
    title: "Promo Video Edit",
    slug: "promo-video",
    shortDescription: "Product promotional video with color grading and motion graphics overlays.",
    description: "Professional video editing and color grading for a product launch campaign with animated text overlays and sound design.",
    category: "Video Editing",
    image: "https://images.unsplash.com/photo-1536440136629-8bb9012dca79?w=800&q=80",
    liveUrl: undefined,
    githubUrl: undefined,
    technologies: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    featured: false,
    order: 3,
    isPublished: true,
  },
];

export default async function ProjectsPage() {
  let projects: any[] = [];
  try {
    projects = await db.project.findMany({
      where: { isPublished: true },
      orderBy: { order: "asc", createdAt: "desc" },
    });
  } catch {
    projects = [];
  }

  const allProjects = projects.length > 0 ? projects : SAMPLE_PROJECTS;

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-1.5 text-[11px] font-medium text-blue-400/90 uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
          Featured Projects
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
          Selected work
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          A curated selection of recent web development and motion graphics projects.
        </p>
      </div>

      <ProjectsList initialProjects={allProjects} />
    </section>
  );
}
