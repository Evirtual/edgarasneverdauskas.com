import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/content";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = buildMetadata();

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.title,
  url: site.url,
  email: `mailto:${site.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Phnom Penh",
    addressCountry: "KH",
  },
  sameAs: [site.linkedin, site.github],
  knowsAbout: [
    "React",
    "TypeScript",
    "Next.js",
    "Web3",
    "DeFi",
    "Artificial Intelligence",
    "Fintech",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-[var(--color-bg)] focus:font-medium"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
