import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import VideoGrid from "@/components/VideoGrid";
import { longFormVideos, shortFormVideos } from "@/lib/videos";
import { site, services, beliefs } from "@/lib/site";


const stats = [
  { value: "400+", label: "Videos edited" },
  { value: "1M+", label: "Audience reach" },
  { value: "30%", label: "Audience retention" },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="ambient-glow -top-24 -left-24"></div>
      <div className="ambient-glow-2 top-1/2 -right-24"></div>

      {/* ─── HERO ─── */}
      <section className="relative bg-gradient-to-br from-orange-50 via-purple-100 to-purple-300 pt-32 pb-16 border-b border-outline-variant/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface leading-[1.1] tracking-tight mb-5">
              Hi, I&apos;m Abhay.
              <br />
              <span className="gradient-text">I edit videos and run social media.</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant mb-8 max-w-xl leading-relaxed">
              Video editor and social media manager for creators and founders. Long-form YouTube,
              shorts, LinkedIn, and the content systems that keep them shipping.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#work"
                className="bg-primary hover:bg-primary-container text-white font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">play_circle</span>
                View my work
              </a>
              <Link
                href="/contact"
                className="bg-white/80 hover:bg-white border border-outline-variant/60 text-on-surface font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-sm hover:scale-105 flex items-center gap-2"
              >
                Hire me
                <span className="material-symbols-outlined text-lg" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-md">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-extrabold text-on-surface">{s.value}</p>
                  <p className="text-xs text-on-surface-variant uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
              <div className="relative rounded-3xl overflow-hidden glass-card p-3 shadow-2xl border border-white/60 bg-white/40">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-tr from-indigo-100 via-purple-50 to-pink-50">
                  <Image
                    src={site.photo}
                    alt={site.name}
                    fill
                    sizes="(max-width: 1024px) 90vw, 45vw"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED WORK ─── */}
      <section id="work" className="py-20 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Portfolio</p>
                <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Long-form edits</h2>
                <p className="text-on-surface-variant mt-2">YouTube episodes, podcasts, and explainers. Click to play.</p>
              </div>
              <Link
                href="/portfolio"
                className="text-sm font-bold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                See all {longFormVideos.length} videos
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </ScrollReveal>
          <VideoGrid videos={longFormVideos.slice(0, 6)} />

          <div className="mt-20 mb-10">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Short-form</p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Shorts & reels</h2>
          </div>
          <VideoGrid videos={shortFormVideos} vertical />
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-20 bg-surface-container-low/40">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">What I do</p>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Editing, social, and automation</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="reveal glass-card rounded-3xl p-7 border border-outline-variant/40 hover:-translate-y-1 hover:shadow-xl transition-all bg-surface-container-lowest"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-2">{s.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {s.tools.map((t) => (
                      <span key={t} className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── HOW I WORK ─── */}
      <section className="py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">How I work</p>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Brief first, systems always</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal stagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {beliefs.map((b) => (
                <div key={b.title} className="reveal glass-card rounded-3xl p-7">
                  <span className="material-symbols-outlined text-primary text-3xl mb-3 block">{b.icon}</span>
                  <h3 className="text-lg font-bold text-on-surface mb-2">{b.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{b.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CONTACT CTA ─── */}
      <ScrollReveal>
        <section className="py-16 px-6 lg:px-16 max-w-[1400px] mx-auto">
          <div className="rounded-3xl p-10 md:p-16 text-center bg-gradient-to-br from-indigo-600 to-purple-700 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Have a video to edit?</h2>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl mx-auto">
              Send me your footage or your channel link and I&apos;ll get back to you within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="bg-white text-primary font-bold px-8 py-3.5 rounded-full shadow-md hover:scale-105 transition-all"
              >
                Get in touch
              </Link>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3.5 rounded-full shadow-md hover:scale-105 transition-all"
              >
                WhatsApp {site.phone}
              </a>
            </div>
            <a href={`mailto:${site.email}`} className="inline-block mt-6 text-white/80 hover:text-white text-sm font-semibold">
              {site.email}
            </a>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
