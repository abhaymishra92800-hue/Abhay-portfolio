# Video/Reel Content Strategy — Implementation Plan

## Overview

This plan details how to add short reels and videos to the Abhay 4u website to showcase work and attract clients. Three formats are recommended: motion graphics videos, AI-generated videos, and engaging short reels.

---

## Format 1: Motion Graphics Videos (15-30s)

### Purpose
Demonstrate technical skill and visual polish. Used as hero backgrounds, section dividers, and portfolio highlights.

### Where to Place
- **Home page hero** — Replace the static portrait card with a looping motion graphic
- **Services pages** — Each service gets a 15s motion graphic showing the deliverable
- **Work page** — Each project category gets a motion graphic teaser

### Production Approach
1. Use DaVinci Resolve (or After Effects) to create 15-30s loops
2. Render as MP4 with transparent background (ProRes 4444)
3. Fallback to static WebP image for performance
4. Auto-play muted with `playsInline` and `loop` attributes
5. Add `poster` attribute for initial load

### Technical Implementation
```tsx
// Example component structure
<video
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-full object-cover"
  poster="/videos/motion-placeholder.webp"
>
  <source src="/videos/motion-hero.mp4" type="video/mp4" />
</video>
```

### Content Ideas
- Raw footage → polished final (split-screen transition)
- Editing timeline visualization (clips appearing on timeline)
- Color grading before/after (split-screen with color shift)
- Text/title animation showcasing typography skills
- "Skills" reel showing DaVinci, Premiere, After Effects logos animating in

---

## Format 2: AI-Generated Videos (15-60s)

### Purpose
Showcase AI video generation capabilities. Attract clients interested in AI-powered content. Demonstrate the Gemini API integration in action.

### Where to Place
- **New `/ai-video` page** — Dedicated showcase page
- **Free-tools page** — Add as a new tool option
- **Home page** — Small section highlighting AI capabilities

### Production Approach
1. Use existing Gemini API infrastructure (`lib/funnel.ts`, `lib/funnel-engine.ts`)
2. Create prompt-to-video workflows
3. Generate thumbnails using Gemini's image capabilities
4. Full videos behind email capture (lead magnet)
5. Link to `/contact` for full AI video production services

### Content Ideas
- **"Prompt to Video" series** — Show text prompt, then AI-generated result side by side
- **AI-enhanced footage** — Take raw footage, show AI enhancement steps
- **Style-matched demos** — Show consistency across generated clips
- **"What if" scenarios** — "What would this look like as an AI video?"

### Technical Implementation
- `app/ai-video/page.tsx` — New page with Gemini integration
- `app/api/ai-video/route.ts` — API route for video generation
- Email capture for full-length AI videos
- Integration with existing `lib/funnel-engine.ts` pattern

---

## Format 3: Engaging Short Reels (6-60s, 9:16 vertical)

### Purpose
Social media presence driving traffic to the website. Demonstrate editing skills in short, scroll-stopping formats. Build personal brand on LinkedIn/Instagram/YouTube Shorts.

### Where to Place
- **New `/reels` page** — Grid of reel thumbnails with play buttons
- **Home page** — "Watch My Latest Reels" section
- **Work page** — Short-form section with actual reel thumbnails
- **Social media** — Cross-post to LinkedIn, Instagram, YouTube Shorts

### Production Approach
1. Create 5-10 sample reels showcasing different styles
2. Host on YouTube (embed with `playsinline`)
3. Use YouTube embed with modest watermark
4. Each reel gets a title, description, and link to full project
5. Add to `/work/short-form` page with actual embedded videos

### Content Ideas (3-5 sample reels to create)
1. **"Day in the Life"** — Quick cuts of editing workflow (30s)
2. **"Before/After"** — Client transformation clips (15s each)
3. **"30-Second Fix"** — Show fixing a bad cut in real time (30s)
4. **"Trending Audio + Editing Tip"** — Trending audio over editing tips (45s)
5. **"Client Testimonial Clip"** — 30s video testimonial from a client

### Technical Implementation
- `app/reels/page.tsx` — New page with YouTube embed grid
- `app/work/short-form/page.tsx` — Update with actual embedded videos
- Each reel: thumbnail image + play button + title + duration
- Click opens modal or navigates to YouTube
- Email capture for "full reel bundle" (lead magnet)

---

## Implementation Priority

### Phase 1 — Quick Wins (Days 1-3)
| Task | Page | Effort |
|------|------|--------|
| Add 3 motion graphic loops to home page hero | `page.tsx` | 1 day |
| Create `/reels` page with YouTube embed grid | New page | 0.5 day |
| Update `/work/short-form` with actual embedded videos | `work/short-form/page.tsx` | 0.5 day |

### Phase 2 — Core Builds (Week 1-2)
| Task | Page | Effort |
|------|------|--------|
| Create `/ai-video` showcase page | New page | 2 days |
| Add video testimonials to home page | `page.tsx` | 1 day |
| Add process videos to services page | `services/page.tsx` | 1 day |
| Build `/work/video` portfolio page | New page | 1 day |

### Phase 3 — Content Creation (Week 2-4)
| Task | Effort |
|------|--------|
| Produce 3 motion graphic hero videos | 2 days |
| Produce 5 short reels | 3 days |
| Create 3 AI video demos | 2 days |
| Record 2 client video testimonials | 1 day |

### Phase 4 — Polish & Optimize (Week 4-6)
| Task | Effort |
|------|--------|
| Add video sitemap and SEO metadata | 0.5 day |
| Optimize video loading and lazy loading | 1 day |
| Add video analytics tracking | 0.5 day |
| Test on mobile and slow connections | 1 day |

---

## File Structure for Video Assets

```
public/
  videos/
    motion/
      hero-loop.mp4
      hero-loop.webp (fallback)
      service-content.mp4
      service-linkedin.mp4
      service-production.mp4
    reels/
      reel-01-day-in-life.mp4
      reel-02-before-after.mp4
      reel-03-30s-fix.mp4
    ai-demos/
      ai-demo-01.mp4
      ai-demo-02.mp4
      ai-demo-03.mp4
  images/
    reels/
      reel-01-thumb.webp
      reel-02-thumb.webp
    videos/
      video-01-thumb.webp
```

---

## Lead Generation Integration

All video content should feed the lead funnel:

1. **Full video bundle** behind email capture → EmailCapture component
2. **"Download my reel pack"** → LinkedIn Funnel flow
3. **"See full portfolio"** → Contact form with `?service=content-engine`
4. **"Watch my process"** → About page video → Contact

---

## Cost & Time Estimates

| Phase | Duration | Cost (if outsourced) |
|-------|----------|---------------------|
| Phase 1: Quick Wins | 3 days | $500-1000 |
| Phase 2: Core Builds | 2 weeks | $2000-4000 |
| Phase 3: Content Creation | 2 weeks | $3000-6000 |
| Phase 4: Polish | 1 week | $1000-2000 |
| **Total** | **6 weeks** | **$6500-13000** |

---

## Success Metrics

1. **Video engagement rate** — Average watch time on video sections
2. **Lead conversion from video** — % of video viewers who submit contact form
3. **Social media growth** — Followers/subscribers from reel cross-posting
4. **Time on site** — Should increase by 30%+ with video content
5. **Bounce rate** — Should decrease on pages with video
6. **Contact form submissions** — Should increase by 25%+

---

*Plan generated 2026-09-18.*
