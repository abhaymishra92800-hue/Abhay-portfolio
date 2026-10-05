"use client";

import { useState } from "react";
import type { Work, WorkCategory } from "@/lib/videos";

// Click-to-play grid for the ad work. Posters load first; the video file is
// only fetched when a card is clicked.

function Card({ w }: { w: Work }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="group">
      <div
        className={`relative overflow-hidden rounded-2xl bg-black shadow-md border border-outline-variant/40 group-hover:shadow-xl transition-shadow ${
          w.landscape ? "aspect-video" : "aspect-[9/16]"
        }`}
      >
        {playing ? (
          <video src={w.src} poster={w.poster} controls autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={`Play ${w.title}`} className="absolute inset-0 w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={w.poster} alt={w.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-5xl drop-shadow-lg group-hover:scale-110 transition-transform" aria-hidden="true">
                play_circle
              </span>
            </span>
            {w.lang && (
              <span className="absolute top-2 left-2 text-[10px] font-bold text-white bg-black/55 backdrop-blur px-2 py-0.5 rounded-full">
                {w.lang}
              </span>
            )}
          </button>
        )}
      </div>
      <figcaption className="mt-2.5">
        <p className="text-sm font-bold text-on-surface leading-tight">{w.title}</p>
        <p className="text-xs text-on-surface-variant">{w.client}</p>
      </figcaption>
    </figure>
  );
}

export default function WorkShowcase({ categories, limit }: { categories: WorkCategory[]; limit?: number }) {
  return (
    <div className="space-y-20">
      {categories.map((c) => {
        const items = limit ? c.items.slice(0, limit) : c.items;
        const wide = items.filter((i) => i.landscape);
        const tall = items.filter((i) => !i.landscape);
        return (
          <div key={c.id} id={c.id} className="scroll-mt-24">
            <div className="max-w-2xl mb-8">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{c.eyebrow}</p>
              <h3 className="text-2xl md:text-3xl font-bold text-on-surface mb-2">{c.title}</h3>
              <p className="text-on-surface-variant">{c.blurb}</p>
            </div>
            {wide.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_0.5fr] gap-5 items-start">
                {[...wide, ...tall].map((w) => (
                  <Card key={w.src} w={w} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {tall.map((w) => (
                  <Card key={w.src} w={w} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
