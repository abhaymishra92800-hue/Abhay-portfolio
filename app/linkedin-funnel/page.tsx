"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { LinkedInLogo } from "@/components/LinkedInLogo";
import { trackEvent } from "@/lib/analytics";

// ─── Types ─────────────────────────────────────────────────────────────────────
type PageState = "input" | "analyzing" | "preview";
type EmailState = "idle" | "sending" | "sent";

// ─── Constants ─────────────────────────────────────────────────────────────────
const ANALYSIS_STEPS = [
  { label: "Fetching your LinkedIn profile…", icon: "person_search" },
  { label: "Identifying your industry & niche…", icon: "category" },
  { label: "Analyzing your content style…", icon: "psychology" },
  { label: "Building 30-day content strategy…", icon: "calendar_month" },
  { label: "Generating posts, images & video concepts…", icon: "auto_awesome" },
  { label: "Finalizing your calendar ✨", icon: "check_circle" },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: "person_search",
    title: "Share Your LinkedIn URL",
    desc: "Just paste your LinkedIn profile URL. We read your profile, industry, and professional context — no extra forms needed.",
    color: "from-violet-500/20 to-indigo-500/5",
    iconColor: "text-violet-600",
  },
  {
    step: "02",
    icon: "psychology",
    title: "AI Analyzes & Builds",
    desc: "Our AI understands your niche and crafts 30 unique posts with image concepts, video scripts, and the strategic reason each post will perform.",
    color: "from-blue-500/20 to-cyan-500/5",
    iconColor: "text-blue-600",
  },
  {
    step: "03",
    icon: "mark_email_read",
    title: "Delivered to Your Inbox",
    desc: "Your complete 30-day content calendar arrives in your inbox — ready to copy, customize, and post.",
    color: "from-emerald-500/20 to-teal-500/5",
    iconColor: "text-emerald-600",
  },
];

const PREVIEW_DAYS = [
  {
    day: 1,
    type: "Story Post",
    pillar: "Storytelling",
    pillarColor: "text-rose-600",
    pillarBg: "bg-rose-50 border-rose-200/60",
    hook: "I failed at LinkedIn for 2 years. One tiny change got me 8,000 followers in 90 days. 👇",
    why: "Personal failure → transformation arcs generate 3× more comments than any other LinkedIn format. The curiosity hook guarantees readers click 'see more', boosting dwell time — a key signal the algorithm rewards with expanded reach.",
    time: "Tuesday · 8–9 AM",
  },
  {
    day: 7,
    type: "Carousel",
    pillar: "Education",
    pillarColor: "text-blue-600",
    pillarBg: "bg-blue-50 border-blue-200/60",
    hook: "7 LinkedIn hooks that stop the scroll (with real data from my last 50 posts)",
    why: "Carousels generate 3× more saves than text posts. LinkedIn treats saves as high-intent signals and pushes this format to 40% more connections on average.",
    time: "Wednesday · 12 PM",
  },
  {
    day: 14,
    type: "Poll",
    pillar: "Engagement",
    pillarColor: "text-emerald-600",
    pillarBg: "bg-emerald-50 border-emerald-200/60",
    hook: "What's stopping you from posting on LinkedIn consistently? (honest answers only)",
    why: "Polls create 4× more impressions because every vote triggers a notification event. They surface your audience's real pain points, giving you content ideas for the next 30 days.",
    time: "Thursday · 9 AM",
  },
];

const FAQS = [
  {
    q: "Does this actually analyze my LinkedIn profile?",
    a: "Yes. Your LinkedIn URL gives us your professional context — industry, role type, and positioning. The AI uses this to generate content that genuinely fits your niche, not generic templates.",
  },
  {
    q: "What do I get with the free plan?",
    a: "The free plan includes the full 30-day calendar: hook, complete post copy, strategic rationale, optimal posting times, and hashtags — all delivered to your inbox.",
  },
  {
    q: "What's the premium unlock for images and videos?",
    a: "When you unlock premium, you'll enter your brand colors (primary, accent, background) so every image prompt and video concept is matched to your exact brand identity — not just a generic visual.",
  },
  {
    q: "What is the LinkedIn banner design?",
    a: "Based on your profile analysis, we generate a professional LinkedIn banner (1584×396px) tailored to your industry and personal brand. This is a premium unlock.",
  },
  {
    q: "Is the base plan really free?",
    a: "Completely free. The 30-day content calendar is yours at no cost. Premium unlocks — custom image prompts, video scripts, and the banner design — are optional paid upgrades.",
  },
];

// ─── Thank You State ──────────────────────────────────────────────────────────
function ThankYouState({ email }: { email: string }) {
  return (
    <div className="glass-card rounded-3xl p-8 md:p-10 text-center border border-emerald-200/60 bg-emerald-50/40 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/80 to-transparent pointer-events-none" />

      {/* Success icon */}
      <div className="relative z-10">
        <div className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
          <span className="material-symbols-outlined text-white text-4xl">check</span>
        </div>

        <h3 className="text-2xl font-extrabold text-on-surface mb-3">
          Your calendar is on its way! 🎉
        </h3>
        <p className="text-on-surface-variant text-sm mb-8 max-w-sm mx-auto">
          Check <strong>{email}</strong> — your full 30-day LinkedIn plan will arrive in the next few minutes.
        </p>

        {/* Next steps */}
        <div className="bg-white rounded-2xl p-6 mb-6 border border-emerald-100 text-left">
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-4">
            While you wait — 3 things to do next
          </p>
          <ul className="space-y-3">
            {[
              {
                icon: "inbox",
                title: "Check your spam folder",
                desc: "Sometimes the email lands there. Mark it 'Not Spam' so you don't miss future tips.",
              },
              {
                icon: "person_search",
                title: "Update your LinkedIn banner",
                desc: "First impressions matter. A clean, professional banner boosts profile visits by up to 40%.",
              },
              {
                icon: "calendar_month",
                title: "Bookmark this page",
                desc: "Come back and reference your calendar — you'll get a reminder in your inbox too.",
              },
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-on-surface text-sm flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-emerald-600 text-base">{step.icon}</span>
                    {step.title}
                  </p>
                  <p className="text-on-surface-variant text-xs leading-relaxed mt-0.5">{step.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Share & explore */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/funnels"
            className="inline-flex items-center justify-center gap-2 border-2 border-outline-variant text-on-surface font-semibold px-6 py-3 rounded-xl hover:border-emerald-500/50 hover:text-emerald-700 transition-all text-sm"
          >
            <span className="material-symbols-outlined text-emerald-600 text-base">bolt</span>
            Explore more free tools
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-[#0A66C2] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#0A66C2]/90 transition-all text-sm"
          >
            <span className="material-symbols-outlined text-white text-base">mail</span>
            Work with Abhay
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Page Component ────────────────────────────────────────────────────────────
export default function LinkedInFunnelPage() {
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [urlError, setUrlError] = useState("");
  const [pageState, setPageState] = useState<PageState>("input");
  const [analysisStep, setAnalysisStep] = useState(0);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [urlTipOpen, setUrlTipOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<EmailState>("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [brandColors, setBrandColors] = useState({
    primary: "#6355FF",
    accent: "#0A66C2",
    background: "#FFFFFF",
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setUrlError("");

    if (!/linkedin\.com\/(in|company)\/.+/i.test(linkedinUrl)) {
      setUrlError("Please enter a valid LinkedIn profile URL (e.g. linkedin.com/in/your-name)");
      return;
    }

    setPageState("analyzing");
    setAnalysisStep(0);
    setAnalysisProgress(0);

    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      await new Promise((r) => setTimeout(r, 900));
      setAnalysisStep(i);
      setAnalysisProgress(Math.round(((i + 1) / ANALYSIS_STEPS.length) * 100));
    }

    await new Promise((r) => setTimeout(r, 400));
    setPageState("preview");
    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailState("sending");
    try {
      const res = await fetch("/api/linkedin-funnel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ linkedinUrl, email, niche: "auto", goal: "auto" }),
      });
      if (!res.ok) throw new Error();
      setEmailState("sent");
      trackEvent("Funnel Conversion", {
        source: "linkedin-content-funnel",
        email_provided: true,
      });
    } catch {
      setEmailState("idle");
    }
  };

  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-glow top-[-80px] left-[10%] opacity-60" />
        <div className="ambient-glow-2 bottom-[15%] right-[-5%] opacity-40" />
      </div>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative pt-10 pb-10 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge — real LinkedIn logo */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A66C2]/10 border border-[#0A66C2]/20 text-[#0A66C2] font-semibold text-xs tracking-wide uppercase mb-7">
            <LinkedInLogo className="w-3.5 h-3.5" />
            Free LinkedIn Content Engine
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-[1.2] mb-5 text-balance mx-auto max-w-4xl">
            30 Days of <span className="gradient-text">LinkedIn Content</span> Built for <span className="text-[#0A66C2]">You</span>.
          </h1>

          <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-3xl mx-auto mb-8 text-balance">
            Paste your LinkedIn URL. Our AI analyzes your profile and builds a complete 30-day content calendar — posts, image ideas, and video scripts — sent straight to your inbox for free.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-5 text-sm text-on-surface-variant">
            {[
              { icon: "schedule", text: "Ready in ~60 seconds" },
              { icon: "mail", text: "Delivered to inbox" },
              { icon: "lock", text: "Your data stays private" },
              { icon: "star", text: "100% personalized" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>

          {/* See a sample */}
          <div className="mt-8 flex justify-center">
            <a
              href="#preview-anchor"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("preview-anchor")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A66C2] hover:text-[#0A66C2]/80 transition-colors underline decoration-[#0A66C2]/30"
            >
              <span className="material-symbols-outlined text-base">visibility</span>
              See a sample calendar first
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          URL INPUT — BEFORE "HOW IT WORKS"
      ══════════════════════════════════════════════════════ */}
      <section className="px-6 lg:px-16 pb-20 max-w-[1400px] mx-auto">
        <div className="max-w-2xl mx-auto">

          {/* ── Input state ── */}
          {pageState === "input" && (
            <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0A66C2] via-primary to-[#0A66C2]/50 rounded-t-3xl" />
              <div className="absolute top-0 right-0 w-52 h-52 rounded-full bg-[#0A66C2]/5 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-[#0A66C2] flex items-center justify-center shrink-0 shadow-md">
                    <LinkedInLogo className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-on-surface leading-tight">
                      Enter Your LinkedIn Profile URL
                    </h2>
                    <p className="text-sm text-on-surface-variant">
                      We'll analyze your profile and build your content plan automatically
                    </p>
                  </div>
                </div>

                <form onSubmit={handleAnalyze} className="space-y-4">
                  <div>
                    <div className="relative">
                      <LinkedInLogo className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#0A66C2]" />
                      <input
                        type="url"
                        required
                        placeholder="https://linkedin.com/in/your-name"
                        value={linkedinUrl}
                        onChange={(e) => {
                          setLinkedinUrl(e.target.value);
                          setUrlError("");
                        }}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-surface-container border border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/30 focus:border-[#0A66C2]/50 transition-all text-sm font-medium"
                      />
                    </div>

                    {urlError && (
                      <p className="text-xs text-error flex items-center gap-1 mt-2">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {urlError}
                      </p>
                    )}

                    {/* Tip toggle — no underlines */}
                    <button
                      type="button"
                      onClick={() => setUrlTipOpen((p) => !p)}
                      className="flex items-center gap-1.5 text-xs text-[#0A66C2]/70 font-medium mt-2.5 hover:text-[#0A66C2] transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">info</span>
                      How to find your LinkedIn profile URL
                      <span
                        className={`material-symbols-outlined text-sm transition-transform duration-200 ${urlTipOpen ? "rotate-180" : ""}`}
                      >
                        expand_more
                      </span>
                    </button>

                    {urlTipOpen && (
                      <div className="mt-3 p-4 rounded-xl bg-[#0A66C2]/5 border border-[#0A66C2]/15 space-y-2">
                        {[
                          "Open LinkedIn → click your profile photo → View Profile → copy the URL from your browser's address bar.",
                          "On mobile: tap your profile → tap ··· → tap Copy link to profile.",
                          <>It looks like: <code className="bg-surface-container px-1.5 py-0.5 rounded font-mono text-primary text-[11px]">linkedin.com/in/your-name</code></>,
                        ].map((tip, i) => (
                          <div key={i} className="flex gap-2.5">
                            <span className="text-[#0A66C2] font-bold text-xs shrink-0 mt-0.5">{i + 1}.</span>
                            <span className="text-xs text-on-surface-variant leading-relaxed">{tip}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={!linkedinUrl.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-[#0A66C2] text-white font-bold py-4 rounded-xl hover:bg-[#0A66C2]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-[#0A66C2]/20 text-base"
                  >
                    <span className="material-symbols-outlined text-xl">auto_awesome</span>
                    Analyze My Profile &amp; Generate Plan
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </button>

                  <p className="text-center text-xs text-on-surface-variant/50">
                    No credit card. No sign-up. Just your LinkedIn URL.
                  </p>
                </form>
              </div>
            </div>
          )}

          {/* ── Analyzing state ── */}
          {pageState === "analyzing" && (
            <div className="glass-card rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/5 to-primary/5 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#0A66C2] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#0A66C2]/30">
                  <LinkedInLogo className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-1.5">
                  Analyzing Your Profile
                </h3>
                <p className="text-sm text-on-surface-variant mb-8">
                  {ANALYSIS_STEPS[analysisStep]?.label}
                </p>

                {/* Progress bar */}
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#0A66C2] to-primary transition-all duration-700"
                    style={{ width: `${analysisProgress}%` }}
                  />
                </div>

                {/* Step pills */}
                <div className="flex flex-wrap justify-center gap-2">
                  {ANALYSIS_STEPS.map((step, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all ${
                        i < analysisStep
                          ? "bg-emerald-100 text-emerald-700"
                          : i === analysisStep
                          ? "bg-[#0A66C2]/10 text-[#0A66C2] font-semibold"
                          : "bg-surface-container text-on-surface-variant/40"
                      }`}
                    >
                      {i < analysisStep ? (
                        <span className="material-symbols-outlined text-sm">check</span>
                      ) : i === analysisStep ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0A66C2] animate-pulse shrink-0" />
                      ) : null}
                      {step.label.replace("…", "").replace(" ✨", "")}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          HOW IT WORKS — only visible before preview
      ══════════════════════════════════════════════════════ */}
      {pageState !== "preview" && (
        <section className="py-20 px-6 lg:px-16 max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
              The Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface">
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-violet-300 via-blue-300 to-emerald-300 opacity-40" />
            {HOW_IT_WORKS.map((step, idx) => (
              <div
                key={idx}
                className="glass-card rounded-3xl p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-300 relative group"
              >
                <div className="absolute -top-4 left-8 bg-surface text-on-surface-variant font-black text-xs tracking-widest px-2 py-1 rounded-full border border-outline-variant/40">
                  {step.step}
                </div>
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <span className={`material-symbols-outlined text-3xl ${step.iconColor}`}>
                    {step.icon}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-3">{step.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          PREVIEW — shown after analysis completes
      ══════════════════════════════════════════════════════ */}
      {pageState === "preview" && (
        <section ref={previewRef} className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-xs mb-4">
              <span className="material-symbols-outlined text-base">check_circle</span>
              Your 30-Day Plan Is Ready!
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-on-surface mb-3">
              Here's a Sneak Peek of Your Calendar
            </h2>
            <p className="text-on-surface-variant max-w-lg mx-auto">
              Enter your email below to receive all 30 days in your inbox — completely free.
            </p>
          </div>

          {/* ── Email capture ── */}
          <div className="max-w-xl mx-auto mb-12">
            {emailState === "sent" ? (
              <ThankYouState email={email} />
            ) : (
              <div className="glass-card rounded-2xl p-6 border-2 border-[#0A66C2]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A66C2]/4 to-primary/4 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-[#0A66C2] text-xl">
                      mark_email_read
                    </span>
                    <p className="font-bold text-on-surface">
                      Where should we send your 30-day plan?
                    </p>
                  </div>
                  <form onSubmit={handleEmailSubmit} className="flex gap-3">
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-[#0A66C2]/30 focus:border-[#0A66C2]/50 transition-all text-sm"
                    />
                    <button
                      type="submit"
                      disabled={emailState === "sending"}
                      className="flex items-center gap-1.5 bg-[#0A66C2] text-white font-bold px-5 py-3 rounded-xl hover:bg-[#0A66C2]/90 disabled:opacity-60 transition-all shrink-0 text-sm"
                    >
                      {emailState === "sending" ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send It
                          <span className="material-symbols-outlined text-base">send</span>
                        </>
                      )}
                    </button>
                  </form>
                  <p className="text-xs text-on-surface-variant/50 mt-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">lock</span>
                    No spam. We only send your content plan.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Preview day cards ── */}
          <div className="space-y-6 mb-16">
            {PREVIEW_DAYS.map((day) => (
              <div key={day.day} className="glass-card rounded-3xl p-8 relative overflow-hidden">
                {/* Day header */}
                <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0A66C2] text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {day.day}
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-sm">Day {day.day}</p>
                      <p className="text-xs text-on-surface-variant">{day.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary-fixed text-primary">
                      {day.type}
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${day.pillarBg} ${day.pillarColor}`}>
                      {day.pillar}
                    </span>
                  </div>
                </div>

                {/* Hook — visible */}
                <div
                  className="rounded-xl p-4 mb-5"
                  style={{ borderLeft: "3px solid #0A66C2", background: "rgba(10,102,194,0.04)" }}
                >
                  <p className="text-[10px] font-bold text-[#0A66C2] uppercase tracking-widest mb-1.5">
                    Opening Hook
                  </p>
                  <p className="text-on-surface font-semibold text-sm leading-relaxed">
                    &ldquo;{day.hook}&rdquo;
                  </p>
                </div>

                {/* Full post — blurred */}
                <div className="relative mb-5">
                  <div
                    className="text-on-surface-variant text-sm leading-relaxed select-none pointer-events-none"
                    style={{ filter: "blur(5px)" }}
                  >
                    <p className="mb-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                      veniam, quis nostrud exercitation ullamco laboris nisi.
                    </p>
                    <p className="mb-2">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.
                    </p>
                    <p>
                      Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur
                      adipiscing elit sed do eiusmod tempor incididunt.
                    </p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-2 border border-primary/20 shadow-sm">
                      <span className="material-symbols-outlined text-primary text-base">mail</span>
                      <span className="text-xs font-bold text-primary">
                        Full post unlocked in your inbox
                      </span>
                    </div>
                  </div>
                </div>

                {/* Why this works — visible */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/50 mb-5">
                  <span className="material-symbols-outlined text-emerald-500 text-xl shrink-0 mt-0.5">
                    lightbulb
                  </span>
                  <div>
                    <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-1">
                      Why This Will Perform
                    </p>
                    <p className="text-sm text-emerald-800 leading-relaxed">{day.why}</p>
                  </div>
                </div>

                {/* Locked: Image & Video */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      icon: "image",
                      label: "AI Image Prompt",
                      desc: "Detailed visual generation prompt for Midjourney, DALL·E, or Canva AI — matched to your brand colors",
                    },
                    {
                      icon: "videocam",
                      label: "Video Script Concept",
                      desc: "30–60 sec script outline for LinkedIn Video or Reels — realistic to film on your phone",
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="relative rounded-xl overflow-hidden border border-outline-variant/30"
                    >
                      {/* Blurred content underneath */}
                      <div
                        className="p-4 select-none pointer-events-none bg-surface-container-low"
                        style={{ filter: "blur(4px)" }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="material-symbols-outlined text-on-surface-variant text-lg">
                            {item.icon}
                          </span>
                          <span className="text-xs font-bold text-on-surface">{item.label}</span>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed">
                          {item.desc} — lorem ipsum dolor sit amet consectetur adipiscing elit
                          professional brand visual design concept.
                        </p>
                      </div>
                      {/* Lock overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-surface/50">
                        <button
                          onClick={() => setShowUnlockModal(true)}
                          className="flex items-center gap-1.5 bg-on-surface text-surface-container-lowest text-xs font-bold px-4 py-2 rounded-lg hover:bg-on-surface/80 transition-all shadow-md"
                        >
                          <span className="material-symbols-outlined text-sm">lock</span>
                          Unlock Premium
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* More days teaser */}
            <div className="glass-card rounded-3xl p-6 text-center border-2 border-dashed border-outline-variant/40">
              <p className="text-on-surface-variant text-sm mb-1">
                <strong className="text-on-surface">+ 27 more days</strong> of content waiting in your inbox
              </p>
              <p className="text-xs text-on-surface-variant/60">
                Each with full post copy, strategic rationale, best posting time &amp; hashtags
              </p>
            </div>
          </div>

          {/* ══════════════════════════════════════════════
              LINKEDIN BANNER UPSELL
          ══════════════════════════════════════════════ */}
          <div className="glass-card rounded-3xl overflow-hidden mb-16 border border-[#0A66C2]/15">
            {/* Header */}
            <div className="p-8 border-b border-outline-variant/30">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#0A66C2] flex items-center justify-center shrink-0 shadow-md">
                  <LinkedInLogo className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[10px] font-bold text-[#0A66C2] uppercase tracking-widest">
                      Premium Bonus
                    </p>
                    <span className="text-[9px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                      RECOMMENDED
                    </span>
                  </div>
                  <h3 className="font-bold text-on-surface text-xl mb-2">
                    Your LinkedIn Banner Needs an Upgrade
                  </h3>
                  <p className="text-on-surface-variant text-sm leading-relaxed max-w-2xl">
                    Based on your profile analysis, your banner is one of the biggest missed
                    opportunities. A professional, on-brand LinkedIn banner (1584×396px)
                    increases profile visits by up to 40% and builds instant credibility.
                    We've generated a custom concept tailored to your industry and positioning —
                    locked below.
                  </p>
                </div>
              </div>
            </div>

            {/* Banner preview — blurred */}
            <div className="relative w-full" style={{ aspectRatio: "1584/396" }}>
              {/* The blurred banner design */}
              <div
                className="absolute inset-0"
                style={{ filter: "blur(14px)", transform: "scale(1.03)" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A66C2] via-indigo-700 to-violet-700" />
                {/* Decorative elements inside blur */}
                <div className="absolute inset-0 flex items-center px-[8%] gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="h-10 w-[55%] bg-white/35 rounded-xl" />
                    <div className="h-5 w-[75%] bg-white/20 rounded-lg" />
                    <div className="h-5 w-[45%] bg-white/15 rounded-lg" />
                    <div className="flex gap-3 pt-2">
                      <div className="h-8 w-28 bg-white/25 rounded-full" />
                      <div className="h-8 w-20 bg-white/15 rounded-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="space-y-2">
                      <div className="w-20 h-3 bg-white/20 rounded" />
                      <div className="w-16 h-3 bg-white/15 rounded" />
                      <div className="w-24 h-3 bg-white/20 rounded" />
                    </div>
                    <div className="w-24 h-24 rounded-full bg-white/20" />
                  </div>
                </div>
              </div>

              {/* Lock overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-on-surface/25 backdrop-blur-[1px]">
                <div className="glass-card px-7 py-5 rounded-2xl text-center shadow-xl">
                  <span className="material-symbols-outlined text-3xl text-on-surface mb-2 block">
                    lock
                  </span>
                  <p className="font-bold text-on-surface text-sm mb-1">
                    Your Custom LinkedIn Banner
                  </p>
                  <p className="text-on-surface-variant text-xs mb-4">
                    1584×396px · Tailored to your brand &amp; industry
                  </p>
                  <button
                    onClick={() => setShowUnlockModal(true)}
                    className="flex items-center gap-2 bg-[#0A66C2] text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-[#0A66C2]/90 transition-all mx-auto shadow-md"
                  >
                    <span className="material-symbols-outlined text-base">lock_open</span>
                    Unlock Banner Design
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          WHAT'S INCLUDED — always visible
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-16 bg-surface-container-low/50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
              Everything Included
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
              30 Days. <span className="gradient-text">Zero Guesswork.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "edit_note",
                title: "Full Post Copy",
                desc: "Complete, ready-to-post content. Not just a topic — the entire post.",
                color: "text-violet-600",
                bg: "from-violet-500/15 to-indigo-500/5",
                tag: "FREE",
              },
              {
                icon: "lightbulb",
                title: "Strategic Rationale",
                desc: "Why each post is designed that way — algorithm logic, psychology, proven tactics.",
                color: "text-emerald-600",
                bg: "from-emerald-500/15 to-teal-500/5",
                tag: "FREE",
              },
              {
                icon: "schedule",
                title: "Optimal Post Times",
                desc: "Data-backed best times for your niche and time zone.",
                color: "text-amber-600",
                bg: "from-amber-500/15 to-orange-500/5",
                tag: "FREE",
              },
              {
                icon: "tag",
                title: "Hashtag Strategy",
                desc: "Targeted, curated hashtags per post — not generic spam.",
                color: "text-blue-600",
                bg: "from-blue-500/15 to-cyan-500/5",
                tag: "FREE",
              },
              {
                icon: "image",
                title: "AI Image Prompts",
                desc: "Detailed prompts for Midjourney, DALL·E, or Canva AI — matched to your brand colors.",
                color: "text-rose-600",
                bg: "from-rose-500/15 to-pink-500/5",
                tag: "PREMIUM",
              },
              {
                icon: "videocam",
                title: "Video Script Concepts",
                desc: "30–60 second outlines for LinkedIn Video, Reels, and Shorts.",
                color: "text-[#0A66C2]",
                bg: "from-[#0A66C2]/15 to-blue-400/5",
                tag: "PREMIUM",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.bg} flex items-center justify-center`}
                  >
                    <span className={`material-symbols-outlined text-2xl ${item.color}`}>
                      {item.icon}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-black px-2.5 py-1 rounded-full tracking-wider ${
                      item.tag === "FREE"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-[#0A66C2]/10 text-[#0A66C2]"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-2">{item.title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CONTENT PILLARS
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
            Content Architecture
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-3">
            Built on 4 Proven Pillars
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">
            Strategically distributed across post types for maximum LinkedIn growth.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            {
              pillar: "Authority",
              icon: "workspace_premium",
              count: "8 posts",
              desc: "Position you as the expert",
              color: "from-violet-500 to-indigo-600",
              pct: "27%",
            },
            {
              pillar: "Storytelling",
              icon: "auto_stories",
              count: "8 posts",
              desc: "Build connection through narrative",
              color: "from-rose-500 to-pink-600",
              pct: "27%",
            },
            {
              pillar: "Education",
              icon: "school",
              count: "8 posts",
              desc: "Teach & get saved — algorithms love it",
              color: "from-blue-500 to-cyan-600",
              pct: "27%",
            },
            {
              pillar: "Engagement",
              icon: "forum",
              count: "6 posts",
              desc: "Polls & conversations that go viral",
              color: "from-emerald-500 to-teal-600",
              pct: "20%",
            },
          ].map((p, idx) => (
            <div
              key={idx}
              className="glass-card rounded-2xl p-6 text-center hover:-translate-y-2 transition-all duration-300 group"
            >
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <span className="material-symbols-outlined text-white text-2xl">{p.icon}</span>
              </div>
              <div
                className={`text-2xl font-black bg-gradient-to-br ${p.color} bg-clip-text text-transparent mb-1`}
              >
                {p.pct}
              </div>
              <h3 className="text-base font-bold text-on-surface mb-1">{p.pillar}</h3>
              <p className="text-xs font-semibold text-primary mb-2">{p.count}</p>
              <p className="text-xs text-on-surface-variant leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 px-6 lg:px-16 bg-surface-container-low/50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-3xl font-bold text-on-surface">Questions? Answered.</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="glass-card rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-on-surface text-sm pr-4">{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-primary shrink-0 transition-transform duration-300 ${openFaq === idx ? "rotate-180" : ""}`}
                  >
                    expand_more
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A66C2]/8 via-transparent to-primary/8 pointer-events-none" />
          <div className="ambient-glow top-[-60px] right-[-60px] opacity-20 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs font-bold text-[#0A66C2] uppercase tracking-widest mb-4">
              Start Today
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-6 leading-tight">
              Your Best LinkedIn Month{" "}
              <span className="gradient-text">Starts Now</span>
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg max-w-xl mx-auto mb-10">
              Paste your LinkedIn URL. Get 30 days of personalized posts, image prompts,
              and video concepts — free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setPageState("input");
                }}
                className="group inline-flex items-center justify-center gap-2 bg-[#0A66C2] text-white font-bold px-10 py-4 rounded-2xl hover:bg-[#0A66C2]/90 transition-all hover:scale-105 shadow-xl hover:shadow-[#0A66C2]/20 text-lg"
              >
                <LinkedInLogo className="w-5 h-5" />
                Generate My Content Plan
              </button>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-outline-variant text-on-surface font-semibold px-8 py-4 rounded-2xl hover:border-primary/40 hover:text-primary transition-all text-lg"
              >
                Talk to Abhay Instead
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PREMIUM UNLOCK MODAL
      ══════════════════════════════════════════════════════ */}
      {showUnlockModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-on-surface/40 backdrop-blur-sm"
            onClick={() => setShowUnlockModal(false)}
          />
          <div className="relative glass-card rounded-3xl p-8 max-w-md w-full z-10 shadow-2xl">
            <button
              onClick={() => setShowUnlockModal(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-[#0A66C2]/10 flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl text-primary">
                  lock_open
                </span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">
                Unlock Premium Content
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Add your brand colors to get perfectly tailored image prompts, video
                scripts, and your custom LinkedIn banner design.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-xs font-bold text-on-surface uppercase tracking-widest">
                Your Brand Colors
              </p>
              {[
                { label: "Primary Color", key: "primary" as const, hint: "Your main brand color" },
                { label: "Accent Color", key: "accent" as const, hint: "Secondary / highlight color" },
                { label: "Background", key: "background" as const, hint: "Light or dark preference" },
              ].map((field) => (
                <div key={field.key} className="flex items-center gap-3">
                  <input
                    type="color"
                    value={brandColors[field.key]}
                    onChange={(e) =>
                      setBrandColors((p) => ({ ...p, [field.key]: e.target.value }))
                    }
                    className="w-10 h-10 rounded-lg border border-outline-variant/50 cursor-pointer bg-transparent shrink-0"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-on-surface">{field.label}</p>
                    <p className="text-xs text-on-surface-variant">{field.hint}</p>
                  </div>
                  <code className="text-xs font-mono text-on-surface-variant shrink-0">
                    {brandColors[field.key]}
                  </code>
                </div>
              ))}
            </div>

            <Link
              href="/contact"
              className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-container transition-all text-sm"
            >
              <span className="material-symbols-outlined text-lg">mail</span>
              Contact Abhay to Unlock Premium
            </Link>
            <p className="text-xs text-center text-on-surface-variant/50 mt-3">
              Premium includes image prompts, video scripts &amp; LinkedIn banner
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
