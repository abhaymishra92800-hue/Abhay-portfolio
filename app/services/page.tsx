import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Services & Pricing | Abhay Mishra",
  description: "Three productized content services for coaches, authors, and founders. LinkedIn Funnel System $800/mo, Content Engine $2,500/mo, Content Production System $1,500/mo.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services & Pricing | Abhay Mishra",
    description: "Three productized services with transparent monthly pricing.",
    url: "https://abhay-portfolio.vercel.app/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services & Pricing | Abhay Mishra",
    description: "Three productized services with transparent monthly pricing.",
  },
};

type Service = {
  id: string;
  title: string;
  pitch: string;
  deliverables: string[];
  idealFor: string;
  icon: string;
  price: string;
  featured?: boolean;
};

const services: Service[] = [
  {
    id: "linkedin-funnel-system",
    title: "LinkedIn Funnel System",
    pitch:
      "The system I built for myself, applied to your LinkedIn. Profile rewrite, content pillars, and a posting rhythm that turns views into booked calls.",
    deliverables: [
      "Profile and headline rewrite built for your ICP",
      "3 content pillars mapped to your offer",
      "12-16 posts drafted and scheduled per month",
      "Comment and engagement playbooks",
      "Monthly lead and engagement report",
    ],
    idealFor:
      "Consultants, coaches, and B2B founders who want leads from LinkedIn without spending all day on it.",
    icon: "hub",
    price: "$800/mo",
    featured: true,
  },
  {
    id: "content-engine",
    title: "Content Engine",
    pitch:
      "Full YouTube and LinkedIn operation. Strategy, scripts, edits, thumbnails, captions, posting, and reporting, all in one retainer.",
    deliverables: [
      "Up to 8 edited videos per month (long-form and short-form)",
      "Content calendar and 90-day strategy",
      "Thumbnails, titles, and SEO descriptions",
      "Captions and shorts repurposed from long-form",
      "Weekly performance reporting",
    ],
    idealFor:
      "Coaches, authors, and founders who post but are not growing. This is the flagship.",
    icon: "rocket_launch",
    price: "$2,500/mo",
  },
  {
    id: "content-production-system",
    title: "Content Production System",
    pitch:
      "A reusable video production system: templates, hooks, B-roll libraries, SOPs, and editor training. I build the machine, your team runs it.",
    deliverables: [
      "Production workflow audit and rebuild",
      "Templates for intros, hooks, CTAs, and B-roll",
      "Editor training and full SOPs",
      "Asset library and brand kit",
      "Monthly workflow reviews",
    ],
    idealFor:
      "Agencies and small teams that need a faster, repeatable content production system without scaling headcount.",
    icon: "movie_edit",
    price: "$1,500/mo",
  },
];

const servicesFaqs = [
  {
    q: "How are payments structured?",
    a: "All plans are billed monthly at the price shown. There are no upsells or hidden costs — final scope is confirmed on a free intro call so we match the plan to your goals and budget.",
  },
  {
    q: "Can I switch plans later?",
    a: "Absolutely. Most clients start with the LinkedIn Funnel System and add Content Engine once they are ready to scale. There is no lock-in, and plans can be adjusted with a simple conversation.",
  },
  {
    q: "What do you need from me to start?",
    a: "Access to your channels, a short brand brief, and your raw footage or assets. I handle the strategy, production, posting, and reporting from there.",
  },
  {
    q: "How fast can we launch?",
    a: "After the intro call, most clients are live within 7 to 14 days. LinkedIn Funnel System clients usually have their first week of posts ready inside 10 days.",
  },
  {
    q: "Do you offer one-off projects?",
    a: "Yes. If you only need a single VSL, podcast edit, or ad campaign, book a call and we will scope it as a project rather than a monthly plan.",
  },
];

export default function ServicesPage() {
  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden">
      <div className="ambient-glow top-12 left-1/4"></div>

      {/* Hero */}
      <section className="mb-20 text-center max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary font-semibold text-xs tracking-wide uppercase mb-6 shadow-sm">
          Services & Pricing
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-6 leading-tight">
          Three ways to <span className="gradient-text">work together</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed">
          Pick the plan that matches where you are right now. Every plan is
          monthly, transparent on price, and pause or swap anytime.
        </p>
      </section>

      {/* Services — Vertical Stacked Cards */}
      <section className="mb-24 space-y-6">
        {services.map((service) => (
          <article
            key={service.id}
            id={service.id}
            className={`group glass-card rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
              service.featured
                ? "border-2 border-primary shadow-xl"
                : "border border-outline-variant/50"
            }`}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 bg-gradient-to-tr from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-2xl">
                    {service.icon}
                  </span>
                </div>
                {service.featured && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-primary px-2.5 py-1 rounded-full">
                    Most popular
                  </span>
                )}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-on-surface mb-2">
                {service.title}
              </h2>
              <p className="text-sm font-semibold text-primary mb-4">
                {service.price}
              </p>
              <p className="text-on-surface-variant text-base leading-relaxed mb-6">
                {service.pitch}
              </p>
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
                What you get
              </p>
              <ul className="space-y-2 mb-6">
                {service.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-on-surface">
                    <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">
                      check_circle
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-on-surface-variant italic border-l-2 border-primary/40 pl-3">
                Best for: {service.idealFor}
              </p>
            </div>

            <div className="md:w-64 flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 shrink-0">
              <Link
                href={`/contact?service=${service.id}`}
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform hover:bg-primary-container text-sm"
              >
                Get Started
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* How We Work */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Process
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
            How we <span className="gradient-text">work together</span>
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg max-w-2xl mx-auto">
            A simple, predictable engagement — from first call to first deliverable in
            under 7 days.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              step: "01",
              title: "Free Intro Call",
              desc: "20-minute call to understand your goals, current setup, and what success looks like.",
              icon: "call",
            },
            {
              step: "02",
              title: "Scope & Plan",
              desc: "I send a tailored proposal with deliverables, timeline, and a fixed monthly scope.",
              icon: "description",
            },
            {
              step: "03",
              title: "Onboarding",
              desc: "Brand brief, asset handover, channel access, and a shared workspace for everything.",
              icon: "handshake",
            },
            {
              step: "04",
              title: "Ship & Iterate",
              desc: "Weekly delivery against an agreed calendar, with monthly reporting and strategy calls.",
              icon: "rocket_launch",
            },
          ].map((s) => (
            <div
              key={s.step}
              className="glass-card rounded-2xl p-6 hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-black text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                  {s.step}
                </span>
                <span className="material-symbols-outlined text-primary text-xl">
                  {s.icon}
                </span>
              </div>
              <h3 className="text-base font-bold text-on-surface mb-2">{s.title}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-24 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Questions? Answered.</h2>
        </div>
        <FAQAccordion items={servicesFaqs} />
      </section>

      <section className="glass-card rounded-3xl p-10 text-center max-w-4xl mx-auto relative overflow-hidden bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-on-surface">Not sure which plan fits?</h2>
        <p className="text-on-surface-variant text-base mb-8 max-w-xl mx-auto">
          Book a free 20-minute call. We will look at your content and your
          goals together, and recommend the right starting point.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-primary-container transition-all shadow-lg hover:scale-105"
        >
          Book a strategy call
          <span className="material-symbols-outlined">event</span>
        </Link>
      </section>
    </div>
  );
}
