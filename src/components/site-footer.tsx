import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site";
import type { SiteSettingsData } from "@/types/cms";

export function SiteFooter({ site }: { site: SiteSettingsData }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-200/70 py-10 dark:border-white/10">
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-sm font-semibold">{site.name}</p>
          <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{site.description}</p>
          <p className="mt-3 text-xs text-ink-500 dark:text-ink-300">
            © {year} {site.name}
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold">Navigate</p>
          <ul className="mt-2 space-y-2 text-sm text-ink-600 dark:text-ink-300">
            {siteConfig.nav.slice(0, 5).map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ink-900 dark:hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Recruiter</p>
          <ul className="mt-2 space-y-2 text-sm text-ink-600 dark:text-ink-300">
            {siteConfig.recruiterQuickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-ink-900 dark:hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold">Connect</p>
          <ul className="mt-2 space-y-2 text-sm text-ink-600 dark:text-ink-300">
            <li>
              <a href={site.links.github} className="hover:text-ink-900 dark:hover:text-white">
                GitHub
              </a>
            </li>
            <li>
              <a href={site.links.linkedin} className="hover:text-ink-900 dark:hover:text-white">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-ink-900 dark:hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
