// src/components/ui/theme-toggle.tsx
"use client";

import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");

  React.useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = stored ?? (systemDark ? "dark" : "light");
    setTheme(next);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface text-text transition-colors hover:bg-brand hover:text-white focus:outline-none focus:ring-2 focus:ring-brand/50",
        className
      )}
    >
      <Sun
        className={cn("h-4 w-4 transition-opacity duration-200", theme === "dark" ? "opacity-0" : "opacity-100")}
      />
      <Moon
        className={cn("h-4 w-4 transition-opacity duration-200", theme === "dark" ? "opacity-100" : "opacity-0")}
      />
    </button>
  );
}
