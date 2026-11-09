// src/lib/validation.ts
// Zod schemas for API input validation
import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be lowercase alphanumeric with hyphens",
  }),
  shortDescription: z.string().min(1).max(500),
  description: z.string().min(1).max(10000),
  category: z.string().min(1).max(50),
  image: z.string().url().or(z.string().min(1)),
  liveUrl: z.string().url().optional().or(z.literal("")),
  githubUrl: z.string().url().optional().or(z.literal("")),
  technologies: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
  isPublished: z.boolean().optional(),
});

export const skillSchema = z.object({
  name: z.string().min(1).max(100),
  category: z.string().min(1).max(50),
  icon: z.string().min(1).max(100),
  order: z.number().int().min(0).optional(),
  isPublished: z.boolean().optional(),
});

export const serviceSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1000),
  icon: z.string().min(1).max(100),
  order: z.number().int().min(0).optional(),
  isPublished: z.boolean().optional(),
});

export const experienceSchema = z.object({
  title: z.string().min(1).max(200),
  company: z.string().min(1).max(200),
  type: z.string().min(1).max(50),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional().nullable(),
  present: z.boolean().optional(),
  description: z.string().min(1).max(5000),
  order: z.number().int().min(0).optional(),
  isPublished: z.boolean().optional(),
});

export const creativeWorkSchema = z.object({
  title: z.string().min(1).max(200),
  type: z.enum(["video", "image"]),
  category: z.string().min(1).max(50),
  url: z.string().url(),
  thumbnail: z.string().url().optional().or(z.literal("")),
  duration: z.string().max(20).optional().nullable(),
  order: z.number().int().min(0).optional(),
  isPublished: z.boolean().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1).max(200).trim(),
  email: z.string().email().max(200),
  subject: z.string().min(1).max(300).trim(),
  message: z.string().min(1).max(5000).trim(),
});

export const registerSchema = z.object({
  email: z.string().email().max(200),
  username: z.string().min(3).max(50).regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username must be alphanumeric with underscores",
  }),
  password: z.string().min(8).max(128),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const socialLinkSchema = z.object({
  platform: z.string().min(1).max(100),
  url: z.string().url(),
  icon: z.string().min(1).max(100),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});
