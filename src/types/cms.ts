import type { ProjectRecord } from "@/types/content";

export interface SiteSettingsData {
  name: string;
  headline: string;
  description: string;
  url: string;
  email: string;
  location: string;
  links: {
    github: string;
    linkedin: string;
  };
  keywords: string[];
  resumeFileUrl?: string | null;
  featuredProjectSlugs?: string[];
  announcement?: {
    enabled: boolean;
    text?: string;
  };
  recruiterProfile?: {
    targetRoles?: string[];
    workAuthorization?: string;
    availability?: string;
    preferredWorkType?: "Remote" | "Hybrid" | "Onsite" | "Remote/Hybrid";
    industriesOfInterest?: string[];
    yearsExperience?: number;
    primaryStrengths?: string[];
    recruiterSummary?: string;
    showAdditionalContext?: boolean;
  };
}

export interface PortableTextContent {
  bodyPortableText?: unknown[];
  bodyMdx?: string;
}

export interface CmsProjectDetail extends ProjectRecord, PortableTextContent {
  summaryProblem?: string;
  summaryBuilt?: string;
  summaryStack?: string[];
  architectureImageCaption?: string;
  links?: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  gallery?: Array<{
    url: string;
    caption?: string;
    projectSlug?: string;
  }>;
}

export interface CmsTeachingPost extends PortableTextContent {
  slug: string;
  title: string;
  description: string;
  date: string;
  topics: string[];
  level?: "Beginner" | "Intermediate" | "Advanced";
  heroImageUrl?: string;
}

export interface CmsPlaybook extends PortableTextContent {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  audience?: string;
  checklistLength?: number;
}
