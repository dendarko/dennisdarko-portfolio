import Link from "next/link";
import { ContentCard } from "@/components/content-card";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";
import { getTeachingPosts } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Teaching",
  description: "Teaching hub for AI engineering workshops, talks, mentoring topics, and practical systems content.",
  image: "/og/teaching-og.svg"
});

export const revalidate = 60;

export default async function TeachingPage() {
  const posts = await getTeachingPosts();

  return (
    <div className="pb-16 pt-10">
      <Container>
        <SectionHeading
          title="Teaching Hub"
          subtitle="Workshops, notes, and practical teaching content on production AI systems, LLM evaluation, and MLOps."
        />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
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

          <aside className="space-y-4">
            <div className="card p-5">
              <h2 className="text-lg font-semibold">Topics I teach</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {siteConfig.teachingTopics.map((topic) => (
                  <span key={topic} className="chip">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            <div className="card p-5">
              <h2 className="text-lg font-semibold">Formats</h2>
              <ul className="mt-3 space-y-2 text-sm text-ink-600 dark:text-ink-300">
                <li>Workshops (60-180 min)</li>
                <li>Guest lectures / technical talks</li>
                <li>Mentoring cohorts / office hours</li>
                <li>Team onboarding for AI delivery practices</li>
              </ul>
              <Link href="/contact" className="mt-4 inline-flex text-sm font-medium text-accent-700 dark:text-accent-300">
                Request a workshop →
              </Link>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
