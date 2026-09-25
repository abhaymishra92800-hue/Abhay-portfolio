import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  metadataBase: new URL("https://abhay-portfolio.vercel.app"),
  title: {
    default: "Abhay Mishra | Video Editor & Social Media Manager",
    template: "%s | Abhay Mishra",
  },
  description: "Portfolio of Abhay Mishra: video editing (Descript, DaVinci Resolve, Remotion), YouTube and LinkedIn management, and content automation.",
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
    description: "Video editor and social media manager. YouTube, LinkedIn, and content automation.",
    url: "https://abhay-portfolio.vercel.app",
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
    description: "Video editor and social media manager. YouTube, LinkedIn, and content automation.",
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
                  name: "Abhay Mishra — Video Editing & Social Media Management",
                  url: "https://abhay-portfolio.vercel.app",
                  image: "https://abhay-portfolio.vercel.app/api/og",
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
                  url: "https://abhay-portfolio.vercel.app",
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
