import { ContentCard } from "@/components/content-card";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";
import { getPlaybooks } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Playbooks",
  description: "Short practical playbooks for deploying, evaluating, and securing production LLM systems.",
  image: "/og/playbooks-og.svg"
});

export const revalidate = 60;

export default async function PlaybooksPage() {
  const playbooks = await getPlaybooks();

  return (
    <div className="pb-16 pt-10">
      <Container>
        <SectionHeading
          title="Playbooks"
          subtitle="Short practical docs and checklists for production AI system engineering."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {playbooks.map((playbook) => (
            <ContentCard
              key={playbook.slug}
              title={playbook.title}
              description={playbook.description}
              href={`/playbooks/${playbook.slug}`}
              date={playbook.date}
              meta={`${playbook.audience ?? "Practical guide"}${playbook.checklistLength ? ` • ${playbook.checklistLength} checks` : ""}`}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
