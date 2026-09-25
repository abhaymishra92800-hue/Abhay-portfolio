import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Abhay Mishra",
  description: "Channel before and after case studies — what changed, what the work did, and the numbers behind it.",
  alternates: { canonical: "/work/case-studies" },
  openGraph: {
    title: "Case Studies | Abhay Mishra",
    description: "Channel before and after case studies.",
    url: "https://abhay-portfolio.vercel.app/work/case-studies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Abhay Mishra",
    description: "Channel before and after case studies.",
  },
};

const caseStudies = [
  {
    client: "Victor Chan · Launch Excel",
    clientImg: "https://anuj4u.in/wp-content/uploads/2025/03/victor-chan.jpg",
    niche: "YouTube Education",
    result: "+38%",
    metric: "course signup rate",
    note: "Re-cut the VSL with a stronger hook, tighter pacing, and on-screen proof points.",
    work: ["Long-form VSL cut", "VSL thumbnail redesign", "Onboarding email sequence"],
  },
  {
    client: "Harjeet Dhillon · Author & Actress",
    clientImg: "https://anuj4u.in/wp-content/uploads/2025/03/harjeet-dhillon-1-1.png",
    niche: "Podcast",
    result: "1,200+",
    metric: "listens in 30 days, zero paid promotion",
    note: "Built the full launch stack: edits, thumbnails, SEO descriptions, posting calendar.",
    work: ["Podcast editing", "Episode covers", "SEO titles and descriptions", "30-day launch calendar"],
  },
  {
    client: "Dr. Maurice Maurer · Science Educator",
    clientImg: "https://anuj4u.in/wp-content/uploads/2025/03/maurice-maurer.png",
    niche: "YouTube Education",
    result: "+25%",
    metric: "average view duration",
    note: "Elevated visuals with motion graphics and tighter retention-focused edits.",
    work: ["Long-form edits", "Custom motion graphics", "Retention pacing pass"],
  },
  {
    client: "Blake Reddy · Wealth Adviser",
    clientImg: "https://anuj4u.in/wp-content/uploads/2025/03/blake-pic-website-1.png",
    niche: "Podcast / Shorts",
    result: "6 hrs/wk",
    metric: "of production time saved",
    note: "Designed a reusable short-form template system and clip selection workflow.",
    work: ["Short-form template system", "Clip selection workflow", "LinkedIn rollout"],
  },
];

function CaseStudy({
  client,
  clientImg,
  niche,
  result,
  metric,
  note,
  work,
}: (typeof caseStudies)[number]) {
  return (
    <div className="glass-card rounded-3xl overflow-hidden border border-outline-variant/40 shadow-md hover:shadow-2xl transition-all">
      <div className="grid md:grid-cols-[280px_1fr] gap-0">
        <div className="relative aspect-square md:aspect-auto bg-gradient-to-br from-primary/20 via-purple-200 to-pink-200">
          <Image
            src={clientImg}
            alt={client}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
            {niche}
          </p>
          <h3 className="text-2xl font-bold text-on-surface mb-4">{client}</h3>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-extrabold gradient-text">{result}</span>
            <span className="text-sm text-on-surface-variant">{metric}</span>
          </div>
          <p className="text-on-surface-variant leading-relaxed mb-5">{note}</p>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">
              What I did
            </p>
            <ul className="space-y-1.5">
              {work.map((w) => (
                <li
                  key={w}
                  className="flex items-center gap-2 text-sm text-on-surface"
                >
                  <span className="material-symbols-outlined text-primary text-base">
                    check_circle
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CaseStudiesPage() {
  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden min-h-screen">
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 top-1/2 right-[-100px]"></div>

      <section className="mb-12 pt-6 relative z-10">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors mb-6"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to all work
        </Link>
        <div className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-4">
          Case studies
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-4 leading-tight">
          Channel <span className="gradient-text">Case Studies</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Real clients, real numbers. What I did, what changed, and the work
          that drove it.
        </p>
      </section>

      <section className="space-y-8 relative z-10">
        {caseStudies.map((cs) => (
          <CaseStudy key={cs.client} {...cs} />
        ))}
      </section>

      <section className="mt-16 relative z-10">
        <div className="glass-card rounded-3xl p-8 text-center max-w-3xl mx-auto bg-gradient-to-br from-emerald-50 via-purple-100 to-pink-200 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">
            Want your channel to be the next one?
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base mb-6">
            Free 20-minute audit. We look at your last 5 videos together and
            tell you what to fix first.
          </p>
          <Link
            href="/contact?service=linkedin-funnel-system"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all"
          >
            Book a free audit
            <span className="material-symbols-outlined">event</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
