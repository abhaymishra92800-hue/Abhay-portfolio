import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thumbnails & Graphics | Abhay Mishra",
  description: "Custom YouTube thumbnails, channel art, and motion graphics by Abhay Mishra. Built for click-through and brand consistency.",
  alternates: { canonical: "/work/thumbnails" },
  openGraph: {
    title: "Thumbnails & Graphics | Abhay Mishra",
    description: "Custom YouTube thumbnails and channel graphics.",
    url: "https://abhay-portfolio.vercel.app/work/thumbnails",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thumbnails & Graphics | Abhay Mishra",
    description: "Custom YouTube thumbnails and channel graphics.",
  },
};

const thumbnails = [
  {
    src: "https://anuj4u.in/wp-content/uploads/2025/03/victor-chan.jpg",
    title: "Launch Excel — VSL thumbnail",
    desc: "Conversion-focused thumbnail with hook text and brand palette.",
    client: "Victor Chan",
  },
  {
    src: "https://anuj4u.in/wp-content/uploads/2025/03/harjeet-dhillon-1-1.png",
    title: "Author channel — episode cover",
    desc: "Author brand across podcast thumbnails with consistent color language.",
    client: "Harjeet Dhillon",
  },
  {
    src: "https://anuj4u.in/wp-content/uploads/2025/03/maurice-maurer.png",
    title: "Science channel — custom graphic",
    desc: "Clean, authoritative design that communicates credibility at a glance.",
    client: "Dr. Maurice Maurer",
  },
  {
    src: "https://anuj4u.in/wp-content/uploads/2025/03/blake-pic-website-1.png",
    title: "Wealth adviser — podcast cover",
    desc: "Premium feel, authority colour palette, name-forward design.",
    client: "Blake Reddy",
  },
  {
    src: "https://anuj4u.in/wp-content/uploads/2025/03/ross.jpeg",
    title: "Coaching channel — episode thumbnail",
    desc: "Emotional hook image with bold text overlay.",
    client: "Ross",
  },
  {
    src: "https://anuj4u.in/wp-content/uploads/2025/11/Thumbnails-and-graphics-cover-768x432.jpg",
    title: "Channel cover — thumbnails showcase",
    desc: "Sample grid showing range across education, podcast, and coaching niches.",
    client: "Various",
  },
];

function ThumbnailTile({
  src,
  title,
  desc,
  client,
}: {
  src: string;
  title: string;
  desc: string;
  client: string;
}) {
  return (
    <div className="group glass-card rounded-2xl overflow-hidden border border-outline-variant/40 hover:-translate-y-1 hover:shadow-xl transition-all">
      <div className="relative aspect-video bg-surface-variant">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
          {client}
        </p>
        <h3 className="text-base font-bold text-on-surface mb-1">{title}</h3>
        <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

export default function ThumbnailsPage() {
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
          Graphics
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-4 leading-tight">
          Thumbnails <span className="gradient-text">& Graphics</span>
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed">
          Custom YouTube thumbnails, channel art, and motion graphics. Click-through
          driven, brand-consistent, built for each creator.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {thumbnails.map((t) => (
          <ThumbnailTile key={t.title} {...t} />
        ))}
      </section>

      <section className="mt-16 relative z-10">
        <div className="glass-card rounded-3xl p-8 text-center max-w-3xl mx-auto bg-gradient-to-br from-amber-50 to-orange-100 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-3">
            Need thumbnails for your channel?
          </h2>
          <p className="text-on-surface-variant text-sm md:text-base mb-6">
            Send me your last 3 thumbnails and I will redesign them with the
            click-through data to back it up.
          </p>
          <Link
            href="/contact?service=content-engine"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all"
          >
            Get thumbnails done
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
