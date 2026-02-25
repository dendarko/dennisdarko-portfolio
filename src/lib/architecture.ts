import fs from "node:fs/promises";
import path from "node:path";
import type { ArchitectureGalleryItem } from "@/types/content";
import { getAllProjects } from "@/lib/projects";
import { slugToTitle } from "@/lib/utils";

const imagePattern = /\.(png|jpe?g|webp|svg)$/i;

export async function getArchitectureGalleryItems(): Promise<ArchitectureGalleryItem[]> {
  const dir = path.join(process.cwd(), "public", "architecture");
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const projects = getAllProjects();

  return entries
    .filter((entry) => entry.isFile() && imagePattern.test(entry.name))
    .map((entry) => {
      const src = `/architecture/${entry.name}`;
      const project = projects.find((item) => item.architectureImage === src);
      const fileSlug = entry.name.replace(/\.(png|jpe?g|webp|svg)$/i, "");

      return {
        src,
        caption: project ? `${project.title} architecture diagram` : `${slugToTitle(fileSlug)} architecture`,
        projectSlug: project?.slug,
        projectTitle: project?.title
      };
    })
    .sort((a, b) => a.caption.localeCompare(b.caption));
}
