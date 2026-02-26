import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

function normalizeSlug(value: unknown) {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (typeof value === "object" && value && "current" in value) {
    const current = (value as { current?: unknown }).current;
    return typeof current === "string" ? current : undefined;
  }
  return undefined;
}

function pathsForPayload(payload: Record<string, unknown>) {
  const type = typeof payload._type === "string" ? payload._type : undefined;
  const slug = normalizeSlug(payload.slug);
  const paths = new Set<string>(["/", "/projects", "/playbooks", "/architecture", "/resume"]);

  if (type === "siteSettings") {
    paths.add("/");
    paths.add("/about");
    paths.add("/contact");
    paths.add("/recruiter");
    paths.add("/resume");
  }

  if (type === "project") {
    paths.add("/projects");
    paths.add("/architecture");
    if (slug) {
      paths.add(`/projects/${slug}`);
    }
  }

  if (type === "playbook") {
    paths.add("/playbooks");
    if (slug) {
      paths.add(`/playbooks/${slug}`);
    }
  }

  return [...paths];
}

async function handleRevalidate(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, message: "Invalid secret" }, { status: 401 });
  }

  let payload: Record<string, unknown> = {};
  if (request.method === "POST") {
    try {
      payload = (await request.json()) as Record<string, unknown>;
    } catch {
      payload = {};
    }
  } else {
    const type = request.nextUrl.searchParams.get("type") ?? undefined;
    const slug = request.nextUrl.searchParams.get("slug") ?? undefined;
    payload = { _type: type, slug };
  }

  const paths = pathsForPayload(payload);
  for (const path of paths) {
    revalidatePath(path);
  }

  return NextResponse.json({ ok: true, revalidated: paths, payload });
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}
