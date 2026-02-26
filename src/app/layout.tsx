import type { Metadata, Viewport } from "next";
import { AnalyticsProvider } from "@/components/analytics-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider, ThemeScript } from "@/components/ui/theme-provider";
import { getSiteSettings } from "@/lib/cms";
import { buildMetadata, getPersonJsonLd, getWebsiteJsonLd } from "@/lib/seo";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();

  return {
    ...buildMetadata({ site }),
    metadataBase: new URL(site.url),
    keywords: [...site.keywords],
    authors: [{ name: site.name }],
    creator: site.name,
    category: "Technology",
    icons: {
      icon: "/icon.svg"
    }
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#232831" }
  ]
};

export const revalidate = 60;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteSettings();
  const websiteJsonLd = getWebsiteJsonLd(site);
  const personJsonLd = getPersonJsonLd(site);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeScript />
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-ink-900"
          >
            Skip to content
          </a>
          <SiteHeader brandName={site.name} />
          <main id="main-content">{children}</main>
          <SiteFooter site={site} />
          <AnalyticsProvider />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
