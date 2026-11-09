// src/app/api/services/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withAuth, validateBody, json, error, rateLimitGuard, csrfGuard } from "@/lib/api";
import { serviceSchema } from "@/lib/validation";

export async function GET() {
  const services = await db.service.findMany({
    where: { isPublished: true },
    orderBy: { order: "asc" },
  });
  return json(services);
}

export async function POST(req: NextRequest) {
  const csrf = csrfGuard(req);
  if (csrf) return csrf;
  const auth = await withAuth(req);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json().catch(() => ({}));
  const parsed = validateBody(serviceSchema, body);
  if ("error" in parsed) return parsed.error;

  const service = await db.service.create({ data: parsed.data });
  return json(service, 201);
}
