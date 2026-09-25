# Abhay 4u — Portfolio & Lead Funnel Website

Next.js 14 portfolio for Abhay Mishra with a lead-magnet funnel (LinkedIn content calendar generator) and email pipeline.

## Stack

- **Framework:** Next.js 14, React 18, TypeScript, Tailwind CSS 3.4
- **Integrations:** Firebase (Firestore), Resend (email), Google Generative AI (Gemini 1.5 Flash)
- **Hosting:** Vercel

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and fill in real values:

   ```bash
   cp .env.local.example .env.local
   ```

   Required keys (see `.env.local.example` for full list):

   | Key | Purpose | Notes |
   | --- | --- | --- |
   | `GEMINI_API_KEY` | LinkedIn content generation | Falls back to mock content when missing |
   | `RESEND_API_KEY` | Email delivery | **Hard fails** if missing — must be set |
   | `RESEND_FROM_EMAIL` | Sender address | Must be `abhayworkofficial@gmail.com` once domain is verified |
   | `ADMIN_EMAIL` | BCC on every form submission | `abhayworkofficial@gmail.com` |
   | `GOOGLE_SHEETS_WEBHOOK_URL` | Optional lead log | Google Apps Script webhook |
   | `NEXT_PUBLIC_FIREBASE_*` | Firebase client config | 6 vars, see template |

3. Run the dev server:

   ```bash
   npm run dev
   ```

4. Run the production build + lint:

   ```bash
   npm run build
   npm run lint
   ```

## Environment Variables — Dev-Only Fallbacks

`lib/firebase.ts` initializes Firebase with **demo fallback values** when the `NEXT_PUBLIC_FIREBASE_*` env vars are not set. The fallback values are safe for local development but will not persist data anywhere real — submissions to the contact form will silently fail to write.

```ts
// lib/firebase.ts
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-key",
  ...
};
```

**This is intentional** so the dev server boots without secrets, but it means:

- 🚨 In production (Vercel), you **must** set all six `NEXT_PUBLIC_FIREBASE_*` variables, otherwise the contact form will use demo keys and submissions will be lost.
- The "demo-key" placeholder is a sentinel — if you see it in browser console logs, your env vars are missing.

Set them via the Vercel dashboard or `vercel env` CLI before going live.

## Lead Funnel Architecture

Every form on the site writes to Firebase and notifies Abhay via email:

```
Contact form ─┐
              ├─▶ POST /api/{funnel} ─▶ Gemini (AI content) ─▶ Resend (email user) ─▶ Google Sheets (log)
              │                          (optional, mock fallback)   + BCC admin
LinkedIn     ─┘
funnel ──────┘
```

The shared engine lives in `lib/funnel.ts` — keep the same pattern when adding new funnels.

## Adding a New Funnel

1. Create `app/<funnel>/page.tsx` with the form UI
2. Create `app/api/<funnel>/route.ts` that:
   - Validates input
   - Calls `generateWithGemini()` for AI content (with a mock fallback)
   - Calls `sendFunnelEmail()` to send the lead magnet
   - Calls `logToSheets()` for the lead log (optional)
3. Add a Google Apps Script entry on the sheet to capture the row

## Project Structure

```
app/
  page.tsx              # Home (hero, stats, services, portfolio)
  contact/page.tsx      # Contact form
  linkedin-funnel/      # Lead-magnet UI
  api/
    contact/            # Contact form → email + Firebase
    linkedin-funnel/    # LinkedIn calendar generator
    cron/nurture/       # 3-email nurture sequence
  layout.tsx            # Root layout + metadata + manifest
  icon.svg              # SVG favicon
  favicon.ico           # ICO favicon (16/32/48)
  manifest.ts           # PWA manifest
components/             # Shared UI (Navbar, Footer, etc.)
lib/
  funnel.ts             # Gemini + Resend + Sheets engine
  firebase.ts           # Firebase init (demo fallbacks)
  nurture.ts            # 3-email sequence helper
scripts/                # Build-time scripts (e.g. favicon generation)
```

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint via `next lint`

## Deployment

Hosted on Vercel. Set the env vars in the Vercel dashboard and connect the GitHub repo at `BA4U/Abhay-new-website`.

## Contact

- Email: abhayworkofficial@gmail.com
- LinkedIn: https://www.linkedin.com/in/abhaymishrahere/
