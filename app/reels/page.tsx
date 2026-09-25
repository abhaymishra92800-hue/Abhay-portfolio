import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import VideoGrid from "@/components/VideoGrid";
import { shortFormVideos } from "@/lib/videos";


export const metadata: Metadata = {
  title: "Reels & Shorts | Abhay Mishra",
  description: "Engaging short-form reels and YouTube Shorts. Vertical clips for social media that stop the scroll.",
  alternates: { canonical: "/reels" },
  openGraph: {
    title: "Reels & Shorts | Abhay Mishra",
    description: "Engaging short-form reels and YouTube Shorts.",
    url: "https://abhay-portfolio.vercel.app/reels",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Reels & Shorts | Abhay Mishra",
    description: "Engaging short-form reels and YouTube Shorts.",
  },
};

export default function ReelsPage() {
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
          Short-form
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-4 leading-tight">
          Reels <span className="gradient-text">& Shorts</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Scroll-stopping vertical content for YouTube Shorts, Instagram Reels, and LinkedIn. Click any tile to watch.
        </p>
      </section>

      <section className="relative z-10"><VideoGrid videos={shortFormVideos} vertical /></section>

      <section className="mt-16 relative z-10">
        <div className="glass-card rounded-3xl p-8 text-center max-w-3xl mx-auto bg-gradient-to-br from-cyan-50 to-cyan-100 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">
            Need short-form content that converts?
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base mb-6">
            Tell me your channel, your cadence, and your best-performing video so far.
          </p>
          <Link
            href="/contact?service=production-pod"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all"
          >
            Book a strategy call
            <span className="material-symbols-outlined">event</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
