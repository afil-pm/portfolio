// src/components/layout/footer.tsx
import Link from "next/link";
import { Mail, Phone, Github, Instagram, Linkedin } from "lucide-react";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/afil-pm", icon: Github },
  { label: "Instagram", href: "https://instagram.com/afil_pm", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com/in/afil-pm", icon: Linkedin },
  { label: "WhatsApp", href: "https://wa.me/917561820814", icon: Phone },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-slate-950/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-10 sm:py-16 md:py-24">

        {/* Brand block — full width on all screens */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-blue-500/25">
              AP
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-white">
              AFIL<span className="text-blue-400">PM</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Full-Stack Web Developer &amp; Motion Graphics Designer building premium
            digital experiences and creative visuals.
          </p>
        </div>

        {/*
          ── MOBILE  (<sm): single column — Connect → Contact → Quick Links stacked
          ── TABLET+ (sm+): 3-column side-by-side grid, unchanged from before
        */}

        {/* ── MOBILE ONLY layout (hidden on sm+) ── */}
        <div className="flex flex-col gap-8 mb-10 sm:hidden">

          {/* Connect — icons in a single horizontal row */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-row gap-2">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-400/50 hover:bg-blue-500/15 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:-translate-y-1 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact — directly below Connect */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-slate-500 mt-0.5 shrink-0" />
                <a
                  href="mailto:info.afilpm@gmail.com"
                  className="hover:text-white transition-colors break-all leading-snug"
                >
                  info.afilpm@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-500 shrink-0" />
                <a
                  href="https://wa.me/917561820814"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/skills" className="hover:text-white transition-colors">Skills</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
            </ul>
          </div>
        </div>

        {/* ── TABLET / DESKTOP layout (hidden below sm, shown sm+) — untouched ── */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-8 mb-14">

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex flex-row gap-2">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-400/50 hover:bg-blue-500/15 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:-translate-y-1 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-slate-500 mt-0.5 shrink-0" />
                <a
                  href="mailto:info.afilpm@gmail.com"
                  className="hover:text-white transition-colors break-all leading-snug"
                >
                  info.afilpm@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-500 shrink-0" />
                <a
                  href="https://wa.me/917561820814"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/skills" className="hover:text-white transition-colors">Skills</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-5 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            &copy; {new Date().getFullYear()} AFIL PM. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 text-center sm:text-right">
            Built with Next.js &bull; Tailwind CSS &bull; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
