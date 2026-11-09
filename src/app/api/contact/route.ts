// src/app/api/contact/route.ts
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validation";
import { validateBody, json, error, rateLimitGuard } from "@/lib/api";
import { sanitizeHtml } from "@/lib/api";
import { sendContactEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  // Strict rate limiting for contact form
  const rl = rateLimitGuard(req, "contact", 5, 60 * 60 * 1000);
  if (rl) return rl;

  const body = await req.json().catch(() => ({}));
  const parsed = validateBody(contactSchema, body);
  if ("error" in parsed) return parsed.error;

  const { name, email, subject, message } = parsed.data;

  // Honeypot-style spam check: reject messages containing excessive links or spammy keywords
  const spamScore =
    (message.match(/https?:\/\//g) || []).length +
    (message.match(/(buy now|cheap|viagra|crypto|loan|click here)/gi) || []).length;
  if (spamScore > 3) {
    return error("Message looks like spam", 400);
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  const userAgent = req.headers.get("user-agent") || undefined;

  const submission = await db.contactSubmission.create({
    data: {
      name: sanitizeHtml(name),
      email,
      subject: sanitizeHtml(subject),
      message: sanitizeHtml(message),
      status: "new",
      ipAddress: ip,
      userAgent,
    },
  });

  // Send notification email (errors here should not fail the submission)
  try {
    await sendContactEmail({ name, email, subject, message, id: submission.id });
  } catch {
    // email delivery failure is non-fatal
  }

  return json(
    { message: "Thank you! Your message has been sent successfully." },
    201
  );
}
