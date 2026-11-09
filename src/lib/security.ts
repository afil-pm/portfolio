// src/lib/security.ts
// Security utilities: rate limiting, CSRF, secure headers, input validation helpers
import crypto from "crypto";

// ---------------------------------------------------------------------------
// In-memory rate limiter (single-server). For multi-instance/serverless
// production (e.g. Vercel), replace with Redis/Upstash rate limiting.
// ---------------------------------------------------------------------------
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStores = new Map<string, RateLimitEntry>();

export function rateLimit(
  key: string,
  options: { max: number; windowMs: number }
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitStores.get(key);

  if (!entry || now > entry.resetTime) {
    rateLimitStores.set(key, { count: 1, resetTime: now + options.windowMs });
    return { allowed: true, remaining: options.max - 1, resetTime: now + options.windowMs };
  }

  entry.count += 1;
  return {
    allowed: entry.count <= options.max,
    remaining: Math.max(0, options.max - entry.count),
    resetTime: entry.resetTime,
  };
}

export function clearRateLimit(key: string) {
  rateLimitStores.delete(key);
}

// ---------------------------------------------------------------------------
// CSRF double-submit cookie helpers
// ---------------------------------------------------------------------------
export const CSRF_SECRET = process.env.CSRF_SECRET || "";

export function generateCsrfSecret(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function createCsrfToken(secret: string): string {
  return crypto.createHmac("sha256", secret).update(crypto.randomUUID()).digest("hex");
}

export function verifyCsrfToken(token: string, secret: string): boolean {
  if (!token || !secret) return false;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(token)
    .digest("hex");
  // constant-time comparison
  const a = Buffer.from(token, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}

// ---------------------------------------------------------------------------
// Secure response headers
// ---------------------------------------------------------------------------
export const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "X-DNS-Prefetch-Control": "on",
};

// Content Security Policy (nonce-based where needed)
export function cspHeader(nonce?: string): string {
  const scriptSrc = nonce ? `'nonce-${nonce}'` : "'self'";
  return [
    `default-src 'self'`,
    `script-src 'self' ${scriptSrc}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: blob: https:`,
    `font-src 'self'`,
    `connect-src 'self'`,
    `media-src 'self' blob:`,
    `object-src 'none'`,
    `base-uri 'self'`,
    `form-action 'self'`,
  ].join("; ");
}
