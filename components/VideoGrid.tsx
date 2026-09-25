"use client";

import { useState } from "react";
import Image from "next/image";
import type { Video } from "@/lib/videos";

type Props = {
  videos: Video[];
  vertical?: boolean;
};

// Click-to-play grid: shows the YouTube thumbnail, swaps in the embed on click
// so the page doesn't load a dozen iframes up front.
export default function VideoGrid({ videos, vertical = false }: Props) {
  const [playing, setPlaying] = useState<string | null>(null);

  const gridCols = vertical
    ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-6"
    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  const aspect = vertical ? "aspect-[9/16]" : "aspect-video";
  const thumb = vertical ? "oar2" : "hqdefault";

  return (
    <div className={`grid ${gridCols} gap-5`}>
      {videos.map((v) => (
        <article
          key={v.id}
          className="group glass-card rounded-2xl overflow-hidden border border-outline-variant/40 hover:-translate-y-1 hover:shadow-xl transition-all bg-surface-container-lowest"
        >
          <div className={`relative ${aspect} bg-black`}>
            {playing === v.id ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(v.id)}
                aria-label={`Play ${v.title}`}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={`https://i.ytimg.com/vi/${v.id}/${thumb}.jpg`}
                  alt={v.title}
                  fill
                  sizes={vertical ? "(max-width: 768px) 50vw, 16vw" : "(max-width: 768px) 100vw, 33vw"}
                  className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-5xl drop-shadow-lg group-hover:scale-110 transition-transform" aria-hidden="true">
                    play_circle
                  </span>
                </span>
              </button>
            )}
          </div>
          <div className="p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">{v.client}</p>
            <h3 className={`font-bold text-on-surface leading-snug line-clamp-2 ${vertical ? "text-xs" : "text-sm"}`}>
              {v.title}
            </h3>
          </div>
        </article>
      ))}
    </div>
  );
}
