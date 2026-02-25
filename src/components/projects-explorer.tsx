"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { getProjectCategories } from "@/lib/projects";
import type { ProjectRecord } from "@/types/content";

type SortMode = "relevant" | "recent" | "alpha";

export function ProjectsExplorer({ projects }: { projects: ProjectRecord[] }) {
  const categories = getProjectCategories();
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number] | "All">("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("relevant");

  const filtered = useMemo(() => {
    let next = [...projects];

    if (selectedCategory !== "All") {
      next = next.filter((project) => project.categories.includes(selectedCategory));
    }

    if (featuredOnly) {
      next = next.filter((project) => project.featured);
    }

    next.sort((a, b) => {
      if (sortMode === "recent") {
        return +new Date(b.date) - +new Date(a.date);
      }
      if (sortMode === "alpha") {
        return a.title.localeCompare(b.title);
      }
      return (
        b.relevanceScore - a.relevanceScore ||
        Number(b.featured) - Number(a.featured) ||
        +new Date(b.date) - +new Date(a.date)
      );
    });

    return next;
  }, [featuredOnly, projects, selectedCategory, sortMode]);

  return (
    <div className="space-y-6">
      <div className="card p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold">Filters</p>
            <p className="text-xs text-ink-500 dark:text-ink-300">
              Categories, featured-only toggle, and recruiter-friendly sorting.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 rounded-xl border border-ink-200 px-3 py-2 text-sm dark:border-white/10">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-ink-300"
                checked={featuredOnly}
                onChange={(event) => setFeaturedOnly(event.target.checked)}
              />
              Featured only
            </label>
            <label className="text-sm">
              <span className="sr-only">Sort</span>
              <select
                value={sortMode}
                onChange={(event) => setSortMode(event.target.value as SortMode)}
                className="rounded-xl border border-ink-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-white/5"
              >
                <option value="relevant">Most relevant</option>
                <option value="recent">Most recent</option>
                <option value="alpha">Alphabetical</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            className={`chip ${selectedCategory === "All" ? "!bg-ink-900 !text-white dark:!bg-white dark:!text-ink-900" : ""}`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`chip ${selectedCategory === category ? "!bg-ink-900 !text-white dark:!bg-white dark:!text-ink-900" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-ink-600 dark:text-ink-300">
        Showing <span className="font-semibold">{filtered.length}</span> project{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
