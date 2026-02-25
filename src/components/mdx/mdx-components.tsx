import type {
  AnchorHTMLAttributes,
  BlockquoteHTMLAttributes,
  HTMLAttributes
} from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const mdxComponents = {
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href ?? "";
    const isInternal = href.startsWith("/");
    if (isInternal) {
      return (
        <Link href={href} className="font-medium text-accent-700 hover:text-accent-800 dark:text-accent-300 dark:hover:text-accent-200">
          {props.children}
        </Link>
      );
    }

    return (
      <a
        {...props}
        target={props.target ?? "_blank"}
        rel={props.rel ?? "noreferrer"}
        className={cn(
          "font-medium text-accent-700 hover:text-accent-800 dark:text-accent-300 dark:hover:text-accent-200",
          props.className
        )}
      />
    );
  },
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre {...props} className={cn("overflow-x-auto rounded-xl border border-ink-200 bg-white p-4 text-sm dark:border-white/10 dark:bg-ink-950", props.className)} />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code {...props} className={cn("rounded bg-ink-100 px-1 py-0.5 text-[0.9em] dark:bg-white/10", props.className)} />
  ),
  blockquote: (props: BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote {...props} className={cn("border-l-4 border-accent-500 pl-4 italic text-ink-700 dark:text-ink-200", props.className)} />
  )
};
