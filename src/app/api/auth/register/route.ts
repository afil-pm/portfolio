// src/app/api/auth/register/route.ts
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { registerSchema } from "@/lib/validation";
import { validateBody, json, error, rateLimitGuard } from "@/lib/api";
import { rateLimit } from "@/lib/security";

export async function POST(req: NextRequest) {
  // Rate limit registration
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const rl = rateLimit(`register:${ip}`, { max: 3, windowMs: 60 * 60 * 1000 });
  if (!rl.allowed) {
    return error("Too many registration attempts", 429);
  }

  const body = await req.json().catch(() => ({}));
  const parsed = validateBody(registerSchema, body);
  if ("error" in parsed) return parsed.error;

  const { email, username, password } = parsed.data;

  const existing = await db.user.findFirst({
    where: { OR: [{ email }, { username }] },
  });
  if (existing) {
    return error("Email or username already registered", 409);
  }

  const passwordHash = await hashPassword(password);

  const user = await db.user.create({
    data: { email, username, passwordHash },
    select: { id: true, email: true, username: true, role: true },
  });

  return json(
    { message: "Account created successfully", user },
    201
  );
}
