import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Abhay Mishra | Content Operator & Growth Partner",
  description: "Abhay Mishra runs content operations for coaches, authors, and founders across YouTube and LinkedIn. Founder of Abhay 4u, working with clients worldwide.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Abhay Mishra | Content Operator & Growth Partner",
    description: "Founder of Abhay 4u. Runs content operations for coaches, authors, and founders across YouTube and LinkedIn.",
    url: "https://abhay-portfolio.vercel.app/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Abhay Mishra | Content Operator & Growth Partner",
    description: "Founder of Abhay 4u. Runs content operations for coaches, authors, and founders across YouTube and LinkedIn.",
  },
};

const stats = [
  { value: "50+", label: "Channels served" },
  { value: "5+", label: "Years in content" },
  { value: "2", label: "Platforms run daily" },
  { value: "5", label: "Continents of clients" },
];

const story = [
  {
    year: "Where it started",
    title: "I started with a YouTube channel, not a service business.",
    body: "I launched my first YouTube channel to learn the craft. Editing my own videos, writing my own titles, designing my own thumbnails. I learned what works because the channel would not lie to me — either it grew or it did not.",
  },
  {
    year: "Then",
    title: "I started taking freelance editing work.",
    body: "Coaches and creators started asking if I could edit their videos too. I said yes, took on client work alongside my own channels, and that is when the real education began. Every project taught me what a paid client actually needs, which is different from what an algorithm rewards.",
  },
  {
    year: "Now",
    title: "I run content operations, not just edits.",
    body: "Today I work with a small group of clients as their content operator. That means strategy, scripts, edits, thumbnails, LinkedIn content, and reporting — all of it. I built the playbook for my own channels and now I apply it to client work, week in and week out.",
  },
];

const milestones = [
  {
    year: "Now",
    title: "Content operator & growth partner",
    desc: "I run end-to-end content operations for a small number of clients — YouTube, LinkedIn, and paid media. The work is the same as what I built for my own channels: a system that ships every week.",
    tag: "Founder, Abhay 4u",
  },
  {
    year: "2021 — 2023",
    title: "Built a content operation from my own channels",
    desc: "Spent two years running my own YouTube channels end to end. That is where the playbook came from — script, edit, publish, measure, repeat. It is what I now apply to every client.",
    tag: "Operator",
  },
  {
    year: "2019 — 2021",
    title: "Went deep on video editing for creators and brands",
    desc: "Edited long-form YouTube, shorts, VSLs, and podcast episodes for paying clients. Learned what actually moves the needle on retention, and what does not.",
    tag: "Specialist",
  },
];

const results = [
  { metric: "+38%", label: "Course signup rate", client: "Victor Chan, Launch Excel" },
  { metric: "1,200+", label: "Podcast listens in 30 days", client: "Harjeet Dhillon" },
  { metric: "6 hrs/wk", label: "Production time saved", client: "Blake Reddy" },
];

const trustedBy = [
  { name: "Victor Chan", role: "Launch Excel", icon: "smart_display" },
  { name: "Harjeet Dhillon", role: "Author & Actress", icon: "auto_stories" },
  { name: "Dr. Maurice Maurer", role: "Science Educator", icon: "school" },
  { name: "Blake Reddy", role: "Wealth Adviser", icon: "account_balance" },
];

export default function AboutPage() {
  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden">
      <div className="ambient-glow top-0 right-0"></div>
      <div className="ambient-glow-2 top-1/3 left-0"></div>

      {/* Hero */}
      <section className="flex flex-col lg:flex-row items-center gap-12 mb-16 relative z-10 pt-4">
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary font-semibold text-xs tracking-wide uppercase w-fit">
            About
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface leading-tight">
            Hi, I&apos;m <span className="gradient-text">Abhay.</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-xl">
            I run content operations for coaches, authors, and founders across
            YouTube and LinkedIn. Strategy, production, and growth, handled.
            You show up and approve. I ship.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {["YouTube Operations", "LinkedIn Funnels", "Production Systems", "Paid Media"].map((tag) => (
              <span
                key={tag}
                className="bg-secondary-container text-primary px-4 py-2 rounded-full font-semibold text-xs shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <div className="relative w-full aspect-square max-w-md mx-auto rounded-3xl overflow-hidden glass-card p-4 shadow-2xl border border-white/60">
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-tr from-indigo-100 to-purple-50">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAONq_-LpwLrjyzi_TMnOoIPeIcZ04gIKRPw3fCV_qXZgnCjM4RQf4LG1WlprBdUN2f5R9C4a835k1yK0KWjOE6rB--wLfc277mjI7w2Hc8caPWC5df-o_cL88SOhdo2QCBzsvzUQ3DCgwIPSBk69Ig9xxhJlx0YERJx6KbCY3NICthAi9jb99FKXTxJ6s30R1-GFRfP8dPp2FllUSrzKZO_zEpQfDn2dyXm0_NKNHe0MGlnDZ4i9EwBnW5rw9enozwcNQHwpdEX4Li_N8"
                alt="Abhay Mishra"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="mb-16 relative z-10">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-8 md:p-10 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {stats.map((s) => (
              <div key={s.label}>
                <h3 className="text-3xl md:text-4xl font-extrabold mb-1">
                  {s.value}
                </h3>
                <p className="text-sm font-medium text-indigo-100">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* My Story */}
      <section className="mb-20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            My story
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
            How I got here
          </h2>
        </div>
        <div className="space-y-5">
          {story.map((s) => (
            <div
              key={s.title}
              className="glass-card rounded-3xl p-7 md:p-9 border border-outline-variant/40 hover:border-primary/40 transition-all"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
                {s.year}
              </p>
              <h3 className="text-xl md:text-2xl font-bold text-on-surface mb-3">
                {s.title}
              </h3>
              <p className="text-on-surface-variant text-base leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* What I do (3 sentences) */}
      <section className="mb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: "smart_display",
              title: "YouTube operations",
              desc: "Strategy, scripts, edits, thumbnails, SEO, and reporting — every week, without you having to manage it.",
            },
            {
              icon: "hub",
              title: "LinkedIn funnels",
              desc: "Profile, content pillars, and a posting rhythm that turns your existing network into booked calls.",
            },
            {
              icon: "campaign",
              title: "Paid media",
              desc: "Google and LinkedIn ad campaigns built for leads, tracked end to end, and optimised monthly.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="glass-card rounded-2xl p-6 border border-outline-variant/40"
            >
              <span className="material-symbols-outlined text-primary text-3xl mb-3 block">
                {item.icon}
              </span>
              <h3 className="text-lg font-bold text-on-surface mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones (compressed to 3) */}
      <section className="mb-16 relative z-10">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            How I got here
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface">
            Three stops, one playbook.
          </h2>
        </div>
        <div className="relative border-l-2 border-secondary-container ml-4 md:ml-8 pl-8 flex flex-col gap-10">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative group">
              <div
                className={`absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 ${
                  idx === 0
                    ? "bg-primary border-primary scale-125 shadow-lg shadow-indigo-500/50"
                    : "bg-surface-container-lowest border-outline-variant group-hover:border-primary group-hover:scale-125"
                } transition-all duration-300`}
              ></div>
              <div className="flex flex-col md:flex-row gap-4 md:gap-8 md:items-baseline">
                <div className="md:w-1/4">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      idx === 0 ? "text-primary" : "text-on-surface-variant"
                    }`}
                  >
                    {m.year}
                  </span>
                  <h3 className="text-lg font-bold text-on-surface mt-1 leading-snug">
                    {m.title}
                  </h3>
                </div>
                <div className="md:w-3/4 glass-card p-5 rounded-2xl">
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-2">
                    {m.desc}
                  </p>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">
                    {m.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Results strip */}
      <section className="mb-16 relative z-10">
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Results
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-on-surface">
            What working with me actually looks like.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map((r) => (
            <div
              key={r.client}
              className="glass-card rounded-2xl p-6 border border-outline-variant/40 text-center"
            >
              <div className="text-3xl md:text-4xl font-extrabold text-primary mb-1">
                {r.metric}
              </div>
              <div className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">
                {r.label}
              </div>
              <div className="text-sm text-on-surface">{r.client}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Trusted By */}
      <section className="mb-16 relative z-10">
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Trusted by
          </p>
          <h2 className="text-xl md:text-2xl font-bold text-on-surface">
            Creators and brands I work with
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trustedBy.map((client) => (
            <div
              key={client.name}
              className="glass-card rounded-2xl py-5 px-4 flex flex-col items-center justify-center text-center gap-1 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="material-symbols-outlined text-primary/70 text-2xl">
                {client.icon}
              </span>
              <span className="font-bold text-on-surface text-sm">
                {client.name}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">
                {client.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Work With Me CTA */}
      <section className="mb-8 relative z-10">
        <div className="glass-card rounded-3xl p-10 md:p-14 relative overflow-hidden bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
                Work with me
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface mb-4">
                Let us work on your content together.
              </h2>
              <p className="text-on-surface-variant text-base leading-relaxed mb-6">
                Book a free 20-minute call. We will look at your content and
                your goals together, and I will tell you if I can help. No
                pitch deck, no pressure.
              </p>
              <ul className="space-y-2">
                {[
                  "Free 20-minute strategy call",
                  "Tailored plan across YouTube, LinkedIn, or paid",
                  "Monthly reporting on what is working",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm text-on-surface"
                  >
                    <span className="material-symbols-outlined text-emerald-600 text-base">
                      check_circle
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform hover:bg-primary-container"
              >
                Book a strategy call
                <span className="material-symbols-outlined">event</span>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 border-2 border-primary/40 text-on-surface font-semibold px-8 py-4 rounded-full hover:border-primary hover:text-primary transition-all text-center justify-center"
              >
                See plans and pricing
                <span className="material-symbols-outlined">sell</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
