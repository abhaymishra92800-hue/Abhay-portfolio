import { NextRequest, NextResponse } from "next/server";
import {
  generateWithGemini,
  sendFunnelEmail,
  logToSheets,
  isValidEmail,
  isValidUrl,
} from "@/lib/funnel";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface RetentionFix {
  rank: number;
  tactic: string;
  title: string;
  theProblem: string;
  theFix: string;
  expectedImpact: string;
}

interface RequestBody {
  channelUrl: string;
  email: string;
  niche?: string;
}

// ─── AI: Gemini Content Generation ───────────────────────────────────────────
function buildPrompt(body: RequestBody): string {
  const nicheLine = body.niche
    ? `The creator's niche is: ${body.niche}.`
    : "Infer the likely niche from the channel URL.";

  return `You are a world-class YouTube retention strategist who has audited 1,000+ channels.
Analyze the YouTube channel at: ${body.channelUrl}
${nicheLine}

Identify the 3 highest-impact drop-off problems that are hurting this channel's audience retention, and give a concrete fix for each. Generate exactly 3 fixes.
Return ONLY a valid JSON array with no markdown, no explanation, no code fences:

[
  {
    "rank": 1,
    "tactic": "Hook | Pattern Interrupt | Retention Loop | CTA | Thumbnail | Pacing | Intro Trim | Series Hook",
    "title": "Short punchy title for the fix (max 10 words)",
    "theProblem": "Specific drop-off pattern this channel likely suffers (2-3 sentences)",
    "theFix": "Step-by-step, actionable fix the creator can ship this week (3-5 sentences)",
    "expectedImpact": "Concrete retention/metric outcome, e.g. '+12% avg view duration' (1 sentence)"
  }
]

Rules:
- Order by impact: rank 1 = biggest retention lever.
- Each fix must be specific and different from the others.
- Reference real YouTube retention mechanics (hook retention, pattern interrupts, AVD, swipe-away points).
- Return ONLY the JSON array.`;
}

function generateMockContent(body: RequestBody): RetentionFix[] {
  const niche = body.niche?.trim() || "your niche";
  return [
    {
      rank: 1,
      tactic: "Hook",
      title: "Front-load the payoff in the first 15 seconds",
      theProblem:
        "Most viewers decide to stay or leave within the first 5–10 seconds. A slow, context-heavy intro pushes your swipe-away point dangerously early and tanks average view duration before the value even starts.",
      theFix:
        "Open with the single most surprising result, number, or outcome of the video — then earn the backstory. Delete every 'hey guys welcome back' beat. Script the first 15 seconds word-for-word and trim any setup that doesn't create curiosity.",
      expectedImpact: "+15–25% average view duration on new uploads.",
    },
    {
      rank: 2,
      tactic: "Retention Loop",
      title: "Plant open loops to pull viewers past the dip",
      theProblem:
        `In ${niche} content, retention usually craters around the 40–60% mark when a single long segment runs out of novelty. Viewers finish the point and bounce before the CTA.`,
      theFix:
        "Break long explanations into 'chapters' and tease the next one ('the mistake most creators make here is… stay till the end'). Use on-screen pattern interrupts — zooms, B-roll cuts, text pops — every 20–30 seconds to reset attention.",
      expectedImpact: "+8–12% retention through the mid-video dip.",
    },
    {
      rank: 3,
      tactic: "Pacing",
      title: "Cut dead air and tighten to a faster cut rhythm",
      theProblem:
        "Unedited pauses, repeated phrasing, and slow transitions signal 'low production' to the algorithm and train viewers to speed-watch or leave.",
      theFix:
        "Remove every silence longer than 0.4s, cut redundancies, and keep a cut every 2–4 seconds. Add a subtle zoom or move on static shots so the frame never feels frozen.",
      expectedImpact: "+5–10% swipe-away reduction in the first minute.",
    },
  ];
}

// ─── Email HTML Template ──────────────────────────────────────────────────────
function buildEmailHtml(email: string, channelUrl: string, fixes: RetentionFix[]): string {
  const tacticColors: Record<string, string> = {
    Hook: "#ef4444",
    "Pattern Interrupt": "#f59e0b",
    "Retention Loop": "#10b981",
    CTA: "#3b82f6",
    Thumbnail: "#8b5cf6",
    Pacing: "#ec4899",
    "Intro Trim": "#14b8a6",
    "Series Hook": "#f97316",
  };

  const fixesHtml = fixes
    .map((fix) => {
      const color = tacticColors[fix.tactic] || "#4936e6";
      return `
      <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:16px;padding:24px;margin-bottom:20px;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="background:${color};color:white;border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;min-width:36px;text-align:center;line-height:36px;">
              ${fix.rank}
            </div>
            <div>
              <div style="font-weight:700;color:#111827;font-size:15px;">Fix #${fix.rank}</div>
              <div style="color:#6b7280;font-size:12px;">Biggest retention lever</div>
            </div>
          </div>
          <span style="background:${color}20;color:${color};border-radius:20px;padding:4px 12px;font-size:11px;font-weight:700;">${fix.tactic}</span>
        </div>

        <div style="font-weight:700;color:#111827;font-size:17px;line-height:1.4;margin-bottom:14px;">${fix.title}</div>

        <div style="background:#fef2f2;border-left:3px solid ${color};border-radius:0 8px 8px 0;padding:14px;margin-bottom:12px;">
          <div style="font-size:11px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">The Drop-Off Problem</div>
          <div style="color:#374151;font-size:14px;line-height:1.7;">${fix.theProblem}</div>
        </div>

        <div style="background:#f0fdf4;border-left:3px solid #10b981;border-radius:0 8px 8px 0;padding:14px;margin-bottom:12px;">
          <div style="font-size:11px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">Your Fix</div>
          <div style="color:#374151;font-size:14px;line-height:1.7;">${fix.theFix}</div>
        </div>

        <div style="background:#eff6ff;border-radius:8px;padding:12px 16px;">
          <div style="font-size:11px;font-weight:700;color:#1d4ed8;text-transform:uppercase;margin-bottom:4px;">Expected Impact</div>
          <div style="color:#1e40af;font-size:13px;font-weight:600;">${fix.expectedImpact}</div>
        </div>
      </div>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your YouTube Retention Audit</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">

  <div style="background:linear-gradient(135deg,#ff0000 0%,#ff6a00 100%);padding:40px 24px;text-align:center;">
    <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:12px;padding:8px 20px;margin-bottom:20px;">
      <span style="color:rgba(255,255,255,0.9);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">YouTube Retention Audit by Abhay Mishra</span>
    </div>
    <h1 style="color:white;font-size:28px;font-weight:800;margin:0 0 12px;line-height:1.2;">🎯 Your Top 3 Retention Fixes</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:14px;margin:0 0 24px;">Channel: ${channelUrl}</p>
    <div style="display:inline-flex;gap:24px;background:rgba(255,255,255,0.12);border-radius:12px;padding:12px 24px;">
      <div style="text-align:center;"><div style="color:white;font-size:22px;font-weight:800;">3</div><div style="color:rgba(255,255,255,0.75);font-size:11px;">Targeted Fixes</div></div>
      <div style="color:rgba(255,255,255,0.3);font-size:20px;">|</div>
      <div style="text-align:center;"><div style="color:white;font-size:22px;font-weight:800;">+</div><div style="color:rgba(255,255,255,0.75);font-size:11px;">Avg View Duration</div></div>
    </div>
  </div>

  <div style="max-width:680px;margin:0 auto;padding:32px 16px 0;">
    <div style="background:white;border-radius:16px;padding:24px;margin-bottom:24px;border:1px solid #e5e7eb;">
      <h2 style="color:#111827;font-size:20px;font-weight:700;margin:0 0 12px;">Hi there! 👋</h2>
      <p style="color:#374151;font-size:15px;line-height:1.6;margin:0 0 12px;">Here are the <strong>3 highest-impact retention fixes</strong> for <a href="${channelUrl}" style="color:#ff0000;">${channelUrl}</a>, based on proven YouTube audience-retention mechanics.</p>
      <p style="color:#6b7280;font-size:14px;margin:0;">💡 <strong>Tip:</strong> Ship fix #1 first — the hook is responsible for the largest share of your retention curve.</p>
    </div>

    ${fixesHtml}

    <div style="background:linear-gradient(135deg,#1c1b1c,#2d1e6e);border-radius:16px;padding:32px;text-align:center;margin:24px 0;">
      <h3 style="color:white;font-size:20px;font-weight:800;margin:0 0 12px;">Want Me To Implement These?</h3>
      <p style="color:rgba(255,255,255,0.75);font-size:14px;margin:0 0 24px;line-height:1.6;">I edit and optimize YouTube videos for retention — from hook edits to pacing to full retention re-cuts.</p>
      <a href="https://abhay-portfolio.vercel.app/contact" style="display:inline-block;background:#ff0000;color:white;font-weight:700;padding:14px 32px;border-radius:12px;text-decoration:none;font-size:15px;">Book a Free Strategy Call →</a>
    </div>

    <div style="text-align:center;padding:24px 0 40px;color:#9ca3af;font-size:12px;">
      <p style="margin:0 0 4px;">Abhay Mishra · abhayworkofficial@gmail.com · <a href="https://abhay-portfolio.vercel.app" style="color:#6355FF;">abhay-portfolio.vercel.app</a></p>
      <p style="margin:0;">You received this because you requested a YouTube retention audit from abhay-portfolio.vercel.app</p>
    </div>
  </div>
</body>
</html>`;
}

// ─── Main API Handler ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    if (!body.channelUrl || !body.email) {
      return NextResponse.json(
        { error: "Channel URL and email are required." },
        { status: 400 }
      );
    }

    if (!isValidUrl(body.channelUrl)) {
      return NextResponse.json(
        { error: "Please enter a valid YouTube channel URL." },
        { status: 400 }
      );
    }

    if (!isValidEmail(body.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const fixes = await generateWithGemini<RetentionFix[]>(
      buildPrompt(body),
      () => generateMockContent(body),
      process.env.GEMINI_API_KEY ? { apiKey: process.env.GEMINI_API_KEY } : {}
    );

    const finalFixes = fixes.length > 0 ? fixes : generateMockContent(body);
    console.log(`✅ Generated ${finalFixes.length} retention fixes for ${body.email}`);

    const emailId = await sendFunnelEmail({
      to: body.email,
      subject: "🎯 Your Top 3 YouTube Retention Fixes",
      html: buildEmailHtml(body.email, body.channelUrl, finalFixes),
    });

    logToSheets({
      funnel: "youtube-audit",
      email: body.email,
      channelUrl: body.channelUrl,
      niche: body.niche || "auto",
      emailId: emailId || "not_sent",
      status: emailId ? "sent" : "failed",
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      message: "Your retention audit is on its way! Check your inbox.",
      fixesGenerated: finalFixes.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Something went wrong.";
    console.error("YouTube Audit API Error:", message);

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
