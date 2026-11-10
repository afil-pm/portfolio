// src/components/layout/navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Code,
  Layers,
  Palette,
  Briefcase,
  Mail,
  ChevronRight,
  Download,
  Play,
  Github,
  Linkedin,
  Instagram,
  Phone,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Skills", href: "/skills", icon: Code },
  { name: "Services", href: "/services", icon: Layers },
  { name: "Projects", href: "/projects", icon: Palette },
  { name: "Experience", href: "/experience", icon: Briefcase },
  { name: "Contact", href: "/contact", icon: Mail },
];

const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com/afil-pm", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com/in/afil-pm", icon: Linkedin },
  { name: "Instagram", href: "https://instagram.com/afil_pm", icon: Instagram },
  { name: "WhatsApp", href: "https://wa.me/917561820814", icon: Phone },
  { name: "Email", href: "mailto:info.afilpm@gmail.com", icon: Mail },
];

// Stagger variants for mobile navigation items
const menuContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

const menuItemVariants = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  exit: { opacity: 0, x: -10, transition: { duration: 0.15 } },
};

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu
  const closeMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  // Handle scroll state for navbar glass background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-2.5 transition-all duration-300"
      aria-label="Main navigation"
    >
      {/* Top Navbar Bar */}
      <div
        className={[
          "max-w-7xl mx-auto glass rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-2.5 sm:py-3 border border-white/10 backdrop-blur-xl transition-all duration-300",
          scrolled
            ? "shadow-xl shadow-black/40 bg-slate-900/80 border-white/15"
            : "shadow-md bg-slate-900/60",
        ].join(" ")}
      >
        <div className="w-full flex items-center justify-between gap-4">
          {/* Brand — Left */}
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-xl"
            aria-label="AFIL PM — Home"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-xs sm:text-sm font-bold text-white group-hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/25">
              AP
            </div>
            <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white">
              AFIL<span className="text-blue-400">PM</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Desktop menu">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={[
                    "flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-slate-400 hover:text-white hover:bg-white/5",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Desktop CTA + Mobile Animated Hamburger Button */}
          <div className="flex items-center gap-2.5">
            {/* Desktop Contact CTA */}
            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <span>Get in touch</span>
            </Link>

            {/* Mobile Hamburger Toggle Button with Smooth Morphing Animation */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              className={[
                "relative lg:hidden w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 select-none",
                mobileOpen
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/40 shadow-lg shadow-blue-500/20"
                  : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10 active:scale-95",
              ].join(" ")}
            >
              <div className="relative w-5 h-4 flex flex-col justify-between items-center pointer-events-none">
                {/* Top line -> Morphs into top-left to bottom-right diagonal of 'X' */}
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="h-0.5 w-5 bg-current rounded-full origin-center block"
                />

                {/* Middle line -> Fades out & slides left */}
                <motion.span
                  animate={
                    mobileOpen
                      ? { opacity: 0, x: -8, scaleX: 0 }
                      : { opacity: 1, x: 0, scaleX: 1 }
                  }
                  transition={{ duration: 0.18, ease: "easeInOut" }}
                  className="h-0.5 w-5 bg-current rounded-full block"
                />

                {/* Bottom line -> Morphs into bottom-left to top-right diagonal of 'X' */}
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="h-0.5 w-5 bg-current rounded-full origin-center block"
                />
              </div>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer & Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop overlay (dismisses menu when tapped outside) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-40 lg:hidden"
              aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -14, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="fixed top-[4.25rem] sm:top-[4.75rem] inset-x-3 sm:inset-x-6 z-50 lg:hidden max-w-lg mx-auto"
            >
              <div className="glass bg-slate-900/95 border border-white/10 rounded-3xl shadow-2xl shadow-blue-950/40 backdrop-blur-2xl overflow-hidden flex flex-col max-h-[calc(100dvh-5.5rem)]">
                {/* Header status bar */}
                <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/5">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>Available for work</span>
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                    Navigation
                  </span>
                </div>

                {/* Staggered Navigation Links List */}
                <div className="overflow-y-auto overscroll-contain scrollbar-hide px-3 py-3 space-y-1">
                  <motion.div
                    variants={menuContainerVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="space-y-1"
                  >
                    {NAV_ITEMS.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.href);
                      return (
                        <motion.div key={item.name} variants={menuItemVariants}>
                          <Link
                            href={item.href}
                            onClick={closeMenu}
                            className={[
                              "flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-sm font-medium transition-all group",
                              active
                                ? "bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm shadow-blue-500/10"
                                : "text-slate-300 hover:text-white hover:bg-white/5 border border-transparent",
                            ].join(" ")}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={[
                                  "w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-active:scale-95",
                                  active
                                    ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/30"
                                    : "bg-white/5 text-slate-400 group-hover:text-blue-400 group-hover:bg-white/10",
                                ].join(" ")}
                              >
                                <Icon className="h-4 w-4" />
                              </div>
                              <span
                                className={
                                  active ? "font-semibold text-white" : "font-medium"
                                }
                              >
                                {item.name}
                              </span>
                            </div>

                            {active ? (
                              <div className="flex items-center gap-1.5">
                                <span className="text-[11px] font-medium text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-md border border-blue-500/20">
                                  Active
                                </span>
                                <ChevronRight className="h-4 w-4 text-blue-400" />
                              </div>
                            ) : (
                              <ChevronRight className="h-4 w-4 text-slate-600 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-all" />
                            )}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Quick actions & Social connect footer */}
                <div className="p-4 pt-3 border-t border-white/5 bg-white/[0.02] space-y-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <Link
                      href="/api/download-resume"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-2.5 text-xs font-medium text-white transition-all active:scale-[0.98] group"
                    >
                      <Download className="h-3.5 w-3.5 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span>Resume</span>
                    </Link>
                    <Link
                      href="/contact"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-3 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98]"
                    >
                      <Play className="h-3.5 w-3.5 fill-white" />
                      <span>Contact Me</span>
                    </Link>
                  </div>

                  {/* Social links row */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between px-1">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                      Connect
                    </span>
                    <div className="flex items-center gap-2">
                      {SOCIAL_LINKS.map((s) => (
                        <a
                          key={s.name}
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                          aria-label={s.name}
                        >
                          <s.icon className="h-3.5 w-3.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
