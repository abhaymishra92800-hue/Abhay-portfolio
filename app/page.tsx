"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import { AbTest } from "@/components/AbTest";
import { EmailCapture } from "@/components/EmailCapture";
import VideoGrid from "@/components/VideoGrid";
import { longFormVideos, shortFormVideos } from "@/lib/videos";

const trustLogos = [
  { name: "Victor Chan", role: "Launch Excel", image: "https://anuj4u.in/wp-content/uploads/2025/03/victor-chan.jpg" },
  { name: "Harjeet Dhillon", role: "Author & Actress", image: "https://anuj4u.in/wp-content/uploads/2025/03/harjeet-dhillon-1-1.png" },
  { name: "Dr. Maurice Maurer", role: "Science Educator", image: "https://anuj4u.in/wp-content/uploads/2025/03/maurice-maurer.png" },
  { name: "Blake Reddy", role: "Wealth Adviser", image: "https://anuj4u.in/wp-content/uploads/2025/03/blake-pic-website-1-1.png" },
];

const offers = [
  {
    title: "Content Engine",
    price: "$2,500/mo",
    icon: "rocket_launch",
    color: "from-indigo-500/20 to-purple-500/20",
    iconColor: "text-indigo-600",
    bg: "bg-indigo-500/10",
    desc: "Full YouTube and LinkedIn operation. Strategy, scripts, edits, thumbnails, captions, posting, and reporting, all in one retainer.",
    for: "For coaches, authors, and founders who post but aren't growing.",
    deliverables: [
      "Up to 8 edited videos per month",
      "Content calendar and strategy",
      "Thumbnails and SEO descriptions",
      "Weekly performance reporting",
    ],
  },
  {
    title: "LinkedIn Funnel System",
    price: "$800/mo",
    icon: "hub",
    color: "from-purple-500/20 to-pink-500/20",
    iconColor: "text-purple-600",
    bg: "bg-purple-500/10",
    desc: "The system I built for myself, applied to your LinkedIn. Profiles, content pillars, and a posting rhythm that turns views into calls.",
    for: "For consultants and B2B founders who want leads from LinkedIn without spending all day on it.",
    deliverables: [
      "Profile and headline rewrite",
      "3 content pillars built for your ICP",
      "12-16 posts drafted and scheduled per month",
      "Monthly lead and engagement report",
    ],
    featured: true,
  },
  {
    title: "Content Production System",
    price: "$1,500/mo",
    icon: "movie_edit",
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-600",
    bg: "bg-amber-500/10",
    desc: "A reusable video production system: templates, hooks, B-roll libraries, SOPs, and editor training. I build the machine, your team runs it.",
    for: "For agencies and small teams that need a faster, repeatable content production system without scaling headcount.",
    deliverables: [
      "Production workflow audit and rebuild",
      "Templates for intros, hooks, CTAs, and B-roll",
      "Editor training and full SOPs",
      "Monthly workflow reviews",
    ],
  },
];

const caseStudies = [
  {
    client: "Victor Chan · Launch Excel",
    metric: "+38%",
    metricLabel: "course signup rate",
    tag: "Content Engine",
    desc: "Re-cut the VSL with a stronger hook, tighter pacing, and on-screen proof points. Launched the same week as the price increase.",
  },
  {
    client: "Harjeet Dhillon · Author & Actress",
    metric: "1,200+",
    metricLabel: "listens in 30 days",
    tag: "Content Engine",
    desc: "Built the full launch stack: edits, thumbnails, SEO descriptions, and a posting calendar. Zero paid promotion in month one.",
  },
  {
    client: "Blake Reddy · Wealth Adviser",
    metric: "6 hrs/wk",
    metricLabel: "of production time saved",
    tag: "Content Production System",
    desc: "Designed a reusable short-form template system and clip selection workflow that the client runs himself now.",
  },
];

const freeTools = [
  {
    title: "LinkedIn Funnel",
    desc: "Get a 3-step funnel plan for your LinkedIn profile in under 2 minutes.",
    href: "/linkedin-funnel",
    icon: "hub",
    color: "text-blue-600 bg-blue-500/10",
  },
  {
    title: "Reel Hooks",
    desc: "Generate 10 scroll-stopping hook ideas for your next short-form video.",
    href: "/reel-hooks",
    icon: "movie_filter",
    color: "text-pink-600 bg-pink-500/10",
  },
  {
    title: "YouTube Audit",
    desc: "Score your channel on 5 growth levers and get a one-page action plan.",
    href: "/youtube-audit",
    icon: "analytics",
    color: "text-red-600 bg-red-500/10",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Strategy call",
    desc: "20 minutes to understand your goals, current content, and where you are stuck.",
  },
  {
    step: "02",
    title: "We build and run it",
    desc: "Strategy, edits, posts, and ads, all produced and shipped on a weekly rhythm.",
  },
  {
    step: "03",
    title: "You grow",
    desc: "Monthly reporting on what worked, what didn't, and what we are doubling down on.",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background ambient light */}
      <div className="ambient-glow -top-24 -left-24"></div>
      <div className="ambient-glow-2 top-1/2 -right-24"></div>

      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500 flex flex-col justify-center pt-32 pb-16 overflow-hidden border-b border-outline-variant/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 w-full flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface mb-6 leading-tight tracking-tight">
              Get more clients from content{" "}
              <span className="gradient-text drop-shadow-sm">without burning out.</span>
            </h1>

            <p className="text-lg md:text-xl text-on-surface-variant mb-8 max-w-xl leading-relaxed">
              I help coaches, authors, and founders turn content into clients
              through YouTube and LinkedIn. Strategy, production, and growth,
              handled.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <AbTest
                experiment="hero_cta"
                variantA={
                  <Link
                  href="/contact"
                  className="bg-primary hover:bg-primary-container text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 flex items-center gap-2"
                  aria-label="Book a strategy call"
                >
                  Book a strategy call
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">arrow_forward</span>
                </Link>
                }
                variantB={
                  <Link
                    href="/linkedin-funnel-system"
                    className="bg-primary hover:bg-primary-container text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    See the LinkedIn Funnel System
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                  </Link>
                }
              />
              <Link
                href="/free-tools"
                className="bg-surface-container-lowest hover:bg-surface-container border border-outline-variant/60 text-on-surface font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-sm hover:scale-105 flex items-center gap-2"
                aria-label="Try a free tool"
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">bolt</span>
                Try a free tool
              </Link>
            </div>


          </div>

          {/* Right: portrait card with stats overlay */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              <div className="absolute flex -left-2 sm:-left-3 md:-left-6 top-6 sm:top-10 w-9 h-9 sm:w-10 sm:h-10 md:w-14 md:h-14 bg-white rounded-full items-center justify-center shadow-xl z-20 animate-bounce p-1.5 sm:p-2 md:p-3 border border-indigo-100" style={{ animationDuration: "3s" }}>
                <span className="material-symbols-outlined text-red-600 text-lg sm:text-xl md:text-2xl">smart_display</span>
              </div>
              <div className="absolute flex -right-1 sm:-right-2 md:-right-4 top-1/3 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white rounded-full items-center justify-center shadow-xl z-20 p-1.5 sm:p-2 md:p-3 border border-blue-100">
                <span className="material-symbols-outlined text-blue-600 text-lg sm:text-xl md:text-2xl">work</span>
              </div>
              <div className="absolute flex left-1 sm:left-0 md:left-4 bottom-16 sm:bottom-20 md:bottom-12 w-9 h-9 sm:w-9 sm:h-9 md:w-14 md:h-14 bg-white rounded-full items-center justify-center shadow-xl z-20 p-1.5 sm:p-2 md:p-3 border border-purple-100 animate-pulse">
                <span className="material-symbols-outlined text-purple-600 text-lg sm:text-xl md:text-2xl">trending_up</span>
              </div>

              <div className="relative rounded-3xl overflow-hidden glass-card p-4 shadow-2xl border border-white/60 bg-white/40">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-tr from-indigo-100 via-purple-50 to-pink-50">
<Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuApVgUM1CPI-chpiQnnacQOAazwKAIf2X5MgiRD1canwHi3-PNyeCAN1VYG06tYjQXLskeEt_ktPsUvDxxN_L9Ohk4yupNmlg-bnC10qZyeDx8ECQZEKVtWU5uq9eVhCx-qcTE5wosJfkt6NTN6fw9c2ZtGqxAoEYBnAnJcnKUPeyciq0_zM4K1C4Dtx2W0MJQ8MRGsfWMx0jiAQKjKTIiW7Jelor9RbkB7lzUza283dH10yzGnlDwkwt3iQtBL7DGOtn_1Z9OgjKUy2mg"
                      alt="Abhay Mishra"
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top hover:scale-105 transition-transform duration-700"
                      priority
                    />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/40">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
                        AM
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-on-surface text-sm leading-tight">Abhay Mishra</h4>
                        <p className="text-xs text-on-surface-variant leading-tight">Content operator & growth partner</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <ScrollReveal>
        <section className="py-10 bg-surface border-b border-outline-variant/30">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest text-center mb-6">
              50+ channels · 5+ years · Clients in US, UK, EU, IN, CA
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {trustLogos.map((logo) => (
                <div
                  key={logo.name}
                  className="flex items-center justify-center gap-3 py-3 px-4"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-outline-variant/40">
                    <Image
                      src={logo.image}
                      alt={logo.name}
                      fill
                      className="object-cover"
                      sizes="32px"
                    />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-on-surface leading-tight">
                      {logo.name}
                    </p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">
                      {logo.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── WHAT I RUN FOR YOU ─── */}
      <section className="py-20 bg-surface-container-low/40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
                What I run for you
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
                Three ways we can work together
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg">
                Pick the one that fits where you are right now. Swap or pause
                anytime, no long contract.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div
                  key={offer.title}
                  className={`reveal relative glass-card rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 ${
                    offer.featured
                      ? "border-2 border-primary shadow-2xl shadow-primary/10"
                      : "border border-outline-variant/50"
                  }`}
                >
                  {offer.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                      Most popular
                    </span>
                  )}

                  <div
                    className={`w-12 h-12 rounded-xl ${offer.bg} ${offer.iconColor} flex items-center justify-center mb-5`}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      {offer.icon}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-on-surface mb-1">
                    {offer.title}
                  </h3>
                  <p className="text-sm font-semibold text-primary mb-4">
                    {offer.price}
                  </p>

                  <p className="text-on-surface-variant text-sm leading-relaxed mb-5">
                    {offer.desc}
                  </p>

                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                    Best for
                  </p>
                  <p className="text-sm text-on-surface leading-relaxed mb-5 italic">
                    {offer.for}
                  </p>

                  <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                    What you get
                  </p>
                  <ul className="space-y-2 mb-8">
                    {offer.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2 text-sm text-on-surface"
                      >
                        <span className="material-symbols-outlined text-primary text-base mt-0.5 shrink-0">
                          check_circle
                        </span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={`block text-center font-bold py-3 rounded-full transition-all ${
                      offer.featured
                        ? "bg-primary text-white hover:bg-primary-container shadow-md hover:scale-[1.02]"
                        : "bg-surface-container-lowest border border-outline-variant/60 text-on-surface hover:border-primary hover:text-primary"
                    }`}
                  >
                    Start this
                  </Link>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── PROOF / CASE STUDIES ─── */}
      <section className="py-20 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
              Real results
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
              What working with me actually looks like
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg">
              A few recent client engagements. Hard numbers, no fluff.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((c) => (
              <article
                key={c.client}
                className="reveal glass-card rounded-3xl p-7 border border-outline-variant/50 hover:-translate-y-1 hover:shadow-2xl transition-all"
              >
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full mb-5">
                  {c.tag}
                </span>
                <div className="text-4xl font-extrabold text-primary leading-none mb-2">
                  {c.metric}
                </div>
                <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-4">
                  {c.metricLabel}
                </p>
                <h3 className="text-lg font-bold text-on-surface mb-2">
                  {c.client}
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {c.desc}
                </p>
              </article>
            ))}
          </div>
        </ScrollReveal>

        <div className="text-center mt-10">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-primary font-bold hover:underline decoration-primary/50"
          >
            See more of the work
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
      </section>

      {/* ─── VIDEO PORTFOLIO ─── */}
      <section id="videos" className="py-20 bg-surface-container-low/40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
                Watch the work
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
                Video portfolio
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg">
                Long-form edits, podcasts, and explainers. Click any video to play it here.
              </p>
            </div>
          </ScrollReveal>
          <VideoGrid videos={longFormVideos} />

          <div className="text-center max-w-2xl mx-auto mt-20 mb-10">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
              Short-form
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface">
              Shorts and reels
            </h2>
          </div>
          <VideoGrid videos={shortFormVideos} vertical />
        </div>
      </section>

      {/* ─── FREE TOOLS ─── */}
      <section className="py-16 bg-surface-container-low/40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
                Try before you buy
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-4">
                Free tools, built from real client work
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg">
                Same frameworks I use with paying clients, packaged into tools
                you can use right now.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {freeTools.map((tool) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="reveal group block glass-card rounded-2xl p-6 border border-outline-variant/40 hover:border-primary hover:-translate-y-1 hover:shadow-xl transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center mb-4`}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      {tool.icon}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                    {tool.desc}
                  </p>
                  <span className="text-sm font-bold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Try it free
                    <span className="material-symbols-outlined text-sm">
                      arrow_forward
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-20 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <ScrollReveal>
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
              How it works
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface">
              From first call to real growth
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            {processSteps.map((p) => (
              <div
                key={p.step}
                className="reveal relative z-10 flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-white shadow-lg border border-primary/20 flex items-center justify-center mb-5 relative">
                  <span className="text-2xl font-extrabold text-primary">
                    {p.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">
                  {p.title}
                </h3>
                <p className="text-on-surface-variant text-sm max-w-xs">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>


      {/* ─── BOTTOM CTA ─── */}
      <ScrollReveal>
        <section className="py-16 px-6 lg:px-16 max-w-[1400px] mx-auto">
          <div className="glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-on-surface">
                Ready to grow?
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg mb-8">
                Twenty minutes. We will look at your content together and tell
                you what is working, what is not, and what to do next. No pitch
                deck.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
<Link
                   href="/contact"
                   className="inline-flex items-center justify-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all"
                   aria-label="Book a strategy call"
                 >
                   Book a strategy call
                   <span className="material-symbols-outlined" aria-hidden="true">event</span>
                 </Link>
                <Link
                  href="/free-tools"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary/40 text-on-surface font-semibold px-8 py-4 rounded-full hover:border-primary hover:text-primary transition-all"
                >
                  Try a free tool first
                  <span className="material-symbols-outlined">bolt</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
