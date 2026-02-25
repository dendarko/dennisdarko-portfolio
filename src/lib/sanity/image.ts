import imageUrlBuilder from "@sanity/image-url";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";

let builder: ReturnType<typeof imageUrlBuilder> | null = null;

function getBuilder() {
  if (!isSanityConfigured()) {
    return null;
  }
  if (!builder) {
    builder = imageUrlBuilder(getSanityClient());
  }
  return builder;
}

export function urlForImage(source: unknown) {
  const b = getBuilder();
  if (!b) {
    throw new Error("Sanity is not configured; cannot build image URLs.");
  }
  return b.image(source as any);
}
