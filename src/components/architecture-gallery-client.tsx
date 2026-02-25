"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { ArchitectureGalleryItem } from "@/types/content";

export function ArchitectureGalleryClient({ items }: { items: ArchitectureGalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((prev) => (prev === null ? 0 : (prev + 1) % items.length));
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev === null ? 0 : (prev - 1 + items.length) % items.length));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, items.length]);

  const active = activeIndex === null ? null : items[activeIndex];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <button
            key={item.src}
            type="button"
            className="card card-hover overflow-hidden text-left"
            onClick={() => setActiveIndex(index)}
          >
            <div className="relative aspect-[4/3]">
              <Image src={item.src} alt={item.caption} fill className="object-cover" />
            </div>
            <div className="p-4">
              <p className="text-sm font-medium">{item.caption}</p>
              {item.projectSlug ? (
                <Link
                  href={`/projects/${item.projectSlug}`}
                  className="mt-2 inline-flex text-xs font-medium text-accent-700 dark:text-accent-300"
                  onClick={(event) => event.stopPropagation()}
                >
                  Open case study →
                </Link>
              ) : null}
            </div>
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/75 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={active.caption}
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="card max-h-[90vh] w-full max-w-5xl overflow-hidden p-0"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-ink-950">
              <Image src={active.src} alt={active.caption} fill className="object-contain p-2" />
            </div>
            <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{active.caption}</p>
                {active.projectTitle ? (
                  <p className="text-sm text-ink-600 dark:text-ink-300">{active.projectTitle}</p>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                {active.projectSlug ? (
                  <Link href={`/projects/${active.projectSlug}`} className="btn-secondary">
                    Project
                  </Link>
                ) : null}
                <button type="button" className="btn-primary" onClick={() => setActiveIndex(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
