import { NextRequest, NextResponse } from "next/server";
import {
  generateWithGemini,
  sendFunnelEmail,
  logToSheets,
  isValidEmail,
} from "@/lib/funnel";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface HookTemplate {
  hook: string;
  format: string;
  angle: string;
  caption: string;
}

interface RequestBody {
  niche: string;
  email: string;
  platform?: string;
}

// ─── AI: Gemini Content Generation ───────────────────────────────────────────
function buildPrompt(body: RequestBody): string {
  const platform = body.platform || "Reels & YouTube Shorts";
  return `You are an elite short-form video hook writer (the kind who writes hooks for 10M+ follower accounts).
Niche: ${body.niche}
Platform: ${platform}

Write 30 scroll-stopping hook templates that a creator in this niche can literally paste into their next 30 videos.
Return ONLY a valid JSON array with no markdown, no explanation, no code fences:

[
  {
    "hook": "The exact first line spoken or on-screen text (max 18 words, punchy, no hashtags)",
    "format": "Reel | Short | TikTok",
    "angle": "Curiosity | Controversy | Story | List | Result | Question | Myth-Bust | Behind-the-Scenes | Pattern-Interrupt",
    "caption": "A matching 1-line on-screen caption or overlay suggestion (max 12 words)"
  }
]

Rules:
- 30 hooks, every one unique — no repeated structures or openers.
- Mix the angle types so the swipe file feels varied.
- Each hook must work for ${body.niche} specifically, not generic motivational fluff.
- Front-load the payoff: the first 3-5 words must create curiosity or tension.
- Return ONLY the JSON array.`;
}

function generateMockContent(body: RequestBody): HookTemplate[] {
  const niche = body.niche?.trim() || "your niche";
  const angles = [
    "Curiosity",
    "Controversy",
    "Story",
    "List",
    "Result",
    "Question",
    "Myth-Bust",
    "Behind-the-Scenes",
    "Pattern-Interrupt",
  ];
  const formats = ["Reel", "Short", "TikTok"];

  const templates = [
    `Stop scrolling — this ${niche} mistake is costing you followers`,
    `I tried the worst ${niche} advice on the internet so you don't have to`,
    `Nobody talks about this ${niche} truth (and it changed everything)`,
    `3 ${niche} habits that quietly ruined my growth`,
    `The ${niche} result I got in 30 days will surprise you`,
    `If you do ${niche}, watch this before your next post`,
    `Everyone gets this ${niche} step wrong — here's the fix`,
    `Behind the scenes of a ${niche} creator's actual workflow`,
    `This ${niche} myth needs to die today`,
    `The first thing I'd change if I restarted ${niche} from zero`,
  ];

  return Array.from({ length: 30 }, (_, i) => ({
    hook: templates[i % templates.length],
    format: formats[i % formats.length],
    angle: angles[i % angles.length],
    caption: `Save this ${niche} tip for later 🔖`,
  }));
}

// ─── Email HTML Template ──────────────────────────────────────────────────────
function buildEmailHtml(email: string, niche: string, hooks: HookTemplate[]): string {
  const angleColors: Record<string, string> = {
    Curiosity: "#8b5cf6",
    Controversy: "#ef4444",
    Story: "#ec4899",
    List: "#3b82f6",
    Result: "#10b981",
    Question: "#f59e0b",
    "Myth-Bust": "#14b8a6",
    "Behind-the-Scenes": "#6366f1",
    "Pattern-Interrupt": "#f97316",
  };

  const hooksHtml = hooks
    .map((h, i) => {
      const color = angleColors[h.angle] || "#4936e6";
      return `
      <div style="display:flex;gap:14px;align-items:flex-start;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;padding:16px 18px;margin-bottom:12px;">
        <div style="background:${color};color:white;border-radius:10px;min-width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;flex-shrink:0;">${i + 1}</div>
        <div style="flex:1;">
          <div style="font-weight:700;color:#111827;font-size:15px;line-height:1.5;margin-bottom:8px;">&ldquo;${h.hook}&rdquo;</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <span style="background:${color}20;color:${color};border-radius:20px;padding:3px 10px;font-size:10px;font-weight:700;">${h.angle}</span>
            <span style="background:#f3f4f6;color:#374151;border-radius:20px;padding:3px 10px;font-size:10px;font-weight:600;">${h.format}</span>
          </div>
          <div style="color:#6b7280;font-size:12px;margin-top:8px;font-style:italic;">📝 ${h.caption}</div>
        </div>
      </div>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Reel & Short Hook Swipe File</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">

  <div style="background:linear-gradient(135deg,#6355ff 0%,#0a66c2 100%);padding:40px 24px;text-align:center;">
    <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:12px;padding:8px 20px;margin-bottom:20px;">
      <span style="color:rgba(255,255,255,0.9);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Hook Swipe File by Abhay Mishra</span>
    </div>
    <h1 style="color:white;font-size:28px;font-weight:800;margin:0 0 12px;line-height:1.2;">🎬 30 Hooks for ${niche}</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:14px;margin:0 0 24px;">Your copy-paste swipe file for Reels &amp; Shorts</p>
    <div style="display:inline-flex;gap:24px;background:rgba(255,255,255,0.12);border-radius:12px;padding:12px 24px;">
      <div style="text-align:center;"><div style="color:white;font-size:22px;font-weight:800;">30</div><div style="color:rgba(255,255,255,0.75);font-size:11px;">Hooks</div></div>
      <div style="color:rgba(255,255,255,0.3);font-size:20px;">|</div>
      <div style="text-align:center;"><div style="color:white;font-size:22px;font-weight:800;">9</div><div style="color:rgba(255,255,255,0.75);font-size:11px;">Angles</div></div>
      <div style="color:rgba(255,255,255,0.3);font-size:20px;">|</div>
      <div style="text-align:center;"><div style="color:white;font-size:22px;font-weight:800;">3</div><div style="color:rgba(255,255,255,0.75);font-size:11px;">Platforms</div></div>
    </div>
  </div>

  <div style="max-width:680px;margin:0 auto;padding:32px 16px 0;">
    <div style="background:white;border-radius:16px;padding:24px;margin-bottom:24px;border:1px solid #e5e7eb;">
      <h2 style="color:#111827;font-size:20px;font-weight:700;margin:0 0 12px;">Hi there! 👋</h2>
      <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 12px;">Here are <strong>30 scroll-stopping hooks</strong> for <strong>${niche}</strong> — built to lift your hook rate and stop the scroll on Reels &amp; Shorts.</p>
      <p style="color:#6b7280;font-size:14px;margin:0;">💡 <strong>Tip:</strong> Rotate through the 9 angles so your feed never feels repetitive.</p>
    </div>

    ${hooksHtml}

    <div style="background:linear-gradient(135deg,#1c1b1c,#2d1e6e);border-radius:16px;padding:32px;text-align:center;margin:24px 0;">
      <h3 style="color:white;font-size:20px;font-weight:800;margin:0 0 12px;">Want Hooks That Actually Convert?</h3>
      <p style="color:rgba(255,255,255,0.75);font-size:14px;margin:0 0 24px;line-height:1.6;">I script and edit short-form content that gets watched, saved, and shared — for creators and brands.</p>
      <a href="https://abhay-editing-portfolio-website.vercel.app/contact" style="display:inline-block;background:#6355ff;color:white;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:15px;">Book a Free Strategy Call →</a>
    </div>

    <div style="text-align:center;padding:24px 0 40px;color:#9ca3af;font-size:12px;">
      <p style="margin:0 0 4px;">Abhay Mishra · abhayworkofficial@gmail.com · <a href="https://abhay-editing-portfolio-website.vercel.app" style="color:#6355FF;">abhay-editing-portfolio-website.vercel.app</a></p>
      <p style="margin:0;">You received this because you requested a hook swipe file from abhay-editing-portfolio-website.vercel.app</p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Main API Handler ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    if (!body.niche || !body.email) {
      return NextResponse.json(
        { error: "Niche and email are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const hooks = await generateWithGemini<HookTemplate[]>(
      buildPrompt(body),
      () => generateMockContent(body),
      process.env.GEMINI_API_KEY ? { apiKey: process.env.GEMINI_API_KEY } : {}
    );

    const finalHooks = hooks.length > 0 ? hooks : generateMockContent(body);
    console.log(`✅ Generated ${finalHooks.length} hooks for ${body.email}`);

    const emailId = await sendFunnelEmail({
      to: body.email,
      subject: `🎬 Your 30 ${body.niche} Hooks Are Ready`,
      html: buildEmailHtml(body.email, body.niche, finalHooks),
    });

    logToSheets({
      funnel: "reel-hooks",
      email: body.email,
      niche: body.niche,
      platform: body.platform || "auto",
      emailId: emailId || "not_sent",
      status: emailId ? "sent" : "failed",
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      message: "Your hook swipe file is on its way! Check your inbox.",
      hooksGenerated: finalHooks.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Something went wrong.";
    console.error("Reel Hooks API Error:", message);

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
