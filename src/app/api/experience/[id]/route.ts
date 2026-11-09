// src/app/api/experience/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withAuth, validateBody, json, error, rateLimitGuard, csrfGuard } from "@/lib/api";
import { experienceSchema } from "@/lib/validation";
import { z } from "zod";

const idSchema = z.object({ id: z.string().uuid() });

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const csrf = csrfGuard(req);
  if (csrf) return csrf;
  const auth = await withAuth(req);
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  if (!idSchema.safeParse({ id }).success) return error("Invalid ID", 400);

  const body = await req.json().catch(() => ({}));
  const parsed = validateBody(experienceSchema.partial(), body);
  if ("error" in parsed) return parsed.error;

  const exp = await db.experience.update({ where: { id }, data: parsed.data });
  return json(exp);
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
  if (!idSchema.safeParse({ id }).success) return error("Invalid ID", 400);

  await db.experience.delete({ where: { id } });
  return json({ message: "Deleted" });
}
