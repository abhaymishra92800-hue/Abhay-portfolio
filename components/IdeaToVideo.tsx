import { showcaseVideos, type ShowcaseVideo } from "@/lib/videos";

// Hub layout: the idea sits in the centre and dashed arrows point out to the
// finished reels on either side. Add reels to showcaseVideos and they are
// split left/right automatically.

function Reel({ v, side }: { v: ShowcaseVideo; side: "left" | "right" }) {
  const arrow = (
    <div className="hidden lg:flex flex-1 flex-col items-center min-w-[70px]">
      <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1 whitespace-nowrap">
        Published video
      </span>
      <div className={`relative w-full border-t-2 border-dashed border-primary/50 ${side === "left" ? "rotate-180" : ""}`}>
        <span className="material-symbols-outlined absolute -right-2 -top-[13px] text-primary text-xl">
          chevron_right
        </span>
      </div>
    </div>
  );

  const reel = (
    <figure className="w-[200px] xl:w-[220px] shrink-0">
      <div className="rounded-[1.8rem] p-1.5 bg-on-surface shadow-2xl">
        <video
          src={v.src}
          poster={v.poster}
          controls
          playsInline
          preload="none"
          className="w-full aspect-[9/16] rounded-[1.5rem] bg-black object-cover"
        />
      </div>
      <figcaption className="mt-3 text-center">
        <p className="text-sm font-bold text-on-surface">{v.title}</p>
        <p className="text-xs text-on-surface-variant leading-snug mt-1">&ldquo;{v.idea}&rdquo;</p>
      </figcaption>
    </figure>
  );

  return (
    <div className="flex items-center gap-3">
      {side === "left" ? (
        <>
          {reel}
          {arrow}
        </>
      ) : (
        <>
          {arrow}
          {reel}
        </>
      )}
    </div>
  );
}

export default function IdeaToVideo() {
  const left = showcaseVideos.filter((_, i) => i % 2 === 0);
  const right = showcaseVideos.filter((_, i) => i % 2 === 1);

  const idea = (
    <div className="relative glass-card rounded-3xl p-7 text-center border-2 border-dashed border-primary/40 bg-surface-container-lowest shadow-xl max-w-xs mx-auto">
      <span className="material-symbols-outlined text-amber-500 text-4xl mb-2 block">lightbulb</span>
      <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2">Your idea</p>
      <p className="text-xl font-bold text-on-surface leading-snug">
        One line is enough. I turn it into a finished video.
      </p>
    </div>
  );

  return (
    <>
      {/* Desktop: reels | idea | reels */}
      <div className="hidden lg:grid grid-cols-[1fr_auto_1fr] items-center gap-2">
        <div className="flex flex-col gap-10 items-end">
          {left.map((v) => (
            <Reel key={v.src} v={v} side="left" />
          ))}
        </div>
        <div className="w-[280px]">{idea}</div>
        <div className="flex flex-col gap-10 items-start">
          {right.map((v) => (
            <Reel key={v.src} v={v} side="right" />
          ))}
        </div>
      </div>

      {/* Mobile / tablet: idea on top, arrow down, reels in a grid */}
      <div className="lg:hidden">
        {idea}
        <div className="flex flex-col items-center my-4">
          <div className="h-10 border-l-2 border-dashed border-primary/50" />
          <span className="material-symbols-outlined text-primary -mt-2">expand_more</span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Published video</span>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {showcaseVideos.map((v) => (
            <div key={v.src}>
              <div className="rounded-[1.4rem] p-1 bg-on-surface shadow-xl">
                <video
                  src={v.src}
                  poster={v.poster}
                  controls
                  playsInline
                  preload="none"
                  className="w-full aspect-[9/16] rounded-[1.2rem] bg-black object-cover"
                />
              </div>
              <p className="text-xs font-bold text-on-surface text-center mt-2">{v.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
