// ─────────────────────────────────────────────────────────────────────────────
// Shared funnel engine
//
// Every lead-magnet funnel reuses the same three building blocks:
//   1. generateWithGemini  → Gemini 1.5 Flash, JSON output, mock fallback
//   2. sendFunnelEmail     → Resend (hard-fails if RESEND_API_KEY missing)
//   3. logToSheets         → Google Sheets webhook (non-blocking, optional)
//
// This keeps each new funnel to ~1 page + 1 API route.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ───────────────────────────────────────────────────────────────────
export interface GeminiOptions {
  temperature?: number;
  maxOutputTokens?: number;
  model?: string;
  apiKey?: string;
}

export interface FunnelEmailParams {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  fromName?: string;
}

export const GEMINI_DEFAULT_MODEL = "gemini-1.5-flash";

// ─── AI: Gemini Content Generation ───────────────────────────────────────────
/**
 * Generate structured content from Gemini with a JSON response contract.
 * Falls back to the provided `fallback` generator when no API key is present,
 * the request fails, or the response cannot be parsed.
 */
export async function generateWithGemini<T>(
  prompt: string,
  fallback: () => T,
  opts: GeminiOptions = {}
): Promise<T> {
  const apiKey = opts.apiKey ?? process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.log("ℹ️  No GEMINI_API_KEY — using fallback content");
    return fallback();
  }

  const model = opts.model ?? GEMINI_DEFAULT_MODEL;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: opts.temperature ?? 0.8,
            maxOutputTokens: opts.maxOutputTokens ?? 8192,
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      console.error("Gemini API error:", await response.text());
      return fallback();
    }

    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || "[]";

    try {
      return JSON.parse(text) as T;
    } catch {
      console.error("Failed to parse Gemini response, using fallback");
      return fallback();
    }
  } catch (err) {
    console.error("Gemini request failed, using fallback:", err);
    return fallback();
  }
}

// ─── Email: Send via Resend ──────────────────────────────────────────────────
/**
 * Send a lead-magnet email via Resend.
 * Throws `EMAIL_NOT_CONFIGURED:` when no RESEND_API_KEY is present so callers
 * can return a user-friendly 503.
 * Returns the Resend message id (or null when unknown).
 */
export async function sendFunnelEmail(
  params: FunnelEmailParams
): Promise<string | null> {
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    // Hard fail — we don't silently skip. The user should know.
    throw new Error(
      "EMAIL_NOT_CONFIGURED: Add RESEND_API_KEY to your environment. See .env.local.example for instructions."
    );
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const adminBcc = process.env.ADMIN_EMAIL || undefined;

  const payload: Record<string, unknown> = {
    from: `${params.fromName ?? "Abhay Mishra"} <${fromAddress}>`,
    to: [params.to],
    reply_to: params.replyTo ?? "abhaymishra92800@gmail.com",
    subject: params.subject,
    html: params.html,
  };

  // BCC Abhay on every submission so he has a full lead log in his inbox
  if (adminBcc && adminBcc !== params.to) {
    payload.bcc = [adminBcc];
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Resend API error:", data);
    const resendMsg = data?.message || data?.name || "Unknown error";
    throw new Error(`Failed to send email: ${resendMsg}`);
  }

  console.log("✅ Email sent via Resend:", data.id);
  return (data.id as string) ?? null;
}

// ─── Storage: Google Sheets via Apps Script Webhook ───────────────────────────
/**
 * Append a row to the lead log via a Google Apps Script webhook.
 * No npm package needed — just a URL. Non-blocking: failures are logged but
 * never crash the request.
 */
export async function logToSheets(
  payload: Record<string, unknown>
): Promise<void> {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) return; // Optional — doesn't block email delivery

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ timestamp: new Date().toISOString(), ...payload }),
    });
    console.log("✅ Logged to Google Sheets");
  } catch (err) {
    console.warn("⚠️  Google Sheets logging failed:", err);
  }
}

// ─── Validation helpers ──────────────────────────────────────────────────────
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}
