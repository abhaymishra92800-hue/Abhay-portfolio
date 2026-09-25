# 2026-08-29 — Client Walk-Through Fixes + Portfolio Drill-In

## 1. Honest client walk-through of the current site

### Confuses me / would lose trust
1. "Currently accepting 2 new clients" badge is too small; the pulsing dot isn't visible at first glance.
2. Portrait card has a button overlap on the name ("Mishra" is half-covered by a Material icon).
3. Hero has two competing CTAs to two different things. First-time visitors don't know which is the front door.
4. Tags on home ("Video Editing, YouTube Growth, LinkedIn Funnels, Paid Ads") just restate the Services page. Adds nothing.
5. Portfolio "Long-form Video Editing" and "Creative Shorts & Reels" sections share the same YouTube IDs. That makes the categories meaningless.
6. LinkedIn Funnel System: "Final scope and price confirmed on a free intro call" feels like a price-hide, not a value statement.
7. About hero tags ("YouTube Operations, LinkedIn Funnels, Production Systems, Paid Media") are the same problem as home — restatement.
8. Contact form heading "Send a message" is generic. Doesn't carry service context from the page the user clicked "Get Started" on.
9. Services page talks about "agencies and B2B founders" but doesn't show a creator-specific path. A solo YouTuber would have to read carefully.
10. How We Work has 4 steps where 2 of them (Free Intro Call, Scope & Plan) are basically the same step.

### Builds trust (don't change)
- Named clients + hard numbers (+38% signup, 1,200+ listens, 6 hrs/wk saved)
- Real social links (LinkedIn, WhatsApp, Telegram, Skype, Email)
- "Two client slots open this month" on About
- FAQ sections on Services and the LinkedIn sales page
- Free tools block on home

## 2. Portfolio direction

User chose: **drill-in cards, each card opens a category page with the full library.**

### Categories
1. **Long-form Video Edits** (YouTube 8-25 min, podcasts, VSLs)
2. **Short-form & Reels** (vertical, 30-60s)
3. **Thumbnails & Graphics** (channel art, custom graphics)
4. **Channel Before/After** (case studies with metrics)

### New routes
- `/work` — top-level page with 4 cards (replaces `/portfolio`)
- `/work/long-form` — full library of long-form edits
- `/work/short-form` — full library of short-form
- `/work/thumbnails` — full thumbnail gallery
- `/work/case-studies` — channel before/after with metrics

### Top nav
- Replace "Portfolio" with "Work" pointing to `/work`
- Remove `/portfolio` from nav (page can redirect or stay as a legacy page)

## 3. Real content to use (scraped from abhay-portfolio.vercel.app)

### Thumbnail images
- victor-chan.jpg — for Victor Chan work
- harjeet-dhillon-1.png — for Harjeet work
- maurice-maurer.png — for Dr. Maurice work
- blake-pic-website-1.png — for Blake work
- ross.jpeg — additional client
- paul-scallan-1.png — additional client
- best-social-meda-768x431.webp — channel work
- insta-768x431.webp — channel work

### YouTube IDs (use what's there; user will fill in more)
- izidLZclYZs, y11b_rVHcyg, Cd4YRPSLBVE, -SYqXdaZXl8, h2O8Gnq7w24

## 4. Other fixes to ship with the portfolio rebuild

| Fix | Page |
|---|---|
| Bigger "Currently accepting 2 new clients" badge with visible pulse | Home |
| Fix portrait card overlap (remove the extra "verified" icon button over the name) | Home |
| Replace home hero tags with value-driven language (or remove them) | Home |
| Replace "/portfolio" with "/work" in nav, redirect /portfolio → /work | Nav, /portfolio |
| Sharper price on LinkedIn Funnel System: "$800/mo base. Custom scopes for higher volume." | /linkedin-funnel-system |
| Replace About hero tags with the "Two client slots" line + stat | /about |
| Contact form: pre-fill subject from `?service=...` query param | /contact |
| Add creator-specific ICP card to Services: "Solo creator path" with Content Engine + LinkedIn Funnel combo | /services |
| Tighten "How we work" to 3 steps (Intro Call → Onboarding → Ship & Report) | /services |

## 5. Out of scope (not doing now)

- Email capture after each free tool use (would need Resend / Firebase wiring)
- Booking link (waiting for `NEXT_PUBLIC_BOOKING_URL`)
- Real client video IDs beyond the 5 we already have
- Production build / deploy

## 6. Implementation order

1. Build `/work` and the 4 category sub-pages
2. Update nav and redirect `/portfolio` → `/work`
3. Apply the other fixes
4. Verify all 200 + TypeScript + screenshot
5. Spec review
