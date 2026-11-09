// src/app/api/social-links/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withAuth, validateBody, json, error, rateLimitGuard, csrfGuard } from "@/lib/api";
import { socialLinkSchema } from "@/lib/validation";

export async function GET() {
  const links = await db.socialLink.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" },
  });
  return json(links);
}

export async function POST(req: NextRequest) {
  const csrf = csrfGuard(req);
  if (csrf) return csrf;
  const auth = await withAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json().catch(() => ({}));
  const parsed = validateBody(socialLinkSchema, body);
  if ("error" in parsed) return parsed.error;

  const link = await db.socialLink.create({ data: parsed.data });
  return json(link, 201);
}
