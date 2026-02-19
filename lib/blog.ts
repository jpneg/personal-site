import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
}

export interface PostWithContent extends Post {
  content: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  const files = fs.readdirSync(BLOG_DIR);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: data.description as string,
        tags: data.tags as string[] | undefined,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): PostWithContent {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) throw new Error(`Post not found: ${slug}`);

  const { data, content } = matter(fs.readFileSync(filePath, "utf-8"));
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    tags: data.tags as string[] | undefined,
    content,
  };
}

export function formatDate(date: string, style: "short" | "long" = "short"): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("es-ES", {
    timeZone: "UTC",
    year: "numeric",
    month: style === "long" ? "long" : "short",
    day: "numeric",
  });
}
