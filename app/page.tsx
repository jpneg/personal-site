import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";

const projects = [
  {
    name: "Personal website",
    description:
      "This site. Built with Next.js, Tailwind, and MDX — using Claude Code as a way to get back into coding.",
    url: "https://github.com/jpneg",
    tags: ["Next.js", "TypeScript", "MDX"],
  },
];

const contact = [
  { label: "GitHub", url: "https://github.com/jpneg" },
  { label: "LinkedIn", url: "https://linkedin.com/in/jpnegrete" },
];

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <div className="py-12 space-y-20">
      {/* Hero */}
      <section>
        <h1 className="text-3xl font-semibold tracking-tight mb-4">Juan Pablo</h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed max-w-xl">
          Computer Engineer. Mostly interested in cybersecurity and AI stuff. Currently working
          as a Cybersecurity Manager. As a side project I&apos;m regaining some coding skills
          using Claude Code!
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-6">
          {contact.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects">
        <h2 className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-8">
          Projects
        </h2>
        <div className="space-y-8">
          {projects.map((project) => (
            <div key={project.name}>
              <div className="flex items-baseline gap-3 mb-1">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline underline-offset-4"
                >
                  {project.name}
                </a>
                <div className="flex gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{project.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section>
          <h2 className="text-xs font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-8">
            Recent posts
          </h2>
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <div key={post.slug}>
                <div className="flex items-baseline justify-between gap-4">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="font-medium hover:underline underline-offset-4"
                  >
                    {post.title}
                  </Link>
                  <time className="text-xs text-zinc-400 dark:text-zinc-500 font-mono shrink-0">
                    {formatDate(post.date)}
                  </time>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">{post.description}</p>
              </div>
            ))}
          </div>
          <Link
            href="/blog"
            className="inline-block mt-8 text-sm text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            All posts →
          </Link>
        </section>
      )}
    </div>
  );
}
