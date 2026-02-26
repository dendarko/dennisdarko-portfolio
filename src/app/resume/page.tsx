import { access } from "node:fs/promises";
import path from "node:path";
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

async function getResumeLink(siteResumeFileUrl?: string | null) {
  if (siteResumeFileUrl) {
    return siteResumeFileUrl;
  }

  const localResumePath = path.join(process.cwd(), "public", "resume.pdf");

  try {
    await access(localResumePath);
    return "/resume.pdf";
  } catch {
    return null;
  }
}

export default async function ResumePage() {
  const site = await getSiteSettings();
  const resumeUrl = await getResumeLink(site.resumeFileUrl);
  const isLocalFile = resumeUrl?.startsWith("/");

  return (
    <div className="pb-16 pt-10">
      <Container className="max-w-4xl">
        <SectionHeading
          title="Resume"
          subtitle="Download my latest resume (PDF)."
        />
        <div className="mt-6 card p-6">
          {resumeUrl ? (
            <>
              <p className="text-sm text-ink-600 dark:text-ink-300">
                Download the current PDF version of my resume, or get in touch for role-specific details.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={resumeUrl}
                  className="btn-primary"
                  target="_blank"
                  rel="noreferrer"
                  download={isLocalFile ? true : undefined}
                >
                  Download Resume (PDF)
                </a>
                <Link href="/contact" className="btn-secondary">
                  Contact
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-ink-600 dark:text-ink-300">
                Resume is being updated. Please check back soon or contact me.
              </p>
              <div className="mt-4">
                <Link href="/contact" className="btn-secondary">
                  Contact
                </Link>
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
