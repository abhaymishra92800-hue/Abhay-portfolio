import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import { site, tools, services, beliefs } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Abhay Mishra | Video Editor & Social Media Manager",
  description:
    "Abhay Mishra is a freelance video editor and social media manager from West Bengal, India, working across YouTube, LinkedIn, and content automation.",
  alternates: { canonical: "/about" },
};


const linkedinStats = [
  { value: "0 → 424", label: "followers in 4 weeks" },
  { value: "13K+", label: "impressions" },
  { value: "3,054", label: "best single post" },
];

export default function AboutPage() {
  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden">
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 top-1/2 right-[-100px]"></div>

      {/* Intro */}
      <section className="flex flex-col lg:flex-row items-center gap-12 pt-16 pb-16 relative z-10">
        <div className="w-full lg:w-3/5">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">About me</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface leading-tight mb-6">
            Hi, I&apos;m <span className="gradient-text">Abhay.</span>
          </h1>
          <div className="space-y-4 text-lg text-on-surface-variant leading-relaxed max-w-2xl">
            <p>
              I&apos;m a freelance video editor and social media manager based in {site.location}. I
              edit long-form YouTube videos, podcasts, and shorts, and I run YouTube and LinkedIn
              accounts for creators and founders.
            </p>
            <p>
              Most businesses don&apos;t struggle to make content. They struggle to make it
              consistently. So alongside the editing, I build the systems behind it: AI-assisted
              drafting, a banked calendar, and automated scheduling, so posting doesn&apos;t depend on
              having a free hour every morning.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              href="/portfolio"
              className="bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:scale-105 transition-all"
            >
              See my work
            </Link>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="bg-surface border border-outline-variant hover:border-primary text-on-surface font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-all"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>

        <div className="w-full lg:w-2/5">
          <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden glass-card p-4 shadow-2xl border border-white/60">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-tr from-indigo-100 to-purple-50">
              <Image src={site.photo} alt={site.name} fill className="object-cover object-top" priority />
            </div>
          </div>
        </div>
      </section>

      {/* How I work */}
      <section className="py-16 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-10 text-center">How I work</h2>
        </ScrollReveal>
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beliefs.map((b) => (
              <div key={b.title} className="reveal glass-card rounded-3xl p-7">
                <span className="material-symbols-outlined text-primary text-3xl mb-3 block">{b.icon}</span>
                <h3 className="text-lg font-bold text-on-surface mb-2">{b.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* LinkedIn proof */}
      <section className="py-16 relative z-10">
        <div className="glass-card rounded-3xl p-8 md:p-12 bg-gradient-to-br from-indigo-50 to-purple-50">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Content automation, in practice</p>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">
            An automated LinkedIn account, built from zero
          </h2>
          <p className="text-on-surface-variant max-w-2xl mb-8">
            Automated trend research, AI-assisted drafts with a human voice check, and posts
            scheduled through the API every morning. About 10 minutes a day of my time, spent replying
            to comments.
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-xl">
            {linkedinStats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl md:text-4xl font-extrabold text-on-surface">{s.value}</p>
                <p className="text-xs text-on-surface-variant uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & tools */}
      <section className="py-16 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-6">What I do</h2>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s.title} className="flex items-center gap-3 text-on-surface">
                <span className="material-symbols-outlined text-primary">{s.icon}</span>
                <span className="font-semibold">{s.title}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-6">Tools</h2>
          <div className="flex flex-wrap gap-2">
            {tools.map((t) => (
              <span key={t} className="text-sm font-semibold text-primary bg-primary/10 px-4 py-2 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface mb-4">Let&apos;s work together</h2>
        <p className="text-on-surface-variant mb-8">
          {site.email} · {site.phone}
        </p>
        <Link
          href="/contact"
          className="bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:scale-105 transition-all"
        >
          Get in touch
        </Link>
      </section>
    </div>
  );
}
