// src/app/api/contact-submissions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { withAuth, json, error } from "@/lib/api";
import { z } from "zod";

const querySchema = z.object({
  status: z.enum(["new", "read", "replied", "archived", "spam"]).optional(),
});

export async function GET(req: NextRequest) {
  const auth = await withAuth(req, ["admin"]);
  if (auth instanceof NextResponse) return auth;

  const { searchParams } = new URL(req.url);
  const parsed = querySchema.safeParse({ status: searchParams.get("status") });
  if (!parsed.success) return error("Invalid filter", 400);

  const submissions = await db.contactSubmission.findMany({
    where: { ...(parsed.data.status ? { status: parsed.data.status } : {}) },
    orderBy: { createdAt: "desc" },
  });
  return json(submissions);
}

export async function PATCH(req: NextRequest) {
  const auth = await withAuth(req, ["admin"]);
  if (auth instanceof NextResponse) return auth;

  const body = await req.json().catch(() => ({}));
  const { id, status } = body;
  if (!id || !status) return error("Missing id or status", 400);

  await db.contactSubmission.update({
    where: { id },
    data: { status },
  });
  return json({ message: "Updated" });
}
