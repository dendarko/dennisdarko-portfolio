import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { JourneyTimeline } from "@/components/journey-timeline";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";
import { getFeaturedProjects, getSiteSettings, getTeachingPosts } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "AI Engineer + Educator Portfolio",
  description:
    "Production AI systems case studies, LLMOps playbooks, and teaching resources by Dennis Darko.",
  image: "/og/default-og.svg"
});

export const revalidate = 60;

export default async function HomePage() {
  const [featuredProjects, teachingPosts, site] = await Promise.all([
    getFeaturedProjects(5),
    getTeachingPosts(),
    getSiteSettings()
  ]);

  return (
    <div className="pb-16">
      <section className="pt-10 sm:pt-14">
        <Container>
          <div className="card overflow-hidden p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
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
                  Production AI Engineer building reliable LLM systems (RAG, evaluation, and observability) — from prototype to deployment.
                </p>
                <p className="mt-3 max-w-2xl text-sm text-ink-500 dark:text-ink-300 sm:text-base">
                  I ship production-grade AI services with guardrails, regression tests, monitoring/tracing, and cost/latency optimization. I also teach Python, ML, and AI engineering.
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
                    "FastAPI • Docker • CI/CD"
                  ].map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                <div className="rounded-2xl border border-accent-200 bg-gradient-to-br from-accent-50 to-white p-4 dark:border-accent-400/20 dark:from-accent-900/20 dark:to-white/5">
                  <p className="text-sm font-medium">2026 Focus</p>
                  <p className="mt-1 text-sm text-ink-600 dark:text-ink-300">
                    LLMOps, evaluation pipelines, AI observability, and high-trust internal AI products.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-ink-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                    <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Shipping style</p>
                    <p className="mt-2 text-sm font-medium">Tested + observable</p>
                  </div>
                  <div className="rounded-2xl border border-ink-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                    <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Teaching style</p>
                    <p className="mt-2 text-sm font-medium">Practical + systems-first</p>
                  </div>
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
                  Replace these placeholders with live GitHub/portfolio metrics when ready.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Pinned projects", "10+"],
                  ["Case studies", "5"],
                  ["Teaching sessions", "20+"]
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
            title="Teaching & Community"
            subtitle="Courses, workshops, mentoring, and engineering education content centered on practical AI systems."
          />
          <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="card p-5">
                <h3 className="text-base font-semibold">Workshops</h3>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
                  Production RAG, LLM evaluation, observability, and deployment readiness workshops.
                </p>
                <Link href="/teaching" className="mt-4 inline-flex text-sm font-medium text-accent-700 dark:text-accent-300">
                  View teaching hub →
                </Link>
              </div>
              <div className="card p-5">
                <h3 className="text-base font-semibold">Courses & Talks</h3>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
                  Placeholder links for upcoming courses, conference talks, and guest sessions.
                </p>
                <Link href="/contact" className="mt-4 inline-flex text-sm font-medium text-accent-700 dark:text-accent-300">
                  Invite me to teach →
                </Link>
              </div>
              <div className="card p-5 md:col-span-2">
                <h3 className="text-base font-semibold">Mentoring & Team Enablement</h3>
                <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
                  Coaching engineers and teams on AI system design, debugging, evaluation strategy, and production operations.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {siteConfig.teachingTopics.map((topic) => (
                    <span key={topic} className="chip">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {teachingPosts.slice(0, 3).map((post) => (
                <ContentCard
                  key={post.slug}
                  title={post.title}
                  description={post.description}
                  href={`/teaching/${post.slug}`}
                  date={post.date}
                  meta={`${post.level ?? "Teaching"} • ${post.topics.join(", ")}`}
                />
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
                <p className="text-xs uppercase tracking-[0.16em] text-white/70">Let’s build</p>
                <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                  Hiring for AI engineering, LLMOps, or technical education?
                </h2>
                <p className="mt-2 text-sm text-white/80">
                  I build systems that can be trusted in production and teach teams how to operate them well.
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
