import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Abhay Mishra",
  description:
    "How Abhay Mishra (abhay-editing-portfolio-website.vercel.app) collects, uses, and protects your data — including contact forms, the LinkedIn content funnel, email communications, and privacy-friendly analytics.",
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-on-surface mb-3">{title}</h2>
      <div className="text-sm text-on-surface-variant leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-surface pt-28 pb-20 px-6 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">
          Legal
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-on-surface mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-on-surface-variant mb-10">
          Last updated: {new Date().toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <Section title="1. Who We Are">
          <p>
            This website (abhay-editing-portfolio-website.vercel.app) is operated by Abhay Mishra, a video editor
            and growth marketing specialist. For any privacy question, contact us
            at{" "}
            <a
              href="mailto:abhayworkofficial@gmail.com"
              className="text-primary font-semibold hover:underline"
            >
              abhayworkofficial@gmail.com
            </a>
            .
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Contact form:</strong> name, email address, subject, and
              message — submitted voluntarily when you reach out.
            </li>
            <li>
              <strong>LinkedIn content funnel:</strong> your LinkedIn profile
              URL and email address, submitted to generate a free 30-day content
              calendar.
            </li>
            <li>
              <strong>Website analytics:</strong> aggregated, anonymized usage
              data (pages viewed, referrer, device type) via Plausible — a
              cookieless, privacy-friendly analytics service. We do{" "}
              <em>not</em> use advertising or cross-site tracking cookies.
            </li>
          </ul>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="list-disc pl-5 space-y-2">
            <li>To deliver the content calendar you requested.</li>
            <li>
              To send a short, automated email nurture sequence (see Section 4).
            </li>
            <li>To respond to your enquiries and provide services you request.</li>
            <li>To understand, in aggregate, how the site is used and improve it.</li>
          </ul>
        </Section>

        <Section title="4. Email Communications & Nurture Sequence">
          <p>
            When you request the free LinkedIn content calendar, we store your
            email and send a brief, automated follow-up sequence designed to help
            you get results:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>A bonus resource to help you execute your plan.</li>
            <li>A prompt to share your first win.</li>
            <li>An invitation to book a paid strategy call.</li>
          </ul>
          <p>
            You can unsubscribe from any email with one click. We never sell or
            rent your email address, and we only send messages related to the
            content you requested or services you enquire about.
          </p>
        </Section>

        <Section title="5. Cookies & Consent">
          <p>
            This site does not set advertising or tracking cookies. We load
            privacy-friendly analytics only after you accept the cookie banner.
            You can decline analytics and still use every feature of the site.
          </p>
        </Section>

        <Section title="6. Data Storage & Retention">
          <p>
            Submissions may be stored in Google Firestore and/or a Google Sheet
            used as a lead board, and logged by our email provider (Resend). We
            retain this data only as long as necessary to provide the requested
            service or as required by law. Request deletion at any time via the
            contact email above.
          </p>
        </Section>

        <Section title="7. Your Rights">
          <p>
            You may request access to, correction of, or deletion of your
            personal data at any time by emailing{" "}
            <a
              href="mailto:abhayworkofficial@gmail.com"
              className="text-primary font-semibold hover:underline"
            >
              abhayworkofficial@gmail.com
            </a>
            .
          </p>
        </Section>

        <Section title="8. Changes">
          <p>
            We may update this policy occasionally. Material changes will be
            reflected by the &ldquo;Last updated&rdquo; date above.
          </p>
        </Section>

        <div className="mt-12 pt-8 border-t border-outline-variant/40">
          <Link
            href="/"
            className="text-sm font-semibold text-primary hover:underline"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
