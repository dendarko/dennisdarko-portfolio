import { cache } from "react";
import type { ArchitectureGalleryItem, ProjectRecord, ProjectRecordSource } from "@/types/content";
import type { CmsPlaybook, CmsProjectDetail, CmsTeachingPost, SiteSettingsData } from "@/types/cms";
import { getArchitectureGalleryItems as getLocalArchitectureGalleryItems } from "@/lib/architecture";
import {
  getPlaybookBySlug as getLocalPlaybookBySlug,
  getPlaybooks as getLocalPlaybooks,
  getProjectCaseStudies as getLocalProjectCaseStudies,
  getProjectCaseStudyBySlug as getLocalProjectCaseStudyBySlug,
  getTeachingPostBySlug as getLocalTeachingPostBySlug,
  getTeachingPosts as getLocalTeachingPosts
} from "@/lib/content";
import { getAllProjects as getLocalProjects, getProjectBySlug as getLocalProjectBySlug } from "@/lib/projects";
import { isSanityConfigured, sanityFetch } from "./sanity/client";
import {
  architectureGalleryQuery,
  playbookBySlugQuery,
  playbookListQuery,
  playbookSlugsQuery,
  projectBySlugQuery,
  projectListQuery,
  projectSlugsQuery,
  siteSettingsQuery,
  teachingBySlugQuery,
  teachingListQuery,
  teachingSlugsQuery
} from "./sanity/queries";
import { siteConfig } from "@/lib/site";

type SlugItem = { slug: string };

const githubBase = siteConfig.links.github.replace(/\/+$/, "");

function resolveProjectUrl(project: ProjectRecordSource): ProjectRecord {
  const githubUrl = project.repo
    ? `${githubBase}/${project.repo}`
    : project.repoPath
      ? `https://github.com/${project.repoPath.replace(/^\/+/, "")}`
      : undefined;

  return {
    ...project,
    githubUrl,
    projectUrl: project.externalUrl ?? githubUrl ?? `/projects/${project.slug}`
  };
}

function fallbackSiteSettings(): SiteSettingsData {
  return {
    name: siteConfig.name,
    headline: siteConfig.headline,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    location: siteConfig.location,
    links: siteConfig.links,
    keywords: [...siteConfig.keywords],
    resumeFileUrl: "/resume.pdf",
    announcement: { enabled: false, text: "" },
    recruiterProfile: {
      targetRoles: [...siteConfig.roles],
      workAuthorization: "Eligible to work in Canada",
      availability: "Open to full-time roles",
      preferredWorkType: "Remote/Hybrid",
      industriesOfInterest: ["FinTech", "SaaS", "AI Platforms"],
      primaryStrengths: [...siteConfig.recruiterSkillSnapshot],
      recruiterSummary:
        "Production AI Engineer focused on reliable LLM systems, evaluation pipelines, and ML platform engineering. Strong on observability, guardrails, and deployment discipline for real-world AI products.",
      showAdditionalContext: true
    }
  };
}

function mapSanityProject(raw: any): ProjectRecord {
  return resolveProjectUrl({
    slug: raw.slug,
    title: raw.title,
    stage: raw.stage,
    featured: Boolean(raw.featured),
    date: raw.date,
    impact: raw.impact,
    highlights: raw.highlights ?? undefined,
    stack: raw.stack ?? undefined,
    tags: raw.tags ?? [],
    proof: raw.proof ?? [],
    metrics: raw.metrics ?? undefined,
    repo: raw.repo,
    externalUrl: raw.externalUrl ?? undefined,
    demoUrl: raw.demoUrl ?? undefined,
    nextImprovements: raw.nextImprovements ?? undefined,
    recruiterNotes: raw.recruiterNotes ?? undefined,
    caseStudy: Boolean(raw.caseStudy),
    architectureImage: raw.architectureImage ?? undefined,
    categories: raw.categories ?? [],
    relevanceScore: typeof raw.relevanceScore === "number" ? raw.relevanceScore : 50
  });
}

export const getSiteSettings = cache(async (): Promise<SiteSettingsData> => {
  if (!isSanityConfigured()) {
    return fallbackSiteSettings();
  }

  try {
    const data = await sanityFetch<any>(siteSettingsQuery);
    if (!data) {
      return fallbackSiteSettings();
    }

    return {
      ...fallbackSiteSettings(),
      name: data.name ?? siteConfig.name,
      headline: data.headline ?? siteConfig.headline,
      description: data.description ?? siteConfig.description,
      url: data.url ?? siteConfig.url,
      email: data.email ?? siteConfig.email,
      location: data.location ?? siteConfig.location,
      links: {
        github: data.links?.github ?? siteConfig.links.github,
        linkedin: data.links?.linkedin ?? siteConfig.links.linkedin
      },
      keywords: Array.isArray(data.keywords) && data.keywords.length ? data.keywords : [...siteConfig.keywords],
      resumeFileUrl: data.resumeFileUrl ?? "/resume.pdf",
      featuredProjectSlugs: data.featuredProjectSlugs ?? [],
      announcement: {
        enabled: Boolean(data.announcement?.enabled),
        text: data.announcement?.text ?? ""
      },
      recruiterProfile: {
        targetRoles: data.recruiterProfile?.targetRoles ?? [...siteConfig.roles],
        workAuthorization: data.recruiterProfile?.workAuthorization ?? "Eligible to work in Canada",
        availability: data.recruiterProfile?.availability ?? "Open to full-time roles",
        preferredWorkType: data.recruiterProfile?.preferredWorkType ?? "Remote/Hybrid",
        industriesOfInterest: data.recruiterProfile?.industriesOfInterest ?? ["FinTech", "SaaS", "AI Platforms"],
        yearsExperience:
          typeof data.recruiterProfile?.yearsExperience === "number"
            ? data.recruiterProfile.yearsExperience
            : undefined,
        primaryStrengths:
          data.recruiterProfile?.primaryStrengths ?? [...siteConfig.recruiterSkillSnapshot],
        recruiterSummary:
          data.recruiterProfile?.recruiterSummary ??
          "Production AI Engineer focused on reliable LLM systems, evaluation pipelines, and ML platform engineering.",
        showAdditionalContext:
          typeof data.recruiterProfile?.showAdditionalContext === "boolean"
            ? data.recruiterProfile.showAdditionalContext
            : true
      }
    };
  } catch {
    return fallbackSiteSettings();
  }
});

export const getProjects = cache(async (): Promise<ProjectRecord[]> => {
  if (!isSanityConfigured()) {
    return getLocalProjects();
  }

  try {
    const rows = await sanityFetch<any[]>(projectListQuery);
    return (rows ?? []).map(mapSanityProject);
  } catch {
    return getLocalProjects();
  }
});

export async function getFeaturedProjects(limit?: number) {
  const [projects, settings] = await Promise.all([getProjects(), getSiteSettings()]);

  const order = settings.featuredProjectSlugs ?? [];
  const bySlug = new Map(projects.map((project) => [project.slug, project]));
  const orderedFromSettings = order.map((slug) => bySlug.get(slug)).filter(Boolean) as ProjectRecord[];
  const remainingFeatured = projects
    .filter((project) => project.featured && !order.includes(project.slug))
    .sort((a, b) => b.relevanceScore - a.relevanceScore || +new Date(b.date) - +new Date(a.date));
  const featured = [...orderedFromSettings, ...remainingFeatured];

  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export async function getProjectSlugs() {
  if (!isSanityConfigured()) {
    const docs = await getLocalProjectCaseStudies();
    return docs.map((doc) => doc.slug);
  }

  try {
    const rows = await sanityFetch<SlugItem[]>(projectSlugsQuery);
    return (rows ?? []).map((row) => row.slug);
  } catch {
    const docs = await getLocalProjectCaseStudies();
    return docs.map((doc) => doc.slug);
  }
}

export async function getProjectDetailBySlug(slug: string): Promise<CmsProjectDetail | null> {
  if (!isSanityConfigured()) {
    const project = getLocalProjectBySlug(slug);
    if (!project) {
      return null;
    }
    const doc = await getLocalProjectCaseStudyBySlug(slug).catch(() => null);
    return {
      ...project,
      bodyMdx: doc?.content,
      summaryProblem: doc?.frontmatter.problem,
      summaryBuilt: doc?.frontmatter.built,
      summaryStack: doc?.frontmatter.stack ?? project.tags,
      links: doc?.frontmatter.links
    };
  }

  try {
    const raw = await sanityFetch<any>(projectBySlugQuery, { slug });
    if (!raw) {
      return null;
    }
    const project = mapSanityProject(raw);
    return {
      ...project,
      bodyPortableText: raw.body ?? [],
      summaryProblem: raw.problem ?? raw.impact,
      summaryBuilt: raw.built ?? "Production AI system implementation and integration.",
      summaryStack:
        Array.isArray(raw.stack) && raw.stack.length
          ? raw.stack.map((item: any) => item?.name).filter(Boolean)
          : raw.tags ?? project.tags,
      architectureImageCaption: raw.architectureImageCaption ?? undefined,
      gallery: (raw.gallery ?? []).filter((item: any) => Boolean(item?.url)),
      links: {
        github: project.githubUrl,
        demo: raw.demoUrl ?? project.demoUrl ?? undefined,
        docs: raw.docsUrl ?? undefined
      }
    };
  } catch {
    const project = getLocalProjectBySlug(slug);
    if (!project) {
      return null;
    }
    const doc = await getLocalProjectCaseStudyBySlug(slug).catch(() => null);
    return {
      ...project,
      bodyMdx: doc?.content,
      summaryProblem: doc?.frontmatter.problem,
      summaryBuilt: doc?.frontmatter.built,
      summaryStack: doc?.frontmatter.stack ?? project.tags,
      links: doc?.frontmatter.links
    };
  }
}

export const getTeachingPosts = cache(async (): Promise<CmsTeachingPost[]> => {
  if (!isSanityConfigured()) {
    const docs = await getLocalTeachingPosts();
    return docs.map((doc) => ({
      slug: doc.slug,
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      date: doc.frontmatter.date,
      topics: doc.frontmatter.topics,
      level: doc.frontmatter.level,
      bodyMdx: doc.content
    }));
  }

  try {
    const rows = await sanityFetch<any[]>(teachingListQuery);
    return (rows ?? []).map((row) => ({
      slug: row.slug,
      title: row.title,
      description: row.description || "",
      date: row.date,
      topics: row.topics ?? [],
      level: row.level ?? undefined,
      heroImageUrl: row.heroImageUrl ?? undefined
    }));
  } catch {
    const docs = await getLocalTeachingPosts();
    return docs.map((doc) => ({
      slug: doc.slug,
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      date: doc.frontmatter.date,
      topics: doc.frontmatter.topics,
      level: doc.frontmatter.level,
      bodyMdx: doc.content
    }));
  }
});

export async function getTeachingSlugs() {
  if (!isSanityConfigured()) {
    const docs = await getLocalTeachingPosts();
    return docs.map((doc) => doc.slug);
  }
  try {
    const rows = await sanityFetch<SlugItem[]>(teachingSlugsQuery);
    return (rows ?? []).map((row) => row.slug);
  } catch {
    const docs = await getLocalTeachingPosts();
    return docs.map((doc) => doc.slug);
  }
}

export async function getTeachingPostDetailBySlug(slug: string): Promise<CmsTeachingPost | null> {
  if (!isSanityConfigured()) {
    const doc = await getLocalTeachingPostBySlug(slug).catch(() => null);
    if (!doc) return null;
    return {
      slug: doc.slug,
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      date: doc.frontmatter.date,
      topics: doc.frontmatter.topics,
      level: doc.frontmatter.level,
      bodyMdx: doc.content
    };
  }

  try {
    const row = await sanityFetch<any>(teachingBySlugQuery, { slug });
    if (!row) return null;
    return {
      slug: row.slug,
      title: row.title,
      description: row.description || "",
      date: row.date,
      topics: row.topics ?? [],
      level: row.level ?? undefined,
      heroImageUrl: row.heroImageUrl ?? undefined,
      bodyPortableText: row.body ?? []
    };
  } catch {
    const doc = await getLocalTeachingPostBySlug(slug).catch(() => null);
    if (!doc) return null;
    return {
      slug: doc.slug,
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      date: doc.frontmatter.date,
      topics: doc.frontmatter.topics,
      level: doc.frontmatter.level,
      bodyMdx: doc.content
    };
  }
}

export const getPlaybooks = cache(async (): Promise<CmsPlaybook[]> => {
  if (!isSanityConfigured()) {
    const docs = await getLocalPlaybooks();
    return docs.map((doc) => ({
      slug: doc.slug,
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      date: doc.frontmatter.date,
      updated: doc.frontmatter.updated,
      audience: doc.frontmatter.audience,
      checklistLength: doc.frontmatter.checklistLength,
      bodyMdx: doc.content
    }));
  }

  try {
    const rows = await sanityFetch<any[]>(playbookListQuery);
    return (rows ?? []).map((row) => ({
      slug: row.slug,
      title: row.title,
      description: row.description || "",
      date: row.date || new Date().toISOString().slice(0, 10),
      updated: row.updatedAt ?? undefined,
      audience: row.audience ?? undefined,
      checklistLength: row.checklistLength ?? undefined
    }));
  } catch {
    const docs = await getLocalPlaybooks();
    return docs.map((doc) => ({
      slug: doc.slug,
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      date: doc.frontmatter.date,
      updated: doc.frontmatter.updated,
      audience: doc.frontmatter.audience,
      checklistLength: doc.frontmatter.checklistLength,
      bodyMdx: doc.content
    }));
  }
});

export async function getPlaybookSlugs() {
  if (!isSanityConfigured()) {
    const docs = await getLocalPlaybooks();
    return docs.map((doc) => doc.slug);
  }
  try {
    const rows = await sanityFetch<SlugItem[]>(playbookSlugsQuery);
    return (rows ?? []).map((row) => row.slug);
  } catch {
    const docs = await getLocalPlaybooks();
    return docs.map((doc) => doc.slug);
  }
}

export async function getPlaybookDetailBySlug(slug: string): Promise<CmsPlaybook | null> {
  if (!isSanityConfigured()) {
    const doc = await getLocalPlaybookBySlug(slug).catch(() => null);
    if (!doc) return null;
    return {
      slug: doc.slug,
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      date: doc.frontmatter.date,
      updated: doc.frontmatter.updated,
      audience: doc.frontmatter.audience,
      checklistLength: doc.frontmatter.checklistLength,
      bodyMdx: doc.content
    };
  }

  try {
    const row = await sanityFetch<any>(playbookBySlugQuery, { slug });
    if (!row) return null;
    return {
      slug: row.slug,
      title: row.title,
      description: row.description || "",
      date: row.date || new Date().toISOString().slice(0, 10),
      updated: row.updatedAt ?? undefined,
      audience: row.audience ?? undefined,
      checklistLength: row.checklistLength ?? undefined,
      bodyPortableText: row.body ?? []
    };
  } catch {
    const doc = await getLocalPlaybookBySlug(slug).catch(() => null);
    if (!doc) return null;
    return {
      slug: doc.slug,
      title: doc.frontmatter.title,
      description: doc.frontmatter.description,
      date: doc.frontmatter.date,
      updated: doc.frontmatter.updated,
      audience: doc.frontmatter.audience,
      checklistLength: doc.frontmatter.checklistLength,
      bodyMdx: doc.content
    };
  }
}

export async function getArchitectureGalleryItems(): Promise<ArchitectureGalleryItem[]> {
  if (!isSanityConfigured()) {
    return getLocalArchitectureGalleryItems();
  }

  try {
    const rows = await sanityFetch<any[]>(architectureGalleryQuery);
    const items: ArchitectureGalleryItem[] = [];

    for (const row of rows ?? []) {
      if (row.architecture?.url) {
        items.push({
          src: row.architecture.url,
          caption: row.architecture.caption ?? `${row.title} architecture diagram`,
          projectSlug: row.slug,
          projectTitle: row.title
        });
      }
      for (const image of row.gallery ?? []) {
        if (!image?.url) continue;
        items.push({
          src: image.url,
          caption: image.caption ?? `${row.title} image`,
          projectSlug: image.projectSlug ?? row.slug,
          projectTitle: row.title
        });
      }
    }

    return items.sort((a, b) => a.caption.localeCompare(b.caption));
  } catch {
    return getLocalArchitectureGalleryItems();
  }
}
