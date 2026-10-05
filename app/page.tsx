import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import WorkShowcase from "@/components/WorkShowcase";
import AutoVideo from "@/components/AutoVideo";
import YouTubeLoop from "@/components/YouTubeLoop";
import VideoGrid from "@/components/VideoGrid";
import Testimonials from "@/components/Testimonials";
import { workCategories, longFormVideos, shortFormVideos } from "@/lib/videos";
import { site, services, credibilityStats } from "@/lib/site";

// Hero numbers come straight from the portfolio data, so they stay true as work is added.
const allWork = workCategories.flatMap((c) => c.items);
const projectCount = Math.floor(allWork.length / 5) * 5;

const stats = [...credibilityStats, { value: `${projectCount}+`, label: "Ad & film projects" }];

// One clip per kind of work, shown behind the profile photo in the hero.
const heroClips = {
  ugc: { src: "/portfolio/dogshood.mp4", poster: "/portfolio/dogshood.jpg", title: "UGC ad" },
  realEstate: { src: "/portfolio/srijan-orizon.mp4", poster: "/portfolio/srijan-orizon.jpg", title: "Real estate ad" },
  short: { src: "/portfolio/hero-short.mp4", poster: "/portfolio/hero-short.jpg", title: "Short-form edit" },
  long: { id: "-SYqXdaZXl8", title: "Long-form edit", start: 90 }, // Circle: Dan Koe interview
};

function HeroLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`absolute z-20 text-[9px] sm:text-[11px] font-bold text-on-surface bg-white/90 backdrop-blur px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow ${className}`}
    >
      {children}
    </span>
  );
}

const steps = [
  { icon: "chat", title: "Share the idea", desc: "Send a one-line idea, your footage, or a project link. A short brief fixes the goal before I start." },
  { icon: "edit_square", title: "I script, design, and edit", desc: "Hook, story, motion graphics, captions, and sound, built around the action you want viewers to take." },
  { icon: "rocket_launch", title: "Post it, with revisions", desc: "You get a video ready for ads or social, and I adjust it until it works for you." },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="ambient-glow -top-24 -left-24"></div>
      <div className="ambient-glow-2 top-1/2 -right-24"></div>

      {/* ─── HERO ─── */}
      <section className="relative bg-gradient-to-br from-orange-50 via-purple-100 to-purple-300 pt-24 lg:pt-28 pb-14 border-b border-outline-variant/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <h1 className="font-extrabold text-on-surface leading-[1.12] tracking-tight mb-5 text-[clamp(1.5rem,6.6vw,2.6rem)] lg:text-[clamp(1.8rem,3.2vw,3.3rem)]">
              <span className="block whitespace-nowrap">Videos and content that</span>
              <span className="block whitespace-nowrap gradient-text">grow your business.</span>
            </h1>
            <p className="text-base md:text-xl text-on-surface-variant mb-6 md:mb-8 max-w-xl leading-relaxed">
              I&apos;m Abhay, a video editor and social media manager. Long-form YouTube, shorts and reels,
              ads and launch films, plus YouTube and LinkedIn management for creators, founders, and brands.
            </p>

            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6">
              <a
                href={site.callHref}
                target="_blank"
                rel="noreferrer"
                className="bg-primary hover:bg-primary-container text-white font-semibold py-3 px-5 text-sm md:text-base md:py-3.5 md:px-8 rounded-full transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">call</span>
                Book a call
              </a>
              <a
                href="#work"
                className="bg-white/80 hover:bg-white border border-outline-variant/60 text-on-surface font-semibold py-3 px-5 text-sm md:text-base md:py-3.5 md:px-8 rounded-full transition-all duration-300 shadow-sm hover:scale-105 flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">play_circle</span>
                See the work
              </a>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {["Long-form YouTube", "Shorts & reels", "Ads & launch films", "Social media"].map((t) => (
                <span key={t} className="text-[11px] md:text-xs font-semibold text-primary bg-white/70 border border-primary/20 px-3 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-5 max-w-xl">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl md:text-4xl font-extrabold text-on-surface leading-none mb-1.5">{s.value}</p>
                  <p className="text-[11px] md:text-xs text-on-surface-variant uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Photo in front; one clip per kind of work playing softly behind */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px] sm:max-w-md lg:max-w-[480px] aspect-[5/6]">
              <div className="absolute left-0 top-[3%] w-[31%] -rotate-6 opacity-80 z-0">
                <AutoVideo quiet {...heroClips.short} className="aspect-[9/16] rounded-xl ring-1 ring-white/70 shadow-xl" />
                <HeroLabel className="left-1 top-1">Short-form edit</HeroLabel>
              </div>
              <div className="absolute left-[34%] top-0 w-[31%] opacity-70 z-0">
                <AutoVideo quiet {...heroClips.realEstate} className="aspect-[9/16] rounded-xl ring-1 ring-white/70 shadow-xl" />
                <HeroLabel className="left-1 top-1">Real estate ad</HeroLabel>
              </div>
              <div className="absolute right-0 top-[3%] w-[31%] rotate-6 opacity-80 z-0">
                <AutoVideo quiet {...heroClips.ugc} className="aspect-[9/16] rounded-xl ring-1 ring-white/70 shadow-xl" />
                <HeroLabel className="left-1 top-1">UGC ad</HeroLabel>
              </div>
              <div className="absolute right-[-3%] bottom-[9%] w-[46%] rotate-3 opacity-90 z-[5]">
                <YouTubeLoop {...heroClips.long} className="aspect-video rounded-xl ring-1 ring-white/70 shadow-xl" />
                <HeroLabel className="left-1 top-1">Long-form edit</HeroLabel>
              </div>

              <div className="absolute left-[2%] bottom-0 w-[58%] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white/80 shadow-2xl z-10 bg-gradient-to-tr from-indigo-100 via-purple-50 to-pink-50">
                <Image
                  src={site.photo}
                  alt={site.name}
                  fill
                  sizes="(max-width: 1024px) 58vw, 280px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LONG-FORM & SHORTS ─── */}
      <section id="long-form" className="py-14 md:py-20 scroll-mt-20 border-b border-outline-variant/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">YouTube</p>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">Long-form edits</h2>
              <p className="text-on-surface-variant">Episodes, podcasts, and explainers. Click to play.</p>
            </div>
          </ScrollReveal>
          <VideoGrid videos={longFormVideos.slice(0, 6)} />
          <div className="mt-6 text-center">
            <Link href="/portfolio#long-form" className="text-sm font-bold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
              See all {longFormVideos.length} videos
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>

          <div className="text-center mt-14 mb-8">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Short-form</p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Shorts &amp; reels</h2>
          </div>
          <VideoGrid videos={shortFormVideos} vertical />
        </div>
      </section>

      {/* ─── AD & BRAND WORK ─── */}
      <section id="work" className="py-14 md:py-20 bg-surface-container-low/40 border-b border-outline-variant/30 scroll-mt-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-10 md:mb-14">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Ads &amp; brand films</p>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-on-surface mb-3 md:mb-4">Ads and films made to get the viewer to act.</h2>
              <p className="text-on-surface-variant text-base md:text-lg">
                Property launches, UGC ads, cinematic films, and explainers for real brands. Tap a video to hear it.
              </p>
            </div>
          </ScrollReveal>
          <WorkShowcase categories={workCategories} initial={6} />
          <div className="mt-14 text-center">
            <Link href="/portfolio" className="text-sm font-bold text-primary inline-flex items-center gap-1 hover:gap-2 transition-all">
              See all work
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-14 md:py-20 border-b border-outline-variant/30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">How it works</p>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface">From idea to a video that&apos;s ready to run</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal stagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {steps.map((s, i) => (
                <div key={s.title} className="reveal glass-card rounded-3xl p-7 text-center border border-outline-variant/40 bg-surface-container-lowest">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                  </div>
                  <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Step {i + 1}</p>
                  <h3 className="text-lg font-bold text-on-surface mb-2">{s.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Testimonials />

      {/* ─── SERVICES ─── */}
      <section className="py-14 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">What I do</p>
              <h2 className="text-3xl md:text-4xl font-bold text-on-surface">Editing, social media, and automation</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal stagger>
            <div className="flex flex-wrap justify-center gap-6">
              {services.map((s) => (
                <Link
                  key={s.title}
                  href="/services"
                  className="reveal group block glass-card rounded-3xl p-7 text-center border border-outline-variant/40 hover:border-primary hover:-translate-y-1 hover:shadow-xl transition-all bg-surface-container-lowest w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                    <span className="material-symbols-outlined text-2xl">{s.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-4">{s.desc}</p>
                  <div className="hidden sm:flex flex-wrap justify-center gap-2">
                    {s.tools.map((t) => (
                      <span key={t} className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CONTACT CTA ─── */}
      <ScrollReveal>
        <section className="py-16 px-6 lg:px-16 max-w-[1400px] mx-auto">
          <div className="rounded-3xl p-10 md:p-16 text-center bg-gradient-to-br from-indigo-600 to-purple-700 shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Let&apos;s make a video that sells.</h2>
            <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl mx-auto">
              Tell me what you&apos;re promoting. I&apos;ll reply within 24 hours with how I&apos;d approach it.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={site.callHref}
                target="_blank"
                rel="noreferrer"
                className="bg-white text-primary font-bold px-8 py-3.5 rounded-full shadow-md hover:scale-105 transition-all inline-flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-lg" aria-hidden="true">call</span>
                Book a call
              </a>
              <Link
                href="/contact"
                className="bg-white/15 hover:bg-white/25 border border-white/40 text-white font-bold px-8 py-3.5 rounded-full hover:scale-105 transition-all"
              >
                Send a message
              </Link>
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
