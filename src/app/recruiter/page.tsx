import { access } from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getProjects, getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Recruiter Snapshot",
  description:
    "Senior AI Engineer one-page overview covering production RAG, LLM evaluation, fine-tuning, observability, deployment, and engineering execution."
});

export const revalidate = 60;

const heroHighlights = [
  "Production RAG: chunking, hybrid search, reranking, citation + grounding, latency tuning",
  "LLM evaluation: automated eval harnesses, regression gates, custom metrics, red-teaming",
  "Fine-tuning: Hugging Face Trainer (SFT/LoRA), dataset prep, experiment tracking, model packaging",
  "Observability: traces, logs, metrics, prompt/version tracking, drift + quality monitoring",
  "Cost/latency: caching, batching, token optimization, streaming, provider routing"
] as const;

const systemsItems = [
  "RAG services with retriever + reranker + safety filters",
  "Agentic workflows (tools, function calling) with guardrails",
  "Evaluation pipelines and CI quality gates for LLM changes",
  "Internal AI APIs (FastAPI) with auth, rate limits, and monitoring"
] as const;

const practicesItems = [
  "Prompt/version management and reproducible runs",
  "Offline/online metrics + dashboards",
  "Rollouts: canary, feature flags, quick rollback",
  "Data privacy: PII handling, access controls, secrets management"
] as const;

const signatureSlugOrder = [
  "enterprise-rag-llm-system",
  "llm-evaluation-framework",
  "llm-revenue-analyzer",
  "mlops-model-governance-pipeline"
] as const;

const signatureSummaries: Record<string, string> = {
  "enterprise-rag-llm-system":
    "Enterprise knowledge assistant moved from unreliable search/chat patterns to a grounded, observable RAG workflow with release controls.",
  "llm-evaluation-framework":
    "Prompt and model changes moved from manual review to repeatable eval scorecards and regression gates for safer releases.",
  "llm-revenue-analyzer":
    "Manual transcript analysis was converted into a repeatable AI workflow with cited outputs that teams can review and act on.",
  "mlops-model-governance-pipeline":
    "Model release approvals and monitoring were standardized into a governed pipeline with deployment checks and audit-ready controls."
};

const techStackGroups = [
  { label: "Languages", value: "Python, TypeScript, SQL" },
  { label: "LLM", value: "OpenAI/Claude, tool calling, prompt/versioning" },
  { label: "RAG", value: "embeddings, hybrid search, reranking" },
  { label: "Fine-tuning", value: "Hugging Face, Transformers, Trainer, PEFT/LoRA" },
  { label: "Infra", value: "Docker, CI/CD, Vercel, GitHub Actions" },
  { label: "Data", value: "Postgres, Redis, vector DB" },
  { label: "Observability", value: "tracing/metrics/logs, eval dashboards" }
] as const;

type SignatureProject = NonNullable<Awaited<ReturnType<typeof getProjects>>[number]>;

async function getResumeLink(siteResumeFileUrl?: string | null) {
  if (siteResumeFileUrl) {
    return siteResumeFileUrl;
  }

  try {
    await access(path.join(process.cwd(), "public", "resume.pdf"));
    return "/resume.pdf";
  } catch {
    return null;
  }
}

function isLocalPdf(url: string) {
  return url.startsWith("/") && url.toLowerCase().endsWith(".pdf");
}

export default async function RecruiterPage() {
  const [allProjects, site] = await Promise.all([getProjects(), getSiteSettings()]);
  const recruiter = site.recruiterProfile;
  const resolvedResumeUrl = await getResumeLink(site.resumeFileUrl);
  const resumeHref = resolvedResumeUrl ?? "/resume";

  const signatureProjects = signatureSlugOrder
    .map((slug) => allProjects.find((project) => project.slug === slug && project.caseStudy))
    .filter((project): project is SignatureProject => Boolean(project));

  const additionalContext = allProjects
    .filter((project) => project.recruiterNotes?.trim())
    .map((project) => ({ slug: project.slug, title: project.title, note: project.recruiterNotes!.trim() }));

  return (
    <div className="pb-16 pt-10">
      <Container className="space-y-6">
        <section className="card p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-700 dark:text-accent-300">
            Recruiter Snapshot
          </p>
          <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">
            Senior AI Engineer (LLMOps / RAG / Fine-tuning)
          </h1>
          <p className="mt-3 max-w-4xl text-sm text-ink-600 dark:text-ink-300 sm:text-base">
            I build and ship reliable LLM systems end-to-end: retrieval (RAG), evaluation/guardrails, fine-tuning,
            deployment, and observability.
          </p>

          <ul className="mt-5 space-y-2 text-sm text-ink-700 dark:text-ink-200">
            {heroHighlights.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-0.5 text-accent-600 dark:text-accent-300" aria-hidden="true">
                  -
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
              <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Location</p>
              <p className="mt-1 text-sm font-medium">{site.location}</p>
            </div>
            <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
              <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Work Authorization</p>
              <p className="mt-1 text-sm font-medium">{recruiter?.workAuthorization || "Available on request"}</p>
            </div>
            <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
              <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Availability</p>
              <p className="mt-1 text-sm font-medium">{recruiter?.availability || "Open to production AI roles"}</p>
            </div>
            <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
              <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Preferred Work Type</p>
              <p className="mt-1 text-sm font-medium">{recruiter?.preferredWorkType || "Remote/Hybrid"}</p>
            </div>
          </div>

          {(recruiter?.targetRoles?.length || recruiter?.primaryStrengths?.length) && (
            <div className="mt-4 grid gap-3 lg:grid-cols-2">
              {recruiter?.targetRoles?.length ? (
                <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
                  <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Target Roles</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {recruiter.targetRoles.map((role) => (
                      <span key={role} className="chip">
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
              {recruiter?.primaryStrengths?.length ? (
                <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
                  <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Primary Strengths</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {recruiter.primaryStrengths.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </section>

        <section className="card p-6 sm:p-8">
          <h2 className="text-xl font-semibold">What I ship in production</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Systems</p>
              <ul className="mt-3 space-y-2 text-sm text-ink-700 dark:text-ink-200">
                {systemsItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-0.5 text-accent-600 dark:text-accent-300" aria-hidden="true">
                      -
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">
                Engineering Practices
              </p>
              <ul className="mt-3 space-y-2 text-sm text-ink-700 dark:text-ink-200">
                {practicesItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-0.5 text-accent-600 dark:text-accent-300" aria-hidden="true">
                      -
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="card p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Signature Projects</h2>
              <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">
                Representative work across production RAG, evaluation, analytics AI workflows, and model governance.
              </p>
            </div>
            <Link href="/projects" className="text-sm font-medium text-accent-700 dark:text-accent-300">
              All case studies
            </Link>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {signatureProjects.map((project) => (
              <article key={project.slug} className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
                <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">{project.stage}</p>
                <h3 className="mt-2 text-base font-semibold">{project.title}</h3>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
                  {signatureSummaries[project.slug] ?? project.impact}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href={`/projects/${project.slug}`} className="btn-secondary">
                    View case study
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="card p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Tech Stack</h2>
          <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
            Production-focused stack used for LLM systems, APIs, evaluation pipelines, and deployment workflows.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {techStackGroups.map((group) => (
              <div key={group.label} className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">
                  {group.label}
                </p>
                <p className="mt-2 text-sm text-ink-700 dark:text-ink-200">{group.value}</p>
              </div>
            ))}
          </div>
        </section>

        {recruiter?.showAdditionalContext === true && additionalContext.length ? (
          <section className="card p-6">
            <h2 className="text-lg font-semibold">Additional Context</h2>
            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
              Role-relevant notes captured across project case studies.
            </p>
            <ul className="mt-4 space-y-3">
              {additionalContext.map((item) => (
                <li key={item.slug} className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">{item.note}</p>
                    </div>
                    <Link href={`/projects/${item.slug}`} className="text-sm font-medium text-accent-700 dark:text-accent-300">
                      View project
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="card p-6 sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-700 dark:text-accent-300">
                Contact
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Want to move fast on a production LLM system?</h2>
              <p className="mt-2 max-w-3xl text-sm text-ink-600 dark:text-ink-300">
                Open to senior AI engineering roles and teams building production-grade LLM platforms, RAG systems, and
                evaluation-first AI products.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={resumeHref}
                className="btn-primary"
                target="_blank"
                rel="noreferrer"
                download={isLocalPdf(resumeHref) ? true : undefined}
              >
                Download Resume (PDF)
              </a>
              <a href={site.links.github} target="_blank" rel="noreferrer" className="btn-secondary">
                GitHub
              </a>
              <Link href="/contact" className="btn-secondary">
                Contact
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

