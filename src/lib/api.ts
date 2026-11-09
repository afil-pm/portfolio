// src/lib/api.ts
// Shared helpers for secure API routes: auth guard, CSRF, rate limiting, validation, JSON responses
import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "./auth";
import { rateLimit, verifyCsrfToken, CSRF_SECRET } from "./security";
import { getClientIp } from "./utils";
import { ZodSchema, ZodError } from "zod";

export interface ApiContext {
  user: { id: string; email: string; role: string };
  ip: string;
}

// ---------------------------------------------------------------------------
// Auth guard: returns NextResponse 401 if no valid session, else context
// ---------------------------------------------------------------------------
export async function withAuth(
  req: NextRequest,
  roles: string[] = ["admin"]
): Promise<NextResponse | ApiContext> {
  const token = req.cookies.get("session_token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }
  const payload = verifySessionToken(token);
  if (!payload || !roles.includes(payload.role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return {
    user: { id: payload.sub, email: payload.email, role: payload.role },
    ip: getClientIp(req.headers),
  };
}

// ---------------------------------------------------------------------------
// CSRF guard for state-changing methods
// ---------------------------------------------------------------------------
export function csrfGuard(req: NextRequest): NextResponse | null {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return null;
  const token = req.headers.get("x-csrf-token");
  if (!verifyCsrfToken(token || "", CSRF_SECRET || "")) {
    return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
  }
  return null;
}

// ---------------------------------------------------------------------------
// Rate limit guard
// ---------------------------------------------------------------------------
export function rateLimitGuard(
  req: NextRequest,
  key: string,
  max: number,
  windowMs: number
): NextResponse | null {
  const result = rateLimit(`${key}:${getClientIp(req.headers)}`, { max, windowMs });
  if (!result.allowed) {
    return NextResponse.json(
      { error: "Too many requests, please try again later" },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(windowMs / 1000)) },
      }
    );
  }
  return null;
}

// ---------------------------------------------------------------------------
// Validate request body with Zod
// ---------------------------------------------------------------------------
export function validateBody<T>(
  schema: ZodSchema<T>,
  body: unknown
): { data: T } | { error: NextResponse } {
  try {
    const data = schema.parse(body);
    return { data };
  } catch (err) {
    if (err instanceof ZodError) {
      const errors: Record<string, string[]> = {};
      for (const issue of err.issues) {
        const path = issue.path.join(".");
        errors[path] = [...(errors[path] || []), issue.message];
      }
      return {
        error: NextResponse.json(
          { error: "Validation failed", errors },
          { status: 400 }
        ),
      };
    }
    return { error: NextResponse.json({ error: "Invalid request" }, { status: 400 }) };
  }
}

// ---------------------------------------------------------------------------
// JSON helpers
// ---------------------------------------------------------------------------
export function json(data: unknown, status = 200, headers?: Record<string, string>) {
  return NextResponse.json(data, { status, headers });
}

export function error(message: string, status = 500, errors?: Record<string, string[]>) {
  return NextResponse.json({ error: message, ...(errors ? { errors } : {}) }, { status });
}

// ---------------------------------------------------------------------------
// Sanitize a string for safe HTML/attribute context (basic XSS mitigation)
// ---------------------------------------------------------------------------
export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
