import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxRenderer } from "@/components/mdx/mdx-renderer";
import { PortableTextRenderer } from "@/components/portable-text-renderer";
import { Container } from "@/components/ui/container";
import { getProjectDetailBySlug, getProjectSlugs } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectDetailBySlug(slug);
  if (!project) {
    return buildMetadata({ title: "Project" });
  }

  return buildMetadata({
    title: project.title,
    description: project.impact,
    path: `/projects/${slug}`
  });
}

function hasMetrics(project: NonNullable<Awaited<ReturnType<typeof getProjectDetailBySlug>>>) {
  const metrics = project.metrics;
  return Boolean(
    metrics &&
      (typeof metrics.latencyMs === "number" ||
        typeof metrics.costPer1kTokensUsd === "number" ||
        metrics.accuracyOrScore ||
        metrics.evalNotes)
  );
}

export default async function ProjectCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectDetailBySlug(slug);

  if (!project) {
    notFound();
  }

  const showMetrics = hasMetrics(project);
  const stackItems = project.stack ?? [];
  const tags = project.tags ?? [];
  const highlights = project.highlights ?? [];

  return (
    <div className="pb-16 pt-10">
      <Container className="max-w-5xl space-y-6">
        <header className="card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-700 dark:text-accent-300">
            Case Study - {project.stage}
          </p>
          <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">{project.title}</h1>
          <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">{project.impact}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip">{formatDate(project.date)}</span>
            {project.proof.map((proof) => (
              <span key={proof} className="chip">
                {proof}
              </span>
            ))}
          </div>

          {tags.length ? (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Tags</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="chip">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {stackItems.length ? (
            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Stack</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {stackItems.map((item) => (
                  <span
                    key={`${item.category}-${item.name}`}
                    className="rounded-full border border-ink-200 bg-white/80 px-2.5 py-1 text-xs font-medium dark:border-white/10 dark:bg-white/5"
                    title={item.category}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {highlights.length === 3 ? (
            <section className="mt-5 rounded-2xl border border-accent-200 bg-accent-50/60 p-4 dark:border-accent-400/20 dark:bg-accent-900/10">
              <h2 className="text-sm font-semibold">Highlights</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink-700 dark:text-ink-200">
                {highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span aria-hidden="true" className="mt-0.5 text-accent-600 dark:text-accent-300">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-3">
            {project.githubUrl || project.externalUrl ? (
              <a href={project.githubUrl ?? project.externalUrl} className="btn-primary" target="_blank" rel="noreferrer">
                {project.githubUrl ? "GitHub Repo" : "Project Link"}
              </a>
            ) : null}
            {project.demoUrl ? (
              <a href={project.demoUrl} className="btn-secondary" target="_blank" rel="noreferrer">
                Demo
              </a>
            ) : null}
            <Link href="/architecture" className="btn-secondary">
              Architecture Gallery
            </Link>
            <Link href="/projects" className="btn-secondary">
              All Projects
            </Link>
          </div>
        </header>

        {project.architectureImage ? (
          <section className="card p-6">
            <p className="mb-3 text-sm font-semibold">Architecture Diagram</p>
            <div className="card overflow-hidden p-0">
              <div className="relative aspect-[16/8]">
                <Image
                  src={project.architectureImage}
                  alt={project.architectureImageCaption ?? `${project.title} architecture diagram`}
                  fill
                  className="object-contain bg-white p-4 dark:bg-ink-950"
                />
              </div>
            </div>
          </section>
        ) : null}

        {showMetrics ? (
          <section className="card p-6">
            <h2 className="text-lg font-semibold">Metrics</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {typeof project.metrics?.latencyMs === "number" ? (
                <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
                  <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Latency</p>
                  <p className="mt-2 text-xl font-semibold">{project.metrics.latencyMs} ms</p>
                </div>
              ) : null}
              {typeof project.metrics?.costPer1kTokensUsd === "number" ? (
                <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
                  <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Cost / 1k tokens</p>
                  <p className="mt-2 text-xl font-semibold">${project.metrics.costPer1kTokensUsd}</p>
                </div>
              ) : null}
              {project.metrics?.accuracyOrScore ? (
                <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
                  <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Accuracy / Score</p>
                  <p className="mt-2 text-xl font-semibold">{project.metrics.accuracyOrScore}</p>
                </div>
              ) : null}
            </div>
            {project.metrics?.evalNotes ? (
              <p className="mt-4 text-sm text-ink-600 dark:text-ink-300">{project.metrics.evalNotes}</p>
            ) : null}
          </section>
        ) : null}

        <article className="card p-6">
          <div className="prose prose-ink max-w-none dark:prose-invert">
            {project.bodyPortableText?.length ? (
              <PortableTextRenderer value={project.bodyPortableText} />
            ) : project.bodyMdx ? (
              <MdxRenderer source={project.bodyMdx} />
            ) : (
              <p>Detailed case study content will be added soon.</p>
            )}
          </div>
        </article>

        {project.nextImprovements ? (
          <section className="card p-6">
            <h2 className="text-lg font-semibold">What I'd Improve Next</h2>
            <p className="mt-3 text-sm text-ink-600 dark:text-ink-300 whitespace-pre-line">
              {project.nextImprovements}
            </p>
          </section>
        ) : null}
      </Container>
    </div>
  );
}


