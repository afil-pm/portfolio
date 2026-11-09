// src/types/index.ts
// Central type definitions for the portfolio application

export type Theme = "light" | "dark";

export type ProjectCategory =
  | "Web Development"
  | "Full-Stack Applications"
  | "UI/UX"
  | "Motion Graphics"
  | "Video Editing";

export type SkillCategory =
  | "Frontend Development"
  | "Backend Development"
  | "Development Tools"
  | "Motion Graphics & Video Editing";

export type ExperienceType =
  | "Freelance"
  | "Development"
  | "Creative"
  | "Certification"
  | "Learning"
  | "Achievement";

export type CreativeWorkType = "video" | "image";

export type ContactStatus = "new" | "read" | "replied" | "archived" | "spam";

export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: ProjectCategory;
  image: string;
  liveUrl?: string | null;
  githubUrl?: string | null;
  technologies: string[];
  featured: boolean;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  icon: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  type: ExperienceType;
  startDate: Date;
  endDate?: Date | null;
  present: boolean;
  description: string;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreativeWork {
  id: string;
  title: string;
  type: CreativeWorkType;
  category: string;
  url: string;
  thumbnail?: string | null;
  duration?: string | null;
  order: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: ContactStatus;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionUser {
  id: string;
  email: string;
  username: string;
  role: string;
}

export interface ApiError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}
