// src/lib/email.ts
// Server-side email sending. Credentials read ONLY from environment variables.
// Never expose SMTP/API keys in frontend code.
import nodemailer from "nodemailer";

interface ContactEmailInput {
  name: string;
  email: string;
  subject: string;
  message: string;
  id: string;
}

const isConfigured =
  !!process.env.SMTP_HOST &&
  !!process.env.SMTP_USER &&
  !!process.env.SMTP_PASS;

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!isConfigured) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

export async function sendContactEmail(input: ContactEmailInput): Promise<void> {
  const transport = getTransporter();
  if (!transport) {
    // Development fallback: log instead of sending (no credentials configured)
    console.log("[dev] Contact submission received:", input);
    return;
  }

  await transport.sendMail({
    from: process.env.SMTP_FROM || `"Portfolio" <noreply@example.com>`,
    to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
    subject: `[Portfolio Contact] ${input.subject}`,
    replyTo: input.email,
    text: `
New contact form submission

Name: ${input.name}
Email: ${input.email}
Subject: ${input.subject}
Submission ID: ${input.id}

Message:
${input.message}
    `,
    html: `
<h2>New contact form submission</h2>
<p><strong>Name:</strong> ${input.name}</p>
<p><strong>Email:</strong> ${input.email}</p>
<p><strong>Subject:</strong> ${input.subject}</p>
<p><strong>Submission ID:</strong> ${input.id}</p>
<hr />
<p>${input.message.replace(/\n/g, "<br>")}</p>
    `,
  });
}
