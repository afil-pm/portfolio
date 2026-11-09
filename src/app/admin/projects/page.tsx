// src/app/(admin)/projects/page.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  ExternalLink,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Project = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  image: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  technologies: string[];
  featured: boolean;
  order: number;
  isPublished: boolean;
};

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Record<string, any>>({ technologies: "" });
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects", { cache: "no-store" });
      const data = await res.json();
      setProjects(Array.isArray(data) ? data : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const getCsrf = useCallback(async () => {
    const res = await fetch("/api/auth/csrf");
    const data = await res.json();
    return (data.csrfToken || "") as string;
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: "", slug: "", shortDescription: "", description: "", category: "Web Development", image: "", liveUrl: "", githubUrl: "", technologies: "", featured: false, isPublished: true, order: 0 });
    setError("");
    setOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({ ...p, technologies: (p.technologies || []).join(", ") });
    setError("");
    setOpen(true);
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const token = await getCsrf();
    const technologies = String(form.technologies || "").split(",").map((t: string) => t.trim()).filter(Boolean);
    const body = {
      ...form,
      technologies,
      featured: form.featured === true || form.featured === "true",
      isPublished: form.isPublished === true || form.isPublished === "true",
      order: Number(form.order || 0),
      liveUrl: form.liveUrl || undefined,
      githubUrl: form.githubUrl || undefined,
    } as any;
    const url = editing ? `/api/projects/${editing.id}` : "/api/projects";
    const method = editing ? "PUT" : "POST";
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "X-CSRF-TOKEN": token },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setOpen(false);
      load();
    } catch (err: any) {
      setError(err.message || "Save failed");
    }
  }, [form, editing, getCsrf, load]);

  const remove = useCallback(async (id: string) => {
    if (!confirm("Delete this project?")) return;
    const token = await getCsrf();
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE", headers: { "X-CSRF-TOKEN": token } });
      if (!res.ok) throw new Error("Delete failed");
      load();
    } catch (err: any) {
      setError(err.message || "Delete failed");
    }
  }, [getCsrf, load]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-text">Projects</h1>
        <Button variant="brand" onClick={openCreate}>
          <Plus className="ml-1 h-4 w-4" /> Add Project
        </Button>
      </div>

      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">{error}</div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-border/50 text-left text-muted text-xs uppercase tracking-wider">
              <th className="pb-3 pr-4">Thumbnail</th>
              <th className="pb-3 pr-4">Title</th>
              <th className="pb-3 pr-4">Category</th>
              <th className="pb-3 pr-4">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            {projects.map((p) => (
              <tr key={p.id} className="group hover:bg-surface/30 transition-colors">
                <td className="pb-4 pr-4">
                  <img src={p.image} alt={p.title} className="w-16 h-16 rounded-xl object-cover bg-surface border border-border/40" loading="lazy" />
                </td>
                <td className="pb-4 pr-4 font-medium text-text">{p.title}</td>
                <td className="pb-4 pr-4"><Badge variant="outline">{p.category}</Badge></td>
                <td className="pb-4 pr-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                    p.isPublished ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-surface text-muted border border-border"
                  }`}>
                    {p.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="pb-4">
                  <Button variant="outline" size="sm" onClick={() => openEdit(p)} className="mr-2">
                    <Edit3 className="ml-1 h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => remove(p.id)} className="text-red-400 hover:bg-red-500/10">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan={5} className="py-10 text-center text-muted">No projects found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${open ? "block" : "hidden"} bg-black/60 backdrop-blur`}
        onClick={() => setOpen(false)}
      >
        <Card className="w-full max-w-2xl p-0 mb-8 relative" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-5 border-b border-border/50">
            <h3 className="font-semibold text-text">{editing ? "Edit Project" : "Add Project"}</h3>
            <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Title" id="title" required value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              <Field label="Slug" id="slug" placeholder="my-project" required value={form.slug || ""} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
            <Field label="Short Description" id="shortDescription" required value={form.shortDescription || ""} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
            <Field label="Description" id="description" as="textarea" rows={4} required value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <div className="grid md:grid-cols-3 gap-5">
              <Field label="Category" id="category" required value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              <Field label="Image URL" id="image" placeholder="https://..." required value={form.image || ""} onChange={(e) => setForm({ ...form, image: e.target.value })} />
              <Field label="Order" id="order" type="number" value={String(form.order || 0)} onChange={(e) => setForm({ ...form, order: e.target.value })} />
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Live Demo URL" id="liveUrl" placeholder="https://..." value={form.liveUrl || ""} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} />
              <Field label="GitHub URL" id="githubUrl" placeholder="https://..." value={form.githubUrl || ""} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} />
            </div>
            <Field label="Technologies (comma-separated)" id="technologies" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} placeholder="React, Next.js, Tailwind" />
            <div className="flex items-center gap-3 pt-4 border-t border-border/50">
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
                <input type="checkbox" checked={form.featured === true || form.featured === "true"} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm cursor-pointer select-none ml-auto">
                <input type="checkbox" checked={form.isPublished === true || form.isPublished === "true"} onChange={(e) => setForm({ ...form, isPublished: e.target.checked })} />
                Published
              </label>
            </div>
            <Button type="submit" variant="brand" disabled={loading} className="w-full">
              {loading ? <Save className="mr-2 h-4 w-4" /> : ""} {editing ? "Update" : "Create"}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  type = "text",
  required,
  value,
  onChange,
  as,
  rows,
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  as?: "textarea";
  rows?: number;
  placeholder?: string;
}) {
  const Comp = as === "textarea" ? Textarea : Input;
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}{required && <span className="text-red-500 ml-1">*</span>}</Label>
      <Comp id={id} name={id} type={type} rows={rows} placeholder={placeholder} value={value} onChange={(e: any) => onChange(e)} required={required} />
    </div>
  );
}
