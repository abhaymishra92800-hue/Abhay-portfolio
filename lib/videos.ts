// Portfolio video library — single source of truth for every video grid on the site.

export type Video = { id: string; title: string; client: string };

export const longFormVideos: Video[] = [
  { id: "bejvX2uUTDo", title: "Google Just Dropped the Most Insane AI Update Yet (Gemini 3 + AI Studio + Antigravity)", client: "Tim Cakir" },
  { id: "mHOLzwe4sMQ", title: "ChatGPT Connectors EXPLAINED: 5 Best Use Cases and Limitations Revealed!", client: "Tim Cakir" },
  { id: "Cd4YRPSLBVE", title: "Ultimate Guide to Gemini 2.0 Models: Flash, Pro and Flash Thinking", client: "Tim Cakir" },
  { id: "-SYqXdaZXl8", title: "Dan Koe’s Playbook for Financial Freedom and Fulfillment", client: "Circle" },
  { id: "izidLZclYZs", title: "From Broke to YouTube Millionaire: The Making of Sean Cannell", client: "Circle" },
  { id: "y11b_rVHcyg", title: "ChatGPT o1 vs Claude 3.5: Coding Battle - Create a Snake Game & an Electron Cloud Simulation", client: "Training Scientists" },
  { id: "TZvt_fD8VP4", title: "Transform 2D Irregular Grid Data to Perfect Visualizations | Interpolate using Python & Claude / AI", client: "Training Scientists" },
  { id: "-DB8-7eLsTY", title: "Can AI Video Avatars REALLY Replace Human Presenters?", client: "Eric Presnall - VideoRep" },
  { id: "68lgEUQDiDQ", title: "Copy My SECRET AI Prompt to Rank on YouTube & AI Search", client: "Eric Presnall - VideoRep" },
  { id: "SFn5Vf38f8I", title: "How Smart Excel Users Delete Data But Keep Formulas", client: "Victor Chan" },
  { id: "pcfFzxnhwUE", title: "How Smart Excel Users Rename 100s of Files", client: "Victor Chan" },
  { id: "TW3omRuTQA8", title: "Life Changing Secrets to Manifesting Positivity!", client: "Harjeet Dhillon" },
  { id: "WTD8GMUO_4w", title: "The surprising truth about your giving habits!", client: "Harjeet Dhillon" },
  { id: "1nT4g9VeJDk", title: "Mobile app quick overall view simply prime CRM", client: "Simply prime CRM" },
  { id: "pMU8C1H1nHo", title: "Payroll and Commission Structures for Technicians. Simply prime CRM", client: "Simply prime CRM" },
  { id: "aWR04f1eYrw", title: "Big Picture Medicare", client: "Medicare-You" },
  { id: "ciwbmggLd4Y", title: "New PreChallange", client: "Medicare-You" },
];

export const shortFormVideos: Video[] = [
  { id: "h2O8Gnq7w24", title: "Perplexity DEEP RESEARCH Explained in 1 Minute", client: "Tim Cakir" },
  { id: "TJR9l12hN0I", title: "Battle of the AI Titans: ChatGPT, Gemini 1.5 Pro, and Perplexity Showdown", client: "Tim Cakir" },
  { id: "dD3jLdx2k7A", title: "I Tried ChatGPT for Image Creation and Here's What Happened", client: "Tim Cakir" },
  { id: "PYfcIJ3TzIk", title: "Giving selflessly #Love #inspirational", client: "Harjeet Dhillon" },
  { id: "gY95ZAAYypg", title: "Family vs. Pro: Who Should You Choose?", client: "Bayswater Wealth Management" },
  { id: "jDxfq48mOjc", title: "Food & Drink Shows UK at NEC", client: "Lucy Wager Food Industry Insider" },
];

export const instagramReels: string[] = ["DBZTDRAxzGw", "DC40WUQRFQx", "DDfMjVppsJB"];


// Brand and ad work, grouped by category. Files live in /public/portfolio and /public/showcase
// (web-compressed copies of the masters). Add an entry to a category and it appears on the site.
export type Work = {
  src: string;
  poster: string;
  title: string;
  client: string;
  lang?: string;
  landscape?: boolean;
};

export type WorkCategory = {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  items: Work[];
};

const p = (name: string) => ({ src: `/portfolio/${name}.mp4`, poster: `/portfolio/${name}.jpg` });

export const workCategories: WorkCategory[] = [
  {
    id: "real-estate-ads",
    eyebrow: "Real estate",
    title: "Property explainer ads",
    blurb: "Motion-graphic ads for developers across Kolkata. Clean layouts, local-language voiceovers, built to drive site visits.",
    items: [
      { ...p("srijan-orizon"), title: "Srijan Orizon", client: "Srijan Realty", lang: "EN" },
      { ...p("eshaana-en"), title: "Eshaana", client: "Eshaana", lang: "EN" },
      { ...p("eshaana-bn"), title: "Eshaana", client: "Eshaana", lang: "বাংলা" },
      { ...p("orbit-tarang"), title: "Orbit Tarang", client: "Orbit Group", lang: "EN" },
      { ...p("orbit-dakshini"), title: "Orbit Dakshini", client: "Orbit Group", lang: "বাংলা" },
      { ...p("rameswara-en"), title: "Rameswara Riverview", client: "Rameswara", lang: "EN" },
      { ...p("rameswara-bn"), title: "Rameswara Riverview", client: "Rameswara", lang: "বাংলা" },
      { ...p("mirania-evara"), title: "Mirania Evara", client: "Mirania", lang: "EN" },
      { ...p("srijan-optima"), title: "Srijan Optima", client: "Srijan Realty", lang: "EN" },
      { ...p("srijan-all"), title: "Srijan Portfolio", client: "Srijan Realty", lang: "EN" },
      { ...p("srijan-ps-group"), title: "Srijan · PS Group", client: "Srijan Realty", lang: "EN" },
      { ...p("orbit-portfolio"), title: "Orbit Portfolio", client: "Orbit Group", lang: "EN" },
      { ...p("porshi-nagar"), title: "Porshi Nagar", client: "Porshi Nagar", lang: "EN" },
      { ...p("nk-brand"), title: "NK Brand Film", client: "NK", lang: "EN" },
      { ...p("nk-godrej-blue"), title: "Godrej Blue", client: "NK", lang: "EN" },
      { src: "/showcase/merlin.mp4", poster: "/showcase/merlin.jpg", title: "Ongoing Projects", client: "Merlin Group", lang: "EN" },
    ],
  },
  {
    id: "location-films",
    eyebrow: "Cinematic",
    title: "Location & project films",
    blurb: "Satellite zoom-ins, real nearby-place research, and premium 4K footage, from the whole world down to the plot.",
    items: [
      { ...p("orbit-sky-royale"), title: "Sky Royale", client: "Orbit Group", landscape: true },
      { ...p("orbit-urban-park"), title: "Urban Park", client: "Orbit Group", landscape: true },
      { ...p("emaar-golf-vale"), title: "Golf Vale", client: "Emaar" },
    ],
  },
  {
    id: "ugc-ads",
    eyebrow: "UGC",
    title: "UGC & creator-style ads",
    blurb: "Native, scroll-stopping ads that feel like a real person talking. Hooks, pacing, and captions tuned for paid social.",
    items: [
      { ...p("woodsmen"), title: "Woodsmen Whiskey", client: "Woodsmen" },
      { ...p("dogshood"), title: "Dogshood", client: "Dogshood" },
    ],
  },
  {
    id: "explainers",
    eyebrow: "Explainers & clips",
    title: "Tech explainers & podcast clips",
    blurb: "Sharp, caption-led shorts that turn long conversations and new tools into something people finish watching.",
    items: [
      { src: "/showcase/jev.mp4", poster: "/showcase/jev.jpg", title: "Claude Code Plugin", client: "Tech explainer" },
      { ...p("base360"), title: "Podcast Highlights", client: "Base 360" },
    ],
  },
];
