"use client";

import React, { useState } from "react";
import Link from "next/link";

// ─── Types ─────────────────────────────────────────────────────────────────────
type PageState = "input" | "generating" | "preview";
type EmailState = "idle" | "sending" | "sent";

const PLATFORMS = [
  { id: "reels-shorts", label: "Reels & Shorts", icon: "smart_display" },
  { id: "tiktok", label: "TikTok", icon: "music_note" },
  { id: "all", label: "All platforms", icon: "apps" },
];

const SAMPLE_HOOKS = [
  { hook: "Stop scrolling — this niche mistake is costing you followers", angle: "Curiosity", format: "Reel" },
  { hook: "I tried the worst advice on the internet so you don't have to", angle: "Story", format: "Short" },
  { hook: "Nobody talks about this truth (and it changed everything)", angle: "Controversy", format: "TikTok" },
  { hook: "3 habits that quietly ruined my growth", angle: "List", format: "Reel" },
  { hook: "The result I got in 30 days will surprise you", angle: "Result", format: "Short" },
  { hook: "Everyone gets this step wrong — here's the fix", angle: "Myth-Bust", format: "Reel" },
  { hook: "Behind the scenes of an actual creator's workflow", angle: "Behind-the-Scenes", format: "TikTok" },
  { hook: "The first thing I'd change if I restarted from zero", angle: "Question", format: "Short" },
];

const FAQS = [
  {
    q: "What will the swipe file actually contain?",
    a: "30 ready-to-use hook lines tailored to your niche, each tagged with its angle (curiosity, controversy, story, etc.), the best format, and a matching on-screen caption.",
  },
  {
    q: "Can I use these on TikTok too?",
    a: "Yes. The hooks work across Reels, YouTube Shorts, and TikTok — short-form attention mechanics are the same everywhere.",
  },
  {
    q: "Is it really free?",
    a: "Completely free. The 30-hook swipe file is yours at no cost. If you want help scripting and editing your videos, you can book a call — no obligation.",
  },
];

const ANGLE_COLORS: Record<string, { text: string; bg: string }> = {
  Curiosity: { text: "text-violet-600", bg: "bg-violet-50 border-violet-200/60" },
  Controversy: { text: "text-red-600", bg: "bg-red-50 border-red-200/60" },
  Story: { text: "text-pink-600", bg: "bg-pink-50 border-pink-200/60" },
  List: { text: "text-blue-600", bg: "bg-blue-50 border-blue-200/60" },
  Result: { text: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200/60" },
  Question: { text: "text-amber-600", bg: "bg-amber-50 border-amber-200/60" },
  "Myth-Bust": { text: "text-teal-600", bg: "bg-teal-50 border-teal-200/60" },
  "Behind-the-Scenes": { text: "text-indigo-600", bg: "bg-indigo-50 border-indigo-200/60" },
};

// ─── Page Component ────────────────────────────────────────────────────────────
export default function ReelHooksPage() {
  const [niche, setNiche] = useState("");
  const [platform, setPlatform] = useState("reels-shorts");
  const [nicheError, setNicheError] = useState("");
  const [pageState, setPageState] = useState<PageState>("input");
  const [email, setEmail] = useState("");
  const [emailState, setEmailState] = useState<EmailState>("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setNicheError("");
    if (!niche.trim()) {
      setNicheError("Tell us your niche so we can tailor the hooks.");
      return;
    }
    setPageState("generating");
    await new Promise((r) => setTimeout(r, 1600));
    setPageState("preview");
    setTimeout(() => {
      document.getElementById("preview-anchor")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailState("sending");
    try {
      const res = await fetch("/api/reel-hooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          niche,
          email,
          platform: platform === "all" ? "Reels, Shorts & TikTok" : platform,
        }),
      });
      if (!res.ok) throw new Error();
      setEmailState("sent");
    } catch {
      setEmailState("idle");
    }
  };

  return (
    <div className="min-h-screen bg-surface overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-glow top-[-80px] left-[10%] opacity-60" />
        <div className="ambient-glow-2 bottom-[15%] right-[-5%] opacity-40" />
      </div>

      {/* HERO */}
      <section className="relative pt-10 pb-10 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6355ff]/10 border border-[#6355ff]/20 text-[#6355ff] font-semibold text-xs tracking-wide uppercase mb-7">
            <span className="material-symbols-outlined text-base">smart_display</span>
            Free Hook Swipe File
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface leading-[1.2] mb-5 text-balance mx-auto max-w-4xl">
            30 <span className="gradient-text">Scroll-Stopping Hooks</span> for Your Niche
          </h1>

          <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-3xl mx-auto mb-8 text-balance">
            Tell us your niche. Our AI writes 30 copy-paste hooks — each tagged with its angle and
            format — so you never stare at a blank script again.
          </p>

          <div className="flex flex-wrap justify-center gap-5 text-sm text-on-surface-variant">
            {[
              { icon: "auto_awesome", text: "AI-written hooks" },
              { icon: "mail", text: "Delivered to inbox" },
              { icon: "content_copy", text: "Copy-paste ready" },
              { icon: "paid", text: "100% free" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INPUT */}
      <section className="px-6 lg:px-16 pb-20 max-w-[1400px] mx-auto">
        <div className="max-w-2xl mx-auto">
          {pageState === "input" && (
            <div className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#6355ff] via-primary to-[#0a66c2]/50 rounded-t-3xl" />
              <div className="absolute top-0 right-0 w-52 h-52 rounded-full bg-[#6355ff]/5 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-[#6355ff] flex items-center justify-center shrink-0 shadow-md">
                    <span className="material-symbols-outlined text-white text-xl">smart_display</span>
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-on-surface leading-tight">What&apos;s your niche?</h2>
                    <p className="text-sm text-on-surface-variant">We&apos;ll tailor every hook to it</p>
                  </div>
                </div>

                <form onSubmit={handleGenerate} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="e.g. fitness coaching, SaaS founders, travel vlogs"
                      value={niche}
                      onChange={(e) => {
                        setNiche(e.target.value);
                        setNicheError("");
                      }}
                      className="w-full px-4 py-4 rounded-xl bg-surface-container border border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-[#6355ff]/30 focus:border-[#6355ff]/50 transition-all text-sm font-medium"
                    />
                    {nicheError && (
                      <p className="text-xs text-error flex items-center gap-1 mt-2">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {nicheError}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">
                      Where will you post?
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {PLATFORMS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPlatform(p.id)}
                          className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all text-sm font-semibold ${
                            platform === p.id
                              ? "border-[#6355ff] bg-[#6355ff]/10 text-[#6355ff]"
                              : "border-outline-variant/50 text-on-surface-variant hover:border-[#6355ff]/30"
                          }`}
                        >
                          <span className="material-symbols-outlined text-xl">{p.icon}</span>
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={!niche.trim()}
                    className="w-full flex items-center justify-center gap-2 bg-[#6355ff] text-white font-bold py-4 rounded-xl hover:bg-[#6355ff]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-[#6355ff]/20 text-base"
                  >
                    <span className="material-symbols-outlined text-xl">auto_awesome</span>
                    Generate My 30 Hooks
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </button>

                  <p className="text-center text-xs text-on-surface-variant/50">
                    No sign-up. Just your niche.
                  </p>
                </form>
              </div>
            </div>
          )}

          {/* Generating state */}
          {pageState === "generating" && (
            <div className="glass-card rounded-3xl p-10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6355ff]/5 to-primary/5 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#6355ff] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#6355ff]/30">
                  <span className="material-symbols-outlined text-white text-3xl animate-pulse">smart_display</span>
                </div>
                <h3 className="text-xl font-bold text-on-surface mb-1.5">Writing Your Hooks</h3>
                <p className="text-sm text-on-surface-variant mb-8">
                  Crafting 30 scroll-stoppers for &ldquo;{niche}&rdquo;&hellip;
                </p>
                <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden mb-4">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#6355ff] to-[#0a66c2] w-2/3 animate-pulse" />
                </div>
                <p className="text-xs text-on-surface-variant/60">Mixing curiosity, controversy, story &amp; more…</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PREVIEW */}
      {pageState === "preview" && (
        <section id="preview-anchor" className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold text-xs mb-4">
              <span className="material-symbols-outlined text-base">check_circle</span>
              Your Swipe File Is Ready!
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-on-surface mb-3">
              A Sneak Peek of Your 30 Hooks
            </h2>
            <p className="text-on-surface-variant max-w-lg mx-auto">
              Enter your email below to get all 30 in your inbox — completely free.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-12">
            {emailState === "sent" ? (
              <div className="glass-card rounded-2xl p-6 text-center border border-emerald-200/60 bg-emerald-50/40">
                <span className="material-symbols-outlined text-4xl text-emerald-500 mb-3 block">check_circle</span>
                <h3 className="font-bold text-on-surface mb-1">Check your inbox! 🎉</h3>
                <p className="text-sm text-on-surface-variant">
                  Your 30 hooks are on their way to <strong>{email}</strong>
                </p>
                <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    href="/funnels"
                    className="inline-flex items-center justify-center gap-2 border-2 border-outline-variant text-on-surface font-semibold px-6 py-3 rounded-xl hover:border-primary/40 hover:text-primary transition-all text-sm"
                  >
                    Explore more free tools
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-[#6355ff] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#6355ff]/90 transition-all text-sm"
                  >
                    Work with Abhay
                  </Link>
                </div>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-6 border-2 border-[#6355ff]/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6355ff]/4 to-primary/4 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-[#6355ff] text-xl">mark_email_read</span>
                    <p className="font-bold text-on-surface">Where should we send your hooks?</p>
                  </div>
                  <form onSubmit={handleEmailSubmit} className="flex gap-3">
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl bg-surface-container border border-outline-variant/50 text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-[#6355ff]/30 focus:border-[#6355ff]/50 transition-all text-sm"
                    />
                    <button
                      type="submit"
                      disabled={emailState === "sending"}
                      className="flex items-center gap-1.5 bg-[#6355ff] text-white font-bold px-5 py-3 rounded-xl hover:bg-[#6355ff]/90 disabled:opacity-60 transition-all shrink-0 text-sm"
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
                    No spam. Just your hook swipe file.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sample hook cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-4xl mx-auto">
            {SAMPLE_HOOKS.map((h, i) => {
              const tone = ANGLE_COLORS[h.angle] || { text: "text-primary", bg: "bg-primary-fixed" };
              return (
                <div key={i} className="glass-card rounded-2xl p-5 relative overflow-hidden">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#6355ff] text-white rounded-lg min-w-[28px] h-7 flex items-center justify-center font-bold text-xs shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-on-surface font-semibold text-sm leading-relaxed mb-3">
                        &ldquo;{h.hook}&rdquo;
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border ${tone.bg} ${tone.text}`}>
                          {h.angle}
                        </span>
                        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant">
                          {h.format}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="glass-card rounded-3xl p-6 text-center border-2 border-dashed border-outline-variant/40 max-w-4xl mx-auto">
            <p className="text-on-surface-variant text-sm mb-1">
              <strong className="text-on-surface">+ 22 more hooks</strong> waiting in your inbox
            </p>
            <p className="text-xs text-on-surface-variant/60">
              Each with its angle, best format, and a matching caption
            </p>
          </div>
        </section>
      )}

      {/* FAQ */}
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

      {/* FINAL CTA */}
      <section className="py-24 px-6 lg:px-16 max-w-[1400px] mx-auto">
        <div className="glass-card rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#6355ff]/8 via-transparent to-primary/8 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs font-bold text-[#6355ff] uppercase tracking-widest mb-4">Start Today</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-on-surface mb-6 leading-tight">
              Never Write a <span className="gradient-text">Blank Script</span> Again
            </h2>
            <p className="text-on-surface-variant text-base md:text-lg max-w-xl mx-auto mb-10">
              30 hooks tailored to your niche, ready to paste. Free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setPageState("input");
                }}
                className="group inline-flex items-center justify-center gap-2 bg-[#6355ff] text-white font-bold px-10 py-4 rounded-2xl hover:bg-[#6355ff]/90 transition-all hover:scale-105 shadow-xl hover:shadow-[#6355ff]/20 text-lg"
              >
                <span className="material-symbols-outlined">auto_awesome</span>
                Generate My Hooks
              </button>
              <Link
                href="/funnels"
                className="inline-flex items-center justify-center gap-2 border-2 border-outline-variant text-on-surface font-semibold px-8 py-4 rounded-2xl hover:border-primary/40 hover:text-primary transition-all text-lg"
              >
                See all free tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
