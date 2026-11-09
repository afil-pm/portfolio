// src/components/sections/contact-form.tsx
"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Mail, Smartphone, Link as LinkIcon, Github } from "lucide-react";

const SOCIALS = [
  { label: "Email", href: "mailto:hello@example.com", icon: Mail },
  { label: "WhatsApp", href: "https://wa.me/1234567890", icon: Smartphone },
  { label: "Portfolio", href: "/", icon: LinkIcon },
  { label: "GitHub", href: "https://github.com", icon: Github },
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrors({});
    setMessage("");

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    let csrfToken: string | null = null;
    try {
      const res = await fetch("/api/auth/csrf", { credentials: "same-origin" });
      const data = await res.json();
      csrfToken = data.csrfToken || null;
    } catch {
      setStatus("error");
      setMessage("Unable to initialize request.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(csrfToken ? { "X-CSRF-TOKEN": csrfToken } : {}),
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        if (data.errors) setErrors(data.errors);
        setMessage(data.error || "Submission failed.");
        return;
      }

      setStatus("success");
      (e.currentTarget as HTMLFormElement).reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
      <div className="lg:grid lg:cols-12 gap-16">
        <div className="lg:col-span-5">
          <div className="text-center lg:text-left mb-12">
            <h2 className="h-section text-3xl md:text-4xl font-bold text-text mb-4">Get In Touch</h2>
            <p className="text-muted text-lg">
              Have a project in mind? I'd love to hear about it. Whether you need a
              web application, motion graphics, or video editing — let's collaborate.
            </p>
          </div>

          <div className="space-y-8">
            {SOCIALS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card flex items-center gap-4 p-4 hover:border-brand/40 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <span className="font-semibold text-text block">{item.label}</span>
                  <span className="text-xs text-muted">{item.href}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7">
          <motion.form
            onSubmit={handleSubmit}
            className="glass-card space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Full Name" id="name" type="text" error={errors.name} required />
              <Field label="Email Address" id="email" type="email" error={errors.email} required />
            </div>
            <Field label="Subject" id="subject" type="text" error={errors.subject} required />
            <Field
              label="Message"
              id="message"
              as="textarea"
              rows={5}
              error={errors.message}
              required
              placeholder="Tell me about your project..."
            />

            {status === "error" && (
              <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-sm text-red-400">
                {message || "Something went wrong. Please try again."}
              </div>
            )}
            {status === "success" && (
              <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-sm text-emerald-400">
                Thank you! Your message has been sent successfully. I'll get back to you soon.
              </div>
            )}

            <Button type="submit" variant="brand" size="lg" disabled={status === "submitting"} className="w-full">
              {status === "submitting" ? "Sending..." : "Send Message"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  type = "text",
  error,
  required,
  as,
  rows,
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  error?: string[];
  required?: boolean;
  as?: "textarea";
  rows?: number;
  placeholder?: string;
}) {
  const Comp = as === "textarea" ? Textarea : Input;
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}{required && <span className="text-red-500 ml-1">*</span>}</Label>
      <Comp
        id={id}
        name={id}
        type={type}
        rows={rows}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error?.length}
        className={error?.length ? "border-red-500/50 focus:ring-red-500/50" : undefined}
      />
      {error?.length && (
        <p className="text-xs text-red-500">{error[0]}</p>
      )}
    </div>
  );
}
