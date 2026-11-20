"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Terminal, Sparkles } from "lucide-react";

const projects = [
  {
    title: "Green Circuit",
    tag: "Cloud & Next.js",
    description: "Automated CI/CD personal web platform deployed on Azure Static Web Apps.",
    href: "https://github.com/Akosah285/green-circuit",
  },
  {
    title: "System Lab",
    tag: "Coming in Checkpoint 4",
    description: "Serverless API endpoints and interactive data workflows.",
    href: "#lab",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto px-6 py-20 flex flex-col justify-between">
      {/* Navigation */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between border-b border-neutral-800/80 pb-6"
      >
        <span className="font-mono text-sm tracking-tight text-emerald-400 flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          akwasi.dev
        </span>
        <nav className="flex items-center gap-6 text-sm text-neutral-400">
          <a href="#work" className="hover:text-white transition-colors">
            Work
          </a>
          <a
            href="https://github.com/Akosah285"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-4 h-4 fill-current"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            GitHub
          </a>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="my-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Live on Azure Static Web Apps
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Building resilient software &amp; cloud experiences.
          </h1>
          <p className="mt-6 text-lg text-neutral-400 max-w-2xl leading-relaxed">
            Welcome to my personal corner of the web—engineered with Next.js, TypeScript, Tailwind CSS, and automated CI/CD pipelines.
          </p>
        </motion.div>

        {/* Project Cards */}
        <motion.div
          id="work"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-16 grid sm:grid-cols-2 gap-4"
        >
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target={project.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-emerald-400">
                    {project.tag}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h2 className="mt-3 text-xl font-semibold text-white">
                  {project.title}
                </h2>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </a>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 pt-6 text-xs font-mono text-neutral-500 flex justify-between">
        <span>© 2026 Akwasi Akosah</span>
      </footer>
    </main>
  );
}