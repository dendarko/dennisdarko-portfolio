import { ProjectTimeline } from "@/components/project-timeline";
import { ProjectsExplorer } from "@/components/projects-explorer";
import { RecruiterFastPath } from "@/components/recruiter-fast-path";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";
import { getProjects } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Projects",
  description: "Filterable AI engineering portfolio projects across Python, ML, MLOps, LLMOps, evaluation, and analytics.",
  image: "/og/projects-og.svg"
});

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="pb-16 pt-10">
      <Container className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionHeading
            title="Projects"
            subtitle="A recruiter-friendly project archive showing the progression from Python foundations to production LLM systems."
          />
          <RecruiterFastPath />
        </div>
        <ProjectsExplorer projects={projects} />
        <section className="pt-4">
          <SectionHeading
            title="Project Timeline"
            subtitle="Chronological project progression from Python foundations to LLMOps systems."
          />
          <div className="mt-6">
            <ProjectTimeline projects={projects} />
          </div>
        </section>
      </Container>
    </div>
  );
}
