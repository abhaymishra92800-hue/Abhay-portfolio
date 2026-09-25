# 2026-08-29 v2 — Pricing, Testimonials, Resend, No Client Count

## 1. Scope of changes (this round)

### A. Pricing
| Service | Was | Now |
|---|---|---|
| Content Engine | from $1,500/mo | **$2,500/mo** |
| LinkedIn Funnel System | $800/mo | $800/mo (unchanged) |
| Production Pod | $600/mo | **Content Production System, $1,500/mo** (renamed) |

### B. Remove "active client count" language
- Home hero: drop the "Currently accepting 2 new clients" badge
- About page: drop the "Two client slots open this month" line
- Anywhere else: search for "accepting" / "slots" / "capacity" and remove

### C. Trust bar — replace "Trusted by creators, authors, and brands" with a stats line
- Use: **"50+ channels · 100M+ YouTube views edited · 5+ years"**
  (Confirm with user — these are placeholder numbers; we have not measured them. If user disagrees, we'll use "50+ channels · 5+ years · clients across US, UK, EU, IN, CA".)

### D. Testimonials on home (move from /testimonials page)
- Add a "What clients say" section on home, 3 cards
- Real names + real images from abhay-portfolio.vercel.app:
  - Harjeet Dhillon (Canadian actress and author)
  - Dr. Maurice Maurer (Scientist and YouTube educator)
  - Blake Reddy (Wealth adviser and podcast host)
- Real quote text from abhay-portfolio.vercel.app
- Remove "Testimonials" link from navbar (page can stay as a legacy deep-link)

### E. About page — expand
Add a "My story" section in 3 paragraphs:
1. Started with a YouTube channel in 2019/2020, learned editing to ship it
2. Picked up freelance video editing clients in 2021, served ~50 channels
3. Added LinkedIn funnels + YouTube growth in 2023; now runs as a content operator
(Confirm: write a draft, user reviews, then commit.)

### F. Resend integration
New API route: `app/api/email/subscribe/route.ts`
- POST { email, source, name? }
- Adds to Resend Audiences via Resend API (one main audience "Abhay 4U Subscribers")
- Sends a welcome email via Resend
- Saves to Firestore `email_subscribers` collection as a backup
- Validates email server-side

New component: `components/EmailCapture.tsx`
- Email input + button
- Used on:
  - /free-tools (above the tool grid)
  - /contact (sidebar)
  - After free tool runs (/linkedin-funnel, /reel-hooks, /youtube-audit, /ad-roi-calculator) — show on result page if email not yet captured

Env vars needed in `.env.local`:
- `RESEND_API_KEY` — user gets this from Resend dashboard
- `RESEND_AUDIENCE_ID` — created in Resend Audiences
- `RESEND_FROM_EMAIL` — verified sender (default `abhaymishra92800@gmail.com`)

**Ask the user:** "I need from you: (1) Resend API key, (2) Audience ID, (3) a verified sender email. Once I have these, I plug them into `.env.local` and the integration works. If you only have the API key right now, I'll build the route to read the audience ID from the first audience in your account."

### G. Work sub-pages
- Sharper card titles + descriptions (not "Long-form YouTube Edit" but "Victor Chan — Launch Excel VSL, +38% conversion")
- Add a real result line where the data is in our case studies
- Fix the image issue: Harjeet's image at `harjeet-dhillon-1.png` returns 404. Switch to `harjeet-dhillon-1-1.png` (which we saw in the upload list) and re-check all image URLs against the live site.

## 2. Out of scope (not doing now)

- Booking link (still waiting for `NEXT_PUBLIC_BOOKING_URL`)
- Real client video IDs beyond the 5 we have
- Production build / deploy
- Email capture on every page (just free tools, contact, and post-tool result)

## 3. Files I'll touch

```
app/api/email/subscribe/route.ts          [new]
app/page.tsx                              [hero, trust, offers, testimonials]
app/about/page.tsx                        [remove "2 slots", add My Story]
app/contact/page.tsx                      [use EmailCapture component]
app/linkedin-funnel-system/page.tsx       [price tweaks, no other change]
app/services/page.tsx                     [3 new prices, new service name]
app/free-tools/page.tsx                   [use EmailCapture]
app/linkedin-funnel/page.tsx              [EmailCapture on result]
app/reel-hooks/page.tsx                   [EmailCapture on result]
app/youtube-audit/page.tsx                [EmailCapture on result]
app/ad-roi-calculator/page.tsx            [EmailCapture on result]
app/work/long-form/page.tsx               [sharper card content]
app/work/short-form/page.tsx              [sharper card content]
app/work/thumbnails/page.tsx              [fix harjeet image, sharper copy]
app/work/case-studies/page.tsx            [fix harjeet image]
components/EmailCapture.tsx               [new]
components/Navbar.tsx                     [remove Testimonials link]
.env.local.example                        [add RESEND_* vars]
doc/2026-08-29-v2-pricing-testimonials-resend.md  [this file]
```

## 4. Verification

- `pnpm tsc --noEmit` → 0 errors
- `pnpm build` → green
- All routes 200
- Home screenshot: no "2 clients" badge, new trust stats, 3 testimonial cards
- About screenshot: no "2 slots" line, new "My story" section
- Services screenshot: 3 new prices + new service name
- /free-tools, /contact: EmailCapture component visible

## 5. Open question for user

**Trust bar stats:** I have not measured these. I will use **"50+ channels · 5+ years · Clients in US, UK, EU, IN, CA"** as a placeholder. If you have better numbers (real subscriber counts, real views edited, real channel count), please share and I'll swap them in before committing.
