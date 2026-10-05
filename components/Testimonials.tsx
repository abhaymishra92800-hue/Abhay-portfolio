import ScrollReveal from "@/components/ScrollReveal";
import { testimonials } from "@/lib/site";

// Renders nothing until real quotes from Abhay's own clients are added to `testimonials` in lib/site.ts.
export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section className="py-14 md:py-20 bg-surface-container-low/40 border-y border-outline-variant/30">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Kind words</p>
            <h2 className="text-3xl md:text-4xl font-bold text-on-surface">What clients say</h2>
          </div>
        </ScrollReveal>
        <ScrollReveal stagger>
          <div className="flex flex-wrap justify-center gap-6">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="reveal glass-card rounded-3xl p-7 text-center border border-outline-variant/40 bg-surface-container-lowest w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
              >
                <blockquote className="text-on-surface leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption>
                  <p className="font-bold text-on-surface">{t.name}</p>
                  <p className="text-xs text-on-surface-variant">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
