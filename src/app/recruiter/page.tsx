import Link from "next/link";
import { RecruiterFastPath } from "@/components/recruiter-fast-path";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";
import { getFeaturedProjects, getProjects, getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Recruiter Snapshot",
  description: "Fast recruiter-focused overview of Dennis Darko's AI engineering and education portfolio."
});

export const revalidate = 60;

export default async function RecruiterPage() {
  const [featured, allProjects, site] = await Promise.all([
    getFeaturedProjects(3),
    getProjects(),
    getSiteSettings()
  ]);

  const recruiter = site.recruiterProfile;
  const additionalContext = allProjects
    .filter((project) => project.recruiterNotes?.trim())
    .map((project) => ({ slug: project.slug, title: project.title, note: project.recruiterNotes!.trim() }));
  const resumeHref = site.resumeFileUrl || "/resume";

  return (
    <div className="pb-16 pt-10">
      <Container className="space-y-6">
        <SectionHeading
          title="Recruiter Snapshot"
          subtitle="Quick role fit, strengths, and direct links to case studies, resume, and contact."
        />

        <section className="card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-700 dark:text-accent-300">
            {site.name}
          </p>
          <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">{site.headline}</h1>

          {recruiter?.recruiterSummary ? (
            <p className="mt-3 whitespace-pre-line text-sm text-ink-600 dark:text-ink-300">
              {recruiter.recruiterSummary}
            </p>
          ) : (
            <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">
              {site.name} is a {site.headline} focused on production AI delivery, LLMOps reliability, and ML platform engineering.
            </p>
          )}

          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <div className="space-y-4">
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
                  <ul className="mt-2 space-y-1 text-sm text-ink-700 dark:text-ink-200">
                    {recruiter.primaryStrengths.map((strength) => (
                      <li key={strength}>• {strength}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {recruiter?.industriesOfInterest?.length ? (
                <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
                  <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Industries of Interest</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {recruiter.industriesOfInterest.map((industry) => (
                      <span key={industry} className="chip">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
                <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Location</p>
                <p className="mt-1 text-sm font-medium">{site.location}</p>
              </div>
              <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
                <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Work Authorization</p>
                <p className="mt-1 text-sm font-medium">{recruiter?.workAuthorization || "Not specified"}</p>
              </div>
              <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
                <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Availability</p>
                <p className="mt-1 text-sm font-medium">{recruiter?.availability || "Not specified"}</p>
              </div>
              <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
                <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Preferred Work Type</p>
                <p className="mt-1 text-sm font-medium">{recruiter?.preferredWorkType || "Not specified"}</p>
              </div>
              {typeof recruiter?.yearsExperience === "number" ? (
                <div className="rounded-xl border border-ink-200 p-4 dark:border-white/10">
                  <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Years Experience</p>
                  <p className="mt-1 text-sm font-medium">{recruiter.yearsExperience}+</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-ink-200 p-3 dark:border-white/10">
              <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Email</p>
              <a href={`mailto:${site.email}`} className="mt-1 block text-sm font-medium text-accent-700 dark:text-accent-300">
                {site.email}
              </a>
            </div>
            <div className="rounded-xl border border-ink-200 p-3 dark:border-white/10">
              <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">LinkedIn</p>
              <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="mt-1 block text-sm font-medium text-accent-700 dark:text-accent-300">
                {site.links.linkedin}
              </a>
            </div>
            <div className="rounded-xl border border-ink-200 p-3 dark:border-white/10">
              <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">GitHub</p>
              <a href={site.links.github} target="_blank" rel="noreferrer" className="mt-1 block text-sm font-medium text-accent-700 dark:text-accent-300">
                {site.links.github}
              </a>
            </div>
            <div className="rounded-xl border border-ink-200 p-3 dark:border-white/10">
              <p className="text-xs uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">Resume</p>
              <a href={resumeHref} target="_blank" rel="noreferrer" className="mt-1 block text-sm font-medium text-accent-700 dark:text-accent-300">
                Download PDF
              </a>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/projects" className="btn-primary">
              View Case Studies
            </Link>
            <a href={resumeHref} className="btn-secondary" download>
              Resume PDF
            </a>
            <a href={`mailto:${site.email}`} className="btn-secondary">
              Email Dennis
            </a>
            <a href={site.links.linkedin} target="_blank" rel="noreferrer" className="btn-secondary">
              LinkedIn
            </a>
          </div>
        </section>

        {recruiter?.showAdditionalContext === true && additionalContext.length ? (
          <section className="card p-6">
            <h2 className="text-lg font-semibold">Additional Context</h2>
            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
              Recruiter-only notes pulled from project records.
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
                      View project →
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <RecruiterFastPath />

        <section className="card p-6">
          <h2 className="text-lg font-semibold">Recommended first reads</h2>
          <ul className="mt-3 space-y-3 text-sm">
            {featured.map((project) => (
              <li key={project.slug} className="rounded-xl border border-ink-200 p-3 dark:border-white/10">
                <p className="font-medium">{project.title}</p>
                <p className="mt-1 text-ink-600 dark:text-ink-300">{project.impact}</p>
                <Link href={`/projects/${project.slug}`} className="mt-2 inline-flex font-medium text-accent-700 dark:text-accent-300">
                  Read case study →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
