import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { LinkedInLogo } from "@/components/LinkedInLogo";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Free Growth Tools | Abhay Mishra",
  description:
    "Free, AI-powered growth tools by Abhay Mishra — LinkedIn content calendar, YouTube retention audit, Reel hook swipe file, and an ad creative ROI calculator. Built to turn content into revenue.",
};

type Tool = {
  name: string;
  icon: string;
  logo?: "linkedin";
  tagline: string;
  description: string;
  href: string;
  badge: string;
  accent: string;
  features: string[];
  cta: string;
};

const tools: Tool[] = [
  {
    name: "LinkedIn Content Engine",
    icon: "calendar_month",
    logo: "linkedin",
    tagline: "30 days of personalized LinkedIn posts",
    description:
      "Paste your LinkedIn URL and get a complete 30-day content calendar — hooks, full post copy, strategic rationale, and optimal posting times — delivered to your inbox for free.",
    href: "/linkedin-funnel",
    badge: "FREE",
    accent: "#0A66C2",
    features: [
      "30-day AI-generated calendar",
      "Hooks, full copy & posting times",
      "Delivered straight to your inbox",
    ],
    cta: "Generate LinkedIn Plan",
  },
  {
    name: "YouTube Retention Audit",
    icon: "play_circle",
    tagline: "Top-3 fixes to keep viewers watching",
    description:
      "Drop your YouTube channel URL. Our AI maps your retention drop-offs and emails the three highest-impact fixes you can ship this week — completely free.",
    href: "/youtube-audit",
    badge: "FREE",
    accent: "#FF0000",
    features: [
      "Channel-aware AI audit",
      "3 prioritized retention fixes",
      "Delivered to your inbox",
    ],
    cta: "Audit My Channel",
  },
  {
    name: "Reel & Shorts Hook Swipe File",
    icon: "smart_display",
    tagline: "30 hooks tailored to your niche",
    description:
      "Tell us your niche. Get 30 copy-paste hooks for Reels, Shorts, and TikTok — each tagged with its angle (curiosity, controversy, story, etc.) and best format.",
    href: "/reel-hooks",
    badge: "FREE",
    accent: "#6355FF",
    features: [
      "30 niche-specific hooks",
      "9 angles, 3 platforms",
      "Copy-paste ready",
    ],
    cta: "Generate Hooks",
  },
  {
    name: "Ad Creative ROI Calculator",
    icon: "calculate",
    tagline: "Know if your ads are profitable in 5 seconds",
    description:
      "Slide in your spend, CTR, and conversion rate. Instantly see your ROAS, CPA, and revenue — plus 3 tips to improve the numbers. No sign-up.",
    href: "/ad-roi-calculator",
    badge: "FREE",
    accent: "#10B981",
    features: [
      "Instant ROAS + CPA + revenue",
      "3 personalized tips",
      "INR & USD support",
    ],
    cta: "Calculate ROAS",
  },
];

const upcoming = [
  {
    icon: "campaign",
    title: "Email Sequence Builder",
    desc: "Generate a 5-step welcome sequence for any niche — subject lines, body copy, and timing.",
  },
  {
    icon: "psychology",
    title: "Hook Headline Lab",
    desc: "10 YouTube title formulas tested against your topic — pick the one most likely to click.",
  },
  {
    icon: "storefront",
    title: "E-com PDP Audit",
    desc: "Paste any product page. Get a 5-point conversion audit in under a minute.",
  },
];

function ToolIcon({ tool }: { tool: Tool }) {
  if (tool.logo === "linkedin") {
    return <LinkedInLogo className="w-6 h-6 text-white" />;
  }
  return (
    <span className="material-symbols-outlined text-white text-2xl">{tool.icon}</span>
  );
}

export default function FunnelsPage() {
  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden min-h-screen">
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 top-1/3 right-[-100px]"></div>

      {/* Hero */}
      <section className="text-center mb-20 max-w-3xl mx-auto pt-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary font-semibold text-xs tracking-wide uppercase mb-6 shadow-sm">
          Free Growth Tools
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-6 leading-tight">
          Tools that turn <span className="gradient-text">content into revenue</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          No fluff, no templates. Just practical, AI-powered tools I use with my own clients —
          now free for you to try.
        </p>
      </section>

      {/* Active tools */}
      <section className="mb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="group relative glass-card rounded-3xl p-8 md:p-10 overflow-hidden flex flex-col hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-outline-variant/50"
            >
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: `linear-gradient(to right, ${tool.accent}, transparent)` }}
              />
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md"
                  style={{ background: tool.accent }}
                >
                  <ToolIcon tool={tool} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-on-surface">{tool.name}</h3>
                    <span
                      className="text-[10px] font-black px-2 py-0.5 rounded-full tracking-wider text-white"
                      style={{ background: tool.accent }}
                    >
                      {tool.badge}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-on-surface-variant">
                    {tool.tagline}
                  </p>
                </div>
              </div>

              <p className="text-on-surface-variant text-base leading-relaxed mb-6">
                {tool.description}
              </p>

              <ul className="space-y-2 mb-8">
                {tool.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-on-surface">
                    <span className="material-symbols-outlined text-emerald-500 text-base">
                      check_circle
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tool.href}
                className="mt-auto inline-flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform text-base"
                style={{ background: tool.accent }}
              >
                {tool.logo === "linkedin" && <LinkedInLogo className="w-5 h-5" />}
                {tool.cta}
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Coming soon */}
      <ScrollReveal>
        <section className="mb-24 relative z-10">
          <div className="text-center mb-12">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
              On The Roadmap
            </p>
            <h2 className="text-3xl font-bold text-on-surface mb-3">More tools coming soon</h2>
            <p className="text-on-surface-variant text-base max-w-xl mx-auto">
              I&apos;m actively building more free tools. Want one shipped first? Let me know
              what would help your growth most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcoming.map((u, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-8 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary/20 to-primary/5 text-primary flex items-center justify-center mb-5">
                  <span className="material-symbols-outlined text-2xl">{u.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2">{u.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{u.desc}</p>
                <span className="inline-block mt-4 text-[10px] font-black bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-full tracking-wider">
                  SOON
                </span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <div className="text-center relative z-10 glass-card p-12 rounded-3xl max-w-4xl mx-auto bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500 shadow-2xl">
        <h2 className="text-3xl font-bold text-on-surface mb-4">Need a custom growth plan?</h2>
        <p className="text-on-surface-variant mb-8 max-w-xl mx-auto">
          These tools are a great start — but if you want hands-on help editing, managing, and
          scaling your content, let&apos;s talk.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform hover:bg-primary-container"
          >
            Book a Call
            <span className="material-symbols-outlined">calendar_today</span>
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border-2 border-outline-variant text-on-surface font-semibold px-8 py-4 rounded-full hover:border-primary/40 hover:text-primary transition-all"
          >
            View Services
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
