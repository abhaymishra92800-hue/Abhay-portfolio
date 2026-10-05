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
// One entry = one project. Put extra languages in `versions` so a project never shows twice.
export type WorkVersion = { src: string; poster: string; lang?: string };

export type Work = {
  title: string;
  client: string;
  versions: WorkVersion[];
  landscape?: boolean;
  tag?: string;
};

export type WorkCategory = {
  id: string;
  eyebrow: string;
  title: string;
  blurb: string;
  items: Work[];
};

const v = (name: string, lang?: string): WorkVersion => ({ src: `/portfolio/${name}.mp4`, poster: `/portfolio/${name}.jpg`, lang });

const RAT = "Rationale · faceless YouTube channel";
const FACELESS = "Faceless channel";

export const workCategories: WorkCategory[] = [
  {
    id: "real-estate-ads",
    eyebrow: "Real estate",
    title: "Property ads that get site visits",
    blurb: "One tight story per project: the home, the location, the price, and a clear next step. Delivered in English and Bengali where the project needs it.",
    items: [
      { title: "Srijan Orizon", client: "Srijan Realty", versions: [v("srijan-orizon")] },
      { title: "Eshaana", client: "Eshaana", versions: [v("eshaana-en", "EN"), v("eshaana-bn", "বাংলা")] },
      { title: "Rameswara Riverview", client: "Rameswara", versions: [v("rameswara-en", "EN"), v("rameswara-bn", "বাংলা")] },
      { title: "Orbit Tarang", client: "Orbit Group", versions: [v("orbit-tarang")] },
      { title: "Mirania Evara", client: "Mirania", versions: [v("mirania-evara")] },
      { title: "Orbit Dakshini", client: "Orbit Group", versions: [v("orbit-dakshini", "বাংলা")] },
      { title: "Srijan Optima", client: "Srijan Realty", versions: [v("srijan-optima")] },
      { title: "Porshi Nagar", client: "Porshi Nagar", versions: [v("porshi-nagar")] },
      { title: "Godrej Blue", client: "NK", versions: [v("nk-godrej-blue")] },
      { title: "NK Brand Film", client: "NK", versions: [v("nk-brand")] },
      { title: "Srijan Portfolio", client: "Srijan Realty", versions: [v("srijan-all")] },
      { title: "Srijan · PS Group", client: "Srijan Realty", versions: [v("srijan-ps-group")] },
      { title: "Orbit Portfolio", client: "Orbit Group", versions: [v("orbit-portfolio")] },
      { title: "Ongoing Projects", client: "Merlin Group", versions: [{ src: "/showcase/merlin.mp4", poster: "/showcase/merlin.jpg" }] },
    ],
  },
  {
    id: "ugc-ads",
    eyebrow: "UGC",
    title: "UGC ads that look native",
    blurb: "Creator-style ads that feel like a real person talking, not an ad. Hooks, pacing, and captions tuned for paid social.",
    items: [
      { title: "Woodsmen Whiskey", client: "Woodsmen", versions: [v("woodsmen")] },
      { title: "Dogshood", client: "Dogshood", versions: [v("dogshood")] },
    ],
  },
  {
    id: "location-films",
    eyebrow: "Cinematic",
    title: "Launch films for premium projects",
    blurb: "Satellite zoom-ins from the whole world down to the plot, real nearby-place research, and 4K footage that makes a project feel like a landmark.",
    items: [
      { title: "Sky Royale", client: "Orbit Group", versions: [v("orbit-sky-royale")], landscape: true },
      { title: "Urban Park", client: "Orbit Group", versions: [v("orbit-urban-park")], landscape: true },
      { title: "Golf Vale", client: "Emaar", versions: [v("emaar-golf-vale")] },
    ],
  },
  {
    id: "explainers",
    eyebrow: "Explainers",
    title: "Explainers & faceless channels",
    blurb: "Tech explainers and faceless YouTube shorts: sharp scripts, motion graphics, and captions that hold attention without a person on camera.",
    items: [
      { title: "Claude Code forgets everything (free fix)", client: RAT, versions: [v("rat-claude-memory")], tag: FACELESS },
      { title: "Meta Muse, the AI that spends your money", client: RAT, versions: [v("rat-meta-muse")], tag: FACELESS },
      { title: "1,200 AI agents built a cheating ring", client: RAT, versions: [v("rat-cheating-ring")], tag: FACELESS },
      { title: "Nvidia's agent jail", client: RAT, versions: [v("rat-nvidia-jail")], tag: FACELESS },
      { title: "Claude Tag: an AI employee in Slack", client: RAT, versions: [v("rat-claude-tag")], tag: FACELESS },
      { title: "Your AI can soon pay on UPI", client: RAT, versions: [v("rat-upi")], tag: FACELESS },
      { title: "GPT-6 Astra", client: RAT, versions: [v("rat-gpt6")], tag: FACELESS },
      { title: "OpenAI vs Meta: the agent war", client: RAT, versions: [v("rat-agent-war")], tag: FACELESS },
      { title: "OpenAI's dots read your apps", client: RAT, versions: [v("rat-openai-dots")], tag: FACELESS },
      { title: "3 free plugins for your Claude Code limit", client: RAT, versions: [v("rat-claude-plugins")], tag: FACELESS },
      { title: "Claude Code stops itself deleting files", client: RAT, versions: [v("rat-claude-files")], tag: FACELESS },
      { title: "Muse this week: #1 app and the privacy mess", client: RAT, versions: [v("rat-muse-week")], tag: FACELESS },
      { title: "Claude Code plugin", client: "Tech explainer", versions: [{ src: "/showcase/jev.mp4", poster: "/showcase/jev.jpg" }] },
      { title: "Why is milk at the back of the store?", client: "KnowLayer · faceless channel", versions: [v("knowlayer-milk")], tag: FACELESS },
      { title: "Why does a phone cost $899?", client: "KnowLayer · faceless channel", versions: [v("knowlayer-phone")], tag: FACELESS },
    ],
  },
];
