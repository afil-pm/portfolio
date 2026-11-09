// src/components/sections/contact-form.tsx
"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { Mail, Phone, Link as LinkIcon, Github, ArrowRight } from "lucide-react";

const SOCIALS = [
  { label: "Email", href: "mailto:hello@example.com", icon: Mail },
  { label: "WhatsApp", href: "https://wa.me/1234567890", icon: Phone },
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
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-1.5 text-[11px] font-medium text-blue-400/90 uppercase tracking-widest mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                Get In Touch
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">
                Let's build something amazing
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Have a project in mind? I'd love to hear about it. Whether you need a
                web application, motion graphics, or video editing — let's collaborate.
              </p>
            </div>

            <div className="space-y-6">
              {SOCIALS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-blue-500 bg-blue-500/10 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-200 block">{item.label}</span>
                    <span className="text-xs text-slate-500">{item.href}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <motion.form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-12 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)]"
            initial={{ opacity: 0, y: 30 }}
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
              placeholder="Tell me about your project, timeline, and budget..."
            />

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-7 rounded-xl border border-rose-500/30 bg-rose-500/10 p-5 text-sm text-rose-300 shadow-sm"
              >
                {message || "Something went wrong. Please try again."}
              </motion.div>
            )}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-7 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-sm text-emerald-300 shadow-sm"
              >
                Thank you! Your message has been sent successfully. I'll get back to you soon.
              </motion.div>
            )}

            <Button
              type="submit"
              variant="brand"
              size="lg"
              disabled={status === "submitting"}
              className="mt-9 w-full group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {status === "submitting" ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
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
    <div className="space-y-3">
      <Label htmlFor={id} className="text-sm font-medium text-slate-300">
        {label}{required && <span className="text-rose-400 ml-1">*</span>}
      </Label>
      <Comp
        id={id}
        name={id}
        type={type}
        rows={rows}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error?.length}
        className={error?.length ? "border-rose-500/50 focus:ring-rose-500/50" : undefined}
      />
      {error?.length && (
        <p className="text-[10px] text-rose-400">{error[0]}</p>
      )}
    </div>
  );
}
