import Link from "next/link";
import type { ProjectRecord } from "@/types/content";
import { formatDate } from "@/lib/utils";

export function ProjectTimeline({ projects }: { projects: ProjectRecord[] }) {
  const ordered = [...projects].sort((a, b) => +new Date(a.date) - +new Date(b.date));

  return (
    <ol className="space-y-4">
      {ordered.map((project) => (
        <li key={project.slug} className="card p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold">{project.title}</span>
                <span className="chip">{project.stage}</span>
                {project.featured ? <span className="chip">Featured</span> : null}
              </div>
              <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{project.impact}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.categories.map((category) => (
                  <span key={`${project.slug}-${category}`} className="rounded-full bg-ink-100 px-2 py-1 text-xs dark:bg-white/10">
                    {category}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex min-w-[12rem] flex-col items-start gap-2 sm:items-end">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">
                {formatDate(project.date)}
              </span>
              <Link
                href={project.caseStudy ? `/projects/${project.slug}` : project.projectUrl}
                target={project.caseStudy ? undefined : "_blank"}
                rel={project.caseStudy ? undefined : "noreferrer"}
                className="text-sm font-medium text-accent-700 dark:text-accent-300"
              >
                {project.caseStudy ? "Case study" : project.externalUrl && !project.githubUrl ? "Project link" : "GitHub"} →
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
