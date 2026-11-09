// src/app/api/experience/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withAuth, validateBody, json, error, rateLimitGuard, csrfGuard } from "@/lib/api";
import { experienceSchema } from "@/lib/validation";

export async function GET() {
  const experience = await db.experience.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc", startDate: "desc" },
  });
  return json(experience);
}

export async function POST(req: NextRequest) {
  const csrf = csrfGuard(req);
  if (csrf) return csrf;
  const auth = await withAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json().catch(() => ({}));
  const parsed = validateBody(experienceSchema, body);
  if ("error" in parsed) return parsed.error;

  const exp = await db.experience.create({
    data: {
      ...parsed.data,
      endDate: parsed.data.endDate || null,
      present: parsed.data.present ?? false,
      order: parsed.data.order ?? 0,
      isPublished: parsed.data.isPublished ?? true,
    },
  });
  return json(exp, 201);
}
