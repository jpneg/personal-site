import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on code, security, and AI.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="py-12">
      <h1 className="text-3xl font-semibold tracking-tight mb-12">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-zinc-400 text-sm">No posts yet.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.slug}>
              <div className="flex items-baseline justify-between gap-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-medium hover:underline underline-offset-4"
                >
                  {post.title}
                </Link>
                <time className="text-xs text-zinc-400 font-mono shrink-0">
                  {formatDate(post.date)}
                </time>
              </div>
              <p className="text-sm text-zinc-500 mt-1">{post.description}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
