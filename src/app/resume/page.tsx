import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { Container } from "@/components/ui/container";
import { getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resume",
  description: "Resume page with downloadable PDF for Dennis Darko."
});

export const revalidate = 60;

export default async function ResumePage() {
  const site = await getSiteSettings();
  const resumeUrl = site.resumeFileUrl || "/resume.pdf";

  return (
    <div className="pb-16 pt-10">
      <Container className="max-w-4xl">
        <SectionHeading
          title="Resume"
          subtitle="Download the PDF resume and replace the placeholder file in `public/resume.pdf` with the final version."
        />
        <div className="mt-6 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
          <div className="card p-6">
            <h2 className="text-lg font-semibold">Download</h2>
            <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">
              The portfolio links to a static resume file suitable for any static hosting provider.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={resumeUrl} className="btn-primary" download>
                Download Resume PDF
              </a>
              <Link href="/contact" className="btn-secondary">
                Contact
              </Link>
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-lg font-semibold">Replace Placeholder</h2>
            <ol className="mt-3 space-y-2 text-sm text-ink-600 dark:text-ink-300">
              <li>1. Export your final resume as PDF.</li>
              <li>2. Upload it in Sanity `siteSettings.resumeFile` (or place a fallback at `public/resume.pdf`).</li>
              <li>3. Publish in Sanity (or rebuild/redeploy if using the fallback file).</li>
            </ol>
          </div>
        </div>
      </Container>
    </div>
  );
}
