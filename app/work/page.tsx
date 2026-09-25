import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work | Abhay Mishra",
  description: "Long-form edits, short-form reels, thumbnails, and channel case studies by Abhay Mishra.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "Work | Abhay Mishra",
    description: "Long-form edits, short-form reels, thumbnails, and channel case studies.",
    url: "https://abhay-portfolio.vercel.app/work",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Work | Abhay Mishra",
    description: "Long-form edits, short-form reels, thumbnails, and channel case studies.",
  },
};

const categories = [
  {
    href: "/work/long-form",
    icon: "movie",
    label: "Long-form Video Edits",
    tagline: "8 – 25 min YouTube, podcast, VSL",
    desc: "Retention-first cuts for education, podcast, and launch channels. Hook rebuilt, pacing tightened, on-screen proof added.",
    count: "4 videos",
    accent: "from-orange-400 to-red-500",
    bg: "from-orange-50 to-red-50",
  },
  {
    href: "/work/short-form",
    icon: "shortcut",
    label: "Short-form & Reels",
    tagline: "30 – 60 sec vertical clips",
    desc: "Punch-first vertical clips for YouTube Shorts, LinkedIn, and Instagram. Hook at second 1, CTA at second 58.",
    count: "4 videos",
    accent: "from-purple-400 to-pink-500",
    bg: "from-purple-50 to-pink-50",
  },
  {
    href: "/work/thumbnails",
    icon: "image",
    label: "Thumbnails & Graphics",
    tagline: "Click-through driven, brand consistent",
    desc: "Custom thumbnails and channel art. Click-through optimised with brand-consistent colour and typography.",
    count: "6 thumbnails",
    accent: "from-amber-400 to-orange-500",
    bg: "from-amber-50 to-orange-50",
  },
  {
    href: "/work/case-studies",
    icon: "analytics",
    label: "Channel Case Studies",
    tagline: "Real clients, hard numbers",
    desc: "Before and after: what I changed, what it drove, and the metrics behind the work. Victor, Harjeet, Maurice, Blake.",
    count: "4 case studies",
    accent: "from-emerald-400 to-teal-500",
    bg: "from-emerald-50 to-teal-50",
  },
];

function CategoryCard({
  href,
  icon,
  label,
  tagline,
  desc,
  count,
  accent,
  bg,
}: (typeof categories)[number]) {
  return (
    <Link
      href={href}
      className={`group relative glass-card rounded-3xl overflow-hidden border border-outline-variant/40 p-8 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between min-h-[260px] bg-gradient-to-br ${bg}`}
    >
      <div>
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${accent} text-white mb-6 shadow-lg`}
        >
          <span className="material-symbols-outlined text-3xl">{icon}</span>
        </div>
        <div className="flex items-center gap-3 mb-1">
          <h2 className="text-xl md:text-2xl font-bold text-on-surface group-hover:text-primary transition-colors">
            {label}
          </h2>
        </div>
        <p className="text-xs font-medium text-on-surface-variant mb-3">{tagline}</p>
        <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
      </div>
      <div className="flex items-center justify-between mt-6">
        <span className="text-xs font-medium text-on-surface-variant">{count}</span>
        <span className="material-symbols-outlined text-primary text-xl group-hover:translate-x-1 transition-transform">
          arrow_forward
        </span>
      </div>
    </Link>
  );
}

export default function WorkPage() {
  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden min-h-screen">
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 top-1/2 right-[-100px]"></div>

      <section className="mb-16 pt-6 relative z-10">
        <div className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-4">
          Selected work
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface mb-5 leading-tight">
          The work <span className="gradient-text">I do</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Long-form YouTube, short-form reels, thumbnails, and full channel
          case studies. Pick a category to browse.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {categories.map((cat) => (
          <CategoryCard key={cat.href} {...cat} />
        ))}
      </section>

      <section className="mt-16 relative z-10">
        <div className="glass-card rounded-3xl p-10 text-center max-w-3xl mx-auto bg-gradient-to-br from-emerald-50 to-teal-100 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
            Want your work featured here?
          </h2>
          <p className="text-on-surface-variant text-base mb-8 max-w-xl mx-auto leading-relaxed">
            I work with 2 clients at a time. If your channel is ready to grow,
            let us talk.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-10 py-4 rounded-full shadow-md hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all"
          >
            Book a free intro call
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
