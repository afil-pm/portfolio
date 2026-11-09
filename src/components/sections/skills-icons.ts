// src/components/sections/skills-icons.ts
// Maps skill icon names to Lucide icons (safe allow-list, no arbitrary component execution)
import * as Lucide from "lucide-react";

export const lucideIcons: Record<string, React.ComponentType<any>> = {
  Code: Lucide.Code,
  Layout: Lucide.Layout,
  GitBranch: Lucide.GitBranch,
  Github: Lucide.Github,
  Terminal: Lucide.Terminal,
  Monitor: Lucide.Monitor,
  Lock: Lucide.Lock,
  Database: Lucide.Database,
  Server: Lucide.Server,
  Edit: Lucide.Edit,
  Film: Lucide.Film,
  Image: Lucide.Image,
  PlayCircle: Lucide.PlayCircle,
  Palette: Lucide.Palette,
  Layers: Lucide.Layers,
  React: Lucide.FileCode,
  Node: Lucide.GitBranch,
};
