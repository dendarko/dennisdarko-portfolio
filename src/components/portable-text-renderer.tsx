import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "../lib/sanity/image";

const components: PortableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const isInternal = href.startsWith("/");

      if (isInternal) {
        return (
          <Link href={href} className="font-medium text-accent-700 hover:text-accent-800 dark:text-accent-300 dark:hover:text-accent-200">
            {children}
          </Link>
        );
      }

      return (
        <a href={href} target="_blank" rel="noreferrer" className="font-medium text-accent-700 hover:text-accent-800 dark:text-accent-300 dark:hover:text-accent-200">
          {children}
        </a>
      );
    }
  },
  types: {
    image: ({ value }) => {
      const src = urlForImage(value).width(1400).fit("max").auto("format").url();
      const alt = typeof value?.alt === "string" ? value.alt : "";
      const caption = typeof value?.caption === "string" ? value.caption : "";

      return (
        <figure className="my-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-ink-200 bg-white dark:border-white/10 dark:bg-white/5">
            <Image src={src} alt={alt} fill className="object-contain p-2" />
          </div>
          {caption ? <figcaption className="mt-2 text-sm text-ink-500 dark:text-ink-300">{caption}</figcaption> : null}
        </figure>
      );
    }
  }
};

export function PortableTextRenderer({ value }: { value: unknown[] }) {
  return <PortableText value={value as any} components={components} />;
}
