import { notFound } from "next/navigation";
import { MdxRenderer } from "@/components/mdx/mdx-renderer";
import { PortableTextRenderer } from "@/components/portable-text-renderer";
import { Container } from "@/components/ui/container";
import { getPlaybookDetailBySlug, getPlaybookSlugs } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getPlaybookSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const playbook = await getPlaybookDetailBySlug(slug);
  if (!playbook) {
    return buildMetadata({ title: "Playbook" });
  }
  return buildMetadata({
    title: playbook.title,
    description: playbook.description,
    path: `/playbooks/${slug}`
  });
}

export default async function PlaybookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const playbook = await getPlaybookDetailBySlug(slug);

  if (!playbook) {
    notFound();
  }

  return (
    <div className="pb-16 pt-10">
      <Container className="max-w-4xl">
        <header className="card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-700 dark:text-accent-300">
            Playbook
          </p>
          <h1 className="mt-2 text-3xl font-semibold">{playbook.title}</h1>
          <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">{playbook.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip">{formatDate(playbook.date)}</span>
            {playbook.audience ? <span className="chip">{playbook.audience}</span> : null}
            {playbook.checklistLength ? <span className="chip">{playbook.checklistLength} checks</span> : null}
          </div>
        </header>
        <article className="card mt-6 p-6">
          <div className="prose prose-ink max-w-none dark:prose-invert">
            {playbook.bodyPortableText?.length ? (
              <PortableTextRenderer value={playbook.bodyPortableText} />
            ) : playbook.bodyMdx ? (
              <MdxRenderer source={playbook.bodyMdx} />
            ) : (
              <p>Playbook content will appear here after publishing in Sanity.</p>
            )}
          </div>
        </article>
      </Container>
    </div>
  );
}
