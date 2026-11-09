// middleware.ts
// Protects /admin/* routes with session cookie. Route groups are stripped from URLs.
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Pass theme preference through header for client-side hydration
  const theme = request.cookies.get("theme")?.value || "dark";
  const response = NextResponse.next();
  response.headers.set("X-Theme", theme);

  // Admin routes require an active session cookie
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const session = request.cookies.get("session_token")?.value;
    if (!session) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Already logged in on login page -> dashboard
  if (pathname === "/admin/login") {
    const session = request.cookies.get("session_token")?.value;
    if (session) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
