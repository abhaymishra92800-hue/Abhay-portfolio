// Personal details used across the site. Update here, not in individual pages.

export const site = {
  name: "Abhay Mishra",
  role: "Video Editor & Social Media Manager",
  location: "West Bengal, India",
  email: "abhayworkofficial@gmail.com",
  phone: "+91 79801 19941",
  phoneHref: "tel:+917980119941",
  whatsapp: "https://wa.me/917980119941",
  // WhatsApp chat with the message pre-filled: the quickest way to book a call.
  callHref:
    "https://wa.me/917980119941?text=" +
    encodeURIComponent("Hi Abhay, I'd like to book a call about a video project."),
  linkedin:"https://www.linkedin.com/in/abhaymishrahere/",
  // Profile photo, cropped to 4:5 from the original shoot.
  photo:
    "/abhay.jpg",
};

export const tools = ["Descript", "DaVinci Resolve", "Remotion", "Claude", "YouTube Studio", "LinkedIn"];

export const services = [
  {
    icon: "campaign",
    title: "Ads & Sales Videos",
    desc: "Property ads, UGC-style ads, and launch films made to get the viewer to act: book a visit, buy, or sign up. Scripted, designed, and edited end to end.",
    tools: ["Remotion", "Claude", "DaVinci Resolve"],
  },
  {
    icon: "movie_edit",
    title: "Video Editing",
    desc: "Long-form YouTube, podcasts, explainers, and VSLs. Retention-first pacing, captions, motion graphics, and b-roll.",
    tools: ["Descript", "DaVinci Resolve", "Remotion"],
  },
  {
    icon: "vertical_split",
    title: "Shorts & Reels",
    desc: "Hook-first vertical cuts for YouTube Shorts, Instagram, and LinkedIn, repurposed from your long-form content.",
    tools: ["Descript", "Claude"],
  },
  {
    icon: "subscriptions",
    title: "YouTube Channel Management",
    desc: "Uploads, titles, thumbnails, SEO descriptions, and a posting rhythm your channel can keep.",
    tools: ["YouTube Studio"],
  },
  {
    icon: "work",
    title: "LinkedIn Management",
    desc: "Post writing, scheduling, and engagement. A banked month of content, not a scramble every morning.",
    tools: ["LinkedIn", "Claude"],
  },
  {
    icon: "auto_awesome",
    title: "Content Automation",
    desc: "AI-assisted drafting, research, and scheduling pipelines, so content ships even in a busy week.",
    tools: ["Claude", "Remotion"],
  },
];

export const beliefs = [
  {
    icon: "ads_click",
    title: "One video, one job",
    desc: "Every video is built around a single action: book a visit, buy, or subscribe. If a scene doesn't help that, it goes.",
  },
  {
    icon: "description",
    title: "A brief beats a better editor",
    desc: "Most editing problems are really briefing problems. Hook length, caption style, where b-roll goes: written down before the first cut.",
  },
  {
    icon: "auto_awesome",
    title: "AI where it holds up",
    desc: "AI saves real time on drafting, research, and atmosphere shots. Anything the viewer can check against real life gets shot for real.",
  },
];

// Headline numbers, shared by the home and About pages.
export const credibilityStats = [
  { value: "777", label: "Videos edited" },
  { value: "1M+", label: "Audience reach" },
  { value: "30%", label: "Audience retention" },
];

// Client reviews, quoted exactly as published on anuj4u.in. Names and wording are not altered.
export const testimonialsSource = { label: "anuj4u.in", href: "https://anuj4u.in" };

export const testimonials: { quote: string; name: string; role: string }[] = [
  {
    quote:
      "Anuj has been monumental in creating my podcast. While he creates thumbnails, edits content and can create descriptions too, he doesn't stop there. He has a vast knowledge of softwares available and has guided me more than I could ever hope for with setting up my podcast. He has a solid work ethic and is awesome at receiving feedback. He has a great attitude and while his work speaks for itself, his character matches! I would highly recommend hiring Anuj for anything social media or even to consult him for guidance. You will not be disappointed!",
    name: "Harjeet Dhillon",
    role: "Canadian actress and author",
  },
  {
    quote:
      "Anuj has been a game-changer for my video production, handling both long-form YouTube edits and sales-page VSLs with excellent results. His fast, reliable WhatsApp communication saves me days every week while making my videos look more professional than ever. I wouldn't hesitate to hire him again for Descript editing. Give him a clear script with b-roll and SFX notes and watch him deliver!",
    name: "Victor Chan",
    role: "YouTuber & Founder of Launch Excel",
  },
  {
    quote:
      "I hired Anuj to do Video editing + graphic design work for my Youtube channel https://www.youtube.com/@TrainingScientists . He did an excellent job and always responds very quickly and produces great results. I am very happy working with him and will continue to do so in the future",
    name: "Dr. Maurice Maurer",
    role: "PhD in Computational Physics",
  },
  {
    quote:
      "Anuj helped create video layouts for my podcast which look great and work perfectly whilst saving me so much time. Generous with his time and would highly recommend! Thank you Anuj!",
    name: "Blake Reddy",
    role: "Private Client Wealth Adviser",
  },
  {
    quote: "Anuj is great! Professional, fast, and easy to work with.",
    name: "Ross Zeiger",
    role: "Descript Mastery",
  },
];
