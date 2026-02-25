import projectsData from "@/data/projects.json";
import { siteConfig } from "@/lib/site";
import type { ProjectRecord, ProjectRecordSource } from "@/types/content";

const githubProfileBase = siteConfig.links.github.replace(/\/+$/, "");

function buildGithubUrl(project: ProjectRecordSource) {
  if (project.repo) {
    return `${githubProfileBase}/${project.repo}`;
  }
  if (project.repoPath) {
    return `https://github.com/${project.repoPath.replace(/^\/+/, "")}`;
  }
  return undefined;
}

function resolveProject(project: ProjectRecordSource): ProjectRecord {
  const githubUrl = buildGithubUrl(project);
  const projectUrl = project.externalUrl ?? githubUrl ?? `/projects/${project.slug}`;

  if (!project.caseStudy && !project.externalUrl && !githubUrl) {
    throw new Error(`Project "${project.slug}" requires repo/repoPath or externalUrl when caseStudy is false.`);
  }

  return {
    ...project,
    githubUrl,
    projectUrl
  };
}

const projects = (projectsData as ProjectRecordSource[]).map(resolveProject);

export function getAllProjects() {
  return [...projects];
}

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(limit?: number) {
  const featured = projects
    .filter((project) => project.featured)
    .sort((a, b) => b.relevanceScore - a.relevanceScore || +new Date(b.date) - +new Date(a.date));

  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getProjectsTimeline() {
  return [...projects].sort((a, b) => +new Date(a.date) - +new Date(b.date));
}

export function getProjectCategories() {
  return ["Python", "Data Science", "Machine Learning", "MLOps", "LLMOps/RAG", "Evaluation", "Analytics"] as const;
}
