import Link from "next/link";
import { RecruiterFastPath } from "@/components/recruiter-fast-path";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";
import { getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: "About Dennis Darko: AI engineer focused on production-ready ML and LLM systems."
});

export const revalidate = 60;

export default async function AboutPage() {
  const site = await getSiteSettings();
  return (
    <div className="pb-16 pt-10">
      <Container className="space-y-8">
        <SectionHeading
          title="About Dennis Darko"
          subtitle="AI Engineer focused on production systems, quality assurance, and shipping reliable AI products."
        />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="card p-6">
            <div className="prose prose-ink max-w-none text-sm dark:prose-invert">
              <p>
                {site.name} is an {site.headline} based in {site.location}. I focus on the engineering side of applied AI: building systems that are measurable, observable, and safe enough to run in real workflows.
              </p>
              <p>
                I care about evaluation discipline because most AI systems fail in the gap between a demo and a maintained product. That gap is where testing, guardrails, telemetry, and deployment design matter.
              </p>
              <p>
                Reach me at{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>{" "}
                or connect on{" "}
                <a href={site.links.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                .
              </p>
            </div>
          </div>
          <RecruiterFastPath />
        </div>

        <section id="recruiter" className="card p-6">
          <h2 className="text-2xl font-semibold">Recruiter Snapshot</h2>
          <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
            Reviewing for a role fit? Start with the project archive, then scan case studies for architecture and evaluation depth.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/projects" className="btn-primary">
              Open Projects
            </Link>
            <Link href="/resume" className="btn-secondary">
              Resume PDF
            </Link>
            <Link href="/contact" className="btn-secondary">
              Contact
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
