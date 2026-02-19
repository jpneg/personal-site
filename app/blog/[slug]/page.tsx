import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/blog";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  try {
    const post = getPostBySlug(params.slug);
    return { title: post.title, description: post.description };
  } catch {
    return {};
  }
}

export default function PostPage({ params }: Props) {
  let post;
  try {
    post = getPostBySlug(params.slug);
  } catch {
    notFound();
  }

  return (
    <div className="py-12">
      <Link
        href="/blog"
        className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-10 block"
      >
        ← Blog
      </Link>

      <header className="mb-10">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">{post.title}</h1>
        <time className="text-sm text-zinc-400 dark:text-zinc-500 font-mono">{formatDate(post.date, "long")}</time>
      </header>

      <article className="prose prose-zinc dark:prose-invert max-w-none prose-a:underline-offset-4 prose-code:before:content-none prose-code:after:content-none">
        <MDXRemote source={post.content} />
      </article>
    </div>
  );
}
