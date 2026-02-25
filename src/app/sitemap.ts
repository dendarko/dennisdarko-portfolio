import type { MetadataRoute } from "next";
import { getPlaybookSlugs, getProjectSlugs, getSiteSettings, getTeachingSlugs } from "@/lib/cms";
import { absoluteUrl } from "@/lib/seo";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, teachingSlugs, playbookSlugs, site] = await Promise.all([
    getProjectSlugs(),
    getTeachingSlugs(),
    getPlaybookSlugs(),
    getSiteSettings()
  ]);

  const staticRoutes = [
    "/",
    "/projects",
    "/teaching",
    "/playbooks",
    "/architecture",
    "/about",
    "/recruiter",
    "/contact",
    "/resume"
  ];

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: absoluteUrl(route, site.url),
    lastModified: new Date()
  }));

  const contentEntries: MetadataRoute.Sitemap = [
    ...projectSlugs.map((slug) => ({
      url: absoluteUrl(`/projects/${slug}`, site.url),
      lastModified: new Date()
    })),
    ...teachingSlugs.map((slug) => ({
      url: absoluteUrl(`/teaching/${slug}`, site.url),
      lastModified: new Date()
    })),
    ...playbookSlugs.map((slug) => ({
      url: absoluteUrl(`/playbooks/${slug}`, site.url),
      lastModified: new Date()
    }))
  ];

  return [...staticEntries, ...contentEntries];
}
