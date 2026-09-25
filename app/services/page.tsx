import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ScrollReveal";
import { site, services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services | Abhay Mishra",
  description:
    "Video editing, shorts and reels, YouTube channel management, LinkedIn management, and content automation by Abhay Mishra.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden min-h-screen">
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 top-1/2 right-[-100px]"></div>

      <section className="pt-16 pb-12 relative z-10 max-w-3xl">
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Services</p>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-6 leading-tight">
          What I can <span className="gradient-text">do for you</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          Take one service or combine them. Every project starts with a short brief so we agree on
          what a finished piece looks like before I start.
        </p>
      </section>

      <ScrollReveal stagger>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {services.map((s) => (
            <div key={s.title} className="reveal glass-card rounded-3xl p-8 border border-outline-variant/40">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-2xl">{s.icon}</span>
              </div>
              <h2 className="text-2xl font-bold text-on-surface mb-2">{s.title}</h2>
              <p className="text-on-surface-variant leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tools.map((t) => (
                  <span key={t} className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      </ScrollReveal>

      <section className="mt-16 relative z-10">
        <div className="glass-card rounded-3xl p-10 text-center max-w-3xl mx-auto bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">Tell me about your project</h2>
          <p className="text-on-surface-variant mb-6">
            {site.email} · {site.phone}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:scale-105 transition-all"
            >
              Get in touch
            </Link>
            <Link
              href="/portfolio"
              className="bg-surface border border-outline-variant hover:border-primary text-on-surface font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-all"
            >
              See my work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
