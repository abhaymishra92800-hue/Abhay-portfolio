import { NextRequest, NextResponse } from "next/server";
import {
  generateWithGemini,
  sendFunnelEmail,
  logToSheets,
} from "@/lib/funnel";
import { enqueueNurture } from "@/lib/nurture";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface ContentDay {
  day: number;
  type: string;
  hook: string;
  body: string;
  cta: string;
  hashtags: string[];
  image_prompt: string;
  video_concept: string;
  why_this_works: string;
  best_time_to_post: string;
  content_pillar: string;
}

interface RequestBody {
  linkedinUrl: string;
  email: string;
  niche?: string;
  goal?: string;
}

// ─── AI: Gemini Content Generation (via shared engine) ───────────────────────
function buildLinkedInPrompt(linkedinUrl: string): string {
  return `You are a world-class LinkedIn growth strategist and copywriter.
Create a highly personalized 30-day LinkedIn content calendar for a professional whose LinkedIn profile is: ${linkedinUrl}

Analyze the URL structure to infer their name and industry. Generate exactly 30 content pieces.
Return ONLY a valid JSON array with no markdown, no explanation, no code fences:

[
  {
    "day": 1,
    "type": "Text Post | Carousel | Short Video | Poll | Document Post",
    "hook": "Irresistible opening line that stops the scroll (max 15 words)",
    "body": "Full post body (150-300 words, LinkedIn-optimized, with line breaks, 1-3 emojis)",
    "cta": "Clear call to action",
    "hashtags": ["#Hashtag1","#Hashtag2","#Hashtag3","#Hashtag4","#Hashtag5"],
    "image_prompt": "Detailed AI image prompt for Midjourney/DALL-E/Canva AI",
    "video_concept": "30-60 sec smartphone video script with hook, 3 points, closing CTA",
    "why_this_works": "Strategic rationale referencing LinkedIn algorithm or psychology (2-3 sentences)",
    "best_time_to_post": "Tuesday · 8-9 AM IST",
    "content_pillar": "Authority | Storytelling | Education | Engagement"
  }
]

Rules:
- Distribute: 8 Authority, 8 Storytelling, 8 Education, 6 Engagement posts
- Mix post types: Text Posts, Carousels, Polls, Short Videos, Document Posts
- Every hook must be unique — no repeated patterns
- Posts build progressively over 30 days
- Return ONLY the JSON array`;
}

async function generateContent(body: RequestBody): Promise<ContentDay[]> {
  const apiKey = process.env.GEMINI_API_KEY;
  const generated = await generateWithGemini<ContentDay[]>(
    buildLinkedInPrompt(body.linkedinUrl),
    () => generateMockContent(body.linkedinUrl),
    apiKey ? { apiKey } : {}
  );
  // Guard against empty AI responses
  return generated.length > 0 ? generated : generateMockContent(body.linkedinUrl);
}

// ─── Mock Content (used when no Gemini API key) ───────────────────────────────
function generateMockContent(linkedinUrl: string): ContentDay[] {
  // Extract a name hint from the URL for personalization
  const urlSlug = linkedinUrl.split("/in/")[1]?.replace(/\/$/, "") || "you";
  const nameHint = urlSlug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const pillars = ["Authority", "Storytelling", "Education", "Engagement"] as const;
  const types = ["Text Post", "Carousel", "Short Video", "Poll", "Document Post"];
  const times = [
    "Monday · 7–8 AM IST",
    "Tuesday · 8–9 AM IST",
    "Wednesday · 12–1 PM IST",
    "Thursday · 9–10 AM IST",
    "Friday · 8–9 AM IST",
  ];

  const hooks = [
    `I was invisible on LinkedIn for 2 years. Then I made one change that changed everything. 👇`,
    `The uncomfortable truth about LinkedIn that no one wants to admit`,
    `3 years ago, I had 47 followers. Here's exactly what I did to change that:`,
    `Stop doing this on LinkedIn if you actually want to grow (most people miss this)`,
    `The LinkedIn strategy that earned me 3 inbound clients in 30 days`,
    `Why most LinkedIn "experts" are giving you the worst advice possible`,
    `I studied 500 viral LinkedIn posts. Here's the pattern I found:`,
    `Hot take: LinkedIn is the most underrated platform for personal branding in 2025`,
    `Nobody tells you this when you start posting on LinkedIn:`,
    `The day I stopped trying to be "professional" on LinkedIn is the day I started growing`,
  ];

  const whys = [
    "Story posts with a clear transformation arc generate 3× more comments than opinion posts. The curiosity hook compels clicks on 'see more,' boosting dwell time — LinkedIn's top ranking signal.",
    "Carousels have the highest save rate of any LinkedIn format. Saves signal high-intent engagement, which the algorithm rewards with 40%+ wider distribution.",
    "Polls drive 4× more impressions because each vote triggers a notification. They also reveal your audience's pain points, giving you future content ideas.",
    "Education posts get shared more than any other type. Shares reach second-degree connections who don't follow you yet — compounding your reach organically.",
    "Personal vulnerability posts break through 'scroll fatigue' because they feel authentic in a feed full of corporate content. LinkedIn's algorithm prioritizes content with early comment velocity.",
  ];

  return Array.from({ length: 30 }, (_, i) => {
    const pillar = pillars[i % 4];
    return {
      day: i + 1,
      type: types[i % 5],
      hook: hooks[i % hooks.length],
      body: `This is a personalized post for ${nameHint} — Day ${i + 1} of your 30-day content calendar.\n\n🎯 This post is built around the "${pillar}" content pillar, designed to ${
        pillar === "Authority"
          ? "position you as the go-to expert in your field"
          : pillar === "Storytelling"
          ? "create a genuine human connection with your audience"
          : pillar === "Education"
          ? "deliver actionable value that gets saved and shared"
          : "spark conversations and boost your comment velocity"
      }.\n\nNote: This is a demo post generated without an AI key. Add your GEMINI_API_KEY to .env.local to receive fully AI-written, personalized content.\n\nDrop a 💡 if you want to start showing up consistently on LinkedIn.`,
      cta: `Drop a 💡 in the comments if this resonated with you`,
      hashtags: ["#LinkedInGrowth", "#PersonalBrand", "#ContentStrategy", "#LinkedIn", "#Creators"],
      image_prompt: `Professional LinkedIn post visual for "${hooks[i % hooks.length]}". Modern gradient design using deep blue (#0A66C2) and indigo (#6355FF). Bold white typography, clean geometric shapes, LinkedIn 1:1 square format. Corporate-creative hybrid style, Canva-quality, minimal background with subtle texture.`,
      video_concept: `Hook (0-3s): Look directly at camera and say "${hooks[i % hooks.length]}" with a pause. Body (3-40s): Walk through 3 quick points using hand gestures — keep it conversational, not scripted. End (40-55s): "If you found this useful, follow me — I post practical ${pillar.toLowerCase()} content every week." Film vertically on iPhone, natural light, no fancy setup needed.`,
      why_this_works: whys[i % whys.length],
      best_time_to_post: times[i % 5],
      content_pillar: pillar,
    };
  });
}

// ─── Email: Send via Resend (uses shared engine) ─────────────────────────────
async function sendEmail(
  toEmail: string,
  linkedinUrl: string,
  content: ContentDay[]
): Promise<string | null> {
  const emailHtml = buildEmailHtml(toEmail, linkedinUrl, content);
  return sendFunnelEmail({
    to: toEmail,
    subject: "🚀 Your 30-Day LinkedIn Content Calendar is Ready!",
    html: emailHtml,
  });
}

// ─── Storage: Google Sheets via Apps Script Webhook (uses shared engine) ──────
async function logToGoogleSheets(
  data: RequestBody,
  emailId: string | null
): Promise<void> {
  await logToSheets({
    funnel: "linkedin",
    source: "linkedin-content-funnel",
    date: new Date().toISOString().slice(0, 10),
    email: data.email,
    linkedinUrl: data.linkedinUrl,
    emailId: emailId || "not_sent",
    status: emailId ? "new" : "failed",
  });
}

// ─── Email HTML Template ──────────────────────────────────────────────────────
function buildEmailHtml(
  email: string,
  linkedinUrl: string,
  content: ContentDay[]
): string {
  const pillarColors: Record<string, string> = {
    Authority: "#6355FF",
    Storytelling: "#e11d48",
    Education: "#0284c7",
    Engagement: "#059669",
  };

  const postsHtml = content
    .map((day) => {
      const color = pillarColors[day.content_pillar] || "#6355FF";
      return `
      <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:24px;margin-bottom:20px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="background:${color};color:white;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;min-width:36px;text-align:center;line-height:36px;">
              ${day.day}
            </div>
            <div>
              <div style="font-weight:700;color:#111827;font-size:15px;">Day ${day.day}</div>
              <div style="color:#6b7280;font-size:12px;">${day.best_time_to_post}</div>
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <span style="background:${color}20;color:${color};border-radius:20px;padding:4px 12px;font-size:11px;font-weight:700;">${day.type}</span>
            <span style="background:#f3f4f6;color:#374151;border-radius:20px;padding:4px 12px;font-size:11px;font-weight:600;">${day.content_pillar}</span>
          </div>
        </div>

        <div style="background:#f9fafb;border-left:3px solid ${color};border-radius:0 8px 8px 0;padding:16px;margin-bottom:16px;">
          <div style="font-size:11px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Opening Hook</div>
          <div style="font-weight:700;color:#111827;font-size:15px;line-height:1.5;">"${day.hook}"</div>
        </div>

        <div style="margin-bottom:16px;">
          <div style="font-size:11px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">Full Post Copy</div>
          <div style="color:#374151;font-size:14px;line-height:1.7;white-space:pre-line;">${day.body}</div>
        </div>

        <div style="background:#ecfdf5;border-radius:8px;padding:12px 16px;margin-bottom:12px;">
          <div style="font-size:11px;font-weight:700;color:#065f46;text-transform:uppercase;margin-bottom:4px;">Call to Action</div>
          <div style="color:#047857;font-size:13px;font-weight:600;">${day.cta}</div>
        </div>

        <div style="margin-bottom:12px;">
          <div style="font-size:11px;font-weight:700;color:#374151;text-transform:uppercase;margin-bottom:6px;">Hashtags</div>
          <div style="color:#0A66C2;font-size:12px;font-weight:600;">${day.hashtags.join("  ")}</div>
        </div>

        <div style="background:#faf5ff;border-radius:8px;padding:12px 16px;margin-bottom:8px;">
          <div style="font-size:11px;font-weight:700;color:#7c3aed;text-transform:uppercase;margin-bottom:4px;">🖼️ Image Prompt (Midjourney / DALL·E / Canva AI)</div>
          <div style="color:#6d28d9;font-size:13px;font-style:italic;">${day.image_prompt}</div>
        </div>

        <div style="background:#eff6ff;border-radius:8px;padding:12px 16px;margin-bottom:8px;">
          <div style="font-size:11px;font-weight:700;color:#1d4ed8;text-transform:uppercase;margin-bottom:4px;">🎬 Video Concept (30–60 sec)</div>
          <div style="color:#1e40af;font-size:13px;line-height:1.6;">${day.video_concept}</div>
        </div>

        <div style="background:#f0fdf4;border:1px solid #86efac;border-radius:8px;padding:12px 16px;">
          <div style="font-size:11px;font-weight:700;color:#166534;text-transform:uppercase;margin-bottom:4px;">💡 Why This Will Perform</div>
          <div style="color:#15803d;font-size:13px;line-height:1.6;">${day.why_this_works}</div>
        </div>
      </div>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your 30-Day LinkedIn Content Calendar</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#0A66C2 0%,#6355FF 100%);padding:40px 24px;text-align:center;">
    <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:12px;padding:8px 20px;margin-bottom:20px;">
      <span style="color:rgba(255,255,255,0.9);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">LinkedIn Content Engine by Abhay Mishra</span>
    </div>
    <h1 style="color:white;font-size:28px;font-weight:800;margin:0 0 12px;line-height:1.2;">🚀 Your 30-Day LinkedIn Content Calendar</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:14px;margin:0 0 24px;">Profile: ${linkedinUrl}</p>
    <div style="display:inline-flex;gap:24px;background:rgba(255,255,255,0.12);border-radius:12px;padding:12px 24px;">
      <div style="text-align:center;"><div style="color:white;font-size:22px;font-weight:800;">30</div><div style="color:rgba(255,255,255,0.75);font-size:11px;">Posts</div></div>
      <div style="color:rgba(255,255,255,0.3);font-size:20px;">|</div>
      <div style="text-align:center;"><div style="color:white;font-size:22px;font-weight:800;">30</div><div style="color:rgba(255,255,255,0.75);font-size:11px;">Image Prompts</div></div>
      <div style="color:rgba(255,255,255,0.3);font-size:20px;">|</div>
      <div style="text-align:center;"><div style="color:white;font-size:22px;font-weight:800;">30</div><div style="color:rgba(255,255,255,0.75);font-size:11px;">Video Concepts</div></div>
    </div>
  </div>

  <!-- Body -->
  <div style="max-width:680px;margin:0 auto;padding:32px 16px 0;">
    <div style="background:white;border-radius:16px;padding:24px;margin-bottom:24px;border:1px solid #e5e7eb;">
      <h2 style="color:#111827;font-size:20px;font-weight:700;margin:0 0 12px;">Hi there! 👋</h2>
      <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 12px;">Here is your complete <strong>30-day LinkedIn content calendar</strong>, personalized based on your profile at <a href="${linkedinUrl}" style="color:#0A66C2;">${linkedinUrl}</a>.</p>
      <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 12px;">Each entry includes the full post copy, an AI image generation prompt, a video concept, and the strategic reason why it's built to perform.</p>
      <p style="color:#6b7280;font-size:14px;margin:0;">💡 <strong>Tip:</strong> Use each post as a starting point. Add your own voice, stories, and data to make it genuinely yours.</p>
    </div>

    ${postsHtml}

    <!-- Footer CTA -->
    <div style="background:linear-gradient(135deg,#1c1b1c,#2d1e6e);border-radius:16px;padding:32px;text-align:center;margin:24px 0;">
      <h3 style="color:white;font-size:20px;font-weight:800;margin:0 0 12px;">Want Help Executing This?</h3>
      <p style="color:rgba(255,255,255,0.75);font-size:14px;margin:0 0 24px;line-height:1.6;">I personally help creators and founders build their LinkedIn presence — from strategy to content to growth.</p>
      <a href="https://abhay-portfolio.vercel.app/contact" style="display:inline-block;background:#0A66C2;color:white;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:15px;">Book a Free Strategy Call →</a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:24px 0 40px;color:#9ca3af;font-size:12px;">
      <p style="margin:0 0 4px;">Abhay Mishra · abhayworkofficial@gmail.com · <a href="https://abhay-portfolio.vercel.app" style="color:#6355FF;">abhay-portfolio.vercel.app</a></p>
      <p style="margin:0;">You received this because you requested a LinkedIn content plan from abhay-portfolio.vercel.app</p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Main API Handler ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const maxRetries = 2;
  let lastError: unknown = null;

  try {
    const body: RequestBody = await req.json();

    // ── Validate inputs ──
    if (!body.linkedinUrl || !body.email) {
      return NextResponse.json(
        { error: "LinkedIn URL and email are required." },
        { status: 400 }
      );
    }

    if (!/linkedin\.com\/(in|company)\/.+/i.test(body.linkedinUrl)) {
      return NextResponse.json(
        { error: "Please enter a valid LinkedIn profile URL (e.g. linkedin.com/in/your-name)" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // ── Generate AI content ──
    const content = await generateContent(body);
    console.log(`✅ Generated ${content.length} content days for ${body.email}`);

    // ── Send email with retry logic (hard fail if not configured) ──
    let emailResult: string | null = null;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        emailResult = await sendEmail(body.email, body.linkedinUrl, content);
        if (emailResult) {
          console.log(`✅ Email sent on attempt ${attempt + 1}`);
          break;
        }
      } catch (err: unknown) {
        lastError = err;
        if (err instanceof Error && err.message.startsWith("EMAIL_NOT_CONFIGURED:")) {
          // Don't retry if email is not configured
          throw err;
        }
        console.warn(`⚠️  Email attempt ${attempt + 1} failed:`, err);
        if (attempt < maxRetries) {
          // Wait 1 second before retry (except on last attempt)
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }

    if (!emailResult && !(lastError instanceof Error && lastError.message.startsWith("EMAIL_NOT_CONFIGURED:"))) {
      throw lastError || new Error("Failed to send email after retries");
    }

    const emailId = emailResult || null;

    // ── Log to Google Sheets (non-blocking, optional) ──
    logToGoogleSheets(body, emailId).catch(() => {}); // fire-and-forget

    // ── Enqueue 3-email nurture sequence (no-op if admin not configured) ──
    enqueueNurture(body.email, body.linkedinUrl).catch((err) =>
      console.warn("⚠️  Nurture enqueue skipped:", err)
    );

    return NextResponse.json({
      success: true,
      message: "Your 30-day content plan is on its way! Check your inbox.",
      daysGenerated: content.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Something went wrong.";
    console.error("LinkedIn Funnel API Error:", message);

    // User-friendly error for email configuration issues
    if (message.startsWith("EMAIL_NOT_CONFIGURED:")) {
      return NextResponse.json(
        {
          error:
            "Email service not set up yet. Please contact Abhay directly at abhayworkofficial@gmail.com",
        },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
