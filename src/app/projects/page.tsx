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

export default function ProjectsPage() {
  const { data: projects, loading } = useFetch<any>("/api/projects");

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <p className="text-muted">Loading projects...</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="text-center mb-12">
        <h2 className="h-section text-3xl md:text-4xl font-bold text-text mb-4">Featured Projects</h2>
        <p className="text-muted text-lg">A selection of recent work.</p>
      </div>

      <ProjectsList initialProjects={projects || []} />
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
      : projects.filter((p) => p.category === category);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted" />
          <span className="text-sm font-medium text-muted uppercase tracking-wider">Filter by category</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === cat
                  ? "bg-brand text-white shadow-lg shadow-brand/30"
                  : "border border-border bg-surface text-text hover:bg-surface/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={(p) => {
              setSelected(p);
              setOpen(true);
            }}
          />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full glass-card py-20 text-center">
            <p className="text-muted">No projects found in this category.</p>
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
      layoutId={`project-${project.id}`}
      whileHover={{ y: -6 }}
      className="glass-card group cursor-pointer"
      onClick={() => onSelect(project)}
    >
      <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-surface/40 border border-border/40">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
          <span className="text-sm font-semibold text-white">View details</span>
        </div>
      </div>
      <h3 className="font-semibold text-text mb-1 group-hover:text-brand transition-colors">{project.title}</h3>
      <p className="text-sm text-muted line-clamp-2 mb-3">{project.shortDescription}</p>
      <div className="flex flex-wrap gap-2">
        {(project.technologies || []).slice(0, 3).map((tech: string) => (
          <span key={tech} className="text-[10px] uppercase tracking-wider text-brand font-bold px-2 py-1 rounded border border-brand/20 bg-brand/5">
            {tech}
          </span>
        ))}
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass rounded-3xl border border-border/60 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 hover:bg-surface/50 transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-text" />
        </button>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <div className="h-64 rounded-2xl overflow-hidden mb-4 bg-surface/40 border border-border/40">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" loading="lazy" />
            </div>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl bg-brand text-white text-center font-semibold text-sm mb-2 flex items-center justify-center gap-2">
                <ExternalLink className="h-4 w-4" /> Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl border border-border bg-surface text-text text-center font-semibold text-sm flex items-center justify-center gap-2">
                <Github className="h-4 w-4" /> GitHub Repo
              </a>
            )}
          </div>
          <div className="flex-grow">
            <h2 className="text-2xl font-bold text-text mb-2">{project.title}</h2>
            <p className="text-muted text-sm mb-4 uppercase tracking-wider font-semibold">{project.category}</p>
            <p className="text-text leading-relaxed mb-6">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {(project.technologies || []).map((tech: string) => (
                <span key={tech} className="px-3 py-1.5 rounded-xl border border-border bg-surface text-xs font-medium text-muted">
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
