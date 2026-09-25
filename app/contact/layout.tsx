import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Abhay Mishra | Get In Touch",
  description: "Contact Abhay Mishra for video editing, YouTube channel management, growth strategies, or general inquiries.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Abhay Mishra | Get In Touch",
    description: "Contact Abhay Mishra for video editing, YouTube channel management, growth strategies, or general inquiries.",
    url: "https://abhay-portfolio.vercel.app/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Abhay Mishra | Get In Touch",
    description: "Contact Abhay Mishra for video editing, YouTube channel management, growth strategies, or general inquiries.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
