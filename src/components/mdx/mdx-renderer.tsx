import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx/mdx-components";

export function MdxRenderer({ source }: { source: string }) {
  return <MDXRemote source={source} components={mdxComponents} />;
}
