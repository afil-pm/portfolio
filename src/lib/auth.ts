// src/lib/auth.ts
// Authentication utilities: Argon2id password hashing, JWT sessions, cookies
import { verify, hash } from "argon2";
import { sign, verify as jwtVerify, type JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { generateCsrfToken } from "./utils";

const AUTH_SECRET = process.env.AUTH_SECRET;

function getAuthSecret(): string {
  if (!AUTH_SECRET) {
    throw new Error("AUTH_SECRET environment variable is not set");
  }
  return AUTH_SECRET;
}

const SESSION_MAX_AGE = Number(process.env.AUTH_SESSION_MAX_AGE || 604800); // 7 days

export interface SessionUser {
  id: string;
  email: string;
  username: string;
  role: string;
}

export interface TokenPayload extends JwtPayload {
  sub: string;
  email: string;
  username: string;
  role: string;
  type: "session";
  iat?: number;
}

/** Hash a password using Argon2id (recommended by OWASP) */
export async function hashPassword(password: string): Promise<string> {
  return hash(password, {
    type: 2, // argon2id
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  });
}

/** Verify a password against an Argon2id hash */
export async function verifyPassword(plain: string, hashed: string): Promise<boolean> {
  try {
    return await verify(hashed, plain);
  } catch {
    return false;
  }
}

/** Create a signed JWT session token */
export function createSessionToken(user: SessionUser): string {
  const payload: TokenPayload = {
    sub: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
    type: "session",
    iat: Math.floor(Date.now() / 1000),
  };
  return sign(payload, getAuthSecret(), { expiresIn: SESSION_MAX_AGE });
}

/** Verify and decode a JWT session token */
export function verifySessionToken(token: string): TokenPayload | null {
  try {
    const decoded = jwtVerify(token, getAuthSecret()) as unknown as TokenPayload;
    if (decoded.type !== "session") return null;
    return decoded;
  } catch {
    return null;
  }
}

/** Get the current session user from the HttpOnly cookie (Server Components) */
export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  if (!token) return null;
  const decoded = verifySessionToken(token);
  if (!decoded) return null;
  return { id: decoded.sub, email: decoded.email, username: decoded.username, role: decoded.role };
}

/** Set the session cookie (secure, HttpOnly, SameSite) */
export function setSessionCookie(token: string): string {
  const isProd = process.env.NODE_ENV === "production";
  return [
    `session_token=${token};`,
    ` Path=/;`,
    ` HttpOnly;`,
    ` SameSite=Lax;`,
    ` Max-Age=${SESSION_MAX_AGE};`,
    isProd ? ` Secure;` : ``,
  ].filter(Boolean).join(" ");
}

/** Clear the session cookie */
export function clearSessionCookie(): string {
  const isProd = process.env.NODE_ENV === "production";
  return [
    `session_token=;`,
    ` Path=/;`,
    ` HttpOnly;`,
    ` SameSite=Lax;`,
    ` Max-Age=0;`,
    isProd ? ` Secure;` : ``,
  ].filter(Boolean).join(" ");
}

/** Generate a CSRF token value */
export function createCsrfToken(): string {
  return generateCsrfToken();
}
