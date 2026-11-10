// src/components/sections/contact-form.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import {
  Mail,
  Phone,
  Github,
  Instagram,
  Linkedin,
  Send,
  User,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  ArrowUpRight,
} from "lucide-react";

const SOCIALS = [
  { label: "Email", href: "mailto:info.afilpm@gmail.com", display: "info.afilpm@gmail.com", icon: Mail, copyable: true },
  { label: "WhatsApp", href: "https://wa.me/917561820814", display: "+91 75618 20814", icon: Phone },
  { label: "GitHub", href: "https://github.com/afil-pm", display: "github.com/afil-pm", icon: Github },
  { label: "Instagram", href: "https://instagram.com/afil_pm", display: "@afil_pm", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com/in/afil-pm", display: "linkedin.com/in/afil-pm", icon: Linkedin },
];

const PROJECT_TYPE_CHIPS = [
  "🚀 Web Application",
  "🎬 Motion Graphics",
  "✂️ Video Editing",
  "🎨 UI/UX Design",
  "⚡ Full-Stack Project",
  "💼 General Inquiry",
];

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [statusMessage, setStatusMessage] = useState("");

  // Controlled form state for live UX feedback
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Email live validation check
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Quick chip select
  const handleChipClick = (chip: string) => {
    setActiveChip(chip);
    setSubject(chip.replace(/^[^\s]+\s/, "")); // Strip leading emoji for clean subject
  };

  // Copy email to clipboard
  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("info.afilpm@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("submitting");
      setErrors({});
      setStatusMessage("");

      const payload = {
        name,
        email,
        subject,
        message,
      };

      let csrfToken: string | null = null;
      try {
        const res = await fetch("/api/auth/csrf", { credentials: "same-origin" });
        const data = await res.json();
        csrfToken = data.csrfToken || null;
      } catch {
        setStatus("error");
        setStatusMessage("Unable to initialize secure session. Please reload.");
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
          setStatusMessage(data.error || "Submission could not be completed.");
          return;
        }

        setStatus("success");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        setActiveChip(null);
      } catch {
        setStatus("error");
        setStatusMessage("Network error. Please check your connection and try again.");
      }
    },
    [name, email, subject, message]
  );

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 overflow-hidden">
      {/* Background Glow Blobs */}
      <div className="absolute top-10 left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Contact Information & Channels */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>Direct Communication</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Let's craft something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                extraordinary
              </span>
            </h1>

            <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
              Have an upcoming product launch, full-stack web project, or motion graphics brief? Reach out directly via the form or through any channel below.
            </p>
          </div>

          {/* Quick Badges: Response Time & Availability */}
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Turnaround Time</span>
                <span className="text-xs font-semibold text-white">&lt; 24h Response</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs text-slate-400 block font-medium">Location & Time</span>
                <span className="text-xs font-semibold text-white">Kerala, IN &bull; IST</span>
              </div>
            </div>
          </div>

          {/* Social Channels List */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
              Connect Channels
            </h3>

            {SOCIALS.map((item) => {
              const isEmail = item.label === "Email";

              return (
                <div
                  key={item.label}
                  className="group relative rounded-2xl border border-white/10 bg-slate-900/50 hover:bg-slate-900/80 hover:border-blue-500/30 transition-all p-3.5 flex items-center justify-between"
                >
                  <a
                    href={item.href}
                    target={isEmail ? undefined : "_blank"}
                    rel={isEmail ? undefined : "noopener noreferrer"}
                    className="flex items-center gap-3.5 flex-grow"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-slate-400 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-indigo-600 group-hover:text-white group-hover:border-transparent group-hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] transition-all duration-300 flex items-center justify-center shrink-0">
                      <item.icon className="h-4 w-4 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
                    </div>

                    <div className="overflow-hidden">
                      <span className="font-semibold text-sm text-slate-200 group-hover:text-white block transition-colors">
                        {item.label}
                      </span>
                      <span className="text-xs text-slate-400 truncate block font-mono">
                        {item.display}
                      </span>
                    </div>
                  </a>

                  {isEmail ? (
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="group/copy ml-2 p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-blue-500/20 hover:border-blue-400/40 text-slate-400 hover:text-blue-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                      title="Copy email address"
                      aria-label="Copy email address"
                    >
                      {copiedEmail ? (
                        <Check className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <Copy className="h-4 w-4 group-hover/copy:scale-125 group-hover/copy:rotate-6 transition-all duration-200" />
                      )}
                    </button>
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 ml-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Advanced Cool Interactive Form */}
        <div className="lg:col-span-7">
          <div className="relative rounded-[2.5rem] p-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-2xl shadow-black/60">
            <div className="rounded-[2.45rem] bg-slate-950/80 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 md:p-12 relative overflow-hidden">
              {/* Form Ambient Corner Accent Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/10">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Send a Message
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Fill out the brief below and I will get back to you promptly.
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Available for Hire</span>
                </div>
              </div>

              {/* Success Banner */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-300 flex items-start gap-3.5 shadow-lg shadow-emerald-950/30"
                  >
                    <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-emerald-200">
                        Message Dispatched Successfully!
                      </h4>
                      <p className="text-xs text-emerald-300/90 mt-1 leading-relaxed">
                        Thank you for reaching out. Your inquiry has been received, and I will review your requirements and respond within 24 hours.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Banner */}
              <AnimatePresence>
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-8 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-rose-300 flex items-start gap-3.5 shadow-lg shadow-rose-950/30"
                  >
                    <AlertCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-rose-200">
                        Delivery Failed
                      </h4>
                      <p className="text-xs text-rose-300/90 mt-1 leading-relaxed">
                        {statusMessage || "Please resolve highlighted fields and submit again."}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Name and Email */}
                <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Name Input Area */}
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between"
                    >
                      <span>Your Name</span>
                      <span className="text-[11px] font-mono text-blue-400">Required</span>
                    </label>

                    <div className="relative group/field rounded-2xl p-[1px] transition-all duration-300">
                      {/* Gradient Focus Glow Ring */}
                      <div
                        className={`absolute -inset-[1px] rounded-2xl transition-opacity duration-300 pointer-events-none ${
                          errors.name?.length
                            ? "bg-gradient-to-r from-rose-500 to-red-500 opacity-100"
                            : "bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 opacity-0 group-focus-within/field:opacity-100 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        }`}
                      />

                      {/* Input Inner Shell */}
                      <div className="relative rounded-[15px] bg-slate-900/90 backdrop-blur-xl border border-white/10 group-hover/field:border-white/20 transition-all flex items-center px-3.5 py-2.5">
                        <div className="w-8 h-8 rounded-xl bg-white/5 group-focus-within/field:bg-blue-500/15 group-focus-within/field:text-blue-400 group-focus-within/field:border-blue-500/30 border border-white/5 flex items-center justify-center text-slate-400 transition-all shrink-0 mr-3">
                          <User className="h-4 w-4" />
                        </div>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. John Doe"
                          className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    {errors.name?.length && (
                      <p className="text-xs text-rose-400 flex items-center gap-1 pt-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.name[0]}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Input Area */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between"
                    >
                      <span>Email Address</span>
                      <span className="text-[11px] font-mono text-blue-400">Required</span>
                    </label>

                    <div className="relative group/field rounded-2xl p-[1px] transition-all duration-300">
                      {/* Gradient Focus Glow Ring */}
                      <div
                        className={`absolute -inset-[1px] rounded-2xl transition-opacity duration-300 pointer-events-none ${
                          errors.email?.length
                            ? "bg-gradient-to-r from-rose-500 to-red-500 opacity-100"
                            : "bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 opacity-0 group-focus-within/field:opacity-100 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                        }`}
                      />

                      {/* Input Inner Shell */}
                      <div className="relative rounded-[15px] bg-slate-900/90 backdrop-blur-xl border border-white/10 group-hover/field:border-white/20 transition-all flex items-center px-3.5 py-2.5">
                        <div className="w-8 h-8 rounded-xl bg-white/5 group-focus-within/field:bg-blue-500/15 group-focus-within/field:text-blue-400 group-focus-within/field:border-blue-500/30 border border-white/5 flex items-center justify-center text-slate-400 transition-all shrink-0 mr-3">
                          <Mail className="h-4 w-4" />
                        </div>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                        />

                        {/* Live Email Validity Pill */}
                        {isEmailValid && (
                          <div className="shrink-0 flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                            <CheckCircle2 className="h-3 w-3" />
                            <span className="hidden sm:inline">Valid</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {errors.email?.length && (
                      <p className="text-xs text-rose-400 flex items-center gap-1 pt-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>{errors.email[0]}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Quick Subject Select Chips */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-blue-400" />
                      <span>Quick Topic Selection</span>
                    </label>
                    <span className="text-[11px] font-mono text-slate-500">Tap to populate</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {PROJECT_TYPE_CHIPS.map((chip) => {
                      const isSelected = activeChip === chip;
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => handleChipClick(chip)}
                          className={[
                            "px-3 py-1.5 rounded-xl text-xs font-medium transition-all select-none",
                            isSelected
                              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30 border border-blue-400/40"
                              : "border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20",
                          ].join(" ")}
                        >
                          {chip}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Subject Input Area */}
                <div className="space-y-2">
                  <label
                    htmlFor="subject"
                    className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center justify-between"
                  >
                    <span>Subject / Project Scope</span>
                    <span className="text-[11px] font-mono text-blue-400">Required</span>
                  </label>

                  <div className="relative group/field rounded-2xl p-[1px] transition-all duration-300">
                    {/* Gradient Focus Glow Ring */}
                    <div
                      className={`absolute -inset-[1px] rounded-2xl transition-opacity duration-300 pointer-events-none ${
                        errors.subject?.length
                          ? "bg-gradient-to-r from-rose-500 to-red-500 opacity-100"
                          : "bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 opacity-0 group-focus-within/field:opacity-100 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      }`}
                    />

                    {/* Input Inner Shell */}
                    <div className="relative rounded-[15px] bg-slate-900/90 backdrop-blur-xl border border-white/10 group-hover/field:border-white/20 transition-all flex items-center px-3.5 py-2.5">
                      <div className="w-8 h-8 rounded-xl bg-white/5 group-focus-within/field:bg-blue-500/15 group-focus-within/field:text-blue-400 group-focus-within/field:border-blue-500/30 border border-white/5 flex items-center justify-center text-slate-400 transition-all shrink-0 mr-3">
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={subject}
                        onChange={(e) => {
                          setSubject(e.target.value);
                          setActiveChip(null);
                        }}
                        placeholder="e.g. Next.js Web App Architecture & Design"
                        className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {errors.subject?.length && (
                    <p className="text-xs text-rose-400 flex items-center gap-1 pt-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.subject[0]}</span>
                    </p>
                  )}
                </div>

                {/* Message Textarea Area */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="message"
                      className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1"
                    >
                      <span>Project Details & Brief</span>
                      <span className="text-rose-400">*</span>
                    </label>

                    <span
                      className={`text-[11px] font-mono transition-colors ${
                        message.length > 4500
                          ? "text-amber-400 font-semibold"
                          : "text-slate-500"
                      }`}
                    >
                      {message.length} / 5000 characters
                    </span>
                  </div>

                  <div className="relative group/field rounded-2xl p-[1px] transition-all duration-300">
                    {/* Gradient Focus Glow Ring */}
                    <div
                      className={`absolute -inset-[1px] rounded-2xl transition-opacity duration-300 pointer-events-none ${
                        errors.message?.length
                          ? "bg-gradient-to-r from-rose-500 to-red-500 opacity-100"
                          : "bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 opacity-0 group-focus-within/field:opacity-100 shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      }`}
                    />

                    {/* Textarea Inner Shell */}
                    <div className="relative rounded-[15px] bg-slate-900/90 backdrop-blur-xl border border-white/10 group-hover/field:border-white/20 transition-all p-3.5 flex gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/5 group-focus-within/field:bg-blue-500/15 group-focus-within/field:text-blue-400 group-focus-within/field:border-blue-500/30 border border-white/5 flex items-center justify-center text-slate-400 transition-all shrink-0 mt-0.5">
                        <MessageSquare className="h-4 w-4" />
                      </div>

                      <div className="w-full flex flex-col">
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          required
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Outline your project scope, target timeline, creative requirements, and preferred stack..."
                          className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none resize-none leading-relaxed"
                        />

                        <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-3 text-slate-500 text-[11px]">
                          <span className="inline-flex items-center gap-1.5">
                            <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                            <span>CSRF &amp; Spam Protected &bull; Encrypted in transit</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {errors.message?.length && (
                    <p className="text-xs text-rose-400 flex items-center gap-1 pt-1">
                      <AlertCircle className="h-3 w-3" />
                      <span>{errors.message[0]}</span>
                    </p>
                  )}
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === "submitting"}
                    className="relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 text-white text-sm font-semibold tracking-wide shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden group select-none"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-2.5">
                      {status === "submitting" ? (
                        <>
                          <svg
                            className="animate-spin h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          <span>Transmitting Your Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-200" />
                        </>
                      )}
                    </div>

                    {/* Radiant Hover Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
