import type { Metadata } from "next";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Free Ad Creative ROI Calculator | Abhay Mishra",
  description:
    "Plug in your ad spend, CTR, and conversion rate. Instantly see your ROAS, CPA, and revenue — plus 3 AI tips to improve the numbers. No sign-up.",
  keywords: [
    "ad creative ROI calculator",
    "ROAS calculator",
    "Facebook ads ROAS",
    "Google ads ROI",
    "CPC calculator",
    "Abhay Mishra",
  ],
  openGraph: {
    title: "Free Ad Creative ROI Calculator",
    description:
      "Calculate ROAS, CPA, and revenue in seconds — then get 3 AI tips to improve your ad creative.",
    type: "website",
    url: "https://abhay-editing-portfolio-website.vercel.app/ad-roi-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Ad Creative ROI Calculator",
    description:
      "Instantly see your ad ROAS, CPA, and revenue — plus 3 tips to improve them.",
  },
  alternates: {
    canonical: "/ad-roi-calculator",
  },
};

export default function AdROIPage() {
  return <Calculator />;
}
