"use client";

import { useState } from "react";
import AutoVideo from "@/components/AutoVideo";
import type { Work, WorkCategory } from "@/lib/videos";

// Autoplaying muted previews, grouped by category. One card per project; extra
// languages become a switch on the card. "Show more" reveals the rest.

function Card({ w }: { w: Work }) {
  const [idx, setIdx] = useState(0);
  const ver = w.versions[idx];
  return (
    <figure>
      <div className={`rounded-2xl shadow-md border border-outline-variant/40 overflow-hidden ${w.landscape ? "aspect-video" : "aspect-[9/16]"}`}>
        <AutoVideo
          key={w.title}
          src={ver.src}
          poster={ver.poster}
          title={w.title}
          badge={w.tag ?? (w.versions.length === 1 ? ver.lang : undefined)}
          className="w-full h-full"
        />
      </div>
      <figcaption className="mt-2.5">
        <p className="text-sm font-bold text-on-surface leading-tight">{w.title}</p>
        <p className="text-xs text-on-surface-variant">{w.client}</p>
        {w.versions.length > 1 && (
          <div className="flex gap-1.5 mt-2" role="group" aria-label={`${w.title} language`}>
            {w.versions.map((x, i) => (
              <button
                key={x.src}
                type="button"
                onClick={() => setIdx(i)}
                aria-pressed={i === idx}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition-colors ${
                  i === idx
                    ? "bg-primary text-white border-primary"
                    : "bg-surface text-on-surface-variant border-outline-variant hover:border-primary"
                }`}
              >
                {x.lang}
              </button>
            ))}
          </div>
        )}
      </figcaption>
    </figure>
  );
}

function Category({ c, initial }: { c: WorkCategory; initial?: number }) {
  const [open, setOpen] = useState(false);
  const limit = initial && !open ? initial : c.items.length;
  const items = c.items.slice(0, limit);
  const hidden = c.items.length - items.length;
  const hasWide = c.items.some((i) => i.landscape);

  return (
    <div id={c.id} className="scroll-mt-24">
      <div className="max-w-2xl mb-8">
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">{c.eyebrow}</p>
        <h3 className="text-2xl md:text-3xl font-bold text-on-surface mb-2">{c.title}</h3>
        <p className="text-on-surface-variant">{c.blurb}</p>
      </div>
      <div
        className={
          hasWide
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_0.5fr] gap-5 items-start"
            : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        }
      >
        {[...items.filter((i) => i.landscape), ...items.filter((i) => !i.landscape)].map((w) => (
          <Card key={w.title} w={w} />
        ))}
      </div>
      {(hidden > 0 || open) && initial !== undefined && c.items.length > initial && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-primary border border-primary/40 hover:bg-primary hover:text-white px-5 py-2.5 rounded-full transition-colors"
        >
          {open ? "Show less" : `Show ${hidden} more`}
          <span className="material-symbols-outlined text-base" aria-hidden="true">
            {open ? "expand_less" : "expand_more"}
          </span>
        </button>
      )}
    </div>
  );
}

export default function WorkShowcase({ categories, initial }: { categories: WorkCategory[]; initial?: number }) {
  return (
    <div className="space-y-20">
      {categories.map((c) => (
        <Category key={c.id} c={c} initial={initial} />
      ))}
    </div>
  );
}
