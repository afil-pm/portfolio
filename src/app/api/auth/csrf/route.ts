// src/app/api/auth/csrf/route.ts
import { NextResponse } from "next/server";
import { createCsrfToken, generateCsrfSecret } from "@/lib/security";

export async function GET() {
  const secret = process.env.CSRF_SECRET || generateCsrfSecret();
  const token = createCsrfToken(secret);
  const response = NextResponse.json({ csrfToken: token });
  response.cookies.set("XSRF-TOKEN", token, {
    httpOnly: false, // readable by JS to send as header
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });
  return response;
}
