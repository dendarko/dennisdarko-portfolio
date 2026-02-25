"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function SiteHeader({ brandName }: { brandName: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200/70 bg-ink-50/80 backdrop-blur dark:border-white/10 dark:bg-ink-900/80">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2 font-semibold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500 to-accent-700 text-sm text-white shadow">
            DD
          </span>
          <span className="hidden sm:inline">{brandName}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {siteConfig.nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-ink-900 text-white dark:bg-white dark:text-ink-900"
                    : "text-ink-600 hover:bg-ink-100 dark:text-ink-200 dark:hover:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/recruiter" className="ml-2 rounded-lg bg-accent-600 px-3 py-2 text-sm font-semibold text-white hover:bg-accent-700">
            Recruiter {"->"}
          </Link>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-ink-200 text-ink-700 lg:hidden dark:border-white/10 dark:text-white"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
        >
          <span className="text-lg">{open ? "x" : "="}</span>
        </button>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-ink-200/70 bg-ink-50/95 py-3 lg:hidden dark:border-white/10 dark:bg-ink-900/95">
          <Container className="space-y-2">
            <div className="pb-1">
              <ThemeToggle />
            </div>
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-100 dark:text-ink-100 dark:hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/recruiter"
              className="block rounded-lg bg-accent-600 px-3 py-2 text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Recruiter {"->"}
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
