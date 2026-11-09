// src/app/(admin)/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Users,
  FileText,
  Palette,
  Mail,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    services: 0,
    submissions: 0,
  });

  useEffect(() => {
    Promise.all([
      fetch("/api/projects").then((r) => r.json()),
      fetch("/api/skills").then((r) => r.json()),
      fetch("/api/services").then((r) => r.json()),
      fetch("/api/contact-submissions").then((r) => r.json()),
    ]).then(([projects, skills, services, submissions]) => {
      setStats({
        projects: Array.isArray(projects) ? projects.length : 0,
        skills: Array.isArray(skills) ? skills.length : 0,
        services: Array.isArray(services) ? services.length : 0,
        submissions: Array.isArray(submissions) ? submissions.length : 0,
      });
    });
  }, []);

  const statCards = [
    { title: "Projects", value: stats.projects, icon: Palette, color: "text-brand" },
    { title: "Skills", value: stats.skills, icon: FileText, color: "text-emerald-400" },
    { title: "Services", value: stats.services, icon: Activity, color: "text-purple-400" },
    { title: "Messages", value: stats.submissions, icon: Mail, color: "text-rose-400" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Dashboard</h1>
          <p className="text-muted">Manage your portfolio content.</p>
        </div>
        <a href="/admin/projects" className="inline-flex items-center justify-center rounded-xl border border-brand bg-brand text-white font-medium px-4 py-2.5 text-sm shadow-lg shadow-brand/25 hover:shadow-brand/40 hover:bg-blue-600 transition-all">
          Add Project
        </a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-surface/40 border border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted">{stat.title}</CardTitle>
                <div className={`w-8 h-8 rounded-lg bg-opacity-10 flex items-center justify-center ${stat.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-text">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass-card">
          <h3 className="font-semibold text-text mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <a href="/admin/projects" className="w-full inline-flex items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text hover:bg-surface/50 transition-colors">
              Manage Projects
            </a>
            <a href="/admin/skills" className="w-full inline-flex items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text hover:bg-surface/50 transition-colors">
              Manage Skills
            </a>
            <a href="/admin/services" className="w-full inline-flex items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text hover:bg-surface/50 transition-colors">
              Manage Services
            </a>
            <a href="/admin/contact-submissions" className="w-full inline-flex items-center justify-center rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text hover:bg-surface/50 transition-colors">
              View Messages
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
