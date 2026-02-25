import Link from "next/link";
import type { ProjectRecord } from "@/types/content";
import { cn, formatDate } from "@/lib/utils";

export function ProjectCard({
  project,
  compact = false
}: {
  project: ProjectRecord;
  compact?: boolean;
}) {
  const href = project.caseStudy ? `/projects/${project.slug}` : project.projectUrl;
  const linkLabel = project.caseStudy
    ? "Read case study"
    : project.externalUrl && !project.githubUrl
      ? "View project"
      : "View GitHub";

  return (
    <article className={cn("card card-hover p-5", compact && "min-h-[16rem]")}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">
            {project.stage}
          </p>
          <h3 className="mt-2 text-lg font-semibold leading-tight">{project.title}</h3>
        </div>
        {project.featured ? (
          <span className="chip border-accent-200 text-accent-700 dark:border-accent-400/30 dark:text-accent-200">
            Featured
          </span>
        ) : null}
      </div>

      <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">{project.impact}</p>

      {project.featured && project.stack?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((item) => (
            <span key={`${item.category}-${item.name}`} className="chip">
              {item.name}
            </span>
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, compact ? 3 : 4).map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>
      )}

      {project.featured && project.highlights?.[0] ? (
        <p className="mt-3 text-xs text-ink-500 dark:text-ink-300">{project.highlights[0]}</p>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {project.proof.map((item) => (
          <span
            key={item}
            className="rounded-full bg-accent-50 px-2.5 py-1 text-xs font-medium text-accent-800 dark:bg-accent-900/30 dark:text-accent-200"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="text-ink-500 dark:text-ink-300">{formatDate(project.date)}</span>
        <Link
          href={href}
          target={project.caseStudy ? undefined : "_blank"}
          rel={project.caseStudy ? undefined : "noreferrer"}
          className="font-medium text-accent-700 hover:text-accent-800 dark:text-accent-300 dark:hover:text-accent-200"
        >
          {linkLabel} →
        </Link>
      </div>
    </article>
  );
}
