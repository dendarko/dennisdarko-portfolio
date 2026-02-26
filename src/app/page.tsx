import Link from "next/link";
import Image from "next/image";
import { JourneyTimeline } from "@/components/journey-timeline";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";
import { getFeaturedProjects, getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "AI Engineer Portfolio",
  description:
    "Production AI systems case studies, LLMOps playbooks, and architecture artifacts by Dennis Darko.",
  image: "/og/default-og.svg"
});

export const revalidate = 60;

export default async function HomePage() {
  const [featuredProjects, site] = await Promise.all([getFeaturedProjects(5), getSiteSettings()]);

  return (
    <div className="pb-16">
      <section className="pt-10 sm:pt-14">
        <Container>
          <div className="card overflow-hidden p-6 sm:p-8">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-700 dark:text-accent-300">
                  {site.name}
                </p>
                <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
                  {site.headline}
                </h1>
                <p className="mt-2 text-sm font-medium text-ink-500 dark:text-ink-300">
                  Based in {site.location}
                </p>
                <p className="mt-4 max-w-2xl text-base text-ink-600 dark:text-ink-300 sm:text-lg">
                  Production AI Engineer building reliable LLM systems (RAG, evaluation, and observability) - from prototype to deployment.
                </p>
                <p className="mt-3 max-w-2xl text-sm text-ink-500 dark:text-ink-300 sm:text-base">
                  I ship production-grade AI services with guardrails, regression tests, monitoring/tracing, and cost/latency optimization.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href="/projects" className="btn-primary">
                    View Case Studies
                  </Link>
                  <a href={site.resumeFileUrl || "/resume"} className="btn-secondary" download>
                    Download Resume
                  </a>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    "12+ production projects",
                    "LLMOps + MLOps",
                    "RAG + Evaluation",
                    "FastAPI - Docker - CI/CD"
                  ].map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex justify-center md:justify-end">
                <div className="relative h-80 w-80 md:h-96 md:w-96">
                  <Image
                    src="/images/dennis-darko.jpg"
                    alt="Dennis Darko"
                    fill
                    className="object-cover rounded-xl shadow-xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-16">
        <Container>
          <SectionHeading
            title="Featured Case Studies"
            subtitle="Selected AI and platform projects with an emphasis on production architecture, evaluation, and reliability."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} compact />
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-16">
        <Container>
          <SectionHeading
            title="How I Build Production AI Systems"
            subtitle="Six pillars I use to move from prototype to dependable product."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {siteConfig.homePillars.map((pillar) => (
              <article key={pillar.title} className="card card-hover p-5">
                <h3 className="text-base font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{pillar.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pt-16">
        <Container>
          <div className="card p-6">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Proof Metrics</p>
                <h2 className="mt-2 text-2xl font-semibold">Engineering signals recruiters can scan fast</h2>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
                  Snapshot of production-focused portfolio signals across projects, case studies, and engineering depth.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Pinned projects", "10+"],
                  ["Case studies", "5"],
                  ["Production systems", "12+"]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-ink-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                    <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">{label}</p>
                    <p className="mt-2 text-2xl font-semibold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {siteConfig.capabilityChips.map((chip) => (
                <span key={chip} className="chip">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pt-16">
        <Container>
          <SectionHeading
            title="Journey Timeline"
            subtitle="A progression from Python fundamentals to production LLM systems and AI platform engineering."
          />
          <div className="mt-6">
            <JourneyTimeline />
          </div>
        </Container>
      </section>

      <section className="pt-16">
        <Container>
          <div className="card overflow-hidden bg-gradient-to-r from-ink-900 to-accent-900 p-6 text-white dark:from-accent-900 dark:to-ink-950">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-white/70">Let's build</p>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                  Hiring for AI engineering, LLMOps, or ML platform work?
                </h2>
                <p className="mt-2 text-sm text-white/80">
                  I build systems that can be trusted in production with strong evaluation, observability, and operational discipline.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn bg-white text-ink-900 hover:bg-ink-100">
                  Contact Dennis
                </Link>
                <Link href="/recruiter" className="btn border border-white/30 bg-white/10 text-white hover:bg-white/15">
                  Recruiter Snapshot
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}


