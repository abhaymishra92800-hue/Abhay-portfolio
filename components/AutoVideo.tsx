"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  title: string;
  className?: string;
  badge?: string;
  quiet?: boolean; // background use: no sound button
};

// Muted looping preview. The file loads when the card nears the screen, plays
// while it is mostly visible, and pauses when scrolled away. Tap to hear it.
// Visitors who prefer reduced motion get the poster and a play button instead.
export default function AutoVideo({ src, poster, title, className = "", badge, quiet = false }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);
  const [muted, setMuted] = useState(true);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const load = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setNear(true);
      },
      { rootMargin: "300px" }
    );
    const play = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold: 0.5 }
    );
    load.observe(el);
    play.observe(el);
    return () => {
      load.disconnect();
      play.disconnect();
    };
  }, []);

  const live = near && (!reduced || manual);

  // Play while mostly visible, pause otherwise. A language switch changes src and replays.
  useEffect(() => {
    const vid = video.current;
    if (!vid) return;
    if (visible) vid.play().catch(() => {});
    else vid.pause();
  }, [visible, live, src]);

  return (
    <div ref={wrap} className={`relative overflow-hidden bg-black ${className}`}>
      {live ? (
        <video
          ref={video}
          src={src}
          poster={poster}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          aria-label={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt={title} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
      )}

      {reduced && !manual ? (
        <button type="button" onClick={() => setManual(true)} aria-label={`Play ${title}`} className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-5xl drop-shadow-lg" aria-hidden="true">
            play_circle
          </span>
        </button>
      ) : quiet ? null : (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? `Unmute ${title}` : `Mute ${title}`}
          className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/55 backdrop-blur text-white flex items-center justify-center hover:bg-black/75 transition-colors"
        >
          <span className="material-symbols-outlined text-lg" aria-hidden="true">
            {muted ? "volume_off" : "volume_up"}
          </span>
        </button>
      )}

      {badge && (
        <span className="absolute top-2 left-2 text-[10px] font-bold text-white bg-black/55 backdrop-blur px-2 py-0.5 rounded-full pointer-events-none">
          {badge}
        </span>
      )}
    </div>
  );
}
