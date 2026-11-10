// src/components/sections/slide-cards.tsx
"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Code,
  Play,
  Layers,
  Film,
  Flame,
  ArrowUpRight,
} from "lucide-react";

export interface SlideCardItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: "Full-Stack" | "Web Development" | "Motion Graphics" | "Video Editing" | "UI/UX Design";
  image: string;
  technologies: string[];
  metrics: string;
  projectUrl: string;
  liveUrl?: string;
  featuredBadge: string;
  accentGradient: string;
  glowColor: string;
}

const SLIDE_CARDS: SlideCardItem[] = [
  {
    id: "apex-ecommerce",
    title: "Apex E-Commerce Platform",
    subtitle: "High-Performance Full-Stack Storefront",
    description:
      "Modern full-stack e-commerce solution featuring Stripe payments, real-time inventory synchronization, sub-100ms API endpoints, and comprehensive admin analytics.",
    category: "Full-Stack",
    image: "https://afilpm.vercel.app/images/Apex-E-Commerce-Platform.png",
    technologies: ["Next.js 14", "TypeScript", "Prisma", "Stripe", "Tailwind CSS"],
    metrics: "Sub-100ms API • 99.9% Uptime",
    projectUrl: "/projects",
    liveUrl: "https://example.com",
    featuredBadge: "Full-Stack App",
    accentGradient: "from-blue-500 via-indigo-500 to-cyan-400",
    glowColor: "rgba(59, 130, 246, 0.45)",
  },
  {
    id: "saas-analytics",
    title: "Cloud SaaS Analytics Engine",
    subtitle: "Real-Time Telemetry & Insights",
    description:
      "Interactive data visualization platform with live WebSocket feeds, dynamic chart controls, role-based access, and automated performance reporting.",
    category: "Web Development",
    image: "https://afilpm.vercel.app/images/Analytics-dashboard.png",
    technologies: ["React", "TypeScript", "Chart.js", "Firebase", "WebSockets"],
    metrics: "50k+ Events/sec • Live Sync",
    projectUrl: "/projects",
    liveUrl: "https://example.com",
    featuredBadge: "Real-Time SaaS",
    accentGradient: "from-cyan-400 via-blue-500 to-indigo-600",
    glowColor: "rgba(6, 182, 212, 0.45)",
  },
  {
    id: "cyberpunk-motion",
    title: "Cyberpunk 3D Brand Motion",
    subtitle: "Volumetric Visual Identity Reveal",
    description:
      "Dynamic 3D title animation and cinematic brand teaser with custom sound design, volumetric lighting, fluid simulations, and kinetic typography.",
    category: "Motion Graphics",
    image: "https://afilpm.vercel.app/images/Cyberpunk3DBrandMotion.png",
    technologies: ["After Effects", "Cinema 4D", "Premiere Pro", "Octane Render"],
    metrics: "4K 60FPS • Dynamic 3D VFX",
    projectUrl: "/projects",
    featuredBadge: "Motion Graphics",
    accentGradient: "from-purple-500 via-fuchsia-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.45)",
  },
  {
    id: "cinematic-reel",
    title: "Cinematic Product Promo Reel",
    subtitle: "Commercial Color Grade & VFX",
    description:
      "High-end commercial promo post-production featuring precision color grading in DaVinci Resolve, seamless motion tracking, and kinetic typography overlays.",
    category: "Video Editing",
    image: "https://afilpm.vercel.app/images/CinematicProductPromoReel.png",
    technologies: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Color Grading"],
    metrics: "Dolby Atmos • Rec.709 Master",
    projectUrl: "/projects",
    featuredBadge: "Video Editing",
    accentGradient: "from-amber-400 via-orange-500 to-rose-500",
    glowColor: "rgba(245, 158, 11, 0.45)",
  },
  {
    id: "aura-design-system",
    title: "Aura UI Design System",
    subtitle: "Component Architecture & Tokens",
    description:
      "Dark-mode first design system with tokenized color palettes, fluid micro-interactions, responsive grid system, and 40+ accessible UI components.",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
    technologies: ["Figma", "Tailwind CSS", "Framer Motion", "Accessibility"],
    metrics: "WCAG AAA • 100% Fluid",
    projectUrl: "/projects",
    featuredBadge: "UI/UX System",
    accentGradient: "from-emerald-400 via-teal-500 to-blue-500",
    glowColor: "rgba(16, 185, 129, 0.45)",
  },
  {
    id: "enterprise-auth",
    title: "Zero-Trust Security Gateway",
    subtitle: "Hardened Authentication Architecture",
    description:
      "Enterprise security implementation with Argon2id password hashing, rotating JWT session management, OWASP-compliant CSRF defenses, and IP rate limiting.",
    category: "Full-Stack",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
    technologies: ["Next.js", "Argon2", "PostgreSQL", "OWASP Security", "JWT"],
    metrics: "A+ SSL Rating • Zero-Trust",
    projectUrl: "/projects",
    featuredBadge: "Cybersecurity",
    accentGradient: "from-indigo-500 via-blue-600 to-purple-600",
    glowColor: "rgba(99, 102, 241, 0.45)",
  },
];

const CATEGORIES = ["All", "Full-Stack", "Web Development", "Motion Graphics", "Video Editing", "UI/UX Design"] as const;

export function SlideCards() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [cardStep, setCardStep] = useState(552); // Safe non-zero default (520px card + 32px gap)

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Filtered cards based on active category
  const filteredCards =
    activeCategory === "All"
      ? SLIDE_CARDS
      : SLIDE_CARDS.filter((card) => card.category === activeCategory);

  // Responsive card step calculation
  const updateCardStep = useCallback(() => {
    if (typeof window !== "undefined") {
      const isLg = window.innerWidth >= 1024;
      const isSm = window.innerWidth >= 640;
      if (isLg) {
        setCardStep(520 + 32); // lg:w-[520px] + gap-8 (32px)
      } else if (isSm) {
        setCardStep(460 + 32); // sm:w-[460px] + gap-8 (32px)
      } else {
        setCardStep(window.innerWidth * 0.86 + 24); // 86vw + gap-6 (24px)
      }
    }
  }, []);

  // Update measurements on mount and resize
  useEffect(() => {
    updateCardStep();
    window.addEventListener("resize", updateCardStep);
    return () => window.removeEventListener("resize", updateCardStep);
  }, [updateCardStep]);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  // Navigate to next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1 >= filteredCards.length ? 0 : prev + 1));
  }, [filteredCards.length]);

  // Navigate to previous slide
  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? filteredCards.length - 1 : prev - 1));
  }, [filteredCards.length]);

  // Auto-play interval when not hovered
  useEffect(() => {
    if (isHovered || filteredCards.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide, filteredCards.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const xOffset = -(currentIndex * cardStep);
  const maxDragLimit = Math.max(0, (filteredCards.length - 1) * cardStep);

  return (
    <section
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Featured Works Carousel"
    >
      {/* Background Ambient Lighting Glows - smaller on mobile */}
      <div className="absolute top-1/4 left-[-10%] w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-blue-600/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-[-10%] w-[400px] sm:w-[550px] h-[400px] sm:h-[550px] bg-indigo-600/10 blur-[100px] sm:blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Stacked on mobile */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10 sm:mb-16">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-400 tracking-wider uppercase mb-3 sm:mb-4 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <Sparkles className="h-3 w-3 text-blue-400 animate-spin" style={{ animationDuration: "8s" }} />
              <span>Featured Works</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3 sm:mb-4">
              Featured Works & Slide Showcase
            </h2>

            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
              Swipe through flagship web apps, motion graphics, and cinematic productions built with high performance.
            </p>
          </div>

          {/* Navigation Controls: Slide Indicators + Prev/Next Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            {/* Slide Index Counter */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
              <span className="text-blue-400 font-bold">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span>/</span>
              <span>{String(filteredCards.length).padStart(2, "0")}</span>
            </div>

            {/* Prev / Next Circular Buttons */}
            <div className="flex items-center gap-2.5">
              <motion.button
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border border-white/10 bg-slate-900/80 hover:bg-slate-800 hover:border-blue-500/50 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 group-hover:scale-110 transition-transform duration-300" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border border-white/10 bg-slate-900/80 hover:bg-slate-800 hover:border-blue-500/50 text-slate-300 hover:text-white flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                aria-label="Next slide"
              >
                <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:scale-110 transition-transform duration-300" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Category Filter Pills Bar */}
        <div className="flex gap-2 overflow-x-auto pb-6 mb-10 sm:mb-14 scrollbar-hide">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={[
                  "px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap select-none",
                  active
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 border border-blue-400/40"
                    : "border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20",
                ].join(" ")}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Slide Cards Carousel Deck with Smooth Draggable & Animatable Track */}
        <div ref={containerRef} className="relative overflow-hidden py-4 -my-4">
          <motion.div
            ref={trackRef}
            style={{ touchAction: "pan-y" }}
            animate={{ x: xOffset }}
            transition={{ type: "spring", stiffness: 220, damping: 28, mass: 0.8 }}
            drag="x"
            dragConstraints={{
              left: -maxDragLimit,
              right: 0,
            }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              const dragDistance = info.offset.x;
              const velocity = info.velocity.x;

              // Swiped Left -> Advance to next
              if (dragDistance < -40 || velocity < -280) {
                if (currentIndex < filteredCards.length - 1) {
                  setCurrentIndex((prev) => prev + 1);
                } else {
                  setCurrentIndex(0); // Wrap around smoothly
                }
              }
              // Swiped Right -> Go to previous
              else if (dragDistance > 40 || velocity > 280) {
                if (currentIndex > 0) {
                  setCurrentIndex((prev) => prev - 1);
                } else {
                  setCurrentIndex(filteredCards.length - 1); // Wrap around smoothly
                }
              }
            }}
            className="flex gap-4 sm:gap-6 cursor-grab active:cursor-grabbing select-none"
          >
            {filteredCards.map((card, index) => (
              <InteractiveSlideCard
                key={card.id}
                card={card}
                index={index}
              />
            ))}
          </motion.div>
        </div>

        {/* Carousel Bottom Indicators & Full Portfolio Link */}
        <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
          {/* Interactive Dot Bar Indicators */}
          <div className="flex items-center gap-2">
            {filteredCards.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setCurrentIndex(dotIndex)}
                className={[
                  "h-2 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                  dotIndex === currentIndex
                    ? "w-8 bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md shadow-blue-500/40"
                    : "w-2 bg-white/20 hover:bg-white/40",
                ].join(" ")}
                aria-label={`Jump to slide ${dotIndex + 1}`}
              />
            ))}
          </div>

          {/* Quick CTA to Full Works with Animated Link Icon */}
          <div className="flex items-center gap-4">
            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
              Swipe or drag to browse &bull; Autoplays on idle
            </span>

            <Link
              href="/projects"
              className="group/btn inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/5 hover:bg-blue-600/10 border border-white/10 hover:border-blue-400/40 text-xs sm:text-sm font-semibold text-white hover:text-blue-300 transition-all shadow-md"
            >
              <span>View All Projects</span>
              <span className="w-6 h-6 rounded-xl bg-white/5 group-hover/btn:bg-blue-500 group-hover/btn:text-white group-hover/btn:shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center transition-all duration-300">
                <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-0.5 group-hover/btn:scale-110 transition-transform duration-300" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Interactive Slide Card with Cursor Pointer Following Blur Animation
 * Strictly Contained INSIDE the Card Boundaries (No Outward Glow, No Sliding Sheen)
 */
function InteractiveSlideCard({ card, index }: { card: SlideCardItem; index: number }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        y: isHovered ? -8 : 0,
        scale: isHovered ? 1.015 : 1,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="relative w-[88vw] sm:w-[470px] lg:w-[520px] shrink-0 select-none group"
    >
      {/* Card Outer Shell with Glassmorphism */}
      <div className="relative rounded-[1.75rem] border border-white/10 bg-slate-900/90 backdrop-blur-2xl overflow-hidden shadow-2xl shadow-black/60 transition-all duration-300 group-hover:border-blue-500/40 flex flex-col h-full">
        {/* Cursor Pointer Following Blur Animation INSIDE Card Container */}
        <div
          className="absolute inset-0 rounded-[1.75rem] pointer-events-none transition-opacity duration-200 z-10 overflow-hidden"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, ${card.glowColor}, transparent 75%)`,
          }}
        />

        {/* Top Preview Image Container - Better proportions for mobile */}
        <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-950 pointer-events-none">
          <img
            src={card.image}
            alt={card.title}
            draggable={false}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/25 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
            {/* Category Pill with Icon */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/15 text-white text-xs font-semibold shadow-lg group-hover:scale-105 transition-transform duration-300">
              {card.category === "Full-Stack" && <Code className="h-3 w-3.5 text-blue-400" />}
              {card.category === "Web Development" && <Layers className="h-3 w-3.5 text-cyan-400" />}
              {card.category === "Motion Graphics" && <Play className="h-3 w-3.5 text-purple-400" />}
              {card.category === "Video Editing" && <Film className="h-3 w-3.5 text-amber-400" />}
              {card.category === "UI/UX Design" && <Flame className="h-3 w-3.5 text-emerald-400" />}
              <span>{card.category}</span>
            </div>

            {/* Featured Status Indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-blue-600/30 border border-blue-400/30 group-hover:scale-105 transition-transform duration-300">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span>{card.featuredBadge}</span>
            </div>
          </div>

          {/* Metrics Badge at Bottom-Left of Image */}
          <div className="absolute bottom-3 left-3 pointer-events-none z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-slate-200 text-[10px] font-mono shadow-md group-hover:border-emerald-500/40 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{card.metrics}</span>
            </div>
          </div>
        </div>

        {/* Card Body - Compact on mobile */}
        <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow space-y-4">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-wider text-blue-400 mb-1 font-medium">
              {card.subtitle}
            </p>

            <h3 className="text-sm sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors tracking-tight">
              {card.title}
            </h3>

            <p className="mt-2 text-slate-300 text-sm leading-relaxed line-clamp-3">
              {card.description}
            </p>
          </div>

          {/* Tech Stack Pills with Interactive Hover Scale */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {card.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-[10px] font-medium hover:bg-blue-500/20 hover:text-blue-200 hover:border-blue-400/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Card Action Footer with High-Impact Animated Link Icons */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
            {/* Explore Details Link with Pill Arrow Animation */}
            <Link
              href={card.projectUrl}
              className="group/link inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-blue-300 transition-colors"
            >
              <span>Explore Details</span>
              <span className="w-7 h-7 rounded-xl bg-white/5 border border-white/10 group-hover/link:bg-gradient-to-r group-hover/link:from-blue-600 group-hover/link:to-indigo-600 group-hover/link:border-blue-400 group-hover/link:text-white group-hover/link:shadow-[0_0_15px_rgba(59,130,246,0.5)] flex items-center justify-center transition-all duration-300">
                <ArrowRight className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 group-hover/link:scale-110 transition-transform duration-300" />
              </span>
            </Link>

            {/* Demo or Commission Action Button with Icon Animations */}
            {card.liveUrl ? (
              <a
                href={card.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/demo inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-400/50 text-xs font-medium text-slate-300 hover:text-cyan-300 transition-all shadow-sm"
              >
                <span>Live Demo</span>
                <span className="w-4 h-4 rounded-lg bg-white/5 group-hover/demo:bg-cyan-500/20 group-hover/demo:text-cyan-300 flex items-center justify-center transition-all duration-300 group-hover/demo:rotate-12 group-hover/demo:scale-110">
                  <ArrowUpRight className="h-2.5 w-2.5 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5 transition-transform duration-300" />
                </span>
              </a>
            ) : (
              <Link
                href="/contact"
                className="group/comm inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-purple-500/10 hover:border-purple-400/50 text-xs font-medium text-slate-300 hover:text-purple-300 transition-all shadow-sm"
              >
                <span>Commission</span>
                <span className="w-4 h-4 rounded-lg bg-white/5 group-hover/comm:bg-purple-500/20 group-hover/comm:text-purple-300 flex items-center justify-center transition-all duration-300 group-hover/comm:scale-110">
                  <Sparkles className="h-2.5 w-2.5 group-hover/comm:rotate-45 group-hover/comm:scale-125 transition-transform duration-300" />
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
