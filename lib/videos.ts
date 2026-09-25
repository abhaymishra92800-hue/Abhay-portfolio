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
