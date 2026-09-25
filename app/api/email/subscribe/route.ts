import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const runtime = "nodejs";

const SubscribeBody = z.object({
  email: z.string().email("Please enter a valid email address."),
  name: z.string().max(80).optional(),
  source: z.string().max(60).optional(),
});

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      "RESEND_API_KEY is not configured. Add it to .env.local to enable email capture."
    );
  }
  return new Resend(apiKey);
}

function getDb() {
  if (getApps().length === 0) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!projectId || !clientEmail || !privateKey) {
      return null;
    }
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  }
  return getFirestore();
}

export async function POST(req: NextRequest) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = SubscribeBody.safeParse(payload);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid input.";
    return NextResponse.json({ ok: false, error: firstError }, { status: 422 });
  }

  const { email, name, source } = parsed.data;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Abhay Mishra <abhayworkofficial@gmail.com>";

  const result: {
    resend: "added" | "skipped" | "missing-audience" | "error";
    email: "sent" | "skipped" | "error";
    firestore: "saved" | "skipped" | "error";
    message: string;
  } = {
    resend: "skipped",
    email: "skipped",
    firestore: "skipped",
    message: "Subscribed.",
  };

  if (audienceId) {
    try {
      const resend = getResend();
      await resend.contacts.create({
        email,
        firstName: name?.split(" ")[0],
        lastName: name?.split(" ").slice(1).join(" ") || undefined,
        unsubscribed: false,
        audienceId,
      });
      result.resend = "added";
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to add contact.";
      if (/already exists|duplicate/i.test(message)) {
        result.resend = "skipped";
      } else {
        result.resend = "error";
        result.message = message;
      }
    }
  } else {
    result.resend = "missing-audience";
  }

  try {
    const resend = getResend();
    const welcome = await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "You're on the list",
      html: `<!doctype html><html><body style="font-family:Inter,system-ui,-apple-system,sans-serif;background:#fafafa;padding:24px;color:#1a1a1a;">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;border:1px solid #eee;">
  <h1 style="margin:0 0 12px;font-size:22px;">Thanks for subscribing.</h1>
  <p style="margin:0 0 16px;line-height:1.6;color:#444;">You'll hear from me roughly once a week. Real notes on what is working in content, YouTube, and LinkedIn — no fluff, no spam.</p>
  <p style="margin:0 0 16px;line-height:1.6;color:#444;">If you ever want to skip the email and just book a call, you can do that here: <a href="https://abhay-editing-portfolio-website.vercel.app/contact" style="color:#6355ff;font-weight:600;">abhay-editing-portfolio-website.vercel.app/contact</a>.</p>
  <p style="margin:24px 0 0;color:#888;font-size:13px;">— Abhay</p>
</div>
</body></html>`,
    });
    if (welcome.error) {
      result.email = "error";
    } else {
      result.email = "sent";
    }
  } catch {
    result.email = "error";
  }

  try {
    const db = getDb();
    if (db) {
      await db.collection("email_subscribers").add({
        email,
        name: name ?? null,
        source: source ?? null,
        createdAt: new Date().toISOString(),
        resend: result.resend,
        welcomeEmail: result.email,
      });
      result.firestore = "saved";
    }
  } catch {
    result.firestore = "error";
  }

  return NextResponse.json({ ok: true, ...result });
}
