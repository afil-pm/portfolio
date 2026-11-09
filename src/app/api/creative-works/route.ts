// src/app/api/creative-works/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withAuth, validateBody, json, error, rateLimitGuard, csrfGuard } from "@/lib/api";
import { creativeWorkSchema } from "@/lib/validation";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const type = searchParams.get("type");

  const works = await db.creativeWork.findMany({
    where: {
      isPublished: true,
      ...(category ? { category } : {}),
      ...(type ? { type } : {}),
    },
    orderBy: { order: "asc" },
  });
  return json(works);
}

export async function POST(req: NextRequest) {
  const csrf = csrfGuard(req);
  if (csrf) return csrf;
  const rl = rateLimitGuard(req, "creative:create", 10, 60 * 1000);
  if (rl) return rl;
  const auth = await withAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json().catch(() => ({}));
  const parsed = validateBody(creativeWorkSchema, body);
  if ("error" in parsed) return parsed.error;

  const work = await db.creativeWork.create({
    data: {
      ...parsed.data,
      thumbnail: parsed.data.thumbnail || null,
      duration: parsed.data.duration || null,
      order: parsed.data.order ?? 0,
      isPublished: parsed.data.isPublished ?? true,
    },
  });
  return json(work, 201);
}
