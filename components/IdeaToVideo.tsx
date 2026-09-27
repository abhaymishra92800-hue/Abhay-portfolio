import { showcaseVideos } from "@/lib/videos";

const steps = ["Script", "Design", "Edit & sound"];

// "Idea in, video out" showcase: a client brief on the left, a dashed
// workflow in the middle, and the finished vertical video on the right.
export default function IdeaToVideo() {
  return (
    <div className="space-y-16 lg:space-y-20">
      {showcaseVideos.map((v) => (
        <div
          key={v.src}
          className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0"
        >
          {/* Idea card */}
          <div className="w-full max-w-md lg:w-[34%]">
            <div className="glass-card rounded-3xl p-7 border border-outline-variant/40 bg-surface-container-lowest shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-amber-500">lightbulb</span>
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">The idea</span>
              </div>
              <p className="text-lg md:text-xl font-semibold text-on-surface leading-snug mb-4">&ldquo;{v.idea}&rdquo;</p>
              <p className="text-xs font-bold uppercase tracking-widest text-primary">{v.client}</p>
            </div>
          </div>

          {/* Dashed workflow */}
          <div className="relative flex lg:flex-1 items-center justify-center lg:px-4">
            <div className="absolute lg:inset-x-0 lg:top-1/2 lg:h-0 lg:w-auto lg:border-t-2 inset-y-0 left-1/2 w-0 border-l-2 lg:border-l-0 border-dashed border-primary/40" />
            <div className="relative flex lg:flex-row flex-col items-center gap-3">
              {steps.map((s) => (
                <span
                  key={s}
                  className="text-[11px] font-bold uppercase tracking-wider text-primary bg-surface border border-primary/30 px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap"
                >
                  {s}
                </span>
              ))}
              <span className="material-symbols-outlined text-primary bg-surface rounded-full lg:rotate-0 rotate-90">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Finished video */}
          <div className="w-full max-w-[280px] lg:w-[24%]">
            <div className="rounded-[2rem] p-2 bg-on-surface shadow-2xl">
              <video
                src={v.src}
                poster={v.poster}
                controls
                playsInline
                preload="none"
                className="w-full aspect-[9/16] rounded-[1.6rem] bg-black object-cover"
              />
            </div>
            <p className="text-center text-sm font-bold text-on-surface mt-4">{v.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
