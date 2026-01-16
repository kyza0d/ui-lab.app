import type { Metadata } from "next";
import { getTitleForPath, generateTitleFromPathname } from "./metadata-config";
import type { ExtractedMetadata } from "./metadata-extractors";

export interface SiteMetadataConfig {
  title?: string;
  pathname?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  keywords?: string[];
  sourceType?: "doc" | "component" | "element" | "page";
  source?: Record<string, unknown>;
}

const DEFAULT_SITE_CONFIG = {
  title: "UI Lab",
  description:
    "A comprehensive collection of UI components and patterns for building modern interfaces",
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://ui-lab.dev",
  ogImage: "/og-image.jpg",
};

function formatPageTitle(title: string): string {
  if (title === "UI Lab" || title === "Home") return "UI Lab";
  return `UI Lab | ${title}`;
}

export function generateMetadata(config: SiteMetadataConfig = {}): Metadata {
  const {
    canonical,
    ogImage = DEFAULT_SITE_CONFIG.ogImage,
    ogType = "website",
    twitterCard = "summary_large_image",
    pathname,
    keywords,
    sourceType,
    source,
  } = config;

  let title: string;
  let description: string;

  if (config.title) {
    title = formatPageTitle(config.title);
    description = config.description || DEFAULT_SITE_CONFIG.description;
  } else if (pathname) {
    const configuredTitle = getTitleForPath(pathname);
    const baseTitle = configuredTitle || generateTitleFromPathname(pathname);
    title = formatPageTitle(baseTitle);
    description = config.description || DEFAULT_SITE_CONFIG.description;
  } else {
    title = DEFAULT_SITE_CONFIG.title;
    description = config.description || DEFAULT_SITE_CONFIG.description;
  }

  const baseUrl = DEFAULT_SITE_CONFIG.baseUrl;
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : pathname ? `${baseUrl}${pathname}` : baseUrl;
  const fullOgImage = ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`;

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: ogType,
      url: canonicalUrl,
      siteName: DEFAULT_SITE_CONFIG.title,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title,
      description,
      images: [fullOgImage],
    },
  };

  if (keywords && keywords.length > 0) {
    metadata.keywords = keywords;
  }

  return metadata;
}
