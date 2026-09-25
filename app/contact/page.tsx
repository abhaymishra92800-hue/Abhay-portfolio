"use client";

import { useState } from "react";
import { site } from "@/lib/site";

const channels = [
  { icon: "mail", label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: "chat", label: "WhatsApp", value: site.phone, href: site.whatsapp },
  { icon: "person", label: "LinkedIn", value: "abhaymishrahere", href: site.linkedin },
];

const topics = ["Video editing", "Shorts & reels", "YouTube management", "LinkedIn management", "Content automation", "Something else"];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");

  // No backend needed: opens the visitor's mail app with everything filled in.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `${topic} enquiry from ${name}`;
    const body = `Hi Abhay,\n\n${message}\n\n${name}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const input =
    "w-full rounded-xl border border-outline-variant/60 bg-surface-container-lowest px-4 py-3 text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

  return (
    <div className="pt-28 pb-20 px-6 lg:px-16 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-4">Let&apos;s work together</h1>
        <p className="text-lg text-on-surface-variant">
          Tell me about your project. I reply within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="group glass-card rounded-2xl p-6 border border-outline-variant/40 hover:border-primary hover:-translate-y-1 transition-all text-center"
          >
            <span className="material-symbols-outlined text-primary text-3xl mb-2 block">{c.icon}</span>
            <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-1">{c.label}</p>
            <p className="font-semibold text-on-surface group-hover:text-primary transition-colors break-all">{c.value}</p>
          </a>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-6 md:p-10 border border-outline-variant/40 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block">
            <span className="block text-sm font-semibold text-on-surface mb-2">Your name</span>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={input} placeholder="Jane Smith" />
          </label>
          <label className="block">
            <span className="block text-sm font-semibold text-on-surface mb-2">What do you need?</span>
            <select value={topic} onChange={(e) => setTopic(e.target.value)} className={input}>
              {topics.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="block">
          <span className="block text-sm font-semibold text-on-surface mb-2">Project details</span>
          <textarea
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={input}
            placeholder="Your channel link, what you want edited, and your timeline."
          />
        </label>
        <button
          type="submit"
          className="w-full md:w-auto bg-primary hover:bg-primary-container text-white font-bold px-10 py-3.5 rounded-full shadow-md hover:scale-105 transition-all"
        >
          Send message
        </button>
      </form>
    </div>
  );
}
