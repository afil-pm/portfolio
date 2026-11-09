// src/app/api/auth/me/route.ts
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "@/lib/api";
import { json, error } from "@/lib/api";

export async function GET(req: NextRequest) {
  const auth = await withAuth(req);
  if (auth instanceof NextResponse) return auth;
  return json({ user: auth.user });
}

export async function DELETE(req: NextRequest) {
  const auth = await withAuth(req, ["admin"]);
  if (auth instanceof NextResponse) return auth;
  const response = json({ message: "Signed out" });
  response.headers.set(
    "Set-Cookie",
    "session_token=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0"
  );
  return response;
}
