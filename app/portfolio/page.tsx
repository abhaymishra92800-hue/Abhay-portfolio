import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import WorkShowcase from "@/components/WorkShowcase";
import VideoGrid from "@/components/VideoGrid";
import Testimonials from "@/components/Testimonials";
import { workCategories, longFormVideos, shortFormVideos } from "@/lib/videos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Portfolio | Abhay Mishra",
  description: "Long-form YouTube edits, shorts and reels, property and UGC ads, launch films, and faceless-channel explainers.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio | Abhay Mishra",
    description: "Long-form, shorts, ads, and films.",
    url: "https://abhay-editing-portfolio-website.vercel.app/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Abhay Mishra",
    description: "Long-form, shorts, ads, and films.",
  },
};

export default function PortfolioPage() {
  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden min-h-screen">
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 top-1/2 right-[-100px]"></div>

      <section className="mb-14 pt-10 relative z-10 text-center max-w-3xl mx-auto">
        <div className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-4">
          Selected work
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-on-surface mb-4 leading-tight">
          Work that <span className="gradient-text">grows</span> channels and brands
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          Long-form YouTube, shorts, ads, launch films, and explainers. Tap a video to hear it.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {[{ id: "long-form", eyebrow: "YouTube" }, ...workCategories].map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="text-xs font-bold text-primary bg-primary/10 hover:bg-primary hover:text-white px-3.5 py-1.5 rounded-full transition-colors"
            >
              {c.eyebrow}
            </a>
          ))}
        </div>
      </section>

      <section id="long-form" className="relative z-10 mb-20 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">YouTube</p>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Long-form edits</h2>
        </div>
        <VideoGrid videos={longFormVideos} />
        <div className="text-center mt-14 mb-8">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Short-form</p>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface">Shorts &amp; reels</h2>
        </div>
        <VideoGrid videos={shortFormVideos} vertical />
      </section>

      <section className="relative z-10">
        <WorkShowcase categories={workCategories} />
      </section>

      <Testimonials />

      <section className="mt-24 relative z-10">
        <div className="glass-card rounded-3xl p-8 text-center max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">Want a video like these?</h2>
          <p className="text-on-surface-variant text-sm md:text-base mb-6">
            Tell me what you&apos;re promoting and I&apos;ll reply within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={site.callHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">call</span>
              Book a call
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-surface border border-outline-variant hover:border-primary text-on-surface font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-all"
            >
              Send a message
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
