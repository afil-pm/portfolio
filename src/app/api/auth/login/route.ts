// src/app/api/auth/login/route.ts
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
import { validateBody, json, error, rateLimitGuard } from "@/lib/api";
import { rateLimit } from "@/lib/security";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const rl = rateLimit(`login:${ip}`, { max: 5, windowMs: 15 * 60 * 1000 });
  if (!rl.allowed) {
    return error("Too many login attempts", 429);
  }

  const body = await req.json().catch(() => ({}));
  const parsed = validateBody(loginSchema, body);
  if ("error" in parsed) return parsed.error;

  const { email, password } = parsed.data;

  const user = await db.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return error("Invalid email or password", 401);
  }
  if (!user.isActive) {
    return error("Account is deactivated", 403);
  }

  const token = createSessionToken({
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  });

  await db.session.create({
    data: {
      userId: user.id,
      tokenHash: token, // store token hash reference (simplified: store token)
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      ipAddress: ip,
      userAgent: req.headers.get("user-agent") || undefined,
    },
  });

  await db.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });

  const response = json({ message: "Signed in successfully" });
  response.headers.set("Set-Cookie", setSessionCookie(token));
  return response;
}
