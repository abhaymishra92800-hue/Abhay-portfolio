import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import VideoGrid from "@/components/VideoGrid";
import { longFormVideos } from "@/lib/videos";


export const metadata: Metadata = {
  title: "Long-form Video Edits | Abhay Mishra",
  description: "Long-form YouTube edits, podcast episode cuts, and VSLs edited by Abhay Mishra. 8 to 25 minute videos with retention-first pacing.",
  alternates: { canonical: "/work/long-form" },
  openGraph: {
    title: "Long-form Video Edits | Abhay Mishra",
    description: "Long-form YouTube, podcast, and VSL edits.",
    url: "https://abhay-portfolio.vercel.app/work/long-form",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Long-form Video Edits | Abhay Mishra",
    description: "Long-form YouTube, podcast, and VSL edits.",
  },
};

export default function LongFormPage() {
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
          Long-form
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-4 leading-tight">
          Long-form <span className="gradient-text">Video Edits</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          YouTube episodes, podcast cuts, and VSLs. 8 to 25 minutes, retention
          first. Click any tile to watch the full video.
        </p>
      </section>

      <section className="relative z-10"><VideoGrid videos={longFormVideos} /></section>

      <section className="mt-16 relative z-10">
        <div className="glass-card rounded-3xl p-8 text-center max-w-3xl mx-auto bg-gradient-to-br from-indigo-50 to-indigo-100 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">
            Need long-form editing for your channel?
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base mb-6">
            Book a call and we will look at your last 5 videos together.
          </p>
          <Link
            href="/contact?service=content-engine"
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
