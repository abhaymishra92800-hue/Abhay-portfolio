"use client";

import { useEffect, useRef, useState } from "react";

type Props = { id: string; title: string; start?: number; className?: string };

// Silent looping YouTube preview for background use. Shows the thumbnail first and
// only loads the player once the card is near the screen. Not clickable.
export default function YouTubeLoop({ id, title, start = 0, className = "" }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setLive(true);
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&modestbranding=1&rel=0&disablekb=1&start=${start}`;

  return (
    <div ref={wrap} className={`relative overflow-hidden bg-black ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      {live && (
        <iframe
          src={src}
          title={title}
          allow="autoplay; encrypted-media"
          tabIndex={-1}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full pointer-events-none scale-[1.35]"
        />
      )}
    </div>
  );
}
