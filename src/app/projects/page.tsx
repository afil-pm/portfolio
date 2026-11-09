// src/app/projects/page.tsx
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ExternalLink, Github } from "lucide-react";
import React from "react";
import { useFetch } from "@/hooks/use-fetch";

const CATEGORIES = [
  "All",
  "Web Development",
  "Full-Stack Applications",
  "UI/UX",
  "Motion Graphics",
  "Video Editing",
];

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

export default function ProjectsPage() {
  const { data: projects, loading } = useFetch<any>("/api/projects");

  const allProjects = loading ? SAMPLE_PROJECTS : (projects || SAMPLE_PROJECTS);

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

function ProjectsList({ initialProjects }: { initialProjects: any[] }) {
  const [category, setCategory] = React.useState("All");
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<any>(null);
  const [projects, setProjects] = React.useState(initialProjects);

  const filtered =
    category === "All"
      ? projects
      : projects.filter((p: any) => p.category === category);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-14">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-300 uppercase tracking-wider">Filter by category</span>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                category === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project: any) => (
          <ProjectCard
            key={project.id || project.slug}
            project={project}
            onSelect={(p: any) => {
              setSelected(p);
              setOpen(true);
            }}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-slate-500 mx-auto mb-4">
              <Filter className="h-8 w-8" />
            </div>
            <p className="text-slate-400">No projects found in this category.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {open && selected && (
          <ProjectModal project={selected} onClose={() => { setOpen(false); setSelected(null); }} />
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectCard({ project, onSelect }: { project: any; onSelect: (p: any) => void }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group cursor-pointer rounded-3xl border border-white/5 bg-white/5 overflow-hidden hover:border-white/20 hover:bg-white/10 transition-all duration-500"
      onClick={() => onSelect(project)}
    >
      <div className="relative h-48 overflow-hidden bg-slate-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
          <span className="text-sm font-semibold text-white">View project details</span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
        <p className="text-sm text-slate-400 line-clamp-2 mb-4">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-2">
          {(project.technologies || []).slice(0, 3).map((tech: string) => (
            <span key={tech} className="text-[10px] uppercase tracking-wider text-blue-400 font-bold px-2 py-1 rounded border border-blue-500/20 bg-blue-500/5">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: any; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-900 p-8 md:p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-slate-300" />
        </button>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/3">
            <div className="h-64 rounded-2xl overflow-hidden mb-6 bg-slate-800 border border-white/10">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-xl bg-blue-600 text-white text-center font-semibold text-sm mb-3 flex items-center justify-center gap-2 hover:bg-blue-500 transition-colors">
                <ExternalLink className="h-4 w-4" /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full py-4 rounded-xl border border-white/10 bg-white/5 text-slate-200 text-center font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/20 transition-colors">
                <Github className="h-4 w-4" /> GitHub Repo
              </a>
            )}
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
            <p className="text-sm text-blue-400 mb-4 uppercase tracking-wider font-semibold">{project.category}</p>
            <p className="text-slate-300 leading-relaxed mb-8">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {(project.technologies || []).map((tech: string) => (
                <span key={tech} className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs font-medium text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
