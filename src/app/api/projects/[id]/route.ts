// src/app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withAuth, validateBody, json, error, rateLimitGuard, csrfGuard } from "@/lib/api";
import { projectSchema } from "@/lib/validation";
import { z } from "zod";

const idSchema = z.object({ id: z.string().uuid() });

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const validation = idSchema.safeParse({ id });
  if (!validation.success) return error("Invalid project ID", 400);

  const project = await db.project.findUnique({ where: { id } });
  if (!project) return error("Project not found", 404);
  return json(project);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const csrf = csrfGuard(req);
  if (csrf) return csrf;
  const auth = await withAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const validation = idSchema.safeParse({ id });
  if (!validation.success) return error("Invalid project ID", 400);

  const body = await req.json().catch(() => ({}));
  const parsed = validateBody(projectSchema.partial(), body);
  if ("error" in parsed) return parsed.error;

  const project = await db.project.update({
    where: { id },
    data: {
      ...parsed.data,
      liveUrl: parsed.data.liveUrl ?? undefined,
      githubUrl: parsed.data.githubUrl ?? undefined,
    },
  });
  return json(project);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const csrf = csrfGuard(req);
  if (csrf) return csrf;
  const auth = await withAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const validation = idSchema.safeParse({ id });
  if (!validation.success) return error("Invalid project ID", 400);

  await db.project.delete({ where: { id } });
  return json({ message: "Project deleted" });
}
