import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  metadataBase: new URL("https://abhay-portfolio.vercel.app"),
  title: {
    default: "Abhay Mishra | Social Media & Video Growth Specialist",
    template: "%s | Abhay Mishra",
  },
  description: "Maximize Reach & Revenue with Expert Social Media Strategy, Video Editing (Descript, DaVinci Resolve), YouTube Management & Growth Marketing by Abhay Mishra.",
  keywords: ["Abhay Mishra", "Video Editing", "Social Media Management", "YouTube Management", "Canva Design", "Google Ads", "Growth Marketing"],
  authors: [{ name: "Abhay Mishra" }],
  creator: "Abhay Mishra",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Abhay Mishra",
    locale: "en_US",
    title: "Abhay Mishra | Portfolio",
    description: "I help creators and brands scale through data-driven content, video editing, and conversion-focused ad management.",
    url: "https://abhay-portfolio.vercel.app",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Abhay Mishra - Video Editor and Growth Marketer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhay Mishra | Portfolio",
    description: "I help creators and brands scale through data-driven content, video editing, and conversion-focused ad management.",
    images: ["/api/og"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg" }],
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ProfessionalService",
                  "@id": "https://abhay-portfolio.vercel.app/#business",
                  name: "Abhay Mishra — Video Editing & Growth Marketing",
                  url: "https://abhay-portfolio.vercel.app",
                  image: "https://abhay-portfolio.vercel.app/api/og",
                  email: "abhaymishra92800@gmail.com",
                  priceRange: "$$",
                  areaServed: "Worldwide",
                  serviceType: [
                    "Video Editing",
                    "Social Media Management",
                    "YouTube Channel Management",
                    "Google Ads",
                    "LinkedIn Ads",
                    "AI Automation",
                  ],
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "IN",
                  },
                  founder: { "@type": "Person", name: "Abhay Mishra" },
                  sameAs: ["https://linkedin.com"],
                },
                {
                  "@type": "Person",
                  name: "Abhay Mishra",
                  url: "https://abhay-portfolio.vercel.app",
                  jobTitle: "Video Editor & Growth Marketing Specialist",
                  email: "abhaymishra92800@gmail.com",
                  knowsAbout: [
                    "Video Editing",
                    "Social Media Management",
                    "Google Ads",
                    "YouTube Channel Management",
                    "AI Automation",
                  ],
                  sameAs: ["https://linkedin.com"],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://abhay-portfolio.vercel.app/#website",
                  url: "https://abhay-portfolio.vercel.app",
                  name: "Abhay Mishra",
                  inLanguage: "en",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col justify-between bg-surface text-on-surface antialiased">
        <Navbar />
        <main className="flex-grow pt-20">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
