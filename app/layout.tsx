import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Juan Pablo",
    template: "%s · Juan Pablo",
  },
  description: "Computer Engineer. Cybersecurity Manager. Notes on security, AI, and code.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}
      >
        <ThemeProvider>
          <div className="max-w-2xl mx-auto px-6 min-h-screen flex flex-col">
            <header className="flex items-center justify-between py-8">
              <Link
                href="/"
                className="font-mono text-sm font-medium hover:opacity-60 transition-opacity"
              >
                Juan Pablo
              </Link>
              <nav className="flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
                <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Blog
                </Link>
                <Link href="/#projects" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                  Projects
                </Link>
                <ThemeToggle />
              </nav>
            </header>

            <main className="flex-1">{children}</main>

            <footer className="py-10 mt-16 border-t border-zinc-100 dark:border-zinc-800 text-sm text-zinc-400 dark:text-zinc-500">
              © {new Date().getFullYear()} Juan Pablo
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
