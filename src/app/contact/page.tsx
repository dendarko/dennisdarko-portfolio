import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";
import { getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Contact Dennis Darko for AI engineering roles, consulting, workshops, and speaking."
});

export const revalidate = 60;

export default async function ContactPage() {
  const site = await getSiteSettings();
  return (
    <div className="pb-16 pt-10">
      <Container className="max-w-4xl">
        <SectionHeading
          title="Contact"
          subtitle="Hiring, consulting, workshops, or speaking. Use the details below and replace placeholders as needed."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="card p-6">
            <h2 className="text-lg font-semibold">Email</h2>
            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
              Best for role discussions, workshops, and collaboration requests.
            </p>
            <a href={`mailto:${site.email}`} className="mt-4 inline-flex text-sm font-medium text-accent-700 dark:text-accent-300">
              {site.email}
            </a>
          </div>
          <div className="card p-6">
            <h2 className="text-lg font-semibold">Profiles</h2>
            <div className="mt-3 space-y-2 text-sm">
              <a href={site.links.github} className="block text-accent-700 dark:text-accent-300">
                GitHub
              </a>
              <a href={site.links.linkedin} className="block text-accent-700 dark:text-accent-300">
                LinkedIn
              </a>
              <a href={siteConfig.social.x} className="block text-accent-700 dark:text-accent-300">
                X / Twitter
              </a>
            </div>
          </div>
          <div className="card p-6 md:col-span-2">
            <h2 className="text-lg font-semibold">What to include (recommended)</h2>
            <ul className="mt-3 grid gap-2 text-sm text-ink-600 dark:text-ink-300 sm:grid-cols-2">
              <li>Role or project scope</li>
              <li>Team size and current stack</li>
              <li>AI/ML priorities (RAG, evaluation, platform, etc.)</li>
              <li>Timeline and decision process</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/resume" className="btn-secondary">
                Resume
              </Link>
              <Link href="/projects" className="btn-primary">
                Case Studies
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
