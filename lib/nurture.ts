// ─────────────────────────────────────────────────────────────────────────────
// Resend 3-email nurture sequence
//
// When someone grabs the LinkedIn funnel, we deliver the calendar email
// immediately (handled by the funnel API) and enqueue three follow-up emails:
//   1. Day 2  → deliver a bonus tool (posting cheat-sheet)
//   2. Day 5  → share a win (prompt them to post + report back)
//   3. Day 9  → offer a paid strategy call
//
// Follow-ups are queued in Firestore (nurture_queue) and sent by a Vercel Cron
// job (app/api/cron/nurture). If Firebase Admin is not configured, enqueue is a
// no-op so the funnel still succeeds.
// ─────────────────────────────────────────────────────────────────────────────

import { sendFunnelEmail } from "@/lib/funnel";
import { getAdminDb } from "@/lib/firebaseAdmin";

export interface NurtureContext {
  email: string;
  linkedinUrl: string;
}

export interface NurtureStep {
  key: string;
  /** Hours after signup to send this email. */
  delayHours: number;
  subject: string;
  buildHtml: (ctx: NurtureContext) => string;
}

// ─── Email shell (matches funnel brand) ───────────────────────────────────────
function shell(title: string, inner: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
  <div style="background:linear-gradient(135deg,#0A66C2 0%,#6355FF 100%);padding:36px 24px;text-align:center;">
    <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:12px;padding:8px 20px;margin-bottom:16px;">
      <span style="color:rgba(255,255,255,0.9);font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">Abhay Mishra · LinkedIn Growth</span>
    </div>
    <h1 style="color:white;font-size:24px;font-weight:800;margin:0;line-height:1.25;">${title}</h1>
  </div>
  <div style="max-width:680px;margin:0 auto;padding:32px 16px 8px;">
    ${inner}
    <div style="background:linear-gradient(135deg,#1c1b1c,#2d1e6e);border-radius:16px;padding:28px;text-align:center;margin:24px 0;">
      <h3 style="color:white;font-size:18px;font-weight:800;margin:0 0 12px;">Want this done for you?</h3>
      <p style="color:rgba(255,255,255,0.75);font-size:14px;margin:0 0 20px;line-height:1.6;">I help creators and founders build a LinkedIn presence that actually converts.</p>
      <a href="https://abhay-portfolio.vercel.app/contact" style="display:inline-block;background:#0A66C2;color:white;font-weight:700;padding:13px 28px;border-radius:12px;text-decoration:none;font-size:15px;">Book a Strategy Call →</a>
    </div>
    <div style="text-align:center;padding:16px 0 36px;color:#9ca3af;font-size:12px;">
      <p style="margin:0 0 4px;">Abhay Mishra · abhayworkofficial@gmail.com · <a href="https://abhay-portfolio.vercel.app" style="color:#6355FF;">abhay-portfolio.vercel.app</a></p>
      <p style="margin:0;">You received this because you requested a LinkedIn content plan from abhay-portfolio.vercel.app</p>
    </div>
  </div>
</body>
</html>`;
}

const CARD = (title: string, body: string) =>
  `<div style="background:white;border-radius:16px;padding:22px;margin-bottom:18px;border:1px solid #e5e7eb;">
    <div style="font-size:11px;font-weight:700;color:#6355FF;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;">${title}</div>
    <div style="color:#374151;font-size:14px;line-height:1.7;">${body}</div>
  </div>`;

// ─── The three nurture emails ─────────────────────────────────────────────────
export const NURTURE_STEPS: NurtureStep[] = [
  {
    key: "bonus-tool",
    delayHours: 48, // Day 2
    subject: "🎁 Your LinkedIn posting cheat-sheet (steal this)",
    buildHtml: ({ linkedinUrl }) =>
      shell(
        "A free tool to make posting effortless",
        `${CARD(
          "Hey there 👋",
          `Your 30-day calendar is in your inbox — but a plan is only as good as the day you actually post. So here's a bonus: my <strong>LinkedIn Posting Cheat-Sheet</strong>, the same checklist I use before every post.`
        )}
        ${CARD(
          "The 5-point pre-post checklist",
          `1. <strong>Hook in the first line</strong> — lead with the payoff, not &ldquo;I wanted to share&rdquo;.<br/>
           2. <strong>One idea per post</strong> — if it needs two paragraphs of context, it's two posts.<br/>
           3. <strong>White space</strong> — short lines = more reads on mobile.<br/>
           4. <strong>A question or CTA</strong> at the end to spark comments.<br/>
           5. <strong>Post at the time</strong> listed on each day of your calendar.`
        )}
        ${CARD(
          "Your move",
          `Pick <strong>Day 1</strong> from your calendar, run it through this checklist, and publish it. That single action is what separates the 1% who grow from everyone who &ldquo;plans to start Monday.&rdquo;<br/><br/>Profile we built this for: <a href="${linkedinUrl}" style="color:#0A66C2;">${linkedinUrl}</a>`
        )}`
      ),
  },
  {
    key: "share-win",
    delayHours: 120, // Day 5
    subject: "Did you post yet? Share your first win 👇",
    buildHtml: () =>
      shell(
        "Let's bank your first win",
        `${CARD(
          "Quick check-in",
          `It's been a few days — have you published your first post from the calendar? If yes, amazing. If not, today's the day. The algorithm rewards consistency, not perfection.`
        )}
        ${CARD(
          "Here's the easy path",
          `Open <strong>Day 2 or Day 3</strong> of your calendar, copy the hook, and add one line of your own context. Hit publish. Done in 10 minutes.`
        )}
        ${CARD(
          "Share your win with me",
          `Reply to this email and tell me how it performed — impressions, comments, a new connection. I read every reply, and your real data helps me show you what to double down on next.`
        )}`
      ),
  },
  {
    key: "paid-call",
    delayHours: 216, // Day 9
    subject: "Want me to build this for you? (paid strategy call)",
    buildHtml: () =>
      shell(
        "Ready to go from plan to results?",
        `${CARD(
          "You've got the map",
          `By now you've seen how a structured 30-day plan feels. Most founders and creators get 10× further with a strategist in their corner — building the content, the hooks, and the growth engine while you stay focused on your business.`
        )}
        ${CARD(
          "What a paid engagement looks like",
          `• A custom content system tuned to your niche and goals<br/>
           • Done-for-you calendar + post drafts every week<br/>
           • Monthly strategy calls and performance reviews<br/>
           • Direct line for quick feedback on anything you post`
        )}
        ${CARD(
          "Next step",
          `Book a <strong>paid strategy call</strong> and we'll map exactly where the biggest leverage is for your profile — even if we don't end up working together, you'll leave with a clear plan.`
        )}`
      ),
  },
];

// ─── Queue operations ─────────────────────────────────────────────────────────
interface QueuedNurture {
  email: string;
  linkedinUrl: string;
  stepIndex: number;
  sendAt: number; // epoch ms
  status: "pending" | "sent" | "failed";
  createdAt: number;
}

/** Queue the 3 follow-up emails for a new lead. No-op if admin isn't configured. */
export async function enqueueNurture(
  email: string,
  linkedinUrl: string
): Promise<void> {
  const db = getAdminDb();
  if (!db) return;

  const now = Date.now();
  const col = db.collection("nurture_queue");
  await Promise.all(
    NURTURE_STEPS.map((step, i) =>
      col.add({
        email,
        linkedinUrl,
        stepIndex: i,
        sendAt: now + step.delayHours * 3_600_000,
        status: "pending",
        createdAt: now,
      } satisfies QueuedNurture)
    )
  );
  console.log(`✅ Enqueued ${NURTURE_STEPS.length} nurture emails for ${email}`);
}

/** Send every due, pending nurture email. Safe to run on a schedule. */
export async function processDueNurture(): Promise<{
  sent: number;
  failed: number;
}> {
  const db = getAdminDb();
  if (!db) return { sent: 0, failed: 0 };

  const now = Date.now();
  const snap = await db
    .collection("nurture_queue")
    .where("status", "==", "pending")
    .limit(100)
    .get();

  let sent = 0;
  let failed = 0;

  for (const doc of snap.docs) {
    const data = doc.data() as QueuedNurture;
    if (data.sendAt > now) continue;

    const step = NURTURE_STEPS[data.stepIndex];
    if (!step) {
      await doc.ref.delete();
      continue;
    }

    try {
      await sendFunnelEmail({
        to: data.email,
        subject: step.subject,
        html: step.buildHtml({ email: data.email, linkedinUrl: data.linkedinUrl }),
      });
      await doc.ref.update({ status: "sent", sentAt: now });
      sent++;
    } catch (err) {
      console.error(`Nurture send failed for ${data.email} (${step.key}):`, err);
      await doc.ref.update({ status: "failed" });
      failed++;
    }
  }

  return { sent, failed };
}
