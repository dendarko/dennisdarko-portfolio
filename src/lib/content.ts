import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type {
  MdxFrontmatter,
  MdxDocument,
  PlaybookFrontmatter,
  ProjectCaseStudyFrontmatter,
  TeachingPostFrontmatter
} from "@/types/content";

const contentRoot = path.join(process.cwd(), "content");

async function readCollectionFiles(dir: string) {
  const fullDir = path.join(contentRoot, dir);
  const entries = await fs.readdir(fullDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && /\.mdx?$/.test(entry.name))
    .map((entry) => path.join(fullDir, entry.name));
}

async function parseMdxFile<TFrontmatter extends MdxFrontmatter>(filePath: string) {
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = matter(raw);
  const slug = path.basename(filePath).replace(/\.mdx?$/, "");

  return {
    slug,
    frontmatter: { ...(parsed.data as TFrontmatter), slug } as TFrontmatter,
    content: parsed.content.trim()
  };
}

async function getCollection<TFrontmatter extends MdxFrontmatter>(
  dir: string
): Promise<Array<MdxDocument<TFrontmatter>>> {
  const files = await readCollectionFiles(dir);
  const docs = await Promise.all(files.map((file) => parseMdxFile<TFrontmatter>(file)));
  return docs.sort(
    (a, b) => +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
  ) as Array<MdxDocument<TFrontmatter>>;
}

async function getDocBySlug<TFrontmatter extends MdxFrontmatter>(dir: string, slug: string) {
  const file = path.join(contentRoot, dir, `${slug}.mdx`);
  return parseMdxFile<TFrontmatter>(file);
}

export function getProjectCaseStudies() {
  return getCollection<ProjectCaseStudyFrontmatter>("projects");
}

export function getProjectCaseStudyBySlug(slug: string) {
  return getDocBySlug<ProjectCaseStudyFrontmatter>("projects", slug);
}

export function getTeachingPosts() {
  return getCollection<TeachingPostFrontmatter>("teaching");
}

export function getTeachingPostBySlug(slug: string) {
  return getDocBySlug<TeachingPostFrontmatter>("teaching", slug);
}

export function getPlaybooks() {
  return getCollection<PlaybookFrontmatter>("playbooks");
}

export function getPlaybookBySlug(slug: string) {
  return getDocBySlug<PlaybookFrontmatter>("playbooks", slug);
}
