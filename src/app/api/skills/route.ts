// src/app/api/skills/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withAuth, validateBody, json, error, rateLimitGuard, csrfGuard } from "@/lib/api";
import { skillSchema } from "@/lib/validation";

export async function GET() {
  const skills = await db.skill.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });
  return json(skills);
}

export async function POST(req: NextRequest) {
  const csrf = csrfGuard(req);
  if (csrf) return csrf;
  const rl = rateLimitGuard(req, "skills:create", 10, 60 * 1000);
  if (rl) return rl;
  const auth = await withAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json().catch(() => ({}));
  const parsed = validateBody(skillSchema, body);
  if ("error" in parsed) return parsed.error;

  const skill = await db.skill.create({ data: parsed.data });
  return json(skill, 201);
}
