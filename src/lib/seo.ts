import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import type { SiteSettingsData } from "@/types/cms";

function resolveSiteIdentity(site?: Partial<SiteSettingsData>) {
  return {
    name: site?.name ?? siteConfig.name,
    headline: site?.headline ?? siteConfig.headline,
    description: site?.description ?? siteConfig.description,
    url: site?.url ?? siteConfig.url,
    email: site?.email ?? siteConfig.email,
    location: site?.location ?? siteConfig.location,
    links: {
      github: site?.links?.github ?? siteConfig.links.github,
      linkedin: site?.links?.linkedin ?? siteConfig.links.linkedin
    },
    keywords: site?.keywords ?? [...siteConfig.keywords]
  };
}

export function absoluteUrl(path = "/", baseUrl: string = siteConfig.url) {
  return new URL(path, baseUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/og/default-og.svg",
  site
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  site?: Partial<SiteSettingsData>;
} = {}): Metadata {
  const resolvedSite = resolveSiteIdentity(site);
  const baseTitle = `${resolvedSite.name} | ${resolvedSite.headline}`;
  const resolvedTitle = title ? `${title} | ${resolvedSite.name}` : baseTitle;
  const resolvedDescription = description ?? resolvedSite.description;
  const url = absoluteUrl(path, resolvedSite.url);
  const imageUrl = absoluteUrl(image, resolvedSite.url);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: resolvedSite.name,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: resolvedTitle }]
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: [imageUrl]
    }
  };
}

export function getWebsiteJsonLd(site?: Partial<SiteSettingsData>) {
  const resolvedSite = resolveSiteIdentity(site);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: resolvedSite.name,
    url: resolvedSite.url,
    description: resolvedSite.description
  };
}

export function getPersonJsonLd(site?: Partial<SiteSettingsData>) {
  const resolvedSite = resolveSiteIdentity(site);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: resolvedSite.name,
    url: resolvedSite.url,
    jobTitle: resolvedSite.headline,
    description: resolvedSite.description,
    email: resolvedSite.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: resolvedSite.location
    },
    sameAs: [resolvedSite.links.github, resolvedSite.links.linkedin]
  };
}
