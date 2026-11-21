"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Compass } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { profile, projects, projectHref } from "@/data/portfolio";

export function OriginalHomepage() {
  const reduceMotion = useReducedMotion();
  const featured = [
    projects.find((project) => project.category === "Work & Builds"),
    projects.find((project) => project.category === "Schoolwork"),
  ].filter((project) => project !== undefined);

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-16 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Welcoming Hero */}
        <motion.section
          initial={{ y: 14 }}
          animate={{ y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45 }}
          className="home-entrance mt-16"
        >
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            {profile.headline}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-neutral-300 leading-relaxed">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/builds"
              className="inline-flex min-h-11 items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors"
            >
              Explore Builds
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/schoolwork"
              className="inline-flex min-h-11 items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              Explore Schoolwork
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/journey"
              className="inline-flex min-h-11 items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <Compass className="w-4 h-4 text-neutral-400" aria-hidden="true" />
              Read My Journey
            </Link>
          </div>
        </motion.section>

        {/* Quiet "Currently" Note */}
        <section
          className="mt-14 p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/80"
        >
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
            Currently
          </span>
          <p className="mt-1.5 text-sm text-neutral-300 leading-relaxed">
            {profile.currently}
          </p>
        </section>

        {/* Selected Highlights (Max 2 Cards to Keep It Clean) */}
        <section
          className="mt-14"
        >
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between mb-5">
            <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-400">
              Selected Highlights
            </h2>
            <span className="text-xs text-neutral-400">One build, one school project</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {featured.map((item) => (
              <Link
                key={item.slug}
                href={projectHref(item)}
                className="group p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/40 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span>{item.category === "Schoolwork" ? "Schoolwork" : "Builds"}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 transition-colors" aria-hidden="true" />
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-neutral-400 leading-relaxed">
                  {item.summary}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Quiet Footer */}
      <footer className="mt-20 border-t border-neutral-800/80 pt-6 text-xs font-mono text-neutral-400 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <span>© 2026 {profile.name}</span>
        <div className="flex items-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center hover:text-neutral-300 transition-colors"
          >
            GitHub
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a
            href={profile.email}
            className="inline-flex min-h-11 items-center hover:text-neutral-300 transition-colors"
          >
            Say Hello
          </a>
        </div>
      </footer>
    </main>
  );
}
