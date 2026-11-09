// src/app/api/projects/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withAuth, validateBody, json, error, rateLimitGuard, csrfGuard } from "@/lib/api";
import { projectSchema } from "@/lib/validation";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const featured = searchParams.get("featured");
  const published = searchParams.get("published") !== "false";

  const projects = await db.project.findMany({
    where: {
      isPublished: published,
      ...(category ? { category } : {}),
      ...(featured === "true" ? { featured: true } : {}),
    },
    orderBy: { order: "asc", createdAt: "desc" },
  });
  return json(projects);
}

export async function POST(req: NextRequest) {
  const csrf = csrfGuard(req);
  if (csrf) return csrf;
  const rl = rateLimitGuard(req, "projects:create", 10, 60 * 1000);
  if (rl) return rl;

  const auth = await withAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json().catch(() => ({}));
  const parsed = validateBody(projectSchema, body);
  if ("error" in parsed) return parsed.error;

  const project = await db.project.create({
    data: {
      ...parsed.data,
      liveUrl: parsed.data.liveUrl || null,
      githubUrl: parsed.data.githubUrl || null,
      technologies: parsed.data.technologies || [],
      featured: parsed.data.featured ?? false,
      order: parsed.data.order ?? 0,
      isPublished: parsed.data.isPublished ?? true,
    },
  });
  return json(project, 201);
}
