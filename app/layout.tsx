import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  metadataBase: new URL("https://abhay-editing-portfolio-website.vercel.app"),
  title: {
    default: "Abhay Mishra | Video Editor for Ads, Launch Films & Explainers",
    template: "%s | Abhay Mishra",
  },
  description: "Abhay Mishra makes ads, launch films, and explainers built to convert: real estate property ads, UGC ads, cinematic project films, and faceless YouTube content.",
  keywords: ["Abhay Mishra", "Video Editing", "Social Media Management", "YouTube Management", "LinkedIn Management", "Content Automation", "Descript", "DaVinci Resolve", "Remotion"],
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
    description: "Videos built to bring in leads, sales, and subscribers: property ads, UGC ads, launch films, and explainers.",
    url: "https://abhay-editing-portfolio-website.vercel.app",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Abhay Mishra - Video Editor and Social Media Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhay Mishra | Portfolio",
    description: "Videos built to bring in leads, sales, and subscribers: property ads, UGC ads, launch films, and explainers.",
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
                  "@id": "https://abhay-editing-portfolio-website.vercel.app/#business",
                  name: "Abhay Mishra — Video Editing & Social Media Management",
                  url: "https://abhay-editing-portfolio-website.vercel.app",
                  image: "https://abhay-editing-portfolio-website.vercel.app/api/og",
                  email: "abhayworkofficial@gmail.com",
                  priceRange: "$$",
                  areaServed: "Worldwide",
                  serviceType: [
                    "Video Editing",
                    "Social Media Management",
                    "YouTube Channel Management",
                    "Content Automation",
                    "LinkedIn Ads",
                    "AI Automation",
                  ],
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "IN",
                  },
                  founder: { "@type": "Person", name: "Abhay Mishra" },
                  sameAs: ["https://www.linkedin.com/in/abhaymishrahere/"],
                },
                {
                  "@type": "Person",
                  name: "Abhay Mishra",
                  url: "https://abhay-editing-portfolio-website.vercel.app",
                  jobTitle: "Video Editor & Social Media Manager",
                  email: "abhayworkofficial@gmail.com",
                  knowsAbout: [
                    "Video Editing",
                    "Social Media Management",
                    "Content Automation",
                    "YouTube Channel Management",
                    "AI Automation",
                  ],
                  sameAs: ["https://www.linkedin.com/in/abhaymishrahere/"],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://abhay-editing-portfolio-website.vercel.app/#website",
                  url: "https://abhay-editing-portfolio-website.vercel.app",
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
