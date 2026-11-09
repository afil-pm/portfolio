// src/components/layout/navbar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Home,
  User,
  Code,
  Layers,
  Palette,
  Video,
  Briefcase,
  Mail,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Skills", href: "/skills", icon: Code },
  { name: "Services", href: "/services", icon: Layers },
  { name: "Projects", href: "/projects", icon: Palette },
  { name: "Creative Works", href: "/creative-works", icon: Video },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "Contact", href: "/contact", icon: Mail },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      aria-label="Main navigation"
    >
      <div
        className={[
          "glass mx-4 mt-2.5 rounded-3xl px-6 py-3 border border-white/10 backdrop-blur-md",
          scrolled ? "shadow-lg shadow-black/30" : "shadow-sm",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          {/* Brand — flush left */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="AFIL PM — home"
            >
              <div className="w-[40px] h-[40px] rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                AP
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white">
                AFIL<span className="text-blue-400">PM</span>
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={[
                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-slate-400 hover:text-white hover:bg-white/5",
                  ].join(" ")}
                >
                  <Icon className={active ? "h-5 w-5" : "h-4 w-4"} />
                  <span className="ml-1.5">{item.name}</span>
                </Link>
              );
            })}

          </div>

          {/* Mobile toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden h-9 w-9 p-0"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label="Open mobile menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-3 space-y-1">
            <div className="flex items-center justify-between px-2 mb-4 border-b border-white/5 pb-2">
              <span className="font-display font-bold text-lg tracking-tight text-white flex items-center gap-2">
                <div className="w-[55px] h-[55px] rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">AP</div>
                AFIL<span className="text-blue-400">PM</span>
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                    active
                      ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/5",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {active && <ChevronRight className="ml-auto h-3 w-3 text-blue-400" />}
                </Link>
              );
            })}

          </div>
        </div>
      )}
    </nav>
  );
}
