import { ArchitectureGalleryClient } from "@/components/architecture-gallery-client";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";
import { getArchitectureGalleryItems } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Architecture Gallery",
  description: "Architecture diagrams from portfolio projects with quick links to related case studies."
});

export const revalidate = 60;

export default async function ArchitecturePage() {
  const items = await getArchitectureGalleryItems();

  return (
    <div className="pb-16 pt-10">
      <Container>
        <SectionHeading
          title="Architecture Gallery"
          subtitle="Visual system diagrams for portfolio projects. Click any diagram to expand."
        />
        <div className="mt-6">
          <ArchitectureGalleryClient items={items} />
        </div>
      </Container>
    </div>
  );
}
