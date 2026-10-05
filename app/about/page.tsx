import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import { site, beliefs } from "@/lib/site";
import { workCategories } from "@/lib/videos";

export const metadata: Metadata = {
  title: "About",
  description:
    "Abhay Mishra is a freelance video editor from West Bengal, India. He makes property ads, UGC ads, launch films, and explainers built to convert.",
  alternates: { canonical: "/about" },
};

const makes = [
  { id: "real-estate-ads", icon: "apartment", title: "Property ads", desc: "Motion-graphic ads for real estate developers, in English and Bengali." },
  { id: "ugc-ads", icon: "smartphone", title: "UGC ads", desc: "Creator-style ads that feel native on Instagram and Reels." },
  { id: "location-films", icon: "movie", title: "Launch films", desc: "Cinematic project films with satellite zoom-ins and 4K footage." },
  { id: "explainers", icon: "lightbulb", title: "Explainers", desc: "Tech explainers and faceless YouTube channel shorts." },
].map((m) => ({ ...m, count: workCategories.find((c) => c.id === m.id)?.items.length ?? 0 }));

export default function AboutPage() {
  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden">
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 top-1/2 right-[-100px]"></div>

      {/* Intro */}
      <section className="flex flex-col-reverse lg:flex-row items-center gap-12 pt-16 pb-16 relative z-10 max-w-5xl mx-auto">
        <div className="w-full lg:w-3/5 text-center lg:text-left">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">About me</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface leading-tight mb-6">
            Hi, I&apos;m <span className="gradient-text">Abhay.</span>
          </h1>
          <div className="space-y-4 text-lg text-on-surface-variant leading-relaxed">
            <p>
              I&apos;m a freelance video editor based in {site.location}. I make ads and films that are
              built to sell: property ads for real estate developers, UGC-style ads for brands, launch
              films, and explainers.
            </p>
            <p>
              Every video starts with one question: what should the viewer do next? Book a visit, buy,
              or subscribe. Then I script, design, and edit the video around that action.
            </p>
          </div>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">
            <a
              href={site.callHref}
              target="_blank"
              rel="noreferrer"
              className="bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:scale-105 transition-all"
            >
              Book a call
            </a>
            <Link
              href="/portfolio"
              className="bg-surface border border-outline-variant hover:border-primary text-on-surface font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-all"
            >
              See my work
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-2/5">
          <div className="relative w-full aspect-[4/5] max-w-xs mx-auto rounded-3xl overflow-hidden glass-card p-3 shadow-2xl border border-white/60">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-tr from-indigo-100 to-purple-50">
              <Image src={site.photo} alt={site.name} fill sizes="320px" className="object-cover object-top" priority />
            </div>
          </div>
        </div>
      </section>

      {/* What I make */}
      <section className="py-12 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-10 text-center">What I make</h2>
        </ScrollReveal>
        <ScrollReveal stagger>
          <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
            {makes.map((m) => (
              <Link
                key={m.id}
                href={`/portfolio#${m.id}`}
                className="reveal group glass-card rounded-3xl p-7 text-center border border-outline-variant/40 hover:border-primary hover:-translate-y-1 hover:shadow-xl transition-all w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
              >
                <span className="material-symbols-outlined text-primary text-3xl mb-3 block">{m.icon}</span>
                <h3 className="text-lg font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">{m.title}</h3>
                <p className="text-xs font-bold text-primary mb-2">{m.count} projects</p>
                <p className="text-sm text-on-surface-variant leading-relaxed">{m.desc}</p>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* How I work */}
      <section className="py-12 relative z-10">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-10 text-center">How I work</h2>
        </ScrollReveal>
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {beliefs.map((b) => (
              <div key={b.title} className="reveal glass-card rounded-3xl p-7 text-center">
                <span className="material-symbols-outlined text-primary text-3xl mb-3 block">{b.icon}</span>
                <h3 className="text-lg font-bold text-on-surface mb-2">{b.title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <section className="py-16 relative z-10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface mb-4">Let&apos;s work together</h2>
        <p className="text-on-surface-variant mb-8">
          {site.email} · {site.phone}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={site.callHref}
            target="_blank"
            rel="noreferrer"
            className="bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:scale-105 transition-all"
          >
            Book a call
          </a>
          <Link
            href="/contact"
            className="bg-surface border border-outline-variant hover:border-primary text-on-surface font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-all"
          >
            Send a message
          </Link>
        </div>
      </section>
    </div>
  );
}
