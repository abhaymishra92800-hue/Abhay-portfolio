import { NextRequest, NextResponse } from "next/server";
import { logToSheets } from "@/lib/funnel";

interface RequestBody {
  currency: "INR" | "USD";
  spend: number;
  ctr: number;
  conversionRate: number;
  aov: number;
  roas: number;
  verdict: string;
}

/**
 * Fire-and-forget analytics for the Ad ROI calculator.
 * No email capture — this is a pure client-side tool. We only log
 * usage to Google Sheets (when configured) so Abhay can see what
 * numbers visitors are testing.
 */
export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    if (
      typeof body.spend !== "number" ||
      typeof body.ctr !== "number" ||
      typeof body.conversionRate !== "number" ||
      typeof body.aov !== "number" ||
      typeof body.roas !== "number"
    ) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    logToSheets({
      funnel: "ad-roi-calculator",
      source: "client-side-calculator",
      date: new Date().toISOString().slice(0, 10),
      currency: body.currency,
      spend: Math.round(body.spend),
      ctr: body.ctr.toFixed(2),
      conversionRate: body.conversionRate.toFixed(2),
      aov: Math.round(body.aov),
      roas: body.roas.toFixed(2),
      verdict: body.verdict,
    }).catch(() => {});

    return NextResponse.json({ success: true });
  } catch {
    // Calculator never fails because of analytics
    return NextResponse.json({ success: true });
  }
}
