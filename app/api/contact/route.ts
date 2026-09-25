import { NextRequest, NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { sendFunnelEmail, isEmailConfigured } from "@/lib/funnel";
import { db } from "@/lib/firebase";

interface ContactRequestBody {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactRequestBody = await req.json();

    // ── Validate inputs ──
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // ── Save to Firebase ──
    let firestoreId: string | null = null;
    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        name: body.name,
        email: body.email,
        subject: body.subject || "General Inquiry",
        message: body.message,
        createdAt: serverTimestamp(),
      });
      firestoreId = docRef.id;
    } catch (err) {
      console.error("Failed to save contact to Firestore:", err);
      // Continue anyway — we still attempt to send the email
    }

    // ── Send email notification to admin (Resend) ──
    const emailHtml = buildContactEmailHtml(body);
    const adminEmail = process.env.ADMIN_EMAIL || "abhayworkofficial@gmail.com";

    try {
      await sendFunnelEmail({
        to: adminEmail,
        replyTo: body.email,
        subject: `New Contact: ${body.name} — ${body.subject || "General Inquiry"}`,
        html: emailHtml,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("Failed to send contact email via Resend:", err);

      // If email isn't configured, return a 503 so the UI can show a friendly message
      if (message.startsWith("EMAIL_NOT_CONFIGURED:")) {
        return NextResponse.json(
          {
            error:
              "Email service not set up yet. Please contact Abhay directly at abhayworkofficial@gmail.com",
          },
          { status: 503 }
        );
      }
      throw err;
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent. Abhay will get back to you shortly.",
      firestoreId: firestoreId || undefined,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Something went wrong.";
    console.error("Contact API Error:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function buildContactEmailHtml(body: ContactRequestBody): string {
  const subject = body.subject || "General Inquiry";
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Submission</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#0A66C2 0%,#6355FF 100%);padding:32px 24px;text-align:center;">
    <h1 style="color:white;font-size:24px;font-weight:800;margin:0;">📬 New Contact Submission</h1>
    <p style="color:rgba(255,255,255,0.85);font-size:13px;margin:8px 0 0;">via abhay-portfolio.vercel.app</p>
  </div>

  <!-- Body -->
  <div style="max-width:640px;margin:0 auto;padding:32px 16px;">

    <!-- Sender Info -->
    <div style="background:white;border-radius:16px;padding:24px;margin-bottom:20px;border:1px solid #e5e7eb;">
      <h2 style="color:#111827;font-size:18px;font-weight:700;margin:0 0 16px;">Sender Details</h2>
      <table style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600;width:120px;">Name</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;font-weight:600;">${body.name}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600;">Email</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;"><a href="mailto:${body.email}" style="color:#0A66C2;">${body.email}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0;color:#6b7280;font-size:13px;font-weight:600;">Subject</td>
          <td style="padding:8px 0;color:#111827;font-size:14px;">${subject}</td>
        </tr>
      </table>
    </div>

    <!-- Message -->
    <div style="background:white;border-radius:16px;padding:24px;margin-bottom:20px;border:1px solid #e5e7eb;">
      <h2 style="color:#111827;font-size:18px;font-weight:700;margin:0 0 16px;">Message</h2>
      <div style="color:#374151;font-size:14px;line-height:1.7;white-space:pre-line;">${body.message}</div>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-top:24px;">
      <a href="mailto:${body.email}" style="display:inline-block;background:#0A66C2;color:white;font-weight:700;padding:12px 28px;border-radius:12px;text-decoration:none;font-size:14px;">Reply to ${body.name} →</a>
    </div>

  </div>

  <!-- Footer -->
  <div style="text-align:center;padding:24px 0 40px;color:#9ca3af;font-size:12px;">
    <p style="margin:0;">Abhay Mishra · abhayworkofficial@gmail.com · <a href="https://abhay-portfolio.vercel.app" style="color:#6355FF;">abhay-portfolio.vercel.app</a></p>
  </div>
</body>
</html>`;
}