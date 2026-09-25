"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { AbTest } from "@/components/AbTest";
import { EmailCapture } from "@/components/EmailCapture";

// Owner must set NEXT_PUBLIC_BOOKING_URL (e.g. a Calendly link) to enable the
// "Book a call" variant. Until then the A/B test falls back to the form only.
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? "";

const SERVICE_MAP: Record<string, string> = {
  "content-engine": "Video Editing",
  "linkedin-funnel-system": "YouTube Growth",
  "production-pod": "Short-form / Reels",
  "thumbnails": "Thumbnails & Graphics",
};

function ContactForm() {
  const searchParams = useSearchParams();
  const presetService = (() => {
    const key = searchParams.get("service") ?? "";
    return SERVICE_MAP[key] ?? "";
  })();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: presetService,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (presetService) {
      setFormData((prev) => ({ ...prev, subject: presetService }));
    }
  }, [presetService]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Save message to Firebase Firestore
      await addDoc(collection(db, "contacts"), {
        name: formData.name,
        email: formData.email,
        subject: formData.subject || "General Inquiry",
        message: formData.message,
        createdAt: serverTimestamp(),
      });

      // Send email notification to admin via Resend API
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || "",
          message: formData.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      console.error("Error submitting contact form:", err);
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message || "Something went wrong. Please try again or email me directly at abhaymishra92800@gmail.com.");
    } finally {
      setLoading(false);
    }
  };

  const socials = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/byanuj4u/",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      color: "hover:text-[#0A66C2]",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/9123997677",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      color: "hover:text-green-600",
    },
    {
      name: "Telegram",
      href: "https://t.me/anujmishra4u",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      color: "hover:text-[#26A5E4]",
    },
    {
      name: "Skype",
      href: "https://join.skype.com/invite/yCZ9IhClcTvD",
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C6.73 0 2.4 3.22 1.04 7.84L0 7.84C0 5.02 2.24 2.74 5 2.74C7.76 2.74 10 5.02 10 7.84C10 10.66 7.76 12.94 5 12.94C4.67 12.94 4.35 12.91 4.04 12.84L4.04 12.84C4.52 16.14 7.4 18.74 11 18.74C16.27 18.74 20.6 14.52 20.6 9.24C20.6 4.01 16.27 0 12 0ZM7.4 5.24C6.39 5.24 5.6 6.04 5.6 7.04C5.6 8.04 6.39 8.84 7.4 8.84C8.41 8.84 9.2 8.04 9.2 7.04C9.2 6.04 8.41 5.24 7.4 5.24ZM16.6 16.24C15.59 16.24 14.8 15.44 14.8 14.44C14.8 13.44 15.59 12.64 16.6 12.64C17.61 12.64 18.4 13.44 18.4 14.44C18.4 15.44 17.61 16.24 16.6 16.24Z"/>
        </svg>
      ),
      color: "hover:text-[#00AFF0]",
    },
  ];

  return (
    <div className="py-12 px-6 lg:px-16 max-w-[1400px] mx-auto relative overflow-hidden">
      {/* Background Glow */}
      <div className="ambient-glow top-0 left-[-100px]"></div>
      <div className="ambient-glow-2 bottom-10 right-[-100px]"></div>

      {/* Hero Section */}
      <div className="text-center mb-16 max-w-2xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-primary font-semibold text-xs tracking-wide uppercase mb-6 shadow-sm">
          Get In Touch
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-on-surface mb-6 leading-tight">
          Let&apos;s work <span className="gradient-text">together.</span>
        </h1>
        <p className="text-base md:text-lg text-on-surface-variant leading-relaxed max-w-xl mx-auto">
          Whether you need a single video edited or a full content operation running — I&apos;d love to hear about it.
        </p>

        {BOOKING_URL ? (
          <div className="mt-8 flex justify-center">
            <AbTest
              experiment="contact_cta"
              variantA={null}
              variantB={
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-4 rounded-full shadow-lg hover:bg-primary-container hover:text-on-primary-container hover:scale-105 transition-all"
                >
                  Book a call
                  <span className="material-symbols-outlined">event</span>
                </a>
              }
            />
          </div>
        ) : (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/9123997677"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-full shadow-md hover:scale-105 transition-all text-sm"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp me
            </a>
            <a
              href="mailto:abhaymishra92800@gmail.com"
              className="inline-flex items-center gap-2 bg-surface border border-outline-variant hover:border-primary text-on-surface font-bold px-6 py-3 rounded-full hover:scale-105 transition-all text-sm"
            >
              <span className="material-symbols-outlined text-base">mail</span>
              Send an email
            </a>
          </div>
        )}
      </div>

      {/* Bento Layout for Contact */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Direct Email */}
          <div className="glass-card rounded-3xl p-8 hover:scale-[1.01] transition-transform duration-300 relative">
            <div className="gradient-border"></div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary/20 to-primary/5 flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-2xl">mail</span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-2">Email me directly</h3>
            <p className="text-on-surface-variant text-sm mb-4">I aim to respond within 24 hours.</p>
            <a
              href="mailto:abhaymishra92800@gmail.com"
              className="text-lg font-bold text-primary hover:underline decoration-primary/50 block"
            >
              abhaymishra92800@gmail.com
            </a>
            <a
              href="mailto:abhaymishra92800@gmail.com"
              className="text-xs font-semibold text-on-surface-variant hover:text-primary mt-1 block"
            >
              abhaymishra92800@gmail.com
            </a>
          </div>

          {/* What I can help with */}
          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-xs font-bold text-on-surface-variant mb-4 uppercase tracking-wider">
              I can help with
            </h3>
            <ul className="space-y-3">
              {[
                { icon: "smart_display", label: "Long-form YouTube editing" },
                { icon: "movie_filter", label: "Short-form & reel cuts" },
                { icon: "image", label: "Thumbnails & channel branding" },
                { icon: "trending_up", label: "YouTube growth strategy" },
                { icon: "campaign", label: "Google / LinkedIn ad campaigns" },
                { icon: "group", label: "Full content team management" },
              ].map((item) => (
                <li
                  key={item.label}
                  className="flex items-center gap-3 text-sm text-on-surface"
                >
                  <span className="material-symbols-outlined text-primary text-lg shrink-0">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Grid */}
          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-xs font-bold text-on-surface-variant mb-4 uppercase tracking-wider">
              Find me on
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-3 p-3.5 rounded-xl bg-surface hover:bg-secondary-container transition-all group border border-outline-variant/30 text-on-surface ${social.color}`}
                >
                  <span className="shrink-0">{social.icon}</span>
                  <span className="font-semibold text-sm">{social.name}</span>
                  <span className="material-symbols-outlined text-base ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    arrow_outward
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Email capture (sidebar) */}
          <EmailCapture
            source="contact-sidebar"
            variant="sidebar"
            title="Or just drop your email"
            description="Get the next breakdown straight to your inbox. No call, no commitment."
            buttonLabel="Join the list"
          />
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <h2 className="text-3xl font-bold text-on-surface mb-6">Send a message</h2>

          {success ? (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center animate-in fade-in duration-300">
              <span className="material-symbols-outlined text-emerald-600 text-5xl mb-3">
                check_circle
              </span>
              <h3 className="text-xl font-bold text-emerald-950 mb-2">Message Sent Successfully!</h3>
              <p className="text-emerald-800 text-sm mb-6">
                Thank you for reaching out. Abhay will get back to you shortly.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="bg-emerald-600 text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-emerald-700 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 text-red-700 text-xs font-semibold">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                  Project type
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors appearance-none"
                  style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23808080'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.75rem center", backgroundSize: "1.5rem" }}
                >
                  <option value="">Select what you need help with</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Short-form / Reels">Short-form / Reels</option>
                  <option value="Thumbnails & Graphics">Thumbnails & Graphics</option>
                  <option value="YouTube Growth">YouTube Growth</option>
                  <option value="Paid Ads">Paid Ads</option>
                  <option value="Full Content Team">Full Content Team</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                  Message *
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell me about your project, channel size, and what success looks like..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-surface border border-outline-variant rounded-xl px-4 py-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-primary hover:bg-primary-container text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span className="material-symbols-outlined text-sm">send</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center text-on-surface-variant">Loading…</div>}>
      <ContactForm />
    </Suspense>
  );
}
