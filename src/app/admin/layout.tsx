// src/app/(admin)/layout.tsx — client-side shell with sidebar
"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Palette,
  Code,
  Video,
  Briefcase,
  Mail,
  Settings,
  LogOut,
  Menu,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ADMIN_ITEMS = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Projects", href: "/admin/projects", icon: Palette },
  { name: "Skills", href: "/admin/skills", icon: Code },
  { name: "Services", href: "/admin/services", icon: LayoutDashboard },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Creative Works", href: "/admin/creative-works", icon: Video },
  { name: "Contact Submissions", href: "/admin/contact-submissions", icon: Mail },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/me", { method: "DELETE" });
    router.push("/(admin)/login");
    router.refresh();
  };

  return (
    <div className="flex h-screen bg-dark-bg text-text">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 glass border-r border-border/50 transition-all duration-300 ${
          collapsed ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between h-14 px-6 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-brand flex items-center justify-center text-[10px] font-bold text-white">AP</div>
            <span className={collapsed ? "hidden" : "font-display font-bold text-lg tracking-tight"}>
              AFIL<span className="text-brand">PM</span>
            </span>
          </div>
          <button onClick={() => setCollapsed(!collapsed)} className="p-2 hover:bg-surface/50 rounded-lg">
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <nav className="py-4 space-y-1 px-3">
          {ADMIN_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setCollapsed(false)}
                className={[
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all",
                  active
                    ? "bg-brand text-white shadow-lg shadow-brand/25"
                    : "text-muted hover:text-text hover:bg-surface/50",
                ].join(" ")}
              >
                <Icon className="h-4 w-4" />
                <span className={collapsed ? "hidden" : "block"}>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border/50">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="h-4 w-4" />
            <span className={collapsed ? "hidden" : "block"}>Sign out</span>
          </button>
        </div>
      </aside>

      <div className="flex-grow flex flex-col overflow-hidden ml-0 md:ml-64">
        <header className="h-14 border-b border-border/50 bg-surface/40 backdrop-blur flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h1 className="font-semibold text-text">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noopener noreferrer" className="text-xs text-muted hover:text-text">
              View site
            </a>
          </div>
        </header>

        <main className="flex-grow overflow-y-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
