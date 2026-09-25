import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkedIn Content Funnel | Get Your 30-Day Content Plan — Abhay Mishra",
  description:
    "Enter your LinkedIn profile URL and receive a FREE AI-generated 30-day content calendar with posts, image ideas, video concepts & strategic rationale — delivered to your inbox.",
  keywords: [
    "LinkedIn content plan",
    "LinkedIn 30 day content calendar",
    "LinkedIn growth strategy",
    "AI LinkedIn posts",
    "LinkedIn content ideas",
    "Abhay Mishra",
  ],
  openGraph: {
    title: "Get Your FREE 30-Day LinkedIn Content Plan",
    description:
      "AI-generated LinkedIn content strategy: 30 posts, image prompts, video concepts & why each post will perform — sent directly to your inbox.",
    type: "website",
    url: "https://abhay-portfolio.vercel.app/linkedin-funnel",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Your FREE 30-Day LinkedIn Content Plan",
    description:
      "AI-generated LinkedIn content strategy: 30 posts, image prompts, video concepts & why each post will perform — sent directly to your inbox.",
  },
  alternates: {
    canonical: "/linkedin-funnel",
  },
};

export default function LinkedInFunnelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
