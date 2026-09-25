import React from "react";
import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const socials = [
    { name: "LinkedIn", href: "https://www.linkedin.com/in/abhaymishrahere/", icon: "person" },
    { name: "WhatsApp", href: "https://wa.me/917980119941", icon: "chat" },
  ];

  return (
    <footer
      className="bg-surface border-t border-outline-variant/30 w-full pt-16 pb-8"
      id="footer"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-bold text-xl text-on-surface">
                Abhay Mishra
              </span>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-6 max-w-xs">
              Video editor and social media manager. YouTube, LinkedIn, and
              content automation for creators and founders.
            </p>
            <a
              href="mailto:abhayworkofficial@gmail.com"
              className="text-sm font-semibold text-primary hover:underline decoration-primary/40"
            >
              abhayworkofficial@gmail.com
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-bold text-on-surface uppercase tracking-widest mb-5">
              Connect
            </h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/70 backdrop-blur-sm border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all hover:scale-110"
                  aria-label={social.name}
                >
                  <span className="material-symbols-outlined text-lg">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
            <div className="glass-card rounded-xl p-4 inline-block">
              <p className="text-xs font-semibold text-on-surface mb-1">
                Open for projects
              </p>
              <p className="text-xs text-on-surface-variant">
                I typically respond within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-300/40 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-on-surface-variant">
            © {new Date().getFullYear()} Abhay Mishra. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="text-xs text-on-surface-variant hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-xs text-on-surface-variant hover:text-primary transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
