import type { Metadata } from "next";
import { site } from "./content";

export const defaultDescription =
  "Senior Product Engineer building modern web, AI, fintech and Web3 products with React, TypeScript and Next.js.";

export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.name} — ${site.title}`,
      template: `%s — ${site.name}`,
    },
    description: defaultDescription,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      url: site.url,
      siteName: site.name,
      title: `${site.name} — ${site.title}`,
      description: defaultDescription,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${site.name} — ${site.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.name} — ${site.title}`,
      description: defaultDescription,
      images: ["/og-image.png"],
    },
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
      shortcut: ["/favicon.ico"],
    },
    manifest: "/site.webmanifest",
    ...overrides,
  };
}
