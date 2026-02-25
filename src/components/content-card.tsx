import Link from "next/link";
import { formatDate } from "@/lib/utils";

export function ContentCard({
  title,
  description,
  href,
  date,
  meta
}: {
  title: string;
  description: string;
  href: string;
  date: string;
  meta?: string;
}) {
  return (
    <article className="card card-hover p-5">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-500 dark:text-ink-300">
        {formatDate(date)}
      </p>
      <h3 className="mt-2 text-lg font-semibold">
        <Link href={href} className="hover:text-accent-700 dark:hover:text-accent-300">
          {title}
        </Link>
      </h3>
      <p className="mt-2 text-sm text-ink-600 dark:text-ink-300">{description}</p>
      {meta ? <p className="mt-3 text-xs text-ink-500 dark:text-ink-300">{meta}</p> : null}
      <Link href={href} className="mt-4 inline-flex text-sm font-medium text-accent-700 dark:text-accent-300">
        Read more →
      </Link>
    </article>
  );
}
