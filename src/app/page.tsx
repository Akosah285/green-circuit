"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Compass } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { profile, projects } from "@/data/portfolio";

export default function Home() {
  const featured = projects.slice(0, 2);

  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-16 flex flex-col justify-between">
      <div>
        <Navbar />

        {/* Welcoming Hero */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-16"
        >
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            {profile.headline}
          </h1>
          <p className="mt-5 text-base sm:text-lg text-neutral-300 leading-relaxed">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors"
            >
              Explore Work &amp; Schoolwork
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/journey"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors"
            >
              <Compass className="w-4 h-4 text-neutral-400" />
              Read My Journey
            </Link>
          </div>
        </motion.section>

        {/* Quiet "Currently" Note */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mt-14 p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/80"
        >
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
            Currently
          </span>
          <p className="mt-1.5 text-sm text-neutral-300 leading-relaxed">
            {profile.currently}
          </p>
        </motion.section>

        {/* Selected Highlights (Max 2 Cards to Keep It Clean) */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="mt-14"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-mono uppercase tracking-wider text-neutral-400">
              Selected Highlights
            </h2>
            <Link
              href="/work"
              className="text-xs font-mono text-emerald-400 hover:underline"
            >
              View all ({projects.length}) →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {featured.map((item) => (
              <Link
                key={item.slug}
                href={`/work#${item.slug}`}
                className="group p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-500/40 transition-all"
              >
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span>{item.category}</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-emerald-400 transition-colors" />
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
        </motion.section>
      </div>

      {/* Quiet Footer */}
      <footer className="mt-20 border-t border-neutral-800/80 pt-6 text-xs font-mono text-neutral-500 flex flex-wrap items-center justify-between gap-4">
        <span>© 2026 {profile.name}</span>
        <div className="flex items-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-neutral-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href={profile.email}
            className="hover:text-neutral-300 transition-colors"
          >
            Say Hello
          </a>
        </div>
      </footer>
    </main>
  );
}