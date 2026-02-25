import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-02-25";
const token = process.env.SANITY_API_READ_TOKEN;

export const sanityConfig = {
  projectId,
  dataset,
  apiVersion
};

export function isSanityConfigured() {
  return Boolean(projectId && dataset && apiVersion);
}

export function getSanityClient() {
  if (!isSanityConfigured()) {
    throw new Error("Sanity environment variables are not configured.");
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    token
  });
}

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>) {
  const client = getSanityClient();
  if (params) {
    return client.fetch<T>(query, params as any);
  }
  return client.fetch<T>(query);
}
