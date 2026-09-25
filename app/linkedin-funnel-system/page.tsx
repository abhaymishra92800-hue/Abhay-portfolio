import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Funnel System | Abhay Mishra",
  description: "A complete LinkedIn lead generation system for coaches, consultants, and B2B founders. Profile rewrite, content pillars, and a posting rhythm that turns views into booked calls.",
  alternates: { canonical: "/linkedin-funnel-system" },
  openGraph: {
    title: "LinkedIn Funnel System | Abhay Mishra",
    description: "Turn LinkedIn views into booked calls. A complete system, $800/mo.",
    url: "https://abhay-portfolio.vercel.app/linkedin-funnel-system",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkedIn Funnel System | Abhay Mishra",
    description: "Turn LinkedIn views into booked calls. A complete system, $800/mo.",
  },
};

const problemPoints = [
  "You post when you remember. There is no rhythm.",
  "Your profile says you do everything, so it lands with no one.",
  "You get views and likes, but no DMs, no calls, no clients.",
  "You tried the AI writing tools. The posts sound like everyone else.",
  "You do not know which content to make, or how often to post it.",
];

const included = [
  {
    icon: "edit_note",
    title: "Profile and headline rewrite",
    desc: "Built around your ideal client, not your job title. Most clients see a jump in profile views within 2 weeks.",
  },
  {
    icon: "category",
    title: "3 content pillars",
    desc: "Mapped to your offer, your buyer's questions, and the conversations that close. No more guessing what to post.",
  },
  {
    icon: "edit_square",
    title: "12 to 16 posts per month",
    desc: "Drafted, scheduled, and published on a rhythm. Mix of carousel, text, and short video posts so you are not just another text-post creator.",
  },
  {
    icon: "forum",
    title: "Engagement playbooks",
    desc: "Comment scripts, DM templates, and lead-handling flows so replies turn into calls, not dead-end conversations.",
  },
  {
    icon: "monitoring",
    title: "Monthly lead report",
    desc: "A one-page report on what worked, what did not, and what we are doubling down on next month.",
  },
  {
    icon: "handshake",
    title: "Bi-weekly strategy call",
    desc: "30 minutes every other week. We review the data, adjust the pillars, and unblock anything that is not converting.",
  },
];

const steps = [
  {
    step: "01",
    title: "We audit your current profile and feed",
    desc: "I look at your last 30 posts, your profile, and your buyer. I write a one-page gap analysis before we start.",
  },
  {
    step: "02",
    title: "We rebuild the profile and the pillars",
    desc: "New headline, new about, new featured section, and 3 content pillars approved by you. Live in 10 days.",
  },
  {
    step: "03",
    title: "We run the posting rhythm",
    desc: "12 to 16 posts a month, drafted by me, approved by you, scheduled and published. Engagement handled in the first hour for max reach.",
  },
  {
    step: "04",
    title: "We turn DMs into calls",
    desc: "Reply templates, lead questions, and a simple handoff to your booking link. Most clients see their first booked call from LinkedIn in month one.",
  },
];

const faqs = [
  {
    q: "Is this only for B2B?",
    a: "It works best for B2B, consultants, coaches, and service-based founders. If your buyer is on LinkedIn, this is for you. If you sell to consumers, YouTube and Instagram usually work better and that is a different plan.",
  },
  {
    q: "Do you write the posts?",
    a: "Yes. I draft every post based on your voice, your stories, and your pillars. You approve before anything goes out. I never post without your sign-off.",
  },
  {
    q: "How fast will I see results?",
    a: "Most clients see profile views up and engagement up in the first 2 weeks. Booked calls from LinkedIn usually start showing up in month one and compound from there. No overnight magic, but very real momentum.",
  },
  {
    q: "Do I need to be on LinkedIn every day?",
    a: "No. The whole point of the system is that you do not have to. You show up for the bi-weekly call, approve the posts, and handle the warm DMs. I do the rest.",
  },
  {
    q: "What if I do not have a booking link?",
    a: "I will help you set one up. Calendly, Cal.com, or a simple email handoff. Whatever fits your flow.",
  },
  {
    q: "Can I cancel?",
    a: "Yes. Monthly plan, no lock-in. You can cancel with 7 days notice before the next cycle.",
  },
];

export default function LinkedInFunnelSystemPage() {
  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden">
      <div className="ambient-glow top-0 left-1/4"></div>
      <div className="ambient-glow-2 top-1/2 right-[-100px]"></div>

      {/* Hero */}
      <section className="text-center mb-20 max-w-3xl mx-auto pt-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary font-semibold text-xs tracking-wide uppercase mb-6 shadow-sm">
          The LinkedIn Funnel System
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-on-surface mb-6 leading-tight">
          Turn LinkedIn views into{" "}
          <span className="gradient-text">booked calls.</span>
        </h1>
        <p className="text-lg text-on-surface-variant leading-relaxed mb-8">
          A complete LinkedIn lead generation system for coaches, consultants,
          and B2B founders. Profile, content, and a posting rhythm, run for you.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact?service=linkedin-funnel-system"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all"
          >
            Book a strategy call
            <span className="material-symbols-outlined">event</span>
          </Link>
          <Link
            href="/linkedin-funnel"
            className="inline-flex items-center gap-2 bg-surface-container-lowest border border-outline-variant/60 text-on-surface font-bold px-8 py-4 rounded-full hover:border-primary transition-all"
          >
            Try the free LinkedIn tool
            <span className="material-symbols-outlined">bolt</span>
          </Link>
        </div>
        <p className="text-sm text-on-surface-variant mt-6">
          $800 / month. No lock-in. Most clients see their first booked
          call from LinkedIn within 30 days.
        </p>
      </section>

      {/* Problem */}
      <section className="mb-20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            The problem
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface">
            You post, but no one books.
          </h2>
        </div>
        <div className="glass-card rounded-3xl p-8 md:p-12 max-w-3xl mx-auto border border-outline-variant/40">
          <ul className="space-y-4">
            {problemPoints.map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-on-surface text-base md:text-lg"
              >
                <span className="material-symbols-outlined text-red-500 shrink-0 mt-0.5">
                  close
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Solution */}
      <section className="mb-20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            The system
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface">
            One system. Built around your buyer.
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg mt-3">
            Profile, content, and engagement, all in one monthly plan. You
            approve, I ship, and you get calls.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {included.map((item) => (
            <div
              key={item.title}
              className="glass-card rounded-2xl p-6 border border-outline-variant/40 hover:-translate-y-1 hover:shadow-xl transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </span>
                <h3 className="text-lg font-bold text-on-surface">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mb-20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface">
            Live in 14 days. Bookings in 30.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="glass-card rounded-2xl p-6 border border-outline-variant/40"
            >
              <div className="text-3xl font-extrabold text-primary mb-3">
                {s.step}
              </div>
              <h3 className="text-base font-bold text-on-surface mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Proof */}
      <section className="mb-20 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            What clients say
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface">
            Real results, real names.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="glass-card rounded-3xl p-8 border border-outline-variant/40">
            <span className="material-symbols-outlined text-primary/30 text-6xl select-none">
              format_quote
            </span>
            <p className="text-on-surface text-base md:text-lg italic leading-relaxed mb-6">
              &ldquo;Abhay has been a game-changer for my video production,
              handling both long-form YouTube edits and sales-page VSLs with
              excellent results. His fast, reliable WhatsApp communication
              saves me days every week.&rdquo;
            </p>
            <div className="pt-4 border-t border-outline-variant/30">
              <h4 className="font-bold text-on-surface">Victor Chan</h4>
              <p className="text-xs text-on-surface-variant">
                Founder, Launch Excel
              </p>
            </div>
          </article>
          <article className="glass-card rounded-3xl p-8 border border-outline-variant/40">
            <span className="material-symbols-outlined text-primary/30 text-6xl select-none">
              format_quote
            </span>
            <p className="text-on-surface text-base md:text-lg italic leading-relaxed mb-6">
              &ldquo;Abhay helped create video layouts for my podcast which look
              great and work perfectly whilst saving me so much time. Generous
              with his time and would highly recommend.&rdquo;
            </p>
            <div className="pt-4 border-t border-outline-variant/30">
              <h4 className="font-bold text-on-surface">Blake Reddy</h4>
              <p className="text-xs text-on-surface-variant">
                Private Client Wealth Adviser
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Pricing */}
      <section className="mb-20 relative z-10">
        <div className="max-w-2xl mx-auto glass-card rounded-3xl p-10 text-center border-2 border-primary shadow-2xl">
          <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-white bg-primary px-3 py-1.5 rounded-full mb-4">
            The LinkedIn Funnel System
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-on-surface mb-2">
            $800 / month
          </h2>
          <p className="text-on-surface-variant text-base mb-6">
            No upsells. Custom scopes available for higher volume.
          </p>
          <ul className="text-left max-w-md mx-auto space-y-2 mb-8">
            {included.slice(0, 5).map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-2 text-sm text-on-surface"
              >
                <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">
                  check_circle
                </span>
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/contact?service=linkedin-funnel-system"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all"
          >
            Book a strategy call
            <span className="material-symbols-outlined">event</span>
          </Link>
          <p className="text-xs text-on-surface-variant mt-4">
            No lock-in. Pause or cancel with 7 days notice.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="mb-16 max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface">
            Questions, answered.
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="glass-card rounded-2xl p-5 border border-outline-variant/40 group"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none">
                <h3 className="text-base font-bold text-on-surface">{f.q}</h3>
                <span className="material-symbols-outlined text-primary group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <p className="text-sm text-on-surface-variant leading-relaxed mt-3">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10">
        <div className="glass-card rounded-3xl p-10 md:p-16 text-center max-w-4xl mx-auto bg-gradient-to-br from-orange-50 via-purple-100 to-purple-500 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-on-surface">
            Ready to make LinkedIn work for you?
          </h2>
          <p className="text-on-surface-variant text-base md:text-lg mb-8 max-w-xl mx-auto">
            Twenty minutes. We will look at your profile and your last 10
            posts, and tell you what is holding you back.
          </p>
          <Link
            href="/contact?service=linkedin-funnel-system"
            className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all"
          >
            Book a strategy call
            <span className="material-symbols-outlined">event</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
