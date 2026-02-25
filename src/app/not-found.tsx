import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFoundPage() {
  return (
    <div className="py-20">
      <Container className="max-w-3xl">
        <div className="card p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500 dark:text-ink-300">404</p>
          <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
          <p className="mt-3 text-sm text-ink-600 dark:text-ink-300">
            The page may have moved, or the content file hasn’t been added yet.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link href="/" className="btn-primary">
              Home
            </Link>
            <Link href="/projects" className="btn-secondary">
              Projects
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
