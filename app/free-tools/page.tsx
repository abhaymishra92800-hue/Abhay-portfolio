import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { EmailCapture } from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Free Tools | Abhay Mishra",
  description: "Three free tools built from real client work: a LinkedIn funnel planner, a reel hook generator, and a YouTube channel audit. No signup, no fluff.",
  alternates: { canonical: "/free-tools" },
  openGraph: {
    title: "Free Tools | Abhay Mishra",
    description: "Three free tools built from real client work.",
    url: "https://abhay-portfolio.vercel.app/free-tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Tools | Abhay Mishra",
    description: "Three free tools built from real client work.",
  },
};

const tools = [
  {
    title: "LinkedIn Funnel Planner",
    desc: "Get a 3-step funnel plan for your LinkedIn profile in under 2 minutes. Built for consultants, coaches, and B2B founders who want leads from LinkedIn.",
    href: "/linkedin-funnel",
    icon: "hub",
    color: "text-blue-600",
    bg: "from-blue-500/15 to-blue-500/0",
    iconBg: "bg-blue-500/10",
    bullets: [
      "Profile and headline rewrite prompt",
      "3 content pillars generated for your ICP",
      "Sample post built from your offer",
    ],
    cta: "Plan my LinkedIn funnel",
  },
  {
    title: "Reel Hooks Generator",
    desc: "Generate 10 scroll-stopping hook ideas for your next short-form video. Built from hook structures I have used on real client videos.",
    href: "/reel-hooks",
    icon: "movie_filter",
    color: "text-pink-600",
    bg: "from-pink-500/15 to-pink-500/0",
    iconBg: "bg-pink-500/10",
    bullets: [
      "10 hook ideas in 30 seconds",
      "Mix of curiosity, contrarian, and proof hooks",
      "Save your favorites for later",
    ],
    cta: "Generate hooks",
  },
  {
    title: "YouTube Channel Audit",
    desc: "Score your channel on 5 growth levers and get a one-page action plan. Built from the same audit I run for paying clients.",
    href: "/youtube-audit",
    icon: "analytics",
    color: "text-red-600",
    bg: "from-red-500/15 to-red-500/0",
    iconBg: "bg-red-500/10",
    bullets: [
      "Score on 5 growth levers",
      "One-page action plan",
      "What to fix first, in priority order",
    ],
    cta: "Audit my channel",
  },
];

export default function FreeToolsPage() {
  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden min-h-screen">
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 top-1/2 right-[-100px]"></div>

      {/* Hero */}
      <section className="text-center mb-16 max-w-3xl mx-auto pt-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary font-semibold text-xs tracking-wide uppercase mb-6 shadow-sm">
          <span className="material-symbols-outlined text-base">bolt</span>
          Free tools
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-6 leading-tight">
          Try before you <span className="gradient-text">buy.</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          Three tools I built from real client work. Use them, get a result in
          under 2 minutes, and decide if you want me to run the system for you.
        </p>
      </section>

      {/* Tools */}
      <section className="mb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <article
              key={tool.title}
              className="group glass-card rounded-3xl p-8 border border-outline-variant/40 hover:-translate-y-1 hover:shadow-2xl transition-all flex flex-col bg-gradient-to-br from-surface to-surface"
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${tool.bg} pointer-events-none`} />
              <div className="relative z-10 flex flex-col flex-grow">
                <div
                  className={`w-14 h-14 rounded-2xl ${tool.iconBg} ${tool.color} flex items-center justify-center mb-5`}
                >
                  <span className="material-symbols-outlined text-3xl">
                    {tool.icon}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-on-surface mb-2">
                  {tool.title}
                </h2>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-5">
                  {tool.desc}
                </p>
                <ul className="space-y-2 mb-6">
                  {tool.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2 text-sm text-on-surface"
                    >
                      <span
                        className={`material-symbols-outlined ${tool.color} text-base shrink-0 mt-0.5`}
                      >
                        check_circle
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={tool.href}
                  className={`mt-auto inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-full shadow-md hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all`}
                >
                  {tool.cta}
                  <span className="material-symbols-outlined text-base">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Email capture */}
      <section className="relative z-10 max-w-xl mx-auto mb-16">
        <EmailCapture source="free-tools" variant="inline" />
      </section>

      {/* Cross-sell */}
      <section className="relative z-10 max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl p-10 text-center bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500 shadow-2xl">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary bg-white/80 px-3 py-1.5 rounded-full mb-4">
            Want this run for you?
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface mb-3">
            I run these systems for clients every week.
          </h2>
          <p className="text-on-surface-variant text-base mb-8 max-w-xl mx-auto">
            The tools are the free version. The paid plans are the same
            systems, run end to end for your business. Book a call and I will
            show you which plan fits.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all"
            >
              Book a strategy call
              <span className="material-symbols-outlined">event</span>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary/40 text-on-surface font-semibold px-8 py-4 rounded-full hover:border-primary hover:text-primary transition-all"
            >
              See services and pricing
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
