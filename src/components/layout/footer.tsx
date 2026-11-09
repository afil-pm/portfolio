// src/components/layout/footer.tsx
import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, Instagram } from "lucide-react";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com", icon: Twitter },
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/30 backdrop-blur">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 lg:col-span-4 flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-gradient-brand flex items-center justify-center text-[10px] font-bold text-white">AP</div>
            <span className="font-display font-bold text-lg tracking-tight text-text">
              AFIL<span className="text-brand">PM</span>
            </span>
          </div>
          <p className="col-span-2 lg:col-span-4 text-muted text-sm leading-relaxed">
            Full-Stack Web Developer & Motion Graphics Designer building premium digital
            experiences and creative visuals.
          </p>

          <div>
            <h4 className="text-sm font-semibold text-text mb-4 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl border border-border bg-surface flex items-center justify-center text-muted hover:text-brand hover:border-brand/40 transition-all"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:hello@example.com" className="hover:text-text transition-colors">
                  hello@example.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="https://wa.me/1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-text mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/about" className="hover:text-text transition-colors">About</Link></li>
              <li><Link href="/skills" className="hover:text-text transition-colors">Skills</Link></li>
              <li><Link href="/services" className="hover:text-text transition-colors">Services</Link></li>
              <li><Link href="/projects" className="hover:text-text transition-colors">Projects</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} AFIL PM. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Built with Next.js &bull; Tailwind CSS &bull; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
