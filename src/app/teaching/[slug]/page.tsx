import { notFound } from "next/navigation";
import { MdxRenderer } from "@/components/mdx/mdx-renderer";
import { PortableTextRenderer } from "@/components/portable-text-renderer";
import { Container } from "@/components/ui/container";
import { getTeachingPostDetailBySlug, getTeachingSlugs } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getTeachingSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getTeachingPostDetailBySlug(slug);
  if (!post) {
    return buildMetadata({ title: "Teaching" });
  }
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/teaching/${slug}`
  });
}

export default async function TeachingPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getTeachingPostDetailBySlug(slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="pb-16 pt-10">
      <Container className="max-w-4xl">
        <header className="card p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-700 dark:text-accent-300">
            Teaching • {post.level ?? "Teaching"}
          </p>
          <h1 className="mt-2 text-3xl font-semibold">{post.title}</h1>
          <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">{post.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="chip">{formatDate(post.date)}</span>
            {post.topics.map((topic) => (
              <span key={topic} className="chip">
                {topic}
              </span>
            ))}
          </div>
        </header>
        <article className="card mt-6 p-6">
          <div className="prose prose-ink max-w-none dark:prose-invert">
            {post.bodyPortableText?.length ? (
              <PortableTextRenderer value={post.bodyPortableText} />
            ) : post.bodyMdx ? (
              <MdxRenderer source={post.bodyMdx} />
            ) : (
              <p>Teaching content will appear here after publishing in Sanity.</p>
            )}
          </div>
        </article>
      </Container>
    </div>
  );
}
