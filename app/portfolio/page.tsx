import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import VideoGrid from "@/components/VideoGrid";
import { longFormVideos, shortFormVideos } from "@/lib/videos";


export const metadata: Metadata = {
  title: "Portfolio | Abhay Mishra",
  description: "A curated collection of video editing work — long-form, short-form, thumbnails, and motion graphics.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio | Abhay Mishra",
    description: "Curated video editing portfolio.",
    url: "https://abhay-portfolio.vercel.app/portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Abhay Mishra",
    description: "Curated video editing portfolio.",
  },
};

export default function PortfolioPage() {
  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden min-h-screen">
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 top-1/2 right-[-100px]"></div>

      <section className="mb-12 pt-6 relative z-10">
        <div className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-4">
          Featured work
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-4 leading-tight">
          Portfolio <span className="gradient-text">Highlights</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          A curated selection of recent video editing projects across long-form, short-form, and motion graphics.
        </p>
      </section>

      <section className="relative z-10 space-y-16">
        <VideoGrid videos={longFormVideos} />
        <VideoGrid videos={shortFormVideos} vertical />
      </section>

      <section className="mt-16 relative z-10">
        <div className="glass-card rounded-3xl p-8 text-center max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-primary/5 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">
            See the full portfolio
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base mb-6">
            Browse all long-form edits, short-form reels, thumbnails, and case studies.
          </p>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all"
          >
            View all work
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
