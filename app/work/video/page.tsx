import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import VideoGrid from "@/components/VideoGrid";
import { longFormVideos, shortFormVideos } from "@/lib/videos";


export const metadata: Metadata = {
  title: "Video Portfolio | Abhay Mishra",
  description: "Full video portfolio showcasing long-form edits, short-form reels, and motion graphics by Abhay Mishra.",
  alternates: { canonical: "/work/video" },
  openGraph: {
    title: "Video Portfolio | Abhay Mishra",
    description: "Full video portfolio showcasing editing craft.",
    url: "https://abhay-portfolio.vercel.app/work/video",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Video Portfolio | Abhay Mishra",
    description: "Full video portfolio showcasing editing craft.",
  },
};

export default function VideoPage() {
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
          Full Portfolio
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-4 leading-tight">
          Video <span className="gradient-text">Portfolio</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Every project, every format, every result. Long-form edits, short-form reels, and everything in between.
        </p>
      </section>

      <section className="relative z-10 space-y-16">
        <VideoGrid videos={longFormVideos} />
        <VideoGrid videos={shortFormVideos} vertical />
      </section>

      <section className="mt-16 relative z-10">
        <div className="glass-card rounded-3xl p-10 text-center max-w-3xl mx-auto bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
            Want your work featured here?
          </h2>
          <p className="text-on-surface-variant text-base mb-8 max-w-xl mx-auto leading-relaxed">
            I work with 2 clients at a time. If your channel is ready to grow, let us talk.
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
